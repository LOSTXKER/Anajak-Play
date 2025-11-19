'use client';

import React, { useState } from 'react';
import HeroAction from '@/components/HeroAction';
import { DynamicHomeCards } from '@/components/home/DynamicHomeCards';
import LFGFilterPanel from '@/components/LFGFilterPanel';
import { ActivityFeed } from '@/components/feed/ActivityFeed';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { gameFilterOptions, globalFilters, gameFilterConfig } from '@/lib/config/filterConfig';
import { notificationsData } from '@/lib/data/legacy-data';

// MOCK DATA for Feed
const mockFeedItems = notificationsData.map(n => ({
  id: n.id,
  type: (Math.random() > 0.5 ? 'match' : 'session-start') as any, // Cast to any to avoid strict type check for mock
  userId: 'u1',
  user: {
    id: 'u1',
    username: 'gamer_1',
    displayName: 'Gamer One',
    level: 10,
    exp: 500,
    expToNextLevel: 1000,
    reputation: {
      overall: 4.5,
      tier: 'good',
      behavior: 100,
      reliability: 100,
      teamwork: 100,
      totalReviews: 10,
      positiveReviews: 10,
      negativeReviews: 0,
      badges: []
    },
    createdAt: new Date(),
    lastActive: new Date(),
    profile: {
      userId: 'u1',
      mainGames: [],
      playstyle: [],
      preferredRoles: [],
      totalSessions: 0,
      completedSessions: 0,
      friendCount: 0
    },
    isOnline: true,
    cosmetics: {
      ownedFrames: [],
      ownedBackgrounds: [],
      ownedTitles: []
    }
  },
  data: { message: n.message },
  createdAt: n.createdAt
}));

export default function DashboardPage() {
  const { openAuthModal } = useAuth();
  const router = useRouter();

  // Filter State
  const [selectedGame, setSelectedGame] = useState<string>('rov');
  const [globalSelections, setGlobalSelections] = useState<Record<string, string[]>>({});
  const [gameSelections, setGameSelections] = useState<Record<string, string[]>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleCreateParty = () => {
    // Simple mock logic
    console.log("Create party clicked");
  };

  const handleTinderMode = () => {
     router.push('/features/swipe');
  };

  const handleToggleFilter = (layer: 'global' | 'game', filterId: string, value: string) => {
    const setSelections = layer === 'global' ? setGlobalSelections : setGameSelections;
    setSelections((prev) => {
      const current = prev[filterId] || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterId]: newValues };
    });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section - Guest Welcome / Quick Actions */}
      <HeroAction 
        onCreateClick={handleCreateParty}
        onFindClick={() => {
           const element = document.getElementById('lfg-feed');
           element?.scrollIntoView({ behavior: 'smooth' });
        }}
        onTinderClick={handleTinderMode}
      />

      {/* Dynamic Cards (Trends, Highlights) */}
      <DynamicHomeCards />

      {/* Main Content Area: LFG & Feed */}
      <div id="lfg-feed" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Center: Activity Feed & Rooms */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                Lobby กิจกรรม
              </h2>
           </div>

           {/* Filter Panel */}
           <LFGFilterPanel 
             selectedGame={selectedGame}
             onSelectGame={setSelectedGame}
             gameOptions={gameFilterOptions}
             globalFilters={globalFilters}
             gameFilters={gameFilterConfig[selectedGame]}
             globalSelections={globalSelections}
             gameSelections={gameSelections}
             onToggleFilter={handleToggleFilter}
             showAdvanced={showAdvanced}
             onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
           />

           {/* Feed Content */}
           <ActivityFeed initialActivities={mockFeedItems as any} />
        </div>
      </div>
    </div>
  );
}
