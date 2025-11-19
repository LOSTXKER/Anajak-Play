
import React from 'react';
import { GameId } from '@/lib/types/index';
import { gameConfig } from '@/lib/data/mock-data';
import { ActivityFeed } from '@/components/feed/ActivityFeed';
import { mockActivityFeed } from '@/lib/data/mock-data';
import { Users, ArrowRight, Swords, MessageSquare, Plus, Gamepad2, HeartHandshake, ShoppingBag, Zap } from 'lucide-react';
import Link from 'next/link';
import CreatePartyButton from '@/components/community/CreatePartyButton';

// Generate static params for static export
export function generateStaticParams() {
  return Object.keys(gameConfig).map((gameId) => ({
    gameId: gameId,
  }));
}

// Mock data for community specific posts
const mockCommunityPosts = [
  {
    id: 1,
    author: 'KiraGod',
    content: 'มีใครสนใจลง Rank คืนนี้มั้ยครับ? ขาดโรมมิ่ง 1 คน Rank Commander+',
    tags: ['Recruiting', 'Ranked'],
    likes: 5,
    comments: 2,
    time: '10m ago'
  },
  {
    id: 2,
    author: 'SupportMain',
    content: 'แจกทริคการเดินเกม Jungle SS นี้ครับ ลองเอาไปใช้ดู',
    tags: ['Guide', 'Tips'],
    likes: 24,
    comments: 8,
    time: '1h ago'
  }
];

