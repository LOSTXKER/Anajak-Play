'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Party, Spectator } from './types';

interface PartyContextType {
  activeParty: Party | null;
  myRole: string | null; // Role ที่เราเล่น (ถ้าเป็น Player)
  isSpectator: boolean; // เราเป็น Spectator หรือเปล่า
  joinParty: (party: Party) => void;
  leaveParty: () => void;
  requestToJoinGame: (role: string) => void; // ขอเข้าเล่น
  approvePlayer: (spectatorId: string) => void; // Leader อนุมัติ
  kickPlayer: (role: string) => void; // Leader kick คน
  toggleReady: () => void; // กด Ready/Unready
  updateParty: (updatedParty: Party) => void; // อัปเดต Party state
}

const PartyContext = createContext<PartyContextType | undefined>(undefined);

export function PartyProvider({ children }: { children: ReactNode }) {
  const [activeParty, setActiveParty] = useState<Party | null>(null);
  const [myRole, setMyRole] = useState<string | null>(null);
  const [isSpectator, setIsSpectator] = useState<boolean>(true);

  const joinParty = (party: Party) => {
    // เข้าห้องเป็น Spectator ก่อนเสมอ
    setActiveParty(party);
    setIsSpectator(true);
    setMyRole(null);
  };

  const leaveParty = () => {
    setActiveParty(null);
    setMyRole(null);
    setIsSpectator(true);
  };

  const requestToJoinGame = (role: string) => {
    if (!activeParty) return;

    // เพิ่มตัวเองเป็น Spectator ที่รอเข้าเล่น
    const newSpectator: Spectator = {
      id: 'me',
      name: 'Meelike God',
      avatar: 'Felix',
      status: 'waiting-to-play',
      requestedRole: role
    };

    const updatedParty = {
      ...activeParty,
      spectators: [...(activeParty.spectators || []), newSpectator]
    };

    setActiveParty(updatedParty);
  };

  const approvePlayer = (spectatorId: string) => {
    if (!activeParty) return;

    // หา Spectator ที่จะอนุมัติ
    const spectator = activeParty.spectators?.find(s => s.id === spectatorId);
    if (!spectator || spectator.status !== 'waiting-to-play') return;

    // หา Slot ที่ว่าง
    const roleSlotIndex = activeParty.requiredRoles.findIndex(
      slot => slot.status === 'open' && 
      (slot.role === spectator.requestedRole || spectator.requestedRole === 'Any')
    );

    if (roleSlotIndex === -1) return;

    // อัปเดต Slot
    const updatedRoles = [...activeParty.requiredRoles];
    updatedRoles[roleSlotIndex] = {
      ...updatedRoles[roleSlotIndex],
      status: 'filled',
      player: spectator.name,
      avatar: spectator.avatar,
      ready: false,
      isMe: spectatorId === 'me'
    };

    // ลบออกจาก Spectators
    const updatedSpectators = activeParty.spectators?.filter(s => s.id !== spectatorId) || [];

    const updatedParty = {
      ...activeParty,
      requiredRoles: updatedRoles,
      spectators: updatedSpectators,
      currentPlayers: activeParty.currentPlayers + 1
    };

    setActiveParty(updatedParty);

    // ถ้าเป็นตัวเอง → เปลี่ยนสถานะ
    if (spectatorId === 'me') {
      setIsSpectator(false);
      setMyRole(updatedRoles[roleSlotIndex].role);
    }
  };

  const kickPlayer = (role: string) => {
    if (!activeParty) return;

    const roleSlotIndex = activeParty.requiredRoles.findIndex(
      slot => slot.role === role && slot.status === 'filled'
    );

    if (roleSlotIndex === -1) return;

    const updatedRoles = [...activeParty.requiredRoles];
    const kickedPlayer = updatedRoles[roleSlotIndex];

    // Reset slot
    updatedRoles[roleSlotIndex] = {
      role: role,
      status: 'open'
    };

    const updatedParty = {
      ...activeParty,
      requiredRoles: updatedRoles,
      currentPlayers: activeParty.currentPlayers - 1
    };

    setActiveParty(updatedParty);

    // ถ้า kick ตัวเอง → กลับเป็น Spectator
    if (kickedPlayer.isMe) {
      setIsSpectator(true);
      setMyRole(null);
    }
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
      isSpectator,
      joinParty, 
      leaveParty,
      requestToJoinGame,
      approvePlayer,
      kickPlayer,
      toggleReady,
      updateParty
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
