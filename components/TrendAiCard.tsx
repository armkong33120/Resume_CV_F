'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, FileCheck, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function TrendAiCard() {
    const { language } = useLanguage();

    // Using ChatGPT, Copilot, Gemini style colors for the icons
    const icons = [
        {
            name: "ChatGPT",
            color: "text-[#10A37F] bg-[#10A37F]/10",
            icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.33 2.5a.6.6 0 0 1 .49.09l.48.27 4.54 2.62a2.47 2.47 0 0 1 1 3.51l-4.54 2.62a.6.6 0 0 0-.29.49v5.24a.6.6 0 0 1-.6.6h-5.24a.6.6 0 0 1-.52-.3l-4.54-7.86a2.47 2.47 0 0 1 0-2.47L7.65 4.5a.6.6 0 0 0 .22-.49V2.5a.6.6 0 0 1 .6-.6h3.86zM9.54 6.72a.6.6 0 0 0-.6.6v7.86a.6.6 0 0 0 .6.6h5.24a.6.6 0 0 0 .6-.6V7.32a.6.6 0 0 0-.6-.6H9.54z" /></svg> // Simplified placeholder
        },
        {
            name: "Copilot",
            color: "text-[#EA4C89] bg-[#EA4C89]/10",
            icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><circle cx="12" cy="12" r="10" /></svg> // Simplified placeholder
        },
        {
            name: "Gemini",
            color: "text-[#1A73E8] bg-[#1A73E8]/10",
            icon: <Sparkles className="w-6 h-6" />
        },
    ];

    const checklist = [
        language === 'th' ? "ใช้ AI วิเคราะห์ด้านเทคนิคและโค้ดดิ้ง" : "Use AI to analyze coding and technical.",
        language === 'th' ? "ใช้ AI ตรวจสอบเอกสารอนุมัติ" : "Use AI to analyze approval documents.",
        language === 'th' ? "ใช้ AI วิเคราะห์แผนงานและความเสี่ยง" : "Use AI to analyze plans and risks."
    ];

    return (
        <div className="w-full max-w-lg mx-auto mt-12 mb-8 print:mt-4 print:mb-4">
            <motion.div
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-br from-background to-foreground/5 border border-border rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden print:shadow-none print:border-2 print:border-black"
            >
                {/* Glow effect */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        Trend-based AI 2025
                    </h3>
                    <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded uppercase tracking-wider border border-red-500/20">
                        NEW
                    </span>
                </div>

                <div className="flex justify-center gap-6 mb-8">
                    {/* Recreating the 3 icons visuals roughly using placeholder SVGs/Icons for now to match style */}
                    {/* OpenAI */}
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center border border-border">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-foreground" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0847 5.7155-3.3016-1.4163-3.1271L10 17.3383v3.2519a4.5324 4.5324 0 0 1-2.1693-4.5244 4.5324 4.5324 0 0 1 3.5292 6.6493zm6.5656-7.1477c-.9286 1.625-2.6105 2.535-4.4334 2.535a4.4755 4.4755 0 0 1-2.8715-.7585l.1419-.0847 3.3283-1.9216 1.4162-3.1271-1.3533 5.4326a4.5324 4.5324 0 0 1 2.39-3.4184 4.5324 4.5324 0 0 1 1.3918 3.0039zm-6.5656-7.1477a4.5324 4.5324 0 0 1 6.6985 2.125l-2.0006 1.155-1.4163 3.1271-3.2818-1.8948V5.0116a4.5324 4.5324 0 0 1 2.0673-1.4423zM4.9807 7.2809a4.5324 4.5324 0 0 1 2.39 3.4184 4.5324 4.5324 0 0 1-4.0084 1.7063l2.0006-1.155 1.4163-3.1271-5.6983 3.2929.0837-3.1365z" /></svg>
                    </div>
                    {/* Copilot */}
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center border border-border">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#EA4C89]" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" /></svg>
                    </div>
                    {/* Gemini */}
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center border border-border">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#1A73E8]" fill="currentColor"><path d="M19 6.5a2.5 2.5 0 0 0-2.5-2.5h-5v-2h-3v2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.5zm-5 7.5h-4v-1h4v1zm0-2h-4v-1h4v1z" /></svg>
                    </div>
                </div>

                <div className="space-y-4">
                    {checklist.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                        >
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-green-500">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="text-base font-medium text-foreground/80">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
