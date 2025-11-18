/**
 * HomeSidebar Component
 * Sidebar แสดงข้อมูลเสริม (Reputation, Market, Friends)
 */

import { Users, Zap, Plus } from 'lucide-react';
import Link from 'next/link';
import { UserProgressCard } from './UserProgressCard';

export function HomeSidebar() {
  return (
    <div className="hidden lg:block w-80 shrink-0 space-y-6">
      {/* User Progress (Updated V5) - Replaces old Reputation Teaser */}
      <UserProgressCard compact />

      {/* Marketplace Teaser */}
      <div className="bg-[#0f0f1a] rounded-2xl p-5 border border-white/5 opacity-75 hover:opacity-100 transition-opacity">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-white">Anajak Market</h4>
          <Link href="/market" className="text-xs text-cyan-400 hover:underline">
            ดูทั้งหมด
          </Link>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition">
            <div className="w-8 h-8 bg-blue-500/20 rounded flex items-center justify-center text-blue-400">
              <Users size={16} />
            </div>
            <div className="text-sm text-gray-300">Hire to Play (จ้างเล่น)</div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer transition">
            <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center text-green-400">
              <Zap size={16} />
            </div>
            <div className="text-sm text-gray-300">Coaching (จ้างโค้ช)</div>
          </div>
        </div>
      </div>

      {/* Online Friends */}
      <div className="bg-[#0f0f1a] rounded-2xl p-5 border border-white/5">
        <h4 className="font-bold text-white mb-4 flex justify-between items-center">
          เพื่อนที่ออนไลน์
          <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">4</span>
        </h4>
        <ul className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 32}`}
                    alt="friend"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0f0f1a] rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-300 group-hover:text-white">Gamer_{i}99</div>
                <div className="text-[10px] text-gray-500">กำลังเล่น RoV</div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1.5 bg-white/10 rounded hover:bg-purple-500 transition-all">
                <Plus size={12} className="text-white" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
