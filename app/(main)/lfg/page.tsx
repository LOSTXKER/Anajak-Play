/**
 * ANAJAK PLAY - HYBRID LFG SYSTEM
 * Implements "Match-only" (Grab-like) and "Smart Lobby" (Social-like)
 * Based on anajak.md Section 5
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { LFGSession, GameId, RoleType, MatchRequest, RankTier } from '@/lib/types/index';
import { LFGCard } from '@/components/lfg/LFGCard';
// import CreateLFGSession from '@/components/lfg/CreateLFGSession';
import { mockLFGSessions, mockUsers, gameConfig } from '@/lib/data/mock-data';
import { useParty } from '@/lib/PartyContext';
import { calculateMatchScore, DEFAULT_MATCH_CRITERIA } from '@/lib/utils/matchEngine';
import { 
  Zap, ArrowRight, Users, ArrowLeft, SlidersHorizontal, 
  Gamepad2, Swords, CheckCircle2, Plus 
} from 'lucide-react';

// --- Types for Hybrid System ---
type ViewMode = 'gateway' | 'match' | 'lobby';

// --- Extended Mock Data Generator ---
const generateMockRooms = (): LFGSession[] => {
  return mockLFGSessions.map(session => {
    let status: any = 'matching';
    if (session.id === 'session-2') status = 'ready-check';
    if (session.id === 'session-3') status = 'active';
    return { ...session, status: status };
  });
};

function LFGContent() {
  const router = useRouter();
  const urlParams = useSearchParams();
  const { updateParty, joinParty, openCreateModal } = useParty();
  const [viewMode, setViewMode] = useState<ViewMode>('gateway');
  const [selectedGame, setSelectedGame] = useState<GameId | 'all'>('all');
  
  // Match Engine State
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState<'idle' | 'scanning' | 'analyzing' | 'found'>('idle');
  const [matchResult, setMatchResult] = useState<{ session: LFGSession; score: number } | null>(null);
  const [searchParams, setSearchParams] = useState({
    game: 'rov' as GameId,
    mode: 'Ranked',
    role: 'Any Role'
  });

  const [rooms, setRooms] = useState<LFGSession[]>([]);
  // const [showCreateModal, setShowCreateModal] = useState(false);

  // Smart Filters State
  const [filterRank, setFilterRank] = useState<'all' | 'ranked' | 'casual'>('all');
  const [filterMood, setFilterMood] = useState<'all' | 'fun' | 'serious'>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setRooms(generateMockRooms());
    
    // Check for create action in URL
    if (urlParams.get('create') === 'true') {
      setViewMode('lobby');
      openCreateModal();
      // Remove query param to avoid reopening on refresh? 
      // For now just open.
    }
  }, [urlParams]);

  // Convert LFGSession to Party (Legacy Type for PartyContext)
  const handleJoinRoom = (session: LFGSession) => {
    // Check constraints first (Mock logic)
    const currentUser = mockUsers[0];
    // Use MatchEngine Logic here for realism if needed, but for direct join we skip strict check
    
    const legacyParty: any = {
      id: parseInt(session.id.split('-')[1] || '1'),
      title: `${session.host.displayName}'s Room`,
      desc: session.tags.join(', '),
      game: session.game,
      mode: session.gameMode,
      rank: session.requiredRank || 'Any',
      roles: [],
      requiredRoles: Array.from({ length: session.maxPlayers }).map((_, i) => ({
        role: i === 0 ? 'Leader' : 'Member',
        status: i < session.currentPlayers.length ? 'filled' : 'open',
        player: i < session.currentPlayers.length ? session.currentPlayers[i].user.displayName : undefined,
        avatar: i < session.currentPlayers.length ? session.currentPlayers[i].user.avatar : undefined,
        ready: i < session.currentPlayers.length ? session.currentPlayers[i].isReady : false,
        isLeader: i === 0,
        isMe: false,
      })),
      currentPlayers: session.currentPlayers.length,
      maxPlayers: session.maxPlayers,
      mic: session.voiceOption !== 'no-voice',
      leader: session.host.displayName,
      leaderRep: session.host.reputation.overall,
      leaderAvatar: session.host.avatar || '',
      tags: session.tags,
      time: 'Now',
      voiceChat: session.voiceOption === 'discord' ? { type: 'discord', link: '#' } : undefined
    };

    // Just join as first available open slot for demo
    joinParty(legacyParty, 'Member');
    router.push('/party');
  };

  // const handleSessionCreated = (sessionId: string, formData: any) => {
  //   setShowCreateModal(false);
  //   // ... moved to CreatePartyModalWrapper
  // };

  const activeRooms = rooms.filter(room => {
    if (room.status === 'completed' || room.status === 'cancelled') return false;
    
    // Game Filter
    if (selectedGame !== 'all' && room.game !== selectedGame) return false;
    
    // Rank Filter
    if (filterRank === 'ranked' && room.requiredRank === 'unranked') return false;
    if (filterRank === 'casual' && room.requiredRank !== 'unranked') return false;

    // Mood Filter
    if (filterMood === 'serious' && (room.mood === 'fun' || room.mood === 'chill')) return false;
    if (filterMood === 'fun' && (room.mood === 'tryhard' || room.mood === 'competitive')) return false;

    return true;
  });

  const openRooms = activeRooms.filter(r => r.status === 'matching');
  const readyRooms = activeRooms.filter(r => r.status === 'ready-check');
  const inGameRooms = activeRooms.filter(r => r.status === 'active');

  const handleQuickMatch = () => {
    setIsSearching(true);
    setSearchStep('scanning');
    setMatchResult(null);
    
    // 1. Simulate Scanning
    setTimeout(() => {
      setSearchStep('analyzing');
      
      // 2. Run Match Engine Logic (Mocked but using real utility structure)
      const currentUser = mockUsers[0]; // ProGamerTH
      const mockRequest: MatchRequest = {
        id: 'req-1',
        userId: currentUser.id,
        game: searchParams.game,
        gameMode: searchParams.mode,
        rank: 'diamond', // Assume user rank
        voicePreference: 'discord',
        playstyle: currentUser.profile.playstyle,
        status: 'searching',
        matchCriteria: DEFAULT_MATCH_CRITERIA,
        createdAt: new Date(),
        expiresAt: new Date()
      };

      // Find best match among mock sessions
      let bestMatch: { session: LFGSession; score: number } | null = null;
      
      // Try to find a real match from mock data
      for (const session of mockLFGSessions) {
         if (session.game === searchParams.game && session.status === 'matching') {
            const score = calculateMatchScore(currentUser, mockRequest, session, DEFAULT_MATCH_CRITERIA);
            if (score.isGoodMatch) {
               if (!bestMatch || score.totalScore > bestMatch.score) {
                 bestMatch = { session, score: score.totalScore };
               }
            }
         }
      }

      // If no real match, create a fake one
      if (!bestMatch) {
         // Create a fake session for demo purposes
         bestMatch = {
            session: {
              ...mockLFGSessions[0], 
              id: 'generated-match',
              game: searchParams.game,
              gameMode: searchParams.mode,
            },
            score: 95
         };
      }

      // 3. Found Match
      setTimeout(() => {
        setMatchResult(bestMatch);
        setSearchStep('found');
        setIsSearching(false);
      }, 1500); // Analysis time
    }, 1500); // Scanning time
  };

  const confirmMatch = () => {
    if (matchResult) {
       handleJoinRoom(matchResult.session);
    }
  };

  return (
    <div className="min-h-screen w-full text-white pb-20 font-sans selection:bg-purple-500/30">
      
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] right-[0%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[0%] left-[20%] w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[100px]"></div>
      </div>

      {/* --- VIEW 0: GATEWAY (Split Choice) --- */}
      {viewMode === 'gateway' && (
        <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative z-10 animate-fadeIn">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              เลือกสไตล์การ <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">หาเพื่อนเล่น</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              วันนี้คุณอยากหาทีมแบบไหน? เลือกโหมดที่ใช่ได้เลย
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            {/* Option A: Quick Match */}
            <button
              onClick={() => setViewMode('match')}
              className="group relative bg-[#13132b]/60 border border-white/10 rounded-3xl p-8 text-left hover:border-purple-500/50 hover:bg-[#1a1a35] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-900/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Quick Match (ด่วน)</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  ระบบจับคู่อัตโนมัติ หาเพื่อนร่วมทีมที่เหมาะสมที่สุดตาม Rank และ Role ของคุณ รวดเร็วทันใจ ไม่ต้องเลือกเอง
                </p>
                <div className="flex items-center text-purple-400 text-sm font-bold gap-2 group-hover:gap-3 transition-all">
                  เข้าโหมดจับคู่ <ArrowRight size={16} />
                </div>
              </div>
            </button>

            {/* Option B: Social Lobby */}
            <button
              onClick={() => setViewMode('lobby')}
              className="group relative bg-[#13132b]/60 border border-white/10 rounded-3xl p-8 text-left hover:border-cyan-500/50 hover:bg-[#1a1a35] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-cyan-900/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-cyan-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Social Lobby (เลือกเอง)</h3>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  เดินเลือกห้องเองตามใจชอบ ดูบรรยากาศห้อง เลือกเพื่อนร่วมทีมที่ Vibe ตรงกัน เหมาะสำหรับสายปาร์ตี้
                </p>
                <div className="flex items-center text-cyan-400 text-sm font-bold gap-2 group-hover:gap-3 transition-all">
                  เข้าล็อบบี้ <ArrowRight size={16} />
                </div>
              </div>
            </button>
          </div>
        </main>
      )}

      {/* --- INNER PAGES HEADER (Match/Lobby) --- */}
      {viewMode !== 'gateway' && (
        <div className="sticky top-[65px] z-20 backdrop-blur-xl border-b border-white/5 shadow-sm animate-slideDown">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 space-y-4">
            
            {/* Row 1: Navigation & Actions */}
            <div className="flex items-center justify-between">
              {/* Left: Back & Title */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setViewMode('gateway')}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  title="เปลี่ยนโหมด"
                >
                  <ArrowLeft size={20} />
                </button>
                
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-white leading-none flex items-center gap-2">
                    {viewMode === 'match' ? (
                      <><Zap className="w-4 h-4 text-purple-400" /> Quick Match</>
                    ) : (
                      <><Users className="w-4 h-4 text-cyan-400" /> Social Lobby</>
                    )}
                  </h2>
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">
                    {viewMode === 'match' ? 'Auto-Matching' : 'Manual Selection'}
                  </span>
                </div>
              </div>

              {/* Right: Empty div to maintain spacing if needed, or removed */}
            </div>

            {/* Row 2: Filters (Lobby Only) */}
            {viewMode === 'lobby' && (
              <div className="flex flex-col gap-3 animate-slideDown">
                {/* Game Filter & Expand Toggle */}
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                    <button
                      onClick={() => setSelectedGame('all')}
                      className={`flex-shrink-0 h-8 px-4 rounded-lg text-xs font-bold transition-all border ${
                        selectedGame === 'all' 
                          ? 'bg-white text-black border-white' 
                          : 'bg-[#18181b]/50 text-gray-400 border-white/5 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      ทั้งหมด
                    </button>
                    <div className="w-[1px] h-5 bg-white/10 mx-1"></div>
                    {Object.values(gameConfig).map(game => (
                      <button
                        key={game.id}
                        onClick={() => setSelectedGame(game.id)}
                        className={`flex-shrink-0 flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-bold transition-all border ${
                          selectedGame === game.id 
                            ? 'bg-[#27272a] text-white border-purple-500 shadow-sm' 
                            : 'bg-[#18181b]/50 text-gray-400 border-white/5 hover:bg-white/5 hover:border-white/10'
                        }`}
                      >
                        <Image 
                          src={game.icon} 
                          alt={game.name}
                          width={14}
                          height={14}
                          className="rounded-sm opacity-90" 
                        />
                        {game.name}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`h-8 w-8 flex items-center justify-center rounded-lg border transition-colors ${
                      showFilters ? 'bg-cyan-900/20 text-cyan-400 border-cyan-500/30' : 'bg-[#18181b]/50 text-gray-400 border-white/5 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal size={14} />
                  </button>
                </div>

                {/* Advanced Filters Panel */}
                {showFilters && (
                  <div className="p-4 bg-[#13132b]/40 rounded-xl border border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold mb-1.5 block">Rank Mode</label>
                      <div className="flex gap-1">
                        <button onClick={() => setFilterRank('all')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${filterRank === 'all' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>All</button>
                        <button onClick={() => setFilterRank('ranked')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${filterRank === 'ranked' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-gray-300'}`}>Ranked</button>
                        <button onClick={() => setFilterRank('casual')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${filterRank === 'casual' ? 'bg-green-500/20 text-green-400' : 'text-gray-500 hover:text-gray-300'}`}>Casual</button>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-500 font-bold mb-1.5 block">Vibe / Mood</label>
                      <div className="flex gap-1">
                        <button onClick={() => setFilterMood('all')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${filterMood === 'all' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>All</button>
                        <button onClick={() => setFilterMood('serious')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${filterMood === 'serious' ? 'bg-red-500/20 text-red-400' : 'text-gray-500 hover:text-gray-300'}`}>Serious</button>
                        <button onClick={() => setFilterMood('fun')} className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${filterMood === 'fun' ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}>Fun</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- VIEW A: MATCH MODE --- */}
      {viewMode === 'match' && (
        <main className="max-w-2xl mx-auto px-4 pt-12 animate-fadeIn relative z-10">
          <div className="bg-[#13132b]/50 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-600/30 transition-all duration-500"></div>
            
            {searchStep === 'idle' && (
              <div className="relative z-10 animate-fadeIn">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.15)] relative">
                   <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 border-t-transparent animate-spin-slow"></div>
                   <Zap className="w-10 h-10 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                </div>

                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Quick Match</h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto text-base font-light">
                  ระบบจะหาเพื่อนร่วมทีมที่เหมาะสมที่สุดให้คุณโดยอัตโนมัติ
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 max-w-lg mx-auto">
                  <div className="relative">
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"><Gamepad2 size={16} /></div>
                     <select 
                       value={`${searchParams.game}: ${searchParams.mode}`}
                       onChange={(e) => {
                         const [g, m] = e.target.value.split(': ');
                         setSearchParams({...searchParams, game: g as GameId, mode: m});
                       }}
                       className="w-full bg-[#09090b]/80 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none font-medium cursor-pointer hover:border-white/20"
                     >
                       <option value="rov: Ranked">RoV: Ranked</option>
                       <option value="valorant: Unrated">Valorant: Unrated</option>
                       <option value="valorant: Competitive">Valorant: Competitive</option>
                       <option value="mlbb: Ranked">MLBB: Ranked</option>
                     </select>
                  </div>
                  <div className="relative">
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"><Swords size={16} /></div>
                     <select 
                       value={searchParams.role}
                       onChange={(e) => setSearchParams({...searchParams, role: e.target.value})}
                       className="w-full bg-[#09090b]/80 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none font-medium cursor-pointer hover:border-white/20"
                     >
                       <option>Any Role</option>
                       <option>Carry / Duelist</option>
                       <option>Support / Controller</option>
                       <option>Tank / Initiator</option>
                     </select>
                  </div>
                </div>

                <button
                  onClick={handleQuickMatch}
                  className="w-full max-w-lg py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base rounded-xl shadow-xl shadow-purple-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  เริ่มค้นหา (Start)
                </button>
              </div>
            )}

            {(searchStep === 'scanning' || searchStep === 'analyzing') && (
              <div className="relative z-10 py-8 animate-fadeIn">
                <div className="relative w-32 h-32 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-purple-500/40 animate-spin border-t-transparent"></div>
                  <div className="absolute inset-2 rounded-full bg-[#13132b] flex items-center justify-center">
                     <Zap className="w-12 h-12 text-purple-400 animate-pulse" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  {searchStep === 'scanning' ? 'กำลังค้นหาผู้เล่น...' : 'วิเคราะห์ความเข้ากันได้...'}
                </h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto">
                  {searchStep === 'scanning' 
                    ? `กำลังสแกนหาห้อง ${searchParams.game} ที่ว่างอยู่`
                    : 'ตรวจสอบ Rank, Role, และ Reputation Score'
                  }
                </p>

                <div className="mt-8 flex justify-center gap-2">
                   <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-0"></span>
                   <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></span>
                   <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            {searchStep === 'found' && matchResult && (
              <div className="relative z-10 py-4 animate-fadeIn pb-6">
                 <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <CheckCircle2 size={40} />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-white mb-2">พบห้องที่เหมาะสม!</h3>
                 <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-bold mb-6">
                    Match Score: {matchResult.score}%
                 </div>

                 <div className="bg-[#0a0a16] border border-white/10 rounded-2xl p-4 mb-8 text-left max-w-md mx-auto">
                    <div className="flex items-center gap-4 mb-3">
                       <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden relative">
                          <Image 
                            src={matchResult.session.host.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${matchResult.session.host.username}`} 
                            alt={matchResult.session.host.displayName}
                            fill
                            className="object-cover"
                          />
                       </div>
                       <div>
                          <div className="font-bold text-white">{matchResult.session.host.displayName}&apos;s Party</div>
                          <div className="text-xs text-gray-400">{matchResult.session.gameMode} • {matchResult.session.requiredRank || 'Unranked'}</div>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       {matchResult.session.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-400">{tag}</span>
                       ))}
                    </div>
                 </div>

                 <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
                   <button
                      onClick={confirmMatch}
                      className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold text-base rounded-xl shadow-lg transition-all transform hover:scale-[1.02]"
                   >
                      เข้าร่วมทันที (Join Now)
                   </button>
                   <button 
                      onClick={() => setSearchStep('idle')}
                      className="text-gray-500 hover:text-white text-sm py-2"
                   >
                      ค้นหาใหม่
                   </button>
                 </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* --- VIEW B: LOBBY MODE --- */}
      {viewMode === 'lobby' && (
        <main className="max-w-7xl mx-auto px-4 md:px-6 pt-6 animate-fadeIn relative z-10">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-white tracking-tight">ห้องที่เปิดอยู่ (Active Rooms)</h2>
              <span className="px-2.5 py-0.5 bg-[#27272a] rounded-md text-xs font-bold text-gray-400 border border-white/10">
                {activeRooms.length}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500 font-medium">
               <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span> ว่าง (Open)</div>
               <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></span> กำลังเริ่ม</div>
               <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> เล่นอยู่</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* Create New Room Card - Always First */}
            <button 
               onClick={() => openCreateModal()}
               className="group relative flex flex-col items-center justify-center min-h-[200px] rounded-2xl border-2 border-dashed border-white/10 hover:border-purple-500/50 bg-[#13132b]/20 hover:bg-[#13132b]/40 transition-all duration-300 hover:-translate-y-1"
            >
               <div className="w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-purple-500/20 group-hover:border-purple-500/50">
                  <Plus className="w-8 h-8 text-purple-400" />
               </div>
               <h3 className="text-lg font-bold text-white mb-1">สร้างห้องใหม่</h3>
               <p className="text-xs text-gray-500">Create New Room</p>
            </button>

            {readyRooms.map(room => (
               <div key={room.id} className="relative group/card">
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl opacity-30 blur-md animate-pulse group-hover/card:opacity-50 transition-opacity"></div>
                 <LFGCard session={room} onJoin={handleJoinRoom} />
               </div>
            ))}
            {openRooms.map(room => (
              <LFGCard key={room.id} session={room} onJoin={handleJoinRoom} />
            ))}
            {inGameRooms.map(room => (
              <div key={room.id} className="grayscale-[30%] opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-[1.02]">
                <LFGCard session={room} onJoin={handleJoinRoom} />
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Create Modal removed - handled globally or by CreatePartyModalWrapper via useParty context */}
    </div>
  );
}

export default function LFGPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading...</div>}>
      <LFGContent />
    </Suspense>
  );
}
