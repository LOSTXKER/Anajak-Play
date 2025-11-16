'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Mic, 
  Send, 
  Paperclip, 
  Smile, 
  Check, 
  CheckCheck, 
  Gamepad2,
  Shield,
  CreditCard,
  MessageCircle,
  X,
  Maximize2,
  User,
  Star,
  Wallet,
  Gift,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import Link from 'next/link';

// Mock Data
const contacts = [
  {
    id: 1,
    name: "KiraGod",
    avatar: "KiraGod",
    status: "online",
    lastMessage: "เฮ้ย คืนนี้ลงแรงค์ป่าว? ขาด 1",
    time: "2m",
    unread: 2,
    type: "friend"
  },
  {
    id: 2,
    name: "Team 'RoV Pro League'",
    avatar: "TeamRoV",
    status: "ingame",
    game: "RoV",
    lastMessage: "NongMind: เดี๋ยวผมเล่นแครี่เอง",
    time: "5m",
    unread: 0,
    type: "group"
  },
  {
    id: 3,
    name: "SniperWolf (Seller)",
    avatar: "SniperWolf",
    status: "offline",
    lastMessage: "ขอบคุณครับ โอนเงินผ่านระบบแล้วนะครับ",
    time: "1h",
    unread: 0,
    type: "market"
  },
  {
    id: 4,
    name: "DragonSlayer",
    avatar: "DragonSlayer",
    status: "online",
    lastMessage: "GG เกมที่แล้ว เล่นดีมาก",
    time: "20m",
    unread: 0,
    type: "friend"
  }
];

// User profiles for right panel
const userProfiles: Record<number, any> = {
  1: {
    name: "KiraGod",
    avatar: "KiraGod",
    rank: "Conqueror",
    games: ["RoV", "Valorant"],
    reputation: 4.8,
    totalGames: 156,
    winRate: 68,
    wallet: 0,
    isVerified: true
  },
  3: {
    name: "SniperWolf",
    avatar: "SniperWolf",
    rank: "Radiant",
    games: ["Valorant"],
    reputation: 4.9,
    totalGames: 89,
    wallet: 2450,
    isVerified: true,
    sellerInfo: {
      totalSales: 45,
      completionRate: 98,
      responseTime: "< 5 min"
    }
  },
  4: {
    name: "Customer_007",
    avatar: "Customer007",
    reputation: 5.0,
    totalOrders: 3,
    wallet: 500,
    isVerified: false
  }
};

const mockMessages: Record<number, any[]> = {
  1: [
    { id: 1, sender: "KiraGod", text: "โย่ว", time: "10:00", type: "text" },
    { id: 2, sender: "me", text: "ว่าไงวัยรุ่น", time: "10:05", type: "text", status: "read" },
    { id: 3, sender: "KiraGod", text: "คืนนี้ว่างปะ ลงแรงค์กัน ขาดป่า", time: "10:06", type: "text" },
    { 
      id: 4, 
      sender: "KiraGod", 
      type: "invite", 
      data: { game: "RoV", mode: "Ranked", rank: "Conqueror", slots: "4/5" },
      time: "10:06" 
    }
  ],
  2: [
    { id: 1, sender: "NongMind", text: "พรุ่งนี้ซ้อมกี่โมง?", time: "9:00", type: "text" },
    { id: 2, sender: "TeamLeader", text: "2 โมงเย็นนะครับ", time: "9:05", type: "text" }
  ],
  3: [
    { id: 1, sender: "me", text: "สนใจจ้างโค้ช Valorant ครับ", time: "เมื่อวาน", type: "text", status: "read" },
    { 
      id: 2, 
      sender: "me", 
      type: "offer", 
      data: { title: "Coaching 1 Hour", price: 350, status: "completed" },
      time: "เมื่อวาน",
      status: "read"
    }
  ],
  4: [
    { id: 1, sender: "DragonSlayer", text: "GG เกมที่แล้ว เล่นดีมาก", time: "18m", type: "text" }
  ]
};

