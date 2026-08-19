/**
 * Audio playback helper for Gemini 24kHz raw PCM or standard SpeechSynthesis Web API fallback
 */

let globalAudioCtx: AudioContext | null = null;

function getAudioContext(sampleRate = 24000): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx || globalAudioCtx.state === 'closed') {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass({ sampleRate });
    }
  }
  return globalAudioCtx;
}

// Global user-gesture unlock listener for browser Web Audio policy
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume().catch(() => {});
    }
  };
  window.addEventListener('click', unlockAudio, { capture: true, passive: true });
  window.addEventListener('touchstart', unlockAudio, { capture: true, passive: true });
  window.addEventListener('keydown', unlockAudio, { capture: true, passive: true });
}

export async function playPcmAudioBase64(base64Data: string, sampleRate = 24000): Promise<boolean> {
  try {
    const audioCtx = getAudioContext(sampleRate);
    if (!audioCtx) return false;

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    // Safe 16-bit PCM little-endian conversion handling any byte length / alignment
    const pcmLength = Math.floor(bytes.length / 2);
    if (pcmLength === 0) return false;

    const float32Array = new Float32Array(pcmLength);
    const dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    for (let i = 0; i < pcmLength; i++) {
      const int16 = dataView.getInt16(i * 2, true);
      float32Array[i] = int16 / 32768.0;
    }

    const buffer = audioCtx.createBuffer(1, float32Array.length, sampleRate);
    buffer.getChannelData(0).set(float32Array);

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);

    return new Promise((resolve) => {
      source.onended = () => resolve(true);
      setTimeout(() => resolve(true), buffer.duration * 1000 + 200);
    });
  } catch (err) {
    console.warn('Failed to play PCM audio base64:', err);
    return false;
  }
}

/**
 * Fallback Web Speech Synthesis for instant low-latency speech playback
 */
export function speakTextNative(text: string, langCode: string, rate = 0.9): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    const cleanText = text
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/[*_~#`]/g, '')
      .trim();

    if (!cleanText) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const localeMap: Record<string, string> = {
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
        it: 'it-IT',
        pt: 'pt-BR',
        en: 'en-US',
        sr: 'nl-NL'
      };

      const targetLocale = localeMap[langCode] || 'nl-NL';

      const speakNow = () => {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = rate;
        utterance.lang = targetLocale;

        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const matchedVoice = voices.find(
            (v) =>
              (langCode === 'sr' &&
                (v.lang.toLowerCase().includes('sr') ||
                  v.name.toLowerCase().includes('surinam') ||
                  v.lang.toLowerCase().startsWith('nl') ||
                  v.name.toLowerCase().includes('dutch'))) ||
              v.lang === targetLocale ||
              v.lang.startsWith(targetLocale.split('-')[0])
          );
          if (matchedVoice) {
            utterance.voice = matchedVoice;
          }
        }

        if (langCode === 'sr') {
          utterance.pitch = 1.05;
          utterance.rate = rate * 0.95;
        }

        let resolved = false;
        const finish = () => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        };

        utterance.onend = finish;
        utterance.onerror = finish;

        setTimeout(finish, 8000);

        setTimeout(() => {
          window.speechSynthesis.speak(utterance);
        }, 40);
      };

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null;
          speakNow();
        };
        setTimeout(speakNow, 200);
      } else {
        speakNow();
      }
    } catch (err) {
      console.warn('Native speech synthesis error:', err);
      resolve();
    }
  });
}

export async function playAudioBase64(base64Data: string, mimeType = 'audio/pcm'): Promise<boolean> {
  try {
    if (mimeType.includes('wav') || mimeType.includes('mp3') || mimeType.includes('mpeg') || mimeType.includes('ogg')) {
      const audio = new Audio(`data:${mimeType};base64,${base64Data}`);
      return new Promise((resolve) => {
        audio.onended = () => resolve(true);
        audio.onerror = (e) => {
          console.warn('Audio element error:', e);
          resolve(false);
        };
        audio.play().then(() => {}).catch((err) => {
          console.warn('Audio play error:', err);
          resolve(false);
        });
      });
    }
    return playPcmAudioBase64(base64Data);
  } catch (err) {
    console.warn('Failed to play audio base64:', err);
    return false;
  }
}

export async function playAudioUrl(url: string): Promise<boolean> {
  try {
    const audio = new Audio(url);
    return new Promise((resolve) => {
      audio.onended = () => resolve(true);
      audio.onerror = (e) => {
        console.warn('Audio URL playback error:', e);
        resolve(false);
      };
      audio.play().then(() => {}).catch((err) => {
        console.warn('Audio URL play error:', err);
        resolve(false);
      });
    });
  } catch (err) {
    console.warn('Failed to play audio URL:', err);
    return false;
  }
}

/**
 * Universal TTS executor: uses Gemini 3.1 Flash TTS preview with MD5 server-side audio cache
 * and grounded Surinamese Sranantongo instructions.
 */
export async function playAudioForText(
  text: string,
  langCode: string,
  voiceName?: string,
  rate = 0.9,
  forceRegenerate = false
): Promise<boolean> {
  const cleanText = text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/[*_~#`]/g, '')
    .trim();

  if (!cleanText) return false;

  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: cleanText,
        voiceName,
        targetLanguage: langCode,
        forceRegenerate
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`[TTS Engine Used] Provider: ${data.provider || 'gemini-3.1-flash-tts-preview'}, Voice: ${voiceName || 'Puck'}`);

      // Try self-contained Base64 audio first (reliable in serverless environments)
      if (data.audioBase64) {
        const played = await playAudioBase64(data.audioBase64, data.mimeType || 'audio/wav');
        if (played) return true;
      }

      if (data.audioUrl) {
        const played = await playAudioUrl(data.audioUrl);
        if (played) return true;
      }
    } else {
      const errJson = await response.json().catch(() => ({}));
      console.error('Backend TTS Endpoint Returned Error:', response.status, errJson);
    }
  } catch (err) {
    console.warn('TTS fetch failed:', err);
  }

  console.warn('[TTS] Server TTS is unavailable, falling back to browser speech synthesis.');
  await speakTextNative(cleanText, langCode, rate);
  return true;
}


