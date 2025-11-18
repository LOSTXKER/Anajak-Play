"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { LivePresenceEvent, PlatformStats } from '@/lib/types/index';
import { Zap, Activity } from 'lucide-react';

interface LivePresenceTickerProps {
  events: LivePresenceEvent[];
  stats: PlatformStats;
}

const accentStyles: Record<string, string> = {
  purple: 'border-primary-neon/40 bg-primary-neon/10',
  blue: 'border-secondary-electric/40 bg-secondary-electric/10',
  gold: 'border-status-warning/40 bg-status-warning/10'
};

export const LivePresenceTicker: React.FC<LivePresenceTickerProps> = ({ events, stats }) => {
  return (
    <Card className="p-5 border border-white/10 bg-dark-card/80 backdrop-blur overflow-hidden">
      <div className="flex flex-wrap items-center gap-4 mb-4 relative z-10 bg-dark-card/80 backdrop-blur-sm py-2 -mt-2 -mx-2 px-2 rounded-xl">
        <div className="flex items-center gap-2 text-primary-neon font-semibold">
          <span className="w-2 h-2 bg-status-success rounded-full animate-pulse" />
          Live Presence
        </div>
        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <span className="flex items-center gap-1 text-white">
            <Zap className="w-4 h-4 text-primary-neon" />
            {stats.onlineUsers.toLocaleString()} ออนไลน์
          </span>
          <span className="flex items-center gap-1">
            <Activity className="w-4 h-4 text-status-success" />
            {stats.matchingNow} กำลังหาตี้
          </span>
        </div>
        <Badge variant="outline" size="sm">
          อัปเดต {stats.updatedAt.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
        </Badge>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-dark-card to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-dark-card to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex gap-3 w-max animate-marquee pause-on-hover">
          {/* First Set */}
          {events.map((event, idx) => (
            <div
              key={`set1-${event.id}-${idx}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${accentStyles[event.accent || 'purple']} min-w-[240px]`}
            >
              <span className="text-2xl" aria-hidden>
                {event.icon}
              </span>
              <div className="text-sm text-text-secondary">
                <p className="text-white font-medium leading-tight">{event.message}</p>
                <p className="text-xs text-text-tertiary">
                  {event.timestamp.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {/* Second Set (Duplicate for smooth loop) */}
          {events.map((event, idx) => (
            <div
              key={`set2-${event.id}-${idx}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${accentStyles[event.accent || 'purple']} min-w-[240px]`}
            >
              <span className="text-2xl" aria-hidden>
                {event.icon}
              </span>
              <div className="text-sm text-text-secondary">
                <p className="text-white font-medium leading-tight">{event.message}</p>
                <p className="text-xs text-text-tertiary">
                  {event.timestamp.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
