import React from 'react';
import Link from 'next/link';
import { gameConfig } from '@/lib/data/mock-data';
import { Users, ArrowRight, Crown, Search } from 'lucide-react';

export default function CommunityHubPage() {
  const communities = Object.values(gameConfig);

  return (
    <div className="max-w-7xl mx-auto pb-20">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Crown className="text-yellow-500" size={32} />
            Explore Communities
          </h1>
          <p className="text-gray-400">เข้าร่วมคอมมูนิตี้เกมที่คุณชื่นชอบ พูดคุย หาเพื่อน และติดตามข่าวสาร</p>
        </div>

        {/* Search & Filter (Mock) */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
          <input 
            type="text"
            placeholder="ค้นหาเกม หรือ คอมมูนิตี้..."
            className="w-full pl-12 pr-4 py-3 bg-[#13132b] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((game) => (
            <Link 
              key={game.id} 
              href={`/community/${game.id}`}
              className="group relative bg-[#13132b] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:-translate-y-1"
            >
              {/* Cover Image (Gradient Fallback) */}
              <div className={`h-32 w-full bg-gradient-to-br ${
                game.id === 'rov' ? 'from-red-900 to-orange-900' : 
                game.id === 'valorant' ? 'from-red-900 to-pink-900' : 
                'from-blue-900 to-purple-900'
              } opacity-80 group-hover:opacity-100 transition-opacity`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="p-6 relative">
                {/* Icon floating overlap */}
                <div className="absolute -top-10 left-6 w-20 h-20 rounded-2xl border-4 border-[#13132b] bg-[#0a0a16] overflow-hidden shadow-lg">
                  <img src={game.icon} alt={game.name} className="w-full h-full object-cover" />
                </div>

                <div className="mt-8">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{game.fullName}</h3>
                      <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold text-gray-400 border border-white/5">Official</span>
                   </div>
                   
                   <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                      <span className="flex items-center gap-1"><Users size={14} /> 12.4k Members</span>
                      <span className="flex items-center gap-1 text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> 842 Online</span>
                   </div>

                   <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-purple-600 group-hover:border-purple-500">
                      เข้าสู่คอมมูนิตี้ <ArrowRight size={16} />
                   </button>
                </div>
              </div>
            </Link>
          ))}

          {/* Coming Soon Card */}
          <div className="bg-[#13132b]/40 border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <PlusIcon />
             </div>
             <h3 className="text-lg font-bold text-gray-400 mb-2">Suggest a Community</h3>
             <p className="text-sm text-gray-500 mb-4">ไม่เจอเกมที่คุณเล่น? เสนอให้เราเปิดคอมมูนิตี้ใหม่ได้เลย</p>
             <button className="px-4 py-2 text-sm text-purple-400 hover:text-purple-300 font-bold">
                + Request New Game
             </button>
          </div>
        </div>

      </div>
  );
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

