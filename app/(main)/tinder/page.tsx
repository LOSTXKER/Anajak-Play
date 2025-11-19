/**
 * Tinder Mode Page
 * Swipe to find gaming partners
 */

'use client';

import React, { useState } from 'react';
import { TinderCardComponent } from '@/components/tinder/TinderCard';
import { ProfileDetailView } from '@/components/tinder/ProfileDetailView';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { mockTinderCards, mockUsers } from '@/lib/data/mock-data';
import Image from 'next/image';
import { User } from '@/lib/types/index';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function TinderModePage() {
  const [cards] = useState(mockTinderCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState(0);
  const [swipes, setSwipes] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  
  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];
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
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Sparkles className="w-16 h-16 text-purple-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">All Caught Up!</h2>
            <p className="text-gray-400 mb-8">
                You&apos;ve swiped through everyone in your area.<br/>Check back later for more gamers.
            </p>
            <Button variant="gradient" onClick={() => setCurrentIndex(0)} className="px-8 py-6 text-lg rounded-full shadow-glow-purple">
              <RotateCcw className="mr-2" />
              Start Over
            </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-[calc(100vh-80px)] w-full max-w-screen-2xl mx-auto relative flex flex-col lg:flex-row overflow-hidden">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 bg-[#0a0a16] -z-50" />
      <div className="fixed top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Left Side: Card Stack (40%) */}
      <div className="flex-1 lg:flex-[0.4] relative flex flex-col items-center justify-center p-4 lg:pr-0">
          {/* Header Stats */}
          <div className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-center">
              <div className="flex items-center gap-4">
                   <div className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3">
                      <Zap size={14} className="text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-bold text-white">{swipes}</span>
                   </div>
                   <div className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3">
                      <Heart size={14} className="text-pink-500" fill="currentColor" />
                      <span className="text-sm font-bold text-white">{matches}</span>
                   </div>
              </div>
              <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Settings size={20} className="text-white" />
              </button>
          </div>

          {/* Card Container */}
          <div className="w-full max-w-sm aspect-[3/4] relative perspective-1000">
              <AnimatePresence>
                  {nextCard && (
                      <div key={`next-${nextCard.user.id}`} className="absolute inset-0 z-0">
                          <TinderCardComponent 
                              card={nextCard}
                              isFront={false}
                          />
                      </div>
                  )}
                  
                  {currentCard && (
                      <div key={`current-${currentCard.user.id}`} className="absolute inset-0 z-10">
                          <TinderCardComponent 
                              card={currentCard}
                              onSwipe={handleSwipe}
                              isFront={true}
                          />
                      </div>
                  )}
              </AnimatePresence>
          </div>

          {/* Floating Action Bar */}
          <div className="mt-8 flex items-center justify-center gap-6 z-30">
                <button
                    onClick={() => handleSwipe('left')}
                    className="w-14 h-14 rounded-full bg-[#1e1e2e] border border-white/10 text-red-500 shadow-2xl hover:bg-red-500 hover:text-white hover:scale-110 hover:border-red-500 transition-all duration-300 flex items-center justify-center group"
                >
                    <X size={28} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform" />
                </button>
                
                <button className="w-10 h-10 rounded-full bg-[#1e1e2e] border border-white/10 text-blue-400 hover:bg-blue-500 hover:text-white hover:scale-110 hover:border-blue-500 transition-all duration-300 flex items-center justify-center shadow-xl">
                    <Star size={18} strokeWidth={2.5} fill="currentColor" />
                </button>

                <button
                    onClick={() => handleSwipe('right')}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 text-white shadow-2xl shadow-emerald-900/50 hover:scale-110 hover:shadow-emerald-500/50 transition-all duration-300 flex items-center justify-center group"
                >
                    <Heart size={28} fill="currentColor" strokeWidth={0} className="group-hover:scale-110 transition-transform" />
                </button>
          </div>
      </div>

      {/* Right Side: Detailed Profile Info (60%) - Hidden on small mobile, or toggled */}
      <div className="hidden lg:flex flex-1 lg:flex-[0.6] h-full p-8 pl-4 items-center justify-center">
          <div className="w-full h-[90%] max-w-3xl">
              {currentCard ? (
                 <ProfileDetailView key={currentCard.user.id} card={currentCard} />
              ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Select a card to view details
                 </div>
              )}
          </div>
      </div>
      
      {/* Match Modal Overlay */}
      {showMatchModal && matchedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={handleCloseMatch}></div>
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-lg animate-scaleIn">
            <div className="text-center mb-8">
              <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_0_25px_rgba(236,72,153,0.6)] italic tracking-tighter transform -rotate-3 animate-bounce">
                IT&apos;S A MATCH!
              </h2>
              <p className="text-white/90 mt-6 text-xl font-medium">
                You and <span className="text-purple-400 font-bold border-b-2 border-purple-500">{matchedUser.displayName}</span> vibe together!
              </p>
            </div>

            {/* Avatars */}
            <div className="flex items-center justify-center gap-4 md:gap-12 mb-12 relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 blur-[2px]" />

              <div className="relative z-10 group">
                 <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.6)] overflow-hidden group-hover:scale-105 transition-transform relative">
                    <Image 
                      src={currentUser.avatar || '/avatars/default.jpg'} 
                      alt="Me" 
                      fill
                      className="object-cover" 
                    />
                 </div>
              </div>
              
              <div className="relative z-10 group">
                 <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.6)] overflow-hidden group-hover:scale-105 transition-transform relative">
                    <Image 
                      src={matchedUser.avatar} 
                      alt={matchedUser.displayName} 
                      fill
                      className="object-cover" 
                    />
                 </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 max-w-xs mx-auto">
              <Link href="/messages" className="block w-full">
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-pink-500/30 transition-all flex items-center justify-center gap-3">
                  <MessageCircle className="fill-white" size={24} />
                  Say Hello
                </button>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3.5 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-white/5">
                  <Gamepad2 size={18} />
                  Invite to Play
                </button>
                <button className="py-3.5 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-white/5">
                  <UserPlus size={18} />
                  Add Friend
                </button>
              </div>

              <button 
                onClick={handleCloseMatch}
                className="block w-full py-3 text-gray-500 hover:text-white text-sm mt-2 transition-colors"
              >
                Keep Swiping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


