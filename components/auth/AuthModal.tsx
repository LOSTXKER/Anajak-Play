'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Lock, Mail, ArrowRight, Chrome, Facebook, X, User } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function AuthModal() {
  const router = useRouter();
  const { isAuthModalOpen, closeAuthModal, login, authMode, openAuthModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Reset state when mode changes
  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, [authMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const isLogin = authMode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate delay
    setTimeout(() => {
      login(email || 'user@example.com');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeAuthModal} />
        
        <div className="relative z-10 w-full max-w-md bg-[#13132b] border border-white/10 rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
                onClick={closeAuthModal}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
                <X size={20} />
            </button>

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 mb-4 shadow-lg shadow-purple-500/30">
                    {isLogin ? <Zap className="w-6 h-6 text-white fill-white" /> : <User className="w-6 h-6 text-white" />}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
                </h2>
                <p className="text-gray-400 text-sm">
                    {isLogin ? 'เพื่อเข้าถึงฟีเจอร์ทั้งหมดของ Anajak Play' : 'เข้าร่วมสังคมเกมเมอร์อันดับ 1 ของไทย'}
                </p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0a0a16] hover:bg-[#1c1c3d] border border-white/10 rounded-xl text-white text-sm font-medium transition-all group">
                    <Chrome className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0a0a16] hover:bg-[#1c1c3d] border border-white/10 rounded-xl text-white text-sm font-medium transition-all group">
                    <Facebook className="w-4 h-4 text-blue-500 group-hover:text-blue-400 transition-colors" />
                    Facebook
                </button>
            </div>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-[#13132b] text-gray-500">หรือด้วยอีเมล</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 ml-1">อีเมล</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                        </div>
                        <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between ml-1">
                        <label className="text-xs font-medium text-gray-300">รหัสผ่าน</label>
                        {isLogin && <a href="#" className="text-xs font-medium text-purple-400 hover:text-purple-300">ลืมรหัสผ่าน?</a>}
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                        </div>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                        />
                    </div>
                </div>

                {!isLogin && (
                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                        <label className="text-xs font-medium text-gray-300 ml-1">ยืนยันรหัสผ่าน</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-[#0a0a16] border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            {isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'} <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                    {isLogin ? 'ยังไม่มีบัญชี?' : 'มีบัญชีอยู่แล้ว?'} {' '}
                    <button 
                        onClick={() => openAuthModal(isLogin ? 'register' : 'login')} 
                        className="text-purple-400 font-bold hover:text-purple-300 hover:underline focus:outline-none"
                    >
                        {isLogin ? 'สมัครสมาชิกฟรี' : 'เข้าสู่ระบบ'}
                    </button>
                </p>
            </div>
        </div>
    </div>
  );
}
