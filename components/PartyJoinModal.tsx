'use client';

import { useState } from 'react';
import { X, Users, CheckCircle2, Shield, Star, Mic, Swords } from 'lucide-react';
import { Party } from '@/lib/types';

interface PartyJoinModalProps {
  party: Party;
  onClose: () => void;
  onConfirm: (party: Party, selectedRole: string) => void;
}

export default function PartyJoinModal({ party, onClose, onConfirm }: PartyJoinModalProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  if (!party) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
       {/* Backdrop */}
       <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

       {/* Modal Content */}
       <div className="relative w-full max-w-2xl bg-[#13132b] border border-white/10 rounded-3xl shadow-2xl shadow-purple-900/20 overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header Image/Gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-900 to-purple-900 relative">
             <div className="absolute top-4 right-4">
                <button onClick={onClose} className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition">
                   <X size={20} />
                </button>
             </div>
             <div className="absolute -bottom-8 left-8 flex items-end gap-4">
                <img 
                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${party.leaderAvatar}`} 
                   alt="Leader"
                   className="w-20 h-20 rounded-full bg-[#05050a] border-4 border-[#13132b]"
                />
                <div className="mb-2">
                   <h3 className="text-2xl font-bold text-white leading-none">{party.leader}</h3>
                   <div className="flex items-center gap-2 mt-1 text-sm text-gray-300">
                      <span className="bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded text-xs font-bold border border-yellow-500/30 flex items-center gap-1">
                         <Star size={12} fill="currentColor" /> {party.leaderRep}
                      </span>
                      <span>•</span>
                      <span>สร้างห้องเมื่อ {party.time}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Body */}
          <div className="p-8 pt-12 overflow-y-auto custom-scrollbar">
             
             {/* Title & Game */}
             <div className="flex justify-between items-start mb-6">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/30 uppercase tracking-wider font-bold">{party.game}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] border border-blue-500/30 uppercase tracking-wider font-bold">{party.mode}</span>
                   </div>
                   <h2 className="text-2xl font-bold text-white mb-2">{party.title}</h2>
                   <p className="text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5 text-sm leading-relaxed">
                      &ldquo;{party.desc || 'ไม่มีรายละเอียดเพิ่มเติม'}&rdquo;
                   </p>
                </div>
                <div className="text-right hidden md:block">
                   <div className="text-xs text-gray-500 uppercase mb-1">แรงค์ที่ต้องการ</div>
                   <div className="text-xl font-bold text-cyan-400">{party.rank}</div>
                </div>
             </div>

             {/* Slots / Roles Selection */}
             <div className="mb-8">
                <h4 className="text-white font-bold mb-4 flex items-center justify-between">
                   <span className="flex items-center gap-2">
                      <Users size={18} className="text-purple-400" /> 
                      ตำแหน่งในทีม (เลือก 1 ตำแหน่ง)
                   </span>
                   <span className="text-sm font-normal text-gray-400">
                      ว่าง {party.requiredRoles.filter(r => r.status === 'open').length}/{party.requiredRoles.length}
                   </span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                   {party.requiredRoles && party.requiredRoles.map((role, idx) => {
                      const isFilled = role.status === 'filled';
                      const isSelected = selectedRole === role.role;

                      return (
                         <button 
                            key={idx}
                            disabled={isFilled}
                            onClick={() => setSelectedRole(role.role)}
                            className={`
                               relative p-3 rounded-xl border text-left transition-all flex items-center gap-3
                               ${isFilled 
                                  ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed' 
                                  : isSelected 
                                     ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                                     : 'bg-[#1a1a2e] border-white/10 hover:border-white/30 hover:bg-[#232342]'
                               }
                            `}
                         >
                            <div className={`
                               w-10 h-10 rounded-full flex items-center justify-center
                               ${isFilled ? 'bg-gray-700 text-gray-400' : isSelected ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-400'}
                            `}>
                               {isFilled ? (
                                  <img 
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role.player}`} 
                                    alt={role.player || 'Player'}
                                    className="w-full h-full rounded-full" 
                                  />
                               ) : (
                                  <Swords size={16} />
                               )}
                            </div>
                            <div>
                               <div className={`text-sm font-bold ${isFilled ? 'text-gray-500' : 'text-white'}`}>{role.role}</div>
                               <div className="text-[10px] text-gray-400">
                                  {isFilled ? role.player : 'ว่าง (Open)'}
                               </div>
                            </div>
                            {isSelected && <div className="absolute top-2 right-2 text-purple-400"><CheckCircle2 size={16} fill="currentColor" className="text-white"/></div>}
                         </button>
                      )
                   })}
                </div>
             </div>

             {/* Requirements Check */}
             <div className="bg-black/30 rounded-xl p-4 border border-white/5 mb-6">
                <h5 className="text-sm font-bold text-gray-400 mb-3 uppercase">คุณสมบัติของคุณ</h5>
                <div className="space-y-2">
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 flex items-center gap-2"><Swords size={14}/> Rank: Conqueror</span>
                      <span className="text-green-400 flex items-center gap-1"><CheckCircle2 size={14}/> ผ่านเกณฑ์</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 flex items-center gap-2"><Shield size={14}/> Reputation: 4.8</span>
                      <span className="text-green-400 flex items-center gap-1"><CheckCircle2 size={14}/> ผ่านเกณฑ์</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 flex items-center gap-2"><Mic size={14}/> Microphone</span>
                      <span className="text-green-400 flex items-center gap-1"><CheckCircle2 size={14}/> มีไมค์</span>
                   </div>
                </div>
             </div>

          </div>

          {/* Footer Action */}
          <div className="p-5 border-t border-white/10 bg-[#0f0f1f] flex justify-between items-center">
             <div className="text-xs text-gray-500">
                การกดยืนยันถือว่าคุณยอมรับ<br/>กฎของห้องและ Anajak Play
             </div>
             <div className="flex gap-3">
                <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-gray-300 hover:bg-white/10 font-semibold transition">
                   ยกเลิก
                </button>
                <button 
                   onClick={() => selectedRole && onConfirm(party, selectedRole)}
                   disabled={selectedRole === null}
                   className={`
                      px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg
                      ${selectedRole !== null 
                         ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-purple-600/25 transform hover:scale-105' 
                         : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      }
                   `}
                >
                   เข้าร่วมปาร์ตี้
                </button>
             </div>
          </div>

       </div>
    </div>
  );
}
