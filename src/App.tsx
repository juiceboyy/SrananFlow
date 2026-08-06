import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  VocabItem,
  LanguageCode,
  ProficiencyLevel,
  VocabStatus
} from './types';
import {
  loadUserProfile,
  saveUserProfile,
  loadVocabItems,
  saveVocabItems,
  recordPracticeActivity
} from './lib/storage';
import { Navbar } from './components/Navbar';
import { ConversationView } from './components/ConversationView';
import { PronunciationLabView } from './components/PronunciationLabView';
import { VocabularyView } from './components/VocabularyView';
import { ProgressDashboardView } from './components/ProgressDashboardView';
import { CorpusManagerView } from './components/CorpusManagerView';
import { StreakModal } from './components/StreakModal';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(loadUserProfile);
  const [vocabItems, setVocabItems] = useState<VocabItem[]>(loadVocabItems);
  const [activeTab, setActiveTab] = useState<
    'conversation' | 'pronunciation' | 'vocabulary' | 'achievements' | 'rag'
  >('conversation');

  const [showStreakModal, setShowStreakModal] = useState(false);

  // Sync profile to localStorage on change
  useEffect(() => {
    saveUserProfile(profile);
  }, [profile]);

  // Sync vocab items to localStorage on change
  useEffect(() => {
    saveVocabItems(vocabItems);
  }, [vocabItems]);

  const handleLanguageChange = (code: LanguageCode) => {
    setProfile((prev) => ({ ...prev, targetLanguage: code }));
  };

  const handleLevelChange = (level: ProficiencyLevel) => {
    setProfile((prev) => ({ ...prev, level }));
  };

  const handleAddVocab = (
    newItemData: Omit<VocabItem, 'id' | 'dateAdded' | 'reviewCount' | 'correctCount'>
  ) => {
    const cleanWord = newItemData.word.trim();
    if (!cleanWord) return;

    const normKey = cleanWord.toLowerCase();
    const alreadyExists = vocabItems.some(
      (item) => item.word.trim().toLowerCase() === normKey
    );

    if (alreadyExists) {
      console.log(`Word "${cleanWord}" is already in the Vocabulary Notebook.`);
      return;
    }

    const newItem: VocabItem = {
      ...newItemData,
      word: cleanWord,
      id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      dateAdded: new Date().toISOString().split('T')[0],
      reviewCount: 0,
      correctCount: 0
    };

    setVocabItems((prev) => [newItem, ...prev]);

    // Record activity XP and update vocab achievement count
    handleRecordActivity(10, 0);

    setProfile((prev) => {
      const newVocabCount = prev.totalWordsLearned + 1;
      const updatedAch = prev.achievements.map((ach) => {
        if (ach.id === 'vocab_10' && newVocabCount >= 10) {
          return { ...ach, progress: 10, unlockedAt: new Date().toISOString() };
        }
        if (ach.id === 'vocab_50' && newVocabCount >= 50) {
          return { ...ach, progress: 50, unlockedAt: new Date().toISOString() };
        }
        if (ach.category === 'vocab') {
          return { ...ach, progress: Math.min(newVocabCount, ach.maxProgress) };
        }
        return ach;
      });

      return {
        ...prev,
        totalWordsLearned: newVocabCount,
        achievements: updatedAch
      };
    });
  };

  const handleUpdateVocabStatus = (id: string, status: VocabStatus) => {
    setVocabItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleUpdateVocabItem = (updatedItem: VocabItem) => {
    setVocabItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteVocab = (id: string) => {
    setVocabItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRecordActivity = (xpEarned: number, minutes: number) => {
    const { updatedProfile } = recordPracticeActivity(profile, xpEarned, minutes);
    setProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#3A3A2F] font-sans selection:bg-[#E5EADD] selection:text-[#5A5A40]">
      <Navbar
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLanguageChange={handleLanguageChange}
        onLevelChange={handleLevelChange}
        onOpenStreakModal={() => setShowStreakModal(true)}
      />

      <main className="pb-12">
        {activeTab === 'conversation' && (
          <ConversationView
            profile={profile}
            vocabItems={vocabItems}
            onAddVocab={handleAddVocab}
            onRecordActivity={handleRecordActivity}
          />
        )}

        {activeTab === 'pronunciation' && (
          <PronunciationLabView
            profile={profile}
            onRecordActivity={handleRecordActivity}
          />
        )}

        {activeTab === 'vocabulary' && (
          <VocabularyView
            items={vocabItems}
            targetLanguage={profile.targetLanguage}
            onAddItem={handleAddVocab}
            onUpdateStatus={handleUpdateVocabStatus}
            onUpdateItem={handleUpdateVocabItem}
            onDeleteItem={handleDeleteVocab}
            onRecordActivity={handleRecordActivity}
          />
        )}

        {activeTab === 'achievements' && (
          <ProgressDashboardView profile={profile} />
        )}

        {activeTab === 'rag' && <CorpusManagerView />}
      </main>

      {showStreakModal && (
        <StreakModal profile={profile} onClose={() => setShowStreakModal(false)} />
      )}
    </div>
  );
}
