'use client';

import React from 'react';
import { Zap, Coffee, Swords, Smile, Clock } from 'lucide-react';
import { MoodStatus } from '@/lib/types/index';

interface MoodSelectorProps {
  currentMood?: MoodStatus;
  onSelect: (mood: MoodStatus) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MOODS: { id: MoodStatus; label: string; icon: any; color: string; desc: string }[] = [
  { id: 'tryhard', label: 'Tryhard', icon: <Swords size={20} />, color: 'red', desc: 'จริงจัง เน้นชนะ' },
  { id: 'fun', label: 'For Fun', icon: <Smile size={20} />, color: 'yellow', desc: 'เล่นขำๆ ไม่หัวร้อน' },
  { id: 'chill', label: 'Chill', icon: <Coffee size={20} />, color: 'blue', desc: 'ผ่อนคลาย สบายๆ' },
  { id: 'competitive', label: 'Competitive', icon: <Zap size={20} />, color: 'purple', desc: 'ซ้อมทีม/ไต่แรงค์' },
  { id: 'social', label: 'Social', icon: <Clock size={20} />, color: 'green', desc: 'เน้นคุย หาเพื่อน' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onSelect, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-sm bg-[#13132b] border border-white/10 rounded-3xl p-6 animate-in zoom-in-95 duration-200 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4 text-center">วันนี้มาอารมณ์ไหน?</h3>
        
        <div className="space-y-2">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => {
                onSelect(mood.id);
                onClose();
              }}
              className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all group
                ${currentMood === mood.id 
                  ? `bg-${mood.color}-900/20 border-${mood.color}-500/50`
                  : 'bg-[#1a1a35] border-white/5 hover:bg-[#202040] hover:border-white/10'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110
                ${currentMood === mood.id ? `bg-${mood.color}-500 text-white` : 'bg-[#2a2a45] text-gray-400'}
              `}>
                {mood.icon}
              </div>
              <div className="text-left">
                 <div className={`font-bold text-sm ${currentMood === mood.id ? 'text-white' : 'text-gray-300'}`}>
                    {mood.label}
                 </div>
                 <div className="text-xs text-gray-500 group-hover:text-gray-400">{mood.desc}</div>
              </div>
              {currentMood === mood.id && (
                <div className={`ml-auto w-3 h-3 rounded-full bg-${mood.color}-500 shadow-[0_0_10px_currentColor]`}></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

