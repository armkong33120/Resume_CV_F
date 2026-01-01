import React from 'react';

// Reusable Components
const StartEnd = ({ label }: { label: string }) => (
    <div className="bg-green-600 text-white px-8 py-2 rounded-full font-bold shadow-md w-32 text-center mx-auto z-20 border border-green-700 relative">
        {label}
    </div>
);

const ProcessBox = ({ label, sub, color = "bg-blue-700", textColor = "text-white" }: { label: string, sub?: React.ReactNode, color?: string, textColor?: string }) => (
    <div className={`${color} ${textColor} p-3 rounded shadow-md border border-black/10 w-full max-w-md mx-auto text-center z-20 relative min-h-[3rem] flex flex-col justify-center`}>
        <div className="font-bold text-sm leading-tight">{label}</div>
        {sub && <div className="text-xs opacity-90 mt-1 whitespace-pre-line leading-tight">{sub}</div>}
    </div>
);

const DecisionDiamond = ({ label, color = "bg-blue-700" }: { label: string, color?: string }) => (
    <div className="relative w-24 h-24 mx-auto flex items-center justify-center z-20 my-2">
        <div className={`absolute inset-0 ${color} transform rotate-45 shadow-md border border-white/20`}></div>
        <div className="relative z-10 text-white text-xs font-bold text-center leading-tight px-2">{label}</div>
    </div>
);

const SvgDefs = () => (
    <svg width="0" height="0" className="absolute">
        <defs>
            <marker
                id="flow-arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
            >
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
        </defs>
    </svg>
);

const ArrowVertical = ({ height = 32 }: { height?: number }) => (
    <div className="flex justify-center w-full" style={{ height: `${height}px` }}>
        <svg width="20" height={height} className="overflow-visible">
            <line
                x1="10"
                y1="0"
                x2="10"
                y2={height - 5}
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#flow-arrowhead)"
            />
        </svg>
    </div>
);



const ArrowLeft = ({ width = 48 }: { width?: number }) => (
    <div className="flex items-center justify-center" style={{ width: `${width}px` }}>
        <svg width={width} height="20" className="overflow-visible">
            <line
                x1={width}
                y1="10"
                x2="5"
                y2="10"
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#flow-arrowhead)"
            />
        </svg>
    </div>
);

const ArrowDown = ({ height = "h-8" }: { height?: string }) => {
    const numHeight = height === "h-4" ? 16 : height === "h-6" ? 24 : 32;
    return <ArrowVertical height={numHeight} />;
};

