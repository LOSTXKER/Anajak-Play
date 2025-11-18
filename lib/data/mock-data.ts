/**
 * ANAJAK PLAY - MOCK DATA
 * For Prototype Phase - No Database Required
 */

import { 
  User, 
  LFGSession, 
  TinderCard, 
  MarketplaceListing, 
  FeedPost,
  GameId,
  ActivityFeedItem,
  PlatformStats,
  LivePresenceEvent,
  OnlineFriendPresence,
  ReputationOverview
} from '../types/index';

// ==================== MOCK USERS ====================

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'ProGamerTH',
    displayName: 'Pro Gamer TH',
    avatar: '/avatars/avatar-1.jpg',
    level: 25,
    exp: 7500,
    expToNextLevel: 10000,
    reputation: {
      overall: 87,
      tier: 'excellent',
      behavior: 90,
      reliability: 85,
      teamwork: 86,
      totalReviews: 45,
      positiveReviews: 40,
      negativeReviews: 5,
      badges: [
        { id: 'badge-1', type: 'carry', name: 'The Carry', icon: '🔥', earnedAt: new Date() },
        { id: 'badge-2', type: 'friendly', name: 'The Friendly', icon: '🌈', earnedAt: new Date() }
      ]
    },
    profile: {
      userId: 'user-1',
      bio: 'เล่นเกมจริงจัง แต่สนุกด้วย',
      quote: 'GG EZ',
      playTime: 'evening',
      region: 'Bangkok',
      mainGames: [
        { game: 'rov', rank: 'master', role: ['carry', 'jungle'], isMain: true, badges: [] },
        { game: 'valorant', rank: 'diamond', role: ['mid', 'carry'], isMain: false, badges: [] }
      ],
      playstyle: ['tryhard', 'carry'],
      preferredRoles: ['carry', 'jungle'],
      totalSessions: 120,
      completedSessions: 115,
      currentMood: 'competitive',
      friendCount: 34,
      discordId: 'ProGamer#1234'
    },
    isOnline: true,
    currentStatus: 'matching',
    cosmetics: {
      activeFrame: 'frame-legendary',
      activeTitle: 'นักแบกประจำหมู่บ้าน',
      ownedFrames: ['frame-legendary', 'frame-epic'],
      ownedBackgrounds: ['bg-purple'],
      ownedTitles: ['นักแบกประจำหมู่บ้าน']
    },
    createdAt: new Date('2024-01-15'),
    lastActive: new Date()
  },
  {
    id: 'user-2',
    username: 'ChillGamer',
    displayName: 'Chill Gamer',
    avatar: '/avatars/avatar-2.jpg',
    level: 12,
    exp: 3200,
    expToNextLevel: 5000,
    reputation: {
      overall: 72,
      tier: 'good',
      behavior: 85,
      reliability: 70,
      teamwork: 62,
      totalReviews: 28,
      positiveReviews: 22,
      negativeReviews: 6,
      badges: [
        { id: 'badge-3', type: 'supporter', name: 'Support Soul', icon: '🤝', earnedAt: new Date() }
      ]
    },
    profile: {
      userId: 'user-2',
      bio: 'เล่นชิลๆ ไม่ด่ากัน',
      quote: 'Play for fun!',
      playTime: 'night',
      region: 'Chiang Mai',
      mainGames: [
        { game: 'rov', rank: 'platinum', role: ['support', 'tank'], isMain: true, badges: [] },
        { game: 'genshin', rank: 'unranked', role: ['flex'], isMain: false, badges: [] }
      ],
      playstyle: ['casual', 'support-main'],
      preferredRoles: ['support', 'tank'],
      totalSessions: 45,
      completedSessions: 42,
      currentMood: 'chill',
      friendCount: 18
    },
    isOnline: true,
    cosmetics: {
      activeFrame: 'frame-common',
      ownedFrames: ['frame-common'],
      ownedBackgrounds: [],
      ownedTitles: []
    },
    createdAt: new Date('2024-06-20'),
    lastActive: new Date()
  },
  {
    id: 'user-3',
    username: 'ValoQueen',
    displayName: 'Valo Queen',
    avatar: '/avatars/avatar-3.jpg',
    level: 18,
    exp: 5400,
    expToNextLevel: 7500,
    reputation: {
      overall: 91,
      tier: 'excellent',
      behavior: 95,
      reliability: 88,
      teamwork: 90,
      totalReviews: 38,
      positiveReviews: 36,
      negativeReviews: 2,
      badges: [
        { id: 'badge-4', type: 'leader', name: 'True Leader', icon: '👑', earnedAt: new Date() }
      ]
    },
    profile: {
      userId: 'user-3',
      bio: 'Valorant main 🎯',
      quote: 'Headshot only',
      playTime: 'evening',
      region: 'Bangkok',
      mainGames: [
        { game: 'valorant', rank: 'diamond', role: ['carry', 'mid'], isMain: true, badges: [] }
      ],
      playstyle: ['tryhard', 'leader'],
      preferredRoles: ['carry', 'mid'],
      totalSessions: 78,
      completedSessions: 75,
      currentMood: 'tryhard',
      friendCount: 42,
      riotId: 'ValoQueen#TH1'
    },
    isOnline: true,
    cosmetics: {
      activeFrame: 'frame-rare',
      activeTitle: 'เทพซัพพอร์ต',
      ownedFrames: ['frame-rare'],
      ownedBackgrounds: ['bg-blue'],
      ownedTitles: ['เทพซัพพอร์ต']
    },
    createdAt: new Date('2024-03-10'),
    lastActive: new Date(Date.now() - 1000 * 60 * 30) // 30 mins ago
  },
  {
    id: 'user-4',
    username: 'MLBBPro',
    displayName: 'MLBB Pro',
    avatar: '/avatars/avatar-4.jpg',
    level: 8,
    exp: 1200,
    expToNextLevel: 3000,
    reputation: {
      overall: 65,
      tier: 'good',
      behavior: 70,
      reliability: 65,
      teamwork: 60,
      totalReviews: 15,
      positiveReviews: 11,
      negativeReviews: 4,
      badges: []
    },
    profile: {
      userId: 'user-4',
      bio: 'MLBB ตัวจริง',
      playTime: 'weekend',
      region: 'Phuket',
      mainGames: [
        { game: 'mlbb', rank: 'gold', role: ['jungle', 'carry'], isMain: true, badges: [] }
      ],
      playstyle: ['casual'],
      preferredRoles: ['jungle', 'carry'],
      totalSessions: 22,
      completedSessions: 20,
      currentMood: 'fun',
      friendCount: 8
    },
    isOnline: true,
    currentStatus: 'idle',
    cosmetics: {
      ownedFrames: [],
      ownedBackgrounds: [],
      ownedTitles: []
    },
    createdAt: new Date('2024-09-05'),
    lastActive: new Date()
  }
];

