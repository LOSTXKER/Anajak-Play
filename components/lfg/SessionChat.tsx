'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage, LFGSession, SessionPlayer } from '@/lib/types/index';

interface SessionChatProps {
  session: LFGSession;
  currentUserId: string;
  onClose?: () => void;
}

export default function SessionChat({ session, currentUserId, onClose }: SessionChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages
  useEffect(() => {
    loadMessages();
  }, [session.id]);

  const loadMessages = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/sessions/${session.id}/messages`);
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    const messageText = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/sessions/${session.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: messageText,
          userId: currentUserId,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Add new message to the list
        setMessages(prev => [...prev, data.message]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('ส่งข้อความไม่สำเร็จ');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-700">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div>
          <h3 className="font-bold text-white flex items-center gap-2">
            💬 Party Chat
            <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full">
              {session.currentPlayers.length}/{session.maxPlayers}
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {session.game} • {session.gameMode}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Players List */}
      <div className="px-4 py-3 border-b border-slate-700/50 bg-slate-800/30">
        <div className="flex flex-wrap gap-2">
          {session.currentPlayers.map((player: SessionPlayer) => (
            <div
              key={player.userId}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-slate-700"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                {player.user.displayName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-white font-medium">
                {player.user.displayName}
              </span>
              {player.isHost && (
                <span className="text-xs px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                  Host
                </span>
              )}
              {player.isReady && (
                <span className="text-green-400 text-xs">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            <div className="text-4xl mb-2">💬</div>
            <p>ยังไม่มีข้อความ</p>
            <p className="text-sm mt-1">เริ่มแชทกับทีมของคุณ!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isMe = message.senderId === currentUserId;
            const player = session.currentPlayers.find((p: SessionPlayer) => p.userId === message.senderId);

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {player?.user.displayName.charAt(0).toUpperCase() || '?'}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    {!isMe && (
                      <span className="text-xs font-medium text-slate-300">
                        {player?.user.displayName || 'Unknown'}
                      </span>
                    )}
                    <span className="text-xs text-slate-500">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isMe
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm'
                        : 'bg-slate-800 text-white rounded-bl-sm'
                    }`}
                  >
                    {message.type === 'system' ? (
                      <div className="text-sm italic opacity-80">{message.content}</div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* System Notice */}
      {session.status === 'active' && (
        <div className="px-4 py-2 bg-blue-900/20 border-t border-blue-800/30">
          <p className="text-xs text-blue-300 text-center">
            💾 ข้อความนี้จะถูกบันทึกเพื่อใช้ใน dispute และ reputation
          </p>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="พิมพ์ข้อความ..."
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            disabled={isLoading || session.status === 'completed'}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim() || session.status === 'completed'}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : '📤'}
          </button>
        </div>
        
        {session.status === 'completed' && (
          <p className="text-xs text-slate-500 text-center mt-2">
            Session นี้จบแล้ว - ไม่สามารถส่งข้อความได้
          </p>
        )}
      </form>
    </div>
  );
}
