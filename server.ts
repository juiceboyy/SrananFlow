import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { DEFAULT_SRANAN_CORPUS } from './src/data/defaultCorpus';
import { searchCorpus, formatGroundingPrompt, parseBulkTextToCorpus, normalizeSrananKey } from './src/lib/ragCorpus';
import { RAGCorpusItem } from './src/types';
import {
  loadCorpusFromFirestore,
  saveCorpusItemsToFirestore,
  deleteCorpusItemFromFirestore,
  deleteBatchCorpusItemsFromFirestore,
  resetFirestoreCorpusToDefault
} from './src/lib/firebaseStore';
import {
  buildSsmlFromText,
  buildSsmlPayload,
  wrapInSpeak,
  sanitizeXmlText,
  sanitizeIpaPhoneme
} from './src/utils/ssmlBuilder';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side audio cache directory setup
const publicAudioCacheDir = path.join(process.cwd(), 'public', 'audio-cache');
if (!fs.existsSync(publicAudioCacheDir)) {
  fs.mkdirSync(publicAudioCacheDir, { recursive: true });
}
app.use('/audio-cache', express.static(publicAudioCacheDir));


// Active RAG Corpus Store (synced with Cloud Firestore)
let activeCorpus: RAGCorpusItem[] = [...DEFAULT_SRANAN_CORPUS];
let isRagGlobalEnabled = true;

// Initialize Firestore persistence asynchronously on server startup
(async () => {
  try {
    const loaded = await loadCorpusFromFirestore();
    if (loaded && loaded.length > 0) {
      activeCorpus = loaded;
      console.log(`[Firestore] Initialized RAG Corpus memory with ${activeCorpus.length} persistent items from Cloud Firestore.`);
    }
  } catch (err) {
    console.error('[Firestore] Error syncing RAG corpus on startup:', err);
  }
})();

