# 🤖 IT Master AI Query Assistant

ระบบผู้ช่วย IT Manager บริษัท Landy Home (150 คน)  
ใช้ **DeepSeek V4 Pro** via Cline API + SQLite — ตอบภาษาไทย ถามอะไรก็ได้

## 📦 โครงสร้างไฟล์

```
ai-it-assistant/
├── deepseek_assistant.py   # 🤖 AI หลัก — DeepSeek V4 Pro (Cline API)
├── uat_50_tests.py         # 🧪 UAT 50 คำถาม
├── test_queries.py         # ทดสอบ query พื้นฐาน 8 tests
├── excel_to_sqlite.py      # แปลง Excel → SQLite
├── it_master.db            # ฐานข้อมูล SQLite (328 KB, 1,291 rows)
├── .env                    # 🔒 API Key (ห้าม commit!)
└── README.md
```

## 🚀 วิธีใช้งาน

```bash
conda activate /opt/homebrew/Caskroom/miniconda/base/envs/it-ai
cd /Users/arm/Resume_CV_F/ai-it-assistant

# Interactive ถาม-ตอบ
python deepseek_assistant.py

# UAT 50 คำถาม
python uat_50_tests.py
```

## 📊 ข้อมูลในระบบ

| หมวดหมู่ | จำนวน |
|----------|-------|
| Tables | 18 |
| Total Records | 1,291 |
| Employees | 150 |
| IT Assets | 149 |
| IT Tickets | 80 (19 open) |
| License | 10 |
| Vendors | 12 |

## 💡 ตัวอย่างคำถาม

| คำถาม | ผลลัพธ์ |
|--------|---------|
| Notebook ยี่ห้ออะไรในบริษัท? | Dell, HP, Lenovo |
| แผนกไหนใช้ Dell เยอะสุด? | Engineering & Construction (12) |
| ใครมี ticket เยอะสุด? | วิเคราะห์จาก IT_Ticket_Log |
| License ไหนหมดอายุเร็วสุด? | Adobe CC |
| งบ IT ทั้งปีเท่าไหร่? | ~2,024,112 บาท |

## 🔧 Tech Stack

- **Python 3.11** + Conda
- **DeepSeek V4 Pro** via Cline API (OpenAI-compatible)
- **SQLite** (built-in)
- **Pandas + OpenPyXL** (Excel processing)

## 📝 อัปเดตข้อมูล

```bash
python excel_to_sqlite.py
```

## 🔒 ความปลอดภัย

- `.env` อยู่ใน `.gitignore` — ห้าม commit
- Revoke API Key ที่ https://app.cline.bot/dashboard

---

Made on MacBook Air M1 | June 2026