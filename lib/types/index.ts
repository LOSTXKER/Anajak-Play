/**
 * ANAJAK PLAY - TYPE DEFINITIONS
 * Based on Masterplan V5
 */

// ==================== CORE TYPES ====================

export type GameId = 'rov' | 'valorant' | 'lol' | 'genshin' | 'mlbb' | 'apex' | 'pubg' | 'minecraft';

export type RankTier = 'unranked' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master' | 'grandmaster' | 'challenger';

export type PlaystyleType = 'tryhard' | 'casual' | 'fun' | 'support-main' | 'leader' | 'carry';

export type RoleType = 'carry' | 'support' | 'jungle' | 'mid' | 'top' | 'adc' | 'tank' | 'flex';

export type MoodStatus = 'fun' | 'tryhard' | 'chill' | 'competitive' | 'social';

export type VoiceOption = 'in-game' | 'discord' | 'no-voice';

export type SessionStatus = 'matching' | 'ready-check' | 'active' | 'completed' | 'cancelled';

export type ReputationTier = 'toxic' | 'poor' | 'fair' | 'good' | 'excellent' | 'legendary';

// ==================== USER & PROFILE ====================

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  email?: string;
  level: number;
  exp: number;
  expToNextLevel: number;
  reputation: ReputationScore;
  createdAt: Date;
  lastActive: Date;
  
  // Profile Data
  profile: GamerProfile;
  
  // Presence
  isOnline: boolean;
  currentStatus?: 'matching' | 'in-game' | 'idle';
  
  // Cosmetics
  cosmetics: UserCosmetics;
}

export interface GamerProfile {
  userId: string;
  
  // Identity
  bio?: string;
  quote?: string;
  playTime?: string; // "evening", "night", "weekend"
  region?: string;
  
  // Games
  mainGames: GameProfile[];
  
  // Style
  playstyle: PlaystyleType[];
  preferredRoles: RoleType[];
  
  // Stats
  totalSessions: number;
  completedSessions: number;
  
  // Mood
  currentMood?: MoodStatus;
  
  // Social
  friendCount: number;
  
  // Integrations
  discordId?: string;
  riotId?: string;
  steamId?: string;
}

export interface GameProfile {
  game: GameId;
  rank: RankTier;
  seasonRank?: RankTier;
  role: RoleType[];
  hoursPlayed?: number;
  isMain: boolean;
  badges: string[];
}

export interface ReputationScore {
  overall: number; // 0-100
  tier: ReputationTier;
  
  // 3 Dimensions
  behavior: number; // 0-100 (ความเป็นมิตร)
  reliability: number; // 0-100 (ไม่เทนัด)
  teamwork: number; // 0-100 (การมีส่วนร่วม)
  
  // Stats
  totalReviews: number;
  positiveReviews: number;
  negativeReviews: number;
  
  // Badges
  badges: ReputationBadge[];
}

export interface ReputationBadge {
  id: string;
  type: 'friendly' | 'carry' | 'supporter' | 'leader' | 'thinker' | 'afk-slayer';
  name: string;
  icon: string;
  earnedAt: Date;
}

export interface UserCosmetics {
  activeFrame?: string;
  activeBackground?: string;
  activeTitle?: string;
  activeBadge?: string;
  
  ownedFrames: string[];
  ownedBackgrounds: string[];
  ownedTitles: string[];
}

// ==================== LFG & SESSION ====================

export interface LFGSession {
  id: string;
  hostId: string;
  host: User;
  
  // Game Details
  game: GameId;
  gameMode: string;
  requiredRank?: RankTier;
  rankRange?: { min: RankTier; max: RankTier };
  
  // Party
  currentPlayers: SessionPlayer[];
  maxPlayers: number;
  requiredRoles?: RoleType[];
  
  // Settings
  voiceOption: VoiceOption;
  mood?: MoodStatus;
  tags: string[];
  
  // Status
  status: SessionStatus;
  
  // Verification
  verificationMethod: 'ready-check' | 'discord-bot' | 'game-api';
  
  // Ready Check
  readyCheck?: ReadyCheckState;
  
  // Discord Integration
  discordRoom?: DiscordRoomInfo;
  
  // Game API Integration
  gameApiData?: GameAPIVerification;
  
  // Timestamps
  createdAt: Date;
  matchedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  expiresAt?: Date;
  
  // Chat
  chatRoomId?: string;
}

export interface SessionPlayer {
  userId: string;
  user: User;
  role?: RoleType;
  isHost: boolean;
  joinedAt: Date;
  
