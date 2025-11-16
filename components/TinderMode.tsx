'use client';

import { useState } from 'react';
import { Flame, ChevronRight, Settings, Search, X, Heart, Star, RotateCcw, Gamepad2, CheckCircle2, MoreHorizontal, MessageCircle, Swords } from 'lucide-react';
import { tinderProfiles, userProfileData } from '@/lib/mockData';
import { TinderProfile } from '@/lib/types';

interface TinderCardProps {
  profile: TinderProfile;
  zIndex: number;
  onSwipe: (direction: string) => void;
}

const TinderCard = ({ profile, zIndex }: TinderCardProps) => {
  return (
    <div 
       className="absolute top-0 left-0 w-full h-full bg-[#1a1a2e] rounded-3xl border border-white/10 shadow-2xl overflow-hidden select-none transition-all duration-300"
       style={{ zIndex, transform: `scale(${1 - (zIndex * 0.05)}) translateY(${zIndex * 10}px)` }}
    >
       {/* Image Area */}
       <div className="h-3/5 w-full relative bg-gray-900">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}`} 
            alt="Avatar"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent"></div>
          
          {/* Verified Badge */}
          {profile.verified && (
            <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
               <CheckCircle2 size={14} fill="currentColor" className="text-white"/> Verified
            </div>
          )}
       </div>

       {/* Content Area */}
       <div className="h-2/5 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-2">
             <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                   {profile.name}, <span className="text-2xl font-normal text-gray-400">{profile.age}</span>
                </h2>
                <div className="flex items-center gap-2 mt-1 text-cyan-400 font-semibold">
                   <Gamepad2 size={16} /> {profile.game} • {profile.rank}
                </div>
             </div>
             <div className="p-2 bg-white/5 rounded-full border border-white/10">
                <MoreHorizontal className="text-gray-400" />
             </div>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
             &quot;{profile.bio}&quot;
          </p>

          <div className="flex flex-wrap gap-2">
             {profile.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                   #{tag}
                </span>
             ))}
          </div>
       </div>
    </div>
  );
};

interface MatchModalProps {
  profile: TinderProfile;
  onClose: () => void;
}

const MatchModal = ({ profile, onClose }: MatchModalProps) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
     <div className="text-center w-full max-w-md">
        <div className="mb-6 relative">
           <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 italic tracking-tighter animate-bounce">IT&apos;S A MATCH!</h2>
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 blur-3xl rounded-full"></div>
           <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/30 blur-3xl rounded-full"></div>
        </div>
        
        <p className="text-gray-300 mb-8">คุณกับ <span className="font-bold text-white">{profile.name}</span> สนใจเล่นเกมเดียวกัน!</p>
        
        <div className="flex justify-center items-center gap-4 mb-10">
           <div className="w-24 h-24 rounded-full border-4 border-purple-500 overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfileData.avatar}`} 
                alt="User"
                className="w-full h-full bg-black" 
              />
           </div>
           <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <Swords className="text-yellow-400 w-6 h-6" />
           </div>
           <div className="w-24 h-24 rounded-full border-4 border-pink-500 overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}`} 
                alt="Match"
                className="w-full h-full bg-black" 
              />
           </div>
        </div>

        <div className="space-y-3">
           <button className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-white shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2">
              <MessageCircle size={20} /> ทักแชทเลย
           </button>
           <button onClick={onClose} className="w-full py-3.5 bg-white/10 rounded-xl font-bold text-gray-300 hover:bg-white/20 transition">
              ค้นหาต่อ
           </button>
        </div>
     </div>
  </div>
);

interface TinderModeProps {
  onExit: () => void;
}

export default function TinderMode({ onExit }: TinderModeProps) {
   const [profiles, setProfiles] = useState(tinderProfiles);
   const [matchedProfile, setMatchedProfile] = useState<TinderProfile | null>(null);

   const swipe = (direction: string) => {
      if (profiles.length === 0) return;
      
      const currentProfile = profiles[0];
      
      setTimeout(() => {
         setProfiles(profiles.slice(1));

         if (direction === 'right' && Math.random() > 0.5) {
            setMatchedProfile(currentProfile);
         }
      }, 300);
   };

   return (
      <div className="fixed inset-0 z-[60] bg-[#05050a] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
         {matchedProfile && <MatchModal profile={matchedProfile} onClose={() => setMatchedProfile(null)} />}

         {/* Header */}
         <div className="p-4 flex justify-between items-center max-w-md mx-auto w-full">
            <button onClick={onExit} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition">
               <ChevronRight className="rotate-180" />
            </button>
            <div className="flex items-center gap-2">
               <Flame className="text-pink-500 fill-current" />
               <span className="font-bold text-white">Anajak จับคู่</span>
            </div>
            <button className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white transition">
               <Settings size={20} />
            </button>
         </div>

         {/* Card Stack Container */}
         <div className="flex-1 flex flex-col items-center justify-center relative max-w-md mx-auto w-full px-4 py-4">
            <div className="w-full h-[550px] relative">
               {profiles.length > 0 ? (
                  profiles.map((profile, index) => (
                     <TinderCard 
                        key={profile.id} 
                        profile={profile} 
                        zIndex={index} 
                        onSwipe={swipe}
                     />
                  )).reverse()
               ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-3xl">
                     <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <Search size={32} className="text-gray-500" />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">ไม่พบเพื่อนใหม่แล้ว</h3>
                     <p className="text-gray-400 mb-6">ลองปรับตัวกรอง หรือกลับมาใหม่ภายหลังนะ</p>
                     <button onClick={() => setProfiles(tinderProfiles)} className="px-6 py-2 bg-purple-600 rounded-xl text-white font-bold flex items-center gap-2">
                        <RotateCcw size={16}/> รีเฟรช
                     </button>
                  </div>
               )}
            </div>

            {/* Controls */}
            {profiles.length > 0 && (
               <div className="flex items-center justify-center gap-6 mt-8 w-full">
                  <button 
                     onClick={() => swipe('left')}
                     className="w-16 h-16 bg-[#1a1a2e] border-2 border-red-500/50 rounded-full text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-110 transition-all shadow-lg shadow-red-900/20"
                  >
                     <X size={32} />
                  </button>
                  
                  <button className="w-12 h-12 bg-[#1a1a2e] border border-white/10 rounded-full text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white hover:scale-110 transition-all">
                     <Star size={20} fill="currentColor" />
                  </button>

                  <button 
                     onClick={() => swipe('right')}
                     className="w-16 h-16 bg-[#1a1a2e] border-2 border-green-500/50 rounded-full text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white hover:scale-110 transition-all shadow-lg shadow-green-900/20"
                  >
                     <Heart size={32} fill="currentColor" />
                  </button>
               </div>
            )}
         </div>
      </div>
   );
}
