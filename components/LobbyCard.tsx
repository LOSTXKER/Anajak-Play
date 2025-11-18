'use client';

import { Users, Star, Shield, Mic, Volume2, UserPlus, Search } from 'lucide-react';
import { Party } from '@/lib/types/index';

interface LobbyCardProps {
  party: Party;
  onJoin: (party: Party) => void;
}

export default function LobbyCard({ party, onJoin }: LobbyCardProps) {
  
  // Get available roles (open slots)
  const availableRoles = party.requiredRoles
    .filter(slot => slot.status === 'open')
    .map(slot => slot.role);

  return (
    <div className="group relative bg-[#13132b] hover:bg-[#1a1a35] border border-white/5 hover:border-purple-500/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col h-full">
      {/* Status Badge */}
      <div className="absolute top-4 right-4 flex gap-2">
        <span className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-mono text-gray-400 border border-white/5">
          {party.time}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${party.leaderAvatar}`} 
            alt="Leader" 
            className="w-12 h-12 rounded-full bg-gray-800 border-2 border-purple-500"
          />
          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
            <Shield className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg leading-tight line-clamp-1 group-hover:text-purple-400 transition-colors">
            {party.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">by {party.leader}</span>
            <div className="flex items-center gap-0.5 bg-yellow-400/10 px-1.5 py-0.5 rounded text-yellow-400 text-[10px] font-bold border border-yellow-400/20">
              <Star className="w-3 h-3 fill-current" /> {party.leaderRep}
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-black/30 rounded-lg p-2 text-center">
          <div className="text-[10px] text-gray-500 uppercase">โหมด</div>
          <div className="text-sm text-white font-semibold">{party.mode}</div>
        </div>
        <div className="bg-black/30 rounded-lg p-2 text-center">
          <div className="text-[10px] text-gray-500 uppercase">แรงค์</div>
          <div className="text-sm text-cyan-400 font-semibold">{party.rank}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4 flex-grow">
        {party.tags.map((tag, idx) => (
          <span key={idx} className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
            #{tag}
          </span>
        ))}
        {party.voiceChat && (
          <span className="text-[10px] px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-bold">
            <Volume2 className="w-3 h-3" /> Discord Voice
          </span>
        )}
        {party.mic ? (
          <span className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
            <Mic className="w-3 h-3" /> ไมค์เปิด
          </span>
        ) : (
          <span className="text-[10px] px-2 py-1 rounded bg-gray-500/10 text-gray-400 border border-gray-500/20 flex items-center gap-1">
            <Mic className="w-3 h-3" /> ไม่มีไมค์
          </span>
        )}
      </div>

      {/* Available Roles */}
      {availableRoles.length > 0 && (
        <div className="mb-4 pb-4 border-b border-white/10">
          <div className="text-xs text-gray-400 mb-2 flex items-center gap-1">
            <Search className="w-3.5 h-3.5" />
            ตำแหน่งที่เปิดรับ:
          </div>
          <div className="flex flex-wrap gap-2">
            {availableRoles.map((role, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-300 rounded border border-cyan-500/30 font-medium">
                {role}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer & Action */}
      <div className="pt-4 border-t border-white/5 mt-auto space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Users className="w-4 h-4" />
            <span className={party.currentPlayers >= party.maxPlayers ? "text-red-400" : "text-white"}>
              {party.currentPlayers}/{party.maxPlayers}
            </span>
            <span>ผู้เล่น</span>
          </div>
          
          {availableRoles.length > 0 && (
            <div className="text-xs text-cyan-400 font-medium">
              เปิดรับ {availableRoles.length} ตำแหน่ง
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <button 
          onClick={() => onJoin(party)}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          เข้าร่วมปาร์ตี้
        </button>
      </div>
    </div>
  );
}
