'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/lib/motion';

export default function TechStackStrip() {
    return (
        <section className="w-full border-b border-white/5 bg-background/50 backdrop-blur-sm py-8 sm:py-10 overflow-hidden">
            <div className="max-w-container mx-auto px-4 xs:px-6 sm:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={fadeInUp}
                    className="flex justify-center items-center"
                >
                    <div className="relative w-full max-w-2xl h-16 sm:h-20 transition-all duration-500">
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
