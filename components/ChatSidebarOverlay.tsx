'use client';

import React, { useState } from 'react';
import ChatList from './chat/ChatList';
import ChatArea from './chat/ChatArea';
import { Conversation, Message } from './chat/types';
import { CheckCircle2, Gamepad2, Shield, Star } from 'lucide-react';

// Mock Data (Adapted to new types)
const mockConversations: Conversation[] = [
  {
    id: '1',
    user: { id: 'u1', name: 'KiraGod', avatar: 'KiraGod', status: 'online' },
    lastMessage: 'คืนนี้ว่างปะ ลงแรงค์กัน ขาดป่า',
    time: '2m',
    unread: 2,
    type: 'friend'
  },
  {
    id: '2',
    user: { id: 'u2', name: "Team 'RoV Pro League'", avatar: 'TeamRoV', status: 'ingame', game: 'RoV' },
    lastMessage: 'NongMind: เดี๋ยวผมเล่นแครี่เอง',
    time: '5m',
    unread: 0,
    type: 'group'
  },
  {
    id: '3',
    user: { id: 'u3', name: 'SniperWolf (Seller)', avatar: 'SniperWolf', status: 'offline' },
    lastMessage: 'ขอบคุณครับ โอนเงินผ่านระบบแล้วนะครับ',
    time: '1h',
    unread: 0,
    type: 'market'
  },
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    { id: '1', senderId: 'u1', text: 'โย่ว', time: '10:00', type: 'text' },
    { id: '2', senderId: 'me', text: 'ว่าไงวัยรุ่น', time: '10:05', type: 'text', status: 'read', isMe: true },
    { id: '3', senderId: 'u1', text: 'คืนนี้ว่างปะ ลงแรงค์กัน ขาดป่า', time: '10:06', type: 'text' },
    { 
      id: '4', 
      senderId: 'u1', 
      type: 'invite', 
      text: 'Sent an invite',
      data: { game: 'RoV', mode: 'Ranked', rank: 'Conqueror', slots: '4/5' },
      time: '10:06' 
    }
  ],
  '2': [
     { id: '1', senderId: 'u4', text: 'พรุ่งนี้ซ้อมกี่โมง?', time: '9:00', type: 'text' },
     { id: '2', senderId: 'u5', text: '2 โมงเย็นนะครับ', time: '9:05', type: 'text' }
  ],
  '3': [
    { id: '1', senderId: 'me', text: 'สนใจจ้างโค้ช Valorant ครับ', time: 'เมื่อวาน', type: 'text', status: 'read', isMe: true },
    { 
      id: '2', 
      senderId: 'me', 
      type: 'offer',
      text: 'Sent an offer', 
      data: { title: 'Coaching 1 Hour', price: 350, status: 'completed' },
      time: 'เมื่อวาน',
      status: 'read',
      isMe: true
    }
  ]
};

interface ChatSidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebarOverlay({ isOpen, onClose }: ChatSidebarOverlayProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  
  if (!isOpen) return null;

  const activeConversation = selectedId ? mockConversations.find(c => c.id === selectedId) || null : null;
  const activeMessages = selectedId ? messages[selectedId] || [] : [];

  const handleSendMessage = (text: string) => {
    if (!selectedId) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text,
      time: 'Now',
      type: 'text',
      status: 'sending',
      isMe: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMessage]
    }));

    // Mock reply
    setTimeout(() => {
       setMessages(prev => {
         const chatMsgs = prev[selectedId] || [];
         return {
            ...prev,
            [selectedId]: chatMsgs.map(m => m.id === newMessage.id ? { ...m, status: 'sent' } : m)
         };
       });
    }, 1000);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        />
      )}

      {/* Main Container - Full screen height, on top of everything */}
      <div className={`fixed top-0 right-0 h-screen w-full md:w-[720px] lg:w-[1000px] bg-[#0a0a16] shadow-2xl z-[101] flex transition-transform duration-300 overflow-hidden border-l border-white/10 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Left: Chat List */}
        <div className={`w-full md:w-80 bg-[#0e0e1b] flex flex-col ${selectedId ? 'hidden md:flex' : 'flex'}`}>
            <ChatList 
                conversations={mockConversations} 
                selectedId={selectedId} 
                onSelect={setSelectedId}
                onClose={onClose}
                isOverlay={true}
            />
        </div>

        {/* Center: Chat Area */}
        <div className={`flex-1 flex flex-col bg-[#05050a] ${!selectedId ? 'hidden md:flex' : 'flex'}`}>
            <ChatArea 
                conversation={activeConversation} 
                messages={activeMessages} 
                onSendMessage={handleSendMessage}
                onBack={() => setSelectedId(null)}
            />
        </div>

        {/* Right: Profile (Optional/Hidden on smaller screens) */}
        {selectedId && (
            <div className="hidden lg:flex w-72 bg-[#0e0e1b] border-l border-white/5 flex-col overflow-y-auto custom-scrollbar p-4">
                {/* Placeholder for Profile info */}
                 <div className="flex flex-col items-center mb-6 mt-4">
                    <div className="relative mb-3">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeConversation?.user.avatar}`}
                        className="w-20 h-20 rounded-full bg-gray-800 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        alt="Profile"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                         <CheckCircle2 size={14} className="text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">{activeConversation?.user.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-gray-300">4.9</span>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="space-y-2 mb-6">
                    <button className="w-full py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2">
                        <Gamepad2 size={16} />
                        ชวนเล่นเกม
                    </button>
                    {activeConversation?.type === 'market' && (
                        <button className="w-full py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2">
                            <Shield size={16} />
                            ซื้อขายผ่านกลาง
                        </button>
                    )}
                 </div>
                 
                 {/* Mini Info Cards */}
                 <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-[#151525] p-3 rounded-xl border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">Win Rate</div>
                        <div className="text-sm font-bold text-cyan-400">68%</div>
                    </div>
                    <div className="bg-[#151525] p-3 rounded-xl border border-white/5">
                        <div className="text-xs text-gray-500 mb-1">Games</div>
                        <div className="text-sm font-bold text-white">156</div>
                    </div>
                 </div>

            </div>
        )}

      </div>
    </>
  );
}
