import { FilterDefinition, GameFilterConfig, PersonalityInsight } from './types';

export const globalFilters: FilterDefinition[] = [
  {
    id: 'playtime',
    label: 'เวลาเล่น',
    type: 'pill',
    options: [
      { label: 'เช้า', value: 'morning' },
      { label: 'บ่าย', value: 'afternoon' },
      { label: 'หัวค่ำ', value: 'evening' },
      { label: 'ดึก', value: 'late' },
    ],
  },
  {
    id: 'language',
    label: 'ภาษา',
    type: 'pill',
    options: [
      { label: 'ไทย', value: 'th' },
      { label: 'อังกฤษ', value: 'en' },
      { label: 'ไทย + อังกฤษ', value: 'mix' },
    ],
  },
  {
    id: 'mic',
    label: 'ไมค์',
    type: 'pill',
    options: [
      { label: 'Mic ON', value: 'mic-on' },
      { label: 'Mic Optional', value: 'mic-optional' },
      { label: 'Text Only', value: 'text-only' },
    ],
  },
  {
    id: 'toxic',
    label: 'ระดับ Toxic ที่รับได้',
    type: 'pill',
    options: [
      { label: '0%', value: 'zero' },
      { label: 'Low', value: 'low' },
      { label: 'Medium', value: 'medium' },
    ],
  },
  {
    id: 'playstyle',
    label: 'Playstyle',
    type: 'pill',
    defaultValue: ['chill'],
    options: [
      { label: 'Chill', value: 'chill' },
      { label: 'Tryhard', value: 'tryhard' },
      { label: 'Fun', value: 'fun' },
      { label: 'Sweaty', value: 'sweaty' },
    ],
  },
  {
    id: 'needed',
    label: 'ต้องการกี่คน',
    type: 'pill',
    options: [
      { label: '1 คน', value: '1' },
      { label: '2 คน', value: '2' },
      { label: 'Full Party', value: 'full' },
    ],
  },
];

