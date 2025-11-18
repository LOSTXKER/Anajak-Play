"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ReputationOverview } from '@/lib/types/index';
import { ShieldCheck, TrendingUp } from 'lucide-react';

interface ReputationWidgetProps {
  data: ReputationOverview;
}

export const ReputationWidget: React.FC<ReputationWidgetProps> = ({ data }) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary-midnight/80 to-dark-card border border-primary-neon/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Reputation System</p>
          <h3 className="text-2xl font-bold text-white mt-2">ระบบชื่อเสียง</h3>
        </div>
        <ShieldCheck className="w-10 h-10 text-primary-neon" />
      </div>

      <div className="flex items-center gap-4 mt-6">
        <div>
          <div className="text-5xl font-bold text-primary-neon">{data.score.toFixed(1)}</div>
          <p className="text-sm text-text-secondary">ระดับ: {data.tier}</p>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-status-success">
            <TrendingUp className="w-4 h-4" />
            +{data.trend.toFixed(1)} สัปดาห์นี้
          </div>
          <div className="w-full bg-dark-surface h-2 rounded-full mt-3">
            <div className="h-full bg-gradient-button rounded-full" style={{ width: `${data.percentile}%` }} />
          </div>
          <p className="text-xs text-text-tertiary mt-1">อยู่ใน Top {data.percentile}% ของแพลตฟอร์ม</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {data.breakdown.map((item) => (
          <div key={item.label} className="bg-white/5 rounded-2xl p-3">
            <p className="text-xs text-text-tertiary mb-1">{item.label}</p>
            <div className="text-lg font-semibold text-white">{item.value}%</div>
            <div className="w-full bg-dark-surface h-1.5 rounded-full mt-2">
              <div
                className="h-full bg-primary-neon rounded-full"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 text-sm">
        {data.highlights.map((highlight, idx) => (
          <div key={idx} className="flex items-center gap-2 text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-neon" />
            {highlight}
          </div>
        ))}
      </div>

      <Badge variant="secondary" size="sm" className="mt-6">
        {data.totalSessions} Sessions • {data.totalReviews} Reviews
      </Badge>
    </Card>
  );
};
