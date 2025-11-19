'use client';

import { useRouter } from 'next/navigation';
import HeroAction from '@/components/HeroAction';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { LivePresenceTicker } from '@/components/home/LivePresenceTicker';
import { UserProgressCard } from '@/components/home/UserProgressCard';
import { DynamicHomeCards } from '@/components/home/DynamicHomeCards';
import { ActivityFeed } from '@/components/feed/ActivityFeed';
import { mockLivePresenceEvents, mockPlatformStats, mockActivityFeed } from '@/lib/data/mock-data';
import { useParty } from '@/lib/PartyContext';

export default function Home() {
  const router = useRouter();
  const { openCreateModal } = useParty();

  const handleCreateParty = () => {
    openCreateModal();
  };

  const handleTinderMode = () => {
    router.push('/tinder');
  };

  return (
    <DashboardLayout enableChat showRightSidebar={true}>
      {/* Background Gradient Mesh - Move to layout or keep here but ensure it doesn't affect flex */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 w-screen h-screen">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[0%] w-[50%] h-[50%] bg-blue-900/15 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto">

        {/* Hero Section: Introduction & CTA */}
        <HeroAction 
          onCreateClick={handleCreateParty} 
          onTinderClick={handleTinderMode}
          onFindClick={() => router.push('/lfg')}
        />

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

        {/* Activity Feed (New V5) */}
        <div className="mb-10">
           <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
            ความเคลื่อนไหวล่าสุด (Live Feed)
           </h3>
           <div className="bg-[#13132b]/40 border border-white/5 rounded-3xl p-6 md:p-8">
              <ActivityFeed initialActivities={mockActivityFeed} limit={5} />
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
