import React from 'react';

// --- Primitives ---

const StartNode = () => (
    <div className="w-6 h-6 rounded-full bg-black mx-auto z-20 relative shadow-sm" />
);

const EndNode = () => (
    <div className="w-8 h-8 rounded-full border-[3px] border-black bg-white mx-auto z-20 relative flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-black" />
    </div>
);

const ArrowVertical = ({ height = 32 }: { height?: number }) => (
    <div className="flex justify-center w-full relative z-0" style={{ height: `${height}px` }}>
        <svg width="20" height={height} className="overflow-visible">
            <line
                x1="10"
                y1="0"
                x2="10"
                y2={height}
                stroke="#334155" // Slate-700
                strokeWidth="1.5"
                markerEnd="url(#arrowhead)"
            />
        </svg>
    </div>
);

const DecisionDiamond = ({ label }: { label: string }) => (
    <div className="relative w-32 h-24 mx-auto flex items-center justify-center z-20 my-2">
        {/* Diamond Shape */}
        <div className="absolute w-24 h-24 bg-[#FEFECE] border-[1.5px] border-[#A80036] transform rotate-45 shadow-sm z-10"></div>
        {/* Text */}
        <div className="relative z-20 text-center leading-tight px-1 font-sans text-xs font-semibold text-black">
            {label}
        </div>
    </div>
);

// PlantUML "Activity" Box Style
const ActivityBox = ({ label, sub, extraClasses = "" }: { label: React.ReactNode, sub?: React.ReactNode, extraClasses?: string }) => (
    <div className={`bg-[#F1F1F1] border-[1.5px] border-[#181818] rounded-[16px] px-4 py-3 shadow-none w-full max-w-[280px] mx-auto text-center z-20 relative flex flex-col justify-center ${extraClasses}`}>
        <div className="font-sans text-sm font-normal text-black leading-snug">{label}</div>
        {sub && <div className="font-sans text-xs text-slate-600 mt-1 whitespace-pre-line leading-tight">{sub}</div>}
    </div>
);

// PlantUML "Package/Partition" Style
const PhasePartition = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => {
    return (
        <div className={`relative pt-6 ${className} w-full`}>
            {/* The "Tab" Label */}
            <div className="absolute top-0 left-0 bg-[#EEEEEE] border-[1.5px] border-black border-b-0 px-3 py-1 text-xs font-bold text-black z-10 rounded-t-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)', width: 'fit-content', paddingRight: '20px' }}>
                {title}
            </div>
            {/* The Box */}
            <div className="border-[1.5px] border-black bg-white/50 p-6 rounded-b-sm relative z-0 mt-[-1px]">
                {children}
            </div>
        </div>
    );
};

// CSS Note with folded corner
const NoteBox = ({ text }: { text: string }) => (
    <div className="relative bg-[#FEFECE] border border-black p-2 text-xs font-sans shadow-sm text-left max-w-[150px]">
        {text}
        {/* Folded Corner Effect */}
        <div className="absolute top-0 right-0 w-3 h-3 bg-white border-l border-b border-black"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-slate-200" style={{ clipPath: 'polygon(0 100%, 100% 0, 0 0)' }}></div>
    </div>
);


