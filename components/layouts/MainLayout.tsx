'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Top Navigation */}
      <Navbar onOpenProfile={() => router.push('/profile')} />
      
      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        {children}
      </main>
      
      {/* Bottom Navigation (Mobile) */}
      <BottomNav />
    </div>
  );
};
