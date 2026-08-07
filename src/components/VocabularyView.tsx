import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Volume2,
  CheckCircle,
  Clock,
  Sparkles,
  Search,
  Filter,
  Layers,
  Gamepad2,
  Trash2,
  ChevronRight,
  RotateCw,
  Check,
  X,
  Zap,
  Brain,
  Award,
  BarChart2,
  VolumeX,
  Volume1,
  HelpCircle,
  Calendar
} from 'lucide-react';
import { VocabItem, VocabStatus, LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../data/languages';
import { speakTextNative, playAudioForText } from '../lib/audioUtils';

interface VocabularyViewProps {
  items: VocabItem[];
  targetLanguage: LanguageCode;
  onAddItem: (item: Omit<VocabItem, 'id' | 'dateAdded' | 'reviewCount' | 'correctCount'>) => void;
  onUpdateStatus: (id: string, status: VocabStatus) => void;
  onUpdateItem?: (item: VocabItem) => void;
  onDeleteItem: (id: string) => void;
  onRecordActivity: (xpEarned: number, minutes: number) => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  items,
  targetLanguage,
  onAddItem,
  onUpdateStatus,
  onUpdateItem,
  onDeleteItem,
  onRecordActivity
}) => {
  const currentLang = getLanguageByCode(targetLanguage);

  const [activeTab, setActiveTab] = useState<'bank' | 'flashcards'>('bank');
  const [statusFilter, setStatusFilter] = useState<'all' | VocabStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Manual Add Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newExample, setNewExample] = useState('');

  // Flashcards SRS state
  const [flashcardDeckFilter, setFlashcardDeckFilter] = useState<'learning' | 'new' | 'all' | 'mastered'>('learning');
  const [sessionCards, setSessionCards] = useState<VocabItem[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    total: 0,
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
    xpEarned: 0
  });

  // Language specific items (deduplicated by normalized word)
  const langItems = React.useMemo(() => {
    const seen = new Set<string>();
    return items.filter((item) => {
      if (!item || item.language !== targetLanguage) return false;
      const key = item.word.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [items, targetLanguage]);

  // Filtered items for Word List view
  const filteredItems = langItems.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const learningCount = langItems.filter((i) => i.status === 'learning').length;
  const newCount = langItems.filter((i) => i.status === 'new').length;
  const masteredCount = langItems.filter((i) => i.status === 'mastered').length;

  // Start or reset flashcards session with a stable snapshot of cards
  const startFlashcardSession = (filter: 'learning' | 'new' | 'all' | 'mastered') => {
    const deck = langItems.filter((item) => {
      if (filter === 'learning') return item.status === 'learning';
      if (filter === 'new') return item.status === 'new';
      if (filter === 'mastered') return item.status === 'mastered';
      return true; // 'all'
    });

    setFlashcardDeckFilter(filter);
    setSessionCards(deck);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setSessionStats({
      total: 0,
      again: 0,
      hard: 0,
      good: 0,
      easy: 0,
      xpEarned: 0
    });
  };

  // Sync session cards when entering flashcards view or changing language if deck empty
  useEffect(() => {
    if (activeTab === 'flashcards' && sessionCards.length === 0 && !sessionCompleted) {
      startFlashcardSession(flashcardDeckFilter);
    }
  }, [activeTab, targetLanguage, langItems]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanW = newWord.trim();
    if (!cleanW || !newTranslation.trim()) return;

    // Duplicate check
    const isAlreadySaved = langItems.some(
      (i) => i.word.trim().toLowerCase() === cleanW.toLowerCase()
    );
    if (isAlreadySaved) {
      alert(`Het woord "${cleanW}" staat al in je Vocabulary Notebook!`);
      return;
    }

    onAddItem({
      word: cleanW,
      phonetic: newPhonetic.trim() || cleanW,
      translation: newTranslation.trim(),
      exampleSentence: newExample.trim() || '',
      exampleTranslation: '',
      language: targetLanguage,
      status: 'learning'
    });

    setNewWord('');
    setNewTranslation('');
    setNewPhonetic('');
    setNewExample('');
    setShowAddModal(false);
  };

  // Keyboard navigation for flashcards
  useEffect(() => {
    if (activeTab !== 'flashcards' || sessionCompleted || sessionCards.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => {
          const nextState = !prev;
          const currentCard = sessionCards[currentCardIndex];
          if (nextState && autoPlayAudio && currentCard) {
            playAudioForText(
              currentCard.word,
              targetLanguage,
              currentLang.defaultVoice
            );
          }
          return nextState;
        });
      } else if (isFlipped) {
        if (e.key === '1') {
          e.preventDefault();
          handleRateFlashcard('again');
        } else if (e.key === '2') {
          e.preventDefault();
          handleRateFlashcard('hard');
        } else if (e.key === '3') {
          e.preventDefault();
          handleRateFlashcard('good');
        } else if (e.key === '4') {
          e.preventDefault();
          handleRateFlashcard('easy');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isFlipped, currentCardIndex, sessionCards, sessionCompleted, autoPlayAudio, targetLanguage]);

  // Spaced Repetition Rating Handler
  const handleRateFlashcard = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    const card = sessionCards[currentCardIndex];
    if (!card) return;

    const todayStr = new Date().toISOString().split('T')[0];
    let intervalDays = 1;
    let newStatus: VocabStatus = 'learning';

    if (rating === 'again') {
      intervalDays = 1;
      newStatus = 'learning';
    } else if (rating === 'hard') {
      intervalDays = 2;
      newStatus = 'learning';
    } else if (rating === 'good') {
      intervalDays = Math.min(30, Math.max(3, (card.reviewCount || 1) * 2));
      newStatus = 'learning';
    } else if (rating === 'easy') {
      intervalDays = Math.min(60, Math.max(7, (card.reviewCount || 1) * 3));
      newStatus = 'mastered';
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    const nextDateStr = nextDate.toISOString().split('T')[0];

    const updatedItem: VocabItem = {
      ...card,
      lastReviewed: todayStr,
      nextReviewDate: nextDateStr,
      reviewCount: (card.reviewCount || 0) + 1,
      correctCount: (rating === 'good' || rating === 'easy') ? (card.correctCount || 0) + 1 : (card.correctCount || 0),
      status: newStatus
    };

    if (onUpdateItem) {
      onUpdateItem(updatedItem);
    } else {
      onUpdateStatus(card.id, newStatus);
    }

    // Keep sessionCards array stable so currentCardIndex stays in bounds during the review session
    setSessionCards((prev) => {
      const next = [...prev];
      if (next[currentCardIndex]) {
        next[currentCardIndex] = updatedItem;
      }
      return next;
    });

    // Record activity XP
    const xpGained = 5;
    onRecordActivity(xpGained, 0.4);

    setSessionStats((prev) => ({
      ...prev,
      total: prev.total + 1,
      again: prev.again + (rating === 'again' ? 1 : 0),
      hard: prev.hard + (rating === 'hard' ? 1 : 0),
      good: prev.good + (rating === 'good' ? 1 : 0),
      easy: prev.easy + (rating === 'easy' ? 1 : 0),
      xpEarned: prev.xpEarned + xpGained
    }));

    setIsFlipped(false);

    if (currentCardIndex < sessionCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#E5EADD] border border-[#D8DFD0] rounded-[28px] p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-white/80 text-[#5A5A40] border border-[#D8DFD0] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
            <BookOpen className="w-3.5 h-3.5" /> Personal Vocabulary Bank
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2C2C24] tracking-tight">
            {currentLang.flag} {currentLang.name} Vocabulary Notebook
          </h2>
          <p className="text-xs text-[#5A5A40]">
            {langItems.length} total saved words •{' '}
            <span className="font-bold text-[#D48806]">{learningCount} Learning (SRS)</span> •{' '}
            <span className="font-bold text-emerald-700">{masteredCount} Mastered</span>
          </p>
        </div>

        {/* View Switchers & Add Button */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-full border border-[#E0E0D5] flex text-xs font-semibold shadow-xs">
            <button
              onClick={() => setActiveTab('bank')}
              className={`px-4 py-1.5 rounded-full transition-all font-bold ${
                activeTab === 'bank'
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'text-[#5A5A40] hover:text-[#2C2C24]'
              }`}
            >
              Word List ({langItems.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('flashcards');
                startFlashcardSession('learning');
              }}
              className={`px-4 py-1.5 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                activeTab === 'flashcards'
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'text-[#5A5A40] hover:text-[#2C2C24]'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Flashcards (SRS)</span>
              {learningCount > 0 && (
                <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {learningCount}
                </span>
              )}
            </button>
          </div>

          <button
            id="btn-open-add-vocab"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-[#5A5A40] hover:bg-[#4A4A34] text-white font-bold text-xs px-4 py-2 rounded-full transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Word</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: WORD LIST */}
      {activeTab === 'bank' && (
        <div className="space-y-4">
          {/* Search & Filter Controls */}
          <div className="bg-white border border-[#E8E8DF] rounded-[24px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#808070] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search words or translations..."
                className="w-full bg-[#F9F9F6] border border-[#E8E8DF] text-[#2C2C24] rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 placeholder:text-[#808070]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs font-semibold">
              <span className="text-[#808070] shrink-0">Filter:</span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  statusFilter === 'all'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : 'bg-[#F9F9F6] border-[#E0E0D5] text-[#3A3A2F] hover:bg-[#F5F5F0]'
                }`}
              >
                All ({langItems.length})
              </button>
              <button
                onClick={() => setStatusFilter('learning')}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  statusFilter === 'learning'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : 'bg-[#F9F9F6] border-[#E0E0D5] text-[#3A3A2F] hover:bg-[#F5F5F0]'
                }`}
              >
                Learning ({learningCount})
              </button>
              <button
                onClick={() => setStatusFilter('new')}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  statusFilter === 'new'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : 'bg-[#F9F9F6] border-[#E0E0D5] text-[#3A3A2F] hover:bg-[#F5F5F0]'
                }`}
              >
                New ({newCount})
              </button>
              <button
                onClick={() => setStatusFilter('mastered')}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  statusFilter === 'mastered'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                    : 'bg-[#F9F9F6] border-[#E0E0D5] text-[#3A3A2F] hover:bg-[#F5F5F0]'
                }`}
              >
                Mastered ({masteredCount})
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredItems.length === 0 ? (
            <div className="bg-white border border-[#E8E8DF] rounded-[24px] p-12 text-center space-y-3 shadow-xs">
              <BookOpen className="w-8 h-8 text-[#808070] mx-auto" />
              <p className="text-sm font-serif font-bold text-[#2C2C24]">No vocabulary words found</p>
              <p className="text-xs text-[#808070] max-w-sm mx-auto leading-relaxed">
                Words saved during conversations with your AI partner will appear here automatically, or click "Add Word" to enter custom vocabulary.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E8E8DF] hover:border-[#5A5A40]/40 rounded-[24px] p-5 space-y-3 shadow-xs relative group transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#2C2C24]">{item.word}</h3>
                      <p className="text-xs text-[#808070] italic">[{item.phonetic}]</p>
                    </div>

                    <button
                      onClick={() => playAudioForText(item.word, item.language, currentLang.defaultVoice)}
                      className="p-2 bg-[#F5F5F0] hover:bg-[#E5EADD] rounded-full text-[#5A5A40] transition-colors border border-[#E0E0D5]"
                      title="Pronounce"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-[#F9F9F6] rounded-xl border border-[#E8E8DF] text-xs text-[#3A3A2F]">
                    <span className="font-bold text-[#5A5A40]">Translation: </span>
                    {item.translation}
                  </div>

                  {item.exampleSentence && (
                    <div className="text-xs text-[#808070] italic border-l-2 border-[#5A5A40] pl-2.5 py-0.5">
                      "{item.exampleSentence}"
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#F0F0E8] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#808070] font-medium">Status:</span>
                      <select
                        value={item.status}
                        onChange={(e) => onUpdateStatus(item.id, e.target.value as VocabStatus)}
                        className={`text-[11px] font-bold rounded-full px-2.5 py-0.5 border ${
                          item.status === 'learning'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : item.status === 'mastered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <option value="learning">Learning (SRS)</option>
                        <option value="new">New</option>
                        <option value="mastered">Mastered</option>
                      </select>
                    </div>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="text-[#808070] hover:text-rose-500 p-1 transition-colors"
                      title="Delete word"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: FLASHCARDS SPACED REPETITION (SRS) MODE */}
      {activeTab === 'flashcards' && (
        <div className="max-w-2xl mx-auto space-y-6 py-2">
          {/* SRS Filter & Audio Controls Bar */}
          <div className="bg-white border border-[#E8E8DF] rounded-[24px] p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-semibold overflow-x-auto">
              <span className="text-[#808070] shrink-0 font-medium">Review Queue:</span>
              <button
                onClick={() => startFlashcardSession('learning')}
                className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
                  flashcardDeckFilter === 'learning'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] font-bold shadow-xs'
                    : 'bg-[#F9F9F6] border-[#E0E0D5] text-[#3A3A2F] hover:bg-[#F5F5F0]'
                }`}
              >
                <span>Learning (SRS Focus)</span>
                <span className="ml-1 bg-amber-100 text-amber-900 text-[10px] px-1.5 rounded-full font-bold">
                  {learningCount}
                </span>
              </button>

              <button
                onClick={() => startFlashcardSession('new')}
                className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
                  flashcardDeckFilter === 'new'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] font-bold shadow-xs'
                    : 'bg-[#F9F9F6] border-[#E0E0D5] text-[#3A3A2F] hover:bg-[#F5F5F0]'
                }`}
              >
                <span>New</span>
                <span className="ml-1 bg-slate-200 text-slate-800 text-[10px] px-1.5 rounded-full font-bold">
                  {newCount}
                </span>
              </button>

              <button
                onClick={() => startFlashcardSession('all')}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  flashcardDeckFilter === 'all'
                    ? 'bg-[#5A5A40] text-white border-[#5A5A40] font-bold shadow-xs'
                    : 'bg-[#F9F9F6] border-[#E0E0D5] text-[#3A3A2F] hover:bg-[#F5F5F0]'
                }`}
              >
                All Words ({langItems.length})
              </button>
            </div>

            {/* Audio Auto-play Toggle */}
            <button
              onClick={() => setAutoPlayAudio(!autoPlayAudio)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                autoPlayAudio
                  ? 'bg-[#E5EADD] text-[#5A5A40] border-[#D8DFD0]'
                  : 'bg-[#F5F5F0] text-[#808070] border-[#E0E0D5]'
              }`}
              title="Auto-play audio pronunciation when card is flipped"
            >
              {autoPlayAudio ? <Volume2 className="w-3.5 h-3.5 text-[#5A5A40]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>Auto-pronounce</span>
            </button>
          </div>

          {/* Session Complete Screen */}
          {sessionCompleted ? (
            <div className="bg-white border-2 border-[#5A5A40] rounded-[32px] p-8 text-center space-y-6 shadow-md animate-fade-in">
              <div className="w-16 h-16 bg-[#E5EADD] text-[#5A5A40] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Brain className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="bg-[#E5EADD] text-[#5A5A40] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Spaced Repetition Completed
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#2C2C24]">
                  Awesome Review Session! 🎉
                </h3>
                <p className="text-xs text-[#808070] max-w-md mx-auto">
                  You reviewed {sessionStats.total} words in {currentLang.name} and reinforced your memory retention.
                </p>
              </div>

              {/* Stats Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto pt-2">
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-center">
                  <span className="text-xs font-bold text-rose-700 block">Again</span>
                  <span className="text-lg font-extrabold text-rose-900">{sessionStats.again}</span>
                </div>
                <div className="p-3 bg-[#FEF9E7] border border-[#F3E5AB] rounded-2xl text-center">
                  <span className="text-xs font-bold text-amber-700 block">Hard</span>
                  <span className="text-lg font-extrabold text-amber-900">{sessionStats.hard}</span>
                </div>
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-center">
                  <span className="text-xs font-bold text-sky-700 block">Good</span>
                  <span className="text-lg font-extrabold text-sky-900">{sessionStats.good}</span>
                </div>
                <div className="p-3 bg-[#E5EADD] border border-[#D8DFD0] rounded-2xl text-center">
                  <span className="text-xs font-bold text-[#5A5A40] block">Easy / Mastered</span>
                  <span className="text-lg font-extrabold text-[#2C2C24]">{sessionStats.easy}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#FEF9E7] border border-[#F3E5AB] px-4 py-2 rounded-full text-xs font-bold text-amber-800">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Earned +{sessionStats.xpEarned} Vocabulary XP</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => startFlashcardSession(flashcardDeckFilter)}
                  className="px-6 py-2.5 bg-[#5A5A40] hover:bg-[#4A4A34] text-white font-bold text-xs rounded-full transition-all shadow-md flex items-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Review Deck Again</span>
                </button>
                <button
                  onClick={() => setActiveTab('bank')}
                  className="px-6 py-2.5 bg-[#F5F5F0] hover:bg-[#E5EADD] text-[#3A3A2F] font-bold text-xs rounded-full transition-all border border-[#E0E0D5]"
                >
                  Return to Word List
                </button>
              </div>
            </div>
          ) : sessionCards.length === 0 ? (
            /* Empty Queue State */
            <div className="bg-white border border-[#E8E8DF] rounded-[32px] p-10 text-center space-y-4 shadow-xs">
              <Brain className="w-10 h-10 text-[#808070] mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#2C2C24]">
                  No cards in "{flashcardDeckFilter}" review queue
                </h3>
                <p className="text-xs text-[#808070] max-w-sm mx-auto leading-relaxed">
                  {flashcardDeckFilter === 'learning'
                    ? "Great job! You don't have any words currently marked as 'Learning'. Switch filter to review all words, or mark words from your notebook as 'Learning'."
                    : "No words found matching this flashcard filter."}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {learningCount > 0 && (
                  <button
                    onClick={() => startFlashcardSession('learning')}
                    className="px-4 py-2 bg-[#5A5A40] text-white text-xs font-bold rounded-full hover:bg-[#4A4A34] transition-all"
                  >
                    Review Learning Queue ({learningCount})
                  </button>
                )}
                <button
                  onClick={() => startFlashcardSession('all')}
                  className="px-4 py-2 bg-[#F5F5F0] text-[#5A5A40] text-xs font-bold rounded-full border border-[#E0E0D5] hover:bg-[#E5EADD] transition-all"
                >
                  Review All Words ({langItems.length})
                </button>
              </div>
            </div>
          ) : (
            /* Active Flashcard Interface */
            <div className="space-y-5">
              {/* Progress Header & Stats */}
              <div className="flex items-center justify-between text-xs font-bold text-[#808070]">
                <div className="flex items-center gap-2">
                  <span className="bg-[#E5EADD] text-[#5A5A40] px-2.5 py-1 rounded-full text-[11px]">
                    Card {Math.min(currentCardIndex + 1, sessionCards.length)} of {sessionCards.length}
                  </span>
                  <span className="text-[11px] text-[#808070] hidden sm:inline">
                    SRS Spaced Repetition Practice
                  </span>
                </div>

                <div className="text-[11px] text-[#5A5A40] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Click card or press Space to flip</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#E0E0D5] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#5A5A40] h-full transition-all duration-300"
                  style={{
                    width: `${((currentCardIndex) / Math.max(1, sessionCards.length)) * 100}%`
                  }}
                />
              </div>

              {/* 3D Flip Flashcard */}
              <div
                onClick={() => {
                  setIsFlipped(!isFlipped);
                  const card = sessionCards[currentCardIndex];
                  if (!isFlipped && autoPlayAudio && card) {
                    playAudioForText(
                      card.word,
                      targetLanguage,
                      currentLang.defaultVoice
                    );
                  }
                }}
                className={`w-full min-h-[300px] bg-white border-2 ${
                  isFlipped ? 'border-[#5A5A40] bg-[#FAFBF8]' : 'border-[#E8E8DF]'
                } rounded-[32px] p-8 flex flex-col items-center justify-center text-center cursor-pointer shadow-md transition-all relative overflow-hidden group hover:border-[#5A5A40]/60`}
              >
                {/* SRS Status Pill Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                      sessionCards[currentCardIndex]?.status === 'learning'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : sessionCards[currentCardIndex]?.status === 'mastered'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-slate-100 text-slate-800 border-slate-300'
                    }`}
                  >
                    {sessionCards[currentCardIndex]?.status === 'learning' ? 'Learning (SRS)' : (sessionCards[currentCardIndex]?.status || 'Learning')}
                  </span>
                </div>

                {/* Audio Button on Card Top Right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const card = sessionCards[currentCardIndex];
                    if (card) {
                      playAudioForText(
                        card.word,
                        targetLanguage,
                        currentLang.defaultVoice
                      );
                    }
                  }}
                  className="absolute top-4 right-4 p-2.5 bg-[#F5F5F0] hover:bg-[#E5EADD] rounded-full text-[#5A5A40] transition-colors border border-[#E0E0D5]"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                {/* Card Front vs Back Content */}
                {!isFlipped ? (
                  <div className="space-y-4 max-w-md my-auto">
                    <span className="text-[11px] uppercase font-bold text-[#808070] tracking-wider block">
                      Target Phrase ({currentLang.name})
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2C24]">
                      {sessionCards[currentCardIndex]?.word || '—'}
                    </h2>
                    {sessionCards[currentCardIndex]?.phonetic && (
                      <p className="text-sm text-[#5A5A40] italic font-semibold">
                        [{sessionCards[currentCardIndex]?.phonetic}]
                      </p>
                    )}
                    <div className="pt-4 text-xs text-[#808070] font-medium inline-flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                      <span>Click card to reveal translation</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-md my-auto animate-fade-in">
                    <span className="text-[11px] uppercase font-bold text-[#5A5A40] tracking-wider block">
                      English Translation
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2C24]">
                      {sessionCards[currentCardIndex]?.translation || '—'}
                    </h3>

                    {sessionCards[currentCardIndex]?.exampleSentence && (
                      <div className="p-3 bg-white/80 rounded-2xl border border-[#E8E8DF] text-xs text-[#5A5A40] italic space-y-1">
                        <p className="font-semibold text-[#2C2C24]">"{sessionCards[currentCardIndex]?.exampleSentence}"</p>
                        {sessionCards[currentCardIndex]?.exampleTranslation && (
                          <p className="text-[#808070]">({sessionCards[currentCardIndex]?.exampleTranslation})</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SRS Rating Action Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#808070] px-1 font-semibold">
                  <span>How well did you remember this word?</span>
                  {isFlipped && <span className="hidden sm:inline">Shortcuts: 1 = Again, 2 = Hard, 3 = Good, 4 = Easy</span>}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleRateFlashcard('again')}
                    disabled={!isFlipped}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                      !isFlipped
                        ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700 shadow-xs active:scale-95'
                    }`}
                  >
                    <span>Again</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">1 day</span>
                  </button>

                  <button
                    onClick={() => handleRateFlashcard('hard')}
                    disabled={!isFlipped}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                      !isFlipped
                        ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'bg-[#FEF9E7] hover:bg-[#FDF4D5] border-[#F3E5AB] text-[#D48806] shadow-xs active:scale-95'
                    }`}
                  >
                    <span>Hard</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">2 days</span>
                  </button>

                  <button
                    onClick={() => handleRateFlashcard('good')}
                    disabled={!isFlipped}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                      !isFlipped
                        ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700 shadow-xs active:scale-95'
                    }`}
                  >
                    <span>Good</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">4 days</span>
                  </button>

                  <button
                    onClick={() => handleRateFlashcard('easy')}
                    disabled={!isFlipped}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-bold transition-all ${
                      !isFlipped
                        ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : 'bg-[#E5EADD] hover:bg-[#DCE2D4] border-[#D8DFD0] text-[#5A5A40] shadow-xs active:scale-95'
                    }`}
                  >
                    <span>Easy ✓</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">Mastered</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual Add Word Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#2C2C24]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E8DF] rounded-[32px] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0F0E8] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2C2C24]">Add New Vocabulary Word</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#808070] hover:text-[#2C2C24] font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#808070] block mb-1">
                  Word / Phrase in {currentLang.name} *
                </label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="e.g. Fa waka / Un café por favor"
                  className="w-full bg-[#F9F9F6] border border-[#E8E8DF] text-[#2C2C24] rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#808070] block mb-1">
                  English Translation *
                </label>
                <input
                  type="text"
                  required
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  placeholder="e.g. How are you / A coffee please"
                  className="w-full bg-[#F9F9F6] border border-[#E8E8DF] text-[#2C2C24] rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#808070] block mb-1">
                  Phonetic Guide / Transliteration
                </label>
                <input
                  type="text"
                  value={newPhonetic}
                  onChange={(e) => setNewPhonetic(e.target.value)}
                  placeholder="e.g. fah WAH-kah"
                  className="w-full bg-[#F9F9F6] border border-[#E8E8DF] text-[#2C2C24] rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#808070] block mb-1">
                  Example Sentence (Optional)
                </label>
                <textarea
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  placeholder="e.g. Fa waka mi mati!"
                  rows={2}
                  className="w-full bg-[#F9F9F6] border border-[#E8E8DF] text-[#2C2C24] rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#F5F5F0] text-[#3A3A2F] text-xs font-bold rounded-full hover:bg-[#E5EADD] transition-colors border border-[#E0E0D5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5A5A40] text-white text-xs font-bold rounded-full hover:bg-[#4A4A34] transition-all shadow-md"
                >
                  Save to Learning Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
