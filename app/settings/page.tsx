'use client';

import { useState } from 'react';
import { User, Bell, Lock, Globe, Palette, Shield, Volume2, Monitor, ChevronRight, Check } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import Navbar from '@/components/Navbar';
import NotificationDropdown from '@/components/NotificationDropdown';
import UserProfileModal from '@/components/UserProfileModal';
import { notificationsData } from '@/lib/mockData';

export default function SettingsPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [notifications] = useState(notificationsData);
  
  // Settings States
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    partyInvites: true,
    messageSound: true,
    language: 'th',
    theme: 'dark',
    autoJoinVoice: false,
    showOnlineStatus: true,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingsSections = [
    {
      title: 'บัญชีผู้ใช้',
      icon: User,
      items: [
        { label: 'แก้ไขโปรไฟล์', action: 'profile', type: 'link' },
        { label: 'เปลี่ยนรหัสผ่าน', action: 'password', type: 'link' },
        { label: 'การยืนยันตัวตน', action: 'verification', type: 'link' },
      ]
    },
    {
      title: 'การแจ้งเตือน',
      icon: Bell,
      items: [
        { label: 'แจ้งเตือนทางอีเมล', action: 'emailNotifications', type: 'toggle', value: settings.emailNotifications },
        { label: 'แจ้งเตือนแบบ Push', action: 'pushNotifications', type: 'toggle', value: settings.pushNotifications },
        { label: 'คำเชิญเข้าปาร์ตี้', action: 'partyInvites', type: 'toggle', value: settings.partyInvites },
      ]
    },
    {
      title: 'เสียงและการแสดงผล',
      icon: Volume2,
      items: [
        { label: 'เสียงแจ้งเตือนข้อความ', action: 'messageSound', type: 'toggle', value: settings.messageSound },
        { label: 'เข้าร่วม Voice Chat อัตโนมัติ', action: 'autoJoinVoice', type: 'toggle', value: settings.autoJoinVoice },
        { label: 'ธีมสี', action: 'theme', type: 'select', value: settings.theme, options: [
          { value: 'dark', label: 'Dark Mode' },
          { value: 'light', label: 'Light Mode' },
        ]},
      ]
    },
    {
      title: 'ความเป็นส่วนตัว',
      icon: Shield,
      items: [
        { label: 'แสดงสถานะออนไลน์', action: 'showOnlineStatus', type: 'toggle', value: settings.showOnlineStatus },
        { label: 'การตั้งค่าความเป็นส่วนตัว', action: 'privacy', type: 'link' },
        { label: 'บล็อกผู้ใช้', action: 'blocked', type: 'link' },
      ]
    },
    {
      title: 'ภาษาและภูมิภาค',
      icon: Globe,
      items: [
        { label: 'ภาษา', action: 'language', type: 'select', value: settings.language, options: [
          { value: 'th', label: 'ไทย' },
          { value: 'en', label: 'English' },
        ]},
      ]
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#05050a] text-white font-sans">
      <Sidebar />
      <BottomNav />
      
      <div className="lg:ml-20 pb-16 lg:pb-0">
        <Navbar 
          onOpenProfile={() => setShowProfileModal(true)}
          onToggleNoti={() => setShowNotifications(!showNotifications)}
          notiOpen={showNotifications}
          unreadCount={unreadCount}
        />

        <NotificationDropdown 
          isOpen={showNotifications}
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />

        {showProfileModal && (
          <UserProfileModal onClose={() => setShowProfileModal(false)} />
        )}

        <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">การตั้งค่า</h1>
            <p className="text-gray-400">จัดการการตั้งค่าบัญชีและความชอบของคุณ</p>
          </div>

          <div className="space-y-6">
            {settingsSections.map((section) => (
              <div key={section.title} className="bg-[#0f0f1a] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>

                <div className="space-y-2">
                  {section.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition flex items-center justify-between cursor-pointer"
                      onClick={() => {
                        if (item.type === 'toggle') {
                          toggleSetting(item.action as keyof typeof settings);
                        }
                      }}
                    >
                      <span className="text-white font-medium">{item.label}</span>
                      
                      {item.type === 'toggle' && (
                        <div className={`
                          w-12 h-6 rounded-full transition-colors duration-200 relative
                          ${item.value ? 'bg-purple-500' : 'bg-gray-600'}
                        `}>
                          <div className={`
                            absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200
                            ${item.value ? 'translate-x-6' : 'translate-x-0'}
                          `}></div>
                        </div>
                      )}

                      {item.type === 'select' && 'options' in item && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <span className="text-sm">
                            {item.options?.find((o: { value: string; label: string }) => o.value === item.value)?.label}
                          </span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}

                      {item.type === 'link' && (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Danger Zone */}
            <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/30">
              <h2 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h2>
              <div className="space-y-3">
                <button className="w-full bg-black/30 hover:bg-black/50 text-white py-3 rounded-xl transition text-left px-4 flex items-center justify-between">
                  <span>ปิดการใช้งานบัญชี</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-xl transition text-left px-4 flex items-center justify-between border border-red-500/50">
                  <span>ลบบัญชีถาวร</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-3">
              <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                บันทึกการเปลี่ยนแปลง
              </button>
              <button className="px-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-bold transition">
                ยกเลิก
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
