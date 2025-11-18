/**
 * Marketplace Listing Detail Page
 * Display detailed information for a marketplace listing
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, MessageCircle, Shield, Star, Zap } from 'lucide-react';

import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { mockMarketplaceListings, gameConfig } from '@/lib/data/mock-data';

interface MarketplaceDetailPageProps {
  params: {
    id: string;
  };
}

const typeLabels: Record<string, string> = {
  coaching: '🎓 Coaching',
  'hire-play': '🎮 Hire Play',
  'item-sale': '💎 Item Sale',
  'account-sale': '👤 Account Sale',
  custom: '✨ Custom',
};

const priceTypeLabels: Record<string, string> = {
  'per-hour': '/ชม.',
  'per-session': '/Session',
  fixed: '',
};

export default function MarketplaceDetailPage({ params }: MarketplaceDetailPageProps) {
  const listing = mockMarketplaceListings.find((item) => item.id === params.id);

  if (!listing) {
    notFound();
  }

  const gameMeta = gameConfig[listing.game as keyof typeof gameConfig] ?? {
    name: listing.game.toUpperCase(),
    fullName: listing.game.toUpperCase(),
    color: '#A855F7',
  };

  const sellerSince = listing.seller.createdAt.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
  });

  const responseTime = listing.type === 'coaching' ? 'ภายใน 3 นาที' : 'ไม่เกิน 10 นาที';
  const serviceDuration = listing.priceType === 'per-hour' ? '60 นาที / Session' : 'ตามตกลง';
  const playstyle = listing.seller.profile.playstyle.join(', ');

  const serviceHighlights = listing.type === 'coaching'
    ? [
        'วิเคราะห์รีเพลย์และจุดพลาดของคุณแบบละเอียด',
        'ปรับแผนการเล่นตามแรงค์และฮีโร่ที่ถนัด',
        'มี Homework และ Note ส่งกลับให้หลังจบ Session',
      ]
    : [
        'ลงแรงค์พร้อมพาแบกทุกแมตช์',
        'คุยวิเคราะห์สดทุกจังหวะสำคัญ',
        'พร้อมเล่นตามเวลาที่คุณสะดวก',
      ];

  const quickStats = [
    {
      icon: <Star className="w-4 h-4 text-status-warning" />,
      label: 'เรตติ้ง',
      value: `${listing.averageRating.toFixed(1)}/5`,
      hint: `${listing.reviewCount} รีวิวจากผู้เล่น`,
    },
    {
      icon: <CheckCircle className="w-4 h-4 text-status-success" />,
      label: 'งานสำเร็จ',
      value: `${listing.totalSales} งาน`,
      hint: 'ผ่านระบบ Anajak Shield',
    },
    {
      icon: <Clock className="w-4 h-4 text-secondary-electric" />,
      label: 'เวลาตอบกลับ',
      value: responseTime,
      hint: 'เฉลี่ยตามข้อมูลล่าสุด',
    },
    {
      icon: <Shield className="w-4 h-4 text-primary-neon" />,
      label: 'การรับประกัน',
      value: 'Escrow ปลอดภัย 100%',
      hint: 'คุ้มครองทั้งสองฝ่าย',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-base pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 pt-8 text-sm text-text-secondary">
          <ArrowLeft className="w-4 h-4" />
          <Link href="/marketplace" className="hover:text-primary-neon transition-colors">
            กลับไปหน้า Marketplace
          </Link>
          <span className="text-text-tertiary">/</span>
          <span className="text-text-primary">{listing.title}</span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Main Content */}
          <div className="space-y-6">
            <Card variant="gradient">
              <CardBody className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="primary" size="md">
                    {typeLabels[listing.type] ?? 'บริการ' }
                  </Badge>
                  <Badge variant="warning" size="md">
                    {gameMeta.fullName}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading text-text-primary mb-4">
                  {listing.title}
                </h1>
                <p className="text-text-secondary text-base md:text-lg mb-6">
                  ปรับกลยุทธ์เฉพาะสำหรับผู้เล่น{` `}
                  {gameMeta.name} ด้วยโค้ชมือโปรที่มีชื่อเสียงระดับ {listing.seller.reputation.tier.toUpperCase()}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-xs text-text-tertiary uppercase tracking-wide">ราคา</p>
                    <p className="text-3xl font-bold text-primary-neon font-mono">
                      ฿{listing.price}
                      <span className="text-base text-text-secondary ml-2">
                        {priceTypeLabels[listing.priceType]}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary uppercase tracking-wide">ระยะเวลา</p>
                    <p className="text-lg text-text-primary font-semibold">{serviceDuration}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="gradient" size="md" className="px-6">
                      จองบริการทันที
                    </Button>
                    <Button variant="outline" size="md" className="px-6">
                      <MessageCircle className="w-4 h-4" />
                      พูดคุยก่อนจอง
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card variant="default">
              <CardBody className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-3">Description</h2>
                  <div className="space-y-3 text-text-secondary leading-relaxed">
                    <p>{listing.description}</p>
                    <p>
                      แต่ละ Session จะเริ่มต้นด้วยการพูดคุยตั้งเป้าหมายและตรวจสอบปัญหาที่เจอในแรงค์
                      จากนั้นเราจะวิเคราะห์การเล่นจริง พร้อมสรุป Checklist ให้คุณนำกลับไปฝึกต่อได้ทันที
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">สิ่งที่คุณจะได้รับ</h3>
                  <ul className="grid gap-2 text-sm text-text-secondary">
                    {serviceHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 mt-0.5 text-primary-neon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-dark-surface border border-dark-surface p-4">
                    <p className="text-xs text-text-tertiary uppercase tracking-wide mb-1">สไตล์การเล่น</p>
                    <p className="text-sm text-text-primary">{playstyle || 'ปรับได้ตามลูกค้า'}</p>
                  </div>
                  <div className="rounded-xl bg-dark-surface border border-dark-surface p-4">
                    <p className="text-xs text-text-tertiary uppercase tracking-wide mb-1">เวลาที่สะดวก</p>
                    <p className="text-sm text-text-primary">18:00 - 23:00 น. (ยืดหยุ่น)</p>
                  </div>
                  <div className="rounded-xl bg-dark-surface border border-dark-surface p-4">
                    <p className="text-xs text-text-tertiary uppercase tracking-wide mb-1">เครื่องมือที่ใช้</p>
                    <p className="text-sm text-text-primary">Discord, Screen Share, VOD Review</p>
                  </div>
                  <div className="rounded-xl bg-dark-surface border border-dark-surface p-4">
                    <p className="text-xs text-text-tertiary uppercase tracking-wide mb-1">ภาษา</p>
                    <p className="text-sm text-text-primary">ไทย / English (พื้นฐาน)</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Seller Sidebar */}
          <div className="space-y-6">
            <Card variant="elevated">
              <CardBody className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={listing.seller.avatar}
                    alt={listing.seller.displayName}
                    size="lg"
                    status={listing.seller.isOnline ? 'online' : 'offline'}
                    frame={listing.seller.cosmetics.activeFrame}
                  />
                  <div>
                    <p className="text-lg font-semibold text-text-primary">
                      {listing.seller.displayName}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Level {listing.seller.level} • Reputation {listing.seller.reputation.overall}
                    </p>
                    <p className="text-xs text-text-tertiary">สมาชิกตั้งแต่ {sellerSince}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-text-secondary">Quick Stats</h3>
                  <div className="space-y-3">
                    {quickStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-start gap-3 rounded-lg border border-dark-surface bg-dark-surface px-3 py-2"
                      >
                        <div className="mt-1">{stat.icon}</div>
                        <div>
                          <p className="text-sm text-text-primary font-semibold">{stat.label}</p>
                          <p className="text-sm text-primary-neon font-mono">{stat.value}</p>
                          <p className="text-xs text-text-tertiary">{stat.hint}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-text-tertiary">
                  <p>• ตรวจสอบตัวตนและผ่านระบบ Reputation แล้ว</p>
                  <p>• เชื่อม Discord: {listing.seller.profile.discordId ?? 'พร้อมให้หลังจอง'}</p>
                  <p>• รองรับการนัดล่วงหน้ายาวสุด 7 วัน</p>
                </div>

                <Button variant="secondary" size="md" className="w-full">
                  ส่งข้อความหาโค้ช
                </Button>
              </CardBody>
            </Card>

            <Card variant="default">
              <CardBody className="p-5 text-sm text-text-secondary space-y-3">
                <h3 className="text-sm font-semibold text-text-primary">Anajak Shield</h3>
                <p>
                  ระบบ Escrow จะถือเงินไว้ให้จนกว่างานจะเสร็จสมบูรณ์ คุณสามารถขอปรับแก้หรือขอเงินคืนได้หากบริการไม่ตรงตามที่ตกลงไว้
                </p>
                <p>
                  หลังจบงาน อย่าลืมให้รีวิวเพื่อช่วยให้โค้ชที่ดีมีงานต่อเนื่อง และช่วยชุมชนคัดกรองผู้ให้บริการที่มีคุณภาพ
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
