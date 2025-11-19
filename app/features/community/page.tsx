import LandingNavbar from '@/components/landing/LandingNavbar';
import { Users, MessageCircle, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community - Anajak Play',
  description: 'ชุมชนเกมเมอร์ไทย พูดคุย แลกเปลี่ยนเทคนิค และติดตามข่าวสารเกม',
};

export default function CommunityFeaturePage() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <LandingNavbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-yellow-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold mb-8">
               <Users className="w-4 h-4" />
               Gaming Communities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
               บ้านหลังใหญ่ของ <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">เกมเมอร์ไทย</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
               รวมกลุ่มคนรักเกมเดียวกันไว้ด้วยกัน ไม่ว่าคุณจะเล่น RoV, Valorant หรือ Minecraft 
               เข้ามาพูดคุย แชร์เทคนิค และหาเพื่อนใหม่ได้ที่นี่
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
               {['RoV Thailand', 'Valorant TH', 'Genshin Impact', 'Minecraft'].map((game, i) => (
                  <div key={game} className="bg-[#13132b]/50 p-6 rounded-2xl border border-white/10 flex flex-col items-center gap-3 hover:scale-105 transition-transform">
                     <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                        i === 0 ? 'from-blue-900 to-blue-700' : 
                        i === 1 ? 'from-red-900 to-red-700' : 
                        i === 2 ? 'from-purple-900 to-pink-700' : 'from-green-900 to-green-700'
                     } flex items-center justify-center text-2xl font-bold shadow-lg`}>
                        {game.charAt(0)}
                     </div>
                     <span className="font-bold">{game}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#0a0a16]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 mb-6">
                     <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Discussion Boards</h3>
                  <p className="text-gray-400">ตั้งกระทู้ถาม-ตอบ แลกเปลี่ยนข้อมูล หรือรีวิวไอเทมใหม่ๆ</p>
               </div>
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 mb-6">
                     <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Clan Recruiting</h3>
                  <p className="text-gray-400">พื้นที่สำหรับหากิลด์อยู่ หรือประกาศรับสมาชิกเข้าแคลน</p>
               </div>
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400 mb-6">
                     <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Events & Tournaments</h3>
                  <p className="text-gray-400">ติดตามข่าวสารกิจกรรม และทัวร์นาเมนต์การแข่งขันต่างๆ</p>
               </div>
            </div>

            <div className="mt-20 text-center">
               <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-[#13132b] border border-white/10 hover:bg-white/10 rounded-full font-bold transition-colors">
                  เข้าสู่ระบบเพื่อร่วมพูดคุย <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}

