import React, { useEffect, useRef } from 'react';
import { Phone, Video, MoreVertical, User, ArrowLeft } from 'lucide-react';
import { Conversation, Message } from './types';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

interface ChatAreaProps {
  conversation: Conversation | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack?: () => void; // For mobile
}

export default function ChatArea({ conversation, messages, onSendMessage, onBack }: ChatAreaProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#05050a] text-gray-500 h-full">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <User size={48} className="opacity-50" />
        </div>
        <h3 className="text-xl font-bold text-gray-300 mb-2">เลือกแชทเพื่อเริ่มสนทนา</h3>
        <p className="text-sm text-gray-600 max-w-xs text-center">
          เลือกเพื่อนหรือกลุ่มจากรายการทางซ้ายเพื่อเริ่มพูดคุยและวางแผนการเล่นเกม
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#05050a] h-full relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 bg-[#0a0a16]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="md:hidden p-2 hover:bg-white/5 rounded-lg text-gray-400">
              <ArrowLeft size={20} />
            </button>
          )}
          
          <div className="relative">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.user.avatar}`} 
              className="w-10 h-10 rounded-full bg-gray-800 ring-2 ring-[#0a0a16]" 
              alt="Avatar"
            />
            {conversation.user.status === 'online' && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a16] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
            )}
          </div>
          
          <div>
            <h3 className="font-bold text-white text-sm md:text-base">{conversation.user.name}</h3>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${conversation.user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
              <p className="text-xs text-gray-400">
                {conversation.user.status === 'online' ? 'ออนไลน์' : 'ออฟไลน์'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-purple-400 transition-all">
            <Phone size={18} />
          </button>
          <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-purple-400 transition-all">
            <Video size={18} />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button className="p-2.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-1 z-0">
        {/* Date Separator */}
        <div className="flex justify-center mb-6">
           <span className="text-[10px] font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-wider">
             Today
           </span>
        </div>

        {messages.map((msg, index) => {
            const prevMsg = messages[index - 1];
            const showAvatar = !prevMsg || prevMsg.senderId !== msg.senderId;
            return (
                <MessageBubble 
                    key={msg.id} 
                    message={msg} 
                    showAvatar={showAvatar}
                    avatar={conversation.user.avatar}
                />
            );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="z-10">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}

