'use client';

import Link from 'next/link';
import { Zap, Users, ShoppingBag, MessageCircle, Gamepad2, ArrowRight, Heart, Shield, Globe, Sparkles, Trophy, Search, Coins, Briefcase, Wallet, Star, CheckCircle } from 'lucide-react';
import LandingNavbar from '@/components/landing/LandingNavbar';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const carouselItems = [
    { 
      icon: Users, 
      label: 'หาตี้ (LFG)', 
      subLabel: 'หาเพื่อนเล่นเกม',
      phrase: 'หาปาร์ตี้ที่ใช่',
      desc: 'เลิกสุ่มเจอไก่ เลิกแบกคนเดียว! ระบบคัดกรองผู้เล่นที่ดีที่สุด เลือกได้ทั้ง Rank และ Role'
    },
    { 
      icon: ShoppingBag, 
      label: 'ซื้อขาย', 
      subLabel: 'Marketplace',
      phrase: 'ซื้อขายไอเทมปลอดภัย',
      desc: 'ตลาดซื้อขายที่มีคนกลางดูแล (Escrow) การันตีความปลอดภัย ได้ของชัวร์ เงินไม่หาย'
    },
    { 
      icon: MessageCircle, 
      label: 'พูดคุย', 
      subLabel: 'Community',
      phrase: 'พูดคุยในคอมมูนิตี้',
      desc: 'พื้นที่แลกเปลี่ยนเทคนิค หาทีมซ้อม และพูดคุยเรื่องเกมกับเพื่อนคอเดียวกัน'
    },
    { 
      icon: Heart, 
      label: 'หาเพื่อน', 
      subLabel: 'Swipe Friend',
      phrase: 'ปัดขวาหาเพื่อนรู้ใจ',
      desc: 'ระบบ Matching แบบใหม่ ปัดขวาเพื่อถูกใจ ปัดซ้ายเพื่อผ่าน หาเพื่อนเล่นเกมได้ง่ายๆ'
    },
    { 
      icon: Coins, 
      label: 'เติมเกม', 
      subLabel: 'Top Up',
      phrase: 'เติมเกมราคาคุ้ม',
      desc: 'บริการเติมเกมมือถือและ PC ทุกเกมดัง ราคาถูกกว่าเติมเอง ปลอดภัย รวดเร็ว'
    },
    { 
      icon: Briefcase, 
      label: 'จ้างงาน', 
      subLabel: 'Jobs & Boosting',
      phrase: 'สร้างรายได้จากเกม',
      desc: 'เปลี่ยนฝีมือเป็นรายได้ รับจ้างเล่น รับงานสอน หรือ Boosting ผ่านแพลตฟอร์ม'
    },
  ];

  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentItem = carouselItems[phraseIndex];
    const currentPhrase = currentItem.phrase;
    const typeSpeed = isDeleting ? 50 : 100;
    const delay = isDeleting ? 0 : 3000; 

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % carouselItems.length);
      } else {
        setText(currentPhrase.substring(0, isDeleting ? text.length - 1 : text.length + 1));
      }
    }, isDeleting && text === currentPhrase ? delay : typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#13132b] border border-white/10 backdrop-blur-xl mb-10 hover:border-purple-500/30 transition-colors cursor-default">
                <span className="text-xl">🇹🇭</span>
                <div className="h-4 w-[1px] bg-white/10"></div>
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white">
                    แพลตฟอร์มเกมเมอร์ไทย อันดับ 1
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.1] min-h-[2.2em] md:min-h-[2.2em]">
                {text}
                <span className="animate-pulse text-purple-400">|</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 animate-gradient-x">
                    ในอาณาจักรเกมเมอร์
                </span>
            </h1>

            <div className="h-24 md:h-20 mb-12 flex items-center justify-center">
                 <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in zoom-in duration-500 key={phraseIndex}">
                    {carouselItems[phraseIndex].desc}
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-16">
                {carouselItems.map((item, i) => (
                    <div 
                        key={i} 
                        onClick={() => {
                            setPhraseIndex(i);
                            setText('');
                            setIsDeleting(false);
                        }}
                        className={`group p-4 rounded-2xl border transition-all duration-500 cursor-pointer ${
                        i === phraseIndex 
                        ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.2)] scale-105 relative z-10' 
                        : 'bg-[#13132b]/40 border-white/5 hover:bg-[#13132b] hover:border-purple-500/30 opacity-60 hover:opacity-100'
                    }`}>
                        <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-3 transition-colors duration-500 ${
                            i === phraseIndex ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/40' : 'bg-white/5 text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-400'
                        }`}>
                            <item.icon size={20} />
                        </div>
                        <div className={`font-bold text-lg transition-colors duration-500 ${i === phraseIndex ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{item.label}</div>
                        <div className={`text-xs uppercase tracking-wider font-medium transition-colors duration-500 ${i === phraseIndex ? 'text-purple-300' : 'text-gray-500'}`}>{item.subLabel}</div>
                    </div>
                ))}
      </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                    href="/dashboard" 
                    className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl text-xl shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                    <Gamepad2 className="w-6 h-6" />
                    เข้าสู่ระบบ
                </Link>
                <Link 
                    href="/features" 
                    className="w-full sm:w-auto px-8 py-4 bg-[#13132b] text-white font-bold rounded-2xl text-lg border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                    ดูฟีเจอร์ทั้งหมด
                </Link>
            </div>
        </div>
      </section>


      {/* Feature 1: LFG */}
      <section className="py-24 bg-[#0a0a16] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 text-sm font-bold">
                        <Users className="w-4 h-4" /> Party Finder (LFG)
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        หาตี้ที่ใช่ <br/>
                        <span className="text-purple-500">ได้ใน 3 วินาที</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        เบื่อไหม? ที่ต้องสุ่มเจอทีมแย่ๆ หรือต้องแบกคนเดียว ระบบหาปาร์ตี้ของเราช่วยคัดกรองผู้เล่นตาม Rank, Role และสไตล์การเล่น ให้คุณเจอเพื่อนร่วมทีมที่ &quot;รู้ใจ&quot; จริงๆ
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-gray-300">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            คัดกรองด้วย Rank จริง เชื่อมต่อกับเกมโดยตรง
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                             <CheckCircle className="w-5 h-5 text-green-500" />
                            ระบบห้องแชทพูดคุยและนัดแนะก่อนเริ่มเกม
                        </li>
                    </ul>
                    <Link href="/features/lfg" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-white transition-colors">
                        ลองใช้ระบบหาตี้ <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="flex-1 relative">
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#13132b] hover:transform hover:scale-[1.02] transition-transform duration-500">
                        <div className="p-4 border-b border-white/5 bg-[#0f0f1a] flex items-center gap-4">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs font-mono text-gray-500 flex-1 text-center">LFG Lobby: RoV Ranked</div>
                        </div>
                        <div className="p-6 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#0a0a16] border border-white/5">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${i===1 ? 'from-purple-500 to-blue-500' : 'from-gray-700 to-gray-600'} flex items-center justify-center font-bold`}>
                                        {i===1 ? 'Me' : `P${i}`}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-white">Gamer_{i}99</div>
                                        <div className="text-xs text-gray-400">Conqueror • Jungle Main</div>
                                    </div>
                                    {i===1 && <span className="text-xs text-green-400 font-bold">Ready</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Feature 2: Marketplace */}
      <section className="py-24 bg-[#05050a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-bold">
                        <ShoppingBag className="w-4 h-4" /> Marketplace
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        ซื้อขายปลอดภัย <br/>
                        <span className="text-blue-500">ไร้การโกง 100%</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        ด้วยระบบ Anajak Escrow เงินของคุณจะถูกเก็บไว้ที่ระบบกลาง จนกว่าคุณจะได้รับของและกดยืนยัน ปลอดภัยทั้งคนซื้อและคนขาย
                    </p>
                    <div className="flex gap-4">
                        <Link href="/features/marketplace" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white transition-colors">
                            ดูสินค้าในตลาด <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="relative z-10 bg-gradient-to-br from-[#13132b] to-[#0a0a16] p-8 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-colors">
                         <div className="flex items-center justify-between mb-8">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-gray-700 mx-auto mb-2 overflow-hidden border-2 border-green-500">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Buyer" alt="Buyer" />
                                </div>
                                <div className="text-sm font-bold text-white">ผู้ซื้อ</div>
                            </div>
                            <div className="flex flex-col items-center gap-2 flex-1 px-4">
                                <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30 flex items-center gap-1">
                                    <Shield size={10} /> Escrow
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-gray-700 mx-auto mb-2 overflow-hidden">
                                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Seller" alt="Seller" />
                                </div>
                                <div className="text-sm font-bold text-white">ผู้ขาย</div>
                            </div>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center">
                            <div className="text-green-400 font-bold text-lg">Transaction Secure</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Feature 3: Community */}
      <section className="py-24 bg-[#0a0a16] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm font-bold">
                        <MessageCircle className="w-4 h-4" /> Community Hub
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        สังคมเกมเมอร์ <br/>
                        <span className="text-yellow-500">คุณภาพ</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        พูดคุย แลกเปลี่ยนเทคนิค และติดตามข่าวสารเกมจากเพื่อนๆ ในคอมมูนิตี้ที่หลากหลาย ไม่ว่าจะเป็น RoV, Valorant หรือ Genshin Impact
                    </p>
                    <Link href="/features/community" className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-bold text-white transition-colors">
                        เข้าสู่คอมมูนิตี้ <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="flex-1">
                   <div className="grid grid-cols-2 gap-4">
                      {['RoV', 'Valorant', 'Minecraft', 'Genshin'].map((game, i) => (
                          <div key={game} className="bg-[#13132b] p-6 rounded-2xl border border-white/10 text-center hover:-translate-y-2 transition-transform">
                              <div className={`w-12 h-12 mx-auto rounded-full mb-3 flex items-center justify-center font-bold text-xl bg-gradient-to-br ${
                                  i===0 ? 'from-blue-600 to-blue-400' : i===1 ? 'from-red-600 to-red-400' : i===2 ? 'from-green-600 to-green-400' : 'from-purple-600 to-pink-400'
                              }`}>
                                  {game.charAt(0)}
                              </div>
                              <h3 className="font-bold text-white">{game}</h3>
                          </div>
                      ))}
                   </div>
                </div>
            </div>
        </div>
      </section>

      {/* Feature 4: Swipe Friend */}
      <section className="py-24 bg-[#05050a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500/10 text-pink-400 text-sm font-bold">
                        <Heart className="w-4 h-4" /> Swipe Friend
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        ปัดขวา... <br/>
                        <span className="text-pink-500">หาเพื่อนรู้ใจ</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        วิธีใหม่ในการหาเพื่อนเล่นเกม! ระบบจะแนะนำคนที่เล่นเกมเดียวกัน และมีสไตล์การเล่นที่เข้ากัน ปัดขวาถ้าชอบ ปัดซ้ายถ้าไม่ใช่
                    </p>
                    <Link href="/features/swipe" className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-xl font-bold text-white transition-colors">
                        ลองเล่น Swipe Mode <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="w-64 h-96 bg-[#13132b] rounded-[32px] border-4 border-[#2a2a40] relative overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                         <img src="/games/valorant.png" className="w-full h-full object-cover opacity-50" alt="Profile" />
                         <div className="absolute bottom-6 left-6 z-20">
                             <h3 className="text-2xl font-bold text-white">Jett_Main</h3>
                             <p className="text-gray-300">Valorant • Ascendant</p>
                         </div>
                         <div className="absolute bottom-6 right-6 z-20 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/40">
                             <Heart className="fill-white" size={24} />
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Feature 5: Top Up */}
      <section className="py-24 bg-[#0a0a16] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm font-bold">
                        <Coins className="w-4 h-4" /> Top Up
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        เติมเกมคุ้ม <br/>
                        <span className="text-green-500">เงินเข้าทันที</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        บริการเติมเกมมือถือและ PC ราคาถูกกว่าเติมเอง ปลอดภัย 100% ด้วยระบบอัตโนมัติ รับประกันเงินไม่หาย
                    </p>
                    <Link href="/features/topup" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white transition-colors">
                        ดูโปรโมชั่นเติมเกม <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="flex-1">
                    <div className="bg-[#13132b] p-8 rounded-3xl border border-white/5">
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl"></div>
                                <div>
                                    <div className="font-bold text-white">RoV Coupons</div>
                                    <div className="text-xs text-gray-400">Garena</div>
                                </div>
                            </div>
                            <div className="text-green-400 font-bold">-15% OFF</div>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-[#0a0a16] hover:bg-white/5 cursor-pointer transition-colors">
                                    <span className="text-gray-300">{i * 1000} Coupons</span>
                                    <span className="font-bold text-white">฿{(i * 300) - 50}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Feature 6: Jobs */}
      <section className="py-24 bg-[#05050a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 text-sm font-bold">
                        <Briefcase className="w-4 h-4" /> Jobs & Boosting
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        เล่นเกมเก่ง <br/>
                        <span className="text-orange-500">เปลี่ยนเป็นเงิน</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        พื้นที่สำหรับ Pro Player ในการรับงานสอนเล่น (Coaching) หรือรับจ้างเล่น (Boosting) สร้างรายได้จากฝีมือของคุณ
                    </p>
                    <Link href="/features/jobs" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold text-white transition-colors">
                        สมัครเป็น Pro Player <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="flex-1 flex justify-center">
                     <div className="bg-[#13132b] p-8 rounded-3xl border border-white/5 w-full max-w-sm relative overflow-hidden">
                         <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">HOT JOB</div>
                         <div className="w-16 h-16 bg-gray-700 rounded-full mb-4 border-2 border-orange-500"></div>
                         <h3 className="text-xl font-bold text-white mb-1">รับจ้างสอน RoV</h3>
                         <div className="flex gap-1 mb-4">
                             {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                         </div>
                         <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/5">
                             <span className="text-gray-400">Rate / hr</span>
                             <span className="text-2xl font-bold text-green-400">฿300</span>
                         </div>
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* All Features Grid Summary */}
      <section className="py-20 bg-[#05050a] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">ฟีเจอร์ทั้งหมดใน Anajak Play</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    แพลตฟอร์มที่รวบรวมทุกความต้องการของเกมเมอร์ไว้ในที่เดียว ใช้งานง่าย ปลอดภัย และครบครัน
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                    { icon: Users, title: "หาตี้ (LFG)", desc: "ระบบหาเพื่อนเล่นเกม คัดกรองตาม Rank และ Role เจอทีมงานคุณภาพ" },
                    { icon: ShoppingBag, title: "Marketplace", desc: "ซื้อขายไอดีและไอเทมอย่างปลอดภัย ด้วยระบบคนกลาง (Escrow)" },
                    { icon: MessageCircle, title: "Community", desc: "พื้นที่พูดคุย แลกเปลี่ยนเทคนิค และหากิลด์สำหรับเกมเมอร์" },
                    { icon: Heart, title: "Swipe Friend", desc: "ค้นหาเพื่อนรู้ใจด้วยระบบ Matching แบบปัดขวา เจอคนที่ใช่ได้ง่ายๆ" },
                    { icon: Coins, title: "Top Up & Wallet", desc: "เติมเกมราคาคุ้ม พร้อมกระเป๋าเงินดิจิทัลที่สะดวกและปลอดภัย" },
                    { icon: Briefcase, title: "Jobs & Boosting", desc: "สร้างรายได้จากการเล่นเกม รับจ้างสอน หรือรับจ้างเล่น" },
                    { icon: MessageCircle, title: "Real-time Chat", desc: "แชทคุยกับเพื่อนหรือคู่ค้าได้ทันที ไม่พลาดทุกการติดต่อ" },
                    { icon: Trophy, title: "Gamification", desc: "สนุกกับการทำภารกิจรายวัน สะสมแต้มเพื่อแลกรับของรางวัล" },
                    { icon: Shield, title: "Profile & Verify", desc: "สร้างโปรไฟล์เท่ๆ และยืนยันตัวตนเพื่อความน่าเชื่อถือสูงสุด" },
                ].map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#13132b]/50 border border-white/5 hover:bg-[#13132b] hover:border-purple-500/30 transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors text-gray-400">
                            <feature.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#05050a] border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                พร้อมที่จะเป็นส่วนหนึ่งของ <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Anajak Play</span> แล้วหรือยัง?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                สมัครสมาชิกวันนี้เพื่อเริ่มต้นใช้งานทุกฟีเจอร์ได้ฟรี! สร้างโปรไฟล์ หาเพื่อน และสนุกไปกับสังคมเกมเมอร์ที่ดีที่สุด
            </p>
            <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl text-xl shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40 hover:scale-105 transition-all"
            >
                <Gamepad2 className="w-6 h-6" />
                เข้าสู่ระบบทันที
            </Link>
        </div>
      </section>

      {/* Footer - Clear Features */}
      <footer className="py-20 border-t border-white/5 bg-[#020205] text-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                            <Zap className="text-white w-4 h-4 fill-white" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-wider">ANAJAK PLAY</span>
                    </div>
                    <p className="text-gray-500 mb-6">
                        แพลตฟอร์มสำหรับเกมเมอร์ที่ครบวงจรที่สุดในไทย สร้างขึ้นเพื่อเชื่อมต่อผู้เล่นทุกคนเข้าด้วยกัน
                    </p>
                </div>

                {/* Links 1 */}
                <div>
                    <h4 className="font-bold text-white mb-4">บริการของเรา</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="/features/lfg" className="hover:text-purple-400 transition-colors">หาปาร์ตี้ (Party Finder)</Link></li>
                        <li><Link href="/features/marketplace" className="hover:text-blue-400 transition-colors">ตลาดซื้อขาย (Marketplace)</Link></li>
                        <li><Link href="/features/community" className="hover:text-yellow-400 transition-colors">คอมมูนิตี้ (Community)</Link></li>
                        <li><Link href="/features/swipe" className="hover:text-pink-400 transition-colors">หาเพื่อน (Swipe Friends)</Link></li>
                    </ul>
                </div>

                {/* Links 2 */}
                <div>
                    <h4 className="font-bold text-white mb-4">เกี่ยวกับเรา</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">เกี่ยวกับ Anajak Play</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">ร่วมงานกับเรา</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">ติดต่อทีมงาน</a></li>
                    </ul>
                </div>

                {/* Links 3 */}
                <div>
                    <h4 className="font-bold text-white mb-4">ความช่วยเหลือ</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">ศูนย์ช่วยเหลือ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">แจ้งปัญหาการใช้งาน</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">กฎระเบียบชุมชน</a></li>
                    </ul>
                </div>
        </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-gray-500">© 2024 Anajak Play. All rights reserved.</span>
                <div className="flex gap-6 text-gray-500 font-medium">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
           </div>
        </div>
      </footer>

      </div>
  );
}
