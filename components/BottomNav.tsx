'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, User, ShoppingBag, MessageCircle, HeartHandshake, Crown, Zap } from 'lucide-react';
import { useParty } from '@/lib/PartyContext';

interface BottomNavProps {
  onChatClick?: () => void;
}

export default function BottomNav({ onChatClick }: BottomNavProps) {
  const pathname = usePathname();
  const { activeParty } = useParty();

  const navItems = [
    { icon: Home, label: 'หน้าแรก', href: '/' },
    { icon: Users, label: 'ปาร์ตี้', href: '/lfg', hasParty: activeParty },
    { icon: Crown, label: 'คอมมูนิตี้', href: '/community' },
    { icon: HeartHandshake, label: 'ปัดหาเพื่อน', href: '/tinder' },
    { icon: ShoppingBag, label: 'ตลาด', href: '/marketplace' },
    { icon: Zap, label: 'เติมเกม', href: '/topup' },
    { icon: MessageCircle, label: 'แชท', href: '#', isAction: true },
    { icon: User, label: 'โปรไฟล์', href: '/profile' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a16]/95 backdrop-blur-md border-t border-white/10 z-50">
      <div className="flex h-16 overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          // @ts-ignore
          const isActive = pathname === item.href && !item.isAction;
          
          const Content = (
            <>
              <div className="relative">
                <Icon className="w-6 h-6" />
                {/* @ts-ignore */}
                {item.hasParty && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-b-full"></div>
              )}
            </>
          );

          const commonClasses = `
            relative flex flex-col items-center justify-center gap-1 transition-colors flex-1 min-w-[70px]
            ${isActive ? 'text-purple-400' : 'text-gray-400 active:text-white'}
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
      </div>
    </nav>
  );
}
