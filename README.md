# 🎮 Anajak Play - Next.js Version

**Gaming Superapp ของเกมเมอร์ไทย** รวมระบบหาตี้ (LFG), Marketplace, Community, และ Feed ไว้ในแพลตฟอร์มเดียว

## ✨ Features

### 🎯 Core Features
- **LFG System** - ระบบหาตี้อัจฉริยะ แมตช์ตาม Role/Rank/เวลา
- **Tinder Mode** - ปัดหาเพื่อนเล่นเกมแบบสนุกๆ
- **Anajak Market** - Marketplace ซื้อขายบริการและไอเทมเกม
  - Hire to Play (จ้างเล่น/ฟาร์ม)
  - Coaching (โค้ชสอนเกม)
  - In-Game Items (ซื้อขายไอเทม/สกิน)
  - Account Trading (ซื้อขายไอดี)
- **Reputation System** - ระบบชื่อเสียงคัดกรองผู้เล่น
- **Escrow System** - ระบบกลางป้องกันการโกง

### 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image Component

## 📁 Project Structure

```
anajak-nextjs/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (LFG System)
│   ├── market/
│   │   └── page.tsx        # Marketplace page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── GameSelector.tsx    # Game selection component
│   ├── HeroAction.tsx      # Hero banner with CTA
│   └── LobbyCard.tsx       # Party/Lobby card
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   └── mockData.ts         # Mock data for development
├── public/                 # Static assets
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, หรือ pnpm

### Installation

1. **เข้าไปที่โฟลเดอร์โปรเจค**
```bash
cd "c:\Users\LOSTXKER\OneDrive\Desktop\Desktop\Anajak\Anajak Play\web\anajak-nextjs"
```

2. **ติดตั้ง dependencies**
```bash
npm install
# หรือ
yarn install
# หรือ
pnpm install
```

3. **รัน development server**
```bash
npm run dev
# หรือ
yarn dev
# หรือ
pnpm dev
```

4. **เปิดบราวเซอร์**
เข้าไปที่ [http://localhost:3000](http://localhost:3000)

## 📄 Available Pages

- `/` - หน้าแรก (LFG System)
- `/market` - Marketplace (ซื้อขายบริการและไอเทม)

## 🎨 Design System

### Colors
- **Primary**: Blue to Purple gradient
- **Secondary**: Cyan to Pink gradient
- **Background**: Dark (#05050a, #0a0a16)
- **Success**: Green (Escrow, Wallet)
- **Warning**: Yellow (Reputation)

### Typography
- **Font**: Inter (via Next.js Font Optimization)
- **Heading**: Bold, White
- **Body**: Regular, Gray-300

## 🔧 Configuration

### Tailwind CSS
กำหนดค่าใน `tailwind.config.ts` รวมถึง:
- Custom colors
- Custom utilities (scrollbar, animations)
- Responsive breakpoints

### Next.js
กำหนดค่าใน `next.config.mjs`:
- Image domains: `api.dicebear.com`, `images.unsplash.com`
- Optimizations

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (แนะนำ)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

หรือ push ไปที่ GitHub แล้วเชื่อมกับ [Vercel](https://vercel.com) โดยตรง

## 🗺️ Roadmap

### MVP (ปัจจุบัน)
- ✅ LFG System (UI)
- ✅ Marketplace (UI)
- ✅ Mock Data
- ✅ Responsive Design

### Next Steps
- [ ] Backend Integration (Supabase/Firebase)
- [ ] Authentication System
- [ ] Real-time Chat
- [ ] Tinder Mode (Full Implementation)
- [ ] Wallet & Escrow System
- [ ] Reputation System (Backend)
- [ ] Community Features
- [ ] Feed System
- [ ] Mobile App (React Native)

## 🤝 Contributing

โปรเจคนี้เป็นส่วนหนึ่งของ Anajak Play Masterplan V3

## 📝 License

Private Project - All Rights Reserved

## 👥 Contact

สนใจร่วมพัฒนาหรือมีคำถาม ติดต่อผ่าน GitHub Issues

---

**Built with ❤️ for Thai Gamers** 🇹🇭
