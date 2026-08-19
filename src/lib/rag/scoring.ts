import { RAGCorpusItem, GroundedSnippet } from '../../types';
import { SRANAN_STOP_WORDS, normalizeSrananKey } from './vocabulary';

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Calculates similarity between a search query and a RAG corpus item.
 */
export function calculateSimilarityScore(
  query: string,
  item: RAGCorpusItem
): { score: number; matchedKeywords: string[] } {
  if (!query || !query.trim()) {
    return { score: 0, matchedKeywords: [] };
  }

  const cleanQuery = query.toLowerCase().replace(/[^\w\s\u00C0-\u024F]/g, ' ');
  const queryTokens = Array.from(
    new Set(
      cleanQuery
        .split(/\s+/)
        .filter((t) => t.length > 1 && !SRANAN_STOP_WORDS.has(t))
    )
  );

  if (queryTokens.length === 0) {
    return { score: 0, matchedKeywords: [] };
  }

  const titleLower = (item.title || '').toLowerCase();
  const srananLower = (item.srananText || '').toLowerCase();
  const transLower = (item.translation || '').toLowerCase();
  const notesLower = (item.usageNotes || '').toLowerCase();
  const tagsLower = (item.tags || []).map((t) => t.toLowerCase());

  let score = 0;
  const matchedKeywords: string[] = [];

  for (const token of queryTokens) {
    const wordBoundaryRegex = new RegExp(`\\b${escapeRegExp(token)}\\b`, 'i');
    let matched = false;

    if (tagsLower.includes(token)) {
      score += 25;
      matched = true;
    }

    if (wordBoundaryRegex.test(titleLower)) {
      score += 30;
      matched = true;
    } else if (titleLower.includes(token)) {
      score += 15;
      matched = true;
    }

    if (wordBoundaryRegex.test(srananLower)) {
      score += 35;
      matched = true;
    } else if (srananLower.includes(token)) {
      score += 15;
      matched = true;
    }

    if (wordBoundaryRegex.test(transLower)) {
      score += 20;
      matched = true;
    } else if (transLower.includes(token)) {
      score += 10;
      matched = true;
    }

    if (wordBoundaryRegex.test(notesLower)) {
      score += 15;
      matched = true;
    }

    if (matched && !matchedKeywords.includes(token)) {
      matchedKeywords.push(token);
    }
  }

  const trimmedQuery = cleanQuery.trim();
  if (trimmedQuery.length > 2) {
    if (srananLower.includes(trimmedQuery)) score += 45;
    if (titleLower.includes(trimmedQuery)) score += 40;
  }

  if (item.category === 'dictionary' || item.category === 'dialogue') {
    score += 20;
  } else if (item.category === 'proverb') {
    const isProverbQuery = cleanQuery.includes('odo') || cleanQuery.includes('proverb') || cleanQuery.includes('spreekwoord');
    if (!isProverbQuery && matchedKeywords.length < 2) {
      score = Math.max(0, score - 30);
    }
  }

  return { score: Math.min(100, Math.max(0, score)), matchedKeywords };
}

/**
 * Searches the RAG corpus for the most relevant snippets.
 */
