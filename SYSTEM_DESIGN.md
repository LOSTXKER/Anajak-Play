# Anajak Play - System Design & Architecture

## 🎯 Core Concept: "Social Gaming Hub"

**Anajak Play ไม่ใช่เกม แต่เป็น "พื้นที่กลาง" ที่เกมเมอร์มาเจอกัน คุยกัน ทำธุรกรรม และกลับไปเล่นในเกมจริง**

### Target
- **เกม:** ทุกเกม (PC + Mobile)
- **ขอบเขต:** Gaming Superapp ครบวงจร
- **Model:** Social + Marketplace + Community

---

## 📊 ข้อจำกัดที่ต้องคำนึง

### ข้อจำกัดทางเทคนิค:
- ❌ **ไม่สามารถดึงข้อมูลจากเกมจริง** (Rank, Stats, Match History)
- ❌ **ไม่สามารถจัดแมตช์อัตโนมัติ**
- ❌ **ไม่สามารถตรวจสอบว่าเล่นจริงหรือไม่**

### วิธีแก้:
- ✅ **Self-reported Data** - ให้ User กรอกข้อมูลเอง
- ✅ **Reputation System** - ใช้รีวิวจาก User อื่นเป็นตัวตรวจสอบ
- ✅ **Escrow System** - ป้องกันการโกงในธุรกรรม
- ✅ **Verification Badge** - ให้อัพโหลดหลักฐาน (Optional)

---

## 🏗️ ระบบหลัก (Core Systems)

### 1. LFG System - "หาคน แล้วออกไปเล่น"

#### User Flow:
```
1. เห็น LobbyCard ในหน้าแรก
2. กด "เข้าร่วม" → เข้าห้องในสถานะ Spectator
3. ดู vibe ของห้อง + คุยกับคนในห้อง
4. ถ้าชอบ → กด "ขอเข้าเล่น" → เลือก Role
5. Leader อนุมัติ → กลายเป็น Player
6. ทุกคนพร้อม (Ready) → แลกเปลี่ยน IGN
7. ถ้ามี Discord Voice → กดเข้า Discord
8. "ไปเล่นเกมจริง" → ออกจากแพลตฟอร์ม
9. (Optional) เล่นเสร็จกลับมา → รีวิวกัน → ได้ Rep Points
```

#### Spectator Mode:
- **2 ประเภท Spectator:**
  - 🎮 **"รอเข้าเล่น"** - คนที่กด "ขอเข้าเล่น" แล้วรอ Leader อนุมัติ
  - 👁️ **"ดูอย่างเดียว"** - โค้ช, เพื่อน, แฟน, หรือคนอยากดูเฉยๆ

#### Voice Chat Integration:
- **Discord Link (Optional)**
  - Leader สามารถวาง Discord Link ตอนสร้างห้อง
  - แสดง Badge "🎤 Voice Available" ใน LobbyCard
  - คนในห้องเห็นปุ่ม "เข้า Discord Voice" ชัดเจน
  - คัดลอกลิงก์ได้ง่าย

#### ข้อดี:
- รองรับทุกเกม (MOBA, FPS, MMORPG, Casual)
- ยืดหยุ่น - อยากเล่นก็เล่น ไม่อยากก็ดู
- สร้าง Community - คนไม่เล่นก็อยู่ได้
- รองรับ Marketplace - โค้ชเข้ามาดูฟรี แล้วเสนอบริการ
- Voice Chat ผ่าน Discord - ฟรี, เสถียร, คนคุ้นเคย

---

### 2. Marketplace - "ซื้อ-ขาย บริการเกม"

#### หมวดหมู่:
1. **🟦 Hire Play** - จ้างเล่น/จ้างแบก
2. **🟩 Coaching** - โค้ชเกม
3. **🟧 In-Game Items** - ซื้อ-ขาย Skin/Items/Code
4. **🟨 Account Trading** - ซื้อขายไอดี
5. **🟪 Custom Services** - ทำไฮไลต์, Overlay, ตกแต่งโปรไฟล์

