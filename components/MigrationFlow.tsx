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

const ArrowDown = ({ height = "h-8" }: { height?: string }) => (
    <div className={`w-0.5 ${height} bg-slate-400 mx-auto relative z-0`}>
        <div className="absolute -bottom-1 -left-[3.5px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-slate-400"></div>
    </div>
);

export default function MigrationFlow() {
    return (
        <div className="w-full bg-slate-50 p-8 rounded-xl overflow-x-auto min-w-[1024px] font-sans text-slate-800">
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
                {/* Increased gap and width to prevent overlap */}
                <div className="relative w-full mx-auto mt-6 mb-8">
                    {/* Branching Lines */}
                    <div className="absolute top-0 left-[12.5%] right-[12.5%] h-0.5 bg-slate-400 z-0"></div>
                    <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-slate-400 -translate-x-1/2 z-0"></div>

                    <div className="grid grid-cols-4 gap-4">
                        {/* Windows */}
                        <div className="flex flex-col items-center pt-6 relative px-2">
                            <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-slate-400 -translate-x-1/2 z-0"></div>
                            <div className="bg-yellow-400 text-yellow-900 text-xs p-3 rounded-lg text-center font-bold w-full shadow-md mb-3 relative z-20">
                                OS = Windows?
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/80 px-1 rounded text-[10px] text-slate-500 font-bold border border-slate-200">Yes</div>
                            </div>
                            <div className="bg-yellow-200 text-yellow-900 text-[11px] p-3 rounded w-full text-center border border-yellow-300 shadow-sm min-h-[3.5rem] flex items-center justify-center font-medium leading-tight z-20">
                                Select Windows Artifact<br />(.bat / script_id_win)
                            </div>
                        </div>

                        {/* Linux */}
                        <div className="flex flex-col items-center pt-6 relative px-2">
                            <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-slate-400 -translate-x-1/2 z-0"></div>
                            <div className="bg-green-600 text-white text-xs p-3 rounded-lg text-center font-bold w-full shadow-md mb-3 relative z-20">
                                OS = Linux?
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/80 px-1 rounded text-[10px] text-slate-500 font-bold border border-slate-200">Yes</div>
                            </div>
                            <div className="bg-green-100 text-green-900 text-[11px] p-3 rounded w-full text-center border border-green-300 shadow-sm min-h-[3.5rem] flex items-center justify-center font-medium leading-tight z-20">
                                Select Linux Artifact<br />(.sh / script_id_linux)
                            </div>
                        </div>

                        {/* macOS */}
                        <div className="flex flex-col items-center pt-6 relative px-2">
                            <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-slate-400 -translate-x-1/2 z-0"></div>
                            <div className="bg-indigo-600 text-white text-xs p-3 rounded-lg text-center font-bold w-full shadow-md mb-3 relative z-20">
                                OS = macOS?
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white/80 px-1 rounded text-[10px] text-slate-500 font-bold border border-slate-200">Yes</div>
                            </div>
                            <div className="bg-indigo-100 text-indigo-900 text-[11px] p-3 rounded w-full text-center border border-indigo-200 shadow-sm min-h-[3.5rem] flex items-center justify-center font-medium leading-tight z-20">
                                Select macOS Artifact<br />(.sh / script_id_mac)
                            </div>
                        </div>

                        {/* Unsupported */}
                        <div className="flex flex-col items-center pt-6 relative px-2">
                            <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-slate-400 -translate-x-1/2 z-0"></div>
                            <div className="bg-red-600 text-white text-xs p-3 rounded-lg text-center font-bold w-full shadow-md mb-3 z-20">
                                Unsupported OS
                            </div>
                            <div className="bg-red-100 text-red-900 text-[11px] p-3 rounded w-full text-center border border-red-200 shadow-sm min-h-[3.5rem] flex items-center justify-center font-medium leading-tight z-20">
                                Stop Playbook + Log
                            </div>
                        </div>
                    </div>

                    {/* Branch Re-merge */}
                    {/* Lines from bottom of first 3 blocks to a horizontal line */}
                    <div className="relative h-8 mt-4">
                        <div className="absolute top-0 left-[12.5%] w-0.5 h-4 bg-slate-400 z-0"></div>
                        <div className="absolute top-0 left-[37.5%] w-0.5 h-4 bg-slate-400 z-0"></div>
                        <div className="absolute top-0 right-[37.5%] w-0.5 h-4 bg-slate-400 z-0"></div>

                        {/* Horizontal collector line */}
                        <div className="absolute top-4 left-[12.5%] right-[37.5%] h-0.5 bg-slate-400 z-0"></div>

                        {/* Final vertical down */}
                        <div className="absolute top-4 left-1/2 w-0.5 h-4 bg-slate-400 -translate-x-1/2 z-0"></div>
                    </div>
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
                {/* Increased gap */}
                <div className="flex justify-center gap-8 w-full max-w-lg mb-4">
                    <div className="bg-blue-200 text-blue-900 border border-blue-300 p-3 rounded text-center flex-1 shadow-sm z-20">
                        <div className="font-bold text-sm">Single Host</div>
                        <div className="text-xs">init_session</div>
                    </div>
                    <div className="bg-blue-200 text-blue-900 border border-blue-300 p-3 rounded text-center flex-1 shadow-sm z-20">
                        <div className="font-bold text-sm">Multiple Hosts</div>
                        <div className="text-xs">batch_init_sessions<br />(queue_offline=true)</div>
                    </div>
                </div>

                {/* Re-merge arrows manually */}
                <div className="relative h-8 w-full max-w-lg mx-auto mb-2">
                    <div className="absolute top-0 left-[25%] w-0.5 h-4 bg-slate-400 z-0"></div>
                    <div className="absolute top-0 right-[25%] w-0.5 h-4 bg-slate-400 z-0"></div>
                    <div className="absolute top-4 left-[25%] right-[25%] h-0.5 bg-slate-400 z-0"></div>
                    <div className="absolute top-4 left-1/2 w-0.5 h-4 bg-slate-400 -translate-x-1/2 z-0"></div>
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
                        <div className="absolute top-1/2 left-0 -translate-x-[110%] -translate-y-1/2 flex items-center z-10">
                            <div className="h-0.5 w-12 bg-slate-400"></div>
                            <div className="bg-red-700 text-white text-xs px-4 py-2 rounded shadow whitespace-nowrap border border-red-800 ml-2">
                                <span className="font-bold mr-1">No</span> Log Error + Exit
                            </div>
                        </div>

                        {/* Connector from diamond to left path */}
                        <div className="absolute top-1/2 left-0 w-0 h-0.5 bg-slate-400 -translate-x-full"></div>
                        {/* Wait, the connector needs to reach the diamond edge. 
                    Diamond width 24 (6rem). Center 12. 
                    Absolute left-0 of 'relative' parent? 
                    Let's make parent large enough or use absolute positioning carefully.
                */}
                    </div>

                    <div className="w-0.5 h-4 bg-slate-400 mx-auto z-0 -mt-2"></div>
                    <div className="bg-white px-1 text-xs text-slate-500 font-bold relative z-20 -mt-3">Yes</div>
                    <div className="w-0.5 h-4 bg-slate-400 mx-auto z-0"></div>
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
                <div className="relative w-full max-w-3xl mx-auto grid grid-cols-2 gap-12 items-start mt-6">
                    {/* Center Splitter Lines */}
                    <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-slate-400 -translate-x-1/2 z-0"></div>
                    <div className="absolute top-0 left-[25%] right-[25%] h-0.5 bg-slate-400 z-0"></div>
                    <div className="absolute top-0 left-[25%] w-0.5 h-6 bg-slate-400 z-0"></div>
                    <div className="absolute top-0 right-[25%] w-0.5 h-6 bg-slate-400 z-0"></div>

                    {/* Left: High Confidence */}
                    <div className="bg-green-700 text-white p-4 rounded shadow text-left text-xs z-20 mt-6 min-h-[6rem]">
                        <div className="border-b border-white/30 pb-2 mb-2 font-bold text-green-100 text-sm">High Confidence / High Risk</div>
                        <div className="font-bold mb-1">Automated Response</div>
                        <ul className="list-disc list-inside opacity-90 space-y-0.5">
                            <li>isolate host</li>
                            <li>block IOC</li>
                        </ul>
                    </div>

                    {/* Right: Low Confidence */}
                    <div className="bg-yellow-400 text-yellow-900 p-4 rounded shadow text-left text-xs z-20 mt-6 min-h-[6rem]">
                        <div className="border-b border-black/10 pb-2 mb-2 font-bold text-sm">Medium / Low Confidence</div>
                        <div className="font-bold mb-1">Semi-Auto Response</div>
                        <ul className="list-disc list-inside opacity-90 space-y-0.5">
                            <li>ticket</li>
                            <li>notify SOC</li>
                        </ul>
                    </div>
                </div>

                {/* Re-merge */}
                <div className="relative h-10 w-full max-w-3xl mx-auto mt-2">
                    <div className="absolute top-0 left-[25%] w-0.5 h-5 bg-slate-400 z-0"></div>
                    <div className="absolute top-0 right-[25%] w-0.5 h-5 bg-slate-400 z-0"></div>
                    <div className="absolute top-5 left-[25%] right-[25%] h-0.5 bg-slate-400 z-0"></div>
                    <div className="absolute top-5 left-1/2 w-0.5 h-5 bg-slate-400 -translate-x-1/2 z-0"></div>
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
