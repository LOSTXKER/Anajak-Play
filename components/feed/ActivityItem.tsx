/**
 * Activity Feed Item Component
 * Display real-time user activities
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ActivityFeedItem } from '@/lib/types/index';
import { Trophy, Zap, UserCheck, Gamepad2 } from 'lucide-react';

interface ActivityItemProps {
  activity: ActivityFeedItem;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const timeAgo = Math.floor((Date.now() - activity.createdAt.getTime()) / 60000);
  
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'session-start':
        return <Gamepad2 className="w-4 h-4 text-status-info" />;
      case 'session-complete':
        return <Zap className="w-4 h-4 text-status-success" />;
      case 'achievement':
        return <Trophy className="w-4 h-4 text-status-warning" />;
      case 'match':
        return <UserCheck className="w-4 h-4 text-primary-neon" />;
      case 'level-up':
        return <Zap className="w-4 h-4 text-secondary-electric" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };
  
  const getActivityText = () => {
    switch (activity.type) {
      case 'session-start':
        return (
          <>
            เริ่ม Session{' '}
            <Badge variant="primary" size="sm" className="inline-flex mx-1">
              {activity.data?.game?.toUpperCase()}
            </Badge>
            {activity.data?.mode}
          </>
        );
      case 'session-complete':
        return (
          <>
            จบ Session{' '}
            <span className={activity.data?.result === 'win' ? 'text-status-success' : 'text-status-error'}>
              {activity.data?.result === 'win' ? '🎉 ชนะ!' : ''}
            </span>
          </>
        );
      case 'achievement':
        return (
          <>
            ปลดล็อก Achievement{' '}
            <span className="text-status-warning font-semibold">
              &ldquo;{activity.data?.achievement}&rdquo;
            </span>
          </>
        );
      case 'match':
        return 'Match สำเร็จใน Tinder Mode';
      case 'level-up':
        return (
          <>
            เลเวลอัป!{' '}
            <span className="text-secondary-electric font-semibold">
              Level {activity.data?.newLevel}
            </span>
          </>
        );
      default:
        return 'กิจกรรมใหม่';
    }
  };
  
  return (
    <Card variant="default" className="p-4 hover:bg-dark-surface transition-colors">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <Avatar 
            src={activity.user.avatar}
            alt={activity.user.displayName}
            size="sm"
            status={activity.user.isOnline ? 'online' : 'offline'}
          />
          {/* Activity Icon Badge */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-dark-card rounded-full flex items-center justify-center border border-dark-surface">
            {getActivityIcon()}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-text-secondary leading-relaxed">
            <span className="font-semibold text-primary-neon">
              {activity.user.displayName}
            </span>
            {' '}
            {getActivityText()}
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            {timeAgo < 1 ? 'เพิ่งเกิดขึ้น' : `${timeAgo} นาทีที่แล้ว`}
          </p>
        </div>
      </div>
    </Card>
  );
};