#### Escrow System Flow:
```
1. Buyer จ่ายเงิน → เงินเข้า Escrow (ค้างไว้)
2. Seller รับงาน → ทำงาน → ส่งหลักฐานในแชท
3. Buyer ตรวจสอบ → กด "ยืนยันรับของ"
4. เงินถูกปล่อยให้ Seller
5. ทั้ง 2 ฝ่ายรีวิวกัน → ได้ Rep Points
```

#### กรณีมีปัญหา (Dispute):
```
1. ถ้า Buyer ไม่กดยืนยัน → Seller เปิด Dispute
2. ถ้า Seller ไม่ส่งของ → Buyer เปิด Dispute
3. Admin ตรวจสอบ Chat History + หลักฐาน
4. ตัดสินใจปล่อยเงินให้ฝ่ายใด
```

#### User Flow: Coaching
```
1. เข้า Market → หมวด Coaching
2. เลือกโค้ช → ดูรีวิว, Rep, ราคา
3. กด "จอง" → จ่ายเงินเข้า Escrow
4. นัดเวลา + รับลิงก์ Discord/Zoom
5. เรียนจบ → กดยืนยัน → ปล่อยเงิน → รีวิว
```

#### User Flow: Hire Play
```
1. เข้า Market → หมวด Hire Play
2. โพสต์งาน: "ต้องการไต่แรงค์ Diamond → Master"
3. Seller สนใจ → เสนอราคา
4. ตกลงราคา → จ่าย → Seller รับงาน
5. Seller แคปหน้าจอส่งในแชท (Progress Update)
6. เสร็จแล้ว → Buyer เช็ค → ยืนยัน → ปล่อยเงิน
7. รีวิวกัน
```

---

### 3. Reputation System - "ระบบชื่อเสียงกลาง"

#### ทำไมสำคัญ:
เพราะไม่มีข้อมูลจริงจากเกม → ต้องพึ่ง **"ความไว้ใจจาก User อื่น"**

#### ระบบ Rep:
```
✅ หลังเล่น LFG → รีวิวกัน (5 ดาว)
   - ดี: ไม่ Toxic, เล่นดี, ตรงเวลา, สื่อสารดี
   - ไม่ดี: AFK, หลอก, เล่นแย่, Toxic

✅ หลังทำธุรกรรม Marketplace → รีวิว
   - Seller: ส่งของตรง, บริการดี, รวดเร็ว
   - Buyer: จ่ายเงินตรง, ไม่มีปัญหา

✅ Rep แสดงทุกที่
   - หน้าโปรไฟล์
   - ใน LobbyCard
   - ใน Marketplace Listing
   - ใน Chat

✅ Rep สูง (4.5+) → สิทธิพิเศษ
   - Boost โปรไฟล์ฟรี 1 ครั้ง/สัปดาห์
   - ค่าธรรมเนียม Marketplace ลด 50%
   - Badge พิเศษ "Trusted Member"
   - ปรากฏบนสุดในการค้นหา
```

#### การป้องกันการโกง Rep:
- ไม่สามารถรีวิวคนเดิมซ้ำภายใน 7 วัน
- ระบบ AI ตรวจจับรีวิวปลอม (คนเดิมรีวิวกันบ่อย)
- Report System - ถ้าโกหก/ซื้อรีวิว → Ban

---

### 4. Community + Feed - "สร้างความยึดเหนี่ยว"

#### ปัญหา:
คนออกไปเล่นแล้ว **ไม่กลับมา** → แพลตฟอร์มตาย

#### วิธีแก้:

**Feed ที่ดึงดูดให้กลับมา:**
- โพสต์ไฮไลต์ → คนมาดู → อยากเล่นบ้าง → กลับมาหาตี้
- แชร์ความสำเร็จ (ขึ้นแรงค์) → สร้าง FOMO
- รีวิว Marketplace → คนอื่นเห็น → เข้ามาใช้บริการ
- โพสต์ประกาศขายของ/รับงาน → ดึง Traffic

**Community Hub:**
- ห้องตามเกม/Rank/สไตล์
- แชร์เทคนิค, พูดคุย
- สร้างความเป็นชุมชน
- ลด Toxic ด้วย Reputation

