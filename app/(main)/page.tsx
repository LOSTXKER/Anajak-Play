/**
 * ANAJAK PLAY - New Home Page (Masterplan V5)
 * Main Landing with Live Presence Layer
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { StatsBar } from '@/components/ui/StatsBar';
import { QuickActions } from '@/components/ui/QuickActions';
import { LFGCard } from '@/components/lfg/LFGCard';
import { ActivityItem } from '@/components/feed/ActivityItem';
import { 
  mockLFGSessions, 
  mockPlatformStats, 
  mockActivityFeed 
} from '@/lib/data/mock-data';
import { Zap, ArrowRight, ChevronRight } from 'lucide-react';
import { useParty } from '@/lib/PartyContext';
import { convertSessionToParty } from '@/lib/utils/lfg';
import { LFGSession } from '@/lib/types/index';

export default function NewHomePage() {
  const router = useRouter();
  const { joinParty } = useParty();

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
  
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo / Title */}
            <div className="mb-6 animate-fadeIn">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent font-heading">
                ANAJAK PLAY
              </h1>
              <div className="flex items-center justify-center gap-2 text-primary-neon">
                <div className="w-12 h-0.5 bg-gradient-hero"></div>
                <Zap className="w-5 h-5" />
                <div className="w-12 h-0.5 bg-gradient-hero"></div>
              </div>
            </div>
            
            {/* Tagline */}
            <p className="text-xl md:text-3xl text-text-primary mb-4 font-semibold animate-fadeIn" style={{ animationDelay: '100ms' }}>
              Gaming Superapp สำหรับเกมเมอร์ไทย
            </p>
            <p className="text-base md:text-lg text-text-secondary mb-8 animate-fadeIn" style={{ animationDelay: '200ms' }}>
              หาตี้ • Marketplace • โค้ช • Community • ทุกอย่างในที่เดียว
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: '300ms' }}>
              <Button 
                variant="gradient" 
                size="lg" 
                className="text-lg shadow-glow-purple"
                onClick={handlePrimaryCTA}
              >
                <Zap className="w-5 h-5" />
                เริ่มหาตี้เลย
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg"
                onClick={() => router.push('/feed')}
              >
                เรียนรู้เพิ่มเติม
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Banner */}
      <section className="container mx-auto px-4 py-8">
        <StatsBar stats={mockPlatformStats} />
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: LFG Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary font-heading flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-button rounded-full"></span>
                  🔥 ห้องที่กำลังหาคน
                </h2>
                <p className="text-sm text-text-tertiary mt-1">
                  Match แบบอัตโนมัติ • ไม่ต้องรอ
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/feed')}
              >
                ดูทั้งหมด
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            {/* LFG Cards */}
            <div className="space-y-4">
              {mockLFGSessions.length === 0 ? (
                <div className="text-center py-12 text-text-tertiary">
                  <p className="text-lg mb-2">ยังไม่มีห้องที่เปิดรับ</p>
                  <p className="text-sm">ลองสร้างห้องใหม่เป็นคนแรก!</p>
                </div>
              ) : (
                mockLFGSessions.map((session) => (
                  <LFGCard 
                    key={session.id} 
                    session={session}
                    onJoin={handleJoinSession}
                  />
                ))
              )}
            </div>
            
            {/* Load More */}
            {mockLFGSessions.length > 0 && (
              <div className="flex justify-center pt-4">
                <Button variant="outline" size="md">
                  โหลดเพิ่มเติม
                </Button>
              </div>
            )}
          </div>
          
          {/* Right: Activity Feed & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions 
              onCreateSession={() => router.push('/create-request')}
              onTinderMode={() => router.push('/tinder')}
              onMarketplace={() => router.push('/market')}
            />
            
            {/* Activity Feed */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary font-heading flex items-center gap-2">
                  ⚡ กิจกรรมล่าสุด
                </h2>
              </div>
              
              <div className="space-y-3">
                {mockActivityFeed.length === 0 ? (
                  <div className="text-center py-8 text-text-tertiary">
                    <p className="text-sm">ยังไม่มีกิจกรรม</p>
                  </div>
                ) : (
                  mockActivityFeed.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))
                )}
              </div>
            </div>
            
            {/* Reputation Teaser */}
            <div className="bg-gradient-to-br from-primary-violet/30 to-secondary-midnight/30 rounded-card p-6 border border-primary-neon/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">ระบบชื่อเสียง</h3>
                  <p className="text-sm text-text-secondary">Reputation System</p>
                </div>
                <div className="text-3xl">🛡️</div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-primary-neon font-mono">4.8</div>
                <div className="flex-1">
                  <p className="text-sm text-text-secondary mb-1">คะแนนของคุณ</p>
                  <p className="text-xs text-primary-neon font-semibold">ระดับ: Pro Player</p>
                </div>
              </div>
              
              <div className="w-full bg-dark-surface h-2 rounded-full overflow-hidden mb-3">
                <div className="bg-gradient-button h-full w-[85%] rounded-full"></div>
              </div>
              
              <p className="text-xs text-text-tertiary">
                รักษาเครดิตดี หางานง่าย หาตี้ไว ⚡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
            ทำไมต้อง Anajak Play?
          </h2>
          <p className="text-text-secondary">
            แพลตฟอร์มเกมเมอร์ที่ครบที่สุด ปลอดภัยที่สุด ใช้งานง่ายที่สุด
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🎯',
              title: 'Match-only System',
              desc: 'ไม่มีห้องโล่ง ระบบจับคู่อัตโนมัติแบบ Grab'
            },
            {
              icon: '🛡️',
              title: 'Reputation ที่แท้จริง',
              desc: 'ทุกคะแนนมาจาก Session จริง ตรวจสอบได้'
            },
            {
              icon: '💰',
              title: 'Marketplace ปลอดภัย',
              desc: 'Escrow + KYC เงินปลอดภัย 100%'
            },
            {
              icon: '💬',
              title: 'Community Active',
              desc: 'Mini-feed ต่อเกม Social Hub เต็มรูปแบบ'
            },
            {
              icon: '🎮',
              title: 'ครบทุกเกม',
              desc: 'ROV • Valorant • MLBB • Genshin และอื่นๆ'
            },
            {
              icon: '✨',
              title: 'ฟีเจอร์พิเศษ',
              desc: 'Tinder Mode • Daily Chest • Achievement'
            }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className="bg-dark-card border border-dark-surface rounded-card p-6 hover:border-primary-neon/30 transition-all hover:shadow-glow-subtle"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
