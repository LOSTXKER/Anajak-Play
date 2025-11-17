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
import { Search, Filter, TrendingUp, Shield, Zap } from 'lucide-react';

export default function MarketplacePage() {
  const [listings] = useState(mockMarketplaceListings);
  const [filter, setFilter] = useState<'all' | 'coaching' | 'hire-play'>('all');
  
  const filteredListings = filter === 'all' 
    ? listings 
    : listings.filter(l => l.type === filter);
  
  const handleBuy = (listing: any) => {
    console.log('Buying:', listing.id);
    // TODO: Implement purchase flow
  };
  
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Hero Section */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-base/40"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading">
              Anajak Market
            </h1>
            <p className="text-lg text-text-secondary mb-6">
              ตลาดกลางสำหรับโค้ช • จ้างเล่น • ไอเทม • ปลอดภัย 100%
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="ค้นหาโค้ช, บริการ, เกม..."
                className="w-full bg-dark-card border border-dark-surface rounded-xl pl-12 pr-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-primary-neon focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
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
          <Card variant="default">
            <CardBody className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-status-success/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-status-success" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Escrow System</p>
                <p className="text-xs text-text-tertiary">เงินปลอดภัย 100%</p>
              </div>
            </CardBody>
          </Card>
          
          <Card variant="default">
            <CardBody className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-primary-neon/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary-neon" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Reputation Based</p>
                <p className="text-xs text-text-tertiary">เลือกคนเชื่อถือได้</p>
              </div>
            </CardBody>
          </Card>
          
          <Card variant="default">
            <CardBody className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-secondary-electric/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-secondary-electric" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Fast Response</p>
                <p className="text-xs text-text-tertiary">ตอบกลับไว</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
      
      {/* Listings Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-heading">
            {filter === 'all' && '🔥 บริการทั้งหมด'}
            {filter === 'coaching' && '🎓 โค้ชเกม'}
            {filter === 'hire-play' && '🎮 จ้างเล่น'}
          </h2>
          <p className="text-sm text-text-secondary">
            {filteredListings.length} รายการ
          </p>
        </div>
        
        {filteredListings.length === 0 ? (
          <Card variant="elevated">
            <CardBody className="text-center py-12">
              <p className="text-lg text-text-tertiary mb-2">ยังไม่มีรายการ</p>
              <p className="text-sm text-text-secondary">ลองเปลี่ยนตัวกรองดู</p>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard 
                key={listing.id}
                listing={listing}
                onBuy={handleBuy}
              />
            ))}
          </div>
        )}
      </section>
      
      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-12">
        <Card variant="gradient">
          <CardBody className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">มีบริการอยากขาย?</h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              ลงบริการของคุณได้ฟรี เริ่มสร้างรายได้จากความเก่งในเกม
            </p>
            <Button variant="primary" size="lg">
              เริ่มขายเลย
            </Button>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
