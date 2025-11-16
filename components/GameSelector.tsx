'use client';

import { Gamepad2 } from 'lucide-react';
import { games } from '@/lib/mockData';
import Image from 'next/image';

interface GameSelectorProps {
  title?: string;
  subtitle?: string;
  activeGameId?: number;
  onSelectGame?: (gameId: number) => void;
}

const gameImages: { [key: string]: string } = {
  'RoV': '/games/rov.png',
  'Valorant': '/games/valorant.png',
  'Free Fire': '/games/Free_fire.jpg',
  'PUBG': '/games/pubg.png',
};

export default function GameSelector({
  title = 'เลือกเกม',
  subtitle,
  activeGameId = 1,
  onSelectGame,
}: GameSelectorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-purple-400" /> {title}
          </h3>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <a href="#" className="text-sm text-cyan-400 hover:underline">ดูทั้งหมด</a>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {games.map((game) => (
          <button 
            key={game.id}
            onClick={() => onSelectGame?.(game.id)}
            className={`flex-shrink-0 px-6 py-3 rounded-xl border flex items-center gap-3 transition-all ${
              game.id === activeGameId
                ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {gameImages[game.name] ? (
              <div className="w-8 h-8 relative flex items-center justify-center">
                <Image 
                  src={gameImages[game.name]} 
                  alt={game.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-2xl">{game.icon}</span>
            )}
            <span className="font-semibold whitespace-nowrap">{game.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
