'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ShoppingBag, MessageSquare, User, Gamepad2, Volume2, VolumeX } from 'lucide-react';
import { useParty } from '@/lib/PartyContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { activeParty } = useParty();

  const navItems = [
    { icon: Home, label: 'หน้าแรก', href: '/', badge: null },
    { icon: Users, label: 'ปาร์ตี้', href: '/party', badge: activeParty ? 'active' : null, highlight: !!activeParty },
    { icon: ShoppingBag, label: 'ตลาด', href: '/market', badge: null },
    { icon: MessageSquare, label: 'แชท', href: '/messages', badge: '3' },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-20 bg-[#0a0a16] border-r border-white/10 flex-col items-center py-6 z-40">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:scale-110 transition-transform">
          <Gamepad2 className="text-white w-6 h-6" />
        </div>
      </Link>

      {/* Divider */}
      <div className="w-8 h-[2px] bg-white/10 mb-6"></div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-3 w-full px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative group flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl transition-all
                ${isActive 
                  ? 'bg-gradient-to-br from-purple-600/30 to-cyan-600/30 text-white border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : item.highlight
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 hover:border-green-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[9px] font-medium">{item.label}</span>
              
              {/* Badge */}
              {item.badge && (
                <span className={`
                  absolute top-1 right-1 rounded-full text-[8px] flex items-center justify-center font-bold
                  ${item.badge === 'active' 
                    ? 'w-2 h-2 bg-green-500 animate-pulse' 
                    : 'w-4 h-4 bg-red-500 text-white'
                  }
                `}>
                  {item.badge === 'active' ? '' : item.badge}
                </span>
              )}

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-r-full"></div>
              )}

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
                {item.badge === 'active' && activeParty && (
                  <div className="text-xs text-gray-400 mt-1">
                    {activeParty.title}
                  </div>
                )}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Active Party Indicator */}
      {activeParty && (
        <div className="w-full px-3 mb-4">
          <Link
            href="/party"
            className="flex flex-col items-center gap-2 p-3 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-xl border-2 border-purple-500/50 hover:border-purple-500 transition-all group relative overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative flex items-center justify-center w-full">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            
            <div className="relative text-center">
              <div className="text-[10px] text-gray-400 mb-1">ปาร์ตี้ที่เข้าร่วม</div>
              <div className="text-xs font-bold text-white truncate max-w-[60px]">
                {activeParty.title}
              </div>
              <div className="text-[9px] text-cyan-400 mt-1">
                {activeParty.requiredRoles.filter(r => r.status === 'filled').length}/{activeParty.requiredRoles.length} คน
              </div>
            </div>
            
            {/* Pulse ring */}
            <div className="absolute inset-0 border-2 border-purple-500 rounded-xl animate-ping opacity-20"></div>
          </Link>
        </div>
      )}

      {/* Bottom Divider */}
      <div className="w-8 h-[2px] bg-white/10 mb-4"></div>

      {/* User Profile */}
      <Link href="/profile" className="group relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 p-[2px] hover:scale-110 transition-transform">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" 
            alt="Profile"
            className="rounded-full bg-black w-full h-full"
          />
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
          โปรไฟล์
          <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </Link>
    </aside>
  );
}
