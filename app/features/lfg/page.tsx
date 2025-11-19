import LandingNavbar from '@/components/landing/LandingNavbar';
import { Users, Shield, Swords, Target, Mic, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ระบบหาปาร์ตี้ (LFG) - Anajak Play',
  description: 'หาเพื่อนเล่นเกม RoV, Valorant, PUBG ได้ง่ายๆ คัดกรองตาม Rank และ Role',
};

export default function LFGFeaturePage() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <LandingNavbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold">
                  <Users className="w-4 h-4" />
                  Looking For Group (LFG)
               </div>
               <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  หาตี้ที่ <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ใช่</span> <br/>
                  เล่นเกมได้ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">สนุกกว่าเดิม</span>
               </h1>
               <p className="text-xl text-gray-400 max-w-xl">
                  ไม่ต้องแบกคนเดียว หรือเจอทีม Toxic อีกต่อไป ระบบหาปาร์ตี้ของเราช่วยให้คุณเจอเพื่อนร่วมทีมที่เคมีตรงกัน ฝีมือใกล้เคียงกัน
               </p>
               <div className="flex gap-4">
                  <Link href="/login" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-transform hover:scale-105 flex items-center gap-2">
                     หาตี้เลย <ArrowRight className="w-5 h-5" />
                  </Link>
               </div>
            </div>
            
            {/* Visual Representation */}
            <div className="flex-1 relative">
               <div className="bg-[#13132b]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-md transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="font-bold text-lg flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Active Lobbies
                     </h3>
                     <span className="text-xs text-gray-400">1,204 Parties Online</span>
                  </div>
                  
                  <div className="space-y-4">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-[#0a0a16] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                              i === 1 ? 'bg-red-500/20 text-red-500' : 
                              i === 2 ? 'bg-blue-500/20 text-blue-500' : 'bg-yellow-500/20 text-yellow-500'
                           }`}>
                              {i === 1 ? 'V' : i === 2 ? 'R' : 'L'}
                           </div>
                           <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                 <span className="font-bold text-sm">{i === 1 ? 'Valorant Ranked' : i === 2 ? 'RoV 5-Man' : 'LoL Flex'}</span>
                                 <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">3/5</span>
                              </div>
                              <div className="text-xs text-gray-500">Need: Controller, Diamond+</div>
                           </div>
                           <button className="px-3 py-1.5 bg-purple-600 rounded-lg text-xs font-bold hover:bg-purple-500">Join</button>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#0a0a16]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-8 rounded-3xl bg-[#13132b]/30 border border-white/5 hover:bg-[#13132b]/50 transition-colors">
                  <Target className="w-10 h-10 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Role Selection</h3>
                  <p className="text-gray-400">ระบุตำแหน่งที่คุณเล่นถนัด เพื่อให้ได้ทีมที่สมดุล ไม่แย่งเลนกัน</p>
               </div>
               <div className="p-8 rounded-3xl bg-[#13132b]/30 border border-white/5 hover:bg-[#13132b]/50 transition-colors">
                  <Swords className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Skill Matching</h3>
                  <p className="text-gray-400">ระบบคัดกรองตาม Rank ปัจจุบัน เพื่อให้เจอเพื่อนร่วมทีมที่ฝีมือทันกัน</p>
               </div>
               <div className="p-8 rounded-3xl bg-[#13132b]/30 border border-white/5 hover:bg-[#13132b]/50 transition-colors">
                  <Mic className="w-10 h-10 text-pink-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Voice Preference</h3>
                  <p className="text-gray-400">เลือกได้ว่าอยากเล่นแบบเปิดไมค์คุยกัน หรือขอเล่นเงียบๆ เน้น Ping</p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
         <h2 className="text-3xl font-bold mb-8">อย่ารอช้า! ปาร์ตี้ดีๆ รอคุณอยู่</h2>
         <Link href="/login" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-bold text-xl shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all">
            เริ่มหาปาร์ตี้
         </Link>
      </section>

    </div>
  );
}

