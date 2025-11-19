'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ShoppingBag, MessageCircle, HeartHandshake, Crown, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useParty } from '@/lib/PartyContext';
import { useEffect, useRef, useState } from 'react';

interface SidebarProps {
  onChatClick?: () => void;
}

export default function Sidebar({ onChatClick }: SidebarProps) {
  const pathname = usePathname();
  const { activeParty } = useParty();
  const navRef = useRef<HTMLElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<{ label: string; top: number } | null>(null);

  const navItems = [
    { icon: Home, label: 'หน้าแรก', href: '/', badge: null },
    { icon: Users, label: 'ปาร์ตี้', href: '/lfg', badge: activeParty ? 'active' : null, highlight: !!activeParty },
    { icon: Crown, label: 'คอมมูนิตี้', href: '/community', badge: null },
    { icon: HeartHandshake, label: 'ปัดหาเพื่อน', href: '/tinder', badge: 'new' },
    { icon: ShoppingBag, label: 'ตลาด', href: '/marketplace', badge: null },
    { icon: Zap, label: 'เติมเกม', href: '/topup', badge: 'hot' },
    { icon: MessageCircle, label: 'แชท', href: '#', isAction: true, badge: '3' },
  ];

  const checkScroll = () => {
    if (navRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = navRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredItem({ label, top: rect.top + rect.height / 2 });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      <aside className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 h-auto min-h-[400px] max-h-[calc(100vh-160px)] w-20 z-50 flex-col justify-between items-center py-6 gap-4 xl:py-8 xl:gap-6 bg-[#0a0a16]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 transition-all hover:border-white/20 overflow-hidden">
        
        {/* Top Scroll Indicator */}
        <div 
          className={`absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a0a16] to-transparent z-10 pointer-events-none transition-opacity duration-300 flex justify-center ${canScrollUp ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="w-full h-[1px] bg-white/10"></div>
        </div>

        {/* Center: Navigation */}
        <nav 
          ref={navRef}
          onScroll={checkScroll}
          className="flex flex-col gap-2 xl:gap-3 w-full px-2 overflow-y-auto overflow-x-hidden min-h-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40 transition-colors"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            // @ts-ignore
            const isActive = pathname === item.href && !item.isAction;
            
            const Content = (
              <>
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
                </div>
                
                <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                  {item.label}
                </span>
                
                {/* Badge */}
                {item.badge && (
                  <span className={`
                    absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a16]
                    ${item.badge === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}
                  `}></span>
                )}

                {/* Active Indicator (Left Bar) */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                )}
              </>
            );

            // @ts-ignore
            const commonClasses = `
              relative group flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition-all duration-300 shrink-0 w-full
              ${isActive 
                ? 'bg-white/10 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/10' 
                // @ts-ignore
                : item.highlight
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }
            `;

            // @ts-ignore
            if (item.isAction) {
              return (
                  <button 
                    key={item.label}
                    onClick={(e) => {
                        e.preventDefault();
                        if (item.label === 'แชท' && onChatClick) onChatClick();
                    }}
                    onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                    onMouseLeave={handleMouseLeave}
                    className={commonClasses}
                  >
                    {Content}
                  </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={(e) => handleMouseEnter(e, item.label)}
                onMouseLeave={handleMouseLeave}
                className={commonClasses}
              >
                {Content}
              </Link>
            );
          })}
        </nav>
        
        {/* Bottom Scroll Indicator */}
        <div 
          className={`absolute bottom-4 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a16] to-transparent z-10 pointer-events-none transition-opacity duration-300 flex justify-center items-end pb-1 ${canScrollDown ? 'opacity-100' : 'opacity-0'}`}
        >
          <ChevronDown className="w-4 h-4 text-white/50 animate-bounce" />
        </div>
      </aside>

      {/* Floating Tooltip (Outside Sidebar to avoid clipping) */}
      {hoveredItem && (
        <div 
          className="fixed z-[100] left-28 px-3 py-1.5 bg-gray-900/90 backdrop-blur border border-white/10 text-white text-xs rounded-lg shadow-xl animate-in fade-in zoom-in-95 duration-150"
          style={{ top: hoveredItem.top, transform: 'translateY(-50%)' }}
        >
          {hoveredItem.label}
          {/* Little arrow pointing left */}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900/90 border-l border-b border-white/10 transform rotate-45"></div>
        </div>
      )}
    </>
  );
}
