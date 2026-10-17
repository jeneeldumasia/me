import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const completedRef = useRef(false);

    const safeComplete = () => {
        if (completedRef.current) return;
        completedRef.current = true;
        onComplete();
    };

    const greetings = [
        "Hello",
        "Bonjour",
        "Hola",
        "Ciao",
        "こんにちは",
        "नमस्ते",
        "Jeneel Dumasia"
    ];

    useEffect(() => {
        // Respect prefers-reduced-motion
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            safeComplete();
            return;
        }

        // Hard safety timeout: loader will NEVER block page for more than 2.8s
        const safetyTimer = setTimeout(() => {
            if (containerRef.current) {
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: safeComplete
                });
            } else {
                safeComplete();
            }
        }, 2800);

        return () => clearTimeout(safetyTimer);
    }, []);

    useEffect(() => {
        if (completedRef.current) return;

        if (index === greetings.length - 1) {
            if (textRef.current) {
                gsap.to(textRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            }

            const exitTimer = setTimeout(() => {
                if (containerRef.current) {
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: 'expo.inOut',
                        onComplete: safeComplete
                    });
                } else {
                    safeComplete();
                }
            }, 600);

            return () => clearTimeout(exitTimer);
        }

        if (textRef.current) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline();
                tl.to(textRef.current, { opacity: 1, duration: 0.14 })
                  .to(textRef.current, { opacity: 0, duration: 0.14, delay: 0.08, onComplete: () => {
                      setIndex(prev => prev + 1);
                  }});
            });
            return () => ctx.revert();
        }
    }, [index]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'var(--bg-color)',
                zIndex: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--text-main)',
                overflow: 'hidden'
            }}
        >
            <h1 
               ref={textRef} 
               style={{ 
                   opacity: 0, 
                   fontFamily: index === greetings.length - 1 ? 'var(--font-display)' : 'var(--font-sans)',
                   fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                   fontWeight: index === greetings.length - 1 ? 700 : 400,
                   display: 'flex',
                   alignItems: 'center',
                   gap: '12px'
               }}
            >
                {index < greetings.length - 1 && (
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-main)' }} />
                )}
                {greetings[index]}
            </h1>
        </div>
    );
};
