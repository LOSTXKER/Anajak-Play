'use client';

import React, { useState } from 'react';
import { X, Sparkles, Gift, Coins } from 'lucide-react';

interface DailyChestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyChestModal: React.FC<DailyChestModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [reward, setReward] = useState<{ type: string; value: string; icon: any } | null>(null);

  if (!isOpen) return null;

  const handleOpen = () => {
    setStep('opening');
    
    // Simulate opening delay
    setTimeout(() => {
      // Mock Reward Randomizer
      const rewards = [
        { type: 'exp', value: '500 EXP', icon: <Sparkles className="w-12 h-12 text-yellow-400" /> },
        { type: 'currency', value: '100 Gold', icon: <Coins className="w-12 h-12 text-yellow-400" /> },
        { type: 'cosmetic', value: 'Frame: Neon Cyber', icon: <Gift className="w-12 h-12 text-purple-400" /> },
      ];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      
      setReward(randomReward);
      setStep('opened');
    }, 1500);
  };

  const handleClose = () => {
    setStep('closed');
    setReward(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="relative w-full max-w-sm bg-[#13132b] border border-white/10 rounded-3xl p-8 text-center overflow-hidden shadow-2xl shadow-purple-900/40 animate-in zoom-in-95 duration-300">
        
        {/* Background FX */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {step === 'closed' && (
          <div className="py-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-white mb-2">Daily Login Reward</h2>
            <p className="text-gray-400 mb-8">เปิดกล่องวันนี้เพื่อลุ้นรับของรางวัลพิเศษ!</p>
            
            <div 
              onClick={handleOpen}
              className="w-40 h-40 mb-8 cursor-pointer hover:scale-110 transition-transform duration-300 relative group"
            >
               <div className="absolute inset-0 bg-purple-500/30 blur-[40px] rounded-full animate-pulse"></div>
               <div className="relative z-10 text-8xl animate-bounce">🎁</div>
            </div>

            <button
              onClick={handleOpen}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all active:scale-95"
            >
              เปิดกล่องฟรี (Open Free)
            </button>
          </div>
        )}

        {step === 'opening' && (
           <div className="py-20 flex flex-col items-center justify-center">
              <div className="text-6xl animate-spin mb-4">✨</div>
              <h3 className="text-xl font-bold text-white animate-pulse">กำลังเปิดกล่อง...</h3>
           </div>
        )}

        {step === 'opened' && reward && (
           <div className="py-6 flex flex-col items-center animate-in zoom-in duration-500">
              <div className="mb-6 relative">
                 <div className="absolute inset-0 bg-yellow-500/20 blur-[50px] rounded-full animate-pulse"></div>
                 <div className="relative z-10 animate-bounce-slow">
                    {reward.icon}
                 </div>
              </div>
              
              <h3 className="text-gray-400 text-sm uppercase tracking-wider font-bold mb-2">ยินดีด้วย! คุณได้รับ</h3>
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
                 {reward.value}
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-[#1a1a35] hover:bg-[#202040] border border-white/10 text-white font-bold rounded-xl transition-all"
              >
                เก็บเข้ากระเป๋า (Claim)
              </button>
           </div>
        )}

      </div>
    </div>
  );
};