export const gameFilterConfig: Record<string, GameFilterConfig> = {
  rov: {
    key: 'rov',
    label: 'RoV / LOL / Dota 2',
    basic: [
      {
        id: 'lane',
        label: 'เลนที่ต้องการ',
        type: 'pill',
        options: [
          { label: 'Mid', value: 'Mid' },
          { label: 'Jungle', value: 'Jungle' },
          { label: 'Offlane', value: 'Offlane' },
          { label: 'Support/Roam', value: 'Support' },
          { label: 'Carry', value: 'Carry' },
        ],
      },
      {
        id: 'rank',
        label: 'แรงค์',
        type: 'pill',
        options: [
          { label: 'Gold', value: 'Gold' },
          { label: 'Platinum', value: 'Platinum' },
          { label: 'Diamond', value: 'Diamond' },
          { label: 'Conqueror', value: 'Conqueror' },
        ],
      },
    ],
    advanced: [
      {
        id: 'heroPool',
        label: 'Hero Pool',
        type: 'multiselect',
        helperText: 'เลือกฮีโร่ที่คุณถนัด',
        options: [
          { label: 'Assassin', value: 'assassin' },
          { label: 'Mage', value: 'mage' },
          { label: 'Marksman', value: 'marksman' },
          { label: 'Tank', value: 'tank' },
        ],
      },
      {
        id: 'mmr',
        label: 'MMR ขั้นต่ำ',
        type: 'pill',
        options: [
          { label: '1800+', value: '1800' },
          { label: '2000+', value: '2000' },
          { label: '2200+', value: '2200' },
        ],
      },
    ],
  },
  valorant: {
    key: 'valorant',
    label: 'Valorant / CS2 / Overwatch',
    basic: [
      {
        id: 'role',
        label: 'Role',
        type: 'pill',
        options: [
          { label: 'Duelist', value: 'Duelist' },
          { label: 'Controller', value: 'Controller' },
          { label: 'Initiator', value: 'Initiator' },
          { label: 'Sentinel', value: 'Sentinel' },
          { label: 'Flex', value: 'Flex' },
        ],
      },
      {
        id: 'rank',
        label: 'Rank',
        type: 'pill',
        options: [
          { label: 'Iron - Bronze', value: 'Iron' },
          { label: 'Silver - Gold', value: 'Gold' },
          { label: 'Plat - Ascendant', value: 'Ascendant' },
          { label: 'Immortal+', value: 'Immortal' },
        ],
      },
    ],
    advanced: [
      {
        id: 'aimStyle',
        label: 'Aim Style',
        type: 'pill',
        options: [
          { label: 'Flick', value: 'flick' },
          { label: 'Tracking', value: 'tracking' },
          { label: 'Anchor', value: 'anchor' },
        ],
      },
      {
        id: 'agentPool',
        label: 'Agent Pool',
        type: 'multiselect',
        options: [
          { label: 'Jett', value: 'Jett' },
          { label: 'Sova', value: 'Sova' },
          { label: 'Viper', value: 'Viper' },
          { label: 'Skye', value: 'Skye' },
        ],
      },
      {
        id: 'server',
        label: 'Server',
        type: 'pill',
        options: [
          { label: 'Singapore', value: 'sg' },
          { label: 'Tokyo', value: 'tokyo' },
          { label: 'Sydney', value: 'sydney' },
        ],
      },
    ],
  },
  genshin: {
    key: 'genshin',
    label: 'Genshin / Wuthering Waves / Honkai',
    basic: [
      {
        id: 'coopGoal',
        label: 'เป้าหมาย Co-op',
        type: 'pill',
        options: [
          { label: 'World Boss', value: 'world-boss' },
          { label: 'Domain', value: 'domain' },
          { label: 'Weekly', value: 'weekly' },
        ],
      },
      {
        id: 'teamRole',
        label: 'ตำแหน่ง',
        type: 'pill',
        options: [
          { label: 'DPS', value: 'dps' },
          { label: 'Sub DPS', value: 'sub' },
          { label: 'Healer', value: 'healer' },
          { label: 'Support', value: 'support' },
        ],
      },
    ],
    advanced: [
      {
        id: 'element',
        label: 'ธาตุ',
        type: 'multiselect',
        options: [
          { label: 'Pyro', value: 'pyro' },
          { label: 'Electro', value: 'electro' },
          { label: 'Hydro', value: 'hydro' },
          { label: 'Anemo', value: 'anemo' },
        ],
      },
      {
        id: 'build',
        label: 'Artifact Build',
        type: 'pill',
        options: [
          { label: 'Burst', value: 'burst' },
          { label: 'Support', value: 'support-build' },
          { label: 'Healer', value: 'heal-build' },
        ],
      },
    ],
  },
  hunter: {
    key: 'hunter',
    label: 'Monster Hunter / AC6 / Co-op Missions',
    basic: [
      {
        id: 'weapon',
        label: 'อาวุธประจำ',
        type: 'pill',
        options: [
          { label: 'Great Sword', value: 'great-sword' },
          { label: 'Long Sword', value: 'long-sword' },
          { label: 'Bow', value: 'bow' },
          { label: 'Support', value: 'support-weapon' },
        ],
      },
      {
        id: 'mission',
        label: 'ภารกิจ',
        type: 'pill',
        options: [
          { label: 'Urgent Quest', value: 'urgent' },
          { label: 'Event', value: 'event' },
          { label: 'Materials Farm', value: 'farm' },
        ],
      },
    ],
    advanced: [
      {
        id: 'hunterRank',
        label: 'Hunter Rank',
        type: 'pill',
        options: [
          { label: 'HR 1-50', value: 'hr50' },
          { label: 'HR 50-100', value: 'hr100' },
          { label: 'MR', value: 'mr' },
        ],
      },
      {
        id: 'playlean',
        label: 'สไตล์',
        type: 'pill',
        options: [
          { label: 'ตี', value: 'dps' },
          { label: 'ซัพ', value: 'support' },
        ],
      },
    ],
  },
  mmorpg: {
    key: 'mmorpg',
    label: 'MMORPG (BDO / FFXIV)',
    basic: [
      {
        id: 'class',
        label: 'Class',
        type: 'pill',
        options: [
          { label: 'DPS', value: 'dps' },
          { label: 'Tank', value: 'tank' },
          { label: 'Healer', value: 'healer' },
        ],
      },
      {
        id: 'focus',
        label: 'โฟกัส',
        type: 'pill',
        options: [
          { label: 'PvE', value: 'pve' },
          { label: 'PvP', value: 'pvp' },
          { label: 'Guild War', value: 'gvg' },
        ],
      },
    ],
    advanced: [
      {
        id: 'gearScore',
        label: 'Gear Score / iLvl',
        type: 'pill',
        options: [
          { label: 'เริ่มต้น', value: 'start' },
          { label: 'Mid', value: 'mid' },
          { label: 'End Game', value: 'end' },
        ],
      },
      {
        id: 'schedule',
        label: 'เวลาลงดัน',
        type: 'pill',
        options: [
          { label: 'Weekday', value: 'weekday' },
          { label: 'Weekend', value: 'weekend' },
          { label: 'Flex', value: 'flex' },
        ],
      },
    ],
  },
};

export const gameFilterOptions = Object.keys(gameFilterConfig).map((key) => ({
  key,
  label: gameFilterConfig[key].label,
}));

export const defaultGameKey = 'rov';

export const aiPersonalityInsights: PersonalityInsight[] = [
  {
    id: 'vibe',
    label: 'สไตล์การคุย',
    value: 'Shotcaller สนุก แต่ไม่ toxic',
    description: 'AI วิเคราะห์จากรีวิว 42 คน บอกว่าคุณคุมเกมได้ดีและเข้ากับคนง่าย',
    badge: 'AI MATCH 92%'
  },
  {
    id: 'session',
    label: 'ชอบเล่นยาวแค่ไหน',
    value: '1.5 - 3 ชั่วโมง',
    description: 'ส่วนใหญ่จบ session ภายใน 2 เกม ช่วง 19:00 - 00:00',
  },
  {
    id: 'toxicity',
    label: 'Toxic Tendency',
    value: 'ต่ำมาก',
    description: 'ไม่มีรีวิว negative ใน 20 เกมล่าสุด คะแนนชื่อเสียง 4.8/5',
    badge: 'สุดจะสุภาพ'
  },
  {
    id: 'synergy',
    label: 'Synergy ที่เข้ากัน',
    value: 'Support main / Chill tryhard',
    description: 'เปอร์เซ็นต์ชนะกับ Duo แนวนี้ 78%',
  },
];
