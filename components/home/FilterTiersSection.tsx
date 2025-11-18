/**
 * FilterTiersSection Component
 * แสดง Filter Tiers (Global, Game Specific, AI)
 */

import { Filter, Layers, Sparkles } from 'lucide-react';

const FILTER_TIERS_CONFIG = [
  {
    id: 'global',
    title: 'Global Filters',
    description: 'เวลา ภาษา ไมค์ Playstyle',
    badge: 'ใช้ได้ทุกเกม',
    icon: <Filter className="w-5 h-5 text-cyan-300" />,
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 'game',
    title: 'Game Specific',
    description: 'Role • Mode • Rank',
    badge: 'Auto-load ตามเกม',
    icon: <Layers className="w-5 h-5 text-purple-300" />,
    gradient: 'from-purple-500/20 to-indigo-500/20',
  },
  {
    id: 'ai',
    title: 'Personality AI',
    description: 'วิเคราะห์ vibe + toxicity',
    badge: 'Killer Feature',
    icon: <Sparkles className="w-5 h-5 text-yellow-300" />,
    gradient: 'from-amber-400/20 to-pink-500/20',
  },
];

export function FilterTiersSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-10">
      {FILTER_TIERS_CONFIG.map((tier) => (
        <div
          key={tier.id}
          className={`rounded-2xl border border-white/10 bg-gradient-to-br ${tier.gradient} p-4`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center">
              {tier.icon}
            </div>
            <div>
              <p className="text-sm text-white font-semibold">{tier.title}</p>
              <p className="text-xs text-gray-300">{tier.description}</p>
            </div>
          </div>
          <span className="inline-flex text-[10px] px-2 py-0.5 rounded-full bg-black/30 text-gray-200 border border-white/10">
            {tier.badge}
          </span>
        </div>
      ))}
    </div>
  );
}
