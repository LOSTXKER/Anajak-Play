'use client';

import Link from 'next/link';
import { Bell, Search, Zap, Users, X } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  onOpenProfile?: () => void;
  onToggleNoti?: () => void;
  notiOpen?: boolean;
  unreadCount?: number;
  showSearch?: boolean;
  onToggleMobileRightSidebar?: () => void;
}

export default function Navbar({ 
  onOpenProfile, 
  onToggleNoti,
  notiOpen = false, 
  unreadCount = 0,
  showSearch = true,
  onToggleMobileRightSidebar
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showMobileSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  return (
    <>
    <nav 
      className={`
        fixed top-0 z-50 w-full transition-all duration-300 border-b
        ${isScrolled 
          ? 'bg-[#0a0a16]/90 backdrop-blur-xl border-white/5 shadow-lg shadow-purple-900/5' 
          : 'bg-transparent border-transparent'
        }
      `}
    >
      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-50"></div>

      <div className="w-full px-4 md:px-6 py-3 flex items-center justify-between relative">
        
        {/* Left: Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl opacity-90 group-hover:opacity-100 blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl opacity-50 blur-md group-hover:opacity-70 transition-opacity"></div>
            <Zap className="relative text-white w-5 h-5 fill-white drop-shadow-md" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-white tracking-wider leading-none">
              ANAJAK
            </h1>
            <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-[0.2em]">
              PLAY
            </span>
          </div>
        </Link>

        {/* Center: Modern Search Bar */}
        {showSearch && (
          <div className="hidden lg:flex flex-1 max-w-md mx-12 relative group">
            <div className={`
              absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-0 transition-opacity duration-300 blur-sm
              ${isSearchFocused ? 'opacity-30' : 'group-hover:opacity-20'}
            `}></div>
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="ค้นหาเกม, ผู้เล่น, หรือปาร์ตี้..." 
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-[#13132b]/80 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:bg-[#0a0a16] focus:border-white/20 transition-all shadow-inner"
              />
              <Search className={`
                absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors
                ${isSearchFocused ? 'text-purple-400' : 'text-gray-500'}
              `} />
            </div>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-6">

          {/* Mobile Search Toggle */}
          {showSearch && (
            <button
              onClick={() => setShowMobileSearch(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Friends Toggle */}
          {onToggleMobileRightSidebar && (
            <button
              onClick={onToggleMobileRightSidebar}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Users className="w-5 h-5" />
            </button>
          )}
          
          {/* Notification */}
          <button 
            className={`
              relative p-2.5 rounded-full transition-all duration-200 group
              ${notiOpen ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400 hover:text-white'}
            `}
            onClick={onToggleNoti}
            title="แจ้งเตือน"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0a0a16] animate-pulse"></span>
            )}
            <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/10 transition-colors"></div>
          </button>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-white/10 hidden sm:block"></div>

          {/* Profile */}
          <ProfileDropdown onOpenProfile={onOpenProfile} />
        </div>
      </div>
    </nav>

    {/* Mobile Search Overlay */}
    {showMobileSearch && (
      <div className="fixed inset-0 z-[60] bg-[#0a0a16]/95 backdrop-blur-xl flex flex-col p-4 lg:hidden animate-in fade-in duration-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder="ค้นหา..." 
              className="w-full bg-white/10 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <button 
            onClick={() => setShowMobileSearch(false)}
            className="p-2 text-gray-400 hover:text-white"
          >
            ยกเลิก
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
            <div className="text-sm text-gray-500 mb-4 font-bold">ประวัติการค้นหา</div>
            <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                    <Search className="w-4 h-4 text-gray-500" /> RoV Rank
                </div>
                <div className="flex items-center gap-3 text-gray-300 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                    <Search className="w-4 h-4 text-gray-500" /> Valorant Duo
                </div>
            </div>
        </div>
      </div>
    )}
    </>
  );
}
