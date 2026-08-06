/**
 * Google Cloud TTS SSML Transformation & Sanitization Layer
 *
 * Formats LLM responses and Sranantongo / domain text into valid SSML payloads
 * with strictly sanitized <phoneme alphabet="ipa" ph="..."> tags for Google Cloud Text-to-Speech API.
 */

/**
 * Escapes special XML characters in text nodes to prevent XML parsing failures.
 * Preserves standard XML entities if already escaped.
 */
export function sanitizeXmlText(text: string): string {
  if (!text) return '';
  // Avoid double-escaping existing valid XML entities
  return text
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Strictly sanitizes IPA phoneme attribute values for ph="..." inside <phoneme> tags.
 * Ensures quotes, ampersands, and XML characters are escaped safely.
 */
export function sanitizeIpaPhoneme(ph: string): string {
  if (!ph) return '';
  return ph
    .trim()
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/[\x00-\x1F\x7F]/g, ''); // Remove non-printable control characters
}

/**
 * Creates a valid <phoneme> SSML element with sanitized parameters.
 */
export function wrapInPhoneme(word: string, ipaPhoneme: string, alphabet = 'ipa'): string {
  const sanitizedWord = sanitizeXmlText(word);
  const sanitizedPh = sanitizeIpaPhoneme(ipaPhoneme);
  const sanitizedAlphabet = sanitizeXmlText(alphabet || 'ipa');
  return `<phoneme alphabet="${sanitizedAlphabet}" ph="${sanitizedPh}">${sanitizedWord}</phoneme>`;
}

/**
 * Ensures the SSML content is enclosed in top-level <speak>...</speak> tags.
 */
export function wrapInSpeak(ssmlContent: string): string {
  const trimmed = (ssmlContent || '').trim();
  if (trimmed.startsWith('<speak>') && trimmed.endsWith('</speak>')) {
    return trimmed;
  }
  // Strip outer <speak> if partially present or duplicate
  const cleanContent = trimmed
    .replace(/^<speak\b[^>]*>/i, '')
    .replace(/<\/speak>$/i, '')
    .trim();

  return `<speak>${cleanContent}</speak>`;
}

/**
 * Scans input text and replaces matching target words with <phoneme> SSML tags,
 * sanitizing all surrounding plain text and wrapping the final payload in <speak>...</speak>.
 */
export function buildSsmlFromText(
  text: string,
  phonemeMap?: Record<string, string>,
  options: { alphabet?: string } = {}
): string {
  if (!text) return '<speak></speak>';

  const alphabet = options.alphabet || 'ipa';

  // If text already contains XML/SSML tags (e.g. LLM generated SSML directly)
  if (/<(speak|phoneme|break|prosody|emphasis)\b[^>]*>/i.test(text)) {
    return parseAndSanitizeSsml(text, alphabet);
  }

  if (!phonemeMap || Object.keys(phonemeMap).length === 0) {
    return wrapInSpeak(sanitizeXmlText(text));
  }

  // Build a regex to match words in phonemeMap safely
  const escapeRegex = (s: string) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const sortedKeys = Object.keys(phonemeMap).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${sortedKeys.map(escapeRegex).join('|')})\\b`, 'gi');

  let lastIndex = 0;
  let resultSsml = '';
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchedWord = match[0];
    const dictKey = Object.keys(phonemeMap).find(
      (k) => k.toLowerCase() === matchedWord.toLowerCase()
    );
    const ipaPh = dictKey ? phonemeMap[dictKey] : null;

    // Append preceding text sanitized
    const textSegment = text.slice(lastIndex, matchIndex);
    resultSsml += sanitizeXmlText(textSegment);

    if (ipaPh) {
      resultSsml += wrapInPhoneme(matchedWord, ipaPh, alphabet);
    } else {
      resultSsml += sanitizeXmlText(matchedWord);
    }

    lastIndex = pattern.lastIndex;
  }

  // Append remaining text
  resultSsml += sanitizeXmlText(text.slice(lastIndex));

  return wrapInSpeak(resultSsml);
}

/**
 * Parses existing SSML/XML string, sanitizing phoneme tags & raw text nodes while ensuring well-formedness
 * and wrapping in <speak>...</speak>.
 */
export function parseAndSanitizeSsml(ssmlInput: string, defaultAlphabet = 'ipa'): string {
  if (!ssmlInput) return '<speak></speak>';

  // Regex to tokenize SSML tags vs text
  const tagRegex = /<([^>]+)>/g;
  let lastIndex = 0;
  let sanitizedBody = '';
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(ssmlInput)) !== null) {
    const textChunk = ssmlInput.substring(lastIndex, match.index);
    if (textChunk) {
      sanitizedBody += sanitizeXmlText(textChunk);
    }

    const fullTag = match[0];
    const tagContent = match[1].trim();

    if (/^speak$/i.test(tagContent) || /^\/speak$/i.test(tagContent)) {
      // Ignore inner <speak> and </speak> tags as we wrap at the top level
    } else if (/^phoneme\b/i.test(tagContent)) {
      // Extract alphabet and ph attributes from phoneme tag
      const alphabetMatch = tagContent.match(/alphabet=["']([^"']+)["']/i);
      const phMatch = tagContent.match(/ph=["']([^"']+)["']/i);

      const alphabet = alphabetMatch ? alphabetMatch[1] : defaultAlphabet;
      const ph = phMatch ? phMatch[1] : '';

      sanitizedBody += `<phoneme alphabet="${sanitizeXmlText(alphabet)}" ph="${sanitizeIpaPhoneme(ph)}">`;
    } else if (/^\/phoneme$/i.test(tagContent)) {
      sanitizedBody += '</phoneme>';
    } else if (/^(break|prosody|emphasis|say-as|sub|audio|voice|p|s)\b/i.test(tagContent) || /^\/(prosody|emphasis|say-as|sub|voice|p|s)$/i.test(tagContent)) {
      // Preserve standard SSML control tags safely
      sanitizedBody += fullTag;
    } else {
      // Escape unrecognized XML tags to prevent breaking TTS payload
      sanitizedBody += sanitizeXmlText(fullTag);
    }

    lastIndex = tagRegex.lastIndex;
  }

  const trailingText = ssmlInput.substring(lastIndex);
  if (trailingText) {
    sanitizedBody += sanitizeXmlText(trailingText);
  }

  return wrapInSpeak(sanitizedBody);
}

/**
 * Main SSML Builder export to construct TTS request payload
 */
export function buildSsmlPayload(
  text: string,
  options: {
    phonemeMap?: Record<string, string>;
    alphabet?: string;
  } = {}
): { ssml: string } {
  const ssmlContent = buildSsmlFromText(text, options.phonemeMap, { alphabet: options.alphabet });
  return { ssml: ssmlContent };
}


