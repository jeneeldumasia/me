import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
    children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Skip smooth scroll on touch/mobile for better native performance
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        if (isTouch) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        const tickerUpdate = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerUpdate);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerUpdate);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};
