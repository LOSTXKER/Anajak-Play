'use client';

import React from 'react';
import { mockUsers } from '@/lib/data/mock-data';
import { Shield, Star, Gamepad2, Edit } from 'lucide-react';

export default function ProfilePage() {
  const user = mockUsers[0];
  
  const getReputationTier = (score: number) => {
    if (score >= 90) return { label: 'EXCELLENT', color: 'text-cyan-400' };
    if (score >= 80) return { label: 'VERY GOOD', color: 'text-green-400' };
    if (score >= 70) return { label: 'GOOD', color: 'text-blue-400' };
    if (score >= 60) return { label: 'FAIR', color: 'text-yellow-400' };
    return { label: 'POOR', color: 'text-red-400' };
  };
  
  const repTier = getReputationTier(user.reputation.overall);
  
  return (
    <div className="min-h-screen bg-[#0a0a16] pb-12">
      <div className="relative bg-gradient-to-b from-purple-900/20 to-transparent border-b border-white/10 pb-8 pt-8">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                alt={user.displayName}
                className="w-full h-full rounded-full bg-[#13132b]"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#13132b] px-3 py-1 rounded-full border border-purple-500/50 text-xs font-bold text-purple-400">
              LV {user.level}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-1">{user.displayName}</h1>
            <p className="text-gray-400 mb-3">@{user.username}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
              <div>
                <div className="text-2xl font-bold text-white">{user.level}</div>
                <div className="text-xs text-gray-400">Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">{user.reputation.overall}</div>
                <div className="text-xs text-gray-400">Reputation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{user.profile.totalSessions}</div>
                <div className="text-xs text-gray-400">Sessions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{user.profile.friendCount}</div>
                <div className="text-xs text-gray-400">Friends</div>
              </div>
            </div>
            
            <div className="max-w-md">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>EXP: {user.exp.toLocaleString()} / {user.expToNextLevel.toLocaleString()}</span>
                <span>{Math.floor((user.exp / user.expToNextLevel) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  style={{ width: `${(user.exp / user.expToNextLevel) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition flex items-center gap-2">
            <Edit size={16} />
            แก้ไขโปรไฟล์
          </button>
        </div>
        
        {user.profile.bio && (
          <div className="mt-6 max-w-2xl">
            <p className="text-gray-300 text-sm leading-relaxed">
              &quot;{user.profile.bio}&quot;
            </p>
          </div>
        )}
        </div>
      </div>
      
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#13132b] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Gamepad2 className="text-purple-400" />
                  เกมที่เล่น
                </h2>
              </div>
              
              <div className="space-y-4">
                {user.profile.mainGames.map((gameProfile, idx) => {
                  const gameIcon = gameProfile.game === 'rov' ? '⚔️' : 
                                  gameProfile.game === 'valorant' ? '🔫' : '🎮';
                  const gameName = gameProfile.game === 'rov' ? 'Garena RoV' : 
                                  gameProfile.game === 'valorant' ? 'Valorant' : 
                                  gameProfile.game.toUpperCase();
                  
                  return (
                    <div 
                      key={idx} 
                      className={`relative bg-[#1a1a2e] border ${gameProfile.isMain ? 'border-purple-500/50' : 'border-white/10'} rounded-xl p-4 hover:border-purple-500/50 transition group`}
                    >
                      {gameProfile.isMain && (
                        <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <Star size={10} fill="currentColor" /> Main
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-3xl border border-white/10">
                          {gameIcon}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg mb-1">{gameName}</h3>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-gray-400">Current Rank</span>
                            <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded flex items-center justify-center">
                              <Shield size={14} className="text-white" />
                            </div>
                            <span className="font-bold text-cyan-400 capitalize">{gameProfile.rank}</span>
                          </div>
                          
                          <div className="mb-2">
                            <span className="text-xs text-gray-400 mr-2">Main Roles</span>
                            <div className="inline-flex gap-2">
                              {gameProfile.role.map((role, i) => (
                                <span 
                                  key={i} 
                                  className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-gray-300 capitalize"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-[#13132b] border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                ⭐ สไตล์การเล่น
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Playstyle</p>
                  <div className="flex flex-wrap gap-2">
                    {user.profile.playstyle.map((style, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 capitalize"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-2">Preferred Roles</p>
                  <div className="flex flex-wrap gap-2">
                    {user.profile.preferredRoles.map((role, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm text-cyan-300 capitalize"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#13132b] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Shield className="text-yellow-400" />
                  ระบบชื่อเสียง
                </h3>
                <span className={`text-xs font-bold px-2 py-1 rounded ${repTier.color} bg-current bg-opacity-10`}>
                  {repTier.label}
                </span>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-white mb-2">{user.reputation.overall}</div>
                <p className="text-sm text-gray-400">คะแนนรวม (0-100)</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">😊 Behavior</span>
                    <span className="text-white font-bold">{user.reputation.behavior}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500"
                      style={{ width: `${user.reputation.behavior}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">⚡ Reliability</span>
                    <span className="text-white font-bold">{user.reputation.reliability}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500"
                      style={{ width: `${user.reputation.reliability}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">🤝 Teamwork</span>
                    <span className="text-white font-bold">{user.reputation.teamwork}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500"
                      style={{ width: `${user.reputation.teamwork}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-400">{user.reputation.positiveReviews}</div>
                    <div className="text-[10px] text-gray-400">👍 Positive</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-red-400">{user.reputation.negativeReviews}</div>
                    <div className="text-[10px] text-gray-400">👎 Negative</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">{user.reputation.totalReviews}</div>
                    <div className="text-[10px] text-gray-400">📝 Total</div>
                  </div>
                </div>
              </div>
            </div>
            
            {user.reputation.badges && user.reputation.badges.length > 0 && (
              <div className="bg-[#13132b] border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">🏆 Personality Badges</h3>
                <div className="flex flex-wrap gap-2">
                  {user.reputation.badges.map((badge, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg text-center"
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="text-xs font-bold text-yellow-400">{badge.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
