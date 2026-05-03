"use client";

import { motion } from "framer-motion";
import { EASE_IN_OUT } from "@/lib/motion";

export default function BackgroundMotion() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-purple-200/20 to-blue-200/20 blur-3xl"
                animate={{
                    x: [0, 24, 0],
                    y: [0, 16, 0],
                    scale: [1, 1.04, 1],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: EASE_IN_OUT,
                }}
            />
            <motion.div
                className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-l from-pink-200/20 to-orange-200/20 blur-3xl"
                animate={{
                    x: [0, -18, 0],
                    y: [0, 24, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: EASE_IN_OUT,
                }}
            />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
    );
}
