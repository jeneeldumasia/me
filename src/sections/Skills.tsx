import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnetic } from '../components/Magnetic';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
    {
        title: 'CLOUD',
        items: ['AWS (EC2, ECS, S3, EFS, VPC, Route 53)', 'GCP (Cloud Run, Cloud SQL, Pub/Sub, VPC)']
    },
    {
        title: 'CONTAINERS',
        items: ['Docker', 'Docker Compose', 'Kubernetes (basic)']
    },
    {
        title: 'INFRASTRUCTURE & CI/CD',
        items: ['Terraform', 'GitHub Actions', 'Git']
    },
    {
        title: 'MONITORING',
        items: ['Grafana', 'Prometheus', 'Loki', 'New Relic']
    },
    {
        title: 'SCRIPTING & DATABASES',
        items: ['Python', 'Bash', 'SQL', 'PostgreSQL']
    },
    {
        title: 'LINUX & NETWORKING',
        items: ['Linux', 'DNS', 'TCP/IP', 'Load Balancing']
    }
];

export const Skills: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const rows = containerRef.current.querySelectorAll('.skill-row');

        rows.forEach((row, index) => {
            gsap.fromTo(row,
                {
                    opacity: 0,
                    y: 50,
                    rotateX: -10
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className="section" style={{ padding: 'var(--pad-page) 0', borderTop: '1px solid var(--grid-line)' }}>
            <div style={{ padding: '0 var(--pad-page)', marginBottom: '4rem' }}>
                <h2 className="text-small">02 / CAPABILITIES</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {skillCategories.map((category, i) => (
                    <div
                        key={i}
                        className="skill-row"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr',
                            borderBottom: '1px solid var(--grid-line)',
                            padding: '2rem var(--pad-page)',
                            alignItems: 'start'
                        }}
                    >
                        <h3 className="text-medium" style={{ color: 'var(--text-muted)' }}>{category.title}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {category.items.map((skill, j) => (
                                <Magnetic key={j}>
                                    <div
                                        style={{
                                            padding: '0.8rem 1.5rem',
                                            border: '1px solid var(--grid-line)',
                                            borderRadius: '4px',
                                            fontSize: '1.1rem',
                                            background: 'rgba(255,255,255,0.02)',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                    >
                                        {skill}
                                    </div>
                                </Magnetic>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
