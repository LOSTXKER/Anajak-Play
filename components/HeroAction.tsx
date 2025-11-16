'use client';

import { Plus, Flame } from 'lucide-react';

interface HeroActionProps {
  onCreateClick?: () => void;
  onTinderClick?: () => void;
}

export default function HeroAction({ onCreateClick, onTinderClick }: HeroActionProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-6 md:p-10 mb-8">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            หาตี้ที่ <span className="text-cyan-400">ใช่</span> ในแบบที่คุณ <span className="text-purple-400">ชอบ</span>
          </h2>
          <p className="text-gray-300 mb-6 max-w-lg">
            ระบบ LFG อัจฉริยะ คัดกรองด้วย Reputation System หมดปัญหาเจอไก่ เจอเกรียน
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button 
              onClick={onCreateClick}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transform hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              สร้างห้องหาคน
            </button>
            <button 
              onClick={onTinderClick}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold rounded-xl flex items-center gap-2 backdrop-blur-sm transition-all"
            >
              <Flame className="w-5 h-5 text-pink-500" />
              Tinder Mode
            </button>
          </div>
        </div>
        
        {/* Stat Cards */}
        <div className="flex gap-4">
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 text-center min-w-[100px]">
            <div className="text-2xl font-bold text-white">1,240</div>
            <div className="text-xs text-gray-400">ผู้ใช้ออนไลน์</div>
            <div className="mt-2 w-2 h-2 bg-green-500 rounded-full mx-auto animate-pulse"></div>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 text-center min-w-[100px]">
            <div className="text-2xl font-bold text-purple-400">58</div>
            <div className="text-xs text-gray-400">ห้องที่เปิดอยู่</div>
          </div>
        </div>
      </div>
    </div>
  );
}
