/**
 * HomeSidebar Component
 * Sidebar แสดงข้อมูลเสริม (Reputation, Market, Friends, Communities)
 */

import { Users, Zap, Plus, Hash, Crown, Gamepad2, Flame, ShoppingBag, Gift, Coins, Ticket } from 'lucide-react';
import Link from 'next/link';
import { UserProgressCard } from './UserProgressCard';
import { gameConfig } from '@/lib/data/mock-data';

export function HomeSidebar() {
  return (
    <div className="hidden lg:block w-80 shrink-0 space-y-6 pb-20">
      {/* User Progress (Updated V5) */}
      <UserProgressCard compact />

      {/* Quick Shortcuts (Updated: Actions not in Main Nav) */}
      <div className="bg-[#0f0f1a] border border-white/5 rounded-2xl p-5">
         <h4 className="font-bold text-white mb-4">บริการอื่นๆ (Services)</h4>
         <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-white/5 hover:bg-yellow-500/20 border border-white/5 hover:border-yellow-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group text-center">
               <Zap size={24} className="text-yellow-400 group-hover:scale-110 transition-transform" />
               <span className="text-xs font-bold text-gray-300 group-hover:text-white">เติมเกม</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group text-center">
               <Gift size={24} className="text-purple-400 group-hover:scale-110 transition-transform" />
               <span className="text-xs font-bold text-gray-300 group-hover:text-white">รางวัลรายวัน</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-green-500/20 border border-white/5 hover:border-green-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group text-center">
               <Coins size={24} className="text-green-400 group-hover:scale-110 transition-transform" />
               <span className="text-xs font-bold text-gray-300 group-hover:text-white">กระเป๋า</span>
            </button>
            <button className="p-3 bg-white/5 hover:bg-pink-500/20 border border-white/5 hover:border-pink-500/50 rounded-xl flex flex-col items-center gap-2 transition-all group text-center">
               <Ticket size={24} className="text-pink-400 group-hover:scale-110 transition-transform" />
               <span className="text-xs font-bold text-gray-300 group-hover:text-white">แลกโค้ด</span>
            </button>
         </div>
      </div>

      {/* Your Communities (New V5) */}
      <div className="bg-[#0f0f1a] rounded-2xl p-5 border border-white/5">
         <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Crown size={16} className="text-yellow-500" /> Community
         </h4>
         <div className="space-y-2">
            <Link href="/community/rov" className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group border border-transparent hover:border-white/10">
               <img src={gameConfig.rov.icon} className="w-8 h-8 rounded-lg object-cover" alt="RoV" />
               <div className="flex-1">
                  <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">RoV Thailand</div>
                  <div className="text-[10px] text-gray-500">12k Members</div>
               </div>
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </Link>
            <Link href="/community/valorant" className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group border border-transparent hover:border-white/10">
               <img src={gameConfig.valorant.icon} className="w-8 h-8 rounded-lg object-cover" alt="Valorant" />
               <div className="flex-1">
                  <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Valorant TH</div>
                  <div className="text-[10px] text-gray-500">8k Members</div>
               </div>
            </Link>
            <button className="w-full py-2 mt-2 text-xs font-bold text-gray-400 hover:text-white border border-dashed border-white/10 rounded-xl hover:bg-white/5 flex items-center justify-center gap-2 transition-all">
               <Plus size={14} /> Join New Community
            </button>
         </div>
      </div>

      {/* Marketplace Teaser */}
      <div className="bg-[#0f0f1a] rounded-2xl p-5 border border-white/5 opacity-75 hover:opacity-100 transition-opacity">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-white">Anajak Market</h4>
          <Link href="/marketplace" className="text-xs text-cyan-400 hover:underline">
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
