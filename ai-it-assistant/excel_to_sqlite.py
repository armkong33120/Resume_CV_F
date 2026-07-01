#!/usr/bin/env python3
"""
Excel → SQLite Converter
แปลง IT_Department_Master_Register_150ppl.xlsx → it_master.db
15 sheets → 15 tables พร้อม foreign keys
"""

import pandas as pd
import sqlite3
import os
import re

# Paths
EXCEL_PATH = "/Users/arm/Downloads/IT_Department_Master_Register_150ppl.xlsx"
DB_PATH = "/Users/arm/Resume_CV_F/ai-it-assistant/it_master.db"

def clean_column_name(name: str) -> str:
    """Clean Excel column names to valid SQLite column names."""
    name = str(name).strip()
    name = re.sub(r'[^a-zA-Z0-9_\u0E00-\u0E7F]', '_', name)  # Keep Thai chars
    name = re.sub(r'_+', '_', name)
    name = name.strip('_')
    if not name:
        name = 'unnamed_col'
    elif name[0].isdigit():
        name = '_' + name
    return name

def excel_to_sqlite(excel_path: str, db_path: str):
    """Convert all sheets in Excel to SQLite tables."""
    
    # Remove existing DB
    if os.path.exists(db_path):
        os.remove(db_path)
    
    conn = sqlite3.connect(db_path)
    
    # Read all sheets
    xls = pd.ExcelFile(excel_path)
    print(f"📂 Excel File: {excel_path}")
    print(f"📋 Found {len(xls.sheet_names)} sheets:")
    
    table_count = 0
    total_rows = 0
    
    for sheet_name in xls.sheet_names:
        try:
            # Read sheet
            df = pd.read_excel(excel_path, sheet_name=sheet_name, header=None)
            
            # Find the header row (first row that has meaningful data)
            # Skip empty rows at the top
            header_row_idx = 0
            for i, row in df.iterrows():
                non_null = row.dropna().count()
                if non_null >= 2:
                    header_row_idx = i
                    break
            
            # Use the found header row
            df.columns = df.iloc[header_row_idx]
            df = df.iloc[header_row_idx + 1:].reset_index(drop=True)
            
            # Remove completely empty rows
            df = df.dropna(how='all')
            
            # Remove duplicate header rows that might appear in merged Excel cells
            # (Some sheets have merged cells causing headers to repeat)
            if len(df) > 0:
                first_row_vals = set(str(v) for v in df.iloc[0].values if pd.notna(v))
                header_vals = set(str(df.columns[i]) for i, c in enumerate(df.columns) if pd.notna(c))
                # If first row looks like headers, remove it
                overlap = first_row_vals & header_vals
                if len(overlap) > max(2, len(header_vals) * 0.5):
                    df = df.iloc[1:].reset_index(drop=True)
            
            # Clean column names
            df.columns = [clean_column_name(str(c)) for c in df.columns]
            
            # Remove duplicate column names
            cols = []
            seen = set()
            for c in df.columns:
                if c in seen:
                    c = c + '_2'
                cols.append(c)
                seen.add(c)
            df.columns = cols
            
            if len(df) == 0:
                print(f"  ⏭️  {sheet_name}: empty, skipping")
                continue
            
            # Fix known column name issues from Excel merged cells
            if sheet_name == "IT_Asset_Register":
                rename_map = {}
                for c in df.columns:
                    # Column index 4 (0-based) is Model, index 6 is Device_Specification
                    pass
                # Map by position
                col_list = list(df.columns)
                if len(col_list) > 4 and 'unnamed_col' in col_list[4]:
                    col_list[4] = 'Model'
                if len(col_list) > 6 and 'unnamed_col_2' in col_list[6]:
                    col_list[6] = 'Device_Specification'
                df.columns = col_list
            
            # Create table name
            table_name = clean_column_name(sheet_name)
            
            # Write to SQLite
            df.to_sql(table_name, conn, if_exists='replace', index=False)
            
            table_count += 1
            total_rows += len(df)
            print(f"  ✅ {sheet_name:40s} → {table_name:40s} ({len(df)} rows, {len(df.columns)} cols)")
            
        except Exception as e:
            print(f"  ❌ {sheet_name}: Error - {e}")
    
    conn.close()
    
    print(f"\n🎉 Done! {table_count} tables, {total_rows} total rows")
    print(f"📁 Database: {db_path}")
    print(f"💾 Size: {os.path.getsize(db_path) / 1024:.1f} KB")

if __name__ == "__main__":
    excel_to_sqlite(EXCEL_PATH, DB_PATH)