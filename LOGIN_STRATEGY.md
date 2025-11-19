# ANAJAK PLAY – LOGIN & ACCESS STRATEGY (Guest View Model)

แผนงานนี้กำหนดให้ใช้ระบบ **"Guest View / Lazy Registration"** คือเปิดให้ผู้ใช้ทั่วไปสามารถเข้าถึงและเห็นเนื้อหาภายในแพลตฟอร์มได้โดยไม่ต้องล็อกอิน เพื่อสร้าง First Impression ที่ดีและแสดงความ Active ของระบบ แต่จะจำกัดการกระทำ (Action) ที่สำคัญไว้สำหรับสมาชิกเท่านั้น

---

## 1. หลักการสำคัญ (Core Principles)
1.  **Show, Don't Tell:** ให้ผู้ใช้เห็นห้องปาร์ตี้จริง, สินค้าจริง และความเคลื่อนไหวจริง เพื่อดึงดูดให้อยากใช้งาน
2.  **Action-Gated, Not View-Gated:** ไม่ปิดกั้นการมองเห็น แต่ปิดกั้นการกระทำ (เช่น กด Join, กด Chat)
3.  **Seamless Conversion:** เปลี่ยน Guest เป็น Member ในจังหวะที่เขามีความต้องการสูงสุด (เช่น ตอนจะกดเข้าตี้)

---

## 2. ตารางสิทธิ์การใช้งาน (Access Permission Matrix)

| Feature Zone | 🟢 Guest (ยังไม่ล็อกอิน) | 🔵 Member (สมาชิก) |
| :--- | :--- | :--- |
| **LFG (Party Finder)** | • ดูรายการห้องทั้งหมด<br>• เห็นรายละเอียดห้อง (Rank, Mode)<br>• เห็นจำนวนคนในห้อง | **• กดเข้าร่วม (Join)**<br>**• สร้างห้อง (Create)**<br>• แชทในปาร์ตี้ |
| **Marketplace** | • ดูสินค้า/บริการทั้งหมด<br>• ค้นหาและกรองสินค้า<br>• ดูรายละเอียดผู้ขาย (เบื้องต้น) | **• กดสั่งซื้อ / จ้างงาน**<br>**• ทักแชทผู้ขาย**<br>• ลงขายสินค้า |
| **Community / Feed** | • อ่านโพสต์<br>• อ่านคอมเมนต์<br>• ดูรูปภาพ/สื่อ | **• กด Like / Share**<br>**• คอมเมนต์**<br>**• โพสต์เนื้อหาใหม่** |
| **Tinder Mode** | • เห็นการ์ดตัวอย่าง (Blur หรือเห็นแค่ 1-2 ใบ)<br>• ไม่สามารถปัดได้ | **• ใช้งานระบบปัดได้เต็มที่**<br>• ดูโปรไฟล์เต็ม |
| **Profile** | • ดูข้อมูลพื้นฐาน (ชื่อ, เกมที่เล่น, Rank)<br>• **ไม่เห็น**ข้อมูลเชิงลึก (Contact, Stats ลึกๆ) | • ดูข้อมูลเชิงลึก<br>• กด Add Friend<br>• ส่งข้อความ (DM) |

---

## 3. UX Flow & Trigger Points

### 3.1 หน้า Dashboard / Landing (Guest View)
- **สิ่งที่เห็น:** Navbar มีปุ่ม "เข้าสู่ระบบ / สมัครสมาชิก" ชัดเจนที่มุมขวา
- **Banner:** แสดงเนื้อหาเชิญชวน แต่ไม่บังคับล็อกอิน

### 3.2 จุดเปลี่ยน (Conversion Triggers)
เมื่อ Guest พยายามทำ Action ต้องมี **Auth Modal** เด้งขึ้นมา โดยมี Context ดังนี้:

1.  **กรณี LFG:**
    *   *Action:* กดปุ่ม "Join Party"
    *   *Message:* "เข้าสู่ระบบเพื่อร่วมทีมกับ [ชื่อหัวหน้าห้อง] และเริ่มเกมทันที!"
    *   *After Login:* Redirect กลับมาที่ห้องเดิม พร้อมเปิด Modal Join อัตโนมัติ (ถ้าทำได้) หรือกลับมาหน้าเดิม

2.  **กรณี Marketplace:**
    *   *Action:* กดปุ่ม "ซื้อสินค้า" หรือ "ทักแชท"
    *   *Message:* "เข้าสู่ระบบเพื่อความปลอดภัยในการซื้อขายผ่านคนกลาง (Escrow)"

3.  **กรณี Community:**
    *   *Action:* กดปุ่ม "Like" หรือคลิกช่อง "เขียนคอมเมนต์"
    *   *Message:* "เข้าสู่ระบบเพื่อร่วมพูดคุยกับเพื่อนๆ เกมเมอร์"

---

## 4. Technical Implementation (Next.js)

### 4.1 Route Structure
ไม่ต้องใช้ `middleware.ts` เพื่อ Block ทั้ง Route แต่ให้จัดการที่ระดับ Component หรือ Layout แทน

*   `/dashboard` → **Public** (Render ข้อมูลปกติ แต่ปุ่ม Action เช็ค Auth)
*   `/marketplace` → **Public**
*   `/messages` → **Protected** (Redirect ไป Login ทันทีถ้ายังไม่เข้า)
*   `/settings` → **Protected**
*   `/profile/me` → **Protected**

### 4.2 Component Logic
สร้าง Wrapper Component หรือ Hook `useAuthAction` เพื่อใช้กับปุ่มต่างๆ

```tsx
// ตัวอย่าง Concept Code
const handleJoinParty = () => {
  if (!user) {
    openAuthModal({ 
      title: "เข้าสู่ระบบเพื่อหาตี้", 
      redirectUrl: currentUrl 
    });
    return;
  }
  // Logic เข้าร่วมปาร์ตี้ปกติ
  joinParty(roomId);
};
```

### 4.3 Auth Modal (Global)
ควรมี Global Modal ที่สามารถเรียกใช้ได้จากทุกหน้า ไม่ต้อง Redirect ไปหน้า `/login` เต็มๆ เพื่อรักษา Context ของผู้ใช้ไว้ (ลดโอกาส User หลุด)

---

## 5. ข้อดีของแผนนี้
1.  **Live Presence:** ผู้ใช้ใหม่เห็นความคึกคักของระบบทันที (ตามแผน V5)
2.  **SEO Friendly:** Google Bot สามารถเข้ามาเก็บข้อมูลห้องปาร์ตี้และสินค้าได้ ทำให้ติด Search ง่ายขึ้น
3.  **Higher Trust:** ผู้ใช้เห็นว่ามี "ของจริง" ก่อนต้องแลกด้วยข้อมูลส่วนตัว
