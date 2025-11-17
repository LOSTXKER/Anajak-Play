'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BellRing, CheckCircle2, Clock, Flame, ShieldCheck, UserPlus, XCircle } from 'lucide-react';

import DashboardLayout from '@/components/layouts/DashboardLayout';
import { notificationsData } from '@/lib/data/legacy-data';

const matchAlerts = [];

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState(matchAlerts);

  const handleRespond = (id: string, action: 'join' | 'skip') => {
    if (action === 'join') {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }
  };

  return (
    <DashboardLayout enableChat enableNotifications={false}>
      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#121233] to-[#090915] p-8 mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400 mb-2">Matching Engine</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            แจ้งเตือน LFG ที่ <span className="text-purple-400">ตรงสเปกที่สุด</span>
          </h1>
          <p className="text-gray-300 max-w-2xl">
            ระบบใช้ Global + Game Filter + Personality เพื่อคำนวน Synergy Rate ก่อนยิงแจ้งเตือนเหมือน Tinder
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/feed" className="inline-flex items-center gap-2 px-4 py-3 bg-white text-black rounded-xl font-bold">
              <UserPlus className="w-5 h-5" /> ดูฟีดทั้งหมด
            </Link>
            <Link href="/create-request" className="inline-flex items-center gap-2 px-4 py-3 border border-white/10 text-white rounded-xl">
              <Flame className="w-5 h-5 text-pink-400" /> ตั้งห้องของฉัน
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-4xl font-bold text-white">{alerts.length}</div>
            <p className="text-xs text-gray-400">คำขอที่รอการตอบกลับ</p>
          </div>
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-center">
            <div className="text-4xl font-bold text-green-400">94%</div>
            <p className="text-xs text-gray-400">ค่าเฉลี่ย Synergy</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BellRing className="w-5 h-5 text-yellow-400" /> การแจ้งเตือนที่ตรงสเปกคุณ
            </h2>
            <button className="text-xs text-gray-400 hover:text-white transition">ทำเครื่องหมายว่าอ่านแล้วทั้งหมด</button>
          </div>

          {alerts.length === 0 ? (
            <div className="border-2 border-dashed border-white/10 rounded-3xl p-10 text-center bg-[#0a0a16]">
              <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">ตอบกลับครบแล้ว</h3>
              <p className="text-gray-400 mb-4">รอแจ้งเตือนใหม่หรือเข้าไปดูฟีดเพื่อหาเองได้เลย</p>
              <Link href="/feed" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-xl">
                ไปหน้า LFG Feed
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="rounded-3xl border border-white/10 bg-[#05050c] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-400">{alert.time}</p>
                      <h3 className="text-xl font-bold text-white mt-1">{alert.game} • {alert.roleNeeded}</h3>
                      <p className="text-sm text-gray-400">แรงค์ที่ต้องการ: {alert.rankRange}</p>
                      <p className="text-sm text-gray-400">Mic {alert.micRequired ? 'จำเป็น' : 'เลือกได้'} • Vibe: {alert.vibe}</p>
                    </div>
                    <div className="text-center px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Synergy</p>
                      <p className="text-3xl font-bold text-purple-400">{alert.compatibility}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-4 bg-white/5 rounded-2xl p-3">{alert.message}</p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={() => handleRespond(alert.id, 'join')}
                      className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold py-3 rounded-2xl"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Join เลย
                    </button>
                    <button
                      onClick={() => handleRespond(alert.id, 'skip')}
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 bg-white/5 text-gray-300 border border-white/10 py-3 rounded-2xl"
                    >
                      <XCircle className="w-5 h-5" /> ข้ามก่อน
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#090915] p-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" /> ประวัติแจ้งเตือนล่าสุด
            </h3>
            <div className="space-y-3">
              {notificationsData.slice(0, 4).map((notification) => (
                <div key={notification.id} className="bg-white/5 rounded-2xl p-3 border border-white/10">
                  <p className="text-sm text-white">{notification.text}</p>
                  <p className="text-[10px] text-gray-400">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" /> ตั้ง Roster ล่วงหน้า
            </h3>
            <p className="text-sm text-gray-200 mb-4">
              บอกเวลาที่จะเล่น ระบบจะส่งแจ้งเตือนล่วงหน้าให้กับคนที่มี vibe เข้ากัน
            </p>
            <button className="w-full py-3 rounded-2xl bg-white text-black font-bold">เปิด Smart Reminder</button>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