// Helper to safely get Gemini client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Helper for retrying transient API errors (e.g. 503 UNAVAILABLE or 429 Rate Limit)
async function callWithRetry<T>(fn: () => Promise<T>, retries = 2, delayMs = 500): Promise<T> {
  let lastErr: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastErr = err;
      const isTransient =
        err?.status === 503 ||
        err?.code === 503 ||
        err?.status === 429 ||
        err?.code === 429 ||
        (err?.message && (err.message.includes('503') || err.message.includes('UNAVAILABLE') || err.message.includes('high demand')));
      
      if (isTransient && attempt < retries) {
        console.warn(`Gemini API transient error (${err?.status || err?.code || '503'}), retrying attempt ${attempt + 1}/${retries}...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, attempt)));
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

// 1. Chat Endpoint - Conversational AI Partner with corrections, vocab extraction, & RAG grounding
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, scenario, targetLanguage, level, userRole, partnerRole, enableRag } = req.body;

    const ai = getGenAI();

    const isSranan = targetLanguage === 'sr' || targetLanguage === 'Sranantongo' || targetLanguage?.toLowerCase().includes('sranan');

    // Extract user's latest text query AND scenario vocabulary context for RAG Retrieval
    const lastUserMessage = (messages || [])
      .slice()
      .reverse()
      .find((m: any) => m.sender === 'user')?.text || '';

    const scenarioVocabTerms = (scenario?.keyVocabulary || [])
      .map((k: any) => `${k.word} ${k.translation}`)
      .join(' ');

    const combinedRagQuery = `${lastUserMessage} ${scenario?.title || ''} ${scenario?.description || ''} ${scenarioVocabTerms}`.trim();

    const useRag = (enableRag !== undefined ? enableRag : isRagGlobalEnabled) && isSranan;
    const groundedSnippets = useRag ? searchCorpus(combinedRagQuery || 'Fa waka', activeCorpus, 5) : [];
    const ragGroundingInstructions = useRag && groundedSnippets.length > 0
      ? formatGroundingPrompt(groundedSnippets)
      : '';

    const srananRules = isSranan ? `
CRITICAL ACCENT & LANGUAGE RULES FOR SRANANTONGO (SURINAME):
- You represent an authentic native Surinamese Sranantongo speaker from Paramaribo, Suriname.
- Speak in natural, genuine Sranantongo vocabulary and syntax (e.g. 'Fa waka', 'Bun mamanten', 'Mi sa lobi...', 'Pe a presi de?').
- GREETINGS & WELCOMES: NEVER use "seryusu odi" or "seryusu" in greetings/welcomes. In Sranantongo, "seryusu" means grave, solemn, or stern—it does NOT mean "warm" or "hearty". For greetings, ALWAYS use "switi odi", "wan switi kon", "bun kon", or "Fa waka!".
- Do NOT output European Dutch text or Dutch accent markers.
- In phonetic guides and extracted vocabulary, provide phonetics reflecting authentic Surinamese pronunciation (open vowels, melodic pitch, non-guttural consonants).
- When domain-specific phonemes or pronunciations are required, format output in valid SSML wrapped in <speak>...</speak> containing <phoneme alphabet="ipa" ph="...">word</phoneme> tags.
` : '';

    const systemInstruction = `You are a warm, patient, and encouraging native language partner.
Target Language: ${targetLanguage || 'Sranantongo'}
Learner Level: ${level || 'A2'} (A1=Beginner, A2=Elementary, B1=Intermediate, B2=Upper Intermediate, C1=Advanced).
Scenario Title: ${scenario?.title || 'Casual Chat'}
Your Role: ${partnerRole || 'Friendly Local'}
User's Role: ${userRole || 'Language Student'}
Location/Setting: ${scenario?.location || 'Conversational Cafe'}
${srananRules}
${ragGroundingInstructions}
RULES:
1. Speak naturally in the target language at a difficulty level suitable for ${level || 'A2'}. Keep responses concise (1-3 sentences) so the learner can reply easily.
2. Provide the direct English translation of your reply.
3. Gently analyze the user's latest message. If there are any grammatical errors, unnatural word choices, or spelling mistakes in the target language, provide clear constructive corrections. If their message is fine, return an empty array for corrections.
4. Extract 1 to 3 key or helpful vocabulary words/phrases from this turn that the learner should add to their word bank.
5. You MUST return JSON matching the specified JSON schema.`;

    // Construct prompt history
    const conversationHistory = (messages || []).map((m: any) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');

    const prompt = `Current Conversation History:\n${conversationHistory}\n\nPlease respond to the user's latest message as ${partnerRole}.`;

    const response = await callWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              partnerReply: {
                type: Type.STRING,
                description: 'Your response in the target language.'
              },
              translation: {
                type: Type.STRING,
                description: 'English translation of your reply.'
              },
              corrections: {
                type: Type.ARRAY,
                description: 'Constructive corrections for the user message.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    originalText: { type: Type.STRING },
                    suggestedText: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    type: {
                      type: Type.STRING,
                      description: 'grammar, vocabulary, pronunciation, or politeness'
                    }
                  },
                  required: ['originalText', 'suggestedText', 'explanation', 'type']
                }
              },
              extractedVocab: {
                type: Type.ARRAY,
                description: '1-3 key vocabulary words from this conversation turn.',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    phonetic: { type: Type.STRING },
                    translation: { type: Type.STRING },
                    contextSentence: { type: Type.STRING }
                  },
                  required: ['word', 'phonetic', 'translation', 'contextSentence']
                }
              }
            },
            required: ['partnerReply', 'translation', 'corrections', 'extractedVocab']
          }
        }
      })
    );

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);

    // Post-process to ensure strict compliance with Sranantongo greeting rules (replace any accidental seryusu odi)
    if (parsed.partnerReply) {
      parsed.partnerReply = parsed.partnerReply
        .replace(/seryusu\s+odi/gi, 'switi kon')
        .replace(/Wan seryusu/gi, 'Wan switi');
    }

    // Attach Grounding Metadata to response
    res.json({
      ...parsed,
      groundingMetadata: {
        ragEnabled: useRag,
        sourcesCount: groundedSnippets.length,
        groundedSnippets
      }
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: 'Failed to generate conversation response.',
      details: error.message
    });
  }
});

// ==========================================
// RAG CORPUS & KNOWLEDGE BASE MANAGEMENT APIs
// ==========================================

