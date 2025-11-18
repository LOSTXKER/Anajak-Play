/**
 * PartiesGrid Component
 * แสดง Grid ของ Party Cards
 */

import { Plus, Users } from 'lucide-react';
import LobbyCard from '../LobbyCard';
import { Party } from '@/lib/types/index';

interface PartiesGridProps {
  parties: Party[];
  isLoading: boolean;
  searchTerm?: string;
  onJoinClick: (party: Party) => void;
  onCreateParty: () => void;
}

export function PartiesGrid({ 
  parties, 
  isLoading, 
  searchTerm, 
  onJoinClick, 
  onCreateParty 
}: PartiesGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[#13132b] rounded-2xl border border-white/10 p-5 animate-pulse">
            <div className="h-5 bg-white/10 rounded w-3/4 mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-white/10 rounded"></div>
              <div className="h-6 w-20 bg-white/10 rounded"></div>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="h-12 bg-white/10 rounded"></div>
              ))}
            </div>
            <div className="h-10 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (parties.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">ไม่มีห้องที่เปิดรับ</h3>
        <p className="text-gray-400 mb-6 max-w-md">
          ไม่พบห้องที่ตรงกับ {searchTerm ? `คำค้น ${searchTerm}` : 'ตัวกรองนี้'}
          <br />
          ลองปรับตัวกรอง หรือตั้งห้องใหม่ได้เลย
        </p>
        <button
          onClick={onCreateParty}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-bold hover:opacity-90 transition flex items-center gap-2"
        >
          <Plus size={20} /> สร้างปาร์ตี้ใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      {parties.map((party) => (
        <LobbyCard key={party.id} party={party} onJoin={onJoinClick} />
      ))}

      {/* Mock Loading/More Card */}
      <div className="border-2 border-dashed border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-gray-500 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer min-h-[250px]">
        <Plus className="w-8 h-8 mb-2 opacity-50" />
        <span className="font-semibold">ดูห้องเพิ่มเติม...</span>
      </div>
    </div>
  );
}
