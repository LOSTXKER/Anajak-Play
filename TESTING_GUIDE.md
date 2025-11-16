# 🧪 Testing Guide - Anajak Play Party System

## ✅ ระบบที่พร้อมใช้งานแล้ว (Implemented & Working)

### 1. **PartyContext (Global State Management)**
ระบบจัดการสถานะปาร์ตี้แบบ Real-time

**Methods ที่ใช้งานได้:**
- ✅ `joinParty(party)` - เข้าห้องเป็น Spectator
- ✅ `leaveParty()` - ออกจากห้อง
- ✅ `requestToJoinGame(role)` - ขอเข้าเล่นในตำแหน่ง
- ✅ `approvePlayer(spectatorId)` - Leader อนุมัติให้เข้าเล่น
- ✅ `kickPlayer(role)` - Leader kick ผู้เล่นออก
- ✅ `toggleReady()` - กด Ready/Unready
- ✅ `updateParty(party)` - อัปเดตข้อมูลห้อง

**States:**
- `activeParty` - ปาร์ตี้ที่เข้าอยู่
- `isSpectator` - เช็คว่าเป็น Spectator หรือไม่
- `myRole` - ตำแหน่งที่เราเล่น

---

## 🎮 User Flow Testing Scenarios

### Scenario 1: Quick Join (เข้าเล่นแบบเร็ว)

**ขั้นตอน:**
1. ไปที่หน้าแรก (Homepage)
2. เลือกปาร์ตี้ที่ต้องการ
3. กดปุ่ม **"เข้าร่วมเล่น ▼"** dropdown
4. เลือกตำแหน่งที่ต้องการ (หรือเลือก "Any")
5. ระบบจะพาไปหน้า PartyRoom
6. คุณจะเห็นตัวเองใน **Spectators Section** พร้อมสถานะ **"รอเข้าเล่น (ตำแหน่ง)"**

**ผลลัพธ์ที่คาดหวัง:**
- ✅ เข้าห้องสำเร็จ
- ✅ ปรากฏในรายชื่อ Spectators
- ✅ มี Badge สีเหลือง "รอเข้าเล่น (Tank)"
- ✅ Leader เห็นปุ่ม **"อนุมัติ"** ข้างชื่อคุณ

---

### Scenario 2: Spectator Mode (เข้าดูก่อน แล้วค่อยขอเล่น)

**ขั้นตอน:**
1. ที่หน้าแรก กดปุ่ม **"เข้าดูห้อง"** (ไอคอนตา 👁️)
2. ระบบพาเข้าห้อง PartyRoom
3. คุณจะเห็นข้อความ **"คุณกำลังดูห้อง"** ที่ด้านล่าง
4. มีปุ่ม **"ขอเป็น Tank"**, **"ขอเป็น Mid"** ฯลฯ ให้เลือก
5. กดปุ่มตำแหน่งที่ต้องการ
6. ระบบจะเพิ่มคุณเข้า Spectators พร้อมสถานะ **"waiting-to-play"**

**ผลลัพธ์ที่คาดหวัง:**
- ✅ เข้าห้องเป็น Spectator ก่อน
- ✅ ปุ่มขอเข้าเล่นแสดงเฉพาะตำแหน่งที่ว่าง
- ✅ หลังกดปุ่ม → สถานะเปลี่ยนเป็น "รอเข้าเล่น"
- ✅ Leader เห็นปุ่มอนุมัติ

---

### Scenario 3: Leader Approve (หัวหน้าทีมอนุมัติ)

**ขั้นตอน (เล่นเป็น Leader):**
1. สร้างปาร์ตี้ใหม่ หรือเป็น Leader ของห้อง
2. รอให้มี Spectator ขอเข้าเล่น
3. ใน **Spectators Section** จะมีคนที่รอเข้าเล่น
4. กดปุ่ม **"อนุมัติ"** ข้างชื่อ Spectator
5. ระบบจะย้ายคนนั้นจาก Spectators ไปยัง Slot ที่ว่าง

**ผลลัพธ์ที่คาดหวัง:**
- ✅ Spectator หายจากรายการ
- ✅ ผู้เล่นปรากฏใน Slot พร้อม Avatar
- ✅ Slot status เปลี่ยนเป็น "filled"
- ✅ Counter "สมาชิกทีม (2/5)" เพิ่มขึ้น
- ✅ ถ้าเป็นตัวเอง → จะเห็นปุ่ม "กดเพื่อพร้อม"

---

### Scenario 4: Ready System (กด Ready)

**ขั้นตอน:**
1. เข้าปาร์ตี้ในฐานะ **ผู้เล่น** (ไม่ใช่ Spectator)
2. ที่ด้านล่างห้อง จะเห็นปุ่ม **"กดเพื่อพร้อม"**
3. กดปุ่ม
4. ปุ่มเปลี่ยนเป็น **"พร้อม!"** (สีเขียว)
5. Badge ใน Slot คุณจะเปลี่ยนเป็น **"พร้อม"** (สีเขียว)
6. กดอีกครั้งเพื่อ Unready