// GET /api/rag/corpus - List all active corpus items & statistics
app.get('/api/rag/corpus', (req, res) => {
  const categoriesCount: Record<string, number> = {};
  let totalWords = 0;

  activeCorpus.forEach((item) => {
    categoriesCount[item.category] = (categoriesCount[item.category] || 0) + 1;
    totalWords += (item.srananText.match(/\S+/g) || []).length;
  });

  res.json({
    items: activeCorpus,
    totalItems: activeCorpus.length,
    totalWords,
    categoriesCount,
    isRagGlobalEnabled
  });
});

// POST /api/rag/corpus - Add single item or bulk text/CSV dataset with duplicate avoidance
app.post('/api/rag/corpus', async (req, res) => {
  try {
    const { bulkText, category, item } = req.body;

    // Collect normalized keys of existing active corpus
    const existingKeys = new Set(
      activeCorpus.map((c) => normalizeSrananKey(c.srananText)).filter(Boolean)
    );

    if (item && item.srananText) {
      const key = normalizeSrananKey(item.srananText);
      if (key && existingKeys.has(key)) {
        return res.json({
          success: true,
          addedCount: 0,
          skippedDuplicatesCount: 1,
          isDuplicate: true,
          message: 'Doublure overgeslagen. Deze Sranantongo expressie staat al in het Corpus.'
        });
      }

      const newItem: RAGCorpusItem = {
        id: `corpus_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        title: item.title || `Entry: ${item.srananText.substring(0, 20)}`,
        category: item.category || 'dictionary',
        srananText: item.srananText,
        translation: item.translation || 'Custom entry',
        usageNotes: item.usageNotes || '',
        phonetic: item.phonetic || '',
        tags: item.tags && item.tags.length > 0 ? item.tags : [item.category || 'dictionary', 'custom'],
        source: item.source || 'User Upload',
        dateAdded: new Date().toISOString().split('T')[0]
      };
      activeCorpus.unshift(newItem);
      // Persist to Firestore
      saveCorpusItemsToFirestore([newItem]).catch((e) => console.error('Error background saving to Firestore:', e));
      return res.json({ success: true, addedCount: 1, skippedDuplicatesCount: 0, item: newItem });
    }

    if (bulkText) {
      const parsedPartials = parseBulkTextToCorpus(bulkText, category || 'dictionary');
      const uniquePartials: typeof parsedPartials = [];
      let skippedDuplicatesCount = 0;
      const currentBatchKeys = new Set<string>();

      for (const p of parsedPartials) {
        if (!p.srananText) continue;
        const key = normalizeSrananKey(p.srananText);
        if (!key) continue;

        if (existingKeys.has(key) || currentBatchKeys.has(key)) {
          skippedDuplicatesCount++;
        } else {
          currentBatchKeys.add(key);
          uniquePartials.push(p);
        }
      }

      const addedItems: RAGCorpusItem[] = uniquePartials.map((p, idx) => ({
        id: `corpus_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 3)}`,
        title: p.title || `Imported ${idx + 1}`,
        category: p.category || (category as any) || 'dictionary',
        srananText: p.srananText || '',
        translation: p.translation || '',
        usageNotes: p.usageNotes || 'Bulk imported into Sranantongo RAG Corpus',
        tags: p.tags || [category || 'bulk', 'custom'],
        source: 'Bulk Text Import',
        dateAdded: new Date().toISOString().split('T')[0]
      }));

      activeCorpus = [...addedItems, ...activeCorpus];
      if (addedItems.length > 0) {
        // Persist to Firestore
        saveCorpusItemsToFirestore(addedItems).catch((e) => console.error('Error background saving bulk items to Firestore:', e));
      }

      return res.json({
        success: true,
        addedCount: addedItems.length,
        skippedDuplicatesCount,
        items: addedItems
      });
    }

    res.status(400).json({ error: 'Please provide either a valid corpus item or bulkText.' });
  } catch (err: any) {
    console.error('Error adding to RAG corpus:', err);
    res.status(500).json({ error: 'Failed to update corpus.' });
  }
});

// POST /api/rag/corpus/deduplicate - Scan and remove all duplicate Sranantongo entries in corpus
app.post('/api/rag/corpus/deduplicate', async (req, res) => {
  try {
    const seenKeys = new Set<string>();
    const uniqueCorpus: RAGCorpusItem[] = [];
    const removedIds: string[] = [];

    for (const item of activeCorpus) {
      const key = normalizeSrananKey(item.srananText);
      if (!key) {
        uniqueCorpus.push(item);
        continue;
      }
      if (seenKeys.has(key)) {
        removedIds.push(item.id);
      } else {
        seenKeys.add(key);
        uniqueCorpus.push(item);
      }
    }

    if (removedIds.length > 0) {
      activeCorpus = uniqueCorpus;
      deleteBatchCorpusItemsFromFirestore(removedIds).catch((e) =>
        console.error('Error deleting duplicate IDs from Firestore:', e)
      );
    }

    res.json({
      success: true,
      removedCount: removedIds.length,
      remainingCount: activeCorpus.length
    });
  } catch (err: any) {
    console.error('Error deduplicating RAG corpus:', err);
    res.status(500).json({ error: 'Fout bij opschonen van doublures in het corpus.' });
  }
});

// POST /api/rag/generate-from-markdown - Generate RAG bulk text from Markdown files using Gemini
app.post('/api/rag/generate-from-markdown', async (req, res) => {
  try {
    const { markdownContent } = req.body;
    if (!markdownContent || typeof markdownContent !== 'string' || !markdownContent.trim()) {
      return res.status(400).json({ error: 'Geen markdown content opgegeven.' });
    }

    const ai = getGenAI();

    const systemInstruction = `You are an expert Sranantongo language parser and lexicographer.
Read the provided Markdown document(s) carefully and extract all authentic Sranantongo phrases, expressions, vocabulary, proverbs (odo's), grammar structures, and dialogues.

Format the output STRICTLY using the line-by-line format below (without any markdown headings, numbering, or introductory chatter):

Sranantongo Phrase / Expression : English Translation, Category: [category]

CATEGORY CLASSIFICATION RULES:
Classify every item into ONE of these exact categories:
- dictionary (for single vocabulary words or short translations)
- grammar (for grammatical rules, verb conjugations, tense markers like 'e' or 'ben')
- cultural (for cultural customs, etiquette, food, traditions)
- proverb (for traditional odo's or sayings)
- dialogue (for multi-turn spoken dialogue exchanges)
- pronunciation (for phonetics or pronunciation guidance)

CRITICAL FORMATTING INSTRUCTIONS (STRICT LINE-BY-LINE REQUIRED):
1. ONE ENTRY PER LINE: Every single item MUST be placed on its own separate line with a hard line break (\n). NEVER combine multiple entries on the same line or separate them with commas or semicolons.
2. NO MARKDOWN CODE BLOCKS: Do NOT wrap the output in code fences (\`\`\` or \`\`\`markdown). Output ONLY raw plain text.
3. NO HEADINGS, NUMBERING OR BULLETS: Do NOT output markdown headings (#, ##), section titles, bullet points (- or *), or numbers (1., 2.).
4. Write the authentic Sranantongo text directly to the LEFT of the colon (:).
5. Write the clear English translation directly to the RIGHT of the colon (:).
6. Append the category with ", Category: [category_name]" (e.g., ", Category: grammar" or ", Category: cultural").
7. If there is a key note, optionally append it with a comma: ", Note: [Brief explanation]".

EXAMPLE LINE FORMAT (EXACTLY 1 ENTRY PER LINE):
Mi e go na wosfi : I am going to the office, Category: grammar, Note: Present continuous 'e' marker
Pom : Traditional festive dish made with tayer root and chicken, Category: cultural

CRITICAL CONSTRAINTS:
- DO NOT output any markdown headings (#, ##), section titles, bullet points (-), or line numbers.
- DO NOT wrap the output in markdown code blocks (\`\`\`).
- DO NOT output conversational filler like "Here is the formatted list:" or "Sure!".
- Every single line MUST follow the exact "Sranantongo Phrase : English Translation, Category: [category]" pattern.`;

    const response = await callWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Markdown Content to extract Sranantongo RAG pairs from:\n\n${markdownContent}`,
        config: {
          systemInstruction,
          temperature: 0.2
        }
      })
    );

    let generatedText = (response.text || '').trim();
    // Clean up any accidental code fence wrappers if present
    generatedText = generatedText.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();

    res.json({
      success: true,
      generatedText
    });
  } catch (err: any) {
    console.error('Error generating RAG text from markdown:', err);
    res.status(500).json({ error: 'Fout bij het genereren van RAG-tekst vanuit markdown.', details: err?.message });
  }
});

// DELETE /api/rag/corpus/:id - Delete a specific corpus item
app.delete('/api/rag/corpus/:id', async (req, res) => {
  const { id } = req.params;
  const initialLen = activeCorpus.length;
  activeCorpus = activeCorpus.filter((item) => item.id !== id);

  if (activeCorpus.length < initialLen) {
    deleteCorpusItemFromFirestore(id).catch((e) => console.error('Error background deleting from Firestore:', e));
    res.json({ success: true, deletedId: id });
  } else {
    res.status(404).json({ error: 'Corpus item not found.' });
  }
});

// PUT /api/rag/corpus/:id - Update an existing corpus item
app.put('/api/rag/corpus/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const index = activeCorpus.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Corpus item not found.' });
  }

  const updatedItem: RAGCorpusItem = {
    ...activeCorpus[index],
    ...updatedData,
    id // ensure id remains unchanged
  };

  activeCorpus[index] = updatedItem;
  saveCorpusItemsToFirestore([updatedItem]).catch((e) =>
    console.error('Error background saving updated item to Firestore:', e)
  );

  res.json({ success: true, item: updatedItem });
});

// POST /api/rag/query - Test retrieval for any query
app.post('/api/rag/query', (req, res) => {
  const { query, category, maxResults } = req.body;
  const snippets = searchCorpus(query || '', activeCorpus, maxResults || 5, category);
  res.json({
    query: query || '',
    retrievedCount: snippets.length,
    snippets
  });
});

// POST /api/rag/toggle - Enable or disable RAG grounding globally
app.post('/api/rag/toggle', (req, res) => {
  const { enabled } = req.body;
  if (typeof enabled === 'boolean') {
    isRagGlobalEnabled = enabled;
  }
  res.json({ isRagGlobalEnabled });
});

// POST /api/rag/reset - Reset corpus to default pre-seeded Sranantongo dataset
app.post('/api/rag/reset', async (req, res) => {
  try {
    activeCorpus = [...DEFAULT_SRANAN_CORPUS];
    isRagGlobalEnabled = true;
    await resetFirestoreCorpusToDefault().catch((e) => console.error('Error resetting Firestore:', e));
    res.json({ success: true, totalItems: activeCorpus.length, isRagGlobalEnabled });
  } catch (err: any) {
    console.error('Failed to reset RAG corpus:', err);
    res.status(500).json({ error: 'Failed to reset corpus', details: err?.message });
  }
});

// POST /api/rag/test-grounding - Run side-by-side comparison (Ungrounded vs RAG-Grounded)
app.post('/api/rag/test-grounding', async (req, res) => {
  try {
    const { promptText, category } = req.body;
    if (!promptText) {
      return res.status(400).json({ error: 'promptText parameter is required.' });
    }

    const ai = getGenAI();

    // 1. Retrieve grounded snippets
    const snippets = searchCorpus(promptText, activeCorpus, 4, category);
    const groundingPrompt = formatGroundingPrompt(snippets);

    const baseSystemPrompt = `You are a native Sranantongo language tutor. Answer the user's question or phrase in Sranantongo with English translation and brief explanation.`;

    // Call 1: Without RAG Grounding
    const ungroundedTask = callWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: baseSystemPrompt
        }
      })
    );

    // Call 2: With RAG Grounding
    const groundedTask = callWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction: `${baseSystemPrompt}\n${groundingPrompt}`
        }
      })
    );

    const [ungroundedRes, groundedRes] = await Promise.all([ungroundedTask, groundedTask]);

    res.json({
      promptText,
      ungroundedResponse: ungroundedRes.text || '',
      groundedResponse: groundedRes.text || '',
      snippetsUsed: snippets
    });
  } catch (err: any) {
    console.error('Error in /api/rag/test-grounding:', err);
    res.status(500).json({ error: 'Failed to run grounding test.', details: err.message });
  }
});

