'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GameSelector from '@/components/GameSelector';
import HeroAction from '@/components/HeroAction';
import TinderMode from '@/components/TinderMode';
import CreatePartyModal from '@/components/CreatePartyModal';
import PartyJoinModal from '@/components/PartyJoinModal';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { SearchBar, FilterTiersSection, PartiesGrid, HomeSidebar } from '@/components/home';
import { useParty } from '@/lib/PartyContext';
import type { Party } from '@/lib/types';

// Mock data - จะถูกแทนที่ด้วย API call ในอนาคต
const MOCK_PARTIES: Party[] = [
  {
    id: 101,
    title: "ไต่แรงค์ Conqueror ขอคนงานดี ไม่หัวร้อน",
    desc: "ขอคนเล่นเป็นทีมครับ ไม่เน้นคิล เน้นชนะ ฟังคอลได้ ขาดแครี่กับซัพพอร์ตครับ",
    game: "RoV",
    mode: "Ranked",
    rank: "Diamond - Conqueror",
    roles: ["Carry", "Support"],
    requiredRoles: [
      { role: "Jungle", status: "filled", player: "KiraGod", avatar: "KiraGod", ready: true, isLeader: true },
      { role: "Carry", status: "open" },
      { role: "Support", status: "open" },
      { role: "Mage", status: "filled", player: "MageGod", avatar: "MageGod", ready: true },
      { role: "Fighter", status: "filled", player: "TopLaner007", avatar: "TopLaner007", ready: false },
    ],
    currentPlayers: 3,
    maxPlayers: 5,
    mic: true,
    leader: "KiraGod",
    leaderRep: 4.9,
    leaderAvatar: "KiraGod",
    tags: ["Serious", "No Toxic"],
    time: "Now",
    voiceChat: { type: "discord", link: "https://discord.gg/anajak-party-101" },
    timeSlot: 'evening',
    languages: ['th'],
    playstyle: 'tryhard',
    toxicTolerance: 'low',
    neededPlayers: 2,
    personalityTag: 'Shotcaller',
    urgency: 'now'
  },
  {
    id: 102,
    title: "Valo Chill unrated เล่นขำๆ ฝึกเอเจนท์",
    desc: "เล่นชิลๆ ครับ ใครเพิ่งหัดเล่นมาได้เลย ไม่ซีเรียสแพ้ชนะ",
    game: "Valorant",
    mode: "Unrated",
    rank: "Silver - Gold",
    roles: ["Any"],
    requiredRoles: [
      { role: "Controller", status: "filled", player: "Smoker", avatar: "Smoker", ready: true, isLeader: true },
      { role: "Any", status: "open" },
      { role: "Any", status: "open" },
      { role: "Any", status: "open" },
      { role: "Duelist", status: "filled", player: "NongMind", avatar: "NongMind", ready: true },
    ],
    currentPlayers: 2,
    maxPlayers: 5,
    mic: false,
    leader: "Smoker",
    leaderRep: 4.5,
    leaderAvatar: "Smoker",
    tags: ["Fun", "Newbie Welcome"],
    time: "2m ago",
    timeSlot: 'evening',
    languages: ['th', 'en'],
    playstyle: 'chill',
    toxicTolerance: 'medium',
    neededPlayers: 3,
    personalityTag: 'Meme lord',
    urgency: 'soon'
  }
];

export default function Home() {
  const router = useRouter();
  const { joinParty } = useParty();
  const [parties, setParties] = useState<Party[]>(MOCK_PARTIES);
  const [showTinderMode, setShowTinderMode] = useState(false);
  const [showCreateParty, setShowCreateParty] = useState(false);
  const [showJoinParty, setShowJoinParty] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleJoinClick = (party: Party) => {
    setSelectedParty(party);
    setShowJoinParty(true);
  };

  const handleJoinConfirm = (party: Party, selectedRole: string) => {
    joinParty(party, selectedRole);
    setShowJoinParty(false);
    router.push('/party');
  };

  const handleCreateParty = () => {
    setShowCreateParty(true);
  };

  const handleCreatePartyConfirm = (newParty: Party) => {
    setParties([newParty, ...parties]);
    setShowCreateParty(false);
    const leaderRole = newParty.requiredRoles.find(r => r.isLeader)?.role || newParty.requiredRoles[0].role;
    joinParty(newParty, leaderRole);
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

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <HeroAction 
        onCreateClick={handleCreateParty}
        onTinderClick={handleTinderMode}
      />

      <FilterTiersSection />

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

          <PartiesGrid
            parties={filteredParties}
            isLoading={isLoading}
            searchTerm={searchTerm}
            onJoinClick={handleJoinClick}
            onCreateParty={handleCreateParty}
          />
        </div>

        {/* Sidebar */}
        <HomeSidebar />
      </div>
    </DashboardLayout>
  );
}
