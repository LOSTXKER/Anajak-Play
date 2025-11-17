/**
 * Marketplace Listing Card Component
 * Display coaching or hire play services
 */

'use client';

import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { MarketplaceListing } from '@/lib/types/index';
import { Star, ShoppingCart, Clock } from 'lucide-react';

interface ListingCardProps {
  listing: MarketplaceListing;
  onBuy?: (listing: MarketplaceListing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onBuy }) => {
  const typeLabels = {
    coaching: '🎓 Coaching',
    'hire-play': '🎮 Hire Play',
    'item-sale': '💎 Item Sale',
    'account-sale': '👤 Account Sale',
    custom: '✨ Custom'
  };
  
  const priceTypeLabels = {
    'per-hour': '/ชม.',
    'per-session': '/Session',
    'fixed': ''
  };
  
  return (
    <Card hover variant="elevated" className="overflow-hidden">
      {/* Image */}
      <div className="relative h-48 bg-gradient-hero">
        <div className="absolute inset-0 bg-dark-base/40"></div>
        <div className="absolute bottom-3 left-3">
          <Badge variant="primary" size="md">
            {typeLabels[listing.type]}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="warning" size="md">
            {listing.game.toUpperCase()}
          </Badge>
        </div>
      </div>
      
      <CardBody>
        {/* Seller Info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar 
            src={listing.seller.avatar}
            alt={listing.seller.displayName}
            size="sm"
            status={listing.seller.isOnline ? 'online' : 'offline'}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{listing.seller.displayName}</p>
            <p className="text-xs text-text-tertiary">Level {listing.seller.level}</p>
          </div>
          <Badge variant="success" size="sm">
            {listing.seller.reputation.overall}
          </Badge>
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[56px]">
          {listing.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {listing.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-status-warning fill-current" />
            <span className="font-semibold">{listing.averageRating.toFixed(1)}</span>
            <span className="text-text-tertiary">({listing.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-text-tertiary">
            <Clock className="w-4 h-4" />
            <span>{listing.totalSales} งาน</span>
          </div>
        </div>
        
        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-dark-surface">
          <div>
            <p className="text-xs text-text-tertiary mb-1">ราคา</p>
            <p className="text-2xl font-bold text-primary-neon font-mono">
              ฿{listing.price}
              <span className="text-sm text-text-secondary ml-1">
                {priceTypeLabels[listing.priceType]}
              </span>
            </p>
          </div>
          <Button 
            variant="gradient" 
            size="md"
            onClick={() => onBuy?.(listing)}
            leftIcon={<ShoppingCart className="w-4 h-4" />}
          >
            จอง
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
