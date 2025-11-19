'use client';

import React, { useState } from 'react';
import { Zap, Trophy, Star, Crown } from 'lucide-react';
import { mockUsers } from '@/lib/data/mock-data';
import { DailyChestModal } from '@/components/gamification/DailyChestModal';

interface UserProgressCardProps {
  compact?: boolean;
  className?: string;
}

export function UserProgressCard({ compact = false, className = '' }: UserProgressCardProps) {
  const user = mockUsers[0]; // Mock current user
  const progress = (user.exp / user.expToNextLevel) * 100;
  
  const [isChestOpen, setIsChestOpen] = useState(false);

  // Helper to get main game rank
  const mainGame = user.profile.mainGames.find(g => g.isMain) || user.profile.mainGames[0];

  return (
    <>
      <div className={`bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl p-1 border border-white/10 relative overflow-hidden group ${className}`}>
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 opacity-50 group-hover:opacity-100 transition-opacity blur-md"></div>
        
        <div className={`relative bg-[#0a0a12] rounded-xl p-6 flex items-center gap-6 ${compact ? 'flex-col text-center' : 'flex-col md:flex-row'}`}>
          
          {/* Avatar & Level */}
          <div className="relative shrink-0">
            <div className={`rounded-full p-1 bg-gradient-to-br from-purple-500 to-cyan-500 ${compact ? 'w-24 h-24' : 'w-20 h-20'}`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-[#13132b]">
                <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#09090b] px-3 py-0.5 rounded-full border border-purple-500/30 text-[10px] font-bold text-white shadow-lg flex items-center gap-1 whitespace-nowrap">
               <span className="text-purple-400">LV.</span> {user.level}
            </div>
          </div>

          {/* Stats & Progress */}
          <div className={`flex-1 w-full ${compact ? 'text-center' : 'text-center md:text-left'}`}>
            <div className={`flex flex-col items-center mb-2 ${compact ? '' : 'md:flex-row md:justify-between'}`}>
               <div className={compact ? 'mb-3' : ''}>
                 <h3 className={`text-xl font-bold text-white flex items-center gap-2 justify-center ${compact ? '' : 'md:justify-start'}`}>
                   {user.displayName}
                   {user.reputation.tier === 'excellent' && <Crown size={16} className="text-yellow-400" fill="currentColor" />}
                 </h3>
                 <p className={`text-xs text-gray-400 flex items-center gap-2 justify-center ${compact ? '' : 'md:justify-start'}`}>
                   <span className="uppercase">{mainGame?.game} • {mainGame?.rank}</span>
                   <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                   <span>{user.profile.playstyle[0]}</span>
                 </p>
               </div>
               
               <div className={`flex items-center gap-4 mt-3 ${compact ? 'w-full justify-center' : 'md:mt-0'}`}>
                 <div className="text-center px-3 py-1 bg-white/5 rounded-lg border border-white/5 flex-1 md:flex-none">
                   <div className="text-xs text-gray-400 uppercase font-bold">Reputation</div>
                   <div className="text-lg font-bold text-cyan-400">{user.reputation.overall}</div>
                 </div>
                 <div className="text-center px-3 py-1 bg-white/5 rounded-lg border border-white/5 flex-1 md:flex-none">
                   <div className="text-xs text-gray-400 uppercase font-bold">Sessions</div>
                   <div className="text-lg font-bold text-purple-400">{user.profile.completedSessions}</div>
                 </div>
               </div>
            </div>

            {/* EXP Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">
                <span>EXP Progress</span>
                <span className="text-purple-400">{user.exp.toLocaleString()} / {user.expToNextLevel.toLocaleString()}</span>
              </div>
              <div className="w-full h-2.5 bg-[#13132b] rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action (Daily) */}
          <div className={`shrink-0 ${compact ? 'w-full' : 'hidden md:block'}`}>
            <button 
              onClick={() => setIsChestOpen(true)}
              className={`flex items-center justify-center rounded-xl bg-gradient-to-b from-purple-900/20 to-blue-900/20 border border-white/10 hover:border-purple-500/50 transition-all group/btn ${compact ? 'w-full py-3 gap-3' : 'flex-col w-20 h-20'}`}
            >
               <Trophy className={`text-yellow-400 group-hover/btn:scale-110 transition-transform ${compact ? 'w-5 h-5' : 'mb-1 w-6 h-6'}`} />
               <div className={compact ? 'text-left flex-1' : 'text-center'}>
                 <div className={`text-[10px] font-bold text-gray-300 group-hover/btn:text-white ${compact ? 'text-xs' : ''}`}>Daily Reward</div>
                 <div className="text-[10px] text-green-400">Ready to claim!</div>
               </div>
               {compact && <span className="text-xs text-white bg-white/10 px-2 py-1 rounded mr-2">Open</span>}
            </button>
          </div>

        </div>
      </div>

      <DailyChestModal isOpen={isChestOpen} onClose={() => setIsChestOpen(false)} />
    </>
  );
}
