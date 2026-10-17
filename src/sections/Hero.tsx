import React from 'react';

export const Hero: React.FC = () => {
    return (
        <section className="section" style={{ padding: 0, justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: 'var(--pad-page)' }}>
                <header style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', zIndex: 20 }}>
                </header>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 20 }}>
                    <h1 className="text-huge hero-title" style={{ overflow: 'hidden' }}>
                        <span style={{ display: 'block', transform: 'translateY(100%)', willChange: 'transform' }} className="title-line">JENEEL</span>
                    </h1>
                    <h1 className="text-huge hero-title" style={{ overflow: 'hidden', marginLeft: '5vw' }}>
                        <span style={{ display: 'block', transform: 'translateY(100%)', willChange: 'transform' }} className="title-line">DUMASIA</span>
                    </h1>
                    <div style={{ marginTop: '2rem', maxWidth: '400px', marginLeft: 'auto' }}>
                        <p className="subtitle" style={{ opacity: 0, transform: 'translateY(20px)', willChange: 'transform, opacity' }}>
                            Jr SRE at IAMOPS with hands-on experience in architecture design, networking, and incident management as a NOC primary.
                        </p>
                    </div>
                </div>

                <footer className="hero-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', zIndex: 20 }}>
                    <div className="text-small">
                        <a href="https://github.com/jeneeldumasia" target="_blank" rel="noreferrer" className="magnetic">GITHUB</a>
                        <span style={{ margin: '0 1rem' }}>/</span>
                        <a href="https://linkedin.com/in/jeneel" target="_blank" rel="noreferrer" className="magnetic">LINKEDIN</a>
                    </div>
                    <div className="text-small">SCROLL TO EXPLORE ↓</div>
                </footer>
            </div>
        </section>
    );
};
