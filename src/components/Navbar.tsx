import React from 'react';
import {
  MessageSquare,
  Mic,
  BookOpen,
  Trophy,
  Flame,
  Zap,
  Globe,
  ChevronDown,
  Sparkles,
  Database
} from 'lucide-react';
import { UserProfile, LanguageCode, ProficiencyLevel } from '../types';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../data/languages';
import { calculateLevel } from '../data/achievements';

interface NavbarProps {
  profile: UserProfile;
  activeTab: 'conversation' | 'pronunciation' | 'vocabulary' | 'achievements' | 'rag';
  setActiveTab: (
    tab: 'conversation' | 'pronunciation' | 'vocabulary' | 'achievements' | 'rag'
  ) => void;
  onLanguageChange: (code: LanguageCode) => void;
  onLevelChange: (level: ProficiencyLevel) => void;
  onOpenStreakModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeTab,
  setActiveTab,
  onLanguageChange,
  onLevelChange,
  onOpenStreakModal
}) => {
  const currentLang = getLanguageByCode(profile.targetLanguage);
  const { level, currentXp, nextLevelXp, title: levelTitle } = calculateLevel(profile.xp);
  const xpPercent = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-[#E0E0D5] text-[#2C2C24] transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5A5A40] text-white font-serif font-bold text-xl flex items-center justify-center shadow-sm">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-2xl text-[#2C2C24] tracking-tight">
                  SrananFlow
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E5EADD] text-[#5A5A40] border border-[#D8DFD0] px-2 py-0.5 rounded-full">
                  AI Partner
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#EFEFE8]/80 p-1.5 rounded-2xl border border-[#E0E0D5]">
            <button
              id="nav-tab-conversation"
              onClick={() => setActiveTab('conversation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'conversation'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'text-[#808070] hover:text-[#2C2C24] hover:bg-white/60'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Chat Partner</span>
            </button>

            <button
              id="nav-tab-pronunciation"
              onClick={() => setActiveTab('pronunciation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pronunciation'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'text-[#808070] hover:text-[#2C2C24] hover:bg-white/60'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Pronunciation Lab</span>
            </button>

            <button
              id="nav-tab-vocabulary"
              onClick={() => setActiveTab('vocabulary')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'vocabulary'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'text-[#808070] hover:text-[#2C2C24] hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Vocab Bank</span>
            </button>

            <button
              id="nav-tab-achievements"
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'achievements'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'text-[#808070] hover:text-[#2C2C24] hover:bg-white/60'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Milestones & XP</span>
            </button>

            <button
              id="nav-tab-rag"
              onClick={() => setActiveTab('rag')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'rag'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'text-[#808070] hover:text-[#2C2C24] hover:bg-white/60'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Corpus & RAG</span>
            </button>
          </nav>

          {/* User Controls: Level, Streak & XP */}
          <div className="flex items-center gap-2.5">
            {/* Proficiency Level Selector */}
            <div className="relative">
              <div className="bg-[#E5EADD] border border-[#D8DFD0] hover:bg-[#DCE2D4] rounded-full px-3 py-1.5 cursor-pointer text-xs font-bold text-[#5A5A40] flex items-center gap-1 transition-colors">
                <span>{profile.level}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A5A40]" />
              </div>
              <select
                id="select-proficiency-level"
                value={profile.level}
                onChange={(e) => onLevelChange(e.target.value as ProficiencyLevel)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                <option value="A1" className="bg-white text-[#2C2C24]">A1 - Beginner</option>
                <option value="A2" className="bg-white text-[#2C2C24]">A2 - Elementary</option>
                <option value="B1" className="bg-white text-[#2C2C24]">B1 - Intermediate</option>
                <option value="B2" className="bg-white text-[#2C2C24]">B2 - Upper Int.</option>
                <option value="C1" className="bg-white text-[#2C2C24]">C1 - Advanced</option>
              </select>
            </div>

            {/* Daily Streak Counter */}
            <button
              id="btn-streak-counter"
              onClick={onOpenStreakModal}
              className="flex items-center gap-1.5 bg-[#FEF9E7] border border-[#F3E5AB] hover:bg-[#FDF4D5] text-[#D48806] px-3.5 py-1.5 rounded-full font-bold text-xs transition-all shadow-xs"
              title="Click to view Streak & Daily Practice Goals"
            >
              <Flame className="w-4 h-4 fill-[#D48806] text-[#D48806]" />
              <span>{profile.streakCount} Day{profile.streakCount === 1 ? '' : 's'}</span>
            </button>

            {/* XP Level Badge */}
            <div
              onClick={() => setActiveTab('achievements')}
              className="hidden lg:flex flex-col justify-center bg-white border border-[#E0E0D5] rounded-2xl px-3 py-1 cursor-pointer hover:border-[#5A5A40]/40 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between text-[11px] gap-2">
                <span className="font-bold text-[#2C2C24]">Lvl {level}</span>
                <span className="text-[#D48806] font-extrabold flex items-center gap-0.5">
                  <Zap className="w-3 h-3 fill-[#D48806] text-[#D48806]" />
                  {profile.xp} XP
                </span>
              </div>
              <div className="w-20 bg-[#F5F5F0] h-1.5 rounded-full overflow-hidden mt-0.5 border border-[#E8E8DF]">
                <div
                  className="bg-[#5A5A40] h-full rounded-full transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="flex md:hidden border-t border-[#E0E0D5] py-2 justify-around text-xs">
          <button
            id="mobile-nav-conversation"
            onClick={() => setActiveTab('conversation')}
            className={`flex flex-col items-center gap-1 p-1 font-bold ${
              activeTab === 'conversation' ? 'text-[#5A5A40]' : 'text-[#808070]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat</span>
          </button>
          <button
            id="mobile-nav-pronunciation"
            onClick={() => setActiveTab('pronunciation')}
            className={`flex flex-col items-center gap-1 p-1 font-bold ${
              activeTab === 'pronunciation' ? 'text-[#5A5A40]' : 'text-[#808070]'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Speech</span>
          </button>
          <button
            id="mobile-nav-vocabulary"
            onClick={() => setActiveTab('vocabulary')}
            className={`flex flex-col items-center gap-1 p-1 font-bold ${
              activeTab === 'vocabulary' ? 'text-[#5A5A40]' : 'text-[#808070]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Vocab</span>
          </button>
          <button
            id="mobile-nav-achievements"
            onClick={() => setActiveTab('achievements')}
            className={`flex flex-col items-center gap-1 p-1 font-bold ${
              activeTab === 'achievements' ? 'text-[#5A5A40]' : 'text-[#808070]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Goals</span>
          </button>
          <button
            id="mobile-nav-rag"
            onClick={() => setActiveTab('rag')}
            className={`flex flex-col items-center gap-1 p-1 font-bold ${
              activeTab === 'rag' ? 'text-[#5A5A40]' : 'text-[#808070]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>RAG</span>
          </button>
        </div>
      </div>
    </header>
  );
};
