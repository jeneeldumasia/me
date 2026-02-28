import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Immediate update for dot
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0,
            });

            // Delayed smooth update for follower
            gsap.to(follower, {
                x: mouseX,
                y: mouseY,
                duration: 0.6,
                ease: 'power3.out'
            });
        };

        const onMouseEnterLink = () => {
            gsap.to(cursor, { scale: 0, duration: 0.3 });
            gsap.to(follower, { scale: 3, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'invert(1)', duration: 0.3 });
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', backdropFilter: 'none', duration: 0.3 });
        };

        window.addEventListener('mousemove', onMouseMove);

        // Attach hover effects to links and interactive elements
        const attachHoverEvents = () => {
            const links = document.querySelectorAll('a, button, .magnetic, [role="button"]');
            links.forEach((link) => {
                link.addEventListener('mouseenter', onMouseEnterLink);
                link.addEventListener('mouseleave', onMouseLeaveLink);
            });
        };

        // Need a slight delay or observer to catch newly rendered React elements
        setTimeout(attachHoverEvents, 1000);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            const links = document.querySelectorAll('a, button, .magnetic, [role="button"]');
            links.forEach((link) => {
                link.removeEventListener('mouseenter', onMouseEnterLink);
                link.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--accent)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
            />
            <div
                ref={followerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    // mixBlendMode: 'difference'
                }}
            />
        </>
    );
};
