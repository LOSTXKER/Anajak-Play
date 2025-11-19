'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Party } from './types';

interface PartyContextType {
  activeParty: Party | null;
  myRole: string | null;
  joinParty: (party: Party, selectedRole: string) => void;
  leaveParty: () => void;
  toggleReady: () => void;
  updateParty: (updatedParty: Party) => void;
  isCreateModalOpen: boolean;
  openCreateModal: (initialData?: any) => void;
  closeCreateModal: () => void;
  createModalInitialData: any;
}

const PartyContext = createContext<PartyContextType | undefined>(undefined);

export function PartyProvider({ children }: { children: ReactNode }) {
  const [activeParty, setActiveParty] = useState<Party | null>(null);
  const [myRole, setMyRole] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createModalInitialData, setCreateModalInitialData] = useState<any>(null);

  const openCreateModal = (initialData?: any) => {
    setCreateModalInitialData(initialData || null);
    setIsCreateModalOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateModalInitialData(null);
  };

  const joinParty = (party: Party, selectedRole: string) => {
    // หา slot ที่เลือก
    const roleSlotIndex = party.requiredRoles.findIndex(
      slot => slot.role === selectedRole && slot.status === 'open'
    );

    if (roleSlotIndex === -1) {
      alert('ตำแหน่งนี้ถูกจองแล้ว!');
      return;
    }

    // อัปเดต slot
    const updatedRoles = [...party.requiredRoles];
    updatedRoles[roleSlotIndex] = {
      ...updatedRoles[roleSlotIndex],
      status: 'filled',
      player: 'Meelike God',
      avatar: 'Felix',
      ready: false,
      isMe: true
    };

    const updatedParty = {
      ...party,
      requiredRoles: updatedRoles,
      currentPlayers: party.currentPlayers + 1
    };

    setActiveParty(updatedParty);
    setMyRole(selectedRole);
  };

  const leaveParty = () => {
    setActiveParty(null);
    setMyRole(null);
  };

  const toggleReady = () => {
    if (!activeParty || !myRole) return;

    const roleSlotIndex = activeParty.requiredRoles.findIndex(
      slot => slot.role === myRole && slot.isMe
    );

    if (roleSlotIndex === -1) return;

    const updatedRoles = [...activeParty.requiredRoles];
    updatedRoles[roleSlotIndex] = {
      ...updatedRoles[roleSlotIndex],
      ready: !updatedRoles[roleSlotIndex].ready
    };

    setActiveParty({
      ...activeParty,
      requiredRoles: updatedRoles
    });
  };

  const updateParty = (updatedParty: Party) => {
    setActiveParty(updatedParty);
  };

  return (
    <PartyContext.Provider value={{ 
      activeParty, 
      myRole,
      joinParty, 
      leaveParty,
      toggleReady,
      updateParty,
      isCreateModalOpen,
      createModalInitialData,
      openCreateModal,
      closeCreateModal
    }}>
      {children}
    </PartyContext.Provider>
  );
}

export function useParty() {
  const context = useContext(PartyContext);
  if (context === undefined) {
    throw new Error('useParty must be used within a PartyProvider');
  }
  return context;
}
