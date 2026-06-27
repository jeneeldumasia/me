import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!containerRef.current || !svgRef.current) return;

        const elements = svgRef.current.querySelectorAll('path, line, rect, circle');

        // Set initial states by dynamically calculating the length of each shape
        elements.forEach((node) => {
            const el = node as SVGGeometryElement;
            if (el.hasAttribute('stroke-dasharray') || !el.getTotalLength) {
                // If the element is purposely dashed (like the VPC barrier) or doesn't support getTotalLength, just prepare it to fade in
                gsap.set(el, { opacity: 0 });
            } else {
                // Set the exact stroke dash length to the perimeter of the shape
                const length = el.getTotalLength() + 5; 
                gsap.set(el, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
            }
        });

        // Animate everything precisely on scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top center',
            }
        });

        elements.forEach((node) => {
            const el = node as SVGGeometryElement;
            if (el.hasAttribute('stroke-dasharray') || !el.getTotalLength) {
                tl.to(el, { opacity: 1, duration: 0.5 }, "<0.05");
            } else {
                tl.to(el, { strokeDashoffset: 0, opacity: 1, duration: 1, ease: 'power2.inOut' }, "<0.05");
            }
        });
    }, []);

    return (
        <section ref={containerRef} className="section" style={{ minHeight: '100vh', padding: 'var(--pad-page) 0' }}>
            <div style={{ padding: '0 var(--pad-page)', marginBottom: '4rem' }}>
                <h2 className="text-small">03 / EXPERIENCE</h2>
            </div>

            <div className="grid-layout" style={{ padding: '0 var(--pad-page)', alignItems: 'center' }}>

                {/* Text Content */}
                <div style={{ gridColumn: '1 / 8' }}>
                    <h3 className="text-large experience-title" style={{
                        marginBottom: '1rem',
                        fontSize: 'clamp(1.2rem, 2.8vw, 3.2rem)', // Adjusted to prevent collision with the diagram
                    }}>IAMOPS</h3>

                    {/* Role 1: Jr SRE */}
                    <h4 className="text-medium" style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Jr SRE</h4>
                    <div className="text-small" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        July 2026 – Present · Surat, Gujarat
                    </div>

                    <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.8, marginBottom: '2.5rem' }}>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Served as the primary NOC engineer during assigned shifts, acting as the first responder for production alerts and incidents.
                        </li>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Performed initial triage using established incident playbooks, collected diagnostic metrics, and resolved issues within the NOC scope.
                        </li>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Determined when incidents required escalation to OCE and communicated relevant findings to support investigation.
                        </li>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Maintained incident timelines, documented shift handovers, and ensured continuity across 24×7 operations.
                        </li>
                    </ul>

                    {/* Role 2: Intern */}
                    <h4 className="text-medium" style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Cloud & DevOps Intern</h4>
                    <div className="text-small" style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Jan 2026 – June 2026 · Surat, Gujarat
                    </div>

                    <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.8 }}>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Built non-production 3-tier cloud architecture with network isolation and load balancing
                        </li>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Designed multi-location network (2 branches + HQ) with IP planning and subnet segmentation
                        </li>
                        <li style={{ position: 'relative', paddingLeft: '2rem' }}>
                            <span style={{ position: 'absolute', left: 0, top: '10px', width: '10px', height: '1px', backgroundColor: 'var(--accent)' }}></span>
                            Acted as a secondary NOC engineer, assisting with incident response, monitoring, and operational support during high-volume events.
                        </li>
                    </ul>
                </div>

                {/* 3-Tier Architecture Visualization */}
                <div style={{ gridColumn: '8 / 13', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg
                        ref={svgRef}
                        viewBox="0 0 500 500"
                        style={{ width: '100%', maxWidth: '500px', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.05))' }}
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.5"
                    >
                        {/* VPC Boundary */}
                        <rect x="10" y="10" width="480" height="480" strokeDasharray="5,5" strokeOpacity="0.3" />
                        <text x="20" y="30" fill="var(--text-muted)" stroke="none" fontSize="12" fontFamily="var(--font-sans)">AWS VPC</text>

                        {/* Public Subnet / ALB */}
                        <rect x="50" y="60" width="400" height="80" strokeOpacity="0.6" />
                        <text x="60" y="80" fill="var(--text-muted)" stroke="none" fontSize="10">PUBLIC SUBNET</text>
                        <rect x="200" y="75" width="100" height="40" fill="rgba(255,255,255,0.05)" />
                        <text x="250" y="100" fill="var(--accent)" stroke="none" fontSize="12" textAnchor="middle">ALB</text>

                        {/* Private Subnet / App Tier */}
                        <rect x="50" y="210" width="400" height="120" strokeOpacity="0.6" />
                        <text x="60" y="230" fill="var(--text-muted)" stroke="none" fontSize="10">PRIVATE SUBNET (APP TIER)</text>
                        <rect x="100" y="250" width="80" height="60" fill="rgba(255,255,255,0.05)" />
                        <text x="140" y="285" fill="var(--accent)" stroke="none" fontSize="12" textAnchor="middle">ECS / EC2</text>
                        <rect x="320" y="250" width="80" height="60" fill="rgba(255,255,255,0.05)" />
                        <text x="360" y="285" fill="var(--accent)" stroke="none" fontSize="12" textAnchor="middle">ECS / EC2</text>

                        {/* Private Subnet / DB Tier */}
                        <rect x="50" y="380" width="400" height="100" strokeOpacity="0.6" />
                        <text x="60" y="400" fill="var(--text-muted)" stroke="none" fontSize="10">PRIVATE SUBNET (DB TIER)</text>
                        <circle cx="250" cy="440" r="30" fill="rgba(255,255,255,0.05)" />
                        <path d="M220 440 C 220 420, 280 420, 280 440 C 280 460, 220 460, 220 440 Z" fill="none" />
                        <path d="M220 430 C 220 410, 280 410, 280 430" fill="none" />
                        <path d="M220 450 C 220 430, 280 430, 280 450" fill="none" />

                        {/* Connections */}
                        {/* User to ALB */}
                        <path d="M250 10 L 250 75" strokeWidth="1" strokeDasharray="2,2" />
                        <circle cx="250" cy="75" r="3" fill="var(--accent)" />

                        {/* ALB to App */}
                        <path d="M250 115 L 250 160 L 140 160 L 140 250" strokeWidth="1" />
                        <circle cx="140" cy="250" r="3" fill="var(--accent)" />
                        <path d="M250 115 L 250 160 L 360 160 L 360 250" strokeWidth="1" />
                        <circle cx="360" cy="250" r="3" fill="var(--accent)" />

                        {/* App to DB */}
                        <path d="M140 310 L 140 350 L 250 350 L 250 410" strokeWidth="1" />
                        <circle cx="250" cy="410" r="3" fill="var(--accent)" />
                        <path d="M360 310 L 360 350 L 250 350 L 250 410" strokeWidth="1" />
                    </svg>
                </div>
            </div>
        </section>
    );
};
