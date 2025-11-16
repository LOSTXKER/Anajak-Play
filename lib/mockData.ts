import { 
  Game, 
  TinderProfile, 
  Notification, 
  UserProfile, 
  Party,
  ChatMessage,
  MarketplaceListing
} from './types';
import { Swords, Shield, Zap, Crosshair, Users, Star } from 'lucide-react';

export const games: Game[] = [
  { id: 1, name: 'RoV', icon: '⚔️', active: true, roles: ['Carry', 'Support', 'Mage', 'Fighter', 'Jungle', 'Any'] },
  { id: 2, name: 'Valorant', icon: '🔫', active: false, roles: ['Duelist', 'Controller', 'Initiator', 'Sentinel', 'Any'] },
  { id: 3, name: 'Free Fire', icon: '🔥', active: false, roles: ['Rusher', 'Sniper', 'Support', 'IGL', 'Any'] },
  { id: 4, name: 'Genshin', icon: '✨', active: false, roles: ['DPS', 'Sub-DPS', 'Support', 'Healer', 'Any'] },
  { id: 5, name: 'PUBG', icon: '🪂', active: false, roles: ['Fragger', 'Sniper', 'Support', 'Scout', 'Any'] },
];

export const tinderProfiles: TinderProfile[] = [
  {
    id: 1,
    name: "NongMind",
    age: 22,
    game: "RoV",
    rank: "Conqueror",
    avatar: "NongMind",
    bio: "เมน Alice สายแทงค์ครับ 🛡️ ไม่หัวร้อน เล่นเอาฮาแต่ถ้าจริงจังก็แบกได้ หาเพื่อนดูโอ้ครับ",
    tags: ["Support Main", "Chill", "Night Owl"],
    verified: true
  },
  {
    id: 2,
    name: "KillerQueen",
    age: 24,
    game: "Valorant",
    rank: "Ascendant",
    avatar: "KillerQueen",
    bio: "หาตี้ 5 คนลงแรงค์ ขอคนมี mic สื่อสารงานดี ไม่ toxic ยิงคมๆ ทักมา!",
    tags: ["Tryhard", "Voice Chat", "Sniper"],
    verified: false
  },
  {
    id: 3,
    name: "Luci_fer",
    age: 19,
    game: "Genshin",
    rank: "AR 60",
    avatar: "Luci_fer",
    bio: "ช่วยแบกบอสได้ครับ ว่างช่วงดึกๆ ใครฟาร์ม relic ไม่ไหวบอกผม",
    tags: ["Carry", "Helper", "PvE"],
    verified: true
  },
  {
    id: 4,
    name: "KiraGod",
    age: 21,
    game: "RoV",
    rank: "Glorious Ruler",
    avatar: "KiraGod",
    bio: "Jungle No.1 เซิฟ (ในฝัน) 🤣 หาซัพรู้ใจเดินเกมด้วยกันครับ",
    tags: ["Jungle", "Ranked", "Pro"],
    verified: true
  }
];

export const notificationsData: Notification[] = [
  { id: 1, type: 'invite', text: "KiraGod ชวนคุณเล่น RoV: Ranked", time: "2m ago", read: false },
  { id: 2, type: 'system', text: "ยินดีต้อนรับสู่ Anajak Play! เริ่มหาตี้ได้เลย", time: "1h ago", read: false },
  { id: 3, type: 'money', text: "เติมเงินสำเร็จ +500 THB", time: "5h ago", read: true },
  { id: 4, type: 'friend', text: "NongMind ส่งคำขอเป็นเพื่อน", time: "1d ago", read: true },
];

export const userProfileData: UserProfile = {
  name: "Meelike God",
  username: "@meelike_th",
  avatar: "Felix",
  bio: "เล่นจริงจังครับ ไม่หัวร้อน เน้นทีมเวิร์ค ว่างช่วงบ่ายโมงเป็นต้นไป (เจ้าของโรงงานสกรีนเสื้อ ทักได้ครับ)",
  reputation: 4.8,
  wallet: 1250,
  joined: "July 2025",
  badges: ["Verified", "Pro Player", "Friendly"],
  stats: {
    matches: 142,
    winRate: "68%",
    mvp: 35
  },
  games: [
    { name: "RoV", rank: "Conqueror", roles: ["Jungle", "Carry"], active: true },
    { name: "Valorant", rank: "Diamond 2", roles: ["Duelist"], active: false }
  ]
};

