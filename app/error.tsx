'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-[#05050a] text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto border border-red-500/30">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">เกิดข้อผิดพลาด</h2>
        <p className="text-gray-400 mb-6">
          ขออภัย เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-lg font-bold transition-all"
          >
            ลองใหม่อีกครั้ง
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-all"
          >
            กลับหน้าแรก
          </button>
        </div>
      </div>
    </div>
  );
}
