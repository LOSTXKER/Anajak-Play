'use client';

import { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, Shield, Star } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import Navbar from '@/components/Navbar';
import NotificationDropdown from '@/components/NotificationDropdown';
import UserProfileModal from '@/components/UserProfileModal';
import { notificationsData } from '@/lib/mockData';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  type: 'friend' | 'marketplace' | 'party';
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'ProGamer99',
    avatar: 'user1',
    lastMessage: 'เจอกันตอนเย็นนะครับ',
    timestamp: '5 นาที',
    unread: 2,
    online: true,
    type: 'friend'
  },
  {
    id: '2',
    name: 'ItemSeller',
    avatar: 'user2',
    lastMessage: 'ราคานี้พอดีแล้วครับ',
    timestamp: '1 ชม.',
    unread: 0,
    online: true,
    type: 'marketplace'
  },
  {
    id: '3',
    name: 'CoachRank',
    avatar: 'user3',
    lastMessage: 'คอร์สเริ่มพรุ่งนี้',
    timestamp: '2 ชม.',
    unread: 1,
    online: false,
    type: 'marketplace'
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    text: 'สวัสดีครับ พร้อมเล่นไหม?',
    timestamp: '14:30',
    isMe: false
  },
  {
    id: '2',
    senderId: 'me',
    text: 'พร้อมครับ รอแปปนึงนะ',
    timestamp: '14:32',
    isMe: true
  },
  {
    id: '3',
    senderId: '1',
    text: 'โอเค ผมรออยู่ในเกมเลย',
    timestamp: '14:33',
    isMe: false
  },
  {
    id: '4',
    senderId: 'me',
    text: 'เจอกันตอนเย็นนะครับ',
    timestamp: '14:35',
    isMe: true
  },
];

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [notifications] = useState(notificationsData);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'me',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen w-full bg-[#05050a] text-white font-sans">
      <Sidebar />
      <BottomNav />
      
      <div className="lg:ml-20">
        <Navbar 
          onOpenProfile={() => setShowProfileModal(true)}
          onToggleNoti={() => setShowNotifications(!showNotifications)}
          notiOpen={showNotifications}
          unreadCount={unreadCount}
        />

        <NotificationDropdown 
          isOpen={showNotifications}
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />

        {showProfileModal && (
          <UserProfileModal onClose={() => setShowProfileModal(false)} />
        )}

        <main className="h-[calc(100vh-73px)] flex">
          {/* Conversations List - Hidden on mobile when chat is selected */}
          <div className={`
            w-full lg:w-80 bg-[#0a0a16] border-r border-white/10 flex flex-col
            ${selectedConversation ? 'hidden lg:flex' : 'flex'}
          `}>
            <div className="p-4 border-b border-white/10">
              <h2 className="text-xl font-bold mb-4">ข้อความ</h2>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input 
                  type="text"
                  placeholder="ค้นหาการสนทนา..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`
                    p-4 border-b border-white/5 cursor-pointer transition-colors
                    ${selectedConversation?.id === conv.id ? 'bg-purple-600/20' : 'hover:bg-white/5'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${conv.avatar}`}
                        alt={conv.name}
                        className="w-12 h-12 rounded-full bg-gray-700"
                      />
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a16] rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white truncate">{conv.name}</h3>
                          {conv.type === 'marketplace' && (
                            <Shield className="w-3 h-3 text-yellow-400" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col bg-[#05050a]">
              {/* Chat Header */}
              <div className="p-4 bg-[#0a0a16] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Back button for mobile */}
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConversation.avatar}`}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-full bg-gray-700"
                  />
                  <div>
                    <h3 className="font-bold text-white">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-400">
                      {selectedConversation.online ? 'ออนไลน์' : 'ออฟไลน์'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <Video className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${msg.isMe ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`
                          px-4 py-2 rounded-2xl
                          ${msg.isMe 
                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white' 
                            : 'bg-[#1a1a2e] text-gray-200'
                          }
                        `}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[#0a0a16] border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition">
                    <Smile className="w-5 h-5 text-gray-400" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="พิมพ์ข้อความ..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-gray-300 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-lg transition"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#05050a]">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-400 mb-2">เลือกการสนทนา</h3>
                <p className="text-gray-500">เลือกแชทเพื่อเริ่มสนทนา</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
