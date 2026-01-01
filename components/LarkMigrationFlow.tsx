import React from 'react';

// --- Reusable UI Components ---

const StartEnd = ({ label }: { label: string }) => (
    <div className="bg-slate-800 text-white px-8 py-2 rounded-full font-bold shadow-md w-32 text-center mx-auto z-20 border border-slate-600 relative">
        {label}
    </div>
);

const PhaseHeader = ({ label }: { label: string }) => (
    <div className="w-full bg-slate-100 border-b-2 border-slate-300 py-3 mb-6 mt-4 text-center">
        <h3 className="text-lg font-extrabold text-slate-700 uppercase tracking-wide whitespace-pre-line">{label}</h3>
    </div>
);

interface ProcessBoxProps {
    label: React.ReactNode;
    role?: 'M' | 'L' | 'IT1' | 'IT2' | 'IT3';
    sub?: React.ReactNode;
    extraClasses?: string;
}

// Color Mappings based on PlantUML Legend
const ROLE_STYLES = {
    M: "bg-red-50 border-red-600 text-red-900",     // Management
    L: "bg-cyan-50 border-blue-600 text-blue-900",   // Lark Support
    IT1: "bg-green-50 border-green-700 text-green-900", // IT Security/Infra
    IT2: "bg-orange-50 border-orange-600 text-orange-900", // IT HR/Admin
    IT3: "bg-purple-50 border-purple-700 text-purple-900", // IT Dev/Training
};

const ProcessBox = ({ label, role, sub, extraClasses = "" }: ProcessBoxProps) => {
    const colorClass = role ? ROLE_STYLES[role] : "bg-white border-slate-400 text-slate-800";

    return (
        <div className={`${colorClass} p-3 rounded-lg shadow-sm border w-full max-w-md mx-auto text-center z-20 relative min-h-[3.5rem] flex flex-col justify-center ${extraClasses}`}>
            <div className="font-bold text-sm leading-tight">{label}</div>
            {sub && <div className="text-xs opacity-90 mt-1 whitespace-pre-line leading-tight border-t border-black/10 pt-1">{sub}</div>}
        </div>
    );
};

const DecisionDiamond = ({ label }: { label: string }) => (
    <div className="relative w-28 h-28 mx-auto flex items-center justify-center z-20 my-2">
        <div className="absolute inset-0 bg-yellow-100 border-2 border-yellow-500 transform rotate-45 shadow-sm"></div>
        <div className="relative z-10 text-yellow-900 text-xs font-bold text-center leading-tight px-4">{label}</div>
    </div>
);

// --- SVG Primitives ---

const SvgDefs = () => (
    <svg width="0" height="0" className="absolute">
        <defs>
            <marker
                id="lark-arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
            >
                <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
            </marker>
        </defs>
    </svg>
);

const ArrowVertical = ({ height = 32 }: { height?: number }) => (
    <div className="flex justify-center w-full relative z-0" style={{ height: `${height}px` }}>
        <svg width="20" height={height} className="overflow-visible">
            <line
                x1="10"
                y1="0"
                x2="10"
                y2={height - 5}
                stroke="#475569"
                strokeWidth="2"
                markerEnd="url(#lark-arrowhead)"
            />
        </svg>
    </div>
);

// --- Main Component ---

