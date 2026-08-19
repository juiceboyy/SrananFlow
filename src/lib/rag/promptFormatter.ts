import { GroundedSnippet } from '../../types';

/**
 * Formats retrieved snippets into system prompt instructions with strict anti-hallucination rules.
 */
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
The following authentic Sranantongo terminology, dictionary entries, proverbs (odo's), grammar patterns, and phonetic guides were retrieved from the custom grounding corpus.

STRICT GROUNDING & LOW-RESOURCE LANGUAGE MANDATE:
1. Sranantongo is a Low-Resource Language. You MUST ONLY use authentic, verified Sranantongo vocabulary and expressions that are directly grounded in the retrieved RAG Corpus entries below or standard verified Sranantongo lexicon.
2. ABSOLUTELY NO INVENTED WORDS OR PSEUDO-COMPOUNDS: For cold water, STRICTLY use "kowru watra" or "kowru dringi". NEVER use "kold", "koudi", "koudy", "kewti watra", or "koto watra".
3. When providing corrections or suggested responses (hints), verify that every word is authentic Sranantongo supported by the RAG corpus. Do NOT substitute user input with fake pseudo-words.

RETRIEVED RAG CONTEXT:
${snippetsFormatted}
`;
}
