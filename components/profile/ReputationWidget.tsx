/**
 * Reputation Widget Component
 * Display 3D reputation breakdown
 */

'use client';

import React from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ReputationScore } from '@/lib/types/index';
import { Shield, ThumbsUp, Clock, Users } from 'lucide-react';

interface ReputationWidgetProps {
  reputation: ReputationScore;
}

export const ReputationWidget: React.FC<ReputationWidgetProps> = ({ reputation }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'legendary': return 'text-status-warning';
      case 'excellent': return 'text-status-success';
      case 'good': return 'text-status-info';
      case 'fair': return 'text-text-secondary';
      case 'poor': return 'text-status-error';
      case 'toxic': return 'text-status-error';
      default: return 'text-text-secondary';
    }
  };
  
  const getTierBadgeVariant = (tier: string): any => {
    switch (tier) {
      case 'legendary':
      case 'excellent': return 'success';
      case 'good': return 'info';
      case 'fair': return 'secondary';
      default: return 'error';
    }
  };
  
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-neon/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-neon" />
            </div>
            <div>
              <h3 className="font-bold text-lg">ระบบชื่อเสียง</h3>
              <p className="text-sm text-text-secondary">Reputation Score</p>
            </div>
          </div>
          <Badge variant={getTierBadgeVariant(reputation.tier)} size="lg">
            {reputation.tier.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardBody>
        {/* Overall Score */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold font-mono mb-2 ${getTierColor(reputation.tier)}`}>
            {reputation.overall}
          </div>
          <p className="text-sm text-text-secondary">คะแนนรวม (0-100)</p>
        </div>
        
        {/* 3D Breakdown */}
        <div className="space-y-4">
          {/* Behavior */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-status-success" />
                <span className="text-sm font-medium">Behavior</span>
              </div>
              <span className="text-sm font-bold font-mono text-status-success">
                {reputation.behavior}
              </span>
            </div>
            <div className="w-full bg-dark-surface h-2 rounded-full overflow-hidden">
              <div 
                className="bg-status-success h-full rounded-full transition-all"
                style={{ width: `${reputation.behavior}%` }}
              ></div>
            </div>
            <p className="text-xs text-text-tertiary mt-1">ความเป็นมิตร • ไม่ toxic</p>
          </div>
          
          {/* Reliability */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary-electric" />
                <span className="text-sm font-medium">Reliability</span>
              </div>
              <span className="text-sm font-bold font-mono text-secondary-electric">
                {reputation.reliability}
              </span>
            </div>
            <div className="w-full bg-dark-surface h-2 rounded-full overflow-hidden">
              <div 
                className="bg-secondary-electric h-full rounded-full transition-all"
                style={{ width: `${reputation.reliability}%` }}
              ></div>
            </div>
            <p className="text-xs text-text-tertiary mt-1">ไม่เทนัด • มาตรงเวลา</p>
          </div>
          
          {/* Teamwork */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-neon" />
                <span className="text-sm font-medium">Teamwork</span>
              </div>
              <span className="text-sm font-bold font-mono text-primary-neon">
                {reputation.teamwork}
              </span>
            </div>
            <div className="w-full bg-dark-surface h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary-neon h-full rounded-full transition-all"
                style={{ width: `${reputation.teamwork}%` }}
              ></div>
            </div>
            <p className="text-xs text-text-tertiary mt-1">การมีส่วนร่วม • ทีมเวิร์ค</p>
          </div>
        </div>
        
        {/* Review Stats */}
        <div className="mt-6 pt-6 border-t border-dark-surface">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-text-primary font-mono">
                {reputation.totalReviews}
              </p>
              <p className="text-xs text-text-tertiary">รีวิวทั้งหมด</p>
            </div>
            <div>
              <p className="text-xl font-bold text-status-success font-mono">
                {reputation.positiveReviews}
              </p>
              <p className="text-xs text-text-tertiary">บวก 👍</p>
            </div>
            <div>
              <p className="text-xl font-bold text-status-error font-mono">
                {reputation.negativeReviews}
              </p>
              <p className="text-xs text-text-tertiary">ลบ 👎</p>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        {reputation.badges.length > 0 && (
          <div className="mt-6 pt-6 border-t border-dark-surface">
            <p className="text-sm font-semibold mb-3">Personality Badges</p>
            <div className="flex flex-wrap gap-2">
              {reputation.badges.map((badge) => (
                <div 
                  key={badge.id}
                  className="flex items-center gap-2 bg-dark-surface px-3 py-2 rounded-lg"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