// ==================== MOCK LFG SESSIONS ====================

export const mockLFGSessions: LFGSession[] = [
  {
    id: 'session-1',
    hostId: 'user-1',
    host: mockUsers[0],
    game: 'rov',
    gameMode: 'Ranked',
    requiredRank: 'diamond',
    currentPlayers: [{ userId: 'user-1', user: mockUsers[0], joinedAt: new Date(), isReady: false, isHost: true }],
    maxPlayers: 5,
    requiredRoles: ['support', 'tank'],
    voiceOption: 'discord',
    mood: 'tryhard',
    tags: ['ตี้ชนะได้หมด', 'จริงจัง'],
    status: 'matching',
    verificationMethod: 'ready-check',
    createdAt: new Date(),
    chatRoomId: 'chat-1'
  },
  {
    id: 'session-2',
    hostId: 'user-2',
    host: mockUsers[1],
    game: 'valorant',
    gameMode: 'Unrated',
    currentPlayers: [
      { userId: 'user-2', user: mockUsers[1], joinedAt: new Date(), isReady: false, isHost: true },
      { userId: 'user-3', user: mockUsers[2], joinedAt: new Date(), isReady: false, isHost: false }
    ],
    maxPlayers: 5,
    voiceOption: 'in-game',
    mood: 'fun',
    tags: ['ตี้ขำๆ', 'ไม่ซีเรียส'],
    status: 'matching',
    verificationMethod: 'ready-check',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    chatRoomId: 'chat-2'
  },
  {
    id: 'session-3',
    hostId: 'user-4',
    host: mockUsers[3],
    game: 'mlbb',
    gameMode: 'Classic',
    currentPlayers: [{ userId: 'user-4', user: mockUsers[3], joinedAt: new Date(), isReady: false, isHost: true }],
    maxPlayers: 5,
    voiceOption: 'no-voice',
    mood: 'chill',
    tags: ['ตี้ชิล', 'เล่นสนุกๆ'],
    status: 'matching',
    verificationMethod: 'ready-check',
    createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
    chatRoomId: 'chat-3'
  },
  // Add more sessions for testing
  {
    id: 'session-4',
    hostId: 'user-3',
    host: mockUsers[2],
    game: 'valorant',
    gameMode: 'Competitive',
    requiredRank: 'ascendant',
    currentPlayers: [
      { userId: 'user-3', user: mockUsers[2], joinedAt: new Date(), isReady: true, isHost: true },
      { userId: 'user-1', user: mockUsers[0], joinedAt: new Date(), isReady: true, isHost: false }
    ],
    maxPlayers: 5,
    voiceOption: 'discord',
    mood: 'competitive',
    tags: ['Road to Immortal', 'Mic Required'],
    status: 'ready-check',
    verificationMethod: 'game-api',
    createdAt: new Date(Date.now() - 1000 * 60 * 2),
    chatRoomId: 'chat-4'
  },
  {
    id: 'session-5',
    hostId: 'user-2',
    host: mockUsers[1],
    game: 'genshin',
    gameMode: 'Domain Farm',
    currentPlayers: [
      { userId: 'user-2', user: mockUsers[1], joinedAt: new Date(), isReady: true, isHost: true },
      { userId: 'user-4', user: mockUsers[3], joinedAt: new Date(), isReady: true, isHost: false }
    ],
    maxPlayers: 4,
    voiceOption: 'in-game',
    mood: 'chill',
    tags: ['Artifact Farm', 'Help Welcome'],
    status: 'active',
    verificationMethod: 'ready-check',
    createdAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    chatRoomId: 'chat-5'
  }
];

