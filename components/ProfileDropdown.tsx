'use client';

import Link from 'next/link';
import { Wallet } from 'lucide-react';
import { userProfileData } from '@/lib/mockData';

interface ProfileDropdownProps {
  onOpenProfile?: () => void;
}

export default function ProfileDropdown({ onOpenProfile }: ProfileDropdownProps) {
  return (
    <Link 
      href="/profile"
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
    </Link>
  );
}
