'use client';

import { Notification } from '@/lib/types';

interface NotificationDropdownProps {
  isOpen: boolean;
  notifications: Notification[];
  onClose: () => void;
}

export default function NotificationDropdown({ isOpen, notifications, onClose }: NotificationDropdownProps) {
   if (!isOpen) return null;

   return (
      <>
      <div className="fixed inset-0 z-[40]" onClick={onClose}></div>
      <div className="absolute top-16 right-4 md:right-20 w-80 bg-[#13132b] border border-white/10 rounded-2xl shadow-2xl z-[50] overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200">
         <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0f0f1a]">
            <h4 className="font-bold text-white">การแจ้งเตือน</h4>
            <button className="text-xs text-cyan-400 hover:underline">อ่านทั้งหมด</button>
         </div>
         <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
               <div className="p-8 text-center text-gray-500 text-sm">ไม่มีการแจ้งเตือนใหม่</div>
            ) : (
               notifications.map((noti) => (
                  <div key={noti.id} className={`p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer transition flex gap-3 ${!noti.read ? 'bg-purple-900/10' : ''}`}>
                     <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!noti.read ? 'bg-red-500' : 'bg-transparent'}`}></div>
                     <div>
                        <div className="text-sm text-gray-200 leading-snug">{noti.text}</div>
                        <div className="text-[10px] text-gray-500 mt-1">{noti.time}</div>
                     </div>
                  </div>
               ))
            )}
         </div>
         <div className="p-2 bg-[#0f0f1a] border-t border-white/10 text-center">
            <button className="text-xs text-gray-400 hover:text-white transition">ดูประวัติย้อนหลัง</button>
         </div>
      </div>
      </>
   )
}
