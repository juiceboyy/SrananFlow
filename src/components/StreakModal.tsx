import React from 'react';
import { Flame, CheckCircle2, Clock, Zap, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface StreakModalProps {
  profile: UserProfile;
  onClose: () => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({ profile, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#2C2C24]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E8E8DF] rounded-[32px] max-w-md w-full p-6 shadow-xl text-center space-y-5 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#E5EADD] border border-[#D8DFD0] flex items-center justify-center mx-auto text-[#D48806] shadow-xs">
            <Flame className="w-9 h-9 fill-[#D48806] text-[#D48806]" />
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-[#2C2C24]">
              {profile.streakCount} Day Streak Flame!
            </h3>
            <p className="text-xs text-[#808070] mt-1 leading-relaxed">
              You are building consistent language habit momentum. Keep practicing daily to protect your streak!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 relative z-10 text-left">
          <div className="p-3.5 bg-[#F9F9F6] border border-[#E8E8DF] rounded-[20px] space-y-1">
            <span className="text-[10px] font-bold text-[#808070] uppercase tracking-wider block">
              Today's Goal
            </span>
            <span className="text-sm font-bold text-[#2C2C24] flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#5A5A40]" />
              {profile.todayMinutesPracticed} / {profile.dailyGoalMinutes} mins
            </span>
          </div>

          <div className="p-3.5 bg-[#F9F9F6] border border-[#E8E8DF] rounded-[20px] space-y-1">
            <span className="text-[10px] font-bold text-[#808070] uppercase tracking-wider block">
              XP Gained Today
            </span>
            <span className="text-sm font-bold text-[#D48806] flex items-center gap-1">
              <Zap className="w-4 h-4 fill-[#D48806] text-[#D48806]" />
              +{profile.todayXpGained} XP
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#5A5A40] hover:bg-[#4A4A34] text-white font-bold py-3 rounded-full transition-all shadow-md"
        >
          Keep Learning
        </button>
      </div>
    </div>
  );
};
