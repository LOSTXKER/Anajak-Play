'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ClipboardCheck, Loader2, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { aiPersonalityInsights, defaultGameKey, gameFilterConfig, gameFilterOptions, globalFilters } from '@/lib/config/filterConfig';

const filterOutMic = globalFilters.filter((filter) => filter.id !== 'mic');

const initSelections = (filters: typeof globalFilters) => {
  return filters.reduce<Record<string, string[]>>((acc, filter) => {
    if (Array.isArray(filter.defaultValue)) {
      acc[filter.id] = [...filter.defaultValue];
    } else if (typeof filter.defaultValue === 'string') {
      acc[filter.id] = [filter.defaultValue];
    } else {
      acc[filter.id] = [];
    }
    return acc;
  }, {});
};

const toggleFromRecord = (
  record: Record<string, string[]>,
  filterId: string,
  value: string,
  single = false
) => {
  const next = { ...record };
  if (single) {
    next[filterId] = [value];
    return next;
  }

  const current = new Set(next[filterId] ?? []);
  if (current.has(value)) {
    current.delete(value);
  } else {
    current.add(value);
  }
  next[filterId] = Array.from(current);
  return next;
};

export default function CreateRequestPage() {
  const router = useRouter();
  const [selectedGame, setSelectedGame] = useState(defaultGameKey);
  const [mode, setMode] = useState('Ranked');
  const [rankRange, setRankRange] = useState('Gold - Diamond');
  const [playersNeeded, setPlayersNeeded] = useState(1);
  const [mic, setMic] = useState<'on' | 'off'>('on');
  const [urgency, setUrgency] = useState<'now' | 'soon'>('now');
  const [notes, setNotes] = useState('ขอคนฟังคอล ใจเย็น และพร้อมเล่น 2-3 เกม');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [globalSelections, setGlobalSelections] = useState<Record<string, string[]>>(
    () => initSelections(filterOutMic)
  );
  const [gameSelections, setGameSelections] = useState<Record<string, string[]>>({});

  const activeGameFilters = gameFilterConfig[selectedGame];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      router.refresh();
    }, 800);
  };

  const preview = useMemo(() => ({
    game: activeGameFilters?.label ?? 'เลือกเกม',
    mode,
    rank: rankRange,
    role: gameSelections.role?.[0] ?? gameSelections.lane?.[0] ?? gameSelections.class?.[0] ?? 'ระบุจากตัวกรอง',
    slots: playersNeeded,
    mic,
    urgency,
    notes,
  }), [activeGameFilters?.label, mode, rankRange, gameSelections, playersNeeded, mic, urgency, notes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#10102a] to-[#070712] p-8 mb-10">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400 mb-2">Create Request</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ตั้งห้องหาตี้แบบ <span className="text-purple-400">One Screen</span>
        </h1>
        <p className="text-gray-300 max-w-3xl">
          เลือกเกม → โหมด → Role → Rank → จำนวนคน → Mic → ความด่วน แล้วให้ระบบ Matching ส่งแจ้งเตือนคนที่ตรงสเปกทันที
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#0a0a16] border border-white/10 rounded-3xl p-6">
            <header className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/10 text-white border border-white/20">
                ขั้นตอนเดียวจบ
              </span>
              <p className="text-sm text-gray-400">ระบบจะคัด Matching ให้อัตโนมัติเมื่อกรอกครบ</p>
            </header>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">เกมที่เล่น</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {gameFilterOptions.map((game) => (
                    <button
                      type="button"
                      key={game.key}
                      onClick={() => {
                        setSelectedGame(game.key);
                        setGameSelections({});
                      }}
                      className={`px-3 py-2 rounded-xl border text-sm font-semibold transition ${
                        selectedGame === game.key
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-transparent'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {game.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">โหมด</label>
                <select
                  value={mode}
                  onChange={(event) => setMode(event.target.value)}
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                >
                  <option value="Ranked">Ranked</option>
                  <option value="Competitive">Competitive</option>
                  <option value="Raid">Raid / Dungeon</option>
                  <option value="Unrated">Unrated / Casual</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">แรงค์ที่ยอมรับ</label>
                <input
                  value={rankRange}
                  onChange={(event) => setRankRange(event.target.value)}
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                  placeholder="Gold - Diamond"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">จำนวนคนที่ต้องการ</label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={playersNeeded}
                    onChange={(event) => setPlayersNeeded(Number(event.target.value))}
                    className="flex-1"
                  />
                  <div className="w-16 text-center rounded-xl bg-white/5 border border-white/10 py-2">
                    <span className="text-xl font-bold text-white">{playersNeeded}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">ไมค์</label>
                <div className="flex gap-3 mt-3">
                  {['on', 'off'].map((value) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setMic(value as 'on' | 'off')}
                      className={`flex-1 px-4 py-3 rounded-xl border text-sm font-semibold transition ${
                        mic === value
                          ? 'bg-green-500 text-black border-green-400'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {value === 'on' ? 'Mic ON' : 'Mic OFF'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">ความด่วน</label>
                <div className="flex gap-3 mt-3">
                  {[
                    { value: 'now', label: 'ต้องการตอนนี้' },
                    { value: 'soon', label: 'เล่นช่วงนี้' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setUrgency(option.value as 'now' | 'soon')}
                      className={`flex-1 px-4 py-3 rounded-xl border text-sm font-semibold transition ${
                        urgency === option.value
                          ? 'bg-purple-500 text-white border-purple-400'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs uppercase tracking-[0.3em] text-gray-400">คำอธิบาย</label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#05050c] border border-white/5 rounded-3xl p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Global Filters (ทุกเกมใช้ร่วมกัน)</h3>
                <p className="text-xs text-gray-400">ระบุเวลาที่เล่น ภาษา Playstyle และระดับ Toxic ที่รับได้</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filterOutMic.map((filter) => (
                <div key={filter.id}>
                  <p className="text-sm text-white mb-2">{filter.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {filter.options?.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setGlobalSelections((prev) => toggleFromRecord(prev, filter.id, option.value))
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                          globalSelections[filter.id]?.includes(option.value)
                            ? 'bg-white text-black border-white'
                            : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {activeGameFilters && (
            <div className="bg-[#060612] border border-white/5 rounded-3xl p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">ตัวกรองเฉพาะ {activeGameFilters.label}</h3>
                  <p className="text-xs text-gray-400">ระบบโหลด Role / Rank ที่เกมนี้ควรมีให้แล้ว</p>
                </div>
              </div>

              <div className="space-y-4">
                {activeGameFilters.basic.map((filter) => (
                  <div key={filter.id}>
                    <p className="text-sm text-white mb-2">{filter.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {filter.options?.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setGameSelections((prev) => toggleFromRecord(prev, filter.id, option.value, true))
                          }
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                            gameSelections[filter.id]?.includes(option.value)
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-transparent'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <details className="bg-white/5 rounded-2xl border border-white/10">
                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-white">Advanced Filters</summary>
                <div className="p-4 space-y-4">
                  {activeGameFilters.advanced.map((filter) => (
                    <div key={filter.id}>
                      <p className="text-xs text-gray-400 uppercase mb-2">{filter.label}</p>
                      <div className="flex flex-wrap gap-2">
                        {filter.options?.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setGameSelections((prev) => toggleFromRecord(prev, filter.id, option.value))
                            }
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                              gameSelections[filter.id]?.includes(option.value)
                                ? 'bg-white text-black border-white'
                                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 py-4 text-lg font-bold text-white shadow-lg disabled:opacity-60"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ClipboardCheck className="w-5 h-5" />}
            ส่งคำขอและแจ้งเตือนคนที่ตรงสเปก
          </button>

          {success && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-300 text-sm rounded-2xl p-4">
              ✅ สร้างคำขอเรียบร้อย! ระบบกำลังส่งแจ้งเตือนไปยังผู้เล่นที่ตรงตัวกรอง
            </div>
          )}
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#090915] p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              พรีวิวคำขอของคุณ
            </h3>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">เกม</p>
                  <p className="font-bold text-white">{preview.game}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-600/20 text-purple-200 border border-purple-500/30">
                  {preview.mode}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                <div>
                  <p className="text-xs text-gray-500">Role ที่ต้องการ</p>
                  <p className="text-white font-semibold">{preview.role}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">แรงค์</p>
                  <p className="text-cyan-300 font-semibold">{preview.rank}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">ไมค์</p>
                  <p className="text-white font-semibold">{preview.mic === 'on' ? 'ต้องมีไมค์' : 'พิมพ์ได้'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">จำนวนที่รับ</p>
                  <p className="text-white font-semibold">{preview.slots} คน</p>
                </div>
              </div>
              <div className="text-sm text-gray-300 bg-black/30 rounded-xl p-3">
                {preview.notes}
              </div>
              <div className="text-xs text-gray-500">ความด่วน: {preview.urgency === 'now' ? 'เล่นตอนนี้' : 'พร้อมเล่นในไม่กี่ชั่วโมง'}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-6">
            <h3 className="text-lg font-bold mb-2">AI Personality ที่ช่วยคัดคนให้คุณ</h3>
            <div className="space-y-3">
              {aiPersonalityInsights.slice(0, 2).map((insight) => (
                <div key={insight.id} className="rounded-2xl bg-black/20 border border-white/10 p-4">
                  <p className="text-sm font-semibold text-white">{insight.label}</p>
                  <p className="text-xs text-gray-400">{insight.value}</p>
                </div>
              ))}
            </div>
            <Link href="/notifications" className="inline-flex items-center gap-2 mt-4 text-sm text-white hover:underline">
              ดู Matching ที่ตรงกับสเปกของฉัน →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
