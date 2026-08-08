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

* **`dringi`**: Pronounce strictly as **`dring-ee`** with a smooth nasal "ng" sound (as in "sing"), NEVER with a hard "k" or "nk" sound.
* **`tangi`**: Pronounce as **`tahn-gee`** (smooth nasal "ng").
* **`singi`**: Pronounce as **`sing-ee`** (smooth nasal "ng").
* **`manga` / `nanga`**: Smooth nasal "ng" sound.
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
