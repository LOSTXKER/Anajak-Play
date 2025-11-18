/**
 * ANAJAK PLAY - CONSTANTS
 * Centralized constants for the application
 */

// ==================== UI CONSTANTS ====================

export const FILTER_TIERS = [
  {
    id: 'global',
    title: 'Global Filters',
    description: 'เวลา ภาษา ไมค์ Playstyle',
    badge: 'ใช้ได้ทุกเกม',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 'game',
    title: 'Game Specific',
    description: 'Role • Mode • Rank',
    badge: 'Auto-load ตามเกม',
    gradient: 'from-purple-500/20 to-indigo-500/20',
  },
  {
    id: 'ai',
    title: 'Personality AI',
    description: 'วิเคราะห์ vibe + toxicity',
    badge: 'Killer Feature',
    gradient: 'from-amber-400/20 to-pink-500/20',
  },
];

export const PLATFORM_FEATURES = [
  {
    icon: '🎯',
    title: 'Match-only System',
    desc: 'ไม่มีห้องโล่ง ระบบจับคู่อัตโนมัติแบบ Grab'
  },
  {
    icon: '🛡️',
    title: 'Reputation ที่แท้จริง',
    desc: 'ทุกคะแนนมาจาก Session จริง ตรวจสอบได้'
  },
  {
    icon: '💰',
    title: 'Marketplace ปลอดภัย',
    desc: 'Escrow + KYC เงินปลอดภัย 100%'
  },
  {
    icon: '💬',
    title: 'Community Active',
    desc: 'Mini-feed ต่อเกม Social Hub เต็มรูปแบบ'
  },
  {
    icon: '🎮',
    title: 'ครบทุกเกม',
    desc: 'ROV • Valorant • MLBB • Genshin และอื่นๆ'
  },
  {
    icon: '✨',
    title: 'ฟีเจอร์พิเศษ',
    desc: 'Tinder Mode • Daily Chest • Achievement'
  }
];

// ==================== GAME CONSTANTS ====================

export const GAME_ICONS = {
  rov: '⚔️',
  valorant: '🔫',
  mlbb: '⚡',
  genshin: '✨',
  pubg: '🪂',
  lol: '🏆',
  apex: '🎯',
  minecraft: '🧱',
} as const;

export const GAME_COLORS = {
  rov: '#FF0000',
  valorant: '#FF4655',
  mlbb: '#4169E1',
  genshin: '#FFA500',
  pubg: '#FF6B35',
  lol: '#0AC8B9',
  apex: '#DA2C38',
  minecraft: '#62C370',
} as const;

// ==================== ROUTES ====================

export const APP_ROUTES = {
  HOME: '/',
  LFG: '/lfg',
  CREATE_REQUEST: '/create-request',
  TINDER: '/tinder',
  MARKETPLACE: '/marketplace',
  PROFILE: '/profile',
  FEED: '/feed',
  PARTY: '/lfg',
  MESSAGES: '/messages',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  WALLET: '/wallet',
} as const;

// ==================== REPUTATION ====================

export const REPUTATION_TIERS = {
  TOXIC: { min: 0, max: 20, label: 'Toxic', color: 'red' },
  POOR: { min: 21, max: 40, label: 'Poor', color: 'orange' },
  FAIR: { min: 41, max: 60, label: 'Fair', color: 'yellow' },
  GOOD: { min: 61, max: 80, label: 'Good', color: 'green' },
  EXCELLENT: { min: 81, max: 95, label: 'Excellent', color: 'blue' },
  LEGENDARY: { min: 96, max: 100, label: 'Legendary', color: 'purple' },
} as const;

// ==================== TIME SLOTS ====================

export const TIME_SLOTS = {
  MORNING: { label: 'เช้า', value: 'morning', hours: '06:00-12:00' },
  AFTERNOON: { label: 'บ่าย', value: 'afternoon', hours: '12:00-18:00' },
  EVENING: { label: 'เย็น', value: 'evening', hours: '18:00-22:00' },
  LATE: { label: 'ดึก', value: 'late', hours: '22:00-06:00' },
} as const;

// ==================== PLAYSTYLES ====================

export const PLAYSTYLES = {
  TRYHARD: { label: 'Tryhard', emoji: '🔥', color: 'red' },
  CASUAL: { label: 'Casual', emoji: '😎', color: 'blue' },
  CHILL: { label: 'Chill', emoji: '🌊', color: 'cyan' },
  FUN: { label: 'Fun', emoji: '🎉', color: 'pink' },
} as const;

// ==================== VOICE OPTIONS ====================

export const VOICE_OPTIONS = [
  { value: 'discord', label: 'Discord', icon: '💬' },
  { value: 'in-game', label: 'In-game Voice', icon: '🎮' },
  { value: 'no-voice', label: 'No Voice', icon: '🔇' },
] as const;

// ==================== MARKETPLACE ====================

export const MARKETPLACE_CATEGORIES = [
  { id: 'hire', name: 'จ้างเล่น', icon: '🎮', color: 'purple' },
  { id: 'coach', name: 'โค้ช', icon: '📚', color: 'blue' },
  { id: 'item', name: 'ไอเท็ม', icon: '💎', color: 'cyan' },
  { id: 'id', name: 'บัญชีเกม', icon: '👤', color: 'green' },
] as const;

// ==================== LIMITS & VALIDATION ====================

export const LIMITS = {
  MAX_SESSION_PLAYERS: 10,
  MIN_SESSION_PLAYERS: 2,
  MAX_BIO_LENGTH: 200,
  MAX_MESSAGE_LENGTH: 500,
  MAX_PARTY_NAME_LENGTH: 100,
  SESSION_EXPIRY_HOURS: 2,
  READY_CHECK_TIMEOUT_SECONDS: 60,
} as const;

// ==================== ANIMATION DURATIONS ====================

export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  CARD_SWIPE: 400,
} as const;

// ==================== API ENDPOINTS (for future use) ====================

export const API_ENDPOINTS = {
  LFG: {
    CREATE: '/api/lfg/create',
    MY_SESSION: '/api/lfg/my-session',
    MATCH_NOTIFICATIONS: '/api/lfg/match-notifications',
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE: '/api/user/update',
  },
  MARKETPLACE: {
    LISTINGS: '/api/marketplace/listings',
    CREATE: '/api/marketplace/create',
  },
} as const;

// ==================== ERROR MESSAGES ====================

export const ERROR_MESSAGES = {
  SESSION_FULL: 'เซสชันนี้มีผู้เล่นครบแล้ว',
  INVALID_ROLE: 'กรุณาเลือก Role ที่ถูกต้อง',
  NETWORK_ERROR: 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
  UNAUTHORIZED: 'กรุณาเข้าสู่ระบบก่อนใช้งานฟีเจอร์นี้',
  NOT_FOUND: 'ไม่พบข้อมูลที่ต้องการ',
} as const;

// ==================== SUCCESS MESSAGES ====================

export const SUCCESS_MESSAGES = {
  SESSION_CREATED: 'สร้างห้องสำเร็จ!',
  SESSION_JOINED: 'เข้าห้องสำเร็จ!',
  PROFILE_UPDATED: 'อัปเดตโปรไฟล์สำเร็จ!',
  REVIEW_SUBMITTED: 'ส่งรีวิวสำเร็จ!',
} as const;