export default function LarkMigrationFlow() {
    return (
        <div className="w-full bg-white p-8 rounded-xl overflow-x-auto min-w-[1024px] font-sans text-slate-800 shadow-2xl border border-slate-200">
            <SvgDefs />

            <div className="text-center mb-8">
                <h1 className="text-2xl font-black text-slate-800">Project Unity: Migration Roadmap</h1>
                <p className="text-slate-500 italic text-sm">(Scroll Down to Read)</p>
            </div>

            <div className="flex flex-col items-center space-y-0 text-sm w-full max-w-5xl mx-auto">

                <StartEnd label="Start" />
                <ArrowVertical height={24} />

                {/* --- LEGEND --- */}
                <div className="border border-slate-300 rounded p-4 mb-8 bg-slate-50 w-full max-w-2xl">
                    <div className="font-bold border-b border-slate-300 pb-2 mb-2">LEGEND (Color Code):</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-50 border border-red-600"></div> Management / CTO</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-50 border border-blue-600"></div> Lark Support</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-50 border border-green-700"></div> IT 1: Security/Infra</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-50 border border-orange-600"></div> IT 2: HR/Admin</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-50 border border-purple-700"></div> IT 3: Dev/Training</div>
                    </div>
                </div>

                {/* --- PHASE 1 --- */}
                <div className="w-full border-2 border-slate-200 rounded-xl p-6 bg-slate-50 relative">
                    <div className="absolute -top-3 left-6 bg-slate-50 px-2 font-bold text-slate-500">PHASE 1: PREPARATION</div>

                    <div className="flex flex-col items-center">
                        <ProcessBox label="Kick-off & Strategy" sub="(Timeline: 4-6 Weeks)" role="M" />
                        <ArrowVertical />

                        <ProcessBox label="Classify Data Sensitivity" sub="(Critical / Confidential / Internal)" role="M" />
                        <ArrowVertical />

                        <ProcessBox label="Request Security Docs" sub="& Best Practices" role="L" />
                        <ArrowVertical />

                        <ProcessBox label="Setup Lark Tenant" sub="& Domain Verification" role="IT1" />
                        <ArrowVertical />

                        <ProcessBox
                            label="Security Setup:"
                            sub="- Enforce MFA (2-Factor)&#10;- Enable Watermark&#10;- Block Downloads"
                            role="IT1"
                            extraClasses="text-left items-start pl-6"
                        />
                    </div>
                </div>

                <ArrowVertical height={40} />

                {/* --- PHASE 2 --- */}
                <div className="w-full border-2 border-slate-200 rounded-xl p-6 bg-slate-50 relative mt-4">
                    <div className="absolute -top-3 left-6 bg-slate-50 px-2 font-bold text-slate-500 text-center">
                        PHASE 2: MIGRATION <span className="text-xs font-normal">(Tasks run in Parallel)</span>
                    </div>

                    {/* Note Box */}
                    <div className="absolute right-4 top-4 bg-[#FEFECE] border border-[#D4D433] p-2 text-xs rounded shadow-sm max-w-[120px] text-center opacity-80 z-30">
                        Teams IT1, IT2, IT3 work simultaneously
                    </div>

                    <div className="relative w-full mt-8 mb-4">
                        {/* SVG Splitting Lines */}
                        <div className="absolute inset-0 pointer-events-none" style={{ top: '-20px', height: '100px' }}>
                            <svg width="100%" height="100%" className="overflow-visible">
                                {/* Stem */}
                                <line x1="50%" y1="0" x2="50%" y2="20" stroke="#475569" strokeWidth="2" />
                                {/* Fork Bar */}
                                <line x1="16.66%" y1="20" x2="83.33%" y2="20" stroke="#475569" strokeWidth="2" />
                                {/* Down to Columns */}
                                <line x1="16.66%" y1="20" x2="16.66%" y2="40" stroke="#475569" strokeWidth="2" markerEnd="url(#lark-arrowhead)" />
                                <line x1="50%" y1="20" x2="50%" y2="40" stroke="#475569" strokeWidth="2" markerEnd="url(#lark-arrowhead)" />
                                <line x1="83.33%" y1="20" x2="83.33%" y2="40" stroke="#475569" strokeWidth="2" markerEnd="url(#lark-arrowhead)" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-3 gap-6 relative z-10 pt-10">
                            {/* Stream A */}
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-xs text-slate-500 mb-2">[Stream A: Infra & VIP]</div>
                                <ProcessBox label="Setup Mobile for C-Level" sub="& Secret Chat" role="IT1" />
                                <ArrowVertical />
                                <ProcessBox label="Test Mail Sync (IMAP/API)" sub="Prepare for Cutover" role="IT1" />
                            </div>

                            {/* Stream B */}
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-xs text-slate-500 mb-2">[Stream B: Business Ops]</div>
                                <ProcessBox label="Import HR Data" sub="& Setup Attendance" role="IT2" />
                                <ArrowVertical />
                                <ProcessBox label="Build Approval Forms" sub="(Leave / PO / Expense)" role="IT2" />
                                <ArrowVertical />
                                <ProcessBox label="Move Files to Lark Drive" sub="& Set Permissions" role="IT2" />
                            </div>

                            {/* Stream C */}
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-xs text-slate-500 mb-2">[Stream C: Tech Team]</div>
                                <ProcessBox label="Export Jira -> Lark Base" sub="(Kanban Board)" role="IT3" />
                                <ArrowVertical />
                                <ProcessBox label="Setup Server Alerts" sub="(Replace Discord)" role="IT3" />
                            </div>
                        </div>

                        {/* Merge Lines */}
                        <div className="relative h-12 w-full mt-4">
                            <svg className="absolute inset-0 overflow-visible" width="100%" height="100%">
                                {/* Drops from columns to baseline */}
                                <line x1="16.66%" y1="0" x2="16.66%" y2="20" stroke="#475569" strokeWidth="2" />
                                <line x1="50%" y1="0" x2="50%" y2="20" stroke="#475569" strokeWidth="2" />
                                <line x1="83.33%" y1="0" x2="83.33%" y2="20" stroke="#475569" strokeWidth="2" />
                                {/* Collector */}
                                <line x1="16.66%" y1="20" x2="83.33%" y2="20" stroke="#475569" strokeWidth="2" />
                                {/* Final Output */}
                                <line x1="50%" y1="20" x2="50%" y2="100%" stroke="#475569" strokeWidth="2" markerEnd="url(#lark-arrowhead)" />
                            </svg>
                        </div>
                    </div>
                </div>

                <ArrowVertical height={40} />

                {/* --- PHASE 3 --- */}
                <div className="w-full border-2 border-slate-200 rounded-xl p-6 bg-slate-50 relative mt-4">
                    <div className="absolute -top-3 left-6 bg-slate-50 px-2 font-bold text-slate-500">PHASE 3: READINESS</div>

                    <div className="flex flex-col items-center">
                        <ProcessBox label="Unlock API Limits" sub="for Mass Upload" role="L" />
                        <ArrowVertical />

                        <ProcessBox label="Manager All-Hands" sub="Mandate: 'Lark Only'" role="M" />
                        <ArrowVertical />

                        <ProcessBox label="Pilot Testing" sub="(Dev Team & HR)" role="IT3" />
                        <ArrowVertical />

                        {/* Decision */}
                        <div className="relative w-full flex flex-col items-center my-2">
                            <DecisionDiamond label="Pilot Passed?" />

                            {/* Yes Path (Down) */}
                            <div className="absolute top-[85%] left-[55%] font-bold text-xs text-slate-600 bg-white px-1 z-20">Yes</div>
                            <ArrowVertical height={40} />

                            {/* No Path (Loop Back) */}
                            <div className="absolute top-1/2 right-[50%] w-[50%] h-[120px] pointer-events-none">
                                <svg width="100%" height="100%" className="overflow-visible absolute top-0 left-0">
                                    {/* Line going left from Diamond */}
                                    <path
                                        d="M -56 0 L -120 0 L -120 100 L 0 100"
                                        fill="none"
                                        stroke="#475569"
                                        strokeWidth="2"
                                        markerEnd="url(#lark-arrowhead)"
                                        transform="translate(0, 0)" // This needs relative coordinates. 
                                    // Creating a dedicated simpler SVG for the loop might be safer than absolute layout guessing.
                                    />
                                </svg>
                            </div>
                            {/* Re-implementing 'No' loop cleanly with absolute positioning relative to container */}
                            <div className="absolute top-1/2 right-[50%] mr-[60px] flex items-center h-0 z-0">
                                {/* Line Left */}
                                <div className="w-16 h-0.5 bg-slate-600"></div>
                                {/* Box */}
                                <div className="absolute right-[100%] top-1/2 -translate-y-1/2 flex flex-col items-end pr-4">
                                    {/* Label */}
                                    <div className="bg-white text-xs font-bold text-red-600 px-1 mb-1 shadow-sm border border-red-200">No</div>
                                    {/* Fix Bugs Box */}
                                    <div className={`${ROLE_STYLES['IT3']} p-2 text-xs rounded shadow w-32 text-center`}>
                                        Fix Bugs / Adjust
                                    </div>
                                    {/* Loop back arrow logic is complex visually. 
                                           PlantUML 'No' goes from Diamond -> Side -> Process -> Back to Pilot? 
                                           The prompt says: 
                                           if (Pilot Passed?) then (Yes)
                                              :Distribute Manuals...;
                                           else (No)
                                              :Fix Bugs / Adjust;
                                           endif
                                           Wait, PlantUML 'else' usually merges back.
                                           If 'Fixed', does it re-test? usually yes.
                                           Let's draw: Diamond --(No)--> Fix Bugs --(arrow)--> Pilot Testing (top).
                                       */}
                                </div>
                            </div>
                            {/* 
                                 Correct Loop Implementation:
                                 Right side 'No' -> Fix Bugs -> Up -> Right -> Top of Pilot.
                                 Let's keep it simple: Just side branch for now, or use absolute SVG to draw the loop.
                              */}
                            <div className="absolute top-1/2 right-[50%] w-[200px] h-[160px] -translate-y-[50%] pointer-events-none z-0 hidden lg:block">
                                {/* Let's skip complex loop for now and just show the side node as "No" branch? 
                                      Actually loop is better.
                                      Center of diamond is (0,0) locally? No.
                                  */}
                            </div>
                        </div>

                        {/* To make the 'No' branch visible and semantic:
                             We'll place "Fix Bugs" to the RIGHT of Diamond.
                             Diamond -> Right Arrow -> Fix Bugs -> Up Arrow -> Left Arrow -> Top of Pilot?
                             Or simpler as PlantUML does: Just a side branch that merges back below?
                             PlantUML 'if else' implies merge at bottom unless 'stop'. 
                             Let's assume it merges back or loops.
                             The Prompt diagram text:
                                else (No)
                                    :Fix Bugs / Adjust<<IT3>>;
                                endif
                             This implies it merges to the end of the `if`. 
                             But logicwise, if pilot fails, you fix and re-test.
                             Design choice: Put "Fix Bugs" on the side, and draw arrow flowing back to Pilot Entry?
                             Or just display "Fix Bugs" and assume workflow implies loop.
                             I will place "Fix Bugs" to the Left side.
                          */}
                        <div className="absolute top-1/2 right-[55%] -translate-y-1/2 flex items-center flex-row-reverse pr-16 z-10 w-64 justify-start">
                            {/* Line from diamond */}
                            <div className="h-0.5 flex-1 bg-slate-500 relative">
                                <div className="absolute -top-3 right-2 text-xs font-bold text-red-600 bg-white px-1">No</div>
                            </div>
                            {/* Node */}
                            <div className={`${ROLE_STYLES['IT3']} p-2 text-xs rounded shadow w-32 text-center z-20`}>
                                Fix Bugs / Adjust
                            </div>
                            {/* Loop Back Line (Up and Right) */}
                            <svg className="absolute w-[120%] h-[200px] -top-[160px] right-0 pointer-events-none -z-10" style={{ right: '-20px' }}>
                                <path
                                    d="M 50 160 L 20 160 L 20 10 Q 20 0 30 0 L 200 0"
                                    fill="none"
                                    stroke="#94a3b8"
                                    strokeWidth="2"
                                    strokeDasharray="4"
                                    markerEnd="url(#lark-arrowhead)"
                                />
                            </svg>
                        </div>


                        <ProcessBox label="Distribute Manuals" sub="& Training Video" role="IT3" />
                    </div>
                </div>

                <ArrowVertical height={40} />

                {/* --- PHASE 4 --- */}
                <div className="w-full border-2 border-slate-200 rounded-xl p-6 bg-slate-50 relative mt-4">
                    <div className="absolute -top-3 left-6 bg-slate-50 px-2 font-bold text-slate-500">PHASE 4: GO-LIVE</div>

                    <div className="flex flex-col items-center">
                        <ProcessBox label="Decision: EXECUTE" sub="(Friday Night)" role="M" />
                        <ArrowVertical />

                        <ProcessBox label="Standby Support" sub="(On-Call Engineer)" role="L" />
                        <ArrowVertical />

                        <ProcessBox
                            label="CRITICAL TASK:"
                            sub="Switch MX Records (DNS)"
                            role="IT1"
                            extraClasses="font-black border-2 border-green-700 bg-green-100 ring-2 ring-green-200 ring-offset-2"
                        />
                        <ArrowVertical />

                        <ProcessBox label="Verify Data Integrity" sub="(Files / Mail / Bots)" role="IT2" />
                    </div>
                </div>

                <ArrowVertical height={40} />

                {/* --- PHASE 5 --- */}
                <div className="w-full border-2 border-slate-200 rounded-xl p-6 bg-slate-50 relative mt-4">
                    <div className="absolute -top-3 left-6 bg-slate-50 px-2 font-bold text-slate-500">PHASE 5: DAY 1</div>

                    <div className="flex flex-col items-center">
                        <ProcessBox label="Announce: Go-Live!" sub="Stop Old Tools" role="M" />
                        <ArrowVertical />

                        <ProcessBox label="On-site Support" sub="(Helpdesk)" role="IT3" />
                        <ArrowVertical />

                        <ProcessBox label="Monitor Security Logs" sub="(Data Leak Check)" role="IT1" />
                        <ArrowVertical />

                        <ProcessBox label="Project Closure" sub="Cancel Old Licenses" role="M" />
                    </div>
                </div>

                <ArrowVertical height={32} />
                <StartEnd label="End" />

            </div>
        </div>
    );
}
