'use client';

import React, { useState } from 'react';
import { Search, Zap, Shield, CreditCard, Smartphone, Check, Star, Flame } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { userProfileData } from '@/lib/data/legacy-data';

interface TopUpGame {
  id: string;
  name: string;
  image: string;
  publisher: string;
  popular?: boolean;
  packages: TopUpPackage[];
}

interface TopUpPackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  bonus?: string;
  image?: string;
}

const games: TopUpGame[] = [
  {
    id: 'rov',
    name: 'RoV: Arena of Valor',
    image: '/games/rov.png',
    publisher: 'Garena',
    popular: true,
    packages: [
      { id: 'rov-1', name: '37 Coupons', price: 35, originalPrice: 35 },
      { id: 'rov-2', name: '120 Coupons', price: 99, bonus: '+5 Bonus' },
      { id: 'rov-3', name: '250 Coupons', price: 199, bonus: '+15 Bonus', originalPrice: 210 },
      { id: 'rov-4', name: '745 Coupons', price: 499, bonus: '+50 Bonus' },
      { id: 'rov-5', name: '1520 Coupons', price: 999, bonus: '+150 Bonus' },
      { id: 'rov-6', name: '3050 Coupons', price: 1999, bonus: '+350 Bonus' },
    ]
  },
  {
    id: 'valorant',
    name: 'Valorant',
    image: '/games/valorant.png',
    publisher: 'Riot Games',
    popular: true,
    packages: [
      { id: 'val-1', name: '375 VP', price: 149 },
      { id: 'val-2', name: '875 VP', price: 349, bonus: '+ Bonus' },
      { id: 'val-3', name: '1950 VP', price: 749, bonus: '+ Bonus' },
      { id: 'val-4', name: '3850 VP', price: 1450, bonus: '+ Bonus' },
      { id: 'val-5', name: '7950 VP', price: 2890, bonus: '+ Bonus' },
    ]
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    image: '/games/genshin.png', // Assuming this exists or will use placeholder
    publisher: 'HoYoverse',
    packages: [
      { id: 'gen-1', name: '60 Genesis Crystals', price: 35 },
      { id: 'gen-2', name: '300+30 Genesis Crystals', price: 179 },
      { id: 'gen-3', name: '980+110 Genesis Crystals', price: 549 },
      { id: 'gen-4', name: '1980+260 Genesis Crystals', price: 1100 },
      { id: 'gen-5', name: 'Blessing of the Welkin Moon', price: 179, bonus: 'Monthly' },
    ]
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    image: '/games/pubg.png',
    publisher: 'Tencent',
    packages: [
      { id: 'pubg-1', name: '60 UC', price: 35 },
      { id: 'pubg-2', name: '325 UC', price: 169 },
      { id: 'pubg-3', name: '660 UC', price: 349 },
      { id: 'pubg-4', name: '1800 UC', price: 899 },
    ]
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    image: '/games/Free_fire.jpg',
    publisher: 'Garena',
    packages: [
      { id: 'ff-1', name: '100 Diamonds', price: 35 },
      { id: 'ff-2', name: '310 Diamonds', price: 100 },
      { id: 'ff-3', name: '520 Diamonds', price: 179 },
      { id: 'ff-4', name: '1060 Diamonds', price: 349 },
    ]
  }
];

