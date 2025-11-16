'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, UserPlus, Flame, Compass, Radar, BellRing } from 'lucide-react';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import LobbyCard from '@/components/LobbyCard';
import PartyJoinModal from '@/components/PartyJoinModal';
import LFGFilterPanel from '@/components/LFGFilterPanel';
import { useParty } from '@/lib/PartyContext';
import { partiesData } from '@/lib/mockData';
import { Party } from '@/lib/types';
import {
  aiPersonalityInsights,
  defaultGameKey,
  gameFilterConfig,
  gameFilterOptions,
  globalFilters,
} from '@/lib/filterConfig';

const gameKeyToNames: Record<string, string[]> = {
  rov: ['RoV', 'LOL', 'Dota 2', 'MOBA'],
  valorant: ['Valorant', 'CS2', 'Overwatch'],
  genshin: ['Genshin', 'Wuthering Waves', 'Honkai'],
  hunter: ['Monster Hunter', 'AC6', 'Co-op'],
  mmorpg: ['MMORPG', 'Black Desert', 'FFXIV', 'Dragon Nest'],
};

const initSelections = (filters: typeof globalFilters) => {
  return filters.reduce<Record<string, string[]>>((acc, filter) => {
    if (Array.isArray(filter.defaultValue)) {
      acc[filter.id] = [...filter.defaultValue];
    } else if (typeof filter.defaultValue === 'string') {
      acc[filter.id] = [filter.defaultValue];
    } else {
      acc[filter.id] = [];
    }
    return acc;
  }, {});
};

const toggleFromRecord = (
  record: Record<string, string[]>,
  filterId: string,
  value: string
) => {
  const next = { ...record };
  const current = new Set(next[filterId] ?? []);
  if (current.has(value)) {
    current.delete(value);
  } else {
    current.add(value);
  }
  next[filterId] = Array.from(current);
  return next;
};

