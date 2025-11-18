/**
 * Tinder Mode Page
 * Swipe to find gaming partners
 */

'use client';

import React, { useState } from 'react';
import { TinderCardComponent } from '@/components/tinder/TinderCard';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { mockTinderCards, mockUsers } from '@/lib/data/mock-data';
import { Settings, Heart, Sparkles, MessageCircle, UserPlus, Gamepad2 } from 'lucide-react';
import { User } from '@/lib/types/index';
import Link from 'next/link';

export default function TinderModePage() {
  const [cards] = useState(mockTinderCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState(0);
  const [swipes, setSwipes] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  
  const currentCard = cards[currentIndex];
  const currentUser = mockUsers[0]; // Simulate logged in user
  
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setMatches(prev => prev + 1);
      
      // Simulate a match happening 50% of the time for demo
      if (Math.random() > 0.5) {
        setMatchedUser(currentCard.user);
        setShowMatchModal(true);
      }
    }
    setSwipes(prev => prev + 1);
    
    // Delay moving to next card slightly if it's a match, so the modal pops up first
    // or just move it. For smooth UX, usually we move it, then pop modal.
    setCurrentIndex(prev => prev + 1);
  };

  const handleCloseMatch = () => {
    setShowMatchModal(false);
    setMatchedUser(null);
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
    <div className="min-h-screen bg-[#0a0a16] relative">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading mb-2 text-white">
              💫 Tinder Mode
            </h1>
            <p className="text-sm text-gray-400">
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
          <Card variant="default" className="p-4 text-center border-white/10 bg-[#13132b]">
            <p className="text-2xl font-bold text-purple-400 font-mono">{swipes}</p>
            <p className="text-xs text-gray-400">Swipes</p>
          </Card>
          <Card variant="default" className="p-4 text-center border-white/10 bg-[#13132b]">
            <p className="text-2xl font-bold text-green-400 font-mono">{matches}</p>
            <p className="text-xs text-gray-400">Matches</p>
          </Card>
          <Card variant="default" className="p-4 text-center border-white/10 bg-[#13132b]">
            <p className="text-2xl font-bold text-cyan-400 font-mono">
              {cards.length - currentIndex}
            </p>
            <p className="text-xs text-gray-400">Remaining</p>
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
              <p className="text-gray-500">กำลังโหลดการ์ดเพิ่ม...</p>
            </CardBody>
          </Card>
        )}
      </div>
      
      {/* Info Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Tinder Mode คืออะไร?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="default" className="bg-[#13132b] border-white/10">
              <CardBody>
                <div className="text-3xl mb-2">💜</div>
                <h3 className="font-semibold mb-2 text-white">หาเพื่อนระยะยาว</h3>
                <p className="text-sm text-gray-400">
                  ไม่เน้นแค่เกมเดียว แต่เน้น vibe และความถูกชะตา
                </p>
              </CardBody>
            </Card>
            
            <Card variant="default" className="bg-[#13132b] border-white/10">
              <CardBody>
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold mb-2 text-white">Match Algorithm</h3>
                <p className="text-sm text-gray-400">
                  ระบบวิเคราะห์ playstyle, เวลาว่าง, และเกมที่ชอบ
                </p>
              </CardBody>
            </Card>
          </div>
          
          {/* CTA */}
          <Card variant="gradient" className="mt-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
            <CardBody className="text-center">
              <h3 className="font-bold mb-2 text-white">🎁 Play Plus</h3>
              <p className="text-sm text-gray-300 mb-4">
                ปัดไม่จำกัด • เห็นคนที่ไลค์คุณ • Boost โปรไฟล์
              </p>
              <Button variant="gradient" size="sm">
                อัปเกรดเลย
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Match Modal Overlay */}
      {showMatchModal && matchedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={handleCloseMatch}></div>
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-lg animate-scaleIn">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] italic tracking-tighter transform -rotate-3">
                IT'S A MATCH!
              </h2>
              <p className="text-white/80 mt-4 text-lg font-medium">
                คุณและ <span className="text-purple-400 font-bold">{matchedUser.displayName}</span> ใจตรงกัน!
              </p>
            </div>

            {/* Avatars */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
              <div className="relative">
                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.6)] overflow-hidden">
                    <img src={currentUser.avatar || '/avatars/default.jpg'} alt="Me" className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">YOU</div>
              </div>
              <div className="text-3xl animate-pulse">❤️</div>
              <div className="relative">
                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.6)] overflow-hidden">
                    <img src={matchedUser.avatar} alt={matchedUser.displayName} className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">THEM</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 max-w-xs mx-auto">
              <Link href="/messages" className="block w-full">
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  <MessageCircle className="fill-white" size={20} />
                  ทักแชทเลย (Say Hi)
                </button>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  <Gamepad2 size={16} />
                  ชวนเล่นเกม
                </button>
                <button className="py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                  <UserPlus size={16} />
                  เพิ่มเพื่อน
                </button>
              </div>

              <button 
                onClick={handleCloseMatch}
                className="block w-full py-2 text-gray-500 hover:text-white text-sm mt-4 transition-colors"
              >
                ปัดต่อ (Keep Swiping)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}