export default function TopUpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<TopUpGame | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TopUpPackage | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'promptpay' | 'credit'>('wallet');

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout contentClassName="pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-[#111118] border border-white/10 min-h-[200px] flex items-center mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-pink-600/30 z-0"></div>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 p-8 md:p-10 w-full">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    Game Top-up
                    <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 text-2xl md:text-4xl">
                        เติมเกมคุ้มที่สุด
                    </span>
                </h1>
                <p className="text-gray-300 max-w-xl">
                    เติมเกมมือถือและ PC ราคาพิเศษ รับประกันเข้าทันที ปลอดภัย 100%
                </p>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Game Selection */}
          <div className={`flex-1 ${selectedGame ? 'hidden lg:block' : 'block'}`}>
            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="ค้นหาเกม..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#111118] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all"
                />
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredGames.map((game) => (
                    <button
                        key={game.id}
                        onClick={() => {
                            setSelectedGame(game);
                            setSelectedPackage(null);
                            // Scroll to top on mobile when selecting
                            if (window.innerWidth < 1024) {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className={`
                            group relative flex flex-col items-center p-4 rounded-2xl border transition-all text-left
                            ${selectedGame?.id === game.id 
                                ? 'bg-orange-500/10 border-orange-500' 
                                : 'bg-[#111118] border-white/5 hover:bg-white/5 hover:border-white/20'
                            }
                        `}
                    >
                        {game.popular && (
                            <div className="absolute top-2 right-2 text-orange-500">
                                <Flame className="w-4 h-4 fill-orange-500" />
                            </div>
                        )}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-3 shadow-lg group-hover:scale-105 transition-transform bg-black">
                             <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className={`font-bold text-sm sm:text-base text-center ${selectedGame?.id === game.id ? 'text-orange-400' : 'text-white'}`}>
                            {game.name}
                        </h3>
                        <span className="text-xs text-gray-500 mt-1">{game.publisher}</span>
                    </button>
                ))}
            </div>
          </div>

          {/* Right Column: Package Selection & Payment */}
          {selectedGame && (
            <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 animate-in slide-in-from-right duration-300">
                <div className="sticky top-24 space-y-6">
                    
                    {/* Mobile Back Button */}
                    <button 
                        onClick={() => setSelectedGame(null)}
                        className="lg:hidden flex items-center text-gray-400 hover:text-white mb-4"
                    >
                        ← เลือกเกมอื่น
                    </button>

                    {/* Selected Game Header */}
                    <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                        <img src={selectedGame.image} alt={selectedGame.name} className="w-16 h-16 rounded-xl object-cover shadow-md" />
                        <div>
                            <h2 className="text-xl font-bold text-white">{selectedGame.name}</h2>
                            <div className="flex items-center text-green-400 text-xs gap-1 mt-1">
                                <Zap className="w-3 h-3" />
                                <span>เข้าทันที (Automatic)</span>
                            </div>
                        </div>
                    </div>

                    {/* Packages Grid */}
                    <div className="bg-[#111118] border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">เลือกแพ็กเกจ</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {selectedGame.packages.map((pkg) => (
                                <button
                                    key={pkg.id}
                                    onClick={() => setSelectedPackage(pkg)}
                                    className={`
                                        relative p-3 rounded-xl border text-left transition-all
                                        ${selectedPackage?.id === pkg.id
                                            ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500'
                                            : 'bg-black/20 border-white/5 hover:border-white/20'
                                        }
                                    `}
                                >
                                    {pkg.bonus && (
                                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            {pkg.bonus}
                                        </div>
                                    )}
                                    <div className="font-bold text-white mb-1">{pkg.name}</div>
                                    <div className="flex items-end gap-2">
                                        <div className="text-orange-400 font-bold text-lg">฿{pkg.price}</div>
                                        {pkg.originalPrice && (
                                            <div className="text-xs text-gray-500 line-through mb-1">฿{pkg.originalPrice}</div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Player ID Input */}
                    <div className="bg-[#111118] border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">ข้อมูลไอดี</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-400 mb-1 block">Player ID / UID</label>
                                <input type="text" placeholder="Ex. 123456789" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="flex items-start gap-2 text-xs text-gray-500 bg-white/5 p-3 rounded-lg">
                                <Shield className="w-4 h-4 shrink-0" />
                                <span>กรุณาตรวจสอบ UID ให้ถูกต้อง ระบบจะทำการเติมเงินเข้า UID นี้ทันทีและไม่สามารถแก้ไขได้</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-[#111118] border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">ชำระเงิน</h3>
                        <div className="space-y-3">
                            <button 
                                onClick={() => setPaymentMethod('wallet')}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${paymentMethod === 'wallet' ? 'bg-orange-500/10 border-orange-500' : 'bg-black/20 border-white/5'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold">Anajak Wallet</div>
                                        <div className="text-xs text-gray-400">ยอดเงินคงเหลือ: ฿{userProfileData.wallet.toLocaleString()}</div>
                                    </div>
                                </div>
                                {paymentMethod === 'wallet' && <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                            </button>

                             <button 
                                onClick={() => setPaymentMethod('promptpay')}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${paymentMethod === 'promptpay' ? 'bg-orange-500/10 border-orange-500' : 'bg-black/20 border-white/5'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <Smartphone className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold">PromptPay QR</div>
                                        <div className="text-xs text-gray-400">สแกนจ่ายทันที</div>
                                    </div>
                                </div>
                                {paymentMethod === 'promptpay' && <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                            </button>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button 
                        disabled={!selectedPackage}
                        className={`
                            w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
                            ${selectedPackage 
                                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25 hover:scale-[1.02]' 
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            }
                        `}
                    >
                        {selectedPackage ? `ชำระเงิน ฿${selectedPackage.price}` : 'กรุณาเลือกแพ็กเกจ'}
                    </button>

                </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