**Achievement + Milestone:**
- "เล่นครบ 100 เกม" → ได้ Badge
- "Rep 5.0 นาน 6 เดือน" → ได้ Title "Legend"
- "ทำธุรกรรม Marketplace ครบ 50 ครั้ง" → ได้ "Pro Seller"
- เพิ่มความยึดเหนี่ยวในแพลตฟอร์ม

---

## 🎨 UI/UX Design

### Homepage Structure:

```
┌─────────────────────────────────────────┐
│ 🎮 Anajak Play              [🔔][Wallet][👤]│
├─────────────────────────────────────────┤
│ 🔍 ค้นหาเกม, ผู้เล่น, บริการ...        │
├─────────────────────────────────────────┤
│ 🎯 เกมยอดนิยม:                          │
│ ┌──────┐┌──────┐┌──────┐┌──────┐       │
│ │ RoV  ││Valo  ││PUBG  ││Genshin│ +20  │
│ └──────┘└──────┘└──────┘└──────┘       │
├─────────────────────────────────────────┤
│ Tab: [หาตี้] [ตลาด] [คอมมูนิตี้] [ฟีด]  │
├─────────────────────────────────────────┤
│ 📋 LFG - หาตี้เล่นเกม                   │
│                                         │
│ ┌──────────────────────┐               │
│ │ 🎯 RoV Ranked        │ [เข้าร่วม]    │
│ │ Commander+ | 2/5     │               │
│ │ ⭐ 4.8 | 🎤 Mic On   │               │
│ └──────────────────────┘               │
│                                         │
│ ┌──────────────────────┐               │
│ │ 🔫 Valorant Unrated  │ [เข้าร่วม]    │
│ │ Any Rank | 3/5       │               │
│ │ ⭐ 4.9 | 🎤 Optional  │               │
│ └──────────────────────┘               │
│                                         │
│ [+ สร้างห้องใหม่]                       │
├─────────────────────────────────────────┤
│ 💼 Marketplace - บริการยอดนิยม          │
│ [🎓 โค้ช] [🎮 จ้างเล่น] [🛍️ ไอเทม]    │
└─────────────────────────────────────────┘
```

### Party Room UI (Spectator Mode):

```
┌─────────────────────────────────────────┐
│ 🎮 RoV Ranked - Commander+              │
│ Room #AJ-101 | Leader: KiraGod ⭐4.9    │
│ [คัดลอก] [ตั้งค่า] [ออกจากห้อง]         │
├─────────────────────────────────────────┤
│ 🎤 Discord Voice Chat Available         │
│ [🔊 เข้า Discord Voice] [คัดลอกลิงก์]   │
├─────────────────────────────────────────┤
│                                         │
│ ⚡ ผู้เล่น (3/5)                        │
│ ┌────────────────┐ ┌────────────────┐  │
│ │✅ Jungle       │ │⏳ Carry (ว่าง) │  │
│ │  KiraGod 👑    │ │                │  │
│ │  ⭐4.9 |Ready │ │  [เข้าเล่น]     │  │
│ └────────────────┘ └────────────────┘  │
│ ┌────────────────┐ ┌────────────────┐  │
│ │✅ Mage         │ │⏳ Support(ว่าง)│  │
│ │  MageGod       │ │                │  │
│ │  ⭐4.7 |Ready │ │  [เข้าเล่น]     │  │
│ └────────────────┘ └────────────────┘  │
│ ┌────────────────┐                     │
│ │✅ Fighter      │                     │
│ │  TopLaner      │                     │
│ │  ⭐4.5 |Not Ready                    │
│ └────────────────┘                     │
├─────────────────────────────────────────┤
│ 👁️ ผู้ชม (Spectators) - 2 คน          │
│ • 🎮 NongMind (รอเข้าเล่น)              │
│ • 💬 CoachPro (ดูอย่างเดียว)            │
├─────────────────────────────────────────┤
│ [คุณคือ Spectator]                      │
│ 🎮 ขอเข้าเล่น | 💬 ดูอย่างเดียว         │
├─────────────────────────────────────────┤
│ 💬 Chat                                 │
│ KiraGod: ขาดอีก 2 คนครับ               │
│ MageGod: ได้ครับรอ                      │
└─────────────────────────────────────────┘
```

