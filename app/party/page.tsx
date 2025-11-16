'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParty } from '@/lib/PartyContext';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import LoadingScreen from '@/components/LoadingScreen';
import PartyRoom from '@/components/PartyRoom';
import Navbar from '@/components/Navbar';
import NotificationDropdown from '@/components/NotificationDropdown';
import UserProfileModal from '@/components/UserProfileModal';
import ChatSidebarOverlay from '@/components/ChatSidebarOverlay';
import { notificationsData } from '@/lib/mockData';

export default function PartyPage() {
  const router = useRouter();
  const { activeParty, leaveParty } = useParty();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChatSidebar, setShowChatSidebar] = useState(false);
  const [notifications] = useState(notificationsData);

  const handleLeaveParty = () => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าจะออกจากปาร์ตี้?")) {
      leaveParty();
      router.push('/');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!activeParty) {
    return (
      <div className="min-h-screen w-full bg-[#05050a] text-white font-sans flex items-center justify-center">
        <Sidebar />
        <BottomNav />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">ยังไม่ได้เข้าร่วมปาร์ตี้</h2>
          <p className="text-gray-400 mb-6">กลับไปหน้าแรกเพื่อค้นหาและเข้าร่วมปาร์ตี้</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-bold transition"
          >
            กลับหน้าแรก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <Sidebar />
      <BottomNav />
      
      <div className="lg:ml-20 pb-16 lg:pb-0">
        <ChatSidebarOverlay 
        isOpen={showChatSidebar}
        onClose={() => setShowChatSidebar(false)}
      />
      
      <Navbar 
        onOpenProfile={() => setShowProfileModal(true)}
        onToggleNoti={() => setShowNotifications(!showNotifications)}
        onToggleChat={() => setShowChatSidebar(!showChatSidebar)}
        notiOpen={showNotifications}
        unreadCount={unreadCount}
      />

      <NotificationDropdown 
        isOpen={showNotifications}
        notifications={notifications}
        onClose={() => setShowNotifications(false)}
      />

      {showProfileModal && (
        <UserProfileModal onClose={() => setShowProfileModal(false)} />
      )}

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8">
        <PartyRoom party={activeParty} onLeave={handleLeaveParty} />
      </main>
      </div>
    </div>
  );
}
