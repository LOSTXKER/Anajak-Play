/**
 * LFG Session Card Component
 * Display active LFG sessions with join functionality
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { LFGSession } from '@/lib/types/index';
import { Users, Clock, Mic, MicOff, Gamepad2 } from 'lucide-react';

interface LFGCardProps {
  session: LFGSession;
  onJoin?: (session: LFGSession) => void;
}

export const LFGCard: React.FC<LFGCardProps> = ({ session, onJoin }) => {
  const timeAgo = Math.floor((Date.now() - session.createdAt.getTime()) / 60000);
  const spotsLeft = session.maxPlayers - session.currentPlayers.length;
  
  return (
    <Card hover variant="elevated" className="p-6 animate-fadeIn">
      <div className="flex items-start gap-4">
        {/* Host Avatar */}
        <Avatar 
          src={session.host.avatar} 
          alt={session.host.displayName}
          size="lg"
          status="online"
          frame={session.host.cosmetics.activeFrame}
        />
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-text-primary truncate">
                {session.host.displayName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span>Level {session.host.level}</span>
                {session.host.cosmetics.activeTitle && (
                  <>
                    <span>•</span>
                    <span className="text-primary-neon truncate">
                      {session.host.cosmetics.activeTitle}
                    </span>
                  </>
                )}
              </div>
            </div>
            <Badge variant="primary" size="md">
              {session.game.toUpperCase()}
            </Badge>
          </div>
          
          {/* Game Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-text-secondary">
              <Gamepad2 className="w-4 h-4 text-primary-neon" />
              <span className="text-text-primary font-medium">{session.gameMode}</span>
              {session.requiredRank && (
                <>
                  <span>•</span>
                  <span>Rank: {session.requiredRank}+</span>
                </>
              )}
            </div>
            
            {/* Tags & Voice */}
            <div className="flex flex-wrap gap-2">
              {session.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" size="sm">
                  #{tag}
                </Badge>
              ))}
              {session.mood && (
                <Badge 
                  variant={
                    session.mood === 'tryhard' ? 'error' : 
                    session.mood === 'fun' ? 'warning' : 
                    'info'
                  } 
                  size="sm"
                >
                  {session.mood === 'tryhard' && '🔥 Tryhard'}
                  {session.mood === 'fun' && '😆 Fun'}
                  {session.mood === 'chill' && '😌 Chill'}
                  {session.mood === 'competitive' && '⚔️ Competitive'}
                </Badge>
              )}
              <Badge variant="info" size="sm" className="flex items-center gap-1">
                {session.voiceOption === 'discord' ? (
                  <>
                    <Mic className="w-3 h-3" />
                    Discord
                  </>
                ) : session.voiceOption === 'in-game' ? (
                  <>
                    <Mic className="w-3 h-3" />
                    In-Game
                  </>
                ) : (
                  <>
                    <MicOff className="w-3 h-3" />
                    No Voice
                  </>
                )}
              </Badge>
            </div>
            
            {/* Time */}
            <div className="flex items-center gap-2 text-sm text-text-tertiary">
              <Clock className="w-4 h-4" />
              <span>{timeAgo < 1 ? 'เพิ่งสร้าง' : `${timeAgo} นาทีที่แล้ว`}</span>
            </div>
          </div>
          
          {/* Footer: Players & Action */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-dark-surface">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-text-secondary">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  <span className="text-primary-neon font-semibold">
                    {session.currentPlayers.length}
                  </span>
                  /{session.maxPlayers}
                </span>
              </div>
              {spotsLeft > 0 && spotsLeft <= 2 && (
                <Badge variant="warning" size="sm">
                  เหลือ {spotsLeft} ที่!
                </Badge>
              )}
            </div>
            
            <Button 
              variant="gradient" 
              size="md"
              onClick={() => onJoin?.(session)}
              disabled={spotsLeft === 0}
            >
              {spotsLeft === 0 ? 'เต็มแล้ว' : 'เข้าร่วม'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
