'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Zap, Users, Home, ShoppingBag, MessageCircle, HeartHandshake, Crown, ChevronDown, UserPlus } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import { useState, useEffect, useRef } from 'react';
import { useParty } from '@/lib/PartyContext';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onOpenProfile?: () => void;
  onToggleNoti?: () => void;
  notiOpen?: boolean;
  unreadCount?: number;
  onToggleMobileRightSidebar?: () => void;
  onChatClick?: () => void;
}

export default function Navbar({ 
  onOpenProfile, 
  onToggleNoti,
  notiOpen = false, 
  unreadCount = 0,
  onToggleMobileRightSidebar,
  onChatClick
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { activeParty } = useParty();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  const marketplaceRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: Home, label: 'หน้าแรก', href: isAuthenticated ? '/dashboard' : '/', badge: null },
    { icon: Users, label: 'หาตี้', href: '/lfg', badge: activeParty ? 'active' : null, highlight: !!activeParty },
    { icon: HeartHandshake, label: 'ปัดหาเพื่อน', href: '/tinder', badge: 'new' },
    { 
      icon: ShoppingBag, 
      label: 'ตลาด', 
      href: '/marketplace', 
      badge: null,
      hasDropdown: true,
      dropdownItems: [
        { label: 'ซื้อขายไอดี', href: '/marketplace?category=account-sale' },
        { label: 'ซื้อขายไอเทม', href: '/marketplace?category=item-sale' },
        { label: 'จ้างเล่น', href: '/marketplace?category=hire-play' },
        { label: 'โค้ชเกม', href: '/marketplace?category=coaching' },
        { label: 'สินค้า/บริการ อื่นๆ', href: '/marketplace?category=custom' },
      ]
    },
    { icon: Crown, label: 'คอมมูนิตี้เกม', href: '/community', badge: null },
    { icon: Zap, label: 'เติมเกม', href: '/topup', badge: 'hot' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (marketplaceRef.current && !marketplaceRef.current.contains(event.target as Node)) {
        setMarketplaceOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
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

      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-3 flex items-center justify-between relative">
        
        {/* Left: Brand */}
        <Link 
          href={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center gap-3 cursor-pointer group mr-8"
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

        {/* Center: Navigation Items */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            const Content = (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full transition-all">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {item.label}
                </span>
                {item.badge && item.badge !== 'active' && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">
                        {item.badge}
                    </span>
                )}
                 {item.badge === 'active' && (
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-1"></span>
                )}
                {item.hasDropdown && (
                  <ChevronDown className={`w-4 h-4 transition-transform ${marketplaceOpen ? 'rotate-180' : ''} ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                )}
              </div>
            );

            if (item.hasDropdown) {
               return (
                  <div key={item.href} className="relative group" ref={marketplaceRef}>
                    <button
                      onClick={() => setMarketplaceOpen(!marketplaceOpen)}
                      className={`relative group hover:bg-white/5 rounded-full transition-all ${isActive ? 'bg-white/10' : ''}`}
                    >
                       {Content}
                       {isActive && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] rounded-full"></div>
                       )}
                    </button>
                    
                    {/* Dropdown Menu */}
                    {marketplaceOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-[#13132b] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                        {item.dropdownItems?.map((subItem) => (
                          <Link 
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setMarketplaceOpen(false)}
                            className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/5 last:border-0"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
               );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative group hover:bg-white/5 rounded-full transition-all ${isActive ? 'bg-white/10' : ''}`}
              >
                {Content}
                {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] rounded-full"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-6 ml-auto">

          {isAuthenticated ? (
            <>
              {/* Mobile Friends Toggle */}
              {onToggleMobileRightSidebar && (
                <button
                  onClick={onToggleMobileRightSidebar}
                  className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Users className="w-5 h-5" />
                </button>
              )}

              {/* Chat Icon */}
              <button 
                className="hidden lg:block relative p-2.5 rounded-full transition-all duration-200 group hover:bg-white/5 text-gray-400 hover:text-white"
                onClick={onChatClick}
                title="แชท"
              >
                <MessageCircle className="w-5 h-5" />
                {/* Example badge for chat */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0a0a16] animate-pulse"></span>
                <div className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/10 transition-colors"></div>
              </button>
              
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
            </>
          ) : (
            <div className="flex items-center gap-2">
               <button 
                  onClick={() => openAuthModal('login')}
                  className="hidden sm:block px-5 py-2.5 text-gray-300 hover:text-white font-bold hover:bg-white/5 rounded-xl transition-all"
               >
                  เข้าสู่ระบบ
               </button>
               <button 
                  onClick={() => openAuthModal('register')}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20 flex items-center gap-2"
               >
                  <UserPlus className="w-4 h-4" />
                  <span>สมัครสมาชิก</span>
               </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
