#!/usr/bin/env python3
"""Test all query templates with real database."""

import sqlite3
import sys
sys.path.insert(0, "/Users/arm/Resume_CV_F/ai-it-assistant")

DB_PATH = "/Users/arm/Resume_CV_F/ai-it-assistant/it_master.db"

conn = sqlite3.connect(DB_PATH)

print("=" * 60)
print("TEST 1: ใครใช้ Notebook Dell บ้าง?")
sql = "SELECT Asset_ID, Brand, Model, Assigned_To, Department FROM IT_Asset_Register WHERE Brand LIKE '%Dell%' AND Asset_Type = 'Notebook' LIMIT 5"
rows = conn.execute(sql).fetchall()
print(f"Found {len(rows)} records:")
for r in rows:
    print(f"  {r[0]} | {r[1]} {r[2]} -> {r[3]} ({r[4]})")

print()
print("=" * 60)
print("TEST 2: Tickets ที่ยังไม่ปิด")
sql = "SELECT Ticket_ID, Requester, Department, Issue_Type, Priority, Status, Assigned_IT FROM IT_Ticket_Log WHERE Status != 'Resolved'"
rows = conn.execute(sql).fetchall()
print(f"Found {len(rows)} open tickets:")
for i, r in enumerate(rows[:5], 1):
    print(f"  {i}. {r[0]} | {r[1]} | {r[2]} | {r[3]} | {r[4]} | {r[5]} | {r[6]}")
if len(rows) > 5:
    print(f"  ... and {len(rows)-5} more")

print()
print("=" * 60)
print("TEST 3: License ทั้งหมด")
sql = "SELECT Software_Name, Used_Quantity, Quantity, Expire_Date, Status FROM License_Register WHERE Status = 'Active' ORDER BY Expire_Date ASC"
rows = conn.execute(sql).fetchall()
print(f"Found {len(rows)} licenses:")
for r in rows:
    print(f"  {r[0]:35s} | {r[1]}/{r[2]} used | Exp: {r[3]}")

print()
print("=" * 60)
print("TEST 4: IT Team")
sql = "SELECT Full_Name, Position, Responsibility_Area, Employment_Status FROM IT_Team"
rows = conn.execute(sql).fetchall()
print(f"Found {len(rows)} members:")
for r in rows:
    print(f"  {r[0]} | {r[1]} | {r[2]} | {r[3]}")

print()
print("=" * 60)
print("TEST 5: Vendors")
sql = "SELECT Vendor_Name, Service_Type, Phone, Email FROM Vendor_Contract_Register WHERE Status = 'Active'"
rows = conn.execute(sql).fetchall()
print(f"Found {len(rows)} vendors:")
for r in rows[:5]:
    print(f"  {r[0]} | {r[1]} | {r[2]}")

print()
print("=" * 60)
print("TEST 6: Asset type distribution")
sql = "SELECT Asset_Type, COUNT(*) as cnt FROM IT_Asset_Register GROUP BY Asset_Type"
rows = conn.execute(sql).fetchall()
print(f"Asset types: {dict(rows)}")

print()
print("=" * 60)
print("TEST 7: พนักงานที่ชื่อขึ้นต้นด้วย รุ่ง")
sql = "SELECT Full_Name, Department, Job_Title, Corporate_Email FROM Employee_Account_Register WHERE Full_Name LIKE '%รุ่ง%'"
rows = conn.execute(sql).fetchall()
print(f"Found {len(rows)} employees:")
for r in rows:
    print(f"  {r[0]} | {r[1]} | {r[2]} | {r[3]}")

print()
print("=" * 60)
print("TEST 8: Database stats")
tables = conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
total = sum(conn.execute(f'SELECT COUNT(*) FROM "{t[0]}"').fetchone()[0] for t in tables)
print(f"Tables: {len(tables)}")
print(f"Total rows: {total}")
print(f"DB size: {__import__('os').path.getsize(DB_PATH)/1024:.0f} KB")

conn.close()
print()
print("ALL TESTS PASSED!")