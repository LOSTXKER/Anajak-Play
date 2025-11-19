'use client';

import React, { useEffect, useState } from 'react';
import { Zap, Activity } from 'lucide-react';
import { LivePresenceEvent, PlatformStats } from '@/lib/types/index';

const accentStyles: Record<string, string> = {
  purple: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
  blue: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  gold: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
  green: 'border-green-500/30 bg-green-500/10 text-green-300',
  pink: 'border-pink-500/30 bg-pink-500/10 text-pink-300'
};

// MOCK DATA GENERATOR
const generateEvents = (): LivePresenceEvent[] => [
  { id: '1', type: 'match', icon: '🎮', message: 'ProGamer_TH matched in RoV Ranked', accent: 'purple', timestamp: new Date() },
  { id: '2', type: 'session', icon: '🔥', message: 'New Valorant Lobby created (3/5)', accent: 'blue', timestamp: new Date() },
  { id: '3', type: 'marketplace', icon: '💎', message: 'Rare Skin sold for ฿1,500', accent: 'gold', timestamp: new Date() },
  { id: '4', type: 'achievement', icon: '🏆', message: 'Komsan reached Conqueror Rank', accent: 'purple', timestamp: new Date() },
  { id: '5', type: 'match', icon: '❤️', message: 'New Match in Swipe Friend!', accent: 'pink', timestamp: new Date() },
  { id: '6', type: 'session', icon: '⚔️', message: 'Genshin Impact Boss Rush starting', accent: 'blue', timestamp: new Date() },
];

export default function LandingLivePresence() {
  const [stats] = useState<PlatformStats>({
    onlineUsers: 12450,
    matchingNow: 856,
    activeSessions: 342,
    updatedAt: new Date()
  });
  
  const [events] = useState<LivePresenceEvent[]>(generateEvents());

  // Hydration fix
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="h-[60px]"></div>; // Placeholder to prevent CLS

  return (
    <div className="w-full overflow-hidden py-4 border-y border-white/5 bg-[#05050a]/80 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6">
        
        {/* Stats Section */}
        <div className="flex items-center gap-6 shrink-0 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-white font-bold tracking-wider text-sm">LIVE NOW</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="flex gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-white font-mono">{stats.onlineUsers.toLocaleString()}</span>
                    <span className="hidden sm:inline">Online</span>
                </span>
                <span className="flex items-center gap-1.5">
                    <Activity size={14} className="text-green-400" />
                    <span className="text-white font-mono">{stats.matchingNow.toLocaleString()}</span>
                    <span className="hidden sm:inline">Matches</span>
                </span>
            </div>
        </div>

        {/* Marquee Section */}
        <div className="flex-1 overflow-hidden relative w-full">
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#05050a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#05050a] to-transparent z-10 pointer-events-none"></div>

            <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
                {[...events, ...events, ...events].map((event, idx) => (
                    <div 
                        key={`${event.id}-${idx}`}
                        className={`
                            flex items-center gap-3 px-4 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap
                            ${accentStyles[event.accent || 'purple'] || accentStyles.purple}
                            transition-all hover:scale-105 cursor-default
                        `}
                    >
                        <span className="text-base">{event.icon}</span>
                        <span>{event.message}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}