export const partiesData: Party[] = [
  {
    id: 101,
    title: "ไต่แรงค์ Conqueror ขอคนงานดี ไม่หัวร้อน",
    desc: "ขอคนเล่นเป็นทีมครับ ไม่เน้นคิล เน้นชนะ ฟังคอลได้ ขาดแครี่กับซัพพอร์ตครับ",
    game: "RoV",
    mode: "Ranked",
    rank: "Commander I+",
    roles: ["Carry", "Support"],
    requiredRoles: [
      { role: "Jungle", status: "filled", player: "KiraGod", avatar: "KiraGod", ready: true, isLeader: true },
      { role: "Carry", status: "open" },
      { role: "Support", status: "open" },
      { role: "Mage", status: "filled", player: "MageGod", avatar: "MageGod", ready: true },
      { role: "Fighter", status: "filled", player: "TopLaner007", avatar: "TopLaner007", ready: false },
    ],
    currentPlayers: 3,
    maxPlayers: 5,
    mic: true,
    leader: "KiraGod",
    leaderRep: 4.9,
    leaderAvatar: "KiraGod",
    tags: ["Serious", "No Toxic"],
    time: "Now",
    voiceChat: {
      type: "discord",
      link: "https://discord.gg/anajak-party-101"
    },
    spectators: [
      { id: "spec1", name: "NongMind", avatar: "NongMind", status: "waiting-to-play", requestedRole: "Support" },
      { id: "spec2", name: "CoachPro", avatar: "CoachPro", status: "watching" }
    ]
  },
  {
    id: 102,
    title: "Valo Chill unrated เล่นขำๆ ฝึกเอเจนท์",
    desc: "เล่นชิลๆ ครับ ใครเพิ่งหัดเล่นมาได้เลย ไม่ซีเรียสแพ้ชนะ",
    game: "Valorant",
    mode: "Unrated",
    rank: "Any",
    roles: ["Any"],
    requiredRoles: [
        { role: "Controller", status: "filled", player: "Smoker", avatar: "Smoker", ready: true, isLeader: true },
        { role: "Any", status: "open" },
        { role: "Any", status: "open" },
        { role: "Any", status: "open" },
        { role: "Duelist", status: "filled", player: "NongMind", avatar: "NongMind", ready: true },
    ],
    currentPlayers: 2,
    maxPlayers: 5,
    mic: false,
    leader: "Smoker",
    leaderRep: 4.5,
    leaderAvatar: "Smoker",
    tags: ["Fun", "Newbie Welcome"],
    time: "2m ago"
  },
  {
    id: 103,
    title: "หาตี้ลงดัน Dragon Nest ตี้ประจำขาด 1",
    desc: "ลง Nest มังกรแดง ขาดพระ (Saint/Inquisitor) ขอของถึงนะครับ",
    game: "MMORPG",
    mode: "Raid",
    rank: "High Gear",
    roles: ["Healer"],
    requiredRoles: [
        { role: "Leader", status: "filled", player: "DragonSlayer", avatar: "DragonSlayer", ready: true, isLeader: true },
        { role: "Healer", status: "open" },
        { role: "DPS", status: "filled", player: "P1", avatar: "P1", ready: true },
        { role: "DPS", status: "filled", player: "P2", avatar: "P2", ready: true },
        { role: "Tank", status: "filled", player: "P3", avatar: "P3", ready: true },
        { role: "DPS", status: "filled", player: "P4", avatar: "P4", ready: true },
        { role: "DPS", status: "filled", player: "P5", avatar: "P5", ready: true },
        { role: "DPS", status: "filled", player: "P6", avatar: "P6", ready: true },
    ],
    currentPlayers: 7,
    maxPlayers: 8,
    mic: true,
    leader: "DragonSlayer",
    leaderRep: 5.0,
    leaderAvatar: "DragonSlayer",
    tags: ["Voice Req", "Experienced"],
    time: "5m ago"
  }
];

export const mockChatMessages: ChatMessage[] = [
  { id: 1, sender: "KiraGod", text: "สวัสดีครับ ขาดอีก 2 คน รอแป๊บนะ", time: "10:30", isMe: false },
  { id: 2, sender: "MageGod", text: "ได้เลยครับ ผมวอร์มนิ้วรอ", time: "10:31", isMe: false },
];

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: 1,
    category: 'hire',
    game: 'RoV',
    title: 'รับงานไต่แรงค์ Commander -> Conqueror เร็ว แรง ทะลุนรก 🔥',
    price: 500,
    unit: 'THB / 5 Stars',
    seller: 'KiraGod',
    sellerRep: 4.9,
    sellerVerified: true,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070',
    tags: ['Fast', 'Solo Queue', 'Live Stream']
  },
  {
    id: 2,
    category: 'coach',
    game: 'Valorant',
    title: 'สอนยิงคม + Lineups Sova ครบทุกด่าน โดย Ascendant 3',
    price: 350,
    unit: 'THB / Hour',
    seller: 'SniperWolf',
    sellerRep: 5.0,
    sellerVerified: true,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=2165',
    tags: ['Voice Chat', 'VOD Review']
  },
  {
    id: 3,
    category: 'item',
    game: 'RoV',
    title: 'Skin Dimension Breaker - Violet (Code)',
    price: 1200,
    unit: 'THB',
    seller: 'ItemShop_TH',
    sellerRep: 4.7,
    sellerVerified: false,
    image: 'https://images.unsplash.com/photo-1612287230217-969d6e5a6308?auto=format&fit=crop&q=80&w=2070',
    tags: ['Instant Delivery', 'Rare']
  },
  {
    id: 4,
    category: 'hire',
    game: 'Genshin',
    title: 'รับเคลียร์เควสรายวัน + ลงดันหา Artifacts',
    price: 100,
    unit: 'THB / Day',
    seller: 'PaimonFan',
    sellerRep: 4.8,
    sellerVerified: true,
    image: 'https://images.unsplash.com/photo-1560930950-5cc20e80e392?auto=format&fit=crop&q=80&w=2070',
    tags: ['Manual', 'Safe']
  },
  {
    id: 5,
    category: 'id',
    game: 'Valorant',
    title: 'ขายไอดีมือเดียว มีสกิน Prime Vandal + Reaver Knife',
    price: 2500,
    unit: 'THB',
    seller: 'ValoTrader',
    sellerRep: 4.5,
    sellerVerified: true,
    image: 'https://images.unsplash.com/photo-1624138784180-fa777496a107?auto=format&fit=crop&q=80&w=2070',
    tags: ['Full Access', 'Email Change']
  },
  {
    id: 6,
    category: 'coach',
    game: 'RoV',
    title: 'โค้ชชิ่งส่วนตัว วิเคราะห์เกมแก้เกม สำหรับทีมแข่ง',
    price: 1500,
    unit: 'THB / Session',
    seller: 'ExProPlayer',
    sellerRep: 5.0,
    sellerVerified: true,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2071',
    tags: ['Team Strategy', 'Macro']
  }
];
