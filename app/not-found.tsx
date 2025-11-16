import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#05050a] text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">ไม่พบหน้าที่ค้นหา</h2>
        <p className="text-gray-400 mb-8">
          ขออภัย เราไม่พบหน้าที่คุณกำลังมองหา
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-lg font-bold transition-all"
          >
            <Home className="w-5 h-5" />
            กลับหน้าแรก
          </Link>
          <Link
            href="/market"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-all"
          >
            <Search className="w-5 h-5" />
            ดูตลาด
          </Link>
        </div>
      </div>
    </div>
  );
}