**ผลลัพธ์ที่คาดหวัง:**
- ✅ Toggle ระหว่าง Ready/Unready ได้
- ✅ Badge เปลี่ยนสี: เทา → เขียว
- ✅ ถ้าเป็น Leader + Ready → ปุ่มแสดงว่า **"เริ่มเกม"**

---

### Scenario 5: Kick Player (Leader kick คน)

**ขั้นตอน (เล่นเป็น Leader):**
1. มีคนเล่นอยู่ใน Slot (ไม่ใช่ตัวเอง)
2. ที่มุมขวาบนของ Slot จะมีปุ่ม **X** สีเทา
3. Hover ปุ่ม → เปลี่ยนเป็นสีแดง
4. กดปุ่ม X
5. ระบบจะ Kick ผู้เล่นออก

**ผลลัพธ์ที่คาดหวัง:**
- ✅ Slot เปลี่ยนกลับเป็น "open"
- ✅ Avatar หายไป → เหลือไอคอน Plus
- ✅ Counter "สมาชิกทีม" ลดลง
- ✅ ถ้า Kick ตัวเอง → กลับเป็น Spectator

---

## 🧩 Component Integration

### หน้าแรก (Homepage)
- LobbyCard แสดงรายการปาร์ตี้
- 2 ปุ่ม: "เข้าดูห้อง" + "เข้าร่วมเล่น ▼"
- Quick Join dropdown แสดงตำแหน่งที่ว่าง

### หน้าห้อง (PartyRoom)
- แสดง Slots + Spectators
- Leader เห็นปุ่ม "อนุมัติ" + "Kick"
- Spectator เห็นปุ่ม "ขอเป็น (ตำแหน่ง)"
- Player เห็นปุ่ม "กดเพื่อพร้อม"

---

## 🎯 Current Limitations (ข้อจำกัดในเวอร์ชันนี้)

1. **Mock Data Only** - ยังไม่มี Backend จริง ข้อมูลอยู่ใน Context เท่านั้น
2. **No Persistence** - Refresh หน้า → State หาย
3. **No Real-time Sync** - คนอื่นไม่เห็นการเปลี่ยนแปลง (ต้อง implement WebSocket ภาคหน้า)
4. **Single User Simulation** - ตอนนี้จำลองเป็น "Meelike God" คนเดียว
5. **No Error Handling** - ถ้า Slot เต็ม/หายไป ระบบจะไม่มี Validation

---

## 🚀 Next Steps (ขั้นตอนต่อไป)

### Phase 1: Testing & Polish
- [ ] ทดสอบทุก Flow แบบ Manual
- [ ] เพิ่ม Error Messages + Loading States
- [ ] เพิ่ม Toast Notifications

### Phase 2: Backend Integration
- [ ] เชื่อม Firebase/Supabase
- [ ] Implement Real-time Database
- [ ] เพิ่ม Authentication

### Phase 3: Multi-user Support
- [ ] WebSocket/Pusher สำหรับ Real-time sync
- [ ] User Profiles จริง
- [ ] Leadership Transfer Logic

### Phase 4: Advanced Features
- [ ] Voice Chat Integration (Discord/Agora)
- [ ] Matchmaking Algorithm
- [ ] Reputation System

---

## 🐛 Known Issues & Bugs

1. **Refresh หน้า** → activeParty หาย (ต้อง implement localStorage)
2. **Multiple Requests** → ถ้ากดหลายรอบเร็ว อาจมี duplicate spectators
3. **Slot Conflict** → ถ้าหลายคนขอ Slot เดียวกัน ไม่มี priority logic
4. **Leader Leaves** → ยังไม่มีการโอน Leadership

---

## 📝 Code Structure

```
lib/
  PartyContext.tsx ← Global State Management (ใจกลางระบบ)
  types.ts ← TypeScript Definitions
  mockData.ts ← Sample Data

components/
  PartyRoom.tsx ← Main UI + Event Handlers
  LobbyCard.tsx ← Party Listing Card
  CreatePartyModal.tsx ← Create Party Form

app/
  page.tsx ← Homepage (LFG List)
  party/page.tsx ← Party Room Page
```

---

## 💡 Testing Tips

1. **เปิด Browser Console** → เช็ค State ใน React DevTools
2. **ลอง Refresh** → ดูว่า State หายหรือไม่
3. **ลองกด Quick** → ทดสอบว่า Logic ทำงานถูกต้อง
4. **คลิกหลายที** → ดู Edge Cases
5. **เปลี่ยน Mock Data** → ลองเพิ่ม/ลด Slots

---

**สถานะปัจจุบัน:** ✅ **MVP Complete** - ระบบใช้งานได้แบบ Mock Data  
**อัปเดตล่าสุด:** ระบบ Logic ครบแล้ว รอทดสอบ + ปรับแต่ง UX

---

Happy Testing! 🎮✨
