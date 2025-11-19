'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useParty } from '@/lib/PartyContext';
import { GameId } from '@/lib/types/index';

interface CreatePartyButtonProps {
  gameId: GameId;
  gameName: string;
}

export default function CreatePartyButton({ gameId, gameName }: CreatePartyButtonProps) {
  const { openCreateModal } = useParty();

  return (
    <button 
      onClick={() => openCreateModal({ game: gameId })}
      className="px-6 py-3 bg-white text-black font-bold rounded-xl shadow-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
    >
      <Plus size={18} /> หาตี้ {gameName}
    </button>
  );
}

