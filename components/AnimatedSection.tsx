"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { DURATION, EASE, fadeInUp, viewportOnce } from "@/lib/motion";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default function AnimatedSection({
    children,
    className,
    id,
    delay = 0
}: AnimatedSectionProps) {
    return (
        <section id={id} className={className}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeInUp}
                transition={{ delay, duration: DURATION.base, ease: EASE }}
            >
                {children}
            </motion.div>
        </section>
    );
}
