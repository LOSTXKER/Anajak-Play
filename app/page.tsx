'use client';

import { useRouter } from 'next/navigation';
import HeroAction from '@/components/HeroAction';
import TinderMode from '@/components/TinderMode';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { LivePresenceTicker } from '@/components/home/LivePresenceTicker';
import { UserProgressCard } from '@/components/home/UserProgressCard';
import { DynamicHomeCards } from '@/components/home/DynamicHomeCards';
import { ActivityFeed } from '@/components/feed/ActivityFeed';
import { mockLivePresenceEvents, mockPlatformStats, mockActivityFeed } from '@/lib/data/mock-data';
import { useState } from 'react';
import { useParty } from '@/lib/PartyContext';
import { Users, Plus, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [showTinderMode, setShowTinderMode] = useState(false);
  const { openCreateModal } = useParty();

  const handleCreateParty = () => {
    openCreateModal();
  };

  const handleTinderMode = () => {
    setShowTinderMode(true);
  };

  return (
    <DashboardLayout enableChat showRightSidebar={true}>
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[0%] w-[50%] h-[50%] bg-blue-900/15 rounded-full blur-[120px]"></div>
      </div>

      {showTinderMode && <TinderMode onExit={() => setShowTinderMode(false)} />}

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto">

        {/* Live Presence Ticker (V5 Addition) */}
        <div className="mb-6">
          <LivePresenceTicker events={mockLivePresenceEvents} stats={mockPlatformStats} />
        </div>

        {/* User Progress (Mobile Only) */}
        <div className="lg:hidden mb-6">
          <UserProgressCard />
        </div>
        
        {/* Dynamic Home Cards (New V5) */}
        <div className="mb-8">
           <DynamicHomeCards />
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
              className="group relative bg-[#13132b]/60 hover:bg-[#1a1a35] border border-white/10 hover:border-purple-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden active:scale-[0.98]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-all group-hover:bg-purple-600/20"></div>
              
              <div className="w-14 h-14 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-5 text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-all shadow-[0_0_20px_rgba(147,51,234,0.15)]">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">หาปาร์ตี้ (Find Party)</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[40px]">
                เข้าร่วมห้องที่เปิดอยู่ หรือใช้ระบบจับคู่ด่วน (Quick Match) เพื่อหาเพื่อนร่วมทีมที่เหมาะสมกับแรงค์ของคุณทันที
              </p>
              <div className="w-full py-3 rounded-xl bg-purple-600 text-white border border-purple-500 group-hover:bg-purple-500 group-hover:border-purple-400 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-900/20">
                กดเพื่อหาปาร์ตี้ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Create Party Card */}
            <div 
              onClick={handleCreateParty}
              className="group relative bg-[#13132b]/60 hover:bg-[#1a1a35] border border-white/10 hover:border-pink-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden active:scale-[0.98]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-all group-hover:bg-pink-600/20"></div>

              <div className="w-14 h-14 bg-pink-600/20 rounded-2xl flex items-center justify-center mb-5 text-pink-400 group-hover:text-white group-hover:bg-pink-600 transition-all shadow-[0_0_20px_rgba(219,39,119,0.15)]">
                <Plus size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">สร้างห้องใหม่ (Create)</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[40px]">
                ตั้งห้องเอง กำหนด Rank, Role และบรรยากาศการเล่นที่คุณต้องการ เป็นหัวหน้าปาร์ตี้ด้วยตัวคุณเอง
              </p>
              <div className="w-full py-3 rounded-xl bg-pink-600 text-white border border-pink-500 group-hover:bg-pink-500 group-hover:border-pink-400 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-pink-900/20">
                กดเพื่อสร้างห้อง <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed (New V5) */}
        <div className="mb-10">
           <div className="bg-[#13132b]/40 border border-white/5 rounded-3xl p-6 md:p-8">
              <ActivityFeed initialActivities={mockActivityFeed} limit={5} />
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
