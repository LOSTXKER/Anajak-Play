'use client';

import { ReactNode, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import Navbar from '@/components/Navbar';
import NotificationDropdown from '@/components/NotificationDropdown';
import { notificationsData } from '@/lib/data/legacy-data';
import { Notification } from '@/lib/types/index';
import ChatSidebarOverlay from '@/components/ChatSidebarOverlay';

import { HomeSidebar } from '@/components/home/HomeSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  contentClassName?: string;
  enableNotifications?: boolean;
  enableChat?: boolean;
  showRightSidebar?: boolean;
  notificationsFeed?: Notification[];
  showNavbarSearch?: boolean;
  disableMainTopPadding?: boolean;
}

export default function DashboardLayout({
  children,
  contentClassName = '',
  enableNotifications = true,
  enableChat = true,
  showRightSidebar = false,
  notificationsFeed,
  showNavbarSearch = true,
  disableMainTopPadding = false,
}: DashboardLayoutProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const notifications = notificationsFeed ?? notificationsData;

  const unreadCount = useMemo(() => {
    if (!enableNotifications) return 0;
    return notifications.filter((notification) => !notification.read).length;
  }, [enableNotifications, notifications]);

  const mainClassName = [
    'max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8',
    contentClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="min-h-screen w-full bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <Sidebar onChatClick={() => setIsChatOpen(true)} />
      <BottomNav onChatClick={() => setIsChatOpen(true)} />

      {/* Top Navbar (Full Width) */}
      <Navbar
        onOpenProfile={() => router.push('/profile')}
        onToggleNoti={
          enableNotifications
            ? () => setShowNotifications((prev) => !prev)
            : undefined
        }
        notiOpen={showNotifications}
        unreadCount={enableNotifications ? unreadCount : 0}
        showSearch={showNavbarSearch}
      />

      {enableNotifications && (
        <NotificationDropdown
          isOpen={showNotifications}
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {enableChat && (
        <ChatSidebarOverlay 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {/* Main Content Wrapper */}
      <div className={`lg:ml-20 pb-16 lg:pb-0 ${disableMainTopPadding ? '' : 'pt-20'}`}> {/* Added padding-top for mobile/desktop if needed, adjust based on Navbar height behavior */}

        <main className={mainClassName}>
          {showRightSidebar ? (
            <div className="flex flex-col lg:flex-row gap-8 h-full">
              <div className="flex-1 min-w-0 h-full">
                {children}
              </div>
              <div className="h-full">
                <HomeSidebar />
              </div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
