'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';

type TreeNode = {
    name: {
        en: string;
        th: string;
    };
    tags?: string[];
    children?: TreeNode[];
};

const data: TreeNode = {
    name: { en: "IT Management Overview", th: "ภาพรวมการบริหารจัดการไอที" },
    children: [
        {
            name: { en: "Strategy and Governance", th: "กลยุทธ์และธรรมาภิบาล" },
            tags: ["MID", "IPO"],
            children: [
                { name: { en: "IT Vision and Roadmap", th: "วิสัยทัศน์และแผนงานไอที" }, tags: ["MID", "IPO"] },
                { name: { en: "Policies and Standards", th: "นโยบายและมาตรฐาน" }, tags: ["MID", "IPO"] },
                { name: { en: "Risk Register and Treatment", th: "ทะเบียนความเสี่ยงและการจัดการ" }, tags: ["MID", "IPO"] },
                { name: { en: "KPI/OKR and Reporting", th: "KPI/OKR และการรายงานผล" }, tags: ["MID", "IPO"] },
                { name: { en: "Steering Committee", th: "คณะกรรมการกำกับดูแล" }, tags: ["MID", "IPO"] },
            ]
        },
        {
            name: { en: "ITSM and Operations", th: "ITSM และการปฏิบัติการ" },
            tags: ["ALL"],
            children: [
                { name: { en: "Service Catalog (Site)", th: "สารบบบริการ (Service Catalog)" }, tags: ["MID", "IPO"] },
                { name: { en: "Ticketing - Incident/Request", th: "ระบบแจ้งเรื่อง (Incident/Request)" }, tags: ["ALL"] },
                { name: { en: "Problem Management (RCA)", th: "การจัดการปัญหา (RCA)" }, tags: ["MID", "IPO"] },
                { name: { en: "Change Management (Approval/CAB)", th: "การจัดการการเปลี่ยนแปลง (CAB)" }, tags: ["MID", "IPO"] },
                { name: { en: "Knowledge Base and Runbooks", th: "คลังความรู้และคู่มือปฏิบัติงาน" }, tags: ["ALL"] },
                { name: { en: "CMDB / Config-Asset Mapping", th: "CMDB / ผังความเชื่อมโยงทรัพย์สิน" }, tags: ["MID", "IPO"] },
                { name: { en: "On-call and Escalation", th: "เวรปฏิบัติงานและการส่งต่อเรื่อง" }, tags: ["MID/PAGER", "IPO"] },
            ]
        },
        {
            name: { en: "Identity and Access", th: "การยืนยันตัวตนและการเข้าถึง" },
            tags: ["ALL"],
            children: [
                { name: { en: "Directory SSO (AD/Entra/Google)", th: "ระบบบัญชีกลาง SSO (AD/Entra)" }, tags: ["MID", "IPO"] },
                { name: { en: "MFA and Conditional Access", th: "MFA และเงื่อนไขการเข้าถึง" }, tags: ["MID", "IPO", "All"] },
                { name: { en: "RBAC and JML (Joiner-Mover-Leaver)", th: "RBAC และกระบวนการ JML" }, tags: ["MID", "IPO"] },
                { name: { en: "Privileged Access (PAM/PIM)", th: "การเข้าถึงระดับสูง (PAM/PIM)" }, tags: ["MID", "IPO"] },
                { name: { en: "Secrets / Password Mgmt", th: "การจัดการรหัสผ่านและความลับ" }, tags: ["MID", "IPO"] },
                { name: { en: "Access Reviews (Periodic)", th: "การทบทวนสิทธิ์ (ตามรอบ)" }, tags: ["REQ", "IPO"] },
            ]
        },
        {
            name: { en: "Infrastructure", th: "โครงสร้างพื้นฐาน" },
            tags: ["ALL"],
            children: [
                {
                    name: { en: "Network", th: "เครือข่าย" },
                    tags: ["ALL"],
                    children: [
                        { name: { en: "Wifi/LAN Redundancy and SLA", th: "ความเสถียร Wifi/LAN และ SLA" }, tags: ["MID", "IPO"] },
                        { name: { en: "IP Plan / VLAN / Segmentation", th: "ผัง IP / VLAN / การแบ่งส่วน" }, tags: ["MID", "REQ", "IPO"] },
                        { name: { en: "VPN (Corp/Special/IT)", th: "VPN (องค์กร/พิเศษ/ไอที)" }, tags: ["ALL"] },
                        { name: { en: "VPN / Remote Access", th: "VPN / การเข้าถึงจากภายนอก" }, tags: ["MID", "IPO"] },
                        { name: { en: "DHCP/DNS/NTP Logging", th: "บันทึก Log DHCP/DNS/NTP" }, tags: ["MID", "IPO"] },
                        { name: { en: "Network Monitoring (SNMP/NetFlow)", th: "การเฝ้าระวังเครือข่าย" }, tags: ["MID", "INT", "IPO"] },
                    ]
                },
                {
                    name: { en: "Compute and Platform", th: "เครื่องแม่ข่ายและแพลตฟอร์ม" },
                    tags: ["ALL"],
                    children: [
                        { name: { en: "Servers (Baremetal/VM)", th: "เซิร์ฟเวอร์ (Physical/VM)" }, tags: ["ALL"] },
                        { name: { en: "OS Hardening/Patching", th: "ความปลอดภัย OS / การอัปเดต" }, tags: ["MID", "IPO"] },
                        { name: { en: "Storage (NAS/SAN/Object)", th: "พื้นที่จัดเก็บข้อมูล (Storage)" }, tags: ["MID"] },
                        { name: { en: "Containers (Docker/K8s)", th: "คอนเทนเนอร์ (Docker/K8s)" }, tags: ["CNT"] },
                        { name: { en: "Lifecycle and Environment", th: "วงจรชีวิตและสภาพแวดล้อมระบบ" }, tags: ["MID", "IPO"] },
                    ]
                },
                {
                    name: { en: "Cloud", th: "คลาวด์" },
                    tags: ["MID"],
                    children: [
                        { name: { en: "IaC (Terraform)", th: "IaC (Terraform)" }, tags: ["MID", "IPO"] },
                        { name: { en: "SaaS / PaaS / Cost Governance", th: "SaaS / PaaS / การคุมค่าใช้จ่าย" }, tags: ["MID", "IPO"] },
                        { name: { en: "CDN/Edge (Optional)", th: "CDN/Edge (ทางเลือก)" }, tags: ["CNT"] },
                    ]
                }
            ]
        },
        {
            name: { en: "Endpoints and Devices", th: "อุปกรณ์ปลายทาง" },
            tags: ["ALL"],
            children: [
                { name: { en: "MDM (Intune/Jamf/Workspace ONE)", th: "MDM (Intune/Jamf)" }, tags: ["MID", "IPO"] },
                { name: { en: "Patch Management (OS/3rd Party)", th: "การจัดการ Patch (OS/โปรแกรม)" }, tags: ["MID", "SEC", "IPO"] },
                { name: { en: "EDR/AV and Device Control", th: "EDR/AV และการคุมอุปกรณ์ต่อพ่วง" }, tags: ["MID", "REQ", "IPO"] },
                { name: { en: "Disk Encryption (FileVault/BitLocker)", th: "การเข้ารหัสข้อมูลในเครื่อง" }, tags: ["MID", "REQ", "IPO"] },
                { name: { en: "Standard Build / Baseline Hardening", th: "มาตรฐานการติดตั้ง / ความปลอดภัยพื้นฐาน" }, tags: ["MID", "IPO"] },
                { name: { en: "Inventory and Compliance Reporting", th: "ทะเบียนอุปกรณ์และการรายงานผล" }, tags: ["MID", "IPO"] },
            ]
        },
        {
            name: { en: "Applications and Data", th: "แอปพลิเคชันและข้อมูล" },
            tags: ["MID"],
            children: [
                { name: { en: "Business Apps Ownership", th: "ผู้รับผิดชอบระบบธุรกิจ" }, tags: ["MID", "IPO"] },
                { name: { en: "Databases and Backups Control", th: "การคุมฐานข้อมูลและสำรองข้อมูล" }, tags: ["MID", "REQ", "IPO"] },
                { name: { en: "Integrations/API and Automation", th: "การเชื่อมต่อ/API และระบบอัตโนมัติ" }, tags: ["MID"] },
                { name: { en: "Data Classification / Sensitivity", th: "การจัดชั้นความลับข้อมูล" }, tags: ["MID", "REQ", "IPO"] },
                { name: { en: "Data Retention and Lifecycle", th: "ระยะเวลาเก็บและการทำลายข้อมูล" }, tags: ["MID", "IPO"] },
            ]
        },
        {
            name: { en: "Security Program", th: "โปรแกรมความปลอดภัย" },
            tags: ["MID"],
            children: [
                { name: { en: "Central Logging (Critical Systems)", th: "ระบบเก็บ Log ศูนย์กลาง" }, tags: ["MID", "IPO"] },
                { name: { en: "Security Awareness Training", th: "การอบรมความตระหนักรู้ฯ" }, tags: ["MID", "REQ", "IPO"] },
                { name: { en: "Vulnerability Management", th: "การจัดการช่องโหว่" }, tags: ["MID", "REQ", "IPO"] },
                { name: { en: "Email Security (SPF/DKIM/DMARC)", th: "ความปลอดภัยอีเมล" }, tags: ["MID", "IPO"] },
                { name: { en: "Network Security (FW/WAF/IDS/IPS)", th: "ความปลอดภัยเครือข่าย" }, tags: ["MID", "REQ", "IPO"] },
                { name: { en: "Incident Response Plan", th: "แผนรับมือภัยคุกคาม" }, tags: ["MID", "REQ", "IPO"] },
                { name: { en: "Security Assessment / Pentest", th: "การประเมินความปลอดภัย / Pentest" }, tags: ["MID", "IPO"] },
                { name: { en: "Application Security (CI/CD)", th: "ความปลอดภัยแอปพลิเคชัน" }, tags: ["MID", "REQ"] },
            ]
        },
        {
            name: { en: "Backup / DR / BCP", th: "สำรองข้อมูล / กู้คืน / ต่อเนื่องทางธุรกิจ" },
            tags: ["ALL"],
            children: [
                { name: { en: "Backup Strategy (3-2-1)", th: "กลยุทธ์สำรองข้อมูล (3-2-1)" }, tags: ["ALL"] },
                { name: { en: "Immutable / Offsite Copy", th: "สำรองข้อมูลแบบแก้ไขไม่ได้ / นอกสถานที่" }, tags: ["MID", "IPO"] },
                { name: { en: "RPO/RTO Definition", th: "กำหนดค่า RPO/RTO" }, tags: ["MID", "IPO"] },
                { name: { en: "Restore Testing and Evidence", th: "ทดสอบการกู้คืนและหลักฐาน" }, tags: ["MID", "IPO"] },
                { name: { en: "DR Plan / Test", th: "แผนกู้คืนภัยพิบัติ / ทดสอบ" }, tags: ["MID", "IPO"] },
                { name: { en: "BCP (People/Process)", th: "แผนความต่อเนื่องทางธุรกิจ (คน/กระบวนการ)" }, tags: ["MID", "IPO"] },
            ]
        },
        {
            name: { en: "Observability and Monitoring", th: "การเฝ้าระวังและสังเกตการณ์" },
            tags: ["MID"],
            children: [
                { name: { en: "Monitoring / Metrics (Basic)", th: "การเฝ้าระวังพื้นฐาน" }, tags: ["MID", "IPO"] },
                { name: { en: "Dashboards / Traffic / Error", th: "แดชบอร์ด / Traffic / Error" }, tags: ["MID", "IPO"] },
                { name: { en: "Capacity and Performance Trend", th: "แนวโน้มความจุและประสิทธิภาพ" }, tags: ["MID", "IPO"] },
                { name: { en: "Noise Control / Alert Tuning", th: "การลด Noise / ปรับแต่งการเตือน" }, tags: ["MID", "IPO"] },
            ]
        },
        {
            name: { en: "Vendor / Finance / Lifecycle", th: "คู่ค้า / การเงิน / วงจรชีวิต" },
            tags: ["MID", "IPO"],
            children: [
                { name: { en: "OPEX/CAPEX Planning", th: "วางแผน OPEX/CAPEX" }, tags: ["MID", "IPO"] },
                { name: { en: "License Management", th: "การจัดการ License" }, tags: ["MID", "IPO"] },
                { name: { en: "Renewal Calendar (Domain/SSL)", th: "ปฏิทินต่ออายุ (Domain/SSL)" }, tags: ["MID", "IPO"] },
                { name: { en: "Contract and Vendor Qual", th: "สัญญาและคุณภาพคู่ค้า" }, tags: ["MID", "IPO"] },
                { name: { en: "Asset Lifecycle (Purchase/Retire)", th: "วงจรชีวิตทรัพย์สิน (ซื้อ/จำหน่าย)" }, tags: ["MID", "IPO"] },
                { name: { en: "Procurement Standardization", th: "มาตรฐานการจัดซื้อ" }, tags: ["MID", "IPO"] },
            ]
        },
        {
            name: { en: "Compliance and Audit Readiness", th: "การปฏิบัติตามกฎและพร้อมรับตรวจสอบ" },
            tags: ["MID", "IPO"],
            children: [
                { name: { en: "Audit Trails (Admin/Change)", th: "เส้นทางตรวจสอบ (Admin/Change)" }, tags: ["REQ", "IPO"] },
                { name: { en: "Evidence Collection", th: "การเก็บรวบรวมหลักฐาน" }, tags: ["MID", "IPO"] },
                { name: { en: "Policy Exception Handling", th: "การจัดการข้อยกเว้นนโยบาย" }, tags: ["REQ", "IPO"] },
                { name: { en: "Data Privacy (PDPA/GDPR)", th: "ความเป็นส่วนตัวข้อมูล (PDPA)" }, tags: ["REQ", "IPO"] },
            ]
        },
    ]
};

