'use client';

import React from 'react';
import { useParty } from '@/lib/PartyContext';
import CreateLFGSession from './CreateLFGSession';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatePartyModalWrapper() {
  const { isCreateModalOpen, closeCreateModal, createModalInitialData, updateParty } = useParty();

  const handleSessionCreated = (sessionId: string, formData: any) => {
    // Create new Party Object (Mock)
    const newParty: any = {
      id: Date.now(),
      title: `My ${formData.game} Room`,
      desc: `Join me for ${formData.gameMode}`,
      game: formData.game,
      mode: formData.gameMode,
      rank: formData.rank,
      roles: [],
      requiredRoles: [
        { role: 'Leader', status: 'filled', player: 'Meelike God', avatar: 'Felix', ready: true, isLeader: true, isMe: true },
        ...Array.from({ length: formData.neededPlayers }).map(() => ({
          role: formData.role || 'Member',
          status: 'open',
          ready: false,
          isLeader: false,
          isMe: false
        }))
      ],
      currentPlayers: 1,
      maxPlayers: 1 + formData.neededPlayers,
      mic: formData.voiceOption !== 'no-voice',
      leader: 'Meelike God',
      leaderRep: 100,
      leaderAvatar: 'Felix',
      tags: [formData.mood || 'Fun'],
      time: 'Now',
      voiceChat: formData.voiceOption === 'discord' ? { type: 'discord', link: 'https://discord.gg/mock-link' } : undefined
    };

    updateParty(newParty);
    closeCreateModal();
    // alert('สร้างห้องปาร์ตี้สำเร็จ!');
  };

  return (
    <AnimatePresence>
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCreateModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl z-10 pointer-events-none" // wrapper is pointer-events-none to let clicks pass to backdrop if outside
          >
             <div className="pointer-events-auto"> {/* content is pointer-events-auto */}
                <CreateLFGSession 
                  onCancel={closeCreateModal}
                  onSessionCreated={handleSessionCreated}
                  initialData={createModalInitialData}
                />
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