  // Ready Status
  isReady: boolean;
  readyAt?: Date;
  
  // Verification
  discordJoined?: boolean;
  gameVerified?: boolean;
}

export interface ReadyCheckState {
  startedAt: Date;
  expiresAt: Date; // 60 seconds
  responses: ReadyCheckResponse[];
  isCompleted: boolean;
  allReady: boolean;
}

export interface ReadyCheckResponse {
  userId: string;
  ready: boolean;
  respondedAt: Date;
}

export interface DiscordRoomInfo {
  channelId: string;
  channelName: string;
  inviteLink: string;
  createdAt: Date;
  
  // Tracking
  joinedUsers: string[];
}

export interface GameAPIVerification {
  game: GameId;
  verificationMethod: string;
  
  // Game-specific data
  lobbyId?: string;
  matchId?: string;
  
  // Verification status per player
  verifiedPlayers: {
    userId: string;
    verified: boolean;
    gameUsername?: string;
    verifiedAt?: Date;
  }[];
  
  lastChecked: Date;
}

export interface SessionReview {
  id: string;
  sessionId: string;
  reviewerId: string;
  targetUserId: string;
  
  // Ratings (1-5)
  behaviorRating: number; // ความเป็นมิตร
  skillRating: number; // ทักษะ
  teamworkRating: number; // การทำงานเป็นทีม
  reliabilityRating: number; // ความตรงต่อเวลา/ไม่เทนัด
  
  // Feedback
  comment?: string;
  tags: string[]; // "friendly", "toxic", "skilled", "afk", "carry", "support"
  
  // Reputation Impact
  wouldPlayAgain: boolean;
  
  // Vote Type (for detailed reviews)
  reviewType: 'teammate' | 'coach' | 'hired-player';
  
  createdAt: Date;
}

export interface MatchRequest {
  id: string;
  userId: string;
  user?: User;
  
  // Game Details
  game: GameId;
  gameMode: string;
  rank: RankTier;
  role?: RoleType;
  
  // Preferences
  voicePreference: VoiceOption;
  mood?: MoodStatus;
  playstyle: PlaystyleType[];
  
  // Requirements
  minReputation?: number;
  discordRequired?: boolean;
  gameApiRequired?: boolean;
  
  // Status
  status: 'searching' | 'matched' | 'expired' | 'cancelled';
  
  // Match Criteria
  matchCriteria: MatchCriteria;
  
  // Timestamps
  createdAt: Date;
  expiresAt: Date;
  matchedAt?: Date;
}

export interface MatchCriteria {
  // Primary Factors
  rankWeight: number; // 0-1
  roleWeight: number; // 0-1
  playstyleWeight: number; // 0-1
  reputationWeight: number; // 0-1
  
  // Filters
  allowSimilarRank: boolean;
  requireVoice: boolean;
  requireDiscord: boolean;
  
  // Compatibility
  minCompatibilityScore: number; // 0-100
}

export interface MatchScore {
  totalScore: number; // 0-100
  
  // Breakdown
  rankScore: number;
  roleScore: number;
  playstyleScore: number;
  reputationScore: number;
  availabilityScore: number;
  integrationScore: number;
  
  // Meta
  isGoodMatch: boolean;
  reasons: string[];
}

export interface MatchNotification {
  id: string;
  matchRequestId: string;
  sessionId: string;
  userId: string;
  
  // Match Info
  matchScore: MatchScore;
  session: LFGSession;
  
  // Response
  response?: 'accepted' | 'declined';
  respondedAt?: Date;
  
  // Expiry
  expiresAt: Date;
  
  createdAt: Date;
}

export interface SessionCloseVote {
  sessionId: string;
  voterId: string;
  
  // Overall Session
  sessionRating: number; // 1-5
  sessionComment?: string;
  
  // Individual Reviews
  playerReviews: SessionReview[];
  
  // Dispute Flag
  hasDispute: boolean;
  disputeReason?: string;
  
  createdAt: Date;
}

// ==================== TINDER MODE ====================

export interface TinderCard {
  userId: string;
  user: User;
  
  // Match Info
  mutualGames: GameId[];
  compatibility: number; // 0-100
  
  // Highlights
  highlights: string[];
  
  // Already seen?
  seen: boolean;
}

export interface TinderMatch {
  id: string;
  user1Id: string;
  user2Id: string;
  
  matchedAt: Date;
  
  // Chat
  chatRoomId: string;
  lastMessageAt?: Date;
  
  // Status
  isActive: boolean;
}

// ==================== MARKETPLACE ====================

