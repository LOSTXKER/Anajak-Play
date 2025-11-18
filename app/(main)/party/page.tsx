'use client';

import { useRouter } from 'next/navigation';
import { useParty } from '@/lib/PartyContext';
import PartyRoom from '@/components/PartyRoom';

export default function PartyPage() {
  const router = useRouter();
  const { activeParty, leaveParty } = useParty();

  const handleLeaveParty = () => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าจะออกจากปาร์ตี้?")) {
      leaveParty();
      router.push('/');
    }
  };

  if (!activeParty) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center text-white">
        <h2 className="text-2xl font-bold mb-4">ยังไม่ได้เข้าร่วมปาร์ตี้</h2>
        <p className="text-gray-400 mb-6">กลับไปหน้าแรกเพื่อค้นหาและเข้าร่วมปาร์ตี้</p>
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl font-bold transition text-white"
        >
          กลับหน้าแรก
        </button>
      </div>
    );
  }

  return (
    <PartyRoom party={activeParty} onLeave={handleLeaveParty} />
  );
}
