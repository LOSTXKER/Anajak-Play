'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import ChatList from '@/components/chat/ChatList';
import ChatArea from '@/components/chat/ChatArea';
import { Conversation, Message } from '@/components/chat/types';

// Shared Mock Data (In a real app this would come from a store/context/api)
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

const mockMessagesData: Record<string, Message[]> = {
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

function MessagesContent() {
  const searchParams = useSearchParams();
  const initialChatId = searchParams.get('chatId');
  
  const [selectedId, setSelectedId] = useState<string | null>(initialChatId);
  const [messages, setMessages] = useState(mockMessagesData);

  useEffect(() => {
    if (initialChatId) {
        setSelectedId(initialChatId);
    }
  }, [initialChatId]);

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
    <DashboardLayout 
      contentClassName="h-screen flex flex-col py-0 gap-0 px-0 pt-20" // pt-20 matches navbar height
      showRightSidebar={false} 
      enableChat={false}
      disableMainTopPadding={true}
    >
      <div className="flex-1 flex overflow-hidden lg:mx-4 lg:mt-2 lg:rounded-t-2xl border-t border-white/10 bg-[#05050a] shadow-2xl">
          {/* Left: Chat List */}
          <div className={`w-full lg:w-80 border-r border-white/5 flex flex-col ${selectedId ? 'hidden lg:flex' : 'flex'}`}>
             <ChatList 
                conversations={mockConversations} 
                selectedId={selectedId} 
                onSelect={setSelectedId}
             />
          </div>

          {/* Right: Chat Area */}
          <div className={`flex-1 flex flex-col bg-[#05050a] ${!selectedId ? 'hidden lg:flex' : 'flex'}`}>
             <ChatArea 
                conversation={activeConversation} 
                messages={activeMessages} 
                onSendMessage={handleSendMessage}
                onBack={() => setSelectedId(null)}
             />
          </div>
      </div>
    </DashboardLayout>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
