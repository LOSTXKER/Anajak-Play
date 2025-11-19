'use client';

import Link from 'next/link';
import { Zap, ArrowRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'หน้าแรก', href: '/' },
    { label: 'หาตี้ (LFG)', href: '/features/lfg' },
    { label: 'ซื้อขาย', href: '/features/marketplace' },
    { label: 'พูดคุย', href: '/features/community' },
    { label: 'หาเพื่อน', href: '/features/swipe' },
    { label: 'เติมเกม', href: '/features/topup' },
    { label: 'จ้างงาน', href: '/features/jobs' },
  ];

  return (
    <nav 
      className={`
        fixed top-0 w-full z-50 transition-all duration-300 border-b
        ${isScrolled || isMobileMenuOpen
          ? 'bg-[#05050a]/90 backdrop-blur-xl border-white/5 shadow-lg shadow-purple-900/5' 
          : 'bg-transparent border-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer z-50">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
             <Zap className="text-white w-5 h-5 fill-white" />
           </div>
           <div>
              <h1 className="text-lg font-bold text-white tracking-wider leading-none">
                ANAJAK
              </h1>
              <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-[0.2em]">
                PLAY
              </span>
           </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
           {navLinks.map((link) => {
             const isActive = pathname === link.href;
             return (
               <Link 
                 key={link.href} 
                 href={link.href}
                 className={`
                   px-4 py-2 rounded-full text-sm font-bold transition-all
                   ${isActive 
                     ? 'text-white bg-white/10' 
                     : 'text-gray-400 hover:text-white hover:bg-white/5'
                   }
                 `}
               >
                 {link.label}
               </Link>
             );
           })}
        </div>

        {/* Right Side: Login / CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-bold text-gray-300 hover:text-white transition-colors"
          >
            เข้าสู่ระบบ
          </Link>
          <Link 
            href="/login" 
            className="px-6 py-2.5 bg-white text-black hover:bg-gray-100 font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] text-sm flex items-center gap-2"
          >
            เริ่มต้นใช้งาน <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-[#05050a] z-40 flex flex-col pt-28 px-6 animate-in slide-in-from-top-10 duration-200">
             <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-bold ${pathname === link.href ? 'text-purple-400' : 'text-white'}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-white/10 my-4" />
                <Link 
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-gray-300"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link 
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 bg-white text-black text-center font-bold rounded-2xl text-lg mt-4"
                >
                  เริ่มต้นใช้งาน
                </Link>
             </div>
          </div>
        )}

      </div>
    </nav>
  );
}

