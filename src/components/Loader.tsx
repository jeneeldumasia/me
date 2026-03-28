import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

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
        if (index === greetings.length - 1) {
            // End of sequence, wait a bit on the name then animate out
            if (textRef.current) {
                gsap.to(textRef.current, { opacity: 1, duration: 0.6, ease: 'power2.out' });
            }

            setTimeout(() => {
                if (containerRef.current) {
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 1.0,
                        ease: 'expo.inOut',
                        onComplete
                    });
                }
            }, 900); // stay on final text for 0.9s
            return;
        }

        // Cycle through greetings
        if (textRef.current) {
            const tl = gsap.timeline();
            tl.to(textRef.current, { opacity: 1, duration: 0.2 })
              .to(textRef.current, { opacity: 0, duration: 0.2, delay: 0.15, onComplete: () => {
                  setIndex(prev => prev + 1);
              }});
        }
    }, [index, onComplete, greetings.length]);

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
                {/* Optional dot indicator like Apple occasionally pairs with language changes */}
                {index < greetings.length - 1 && <span style={{display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-main)'}}></span>}
                {greetings[index]}
            </h1>
        </div>
    );
};