// 2. Pronunciation Feedback Endpoint
app.post('/api/pronunciation', async (req, res) => {
  try {
    const { targetPhrase, audioBase64, mimeType, userSpeechText, targetLanguage } = req.body;

    const ai = getGenAI();

    const isSranan = targetLanguage === 'sr' || targetLanguage === 'Sranantongo' || targetLanguage?.toLowerCase().includes('sranan');

    // Retrieve grounded pronunciation context from Corpus Knowledge Base
    let ragGroundingPrompt = '';
    if (isRagGlobalEnabled || isSranan) {
      let snippets = searchCorpus(targetPhrase, activeCorpus, 5, 'pronunciation');
      if (snippets.length === 0) {
        snippets = searchCorpus(targetPhrase, activeCorpus, 5);
      }
      if (snippets.length > 0) {
        ragGroundingPrompt = `\n${formatGroundingPrompt(snippets)}\nUse the above GROUNDED KNOWLEDGE BASE and phonetic guidance to evaluate stress, accent, and pronunciation accurately.`;
      }
    }

    const srananPronunciationRules = isSranan ? `
SPECIAL SRANANTONGO ACCENT & PHONETIC ANALYSIS RULES:
- Evaluate pronunciation strictly according to authentic Surinamese Sranantongo phonetics and cadence (Surinamese Creole melody, open vowels, soft consonants, non-guttural sounds).
- Provide feedback tips that specifically coach the user on grounded Surinamese accent (e.g. avoiding European Dutch guttural 'g' or harsh Dutch vowels, emphasizing natural Surinamese rhythm, open vowels, and capitalized stress patterns).
- Expected phonetic transcriptions MUST reflect authentic Surinamese Sranantongo pronunciation with CAPITALIZED STRESSED SYLLABLES when appropriate.
- When generating SSML for speech synthesis or phonetic markup, explicitly format domain-specific pronunciations using valid SSML wrapped in <speak>...</speak> with strictly sanitized <phoneme alphabet="ipa" ph="..."> tags.
` : '';

    const systemInstruction = `You are an expert phonetician and accent/pronunciation tutor for ${targetLanguage || 'Sranantongo'}.
${audioBase64 ? 'Listen STRICTLY to the attached raw audio recording of the user\'s spoken attempt. Do NOT rely on external web transcription engines.' : 'Analyze the user\'s speech attempt against the target reference phrase.'}
Target Reference Phrase: "${targetPhrase}"
${userSpeechText ? `User Attempted Text Input: "${userSpeechText}"` : ''}
${srananPronunciationRules}
${ragGroundingPrompt}

Tasks:
1. ${audioBase64 ? 'Directly transcribe what the user pronounced in Sranantongo from the audio as "transcribedSpeech".' : 'Evaluate the user\'s text attempt.'}
2. Compare the user\'s actual spoken audio against the target phrase according to authentic Surinamese Sranantongo phonetics, open vowels, and rhythm.
3. Calculate scores: overallScore (0-100), accuracyScore (0-100), fluencyScore (0-100), intonationScore (0-100).
4. Provide wordScores breakdown (word, score, expectedPhonetic with CAPS stress, status: "perfect"|"good"|"needs_work", and tip).
5. Provide nativePhonetic, tips (array of mouth shape, vowel, and cadence tips), and feedbackSummary.`;

    let contentsPayload: any[];
    if (audioBase64) {
      const cleanBase64 = audioBase64.replace(/^data:audio\/[a-z0-9]+;base64,/, '');
      const audioMime = mimeType ? mimeType.split(';')[0] : 'audio/webm';
      contentsPayload = [
        {
          inlineData: {
            mimeType: audioMime,
            data: cleanBase64
          }
        },
        {
          text: `Analyze this spoken audio directly against the target phrase: "${targetPhrase}". Transcribe what was spoken and evaluate the phonetics.`
        }
      ];
    } else {
      contentsPayload = [
        `Analyze pronunciation for target phrase "${targetPhrase}". User attempt: "${userSpeechText || targetPhrase}"`
      ];
    }

    const response = await callWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: contentsPayload,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              transcribedSpeech: { type: Type.STRING },
              overallScore: { type: Type.NUMBER },
              accuracyScore: { type: Type.NUMBER },
              fluencyScore: { type: Type.NUMBER },
              intonationScore: { type: Type.NUMBER },
              nativePhonetic: { type: Type.STRING },
              feedbackSummary: { type: Type.STRING },
              tips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              wordScores: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    expectedPhonetic: { type: Type.STRING },
                    status: { type: Type.STRING },
                    tip: { type: Type.STRING }
                  },
                  required: ['word', 'score', 'expectedPhonetic', 'status']
                }
              }
            },
            required: [
              'overallScore',
              'accuracyScore',
              'fluencyScore',
              'intonationScore',
              'nativePhonetic',
              'feedbackSummary',
              'tips',
              'wordScores'
            ]
          }
        }
      })
    );

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (error: any) {
    console.error('Error in /api/pronunciation:', error);
    res.status(500).json({ error: 'Failed to analyze pronunciation.', details: error?.message });
  }
});

