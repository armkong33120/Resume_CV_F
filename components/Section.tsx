"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/motion';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export default function Section({ children, className, id, delay = 0 }: SectionProps) {
  return (
    <section id={id} className={cn("py-12 xs:py-16 sm:py-24 safe-bottom", className)}>
      <motion.div
        className="max-w-container mx-auto px-4 xs:px-6 sm:px-8 safe-left safe-right"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        transition={{ delay: delay }}
      >
        {children}
      </motion.div>
    </section>
  );
}

