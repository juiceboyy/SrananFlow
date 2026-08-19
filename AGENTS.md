# SrananFlow Project Guidelines & Agent Instructions

Welcome to **SrananFlow**, an interactive AI-powered language learning platform for Sranantongo built with React, Express, Vite, Tailwind CSS, and Google Gemini AI (`@google/genai`).

---

## 🚀 Quick Start & Commands

- **Development Server**: `npm run dev` (runs full-stack backend/frontend server via `tsx server.ts`)
- **Build Production**: `npm run build` (builds client assets via Vite & server bundle via esbuild)
- **Preview Build**: `npm run preview`
- **Lint / Typecheck**: `npm run lint` (`tsc --noEmit`)

---

## 🛠️ Architecture & Tech Stack

1. **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Framer Motion (`motion`).
2. **Backend**: Express.js server (`server.ts`) hosting API routes & static serving.
3. **AI Logic**: Google Gemini API (`@google/genai`) for conversational partner, pronunciation feedback, and grammar analysis.
4. **Data & Storage**: Firebase SDK & local storage utilities (`src/lib/firebaseStore.ts`, `src/lib/storage.ts`).

---

## 📁 Key File Structure

- `server.ts` - Main Express server & API endpoints.
- `src/App.tsx` - Main application container & tab navigation.
- `src/components/`
  - `ConversationView.tsx` - Real-time conversational partner UI.
  - `PronunciationLabView.tsx` - Speech recognition & pronunciation analysis.
  - `VocabularyView.tsx` - Vocabulary flashcards & progress tracking.
  - `ProgressDashboardView.tsx` - Analytics & achievements dashboard.
  - `CorpusManagerView.tsx` - Custom learning corpus & RAG configuration.
- `src/data/` - Static datasets (scenarios, achievements, default corpus, languages).
- `src/lib/` - Audio processing utilities, RAG corpus logic, storage drivers.

---

## 1. Sranantongo Language Authenticity & Anti-Hallucination Rules

Sranantongo is a Low-Resource Language. AI models must strictly adhere to authentic Surinamese Sranantongo vocabulary and grammar, avoiding word-for-word translations, Anglicisms, Neerlandisms, and pseudo-Sranan morphological overgeneralisations.

### Strict Vocabulary & Usage Rules
* **Cold / Cold Water**:
  * ✅ **`kowru watra`** (Cold water) / **`kowru dringi`** (Cold drink) / **`kowru`** (Cold)
  * ❌ NEVER use **`koudi`**, **`koudy`**, or **`kewti watra`** (these are AI hallucinations caused by forced Dutch suffixing).
  * ℹ️ *Note*: `koti watra` means to cross a body of water, not cold water.
* **Greetings & Welcomes**:
  * ✅ **`wan bigi odi`** (Warm / hearty greeting), **`switi odi`**, **`wan switi kon`**, **`bun kon`**, **`Fa waka!`**
  * ❌ NEVER use **`seryusu odi`** or pair `seryusu` with greetings (`seryusu` means solemn, grave, or strict—never "warm" or "sincere").
* **Dining Preferences**:
  * ✅ **`sa wani fu nyan`** (Would like to eat) / **`wani nyan`**
  * ❌ NEVER use **`lobi fu nyan`** for asking food preferences (`lobi` denotes deep romantic or personal affection, not a polite dining choice).

---

## 2. Gemini Text-To-Speech (TTS) Pronunciation Rules

When generating audio via Gemini TTS or constructing Director's Notes for speech synthesis, ensure the following phonetic guidelines are passed:

