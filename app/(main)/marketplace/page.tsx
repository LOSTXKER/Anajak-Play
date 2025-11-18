/**
 * Marketplace Page
 * Browse and purchase gaming services
 */

'use client';

import React, { useState } from 'react';
import { ListingCard } from '@/components/marketplace/ListingCard';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockMarketplaceListings } from '@/lib/data/mock-data';
import { Search, Filter, TrendingUp, Shield, Zap, CheckCircle2, Wallet, Loader2 } from 'lucide-react';
import { MarketplaceListing } from '@/lib/types/index';

export default function MarketplacePage() {
  const [listings] = useState(mockMarketplaceListings);
  const [filter, setFilter] = useState<'all' | 'coaching' | 'hire-play'>('all');
  const [purchasingItem, setPurchasingItem] = useState<MarketplaceListing | null>(null);
  const [purchaseStep, setPurchaseStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
  
  const filteredListings = filter === 'all' 
    ? listings 
    : listings.filter(l => l.type === filter);
  
  const handleBuyClick = (listing: MarketplaceListing) => {
    setPurchasingItem(listing);
    setPurchaseStep('confirm');
  };

  const handleConfirmPurchase = () => {
    setPurchaseStep('processing');
    // Simulate API call
    setTimeout(() => {
      setPurchaseStep('success');
    }, 2000);
  };

  const handleCloseModal = () => {
    setPurchasingItem(null);
    setPurchaseStep('confirm');
  };
  
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Hero Section */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-base/40"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-white">
              Anajak Market
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              ตลาดกลางสำหรับโค้ช • จ้างเล่น • ไอเทม • ปลอดภัย 100%
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="ค้นหาโค้ช, บริการ, เกม..."
                className="w-full bg-dark-card border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            ทั้งหมด
          </Button>
          <Button 
            variant={filter === 'coaching' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('coaching')}
          >
            🎓 Coaching
          </Button>
          <Button 
            variant={filter === 'hire-play' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('hire-play')}
          >
            🎮 Hire Play
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            ตัวกรองเพิ่ม
          </Button>
        </div>
      </section>
      
      {/* Features */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card variant="default" className="bg-[#13132b] border-white/10">
            <CardBody className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">Escrow System</p>
                <p className="text-xs text-gray-400">เงินปลอดภัย 100%</p>
              </div>
            </CardBody>
          </Card>
          
          <Card variant="default" className="bg-[#13132b] border-white/10">
            <CardBody className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">Reputation Based</p>
                <p className="text-xs text-gray-400">เลือกคนเชื่อถือได้</p>
              </div>
            </CardBody>
          </Card>
          
          <Card variant="default" className="bg-[#13132b] border-white/10">
            <CardBody className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">Fast Response</p>
                <p className="text-xs text-gray-400">ตอบกลับไว</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
      
      {/* Listings Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading text-white">
            {filter === 'all' && '🔥 บริการทั้งหมด'}
            {filter === 'coaching' && '🎓 โค้ชเกม'}
            {filter === 'hire-play' && '🎮 จ้างเล่น'}
          </h2>
          <p className="text-sm text-gray-400">
            {filteredListings.length} รายการ
          </p>
        </div>
        
        {filteredListings.length === 0 ? (
          <Card variant="elevated" className="bg-[#13132b] border-white/10">
            <CardBody className="text-center py-12">
              <p className="text-lg text-gray-400 mb-2">ยังไม่มีรายการ</p>
              <p className="text-sm text-gray-500">ลองเปลี่ยนตัวกรองดู</p>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard 
                key={listing.id}
                listing={listing}
                onBuy={() => handleBuyClick(listing)}
              />
            ))}
          </div>
        )}
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-12">
        <Card variant="gradient" className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
          <CardBody className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4 text-white">มีบริการอยากขาย?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              ลงบริการของคุณได้ฟรี เริ่มสร้างรายได้จากความเก่งในเกม
            </p>
            <Button variant="primary" size="lg">
              เริ่มขายเลย
            </Button>
          </CardBody>
        </Card>
      </section>

      {/* Purchase Mock Modal */}
      {purchasingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal}></div>
          <div className="relative z-10 bg-[#13132b] border border-white/10 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-slideUp">
            
            {purchaseStep === 'confirm' && (
              <>
                <h3 className="text-xl font-bold text-white mb-4">ยืนยันการสั่งซื้อ</h3>
                <div className="bg-[#0a0a16] rounded-xl p-4 mb-6 flex gap-4">
                   <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
                     {purchasingItem.images?.[0] && <img src={purchasingItem.images[0]} className="w-full h-full object-cover" />}
                   </div>
                   <div>
                     <h4 className="font-bold text-white text-sm mb-1">{purchasingItem.title}</h4>
                     <p className="text-xs text-gray-400 mb-2">{purchasingItem.type === 'coaching' ? 'Coaching' : 'Service'}</p>
                     <div className="text-cyan-400 font-bold">{purchasingItem.price} THB <span className="text-xs text-gray-500 font-normal">/ {purchasingItem.priceType}</span></div>
                   </div>
                </div>

                <div className="space-y-3 mb-6">
                   <div className="flex justify-between text-sm text-gray-400">
                      <span>Service Fee</span>
                      <span>{purchasingItem.price} THB</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-400">
                      <span>Platform Fee (5%)</span>
                      <span>{purchasingItem.price * 0.05} THB</span>
                   </div>
                   <div className="h-[1px] bg-white/10"></div>
                   <div className="flex justify-between text-lg font-bold text-white">
                      <span>Total</span>
                      <span>{purchasingItem.price * 1.05} THB</span>
                   </div>
                </div>

                <div className="flex items-center gap-3 mb-6 p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                   <Wallet className="text-purple-400" size={20} />
                   <div className="flex-1">
                      <p className="text-xs text-gray-300">จ่ายด้วย Anajak Wallet</p>
                      <p className="text-[10px] text-gray-500">Balance: 1,500 THB</p>
                   </div>
                   <div className="w-4 h-4 rounded-full border-2 border-purple-500 bg-purple-500"></div>
                </div>

                <div className="flex gap-3">
                   <button onClick={handleCloseModal} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5">ยกเลิก</button>
                   <button onClick={handleConfirmPurchase} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-500 hover:to-blue-500">ยืนยันการชำระเงิน</button>
                </div>
              </>
            )}

            {purchaseStep === 'processing' && (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">กำลังดำเนินการ...</h3>
                <p className="text-sm text-gray-400">ระบบกำลังล็อคเงินใน Escrow เพื่อความปลอดภัย</p>
              </div>
            )}

            {purchaseStep === 'success' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400">
                   <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">ชำระเงินสำเร็จ!</h3>
                <p className="text-sm text-gray-400 mb-6">
                   เงินของคุณถูกเก็บไว้ในระบบ Escrow แล้ว <br/>
                   ผู้ขายจะเริ่มดำเนินการทันที
                </p>
                <button onClick={handleCloseModal} className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20">ตกลง</button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}