// 3. Hints Generator Endpoint
app.post('/api/hints', async (req, res) => {
  try {
    const { messages, scenario, targetLanguage, level } = req.body;
    const ai = getGenAI();

    const conversationHistory = (messages || []).map((m: any) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');

    const prompt = `Conversation history:\n${conversationHistory}\n\nProvide 3 distinct options of what the learner (${level || 'A2'} level) could say next in ${targetLanguage || 'Sranantongo'} to continue the dialogue naturally. Format as JSON.`;

    const response = await callWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hints: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING, description: 'In target language' },
                    translation: { type: Type.STRING, description: 'English translation' },
                    tone: { type: Type.STRING, description: 'casual, polite, or inquisitive' }
                  },
                  required: ['text', 'translation', 'tone']
                }
              }
            },
            required: ['hints']
          }
        }
      })
    );

    res.json(JSON.parse(response.text || '{"hints":[]}'));
  } catch (error: any) {
    console.error('Error in /api/hints:', error);
    res.status(500).json({ hints: [] });
  }
});

function createWavHeader(pcmLength: number, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const header = Buffer.alloc(44);
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);

  // "RIFF" chunk descriptor
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcmLength, 4);
  header.write('WAVE', 8);

  // "fmt " sub-chunk
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  // "data" sub-chunk
  header.write('data', 36);
  header.writeUInt32LE(pcmLength, 40);

  return header;
}

