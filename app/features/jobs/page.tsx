import LandingNavbar from '@/components/landing/LandingNavbar';
import { Briefcase, TrendingUp, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jobs & Boosting - Anajak Play',
  description: 'สร้างรายได้จากการเล่นเกม รับจ้างเล่น สอนเล่น และ Boosting',
};

export default function JobsFeaturePage() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <LandingNavbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-green-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold">
                  <Briefcase className="w-4 h-4" />
                  Pro Player Hub
               </div>
               <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  เล่นเกมเก่ง <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">เปลี่ยนเป็นเงิน</span>
               </h1>
               <p className="text-xl text-gray-400 max-w-xl">
                  พื้นที่สำหรับ Pro Player ในการรับงานสอนเล่น (Coaching) หรือรับจ้างเล่น (Boosting) สร้างรายได้จากฝีมือของคุณ
               </p>
               <div className="flex gap-4">
                  <Link href="/login" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-transform hover:scale-105 flex items-center gap-2">
                     สมัครเป็น Pro <ArrowRight className="w-5 h-5" />
                  </Link>
               </div>
            </div>
            
            {/* Visual Representation */}
            <div className="flex-1 relative">
               <div className="bg-[#13132b]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden border-2 border-green-500">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pro" alt="Pro" />
                      </div>
                      <div>
                          <h3 className="font-bold text-lg">Pro_Gamer</h3>
                          <div className="flex items-center gap-1 text-yellow-400 text-sm">
                              <Star size={14} fill="currentColor" /> 5.0 (120 Jobs)
                          </div>
                      </div>
                  </div>
                  <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-[#0a0a16] border border-white/5 flex justify-between items-center">
                          <span>Coaching RoV (1 hr)</span>
                          <span className="text-green-400 font-bold">฿300</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0a0a16] border border-white/5 flex justify-between items-center">
                          <span>Rank Boost (Diamond -&gt; Con)</span>
                          <span className="text-green-400 font-bold">฿1,500</span>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

