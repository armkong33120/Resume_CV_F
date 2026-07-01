#!/usr/bin/env python3
"""
IT Master AI Query Assistant (DeepSeek V4 Pro via Cline API)
ใช้ OpenAI-compatible API → Text-to-SQL → SQLite → ตอบภาษาไทย
เร็ว แม่น ไม่มี rate limit ปัญหา
"""

import sqlite3
import os
import datetime
import sys
from dotenv import load_dotenv

load_dotenv("/Users/arm/Resume_CV_F/ai-it-assistant/.env")

DB_PATH = "/Users/arm/Resume_CV_F/ai-it-assistant/it_master.db"

# ──────────────────────────
# Database helpers
# ──────────────────────────

def get_db_schema() -> str:
    """Extract compact schema from SQLite."""
    conn = sqlite3.connect(DB_PATH)
    tables = conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
    schema_text = []
    for t in tables:
        tn = t[0]
        cols = conn.execute(f'PRAGMA table_info("{tn}")').fetchall()
        count = conn.execute(f'SELECT COUNT(*) FROM "{tn}"').fetchone()[0]
        col_names = [c[1] for c in cols]
        schema_text.append(f"{tn} ({count} แถว): {', '.join(col_names)}")
    conn.close()
    return "\n".join(schema_text)


def execute_query(sql: str):
    """Execute SQL on SQLite."""
    conn = sqlite3.connect(DB_PATH)
    try:
        cursor = conn.execute(sql)
        columns = [d[0] for d in cursor.description]
        rows = cursor.fetchall()
        conn.close()
        return columns, rows
    except Exception as e:
        conn.close()
        return [], str(e)


def excel_date_to_thai(serial) -> str:
    """Excel serial → Thai date."""
    try:
        serial = int(float(str(serial)))
    except (ValueError, TypeError):
        return str(serial)
    base = datetime.datetime(1899, 12, 30)
    dt = base + datetime.timedelta(days=serial)
    months = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
              "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]
    return f"{dt.day} {months[dt.month-1]} {dt.year + 543}"


def format_result(columns, rows) -> str:
    """Format query result into Thai text."""
    if isinstance(rows, str):
        return f"❌ SQL Error: {rows}"
    if not rows:
        return "📭 ไม่พบข้อมูล"
    result = f"📊 พบ {len(rows)} รายการ:\n\n"
    for i, row in enumerate(rows[:20], 1):
        result += f"{'─'*50}\n#{i}\n"
        for col, val in zip(columns, row):
            if val is None or str(val).strip() == "":
                continue
            col_lower = col.lower()
            if any(d in col_lower for d in ["date","วันที่","expire","warranty","purchase","renewal"]):
                val_str = excel_date_to_thai(val)
            else:
                val_str = str(val)
            result += f"  {col}: {val_str}\n"
    if len(rows) > 20:
        result += f"\n... และอีก {len(rows) - 20} รายการ\n"
    return result


# ──────────────────────────
# DeepSeek via Cline API
# ──────────────────────────

def ask_deepseek(question: str) -> str:
    """Send schema + question → DeepSeek V4 Pro → SQL → Execute → Answer."""
    
    import json, re

    import openai
    
    client = openai.OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL"),
    )

    # Include views in schema
    conn = sqlite3.connect(DB_PATH)
    views = conn.execute("SELECT name, sql FROM sqlite_master WHERE type='view'").fetchall()
    view_info = "\n".join([f"VIEW {v[0]} = {v[1]}" for v in views])
    schema = get_db_schema()
    conn.close()

    prompt = f"""คุณคือ AI ผู้ช่วย IT Manager เขียน SQL สำหรับ SQLite

VIEWS (ใช้ SELECT * FROM view_name):
{view_info}

TABLES:
{schema}

คำถาม: {question}

ตอบ JSON เท่านั้น: {{"sql":"...", "answer":"สรุปสั้น"}}
กฎ: SQLite syntax, ใช้ VIEW เมื่อมี, ตอบ JSON เท่านั้นไม่มีคำอื่น"""

    response = client.chat.completions.create(
        model="deepseek/deepseek-v4-pro",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.0,
        max_tokens=2048,
    )

    # Cline API wraps response in .data (dict)
    data = response.data if hasattr(response, 'data') else None
    if data is None:
        choices = response.choices if hasattr(response, 'choices') else None
    elif isinstance(data, dict):
        choices = data.get('choices', [])
    else:
        choices = getattr(data, 'choices', None)
    
    if not choices:
        raw = response.model_dump() if hasattr(response, 'model_dump') else str(response)
        return f"❌ No choices in response:\n{str(raw)[:500]}"
    
    msg = choices[0].get('message') if isinstance(choices[0], dict) else getattr(choices[0], 'message', None)
    if msg is None:
        return f"❌ No message: {choices[0]}"
    
    text = msg.get('content') if isinstance(msg, dict) else getattr(msg, 'content', None)
    
    if text is None:
        return f"❌ No content: msg={msg}"
    
    text = text.strip()
    
    # Clean markdown
    text = re.sub(r'^```(?:json)?\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    
    # Parse JSON
    try:
        data = json.loads(text)
    except json.JSONDecodeError:
        m = re.search(r'\{.*\}', text, re.DOTALL)
        if m:
            try:
                data = json.loads(m.group(0))
            except json.JSONDecodeError:
                return f"⚠️ JSON parse failed:\n{text[:300]}"
        else:
            return f"⚠️ JSON parse failed:\n{text[:300]}"
    
    sql = data.get("sql", "")
    answer = data.get("answer", "")
    
    result = "🤖 **DeepSeek V4 Pro Assistant**\n\n"
    result += f"💬 {question}\n\n"
    
    if sql:
        result += f"🔍 SQL: {sql}\n\n"
        columns, rows = execute_query(sql)
        result += format_result(columns, rows)
        result += f"\n\n📝 **สรุป:** {answer}\n"
    else:
        result += f"📝 {answer}\n"
    
    return result


# ──────────────────────────
# Interactive Mode
# ──────────────────────────

def main():
    print("""
╔══════════════════════════════════════════════╗
║   🤖 IT Assistant — DeepSeek V4 Pro          ║
║   Cline API • SQLite • ถามอะไรก็ได้          ║
╚══════════════════════════════════════════════╝

พิมพ์คำถาม หรือ 'exit' เพื่อออก
""")
    
    while True:
        try:
            q = input("\n💬 คำถาม: ").strip()
            if q.lower() in ["exit","quit","q","ออก"]:
                print("👋 ลาก่อน!")
                break
            if not q:
                continue
            
            print("\n🤔 กำลังคิด...")
            ans = ask_deepseek(q)
            print(f"\n{ans}")
        except KeyboardInterrupt:
            print("\n👋 ลาก่อน!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")


if __name__ == "__main__":
    main()