/**
 * LFG Session Card Component - Updated for Hybrid LFG
 * Handles Active, Ready, and Matching states with Premium Visuals.
 */

'use client';

import React from 'react';
import { Users, Mic, MicOff, Gamepad2, Star, Shield, Trophy, Activity, Clock, ArrowRight } from 'lucide-react';
import { LFGSession } from '@/lib/types/index';

interface LFGCardProps {
  session: LFGSession;
  onJoin?: (session: LFGSession) => void;
}

export const LFGCard: React.FC<LFGCardProps> = ({ session, onJoin }) => {
  const timeAgo = Math.floor((Date.now() - session.createdAt.getTime()) / 60000);
  const currentPlayersCount = session.currentPlayers.length;
  const spotsLeft = session.maxPlayers - currentPlayersCount;
  
  // Status Logic
  const isActive = session.status === 'active'; // In Game
  const isReadyCheck = session.status === 'ready-check'; // Preparing
  const isMatching = session.status === 'matching'; // Open
  
  // Game Theme Colors (Mock)
  const gameColor = 
    session.game === 'rov' ? 'from-orange-500 to-red-600' :
    session.game === 'valorant' ? 'from-red-500 to-rose-600' :
    session.game === 'genshin' ? 'from-yellow-400 to-orange-500' :
    'from-blue-500 to-cyan-500';

  const borderColor =
    session.game === 'rov' ? 'group-hover:border-orange-500/50' :
    session.game === 'valorant' ? 'group-hover:border-red-500/50' :
    'group-hover:border-cyan-500/50';

  // Styling based on status
  const containerClass = `
    group relative overflow-hidden rounded-2xl transition-all duration-300 flex flex-col h-full
    ${isActive 
      ? 'bg-[#0a0a12] border border-white/5 opacity-60 grayscale-[30%]' 
      : `bg-[#13132b] border border-white/5 ${borderColor} hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/20`
    }
    ${isReadyCheck ? 'ring-1 ring-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.15)]' : ''}
  `;

  return (
    <div className={containerClass}>
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gameColor} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none`}></div>
      
      {/* Top Bar: Status & Time */}
      <div className="relative px-5 pt-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className={`
            px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border
            ${isActive ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
              isReadyCheck ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 animate-pulse' : 
              'bg-green-500/10 text-green-400 border-green-500/20'}
          `}>
            <Activity className="w-3 h-3" />
            {isActive ? 'In Game' : isReadyCheck ? 'Preparing' : 'Open'}
          </span>
          
          {spotsLeft > 0 && spotsLeft <= 2 && !isActive && (
            <span className="text-[10px] font-bold text-orange-400 animate-pulse flex items-center gap-1">
              🔥 {spotsLeft} Left
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
          <Clock className="w-3 h-3" />
          {timeAgo < 1 ? 'Just now' : `${timeAgo}m`}
        </div>
      </div>

      {/* Host Info Section */}
      <div className="relative px-5 py-4 flex items-start gap-4 z-10">
        <div className="relative flex-shrink-0">
          <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-br ${gameColor} opacity-0 group-hover:opacity-100 transition-opacity blur-sm`}></div>
          <img 
            src={session.host.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.host.displayName}`} 
            alt={session.host.displayName} 
            className="relative w-12 h-12 rounded-full bg-gray-900 border-2 border-[#1e1e38] object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#13132b] rounded-full p-0.5 border border-white/10">
            <Shield className="w-3.5 h-3.5 text-yellow-400 fill-current" />
          </div>
        </div>
        
        <div className="min-w-0 flex-1">
          <h4 className="text-white font-bold text-base leading-tight truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
            {session.host.displayName}
          </h4>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20">
              <Star className="w-3 h-3 text-yellow-400 fill-current" /> 
              <span className="text-[10px] font-bold text-yellow-400">{session.host.reputation.overall / 20}</span>
            </div>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
               Lvl.{session.host.level}
            </span>
          </div>
        </div>
      </div>

      {/* Game Details Grid */}
      <div className="relative px-5 pb-4 z-10">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-black/20 rounded-lg p-2 border border-white/5 group-hover:border-white/10 transition-colors">
            <div className="text-[10px] text-gray-500 uppercase mb-0.5">Mode</div>
            <div className="text-xs text-white font-semibold truncate">{session.gameMode}</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2 border border-white/5 group-hover:border-white/10 transition-colors">
            <div className="text-[10px] text-gray-500 uppercase mb-0.5">Rank</div>
            <div className={`text-xs font-semibold truncate ${
              session.requiredRank === 'unranked' ? 'text-gray-400' : 'text-cyan-400'
            }`}>
              {session.requiredRank ? session.requiredRank.toUpperCase() : 'ANY'}
            </div>
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className={`
            text-[10px] px-2 py-1 rounded-md border flex items-center gap-1 font-bold
            ${session.mood === 'tryhard' ? 'bg-red-900/20 text-red-400 border-red-500/20' : 
              session.mood === 'fun' ? 'bg-green-900/20 text-green-400 border-green-500/20' : 
              'bg-blue-900/20 text-blue-400 border-blue-500/20'}
          `}>
            {session.mood === 'tryhard' && '🔥 Tryhard'}
            {session.mood === 'fun' && '😆 Fun'}
            {session.mood === 'chill' && '😌 Chill'}
            {session.mood === 'competitive' && '⚔️ Comp'}
          </span>

          <span className="text-[10px] px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1 font-medium">
            {session.voiceOption === 'discord' ? <Mic className="w-3 h-3" /> : 
             session.voiceOption === 'no-voice' ? <MicOff className="w-3 h-3" /> : 
             <Gamepad2 className="w-3 h-3" />}
            {session.voiceOption === 'discord' ? 'Discord' : 
             session.voiceOption === 'no-voice' ? 'No Mic' : 'In-Game'}
          </span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative mt-auto border-t border-white/5 bg-black/20 px-5 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {session.currentPlayers.slice(0, 3).map((p, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gray-800 border border-[#13132b] flex items-center justify-center overflow-hidden">
                 <img 
                   src={p.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.user.displayName}`} 
                   className="w-full h-full object-cover" 
                   alt=""
                 />
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">
            <span className={currentPlayersCount >= session.maxPlayers ? 'text-red-400' : 'text-white'}>{currentPlayersCount}</span>
            /{session.maxPlayers}
          </span>
        </div>

        <button 
          onClick={() => onJoin?.(session)}
          disabled={isActive || isReadyCheck || spotsLeft === 0}
          className={`
            h-8 px-4 rounded-lg text-xs font-bold flex items-center gap-1 transition-all
            ${isActive || isReadyCheck 
              ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
              : spotsLeft === 0 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20 cursor-not-allowed'
                : `bg-gradient-to-r ${gameColor} text-white shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 hover:scale-105`
            }
          `}
        >
          {isActive ? 'Playing' : 
           isReadyCheck ? 'Starting' : 
           spotsLeft === 0 ? 'Full' : 'Join'}
          {!isActive && !isReadyCheck && spotsLeft > 0 && <ArrowRight className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