export function searchCorpus(
  query: string,
  corpus: RAGCorpusItem[],
  maxResults = 5,
  categoryFilter?: string
): GroundedSnippet[] {
  if (!query || !query.trim() || !corpus || corpus.length === 0) {
    return (corpus || []).slice(0, maxResults).map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      srananText: item.srananText,
      translation: item.translation,
      phonetic: item.phonetic,
      similarityScore: 40
    }));
  }

  const filtered = categoryFilter && categoryFilter !== 'all'
    ? corpus.filter((item) => item.category === categoryFilter)
    : corpus;

  const scored = filtered.map((item) => {
    const { score, matchedKeywords } = calculateSimilarityScore(query, item);
    return { item, score, matchedKeywords };
  });

  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.filter((s) => s.score >= 15).slice(0, maxResults);

  if (topMatches.length === 0) {
    const dictFallback = filtered
      .filter((s) => s.category === 'dictionary' || s.category === 'dialogue')
      .slice(0, Math.min(3, maxResults));

    const fallbackList = dictFallback.length > 0 ? dictFallback : filtered.slice(0, Math.min(3, maxResults));

    return fallbackList.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      srananText: item.srananText,
      translation: item.translation,
      phonetic: item.phonetic,
      similarityScore: 35
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

/**
 * Accurately filters grounding snippets to ONLY authentic dictionary entries,
 * vocabulary terms, grammar rules, or proverbs that actually ground the generated Sranantongo reply or user query.
 * Prioritizes direct dictionary definitions (e.g. kronto, merki, brede, te, nyan) and prevents spurious proverb matches.
 */
export function filterSnippetsToActualUsage(
  replyText: string,
  userQuery: string,
  snippets: GroundedSnippet[],
  corpus: RAGCorpusItem[]
): GroundedSnippet[] {
  if (!replyText || !replyText.trim()) return [];

  const combinedText = `${replyText} ${userQuery}`.toLowerCase().replace(/[^\w\s\u00C0-\u024F]/g, ' ');
  const tokens = Array.from(
    new Set(
      combinedText
        .split(/\s+/)
        .filter((t) => t.length >= 2 && !SRANAN_STOP_WORDS.has(t))
    )
  );

  if (tokens.length === 0) return [];

  const candidateMap = new Map<string, { item: RAGCorpusItem | GroundedSnippet; score: number; cleanKey: string }>();

  const testCandidate = (cand: RAGCorpusItem | GroundedSnippet) => {
    if (candidateMap.has(cand.id)) return;

    const srananLower = (cand.srananText || '').toLowerCase();
    const titleLower = (cand.title || '').toLowerCase();
    const cat = cand.category || 'dictionary';

    let matchScore = 0;
    let contentTokenMatches = 0;

    for (const token of tokens) {
      const boundaryRegex = new RegExp(`\\b${escapeRegExp(token)}\\b`, 'i');

      if (srananLower === token || titleLower === `dictionary: ${token} (noun)` || titleLower === `dictionary: ${token} (verb)`) {
        matchScore += 120;
        contentTokenMatches++;
      } else if (boundaryRegex.test(titleLower)) {
        matchScore += 60;
        contentTokenMatches++;
      } else if (boundaryRegex.test(srananLower)) {
        matchScore += 40;
        contentTokenMatches++;
      }
    }

    const cleanCandSranan = srananLower.replace(/[^\w\s]/g, ' ').trim();
    if (cleanCandSranan.length > 3 && combinedText.includes(cleanCandSranan)) {
      matchScore += 80;
    }

    if (cat === 'dictionary' || cat === 'vocabulary') {
      matchScore += 30;
    } else if (cat === 'grammar') {
      if (contentTokenMatches > 0) matchScore += 20;
    } else if (cat === 'proverb') {
      const isProverbQuoted = combinedText.includes(cleanCandSranan) || titleLower.includes(combinedText);
      if (isProverbQuoted) {
        matchScore += 90;
      } else if (contentTokenMatches >= 3) {
        matchScore += 25;
      } else {
        matchScore = 0;
      }
    }

    if (matchScore > 0 && contentTokenMatches > 0) {
      const cleanKey = normalizeSrananKey(cand.srananText || cand.title);
      candidateMap.set(cand.id, { item: cand, score: matchScore, cleanKey });
    }
  };

  for (const snippet of snippets) testCandidate(snippet);
  if (corpus && corpus.length > 0) {
    for (const item of corpus) testCandidate(item);
  }

  const scoredCandidates = Array.from(candidateMap.values());
  scoredCandidates.sort((a, b) => b.score - a.score);

  // Deduplicate by cleanKey (headword) so we don't display duplicate cards for the same word
  const seenHeadwords = new Set<string>();
  const uniqueTopCandidates: GroundedSnippet[] = [];

  for (const c of scoredCandidates) {
    const headword = c.cleanKey || c.item.id;
    if (!seenHeadwords.has(headword)) {
      seenHeadwords.add(headword);
      uniqueTopCandidates.push({
        id: c.item.id,
        title: c.item.title,
        category: c.item.category,
        srananText: c.item.srananText,
        translation: c.item.translation,
        phonetic: c.item.phonetic,
        similarityScore: Math.min(100, Math.max(45, c.score))
      });
      if (uniqueTopCandidates.length >= 5) break;
    }
  }

  return uniqueTopCandidates;
}
