'use client';

import { useRouter } from 'next/navigation';
import HeroAction from '@/components/HeroAction';
import TinderMode from '@/components/TinderMode';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { HomeSidebar } from '@/components/home/HomeSidebar';
import { useState } from 'react';
import { Users, Plus, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [showTinderMode, setShowTinderMode] = useState(false);

  const handleCreateParty = () => {
    router.push('/lfg');
  };

  const handleTinderMode = () => {
    setShowTinderMode(true);
  };

  return (
    <DashboardLayout enableChat>
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[0%] w-[50%] h-[50%] bg-blue-900/15 rounded-full blur-[120px]"></div>
      </div>

      {showTinderMode && <TinderMode onExit={() => setShowTinderMode(false)} />}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          
          {/* Hero Banner - Enhanced (Clean Version) */}
          <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#13132b] rounded-[2rem] p-8 md:p-12 border border-white/10 overflow-hidden mb-10 shadow-xl shadow-black/20 group flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-purple-600/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                หาตี้ที่ <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ใช่</span> ในแบบที่คุณ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">ชอบ</span>
              </h1>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                ระบบ LFG อัจฉริยะ คัดกรองด้วย Reputation System หมดปัญหาเจอไก่ เจอเกรียน เล่นเกมให้สนุกต้องที่ Anajak Play
              </p>
            </div>
            
            {/* Decorative Stats (Optional: Keep or Remove based on preference, keeping for vibe) */}
            <div className="hidden md:flex absolute top-6 right-6 gap-3 opacity-70">
              <div className="bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 text-[10px] text-gray-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                1,240 ออนไลน์
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
              <span className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
              เมนูลัด (Quick Actions)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Match Card */}
              <div 
                onClick={() => router.push('/lfg')}
                className="group relative bg-[#13132b]/60 hover:bg-[#1a1a35] border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-all group-hover:bg-purple-600/20"></div>
                
                <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-5 text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(147,51,234,0.15)]">
                  <Users size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">หาปาร์ตี้ (Find Party)</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  เข้าร่วมห้องที่เปิดอยู่ หรือใช้ระบบจับคู่ด่วน (Quick Match) เพื่อหาเพื่อนร่วมทีมที่เหมาะสมกับแรงค์ของคุณทันที
                </p>
                <div className="flex items-center text-purple-400 text-sm font-bold gap-2 group-hover:gap-3 transition-all">
                  ไปที่ LFG Hub <ArrowRight size={16} />
                </div>
              </div>

              {/* Create Party Card */}
              <div 
                onClick={() => router.push('/lfg')}
                className="group relative bg-[#13132b]/60 hover:bg-[#1a1a35] border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-all group-hover:bg-pink-600/20"></div>

                <div className="w-14 h-14 bg-pink-600/20 rounded-2xl flex items-center justify-center mb-5 text-pink-400 group-hover:text-white group-hover:bg-pink-600 transition-all shadow-[0_0_20px_rgba(219,39,119,0.15)]">
                  <Plus size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">สร้างห้องใหม่ (Create)</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  ตั้งห้องเอง กำหนด Rank, Role และบรรยากาศการเล่นที่คุณต้องการ เป็นหัวหน้าปาร์ตี้ด้วยตัวคุณเอง
                </p>
                <div className="flex items-center text-pink-400 text-sm font-bold gap-2 group-hover:gap-3 transition-all">
                  สร้างห้องเลย <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="bg-[#181824]/50 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/5">
             <h2 className="text-2xl font-bold text-white mb-3">ยินดีต้อนรับสู่ Anajak Play</h2>
             <p className="text-gray-400 max-w-lg mx-auto mb-8 font-light">
               ชุมชนเกมเมอร์คุณภาพ ครบวงจรที่สุด หาเพื่อนเล่น จ้างโค้ช หรือซื้อขายไอเทม อย่างปลอดภัยและมั่นใจ
             </p>
             <button 
               onClick={() => router.push('/lfg')}
               className="px-10 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition-colors shadow-lg shadow-white/10"
             >
               เริ่มหาเพื่อนเล่น
             </button>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <HomeSidebar />
      </div>
    </DashboardLayout>
  );
}
