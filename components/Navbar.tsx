'use client';

import Link from 'next/link';
import { Bell, Wallet, Search, Zap } from 'lucide-react';
import { userProfileData } from '@/lib/mockData';
import ProfileDropdown from './ProfileDropdown';
import Image from 'next/image';

interface NavbarProps {
  onOpenProfile?: () => void;
  onToggleNoti?: () => void;
  onToggleChat?: () => void;
  notiOpen?: boolean;
  unreadCount?: number;
}

export default function Navbar({ 
  onOpenProfile, 
  onToggleNoti,
  onToggleChat,
  notiOpen = false, 
  unreadCount = 0 
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a16]/90 backdrop-blur-md border-b border-white/10 w-full">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-3 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-white tracking-wider">
              ANAJAK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">PLAY</span>
            </h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">แอพเกมเมอร์ครบวงจร</p>
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
          <input 
            type="text" 
            placeholder="ค้นหาเกม, ชื่อผู้เล่น, หรือปาร์ตี้..." 
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Notification Bell */}
          <button 
            className={`relative p-2 transition-colors ${notiOpen ? 'text-white bg-white/10 rounded-full' : 'text-gray-400 hover:text-white'}`}
            onClick={onToggleNoti}
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold border border-[#0a0a16]">
                {unreadCount}
              </span>
            )}
          </button>

          <ProfileDropdown onOpenProfile={onOpenProfile} />
        </div>
      </div>
    </nav>
  );
}
