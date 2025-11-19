import React, { useState } from 'react';
import { MarketplaceListing } from '@/lib/types';
import { Shield, Wallet, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface PurchaseModalProps {
  listing: MarketplaceListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseModal = ({ listing, isOpen, onClose }: PurchaseModalProps) => {
  const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm');

  if (!isOpen || !listing) return null;

  const handleConfirm = () => {
    setStep('processing');
    // Mock API call
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    setStep('confirm');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative z-10 w-full max-w-md bg-[#111118] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#161620]">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" />
            Anajak Escrow Protection
          </h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-white">✕</button>
        </div>

        <div className="p-6">
          {step === 'confirm' && (
            <>
              <div className="flex gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-800 border border-white/10 flex-shrink-0">
                  {listing.images && listing.images.length > 0 ? (
                    <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Image</div>
                  )}
                </div>
                <div>
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-1 uppercase">
                    {listing.type}
                  </div>
                  <h4 className="font-bold text-white text-sm line-clamp-2 mb-1">{listing.title}</h4>
                  <p className="text-xs text-gray-400 mb-2">ผู้ขาย: {listing.seller.displayName}</p>
                  <div className="text-xl font-bold text-cyan-400">฿{listing.price.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-3 bg-[#0a0a0d] p-4 rounded-xl border border-white/5 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ราคาสินค้า</span>
                  <span className="text-white">฿{listing.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ค่าธรรมเนียม (0%)</span>
                  <span className="text-green-400">฿0</span>
                </div>
                <div className="h-[1px] bg-white/10 my-1" />
                <div className="flex justify-between font-bold">
                  <span className="text-white">ยอดรวมสุทธิ</span>
                  <span className="text-cyan-400">฿{listing.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 mb-6 flex gap-3">
                <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <p className="text-xs text-purple-200">
                  เงินของคุณจะถูกเก็บไว้ในระบบ Escrow จนกว่าคุณจะได้รับสินค้าหรือบริการครบถ้วน ปลอดภัย 100%
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={handleClose} className="flex-1">ยกเลิก</Button>
                <Button 
                  onClick={handleConfirm} 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  ชำระเงิน
                </Button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="py-10 text-center">
              <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">กำลังดำเนินการ...</h3>
              <p className="text-gray-400 text-sm">ระบบกำลังล็อคยอดเงินใน Escrow</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">ชำระเงินสำเร็จ!</h3>
              <p className="text-gray-400 text-sm mb-8 px-4">
                ผู้ขายได้รับการแจ้งเตือนแล้ว<br/>คุณสามารถเริ่มแชทกับผู้ขายได้ทันที
              </p>
              <Button onClick={handleClose} className="w-full bg-[#1a1a23] hover:bg-[#252530] text-white border border-white/10">
                ตกลง
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