### ระบบกรอง (Filter):

```
Filter:
┌─ เกม ────────────────────┐
│ [All] [RoV] [Valorant]   │
│ [PUBG] [Genshin] ...     │
└──────────────────────────┘

┌─ ประเภท ─────────────────┐
│ [Ranked] [Casual]        │
│ [Custom] [Tournament]    │
└──────────────────────────┘

┌─ Rank ───────────────────┐
│ [Any] [Diamond+]         │
│ [Master+] [Conqueror]    │
└──────────────────────────┘

┌─ เวลา ───────────────────┐
│ [Now] [ใน 30 นาที]       │
│ [วันนี้] [พรุ่งนี้]      │
└──────────────────────────┘

┌─ อื่นๆ ──────────────────┐
│ ☑ ต้องมี Mic            │
│ ☑ Verified Only          │
│ ☐ Rep 4.5+               │
└──────────────────────────┘
```

---

## 🚀 Roadmap

### Phase 1: MVP Core (1-2 เดือน)
**เป้าหมาย:** เปิดใช้งาน LFG พื้นฐาน

- ✅ Authentication (Login/Register)
- ✅ Profile + Self-reported Stats
- ✅ LFG Basic (Create/Join Room)
- ✅ Party Room + Chat
- ✅ Spectator Mode
- ✅ **Discord Integration** (Voice Chat Link)
- ✅ Basic Reputation (Like/Dislike)
- ✅ Notification
- ✅ Search + Filter

**Launch:** Soft Launch กับกลุ่มเล็กๆ (100-500 คน)

---

### Phase 2: Marketplace Foundation (2-3 เดือน)
**เป้าหมาย:** เปิด Marketplace ให้ใช้งานได้

- ✅ Wallet System (Top-up ด้วย QR/Bank Transfer)
- ✅ Escrow System
- ✅ Marketplace - Coaching
- ✅ Marketplace - Hire Play
- ✅ Chat + อัพโหลดภาพ/วิดีโอ
- ✅ Review System (5 ดาว + Comment)
- ✅ Dispute Center
- ✅ Seller Dashboard

**Launch:** เปิด Beta Marketplace

---

### Phase 3: Community & Engagement (1-2 เดือน)
**เป้าหมาย:** สร้างความยึดเหนี่ยว

- ✅ Feed (โพสต์, แชร์, ไลก์, คอมเมนต์)
- ✅ Community Hub (ห้องตามเกม)
- ✅ Achievement System
- ✅ Milestone Badges
- ✅ Notification ครบทุกประเภท
- ✅ In-app Messaging (DM)

**Launch:** Public Release v1.0

---

### Phase 4: Expansion (3-6 เดือน)
**เป้าหมาย:** ขยายฟีเจอร์และ Monetization

- ✅ Marketplace - In-Game Items Trading
- ✅ Marketplace - Account Trading
- ✅ Verification System (อัพโหลดหลักฐาน Rank)
- ✅ Premium Subscription (Anajak Plus)
- ✅ Boost Listing (โฆษณาห้อง/โปรไฟล์)
- ✅ Affiliate Program (Top-up เกม)
- ✅ Tournament Organizer Tools
- ✅ Mobile App (iOS + Android)

**Launch:** Full Platform

---

## 💰 Revenue Model

### 1. Marketplace Fees
- **Coaching:** 15% ค่าธรรมเนียม
- **Hire Play:** 10% ค่าธรรมเนียม
- **Items/ID Trading:** 5% ค่าธรรมเนียม

### 2. Subscription (Anajak Plus) - ฿99/เดือน
- ✅ Boost โปรไฟล์ไม่จำกัด
- ✅ ดูว่าใครเข้าดูโปรไฟล์
- ✅ Badge พิเศษ "Plus Member"
- ✅ ค่าธรรมเนียม Marketplace ลด 50%
- ✅ เข้าห้องเต็มได้ (Spectator Priority)

### 3. Boost Listing
- **Boost ห้อง LFG:** ฿20 (1 ชม.), ฿50 (6 ชม.)
- **Boost Marketplace Listing:** ฿30 (1 วัน), ฿150 (1 สัปดาห์)

