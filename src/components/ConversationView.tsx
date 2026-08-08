import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Lightbulb,
  Plus,
  CheckCircle,
  RotateCcw,
  Sparkles,
  BookPlus,
  BookOpen,
  MessageSquareText,
  Compass,
  Info,
  ChevronDown,
  ChevronUp,
  VolumeX,
  ShieldCheck
} from 'lucide-react';
import {
  UserProfile,
  Scenario,
  ChatMessage,
  VocabItem,
  ExtractedWord,
  RAGCorpusItem
} from '../types';
import { SCENARIOS } from '../data/scenarios';
import { getLocalizedScenario, getPrepKitLabels } from '../data/localizedScenarios';
import { getLanguageByCode } from '../data/languages';
import { speakTextNative, playAudioForText } from '../lib/audioUtils';
import { loadChatHistory, saveChatHistory } from '../lib/storage';
import { groundScenarioWithRAG } from '../lib/ragCorpus';

interface ConversationViewProps {
  profile: UserProfile;
  vocabItems?: VocabItem[];
  onAddVocab: (item: Omit<VocabItem, 'id' | 'dateAdded' | 'reviewCount' | 'correctCount'>) => void;
  onRecordActivity: (xpEarned: number, minutes: number) => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  profile,
  vocabItems = [],
  onAddVocab,
  onRecordActivity
}) => {
  const currentLang = getLanguageByCode(profile.targetLanguage);
  const [rawActiveScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const activeScenario = useMemo(() => {
    return getLocalizedScenario(rawActiveScenario, profile.targetLanguage);
  }, [rawActiveScenario, profile.targetLanguage]);

  const [ragCorpus, setRagCorpus] = useState<RAGCorpusItem[]>([]);

  useEffect(() => {
    const fetchRagCorpus = async () => {
      try {
        const res = await fetch('/api/rag/corpus');
        if (res.ok) {
          const data = await res.json();
          if (data.items) {
            setRagCorpus(data.items);
          }
        }
      } catch (err) {
        console.error('Failed to fetch RAG corpus in ConversationView:', err);
      }
    };
    fetchRagCorpus();
  }, [rawActiveScenario.id]);

  const groundedResult = useMemo(() => {
    return groundScenarioWithRAG(activeScenario, ragCorpus);
  }, [activeScenario, ragCorpus]);

  const groundedScenario = groundedResult.scenario;

  const prepLabels = getPrepKitLabels(profile.targetLanguage);

  const formatCardText = (text: string) => {
    if (!text) return { title: '', body: '' };
    if (text.includes(':')) {
      const [first, ...rest] = text.split(':');
      return { title: first.trim(), body: rest.join(':').trim() };
    }
    if (text.length > 40) {
      const match = text.match(/^([^.!?\n]+)/);
      const firstClause = match ? match[1] : text;
      if (firstClause.length > 35) {
        const words = firstClause.split(/\s+/);
        return {
          title: words.slice(0, 4).join(' ') + '...',
          body: text
        };
      }
      return {
        title: firstClause,
        body: text.substring(firstClause.length).trim()
      };
    }
    return { title: text, body: '' };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);

  // Scenario Selector collapsible toggle (default to false for a clean compact initial view)
  const [showScenarioSelector, setShowScenarioSelector] = useState<boolean>(false);

  // Scenario Prep Kit toggle
  const [showPrepKit, setShowPrepKit] = useState<boolean>(true);
  const [prepTab, setPrepTab] = useState<'vocab' | 'phrases' | 'flow' | 'culture'>('vocab');

  // Hints drawer
  const [hints, setHints] = useState<{ text: string; translation: string; tone: string }[]>([]);
  const [hintsGrounding, setHintsGrounding] = useState<{ ragEnabled: boolean; sourcesCount: number } | null>(null);
  const [loadingHints, setLoadingHints] = useState(false);
  const [showHintsModal, setShowHintsModal] = useState(false);

  // RAG Grounding sources expansion state
  const [expandedSourcesMsgId, setExpandedSourcesMsgId] = useState<string | null>(null);

  // Added vocab state feedback
  const [addedWordsMap, setAddedWordsMap] = useState<Record<string, boolean>>({});

  // Set of already saved words from Vocabulary Notebook
  const savedWordsSet = useMemo(() => {
    const set = new Set<string>();
    vocabItems.forEach((item) => {
      if (item.word) set.add(item.word.trim().toLowerCase());
    });
    return set;
  }, [vocabItems]);

  const isWordSaved = (word: string) => {
    if (!word) return false;
    const norm = word.trim().toLowerCase();
    return Boolean(addedWordsMap[word] || addedWordsMap[norm] || savedWordsSet.has(norm));
  };

  // Audio playing ID
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);

  // Scroll ref
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or load chat history for active scenario & language
  useEffect(() => {
    const historyKey = `${rawActiveScenario.id}_${profile.targetLanguage}`;
    const saved = loadChatHistory(historyKey);

    const initialGreetingText =
      activeScenario.initialGreeting[profile.targetLanguage] ||
      activeScenario.initialGreeting['en'] ||
      `¡Hola! Welcome to ${activeScenario.title}.`;

    const initialTranslationText =
      activeScenario.initialGreeting['en'] ||
      `Hello! Welcome to ${activeScenario.title}.`;

    if (saved && saved.length > 0) {
      // Fix generic placeholder translations or outdated seryusu greetings in saved history if present
      const updatedSaved = saved.map((msg, idx) => {
        let text = msg.text || '';
        let translation = msg.translation || '';

        if (text.toLowerCase().includes('seryusu')) {
          text = text.replace(/seryusu\s+odi/gi, 'switi kon').replace(/seryusu/gi, 'switi');
        }

        if (
          idx === 0 &&
          msg.sender === 'partner' &&
          (!translation ||
            translation === 'Hello! Welcome to our conversation practice session.' ||
            translation.includes('conversation practice session') ||
            msg.text.includes('seryusu'))
        ) {
          return {
            ...msg,
            text: initialGreetingText,
            translation: initialTranslationText
          };
        }
        return {
          ...msg,
          text,
          translation
        };
      });
      setMessages(updatedSaved);
      saveChatHistory(historyKey, updatedSaved);
    } else {
      const initialMessage: ChatMessage = {
        id: `msg_init_${Date.now()}`,
        sender: 'partner',
        text: initialGreetingText,
        translation: initialTranslationText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([initialMessage]);
      saveChatHistory(historyKey, [initialMessage]);
    }
  }, [rawActiveScenario.id, profile.targetLanguage]);

  // Check speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechRecognitionSupported(true);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Save chat history on message change
  const updateMessagesAndSave = (newMsgs: ChatMessage[]) => {
    setMessages(newMsgs);
    const historyKey = `${activeScenario.id}_${profile.targetLanguage}`;
    saveChatHistory(historyKey, newMsgs);
  };

  // Send message to backend Gemini API
  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || inputMessage).trim();
    if (!queryText || isTyping) return;

    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    updateMessagesAndSave(updated);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated,
          scenario: groundedScenario,
          targetLanguage: currentLang.name,
          level: profile.level,
          userRole: groundedScenario.userRole,
          partnerRole: groundedScenario.partnerRole
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error status');
      }

      const data = await response.json();

      const partnerMsg: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'partner',
        text: data.partnerReply,
        translation: data.translation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        corrections: data.corrections || [],
        extractedVocab: data.extractedVocab || [],
        groundingMetadata: data.groundingMetadata
      };

      // Also attach corrections to userMsg if any
      let finalMsgs = [...updated];
      if (data.corrections && data.corrections.length > 0) {
        finalMsgs = finalMsgs.map((m) =>
          m.id === userMsg.id ? { ...m, corrections: data.corrections } : m
        );
      }

      finalMsgs.push(partnerMsg);
      updateMessagesAndSave(finalMsgs);

      // Award XP for participating in conversation turn
      onRecordActivity(15, 1);

      // Auto-speak response if enabled
      if (autoSpeak) {
        handlePlayAudio(partnerMsg.id, partnerMsg.text);
      }
    } catch (err) {
      console.error('Failed to send message', err);
      // Fallback response if API fails or rate limited
      const fallbackMsg: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'partner',
        text: `¡Muy bien! Comprendo tu mensaje. ¿Puedes decirme algo más sobre eso?`,
        translation: 'Very good! I understand your message. Can you tell me something more about that?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      updateMessagesAndSave([...updated, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Play audio for partner reply or phrase
  const handlePlayAudio = async (msgId: string, text: string) => {
    setPlayingAudioId(msgId);
    try {
      await playAudioForText(text, profile.targetLanguage, currentLang.defaultVoice, playbackSpeed);
    } catch (e) {
      console.error('Audio playback error', e);
    } finally {
      setPlayingAudioId(null);
    }
  };

  // Start Mic Recording using SpeechRecognition
  const handleToggleMic = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. You can type your message!');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    const localeMap: Record<string, string> = {
      sr: 'nl-NL'
    };

    recognition.lang = localeMap[profile.targetLanguage] || 'nl-NL';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setInputMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Fetch response hints from AI
  const handleFetchHints = async () => {
    setLoadingHints(true);
    setShowHintsModal(true);
    try {
      const response = await fetch('/api/hints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          scenario: activeScenario,
          targetLanguage: currentLang.name,
          level: profile.level,
          enableRag: true
        })
      });
      const data = await response.json();
      setHints(data.hints || []);
      setHintsGrounding(data.groundingMetadata || null);
    } catch (e) {
      console.error('Failed to load hints', e);
    } finally {
      setLoadingHints(false);
    }
  };

  // Save extracted vocab word to user's notebook
  const handleSaveVocabWord = (item: ExtractedWord) => {
    const cleanWord = item.word.trim();
    if (!cleanWord || isWordSaved(cleanWord)) return;

    onAddVocab({
      word: cleanWord,
      phonetic: item.phonetic,
      translation: item.translation,
      exampleSentence: item.contextSentence,
      exampleTranslation: '',
      language: profile.targetLanguage,
      status: 'new'
    });
    setAddedWordsMap((prev) => ({
      ...prev,
      [cleanWord]: true,
      [cleanWord.toLowerCase()]: true
    }));
  };

  // Reset current scenario chat
  const handleResetChat = () => {
    const initialGreetingText =
      activeScenario.initialGreeting[profile.targetLanguage] ||
      activeScenario.initialGreeting['en'] ||
      `Fa waka! Welcome to ${activeScenario.title}.`;

    const initialMessage: ChatMessage = {
      id: `msg_init_${Date.now()}`,
      sender: 'partner',
      text: initialGreetingText,
      translation:
        activeScenario.initialGreeting['en'] ||
        `Hello! Welcome to ${activeScenario.title}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([initialMessage]);
    const historyKey = `${activeScenario.id}_${profile.targetLanguage}`;
    saveChatHistory(historyKey, [initialMessage]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Scenario Selector Row (Collapsible) */}
      <div className="bg-white border border-[#E8E8DF] rounded-[24px] overflow-hidden shadow-sm transition-all">
        <button
          type="button"
          onClick={() => setShowScenarioSelector(!showScenarioSelector)}
          className="w-full bg-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 hover:bg-[#F9F9F6] transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5A5A40]" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#2C2C24]">Choose Scenario & AI Role</h2>
            </div>
            {!showScenarioSelector && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-[#E5EADD] text-[#5A5A40] rounded-full border border-[#D8DFD0]">
                <span className="w-2 h-2 rounded-full bg-[#5A5A40]" />
                {activeScenario.title} • {activeScenario.partnerRole}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-[#808070] font-medium">
              Target Language: <strong className="text-[#5A5A40]">{currentLang.name}</strong> ({profile.level})
            </span>
            <div className="flex items-center gap-2 bg-[#F9F9F6] hover:bg-[#E5EADD] px-3.5 py-1.5 rounded-full border border-[#E0E0D5] text-xs font-bold text-[#5A5A40] transition-colors">
              <span>{showScenarioSelector ? 'Inklappen' : 'Kies / Wijzig Scenario'}</span>
              {showScenarioSelector ? (
                <ChevronUp className="w-4 h-4 text-[#5A5A40]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#5A5A40]" />
              )}
            </div>
          </div>
        </button>

        {showScenarioSelector && (
          <div className="p-4 sm:p-5 pt-0 border-t border-[#F0F0E8] bg-[#FDFDFB]">
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
              {SCENARIOS.map((sc) => {
                const localizedCard = getLocalizedScenario(sc, profile.targetLanguage);
                const isSelected = rawActiveScenario.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    id={`btn-scenario-${sc.id}`}
                    type="button"
                    onClick={() => setActiveScenario(sc)}
                    className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#E5EADD] border-[#5A5A40] text-[#5A5A40] shadow-xs ring-1 ring-[#5A5A40]/30'
                        : 'bg-white border-[#F0F0E8] text-[#3A3A2F] hover:bg-[#F0F0E8]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            isSelected ? 'bg-[#5A5A40] text-white' : 'bg-[#E0E0D5] text-[#5A5A40]'
                          }`}
                        >
                          {sc.difficulty}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-[#5A5A40]">Actief</span>
                        )}
                      </div>
                      <h3 className="font-bold text-xs text-[#2C2C24] line-clamp-1 mb-1">{localizedCard.title}</h3>
                      <p className="text-[11px] text-[#808070] line-clamp-2 leading-snug">
                        {localizedCard.partnerRole}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Scenario Brief & Preparation Kit */}
      <div className="bg-white border border-[#E8E8DF] rounded-[24px] overflow-hidden shadow-sm">
        <button
          onClick={() => setShowPrepKit(!showPrepKit)}
          className="w-full bg-[#F9F9F6] border-b border-[#F0F0E8] p-4 flex items-center justify-between hover:bg-[#F0F0E8]/60 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#5A5A40]" />
            <div>
              <h3 className="font-serif font-bold text-[#2C2C24] text-base">
                {prepLabels.title}
              </h3>
              <p className="text-xs text-[#808070]">
                {prepLabels.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#5A5A40] bg-[#E5EADD] px-3 py-1 rounded-full border border-[#D8DFD0]">
              {showPrepKit ? prepLabels.hideBrief : prepLabels.openBrief}
            </span>
            {showPrepKit ? (
              <ChevronUp className="w-5 h-5 text-[#808070]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#808070]" />
            )}
          </div>
        </button>

        {showPrepKit && (
          <div className="p-5 space-y-4 bg-white">
            {/* RAG Grounding Status Badge */}
            {groundedResult.groundedCount > 0 && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-[#F0F5E8] border border-[#C5D8B5] text-[#2D5016] text-xs font-normal shadow-2xs leading-relaxed">
                <Sparkles className="w-4 h-4 text-[#437A22] shrink-0 animate-pulse mt-0.5" />
                <span>
                  <strong className="font-semibold text-[#1E380E]">⚡ RAG Knowledge Base Geaard:</strong> {groundedResult.groundedCount} {groundedResult.groundedCount === 1 ? 'expressie' : 'expressies'} gesynchroniseerd vanuit jouw RAG Corpus
                  {groundedResult.groundedTerms.length > 0 && (
                    <span className="opacity-90"> ({groundedResult.groundedTerms.slice(0, 4).join(', ')}{groundedResult.groundedTerms.length > 4 ? '...' : ''})</span>
                  )}.
                </span>
              </div>
            )}

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#F0F0E8] pb-3">
              <button
                onClick={() => setPrepTab('vocab')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  prepTab === 'vocab'
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'bg-[#F9F9F6] text-[#808070] hover:bg-[#F0F0E8]'
                }`}
              >
                <BookPlus className="w-3.5 h-3.5" />
                <span>{prepLabels.vocabTab} ({groundedScenario.keyVocabulary?.length || 0})</span>
              </button>

              <button
                onClick={() => setPrepTab('phrases')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  prepTab === 'phrases'
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'bg-[#F9F9F6] text-[#808070] hover:bg-[#F0F0E8]'
                }`}
              >
                <MessageSquareText className="w-3.5 h-3.5" />
                <span>{prepLabels.phrasesTab} ({groundedScenario.commonPhrases?.length || 0})</span>
              </button>

              <button
                onClick={() => setPrepTab('flow')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  prepTab === 'flow'
                    ? 'bg-[#5A5A40] text-white shadow-xs'
                    : 'bg-[#F9F9F6] text-[#808070] hover:bg-[#F0F0E8]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{prepLabels.flowTab} ({groundedScenario.dialogueFlow?.length || 0} Steps)</span>
              </button>

              {groundedScenario.cultureTip && (
                <button
                  onClick={() => setPrepTab('culture')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    prepTab === 'culture'
                      ? 'bg-[#5A5A40] text-white shadow-xs'
                      : 'bg-[#F9F9F6] text-[#808070] hover:bg-[#F0F0E8]'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{prepLabels.cultureTab}</span>
                </button>
              )}
            </div>

            {/* Tab 1: Key Vocabulary */}
            {prepTab === 'vocab' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {groundedScenario.keyVocabulary?.map((item, idx) => {
                  const isAdded = isWordSaved(item.word);
                  const formatted = formatCardText(item.word);
                  return (
                    <div
                      key={idx}
                      className={`bg-[#F9F9F6] border rounded-2xl p-3.5 flex flex-col justify-between space-y-2 hover:border-[#5A5A40]/40 transition-all shadow-xs ${
                        item.isFromRag ? 'border-amber-300 bg-amber-50/20' : 'border-[#E8E8DF]'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-1 gap-1">
                          <div className="flex flex-col gap-0.5 flex-1 pr-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-sm text-[#2C2C24]">{formatted.title}</span>
                              {item.isFromRag && (
                                <span
                                  className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 tracking-tight flex items-center gap-0.5 shrink-0"
                                  title="Geaard op basis van jouw actieve RAG Knowledge Base"
                                >
                                  <Sparkles className="w-2.5 h-2.5" /> RAG
                                </span>
                              )}
                            </div>
                            {formatted.body && (
                              <p className="text-xs font-normal text-[#5A5A40] mt-0.5 leading-snug">{formatted.body}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handlePlayAudio(`vocab_${idx}`, formatted.title)}
                            className="p-1 text-[#5A5A40] hover:bg-[#E5EADD] rounded-full transition-colors shrink-0 mt-0.5"
                            title="Listen pronunciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.phonetic && (
                          <p className="text-[11px] text-[#808070] italic">[{item.phonetic}]</p>
                        )}
                        <p className="text-xs font-normal text-[#5A5A40] mt-1 leading-snug">{item.translation}</p>
                      </div>

                      <button
                        onClick={() =>
                          handleSaveVocabWord({
                            word: item.word,
                            phonetic: item.phonetic,
                            translation: item.translation,
                            contextSentence: `Used in ${groundedScenario.title}`
                          })
                        }
                        disabled={isAdded}
                        className={`w-full py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                          isAdded
                            ? 'bg-[#E5EADD] text-[#5A5A40] border border-[#D8DFD0] cursor-default'
                            : 'bg-white hover:bg-[#5A5A40] hover:text-white text-[#5A5A40] border border-[#E0E0D5]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-[#5A5A40]" /> {prepLabels.saved}
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" /> {prepLabels.addToNotebook}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Common Phrases */}
            {prepTab === 'phrases' && (
              <div className="space-y-2.5">
                {groundedScenario.commonPhrases?.map((p, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 bg-[#F9F9F6] border rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs hover:border-[#5A5A40]/40 transition-all ${
                      p.isFromRag ? 'border-amber-300 bg-amber-50/20' : 'border-[#E8E8DF]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#2C2C24]">{p.phrase}</span>
                        {p.isFromRag && (
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 tracking-tight flex items-center gap-0.5"
                            title="Geaard op basis van jouw RAG Knowledge Base"
                          >
                            <Sparkles className="w-2.5 h-2.5" /> RAG
                          </span>
                        )}
                        <button
                          onClick={() => handlePlayAudio(`phrase_${idx}`, p.audioText || p.phrase)}
                          className="p-1 text-[#5A5A40] hover:bg-[#E5EADD] rounded-full transition-colors"
                          title="Listen audio"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#808070] italic">"{p.translation}"</p>
                    </div>

                    <button
                      onClick={() => setInputMessage(p.phrase)}
                      className="bg-white hover:bg-[#5A5A40] hover:text-white text-[#5A5A40] border border-[#E0E0D5] text-xs font-bold px-3 py-1.5 rounded-full transition-all shadow-xs"
                    >
                      {prepLabels.useInChat}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Dialogue Flow */}
            {prepTab === 'flow' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {groundedScenario.dialogueFlow?.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F9F9F6] border border-[#E8E8DF] rounded-2xl space-y-2 shadow-xs"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#5A5A40] px-2.5 py-0.5 rounded-full inline-block">
                      {step.stepTitle}
                    </span>
                    <p className="text-xs text-[#3A3A2F] font-semibold">
                      {prepLabels.aiExpects} <span className="italic text-[#808070]">{step.partnerPrompt}</span>
                    </p>
                    <div className="pt-2 border-t border-[#E8E8DF] space-y-1">
                      <p className="text-[11px] font-bold text-[#5A5A40] uppercase">{prepLabels.suggestedReplies}</p>
                      {step.suggestedUserResponses.map((resp, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => setInputMessage(resp)}
                          className="w-full text-left text-xs text-[#2C2C24] hover:text-[#5A5A40] hover:bg-[#E5EADD] p-1.5 rounded-lg transition-colors block border border-transparent hover:border-[#D8DFD0]"
                        >
                          • "{resp}"
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Cultural Pro-Tip */}
            {prepTab === 'culture' && groundedScenario.cultureTip && (
              <div className="p-4 bg-[#FEF9E7] border border-[#F3E5AB] rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-[#D48806] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#2C2C24]">{prepLabels.cultureTab}</h4>
                  <p className="text-xs text-[#5A5A40] leading-relaxed">{groundedScenario.cultureTip}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Conversation Container */}
      <div className="bg-white border border-[#E8E8DF] rounded-[32px] shadow-sm overflow-hidden flex flex-col min-h-[580px] max-h-[750px]">
        {/* Scenario Active Header Bar */}
        <div className="bg-[#F9F9F6] border-b border-[#F0F0E8] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E5EADD] flex items-center justify-center font-bold text-xl text-[#5A5A40] border border-[#D8DFD0] shadow-xs">
              {currentLang.flag}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-[#2C2C24] text-lg">{activeScenario.title}</h3>
                <span className="text-xs bg-[#E5EADD] text-[#5A5A40] font-bold px-2.5 py-0.5 rounded-full border border-[#D8DFD0]">
                  {activeScenario.partnerRole}
                </span>
              </div>
              <p className="text-xs text-[#808070]">
                Location: <span className="text-[#3A3A2F] font-semibold">{activeScenario.location}</span> | Your Role:{' '}
                <span className="text-[#3A3A2F] font-semibold">{activeScenario.userRole}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Auto-speak toggle */}
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                autoSpeak
                  ? 'bg-[#E5EADD] text-[#5A5A40] border-[#D8DFD0]'
                  : 'bg-white text-[#808070] border-[#E0E0D5] hover:bg-[#F5F5F0]'
              }`}
              title={autoSpeak ? 'Auto-speak AI replies is ON' : 'Auto-speak AI replies is OFF'}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Auto-speak: {autoSpeak ? 'ON' : 'OFF'}</span>
            </button>

            {/* Playback speed selector */}
            <div className="flex items-center bg-white border border-[#E0E0D5] rounded-full px-2.5 py-1 text-xs text-[#3A3A2F] gap-1">
              <span className="text-[11px] text-[#808070]">Speed:</span>
              <button
                onClick={() => setPlaybackSpeed(0.75)}
                className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                  playbackSpeed === 0.75 ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#F5F5F0]'
                }`}
              >
                0.75x
              </button>
              <button
                onClick={() => setPlaybackSpeed(0.9)}
                className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                  playbackSpeed === 0.9 ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#F5F5F0]'
                }`}
              >
                1.0x
              </button>
            </div>

            <button
              id="btn-reset-chat"
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-2 text-[#808070] hover:text-[#2C2C24] bg-white hover:bg-[#F5F5F0] rounded-full transition-colors border border-[#E0E0D5]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white">
          {messages.map((msg) => {
            const isPartner = msg.sender === 'partner';
            const showTrans = showTranslations[msg.id];

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isPartner ? 'items-start' : 'items-end'} space-y-1`}
              >
                {/* Sender badge */}
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[11px] font-bold text-[#808070] uppercase tracking-wider">
                    {isPartner ? `${activeScenario.partnerRole} (${currentLang.name})` : 'You'}
                  </span>
                  <span className="text-[10px] text-[#808070]">{msg.timestamp}</span>
                </div>

                {/* Bubble Container */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-xs transition-all ${
                    isPartner
                      ? 'bg-[#F5F5F0] border border-[#E8E8DF] text-[#3A3A2F] rounded-tl-none'
                      : 'bg-[#5A5A40] text-white font-medium rounded-tr-none'
                  }`}
                >
                  <p className="text-base sm:text-lg leading-relaxed">{msg.text}</p>

                  {/* Partner Actions: Play audio, show translation */}
                  {isPartner && (
                    <div className="mt-3 pt-2.5 border-t border-[#E8E8DF] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePlayAudio(msg.id, msg.text)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            playingAudioId === msg.id
                              ? 'bg-[#5A5A40] text-white animate-pulse'
                              : 'bg-white hover:bg-[#E5EADD] text-[#5A5A40] border border-[#E0E0D5]'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{playingAudioId === msg.id ? 'Speaking...' : 'Listen'}</span>
                        </button>

                        {msg.translation && (
                          <button
                            onClick={() =>
                              setShowTranslations((prev) => ({
                                ...prev,
                                [msg.id]: !prev[msg.id]
                              }))
                            }
                            className="text-xs text-[#808070] hover:text-[#2C2C24] underline underline-offset-2 font-semibold"
                          >
                            {showTrans ? 'Hide Translation' : 'Translate'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Translation display */}
                  {isPartner && showTrans && msg.translation && (
                    <div className="mt-2 p-3 bg-white rounded-xl text-xs text-[#5A5A40] border border-[#E0E0D5] italic">
                      "{msg.translation}"
                    </div>
                  )}

                  {/* RAG Grounding Badge */}
                  {isPartner && msg.groundingMetadata && msg.groundingMetadata.ragEnabled && msg.groundingMetadata.sourcesCount > 0 && (
                    <div className="mt-2 text-[11px] text-[#4A6B44] bg-[#E8F0E6] border border-[#D0E0CC] rounded-lg overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setExpandedSourcesMsgId(expandedSourcesMsgId === msg.id ? null : msg.id)}
                        className="w-full px-2.5 py-1.5 font-semibold flex items-center justify-between hover:bg-[#DFEADB] transition-colors cursor-pointer text-left"
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B44] shrink-0" />
                          <span>Grounded by Sranantongo RAG Knowledge Base ({msg.groundingMetadata.sourcesCount} {msg.groundingMetadata.sourcesCount === 1 ? 'source' : 'sources'})</span>
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-[#2F4F2A] font-bold underline shrink-0 ml-2">
                          {expandedSourcesMsgId === msg.id ? (
                            <>
                              <span>Hide sources</span>
                              <ChevronUp className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              <span>View sources</span>
                              <ChevronDown className="w-3 h-3" />
                            </>
                          )}
                        </span>
                      </button>

                      {expandedSourcesMsgId === msg.id && (
                        <div className="p-3 border-t border-[#D0E0CC] bg-[#F2F7F0] space-y-2 text-xs text-[#2A3F26] max-h-64 overflow-y-auto">
                          <p className="font-bold text-[10px] uppercase tracking-wider text-[#4A6B44]">
                            Retrieved Knowledge Base Sources ({msg.groundingMetadata.groundedSnippets.length}):
                          </p>
                          <div className="space-y-2">
                            {msg.groundingMetadata.groundedSnippets.map((snippet, sIdx) => (
                              <div key={sIdx} className="p-2 bg-white rounded-md border border-[#D5E5D0] shadow-2xs">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="font-bold text-[#2E4A2A] text-[11px]">{snippet.title}</span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#E0EFE0] text-[#3D5C38] uppercase font-bold tracking-wide shrink-0">
                                    {snippet.category}
                                  </span>
                                </div>
                                <p className="text-[11px] font-medium text-[#1E2D1B] whitespace-pre-line leading-relaxed">{snippet.srananText}</p>
                                {snippet.translation && (
                                  <p className="text-[10px] text-[#4F6A4A] italic mt-0.5">{snippet.translation}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Inline Grammar Corrections Card (on user message) */}
                  {!isPartner && msg.corrections && msg.corrections.length > 0 && (
                    <div className="mt-2.5 p-3 bg-white/10 rounded-xl border border-white/20 text-xs text-white space-y-1.5 shadow-sm">
                      <div className="flex items-center gap-1.5 font-bold text-amber-200 text-[11px] uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Language Feedback & Correction</span>
                      </div>
                      {msg.corrections.map((corr, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <p className="line-through text-amber-200/70">{corr.originalText}</p>
                          <p className="font-bold text-emerald-200">✓ {corr.suggestedText}</p>
                          <p className="text-[11px] text-white/90 leading-snug">{corr.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Extracted Vocabulary Cards underneath partner replies */}
                {isPartner && msg.extractedVocab && msg.extractedVocab.length > 0 && (() => {
                  const unaddedVocab = msg.extractedVocab.filter((vocab) => !isWordSaved(vocab.word));
                  if (unaddedVocab.length === 0) return null;

                  return (
                    <div className="max-w-[85%] sm:max-w-[75%] mt-1 bg-[#F9F9F6] border border-[#E8E8DF] rounded-2xl p-3 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#5A5A40] uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <BookPlus className="w-3.5 h-3.5 text-[#5A5A40]" /> Key Words Introduced
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {unaddedVocab.map((vocab, vIdx) => {
                          const isAdded = isWordSaved(vocab.word);
                          return (
                            <div
                              key={vIdx}
                              className="bg-white border border-[#E0E0D5] rounded-xl p-2.5 flex items-center justify-between text-xs shadow-xs"
                            >
                              <div className="pr-2">
                                <span className="font-bold text-[#2C2C24] block">{vocab.word}</span>
                                <span className="text-[11px] text-[#808070] italic block">
                                  [{vocab.phonetic}] - {vocab.translation}
                                </span>
                              </div>

                              <button
                                id={`btn-add-vocab-${vIdx}`}
                                onClick={() => handleSaveVocabWord(vocab)}
                                disabled={isAdded}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 ${
                                  isAdded
                                    ? 'bg-[#E5EADD] text-[#5A5A40] border border-[#D8DFD0] cursor-default'
                                    : 'bg-[#5A5A40] hover:bg-[#4A4A34] text-white shadow-xs'
                                }`}
                              >
                                {isAdded ? (
                                  <>
                                    <CheckCircle className="w-3 h-3 text-[#5A5A40]" /> Saved
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3" /> Save
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col items-start space-y-1">
              <span className="text-[11px] font-bold text-[#808070] uppercase tracking-wider px-1">
                {activeScenario.partnerRole} is typing...
              </span>
              <div className="bg-[#F5F5F0] border border-[#E8E8DF] rounded-2xl rounded-tl-none px-4 py-3 shadow-xs">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#5A5A40] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#5A5A40] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#5A5A40] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Controls */}
        <div className="bg-[#F9F9F6] border-t border-[#F0F0E8] p-4 sm:p-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3"
          >
            {/* Mic recording button */}
            <button
              type="button"
              id="btn-voice-input"
              onClick={handleToggleMic}
              className={`p-3.5 rounded-full font-bold transition-all flex items-center justify-center shrink-0 border ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse border-rose-400 shadow-md'
                  : 'bg-[#E5EADD] hover:bg-[#DCE2D4] text-[#5A5A40] border-[#D8DFD0]'
              }`}
              title={isRecording ? 'Click to Stop Recording' : 'Speak into Microphone'}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#5A5A40]" />}
            </button>

            {/* Text Input */}
            <div className="relative flex-1">
              <input
                id="input-chat-message"
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={
                  isRecording
                    ? 'Listening... speak now in target language...'
                    : `Type your response...`
                }
                className="w-full bg-white border border-[#E8E8DF] text-[#2C2C24] rounded-full px-6 py-3.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 transition-all placeholder:text-[#808070]"
              />
            </div>

            {/* What can I say? (Hints) Button */}
            <button
              type="button"
              id="btn-fetch-hints"
              onClick={handleFetchHints}
              className="flex items-center gap-1.5 bg-[#FEF9E7] hover:bg-[#FDF4D5] text-[#D48806] border border-[#F3E5AB] text-xs font-bold px-3.5 py-3.5 sm:px-4 rounded-full transition-all shadow-xs shrink-0 cursor-pointer"
              title="What can I say? (Get response suggestions)"
            >
              <Lightbulb className="w-4 h-4 text-[#D48806]" />
              <span className="hidden sm:inline">What can I say?</span>
            </button>

            {/* Send Button */}
            <button
              type="submit"
              id="btn-send-message"
              disabled={!inputMessage.trim() || isTyping}
              className="bg-[#5A5A40] hover:bg-[#4A4A34] disabled:opacity-40 text-white font-bold p-3.5 rounded-full transition-all shadow-md flex items-center justify-center shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Hints Modal */}
      {showHintsModal && (
        <div className="fixed inset-0 z-50 bg-[#2C2C24]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E8E8DF] rounded-[32px] max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0F0E8] pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Lightbulb className="w-5 h-5 text-[#D48806]" />
                <h3 className="font-serif font-bold text-lg text-[#2C2C24]">Suggested Responses</h3>
                {hintsGrounding?.ragEnabled && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#E5EADD] text-[#3D4D32] px-2 py-0.5 rounded-full border border-[#B5C4A3]">
                    <ShieldCheck className="w-3 h-3 text-[#3D4D32]" />
                    Grounded ({hintsGrounding.sourcesCount} sources)
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowHintsModal(false)}
                className="text-[#808070] hover:text-[#2C2C24] font-bold"
              >
                ✕
              </button>
            </div>

            {loadingHints ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-8 h-8 border-2 border-[#5A5A40] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#808070] font-medium">Generating context-aware responses...</p>
              </div>
            ) : hints.length === 0 ? (
              <p className="text-xs text-[#808070] text-center py-4">No hints available right now.</p>
            ) : (
              <div className="space-y-2.5">
                {hints.map((h, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setInputMessage(h.text);
                      setShowHintsModal(false);
                    }}
                    className="p-3.5 bg-[#F9F9F6] hover:bg-[#F5F5F0] border border-[#E8E8DF] hover:border-[#5A5A40]/60 rounded-2xl cursor-pointer transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#2C2C24]">{h.text}</span>
                      <span className="text-[10px] uppercase font-bold bg-[#E5EADD] text-[#5A5A40] px-2 py-0.5 rounded-full">
                        {h.tone}
                      </span>
                    </div>
                    <p className="text-xs text-[#808070] italic">"{h.translation}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
