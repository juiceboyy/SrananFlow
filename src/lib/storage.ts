import {
  UserProfile,
  VocabItem,
  ChatMessage,
  PracticeSession,
  LanguageCode,
  ProficiencyLevel
} from '../types';
import { INITIAL_ACHIEVEMENTS, INITIAL_DAILY_QUESTS } from '../data/achievements';

const PROFILE_KEY = 'lingoflow_user_profile';
const VOCAB_KEY = 'lingoflow_vocab_items';
const CHAT_HISTORY_KEY = 'lingoflow_chat_history';
const SESSIONS_KEY = 'lingoflow_sessions';

export function getTodayString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export function loadUserProfile(): UserProfile {
  const saved = localStorage.getItem(PROFILE_KEY);
  if (saved) {
    try {
      const parsed: UserProfile = JSON.parse(saved);
      parsed.targetLanguage = 'sr';
      // Verify & update streak on load
      return checkAndUpdateStreak(parsed);
    } catch {
      // Fallback
    }
  }

  const today = getTodayString();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const defaultProfile: UserProfile = {
    name: 'Learner',
    targetLanguage: 'sr',
    nativeLanguage: 'Dutch / English',
    level: 'A2',
    streakCount: 2,
    lastPracticeDate: yesterday,
    streakHistory: [yesterday],
    xp: 180,
    userLevel: 1,
    totalSessions: 3,
    totalMinutes: 18,
    totalWordsLearned: 6,
    achievements: INITIAL_ACHIEVEMENTS,
    dailyQuests: INITIAL_DAILY_QUESTS,
    dailyGoalMinutes: 15,
    dailyGoalXp: 150,
    todayXpGained: 0,
    todayMinutesPracticed: 0
  };

  saveUserProfile(defaultProfile);
  return defaultProfile;
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function checkAndUpdateStreak(profile: UserProfile): UserProfile {
  const today = getTodayString();
  const lastDate = profile.lastPracticeDate;

  if (lastDate === today) {
    return profile; // Already recorded today
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let updated = { ...profile };

  if (lastDate === yesterday) {
    // Yesterday was practiced, streak is active waiting for today
  } else if (lastDate && lastDate < yesterday) {
    // Missed a day! Reset streak to 0 unless saved
    updated.streakCount = 0;
  }

  // Reset daily stats if new day
  if (lastDate !== today) {
    updated.todayXpGained = 0;
    updated.todayMinutesPracticed = 0;
    updated.dailyQuests = updated.dailyQuests.map((q) => ({
      ...q,
      currentCount: 0,
      completed: false
    }));
  }

  saveUserProfile(updated);
  return updated;
}

export function recordPracticeActivity(
  profile: UserProfile,
  xpEarned: number,
  minutesPracticed: number
): { updatedProfile: UserProfile; streakIncreased: boolean; unlockedAchievements: string[] } {
  const today = getTodayString();
  let streakIncreased = false;
  let newStreak = profile.streakCount;
  let streakHistory = [...(profile.streakHistory || [])];

  if (profile.lastPracticeDate !== today) {
    newStreak += 1;
    streakIncreased = true;
    if (!streakHistory.includes(today)) {
      streakHistory.push(today);
    }
  }

  const newXp = profile.xp + xpEarned;
  const newTodayXp = profile.todayXpGained + xpEarned;
  const newTodayMinutes = profile.todayMinutesPracticed + minutesPracticed;

  const unlockedAchievements: string[] = [];

  // Update achievements
  const updatedAchievements = profile.achievements.map((ach) => {
    let newProg = ach.progress;

    if (ach.id === 'first_chat') newProg = 1;
    if (ach.id === 'streak_3' && newStreak >= 3) newProg = 3;
    if (ach.id === 'streak_7' && newStreak >= 7) newProg = 7;

    const newlyUnlocked = !ach.unlockedAt && newProg >= ach.maxProgress;
    if (newlyUnlocked) {
      unlockedAchievements.push(ach.title);
    }

    return {
      ...ach,
      progress: Math.min(newProg, ach.maxProgress),
      unlockedAt: newlyUnlocked ? new Date().toISOString() : ach.unlockedAt
    };
  });

  const updatedProfile: UserProfile = {
    ...profile,
    streakCount: newStreak,
    lastPracticeDate: today,
    streakHistory,
    xp: newXp,
    todayXpGained: newTodayXp,
    todayMinutesPracticed: newTodayMinutes,
    totalMinutes: profile.totalMinutes + minutesPracticed,
    totalSessions: profile.totalSessions + (streakIncreased ? 1 : 0),
    achievements: updatedAchievements
  };

  saveUserProfile(updatedProfile);
  return { updatedProfile, streakIncreased, unlockedAchievements };
}

// Initial sample vocabulary
const DEFAULT_VOCAB: VocabItem[] = [
  {
    id: 'vs1',
    word: 'Fa waka',
    phonetic: 'fah WAH-kah',
    translation: 'How are you? / What\'s up?',
    exampleSentence: 'Fa waka mi mati! San e psa?',
    exampleTranslation: 'How are you my friend! What\'s happening?',
    language: 'sr',
    status: 'learning',
    dateAdded: '2026-08-01',
    reviewCount: 2,
    correctCount: 2
  },
  {
    id: 'vs2',
    word: 'Gran tangi',
    phonetic: 'grahn TAHN-gee',
    translation: 'Many thanks / Thank you very much',
    exampleSentence: 'Gran tangi fu yu yepi!',
    exampleTranslation: 'Many thanks for your help!',
    language: 'sr',
    status: 'learning',
    dateAdded: '2026-08-01',
    reviewCount: 3,
    correctCount: 3
  },
  {
    id: 'vs3',
    word: 'Mi de bun',
    phonetic: 'mee deh BOON',
    translation: 'I am doing well',
    exampleSentence: 'Mi de bun, danki!',
    exampleTranslation: 'I am doing well, thank you!',
    language: 'sr',
    status: 'learning',
    dateAdded: '2026-08-02',
    reviewCount: 1,
    correctCount: 1
  },
  {
    id: 'vs4',
    word: 'Pe a presi de?',
    phonetic: 'peh ah PREH-see deh',
    translation: 'Where is the place located?',
    exampleSentence: 'Odi, pe a presi fu dringi koffie de?',
    exampleTranslation: 'Hello, where is the coffee spot located?',
    language: 'sr',
    status: 'new',
    dateAdded: '2026-08-03',
    reviewCount: 0,
    correctCount: 0
  },
  {
    id: 'vs5',
    word: 'Switi mofo',
    phonetic: 'SWEET-ee MOH-foh',
    translation: 'Delicious food / Sweet taste',
    exampleSentence: 'A nyanyan disi na wan trutru switi mofo!',
    exampleTranslation: 'This meal is really delicious!',
    language: 'sr',
    status: 'mastered',
    dateAdded: '2026-07-30',
    reviewCount: 6,
    correctCount: 6
  }
];

export function loadVocabItems(): VocabItem[] {
  const saved = localStorage.getItem(VOCAB_KEY);
  let raw: VocabItem[] = [];
  if (saved) {
    try {
      raw = JSON.parse(saved);
    } catch {
      raw = DEFAULT_VOCAB;
    }
  } else {
    raw = DEFAULT_VOCAB;
  }

  // Deduplicate items by normalized word (case-insensitive, trimmed)
  const seen = new Set<string>();
  const deduplicated: VocabItem[] = [];
  for (const item of raw) {
    if (!item || !item.word) continue;
    const key = item.word.trim().toLowerCase();
    if (key && !seen.has(key)) {
      seen.add(key);
      deduplicated.push({ ...item, word: item.word.trim(), language: 'sr' });
    }
  }

  saveVocabItems(deduplicated);
  return deduplicated;
}

export function saveVocabItems(items: VocabItem[]): void {
  localStorage.setItem(VOCAB_KEY, JSON.stringify(items));
}

export function saveChatHistory(scenarioId: string, messages: ChatMessage[]): void {
  const existing = loadAllChatHistory();
  existing[scenarioId] = messages;
  localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(existing));
}

export function loadChatHistory(scenarioId: string): ChatMessage[] {
  const existing = loadAllChatHistory();
  return existing[scenarioId] || [];
}

function loadAllChatHistory(): Record<string, ChatMessage[]> {
  const saved = localStorage.getItem(CHAT_HISTORY_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  }
  return {};
}
