"use client";

import React from 'react';
import Image from 'next/image';
import { GameId } from '@/lib/types';
import { Button } from '@/components/ui/Button';

export type GameFilterValue = 'all' | GameId;

export interface GameFilterOption {
  id: GameFilterValue;
  label: string;
  icon?: string;
  isNew?: boolean;
}

interface GameFilterChipsProps {
  options: GameFilterOption[];
  active: GameFilterValue;
  onSelect: (value: GameFilterValue) => void;
  onFilterAdvanced?: () => void;
  onRefresh?: () => void;
}

export const GameFilterChips: React.FC<GameFilterChipsProps> = ({
  options,
  active,
  onSelect,
  onFilterAdvanced,
  onRefresh
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-text-tertiary">เลือกเกม</p>
          <h3 className="text-2xl font-bold text-white">ห้องที่กำลังหาคน (Live)</h3>
        </div>
        <div className="hidden sm:flex gap-3">
          <Button variant="ghost" size="sm" onClick={onFilterAdvanced}>
            Filter
          </Button>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {options.map((option) => {
          const isActive = option.id === active;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-card border-primary-neon/60 text-white shadow-glow-subtle'
                  : 'bg-dark-card border-white/5 text-text-secondary hover:border-primary-neon/30'
              }`}
            >
              {option.icon && (
                <Image
                  src={option.icon}
                  alt={option.label}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              )}
              <span className="font-semibold">{option.label}</span>
              {option.isNew && (
                <span className="text-[10px] uppercase tracking-wide text-primary-neon">new</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex sm:hidden gap-3">
        <Button variant="ghost" size="sm" className="flex-1" onClick={onFilterAdvanced}>
          Filter
        </Button>
        <Button variant="outline" size="sm" className="flex-1" onClick={onRefresh}>
          Refresh
        </Button>
      </div>
    </div>
  );
};
