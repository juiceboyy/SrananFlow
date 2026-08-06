import { RAGCorpusItem, GroundedSnippet, RAGCorpusCategory, Scenario } from '../types';
import { DEFAULT_SRANAN_CORPUS } from '../data/defaultCorpus';

export function calculateSimilarityScore(
  query: string,
  item: RAGCorpusItem
): { score: number; matchedKeywords: string[] } {
  if (!query || !query.trim()) {
    return { score: 0, matchedKeywords: [] };
  }

  const cleanQuery = query.toLowerCase().replace(/[^\w\s\u00C0-\u024F]/g, ' ');
  const queryTokens = Array.from(new Set(cleanQuery.split(/\s+/).filter((t) => t.length > 1)));

  const titleLower = item.title.toLowerCase();
  const srananLower = item.srananText.toLowerCase();
  const transLower = item.translation.toLowerCase();
  const notesLower = (item.usageNotes || '').toLowerCase();
  const tagsLower = item.tags.map((t) => t.toLowerCase());

  let score = 0;
  const matchedKeywords: string[] = [];

  for (const token of queryTokens) {
    let matched = false;

    // Direct tag match (High priority)
    if (tagsLower.includes(token)) {
      score += 25;
      matched = true;
    }

    // Title match
    if (titleLower.includes(token)) {
      score += 20;
      matched = true;
    }

    // Sranan text match
    if (srananLower.includes(token)) {
      score += 30;
      matched = true;
    }

    // Translation match
    if (transLower.includes(token)) {
      score += 15;
      matched = true;
    }

    // Usage notes match
    if (notesLower.includes(token)) {
      score += 10;
      matched = true;
    }

    if (matched && !matchedKeywords.includes(token)) {
      matchedKeywords.push(token);
    }
  }

  // Exact phrase boost
  if (srananLower.includes(cleanQuery.trim())) {
    score += 40;
  }
  if (titleLower.includes(cleanQuery.trim())) {
    score += 35;
  }

  // Normalize score max 100
  const finalScore = Math.min(100, score);
  return { score: finalScore, matchedKeywords };
}

