'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Settings, LogOut, ShoppingBag, MessageCircle, Flame } from 'lucide-react';
import { useParty } from '@/lib/PartyContext';

interface SidebarProps {
  onChatClick?: () => void;
}

export default function Sidebar({ onChatClick }: SidebarProps) {
  const pathname = usePathname();
  const { activeParty } = useParty();

  const navItems = [
    { icon: Home, label: 'หน้าแรก', href: '/', badge: null },
    { icon: Users, label: 'ปาร์ตี้', href: '/lfg', badge: activeParty ? 'active' : null, highlight: !!activeParty },
    { icon: Flame, label: 'ปัดหาเพื่อน', href: '/tinder', badge: 'new' },
    { icon: ShoppingBag, label: 'ตลาด', href: '/marketplace', badge: null },
    { icon: MessageCircle, label: 'แชท', href: '#', isAction: true, badge: '3' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 h-auto min-h-[500px] w-20 z-50 flex-col justify-center gap-8 items-center py-8 bg-[#0a0a16]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 transition-all hover:border-white/20">
      
      {/* Center: Navigation */}
      <nav className="flex flex-col gap-3 w-full px-2">
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

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900/90 backdrop-blur border border-white/10 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap shadow-xl z-50">
                {item.label}
              </div>
            </>
          );

          // @ts-ignore
          const commonClasses = `
            relative group flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition-all duration-300
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
              className={commonClasses}
            >
              {Content}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Profile & Settings */}
      <div className="flex flex-col gap-4 items-center w-full px-2">
        <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
          <Settings className="w-5 h-5" />
        </button>
        
        <Link href="/profile" className="relative group">
          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-pink-500 hover:scale-105 transition-transform shadow-lg">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" 
              alt="Profile"
              className="rounded-full bg-black w-full h-full object-cover border-2 border-black"
            />
          </div>
          {/* Status Dot */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a16] rounded-full"></div>
        </Link>
      </div>
    </aside>
  );
}
