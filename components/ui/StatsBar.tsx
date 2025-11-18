/**
 * Platform Stats Banner Component
 * Display real-time platform statistics
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { PlatformStats } from '@/lib/types/index';
import { Users, Gamepad2, Zap, TrendingUp } from 'lucide-react';

interface StatsBarProps {
  stats: PlatformStats;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <Card variant="gradient" className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Online Users */}
        <div className="animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-status-success rounded-full animate-pulse"></div>
            <span className="text-text-secondary text-sm font-medium">ออนไลน์</span>
          </div>
          <p className="text-3xl md:text-4xl font-bold text-primary-neon font-mono">
            {stats.onlineUsers.toLocaleString()}
          </p>
          <p className="text-xs text-text-tertiary mt-1">ผู้เล่น</p>
        </div>
        
        {/* Matching Now */}
        <div className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="w-4 h-4 text-secondary-electric" />
            <span className="text-text-secondary text-sm font-medium">กำลังหาตี้</span>
          </div>
          <p className="text-3xl md:text-4xl font-bold text-secondary-electric font-mono">
            {stats.matchingNow}
          </p>
          <p className="text-xs text-text-tertiary mt-1">คน</p>
        </div>
        
        {/* Active Sessions */}
        <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gamepad2 className="w-4 h-4 text-status-success" />
            <span className="text-text-secondary text-sm font-medium">เล่นอยู่</span>
          </div>
          <p className="text-3xl md:text-4xl font-bold text-status-success font-mono">
            {stats.activeSessions}
          </p>
          <p className="text-xs text-text-tertiary mt-1">Session</p>
        </div>
        
        {/* Trending Game */}
        <div className="animate-fadeIn" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-status-warning" />
            <span className="text-text-secondary text-sm font-medium">Trending</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-status-warning uppercase font-heading">
            {stats.trendingGame}
          </p>
          <p className="text-xs text-text-tertiary mt-1">ฮิตตอนนี้ 🔥</p>
        </div>
      </div>
      
      {/* Live Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-white/10">
        <div className="relative">
          <Zap className="w-4 h-4 text-primary-neon" />
          <div className="absolute inset-0 animate-ping">
            <Zap className="w-4 h-4 text-primary-neon opacity-50" />
          </div>
        </div>
        <span className="text-xs text-text-secondary">
          อัปเดตแบบเรียลไทม์
        </span>
      </div>
    </Card>
  );
};
