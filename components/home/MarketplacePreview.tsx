"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { MarketplaceListing } from '@/lib/types';
import { ArrowUpRight, BadgeHelp } from 'lucide-react';

interface MarketplacePreviewProps {
  listings: MarketplaceListing[];
}

export const MarketplacePreview: React.FC<MarketplacePreviewProps> = ({ listings }) => {
  const topListings = listings.slice(0, 2);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-text-tertiary">Marketplace</p>
          <h3 className="text-xl font-semibold">Anajak Market</h3>
        </div>
        <span className="text-xs text-status-warning bg-status-warning/10 px-3 py-1 rounded-full">
          กำลังเปิดเร็ว ๆ นี้
        </span>
      </div>

      <div className="space-y-4">
        {topListings.map((listing) => (
          <div key={listing.id} className="p-4 rounded-2xl bg-dark-surface/60 border border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-tertiary">{listing.type === 'coaching' ? 'Coaching' : 'Hire to play'}</p>
                <p className="text-white font-semibold">{listing.title}</p>
                <p className="text-xs text-text-secondary mt-1">{listing.game.toUpperCase()} • {listing.price}฿/{listing.priceType === 'per-hour' ? 'ชม.' : 'งาน'}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-primary-neon" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 rounded-2xl border border-dashed border-primary-neon/40 bg-primary-neon/5 flex items-center gap-3">
        <BadgeHelp className="w-5 h-5 text-primary-neon" />
        <div className="text-sm text-text-secondary">
          ระบบ Escrow + Wallet รวมศูนย์ ปลอดภัย 100%
        </div>
      </div>
    </Card>
  );
};