// ==================== MOCK TINDER CARDS ====================

export const mockTinderCards: TinderCard[] = [
  {
    userId: 'user-2',
    user: mockUsers[1],
    mutualGames: ['rov', 'genshin'],
    compatibility: 85,
    highlights: ['เล่นชิลๆ', 'เวลาว่างตอนกลางคืน', 'Support Main'],
    seen: false
  },
  {
    userId: 'user-3',
    user: mockUsers[2],
    mutualGames: ['valorant'],
    compatibility: 78,
    highlights: ['Tryhard', 'Diamond Rank', 'Leader'],
    seen: false
  }
];

// ==================== MOCK MARKETPLACE ====================

export const mockMarketplaceListings: MarketplaceListing[] = [
  {
    id: 'listing-1',
    sellerId: 'user-1',
    seller: mockUsers[0],
    type: 'coaching',
    title: 'สอน ROV ตำแหน่ง Jungle + Carry',
    description: 'สอนเทคนิค Jungle, การเล่นแบบ Carry, วิธีแบก ระดับ Master',
    game: 'rov',
    price: 200,
    currency: 'THB',
    priceType: 'per-hour',
    images: ['/marketplace/coaching-1.jpg'],
    totalSales: 15,
    averageRating: 4.8,
    reviewCount: 12,
    isActive: true,
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-01')
  },
  {
    id: 'listing-2',
    sellerId: 'user-3',
    seller: mockUsers[2],
    type: 'coaching',
    title: 'โค้ช Valorant - Diamond+',
    description: 'สอน Aim, Positioning, Game Sense สำหรับ Valorant',
    game: 'valorant',
    price: 250,
    currency: 'THB',
    priceType: 'per-hour',
    images: ['/marketplace/coaching-2.jpg'],
    totalSales: 8,
    averageRating: 5.0,
    reviewCount: 8,
    isActive: true,
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-09-15')
  }
];

// ==================== MOCK FEED ====================

export const mockFeedPosts: FeedPost[] = [
  {
    id: 'post-1',
    authorId: 'user-1',
    author: mockUsers[0],
    type: 'highlight',
    content: 'ชนะ 5 เกมติด! ทีมนี้เคมีดีมาก 🔥',
    relatedSessionId: 'session-1',
    relatedGame: 'rov',
    likes: 24,
    comments: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: 'post-2',
    authorId: 'user-3',
    author: mockUsers[2],
    type: 'achievement',
    content: 'ปลดล็อก Achievement "True Leader" 👑',
    likes: 18,
    comments: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
  },
  {
    id: 'post-3',
    authorId: 'user-2',
    author: mockUsers[1],
    type: 'review',
    content: 'โค้ชของ ProGamerTH สอนดีมาก แนะนำเลยครับ!',
    relatedGame: 'rov',
    likes: 12,
    comments: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12 hours ago
  }
];

// ==================== MOCK ACTIVITY FEED ====================

export const mockActivityFeed: ActivityFeedItem[] = [
  {
    id: 'activity-1',
    type: 'session-start',
    userId: 'user-1',
    user: mockUsers[0],
    data: { game: 'rov', mode: 'Ranked' },
    createdAt: new Date(Date.now() - 1000 * 60 * 2) // 2 mins ago
  },
  {
    id: 'activity-2',
    type: 'match',
    userId: 'user-2',
    user: mockUsers[1],
    data: { matchedWith: 'user-3' },
    createdAt: new Date(Date.now() - 1000 * 60 * 5) // 5 mins ago
  },
  {
    id: 'activity-3',
    type: 'achievement',
    userId: 'user-3',
    user: mockUsers[2],
    data: { achievement: 'True Leader' },
    createdAt: new Date(Date.now() - 1000 * 60 * 10) // 10 mins ago
  },
  {
    id: 'activity-4',
    type: 'session-complete',
    userId: 'user-4',
    user: mockUsers[3],
    data: { game: 'mlbb', result: 'win' },
    createdAt: new Date(Date.now() - 1000 * 60 * 15) // 15 mins ago
  }
];