export default function MigrationFlow() {
    return (
        <div className="w-full bg-slate-50 p-8 rounded-xl overflow-x-auto min-w-[1024px] font-sans text-slate-800">
            <SvgDefs />
            <div className="flex flex-col items-center space-y-0 text-sm w-full max-w-4xl mx-auto">

                {/* Start */}
                <StartEnd label="Start" />
                <ArrowDown />

                {/* Alert Received */}
                <ProcessBox
                    label="Alert Received from SIEM / EDR"
                    color="bg-orange-200"
                    textColor="text-orange-900 border-orange-300"
                />
                <ArrowDown />

                {/* Normalize */}
                <ProcessBox
                    label="Normalize Alert Fields"
                    sub="(device_id, alert_id, severity, asset_context)"
                />
                <ArrowDown />

                {/* Enrich */}
                <ProcessBox
                    label="Enrich Context"
                    sub="- VA severity&#10;- Asset criticality&#10;- Risk score"
                />
                <ArrowDown />

                {/* Get Device Details */}
                <ProcessBox
                    label="Get Device Details via Falcon API"
                    sub="(GET /devices/entities/devices/v2)"
                />
                <ArrowDown />

                {/* Detect OS */}
                <ProcessBox label="Detect OS Platform" />

                {/* -- OS BRANCHING -- */}
                <div className="relative w-full mx-auto mt-8 mb-4">
                    {/* SVG Connector layer for Split */}
                    <div className="absolute inset-0 pointer-events-none" style={{ top: '-24px', height: '100px' }}>
                        <svg width="100%" height="100%" className="overflow-visible">
                            {/* Stem from top */}
                            <line x1="50%" y1="0" x2="50%" y2="24" stroke="#94a3b8" strokeWidth="2" />
                            {/* Horizontal distribution */}
                            <line x1="12.5%" y1="24" x2="87.5%" y2="24" stroke="#94a3b8" strokeWidth="2" />
                            {/* Drops to columns */}
                            <line x1="12.5%" y1="24" x2="12.5%" y2="48" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                            <line x1="37.5%" y1="24" x2="37.5%" y2="48" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                            <line x1="62.5%" y1="24" x2="62.5%" y2="48" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                            <line x1="87.5%" y1="24" x2="87.5%" y2="48" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                        </svg>
                    </div>

                    <div className="grid grid-cols-4 gap-4 relative z-10 pt-8">
                        {/* Windows */}
                        <div className="flex flex-col items-center">
                            <div className="bg-yellow-400 text-yellow-900 text-xs p-3 rounded-lg text-center font-bold w-full shadow-md mb-3 relative min-h-[3rem] flex items-center justify-center">
                                OS = Windows?
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/80 px-1 rounded text-[10px] text-slate-500 font-bold border border-slate-200">Yes</div>
                            </div>
                            <div className="bg-yellow-200 text-yellow-900 text-[11px] p-3 rounded w-full text-center border border-yellow-300 shadow-sm min-h-[3.5rem] flex items-center justify-center font-medium leading-tight">
                                Select Windows Artifact<br />(.bat / script_id_win)
                            </div>
                        </div>

                        {/* Linux */}
                        <div className="flex flex-col items-center">
                            <div className="bg-green-600 text-white text-xs p-3 rounded-lg text-center font-bold w-full shadow-md mb-3 relative min-h-[3rem] flex items-center justify-center">
                                OS = Linux?
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/80 px-1 rounded text-[10px] text-slate-500 font-bold border border-slate-200">Yes</div>
                            </div>
                            <div className="bg-green-100 text-green-900 text-[11px] p-3 rounded w-full text-center border border-green-300 shadow-sm min-h-[3.5rem] flex items-center justify-center font-medium leading-tight">
                                Select Linux Artifact<br />(.sh / script_id_linux)
                            </div>
                        </div>

                        {/* macOS */}
                        <div className="flex flex-col items-center">
                            <div className="bg-indigo-600 text-white text-xs p-3 rounded-lg text-center font-bold w-full shadow-md mb-3 relative min-h-[3rem] flex items-center justify-center">
                                OS = macOS?
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/80 px-1 rounded text-[10px] text-slate-500 font-bold border border-slate-200">Yes</div>
                            </div>
                            <div className="bg-indigo-100 text-indigo-900 text-[11px] p-3 rounded w-full text-center border border-indigo-200 shadow-sm min-h-[3.5rem] flex items-center justify-center font-medium leading-tight">
                                Select macOS Artifact<br />(.sh / script_id_mac)
                            </div>
                        </div>

                        {/* Unsupported */}
                        <div className="flex flex-col items-center">
                            <div className="bg-red-600 text-white text-xs p-3 rounded-lg text-center font-bold w-full shadow-md mb-3 min-h-[3rem] flex items-center justify-center">
                                Unsupported OS
                            </div>
                            <div className="bg-red-100 text-red-900 text-[11px] p-3 rounded w-full text-center border border-red-200 shadow-sm min-h-[3.5rem] flex items-center justify-center font-medium leading-tight">
                                Stop Playbook + Log
                            </div>
                        </div>
                    </div>
                </div>

                {/* Branch Re-merge */}
                <div className="relative h-12 w-full mb-4">
                    <svg className="absolute inset-0 overflow-visible" width="100%" height="100%">
                        {/* Lines from bottom of cols 1, 2, 3 - assuming grid spacing */}
                        {/* We use the same % centers as above: 12.5, 37.5, 62.5 */}
                        <line x1="12.5%" y1="0" x2="12.5%" y2="16" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="37.5%" y1="0" x2="37.5%" y2="16" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="62.5%" y1="0" x2="62.5%" y2="16" stroke="#94a3b8" strokeWidth="2" />

                        {/* Collector Line */}
                        <line x1="12.5%" y1="16" x2="62.5%" y2="16" stroke="#94a3b8" strokeWidth="2" />

                        {/* Center Logic: The center of the diagram is 50%. The merge of 1,2,3 is nominally 37.5%? 
                            The original code merged to 50%.
                            Let's merge to 50% for visual symmetry if the next step is central.
                            The next box "Pre-Execution Guardrails" is central.
                            So we line from bottom of collector to 50%.
                        */}
                        <line x1="37.5%" y1="16" x2="50%" y2="16" stroke="#94a3b8" strokeWidth="2" /> {/* Shim to center if needed? No, just draw from center of the group? */}

                        {/* Actually, if we merge 1,2,3, the logical center is 37.5%. 
                            But we want to go to 50% (main axis). 
                            So we extend the collector to 50%? 
                            Line from 12.5% to 62.5% covers the range. 
                            50% is 'inside' that range? Yes.
                            So we can just drop down from 50%.
                         */}
                        <line x1="50%" y1="16" x2="50%" y2="100%" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                    </svg>
                </div>

                {/* Pre-Execution Guardrails */}
                <ProcessBox
                    label="Pre-Execution Guardrails"
                    sub="- OS allowlist&#10;- Artifact checksum&#10;- Approval gate (if risky)"
                />
                <ArrowDown />

                {/* Init RTR */}
                <ProcessBox label="Init RTR Session" />
                <ArrowDown />

                {/* Single/Multiple Split */}
                {/* Single/Multiple Split */}
                <div className="relative w-full max-w-lg mx-auto mb-4 mt-8">
                    <div className="absolute inset-0 pointer-events-none" style={{ top: '-24px', height: '100px' }}>
                        <svg width="100%" height="100%" className="overflow-visible">
                            {/* Stem */}
                            <line x1="50%" y1="0" x2="50%" y2="24" stroke="#94a3b8" strokeWidth="2" />
                            {/* Distribution */}
                            <line x1="25%" y1="24" x2="75%" y2="24" stroke="#94a3b8" strokeWidth="2" />
                            {/* Drops */}
                            <line x1="25%" y1="24" x2="25%" y2="48" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                            <line x1="75%" y1="24" x2="75%" y2="48" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                        </svg>
                    </div>

                    <div className="flex justify-center gap-8 pt-8 relative z-10">
                        <div className="bg-blue-200 text-blue-900 border border-blue-300 p-3 rounded text-center flex-1 shadow-sm z-20">
                            <div className="font-bold text-sm">Single Host</div>
                            <div className="text-xs">init_session</div>
                        </div>
                        <div className="bg-blue-200 text-blue-900 border border-blue-300 p-3 rounded text-center flex-1 shadow-sm z-20">
                            <div className="font-bold text-sm">Multiple Hosts</div>
                            <div className="text-xs">batch_init_sessions<br />(queue_offline=true)</div>
                        </div>
                    </div>
                </div>

                {/* Re-merge arrows manually */}
                <div className="relative h-12 w-full max-w-lg mx-auto mb-2">
                    <svg className="absolute inset-0 overflow-visible" width="100%" height="100%">
                        <line x1="25%" y1="0" x2="25%" y2="16" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="75%" y1="0" x2="75%" y2="16" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="25%" y1="16" x2="75%" y2="16" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="50%" y1="16" x2="50%" y2="100%" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                    </svg>
                </div>

                {/* RTR Admin: PUT */}
                <ProcessBox
                    label="RTR Admin Command: PUT File"
                    sub="(put <put_file_id>)"
                    color="bg-orange-500"
                />

                {/* Diamond: Yes/No logic */}
                <div className="relative my-4 w-full flex flex-col items-center">
                    <ArrowDown height="h-4" />

                    <div className="relative">
                        <DecisionDiamond label="Success?" color="bg-blue-800" />

                        {/* No Path (Left) */}
                        <div className="absolute top-1/2 right-[100%] mr-0 flex items-center z-0">
                            <div className="flex items-center flex-row-reverse">
                                <ArrowLeft width={48} />
                            </div>
                            <div className="bg-red-700 text-white text-xs px-4 py-2 rounded shadow whitespace-nowrap border border-red-800 ml-2 relative z-20">
                                <span className="font-bold mr-1">No</span> Log Error + Exit
                            </div>
                        </div>
                    </div>

                    <div className="relative z-0 -mt-1">
                        <ArrowDown height="h-8" />
                        <div className="absolute top-1 left-3 bg-white px-1 text-xs text-slate-500 font-bold z-20">Yes</div>
                    </div>
                </div>

                {/* RTR Admin: Run Script */}
                <ProcessBox
                    label="RTR Admin Command: Run Script"
                    sub="(runscript -CloudFile=<script_id>)"
                    color="bg-orange-600"
                />
                <ArrowDown />

                {/* Collect Result */}
                <ProcessBox
                    label="Collect Execution Result"
                    sub="- stdout / stderr&#10;- or file + get"
                />
                <ArrowDown />

                {/* Send Result */}
                <ProcessBox
                    label="Send Result to Central Server API"
                    sub="(result + correlation_id)"
                />
                <ArrowDown />

                {/* Diamond Split: High / Med Low */}
                {/* Diamond Split: High / Med Low */}
                <div className="relative w-full max-w-3xl mx-auto mt-8">
                    <div className="absolute inset-0 pointer-events-none" style={{ top: '-24px', height: '100px' }}>
                        <svg width="100%" height="100%" className="overflow-visible">
                            <line x1="50%" y1="0" x2="50%" y2="24" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="25%" y1="24" x2="75%" y2="24" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="25%" y1="24" x2="25%" y2="48" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                            <line x1="75%" y1="24" x2="75%" y2="48" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                        </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-12 items-start relative z-10 pt-8">
                        {/* Left: High Confidence */}
                        <div className="bg-green-700 text-white p-4 rounded shadow text-left text-xs z-20 min-h-[6rem]">
                            <div className="border-b border-white/30 pb-2 mb-2 font-bold text-green-100 text-sm">High Confidence / High Risk</div>
                            <div className="font-bold mb-1">Automated Response</div>
                            <ul className="list-disc list-inside opacity-90 space-y-0.5">
                                <li>isolate host</li>
                                <li>block IOC</li>
                            </ul>
                        </div>

                        {/* Right: Low Confidence */}
                        <div className="bg-yellow-400 text-yellow-900 p-4 rounded shadow text-left text-xs z-20 min-h-[6rem]">
                            <div className="border-b border-black/10 pb-2 mb-2 font-bold text-sm">Medium / Low Confidence</div>
                            <div className="font-bold mb-1">Semi-Auto Response</div>
                            <ul className="list-disc list-inside opacity-90 space-y-0.5">
                                <li>ticket</li>
                                <li>notify SOC</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Re-merge */}
                <div className="relative h-12 w-full max-w-3xl mx-auto mt-2">
                    <svg className="absolute inset-0 overflow-visible" width="100%" height="100%">
                        <line x1="25%" y1="0" x2="25%" y2="16" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="75%" y1="0" x2="75%" y2="16" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="25%" y1="16" x2="75%" y2="16" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="50%" y1="16" x2="50%" y2="100%" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#flow-arrowhead)" />
                    </svg>
                </div>

                {/* Audit Log */}
                <ProcessBox label="Audit Log & Close Incident" />
                <ArrowDown />

                {/* End */}
                <StartEnd label="End" />

            </div>
        </div>
    );
}
