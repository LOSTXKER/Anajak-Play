'use client';

import Link from 'next/link';
import { Wallet, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { userProfileData } from '@/lib/data/legacy-data';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';

interface ProfileDropdownProps {
  onOpenProfile?: () => void;
}

export default function ProfileDropdown({ onOpenProfile }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border transition-all duration-200
          ${isOpen 
            ? 'bg-white/10 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          }
        `}
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 p-[2px]">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfileData.avatar}`}
              alt="User"
              className="rounded-full bg-black w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0a0a16] rounded-full"></div>
        </div>
        
        <div className="hidden md:flex flex-col items-start">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white leading-none">{userProfileData.name}</span>
            <ChevronDown size={12} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Wallet className="w-3 h-3 text-green-400" />
            <span className="text-xs font-medium text-green-400">฿{userProfileData.wallet.toLocaleString()}</span>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-[#13132b] border border-white/10 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
          
          {/* Header Mobile Only */}
          <div className="md:hidden p-4 border-b border-white/5 bg-white/5">
             <div className="font-bold text-white mb-1">{userProfileData.name}</div>
             <div className="flex items-center gap-2 text-green-400 text-sm">
                <Wallet size={14} />
                ฿{userProfileData.wallet.toLocaleString()}
             </div>
          </div>

          <div className="p-2 space-y-1">
            <Link 
              href="/profile" 
              onClick={() => {
                setIsOpen(false);
                onOpenProfile?.();
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <User size={16} className="text-purple-400" />
              </div>
              โปรไฟล์ของฉัน
            </Link>
            
            <Link 
              href="/settings" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
            >
               <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Settings size={16} className="text-blue-400" />
              </div>
              ตั้งค่าบัญชี
            </Link>
          </div>

          <div className="h-[1px] bg-white/5 mx-2 my-1"></div>

          <div className="p-2">
            <button 
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors group"
            >
               <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                <LogOut size={16} className="text-red-500" />
              </div>
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