// ==================== MOCK PLATFORM STATS ====================

export const mockPlatformStats: PlatformStats = {
  onlineUsers: 1247,
  matchingNow: 43,
  activeSessions: 128,
  trendingGame: 'rov',
  updatedAt: new Date()
};

// ==================== LIVE PRESENCE ====================

export const mockLivePresenceEvents: LivePresenceEvent[] = [
  {
    id: 'presence-1',
    type: 'session',
    icon: '🎮',
    message: 'KiraGod เริ่ม Session RoV Ranked',
    accent: 'purple',
    timestamp: new Date(Date.now() - 1000 * 60 * 1)
  },
  {
    id: 'presence-2',
    type: 'match',
    icon: '🤝',
    message: 'Valo Chill unrated ได้เพื่อนใหม่ 2 คน',
    accent: 'blue',
    timestamp: new Date(Date.now() - 1000 * 60 * 3)
  },
  {
    id: 'presence-3',
    type: 'reputation',
    icon: '🛡️',
    message: 'Reputation 4.8 • Pro Player',
    accent: 'gold',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: 'presence-4',
    type: 'marketplace',
    icon: '💼',
    message: 'โค้ช Valorant ปิดงานสอนสำเร็จ',
    accent: 'purple',
    timestamp: new Date(Date.now() - 1000 * 60 * 7)
  },
  {
    id: 'presence-5',
    type: 'achievement',
    icon: '🏅',
    message: 'DragonSlayer ได้ Badge The Friendly',
    accent: 'blue',
    timestamp: new Date(Date.now() - 1000 * 60 * 12)
  }
];

export const mockOnlineFriends: OnlineFriendPresence[] = [
  {
    id: 'friend-1',
    user: mockUsers[0],
    status: 'matching',
    game: 'rov',
    rankLabel: 'Commander I+',
    reputationScore: 4.8
  },
  {
    id: 'friend-2',
    user: mockUsers[1],
    status: 'idle',
    game: 'rov',
    rankLabel: 'Platinum',
    reputationScore: 4.2
  },
  {
    id: 'friend-3',
    user: mockUsers[2],
    status: 'in-session',
    game: 'valorant',
    rankLabel: 'Diamond',
    reputationScore: 4.9
  }
];

export const mockReputationOverview: ReputationOverview = {
  score: 4.8,
  tier: 'Pro Player',
  percentile: 92,
  trend: 0.2,
  totalSessions: 128,
  totalReviews: 45,
  highlights: ['ไม่เคยเทนัด 30 วัน', 'ได้คำชม 12 ครั้ง/สัปดาห์', 'Mentor ผู้เล่นใหม่'],
  breakdown: [
    { label: 'Behavior', value: 90 },
    { label: 'Reliability', value: 85 },
    { label: 'Teamwork', value: 86 }
  ]
};

// ==================== GAME CONFIG ====================

export const gameConfig = {
  rov: {
    id: 'rov' as GameId,
    name: 'RoV',
    fullName: 'Garena RoV',
    icon: '/games/rov.png',
    color: '#FF0000',
    ranks: ['unranked', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster', 'challenger'],
    roles: ['carry', 'jungle', 'mid', 'support', 'tank']
  },
  valorant: {
    id: 'valorant' as GameId,
    name: 'Valorant',
    fullName: 'Valorant',
    icon: '/games/valorant.png',
    color: '#FF4655',
    ranks: ['unranked', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master'],
    roles: ['carry', 'support', 'flex']
  },
  mlbb: {
    id: 'mlbb' as GameId,
    name: 'MLBB',
    fullName: 'Mobile Legends',
    icon: '/games/mlbb.png',
    color: '#4169E1',
    ranks: ['unranked', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master'],
    roles: ['carry', 'jungle', 'mid', 'support', 'tank']
  },
  genshin: {
    id: 'genshin' as GameId,
    name: 'Genshin',
    fullName: 'Genshin Impact',
    icon: '/games/genshin.png',
    color: '#FFA500',
    ranks: ['unranked'],
    roles: ['flex']
  }
};

// ==================== HELPER FUNCTIONS ====================

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getSessionById = (id: string): LFGSession | undefined => {
  return mockLFGSessions.find(session => session.id === id);
};

export const getActiveUsers = (): User[] => {
  return mockUsers.filter(user => user.isOnline);
};

export const getSessionsByGame = (game: GameId): LFGSession[] => {
  return mockLFGSessions.filter(session => session.game === game);
};

export const getTrendingGames = (): GameId[] => {
  return ['rov', 'valorant', 'mlbb'];
};
