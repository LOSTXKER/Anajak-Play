'use client';

import { ReactNode, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import Navbar from '@/components/Navbar';
import NotificationDropdown from '@/components/NotificationDropdown';
import ChatSidebarOverlay from '@/components/ChatSidebarOverlay';
import { notificationsData } from '@/lib/data/legacy-data';
import { Notification } from '@/lib/types/index';

interface DashboardLayoutProps {
  children: ReactNode;
  contentClassName?: string;
  enableNotifications?: boolean;
  enableChat?: boolean;
  notificationsFeed?: Notification[];
}

export default function DashboardLayout({
  children,
  contentClassName = '',
  enableNotifications = true,
  enableChat = false,
  notificationsFeed,
}: DashboardLayoutProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatSidebar, setShowChatSidebar] = useState(false);
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
      <Sidebar />
      <BottomNav />

      <div className="lg:ml-20 pb-16 lg:pb-0">
        {enableChat && (
          <ChatSidebarOverlay
            isOpen={showChatSidebar}
            onClose={() => setShowChatSidebar(false)}
          />
        )}

        <Navbar
          onOpenProfile={() => router.push('/profile')}
          onToggleNoti={
            enableNotifications
              ? () => setShowNotifications((prev) => !prev)
              : undefined
          }
          onToggleChat={
            enableChat ? () => setShowChatSidebar((prev) => !prev) : undefined
          }
          notiOpen={showNotifications}
          unreadCount={enableNotifications ? unreadCount : 0}
          showChatButton={enableChat}
          chatOpen={showChatSidebar}
        />

        {enableNotifications && (
          <NotificationDropdown
            isOpen={showNotifications}
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
          />
        )}

        <main className={mainClassName}>{children}</main>
      </div>
    </div>
  );
}
