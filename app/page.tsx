'use client';

import { useRouter } from 'next/navigation';
import HeroAction from '@/components/HeroAction';
import TinderMode from '@/components/TinderMode';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { HomeSidebar } from '@/components/home/HomeSidebar';
import { useState } from 'react';
import { Users, Plus, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [showTinderMode, setShowTinderMode] = useState(false);

  const handleCreateParty = () => {
    // Redirect to LFG Hub for creating a party
    router.push('/lfg');
  };

  const handleTinderMode = () => {
    setShowTinderMode(true);
  };

  return (
    <DashboardLayout enableChat>
      {showTinderMode && <TinderMode onExit={() => setShowTinderMode(false)} />}

      <HeroAction 
        onCreateClick={handleCreateParty}
        onTinderClick={handleTinderMode}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-cyan-500 rounded-full"></span>
              🔥 Quick Actions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {/* Quick Match Card */}
            <div 
              onClick={() => router.push('/lfg')}
              className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-purple-500/50 hover:scale-[1.02] transition-all group"
            >
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4 text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-colors">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Find a Party</h3>
              <p className="text-sm text-gray-400 mb-4">
                Join active lobbies or use quick match to find teammates instantly.
              </p>
              <div className="flex items-center text-purple-400 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                Go to LFG Hub <ArrowRight size={16} />
              </div>
            </div>

            {/* Create Party Card */}
            <div 
              onClick={() => router.push('/lfg')}
              className="bg-gradient-to-br from-pink-900/40 to-orange-900/40 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-pink-500/50 hover:scale-[1.02] transition-all group"
            >
              <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center mb-4 text-pink-400 group-hover:text-white group-hover:bg-pink-600 transition-colors">
                <Plus size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Create Party</h3>
              <p className="text-sm text-gray-400 mb-4">
                Host your own room, set requirements, and wait for players.
              </p>
              <div className="flex items-center text-pink-400 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                Create Now <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* Featured Section (Placeholder) */}
          <div className="bg-[#13132b] rounded-3xl p-8 text-center border border-white/5">
             <h2 className="text-2xl font-bold text-white mb-2">Welcome to Anajak Play</h2>
             <p className="text-gray-400 max-w-md mx-auto mb-6">
               The ultimate gamer community. Find friends, join parties, and trade items securely.
             </p>
             <button 
               onClick={() => router.push('/lfg')}
               className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
             >
               Start Playing
             </button>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <HomeSidebar />
      </div>
    </DashboardLayout>
  );
}
