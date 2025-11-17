/**
 * Tinder Card Component
 * Swipeable card for finding gaming partners
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { TinderCard as TinderCardType } from '@/lib/types/index';
import { Heart, X, Star, Gamepad2 } from 'lucide-react';

interface TinderCardComponentProps {
  card: TinderCardType;
  onSwipe?: (direction: 'left' | 'right') => void;
}

export const TinderCardComponent: React.FC<TinderCardComponentProps> = ({ card, onSwipe }) => {
  const { user } = card;
  
  return (
    <Card variant="elevated" className="w-full max-w-md mx-auto overflow-hidden">
      {/* Header with Avatar */}
      <div className="relative h-64 bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-base/90"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
        </div>
        
        {/* Avatar */}
        <div className="absolute bottom-6 left-6">
          <Avatar 
            src={user.avatar}
            alt={user.displayName}
            size="2xl"
            status={user.isOnline ? 'online' : 'offline'}
            frame={user.cosmetics.activeFrame}
          />
        </div>
        
        {/* Compatibility Score */}
        <div className="absolute top-4 right-4 bg-dark-card/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
          <Star className="w-4 h-4 text-status-warning fill-current" />
          <span className="text-sm font-bold text-status-warning">{card.compatibility}%</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Name & Level */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-text-primary font-heading">
              {user.displayName}
            </h2>
            <Badge variant="primary" size="sm">
              LV.{user.level}
            </Badge>
          </div>
          {user.cosmetics.activeTitle && (
            <p className="text-sm text-primary-neon">{user.cosmetics.activeTitle}</p>
          )}
        </div>
        
        {/* Mutual Games */}
        {card.mutualGames.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Gamepad2 className="w-4 h-4 text-secondary-electric" />
              <span className="text-sm font-semibold text-text-secondary">
                เกมที่เล่นเหมือนกัน
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {card.mutualGames.map((game, idx) => (
                <Badge key={idx} variant="secondary" size="md">
                  {game.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Highlights */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-text-secondary mb-2">ไฮไลท์</p>
          <div className="flex flex-wrap gap-2">
            {card.highlights.map((highlight, idx) => (
              <Badge key={idx} variant="outline" size="sm">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Reputation */}
        <div className="flex items-center gap-4 p-3 bg-dark-surface rounded-lg mb-6">
          <div className="flex-1 text-center">
            <p className="text-xl font-bold text-primary-neon font-mono">
              {user.reputation.overall}
            </p>
            <p className="text-xs text-text-tertiary">Reputation</p>
          </div>
          <div className="w-px h-8 bg-dark-card"></div>
          <div className="flex-1 text-center">
            <p className="text-xl font-bold text-status-success font-mono">
              {user.profile.completedSessions}
            </p>
            <p className="text-xs text-text-tertiary">Sessions</p>
          </div>
          <div className="w-px h-8 bg-dark-card"></div>
          <div className="flex-1 text-center">
            <p className="text-xl font-bold text-secondary-electric font-mono">
              {user.profile.friendCount}
            </p>
            <p className="text-xs text-text-tertiary">Friends</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => onSwipe?.('left')}
            className="w-16 h-16 rounded-full bg-dark-surface hover:bg-status-error/20 border-2 border-status-error/30 hover:border-status-error flex items-center justify-center transition-all hover:scale-110"
          >
            <X className="w-6 h-6 text-status-error" />
          </button>
          
          <button
            onClick={() => onSwipe?.('right')}
            className="w-20 h-20 rounded-full bg-gradient-button shadow-glow-purple hover:scale-110 transition-all flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-white fill-current" />
          </button>
          
          <button
            className="w-16 h-16 rounded-full bg-dark-surface hover:bg-status-warning/20 border-2 border-status-warning/30 hover:border-status-warning flex items-center justify-center transition-all hover:scale-110"
          >
            <Star className="w-6 h-6 text-status-warning" />
          </button>
        </div>
        
        {/* Hint Text */}
        <p className="text-xs text-text-tertiary text-center mt-4">
          ← ไม่สนใจ | ถูกใจ → | ⭐ Super Like
        </p>
      </div>
    </Card>
  );
};
