import LandingNavbar from '@/components/landing/LandingNavbar';
import { ShoppingBag, Shield, Search, CreditCard, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketplace - Anajak Play',
  description: 'ตลาดซื้อขายไอดีเกม ไอเทม และบริการเกมที่ปลอดภัยที่สุดในไทย พร้อมระบบคนกลาง',
};

export default function MarketplaceFeaturePage() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <LandingNavbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
         <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
                  <ShoppingBag className="w-4 h-4" />
                  Secure Marketplace
               </div>
               <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  ซื้อขายปลอดภัย <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ไร้กังวล</span>
               </h1>
               <p className="text-xl text-gray-400 max-w-xl">
                  ตลาดซื้อขายสินค้าเกมที่ครบวงจรที่สุด ทั้งไอดี ไอเทม โค้ด และบริการจ้างเล่น (Boosting) มั่นใจได้ด้วยระบบยืนยันตัวตนและคนกลาง
               </p>
               <div className="flex gap-4">
                  <Link href="/login" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-transform hover:scale-105 flex items-center gap-2">
                     ดูสินค้า <ArrowRight className="w-5 h-5" />
                  </Link>
               </div>
            </div>
            
            {/* Visual Representation */}
            <div className="flex-1 relative">
               <div className="bg-[#13132b]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl border-t-4 border-t-blue-500">
                  <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                     <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                        <Shield className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="font-bold text-lg text-white">Anajak Escrow Secured</h3>
                        <p className="text-sm text-gray-400">เงินของคุณปลอดภัย จนกว่าจะได้รับสินค้า</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                        <p className="text-gray-300">ผู้ซื้อชำระเงินเข้าระบบกลาง</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                        <p className="text-gray-300">ผู้ขายส่งมอบสินค้า/บริการ</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                        <p className="text-gray-300">ผู้ซื้อกดยืนยันรับของ ระบบโอนเงินให้ผู้ขาย</p>
                     </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/5 text-center">
                     <div className="inline-flex items-center gap-2 text-green-400 font-bold">
                        <CheckCircle className="w-5 h-5" /> การันตีความปลอดภัย 100%
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#0a0a16]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold">มีอะไรขายบ้าง?</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {['Account Trading', 'In-Game Items', 'Boosting Services', 'Coaching'].map((item) => (
                  <div key={item} className="p-6 rounded-2xl bg-[#13132b]/30 border border-white/5 hover:border-blue-500/50 transition-all text-center group">
                     <div className="w-12 h-12 mx-auto bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                        <Search className="w-6 h-6" />
                     </div>
                     <h3 className="font-bold text-white">{item}</h3>
                  </div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}

