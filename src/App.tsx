import React, { useState, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Loader } from './components/Loader';
// three.js is most of the bundle; load the 3D background separately so the
// text content isn't blocked on it.
const Scene = lazy(() => import('./components/Scene').then(m => ({ default: m.Scene })));
import { ThemeToggle } from './components/ThemeToggle';
import { ErrorBoundary } from './components/ErrorBoundary';

import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
    const [loadingComplete, setLoadingComplete] = useState(false);

    // Fallback safety timeout so page is NEVER trapped in invisible state
    useEffect(() => {
        const fallback = setTimeout(() => {
            setLoadingComplete(true);
        }, 3200);
        return () => clearTimeout(fallback);
    }, []);

    useEffect(() => {
        if (loadingComplete) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline();

                tl.to('.title-line', {
                    y: 0,
                    duration: 1.2,
                    ease: 'power4.out',
                    stagger: 0.15
                })
                .to('.subtitle', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.8');
            });

            return () => ctx.revert();
        }
    }, [loadingComplete]);

    return (
        <SmoothScroll>
            <CustomCursor />
            <ThemeToggle />
            {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}

            <div id="webgl-container" style={{ opacity: loadingComplete ? 1 : 0, transition: 'opacity 1.5s ease' }}>
                <ErrorBoundary>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </ErrorBoundary>
            </div>

            <main style={{
                position: 'relative',
                zIndex: 10,
                opacity: loadingComplete ? 1 : 0,
                transition: 'opacity 0.6s ease',
                pointerEvents: loadingComplete ? 'auto' : 'none'
            }}>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Education />
                <Projects />
                <Contact />
            </main>
        </SmoothScroll>
    );
};

export default App;
