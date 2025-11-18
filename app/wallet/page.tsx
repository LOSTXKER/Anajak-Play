'use client';

import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft, Calendar, Plus, CreditCard, Smartphone } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { userProfileData } from '@/lib/data/legacy-data';

export default function WalletPage() {
  const transactions = [
    { id: 1, type: 'deposit', amount: 500, description: 'เติมเงินผ่าน TrueMoney', date: '2 ชม.ที่แล้ว', status: 'completed' },
    { id: 2, type: 'withdraw', amount: -200, description: 'จ้าง Coach Pro', date: '5 ชม.ที่แล้ว', status: 'completed' },
    { id: 3, type: 'earn', amount: 150, description: 'ชนะการแข่งขัน', date: '1 วันที่แล้ว', status: 'completed' },
    { id: 4, type: 'withdraw', amount: -300, description: 'ซื้อ Skin Pack', date: '2 วันที่แล้ว', status: 'completed' },
  ];

  return (
    <DashboardLayout contentClassName="max-w-[1400px]">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-green-100 text-sm mb-2">ยอดเงินคงเหลือ</p>
                  <h2 className="text-5xl font-bold text-white">฿{userProfileData.wallet.toLocaleString()}</h2>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-green-50 transition flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  เติมเงิน
                </button>
                <button className="flex-1 bg-white/20 text-white py-3 rounded-xl font-bold hover:bg-white/30 transition backdrop-blur-sm flex items-center justify-center gap-2">
                  <ArrowUpRight className="w-5 h-5" />
                  โอนเงิน
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Payment Methods */}
              <div className="bg-[#0f0f1a] rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">วิธีการเติมเงิน</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition cursor-pointer border border-white/5 hover:border-purple-500/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white">TrueMoney Wallet</div>
                        <div className="text-xs text-gray-400">ฝากทันที ไม่มีค่าธรรมเนียม</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-xl p-4 hover:bg-black/50 transition cursor-pointer border border-white/5 hover:border-purple-500/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white">บัตรเครดิต/เดบิต</div>
                        <div className="text-xs text-gray-400">Visa, Mastercard</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-[#0f0f1a] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">ประวัติการทำรายการ</h3>
                  <button className="text-sm text-purple-400 hover:text-purple-300">ดูทั้งหมด</button>
                </div>
                
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="bg-black/30 rounded-xl p-4 flex items-center justify-between hover:bg-black/50 transition">
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          ${tx.type === 'deposit' ? 'bg-green-500/20' : tx.type === 'earn' ? 'bg-yellow-500/20' : 'bg-red-500/20'}
                        `}>
                          {tx.type === 'deposit' ? (
                            <ArrowDownLeft className="w-5 h-5 text-green-400" />
                          ) : tx.type === 'earn' ? (
                            <TrendingUp className="w-5 h-5 text-yellow-400" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{tx.description}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {tx.date}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.amount > 0 ? '+' : ''}฿{Math.abs(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#0f0f1a] rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">สถิติเดือนนี้</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">รายรับ</span>
                      <span className="text-green-400 font-bold">+฿650</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-400 w-[65%] h-full"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">รายจ่าย</span>
                      <span className="text-red-400 font-bold">-฿500</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-400 w-[50%] h-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-lg font-bold mb-2">Anajak Escrow</h3>
                <p className="text-sm text-gray-300 mb-4">
                  ชำระเงินปลอดภัยด้วยระบบเงินมัดจำ ปกป้องทุกธุรกรรม
                </p>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition">
                  เรียนรู้เพิ่มเติม
                </button>
              </div>
            </div>
          </div>
    </DashboardLayout>
  );
}
