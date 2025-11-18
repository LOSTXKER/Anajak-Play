import React from 'react';
import { User, TinderCard } from '@/lib/types/index';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { 
  Gamepad2, 
  Clock, 
  MapPin, 
  Trophy, 
  Quote, 
  BarChart3,
  ThumbsUp,
  Shield,
  Swords,
  Zap
} from 'lucide-react';

interface ProfileDetailViewProps {
  card: TinderCard;
}

export const ProfileDetailView: React.FC<ProfileDetailViewProps> = ({ card }) => {
  const { user } = card;

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500 slide-in-from-right-4">
      {/* 1. Identity Header */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-xl">
        <div className="flex items-start justify-between mb-4">
            <div>
                <h2 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
                    {user.displayName}
                    {user.isOnline && (
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    )}
                </h2>
                <p className="text-purple-400 font-medium flex items-center gap-2">
                    @{user.username}
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400 text-sm">Lv.{user.level}</span>
                </p>
            </div>
            <div className="text-right">
                <div className="text-2xl font-black text-white italic">
                    {card.compatibility}%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Compatibility</div>
            </div>
        </div>

        {/* Quote */}
        <div className="relative bg-black/20 rounded-xl p-4 border-l-4 border-purple-500">
            <Quote className="absolute top-2 right-2 text-white/5 w-8 h-8" />
            <p className="text-gray-300 italic text-sm relative z-10">
                "{user.profile.quote || "Ready to play!"}"
            </p>
        </div>
      </div>

      {/* 2. Main Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#13132b]/80 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center hover:bg-[#1a1a35] transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 text-blue-400">
                  <ThumbsUp size={20} />
              </div>
              <div className="text-xl font-bold text-white">{user.reputation.overall}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Reputation</div>
          </div>
          
          <div className="bg-[#13132b]/80 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center hover:bg-[#1a1a35] transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2 text-green-400">
                  <Gamepad2 size={20} />
              </div>
              <div className="text-xl font-bold text-white">{user.profile.completedSessions}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Sessions</div>
          </div>

          <div className="bg-[#13132b]/80 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center hover:bg-[#1a1a35] transition-colors">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2 text-yellow-400">
                  <Trophy size={20} />
              </div>
              <div className="text-xl font-bold text-white">{user.profile.friendCount}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Friends</div>
          </div>
      </div>

      {/* 3. Detailed Info Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
          {/* Left Col: Gaming Profile */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <Zap size={14} /> Gaming Profile
               </h3>
               
               {/* Games List */}
               <div className="space-y-3">
                  {user.profile.mainGames.map((game, idx) => (
                      <div key={idx} className="group p-3 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 transition-all">
                          <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white capitalize">{game.game}</span>
                              <Badge variant={idx === 0 ? "primary" : "secondary"} size="sm">
                                  {game.rank}
                              </Badge>
                          </div>
                          <div className="flex gap-2">
                              {game.role.map((r, rIdx) => (
                                  <span key={rIdx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 uppercase">
                                      {r}
                                  </span>
                              ))}
                          </div>
                      </div>
                  ))}
               </div>

               {/* Playstyle Tags */}
               <div className="mt-2">
                   <p className="text-xs text-gray-500 mb-2">Playstyle</p>
                   <div className="flex flex-wrap gap-2">
                       {user.profile.playstyle.map((style, idx) => (
                           <Badge key={idx} variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300">
                               {style}
                           </Badge>
                       ))}
                   </div>
               </div>
          </div>

          {/* Right Col: Personal Info */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                   <BarChart3 size={14} /> Personal Info
               </h3>

               <div className="space-y-4">
                   <div className="flex items-start gap-3">
                       <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                           <Clock size={16} />
                       </div>
                       <div>
                           <p className="text-sm font-bold text-white">Active Time</p>
                           <p className="text-xs text-gray-400 capitalize">{user.profile.playTime || 'Various Times'}</p>
                       </div>
                   </div>

                   <div className="flex items-start gap-3">
                       <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                           <MapPin size={16} />
                       </div>
                       <div>
                           <p className="text-sm font-bold text-white">Region</p>
                           <p className="text-xs text-gray-400">{user.profile.region || 'Global'}</p>
                       </div>
                   </div>

                   <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/5">
                       <p className="text-xs font-bold text-gray-400 mb-1">About Me</p>
                       <p className="text-sm text-gray-300 leading-relaxed">
                           {user.profile.bio}
                       </p>
                   </div>

                   {card.mutualGames.length > 0 && (
                       <div className="p-3 rounded-xl bg-green-900/10 border border-green-500/20">
                           <p className="text-xs font-bold text-green-400 mb-1 flex items-center gap-2">
                               <Swords size={12} /> Mutual Games
                           </p>
                           <div className="flex flex-wrap gap-1.5">
                               {card.mutualGames.map((g, i) => (
                                   <span key={i} className="text-[10px] font-bold text-green-300 px-2 py-0.5 rounded bg-green-500/10">
                                       {g}
                                   </span>
                               ))}
                           </div>
                       </div>
                   )}
               </div>
          </div>
      </div>
    </div>
  );
};

