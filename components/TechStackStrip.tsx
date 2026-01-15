'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TechStackStrip() {
    return (
        <section className="w-full border-b border-white/5 bg-background/50 backdrop-blur-sm py-8 sm:py-10 overflow-hidden">
            <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex justify-center items-center"
                >
                    <div className="relative w-full max-w-2xl h-16 sm:h-20 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <Image
                            src="/images/tech-logos.png"
                            alt="Certifications: Cisco, CompTIA, macOS, Windows Server"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
