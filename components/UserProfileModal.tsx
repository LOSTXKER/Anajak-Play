'use client';

import { X, Star, Edit3, Settings, LogOut, Trophy, Wallet, Plus } from 'lucide-react';
import { userProfileData } from '@/lib/mockData';

interface UserProfileModalProps {
  onClose: () => void;
}

export default function UserProfileModal({ onClose }: UserProfileModalProps) {
   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
         <div className="relative w-full max-w-4xl bg-[#0f0f1a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[80vh] animate-in zoom-in duration-200">
            
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white z-10">
              <X size={20}/>
            </button>

            {/* Left Sidebar */}
            <div className="w-full md:w-80 bg-[#13132b] p-6 flex flex-col items-center border-r border-white/10 relative">
               <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-cyan-400 to-purple-600 mb-4 relative group">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfileData.avatar}`} 
                    alt="Profile"
                    className="w-full h-full rounded-full bg-black border-4 border-[#13132b]" 
                  />
                  <button className="absolute bottom-0 right-0 p-1.5 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                     <Edit3 size={14} />
                  </button>
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-1">{userProfileData.name}</h2>
               <p className="text-sm text-gray-400 mb-4">{userProfileData.username}</p>

               <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {userProfileData.badges.map(badge => (
                     <span key={badge} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300">
                        {badge}
                     </span>
                  ))}
               </div>

               <div className="w-full bg-black/30 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-xs text-gray-400">ชื่อเสียง</span>
                     <span className="text-yellow-400 text-lg font-bold flex items-center gap-1">
                       <Star size={16} fill="currentColor"/> {userProfileData.reputation}
                     </span>
                  </div>
                  <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-yellow-400 w-[95%] h-full"></div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 text-center">เครดิตดีเยี่ยม: แนะนำโดยผู้เล่น 42 คน</p>
               </div>

               <div className="mt-auto w-full space-y-2">
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-gray-300 flex items-center justify-center gap-2 transition">
                     <Settings size={16} /> ตั้งค่าบัญชี
                  </button>
                  <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-sm text-red-400 flex items-center justify-center gap-2 transition">
                     <LogOut size={16} /> ออกจากระบบ
                  </button>
               </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0f0f1a]">
               <div className="h-32 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-b border-white/5 relative">
                  <div className="absolute bottom-4 left-6">
                     <h3 className="text-white font-bold flex items-center gap-2">
                       <Trophy size={18} className="text-yellow-400"/> Stats Overview
                     </h3>
                  </div>
               </div>

               <div className="p-6 md:p-8 space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                     <div className="bg-[#1a1a2e] border border-white/5 p-4 rounded-2xl text-center">
                        <div className="text-2xl font-bold text-white">{userProfileData.stats.matches}</div>
                        <div className="text-xs text-gray-400 uppercase">แมทช์</div>
                     </div>
                     <div className="bg-[#1a1a2e] border border-white/5 p-4 rounded-2xl text-center">
                        <div className="text-2xl font-bold text-cyan-400">{userProfileData.stats.winRate}</div>
                        <div className="text-xs text-gray-400 uppercase">อัตราชนะ</div>
                     </div>
                     <div className="bg-[#1a1a2e] border border-white/5 p-4 rounded-2xl text-center">
                        <div className="text-2xl font-bold text-purple-400">{userProfileData.stats.mvp}</div>
                        <div className="text-xs text-gray-400 uppercase">MVP</div>
                     </div>
                  </div>

                  {/* Bio */}
                  <div>
                     <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-bold text-white">เกี่ยวกับฉัน</h4>
                        <button className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
                          <Edit3 size={12}/> แก้ไข
                        </button>
                     </div>
                     <p className="text-gray-300 text-sm leading-relaxed bg-[#1a1a2e] p-4 rounded-xl border border-white/5">
                        {userProfileData.bio}
                     </p>
                  </div>

                  {/* Games */}
                  <div>
                     <h4 className="text-lg font-bold text-white mb-4">โปรไฟล์เกม</h4>
                     <div className="space-y-3">
                        {userProfileData.games.map((game, idx) => (
                           <div key={idx} className="flex items-center gap-4 bg-[#1a1a2e] p-4 rounded-xl border border-white/5 hover:border-purple-500/50 transition group">
                              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-2xl">
                                 {game.name === 'RoV' ? '⚔️' : '🔫'}
                              </div>
                              <div className="flex-1">
                                 <div className="flex justify-between">
                                    <h5 className="font-bold text-white">{game.name}</h5>
                                    <span className={`text-xs px-2 py-0.5 rounded ${game.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                                       {game.active ? 'Active' : 'Inactive'}
                                    </span>
                                 </div>
                                 <div className="text-sm text-cyan-400 font-semibold mt-1">{game.rank}</div>
                                 <div className="flex gap-2 mt-2">
                                    {game.roles.map(role => (
                                       <span key={role} className="text-[10px] px-2 py-0.5 bg-white/5 text-gray-300 rounded border border-white/5">
                                          {role}
                                       </span>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        ))}
                        <button className="w-full py-3 border-2 border-dashed border-white/10 rounded-xl text-gray-500 hover:text-white hover:border-white/20 transition flex items-center justify-center gap-2">
                           <Plus size={16} /> เชื่อมต่อเกมเพิ่ม
                        </button>
                     </div>
                  </div>

                  {/* Wallet */}
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><Wallet size={20}/></div>
                        <div>
                           <div className="text-xs text-gray-400">Anajak กระเป๋าเงิน</div>
                           <div className="text-lg font-bold text-white">฿{userProfileData.wallet.toLocaleString()}</div>
                        </div>
                     </div>
                     <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold text-white transition">
                        เติมเงิน
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
