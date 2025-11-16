'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Shield, Search, Swords, Zap, Gift, User, Filter, ChevronDown } from 'lucide-react';
import { marketplaceListings } from '@/lib/mockData';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Image from 'next/image';

const categories = [
  { id: 'hire', name: 'Hire to Play (จ้างเล่น)', icon: <Swords size={18}/>, color: 'from-blue-500 to-cyan-500' },
  { id: 'coach', name: 'Coaching (โค้ชเกม)', icon: <Zap size={18}/>, color: 'from-yellow-500 to-orange-500' },
  { id: 'item', name: 'In-Game Items (ไอเทม)', icon: <Gift size={18}/>, color: 'from-purple-500 to-pink-500' },
  { id: 'id', name: 'Account Trading (ซื้อขายไอดี)', icon: <User size={18}/>, color: 'from-green-500 to-emerald-500' },
];

const gameFilters = [
  { id: 'all', name: 'เกมทั้งหมด', icon: '🎮' },
  { id: 'rov', name: 'RoV', icon: '⚔️' },
  { id: 'valo', name: 'Valorant', icon: '🔫' },
  { id: 'genshin', name: 'Genshin', icon: '✨' },
];

export default function MarketPage() {
  const [activeCategory, setActiveCategory] = useState('hire');
  const [activeGame, setActiveGame] = useState('all');
  const [isLoading] = useState(false);

  // Filter Logic
  const filteredListings = marketplaceListings.filter(item => {
    const catMatch = activeCategory === 'all' || item.category === activeCategory;
    const gameMatch = activeGame === 'all' || (
      (activeGame === 'rov' && item.game === 'RoV') ||
      (activeGame === 'valo' && item.game === 'Valorant') ||
      (activeGame === 'genshin' && item.game === 'Genshin')
    );
    return catMatch && gameMatch;
  });

  return (
    <DashboardLayout enableChat enableNotifications={false} contentClassName="mt-16">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-8 border border-white/10 bg-[#13132b]">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=2070" 
            alt="Banner" 
            width={2070}
            height={400}
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
          />
          
          <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold mb-4">
                <Shield size={14} /> ระบบ Escrow คุ้มครอง (ระบบกลางกันโกง 100%)
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                ตลาดซื้อขาย <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">ที่ปลอดภัยที่สุด</span><br/>
                สำหรับเกมเมอร์ไทย
              </h2>
              <p className="text-gray-300 max-w-lg mb-6">
                แหล่งรวมบริการรับจ้างเล่น, โค้ชสอนเกมระดับ Pro, และไอเทมหายาก การันตีได้รับของชัวร์ เงินไม่หาย ด้วยระบบ Anajak Escrow
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition">
                  เริ่มขายสินค้า
                </button>
                <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/10 hover:bg-white/20 transition">
                  วิธีการใช้งาน
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative p-4 rounded-2xl border transition-all duration-300 group overflow-hidden text-left ${
                activeCategory === cat.id 
                  ? `bg-gradient-to-br ${cat.color} border-transparent shadow-lg` 
                  : 'bg-[#13132b] border-white/10 hover:border-white/30 hover:bg-[#1a1a35]'
              }`}
            >
              <div className={`mb-3 ${activeCategory === cat.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                {cat.icon}
              </div>
              <h3 className={`font-bold ${activeCategory === cat.id ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                {cat.name}
              </h3>
            </button>
          ))}
        </div>

        <div className="bg-[#0f0f1a] rounded-3xl p-6 md:p-8 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              รายการแนะนำ
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {gameFilters.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGame(g.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    activeGame === g.id 
                      ? 'bg-white text-black' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{g.icon}</span>
                  {g.name}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#13132b] border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-[#1a1a35] transition">
                <Filter size={16} /> ตัวกรอง
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#13132b] border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-[#1a1a35] transition">
                ล่าสุด <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Listing Grid */}
          {isLoading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-[#13132b] border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-40 bg-white/10"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-white/10 rounded w-20"></div>
                    <div className="h-5 bg-white/10 rounded w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded w-full"></div>
                    <div className="h-8 bg-white/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map(item => (
                <div 
                  key={item.id}
                  className="group bg-[#13132b] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full shadow-lg"
                >
                  {/* Image */}
                  <div className="h-40 w-full relative overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      width={400}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10 uppercase tracking-wider">
                      {item.game}
                    </div>
                    {item.sellerVerified && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full shadow-lg" title="ผู้ขายได้รับการยืนยัน">
                        <Shield size={12} fill="currentColor" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        item.category === 'hire' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        item.category === 'coach' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        item.category === 'id' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}>
                        {item.category === 'hire' ? 'จ้างเล่น' : item.category === 'coach' ? 'โค้ช' : item.category === 'id' ? 'บัญชี' : 'ไอเทม'}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.seller}`} 
                          alt="Seller"
                        />
                      </div>
                      <span className="text-xs text-gray-400 truncate">{item.seller}</span>
                      <div className="flex items-center gap-0.5 text-yellow-400 text-[10px] font-bold">
                        <Star size={10} fill="currentColor" /> {item.sellerRep}
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-lg font-bold text-white">฿{item.price.toLocaleString()}</div>
                        <div className="text-[10px] text-gray-500">{item.unit}</div>
                      </div>
                      <button className="p-2 bg-white/10 hover:bg-purple-600 text-white rounded-lg transition-colors">
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl bg-[#13132b]">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-500" size={40}/>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">ไม่พบรายการในหมวดหมู่นี้</h3>
              <p className="text-gray-400 mb-4">ลองเปลี่ยนหมวดหมู่หรือเกมที่ต้องการดูสิ</p>
              <button 
                onClick={() => { setActiveCategory('hire'); setActiveGame('all'); }}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition"
              >
                ดูทั้งหมด
              </button>
            </div>
          )}
        </div>
      {/* Footer */}
      <footer className="mt-12 border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p>© 2025 Anajak Play สงวนลิขสิทธิ์</p>
        <p className="mt-2">ชำระเงินปลอดภัยด้วย Anajak Escrow System</p>
      </footer>
    </DashboardLayout>
  );
}
