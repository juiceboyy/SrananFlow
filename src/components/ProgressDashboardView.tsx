import React from 'react';
import {
  Flame,
  Trophy,
  Zap,
  CheckCircle2,
  Lock,
  Award,
  Calendar,
  Clock,
  BookOpen,
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { calculateLevel } from '../data/achievements';
import { getTodayString } from '../lib/storage';

interface ProgressDashboardViewProps {
  profile: UserProfile;
  onClaimQuestXp?: (questId: string, xp: number) => void;
}

export const ProgressDashboardView: React.FC<ProgressDashboardViewProps> = ({ profile }) => {
  const { level, currentXp, nextLevelXp, title: levelTitle } = calculateLevel(profile.xp);
  const xpPercent = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  // Generate last 14 days for streak calendar
  const todayStr = getTodayString();
  const calendarDays = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(Date.now() - (13 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const isToday = dateStr === todayStr;
    const isPracticed = (profile.streakHistory || []).includes(dateStr);
    return { dateStr, dayName, isToday, isPracticed, dayNum: d.getDate() };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner / Level Header */}
      <div className="bg-[#E5EADD] border border-[#D8DFD0] rounded-[28px] p-6 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-white/80 text-[#5A5A40] border border-[#D8DFD0] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
              <Trophy className="w-3.5 h-3.5 text-[#D48806]" /> Gamified Progress & Milestones
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2C24] tracking-tight">
                Level {level}: {levelTitle}
              </h2>
              <p className="text-xs text-[#5A5A40]">
                Total Experience: <strong className="text-[#5A5A40] font-bold">{profile.xp} XP</strong>
              </p>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-1 max-w-md">
              <div className="flex items-center justify-between text-xs font-bold text-[#3A3A2F]">
                <span>Level Progress</span>
                <span className="text-[#5A5A40]">
                  {currentXp} / {nextLevelXp} XP ({xpPercent}%)
                </span>
              </div>
              <div className="w-full bg-white h-3 rounded-full overflow-hidden border border-[#D8DFD0]">
                <div
                  className="bg-[#5A5A40] h-full rounded-full transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#D8DFD0] rounded-2xl p-4 text-center space-y-1 shadow-xs">
              <span className="text-[10px] font-bold text-[#808070] uppercase tracking-wider block">
                Daily Streak
              </span>
              <span className="text-2xl font-black text-[#D48806] flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-[#D48806] text-[#D48806]" />
                {profile.streakCount} Days
              </span>
            </div>

            <div className="bg-white border border-[#D8DFD0] rounded-2xl p-4 text-center space-y-1 shadow-xs">
              <span className="text-[10px] font-bold text-[#808070] uppercase tracking-wider block">
                Practice Time
              </span>
              <span className="text-2xl font-black text-[#5A5A40] flex items-center justify-center gap-1">
                <Clock className="w-5 h-5 text-[#5A5A40]" />
                {profile.totalMinutes}m
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Calendar Grid */}
      <div className="bg-white border border-[#E8E8DF] rounded-[24px] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#D48806] fill-[#D48806]" />
            <h3 className="font-serif font-bold text-lg text-[#2C2C24]">Daily Streak Tracker</h3>
          </div>
          <span className="text-xs text-[#808070]">Practice daily to keep your flame glowing!</span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
          {calendarDays.map((day, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-1 transition-all ${
                day.isPracticed
                  ? 'bg-[#E5EADD] border-[#5A5A40] text-[#5A5A40] shadow-xs ring-1 ring-[#5A5A40]/30 font-bold'
                  : day.isToday
                  ? 'bg-[#F9F9F6] border-[#E0E0D5] text-[#2C2C24] font-semibold'
                  : 'bg-[#F9F9F6] border-[#F0F0E8] text-[#808070]'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">{day.dayName}</span>
              <span className="text-sm font-bold">{day.dayNum}</span>
              {day.isPracticed ? (
                <Flame className="w-3.5 h-3.5 fill-[#D48806] text-[#D48806]" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-[#E0E0D5]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Quests List */}
        <div className="lg:col-span-5 bg-white border border-[#E8E8DF] rounded-[24px] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F0F0E8] pb-3">
            <Zap className="w-5 h-5 text-[#D48806]" />
            <h3 className="font-serif font-bold text-lg text-[#2C2C24]">Daily Quests</h3>
          </div>

          <div className="space-y-3">
            {profile.dailyQuests.map((quest) => {
              const progressPct = Math.min(
                100,
                Math.round((quest.currentCount / quest.targetCount) * 100)
              );

              return (
                <div
                  key={quest.id}
                  className="p-4 bg-[#F9F9F6] border border-[#E8E8DF] rounded-2xl space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#2C2C24]">{quest.title}</span>
                    <span className="text-[#D48806] font-bold text-xs">+{quest.xpReward} XP</span>
                  </div>

                  <p className="text-[11px] text-[#808070]">{quest.description}</p>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-[#808070] font-medium">
                      <span>
                        {quest.currentCount} / {quest.targetCount} completed
                      </span>
                      <span>{progressPct}%</span>
                    </div>
                    <div className="w-full bg-[#E0E0D5] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#5A5A40] h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Badges Gallery */}
        <div className="lg:col-span-7 bg-white border border-[#E8E8DF] rounded-[24px] p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F0F0E8] pb-3">
            <Award className="w-5 h-5 text-[#D48806]" />
            <h3 className="font-serif font-bold text-lg text-[#2C2C24]">Milestone Badges & Achievements</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.achievements.map((ach) => {
              const isUnlocked = ach.progress >= ach.maxProgress || !!ach.unlockedAt;

              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-[#F9F9F6] border-[#5A5A40]/40 text-[#2C2C24] shadow-xs'
                      : 'bg-[#F9F9F6] border-[#F0F0E8] text-[#808070]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold ${
                      isUnlocked
                        ? 'bg-[#E5EADD] text-[#5A5A40] border border-[#D8DFD0]'
                        : 'bg-[#E0E0D5] text-[#808070]'
                    }`}
                  >
                    {isUnlocked ? <Trophy className="w-5 h-5 text-[#D48806]" /> : <Lock className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-[#2C2C24]">{ach.title}</h4>
                      <span className="text-[10px] font-bold text-[#D48806]">+{ach.xpReward} XP</span>
                    </div>
                    <p className="text-[11px] text-[#808070] leading-snug">{ach.description}</p>
                    <div className="text-[10px] text-[#808070] font-medium">
                      Progress: {ach.progress} / {ach.maxProgress}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
