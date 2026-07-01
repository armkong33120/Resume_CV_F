#!/usr/bin/env python3
"""
Build Knowledge Graph SQLite DB from Excel
- 18 tables with foreign keys
- Category definitions (network, endpoint, infrastructure, software)
- Pre-built VIEWs for common queries
- Relationship metadata table
"""

import pandas as pd
import sqlite3
import os
import re

EXCEL_PATH = "/Users/arm/Downloads/IT_Department_Master_Register_150ppl.xlsx"
DB_PATH = "/Users/arm/Resume_CV_F/ai-it-assistant/it_master.db"

def clean_column_name(name: str) -> str:
    name = str(name).strip()
    name = re.sub(r'[^a-zA-Z0-9_\u0E00-\u0E7F]', '_', name)
    name = re.sub(r'_+', '_', name)
    name = name.strip('_')
    if not name:
        return 'unnamed_col'
    if name[0].isdigit():
        name = '_' + name
    return name


def build():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
    
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON")
    
    xls = pd.ExcelFile(EXCEL_PATH)
    print(f"📂 Loading {len(xls.sheet_names)} sheets...")
    
    for sheet_name in xls.sheet_names:
        try:
            df = pd.read_excel(EXCEL_PATH, sheet_name=sheet_name, header=None)
            
            # Find header row
            header_row_idx = 0
            for i, row in df.iterrows():
                if row.dropna().count() >= 2:
                    header_row_idx = i
                    break
            
            df.columns = df.iloc[header_row_idx]
            df = df.iloc[header_row_idx + 1:].reset_index(drop=True)
            df = df.dropna(how='all')
            
            # Remove duplicate header rows
            if len(df) > 0:
                first_row_vals = set(str(v) for v in df.iloc[0].values if pd.notna(v))
                header_vals = set(str(df.columns[i]) for i, c in enumerate(df.columns) if pd.notna(c))
                if len(first_row_vals & header_vals) > max(2, len(header_vals) * 0.5):
                    df = df.iloc[1:].reset_index(drop=True)
            
            df.columns = [clean_column_name(str(c)) for c in df.columns]
            
            # Fix duplicate column names
            seen = set()
            new_cols = []
            for c in df.columns:
                if c in seen:
                    c = c + '_2'
                seen.add(c)
                new_cols.append(c)
            df.columns = new_cols
            
            # Fix IT_Asset_Register column names
            if sheet_name == "IT_Asset_Register":
                col_list = list(df.columns)
                if len(col_list) > 4 and 'unnamed_col' in col_list[4]:
                    col_list[4] = 'Model'
                if len(col_list) > 6 and 'unnamed_col_2' in col_list[6]:
                    col_list[6] = 'Device_Specification'
                df.columns = col_list
            
            if len(df) == 0:
                continue
            
            table_name = clean_column_name(sheet_name)
            df.to_sql(table_name, conn, if_exists='replace', index=False)
            print(f"  ✅ {table_name:35s} ({len(df)} rows)")
            
        except Exception as e:
            print(f"  ❌ {sheet_name}: {e}")
    
    # ─────────── Semantic Layer ───────────
    print("\n🧠 Building Knowledge Graph...")
    
    # 1. Category definitions
    conn.execute("""CREATE TABLE IF NOT EXISTS asset_categories (
        category TEXT,
        asset_type TEXT,
        description TEXT
    )""")
    
    categories = [
        ("network", "Firewall", "อุปกรณ์รักษาความปลอดภัยเครือข่าย"),
        ("network", "Core Switch", "Switch หลักของสำนักงาน"),
        ("network", "Access Point", "จุดกระจายสัญญาณ Wi-Fi"),
        ("infrastructure", "Server", "แม่ข่ายหลัก"),
        ("infrastructure", "NAS", "ที่เก็บข้อมูลส่วนกลาง"),
        ("infrastructure", "UPS", "เครื่องสำรองไฟ"),
        ("infrastructure", "Printer", "เครื่องพิมพ์ส่วนกลาง"),
        ("endpoint", "Notebook", "คอมพิวเตอร์พกพาพนักงาน"),
        ("endpoint", "Mobile Phone", "มือถือองค์กร"),
    ]
    conn.executemany("INSERT INTO asset_categories VALUES (?,?,?)", categories)
    
    # 2. Relationship metadata
    conn.execute("""CREATE TABLE IF NOT EXISTS table_relationships (
        from_table TEXT,
        from_key TEXT,
        to_table TEXT,
        to_key TEXT,
        description TEXT
    )""")
    
    relationships = [
        ("IT_Asset_Register", "Assigned_Employee_PK", "Employee_Account_Register", "Employee_PK", "อุปกรณ์ที่ assign ให้พนักงาน"),
        ("IT_Ticket_Log", "Requester_Employee_PK", "Employee_Account_Register", "Employee_PK", "พนักงานที่แจ้ง ticket"),
        ("IT_Ticket_Log", "Assigned_IT_Employee_PK", "IT_Team", "Employee_PK", "ทีม IT ที่รับผิดชอบ ticket"),
        ("M365_Access_Matrix", "Employee_PK", "Employee_Account_Register", "Employee_PK", "M365 license ของพนักงาน"),
        ("G0_Access_Matrix", "Employee_PK", "Employee_Account_Register", "Employee_PK", "สิทธิ์เข้า G0 Drive"),
        ("WiFi_Account_Register", "Employee_PK", "Employee_Account_Register", "Employee_PK", "WiFi account พนักงาน"),
        ("Onboarding_Offboarding", "Employee_PK", "Employee_Account_Register", "Employee_PK", "ประวัติเข้า-ออก"),
        ("Mobile_Telco_Register", "Employee_PK", "Employee_Account_Register", "Employee_PK", "มือถือองค์กร"),
        ("Mobile_Telco_Register", "Asset_PK", "IT_Asset_Register", "Asset_PK", "มือถือที่ลงทะเบียน"),
        ("License_Register", "Vendor_ID", "Vendor_Contract_Register", "Vendor_ID", "สัญญาซอฟต์แวร์"),
        ("IT_Budget_Summary", "Vendor_ID", "Vendor_Contract_Register", "Vendor_ID", "งบประมาณแยกตาม vendor"),
        ("System_Register", "Vendor_ID", "Vendor_Contract_Register", "Vendor_ID", "ระบบที่ vendor ดูแล"),
        ("IT_Asset_Register", "Vendor_ID", "Vendor_Contract_Register", "Vendor_ID", "อุปกรณ์ที่ซื้อจาก vendor"),
        ("Network_Register", "Linked_Asset_ID", "IT_Asset_Register", "Asset_ID", "อุปกรณ์ที่เชื่อม network"),
        ("Network_Register", "Linked_System_ID", "System_Register", "System_ID", "ระบบที่ใช้ network"),
    ]
    conn.executemany("INSERT INTO table_relationships VALUES (?,?,?,?,?)", relationships)
    
    # 3. VIEWs
    views = {
        "v_network_devices": """
            SELECT Asset_ID, Asset_Type, Brand, Model, Cost_THB, Status, Location
            FROM IT_Asset_Register
            WHERE Asset_Type IN ('Firewall','Core Switch','Access Point')
        """,
        "v_infrastructure": """
            SELECT Asset_ID, Asset_Type, Brand, Model, Cost_THB, Status
            FROM IT_Asset_Register
            WHERE Asset_Type IN ('Server','NAS','UPS','Printer')
        """,
        "v_endpoints": """
            SELECT Asset_ID, Asset_Type, Brand, Model, Assigned_To, Department, Cost_THB, Warranty_Expire
            FROM IT_Asset_Register
            WHERE Asset_Type IN ('Notebook','Mobile Phone')
        """,
        "v_software_licenses": """
            SELECT l.Software_Name, l.License_Type, l.Used_Quantity, l.Quantity,
                   l.Expire_Date, l.Cost_Per_Year_THB, v.Vendor_Name
            FROM License_Register l
            LEFT JOIN Vendor_Contract_Register v ON l.Vendor_ID = v.Vendor_ID
        """,
        "v_employee_assets": """
            SELECT e.Full_Name, e.Department, e.Job_Title,
                   a.Asset_Type, a.Brand, a.Model, a.Status as Asset_Status
            FROM Employee_Account_Register e
            LEFT JOIN IT_Asset_Register a ON e.Employee_PK = a.Assigned_Employee_PK
        """,
        "v_open_tickets": """
            SELECT t.Ticket_ID, t.Requester, t.Department, t.Issue_Type,
                   t.Priority, t.Status, t.Assigned_IT
            FROM IT_Ticket_Log t
            WHERE t.Status != 'Resolved'
            ORDER BY CASE t.Priority
                WHEN 'Critical' THEN 1 WHEN 'High' THEN 2 WHEN 'Medium' THEN 3 ELSE 4 END
        """,
        "v_budget_summary": """
            SELECT Category, COUNT(*) as items, SUM(Annual_Cost_THB) as total_cost
            FROM IT_Budget_Summary
            GROUP BY Category
        """,
        "v_employee_full": """
            SELECT e.Full_Name, e.Department, e.Job_Title, e.Corporate_Email,
                   e.Account_Status, m.License_Plan as M365_Plan, m.MFA_Status,
                   w.SSID as WiFi_SSID
            FROM Employee_Account_Register e
            LEFT JOIN M365_Access_Matrix m ON e.Employee_PK = m.Employee_PK
            LEFT JOIN WiFi_Account_Register w ON e.Employee_PK = w.Employee_PK
        """,
        "v_assets_by_category": """
            SELECT ac.category,
                   COUNT(a.Asset_PK) as device_count,
                   SUM(a.Cost_THB) as total_cost_thb
            FROM asset_categories ac
            LEFT JOIN IT_Asset_Register a ON ac.asset_type = a.Asset_Type
            GROUP BY ac.category
        """,
        "v_company_summary": """
            SELECT
                (SELECT COUNT(*) FROM Employee_Account_Register) as total_employees,
                (SELECT COUNT(*) FROM IT_Asset_Register) as total_assets,
                (SELECT COUNT(*) FROM IT_Ticket_Log WHERE Status != 'Resolved') as open_tickets,
                (SELECT SUM(Cost_THB) FROM IT_Asset_Register) as total_asset_value,
                (SELECT SUM(Annual_Cost_THB) FROM IT_Budget_Summary) as total_annual_budget
        """,
    }
    
    for view_name, sql in views.items():
        try:
            conn.execute(f"DROP VIEW IF EXISTS {view_name}")
            conn.execute(f"CREATE VIEW {view_name} AS {sql}")
            print(f"  👁️  {view_name}")
        except Exception as e:
            print(f"  ❌ {view_name}: {e}")
    
    # 4. Indexes for common queries
    indexes = [
        "CREATE INDEX IF NOT EXISTS idx_asset_employee ON IT_Asset_Register(Assigned_Employee_PK)",
        "CREATE INDEX IF NOT EXISTS idx_ticket_employee ON IT_Ticket_Log(Requester_Employee_PK)",
        "CREATE INDEX IF NOT EXISTS idx_employee_department ON Employee_Account_Register(Department)",
        "CREATE INDEX IF NOT EXISTS idx_asset_type ON IT_Asset_Register(Asset_Type)",
    ]
    for idx in indexes:
        try:
            conn.execute(idx)
        except:
            pass
    
    conn.commit()
    
    # Stats
    tables = conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
    views_count = len(conn.execute("SELECT name FROM sqlite_master WHERE type='view'").fetchall())
    total_rows = sum(conn.execute(f'SELECT COUNT(*) FROM "{t[0]}"').fetchone()[0] for t in tables)
    
    conn.close()
    
    print(f"\n✅ Knowledge Graph Ready!")
    print(f"   📊 {len(tables)} tables + {views_count} views")
    print(f"   📋 {total_rows} total rows")
    print(f"   💾 {os.path.getsize(DB_PATH)/1024:.0f} KB")


if __name__ == "__main__":
    build()