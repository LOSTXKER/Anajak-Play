// Mock Data Types
export interface Game {
  id: number;
  name: string;
  icon: string;
  active: boolean;
  roles: string[];
}

export interface TinderProfile {
  id: number;
  name: string;
  age: number;
  game: string;
  rank: string;
  avatar: string;
  bio: string;
  tags: string[];
  verified: boolean;
}

export interface Notification {
  id: number;
  type: 'invite' | 'system' | 'money' | 'friend';
  text: string;
  time: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  reputation: number;
  wallet: number;
  joined: string;
  badges: string[];
  stats: {
    matches: number;
    winRate: string;
    mvp: number;
  };
  games: {
    name: string;
    rank: string;
    roles: string[];
    active: boolean;
  }[];
}

export interface RoleSlot {
  role: string;
  icon?: React.ReactNode;
  status: 'open' | 'filled';
  player?: string;
  avatar?: string;
  ready?: boolean;
  isLeader?: boolean;
  isMe?: boolean;
}

export interface Spectator {
  id: string;
  name: string;
  avatar: string;
  status: 'watching' | 'waiting-to-play'; // watching = ดูอย่างเดียว, waiting-to-play = รอเข้าเล่น
  requestedRole?: string; // Role ที่ขอเข้าเล่น
}

export interface Party {
  id: number;
  title: string;
  desc: string;
  game: string;
  mode: string;
  rank: string;
  roles: string[];
  requiredRoles: RoleSlot[];
  currentPlayers: number;
  maxPlayers: number;
  mic: boolean;
  leader: string;
  leaderRep: number;
  leaderAvatar: string;
  tags: string[];
  time: string;
  spectators?: Spectator[]; // รายชื่อผู้ชม
  voiceChat?: {
    type: 'discord';
    link: string;
  }; // Discord Voice Chat Link
}

export interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

export interface MarketplaceListing {
  id: number;
  category: 'hire' | 'coach' | 'item' | 'id';
  game: string;
  title: string;
  price: number;
  unit: string;
  seller: string;
  sellerRep: number;
  sellerVerified: boolean;
  image: string;
  tags: string[];
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}
