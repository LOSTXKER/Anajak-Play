import type { ReactNode } from 'react';

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
  icon?: ReactNode;
  status: 'open' | 'filled';
  player?: string;
  avatar?: string;
  ready?: boolean;
  isLeader?: boolean;
  isMe?: boolean;
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
  voiceChat?: {
    type: 'discord';
    link: string;
  }; // Discord Voice Chat Link
  timeSlot?: 'morning' | 'afternoon' | 'evening' | 'late';
  languages?: string[];
  playstyle?: 'chill' | 'tryhard' | 'fun' | 'sweaty';
  toxicTolerance?: 'zero' | 'low' | 'medium';
  neededPlayers?: number;
  personalityTag?: string;
  urgency?: 'now' | 'soon' | 'later';
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
  icon: ReactNode;
  color: string;
}

export type FilterInputType = 'pill' | 'select' | 'multiselect' | 'toggle';

export interface FilterOption {
  label: string;
  value: string;
  description?: string;
  accent?: string;
  emoji?: string;
}

export interface FilterDefinition {
  id: string;
  label: string;
  type: FilterInputType;
  helperText?: string;
  options?: FilterOption[];
  defaultValue?: string | string[] | boolean;
  placeholder?: string;
}

export interface GameFilterConfig {
  key: string;
  label: string;
  basic: FilterDefinition[];
  advanced: FilterDefinition[];
}

export interface PersonalityInsight {
  id: string;
  label: string;
  value: string;
  description: string;
  badge?: string;
  score?: number;
  trend?: 'up' | 'down';
}

export interface MatchAlert {
  id: string;
  game: string;
  roleNeeded: string;
  rankRange: string;
  time: string;
  compatibility: number;
  message: string;
  vibe: string;
  micRequired: boolean;
}
