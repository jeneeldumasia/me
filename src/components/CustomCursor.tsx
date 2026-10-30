import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const INTERACTIVE = 'a, button, .magnetic, [role="button"]';

export const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);

    // Only use the custom cursor on devices with a real mouse.
    useEffect(() => {
        const mq = window.matchMedia?.('(hover: hover) and (pointer: fine)');
        setEnabled(!!mq?.matches);
    }, []);

    // Attach listeners once the cursor elements have actually rendered.
    // (Doing this in the same effect that set `enabled` ran before the elements
    // existed, so the listeners were never attached and the cursor stayed frozen
    // at the top-left corner while the native cursor was hidden.)
    useEffect(() => {
        if (!enabled) return;
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        const root = document.documentElement;
        let shown = false;
        gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

        const moveDot = gsap.quickTo(cursor, 'x', { duration: 0 });
        const moveDotY = gsap.quickTo(cursor, 'y', { duration: 0 });
        const moveRing = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3.out' });
        const moveRingY = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3.out' });

        const onMouseMove = (e: MouseEvent) => {
            if (!shown) {
                // Hide the native cursor only once the custom one is tracking the mouse.
                shown = true;
                gsap.set([cursor, follower], { x: e.clientX, y: e.clientY });
                gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
                root.classList.add('custom-cursor');
            }
            moveDot(e.clientX); moveDotY(e.clientY);
            moveRing(e.clientX); moveRingY(e.clientY);
        };

        // Event delegation, so links rendered after the loader are covered too.
        const onOver = (e: MouseEvent) => {
            const t = e.target as Element | null;
            const r = e.relatedTarget as Element | null;
            const entered = t?.closest?.(INTERACTIVE);
            if (entered && entered !== r?.closest?.(INTERACTIVE)) {
                gsap.to(cursor, { scale: 0, duration: 0.3 });
                gsap.to(follower, { scale: 3, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'invert(1)', duration: 0.3 });
            }
        };
        const onOut = (e: MouseEvent) => {
            const t = e.target as Element | null;
            const r = e.relatedTarget as Element | null;
            const left = t?.closest?.(INTERACTIVE);
            if (left && left !== r?.closest?.(INTERACTIVE)) {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
                gsap.to(follower, { scale: 1, backgroundColor: 'transparent', backdropFilter: 'none', duration: 0.3 });
            }
        };
        // Leaving the window: fade out so a stale dot isn't left at the edge.
        const onLeave = () => gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
        const onEnter = () => { if (shown) gsap.to([cursor, follower], { opacity: 1, duration: 0.2 }); };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
            root.classList.remove('custom-cursor');
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={cursorRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference',
                    opacity: 0,
                }}
            />
            <div
                ref={followerRef}
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--text-muted)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    opacity: 0,
                }}
            />
        </>
    );
};
