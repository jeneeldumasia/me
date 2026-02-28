import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        // Simple opacity fade-in instead of buggy word-by-word split which breaks <br/> tags
        gsap.fromTo([textRef.current, '#download-resume'],
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.2, // Stagger text and button
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                }
            }
        );

    }, []);

    return (
        <section ref={containerRef} className="section" style={{ minHeight: '100vh', padding: 'var(--pad-page) 0', justifyContent: 'center' }}>
            <div className="grid-layout" style={{ padding: '0 var(--pad-page)' }}>
                <div style={{ gridColumn: '2 / 12' }}>
                    <h2 className="text-small" style={{ marginBottom: '2rem' }}>01 / ABOUT</h2>
                    <p
                        ref={textRef}
                        className="text-medium"
                        style={{
                            fontFamily: 'var(--font-display)',
                            lineHeight: 1.4,
                            marginBottom: '10vh'
                        }}
                    >
                        Hi, I'm Jeneel <br /><br />
                        Computer Science student at P. P. Savani University, Surat — and a DevOps Intern at IAMOPS.<br /><br />
                        I'm curious about how systems actually work beneath the surface — what keeps them stable, why they fail, how everything connects. That curiosity led me to Linux, networking, cloud infrastructure, and system design, and it's what keeps me going deeper every day.<br /><br />
                        At IAMOPS I get to work alongside people who've been doing this for years, which has taught me more about production environments than any course could.<br /><br />
                        I focus on fundamentals over trends. Still learning — and I think that's a feature, not a bug.
                    </p>
                    <a
                        href="/Jeneel_Dumasia_resume.pdf"
                        download="Jeneel_Dumasia_resume.pdf"
                        className="btn-primary"
                        style={{ opacity: 0 }} /* Initial state for GSAP */
                        id="download-resume"
                    >
                        Download Resume
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15V3M12 15L8 11M12 15L16 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L2.42105 19.6667C2.42105 19.6667 2.42105 21 3.52632 21H20.4737C21.5789 21 21.5789 19.6667 21.5789 19.6667L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};
