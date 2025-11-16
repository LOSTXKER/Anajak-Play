'use client';

import { useState } from 'react';
import { X, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { games } from '@/lib/mockData';
import { Party, Game } from '@/lib/types';

interface CreatePartyModalProps {
  onClose: () => void;
  onCreate: (party: Party) => void;
}

export default function CreatePartyModal({ onClose, onCreate }: CreatePartyModalProps) {
  const [step, setStep] = useState(1);
  const [selectedGame, setSelectedGame] = useState<Game>(games[0]);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    mode: 'Ranked',
    rank: 'Any',
    mic: true,
    voiceChat: false,
    discordLink: '',
    slots: [
      { role: 'Any', status: 'open' as const },
      { role: 'Any', status: 'open' as const },
      { role: 'Any', status: 'open' as const },
      { role: 'Any', status: 'open' as const }
    ]
  });

  const updateSlot = (index: number, field: string, value: string) => {
    const newSlots = [...formData.slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setFormData({ ...formData, slots: newSlots });
  };

  const addSlot = () => {
    if (formData.slots.length < 9) {
       setFormData({ ...formData, slots: [...formData.slots, { role: 'Any', status: 'open' as const }] });
    }
  };

  const removeSlot = (index: number) => {
    const newSlots = formData.slots.filter((_, i) => i !== index);
    setFormData({ ...formData, slots: newSlots });
  };

  const handleSubmit = () => {
     const newParty: Party = {
        id: Date.now(),
        title: formData.title || `ปาร์ตี้ของ Meelike God`,
        desc: formData.desc,
        game: selectedGame.name,
        mode: formData.mode,
        rank: formData.rank,
        roles: formData.slots.map(s => s.role),
        requiredRoles: [
           { role: "Leader", status: "filled", player: "Meelike God", avatar: "Felix", ready: true, isLeader: true, isMe: true },
           ...formData.slots.map(s => ({
              role: s.role,
              status: 'open' as const
           }))
        ],
        currentPlayers: 1,
        maxPlayers: formData.slots.length + 1,
        mic: formData.mic,
        leader: "Meelike God",
        leaderRep: 5.0,
        leaderAvatar: "Felix",
        tags: ["New"],
        time: "ตอนนี้",
        voiceChat: formData.voiceChat && formData.discordLink ? {
          type: 'discord',
          link: formData.discordLink
        } : undefined,
        spectators: []
     };
     onCreate(newParty);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
       <div className="relative w-full max-w-2xl bg-[#13132b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0f0f1a]">
             <div>
               <h2 className="text-xl font-bold text-white">สร้างปาร์ตี้หาคน</h2>
               <p className="text-xs text-gray-400">
                 Step {step}/2: {step === 1 ? 'เลือกเกม & โหมด' : 'รายละเอียด & ตำแหน่ง'}
               </p>
             </div>
             <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition">
               <X size={20} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
             {step === 1 ? (
                <div className="space-y-6">
                   {/* Game Selection */}
                   <div>
                      <label className="block text-sm font-bold text-gray-300 mb-3">เลือกเกมที่จะเล่น</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                         {games.map(g => (
                            <button 
                               key={g.id}
                               onClick={() => setSelectedGame(g)}
                               className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                                 selectedGame.id === g.id 
                                   ? 'bg-purple-600/20 border-purple-500 text-white ring-1 ring-purple-500' 
                                   : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                               }`}
                            >
                               <div className="text-2xl">{g.icon}</div>
                               <span className="text-sm font-semibold">{g.name}</span>
                            </button>
                         ))}
                      </div>
                   </div>

                   {/* Mode & Rank */}
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-bold text-gray-300 mb-2">โหมด</label>
                         <select 
                            value={formData.mode}
                            onChange={(e) => setFormData({...formData, mode: e.target.value})}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:border-purple-500 outline-none"
                         >
                            <option value="Ranked">Ranked (ลงแรงค์)</option>
                            <option value="Unrated">Unrated (เล่นธรรมดา)</option>
                            <option value="Tournament">Tournament</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-gray-300 mb-2">แรงค์ขั้นต่ำ</label>
                         <select 
                             value={formData.rank}
                             onChange={(e) => setFormData({...formData, rank: e.target.value})}
                             className="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:border-purple-500 outline-none"
                         >
                            <option value="Any">ไม่จำกัด (Any)</option>
                            <option value="Gold">Gold+</option>
                            <option value="Diamond">Diamond+</option>
                            <option value="Conqueror">Conqueror / Radiant</option>
                         </select>
                      </div>
                   </div>

                   {/* Toggle Options */}
                   <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                         <div 
                           className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                             formData.mic ? 'bg-green-500' : 'bg-gray-600'
                           }`} 
                           onClick={() => setFormData({...formData, mic: !formData.mic})}
                         >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              formData.mic ? 'left-5' : 'left-1'
                            }`}></div>
                         </div>
                         <span className="text-sm text-gray-300">ต้องการไมค์ (Microphone Required)</span>
                      </div>

                      <div className="flex items-center gap-3 bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
                         <div 
                           className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                             formData.voiceChat ? 'bg-indigo-500' : 'bg-gray-600'
                           }`} 
                           onClick={() => setFormData({...formData, voiceChat: !formData.voiceChat})}
                         >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                              formData.voiceChat ? 'left-5' : 'left-1'
                            }`}></div>
                         </div>
                         <span className="text-sm text-gray-300">🎤 มี Discord Voice Chat</span>
                      </div>

                      {formData.voiceChat && (
                         <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="block text-xs font-bold text-gray-400 mb-2">Discord Link</label>
                            <input 
                               type="url" 
                               placeholder="https://discord.gg/your-invite-code" 
                               value={formData.discordLink}
                               onChange={(e) => setFormData({...formData, discordLink: e.target.value})}
                               className="w-full bg-black/30 border border-indigo-500/30 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                               วางลิงก์เชิญ Discord ของคุณที่นี่ เพื่อให้สมาชิกเข้า Voice Chat
                            </p>
                         </div>
                      )}
                   </div>
                </div>
             ) : (
                <div className="space-y-6">
                   {/* Basic Info */}
                   <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">หัวข้อห้อง (Title)</label>
                      <input 
                         type="text" 
                         placeholder="เช่น หาคนแบก, ลงแรงค์ขอคนงานดี..." 
                         value={formData.title}
                         onChange={(e) => setFormData({...formData, title: e.target.value})}
                         className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">รายละเอียดเพิ่มเติม</label>
                      <textarea 
                         rows={2}
                         placeholder="รายละเอียดเพิ่มเติม..." 
                         value={formData.desc}
                         onChange={(e) => setFormData({...formData, desc: e.target.value})}
                         className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none resize-none"
                      />
                   </div>

                   {/* Slots Config */}
                   <div>
                      <div className="flex justify-between items-center mb-3">
                         <label className="text-sm font-bold text-gray-300">
                           ตำแหน่งที่เปิดรับ ({formData.slots.length})
                         </label>
                         <button 
                           onClick={addSlot} 
                           className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                         >
                           <Plus size={12}/> เพิ่มช่อง
                         </button>
                      </div>
                      <div className="space-y-2">
                         {formData.slots.map((slot, idx) => (
                            <div key={idx} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
                               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 text-xs font-bold">
                                  {idx + 2}
                               </div>
                               <select 
                                  value={slot.role}
                                  onChange={(e) => updateSlot(idx, 'role', e.target.value)}
                                  className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 outline-none"
                               >
                                  {selectedGame.roles.map(r => <option key={r} value={r}>{r}</option>)}
                               </select>
                               <button 
                                 onClick={() => removeSlot(idx)} 
                                 className="p-2 text-gray-500 hover:text-red-400 transition"
                               >
                                 <Trash2 size={16}/>
                               </button>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             )}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-white/10 bg-[#0f0f1f] flex justify-between">
             {step === 2 ? (
                <button 
                  onClick={() => setStep(1)} 
                  className="px-4 py-2 text-gray-400 hover:text-white transition"
                >
                  ย้อนกลับ
                </button>
             ) : (
                <div></div>
             )}
             
             {step === 1 ? (
                <button 
                  onClick={() => setStep(2)} 
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center gap-2"
                >
                   ถัดไป <ChevronRight size={16}/>
                </button>
             ) : (
                <button 
                  onClick={handleSubmit} 
                  className="px-8 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg"
                >
                   สร้างห้องเลย 🚀
                </button>
             )}
          </div>
       </div>
    </div>
  );
}
