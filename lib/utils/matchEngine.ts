/**
 * MATCH ENGINE - LFG V5
 * จับคู่ผู้เล่นตามตัวแปรหลายมิติ
 */

import {
  User,
  MatchRequest,
  LFGSession,
  MatchScore,
  MatchCriteria,
  RankTier,
  RoleType,
  PlaystyleType,
  GameProfile,
  SessionPlayer,
} from '@/lib/types/index';

// Rank hierarchy for comparison
const RANK_HIERARCHY: Record<RankTier, number> = {
  'unranked': 0,
  'bronze': 1,
  'silver': 2,
  'gold': 3,
  'platinum': 4,
  'diamond': 5,
  'master': 6,
  'grandmaster': 7,
  'challenger': 8,
};

/**
 * คำนวณคะแนนความเหมาะสมระหว่าง User กับ Session
 */
export function calculateMatchScore(
  user: User,
  matchRequest: MatchRequest,
  session: LFGSession,
  criteria: MatchCriteria
): MatchScore {
  const scores = {
    rankScore: calculateRankScore(matchRequest.rank, session.requiredRank || 'unranked', session.rankRange),
    roleScore: calculateRoleScore(matchRequest.role, session.requiredRoles),
    playstyleScore: calculatePlaystyleScore(matchRequest.playstyle, user.profile.playstyle),
    reputationScore: calculateReputationScore(user.reputation.overall, criteria.minCompatibilityScore),
    availabilityScore: calculateAvailabilityScore(user),
    integrationScore: calculateIntegrationScore(user, session, matchRequest),
  };

  // Calculate weighted total
  const totalScore = (
    scores.rankScore * criteria.rankWeight +
    scores.roleScore * criteria.roleWeight +
    scores.playstyleScore * criteria.playstyleWeight +
    scores.reputationScore * criteria.reputationWeight +
    scores.availabilityScore * 0.1 +
    scores.integrationScore * 0.15
  );

  const isGoodMatch = totalScore >= criteria.minCompatibilityScore;
  const reasons = generateMatchReasons(scores, criteria);

  return {
    totalScore: Math.round(totalScore),
    ...scores,
    isGoodMatch,
    reasons,
  };
}

/**
 * คำนวณคะแนน Rank (ใกล้เคียงกันมากแค่ไหน)
 */
function calculateRankScore(
  userRank: RankTier,
  sessionRank: RankTier,
  rankRange?: { min: RankTier; max: RankTier }
): number {
  const userLevel = RANK_HIERARCHY[userRank] || 0;
  const sessionLevel = RANK_HIERARCHY[sessionRank] || 0;

  // Check if within range
  if (rankRange) {
    const minLevel = RANK_HIERARCHY[rankRange.min] || 0;
    const maxLevel = RANK_HIERARCHY[rankRange.max] || 0;
    
    if (userLevel < minLevel || userLevel > maxLevel) {
      return 0; // Out of range
    }
  }

  // Calculate difference
  const difference = Math.abs(userLevel - sessionLevel);

  // Score based on difference (closer = better)
  if (difference === 0) return 100;
  if (difference === 1) return 85;
  if (difference === 2) return 70;
  if (difference === 3) return 50;
  if (difference === 4) return 30;
  return 10;
}

/**
 * คำนวณคะแนน Role
 */
function calculateRoleScore(
  userRole?: RoleType,
  requiredRoles?: RoleType[]
): number {
  // If no role requirements, perfect score
  if (!requiredRoles || requiredRoles.length === 0) {
    return 100;
  }

  // If user has no role preference, neutral score
  if (!userRole) {
    return 50;
  }

  // Check if user's role matches requirements
  if (requiredRoles.includes(userRole)) {
    return 100;
  }

  // No match
  return 20;
}

/**
 * คำนวณคะแนน Playstyle (ความเข้ากันได้)
 */
function calculatePlaystyleScore(
  userPlaystyles: PlaystyleType[],
  sessionPlaystyles: PlaystyleType[]
): number {
  if (userPlaystyles.length === 0 || sessionPlaystyles.length === 0) {
    return 50; // Neutral if no data
  }

  // Calculate overlap
  const overlap = userPlaystyles.filter(style => sessionPlaystyles.includes(style)).length;
  const total = Math.max(userPlaystyles.length, sessionPlaystyles.length);
  
  return Math.round((overlap / total) * 100);
}

/**
 * คำนวณคะแนน Reputation
 */
function calculateReputationScore(
  userReputation: number,
  minRequired: number
): number {
  if (userReputation < minRequired) {
    return 0; // Below minimum
  }

  // Scale reputation (0-100) to score
  return Math.min(100, userReputation);
}

/**
 * คำนวณคะแนนความพร้อม (Online, Active, etc.)
 */
function calculateAvailabilityScore(user: User): number {
  let score = 0;

  // Is online?
  if (user.isOnline) score += 50;

  // Current status
  if (user.currentStatus === 'matching') score += 30;
  if (user.currentStatus === 'idle') score += 20;
  if (user.currentStatus === 'in-game') score += 0;

  return Math.min(100, score);
}

