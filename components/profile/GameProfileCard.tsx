/**
 * Game Profile Card Component
 * Display user's game stats and rank
 */

'use client';

import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GameProfile } from '@/lib/types/index';
import { gameConfig } from '@/lib/data/mock-data';
import { Star, Trophy } from 'lucide-react';

interface GameProfileCardProps {
  gameProfile: GameProfile;
}

export const GameProfileCard: React.FC<GameProfileCardProps> = ({ gameProfile }) => {
  const game = (gameConfig as any)[gameProfile.game] || gameConfig.rov;
  
  const getRankColor = (rank: string) => {
    const colors: any = {
      'challenger': 'text-status-error',
      'grandmaster': 'text-primary-neon',
      'master': 'text-secondary-electric',
      'diamond': 'text-status-info',
      'platinum': 'text-status-success',
      'gold': 'text-status-warning',
      'silver': 'text-text-secondary',
      'bronze': 'text-status-error',
      'unranked': 'text-text-tertiary'
    };
    return colors[rank] || 'text-text-secondary';
  };
  
  return (
    <Card hover variant="default" className="overflow-hidden">
      <CardBody className="p-0">
        {/* Game Banner */}
        <div 
          className="h-24 relative"
          style={{ 
            background: `linear-gradient(135deg, ${game.color}20 0%, ${game.color}05 100%)`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20">{game.icon ? '🎮' : game.name}</div>
          </div>
          {gameProfile.isMain && (
            <div className="absolute top-3 right-3">
              <Badge variant="warning" size="sm" className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Main
              </Badge>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Game Name */}
          <h3 className="font-bold text-lg mb-3">{game.fullName}</h3>
          
          {/* Rank */}
          <div className="mb-4">
            <p className="text-xs text-text-tertiary mb-1">Current Rank</p>
            <div className="flex items-center gap-2">
              <Trophy className={`w-5 h-5 ${getRankColor(gameProfile.rank)}`} />
              <span className={`text-xl font-bold capitalize ${getRankColor(gameProfile.rank)}`}>
                {gameProfile.rank}
              </span>
            </div>
            {gameProfile.seasonRank && gameProfile.seasonRank !== gameProfile.rank && (
              <p className="text-xs text-text-tertiary mt-1">
                Season Rank: <span className="capitalize">{gameProfile.seasonRank}</span>
              </p>
            )}
          </div>
          
          {/* Roles */}
          <div className="mb-4">
            <p className="text-xs text-text-tertiary mb-2">Main Roles</p>
            <div className="flex flex-wrap gap-2">
              {gameProfile.role.map((role, idx) => (
                <Badge key={idx} variant="primary" size="sm" className="capitalize">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Hours Played */}
          {gameProfile.hoursPlayed && (
            <div className="text-sm text-text-secondary">
              <span className="font-mono">{gameProfile.hoursPlayed.toLocaleString()}</span> ชั่วโมง
            </div>
          )}
          
          {/* Badges */}
          {gameProfile.badges.length > 0 && (
            <div className="mt-4 pt-4 border-t border-dark-surface">
              <div className="flex flex-wrap gap-2">
                {gameProfile.badges.map((badge, idx) => (
                  <div key={idx} className="text-xl" title={badge}>
                    🏆
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
