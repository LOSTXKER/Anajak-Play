'use client';

import { Gamepad2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen w-full bg-[#05050a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)] animate-pulse">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 animate-ping"></div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">กำลังโหลด...</h3>
        <p className="text-gray-400 text-sm">เตรียมความพร้อมสำหรับคุณ</p>
        
        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
