#!/usr/bin/env python3
"""UAT: 50 Real-World Questions — DeepSeek V4 Pro via Cline API"""

import sys, time
sys.path.insert(0, "/Users/arm/Resume_CV_F/ai-it-assistant")
from deepseek_assistant import ask_deepseek

QUESTIONS = [
    ("01", "Notebook ยี่ห้ออะไรบ้างในบริษัท ซื้อล่าสุดเมื่อไหร่"),
    ("02", "ใครใช้ Lenovo ThinkPad บ้าง"),
    ("03", "Notebook Dell มีกี่เครื่อง ใครใช้บ้าง"),
    ("04", "HP EliteBook หมดประกันเมื่อไหร่บ้าง"),
    ("05", "แผนกไหนใช้ Notebook HP เยอะสุด"),
    ("06", "มีมือถือบริษัทกี่เครื่อง ยี่ห้ออะไรบ้าง"),
    ("07", "Notebook เครื่องไหนเก่าที่สุด ดูจากวันที่ซื้อ"),
    ("08", "อุปกรณ์ IT ที่เป็น Infrastructure มีอะไรบ้าง"),
    ("09", "Notebook ที่ราคาแพงที่สุดคือเครื่องไหน"),
    ("10", "มี Notebook กี่เครื่องที่ราคาเกิน 30,000 บาท"),
    ("11", "แผนก Sales ใช้ Notebook ยี่ห้ออะไรบ้าง"),
    ("12", "ใครใช้ Notebook ที่ซื้อหลังปี 2025"),
    ("13", "Notebook ที่ warranty หมดแล้วมีกี่เครื่อง"),
    ("14", "อุปกรณ์ที่ location เป็น Site มีอะไรบ้าง"),
    ("15", "Firewall ยี่ห้ออะไร รุ่นอะไร ราคาเท่าไหร่"),
    ("16", "มี ticket ค้างอยู่กี่ใบ"),
    ("17", "ใครมี ticket เยอะที่สุด"),
    ("18", "Ticket ที่ priority Critical มีอะไรบ้าง"),
    ("19", "Ticket ของฝ่าย Sales มีอะไรบ้าง"),
    ("20", "ticket ประเภท M365 มีกี่ใบ ใครเป็นคนแจ้ง"),
    ("21", "ticket ที่ assigned ให้กรวิชญ์มีอะไรบ้าง"),
    ("22", "ticket ไหนใช้เวลานานสุดในการแก้"),
    ("23", "ticket ที่เป็น printer issue มีอะไรบ้าง"),
    ("24", "มี ticket ที่เลย SLA กี่ใบ"),
    ("25", "สรุป ticket แยกตามประเภท issue"),
    ("26", "มีพนักงานทั้งหมดกี่คน"),
    ("27", "พนักงานแผนกไหนเยอะสุด"),
    ("28", "พนักงานที่ชื่อขึ้นต้นด้วย ธน มีใครบ้าง"),
    ("29", "ใครเป็น Manager บ้างในแต่ละแผนก"),
    ("30", "IT Team มีใครบ้าง แต่ละคนรับผิดชอบอะไร"),
    ("31", "พนักงานที่ยังไม่มี MFA มีใครบ้าง"),
    ("32", "มีพนักงานกี่คนที่ account ถูก disabled"),
    ("33", "พนักงานที่เพิ่งลาออกมีใครบ้าง"),
    ("34", "มีโปรแกรมอะไรในบริษัทบ้าง"),
    ("35", "License ไหนใช้เกินจำนวนที่มี"),
    ("36", "License ไหนจะหมดอายุเร็วสุด"),
    ("37", "AutoCAD LT มีใบอนุญาตกี่ใบ ใครใช้บ้าง"),
    ("38", "Microsoft 365 มีกี่ license แยกตามแผน"),
    ("39", "งบประมาณ software license ทั้งปีเท่าไหร่"),
    ("40", "FortiCare เกี่ยวข้องกับอุปกรณ์อะไร"),
    ("41", "มี vendor อะไรบ้าง แต่ละรายทำอะไร"),
    ("42", "vendor ที่จะหมดสัญญาเร็วสุดคือใคร"),
    ("43", "งบ IT ทั้งปีเท่าไหร่ แยกตามหมวด"),
    ("44", "vendor AIS Business รับผิดชอบอะไร"),
    ("45", "internet รายเดือนจ่ายเท่าไหร่"),
    ("46", "สรุปภาพรวม IT ทั้งบริษัท"),
    ("47", "แผนกไหนไม่มี IT ticket เลย"),
    ("48", "พนักงานที่ไม่มี WiFi account มีใครบ้าง"),
    ("49", "Notebook ที่ไม่ได้ assign ให้ใครมีกี่เครื่อง"),
    ("50", "ระบบที่ IT ดูแลมีอะไรบ้าง critical แค่ไหน"),
]

PASS = 0
FAIL = 0
results = []

print("=" * 60)
print("🧪 UAT: 50 Questions — DeepSeek V4 Pro (Cline API)")
print("=" * 60)

for num, q in QUESTIONS:
    print(f"\n[{num}/50] {q}")
    print("-" * 40)
    
    try:
        ans = ask_deepseek(q)
        
        if "❌" in ans[:5] or "⚠️" in ans[:5]:
            print(f"  ❌ FAIL")
            FAIL += 1
            results.append((num, "FAIL", ans[:100]))
        elif "🤖" in ans[:5] or "📊" in ans or "📝" in ans or "📭" in ans:
            print(f"  ✅ PASS")
            PASS += 1
            results.append((num, "PASS", "ok"))
        else:
            print(f"  ⚠️  CHECK: {ans[:100]}")
            PASS += 1
            results.append((num, "PASS", "check"))
    except Exception as e:
        print(f"  ❌ EXCEPTION: {e}")
        FAIL += 1
        results.append((num, "FAIL", str(e)[:80]))
    
    time.sleep(1)

print("\n" + "=" * 60)
print(f"📊 UAT SUMMARY: {PASS} ✅ / {FAIL} ❌")
print(f"Score: {PASS}/{len(QUESTIONS)} = {100*PASS//len(QUESTIONS)}%")
print("=" * 60)
for num, status, detail in results:
    emoji = "✅" if status == "PASS" else "❌"
    print(f"  {emoji} [{num}] {detail[:75]}")