export default function LFGFeedPage() {
  const router = useRouter();
  const { joinParty } = useParty();
  const [selectedGame, setSelectedGame] = useState(defaultGameKey);
  const [globalSelections, setGlobalSelections] = useState<Record<string, string[]>>(
    () => initSelections(globalFilters)
  );
  const [gameSelections, setGameSelections] = useState<Record<string, string[]>>({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showJoinParty, setShowJoinParty] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);

  const activeGameFilters = gameFilterConfig[selectedGame];

  const filteredParties = useMemo(() => {
    const gameNames = gameKeyToNames[selectedGame] ?? [];

    return partiesData.filter((party) => {
      if (gameNames.length && !gameNames.includes(party.game)) {
        return false;
      }

      if (globalSelections.mic?.includes('mic-on') && !party.mic) {
        return false;
      }

      if (globalSelections.mic?.includes('text-only') && party.mic) {
        return false;
      }

      if (globalSelections.playstyle?.length && party.playstyle) {
        if (!globalSelections.playstyle.includes(party.playstyle)) {
          return false;
        }
      }

      if (globalSelections.playtime?.length && party.timeSlot) {
        if (!globalSelections.playtime.includes(party.timeSlot)) {
          return false;
        }
      }

      if (globalSelections.toxic?.length && party.toxicTolerance) {
        if (!globalSelections.toxic.includes(party.toxicTolerance)) {
          return false;
        }
      }

      const openSlots = party.neededPlayers ?? Math.max(party.maxPlayers - party.currentPlayers, 0);
      if (globalSelections.needed?.includes('1') && openSlots !== 1) {
        return false;
      }
      if (globalSelections.needed?.includes('2') && openSlots < 2) {
        return false;
      }
      if (globalSelections.needed?.includes('full') && openSlots < 3) {
        return false;
      }

      const openRoles = party.requiredRoles
        .filter((slot) => slot.status === 'open')
        .map((slot) => slot.role);

      if (gameSelections.role?.length) {
        if (!gameSelections.role.some((role) => openRoles.includes(role))) {
          return false;
        }
      }

      if (gameSelections.lane?.length) {
        if (!gameSelections.lane.some((lane) => openRoles.includes(lane))) {
          return false;
        }
      }

      if (gameSelections.rank?.length) {
        const partyRank = party.rank.toLowerCase();
        const matchRank = gameSelections.rank.some((rank) =>
          partyRank.includes(rank.toLowerCase().split(' ')[0])
        );
        if (!matchRank) {
          return false;
        }
      }

      return true;
    });
  }, [selectedGame, globalSelections, gameSelections]);

  const handleToggleFilter = (
    layer: 'global' | 'game',
    filterId: string,
    value: string
  ) => {
    if (layer === 'global') {
      setGlobalSelections((prev) => toggleFromRecord(prev, filterId, value));
    } else {
      setGameSelections((prev) => toggleFromRecord(prev, filterId, value));
    }
  };

  const handleChangeGame = (gameKey: string) => {
    setSelectedGame(gameKey);
    setGameSelections({});
  };

  const handleJoinClick = (party: Party) => {
    setSelectedParty(party);
    setShowJoinParty(true);
  };

  const handleJoinConfirm = (party: Party, selectedRole: string) => {
    joinParty(party, selectedRole);
    setShowJoinParty(false);
    router.push('/party');
  };

  return (
    <DashboardLayout enableChat>
      {showJoinParty && selectedParty && (
        <PartyJoinModal
          party={selectedParty}
          onClose={() => setShowJoinParty(false)}
          onConfirm={handleJoinConfirm}
        />
      )}

      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#151536] to-[#0d0d1f] p-8 mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400 mb-2">LFG Feed</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            ฟีดรวมคำขอหาตี้ <span className="text-purple-400">แบบเรียลไทม์</span>
          </h1>
          <p className="text-gray-300 max-w-2xl">
            เลือกเกมแล้วให้ระบบจัด Global / Game Filter ให้อัตโนมัติ จากนั้น AI Personality จะช่วยไฮไลต์ว่าใครคุยสนุก ใครเน้นจริงจัง
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/create-request"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition"
            >
              <UserPlus className="w-5 h-5" />
              สร้างคำขอใหม่
            </Link>
            <button className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition">
              <BellRing className="w-5 h-5 text-yellow-400" />
              เปิดแจ้งเตือนอัตโนมัติ
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{filteredParties.length}</div>
            <p className="text-xs text-gray-400">ผลลัพธ์ตามตัวกรอง</p>
          </div>
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">92%</div>
            <p className="text-xs text-gray-400">ค่าเฉลี่ยความเข้ากัน</p>
          </div>
        </div>
      </section>

      <LFGFilterPanel
        selectedGame={selectedGame}
        onSelectGame={handleChangeGame}
        gameOptions={gameFilterOptions}
        globalFilters={globalFilters}
        gameFilters={activeGameFilters}
        globalSelections={globalSelections}
        gameSelections={gameSelections}
        onToggleFilter={handleToggleFilter}
        showAdvanced={showAdvancedFilters}
        onToggleAdvanced={() => setShowAdvancedFilters((prev) => !prev)}
      />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr] mt-10">
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <Compass className="w-5 h-5 text-cyan-400" />
              {filteredParties.length > 0
                ? `${filteredParties.length} ห้องตรงสเปก`
                : 'ยังไม่พบห้องที่ตรง' }
            </h2>
            <button
              onClick={() => {
                setGlobalSelections(initSelections(globalFilters));
                setGameSelections({});
              }}
              className="text-xs text-gray-400 hover:text-white transition"
            >
              รีเซ็ตตัวกรอง
            </button>
          </div>

          {filteredParties.length === 0 ? (
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-10 text-center bg-[#0a0a16]">
              <Sparkles className="w-10 h-10 text-gray-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">ยังไม่เจอห้องตามเงื่อนไขนี้</h3>
              <p className="text-gray-400 mb-6">ลองเปิด Advanced Filters หรือสลับเกม ระบบจะแนะนำใหม่ทันที</p>
              <Link
                href="/create-request"
                className="inline-flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold"
              >
                <Flame className="w-5 h-5" />
                สร้างห้องเองเลย
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredParties.map((party) => (
                <LobbyCard key={party.id} party={party} onJoin={handleJoinClick} />
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 p-6 bg-[#090915]">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Radar className="w-5 h-5 text-green-400" />
              Personality Filters (AI)
            </h3>
            <div className="space-y-4">
              {aiPersonalityInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="rounded-2xl bg-white/5 p-4 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-white">{insight.label}</p>
                    {insight.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40">
                        {insight.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-base text-cyan-200 font-semibold">{insight.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20">
            <h3 className="text-lg font-bold mb-2">ไม่อยากหาเอง?</h3>
            <p className="text-sm text-gray-200 mb-4">
              เปิด Matching Engine แล้วให้ AI ส่งแจ้งเตือนห้องที่เข้ากันที่สุดแบบ Tinder-style
            </p>
            <Link
              href="/notifications"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition"
            >
              <Sparkles className="w-4 h-4" /> ไปที่ Matching
            </Link>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
