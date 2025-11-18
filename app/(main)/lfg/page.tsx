/**
 * ANAJAK PLAY - HYBRID LFG SYSTEM
 * Implements "Match-only" (Grab-like) and "Smart Lobby" (Social-like)
 * Based on anajak.md Section 5
 */

'use client';

import { useState, useEffect } from 'react';
import { Zap, Users, Gamepad2, Swords, ArrowRight, Plus, ArrowLeft, Filter, SlidersHorizontal, Mic } from 'lucide-react';
import { LFGSession, GameId } from '@/lib/types/index';
import { LFGCard } from '@/components/lfg/LFGCard';
import CreateLFGSession from '@/components/lfg/CreateLFGSession';
import { mockLFGSessions, gameConfig } from '@/lib/data/mock-data';

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

export default function LFGPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('gateway');
  const [selectedGame, setSelectedGame] = useState<GameId | 'all'>('all');
  const [isSearching, setIsSearching] = useState(false);
  const [rooms, setRooms] = useState<LFGSession[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Smart Filters State
  const [filterRank, setFilterRank] = useState<'all' | 'ranked' | 'casual'>('all');
  const [filterMood, setFilterMood] = useState<'all' | 'fun' | 'serious'>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setRooms(generateMockRooms());
  }, []);

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
    setTimeout(() => {
      setIsSearching(false);
      alert('เจอห้องแล้ว! (Demo)');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white pb-20 font-sans selection:bg-purple-500/30">
      
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

              {/* Right: Toggle & Create */}
              <div className="flex items-center gap-3">
                {/* Toggle Mode */}
                <div className="hidden sm:flex bg-[#18181b]/80 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setViewMode('match')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                      viewMode === 'match'
                        ? 'bg-[#27272a] text-white shadow-md ring-1 ring-white/10'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <Zap className={`w-3 h-3 ${viewMode === 'match' ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                    MATCH
                  </button>
                  <button
                    onClick={() => setViewMode('lobby')}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                      viewMode === 'lobby'
                        ? 'bg-[#27272a] text-white shadow-md ring-1 ring-white/10'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <Users className={`w-3 h-3 ${viewMode === 'lobby' ? 'text-cyan-400 fill-cyan-400' : ''}`} />
                    LOBBY
                  </button>
                </div>

                {/* Create Button (Lobby Only) */}
                {viewMode === 'lobby' && (
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="h-9 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/20 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    สร้างห้อง
                  </button>
                )}
              </div>
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
                        <img src={game.icon} className="w-3.5 h-3.5 rounded-sm opacity-90" alt="" />
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
            
            <div className="relative z-10">
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
                   <select className="w-full bg-[#09090b]/80 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none font-medium cursor-pointer hover:border-white/20">
                     <option>RoV: Ranked</option>
                     <option>Valorant: Unrated</option>
                   </select>
                </div>
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"><Swords size={16} /></div>
                   <select className="w-full bg-[#09090b]/80 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none font-medium cursor-pointer hover:border-white/20">
                     <option>Any Role</option>
                     <option>Carry / Duelist</option>
                     <option>Support / Controller</option>
                   </select>
                </div>
              </div>

              <button
                onClick={handleQuickMatch}
                disabled={isSearching}
                className="w-full max-w-lg py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base rounded-xl shadow-xl shadow-purple-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isSearching ? 'กำลังค้นหา...' : 'เริ่มค้นหา (Start)'}
              </button>
            </div>
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
            {readyRooms.map(room => (
               <div key={room.id} className="relative group/card">
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl opacity-30 blur-md animate-pulse group-hover/card:opacity-50 transition-opacity"></div>
                 <LFGCard session={room} />
               </div>
            ))}
            {openRooms.map(room => (
              <LFGCard key={room.id} session={room} />
            ))}
            {inGameRooms.map(room => (
              <div key={room.id} className="grayscale-[30%] opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-[1.02]">
                <LFGCard session={room} />
              </div>
            ))}
            
            {activeRooms.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-[#13132b]/30">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🦗</div>
                <h3 className="text-lg font-bold text-white mb-1">ไม่มีห้องที่ตรงกับเงื่อนไข</h3>
                <p className="text-gray-400 text-sm mb-6">ลองปรับตัวกรองหรือสร้างห้องใหม่เลย!</p>
                <button onClick={() => setShowCreateModal(true)} className="px-6 py-2.5 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                   + สร้างห้องใหม่
                </button>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl relative animate-slideUp">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 transition-colors"
            >
              ปิด <div className="w-6 h-6 rounded border border-white/20 flex items-center justify-center text-[10px]">ESC</div>
            </button>
            <CreateLFGSession 
              onSessionCreated={() => { setShowCreateModal(false); alert('สร้างห้องสำเร็จ!'); }}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}