### 4. Cosmetic & Customization
- **Profile Theme:** ฿49-99
- **Animated Badge:** ฿79
- **Custom Title:** ฿99
- **Profile Border:** ฿49

### 5. Game Deals & Affiliate
- เติมเกม (Codashop style) → รับ commission 3-5%
- Skin/Bundle ลดราคา → รับ affiliate fee

### 6. Sponsored Content
- แบรนด์เกมลงโฆษณา
- Tournament Sponsorship
- Banner Ads (เฉพาะ Free User)

---

## 🛡️ Risk Management

### 1. User ไม่พอ → LFG ดูโล่ง
**แก้:**
- แจ้งเตือน LFG แม่นยำ (ตรงเกม, ตรง Rank)
- ดึง Influencer/Streamer มาใช้ก่อน
- Beta Test กับกลุ่มเล็กๆ ก่อน Scale
- ใช้ Bot สร้างห้องตัวอย่างในช่วงแรก

### 2. Marketplace เสี่ยงโกง
**แก้:**
- Escrow System บังคับทุกธุรกรรม
- Chat History เก็บหลักฐาน
- Dispute Center + Admin Review
- Reputation ต่ำ → Ban อัตโนมัติ

### 3. Content Moderation หนัก
**แก้:**
- ระบบ Report + AI ตรวจจับคำหยาบ
- Community Moderator (จ้าง/อาสาสมัคร)
- Auto-ban คนที่ Rep ต่ำมากๆ

### 4. เด็กอายุต่ำกว่า 18 เข้ารับงานไม่ได้
**แก้:**
- Age Verification เบื้องต้น (กรอกวันเกิด)
- Marketplace ต้อง 18+ ถึงจะขายได้
- แต่ซื้อได้ทุกอายุ

### 5. คู่แข่งมีเยอะ (Discord, Teami, Esports)
**แก้:**
- เน้น UX ที่ดีกว่า (ง่าย, สวย, รวดเร็ว)
- Marketplace เป็นจุดเด่นที่คู่แข่งไม่มี
- Community + Feed สร้างความยึดเหนี่ยว
- Reputation System ที่ดีกว่า

---

## 🎯 Success Metrics (KPIs)

### Phase 1 (MVP):
- DAU: 500-1,000 คน
- Rooms Created/Day: 50-100
- Average Rep Score: 4.0+
- Chat Messages/Day: 1,000+

### Phase 2 (Marketplace):
- GMV (Gross Merchandise Value): ฿50,000/เดือน
- Transactions/Month: 100+
- Seller Count: 20-50 คน
- Buyer Count: 200-500 คน

### Phase 3 (Community):
- DAU: 5,000-10,000 คน
- Posts/Day: 100+
- Communities: 20+ active communities
- Retention Rate: 40%+

### Phase 4 (Expansion):
- MAU: 50,000+ คน
- GMV: ฿500,000+/เดือน
- Subscription Users: 500+ คน
- Revenue: ฿200,000+/เดือน

---

## 📱 Tech Stack (Recommended)

### Frontend:
- **Framework:** Next.js 14+ (App Router)
- **UI:** React + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Context API / Zustand
- **Real-time:** Socket.io / Pusher

### Backend:
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth / Firebase Auth
- **Storage:** Supabase Storage (images/videos)
- **Real-time:** Supabase Realtime
- **API:** Next.js API Routes / tRPC

### Payment:
- **Gateway:** Omise / 2C2P / Stripe
- **Wallet:** Internal Credit System
- **QR Payment:** PromptPay API

### Infrastructure:
- **Hosting:** Vercel (Frontend) + Supabase (Backend)
- **CDN:** Cloudflare
- **Monitoring:** Sentry / LogRocket
- **Analytics:** Google Analytics / Mixpanel

### Mobile (Phase 4):
- **React Native** / **Flutter**
- Share codebase กับ Web ได้มาก

---

## 🎨 Design Philosophy

### ธีม:
- **สี:** น้ำเงิน-ม่วง + ดำนีออน (Cyberpunk Gaming)
- **Mood:** Electric / Neon / Motion / Friendly
- **บุคลิก:** สนุก, ทันสมัย, เกมเมอร์จริง แต่ไม่ toxic