// 4. Text-To-Speech (TTS) Endpoint using Gemini 3.6 Flash as sole engine with MD5 Audio Caching
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName, targetLanguage } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text parameter is required.' });
    }

    const ai = getGenAI();

    const isSranan =
      targetLanguage === 'sr' ||
      targetLanguage === 'Sranantongo' ||
      targetLanguage?.toLowerCase().includes('sranan') ||
      /^(Fa waka|Bun|Mi|Yu|A|Wi|Pe|San|Switi|Wan|Safrisafri|Grantangi|Kon)/i.test(text.trim());

    // Retrieve RAG Grounding knowledge for TTS text formatting
    let textToSpeak = text;
    let phonemesMap: Record<string, string> = {};

    if (isRagGlobalEnabled || isSranan) {
      const snippets = searchCorpus(text, activeCorpus, 3, 'pronunciation');
      const generalSnippets = searchCorpus(text, activeCorpus, 3);
      const allSnippets = [...snippets, ...generalSnippets];

      // If exact or strong match exists in grounded RAG corpus, use grounded Sranan text
      const exactMatch = allSnippets.find(
        (s) => s.srananText.toLowerCase() === text.trim().toLowerCase()
      );
      if (exactMatch) {
        textToSpeak = exactMatch.srananText;
      }

      snippets.forEach((snippet) => {
        if (snippet.srananText) {
          phonemesMap[snippet.srananText.toLowerCase()] = snippet.srananText.toLowerCase();
        }
      });
    }

    const selectedVoice = voiceName || 'Puck';

    // MD5 Hashing Server-Side Audio Caching
    const hashInput = `${textToSpeak.trim().toLowerCase()}_${selectedVoice}`;
    const hash = crypto.createHash('md5').update(hashInput).digest('hex');

    const wavCachePath = path.join(publicAudioCacheDir, `${hash}.wav`);
    const mp3CachePath = path.join(publicAudioCacheDir, `${hash}.mp3`);

    // Return cached audio immediately if available
    if (fs.existsSync(wavCachePath)) {
      const cachedBuffer = fs.readFileSync(wavCachePath);
      return res.json({
        audioUrl: `/audio-cache/${hash}.wav`,
        audioBase64: cachedBuffer.toString('base64'),
        mimeType: 'audio/wav',
        provider: 'audio-cache'
      });
    }

    if (fs.existsSync(mp3CachePath)) {
      const cachedBuffer = fs.readFileSync(mp3CachePath);
      return res.json({
        audioUrl: `/audio-cache/${hash}.mp3`,
        audioBase64: cachedBuffer.toString('base64'),
        mimeType: 'audio/mp3',
        provider: 'audio-cache'
      });
    }

    // Call Gemini 3.1 Flash TTS model strictly with official prompt structure
    const fullPrompt = `### AUDIO PROFILE
Native Sranantongo speaker.

### DIRECTOR'S NOTES
Surinamese accent, Creole staccato rhythm, clear pacing.

#### TRANSCRIPT
${textToSpeak}`;

    const config: any = {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: selectedVoice }
        }
      }
    };

    const model = 'gemini-3.1-flash-tts-preview';
    let response: any;

    try {
      response = await callWithRetry(() =>
        ai.models.generateContent({
          model,
          contents: [{ parts: [{ text: fullPrompt }] }],
          config
        })
      );
    } catch (err: any) {
      console.error(`Gemini TTS call (${model}) failed:`, err?.message || err);
      const isQuota =
        err?.status === 429 ||
        err?.code === 429 ||
        (err?.message && (
          err.message.includes('429') ||
          err.message.toLowerCase().includes('quota') ||
          err.message.includes('RESOURCE_EXHAUSTED')
        ));

      if (isQuota) {
        return res.status(429).json({
          error: 'Spraakgeneratie quota limiet bereikt (HTTP 429). Probeer het later opnieuw.',
          details: err?.message || 'Quota limit reached'
        });
      }

      return res.status(500).json({ error: `Audio genereren mislukt via ${model}: ${err?.message || 'Gemini error'}` });
    }

    const parts = response?.candidates?.[0]?.content?.parts || [];
    const audioPart = parts.find((p: any) => p.inlineData?.data);
    const base64Audio = audioPart?.inlineData?.data;

    if (base64Audio) {
      if (!fs.existsSync(publicAudioCacheDir)) {
        fs.mkdirSync(publicAudioCacheDir, { recursive: true });
      }

      const rawBuffer = Buffer.from(base64Audio, 'base64');
      let finalBuffer: Buffer;
      let ext: string;
      let finalMimeType: string;

      const header4 = rawBuffer.subarray(0, 4).toString();
      if (header4 === 'RIFF') {
        finalBuffer = rawBuffer;
        ext = 'wav';
        finalMimeType = 'audio/wav';
      } else if (header4.startsWith('ID3') || (rawBuffer[0] === 0xFF && (rawBuffer[1] & 0xE0) === 0xE0)) {
        finalBuffer = rawBuffer;
        ext = 'mp3';
        finalMimeType = 'audio/mp3';
      } else {
        // Raw 24kHz 16-bit PCM -> wrap in 44-byte RIFF/WAV header
        const wavHeader = createWavHeader(rawBuffer.length, 24000, 1, 16);
        finalBuffer = Buffer.concat([wavHeader, rawBuffer]);
        ext = 'wav';
        finalMimeType = 'audio/wav';
      }

      const cacheFilePath = path.join(publicAudioCacheDir, `${hash}.${ext}`);
      fs.writeFileSync(cacheFilePath, finalBuffer);

      return res.json({
        audioUrl: `/audio-cache/${hash}.${ext}`,
        audioBase64: finalBuffer.toString('base64'),
        mimeType: finalMimeType,
        provider: 'gemini-3.1-flash-tts-preview'
      });
    } else {
      console.error('Gemini TTS response had no inlineData audio part:', JSON.stringify(parts));
      return res.status(500).json({ error: 'Geen audio gegenereerd door Gemini 3.1 Flash TTS model.' });
    }
  } catch (error: any) {
    console.error('Error in /api/tts:', error);
    const status = error?.status || 500;
    return res.status(status >= 400 && status < 600 ? status : 500).json({
      error: 'Failed to generate speech.',
      details: error?.message || 'Unknown error'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LingoFlow Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
