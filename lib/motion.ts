
import { Variants } from 'framer-motion';

// Soft, crisp premium easing
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: EASE
        }
    }
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: EASE
        }
    }
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export const scaleIn: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: EASE
        }
    }
};

export const slideInFromRight: Variants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: EASE
        }
    }
};

export const hoverLift = {
    y: -4,
    transition: {
        duration: 0.2,
        ease: "easeOut"
    }
} as const;
