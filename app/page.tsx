"use client";

/**
 * ANAJAK PLAY – MATCH-ONLY HOME EXPERIENCE
 * Live Presence Layer + Reputation-first Sidebar
 */

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { LFGCard } from '@/components/lfg/LFGCard';
import {
  mockLFGSessions,
  mockPlatformStats,
  mockLivePresenceEvents,
  mockOnlineFriends,
  mockReputationOverview,
  mockMarketplaceListings,
  gameConfig
} from '@/lib/data/mock-data';
import { GameFilterChips, GameFilterValue } from '@/components/home/GameFilterChips';
import { LivePresenceTicker } from '@/components/home/LivePresenceTicker';
import { ReputationWidget } from '@/components/home/ReputationWidget';
import { MarketplacePreview } from '@/components/home/MarketplacePreview';
import { OnlineFriends } from '@/components/home/OnlineFriends';
import { Zap, ArrowRight, Sparkles, PlusCircle, Users } from 'lucide-react';
import { useParty } from '@/lib/PartyContext';
import { convertSessionToParty } from '@/lib/utils/lfg';
import { GameId, LFGSession } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const { joinParty } = useParty();
  const [activeGame, setActiveGame] = useState<GameFilterValue>('all');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const handleJoinSession = (session: LFGSession) => {
    const party = convertSessionToParty(session);
    const openSlot = party.requiredRoles.find((slot) => slot.status === 'open');

    if (!openSlot) {
      window.alert('เซสชันนี้มีผู้เล่นครบแล้ว');
      return;
    }

    joinParty(party, openSlot.role);
    router.push('/party');
  };

  const handlePrimaryCTA = () => {
    if (mockLFGSessions.length > 0) {
      handleJoinSession(mockLFGSessions[0]);
    } else {
      router.push('/create-request');
    }
  };

  const gameOptions = useMemo(() => {
    const base = [
      { id: 'all' as GameFilterValue, label: 'ทุกเกม' }
    ];
    const configOptions = Object.values(gameConfig).map((game) => ({
      id: game.id,
      label: game.name,
      icon: game.icon
    }));
    return [...base, ...configOptions];
  }, []);

  const filteredSessions = activeGame === 'all'
    ? mockLFGSessions
    : mockLFGSessions.filter((session) => session.game === (activeGame as GameId));

  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  return (
    <div className="min-h-screen bg-dark-base">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-8">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-hero text-white px-8 py-10 shadow-[0_20px_80px_rgba(124,58,237,0.25)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_55%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.5em] text-white/70 mb-3">Match-only LFG</p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                หาตี้ที่ <span className="text-status-warning">ใช่</span> ในแบบที่คุณ <span className="text-secondary-electric">ชอบ</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl">
                ระบบ LFG อัจฉริยะ คัดกรองด้วย Reputation System หมดปัญหาเจอไอดีเงียบหรือทีมที่ไม่ตรง Vibe
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button variant="gradient" size="lg" className="text-lg" onClick={handlePrimaryCTA}>
                  <PlusCircle className="w-5 h-5" />
                  สร้างห้องด่วน
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/40" onClick={() => router.push('/tinder')}>
                  <Sparkles className="w-5 h-5 text-status-warning" />
                  Tinder Mode
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[{
                label: 'Online Users',
                value: mockPlatformStats.onlineUsers.toLocaleString(),
                sub: 'กำลังออนไลน์'
              }, {
                label: 'Active Rooms',
                value: mockPlatformStats.activeSessions,
                sub: 'ห้องที่กำลังเล่น'
              }, {
                label: 'Now Matching',
                value: mockPlatformStats.matchingNow,
                sub: 'หาคู่พร้อมกัน'
              }].map((metric) => (
                <div key={metric.label} className="bg-white/10 rounded-2xl p-4 border border-white/30">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">{metric.label}</p>
                  <p className="text-3xl font-bold mt-2">{metric.value}</p>
                  <p className="text-sm text-white/70">{metric.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 space-y-8 pb-16">
        <LivePresenceTicker events={mockLivePresenceEvents} stats={mockPlatformStats} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <GameFilterChips
              options={gameOptions}
              active={activeGame}
              onSelect={setActiveGame}
              onFilterAdvanced={() => router.push('/lfg')}
              onRefresh={handleRefresh}
            />
            <p className="text-xs text-text-tertiary">อัปเดตล่าสุด {lastRefresh.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</p>

            <div className="space-y-4">
              {filteredSessions.length === 0 ? (
                <div className="text-center py-12 text-text-tertiary border border-dashed border-white/10 rounded-3xl">
                  <p className="text-xl mb-2">ยังไม่มีห้องในหมวดนี้</p>
                  <p className="text-sm">ตั้งตี้แรกแล้วรับ XP เพิ่มทันที ⚡</p>
                  <Button variant="gradient" size="sm" className="mt-4" onClick={handlePrimaryCTA}>
                    <Zap className="w-4 h-4" />
                    สร้าง Session
                  </Button>
                </div>
              ) : (
                filteredSessions.map((session) => (
                  <LFGCard key={session.id} session={session} onJoin={handleJoinSession} />
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <ReputationWidget data={mockReputationOverview} />
            <MarketplacePreview listings={mockMarketplaceListings} />
            <OnlineFriends friends={mockOnlineFriends} />
            <div className="p-6 rounded-2xl border border-white/5 bg-dark-card/80">
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <Users className="w-4 h-4 text-primary-neon" />
                Live Presence Layer
              </div>
              <p className="text-lg font-semibold text-white mt-3">
                ไม่มี Lobby โล่ง ระบบจะแจ้งเตือนเมื่อมี Session ที่ตรงกับคุณ
              </p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push('/notifications')}>
                ดูการแจ้งเตือน
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
