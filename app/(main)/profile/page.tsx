'use client';

import React, { useState } from 'react';
import { mockUsers } from '@/lib/data/mock-data';
import { 
  Shield, 
  Star, 
  Gamepad2, 
  Edit, 
  History, 
  Trophy, 
  ThumbsUp, 
  Users, 
  Zap,
  Clock,
  Calendar
} from 'lucide-react';
import { MoodSelector } from '@/components/profile/MoodSelector';
import { MoodStatus } from '@/lib/types/index';

export default function ProfilePage() {
  // Simulate logged-in user (ProGamerTH)
  const [user, setUser] = useState(mockUsers[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  const [isMoodSelectorOpen, setIsMoodSelectorOpen] = useState(false);

  const getReputationTier = (score: number) => {
    if (score >= 90) return { label: 'EXCELLENT', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/20' };
    if (score >= 80) return { label: 'VERY GOOD', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' };
    if (score >= 70) return { label: 'GOOD', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' };
    if (score >= 60) return { label: 'FAIR', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' };
    return { label: 'POOR', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
  };
  
  const repTier = getReputationTier(user.reputation.overall);

  // Mock Session History Data (Local for Prototype)
  const sessionHistory = [
    {
      id: 1,
      game: 'RoV',
      mode: 'Ranked',
      result: 'WIN',
      date: '2 hours ago',
      duration: '18m',
      teammates: [mockUsers[1], mockUsers[2], mockUsers[3]],
      chemScore: '+5',
      repGained: 2,
      tags: ['Tryhard', 'Good Comms']
    },
    {
      id: 2,
      game: 'Valorant',
      mode: 'Unrated',
      result: 'LOSE',
      date: 'Yesterday',
      duration: '32m',
      teammates: [mockUsers[2]],
      chemScore: '+2',
      repGained: 1,
      tags: ['Chill', 'Fun']
    },
    {
      id: 3,
      game: 'RoV',
      mode: 'Clash',
      result: 'WIN',
      date: '2 days ago',
      duration: '15m',
      teammates: [mockUsers[1], mockUsers[3]],
      chemScore: '+8',
      repGained: 3,
      tags: ['Stomp', 'Fast Game']
    }
  ];

  const handleMoodSelect = (mood: MoodStatus) => {
    setUser(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        currentMood: mood
      }
    }));
  };

  const getMoodDisplay = (mood?: MoodStatus) => {
     switch(mood) {
        case 'tryhard': return { icon: '🔥', label: 'Tryhard Mode', color: 'purple' };
        case 'fun': return { icon: '😆', label: 'Just for Fun', color: 'yellow' };
        case 'chill': return { icon: '☕', label: 'Chilling', color: 'blue' };
        case 'competitive': return { icon: '⚔️', label: 'Competitive', color: 'red' };
        case 'social': return { icon: '💬', label: 'Socialize', color: 'green' };
        default: return { icon: '🎮', label: 'Ready to Play', color: 'gray' };
     }
  };

  const moodInfo = getMoodDisplay(user.profile.currentMood);

  return (
    <div className="min-h-screen bg-[#09090b] text-white pb-20 font-sans selection:bg-purple-500/30">
      {/* Background Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-10 pb-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start gap-8">
            
            {/* Avatar & Frame */}
            <div className="relative group">
              {/* Frame Glow */}
              <div className="absolute -inset-3 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500"></div>
              
              {/* Actual Frame (Mocking a Legendary Frame) */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 relative z-10">
                <div className="w-full h-full rounded-full border-4 border-[#09090b] overflow-hidden bg-[#13132b]">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Level Badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#09090b] p-1 rounded-full">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs md:text-sm font-bold px-3 py-0.5 rounded-full shadow-lg whitespace-nowrap border border-white/10">
                    LV {user.level}
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 flex items-center gap-3">
                    {user.displayName}
                    <Shield className="w-6 h-6 text-cyan-400 fill-cyan-400/20" />
                  </h1>
                  <p className="text-gray-400 flex items-center gap-2">
                    @{user.username}
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <span className="text-green-400 text-xs font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
                    </span>
                  </p>
                </div>

                {/* Edit & Share Actions */}
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition flex items-center gap-2">
                    <Edit size={16} />
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Mood & Stats Row */}
              <div className="flex flex-wrap gap-4 mb-6">
                {/* Mood Status (Interactive) */}
                <button 
                   onClick={() => setIsMoodSelectorOpen(true)}
                   className="px-4 py-2 bg-[#1a1a2e] border border-purple-500/30 rounded-xl flex items-center gap-3 hover:bg-[#202040] hover:border-purple-500/50 transition-all group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{moodInfo.icon}</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase text-purple-400 font-bold tracking-wider">Mood Today</div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                       {moodInfo.label} <Edit size={12} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </button>

                {/* Reputation Summary */}
                <div className={`px-4 py-2 ${repTier.bg} border ${repTier.border} rounded-xl flex items-center gap-3`}>
                  <div className="text-center leading-none">
                    <div className={`text-xl font-bold ${repTier.color}`}>{user.reputation.overall}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Reputation</div>
                    <div className={`text-sm font-bold ${repTier.color}`}>{repTier.label}</div>
                  </div>
                </div>
              </div>

              {/* EXP Bar */}
              <div className="max-w-xl">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>EXP Progress</span>
                  <span className="text-white">{user.exp.toLocaleString()} / {user.expToNextLevel.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    style={{ width: `${(user.exp / user.expToNextLevel) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 mb-8">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-purple-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'history' ? 'border-purple-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            Session History <span className="ml-2 px-1.5 py-0.5 bg-white/10 rounded-full text-xs">3</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* --- TAB: OVERVIEW --- */}
            {activeTab === 'overview' && (
              <>
                {/* Bio Section */}
                {user.profile.bio && (
                  <div className="bg-[#13131f]/50 border border-white/5 rounded-2xl p-6">
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3">Bio</h3>
                    <p className="text-gray-200 leading-relaxed">
                      &quot;{user.profile.bio}&quot;
                    </p>
                  </div>
                )}

                {/* Main Games */}
                <section>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Gamepad2 className="text-purple-400" /> Main Games
                  </h2>
                  <div className="grid gap-4">
                    {user.profile.mainGames.map((gameProfile, idx) => (
                      <div key={idx} className="bg-[#13131f] border border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:border-purple-500/30 transition-colors">
                        {/* Game Icon */}
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-lg ${
                          gameProfile.game === 'rov' ? 'bg-gradient-to-br from-red-900 to-red-600' :
                          gameProfile.game === 'valorant' ? 'bg-gradient-to-br from-red-500 to-pink-600' :
                          'bg-gray-800'
                        }`}>
                          {gameProfile.game === 'rov' ? '⚔️' : gameProfile.game === 'valorant' ? '🔫' : '🎮'}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg text-white capitalize">{gameProfile.game}</h3>
                            {gameProfile.isMain && <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-bold rounded border border-purple-500/30">MAIN</span>}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                             <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-sm">
                               <Trophy size={14} />
                               <span className="capitalize">{gameProfile.rank}</span>
                             </div>
                             <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                             <div className="flex gap-1">
                               {gameProfile.role.map(r => (
                                 <span key={r} className="text-xs text-gray-400 capitalize">{r}</span>
                               ))}
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Playstyle Tags */}
                <section>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-400" /> Playstyle & Roles
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {user.profile.playstyle.map((style, idx) => (
                      <span key={idx} className="px-4 py-2 bg-[#1a1a2e] border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:border-white/30 transition-colors cursor-default">
                        #{style}
                      </span>
                    ))}
                    {user.profile.preferredRoles.map((role, idx) => (
                      <span key={idx} className="px-4 py-2 bg-[#1a1a2e] border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:border-white/30 transition-colors cursor-default">
                        Main {role}
                      </span>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* --- TAB: SESSION HISTORY (New for V5) --- */}
            {activeTab === 'history' && (
              <div className="space-y-4 animate-fadeIn">
                {sessionHistory.map((session) => (
                  <div key={session.id} className="group bg-[#13131f] border border-white/10 rounded-2xl p-5 hover:bg-[#1a1a2e] transition-all">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-4">
                      <div className="flex items-center gap-4">
                        {/* Game Icon */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${
                          session.game === 'RoV' ? 'bg-red-900/20 text-red-400' : 'bg-pink-900/20 text-pink-400'
                        }`}>
                          {session.game === 'RoV' ? '⚔️' : '🔫'}
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-white flex items-center gap-2">
                            {session.game} <span className="text-gray-500 text-sm font-normal">• {session.mode}</span>
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {session.date}</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {session.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Result Badge */}
                      <div className={`px-4 py-1.5 rounded-lg font-bold text-sm tracking-wide self-start md:self-center ${
                        session.result === 'WIN' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {session.result}
                      </div>
                    </div>

                    {/* Session Details: Teammates & Rewards */}
                    <div className="bg-[#09090b] rounded-xl p-3 flex flex-wrap items-center justify-between gap-4">
                      
                      {/* Teammates */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 uppercase font-bold mr-1">Party</span>
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full border-2 border-[#09090b] bg-gray-700 flex items-center justify-center text-[10px] text-white">You</div>
                          {session.teammates.map((mate, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#09090b] overflow-hidden bg-gray-800" title={mate.displayName}>
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mate.username}`} className="w-full h-full" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rewards */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                          <Star size={12} /> Rep +{session.repGained}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-pink-400 bg-pink-500/10 px-2 py-1 rounded">
                          <Users size={12} /> Chem {session.chemScore}
                        </div>
                      </div>

                    </div>
                  </div>
                ))}

                <div className="text-center py-8">
                  <button className="text-sm text-gray-500 hover:text-white transition-colors">Load older sessions...</button>
                </div>
              </div>
            )}

          </div>
          
          {/* RIGHT COLUMN (Stats & Badges) */}
          <div className="space-y-6">
            
            {/* Reputation Detail Card */}
            <div className="bg-[#13132b] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield size={80} />
              </div>
              
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="text-cyan-400" size={20} />
                Reputation Health
              </h3>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Behavior</span>
                    <span className="text-green-400 font-bold">{user.reputation.behavior}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${user.reputation.behavior}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Reliability</span>
                    <span className="text-cyan-400 font-bold">{user.reputation.reliability}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${user.reputation.reliability}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Teamwork</span>
                    <span className="text-purple-400 font-bold">{user.reputation.teamwork}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${user.reputation.teamwork}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user.reputation.positiveReviews}</div>
                  <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                    <ThumbsUp size={12} /> Positive
                  </div>
                </div>
                <div className="text-center border-l border-white/10">
                  <div className="text-2xl font-bold text-white">{user.reputation.totalReviews}</div>
                  <div className="text-xs text-gray-400 mt-1">Total Reviews</div>
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="bg-[#13131f] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-400" size={20} />
                Badges & Achievements
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {user.reputation.badges && user.reputation.badges.map((badge, idx) => (
                  <div key={idx} className="aspect-square bg-[#1a1a2e] border border-white/5 rounded-xl flex flex-col items-center justify-center p-2 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-colors cursor-pointer group">
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{badge.icon}</div>
                    <div className="text-[10px] text-center text-gray-400 font-medium leading-tight">{badge.name}</div>
                  </div>
                ))}
                {/* Empty Slot Placeholder */}
                <div className="aspect-square bg-transparent border border-dashed border-white/10 rounded-xl flex items-center justify-center opacity-50">
                  <div className="w-8 h-8 rounded-full bg-white/5"></div>
                </div>
              </div>
            </div>

            {/* Friends Preview */}
            <div className="bg-[#13131f] border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Users className="text-blue-400" size={20} />
                  Friends ({user.profile.friendCount})
                </h3>
                <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
              </div>
              <div className="flex items-center gap-2 overflow-x-hidden">
                {[1,2,3,4,5].map((i) => (
                   <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-[#13131f] flex-shrink-0 overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=friend${i}`} className="w-full h-full" />
                   </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-[#1a1a2e] border-2 border-dashed border-white/10 flex items-center justify-center text-xs text-gray-500">
                  +20
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <MoodSelector 
         isOpen={isMoodSelectorOpen}
         onClose={() => setIsMoodSelectorOpen(false)}
         onSelect={handleMoodSelect}
         currentMood={user.profile.currentMood}
      />
    </div>
  );
}
