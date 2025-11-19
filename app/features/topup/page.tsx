import LandingNavbar from '@/components/landing/LandingNavbar';
import { Zap, CreditCard, Shield, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Up - Anajak Play',
  description: 'เติมเกมราคาคุ้ม ปลอดภัย รวดเร็ว รองรับทุกเกมดัง',
};

export default function TopUpFeaturePage() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <LandingNavbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-yellow-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold">
                  <Zap className="w-4 h-4" />
                  Instant Top Up
               </div>
               <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  เติมเกมคุ้ม <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">เข้าทันที</span>
               </h1>
               <p className="text-xl text-gray-400 max-w-xl">
                  บริการเติมเกมมือถือและ PC ราคาถูกกว่าเติมเอง ปลอดภัย 100% ด้วยระบบอัตโนมัติ รับประกันเงินไม่หาย
               </p>
               <div className="flex gap-4">
                  <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full hover:shadow-lg hover:shadow-yellow-500/20 transition-transform hover:scale-105 flex items-center gap-2">
                     เติมเงินเลย <ArrowRight className="w-5 h-5" />
                  </Link>
               </div>
            </div>
            
            {/* Visual Representation */}
            <div className="flex-1 relative">
               <div className="bg-[#13132b]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                     {['RoV', 'Valorant', 'Genshin', 'Free Fire'].map((game) => (
                        <div key={game} className="bg-[#0a0a16] p-4 rounded-xl border border-white/5 text-center hover:border-yellow-500/50 transition-colors cursor-pointer">
                           <div className="w-12 h-12 mx-auto bg-white/10 rounded-full mb-2"></div>
                           <div className="font-bold text-sm">{game}</div>
                           <div className="text-xs text-green-400 mt-1">ลด 15%</div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Speed</span>
                          <span className="text-green-400 font-bold">Instant (1-3 mins)</span>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

