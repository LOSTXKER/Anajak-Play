/**
 * Filter Configuration for LFG System
 * Defines available filters for games and global settings
 */

export type FilterOption = {
  value: string;
  label: string;
};

export type Filter = {
  id: string;
  label: string;
  options?: FilterOption[];
  defaultValue?: string | string[];
};

export type GameFilterConfig = {
  key: string;
  label: string;
  basic: Filter[];
  advanced: Filter[];
};

// Global filters that apply to all games
export const globalFilters: Filter[] = [
  {
    id: 'playtime',
    label: 'เวลาที่เล่น',
    options: [
      { value: 'morning', label: 'เช้า (6-12)' },
      { value: 'afternoon', label: 'บ่าย (12-18)' },
      { value: 'evening', label: 'เย็น (18-24)' },
      { value: 'night', label: 'ดึก (00-06)' },
    ],
    defaultValue: ['evening'],
  },
  {
    id: 'language',
    label: 'ภาษา',
    options: [
      { value: 'th', label: 'ไทย' },
      { value: 'en', label: 'English' },
    ],
    defaultValue: ['th'],
  },
  {
    id: 'playstyle',
    label: 'Playstyle',
    options: [
      { value: 'tryhard', label: 'Tryhard' },
      { value: 'chill', label: 'Chill' },
      { value: 'fun', label: 'Fun' },
      { value: 'competitive', label: 'Competitive' },
    ],
    defaultValue: ['chill'],
  },
  {
    id: 'mic',
    label: 'ไมค์',
    options: [
      { value: 'required', label: 'ต้องมี' },
      { value: 'optional', label: 'ไม่บังคับ' },
    ],
    defaultValue: 'required',
  },
];

// Game-specific filter configurations
export const gameFilterConfig: Record<string, GameFilterConfig> = {
  rov: {
    key: 'rov',
    label: 'RoV',
    basic: [
      {
        id: 'role',
        label: 'Role',
        options: [
          { value: 'jungle', label: 'Jungle' },
          { value: 'carry', label: 'Carry' },
          { value: 'mid', label: 'Mid' },
          { value: 'support', label: 'Support' },
          { value: 'tank', label: 'Tank' },
        ],
      },
      {
        id: 'rank',
        label: 'Rank',
        options: [
          { value: 'bronze', label: 'Bronze' },
          { value: 'silver', label: 'Silver' },
          { value: 'gold', label: 'Gold' },
          { value: 'platinum', label: 'Platinum' },
          { value: 'diamond', label: 'Diamond' },
          { value: 'master', label: 'Master' },
          { value: 'conqueror', label: 'Conqueror' },
        ],
      },
    ],
    advanced: [
      {
        id: 'hero_type',
        label: 'ประเภทฮีโร่',
        options: [
          { value: 'assassin', label: 'Assassin' },
          { value: 'warrior', label: 'Warrior' },
          { value: 'mage', label: 'Mage' },
          { value: 'marksman', label: 'Marksman' },
          { value: 'support', label: 'Support' },
          { value: 'tank', label: 'Tank' },
        ],
      },
    ],
  },
  valorant: {
    key: 'valorant',
    label: 'Valorant',
    basic: [
      {
        id: 'role',
        label: 'Agent Role',
        options: [
          { value: 'duelist', label: 'Duelist' },
          { value: 'controller', label: 'Controller' },
          { value: 'initiator', label: 'Initiator' },
          { value: 'sentinel', label: 'Sentinel' },
        ],
      },
      {
        id: 'rank',
        label: 'Rank',
        options: [
          { value: 'iron', label: 'Iron' },
          { value: 'bronze', label: 'Bronze' },
          { value: 'silver', label: 'Silver' },
          { value: 'gold', label: 'Gold' },
          { value: 'platinum', label: 'Platinum' },
          { value: 'diamond', label: 'Diamond' },
          { value: 'ascendant', label: 'Ascendant' },
          { value: 'immortal', label: 'Immortal' },
          { value: 'radiant', label: 'Radiant' },
        ],
      },
    ],
    advanced: [
      {
        id: 'playstyle',
        label: 'Playstyle',
        options: [
          { value: 'aggressive', label: 'Aggressive' },
          { value: 'defensive', label: 'Defensive' },
          { value: 'lurker', label: 'Lurker' },
          { value: 'entry', label: 'Entry Fragger' },
        ],
      },
    ],
  },
  mlbb: {
    key: 'mlbb',
    label: 'Mobile Legends',
    basic: [
      {
        id: 'role',
        label: 'Role',
        options: [
          { value: 'tank', label: 'Tank' },
          { value: 'fighter', label: 'Fighter' },
          { value: 'assassin', label: 'Assassin' },
          { value: 'mage', label: 'Mage' },
          { value: 'marksman', label: 'Marksman' },
          { value: 'support', label: 'Support' },
        ],
      },
      {
        id: 'rank',
        label: 'Rank',
        options: [
          { value: 'warrior', label: 'Warrior' },
          { value: 'elite', label: 'Elite' },
          { value: 'master', label: 'Master' },
          { value: 'grandmaster', label: 'Grandmaster' },
          { value: 'epic', label: 'Epic' },
          { value: 'legend', label: 'Legend' },
          { value: 'mythic', label: 'Mythic' },
        ],
      },
    ],
    advanced: [],
  },
  genshin: {
    key: 'genshin',
    label: 'Genshin Impact',
    basic: [
      {
        id: 'class',
        label: 'Role',
        options: [
          { value: 'dps', label: 'Main DPS' },
          { value: 'sub-dps', label: 'Sub DPS' },
          { value: 'support', label: 'Support' },
          { value: 'healer', label: 'Healer' },
        ],
      },
      {
        id: 'ar',
        label: 'AR Level',
        options: [
          { value: 'ar20', label: 'AR 20-35' },
          { value: 'ar35', label: 'AR 35-45' },
          { value: 'ar45', label: 'AR 45-55' },
          { value: 'ar55', label: 'AR 55+' },
        ],
      },
    ],
    advanced: [
      {
        id: 'element',
        label: 'Element',
        options: [
          { value: 'pyro', label: 'Pyro' },
          { value: 'hydro', label: 'Hydro' },
          { value: 'electro', label: 'Electro' },
          { value: 'cryo', label: 'Cryo' },
          { value: 'anemo', label: 'Anemo' },
          { value: 'geo', label: 'Geo' },
          { value: 'dendro', label: 'Dendro' },
        ],
      },
    ],
  },
};

// Game options for selector
export const gameFilterOptions = Object.values(gameFilterConfig).map((config) => ({
  key: config.key,
  label: config.label,
}));

// Default game
export const defaultGameKey = 'rov';

// AI Personality insights (for display purposes)
export const aiPersonalityInsights = [
  { id: '1', label: 'Compatibility Score', value: '85% ตรงกับคนที่เล่นช่วงเย็น' },
  { id: '2', label: 'Playstyle Match', value: 'Chill & Fun - เหมาะกับคนไม่หัวร้อน' },
  { id: '3', label: 'Communication', value: 'Thai + Voice Chat' },
];
