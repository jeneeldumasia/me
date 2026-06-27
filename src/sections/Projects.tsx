import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from '../components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: 'EYES ON WHEELS',
        subtitle: 'REAL-TIME DROWSINESS DETECTION',
        description: 'ML on Raspberry Pi 4 tracking eye-blink patterns and facial expressions to prevent accidents. The project received an approved patent.',
        stack: ['Python', 'OpenCV', 'NumPy', 'SciPy'],
        year: '2025'
    },
    {
        title: 'STOCKWISE',
        subtitle: 'STORAGE MANAGEMENT PLATFORM',
        description: 'Inventory tracking, automated billing, invoicing, client management, and data visualization.',
        stack: ['JavaScript', 'HTML/CSS', 'MongoDB', 'NodeJS', 'Express'],
        year: '2024'
    }
];

export const Projects: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const projectCards = containerRef.current.querySelectorAll('.project-card');

        projectCards.forEach((card) => {
            gsap.fromTo(card,
                {
                    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                    opacity: 0
                },
                {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.inOut',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className="section" style={{ padding: 'var(--pad-page) 0', borderTop: '1px solid var(--grid-line)' }}>
            <div style={{ padding: '0 var(--pad-page)', marginBottom: '4rem' }}>
                <h2 className="text-small">05 / SELECTED WORKS</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {projects.map((project, i) => (
                    <div
                        key={i}
                        className="project-card"
                        style={{
                            position: 'relative',
                            padding: '4rem var(--pad-page)',
                            borderBottom: '1px solid var(--grid-line)',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(12, 1fr)',
                            gap: '2rem',
                            alignItems: 'start',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.01))'
                        }}
                    >
                        {/* Hover Effect Overlay */}
                        <div className="project-hover-bg" style={{
                            position: 'absolute', inset: 0, backgroundColor: 'var(--text-main)',
                            opacity: 0, zIndex: -1, transition: 'opacity 0.4s ease'
                        }} />

                        <div style={{ gridColumn: '1 / 6' }}>
                            <h3 className="text-large" style={{ marginBottom: '1rem', letterSpacing: '-0.03em' }}>{project.title}</h3>
                            <div className="text-small" style={{ marginBottom: '2rem' }}>{project.subtitle}</div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {project.stack.map((tech, j) => (
                                    <span key={j} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.3rem 0.8rem',
                                        border: '1px solid var(--text-muted)',
                                        borderRadius: '20px',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ gridColumn: '7 / 12', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <p className="text-medium" style={{ fontFamily: 'var(--font-display)', marginBottom: '2rem' }}>
                                {project.description}
                            </p>


                        </div>

                        <div style={{ gridColumn: '12 / 13', textAlign: 'right', color: 'var(--text-muted)' }}>
                            {project.year}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
