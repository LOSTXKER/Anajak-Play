/**
 * Tinder Card Component
 * Swipeable card for finding gaming partners
 */

'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { TinderCard as TinderCardType } from '@/lib/types/index';
import { Badge } from '@/components/ui/Badge';
import { Gamepad2, MapPin, Sparkles, Trophy, Swords, Shield, MessageCircle, Target } from 'lucide-react';

interface TinderCardComponentProps {
  card: TinderCardType;
  onSwipe?: (direction: 'left' | 'right') => void;
  isFront?: boolean;
}

export const TinderCardComponent: React.FC<TinderCardComponentProps> = ({ card, onSwipe, isFront = false }) => {
  const { user } = card;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);
  
  // Overlay opacities for visual feedback
  const likeOpacity = useTransform(x, [20, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -150], [0, 1]);
  const likeScale = useTransform(x, [20, 150], [0.8, 1.2]);
  const nopeScale = useTransform(x, [-20, -150], [0.8, 1.2]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!onSwipe) return;
    
    const threshold = 80;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  // Game Role Icon Helper
  const getRoleIcon = (role: string) => {
      if (role.includes('carry')) return <Swords size={14} className="text-red-400" />;
      if (role.includes('support')) return <Shield size={14} className="text-green-400" />;
      return <Target size={14} className="text-blue-400" />;
  };

  const cardContent = (
    <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#1a1a2e] shadow-2xl border border-white/10 select-none group">
      {/* Swipe Indicators */}
      <motion.div 
        style={{ opacity: likeOpacity, scale: likeScale }}
        className="absolute top-10 right-10 z-40 border-[6px] border-green-500 rounded-2xl px-4 py-2 -rotate-12 bg-black/20 backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.4)]"
      >
        <span className="text-green-500 font-black text-5xl tracking-widest drop-shadow-md">LIKE</span>
      </motion.div>
      
      <motion.div 
        style={{ opacity: nopeOpacity, scale: nopeScale }}
        className="absolute top-10 left-10 z-40 border-[6px] border-red-500 rounded-2xl px-4 py-2 rotate-12 bg-black/20 backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.4)]"
      >
        <span className="text-red-500 font-black text-5xl tracking-widest drop-shadow-md">NOPE</span>
      </motion.div>

      {/* Main Image Layer */}
      <div className="absolute inset-0 bg-gray-900">
         <img 
            src={user.avatar && !user.avatar.startsWith('/') ? user.avatar : `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
            alt={user.displayName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            draggable={false}
         />
         {/* Cinematic Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0a0a16] opacity-90" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-[#0a0a16]/80 to-transparent opacity-100" style={{ top: '45%' }} />
      </div>

      {/* Top Info (Status & Compatibility) */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
          <div className="flex flex-col gap-2">
             <div className={`px-3 py-1.5 rounded-full backdrop-blur-md border flex items-center gap-2 shadow-lg ${user.isOnline ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-gray-500/20 border-gray-500/30 text-gray-400'}`}>
                 <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                 <span className="text-xs font-bold uppercase tracking-wide">{user.isOnline ? 'Online Now' : 'Last seen recently'}</span>
             </div>
          </div>

          <div className="flex items-center gap-2">
             <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 shadow-lg">
                 <Sparkles className="w-5 h-5 text-yellow-400 fill-yellow-400/20 animate-pulse" />
             </div>
             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 shadow-lg">
                 <span className="text-white font-black italic text-lg">{card.compatibility}%</span>
             </div>
          </div>
      </div>

      {/* Bottom Content Layer */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-30 flex flex-col gap-4 pb-24">
          {/* Identity */}
          <div>
              <div className="flex items-end gap-3 mb-1">
                  <h2 className="text-4xl font-black text-white font-heading tracking-tight drop-shadow-lg">
                      {user.displayName}
                  </h2>
                  <span className="text-xl text-gray-400 font-medium mb-1.5">
                      Lv.{user.level}
                  </span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      <MapPin size={14} className="text-purple-400" />
                      <span className="text-xs font-medium">Bangkok, TH</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                      <MessageCircle size={14} className="text-blue-400" />
                      <span className="text-xs font-medium">{user.profile.playstyle[0] || 'Casual'}</span>
                  </div>
              </div>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Main Game Info */}
          <div className="space-y-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Main Game</p>
              <div className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-inner">
                          <Gamepad2 className="text-white w-6 h-6" />
                      </div>
                      <div>
                          <p className="text-white font-bold">ROV</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>Diamond IV</span>
                              <span>•</span>
                              <span className="text-purple-400">Winrate 54%</span>
                          </div>
                      </div>
                  </div>
                  <div className="flex gap-1">
                      {[1,2,3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
                              {getRoleIcon('carry')}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          
          {/* Tags/Highlights */}
          <div className="flex flex-wrap gap-2">
               {card.highlights.map((tag, i) => (
                   <span key={i} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 text-purple-200">
                       #{tag}
                   </span>
               ))}
          </div>

          {/* Hint Text (Only visible on non-interactive preview) */}
          {!isFront && (
             <div className="absolute bottom-6 w-full text-center left-0">
                 <p className="text-xs text-white/30 uppercase tracking-widest">Next Profile</p>
             </div>
          )}
      </div>
    </div>
  );

  if (isFront) {
      return (
        <motion.div
          style={{ x, rotate, scale, opacity, zIndex: 100 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
          className="absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing origin-bottom"
          whileTap={{ scale: 1.02 }}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 1.1, opacity: 0, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
            {cardContent}
        </motion.div>
      );
  }

  return (
     <div className="absolute top-0 left-0 w-full h-full transform scale-[0.92] translate-y-6 opacity-60 -z-10 pointer-events-none blur-[1px]">
        {cardContent}
     </div>
  );
};


