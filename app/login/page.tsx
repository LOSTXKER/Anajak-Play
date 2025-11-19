'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, Lock, Mail, ArrowRight, Chrome, Facebook, Gamepad2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-[#05050a] flex relative overflow-hidden font-sans">
      
      {/* Left Side - Visual (Desktop Only) */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0a0a16] items-center justify-center overflow-hidden border-r border-white/5">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
         
         <div className="relative z-10 p-12 max-w-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/30">
               <Zap className="w-10 h-10 text-white fill-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
               Welcome to <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Anajak Play</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
               เข้าร่วมคอมมูนิตี้เกมเมอร์อันดับ 1 ของไทย หาปาร์ตี้ที่ใช่ และซื้อขายไอเทมอย่างปลอดภัยได้แล้ววันนี้
            </p>
            
            {/* Stats / Trust Indicators */}
            <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
               <div>
                  <div className="text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-sm text-gray-500">Active Users</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-gray-500">Secure Trade</div>
               </div>
            </div>
         </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
         {/* Mobile Background */}
         <div className="absolute inset-0 lg:hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[#05050a]"></div>
            <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-purple-900/20 rounded-full blur-[100px]"></div>
         </div>

         <div className="w-full max-w-md relative z-10">
            <div className="text-center lg:text-left mb-10">
               <Link href="/" className="inline-flex items-center gap-2 lg:hidden mb-8">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                     <Zap className="w-4 h-4 text-white fill-white" />
                  </div>
                  <span className="font-bold text-white tracking-wider">ANAJAK PLAY</span>
               </Link>
               <h2 className="text-3xl font-bold text-white mb-2">ยินดีต้อนรับกลับมา!</h2>
               <p className="text-gray-400">กรอกข้อมูลเพื่อเข้าสู่ระบบบัญชีของคุณ</p>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <button className="flex items-center justify-center gap-2 py-3 px-4 bg-[#13132b] hover:bg-[#1c1c3d] border border-white/10 rounded-xl text-white font-medium transition-all group">
                  <Chrome className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  <span className="text-sm">Google</span>
               </button>
               <button className="flex items-center justify-center gap-2 py-3 px-4 bg-[#13132b] hover:bg-[#1c1c3d] border border-white/10 rounded-xl text-white font-medium transition-all group">
                  <Facebook className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm">Facebook</span>
               </button>
            </div>

            <div className="relative mb-8">
               <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#05050a] text-gray-500">หรือเข้าสู่ระบบด้วยอีเมล</span>
               </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
               <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300 ml-1">อีเมล</label>
                  <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                     </div>
                     <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#13132b]/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                     />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <div className="flex items-center justify-between ml-1">
                     <label className="text-sm font-medium text-gray-300">รหัสผ่าน</label>
                     <a href="#" className="text-xs font-medium text-purple-400 hover:text-purple-300">ลืมรหัสผ่าน?</a>
                  </div>
                  <div className="relative group">
                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                     </div>
                     <input
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#13132b]/50 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
                     />
                  </div>
               </div>

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
               >
                  {loading ? (
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                     <>
                        เข้าสู่ระบบ <ArrowRight className="w-5 h-5" />
                     </>
                  )}
               </button>
            </form>

            <div className="mt-8 text-center">
               <p className="text-gray-400 text-sm">
                  ยังไม่มีบัญชี?{' '}
                  <Link href="/register" className="text-purple-400 font-bold hover:text-purple-300 hover:underline">
                     สมัครสมาชิกฟรี
                  </Link>
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
