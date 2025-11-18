import React from 'react';
import { Search, X, Maximize2, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Conversation } from './types';
import Image from 'next/image';

interface ChatListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClose?: () => void;
  isOverlay?: boolean;
}

export default function ChatList({ conversations, selectedId, onSelect, onClose, isOverlay = false }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-[#0e0e1b] border-r border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-white/5">
        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Messages</h2>
        <div className="flex gap-2">
            {isOverlay && (
                <Link 
                    href={`/messages${selectedId ? `?chatId=${selectedId}` : ''}`}
                    className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/10"
                    title="ขยายเต็มจอ"
                    onClick={onClose}
                >
                    <Maximize2 size={18} />
                </Link>
            )}
            {onClose && (
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition"
                >
                    <X size={18} />
                </button>
            )}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-2 pt-2">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="ค้นหาแชท..." 
            className="w-full bg-[#151525] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-gray-300 text-sm focus:border-purple-500/50 focus:bg-[#1a1a2e] outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
        </div>
      </div>

      {/* Tabs - Simplified for now */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
         {['All', 'Friends', 'Groups', 'Market'].map((tab, i) => (
            <button 
                key={tab} 
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    i === 0 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`}
            >
                {tab}
            </button>
         ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {conversations.map(chat => (
          <div 
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`
                group relative p-3 rounded-xl flex gap-3 cursor-pointer transition-all duration-200 border border-transparent
                ${selectedId === chat.id 
                    ? 'bg-purple-600/10 border-purple-500/20' 
                    : 'hover:bg-white/5 hover:border-white/5'
                }
            `}
          >
            {/* Active Indicator Line */}
            {selectedId === chat.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            )}

            <div className="relative">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.user.avatar}`} 
                className={`w-12 h-12 rounded-full bg-gray-800 transition-transform ${selectedId === chat.id ? 'scale-105 shadow-lg shadow-purple-900/20' : ''}`} 
                alt="Avatar" 
              />
              {chat.user.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0e0e1b] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              )}
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-0.5">
                <h4 className={`font-bold text-sm truncate ${chat.unread > 0 ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {chat.user.name}
                </h4>
                <span className="text-[10px] text-gray-500 flex-shrink-0">{chat.time}</span>
              </div>
              
              <div className="flex justify-between items-center gap-2">
                <p className={`text-xs truncate flex-1 ${chat.unread > 0 ? 'text-gray-200 font-medium' : 'text-gray-500'}`}>
                  {chat.isMe && <span className="text-gray-600 mr-1">คุณ:</span>}
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <span className="min-w-[1.25rem] h-5 px-1.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg shadow-purple-500/30">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

