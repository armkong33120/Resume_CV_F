'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Brain, FileCheck, ShieldCheck } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function TrendAiCard() {
    const { language } = useLanguage();

                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex justify-center items-center gap-4">
                        <div className="relative w-full h-12">
                            <Image
                                src="/images/ai-logos-1.png"
                                alt="ChatGPT, Copilot, Gemini"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                         <div className="relative w-full h-12">
                            <Image
                                src="/images/ai-logos-2.png"
                                alt="Claude, AI Tools"
                                fill
                                className="object-contain"
                            />
                        </div>
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
            </motion.div >
        </div >
    );
}
