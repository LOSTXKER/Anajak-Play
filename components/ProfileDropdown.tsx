'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Settings, Wallet, LogOut, Shield, Trophy, ChevronRight } from 'lucide-react';
import { userProfileData } from '@/lib/mockData';

interface ProfileDropdownProps {
  onOpenProfile?: () => void;
}

export default function ProfileDropdown({ onOpenProfile }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { icon: User, label: 'ดูโปรไฟล์', href: '/profile', color: 'text-purple-400' },
    { icon: Wallet, label: 'กระเป๋าเงิน', href: '/wallet', color: 'text-green-400' },
    { icon: Trophy, label: 'ความสำเร็จ', href: '/achievements', color: 'text-yellow-400' },
    { icon: Settings, label: 'ตั้งค่า', href: '/settings', color: 'text-gray-400' },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 p-[2px]">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfileData.avatar}`}
            alt="User"
            className="rounded-full bg-black w-full h-full"
          />
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-xs font-bold text-white">{userProfileData.name}</span>
          <div className="flex items-center gap-1">
            <Wallet className="w-3 h-3 text-green-400" />
            <span className="text-[10px] text-gray-300">฿{userProfileData.wallet.toLocaleString()}</span>
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 p-[2px]">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfileData.avatar}`}
                  alt="User"
                  className="rounded-full bg-black w-full h-full"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white">{userProfileData.name}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Shield className="w-3 h-3 text-yellow-400" />
                  <span>{userProfileData.reputation} ชื่อเสียง</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => {
                    if (item.label === 'ดูโปรไฟล์') {
                      onOpenProfile?.();
                    }
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white font-medium">
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </div>

          {/* Wallet Section */}
          <div className="px-4 py-3 bg-green-500/10 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">กระเป๋าเงิน</span>
              <Link
                href="/wallet"
                className="text-xs text-green-400 hover:text-green-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                เติมเงิน
              </Link>
            </div>
            <div className="text-2xl font-bold text-white">
              ฿{userProfileData.wallet.toLocaleString()}
            </div>
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-white/10">
            <button
              onClick={() => {
                setIsOpen(false);
                // Add logout logic here
                console.log('Logout clicked');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors rounded-lg group"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