export function searchCorpus(
  query: string,
  corpus: RAGCorpusItem[],
  maxResults = 4,
  categoryFilter?: string
): GroundedSnippet[] {
  if (!query || !query.trim()) {
    // Return top proverb and top dictionary items as general fallback context
    return corpus
      .slice(0, maxResults)
      .map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        srananText: item.srananText,
        translation: item.translation,
        phonetic: item.phonetic,
        similarityScore: 50
      }));
  }

  const filtered = categoryFilter && categoryFilter !== 'all'
    ? corpus.filter((item) => item.category === categoryFilter)
    : corpus;

  const scored = filtered.map((item) => {
    const { score, matchedKeywords } = calculateSimilarityScore(query, item);
    return {
      item,
      score,
      matchedKeywords
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top items with score > 10, or if none, fallback top 2
  const topMatches = scored.filter((s) => s.score > 10).slice(0, maxResults);

  if (topMatches.length === 0) {
    return scored.slice(0, Math.min(2, maxResults)).map((s) => ({
      id: s.item.id,
      title: s.item.title,
      category: s.item.category,
      srananText: s.item.srananText,
      translation: s.item.translation,
      phonetic: s.item.phonetic,
      similarityScore: Math.max(20, s.score)
    }));
  }

  return topMatches.map((s) => ({
    id: s.item.id,
    title: s.item.title,
    category: s.item.category,
    srananText: s.item.srananText,
    translation: s.item.translation,
    phonetic: s.item.phonetic,
    similarityScore: Math.max(35, s.score)
  }));
}

export function formatGroundingPrompt(snippets: GroundedSnippet[]): string {
  if (!snippets || snippets.length === 0) return '';

  const snippetsFormatted = snippets
    .map((s, idx) => {
      let snippetStr = `${idx + 1}. [CATEGORY: ${s.category.toUpperCase()}] "${s.title}"\n   - Sranantongo Text: ${s.srananText}`;
      if (s.phonetic) {
        snippetStr += `\n   - Phonetic Guide (Syllables with CAPS STRESS): ${s.phonetic}`;
      }
      snippetStr += `\n   - Translation / Meaning: ${s.translation}`;
      return snippetStr;
    })
    .join('\n');

  return `
GROUNDING KNOWLEDGE BASE / RAG CONTEXT (AUTHENTIC SRANANTONGO CORPUS):
The following authentic Sranantongo terminology, proverbs (odo's), grammar patterns, and phonetic stress guides were retrieved from the custom grounding corpus.
YOU MUST PRIORITIZE USING THESE GROUNDED TERMS, PHONETIC GUIDES (WITH CAPITALIZED STRESS), AND PATTERNS OVER GENERIC GUESSES IN YOUR RESPONSE:
${snippetsFormatted}
`;
}

export function normalizeSrananKey(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u00C0-\u024F]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Helper to parse raw text or CSV or word list paste into RAGCorpusItem objects with automatic deduplication
 */
export function parseBulkTextToCorpus(
  textInput: string,
  defaultCategory: RAGCorpusCategory = 'dictionary'
): Partial<RAGCorpusItem>[] {
  if (!textInput || !textInput.trim()) return [];

  // Step 1: Pre-process input text to normalize line breaks and strip code block wrappers
  let rawText = textInput
    .replace(/^```[a-z]*\r?\n?/gi, '')
    .replace(/\r?\n?```$/gi, '')
    .replace(/```/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '');

  // Step 2: Handle cases where list items or entries are concatenated on a single line
  rawText = rawText.replace(/(?<=\S)\s+(?=\d+[\.\)]\s+[A-Za-z0-9])/g, '\n');
  rawText = rawText.replace(/(?<=\S)\s+(?=[•*-]\s+[A-Za-z0-9])/g, '\n');

  const rawLines = rawText.split(/\r?\n/);
  const results: Partial<RAGCorpusItem>[] = [];
  const seenKeys = new Set<string>();

  for (let line of rawLines) {
    line = line.trim();
    if (!line) continue;

    // Ignore markdown headers or borders without content
    if (line.startsWith('#') || line.startsWith('===') || line.startsWith('---')) {
      continue;
    }

    // Strip leading list symbols: "1. ", "2) ", "- ", "* ", "• "
    let cleanLine = line.replace(/^[-*•\d+.\)]+\s*/, '').trim();

    // Strip surrounding markdown bold or code formatting: "**text**" -> "text"
    cleanLine = cleanLine.replace(/^\*\*|\*\*$/g, '').replace(/^`|`$/g, '').trim();

    if (!cleanLine) continue;

    let phonFromLine: string | undefined = undefined;
    let noteFromLine: string | undefined = undefined;
    let catFromLine: RAGCorpusCategory | undefined = undefined;

    // Check for "Category:" or "Categorie:" segment
    if (cleanLine.toLowerCase().includes('category:') || cleanLine.toLowerCase().includes('categorie:')) {
      const match = cleanLine.match(/(?:Category|Categorie):\s*([^,;\n]+)/i);
      if (match) {
        const rawCat = match[1].trim().toLowerCase();
        cleanLine = cleanLine.replace(/,?\s*(?:Category|Categorie):\s*[^,;\n]+/i, '');
        if (rawCat.includes('gramm') || rawCat.includes('spraak')) catFromLine = 'grammar';
        else if (rawCat.includes('cultu')) catFromLine = 'cultural';
        else if (rawCat.includes('prov') || rawCat.includes('odo') || rawCat.includes('spreek')) catFromLine = 'proverb';
        else if (rawCat.includes('dial') || rawCat.includes('gesprek')) catFromLine = 'dialogue';
        else if (rawCat.includes('pronun') || rawCat.includes('uitsp') || rawCat.includes('fonet')) catFromLine = 'pronunciation';
        else catFromLine = 'dictionary';
      }
    }

    // Check for "Phonetic:" or "Phonetics:" segment
    if (cleanLine.toLowerCase().includes('phonetic:')) {
      const match = cleanLine.match(/Phonetic:\s*([^,;\n]+)/i);
      if (match) {
        phonFromLine = match[1].trim();
        cleanLine = cleanLine.replace(/,?\s*Phonetic:\s*[^,;\n]+/i, '');
      }
    }

    // Check for "Note:" segment
    if (cleanLine.toLowerCase().includes('note:')) {
      const match = cleanLine.match(/Note:\s*(.*)/i);
      if (match) {
        noteFromLine = match[1].trim();
        cleanLine = cleanLine.replace(/,?\s*Note:\s*.*/i, '');
      }
    }

    const itemCategory = catFromLine || defaultCategory;
    let itemToAdd: Partial<RAGCorpusItem> | null = null;

    // Pattern 1: Colon separator: "Sranan phrase : English translation"
    if (cleanLine.includes(':')) {
      const parts = cleanLine.split(':').map((p) => p.trim());
      let sranan = parts[0].replace(/^[-*•\d+.\s"'\\]+/, '').replace(/^["'**]+|["'**]+$/g, '').trim();
      let translation = parts.slice(1).join(':').replace(/^["'**]+|["'**]+$/g, '').trim();

      if (sranan && translation) {
        itemToAdd = {
          title: sranan.length > 40 ? `Entry: ${sranan.substring(0, 37)}...` : `Entry: ${sranan}`,
          category: itemCategory,
          srananText: sranan,
          translation: translation,
          phonetic: phonFromLine,
          usageNotes: noteFromLine,
          tags: [itemCategory, 'bulk-import']
        };
      }
    }

    // Pattern 2: Hyphen or equals separator: "Sranan phrase - English translation" or "Sranan phrase = English translation"
    if (!itemToAdd && (cleanLine.includes(' - ') || cleanLine.includes(' = '))) {
      const sep = cleanLine.includes(' - ') ? ' - ' : ' = ';
      const parts = cleanLine.split(sep).map((p) => p.trim());
      let sranan = parts[0].replace(/^[-*•\d+.\s"'\\]+/, '').replace(/^["'**]+|["'**]+$/g, '').trim();
      let translation = parts.slice(1).join(sep).replace(/^["'**]+|["'**]+$/g, '').trim();

      if (sranan && translation) {
        itemToAdd = {
          title: sranan.length > 40 ? `Entry: ${sranan.substring(0, 37)}...` : `Entry: ${sranan}`,
          category: itemCategory,
          srananText: sranan,
          translation: translation,
          phonetic: phonFromLine,
          usageNotes: noteFromLine,
          tags: [itemCategory, 'bulk-import']
        };
      }
    }

    // Pattern 3: CSV pattern: "sranan", "translation"
    if (!itemToAdd && (cleanLine.includes(',') || cleanLine.includes(';'))) {
      const parts = cleanLine.split(/[,;]/).map((p) => p.replace(/^["']|["']$/g, '').trim());
      if (parts.length >= 2 && parts[0] && parts[1]) {
        let sranan = parts[0].replace(/^[-*•\d+.\s"'\\]+/, '').replace(/^["'**]+|["'**]+$/g, '').trim();
        let translation = parts[1].replace(/^["'**]+|["'**]+$/g, '').trim();
        if (sranan && translation) {
          itemToAdd = {
            title: parts[2] ? parts[2] : (sranan.length > 40 ? `Entry: ${sranan.substring(0, 37)}...` : `Entry: ${sranan}`),
            category: itemCategory,
            srananText: sranan,
            translation: translation,
            phonetic: phonFromLine,
            usageNotes: noteFromLine,
            tags: [itemCategory, 'bulk-import']
          };
        }
      }
    }

    // Fallback: single phrase line
    if (!itemToAdd && cleanLine.length > 2) {
      if (cleanLine.length > 200) {
        const sentences = cleanLine.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 2);
        for (const sentence of sentences) {
          const sText = sentence.trim();
          const key = normalizeSrananKey(sText);
          if (key && !seenKeys.has(key)) {
            seenKeys.add(key);
            results.push({
              title: `Snippet: ${sText.substring(0, 30)}...`,
              category: itemCategory,
              srananText: sText,
              translation: 'Custom Sranantongo corpus text',
              phonetic: phonFromLine,
              usageNotes: noteFromLine,
              tags: [itemCategory, 'bulk-import']
            });
          }
        }
        continue;
      }

      itemToAdd = {
        title: `Snippet: ${cleanLine.substring(0, 30)}...`,
        category: itemCategory,
        srananText: cleanLine,
        translation: 'Custom Sranantongo corpus text',
        phonetic: phonFromLine,
        usageNotes: noteFromLine,
        tags: [itemCategory, 'bulk-import']
      };
    }

    if (itemToAdd && itemToAdd.srananText) {
      const key = normalizeSrananKey(itemToAdd.srananText);
      if (key && !seenKeys.has(key)) {
        seenKeys.add(key);
        results.push(itemToAdd);
      }
    }
  }

  return results;
}

export interface GroundedScenarioResult {
  scenario: Scenario;
  groundedCount: number;
  groundedTerms: string[];
}

/**
 * Dynamically grounds a Scenario's Key Vocabulary and Common Phrases using the live RAG Corpus.
 * Replaces outdated or default terms (e.g., 'melki') with authentic custom user terms (e.g., 'merki'),
 * and appends highly relevant terms from the RAG knowledge base.
 */
export function groundScenarioWithRAG(
  scenario: Scenario,
  corpus: RAGCorpusItem[]
): GroundedScenarioResult {
  if (!scenario || !corpus || corpus.length === 0) {
    return { scenario, groundedCount: 0, groundedTerms: [] };
  }

  const groundedTermsSet = new Set<string>();

  // Map of patterns to replace in Sranan text (e.g., melki -> merki, or matching Dutch/English words)
  const replacementRules: { fromPattern: RegExp; replacement: string; ragItem: RAGCorpusItem }[] = [];

  // Always add strict greeting correction rules for Sranantongo
  replacementRules.push({
    fromPattern: /\bseryusu\s+odi\b/gi,
    replacement: 'switi kon',
    ragItem: { id: 'rule_seryusu', title: 'Greeting Rule', category: 'dictionary', srananText: 'Switi kon', translation: 'Warm welcome', tags: ['rule'], dateAdded: '2026-08-06' }
  });

  corpus.forEach((item) => {
    if (!item.srananText) return;
    const sranan = item.srananText.trim();
    const transLower = (item.translation || '').toLowerCase();
    const notesLower = (item.usageNotes || '').toLowerCase();

    // Check if RAG item refers to milk/melk
    if (transLower.includes('milk') || transLower.includes('melk') || notesLower.includes('milk') || notesLower.includes('melk') || sranan.toLowerCase().includes('merki')) {
      replacementRules.push({
        fromPattern: /\b(melki|melk)\b/gi,
        replacement: 'merki',
        ragItem: item
      });
    }

    // Check general word boundaries for short custom terms
    const cleanKey = normalizeSrananKey(sranan);
    if (cleanKey && cleanKey.length > 2 && sranan.split(/\s+/).length <= 3) {
      replacementRules.push({
        fromPattern: new RegExp(`\\b${cleanKey}\\b`, 'gi'),
        replacement: sranan.toLowerCase(),
        ragItem: item
      });
    }
  });

  // Helper to fix mid-sentence upper-cases like "wan koffie nanga Go bai" -> "wan koffie nanga go bai"
  const fixMidSentenceCapitals = (str: string): string => {
    if (!str) return str;
    return str.replace(/([a-z0-9,])\s+([A-Z][a-z]+)/g, (match, prev, word) => {
      // Don't lowercase proper nouns if known, but fix standard words
      return `${prev} ${word.toLowerCase()}`;
    });
  };

  // 1. Ground Key Vocabulary
  const rawKeyVocab = scenario.keyVocabulary || [];
  let groundedCount = 0;

  const updatedKeyVocab = rawKeyVocab.map((vocab) => {
    let wordText = vocab.word;
    let isFromRag = false;
    let matchedRagItem: RAGCorpusItem | null = null;

    // Apply replacement rules
    replacementRules.forEach(({ fromPattern, replacement, ragItem }) => {
      if (fromPattern.test(wordText)) {
        wordText = wordText.replace(fromPattern, (match) => {
          // preserve capitalization if original word was capitalized
          if (match[0] === match[0].toUpperCase()) {
            return replacement.charAt(0).toUpperCase() + replacement.slice(1);
          }
          return replacement.toLowerCase();
        });
        wordText = fixMidSentenceCapitals(wordText);
        isFromRag = true;
        matchedRagItem = ragItem;
        groundedTermsSet.add(replacement);
      }
    });

    // Also check direct translation concept match in corpus
    if (!isFromRag) {
      const vocabTransLower = vocab.translation.toLowerCase();
      const directMatch = corpus.find((c) => {
        const cTrans = (c.translation || '').toLowerCase();
        const cNotes = (c.usageNotes || '').toLowerCase();
        return (
          (vocabTransLower.includes('milk') && (cTrans.includes('milk') || cTrans.includes('melk') || cNotes.includes('milk'))) ||
          (vocabTransLower.includes('coffee') && (cTrans.includes('coffee') || cTrans.includes('koffie'))) ||
          (vocabTransLower.includes('bill') && (cTrans.includes('bill') || cTrans.includes('rekening'))) ||
          (vocabTransLower.includes('sugar') && (cTrans.includes('sugar') || cTrans.includes('suiker')))
        );
      });

      if (directMatch) {
        const ragSranan = directMatch.srananText.trim();
        if (vocab.word.toLowerCase().includes('melki') && ragSranan.toLowerCase().includes('merki')) {
          wordText = vocab.word.replace(/melki/gi, 'merki');
        } else if (ragSranan.split(/\s+/).length <= 4) {
          wordText = ragSranan;
        } else {
          wordText = vocab.word.replace(/melki/gi, 'merki');
        }
        wordText = fixMidSentenceCapitals(wordText);
        isFromRag = true;
        matchedRagItem = directMatch;
        groundedTermsSet.add('merki');
      }
    }

    if (isFromRag) {
      groundedCount++;
      return {
        ...vocab,
        word: wordText,
        phonetic: matchedRagItem?.phonetic || vocab.phonetic,
        translation: matchedRagItem ? `${vocab.translation} (RAG: ${matchedRagItem.srananText})` : vocab.translation,
        isFromRag: true
      };
    }

    return vocab;
  });

  // Search RAG corpus for top relevant additional items for this scenario topic
  const scenarioQuery = `${scenario.title} ${scenario.description} ${scenario.category} coffee milk drink bill food`;
  const relevantSnippets = searchCorpus(scenarioQuery, corpus, 4);

  const extraVocabFromRag: { word: string; phonetic: string; translation: string; isFromRag?: boolean }[] = [];
  relevantSnippets.forEach((snippet) => {
    // Only include snippets that represent actual Sranan terms or short phrases (<= 6 words)
    let srananText = snippet.srananText.trim();
    if (!srananText) return;

    // If srananText contains a colon like "Pom: Traditional festive dish", split into title & translation
    let displayWord = srananText;
    let extraTranslation = snippet.translation;

    if (srananText.includes(':')) {
      const parts = srananText.split(':');
      displayWord = parts[0].trim();
      extraTranslation = `${parts.slice(1).join(':').trim()} ${snippet.translation}`.trim();
    } else if (srananText.length > 40 || srananText.split(/\s+/).length > 6) {
      // Long sentence/note - extract short phrase or title if possible
      const words = srananText.split(/\s+/);
      displayWord = words.slice(0, 4).join(' ') + '...';
      extraTranslation = `${srananText} - ${snippet.translation}`;
    }

    const srananNorm = normalizeSrananKey(displayWord);
    const exists = updatedKeyVocab.some(
      (v) => normalizeSrananKey(v.word) === srananNorm || v.word.toLowerCase().includes(srananNorm)
    );

    if (!exists && snippet.similarityScore > 20) {
      extraVocabFromRag.push({
        word: displayWord,
        phonetic: snippet.phonetic || '',
        translation: extraTranslation,
        isFromRag: true
      });
      groundedTermsSet.add(displayWord);
      groundedCount++;
    }
  });

  // 2. Ground Common Phrases
  const rawPhrases = scenario.commonPhrases || [];
  const updatedPhrases = rawPhrases.map((phrase) => {
    let phraseText = phrase.phrase;
    let phraseIsRag = false;

    replacementRules.forEach(({ fromPattern, replacement }) => {
      if (fromPattern.test(phraseText)) {
        phraseText = phraseText.replace(fromPattern, (match) => {
          if (match[0] === match[0].toUpperCase()) {
            return replacement.charAt(0).toUpperCase() + replacement.slice(1);
          }
          return replacement.toLowerCase();
        });
        phraseText = fixMidSentenceCapitals(phraseText);
        phraseIsRag = true;
        groundedTermsSet.add(replacement);
      }
    });

    return {
      ...phrase,
      phrase: phraseText,
      isFromRag: phraseIsRag
    };
  });

  const groundedScenario: Scenario = {
    ...scenario,
    keyVocabulary: [...updatedKeyVocab, ...extraVocabFromRag],
    commonPhrases: updatedPhrases
  };

  return {
    scenario: groundedScenario,
    groundedCount,
    groundedTerms: Array.from(groundedTermsSet)
  };
}
