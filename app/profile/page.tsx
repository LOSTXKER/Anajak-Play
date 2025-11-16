'use client';

import { useState } from 'react';
import { Edit, Trophy, Star, Shield, TrendingUp, Calendar, Award, Gamepad2 } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { userProfileData } from '@/lib/mockData';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'history'>('overview');

  const stats = [
    { label: 'เกมที่เล่น', value: '1,234', icon: Gamepad2, color: 'from-blue-500 to-cyan-500' },
    { label: 'ชนะ', value: '892', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { label: 'อันดับ', value: '#1,234', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'ชื่อเสียง', value: '4.8', icon: Star, color: 'from-green-500 to-emerald-500' },
  ];

  const achievements = [
    { id: 1, name: 'First Victory', icon: '🏆', unlocked: true },
    { id: 2, name: '100 Wins', icon: '🎯', unlocked: true },
    { id: 3, name: 'Team Player', icon: '👥', unlocked: true },
    { id: 4, name: 'Legendary', icon: '⚡', unlocked: false },
    { id: 5, name: 'Pro Gamer', icon: '🎮', unlocked: false },
    { id: 6, name: 'Ultimate', icon: '👑', unlocked: false },
  ];

  const recentGames = [
    { game: 'RoV', mode: 'Ranked', result: 'Win', kda: '10/3/7', date: '2 ชม.ที่แล้ว' },
    { game: 'Valorant', mode: 'Competitive', result: 'Win', kda: '23/15/8', date: '5 ชม.ที่แล้ว' },
    { game: 'RoV', mode: 'Ranked', result: 'Loss', kda: '5/8/12', date: '1 วันที่แล้ว' },
  ];

  const lifestyle = [
    { label: 'เวลาที่เล่น', value: '19:00 - 00:00 (ทุกวัน)' },
    { label: 'โหมดที่ชอบ', value: 'Ranked / Competitive' },
    { label: 'Device', value: 'PC + iPad + Discord Voice' },
  ];

  const profileTabs: Array<'overview' | 'stats' | 'history'> = ['overview', 'stats', 'history'];

  return (
    <DashboardLayout contentClassName="max-w-[1400px]">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 p-1">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfileData.avatar}`}
                    alt="Profile"
                    className="rounded-full bg-black w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
                  <Shield className="w-5 h-5 text-black" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{userProfileData.name}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        {userProfileData.reputation} ชื่อเสียง
                      </span>
                      <span>•</span>
                      <span>เข้าร่วม มกราคม 2024</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition">
                    <Edit className="w-4 h-4" />
                    แก้ไขโปรไฟล์
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="bg-black/30 rounded-xl p-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-2`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            {profileTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-2 rounded-lg font-semibold transition
                  ${activeTab === tab 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }
                `}
              >
                {tab === 'overview' ? 'ภาพรวม' : tab === 'stats' ? 'สถิติ' : 'ประวัติ'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Achievements */}
              <div className="bg-[#0f0f1a] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    ความสำเร็จ
                  </h3>
                  <span className="text-sm text-gray-400">12/50 ปลดล็อคแล้ว</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {achievements.map(achievement => (
                    <div
                      key={achievement.id}
                      className={`
                        p-4 rounded-xl text-center transition-all
                        ${achievement.unlocked 
                          ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' 
                          : 'bg-black/30 opacity-50 grayscale'
                        }
                      `}
                    >
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <div className="text-xs text-gray-300">{achievement.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Games */}
              <div className="bg-[#0f0f1a] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  เกมล่าสุด
                </h3>
                <div className="space-y-3">
                  {recentGames.map((game, idx) => (
                    <div key={idx} className="bg-black/30 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                          <Gamepad2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{game.game}</div>
                          <div className="text-xs text-gray-400">{game.mode}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${game.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>
                          {game.result}
                        </div>
                        <div className="text-xs text-gray-400">{game.kda}</div>
                      </div>
                      <div className="text-xs text-gray-500">{game.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Wallet */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
                <h3 className="text-sm text-gray-400 mb-2">กระเป๋าเงิน</h3>
                <div className="text-3xl font-bold text-white mb-4">
                  ฿{userProfileData.wallet.toLocaleString()}
                </div>
                <button className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-bold transition">
                  เติมเงิน
                </button>
              </div>

              {/* Reputation Level */}
              <div className="bg-[#0f0f1a] rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">ระดับชื่อเสียง</h3>
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-yellow-400">4.8</div>
                  <div className="flex justify-center gap-1 mt-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">Pro Player</div>
                </div>
                <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-400 w-[85%] h-full"></div>
                </div>
                <div className="text-xs text-gray-400 mt-2 text-center">850/1000 XP</div>
              </div>

              {/* Quick Stats */}
              <div className="bg-[#0f0f1a] rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">สถิติด่วน</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">อัตราชนะ</span>
                    <span className="text-green-400 font-bold">72.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ปาร์ตี้ที่เข้าร่วม</span>
                    <span className="text-white font-bold">234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ชั่วโมงเล่น</span>
                    <span className="text-white font-bold">1,234 ชม.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">เกมโปรด</span>
                    <span className="text-cyan-400 font-bold">RoV</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f0f1a] rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">ไลฟ์สไตล์ / Device</h3>
                <div className="space-y-2 text-sm">
                  {lifestyle.map((item) => (
                    <div key={item.label} className="flex justify-between gap-3">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </DashboardLayout>
  );
}
