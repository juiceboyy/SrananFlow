import { Achievement, DailyQuest } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // Conversation & Scenarios
  {
    id: 'first_chat',
    title: 'First Words',
    description: 'Send your first message to an AI practice partner.',
    icon: 'MessageCircle',
    category: 'conversation',
    progress: 0,
    maxProgress: 1,
    xpReward: 50
  },
  {
    id: 'scenario_hero',
    title: 'Scenario Hero',
    description: 'Complete 3 different roleplay scenarios.',
    icon: 'Compass',
    category: 'conversation',
    progress: 0,
    maxProgress: 3,
    xpReward: 150
  },
  {
    id: 'scenario_master',
    title: 'Polyglot Explorer',
    description: 'Engage in 10 different conversation scenarios.',
    icon: 'Map',
    category: 'conversation',
    progress: 0,
    maxProgress: 10,
    xpReward: 350
  },

  // Vocabulary Milestones
  {
    id: 'vocab_5',
    title: 'Word Collector',
    description: 'Save 5 words to your personal vocabulary notebook.',
    icon: 'Bookmark',
    category: 'vocab',
    progress: 0,
    maxProgress: 5,
    xpReward: 50
  },
  {
    id: 'vocab_10',
    title: 'Vocabulary Explorer',
    description: 'Save 10 words to your personal vocabulary notebook.',
    icon: 'BookOpen',
    category: 'vocab',
    progress: 0,
    maxProgress: 10,
    xpReward: 100
  },
  {
    id: 'vocab_25',
    title: 'Lexicon Scholar',
    description: 'Save 25 words to your vocabulary notebook.',
    icon: 'Layers',
    category: 'vocab',
    progress: 0,
    maxProgress: 25,
    xpReward: 200
  },
  {
    id: 'vocab_50',
    title: 'Lexicon Master',
    description: 'Save 50 words to your vocabulary notebook.',
    icon: 'Award',
    category: 'vocab',
    progress: 0,
    maxProgress: 50,
    xpReward: 400
  },

  // Streaks & Dedication
  {
    id: 'streak_3',
    title: 'Habit Forming',
    description: 'Maintain a 3-day practice streak.',
    icon: 'Flame',
    category: 'streak',
    progress: 0,
    maxProgress: 3,
    xpReward: 100
  },
  {
    id: 'streak_7',
    title: 'Unstoppable Momentum',
    description: 'Maintain a 7-day practice streak.',
    icon: 'Zap',
    category: 'streak',
    progress: 0,
    maxProgress: 7,
    xpReward: 250
  },
  {
    id: 'streak_14',
    title: 'Dedicated Linguist',
    description: 'Maintain a 14-day practice streak.',
    icon: 'Sparkles',
    category: 'streak',
    progress: 0,
    maxProgress: 14,
    xpReward: 500
  },

  // Pronunciation Precision
  {
    id: 'pronunciation_master',
    title: 'Native Phonetics',
    description: 'Achieve a 90%+ score in a Pronunciation Studio analysis.',
    icon: 'Mic',
    category: 'pronunciation',
    progress: 0,
    maxProgress: 1,
    xpReward: 150
  },
  {
    id: 'phoneme_perfectionist',
    title: 'Phoneme Perfectionist',
    description: 'Score 95%+ accuracy on individual phoneme breakdown.',
    icon: 'Volume2',
    category: 'pronunciation',
    progress: 0,
    maxProgress: 1,
    xpReward: 200
  },
  {
    id: 'minimal_pairs_champ',
    title: 'Minimal Pair Champion',
    description: 'Complete 3 minimal pair articulation drills.',
    icon: 'AudioWaveform',
    category: 'pronunciation',
    progress: 0,
    maxProgress: 3,
    xpReward: 180
  },

  // Grammar & Mastery
  {
    id: 'grammar_guru',
    title: 'Grammar Guru',
    description: 'Receive 5 consecutive messages with zero grammar corrections.',
    icon: 'CheckCircle2',
    category: 'grammar',
    progress: 0,
    maxProgress: 5,
    xpReward: 200
  },
  {
    id: 'level_5',
    title: 'Level 5 Milestone',
    description: 'Reach User Level 5 through active learning.',
    icon: 'Trophy',
    category: 'level',
    progress: 0,
    maxProgress: 5,
    xpReward: 300
  }
];

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'quest_messages',
    title: 'Conversation Warmup',
    description: 'Send 5 messages in any AI scenario',
    targetCount: 5,
    currentCount: 0,
    xpReward: 50,
    completed: false,
    icon: 'MessageSquare'
  },
  {
    id: 'quest_pronunciation',
    title: 'Speech Perfectionist',
    description: 'Practice 2 phrases in Pronunciation Lab',
    targetCount: 2,
    currentCount: 0,
    xpReward: 60,
    completed: false,
    icon: 'Mic'
  },
  {
    id: 'quest_vocab_review',
    title: 'Memory Refresh',
    description: 'Review 5 flashcards in Vocabulary Bank',
    targetCount: 5,
    currentCount: 0,
    xpReward: 50,
    completed: false,
    icon: 'Layers'
  }
];

export function calculateLevel(xp: number): { level: number; currentXp: number; nextLevelXp: number; title: string } {
  // Levels scale by ~250 XP
  const level = Math.floor(xp / 250) + 1;
  const currentXp = xp % 250;
  const nextLevelXp = 250;

  const titles = [
    'Novice Speaker',
    'Curious Beginner',
    'Active Apprentice',
    'Conversationalist',
    'Polyglot Aspirant',
    'Language Explorer',
    'Fluent Communicator',
    'Linguistic Maestro'
  ];

  const title = titles[Math.min(level - 1, titles.length - 1)] || 'Language Master';

  return { level, currentXp, nextLevelXp, title };
}