export type MarketplaceServiceType = 'coaching' | 'hire-play' | 'item-sale' | 'account-sale' | 'custom';

export interface MarketplaceListing {
  id: string;
  sellerId: string;
  seller: User;
  
  // Type
  type: MarketplaceServiceType;
  
  // Details
  title: string;
  description: string;
  game: GameId;
  
  // Pricing
  price: number;
  currency: 'THB';
  priceType: 'per-hour' | 'per-session' | 'fixed';
  
  // Media
  images: string[];
  
  // Stats
  totalSales: number;
  averageRating: number;
  reviewCount: number;
  
  // Status
  isActive: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketplaceOrder {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  
  // Details
  quantity: number;
  totalPrice: number;
  
  // Escrow
  escrowStatus: 'pending' | 'held' | 'released' | 'disputed' | 'refunded';
  
  // Progress
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'disputed';
  
  // Review
  reviewed: boolean;
  
  createdAt: Date;
  completedAt?: Date;
}

// ==================== FEED & COMMUNITY ====================

export type FeedPostType = 'highlight' | 'review' | 'achievement' | 'match' | 'marketplace';

export interface FeedPost {
  id: string;
  authorId: string;
  author: User;
  
  type: FeedPostType;
  content: string;
  
  // Media
  images?: string[];
  videoUrl?: string;
  
  // Related Data
  relatedSessionId?: string;
  relatedGame?: GameId;
  
  // Engagement
  likes: number;
  comments: number;
  
  // Timestamps
  createdAt: Date;
}

export interface Community {
  id: string;
  game: GameId;
  name: string;
  description: string;
  
  // Stats
  memberCount: number;
  
  // Feed
  hasMiniFeed: boolean;
  
  createdAt: Date;
}

// ==================== CHAT ====================

export type ChatRoomType = 'session' | 'dm' | 'community';

export interface ChatRoom {
  id: string;
  type: ChatRoomType;
  
  // Participants
  participantIds: string[];
  
  // Related
  sessionId?: string;
  communityId?: string;
  
  // Last Activity
  lastMessageAt?: Date;
  
  // Status
  isActive: boolean;
  
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  
  content: string;
  
  // Type
  type: 'text' | 'image' | 'system';
  
  // Read Status
  readBy: string[];
  
  createdAt: Date;
}

// ==================== ACHIEVEMENTS & PROGRESSION ====================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  
  // Requirements
  type: 'session-count' | 'reputation' | 'friend-count' | 'marketplace' | 'special';
  requirement: number;
  
  // Rewards
  expReward: number;
  cosmetic?: string;
  
  // Rarity
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  achievement: Achievement;
  
  progress: number;
  completed: boolean;
  
  earnedAt?: Date;
}

export interface DailyChest {
  userId: string;
  
  // Status
  canClaim: boolean;
  lastClaimedAt?: Date;
  
  // Rewards (revealed after opening)
  rewards?: ChestReward[];
}

export interface ChestReward {
  type: 'exp' | 'cosmetic' | 'boost' | 'currency';
  item: string;
  amount?: number;
}

// ==================== NOTIFICATIONS ====================

export type NotificationType = 'match-found' | 'session-start' | 'message' | 'friend-request' | 'review' | 'marketplace';

export interface Notification {
  id: string;
  userId: string;
  
  type: NotificationType;
  title: string;
  message: string;
  
  // Related Data
  relatedUserId?: string;
  relatedSessionId?: string;
  
  // Status
  read: boolean;
  
  createdAt: Date;
}

// ==================== LIVE PRESENCE ====================

export interface ActivityFeedItem {
  id: string;
  type: 'session-start' | 'session-complete' | 'achievement' | 'match' | 'level-up';
  userId: string;
  user: User;
  
  data: any; // Dynamic based on type
  
  createdAt: Date;
}

export interface PlatformStats {
  onlineUsers: number;
  matchingNow: number;
  activeSessions: number;
  
  // Trending
  trendingGame?: GameId;
  
  updatedAt: Date;
}

// ==================== API RESPONSES ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

// ==================== LEGACY TYPES (for backward compatibility) ====================

import type { ReactNode } from 'react';

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
  };
  timeSlot?: 'morning' | 'afternoon' | 'evening' | 'late';
  languages?: string[];
  playstyle?: 'chill' | 'tryhard' | 'fun' | 'sweaty';
  toxicTolerance?: 'zero' | 'low' | 'medium';
  neededPlayers?: number;
  personalityTag?: string;
  urgency?: 'now' | 'soon' | 'later';
}
