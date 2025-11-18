import { Party, RoleSlot } from '@/lib/types/index';
import { GameId, LFGSession, MoodStatus, RankTier } from '@/lib/types/index';
import { gameConfig, getUserById } from '@/lib/data/mock-data';

const rankLabelMap: Record<RankTier, string> = {
  unranked: 'Unranked',
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
  diamond: 'Diamond',
  master: 'Master',
  grandmaster: 'Grandmaster',
  challenger: 'Challenger',
};

const moodToPlaystyle: Record<MoodStatus, Party['playstyle']> = {
  fun: 'fun',
  tryhard: 'tryhard',
  chill: 'chill',
  competitive: 'tryhard',
  social: 'fun',
};

const moodToPersonalityTag: Record<MoodStatus, string> = {
  fun: 'Meme lord',
  tryhard: 'Shotcaller',
  chill: 'Chill squad',
  competitive: 'Clutch mode',
  social: 'Friendly',
};

const moodToToxicTolerance: Record<MoodStatus, Party['toxicTolerance']> = {
  fun: 'medium',
  tryhard: 'low',
  chill: 'low',
  competitive: 'low',
  social: 'medium',
};

const playTimeToSlot: Record<string, Party['timeSlot']> = {
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'late',
  weekend: 'evening',
};

const toTitle = (value: string): string =>
  value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const formatRelativeTime = (date: Date): string => {
  const value = date instanceof Date ? date : new Date(date);
  const diffMs = Date.now() - value.getTime();
  const minute = 60_000;
  const hour = minute * 60;
  const day = hour * 24;

  if (diffMs < minute) {
    return 'เพิ่งเปิด';
  }
  if (diffMs < hour) {
    const minutes = Math.max(1, Math.floor(diffMs / minute));
    return `${minutes} นาทีที่แล้ว`;
  }
  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} ชั่วโมงที่แล้ว`;
  }
  const days = Math.floor(diffMs / day);
  return `${days} วันที่แล้ว`;
};

const buildOpenSlots = (
  openCount: number,
  requiredRoles: string[] | undefined,
): RoleSlot[] => {
  return Array.from({ length: openCount }, (_, index) => {
    const roleLabel = requiredRoles?.[index]
      ? toTitle(requiredRoles[index])
      : `Open Slot ${index + 1}`;

    return {
      role: roleLabel,
      status: 'open',
    };
  });
};

const getGameMeta = (id: GameId) => {
  const map = gameConfig as Record<string, (typeof gameConfig)[keyof typeof gameConfig]>;
  return map[id];
};

export const convertSessionToParty = (session: LFGSession): Party => {
  const gameMeta = getGameMeta(session.game);
  const host = session.host;

  const hostSlot: RoleSlot = {
    role: 'Leader',
    status: 'filled',
    player: host.displayName,
    avatar: host.username ?? host.id,
    ready: true,
    isLeader: true,
  };

  const otherPlayerSlots: RoleSlot[] = session.currentPlayers
    .filter((sp) => sp.userId !== session.hostId)
    .map((sp, idx) => {
      return {
        role: `Member ${idx + 1}`,
        status: 'filled',
        player: sp.user.displayName,
        avatar: sp.user.username ?? sp.userId,
        ready: sp.isReady,
      } satisfies RoleSlot;
    });

  const filledCount = 1 + otherPlayerSlots.length;
  const maxPlayers = session.maxPlayers;
  const openSlotsCount = Math.max(0, maxPlayers - filledCount);
  const openSlots = buildOpenSlots(openSlotsCount, session.requiredRoles);

  const leaderRep = Math.round((host.reputation.overall / 20) * 10) / 10;
  const neededPlayers = Math.max(0, maxPlayers - filledCount);
  const mood = session.mood ?? 'chill';

  const tags = [
    ...session.tags,
    mood ? toTitle(mood) : null,
    session.voiceOption === 'discord' ? 'Discord Voice' : null,
  ].filter(Boolean) as string[];

  const baseRoles = session.requiredRoles?.map(toTitle) ?? [];

  const party: Party = {
    id: Number(session.id.replace(/\D/g, '')) || Date.now(),
    title: `${host.displayName} • ${session.gameMode}`,
    desc: session.tags.length ? `โหมด ${session.gameMode} • ${session.tags.join(' • ')}` : `โหมด ${session.gameMode}`,
    game: gameMeta?.name ?? toTitle(session.game),
    mode: session.gameMode,
    rank: session.requiredRank ? `${rankLabelMap[session.requiredRank]}+` : 'Any',
    roles: [...baseRoles, 'Member'],
    requiredRoles: [hostSlot, ...otherPlayerSlots, ...openSlots],
    currentPlayers: filledCount,
    maxPlayers,
    mic: session.voiceOption !== 'no-voice',
    leader: host.displayName,
    leaderRep,
    leaderAvatar: host.username ?? host.id,
    tags,
    time: formatRelativeTime(session.createdAt),
    voiceChat:
      session.voiceOption === 'discord'
        ? {
            type: 'discord',
            link: `https://discord.gg/${session.id}`,
          }
        : undefined,
    timeSlot: playTimeToSlot[host.profile.playTime ?? 'evening'] ?? 'evening',
    languages: ['th'],
    playstyle: moodToPlaystyle[mood] ?? 'chill',
    toxicTolerance: moodToToxicTolerance[mood] ?? 'medium',
    neededPlayers,
    personalityTag: moodToPersonalityTag[mood],
    urgency: session.status === 'matching' ? 'now' : 'soon',
  };

  return party;
};