/**
 * คำนวณคะแนนการเชื่อมต่อ (Discord, Game API)
 */
function calculateIntegrationScore(
  user: User,
  session: LFGSession,
  matchRequest: MatchRequest
): number {
  let score = 50; // Base score

  // Discord Integration
  if (session.voiceOption === 'discord' || matchRequest.discordRequired) {
    if (user.profile.discordId) {
      score += 25;
    } else {
      score -= 25; // Penalty if required but not linked
    }
  }

  // Game API Integration
  if (session.verificationMethod === 'game-api' || matchRequest.gameApiRequired) {
    // Check if user has linked the game
    const hasGameLinked = user.profile.mainGames.some((g: GameProfile) => g.game === session.game);
    if (hasGameLinked) {
      score += 25;
    } else {
      score -= 25;
    }
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * สร้างเหตุผลว่าทำไมคู่นี้เหมาะสม (หรือไม่เหมาะสม)
 */
function generateMatchReasons(scores: Omit<MatchScore, 'totalScore' | 'isGoodMatch' | 'reasons'>, criteria: MatchCriteria): string[] {
  const reasons: string[] = [];

  if (scores.rankScore >= 85) {
    reasons.push('🎯 Rank ใกล้เคียงกัน');
  } else if (scores.rankScore < 50) {
    reasons.push('⚠️ Rank ต่างกันมาก');
  }

  if (scores.roleScore === 100) {
    reasons.push('✅ Role ตรงกับที่ต้องการ');
  }

  if (scores.playstyleScore >= 70) {
    reasons.push('🎮 Playstyle เข้ากันได้');
  }

  if (scores.reputationScore >= 80) {
    reasons.push('⭐ Reputation สูง');
  } else if (scores.reputationScore < 50) {
    reasons.push('⚠️ Reputation ต่ำ');
  }

  if (scores.availabilityScore >= 70) {
    reasons.push('🟢 พร้อมเล่นทันที');
  }

  if (scores.integrationScore >= 75) {
    reasons.push('🔗 เชื่อมต่อครบถ้วน');
  }

  return reasons;
}

/**
 * หาผู้เล่นที่เหมาะสมที่สุดสำหรับ Session
 */
export function findBestMatches(
  session: LFGSession,
  availableRequests: MatchRequest[],
  users: Map<string, User>,
  criteria: MatchCriteria,
  limit: number = 10
): Array<{ request: MatchRequest; user: User; score: MatchScore }> {
  const matches = availableRequests
    .map(request => {
      const user = users.get(request.userId);
      if (!user) return null;

      const score = calculateMatchScore(user, request, session, criteria);
      
      // Filter by minimum compatibility
      if (!score.isGoodMatch) return null;

      return { request, user, score };
    })
    .filter((match): match is { request: MatchRequest; user: User; score: MatchScore } => match !== null)
    .sort((a, b) => b.score.totalScore - a.score.totalScore)
    .slice(0, limit);

  return matches;
}

/**
 * ตรวจสอบว่า Session เต็มหรือยัง
 */
export function isSessionFull(session: LFGSession): boolean {
  return session.currentPlayers.length >= session.maxPlayers;
}

/**
 * ตรวจสอบว่าผู้ใช้สามารถเข้าร่วม Session นี้ได้หรือไม่
 */
export function canJoinSession(user: User, session: LFGSession, criteria: MatchCriteria): {
  canJoin: boolean;
  reason?: string;
} {
  // Check if full
  if (isSessionFull(session)) {
    return { canJoin: false, reason: 'Session เต็มแล้ว' };
  }

  // Check if already in session
  if (session.currentPlayers.some((p: SessionPlayer) => p.userId === user.id)) {
    return { canJoin: false, reason: 'คุณอยู่ใน Session นี้แล้ว' };
  }

  // Check if user meets requirements
  const mockRequest: MatchRequest = {
    id: 'temp',
    userId: user.id,
    game: session.game,
    gameMode: session.gameMode,
    rank: user.profile.mainGames.find((g: GameProfile) => g.game === session.game)?.rank || 'unranked',
    voicePreference: session.voiceOption,
    playstyle: user.profile.playstyle,
    status: 'searching',
    matchCriteria: criteria,
    createdAt: new Date(),
    expiresAt: new Date(),
  };

  const score = calculateMatchScore(user, mockRequest, session, criteria);

  if (!score.isGoodMatch) {
    return { canJoin: false, reason: 'ไม่ตรงกับเงื่อนไขของ Session' };
  }

  return { canJoin: true };
}

/**
 * Default Match Criteria
 */
export const DEFAULT_MATCH_CRITERIA: MatchCriteria = {
  rankWeight: 0.35,
  roleWeight: 0.25,
  playstyleWeight: 0.15,
  reputationWeight: 0.25,
  allowSimilarRank: true,
  requireVoice: false,
  requireDiscord: false,
  minCompatibilityScore: 60,
};
