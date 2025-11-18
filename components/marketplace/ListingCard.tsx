import React from 'react';
import Image from 'next/image';
import { Star, Shield, Zap, ShoppingBag } from 'lucide-react';
import { MarketplaceListing } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ListingCardProps {
  listing: MarketplaceListing;
  onBuy?: (listing: MarketplaceListing) => void;
}

export const ListingCard = ({ listing, onBuy }: ListingCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coaching': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'hire-play': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'account-sale': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'item-sale': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'coaching': return 'Coaching';
      case 'hire-play': return 'Hire Play';
      case 'account-sale': return 'Account';
      case 'item-sale': return 'Item';
      default: return 'Custom';
    }
  };

  return (
    <div className="group relative bg-[#111118] rounded-2xl border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-40 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111118] to-transparent z-10" />
        {listing.images && listing.images.length > 0 ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a23] flex items-center justify-center">
            <ShoppingBag className="text-white/10 w-12 h-12" />
          </div>
        )}
        
        <div className="absolute top-3 left-3 z-20">
          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider backdrop-blur-md ${getTypeColor(listing.type)}`}>
            {getTypeLabel(listing.type)}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
           <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full px-2 py-0.5 border border-white/10">
             <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
             <span className="text-xs font-bold text-white">{listing.averageRating.toFixed(1)}</span>
             <span className="text-[10px] text-gray-400">({listing.reviewCount})</span>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
           <h3 className="font-bold text-white line-clamp-2 group-hover:text-purple-400 transition-colors text-sm min-h-[40px]">
             {listing.title}
           </h3>
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10">
            {listing.seller.avatar && (
                <Image src={listing.seller.avatar} alt={listing.seller.displayName} fill className="object-cover" />
            )}
          </div>
          <span className="text-xs text-gray-400 truncate max-w-[100px]">{listing.seller.displayName}</span>
          {listing.seller.reputation.tier === 'excellent' && (
            <Shield className="w-3 h-3 text-purple-400 ml-auto" />
          )}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              ฿{listing.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-500">
              {listing.priceType === 'per-hour' ? '/ ชั่วโมง' : listing.priceType === 'per-session' ? '/ เกม' : 'ราคาเดียว'}
            </div>
          </div>
          
          <Button 
            size="sm" 
            className="bg-white/5 hover:bg-purple-600 border border-white/10 hover:border-purple-500 text-white transition-all"
            onClick={() => onBuy && onBuy(listing)}
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
