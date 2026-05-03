
import { Variants } from 'framer-motion';

// Soft, crisp premium easing
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
    fast: 0.18,
    base: 0.38,
    slow: 0.55,
} as const;

export const viewportOnce = { once: true, margin: "-80px" } as const;

export const selectionPillTransition = {
    duration: DURATION.base,
    ease: EASE,
} as const;

export const fadeInUp: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: DURATION.base,
            ease: EASE
        }
    }
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: DURATION.base,
            ease: EASE
        }
    }
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.08
        }
    }
};

export const scaleIn: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: DURATION.base,
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
            duration: DURATION.base,
            ease: EASE
        }
    }
};

export const hoverLift = {
    y: -4,
    transition: {
        duration: DURATION.fast,
        ease: EASE
    }
} as const;

export const tapPress = {
    scale: 0.98,
    transition: {
        duration: DURATION.fast,
        ease: EASE
    }
} as const;

export const modalPanel = {
    hidden: { opacity: 0, scale: 0.96, y: 16 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: DURATION.base,
            ease: EASE
        }
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: 16,
        transition: {
            duration: DURATION.fast,
            ease: EASE_IN_OUT
        }
    }
} as const;

export const overlayFade = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: DURATION.fast,
            ease: EASE
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: DURATION.fast,
            ease: EASE_IN_OUT
        }
    }
} as const;
