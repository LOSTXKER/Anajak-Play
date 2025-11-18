import React, { useState } from 'react';
import { Send, Image as ImageIcon, Paperclip, Smile, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-[#0a0a16]/95 backdrop-blur-xl border-t border-white/10">
      <div className="flex items-end gap-2">
        <div className="flex gap-1 mb-1">
            <button type="button" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                <ImageIcon size={20}/>
            </button>
            <button type="button" className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all hidden sm:block">
                <Paperclip size={20}/>
            </button>
        </div>

        <div className="flex-1 bg-[#13132b] border border-white/10 rounded-2xl flex items-center px-4 py-2 focus-within:border-purple-500/50 focus-within:bg-[#1a1a2e] transition-all shadow-inner">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="พิมพ์ข้อความ..." 
            className="flex-1 bg-transparent outline-none text-white text-sm py-1 placeholder:text-gray-600"
          />
          <button type="button" className="text-gray-500 hover:text-yellow-400 transition p-1">
            <Smile size={20}/>
          </button>
        </div>

        <button 
          type="submit" 
          disabled={!input.trim()}
          className={`p-3 rounded-xl transition-all mb-0.5 ${
            input.trim() 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 active:scale-95' 
            : 'bg-white/5 text-gray-600 cursor-not-allowed'
          }`}
        >
          {input.trim() ? <Send size={18} /> : <Mic size={18} />}
        </button>
      </div>
    </form>
  );
}