const Node = ({ node, isRoot = false, language }: { node: TreeNode; isRoot?: boolean; language: 'en' | 'th' }) => {
    return (
        <div className="flex flex-row items-center">
            {/* Node Content */}
            <div className={`
        flex flex-row items-center px-4 py-2 rounded-lg border shadow-sm shrink-0 relative z-10
        ${isRoot
                    ? 'bg-foreground text-background border-foreground font-bold text-lg'
                    : 'bg-white hover:bg-gray-50 border-gray-200 text-sm font-medium'}
      `}>
                <span>{node.name[language]}</span>
                {node.tags && node.tags.length > 0 && (
                    <div className="flex gap-1 ml-2">
                        {node.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase px-1 py-0.5 rounded bg-gray-100 text-gray-600 font-bold">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Connection Logic & Children */}
            {node.children && node.children.length > 0 && (
                <div className="flex flex-row items-center">
                    {/* Link from Parent to Children Column */}
                    <div className="w-8 h-px bg-gray-300 shrink-0"></div>

                    <div className="flex flex-col gap-4 relative">
                        {/* The Vertical Bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 my-4"></div>

                        {node.children.map((child, index) => (
                            <div key={index} className="flex flex-row items-center relative">
                                {/* Connector from Vertical Bar to Child */}
                                <div className="w-6 h-px bg-gray-300 shrink-0"></div>
                                <Node node={child} language={language} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function ITReadinessMindmap() {
    const { language } = useLanguage();

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden p-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
            <div className="min-w-max">
                <Node node={data} isRoot language={language} />
            </div>
        </div>
    );
}
