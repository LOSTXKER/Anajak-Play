/**
 * Quick Actions Widget Component
 * Floating action buttons for main features
 */

'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Gamepad2, Users, TrendingUp, Sparkles } from 'lucide-react';

interface QuickActionsProps {
  onCreateSession?: () => void;
  onTinderMode?: () => void;
  onMarketplace?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateSession,
  onTinderMode,
  onMarketplace
}) => {
  return (
    <Card variant="gradient" className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary-neon" />
        <h3 className="font-bold text-lg">Quick Actions</h3>
      </div>
      
      <div className="space-y-3">
        <Button 
          variant="primary" 
          className="w-full justify-start gap-3" 
          size="md"
          onClick={onCreateSession}
        >
          <div className="w-8 h-8 bg-primary-neon/20 rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold">สร้าง LFG</div>
            <div className="text-xs opacity-75">หาเพื่อนเล่นด่วน</div>
          </div>
        </Button>
        
        <Button 
          variant="secondary" 
          className="w-full justify-start gap-3" 
          size="md"
          onClick={onTinderMode}
        >
          <div className="w-8 h-8 bg-secondary-electric/20 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold">Tinder Mode</div>
            <div className="text-xs opacity-75">หาเพื่อนระยะยาว</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start gap-3" 
          size="md"
          onClick={onMarketplace}
        >
          <div className="w-8 h-8 bg-status-warning/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-status-warning" />
          </div>
          <div className="text-left flex-1">
            <div className="font-semibold">Marketplace</div>
            <div className="text-xs opacity-75">โค้ช • จ้างเล่น</div>
          </div>
        </Button>
      </div>
      
      {/* Daily Chest Teaser */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold">Daily Chest</p>
            <p className="text-xs text-text-tertiary">กล่องประจำวัน</p>
          </div>
          <div className="text-3xl">🎁</div>
        </div>
        <Button variant="gradient" size="sm" className="w-full">
          เปิดเลย!
        </Button>
      </div>
    </Card>
  );
};
