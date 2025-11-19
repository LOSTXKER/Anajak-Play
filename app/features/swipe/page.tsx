import LandingNavbar from '@/components/landing/LandingNavbar';
import { Heart, X, MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Swipe Friend - Anajak Play',
  description: 'ปัดขวาหาเพื่อนเล่นเกม! ฟีเจอร์ใหม่สุดล้ำสำหรับหาเพื่อนรู้ใจ',
};

export default function SwipeFeaturePage() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <LandingNavbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[70%] h-[80%] bg-pink-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-bold">
                  <Heart className="w-4 h-4" />
                  New Feature
               </div>
               <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  ปัดขวา... <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">หาเพื่อนรู้ใจ</span>
               </h1>
               <p className="text-xl text-gray-400 max-w-xl">
                  เบื่อไหมที่ต้องเล่นเกมคนเดียว? ลองใช้ฟีเจอร์ Swipe เพื่อหาเพื่อนเล่นเกมที่มีสไตล์ตรงกัน 
                  ชอบก็ปัดขวา ไม่ใช่ก็ปัดซ้าย ง่ายแค่นี้!
               </p>
               <div className="flex gap-4">
                  <Link href="/login" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-lg shadow-pink-500/25 hover:shadow-pink-500/50 transition-transform hover:scale-105 flex items-center gap-2">
                     <Sparkles className="w-5 h-5" /> เริ่มปัดเลย
                  </Link>
               </div>
            </div>
            
            {/* Phone Mockup */}
            <div className="flex-1 relative flex justify-center">
               <div className="w-[300px] h-[600px] bg-black rounded-[3rem] border-8 border-[#1a1a2e] shadow-2xl overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a2e] rounded-b-2xl z-20"></div>
                  
                  {/* App Content */}
                  <div className="absolute inset-0 bg-[#0f0f1a] pt-10 flex flex-col">
                      <div className="flex-1 p-4 relative">
                          {/* Card */}
                          <div className="absolute inset-4 bottom-24 rounded-3xl overflow-hidden shadow-lg bg-gray-800">
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                              <img src="/games/valorant.png" className="w-full h-full object-cover opacity-60" alt="Profile" />
                              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                                  <h3 className="text-2xl font-bold text-white">JettMain_99, 21</h3>
                                  <p className="text-gray-300 text-sm">Valorant • Ascendant</p>
                                  <div className="flex gap-2 mt-2">
                                      <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">Duelist</span>
                                      <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">Mic ON</span>
                                  </div>
                              </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="absolute bottom-4 left-0 w-full px-8 flex justify-between items-center z-30">
                              <button className="w-14 h-14 bg-[#1a1a2e] rounded-full flex items-center justify-center text-red-500 border border-red-500/30 shadow-lg hover:scale-110 transition-transform">
                                  <X className="w-8 h-8" />
                              </button>
                              <button className="w-14 h-14 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-500/30 hover:scale-110 transition-transform">
                                  <Heart className="w-8 h-8 fill-white" />
                              </button>
                          </div>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#0a0a16]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold">วิธีการใช้งาน</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               <div className="text-center p-6 rounded-3xl border border-white/5 bg-[#13132b]/30">
                   <div className="w-12 h-12 rounded-full bg-pink-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">1</div>
                   <h3 className="font-bold mb-2">สร้างโปรไฟล์</h3>
                   <p className="text-gray-400">เลือกเกมที่คุณเล่น และใส่ข้อมูลสไตล์การเล่นของคุณ</p>
               </div>
               <div className="text-center p-6 rounded-3xl border border-white/5 bg-[#13132b]/30">
                   <div className="w-12 h-12 rounded-full bg-pink-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">2</div>
                   <h3 className="font-bold mb-2">ปัดหาเพื่อน</h3>
                   <p className="text-gray-400">ระบบจะแนะนำคนที่เล่นเกมเดียวกัน และมีเคมีตรงกันให้คุณ</p>
               </div>
               <div className="text-center p-6 rounded-3xl border border-white/5 bg-[#13132b]/30">
                   <div className="w-12 h-12 rounded-full bg-pink-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">3</div>
                   <h3 className="font-bold mb-2">แมทช์ & แชท</h3>
                   <p className="text-gray-400">เมื่อใจตรงกัน ก็เริ่มแชทและชวนเล่นเกมได้เลย!</p>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}

