/**
 * SearchBar Component
 * แถบค้นหาสำหรับหน้า Home
 */

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = '🔍 Search เกม / โหมด / ปาร์ตี้' }: SearchBarProps) {
  return (
    <div className="mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        เลือกเกมหรือพิมพ์คำค้น ระบบจะแนะนำ Global/Game Filter ให้อัตโนมัติ
      </p>
    </div>
  );
}
