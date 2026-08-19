import { Scenario, RAGCorpusItem } from '../../types';
import { normalizeSrananKey } from './vocabulary';
import { searchCorpus } from './scoring';

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

  // Map of patterns to replace in Sranan text
  const replacementRules: { fromPattern: RegExp; replacement: string; ragItem: RAGCorpusItem }[] = [];

  // Always add strict greeting correction rules for Sranantongo
  replacementRules.push({
    fromPattern: /\bseryusu\s+odi\b/gi,
    replacement: 'switi kon',
    ragItem: {
      id: 'rule_seryusu',
      title: 'Greeting Rule',
      category: 'dictionary',
      srananText: 'Switi kon',
      translation: 'Warm welcome',
      tags: ['rule'],
      dateAdded: '2026-08-06'
    }
  });

  corpus.forEach((item) => {
    if (!item.srananText) return;
    const sranan = item.srananText.trim();
    const transLower = (item.translation || '').toLowerCase();
    const notesLower = (item.usageNotes || '').toLowerCase();

    // Check if RAG item refers to milk/melk
    if (
      transLower.includes('milk') ||
      transLower.includes('melk') ||
      notesLower.includes('milk') ||
      notesLower.includes('melk') ||
      sranan.toLowerCase().includes('merki')
    ) {
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

  const fixMidSentenceCapitals = (str: string): string => {
    if (!str) return str;
    return str.replace(/([a-z0-9,])\s+([A-Z][a-z]+)/g, (match, prev, word) => {
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

    replacementRules.forEach(({ fromPattern, replacement, ragItem }) => {
      if (fromPattern.test(wordText)) {
        wordText = wordText.replace(fromPattern, (match) => {
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
    let srananText = snippet.srananText.trim();
    if (!srananText) return;

    let displayWord = srananText;
    let extraTranslation = snippet.translation;

    if (srananText.includes(':')) {
      const parts = srananText.split(':');
      displayWord = parts[0].trim();
      extraTranslation = `${parts.slice(1).join(':').trim()} ${snippet.translation}`.trim();
    } else if (srananText.length > 40 || srananText.split(/\s+/).length > 6) {
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
