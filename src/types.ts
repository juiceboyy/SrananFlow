export type LanguageCode = 'sr';

export type ProficiencyLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  defaultVoice: string;
  commonGreeting: string;
  samplePhrases: string[];
}

export type ScenarioCategory =
  | 'daily'
  | 'travel'
  | 'dining'
  | 'business'
  | 'culture'
  | 'social'
  | 'health'
  | 'freeform';

export interface ScenarioKeyVocab {
  word: string;
  phonetic: string;
  translation: string;
  isFromRag?: boolean;
}

export interface ScenarioCommonPhrase {
  phrase: string;
  translation: string;
  audioText?: string;
  isFromRag?: boolean;
}

export interface ScenarioDialogueStep {
  stepTitle: string;
  partnerPrompt: string;
  suggestedUserResponses: string[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: ScenarioCategory;
  partnerRole: string;
  userRole: string;
  location: string;
  initialGreeting: Record<string, string>;
  difficulty: ProficiencyLevel;
  icon: string;
  color: string;
  keyVocabulary?: ScenarioKeyVocab[];
  commonPhrases?: ScenarioCommonPhrase[];
  dialogueFlow?: ScenarioDialogueStep[];
  cultureTip?: string;
}

export interface Correction {
  originalText: string;
  suggestedText: string;
  explanation: string;
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'politeness';
}

export interface ExtractedWord {
  word: string;
  phonetic: string;
  translation: string;
  contextSentence: string;
}

export type RAGCorpusCategory = 'dictionary' | 'proverb' | 'grammar' | 'dialogue' | 'cultural' | 'pronunciation';

export interface RAGCorpusItem {
  id: string;
  title: string;
  category: RAGCorpusCategory;
  srananText: string;
  translation: string;
  phonetic?: string;
  usageNotes?: string;
  tags: string[];
  source?: string;
  dateAdded: string;
}

export interface GroundedSnippet {
  id: string;
  title: string;
  category: string;
  srananText: string;
  translation: string;
  phonetic?: string;
  similarityScore: number;
}

export interface GroundingMetadata {
  ragEnabled: boolean;
  sourcesCount: number;
  groundedSnippets: GroundedSnippet[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'partner' | 'system';
  text: string;
  translation?: string;
  audioUrl?: string;
  timestamp: string;
  corrections?: Correction[];
  extractedVocab?: ExtractedWord[];
  isAudioInput?: boolean;
  groundingMetadata?: GroundingMetadata;
}

export type VocabStatus = 'new' | 'learning' | 'mastered';

export interface VocabItem {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  exampleSentence: string;
  exampleTranslation: string;
  language: LanguageCode;
  status: VocabStatus;
  dateAdded: string;
  lastReviewed?: string;
  nextReviewDate?: string;
  reviewCount: number;
  correctCount: number;
}

export interface WordScore {
  word: string;
  score: number; // 0-100
  expectedPhonetic: string;
  actualPhonetic?: string;
  status: 'perfect' | 'good' | 'needs_work';
  tip?: string;
}

export interface PhonemeScore {
  symbol: string;
  ipa: string;
  score: number; // 0-100
  type: 'vowel' | 'consonant' | 'nasal' | 'stress' | 'tone';
  position: 'initial' | 'medial' | 'final';
  status: 'perfect' | 'good' | 'needs_work';
  mispronunciationNote?: string;
  articulationGuide: {
    lips: string;
    tongue: string;
    airflow: string;
    vocalCords: string;
    tip: string;
  };
}

export interface MinimalPair {
  id: string;
  wordA: string;
  phoneticA: string;
  meaningA: string;
  wordB: string;
  phoneticB: string;
  meaningB: string;
  contrastPhoneme: string;
  tip: string;
}

export interface PitchPoint {
  timePercent: number; // 0 to 100
  pitchHz: number; // relative pitch height in Hz
}

export interface PronunciationFeedback {
  transcribedSpeech?: string;
  overallScore: number;
  accuracyScore: number;
  fluencyScore: number;
  intonationScore: number;
  wordScores: WordScore[];
  phonemeScores?: PhonemeScore[];
  nativePitchContour?: PitchPoint[];
  userPitchContour?: PitchPoint[];
  minimalPairs?: MinimalPair[];
  feedbackSummary: string;
  nativePhonetic: string;
  tips: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'vocab' | 'conversation' | 'pronunciation' | 'grammar' | 'level';
  progress: number;
  maxProgress: number;
  xpReward: number;
  unlockedAt?: string;
  claimed?: boolean;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  xpReward: number;
  completed: boolean;
  claimed?: boolean;
  icon: string;
}

export interface UserProfile {
  name: string;
  targetLanguage: LanguageCode;
  nativeLanguage: string;
  level: ProficiencyLevel;
  streakCount: number;
  lastPracticeDate: string; // YYYY-MM-DD
  streakHistory: string[]; // dates practiced
  xp: number;
  userLevel: number;
  totalSessions: number;
  totalMinutes: number;
  totalWordsLearned: number;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  dailyGoalMinutes: number;
  dailyGoalXp: number;
  todayXpGained: number;
  todayMinutesPracticed: number;
}

export interface PracticeSession {
  id: string;
  scenarioId: string;
  language: LanguageCode;
  durationSeconds: number;
  messageCount: number;
  date: string;
  xpEarned: number;
}
