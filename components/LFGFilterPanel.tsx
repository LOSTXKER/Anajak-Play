'use client';

import { ChevronDown, Filter, SlidersHorizontal } from 'lucide-react';
import { FilterDefinition, GameFilterConfig } from '@/lib/types';

interface FilterPanelProps {
  selectedGame: string;
  onSelectGame: (gameKey: string) => void;
  gameOptions: Array<{ key: string; label: string }>;
  globalFilters: FilterDefinition[];
  gameFilters?: GameFilterConfig;
  globalSelections: Record<string, string[]>;
  gameSelections: Record<string, string[]>;
  onToggleFilter: (layer: 'global' | 'game', filterId: string, value: string) => void;
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
}

interface FilterChipProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

function FilterChip({ active, label, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition border ${
        active
          ? 'bg-white text-black border-white'
          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
}

function renderFilterGroup(
  filters: FilterDefinition[],
  selections: Record<string, string[]>,
  layer: 'global' | 'game',
  onToggle: (layer: 'global' | 'game', filterId: string, value: string) => void
) {
  return filters.map((filter) => (
    <div key={`${layer}-${filter.id}`} className="bg-black/20 rounded-2xl border border-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-white">{filter.label}</p>
          {filter.helperText && <p className="text-xs text-gray-400">{filter.helperText}</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {filter.options?.map((option) => {
          const active = selections[filter.id]?.includes(option.value) ?? false;
          return (
            <FilterChip
              key={option.value}
              active={active}
              label={option.label}
              onClick={() => onToggle(layer, filter.id, option.value)}
            />
          );
        })}
      </div>
    </div>
  ));
}

export default function LFGFilterPanel({
  selectedGame,
  onSelectGame,
  gameOptions,
  globalFilters,
  gameFilters,
  globalSelections,
  gameSelections,
  onToggleFilter,
  showAdvanced,
  onToggleAdvanced,
}: FilterPanelProps) {
  return (
    <section className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-400 uppercase tracking-[0.2em]">Filter Engine</p>
          <h2 className="text-2xl font-bold text-white">เลือกเกมแล้วระบบจะโหลดตัวกรองที่ต้องมีให้อัตโนมัติ</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          {gameOptions.map((game) => (
            <button
              key={game.key}
              onClick={() => onSelectGame(game.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                selectedGame === game.key
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-transparent'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {game.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-5">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c0c1f] to-[#121231] p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Global Filters</h3>
              <p className="text-xs text-gray-400">ใช้ได้ทุกเกม เช่น เวลาเล่น ภาษา ไมค์ และ playstyle</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {renderFilterGroup(globalFilters, globalSelections, 'global', onToggleFilter)}
          </div>
        </div>

        {gameFilters && (
          <div className="rounded-3xl border border-white/10 bg-[#0b0b18] p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">ตัวกรองเฉพาะเกม</h3>
                <p className="text-xs text-gray-400">ระบบกำหนด Role / Mode / Rank ให้เองตามเกมที่เลือก</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {renderFilterGroup(gameFilters.basic, gameSelections, 'game', onToggleFilter)}
            </div>

            <button
              onClick={onToggleAdvanced}
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              />
              Advanced Filters
            </button>

            {showAdvanced && (
              <div className="grid md:grid-cols-2 gap-4">
                {renderFilterGroup(gameFilters.advanced, gameSelections, 'game', onToggleFilter)}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