export default function LarkMigrationFlow() {
    return (
        <div className="w-full bg-white p-8 overflow-x-auto min-w-[1024px] font-sans text-slate-900">
            {/* Creating the SVG Definitions once */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#334155" />
                    </marker>
                </defs>
            </svg>

            <div className="text-center mb-8">
                <h1 className="text-xl font-bold text-black">Project Unity: Migration Roadmap</h1>
                <p className="text-slate-500 text-sm mt-1">Scroll down to view full process</p>
                <div className="mt-4"><StartNode /></div> {/* Start Node */}
            </div>

            <div className="flex flex-col items-center space-y-0 text-sm w-full max-w-5xl mx-auto relative">
                <ArrowVertical height={20} />

                {/* --- PHASE 1 --- */}
                <PhasePartition title="PHASE 1: Preparation">
                    <div className="flex flex-col items-center gap-0">
                        <ActivityBox label="Kick-off & Strategy Definition" sub="Timeline: 4-6 Weeks" />
                        <ArrowVertical height={24} />

                        <ActivityBox label="Classify Data Sensitivity" sub="Critical / Confidential / Internal" />
                        <ArrowVertical height={24} />

                        <ActivityBox label="Request ISO/Security Docs" sub="& Setup Best Practices" />
                        <ArrowVertical height={24} />

                        <ActivityBox label="Setup Lark Tenant" sub="Verify Domain & SSO Sync" />
                        <ArrowVertical height={24} />

                        <ActivityBox
                            label="Security Hardening"
                            sub="Enforce MFA, Watermark,&#10;Block External Download"
                        />
                    </div>
                </PhasePartition>

                <ArrowVertical height={32} />

                {/* --- PHASE 2 --- */}
                <PhasePartition title="PHASE 2: Migration Streams (Parallel Work)">
                    {/* Note */}
                    <div className="absolute right-[-20px] top-10 z-30">
                        <NoteBox text="Teams work in parallel here" />
                        <svg className="absolute top-1/2 right-full w-6 h-[1px] overflow-visible">
                            <line x1="0" y1="0" x2="24" y2="0" stroke="#000" strokeDasharray="2,2" />
                        </svg>
                    </div>

                    {/* Synchronization Bar Top (Fork) */}
                    <div className="h-2 w-full bg-black rounded-sm mb-8 relative"></div>

                    <div className="grid grid-cols-3 gap-8 relative">
                        {/* Stream A */}
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-[1px] bg-slate-700 absolute top-[-32px]"></div> {/* Connection to Bar */}
                            <div className="text-xs font-bold mb-2">[Stream A]</div>
                            <ActivityBox label="VIP Setup (C-Level)" sub="Install on mobile, Secret Chat,&#10;Sync Calendars" />
                            <ArrowVertical height={24} />
                            <ActivityBox label="Email Prep (Backend)" sub="Test IMAP/API Sync from GWS/M365&#10;Prepare for Cutover" />
                            <div className="h-8 w-[1px] bg-slate-700 mt-auto"></div> {/* Connection to Bottom Bar */}
                        </div>

                        {/* Stream B */}
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-[1px] bg-slate-700 absolute top-[-32px]"></div>
                            <div className="text-xs font-bold mb-2">[Stream B]</div>
                            <ActivityBox label="HR Data Migration" sub="Import Users, Setup Attendance" />
                            <ArrowVertical height={24} />
                            <ActivityBox label="Workflow Builder" sub="Create Approval Forms (Leave/PO)" />
                            <ArrowVertical height={24} />
                            <ActivityBox label="Drive Migration" sub="Move files to Lark Drive&#10;Set strict permissions" />
                        </div>

                        {/* Stream C */}
                        <div className="flex flex-col items-center">
                            <div className="h-8 w-[1px] bg-slate-700 absolute top-[-32px]"></div>
                            <div className="text-xs font-bold mb-2">[Stream C]</div>
                            <ActivityBox label="Jira to Lark Base" sub="Export CSV -> Import to Kanban" />
                            <ArrowVertical height={24} />
                            <ActivityBox label="Discord Replacement" sub="Voice channels & Webhooks&#10;Server alerts" />
                        </div>
                    </div>

                    {/* Synchronization Bar Bottom (Join) */}
                    <div className="h-2 w-full bg-black rounded-sm mt-8 relative"></div>

                    {/* Draw lines from bottom of last items to join bar */}
                    {/* Implemented via grid absolute lines in columns above for simplicity, or we can use SVG overlay */}
                    <svg className="absolute inset-x-0 bottom-[32px] h-[32px] w-full pointer-events-none" style={{ overflow: 'visible' }}>
                        {/* Lines from bottom of cols to bar */}
                        <line x1="16.66%" y1="-10" x2="16.66%" y2="32" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                        <line x1="50%" y1="-10" x2="50%" y2="32" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                        <line x1="83.33%" y1="-10" x2="83.33%" y2="32" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                    </svg>
                </PhasePartition>

                <ArrowVertical height={32} />

                {/* --- PHASE 3 --- */}
                <PhasePartition title="PHASE 3: People Readiness">
                    <div className="flex flex-col items-center">
                        <ActivityBox label="Vendor Support" sub="Unlock API Limits for upload" />
                        <ArrowVertical height={24} />

                        <ActivityBox label="Manager All-Hands" sub="Demo & mandate: Work on Lark only" />
                        <ArrowVertical height={24} />

                        <ActivityBox label="Pilot Testing" sub="Dev Team & HR Dept" />
                        <ArrowVertical height={24} />

                        <div className="relative flex flex-col items-center w-full">
                            <DecisionDiamond label="Pilot Passed?" />


                            {/* Yes Path */}
                            <div className="absolute top-[80px] left-[calc(50%+10px)] text-xs font-bold">Yes</div>
                            <div className="h-8 w-[1px] bg-slate-700 mt-0"></div> {/* Line down from diamond bottom */}
                            <svg width="20" height="20" className="overflow-visible absolute top-[100px]">
                                <line x1="10" y1="0" x2="10" y2="20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                            </svg>

                            {/* No Path Loop */}
                            <div className="absolute top-[50%] right-[calc(50%+60px)] text-xs font-bold text-red-600">No</div>
                            <div className="absolute right-[calc(50%+70px)] top-[50%] flex items-center flex-row-reverse translate-y-[-50%]">
                                {/* Arrow Line Left */}
                                <div className="w-12 h-[1.5px] bg-slate-700"></div>
                                <ActivityBox label="Fix bugs / adjust flows" extraClasses="w-[160px] text-xs" />
                                {/* Loop Arrow */}
                                <svg className="absolute left-0 top-0 w-[100px] h-[150px]" style={{ left: '0', transform: 'translateX(-100%) translateY(-50%)', overflow: 'visible' }}>
                                    {/* Simple path: from box left -> up -> right -> pilot top */}
                                    <path d="M 160 75 L 160 0 L 220 0" fill="none" stroke="transparent" />
                                    {/* Actually drawing loop is tricky without absolute pixels. 
                                        Let's just show the box to the left. 
                                    */}
                                </svg>
                            </div>
                        </div>

                        <div className="mt-8">
                            <ActivityBox label="Training & Handbook" sub="Distribute how-to guides" />
                        </div>
                    </div>
                </PhasePartition>

                <ArrowVertical height={32} />

                {/* --- PHASE 4 --- */}
                <PhasePartition title="PHASE 4: GO-LIVE (The Cutover)">
                    <div className="flex flex-col items-center">
                        <ActivityBox label="Decision: EXECUTE" sub="Friday Night" />
                        <ArrowVertical height={24} />

                        <ActivityBox label="Standby Support" sub="On-call Engineer" />
                        <ArrowVertical height={24} />

                        <ActivityBox
                            label="CRITICAL: Switch MX Records"
                            sub="Change Email Routing (DNS)"
                        />
                        <ArrowVertical height={24} />

                        <ActivityBox label="Verify Data Integrity" sub="Check Files, Mail, Bots" />
                    </div>
                </PhasePartition>

                <ArrowVertical height={32} />

                {/* --- PHASE 5 --- */}
                <PhasePartition title="PHASE 5: Day 1 & Support">
                    <div className="flex flex-col items-center">
                        <ActivityBox label="Announce: Go-Live!" sub="Stop using LINE/Discord" />
                        <ArrowVertical height={24} />
                        <ActivityBox label="War Room / Helpdesk" sub="On-site support for users" />
                        <ArrowVertical height={24} />
                        <ActivityBox label="Security Monitoring" sub="Check DLP logs & access rights" />
                        <ArrowVertical height={24} />
                        <ActivityBox label="Project Closure" sub="Decommission old tools&#10;Cost saving" />
                    </div>
                </PhasePartition>

                <ArrowVertical height={20} />
                <EndNode />
            </div>
        </div>
    );
}
