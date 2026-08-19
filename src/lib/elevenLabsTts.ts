/**
 * ElevenLabs Multilingual v2 TTS Client & Acoustic Phonetic Preprocessor
 * Provides ultra-realistic neural speech synthesis for Sranantongo with
 * custom voice support, acoustic [ŋ] phoneme steering, and production reliability.
 */

export interface ElevenLabsVoiceConfig {
  voiceId: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
}

// Curated default voices that excel with multilingual pronunciation
export const ELEVENLABS_VOICE_MAP: Record<string, string> = {
  // Male Voices
  Puck: 'JBFqnCBsd6RMkjVDRZzb', // George - warm, rich, versatile multilingual
  George: 'JBFqnCBsd6RMkjVDRZzb',
  Adam: 'pNInz6obpgDQGcFmaJgB', // Adam - deep, conversational
  Daniel: 'onwK4e9ZLuTAKqWW03F9', // Daniel - steady, clear
  Callum: 'N2lVS1w4EtoT3dr4eOWO', // Callum - crisp, articulated

  // Female Voices
  Aoede: '21m00Tcm4TlvDq8ikWAM', // Rachel - calm, clear, excellent multilingual
  Rachel: '21m00Tcm4TlvDq8ikWAM',
  Bella: 'EXAVITQu4vr4xnSDxMaL', // Bella - bright, expressive
  Charlotte: 'XB0fDUnXU5powFXDhCwa', // Charlotte - smooth, natural
  Sarah: 'EXAVITQu4vr4xnSDxMaL'
};

export const DEFAULT_ELEVENLABS_VOICE_ID = 'JBFqnCBsd6RMkjVDRZzb'; // George
export const DEFAULT_ELEVENLABS_MODEL_ID = 'eleven_multilingual_v2';

/**
 * Resolves a voice name or ID to a valid ElevenLabs voice ID
 */
export function resolveElevenLabsVoiceId(voiceNameOrId?: string): string {
  const envDefault = process.env.ELEVENLABS_DEFAULT_VOICE_ID;
  if (!voiceNameOrId) {
    return envDefault || DEFAULT_ELEVENLABS_VOICE_ID;
  }

  // If already a 20+ char ElevenLabs Voice ID
  if (voiceNameOrId.length >= 18 && /^[a-zA-Z0-9_-]+$/.test(voiceNameOrId)) {
    return voiceNameOrId;
  }

  // Check lookup map
  const mapped = ELEVENLABS_VOICE_MAP[voiceNameOrId];
  if (mapped) return mapped;

  return envDefault || DEFAULT_ELEVENLABS_VOICE_ID;
}

/**
 * Prepares Sranantongo text for neural TTS with acoustic phoneme hints
 * Enforces pure velar nasal [ŋ] transitions and avoids hard plosives
 */
export function prepareElevenLabsAcousticTranscript(text: string, isSranan = true): string {
  if (!isSranan || !text) return text;

  return text
    // Velar nasal rules: convert 'ngi' -> 'ng-y' and 'nga' -> 'ng-ah' for pure [ŋ] glide
    .replace(/\b([a-zA-Z]+)ngi\b/gi, '$1ng-y')
    .replace(/\b([a-zA-Z]+)nga\b/gi, '$1ng-ah')
    // Open vowel and lexicon refinements
    .replace(/\bbrede\b/gi, 'bred-e')
    .replace(/\balesi\b/gi, 'ah-lay-see')
    .replace(/\bseryusu\s+odi\b/gi, 'switi kon')
    .replace(/\bkoudi\b/gi, 'kowru')
    .replace(/\bkoudy\b/gi, 'kowru')
    .replace(/\bkewti\s+watra\b/gi, 'kowru watra');
}

/**
 * Synthesizes audio using ElevenLabs REST API
 */
export async function synthesizeElevenLabsAudio(options: {
  text: string;
  voiceId?: string;
  isSranan?: boolean;
  apiKey?: string;
  modelId?: string;
}): Promise<{ buffer: Buffer; mimeType: string; voiceId: string } | null> {
  const apiKey = options.apiKey || process.env.ELEVENLABS_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'MY_ELEVENLABS_API_KEY') {
    return null;
  }

  const voiceId = resolveElevenLabsVoiceId(options.voiceId);
  const modelId = options.modelId || process.env.ELEVENLABS_MODEL_ID || DEFAULT_ELEVENLABS_MODEL_ID;
  const processedText = prepareElevenLabsAcousticTranscript(options.text, options.isSranan ?? true);

  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const payload = {
    text: processedText,
    model_id: modelId,
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.15,
      use_speaker_boost: true
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey.trim(),
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    let parsedError: any = {};
    try {
      parsedError = JSON.parse(errorText);
    } catch {
      parsedError = { detail: errorText };
    }

    const errorMessage = parsedError?.detail?.message || parsedError?.detail || response.statusText;
    const error = new Error(`ElevenLabs API error (${response.status}): ${errorMessage}`);
    (error as any).status = response.status;
    (error as any).details = parsedError;
    throw error;
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return {
    buffer,
    mimeType: 'audio/mp3',
    voiceId
  };
}
