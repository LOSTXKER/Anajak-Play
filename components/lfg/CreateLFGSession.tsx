'use client';

import { useState } from 'react';
import { GameId, RankTier, RoleType, VoiceOption, MoodStatus } from '@/lib/types/index';

interface CreateLFGSessionProps {
  onSessionCreated?: (sessionId: string) => void;
  onCancel?: () => void;
}

interface SessionFormData {
  game: GameId | '';
  gameMode: string;
  rank: RankTier | '';
  role?: RoleType | '';
  neededPlayers: number;
  voiceOption: VoiceOption;
  mood?: MoodStatus | '';
  verificationMethod: 'ready-check' | 'discord-bot' | 'game-api';
  discordRequired: boolean;
  gameApiLinked: boolean;
}

const GAMES: { id: GameId; name: string }[] = [
  { id: 'rov', name: 'RoV' },
  { id: 'valorant', name: 'Valorant' },
  { id: 'lol', name: 'League of Legends' },
  { id: 'mlbb', name: 'Mobile Legends' },
  { id: 'apex', name: 'Apex Legends' },
  { id: 'genshin', name: 'Genshin Impact' },
];

const GAME_MODES: Record<GameId, string[]> = {
  rov: ['Ranked', 'Normal', 'ARAM'],
  valorant: ['Competitive', 'Unrated', 'Spike Rush'],
  lol: ['Ranked Solo/Duo', 'Ranked Flex', 'Normal', 'ARAM'],
  mlbb: ['Ranked', 'Classic', 'Brawl'],
  apex: ['Ranked', 'Pubs', 'Arenas'],
  genshin: ['Co-op Domain', 'Weekly Boss', 'Exploration'],
  pubg: ['Classic', 'Arcade'],
  minecraft: ['Survival', 'Creative', 'Adventure'],
};

const ROLES: Record<GameId, RoleType[]> = {
  rov: ['carry', 'support', 'jungle', 'mid', 'top'],
  valorant: ['carry', 'support', 'flex'],
  lol: ['top', 'jungle', 'mid', 'adc', 'support'],
  mlbb: ['carry', 'tank', 'support', 'jungle', 'mid'],
  apex: ['flex'],
  genshin: ['flex'],
  pubg: ['flex'],
  minecraft: ['flex'],
};

const RANKS: RankTier[] = ['unranked', 'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster', 'challenger'];

const MOODS: { value: MoodStatus; label: string; emoji: string }[] = [
  { value: 'fun', label: 'Fun & Chill', emoji: '😄' },
  { value: 'tryhard', label: 'Tryhard', emoji: '🔥' },
  { value: 'competitive', label: 'Competitive', emoji: '⚔️' },
  { value: 'chill', label: 'Relaxed', emoji: '🌊' },
  { value: 'social', label: 'Social', emoji: '💬' },
];

export default function CreateLFGSession({ onSessionCreated, onCancel }: CreateLFGSessionProps) {
  const [formData, setFormData] = useState<SessionFormData>({
    game: '',
    gameMode: '',
    rank: '',
    role: '',
    neededPlayers: 1,
    voiceOption: 'in-game',
    mood: '',
    verificationMethod: 'ready-check',
    discordRequired: false,
    gameApiLinked: false,
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.game || !formData.gameMode || !formData.rank) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    setIsCreating(true);

    try {
      // TODO: Call API to create session
      const response = await fetch('/api/lfg/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        // Session created successfully
        onSessionCreated?.(data.sessionId);
      } else {
        alert(data.error || 'เกิดข้อผิดพลาดในการสร้าง Session');
      }
    } catch (error) {
      console.error('Error creating session:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง Session');
    } finally {
      setIsCreating(false);
    }
  };

  const selectedGameModes = formData.game ? GAME_MODES[formData.game] || [] : [];
  const selectedRoles = formData.game ? ROLES[formData.game] || [] : [];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 rounded-xl border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6">🎮 สร้าง LFG Session</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Game Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            เกม *
          </label>
          <select
            value={formData.game}
            onChange={(e) => setFormData({ ...formData, game: e.target.value as GameId, gameMode: '', role: '' })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          >
            <option value="">เลือกเกม</option>
            {GAMES.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        {/* Game Mode */}
        {formData.game && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              โหมด *
            </label>
            <select
              value={formData.gameMode}
              onChange={(e) => setFormData({ ...formData, gameMode: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            >
              <option value="">เลือกโหมด</option>
              {selectedGameModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Rank */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Rank ของคุณ *
          </label>
          <select
            value={formData.rank}
            onChange={(e) => setFormData({ ...formData, rank: e.target.value as RankTier })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          >
            <option value="">เลือก Rank</option>
            {RANKS.map((rank) => (
              <option key={rank} value={rank}>
                {rank.charAt(0).toUpperCase() + rank.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        {formData.game && selectedRoles.length > 1 && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Role ที่ต้องการ
            </label>
            <select
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as RoleType })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Any Role</option>
              {selectedRoles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Number of Players Needed */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            ต้องการคนเพิ่ม (คน) *
          </label>
          <input
            type="number"
            min="1"
            max="9"
            value={formData.neededPlayers}
            onChange={(e) => setFormData({ ...formData, neededPlayers: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          />
        </div>

        {/* Voice Option */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Voice Chat *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'in-game', label: 'In-Game', icon: '🎮' },
              { value: 'discord', label: 'Discord', icon: '💬' },
              { value: 'no-voice', label: 'No Voice', icon: '🔇' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, voiceOption: option.value as VoiceOption })}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  formData.voiceOption === option.value
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="text-2xl mb-1">{option.icon}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Mood
          </label>
          <div className="grid grid-cols-3 gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setFormData({ ...formData, mood: mood.value })}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  formData.mood === mood.value
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="text-xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-medium">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Verification Method */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            วิธีตรวจสอบ Session *
          </label>
          <div className="space-y-3">
            <label className="flex items-center p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-slate-500">
              <input
                type="radio"
                name="verification"
                value="ready-check"
                checked={formData.verificationMethod === 'ready-check'}
                onChange={(e) => setFormData({ ...formData, verificationMethod: e.target.value as any })}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <div className="ml-3">
                <div className="font-medium text-white">⏱️ Ready Check (60 วินาที)</div>
                <div className="text-xs text-slate-400">ผู้เล่นต้องกดยืนยันภายใน 60 วินาที</div>
              </div>
            </label>

            <label className="flex items-center p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-slate-500">
              <input
                type="radio"
                name="verification"
                value="discord-bot"
                checked={formData.verificationMethod === 'discord-bot'}
                onChange={(e) => setFormData({ ...formData, verificationMethod: e.target.value as any })}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <div className="ml-3">
                <div className="font-medium text-white">💬 Discord Bot (Auto Room)</div>
                <div className="text-xs text-slate-400">สร้างห้อง Discord อัตโนมัติและติดตามการเข้าร่วม</div>
              </div>
            </label>

            <label className="flex items-center p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-slate-500">
              <input
                type="radio"
                name="verification"
                value="game-api"
                checked={formData.verificationMethod === 'game-api'}
                onChange={(e) => setFormData({ ...formData, verificationMethod: e.target.value as any })}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
              />
              <div className="ml-3">
                <div className="font-medium text-white">🎮 Game API</div>
                <div className="text-xs text-slate-400">เชื่อมต่อกับเกมโดยตรง (เกมที่รองรับ)</div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            disabled={isCreating}
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isCreating}
          >
            {isCreating ? 'กำลังสร้าง...' : '🚀 เริ่มหาทีม'}
          </button>
        </div>
      </form>
    </div>
  );
}