export default function CommunityPage({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId as GameId;
  const game = gameConfig[gameId] || gameConfig['rov']; // Fallback

  // Filter mock feed for this game (simulated)
  const gameActivity = mockActivityFeed.filter(a => a.data?.game === gameId || Math.random() > 0.5);

  return (
    <div className="max-w-7xl mx-auto pb-20">
        
        {/* Game Header */}
        <div className="relative rounded-3xl overflow-hidden mb-8 border border-white/10 bg-[#13132b]">
          <div className="absolute inset-0">
            {/* Gradient fallback if no image */}
            <div className={`absolute inset-0 bg-gradient-to-br ${
               gameId === 'rov' ? 'from-red-900 to-orange-900' :
               gameId === 'valorant' ? 'from-red-900 to-pink-900' :
               'from-blue-900 to-purple-900'
            } opacity-60`}></div>
          </div>
          
          <div className="relative z-10 p-8 flex items-end gap-6 h-[200px]">
             <div className="w-24 h-24 rounded-2xl bg-black/40 border-2 border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                <img src={game.icon} alt={game.name} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 mb-2">
                <div className="flex items-center gap-3 mb-2">
                   <h1 className="text-4xl font-bold text-white">{game.fullName} Community</h1>
                   <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10">Official</span>
                </div>
                <p className="text-gray-300 text-lg flex items-center gap-4">
                   <span className="flex items-center gap-1"><Users size={16} /> 12,405 Members</span>
                   <span className="flex items-center gap-1 text-green-400"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> 842 Online</span>
                </p>
             </div>
             
             <CreatePartyButton gameId={gameId} gameName={game.name} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
           {/* Main Feed */}
           <div className="space-y-6">
              
              {/* Create Post Box */}
              <div className="bg-[#13132b]/60 border border-white/5 rounded-2xl p-4 flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
                 <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder={`พูดคุยเกี่ยวกับ ${game.name}...`}
                      className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 text-sm mb-3"
                    />
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                       <div className="flex gap-2">
                          {/* Actions icons mock */}
                          <button className="p-2 hover:bg-white/5 rounded-full text-gray-400"><Swords size={16} /></button>
                          <button className="p-2 hover:bg-white/5 rounded-full text-gray-400"><MessageSquare size={16} /></button>
                       </div>
                       <button className="px-4 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-lg">โพสต์</button>
                    </div>
                 </div>
              </div>

              {/* Feed Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 <button className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-bold whitespace-nowrap border border-white/10">ทั้งหมด</button>
                 <button className="px-4 py-2 bg-[#13132b] text-gray-400 hover:text-white rounded-xl text-sm font-bold whitespace-nowrap border border-white/5">ไฮไลต์</button>
                 <button className="px-4 py-2 bg-[#13132b] text-gray-400 hover:text-white rounded-xl text-sm font-bold whitespace-nowrap border border-white/5">หาเพื่อน</button>
                 <button className="px-4 py-2 bg-[#13132b] text-gray-400 hover:text-white rounded-xl text-sm font-bold whitespace-nowrap border border-white/5">ไกด์ & เทคนิค</button>
              </div>

              {/* Posts Mock */}
              <div className="space-y-4">
                 {mockCommunityPosts.map(post => (
                    <div key={post.id} className="bg-[#13132b]/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                       <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
                             <div>
                                <div className="font-bold text-white text-sm">{post.author}</div>
                                <div className="text-xs text-gray-500">{post.time}</div>
                             </div>
                          </div>
                          <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-gray-400 border border-white/5">
                             {post.tags[0]}
                          </span>
                       </div>
                       <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          {post.content}
                       </p>
                       <div className="flex items-center gap-6 text-gray-500 text-xs font-bold">
                          <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
                             <span>❤️ {post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                             <span>💬 {post.comments} Comments</span>
                          </button>
                       </div>
                    </div>
                 ))}
              </div>

           </div>

           {/* Sidebar Info */}
           <div className="space-y-6">

              {/* Quick Shortcuts */}
              <div className="bg-[#13132b]/60 border border-white/5 rounded-2xl p-5">
                 <h3 className="font-bold text-white mb-4">เมนูลัด</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <Link href={`/lfg?game=${gameId}`} className="p-3 bg-white/5 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group text-center">
                       <Gamepad2 size={24} className="text-purple-400 group-hover:scale-110 transition-transform" />
                       <span className="text-xs font-bold text-gray-300 group-hover:text-white">หาปาร์ตี้</span>
                    </Link>
                    <Link href="/tinder" className="p-3 bg-white/5 hover:bg-pink-500/20 border border-white/5 hover:border-pink-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group text-center">
                       <HeartHandshake size={24} className="text-pink-400 group-hover:scale-110 transition-transform" />
                       <span className="text-xs font-bold text-gray-300 group-hover:text-white">ปัดหาเพื่อน</span>
                    </Link>
                    <Link href="/marketplace" className="p-3 bg-white/5 hover:bg-blue-500/20 border border-white/5 hover:border-blue-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group text-center">
                       <ShoppingBag size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                       <span className="text-xs font-bold text-gray-300 group-hover:text-white">ตลาดซื้อขาย</span>
                    </Link>
                    <button className="p-3 bg-white/5 hover:bg-yellow-500/20 border border-white/5 hover:border-yellow-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group text-center">
                       <Zap size={24} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                       <span className="text-xs font-bold text-gray-300 group-hover:text-white">เติมเกม</span>
                    </button>
                 </div>
              </div>

              {/* Live Activity for this Game */}
              <div className="bg-[#13132b]/60 border border-white/5 rounded-2xl p-5">
                 <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <ActivityFeed initialActivities={[]} limit={0} /> {/* Only reusing type, actually rendering title manually */}
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live Activity
                    </span>
                 </h3>
                 <ActivityFeed initialActivities={gameActivity} limit={5} />
              </div>

              {/* Top Players / Contributors */}
              <div className="bg-[#13132b]/60 border border-white/5 rounded-2xl p-5">
                 <h3 className="font-bold text-white mb-4">Top Contributors</h3>
                 <div className="space-y-3">
                    {[1,2,3].map(i => (
                       <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-700 text-xs flex items-center justify-center">{i}</div>
                          <div className="flex-1">
                             <div className="text-sm font-bold text-white">ProPlayer{i}</div>
                             <div className="text-[10px] text-gray-500">150 Reputation</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

      </div>
  );
}
