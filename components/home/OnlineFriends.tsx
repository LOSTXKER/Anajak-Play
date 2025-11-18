"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { OnlineFriendPresence } from '@/lib/types/index';
import { MessageCircle } from 'lucide-react';

interface OnlineFriendsProps {
  friends: OnlineFriendPresence[];
}

const statusLabel: Record<OnlineFriendPresence['status'], string> = {
  'matching': 'กำลังหาตี้',
  'in-session': 'เล่นอยู่',
  'idle': 'ออนไลน์'
};

export const OnlineFriends: React.FC<OnlineFriendsProps> = ({ friends }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">เพื่อนที่ออนไลน์</h3>
        <span className="text-xs text-status-success bg-status-success/10 px-3 py-1 rounded-full">
          {friends.length} คน
        </span>
      </div>

      <div className="space-y-4">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-3">
            <Avatar
              src={friend.user.avatar}
              alt={friend.user.displayName}
              size="sm"
              status="online"
              frame={friend.user.cosmetics.activeFrame}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{friend.user.displayName}</p>
              <p className="text-xs text-text-tertiary">
                {friend.game?.toUpperCase()} • {statusLabel[friend.status]}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="px-3" aria-label="เปิดแชท">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
