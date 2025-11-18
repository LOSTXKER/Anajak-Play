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
  AlertTriangle,
  Crown,
  CheckCircle2,
  MicOff,
  Shield
} from 'lucide-react';
import { Party } from '@/lib/types/index';
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

  const currentParty = activeParty || party;
  const isLeader = currentParty.leader === "Meelike God";
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
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      sender: "Meelike God", 
      text: inputMsg, 
      time: "Now", 
      isMe: true 
    }]);
    setInputMsg("");
  };

  // Mock Game Color Logic
  const getGameColor = () => {
     const game = currentParty.game.toLowerCase();
     if(game.includes('rov')) return 'from-orange-600 to-red-600';
     if(game.includes('valorant')) return 'from-rose-500 to-red-600';
     if(game.includes('lol')) return 'from-blue-600 to-cyan-600';
     return 'from-purple-600 to-blue-600';
  };

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in zoom-in duration-300">
       
       {/* 1. Header Banner */}
       <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#13132b] shadow-2xl mb-6">
          <div className={`absolute inset-0 bg-gradient-to-r ${getGameColor()} opacity-20`}></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
             <div className="flex items-start gap-5">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getGameColor()} p-0.5 shadow-lg shadow-purple-500/20`}>
                   <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
                      <Gamepad2 className="w-10 h-10 text-white" />
                   </div>
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{currentParty.title}</h1>
                      <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/5 text-xs font-bold text-white uppercase tracking-wide">
                         {currentParty.game}
                      </span>
                   </div>
                   <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full">
                         <Clock3 size={14} className="text-purple-400" /> 
                         <span>Open: {formatDuration(elapsedSeconds)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full">
                         <Users size={14} className="text-cyan-400" /> 
                         <span>{currentParty.requiredRoles.filter(s => s.status === 'filled').length}/{currentParty.requiredRoles.length} Players</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full">
                         <Shield size={14} className="text-yellow-400" /> 
                         <span>{currentParty.mode} • {currentParty.rank}</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-white/5">
                   <Settings size={18} /> Settings
                </button>
                <button 
                   onClick={onLeave}
                   className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border border-red-500/20"
                >
                   <LogOut size={18} /> Leave
                </button>
             </div>
          </div>
       </div>

       <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-280px)] min-h-[600px]">
          
          {/* 2. Left: Lobby Slots (Main) */}
          <div className="flex-1 flex flex-col gap-6">
             
             {/* Voice Chat Status */}
             {currentParty.voiceChat && (
               <div className="bg-[#1e1e38]/50 border border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <Volume2 className="text-indigo-400" size={20} />
                     </div>
                     <div>
                        <h3 className="font-bold text-white text-sm">Discord Voice Chat</h3>
                        <p className="text-xs text-gray-400">Click to join voice channel</p>
                     </div>
                  </div>
                  <a 
                     href={currentParty.voiceChat.link}
                     target="_blank"
                     rel="noreferrer"
                     className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors"
                  >
                     Connect <ExternalLink size={12} />
                  </a>
               </div>
             )}

             {/* Slots Grid */}
             <div className="flex-1 bg-[#13132b]/50 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 overflow-y-auto custom-scrollbar relative">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                   {currentParty.requiredRoles.map((slot, idx) => (
                      <div key={idx} className={`
                         relative group p-4 rounded-2xl border-2 transition-all duration-300
                         ${slot.status === 'filled' 
                            ? 'bg-[#1a1a2e] border-[#2a2a45] hover:border-purple-500/30' 
                            : 'bg-black/20 border-dashed border-white/10 hover:border-white/20'
                         }
                         ${slot.isMe ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-900/20' : ''}
                      `}>
                         <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="relative">
                               <div className={`w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner ${slot.status === 'open' ? 'bg-white/5' : 'bg-gray-800'}`}>
                                  {slot.status === 'filled' 
                                     ? <img 
                                         src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${slot.avatar}`} 
                                         alt="Player"
                                         className="w-full h-full object-cover" 
                                       />
                                     : <Plus className="text-gray-600" size={24} />
                                  }
                               </div>
                               {slot.isLeader && (
                                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full p-1 shadow-lg">
                                     <Crown size={12} fill="currentColor" />
                                  </div>
                               )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                                     {slot.role}
                                  </span>
                                  {slot.status === 'filled' && (
                                     <div className="flex items-center gap-1 text-xs text-green-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]"></div>
                                        Online
                                     </div>
                                  )}
                               </div>
                               
                               <div className={`font-bold text-lg truncate mb-1 ${slot.status === 'open' ? 'text-gray-600' : 'text-white'}`}>
                                  {slot.status === 'filled' ? slot.player : 'Empty Slot'}
                               </div>

                               {slot.status === 'filled' && (
                                  <div className="flex items-center gap-2">
                                     {slot.ready ? (
                                        <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                                           <CheckCircle2 size={12} /> READY
                                        </span>
                                     ) : (
                                        <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                                           Thinking...
                                        </span>
                                     )}
                                  </div>
                               )}
                            </div>

                            {/* Action (Kick) */}
                            {isLeader && slot.status === 'filled' && !slot.isMe && (
                               <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-500 rounded-lg transition-all">
                                  <X size={18} />
                               </button>
                            )}
                         </div>
                         
                         {/* Ready Indicator Bar */}
                         {slot.status === 'filled' && (
                            <div className={`absolute bottom-0 left-0 h-1 rounded-b-2xl transition-all duration-500 ${slot.ready ? 'w-full bg-green-500' : 'w-0 bg-gray-700'}`}></div>
                         )}
                      </div>
                   ))}
                </div>
             </div>
             
             {/* Bottom Action Bar */}
             <div className="bg-[#13132b] border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className={`w-3 h-3 rounded-full animate-pulse ${isReady ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                   <span className="text-gray-400 text-sm font-medium">
                      {isReady ? 'Waiting for others...' : 'Please confirm your readiness'}
                   </span>
                </div>
                <button 
                   onClick={toggleReady}
                   className={`
                      px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center gap-2
                      ${isReady 
                        ? 'bg-green-500 hover:bg-green-400 text-black shadow-green-500/20' 
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-purple-600/20'
                      }
                   `}
                >
                   {isReady ? <><CheckCircle2 /> READY!</> : 'I AM READY'}
                </button>
             </div>
          </div>

          {/* 3. Right: Chat Panel */}
          <div className="w-full lg:w-[400px] bg-[#13132b] border border-white/10 rounded-[2rem] flex flex-col overflow-hidden shadow-2xl">
             <div className="p-5 border-b border-white/10 bg-[#0a0a16]/30 flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                   <MessageSquare size={18} className="text-purple-400" /> Party Chat
                </h3>
                <div className="flex gap-1">
                   <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition"><Users size={16}/></button>
                   <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition"><Settings size={16}/></button>
                </div>
             </div>

             <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 bg-[#0f0f1a]">
                {messages.map((msg) => (
                   <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`flex items-end gap-2 max-w-[85%] ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                         {!msg.isMe && (
                            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden flex-shrink-0 border border-white/10">
                              <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.sender}`}
                                alt={msg.sender}
                              />
                            </div>
                         )}
                         <div className={`
                            p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                            ${msg.isMe 
                               ? 'bg-purple-600 text-white rounded-br-sm' 
                               : 'bg-[#2a2a40] text-gray-200 rounded-bl-sm'
                            }
                         `}>
                            {msg.text}
                         </div>
                      </div>
                      <span className="text-[10px] text-gray-500 mt-1.5 px-1 opacity-70">{msg.sender} • {msg.time}</span>
                   </div>
                ))}
                <div ref={chatEndRef} />
             </div>

             <div className="p-4 bg-[#13132b] border-t border-white/10">
                <form onSubmit={handleSend} className="flex gap-2">
                   <input 
                      type="text" 
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                      placeholder="Type a message..." 
                      className="flex-1 bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
                   />
                   <button 
                     type="submit" 
                     disabled={!inputMsg.trim()}
                     className="p-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-xl text-white transition-all shadow-lg shadow-purple-900/20"
                   >
                      <Send size={18} />
                   </button>
                </form>
             </div>
          </div>

       </div>
    </div>
  );
}