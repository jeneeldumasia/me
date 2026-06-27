import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Education: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll('.edu-animate');

        gsap.fromTo(elements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    return (
        <section ref={containerRef} className="section" style={{ padding: 'var(--pad-page) 0', borderTop: '1px solid var(--grid-line)' }}>
            <div style={{ padding: '0 var(--pad-page)', marginBottom: '4rem' }}>
                <h2 className="text-small">04 / EDUCATION</h2>
            </div>

            <div className="grid-layout" style={{ padding: '0 var(--pad-page)' }}>
                <div style={{ gridColumn: '1 / 8' }}>
                    <h3 className="text-large edu-animate" style={{
                        marginBottom: '1rem',
                        fontSize: 'clamp(1.2rem, 2.8vw, 3.2rem)',
                    }}>P. P. Savani University, Surat</h3>
                    
                    <h4 className="text-medium edu-animate" style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>BTech CSE '26</h4>
                    <div className="text-small edu-animate" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        CGPA: 7.32
                    </div>

                    <ul className="edu-animate" style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.8 }}>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Secured a ₹35K research and development grant to fund the EyesOnWheels project.
                        </li>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Cloud Lead for GDSC-PPSU (2023-24) — Mentored club members through the Google Cloud Arcade program, helping them learn foundational cloud concepts and complete hands-on labs.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
