"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming utils exists, if not I'll use simple class string or clsx directly
import { fadeInUp } from "@/lib/motion";

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
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: delay }}
            >
                {children}
            </motion.div>
        </section>
    );
}