const MessageBubble = ({ msg }: any) => {
  const isMe = msg.sender === 'me';

  if (msg.type === 'invite') {
     return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
           <div className="bg-[#1a1a2e] border border-purple-500/50 rounded-xl p-3 max-w-[85%] shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                 <Gamepad2 size={16} className="text-purple-400" />
                 <span className="font-bold text-white text-xs">คำเชิญเข้าปาร์ตี้</span>
              </div>
              <div className="mb-2">
                 <div className="text-sm font-bold text-white">{msg.data.game}</div>
                 <div className="text-xs text-cyan-400">{msg.data.mode}</div>
              </div>
              <button className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition">
                 เข้าร่วมปาร์ตี้
              </button>
           </div>
        </div>
     );
  }

  if (msg.type === 'offer') {
    return (
       <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
          <div className="bg-[#1a1a2e] border border-green-500/50 rounded-xl p-3 max-w-[85%]">
             <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-green-400" />
                <span className="font-bold text-white text-xs">Escrow</span>
             </div>
             <div className="mb-2 p-2 bg-black/30 rounded">
                <div className="text-xs font-bold text-white">{msg.data.title}</div>
                <div className="text-sm font-bold text-green-400">฿{msg.data.price}</div>
             </div>
             <div className="flex items-center justify-center gap-1 text-green-400 text-xs font-bold py-1 bg-green-500/10 rounded">
                <CheckCheck size={12} /> Completed
             </div>
          </div>
       </div>
    );
  }

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[75%]`}>
        <div className={`
          px-3 py-2 rounded-xl text-xs
          ${isMe 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-sm' 
            : 'bg-white/10 text-gray-200 rounded-tl-sm'
          }
        `}>
          {msg.text}
        </div>
        <div className={`flex items-center gap-1 mt-0.5 text-[9px] text-gray-500 ${isMe ? 'justify-end' : 'justify-start'}`}>
           {msg.time}
           {isMe && (
             <>
               {msg.status === 'sending' && (
                 <span className="inline-flex gap-0.5">
                   <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                   <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                   <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                 </span>
               )}
               {msg.status === 'sent' && <Check size={10} />}
               {msg.status === 'read' && <CheckCheck size={10} className="text-blue-400" />}
             </>
           )}
        </div>
      </div>
    </div>
  );
};

interface ChatSidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebarOverlay({ isOpen, onClose }: ChatSidebarOverlayProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [chatData, setChatData] = useState(mockMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatData, selectedChatId]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedChatId || isSending) return;
    
    setIsSending(true);
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: input,
      time: 'ตอนนี้',
      type: 'text',
      status: 'sending'
    };

    setChatData({
      ...chatData,
      [selectedChatId]: [...(chatData[selectedChatId] || []), newMessage]
    });
    setInput('');
    
    // Simulate message sent after 500ms
    setTimeout(() => {
      setChatData(prev => ({
        ...prev,
        [selectedChatId]: prev[selectedChatId].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      }));
      setIsSending(false);
    }, 500);
  };

  const activeContact = contacts.find(c => c.id === selectedChatId);
  const activeMessages = selectedChatId ? chatData[selectedChatId] || [] : [];
  const activeProfile = selectedChatId ? userProfiles[selectedChatId] : null;
  const filteredContacts = contacts.filter(c => {
    if (activeTab === 'all') return true;
    if (activeTab === 'groups') return c.type === 'group';
    if (activeTab === 'market') return c.type === 'market';
    return true;
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Chat Sidebar */}
      <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:w-[720px] lg:w-[1000px] bg-[#0a0a16] border-l border-white/10 shadow-2xl z-50 flex animate-in slide-in-from-right duration-300">
        
        {/* Contact List Sidebar */}
        <div className={`w-80 bg-[#13132b] border-r border-white/10 flex flex-col ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Messages</h2>
            <div className="flex gap-2">
              <Link 
                href="/messages"
                className="p-2 bg-purple-600/20 hover:bg-purple-600 rounded-lg text-purple-400 hover:text-white transition-all border border-purple-500/30 hover:border-purple-500"
                title="ขยายเต็มจอ"
              >
                <Maximize2 size={18} />
              </Link>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-3 border-b border-white/10">
            <div className="relative">
              <input 
                type="text" 
                placeholder="ค้นหาแชท..." 
                className="w-full bg-[#0a0a16] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-gray-300 text-sm focus:border-purple-500 outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="flex p-2 gap-1 border-b border-white/10">
            {['all', 'groups', 'market'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-xs font-bold rounded capitalize ${
                   activeTab === tab 
                   ? 'bg-purple-600 text-white' 
                   : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => setSelectedChatId(contact.id)}
                className={`p-3 flex gap-3 cursor-pointer hover:bg-white/5 border-b border-white/5 transition ${
                  selectedChatId === contact.id ? 'bg-purple-900/20 border-l-4 border-l-purple-500' : ''
                }`}
              >
                <div className="relative">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatar}`} 
                    className="w-11 h-11 rounded-full bg-gray-800" 
                    alt="Avatar" 
                  />
                  {contact.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#13132b] rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1 gap-2">
                    <h4 className={`font-bold text-sm truncate flex-1 ${contact.unread > 0 ? 'text-white' : 'text-gray-300'}`}>
                      {contact.name}
                    </h4>
                    <span className="text-[10px] text-gray-500 flex-shrink-0">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className={`text-xs truncate flex-1 ${contact.unread > 0 ? 'text-white font-medium' : 'text-gray-500'}`}>
                      {contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full flex-shrink-0">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`flex-1 flex flex-col bg-[#05050a] ${!selectedChatId ? 'hidden md:flex md:items-center md:justify-center' : 'flex'}`}>
          {!selectedChatId ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <MessageCircle size={48} />
              </div>
              <p>เลือกแชทเพื่อเริ่มสนทนา</p>
            </div>
          ) : activeContact && (
            <>
              <div className="p-3 border-b border-white/10 bg-[#13132b] flex items-center gap-3">
                <button
                  onClick={() => setSelectedChatId(null)}
                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white md:hidden"
                >
                  <X size={20} />
                </button>
                <div className="relative">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeContact.avatar}`} 
                    className="w-9 h-9 rounded-full bg-gray-800" 
                    alt="Avatar"
                  />
                  {activeContact.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#13132b] rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-sm leading-none">{activeContact.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {activeContact.status === 'online' ? 'ออนไลน์' : 'ออฟไลน์'}
                  </p>
                </div>
                <div className="flex gap-1 text-gray-400">
                  {/* View Profile button on mobile */}
                  <button 
                    onClick={() => {/* TODO: open profile modal */}}
                    className="lg:hidden p-1.5 hover:bg-white/10 rounded-full hover:text-purple-400 transition"
                    title="ดูโปรไฟล์"
                  >
                    <User size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-white/10 rounded-full"><Phone size={16} /></button>
                  <button className="p-1.5 hover:bg-white/10 rounded-full"><Video size={16} /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                {activeMessages.length === 0 ? (
                  // Empty State
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle size={40} className="text-gray-500" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">ยังไม่มีข้อความ</h4>
                    <p className="text-sm text-gray-400 max-w-xs">
                      เริ่มสนทนากับ {activeContact.name} ได้เลย<br/>
                      พิมพ์ข้อความด้านล่างเพื่อเริ่มต้น
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center my-3">
                      <span className="text-[9px] text-gray-600 bg-white/5 px-2 py-1 rounded-full">วันนี้</span>
                    </div>
                    {activeMessages.map((msg: any) => (
                      <MessageBubble key={msg.id} msg={msg} />
                    ))}
                  </>
                )}
                <div ref={endRef} />
              </div>

              <div className="p-4 bg-[#13132b] border-t border-white/10">
                <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                  <button type="button" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition mb-1">
                    <ImageIcon size={20}/>
                  </button>
                  <button type="button" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition mb-1">
                    <Paperclip size={20}/>
                  </button>
                  <div className="flex-1 bg-[#0a0a16] border border-white/10 rounded-2xl flex items-center px-4 py-3 focus-within:border-purple-500 transition">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="พิมพ์ข้อความ..." 
                      className="flex-1 bg-transparent outline-none text-white text-base"
                    />
                    <button type="button" className="text-gray-400 hover:text-yellow-400 transition ml-2">
                      <Smile size={20}/>
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!input.trim()}
                    className={`p-3 rounded-full transition-all mb-1 ${
                      input.trim() 
                      ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-500/20' 
                      : 'bg-white/5 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {input.trim() ? <Send size={18} /> : <Mic size={18} />}
                  </button>
              </form>
            </div>
            </>
          )}
        </div>

        {/* Right Panel - User Profile & Transaction Details */}
        {selectedChatId && activeProfile && (
          <div className="hidden lg:flex w-80 bg-[#13132b] border-l border-white/10 flex-col overflow-y-auto custom-scrollbar">
            {/* Profile Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col items-center">
                <div className="relative mb-3">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeProfile.avatar || activeContact?.avatar}`}
                    className="w-20 h-20 rounded-full bg-gray-800 border-2 border-purple-500"
                    alt="Profile"
                  />
                  {activeProfile.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">{activeProfile.name}</h3>
                {activeProfile.rank && (
                  <span className="text-xs text-purple-400 font-bold mt-1">{activeProfile.rank}</span>
                )}
                <div className="flex items-center gap-1 mt-2">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-white">{activeProfile.reputation || '5.0'}</span>
                  <span className="text-xs text-gray-400">
                    ({activeProfile.totalGames || activeProfile.totalOrders || 0} รีวิว)
                  </span>
                </div>
              </div>
            </div>

            {/* Wallet Info */}
            {activeProfile.wallet !== undefined && (
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <Wallet size={16} className="text-green-400" />
                    <span className="text-xs text-gray-400">กระเป๋าเงิน</span>
                  </div>
                  <span className="text-sm font-bold text-green-400">฿{activeProfile.wallet.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Seller Info (for marketplace) */}
            {activeProfile.sellerInfo && (
              <div className="p-4 border-b border-white/10">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">สถิติผู้ขาย</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">ยอดขายทั้งหมด</span>
                    <span className="text-sm font-bold text-white">{activeProfile.sellerInfo.totalSales}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">อัตราสำเร็จ</span>
                    <span className="text-sm font-bold text-green-400">{activeProfile.sellerInfo.completionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">เวลาตอบกลับ</span>
                    <span className="text-sm font-bold text-white">{activeProfile.sellerInfo.responseTime}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Games */}
            {activeProfile.games && (
              <div className="p-4 border-b border-white/10">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">เกมที่เล่น</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProfile.games.map((game: string) => (
                    <span key={game} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold border border-purple-500/30">
                      {game}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Win Rate */}
            {activeProfile.winRate && (
              <div className="p-4 border-b border-white/10">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">ผลการแข่ง</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">อัตราชนะ</span>
                    <span className="text-sm font-bold text-cyan-400">{activeProfile.winRate}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${activeProfile.winRate}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="p-4 space-y-2">
              <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2">
                <Gamepad2 size={16} />
                ชวนเข้าปาร์ตี้
              </button>
              {activeContact?.type === 'market' && (
                <>
                  <button className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2">
                    <Shield size={16} />
                    สร้างข้อเสนอ Escrow
                  </button>
                  <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition flex items-center justify-center gap-2">
                    <Gift size={16} />
                    ดูบริการ
                  </button>
                </>
              )}
            </div>

            {/* Active Transaction (if any) */}
            {activeContact?.type === 'market' && (
              <div className="p-4 border-t border-white/10">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                  <Clock size={12} />
                  ธุรกรรมที่ดำเนินอยู่
                </h4>
                <div className="bg-[#1a1a2e] border border-green-500/30 rounded-xl p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm font-bold text-white">เซสชันโค้ชชิ่ง</div>
                      <div className="text-xs text-gray-400 mt-0.5">1 ชั่วโมง Valorant</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">฿350</div>
                      <div className="text-[10px] text-gray-400">อยู่ระหว่างฝากเงิน</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-green-400 bg-green-500/10 px-2 py-1 rounded">
                    <CheckCircle2 size={12} />
                    การชำระเงินปลอดภัย
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}