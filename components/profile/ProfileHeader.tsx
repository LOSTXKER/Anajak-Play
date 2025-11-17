/**
 * Profile Header Component
 * Hero section of user profile with avatar, level, reputation
 */

'use client';

import React from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { User } from '@/lib/types/index';
import { Edit, UserPlus, MessageCircle } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isOwnProfile = false }) => {
  return (
    <div className="relative">
      {/* Background Banner */}
      <div className="h-48 md:h-64 bg-gradient-hero rounded-card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-base/80"></div>
        {user.cosmetics.activeBackground && (
          <div className="absolute inset-0 opacity-40 bg-cover bg-center" 
               style={{ backgroundImage: `url(${user.cosmetics.activeBackground})` }}>
          </div>
        )}
      </div>
      
      {/* Profile Content */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-20 md:-mt-24">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Avatar */}
            <div className="relative">
              <Avatar 
                src={user.avatar}
                alt={user.displayName}
                size="2xl"
                status={user.isOnline ? 'online' : 'offline'}
                frame={user.cosmetics.activeFrame}
              />
              
              {/* Level Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-dark-card border-2 border-primary-neon rounded-full px-4 py-1">
                <span className="text-sm font-bold text-primary-neon font-mono">
                  LV.{user.level}
                </span>
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              {/* Name & Title */}
              <div className="mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary font-heading mb-2">
                  {user.displayName}
                </h1>
                <p className="text-text-secondary mb-2">@{user.username}</p>
                
                {user.cosmetics.activeTitle && (
                  <Badge variant="primary" size="lg">
                    {user.cosmetics.activeTitle}
                  </Badge>
                )}
              </div>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 mb-4">
                <div>
                  <p className="text-2xl font-bold text-primary-neon font-mono">
                    {user.level}
                  </p>
                  <p className="text-xs text-text-tertiary">Level</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-electric font-mono">
                    {user.reputation.overall}
                  </p>
                  <p className="text-xs text-text-tertiary">Reputation</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-status-success font-mono">
                    {user.profile.completedSessions}
                  </p>
                  <p className="text-xs text-text-tertiary">Sessions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-status-warning font-mono">
                    {user.profile.friendCount}
                  </p>
                  <p className="text-xs text-text-tertiary">Friends</p>
                </div>
              </div>
              
              {/* EXP Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-text-secondary">
                    EXP: {user.exp.toLocaleString()} / {user.expToNextLevel.toLocaleString()}
                  </span>
                  <span className="text-primary-neon font-semibold">
                    {Math.floor((user.exp / user.expToNextLevel) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-dark-surface h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-button h-full rounded-full transition-all duration-500"
                    style={{ width: `${(user.exp / user.expToNextLevel) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-2">
              {isOwnProfile ? (
                <Button variant="outline" size="md">
                  <Edit className="w-4 h-4" />
                  แก้ไขโปรไฟล์
                </Button>
              ) : (
                <>
                  <Button variant="primary" size="md">
                    <UserPlus className="w-4 h-4" />
                    เพิ่มเพื่อน
                  </Button>
                  <Button variant="secondary" size="md">
                    <MessageCircle className="w-4 h-4" />
                    แชท
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Bio */}
          {user.profile.bio && (
            <div className="mt-6 p-4 bg-dark-card rounded-card border border-dark-surface">
              <p className="text-text-secondary">{user.profile.bio}</p>
              {user.profile.quote && (
                <p className="text-sm text-text-tertiary italic mt-2">
                  &ldquo;{user.profile.quote}&rdquo;
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
