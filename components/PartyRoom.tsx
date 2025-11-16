'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Copy, 
  Settings, 
  LogOut, 
  Users, 
  Mic, 
  MessageSquare, 
  Send, 
  MoreHorizontal,
  Gamepad2,
  Star,
  Plus,
  Volume2,
   ExternalLink,
   Clock3,
   ThumbsUp,
   AlertTriangle
} from 'lucide-react';
import { Party } from '@/lib/types';
import { useParty } from '@/lib/PartyContext';

interface PartyRoomProps {
  party: Party;
  onLeave: () => void;
}

interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

const mockChatMessages: ChatMessage[] = [
  { id: 1, sender: "KiraGod", text: "สวัสดีครับ ขาดอีก 2 คน รอแป๊บนะ", time: "10:30", isMe: false },
  { id: 2, sender: "MageGod", text: "ได้เลยครับ ผมวอร์มนิ้วรอ", time: "10:31", isMe: false },
];

export default function PartyRoom({ party, onLeave }: PartyRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [inputMsg, setInputMsg] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
   const [elapsedSeconds, setElapsedSeconds] = useState(0);

   const { 
      activeParty, 
      myRole,
      toggleReady
   } = useParty();

  // ใช้ activeParty จาก context แทน prop (เพื่อ real-time update)
  const currentParty = activeParty || party;

  // Check if current user is Leader
  const isLeader = currentParty.leader === "Meelike God";

  // Check if I'm ready
  const mySlot = currentParty.requiredRoles.find(slot => slot.isMe);
  const isReady = mySlot?.ready || false;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

   useEffect(() => {
      const timer = setInterval(() => {
         setElapsedSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
   }, []);

   const formatDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
         .toString()
         .padStart(2, '0');
      const secs = Math.floor(seconds % 60)
         .toString()
         .padStart(2, '0');
      return `${mins}:${secs}`;
   };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      sender: "Meelike God", 
      text: inputMsg, 
      time: "ตอนนี้", 
      isMe: true 
    }]);
    setInputMsg("");
  };

  return (
    <div className="animate-in fade-in zoom-in duration-300">
       {/* Header Bar with prominent Leave button */}
       <div className="bg-[#13132b] border-b border-white/10 p-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-6 rounded-2xl">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-purple-600/20 rounded-xl border border-purple-500/30">
                <Gamepad2 className="w-8 h-8 text-purple-400" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                   {currentParty.title}
                   <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 uppercase">{currentParty.game}</span>
                </h2>
                <p className="text-sm text-gray-400">Room ID: #AJ-{currentParty.id} • {currentParty.mode} • {currentParty.rank}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <Clock3 className="w-3 h-3" />
                  แมตช์เปิดมาแล้ว {formatDuration(elapsedSeconds)}
                </div>
             </div>
          </div>
          <div className="flex flex-wrap gap-3">
             <button className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs md:text-sm text-gray-300 flex items-center gap-2 transition">
                <Copy size={16} /> <span className="hidden sm:inline">คัดลอกลิงก์</span><span className="sm:hidden">คัดลอก</span>
             </button>
             {isLeader && (
                 <button className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs md:text-sm text-gray-300 flex items-center gap-2 transition">
                    <Settings size={16} /> <span className="hidden sm:inline">ตั้งค่า</span>
                 </button>
             )}
             <button onClick={onLeave} className="px-4 py-2 md:px-5 md:py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm md:text-base font-bold flex items-center gap-2 transition shadow-lg shadow-red-600/20 border border-red-500">
                <LogOut size={18} /> 
                {isLeader ? (
                  <>
                    <span className="hidden sm:inline">ยุบปาร์ตี้</span>
                    <span className="sm:hidden">ยุบ</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">ออกจากปาร์ตี้</span>
                    <span className="sm:hidden">ออก</span>
                  </>
                )}
             </button>
          </div>
       </div>

       {/* Discord Voice Chat Section */}
       {currentParty.voiceChat && (
         <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-4 mb-6 animate-in fade-in slide-in-from-top-2">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-indigo-500/30 rounded-full flex items-center justify-center">
                 <Volume2 className="w-6 h-6 text-indigo-300" />
               </div>
               <div>
                 <div className="font-bold text-white flex items-center gap-2">
                   Discord Voice Chat
                   <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                     Available
                   </span>
                 </div>
                 <p className="text-xs text-gray-400">เข้า Voice Chat เพื่อสื่อสารกับทีม</p>
               </div>
             </div>
             <div className="flex gap-2">
               <button 
                 onClick={() => {
                   navigator.clipboard.writeText(currentParty.voiceChat!.link);
                   alert('คัดลอกลิงก์แล้ว!');
                 }}
                 className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium text-white transition flex items-center gap-2"
               >
                 <Copy size={14} />
                 <span className="hidden sm:inline">คัดลอก</span>
               </button>
               <a
                 href={currentParty.voiceChat.link}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-sm font-bold text-white transition flex items-center gap-2"
               >
                 <ExternalLink size={16} />
                 เข้า Discord Voice
               </a>
             </div>
           </div>
         </div>
       )}

       <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px]">
          
          {/* Left: Lobby Slots */}
          <div className="flex-1 bg-[#13132b] rounded-2xl border border-white/10 p-6 flex flex-col relative overflow-hidden">
             {/* Background Decor */}
             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>
             
             <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="font-bold text-white flex items-center gap-2">
                   <Users className="text-cyan-400" /> สมาชิกทีม ({currentParty.requiredRoles.filter(s => s.status === 'filled').length}/{currentParty.requiredRoles.length})
                </h3>
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
                   <Mic size={14} /> Voice Chat เปิดอยู่
                </div>
             </div>

             {/* Slots Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 relative z-10">
                {currentParty.requiredRoles.map((slot, idx) => (
                   <div key={idx} className={`
                      relative p-4 rounded-xl border flex items-center gap-4 transition-all
                      ${slot.status === 'filled' 
                         ? 'bg-[#1a1a2e] border-white/10' 
                         : 'bg-black/20 border-dashed border-white/10 opacity-60'
                      }
                      ${slot.isMe ? 'ring-2 ring-purple-500 bg-purple-900/10' : ''}
                   `}>
                      {/* Avatar */}
                      <div className="relative">
                         <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden ${slot.status === 'open' ? 'bg-white/5' : 'bg-gray-800'}`}>
                            {slot.status === 'filled' 
                               ? <img 
                                   src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${slot.avatar}`} 
                                   alt="Player"
                                   className="w-full h-full" 
                                 />
                               : <Plus className="text-gray-600" />
                            }
                         </div>
                         {slot.isLeader && <div className="absolute -top-1 -right-1 bg-black rounded-full p-0.5"><Star size={14} className="text-yellow-400 fill-current"/></div>}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start">
                            <div>
                               <div className="text-xs text-gray-500 uppercase font-bold mb-0.5">{slot.role}</div>
                               <div className={`font-bold truncate ${slot.status === 'open' ? 'text-gray-600' : 'text-white'}`}>
                                  {slot.status === 'filled' ? slot.player : 'รอผู้เล่น...'}
                               </div>
                            </div>
                            {slot.status === 'filled' && (
                               <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${slot.ready ? 'bg-green-500 text-black' : 'bg-gray-700 text-gray-400'}`}>
                                  {slot.ready ? 'พร้อม' : 'ยังไม่พร้อม'}
                               </div>
                            )}
                         </div>
                      </div>
                      
                      {/* Kick Button (Leader Only) */}
                      {/* Leader can kick other players */}
                      {isLeader && slot.status === 'filled' && !slot.isMe && (
                          <button 
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition"
                          >
                            <X size={14}/>
                          </button>
                      )}
                   </div>
                ))}
             </div>

             {/* Bottom Actions */}
             <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
                 <div className="flex justify-between items-center">
                   <div className="text-xs text-gray-400">
                     {isLeader ? "คุณคือหัวหน้าทีม เริ่มเกมเมื่อทุกคนพร้อม" : "รอหัวหน้าทีมเริ่มเกม..."}
                        {myRole && (
                           <span className="block text-[10px] text-gray-500 mt-1">ตำแหน่งของคุณ: {myRole}</span>
                        )}
                   </div>
                   <button 
                      onClick={toggleReady}
                      className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 ${
                         isReady 
                         ? 'bg-green-500 hover:bg-green-400 text-black shadow-green-500/20' 
                         : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                   >
                      {isReady ? (isLeader ? 'เริ่มเกม' : 'พร้อว!') : 'กดเพื่อพร้อม'}
                   </button>
                 </div>
             </div>
          </div>

          {/* Right: Chat & Log */}
          <div className="w-full lg:w-80 bg-[#13132b] rounded-2xl border border-white/10 flex flex-col overflow-hidden">
             <div className="p-4 border-b border-white/10 bg-[#0a0a16]/50 flex justify-between items-center">
                <h4 className="font-bold text-white flex items-center gap-2"><MessageSquare size={16} className="text-purple-400"/> แชทปาร์ตี้</h4>
                <button className="text-gray-400 hover:text-white"><MoreHorizontal size={16}/></button>
             </div>
             
             {/* Messages */}
             <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0f0f1a] custom-scrollbar">
                {messages.map((msg) => (
                   <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-end gap-2 max-w-[90%]">
                         {!msg.isMe && (
                            <div className="w-6 h-6 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                              <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender}`}
                                alt={msg.sender}
                              />
                            </div>
                         )}
                         <div className={`p-3 rounded-2xl text-sm ${msg.isMe ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                            {msg.text}
                         </div>
                      </div>
                      <span className="text-[10px] text-gray-600 mt-1 px-1">{msg.sender} • {msg.time}</span>
                   </div>
                ))}
                <div ref={chatEndRef} />
             </div>

             {/* Input */}
             <form onSubmit={handleSend} className="p-3 bg-[#13132b] border-t border-white/10 flex gap-2">
                <input 
                   type="text" 
                   value={inputMsg}
                   onChange={(e) => setInputMsg(e.target.value)}
                   placeholder="พิมพ์ข้อความ..." 
                   className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                />
                <button type="submit" className="p-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white transition">
                   <Send size={18} />
                </button>
             </form>

                  <div className="p-4 border-t border-white/10 bg-[#0a0a16] space-y-3">
                     <p className="text-xs text-gray-500">หลังเล่นเสร็จช่วยกันรีวิวเพื่อให้ AI ฉลาดขึ้น</p>
                     <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-gray-200 border border-white/10 rounded-xl py-2 text-sm font-medium hover:bg-white/10 transition">
                           <ThumbsUp className="w-4 h-4 text-green-400" /> Endorse ทีม
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-300 border border-red-500/30 rounded-xl py-2 text-sm font-medium hover:bg-red-500/20 transition">
                           <AlertTriangle className="w-4 h-4" /> Report
                        </button>
                     </div>
                  </div>
          </div>

       </div>
    </div>
  );
}
