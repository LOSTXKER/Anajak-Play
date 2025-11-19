'use client';

import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, Star, Users, Crown } from 'lucide-react';

export const DynamicHomeCards = () => {
  // Mock dynamic data - In real app, this comes from API based on user interest/trends
  const cards = [
    {
      id: 'trend-1',
      type: 'trending',
      title: '🔥 RoV Ranked',
      subtitle: 'กำลังมาแรง! คนหาตี้เพิ่ม 40%',
      bg: 'from-orange-600 to-red-600',
      icon: <TrendingUp className="w-5 h-5 text-white" />,
    },
    {
      id: 'highlight-1',
      type: 'highlight',
      title: '🏆 Top Session',
      subtitle: 'ทีม "No Toxic" ชนะ 8 ตาติด!',
      bg: 'from-yellow-600 to-amber-600',
      icon: <Crown className="w-5 h-5 text-white" />,
    },
    {
      id: 'rec-1',
      type: 'recommend',
      title: '✨ แนะนำสำหรับคุณ',
      subtitle: 'มี 3 ห้อง Valorant ที่ขาดตำแหน่งคุณ',
      bg: 'from-purple-600 to-indigo-600',
      icon: <Star className="w-5 h-5 text-white" />,
    }
  ];

  const [activeCard, setActiveCard] = useState(0);

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card, idx) => (
            <div 
                key={card.id}
                className={`relative overflow-hidden rounded-2xl p-5 border border-white/10 transition-all duration-500 cursor-pointer hover:scale-[1.02] group
                    ${idx === activeCard ? 'opacity-100 ring-1 ring-white/20 shadow-lg' : 'opacity-80 hover:opacity-100'}
                `}
            >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bg} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>

                <div className="relative z-10 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                                {card.icon}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-70 text-white">
                                {card.type}
                            </span>
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight mb-1">{card.title}</h3>
                        <p className="text-xs text-gray-300">{card.subtitle}</p>
                    </div>
                </div>

                {/* Progress Bar for Auto-rotate (Optional visual cue) */}
                {idx === activeCard && (
                    <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
                         <div className="h-full bg-white/60 animate-progress-bar origin-left"></div>
                    </div>
                )}
            </div>
        ))}
    </div>
  );
};

