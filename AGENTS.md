# AGENTS.md - Antigravity & AI Assistant Guidelines

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

## 📐 Guidelines for AI Agents

1. **Imports & Types**: Always maintain strict TypeScript types defined in `src/types.ts`.
2. **Component Refactoring**: Keep UI components under 300 lines of code. Split into smaller sub-components when necessary.
3. **Gemini Latency**: Keep context windows conservative and set `temperature: 0.0` for structured output API endpoints to minimize latency.
4. **Git Discipline**: Push tested changes to `main` branch.
