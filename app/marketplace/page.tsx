'use client';

import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Shield, ShoppingBag, User, Swords, Gift, MonitorPlay, GraduationCap } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { PurchaseModal } from '@/components/marketplace/PurchaseModal';
import { mockMarketplaceListings } from '@/lib/data/mock-data';
import { MarketplaceListing } from '@/lib/types';

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter Panel Component
  const FilterPanel = () => (
    <div className="space-y-4">
        <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider font-bold">เกม</label>
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                    <input type="checkbox" className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-0" /> RoV
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                    <input type="checkbox" className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-0" /> Valorant
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                    <input type="checkbox" className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-0" /> Genshin Impact
                </label>
            </div>
        </div>

        <div className="h-[1px] bg-white/5"></div>

        <div>
            <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wider font-bold">ช่วงราคา</label>
            <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                <span className="text-gray-500">-</span>
                <input type="number" placeholder="Max" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
            </div>
        </div>
    </div>
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extended mock data for demo purposes
  const allListings = [
    ...mockMarketplaceListings,
    // Adding more mock items to fill the grid
    {
        ...mockMarketplaceListings[0],
        id: 'demo-3',
        title: 'รับจ้างลง Rank Valorant (Iron -> Ascendant)',
        type: 'hire-play',
        price: 150,
        priceType: 'per-game',
        images: ['/games/valorant.png'],
        game: 'valorant'
    },
    {
        ...mockMarketplaceListings[1],
        id: 'demo-4',
        title: 'ขายรหัส RoV คอน 50 ดาว สกิน Ultimate 20+ ตัว',
        type: 'account-sale',
        price: 2500,
        priceType: 'fixed',
        images: ['/games/rov.png'],
        game: 'rov'
    },
    {
        ...mockMarketplaceListings[0],
        id: 'demo-5',
        title: 'สอนเล่น Jungle RoV แบบ Pro Player',
        type: 'coaching',
        price: 300,
        priceType: 'per-hour',
        images: ['/games/rov.png'],
        game: 'rov'
    },
     {
        ...mockMarketplaceListings[1],
        id: 'demo-6',
        title: 'รับทำ Overlay สตรีมสวยๆ ธีม Cyberpunk',
        type: 'custom',
        price: 500,
        priceType: 'fixed',
        images: ['/games/pubg.png'], // Placeholder
        game: 'pubg'
    },
  ] as MarketplaceListing[];

  const filteredListings = allListings.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuy = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const categories = [
    { id: 'all', label: 'ทั้งหมด', icon: ShoppingBag },
    { id: 'coaching', label: 'Coaching', icon: GraduationCap },
    { id: 'hire-play', label: 'จ้างเล่น', icon: Swords },
    { id: 'account-sale', label: 'ซื้อขายไอดี', icon: User },
    { id: 'item-sale', label: 'ไอเทม', icon: Gift },
    { id: 'custom', label: 'งาน Custom', icon: MonitorPlay },
  ];

  return (
    <DashboardLayout 
      enableChat={true} 
      enableNotifications={true} 
      contentClassName="pb-24"
      showNavbarSearch={false}
    >
      <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-0 mt-4">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-[#111118] border border-white/10 min-h-[300px] flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40 z-0"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 p-8 md:p-12 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold mb-6 backdrop-blur-md">
                    <Shield className="w-3 h-3" />
                    Anajak Escrow Secured
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                    Marketplace <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        สำหรับเกมเมอร์ตัวจริง
                    </span>
                </h1>
                
                <p className="text-gray-300 text-lg max-w-xl mb-8">
                    ซื้อขายปลอดภัย จ้างเล่น โค้ชชิ่ง และไอเทมเกม ครบวงจรที่สุดในไทย
                    พร้อมระบบ Escrow กันโกง 100%
                </p>

                {/* Search Bar */}
                <div className="relative max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="ค้นหาบริการ, เกม, หรือไอเทม..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all"
                    />
                </div>
            </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                        flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all duration-200
                        ${activeCategory === cat.id 
                            ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                            : 'bg-[#111118] border-white/5 text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/10'
                        }
                    `}
                >
                    <cat.icon className={`w-6 h-6 ${activeCategory === cat.id ? 'text-purple-400' : ''}`} />
                    <span className="text-xs font-bold">{cat.label}</span>
                </button>
            ))}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden lg:block w-64 space-y-6 shrink-0">
                <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 sticky top-24">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> ตัวกรอง
                    </h3>
                    <FilterPanel />
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}></div>
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#111118] border-l border-white/10 p-6 animate-in slide-in-from-right">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Filter className="w-5 h-5" /> ตัวกรอง
                            </h3>
                            <button onClick={() => setShowMobileFilters(false)} className="text-gray-400 hover:text-white">
                                ปิด
                            </button>
                        </div>
                        <FilterPanel />
                        <button 
                            onClick={() => setShowMobileFilters(false)}
                            className="w-full mt-8 py-3 bg-purple-600 text-white rounded-xl font-bold"
                        >
                            ดูผลลัพธ์
                        </button>
                    </div>
                </div>
            )}

            {/* Listings Grid */}
            <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        {activeCategory === 'all' ? <TrendingUp className="w-5 h-5 text-purple-400" /> : null}
                        รายการแนะนำ
                        <span className="text-sm font-normal text-gray-500 ml-2">({filteredListings.length})</span>
                    </h2>
                    
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setShowMobileFilters(true)}
                            className="lg:hidden px-4 py-2 bg-[#111118] border border-white/10 rounded-lg text-white text-sm font-medium flex items-center gap-2"
                        >
                            <Filter size={16} /> Filter
                        </button>
                        <select className="bg-[#111118] border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-purple-500 w-full sm:w-auto">
                            <option>ล่าสุด</option>
                            <option>ราคา: ต่ำ - สูง</option>
                            <option>ราคา: สูง - ต่ำ</option>
                            <option>เรตติ้งสูงสุด</option>
                        </select>
                    </div>
                </div>

                {filteredListings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredListings.map((listing) => (
                            <ListingCard 
                                key={listing.id} 
                                listing={listing} 
                                onBuy={handleBuy} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-[#111118]/50">
                        <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-white mb-2">ไม่พบรายการที่ค้นหา</h3>
                        <p className="text-gray-400">ลองปรับตัวกรองหรือคำค้นหาใหม่ดูนะ</p>
                    </div>
                )}
            </div>
        </div>

      </div>
      
      <PurchaseModal 
        listing={selectedListing} 
        isOpen={isModalOpen} 
        onClose={() => {
            setIsModalOpen(false);
            setSelectedListing(null);
        }} 
      />
    </DashboardLayout>
  );
}

