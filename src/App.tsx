import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Loader } from './components/Loader';
import { Scene } from './components/Scene';
import { ThemeToggle } from './components/ThemeToggle';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        if (loadingComplete) {
            // Entry animations after loader finishes
            const tl = gsap.timeline();

            tl.to('.title-line', {
                y: 0,
                duration: 1.5,
                ease: 'power4.out',
                stagger: 0.2
            })
                .to('.subtitle', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=1');
        }
    }, [loadingComplete]);

    return (
        <SmoothScroll>
            <CustomCursor />
            <ThemeToggle />
            {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}

            <div id="webgl-container" style={{ opacity: loadingComplete ? 1 : 0, transition: 'opacity 2s ease' }}>
                {loadingComplete && <Scene />}
            </div>

            <main style={{ position: 'relative', zIndex: 10, visibility: loadingComplete ? 'visible' : 'hidden' }}>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
            </main>
        </SmoothScroll>
    );
};

export default App;