* **Strict Velar Nasal "NG" Rule (PURE [ŋ], ZERO Plosives, NO Glottal Stops)**:
  * Whenever "ng" is followed by a vowel (e.g., `grantangi`, `tangi`, `dringi`, `singi`, `nanga`, `manga`), pronounce "ng" as a smooth, continuous velar nasal [ŋ] (like in English "singer" [ˈsɪŋər], "stringy" [ˈstrɪŋi], "clingy" [ˈklɪŋi]) gliding seamlessly directly into the vowel without any pause, syllable break, or plosive release.
  * NEVER insert a glottal stop [ʔ], NEVER pause before the vowel, and ABSOLUTELY NEVER pronounce a hard "g" [ɡ] or "k" [k].
  * ❌ NEVER rewrite transcripts to `-gee` (e.g. `dringee`, `tangee`) because `-gee` induces the English neural TTS engine to pronounce a hard "g" / [ɡ] or "DRING-gi" / "DRING-gee".
  * ✅ **Universal Acoustic Transcript Mapping**: In `server.ts`, all words ending in `-ngi` are mapped to `-ng-y` (e.g. `dring-y`, `tang-y`, `grantang-y`, `sing-y`) and `-nga` to `-ng-ah` (e.g. `nang-ah`, `mang-ah`). This forces neural TTS engines to apply the English velar nasal rule (as in *stringy*, *tangy*), guaranteeing pure [ŋ] without hard [ɡ] plosives across all sentences, multi-word phrases, and corpus cards.
* **`dringi`**: Pronounce strictly as **`/ˈdriŋi/`** (rhymes with English *"stringy"*, smooth continuous velar nasal [ŋi] glide, zero hard "g" [ɡ], NEVER "dring-gi" or "dring-gee").
* **`grantangi` / `tangi`**: Pronounce strictly as **`/ɡranˈtaŋi/`** / **`/ˈtaŋi/`** (rhymes with English *"tangy"*, smooth continuous velar nasal [ŋi] glide, NO hard "g", NEVER "tahn-gi" or "tan-gee").
* **`singi`**: Pronounce strictly as **`/ˈsiŋi/`** (rhymes with English *"sing-y"*, smooth continuous nasal [ŋi] glide, no hard "g" or glottal stop).
* **`manga` / `nanga`**: Pronounce as **`/ˈmaŋa/`** / **`/ˈnaŋa/`** with a smooth continuous nasal [ŋa] glide, no hard "g".
* **`brede`**: Pronounce as **`BRED-e`** with a short open "e" (like English "bread").
* **`alesi`**: Pronounce as **`ah-lay-see`**.
* **`moksi`**: Pronounce as **`mok-see`**.
* **`switi`**: Pronounce as **`swee-tee`**.
* **`bun`**: Pronounce as **`boon`**.
* **`nyan` / `njanyan`**: Pronounce `ny` like the Spanish "ñ".
* **`watra`**: Pronounce as **`wah-trah`**.
* **`kowru`**: Pronounce as **`kow-roo`**.

---

## 3. RAG Corpus & Grounding Workflow

* Always pull grounding context from `DEFAULT_SRANAN_CORPUS` (`src/data/defaultCorpus.ts`) and Firestore collection `ragCorpus`.
* Format retrieved snippets into system prompts using `formatGroundingPrompt()`.
* Include `groundingMetadata` (`ragEnabled`, `sourcesCount`, `groundedSnippets`) in chat API JSON responses so the frontend can display grounding badges and sources.

---

## 4. Code & Git Guidelines for AI Assistants

1. **Imports & Types**: Always maintain strict TypeScript types defined in `src/types.ts`.
2. **Component Refactoring**: Keep UI components under 300 lines of code. Split into smaller sub-components when necessary.
3. **Gemini Latency**: Keep context windows conservative and set `temperature: 0.0` for structured output API endpoints to minimize latency.
4. **Automatic Git Push**: Push tested changes to `main` branch.

---

## 5. Strict English UI Language Requirement

* **All UI Copy**: All user interface text, button labels, badge indicators, modal titles, status notifications, and error alerts in this project must be written strictly in **English**.
* **Target Language Content Only**: Only actual target language learning materials (such as Sranantongo phrases, vocabulary, and phonetic guides) should appear in Sranantongo. Never introduce Dutch or secondary languages into UI labels or badge elements.
