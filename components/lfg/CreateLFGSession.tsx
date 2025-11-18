'use client';

import { useState } from 'react';
import { GameId, RankTier, RoleType, VoiceOption, MoodStatus } from '@/lib/types/index';
import { 
  Users, 
  Mic, 
  MicOff, 
  Gamepad2, 
  Swords, 
  Clock, 
  Shield, 
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CreateLFGSessionProps {
  onSessionCreated?: (sessionId: string, data: SessionFormData) => void;
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

const GAMES: { id: GameId; name: string; icon: string }[] = [
  { id: 'rov', name: 'RoV', icon: '/games/rov.png' },
  { id: 'valorant', name: 'Valorant', icon: '/games/valorant.png' },
  { id: 'lol', name: 'League of Legends', icon: '/games/lol.png' },
  { id: 'mlbb', name: 'Mobile Legends', icon: '/games/mlbb.png' },
  { id: 'pubg', name: 'PUBG', icon: '/games/pubg.png' },
  { id: 'genshin', name: 'Genshin Impact', icon: '/games/genshin.png' },
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

const MOODS: { value: MoodStatus; label: string; emoji: string; desc: string }[] = [
  { value: 'fun', label: 'Fun & Chill', emoji: '😄', desc: 'เล่นขำๆ ไม่ซีเรียส' },
  { value: 'tryhard', label: 'Tryhard', emoji: '🔥', desc: 'เน้นชนะ จริงจัง' },
  { value: 'competitive', label: 'Competitive', emoji: '⚔️', desc: 'ฝึกซ้อมทีม แข่ง' },
  { value: 'chill', label: 'Relaxed', emoji: '🌊', desc: 'ผ่อนคลาย สบายๆ' },
];

export default function CreateLFGSession({ onSessionCreated, onCancel }: CreateLFGSessionProps) {
  const [step, setStep] = useState(1);
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
      const response = await fetch('/api/lfg/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        onSessionCreated?.(data.sessionId, formData);
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
    <div className="w-full max-w-3xl mx-auto bg-[#13132b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
       {/* Background Effects */}
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
       
       {/* Header */}
       <div className="relative z-10 p-6 border-b border-white/5 bg-[#0a0a16]/50 backdrop-blur-sm flex items-center justify-between">
         <div>
           <h2 className="text-2xl font-bold text-white flex items-center gap-2">
             <Sparkles className="text-purple-400 fill-purple-400" size={20} /> 
             สร้างห้องปาร์ตี้
           </h2>
           <p className="text-sm text-gray-400">ประกาศหาเพื่อนร่วมทีมในแบบที่คุณต้องการ</p>
         </div>
         <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition">
            <X size={20} />
         </button>
       </div>

       {/* Steps Progress */}
       <div className="relative z-10 px-6 py-4 bg-[#0f0f1e] border-b border-white/5">
          <div className="flex items-center gap-2">
             {[1, 2, 3].map(s => (
               <div key={s} className="flex items-center flex-1">
                  <div className={`
                     w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                     ${step >= s 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/20' 
                        : 'bg-[#18181b] text-gray-500 border border-white/5'
                     }
                  `}>
                     {step > s ? <CheckCircle2 size={14} /> : s}
                  </div>
                  <div className={`ml-3 text-xs font-bold uppercase ${step >= s ? 'text-white' : 'text-gray-600'}`}>
                     {s === 1 ? 'เกม & โหมด' : s === 2 ? 'รายละเอียด' : 'ยืนยัน'}
                  </div>
                  {s < 3 && (
                     <div className={`flex-1 h-[1px] mx-4 ${step > s ? 'bg-purple-500/50' : 'bg-white/5'}`}></div>
                  )}
               </div>
             ))}
          </div>
       </div>

       {/* Scrollable Content */}
       <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative z-10 bg-[#0a0a12]">
         <form id="create-session-form" onSubmit={handleSubmit}>
           
           {/* STEP 1: Game & Basic Info */}
           {step === 1 && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-6"
             >
               {/* Game Select */}
               <div>
                 <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">เลือกเกมที่คุณจะเล่น</label>
                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                   {GAMES.map((game) => (
                     <button
                       key={game.id}
                       type="button"
                       onClick={() => setFormData({ ...formData, game: game.id, gameMode: '', role: '' })}
                       className={`
                         relative group flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all
                         ${formData.game === game.id 
                           ? 'bg-purple-600/10 border-purple-500 ring-1 ring-purple-500/50' 
                           : 'bg-[#13132b] border-white/5 hover:border-white/20 hover:bg-[#1a1a35]'
                         }
                       `}
                     >
                       <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center overflow-hidden">
                          {/* Placeholder for game icon */}
                          <Gamepad2 className={formData.game === game.id ? 'text-purple-400' : 'text-gray-600'} />
                       </div>
                       <span className={`text-xs font-bold ${formData.game === game.id ? 'text-white' : 'text-gray-400'}`}>
                         {game.name}
                       </span>
                       {formData.game === game.id && (
                         <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></div>
                       )}
                     </button>
                   ))}
                 </div>
               </div>

               {formData.game && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeIn">
                   {/* Mode */}
                   <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">โหมดการเล่น</label>
                      <select
                        value={formData.gameMode}
                        onChange={(e) => setFormData({ ...formData, gameMode: e.target.value })}
                        className="w-full bg-[#13132b] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors appearance-none"
                        required
                      >
                        <option value="">เลือกโหมด...</option>
                        {selectedGameModes.map(mode => (
                          <option key={mode} value={mode}>{mode}</option>
                        ))}
                      </select>
                   </div>

                   {/* Rank */}
                   <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Rank ของคุณ</label>
                      <select
                        value={formData.rank}
                        onChange={(e) => setFormData({ ...formData, rank: e.target.value as RankTier })}
                        className="w-full bg-[#13132b] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors appearance-none"
                        required
                      >
                        <option value="">เลือก Rank...</option>
                        {RANKS.map(rank => (
                          <option key={rank} value={rank}>{rank.charAt(0).toUpperCase() + rank.slice(1)}</option>
                        ))}
                      </select>
                   </div>
                 </div>
               )}
             </motion.div>
           )}

           {/* STEP 2: Details & Preferences */}
           {step === 2 && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
             >
                {/* Player Count & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">ต้องการคนเพิ่ม (คน)</label>
                      <div className="flex items-center bg-[#13132b] border border-white/10 rounded-xl p-1">
                         {[1, 2, 3, 4].map(num => (
                           <button
                             key={num}
                             type="button"
                             onClick={() => setFormData({ ...formData, neededPlayers: num })}
                             className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                               formData.neededPlayers === num 
                                 ? 'bg-[#27272a] text-white shadow-sm' 
                                 : 'text-gray-500 hover:text-gray-300'
                             }`}
                           >
                             {num}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div>
                      <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">Role ที่ขาด (Optional)</label>
                      <select
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as RoleType })}
                        className="w-full bg-[#13132b] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors appearance-none"
                      >
                        <option value="">Any Role</option>
                        {selectedRoles.map(role => (
                          <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                        ))}
                      </select>
                   </div>
                </div>

                {/* Mood Selection */}
                <div>
                   <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">บรรยากาศทีม (Mood)</label>
                   <div className="grid grid-cols-2 gap-3">
                      {MOODS.map((mood) => (
                        <button
                          key={mood.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, mood: mood.value })}
                          className={`
                            flex items-center gap-3 p-3 rounded-xl border text-left transition-all
                            ${formData.mood === mood.value 
                              ? 'bg-purple-600/10 border-purple-500' 
                              : 'bg-[#13132b] border-white/5 hover:border-white/20'
                            }
                          `}
                        >
                           <div className="text-2xl">{mood.emoji}</div>
                           <div>
                              <div className={`text-sm font-bold ${formData.mood === mood.value ? 'text-purple-400' : 'text-white'}`}>{mood.label}</div>
                              <div className="text-xs text-gray-500">{mood.desc}</div>
                           </div>
                        </button>
                      ))}
                   </div>
                </div>

                {/* Voice Option */}
                <div>
                   <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">การสื่อสาร (Voice Chat)</label>
                   <div className="flex gap-3">
                      {[
                         { val: 'in-game', label: 'In-Game', icon: <Gamepad2 size={16}/> },
                         { val: 'discord', label: 'Discord', icon: <Mic size={16}/> },
                         { val: 'no-voice', label: 'No Mic', icon: <MicOff size={16}/> }
                      ].map((opt) => (
                         <button
                           key={opt.val}
                           type="button"
                           onClick={() => setFormData({ ...formData, voiceOption: opt.val as VoiceOption })}
                           className={`
                             flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold transition-all
                             ${formData.voiceOption === opt.val 
                               ? 'bg-white text-black border-white' 
                               : 'bg-[#13132b] text-gray-400 border-white/5 hover:border-white/20'
                             }
                           `}
                         >
                            {opt.icon} {opt.label}
                         </button>
                      ))}
                   </div>
                </div>
             </motion.div>
           )}

           {/* STEP 3: Review */}
           {step === 3 && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-4"
             >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-purple-600/30">
                   <Sparkles className="text-white w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">พร้อมเปิดห้องแล้ว?</h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">ห้องของคุณจะแสดงใน Lobby เป็นเวลา 30 นาที หรือจนกว่าคนจะครบ</p>

                <div className="bg-[#13132b] rounded-2xl p-6 border border-white/10 text-left max-w-sm mx-auto mb-8">
                   <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div className="text-gray-500">Game</div>
                      <div className="text-right font-bold text-white uppercase">{formData.game}</div>
                      
                      <div className="text-gray-500">Mode</div>
                      <div className="text-right font-bold text-white">{formData.gameMode}</div>
                      
                      <div className="text-gray-500">Rank</div>
                      <div className="text-right font-bold text-cyan-400 uppercase">{formData.rank}</div>
                      
                      <div className="text-gray-500">Mood</div>
                      <div className="text-right font-bold text-white capitalize">{formData.mood || 'Any'}</div>
                   </div>
                </div>
             </motion.div>
           )}

         </form>
       </div>

       {/* Footer Actions */}
       <div className="p-6 border-t border-white/5 bg-[#0a0a16]/80 backdrop-blur-md flex justify-between items-center relative z-10">
          {step > 1 ? (
             <button 
               type="button"
               onClick={() => setStep(s => s - 1)}
               className="px-6 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
             >
               ย้อนกลับ
             </button>
          ) : (
             <div></div>
          )}

          {step < 3 ? (
             <button 
               type="button"
               onClick={() => {
                 if (step === 1 && (!formData.game || !formData.gameMode)) {
                   alert('กรุณาเลือกเกมและโหมดก่อน');
                   return;
                 }
                 setStep(s => s + 1);
               }}
               className="px-8 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
             >
               ต่อไป
             </button>
          ) : (
             <button 
               form="create-session-form"
               type="submit"
               disabled={isCreating}
               className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-purple-600/25 transition-all transform hover:scale-105"
             >
               {isCreating ? 'กำลังสร้าง...' : '🚀 ยืนยันการสร้างห้อง'}
             </button>
          )}
       </div>
    </div>
  );
}