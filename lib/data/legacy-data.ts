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
  {
    id: 1,
    title: "Ranked ดึงเพชร+ ไมค์เปิด",
    desc: "หาตี้ขึ้นดึง ต้องไมค์เปิด เล่นแนวจริงจัง",
    game: "RoV",
    mode: "Ranked",
    rank: "Diamond+",
    roles: ["Support", "Jungle"],
    requiredRoles: [
      { role: "Carry", status: "filled", player: "SkullKnight", avatar: "skull" },
      { role: "Jungle", status: "open" },
      { role: "Support", status: "open" },
      { role: "Mid", status: "filled", player: "MageGod", avatar: "mage" },
      { role: "Top", status: "filled", player: "TankMaster", avatar: "tank" }
    ],
    currentPlayers: 3,
    maxPlayers: 5,
    mic: true,
    leader: "SkullKnight",
    leaderRep: 4.8,
    leaderAvatar: "skull",
    tags: ["Serious", "Tryhard", "No Toxic"],
    time: "2 นาทีที่แล้ว",
    voiceChat: { type: 'discord', link: 'https://discord.gg/example1' },
    timeSlot: "evening",
    languages: ["TH"],
    playstyle: "tryhard",
    toxicTolerance: "zero",
    urgency: "now"
  },
  {
    id: 2,
    title: "ปาร์ตี้สบายๆ เล่นไปคุยไป 🎮",
    desc: "หาเพื่อนเล่นสนุกๆ ไม่ด่า ไม่เครียด",
    game: "Valorant",
    mode: "Unrated",
    rank: "Silver - Gold",
    roles: ["Any"],
    requiredRoles: [
      { role: "Duelist", status: "filled", player: "JettMain", avatar: "jett" },
      { role: "Controller", status: "filled", player: "OmenPro", avatar: "omen" },
      { role: "Any", status: "open" },
      { role: "Any", status: "open" }
    ],
    currentPlayers: 2,
    maxPlayers: 4,
    mic: false,
    leader: "JettMain",
    leaderRep: 4.5,
    leaderAvatar: "jett",
    tags: ["Chill", "Fun", "Newbie Welcome"],
    time: "5 นาทีที่แล้ว",
    timeSlot: "evening",
    languages: ["TH", "EN"],
    playstyle: "chill",
    toxicTolerance: "medium",
    urgency: "soon"
  },
  {
    id: 3,
    title: "🔥 Push Conqueror ด่วน!",
    desc: "รับแค่ Conqueror+ เท่านั้น ไม่มีไมค์ไม่รับ",
    game: "RoV",
    mode: "Ranked",
    rank: "Conqueror",
    roles: ["Carry"],
    requiredRoles: [
      { role: "Carry", status: "open" },
      { role: "Support", status: "filled", player: "HealMaster", avatar: "healer", isLeader: true },
      { role: "Jungle", status: "filled", player: "JungleKing", avatar: "jungle" },
      { role: "Mid", status: "filled", player: "MageLord", avatar: "mage2" },
      { role: "Top", status: "filled", player: "TankGod", avatar: "tank2" }
    ],
    currentPlayers: 4,
    maxPlayers: 5,
    mic: true,
    leader: "HealMaster",
    leaderRep: 5.0,
    leaderAvatar: "healer",
    tags: ["Experienced", "Discord Voice", "High Rank"],
    time: "เมื่อสักครู่",
    voiceChat: { type: 'discord', link: 'https://discord.gg/example3' },
    timeSlot: "evening",
    languages: ["TH"],
    playstyle: "sweaty",
    toxicTolerance: "zero",
    neededPlayers: 1,
    urgency: "now"
  },
  {
    id: 4,
    title: "🎯 Duo Queue ลงแรงค์ Plat+",
    desc: "หา 1 คน Support หรือ Tank มาดูโอคิว",
    game: "RoV",
    mode: "Ranked Duo",
    rank: "Platinum+",
    roles: ["Support", "Tank"],
    requiredRoles: [
      { role: "ADC", status: "filled", player: "SharpShooter", avatar: "adc", isLeader: true },
      { role: "Support/Tank", status: "open" }
    ],
    currentPlayers: 1,
    maxPlayers: 2,
    mic: true,
    leader: "SharpShooter",
    leaderRep: 4.7,
    leaderAvatar: "adc",
    tags: ["Duo", "Voice Req", "Experienced"],
    time: "10 นาทีที่แล้ว",
    voiceChat: { type: 'discord', link: 'https://discord.gg/example4' },
    timeSlot: "evening",
    languages: ["TH"],
    playstyle: "tryhard",
    toxicTolerance: "low",
    neededPlayers: 1,
    personalityTag: "มุ่งมั่น รักทีม",
    urgency: "soon"
  }
];

// Export legacy marketplace listings (to be deprecated)
export const marketplaceListings = [
  // This is now handled by MarketplaceListing in new structure
  // Keeping for backward compatibility only
];
