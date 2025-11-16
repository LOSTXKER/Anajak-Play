'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, ShoppingBag, MessageSquare, User } from 'lucide-react';
import { useParty } from '@/lib/PartyContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { activeParty } = useParty();

  const navItems = [
    { icon: Home, label: 'หน้าแรก', href: '/' },
    { icon: Users, label: 'ปาร์ตี้', href: '/party', hasParty: activeParty },
    { icon: ShoppingBag, label: 'ตลาด', href: '/market' },
    { icon: MessageSquare, label: 'แชท', href: '/messages' },
    { icon: User, label: 'โปรไฟล์', href: '/profile' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a16]/95 backdrop-blur-md border-t border-white/10 z-50">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex flex-col items-center justify-center gap-1 transition-colors
                ${isActive ? 'text-purple-400' : 'text-gray-400 active:text-white'}
              `}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.hasParty && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-b-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
