'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';

export default function TrendAiCard() {
    const { language } = useLanguage();

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

                <div className="flex justify-center items-center gap-8 mb-8">
                    {/* ChatGPT */}
                    <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                            src="/images/logo-chatgpt.png"
                            alt="ChatGPT"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Copilot */}
                    <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                            src="/images/logo-copilot.png"
                            alt="Copilot"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {/* Gemini */}
                    <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                            src="/images/logo-gemini.png"
                            alt="Gemini"
                            fill
                            className="object-contain"
                        />
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
