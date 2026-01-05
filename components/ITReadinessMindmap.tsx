'use client';

import React from 'react';

type TreeNode = {
    name: string;
    tags?: string[];
    children?: TreeNode[];
};

const data: TreeNode = {
    name: "IT Management Overview",
    children: [
        {
            name: "Strategy and Governance",
            tags: ["MID", "IPO"],
            children: [
                { name: "IT Vision and Roadmap", tags: ["MID", "IPO"] },
                { name: "Policies and Standards", tags: ["MID", "IPO"] },
                { name: "Risk Register and Treatment", tags: ["MID", "IPO"] },
                { name: "KPI/OKR and Reporting", tags: ["MID", "IPO"] },
                { name: "Steering Committee", tags: ["MID", "IPO"] },
            ]
        },
        {
            name: "ITSM and Operations",
            tags: ["ALL"],
            children: [
                { name: "Service Catalog (Site)", tags: ["MID", "IPO"] },
                { name: "Ticketing - Incident/Request", tags: ["ALL"] },
                { name: "Problem Management (RCA)", tags: ["MID", "IPO"] },
                { name: "Change Management (Approval/CAB)", tags: ["MID", "IPO"] },
                { name: "Knowledge Base and Runbooks", tags: ["ALL"] },
                { name: "CMDB / Config-Asset Mapping", tags: ["MID", "IPO"] },
                { name: "On-call and Escalation", tags: ["MID/PAGER", "IPO"] },
            ]
        },
        {
            name: "Identity and Access",
            tags: ["ALL"],
            children: [
                { name: "Directory SSO (AD/Entra/Google)", tags: ["MID", "IPO"] },
                { name: "MFA and Conditional Access", tags: ["MID", "IPO", "All"] },
                { name: "RBAC and JML (Joiner-Mover-Leaver)", tags: ["MID", "IPO"] },
                { name: "Privileged Access (PAM/PIM)", tags: ["MID", "IPO"] },
                { name: "Secrets / Password Mgmt", tags: ["MID", "IPO"] },
                { name: "Access Reviews (Periodic)", tags: ["REQ", "IPO"] },
            ]
        },
        {
            name: "Infrastructure",
            tags: ["ALL"],
            children: [
                {
                    name: "Network",
                    tags: ["ALL"],
                    children: [
                        { name: "Wifi/LAN Redundancy and SLA", tags: ["MID", "IPO"] },
                        { name: "IP Plan / VLAN / Segmentation", tags: ["MID", "REQ", "IPO"] },
                        { name: "VPN (Corp/Special/IT)", tags: ["ALL"] },
                        { name: "VPN / Remote Access", tags: ["MID", "IPO"] },
                        { name: "DHCP/DNS/NTP Logging", tags: ["MID", "IPO"] },
                        { name: "Network Monitoring (SNMP/NetFlow)", tags: ["MID", "INT", "IPO"] },
                    ]
                },
                {
                    name: "Compute and Platform",
                    tags: ["ALL"],
                    children: [
                        { name: "Servers (Baremetal/VM)", tags: ["ALL"] },
                        { name: "OS Hardening/Patching", tags: ["MID", "IPO"] },
                        { name: "Storage (NAS/SAN/Object)", tags: ["MID"] },
                        { name: "Containers (Docker/K8s)", tags: ["CNT"] },
                        { name: "Lifecycle and Environment", tags: ["MID", "IPO"] },
                    ]
                },
                {
                    name: "Cloud",
                    tags: ["MID"],
                    children: [
                        { name: "IaC (Terraform)", tags: ["MID", "IPO"] },
                        { name: "SaaS / PaaS / Cost Governance", tags: ["MID", "IPO"] },
                        { name: "CDN/Edge (Optional)", tags: ["CNT"] },
                    ]
                }
            ]
        },
        {
            name: "Endpoints and Devices",
            tags: ["ALL"],
            children: [
                { name: "MDM (Intune/Jamf/Workspace ONE)", tags: ["MID", "IPO"] },
                { name: "Patch Management (OS/3rd Party)", tags: ["MID", "SEC", "IPO"] },
                { name: "EDR/AV and Device Control", tags: ["MID", "REQ", "IPO"] },
                { name: "Disk Encryption (FileVault/BitLocker)", tags: ["MID", "REQ", "IPO"] },
                { name: "Standard Build / Baseline Hardening", tags: ["MID", "IPO"] },
                { name: "Inventory and Compliance Reporting", tags: ["MID", "IPO"] },
            ]
        },
        {
            name: "Applications and Data",
            tags: ["MID"],
            children: [
                { name: "Business Apps Ownership", tags: ["MID", "IPO"] },
                { name: "Databases and Backups Control", tags: ["MID", "REQ", "IPO"] },
                { name: "Integrations/API and Automation", tags: ["MID"] },
                { name: "Data Classification / Sensitivity", tags: ["MID", "REQ", "IPO"] },
                { name: "Data Retention and Lifecycle", tags: ["MID", "IPO"] },
            ]
        },
        {
            name: "Security Program",
            tags: ["MID"],
            children: [
                { name: "Central Logging (Critical Systems)", tags: ["MID", "IPO"] },
                { name: "Security Awareness Training", tags: ["MID", "REQ", "IPO"] },
                { name: "Vulnerability Management", tags: ["MID", "REQ", "IPO"] },
                { name: "Email Security (SPF/DKIM/DMARC)", tags: ["MID", "IPO"] },
                { name: "Network Security (FW/WAF/IDS/IPS)", tags: ["MID", "REQ", "IPO"] },
                { name: "Incident Response Plan", tags: ["MID", "REQ", "IPO"] },
                { name: "Security Assessment / Pentest", tags: ["MID", "IPO"] },
                { name: "Application Security (CI/CD)", tags: ["MID", "REQ"] },
            ]
        },
        {
            name: "Backup / DR / BCP",
            tags: ["ALL"],
            children: [
                { name: "Backup Strategy (3-2-1)", tags: ["ALL"] },
                { name: "Immutable / Offsite Copy", tags: ["MID", "IPO"] },
                { name: "RPO/RTO Definition", tags: ["MID", "IPO"] },
                { name: "Restore Testing and Evidence", tags: ["MID", "IPO"] },
                { name: "DR Plan / Test", tags: ["MID", "IPO"] },
                { name: "BCP (People/Process)", tags: ["MID", "IPO"] },
            ]
        },
        {
            name: "Observability and Monitoring",
            tags: ["MID"],
            children: [
                { name: "Monitoring / Metrics (Basic)", tags: ["MID", "IPO"] },
                { name: "Dashboards / Traffic / Error", tags: ["MID", "IPO"] },
                { name: "Capacity and Performance Trend", tags: ["MID", "IPO"] },
                { name: "Noise Control / Alert Tuning", tags: ["MID", "IPO"] },
            ]
        },
        {
            name: "Vendor / Finance / Lifecycle",
            tags: ["MID", "IPO"],
            children: [
                { name: "OPEX/CAPEX Planning", tags: ["MID", "IPO"] },
                { name: "License Management", tags: ["MID", "IPO"] },
                { name: "Renewal Calendar (Domain/SSL)", tags: ["MID", "IPO"] },
                { name: "Contract and Vendor Qual", tags: ["MID", "IPO"] },
                { name: "Asset Lifecycle (Purchase/Retire)", tags: ["MID", "IPO"] },
                { name: "Procurement Standardization", tags: ["MID", "IPO"] },
            ]
        },
        {
            name: "Compliance and Audit Readiness",
            tags: ["MID", "IPO"],
            children: [
                { name: "Audit Trails (Admin/Change)", tags: ["REQ", "IPO"] },
                { name: "Evidence Collection", tags: ["MID", "IPO"] },
                { name: "Policy Exception Handling", tags: ["REQ", "IPO"] },
                { name: "Data Privacy (PDPA/GDPR)", tags: ["REQ", "IPO"] },
            ]
        },
    ]
};

const Node = ({ node, isRoot = false }: { node: TreeNode; isRoot?: boolean }) => {
    return (
        <div className="flex flex-row items-center">
            {/* Node Content */}
            <div className={`
        flex flex-row items-center px-4 py-2 rounded-lg border shadow-sm shrink-0 relative z-10
        ${isRoot
                    ? 'bg-foreground text-background border-foreground font-bold text-lg'
                    : 'bg-white hover:bg-gray-50 border-gray-200 text-sm font-medium'}
      `}>
                <span>{node.name}</span>
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
                                <Node node={child} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function ITReadinessMindmap() {
    return (
        <div className="w-full overflow-x-auto overflow-y-hidden p-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
            <div className="min-w-max">
                <Node node={data} isRoot />
            </div>
        </div>
    );
}