### UX Principles:
- **ง่าย:** หาตี้ได้ใน 3 คลิก
- **ชัดเจน:** รู้ว่าทำอะไรได้ ทำอะไรไม่ได้
- **ปลอดภัย:** Escrow + Rep ทำให้รู้สึกปลอดภัย
- **สนุก:** Animation, Badge, Achievement
- **รวดเร็ว:** โหลดเร็ว, Real-time update

---

---

## 🎤 Voice Chat Strategy

### Phase 1 (MVP): Discord Integration
**ระยะเวลา:** ตอนนี้ - 6 เดือนแรก

**Implementation:**
```typescript
// Party Type
interface Party {
  // ... existing fields
  voiceChat?: {
    type: 'discord';
    link: string;
  };
}

// CreatePartyModal
- เพิ่ม checkbox "ต้องการ Voice Chat"
- ถ้าเลือก → แสดง input Discord Link
- Validate Discord URL format

// LobbyCard
- แสดง Badge 🎤 "Voice Available"
- แสดง requirement "Mic Required/Optional"

// PartyRoom
- แสดง Discord Voice Section ด้านบน
- ปุ่ม "เข้า Discord Voice" (เปิด Tab ใหม่)
- ปุ่ม "คัดลอกลิงก์"
```

**ข้อดี:**
- ✅ ฟรี ไม่มีค่าใช้จ่าย
- ✅ พัฒนาเร็ว (1-2 วัน)
- ✅ คุณภาพเสียงดี (Discord infrastracture)
- ✅ คนคุ้นเคย มี Discord อยู่แล้ว
- ✅ Support Mobile (Discord App)
- ✅ ไม่ต้อง Maintenance

---

### Phase 2 (Future): Discord Bot Integration
**ระยะเวลา:** เมื่อมี 10,000+ DAU

**Features:**
- สร้าง Discord Server อัตโนมัติ
- สร้าง Voice Channel สำหรับแต่ละห้อง
- Invite User เข้า Channel อัตโนมัติ
- Sync สถานะ User (เข้า/ออก)
- Mute/Kick ได้จาก Platform

---

### Phase 3 (Optional): Built-in Voice
**ระยะเวลา:** เมื่อมี 50,000+ DAU + Budget

**Technology:** Agora.io / Twilio Voice
**ค่าใช้จ่าย:** ~฿0.99 ต่อ 1,000 นาที

**เมื่อไหร่ควรพิจารณา:**
- มี Budget สำหรับ Voice Server
- User Survey แสดงว่าต้องการ Built-in Voice
- มี Team ดูแล Infrastructure
- Discord Integration ไม่เพียงพอ

**ข้อควรระวัง:**
- Discord ฟรีและดีอยู่แล้ว
- คนคุ้นเคยกับ Discord
- ROI อาจไม่คุ้ม

---

## ✅ Next Steps

### Immediate (วันนี้):
1. ✅ บันทึก System Design นี้
2. ✅ กำหนด Voice Chat Strategy (Discord Integration)
3. Implement Spectator Mode
4. ปรับ PartyRoom UI ให้รองรับ Spectator
5. เพิ่ม Discord Link ใน CreatePartyModal

### This Week:
1. ปรับ Types + Mock Data ให้รองรับระบบใหม่
2. เพิ่ม `voiceChat` field ใน Party Type
3. ทำ UI/UX สำหรับ "ขอเข้าเล่น" และ "ดูอย่างเดียว"
4. เพิ่ม Discord Voice Section ใน PartyRoom
5. เพิ่ม Leader อนุมัติคน
6. ทดสอบ User Flow ทั้งหมด

### This Month:
1. เปิด Soft Launch กับกลุ่มเพื่อน (50-100 คน)
2. รวบรวม Feedback
3. ปรับปรุง UX ตาม Feedback
4. Monitor Discord Link usage
5. เตรียม Phase 2 (Marketplace)

---

**Last Updated:** November 16, 2025
**Version:** 1.1
**Status:** Ready for Implementation
**Voice Chat:** Discord Integration (Phase 1)
