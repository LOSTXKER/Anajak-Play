import React from 'react';
import { Check, CheckCheck, Gamepad2, Shield, Clock } from 'lucide-react';
import { Message } from './types';
import Image from 'next/image';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
  avatar?: string;
}

export default function MessageBubble({ message, showAvatar = true, avatar }: MessageBubbleProps) {
  const isMe = message.isMe;

  if (message.type === 'invite') {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4 group`}>
        <div className="bg-[#1a1a2e]/90 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 max-w-[85%] md:max-w-[300px] shadow-lg hover:border-purple-500/50 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-500/10 rounded-lg">
              <Gamepad2 size={18} className="text-purple-400" />
            </div>
            <span className="font-bold text-white text-sm">คำเชิญเข้าปาร์ตี้</span>
          </div>
          <div className="mb-3 pl-1">
            <div className="text-base font-bold text-white">{message.data?.game || 'Unknown Game'}</div>
            <div className="text-xs text-cyan-400 mt-0.5">{message.data?.mode || 'Ranked'} • {message.data?.rank || 'Any Rank'}</div>
            <div className="text-xs text-gray-400 mt-1">ต้องการ {message.data?.slots || '1'} คน</div>
          </div>
          <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20">
            เข้าร่วมปาร์ตี้
          </button>
        </div>
      </div>
    );
  }

  if (message.type === 'offer') {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className="bg-[#1a1a2e]/90 backdrop-blur-sm border border-green-500/30 rounded-2xl p-4 max-w-[85%] md:max-w-[300px] shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <Shield size={18} className="text-green-400" />
            </div>
            <span className="font-bold text-white text-sm">ข้อเสนอ Escrow</span>
          </div>
          <div className="mb-3 bg-black/20 rounded-xl p-3 border border-white/5">
            <div className="text-sm font-bold text-white mb-1">{message.data?.title}</div>
            <div className="text-lg font-bold text-green-400">฿{message.data?.price?.toLocaleString()}</div>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-green-400 text-xs font-bold py-2 bg-green-500/10 rounded-xl border border-green-500/10">
            <CheckCheck size={14} />
            {message.data?.status || 'Completed'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2 group items-end gap-2`}>
      {!isMe && showAvatar && avatar && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/10 mb-4">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}`} alt="Avatar" className="w-full h-full bg-gray-800" />
        </div>
      )}
      
      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div className={`
          px-4 py-2.5 rounded-2xl text-sm relative shadow-sm transition-all duration-200
          ${isMe 
            ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-sm shadow-purple-900/20' 
            : 'bg-[#1a1a2e] border border-white/10 text-gray-200 rounded-bl-sm hover:bg-[#202035]'
          }
        `}>
          {message.text}
        </div>
        
        <div className={`flex items-center gap-1 mt-1 text-[10px] text-gray-500 px-1 opacity-70 group-hover:opacity-100 transition-opacity ${isMe ? 'justify-end' : 'justify-start'}`}>
          {message.time}
          {isMe && (
            <>
              {message.status === 'sending' && <Clock size={10} className="animate-pulse" />}
              {message.status === 'sent' && <Check size={10} />}
              {message.status === 'read' && <CheckCheck size={10} className="text-blue-400" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

