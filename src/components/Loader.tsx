import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);

                // Trigger exit animation
                if (containerRef.current) {
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 1.2,
                        ease: 'expo.inOut',
                        delay: 0.5,
                        onComplete
                    });
                }
            }
            setProgress(currentProgress);
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'var(--bg-color)',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'var(--pad-page)',
                color: 'var(--text-main)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h1 className="text-large" style={{ margin: 0 }}>JENEEL DUMASIA</h1>
                <div style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {progress}%
                </div>
            </div>
            <div style={{ width: '100%', height: '2px', backgroundColor: 'var(--grid-line)', marginTop: '2rem' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--text-main)', transition: 'width 0.2s ease-out' }} />
            </div>
        </div>
    );
};

// Quick fix for useRef not imported correctly above
import { useRef } from 'react';
