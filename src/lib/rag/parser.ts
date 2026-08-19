import { RAGCorpusItem, RAGCorpusCategory } from '../../types';
import { normalizeSrananKey } from './vocabulary';

/**
 * Helper to parse raw text or CSV or word list paste into RAGCorpusItem objects with automatic deduplication
 */
export function parseBulkTextToCorpus(
  textInput: string,
  defaultCategory: RAGCorpusCategory = 'dictionary'
): Partial<RAGCorpusItem>[] {
  if (!textInput || !textInput.trim()) return [];

  // Pre-process input text to normalize line breaks and strip code block wrappers
  let rawText = textInput
    .replace(/^```[a-z]*\r?\n?/gi, '')
    .replace(/\r?\n?```$/gi, '')
    .replace(/```/g, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '');

  rawText = rawText.replace(/(?<=\S)\s+(?=\d+[\.\)]\s+[A-Za-z0-9])/g, '\n');
  rawText = rawText.replace(/(?<=\S)\s+(?=[•*-]\s+[A-Za-z0-9])/g, '\n');

  const rawLines = rawText.split(/\r?\n/);
  const results: Partial<RAGCorpusItem>[] = [];
  const seenKeys = new Set<string>();

  for (let line of rawLines) {
    line = line.trim();
    if (!line) continue;

    if (line.startsWith('#') || line.startsWith('===') || line.startsWith('---')) {
      continue;
    }

    let cleanLine = line.replace(/^[-*•\d+.\)]+\s*/, '').trim();
    cleanLine = cleanLine.replace(/^\*\*|\*\*$/g, '').replace(/^`|`$/g, '').trim();

    if (!cleanLine) continue;

    let phonFromLine: string | undefined = undefined;
    let noteFromLine: string | undefined = undefined;
    let catFromLine: RAGCorpusCategory | undefined = undefined;

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

    if (cleanLine.toLowerCase().includes('phonetic:')) {
      const match = cleanLine.match(/Phonetic:\s*([^,;\n]+)/i);
      if (match) {
        phonFromLine = match[1].trim();
        cleanLine = cleanLine.replace(/,?\s*Phonetic:\s*[^,;\n]+/i, '');
      }
    }

    if (cleanLine.toLowerCase().includes('note:')) {
      const match = cleanLine.match(/Note:\s*(.*)/i);
      if (match) {
        noteFromLine = match[1].trim();
        cleanLine = cleanLine.replace(/,?\s*Note:\s*.*/i, '');
      }
    }

    const itemCategory = catFromLine || defaultCategory;
    let itemToAdd: Partial<RAGCorpusItem> | null = null;

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
