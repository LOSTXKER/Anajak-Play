/**
 * Legacy Data Compatibility Layer
 * Maps old mock data structure to new structure
 */

import { mockUsers, gameConfig } from './mock-data';
import { User } from '../types/index';

// Export legacy game structure for components that still use it
export const games = [
  { id: 1, name: 'RoV', icon: '⚔️', active: true, roles: ['Carry', 'Support', 'Mage', 'Fighter', 'Jungle', 'Any'] },
  { id: 2, name: 'Valorant', icon: '🔫', active: false, roles: ['Duelist', 'Controller', 'Initiator', 'Sentinel', 'Any'] },
  { id: 3, name: 'Free Fire', icon: '🔥', active: false, roles: ['Rusher', 'Sniper', 'Support', 'IGL', 'Any'] },
  { id: 4, name: 'Genshin', icon: '✨', active: false, roles: ['DPS', 'Sub-DPS', 'Support', 'Healer', 'Any'] },
  { id: 5, name: 'PUBG', icon: '🪂', active: false, roles: ['Fragger', 'Sniper', 'Support', 'Scout', 'Any'] },
];

// Export legacy user profile for components that still use it
export const userProfileData = {
  name: mockUsers[0].displayName,
  username: '@' + mockUsers[0].username,
  avatar: mockUsers[0].username,
  bio: mockUsers[0].profile.bio || 'เล่นจริงจังครับ',
  reputation: mockUsers[0].reputation.overall / 20, // Convert 0-100 to 0-5
  wallet: 1250,
  joined: 'July 2025',
  badges: ['Verified', 'Pro Player', 'Friendly'],
  stats: {
    matches: mockUsers[0].profile.totalSessions,
    winRate: Math.floor((mockUsers[0].profile.completedSessions / mockUsers[0].profile.totalSessions) * 100) + '%',
    mvp: 35
  },
  games: mockUsers[0].profile.mainGames.map(g => {
    const config = gameConfig[g.game as keyof typeof gameConfig];
    return {
      name: config ? config.name : 'Unknown',
      rank: g.rank.charAt(0).toUpperCase() + g.rank.slice(1),
      roles: g.role.map(r => r.charAt(0).toUpperCase() + r.slice(1)),
      active: g.isMain
    };
  })
};

// Export legacy tinder profiles
export const tinderProfiles = [
  {
    id: 1,
    name: mockUsers[1].displayName,
    age: 22,
    game: "RoV",
    rank: "Conqueror",
    avatar: mockUsers[1].username,
    bio: mockUsers[1].profile.bio || 'หาเพื่อนเล่นครับ',
    tags: mockUsers[1].profile.playstyle.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    verified: true
  },
  {
    id: 2,
    name: mockUsers[2].displayName,
    age: 24,
    game: "Valorant",
    rank: "Ascendant",
    avatar: mockUsers[2].username,
    bio: mockUsers[2].profile.bio || 'หาตี้ 5 คนลงแรงค์',
    tags: ['Tryhard', 'Voice Chat', 'Sniper'],
    verified: true
  }
];

// Export legacy notifications
export const notificationsData = [
  { id: 1, type: 'invite' as const, text: "KiraGod ชวนคุณเล่น RoV: Ranked", time: "2m ago", read: false },
  { id: 2, type: 'system' as const, text: "ยินดีต้อนรับสู่ Anajak Play! เริ่มหาตี้ได้เลย", time: "1h ago", read: false },
  { id: 3, type: 'money' as const, text: "เติมเงินสำเร็จ +500 THB", time: "5h ago", read: true },
  { id: 4, type: 'friend' as const, text: "NongMind ส่งคำขอเป็นเพื่อน", time: "1d ago", read: true },
];

// Export legacy party data (to be deprecated)
export const partiesData = [
  // This is now handled by LFGSession in new structure
  // Keeping for backward compatibility only
];

// Export legacy marketplace listings (to be deprecated)
export const marketplaceListings = [
  // This is now handled by MarketplaceListing in new structure
  // Keeping for backward compatibility only
];
