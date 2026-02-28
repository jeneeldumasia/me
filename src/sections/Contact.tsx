import React from 'react';
import { Magnetic } from '../components/Magnetic';

export const Contact: React.FC = () => {
    return (
        <section className="section" style={{ minHeight: '80vh', borderTop: '1px solid var(--grid-line)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <h2 className="text-large" style={{ marginBottom: '2rem' }}>LET'S BUILD SOMETHING.</h2>

                <Magnetic>
                    <a
                        href="mailto:jeneeldumasia18@gmail.com"
                        className="text-medium"
                        style={{
                            display: 'inline-block',
                            padding: '1rem 3rem',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '50px',
                            fontFamily: 'var(--font-sans)',
                            marginBottom: '4rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--text-main)';
                            e.currentTarget.style.color = 'var(--bg-color)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--text-main)';
                        }}
                    >
                        jeneeldumasia18@gmail.com
                    </a>
                </Magnetic>

                <div style={{ display: 'flex', gap: '3rem', color: 'var(--text-muted)' }}>
                    <Magnetic>
                        <a href="tel:+918160025176" className="text-small" style={{ color: 'inherit' }}>+91 8160025176</a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://github.com/jeneeldumasia" target="_blank" rel="noreferrer" className="text-small" style={{ color: 'inherit' }}>GITHUB</a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://linkedin.com/in/jeneel" target="_blank" rel="noreferrer" className="text-small" style={{ color: 'inherit' }}>LINKEDIN</a>
                    </Magnetic>
                </div>
            </div>

            <footer style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
                <div className="text-small">© {new Date().getFullYear()} JENEEL DUMASIA</div>
                <div className="text-small">SURAT, GUJARAT, INDIA</div>
            </footer>
        </section>
    );
};
