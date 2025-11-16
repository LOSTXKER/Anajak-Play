'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameSelector from '@/components/GameSelector';
import HeroAction from '@/components/HeroAction';
import LobbyCard from '@/components/LobbyCard';
import TinderMode from '@/components/TinderMode';
import CreatePartyModal from '@/components/CreatePartyModal';
import PartyJoinModal from '@/components/PartyJoinModal';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { partiesData } from '@/lib/mockData';
import { Party } from '@/lib/types';
import { useParty } from '@/lib/PartyContext';
import Link from 'next/link';
import { Filter, Layers, Plus, Search, Shield, Sparkles, Users, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { joinParty } = useParty();
  const [parties, setParties] = useState<Party[]>(partiesData);
  const [showTinderMode, setShowTinderMode] = useState(false);
  const [showCreateParty, setShowCreateParty] = useState(false);
  const [showJoinParty, setShowJoinParty] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filterTiers = [
    {
      id: 'global',
      title: 'Global Filters',
      description: 'เวลา ภาษา ไมค์ Playstyle',
      badge: 'ใช้ได้ทุกเกม',
      icon: <Filter className="w-5 h-5 text-cyan-300" />,
      gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      id: 'game',
      title: 'Game Specific',
      description: 'Role • Mode • Rank',
      badge: 'Auto-load ตามเกม',
      icon: <Layers className="w-5 h-5 text-purple-300" />,
      gradient: 'from-purple-500/20 to-indigo-500/20',
    },
    {
      id: 'ai',
      title: 'Personality AI',
      description: 'วิเคราะห์ vibe + toxicity',
      badge: 'Killer Feature',
      icon: <Sparkles className="w-5 h-5 text-yellow-300" />,
      gradient: 'from-amber-400/20 to-pink-500/20',
    },
  ];

  const filteredParties = useMemo(() => {
    if (!searchTerm.trim()) return parties;
    const query = searchTerm.toLowerCase();
    return parties.filter(
      (party) =>
        party.title.toLowerCase().includes(query) ||
        party.game.toLowerCase().includes(query) ||
        party.mode.toLowerCase().includes(query)
    );
  }, [parties, searchTerm]);

  // ลบ auto-redirect ออก เพื่อให้สามารถอยู่หน้าแรกได้แม้มี party
  // ผู้ใช้สามารถกลับมาหน้าแรกได้ตลอด

  const handleJoinClick = (party: Party) => {
    // แสดง Modal เพื่อเลือก Role
    setSelectedParty(party);
    setShowJoinParty(true);
  };

  const handleJoinConfirm = (party: Party, selectedRole: string) => {
    // เข้าห้องกับ Role ที่เลือก
    joinParty(party, selectedRole);
    setShowJoinParty(false);
    // redirect ไป /party หลังจาก join
    router.push('/party');
  };

  const handleCreateParty = () => {
    setShowCreateParty(true);
  };

  const handleCreatePartyConfirm = (newParty: Party) => {
    setParties([newParty, ...parties]);
    setShowCreateParty(false);
    // สร้างปาร์ตี้แล้วเข้าเลย (เป็น Leader อัตโนมัติ)
    const leaderRole = newParty.requiredRoles.find(r => r.isLeader)?.role || newParty.requiredRoles[0].role;
    joinParty(newParty, leaderRole);
    // redirect ไป /party
    router.push('/party');
  };

  const handleTinderMode = () => {
    setShowTinderMode(true);
  };

  return (
    <DashboardLayout enableChat>
      {showTinderMode && <TinderMode onExit={() => setShowTinderMode(false)} />}
      {showCreateParty && (
        <CreatePartyModal 
          onClose={() => setShowCreateParty(false)}
          onCreate={handleCreatePartyConfirm}
        />
      )}
      {showJoinParty && selectedParty && (
        <PartyJoinModal 
          party={selectedParty}
          onClose={() => setShowJoinParty(false)}
          onConfirm={handleJoinConfirm}
        />
      )}

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search เกม / โหมด / ปาร์ตี้"
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">เลือกเกมหรือพิมพ์คำค้น ระบบจะแนะนำ Global/Game Filter ให้อัตโนมัติ</p>
      </div>

      <HeroAction 
        onCreateClick={handleCreateParty}
        onTinderClick={handleTinderMode}
      />

      <div className="grid gap-4 md:grid-cols-3 mb-10">
        {filterTiers.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-2xl border border-white/10 bg-gradient-to-br ${tier.gradient} p-4`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center">
                {tier.icon}
              </div>
              <div>
                <p className="text-sm text-white font-semibold">{tier.title}</p>
                <p className="text-xs text-gray-300">{tier.description}</p>
              </div>
            </div>
            <span className="inline-flex text-[10px] px-2 py-0.5 rounded-full bg-black/30 text-gray-200 border border-white/10">
              {tier.badge}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1">
                <GameSelector 
                  title="เกมที่คุณเล่นบ่อย"
                  subtitle="เลือกเกม ระบบจะโหลด Role / Rank มาตรฐานให้อัตโนมัติ"
                />
                
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
                    🔥 หาตี้ด่วนสำหรับคุณ
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition">
                      กรอง
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition">
                      รีเฟรช
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                  {isLoading ? (
                    // Loading Skeleton
                    <>
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-[#13132b] rounded-2xl border border-white/10 p-5 animate-pulse">
                          <div className="h-5 bg-white/10 rounded w-3/4 mb-4"></div>
                          <div className="flex gap-2 mb-4">
                            <div className="h-6 w-16 bg-white/10 rounded"></div>
                            <div className="h-6 w-20 bg-white/10 rounded"></div>
                          </div>
                          <div className="grid grid-cols-5 gap-2 mb-4">
                            {[1,2,3,4,5].map(j => (
                              <div key={j} className="h-12 bg-white/10 rounded"></div>
                            ))}
                          </div>
                          <div className="h-10 bg-white/10 rounded"></div>
                        </div>
                      ))}
                    </>
                  ) : filteredParties.length === 0 ? (
                    // Empty State
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Users className="w-12 h-12 text-gray-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">ไม่มีห้องที่เปิดรับ</h3>
                      <p className="text-gray-400 mb-6 max-w-md">
                        ไม่พบห้องที่ตรงกับ {searchTerm ? `คำค้น ${searchTerm}` : 'ตัวกรองนี้'}<br/>
                        ลองปรับตัวกรอง หรือตั้งห้องใหม่ได้เลย
                      </p>
                      <button 
                        onClick={handleCreateParty}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-bold hover:opacity-90 transition flex items-center gap-2"
                      >
                        <Plus size={20} /> สร้างปาร์ตี้ใหม่
                      </button>
                    </div>
                  ) : (
                    <>
                      {filteredParties.map(party => (
                        <LobbyCard 
                          key={party.id} 
                          party={party} 
                          onJoin={handleJoinClick}
                        />
                      ))}
                      
                      {/* Mock Loading/More Card */}
                      <div className="border-2 border-dashed border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-500 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer min-h-[250px]">
                        <Plus className="w-8 h-8 mb-2 opacity-50" />
                        <span className="font-semibold">ดูห้องเพิ่มเติม...</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sidebar (Right) */}
              <div className="hidden lg:block w-80 space-y-6">
                {/* Reputation Teaser */}
                <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-5 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Shield className="w-24 h-24 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">ระบบชื่อเสียง</h4>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl font-bold text-yellow-400">4.8</div>
                    <div className="text-xs text-gray-400">
                      คะแนนของคุณ <br/> ระดับ: <span className="text-cyan-400">Pro Player</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">รักษาเครดิตดี หางานง่าย หาตี้ไว</p>
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-yellow-400 w-[85%] h-full"></div>
                  </div>
                </div>

                {/* Marketplace Teaser */}
                <div className="bg-[#0f0f1a] rounded-2xl p-5 border border-white/5 opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-white">Anajak Market</h4>
                    <Link 
                      href="/market"
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      ดูทั้งหมด
                    </Link>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition">
                      <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center text-blue-400">
                        <Users size={16}/>
                      </div>
                      <div className="text-sm text-gray-300">Hire to Play (จ้างเล่น)</div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition">
                      <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center text-green-400">
                        <Zap size={16}/>
                      </div>
                      <div className="text-sm text-gray-300">Coaching (จ้างโค้ช)</div>
                    </div>
                  </div>
                </div>

                {/* Online Friends */}
                <div className="bg-[#0f0f1a] rounded-2xl p-5 border border-white/5">
                  <h4 className="font-bold text-white mb-4 flex justify-between items-center">
                    เพื่อนที่ออนไลน์ 
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">4</span>
                  </h4>
                  <ul className="space-y-3">
                    {[1,2,3,4].map((i) => (
                      <li key={i} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                            <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*32}`} 
                              alt="friend"
                            />
                          </div>
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0f0f1a] rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-300 group-hover:text-white">Gamer_{i}99</div>
                          <div className="text-[10px] text-gray-500">กำลังเล่น RoV</div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-1.5 bg-white/10 rounded hover:bg-purple-500 transition-all">
                          <Plus size={12} className="text-white"/>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          </div>
    </DashboardLayout>
  );
}
