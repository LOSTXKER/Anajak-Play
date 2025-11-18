/**
 * Tinder Mode Page
 * Swipe to find gaming partners
 */

'use client';

import React, { useState } from 'react';
import { TinderCardComponent } from '@/components/tinder/TinderCard';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { mockTinderCards } from '@/lib/data/mock-data';
import { Settings, X, Heart, Sparkles } from 'lucide-react';

export default function TinderModePage() {
  const [cards] = useState(mockTinderCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState(0);
  const [swipes, setSwipes] = useState(0);
  
  const currentCard = cards[currentIndex];
  
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setMatches(prev => prev + 1);
      // In real app: check if mutual like -> create match
    }
    setSwipes(prev => prev + 1);
    setCurrentIndex(prev => prev + 1);
  };
  
  if (currentIndex >= cards.length) {
    return (
      <div className="min-h-screen bg-dark-base flex items-center justify-center p-4">
        <Card variant="elevated" className="max-w-md w-full">
          <CardBody className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">ดูการ์ดหมดแล้ว!</h2>
            <p className="text-text-secondary mb-6">
              คุณปัดไป {swipes} การ์ด และได้ {matches} Match
            </p>
            <Button variant="gradient" onClick={() => setCurrentIndex(0)}>
              เริ่มใหม่
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark-base">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2">
              💫 Tinder Mode
            </h1>
            <p className="text-sm text-text-secondary">
              หาเพื่อนเล่นระยะยาว • Swipe ไปเรื่อยๆ
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
            ตัวกรอง
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card variant="default" className="p-4 text-center">
            <p className="text-2xl font-bold text-primary-neon font-mono">{swipes}</p>
            <p className="text-xs text-text-tertiary">Swipes</p>
          </Card>
          <Card variant="default" className="p-4 text-center">
            <p className="text-2xl font-bold text-status-success font-mono">{matches}</p>
            <p className="text-xs text-text-tertiary">Matches</p>
          </Card>
          <Card variant="default" className="p-4 text-center">
            <p className="text-2xl font-bold text-secondary-electric font-mono">
              {cards.length - currentIndex}
            </p>
            <p className="text-xs text-text-tertiary">Remaining</p>
          </Card>
        </div>
      </div>
      
      {/* Card Stack */}
      <div className="container mx-auto px-4">
        {currentCard ? (
          <TinderCardComponent 
            card={currentCard}
            onSwipe={handleSwipe}
          />
        ) : (
          <Card variant="elevated" className="max-w-md mx-auto">
            <CardBody className="text-center py-12">
              <p className="text-text-tertiary">กำลังโหลดการ์ดเพิ่ม...</p>
            </CardBody>
          </Card>
        )}
      </div>
      
      {/* Info Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-neon" />
            Tinder Mode คืออะไร?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default">
              <CardBody>
                <div className="text-3xl mb-2">💜</div>
                <h3 className="font-semibold mb-2">หาเพื่อนระยะยาว</h3>
                <p className="text-sm text-text-secondary">
                  ไม่เน้นแค่เกมเดียว แต่เน้น vibe และความถูกชะตา
                </p>
              </CardBody>
            </Card>
            
            <Card variant="default">
              <CardBody>
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold mb-2">Match Algorithm</h3>
                <p className="text-sm text-text-secondary">
                  ระบบวิเคราะห์ playstyle, เวลาว่าง, และเกมที่ชอบ
                </p>
              </CardBody>
            </Card>
            
            <Card variant="default">
              <CardBody>
                <div className="text-3xl mb-2">⭐</div>
                <h3 className="font-semibold mb-2">Super Like</h3>
                <p className="text-sm text-text-secondary">
                  ส่งสัญญาณพิเศษว่าคุณสนใจคนนี้มากจริงๆ
                </p>
              </CardBody>
            </Card>
            
            <Card variant="default">
              <CardBody>
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold mb-2">Chat ทันที</h3>
                <p className="text-sm text-text-secondary">
                  Match แล้วแชทได้เลย ไม่ต้องรอ
                </p>
              </CardBody>
            </Card>
          </div>
          
          {/* CTA */}
          <Card variant="gradient" className="mt-6">
            <CardBody className="text-center">
              <h3 className="font-bold mb-2">🎁 Play Plus</h3>
              <p className="text-sm text-text-secondary mb-4">
                ปัดไม่จำกัด • เห็นคนที่ไลค์คุณ • Boost โปรไฟล์
              </p>
              <Button variant="gradient" size="sm">
                อัปเกรดเลย
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
