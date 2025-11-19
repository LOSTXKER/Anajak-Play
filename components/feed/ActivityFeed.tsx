'use client';

import React, { useState, useEffect } from 'react';
import { ActivityItem } from './ActivityItem';
import { ActivityFeedItem } from '@/lib/types/index';
import { Activity } from 'lucide-react';

interface ActivityFeedProps {
  initialActivities: ActivityFeedItem[];
  limit?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ initialActivities, limit = 5 }) => {
  const [activities, setActivities] = useState<ActivityFeedItem[]>(initialActivities);

  // In a real app, this would subscribe to a websocket or poll for updates
  // For prototype, we might just shuffle or add mock items periodically
  // But for now, static display is fine, maybe just filter/sort.

  const displayActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary-neon/20 rounded-lg flex items-center justify-center">
          <Activity className="w-4 h-4 text-primary-neon" />
        </div>
        <div>
            <h3 className="font-bold text-white text-lg">กิจกรรมสด (Live Feed)</h3>
            <p className="text-xs text-gray-400">ความเคลื่อนไหวในคอมมูนิตี้</p>
        </div>
      </div>

      <div className="space-y-3">
        {displayActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      
      <button className="w-full py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10">
        ดูเพิ่มเติม...
      </button>
    </div>
  );
};

