'use client';

import { Plus, HeartHandshake, Users, Zap, Search } from 'lucide-react';

interface HeroActionProps {
  onCreateClick?: () => void;
  onTinderClick?: () => void;
  onFindClick?: () => void;
}

export default function HeroAction({ onCreateClick, onTinderClick, onFindClick }: HeroActionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-1 p-[1px] mb-8 bg-gradient-to-r from-blue-500/50 to-purple-600/50">
      <div className="relative overflow-hidden rounded-[23px] bg-[#0f1016] p-6 md:p-10 h-full">
        
        {/* Background Ambience - V5 Neon Theme */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Text Content */}
          <div className="text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-gray-300">LFG System V5 Live</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              หาตี้ที่ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7BFF] to-[#A855F7]">ใช่</span> <br/>
              ในแบบที่คุณ <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-pink-500">ชอบ</span>
            </h2>
            
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              ระบบหาปาร์ตี้เกมเมอร์ที่คัดคนคุณภาพด้วย Reputation System <br className="hidden md:block"/>
              หมดปัญหาเจอไก่ เจอเกรียน เล่นให้สนุกกว่าเดิม
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {/* Primary Button: Create Party */}
              <button 
                onClick={onCreateClick}
                className="group relative px-6 py-4 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  <span>สร้างห้อง</span>
                </div>
              </button>

              {/* Secondary Button: Find Party (New) */}
              <button 
                onClick={onFindClick}
                className="group px-6 py-4 bg-[#3A7BFF]/10 hover:bg-[#3A7BFF]/20 border border-[#3A7BFF]/30 text-white font-semibold rounded-2xl flex items-center gap-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-1 bg-[#3A7BFF]/20 rounded-lg group-hover:bg-[#3A7BFF] group-hover:text-white transition-colors text-[#3A7BFF]">
                   <Search className="w-5 h-5" />
                </div>
                <span>หาปาร์ตี้</span>
              </button>

              {/* Tertiary Button: Tinder Mode */}
              <button 
                onClick={onTinderClick}
                className="group px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/50 text-white font-semibold rounded-2xl flex items-center gap-2 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-1 bg-pink-500/20 rounded-lg group-hover:bg-pink-500 group-hover:text-white transition-colors text-pink-400">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span>ปัดหาเพื่อน</span>
              </button>
            </div>
          </div>
          
          {/* Stat Cards (Floating) */}
          <div className="relative hidden md:block">
             {/* Decorative Circle Background */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

            <div className="grid grid-cols-1 gap-4 relative z-10">
              {/* Stat 1 */}
              <div className="bg-[#111827]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center gap-4 w-[220px] transform translate-x-4 hover:scale-105 transition-transform cursor-default shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">1,240</div>
                  <div className="text-xs text-gray-400">Online Users</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-[#111827]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center gap-4 w-[220px] transform -translate-x-4 hover:scale-105 transition-transform cursor-default shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Zap size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">58</div>
                  <div className="text-xs text-gray-400">Active Rooms</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
