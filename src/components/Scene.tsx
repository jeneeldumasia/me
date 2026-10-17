import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AbstractObject } from './AbstractObject';
import { ErrorBoundary } from './ErrorBoundary';

function isWebGLSupported(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch {
        return false;
    }
}

export const Scene: React.FC = () => {
    const [supported, setSupported] = useState<boolean | null>(null);

    useEffect(() => {
        setSupported(isWebGLSupported());
    }, []);

    if (supported === false) {
        return (
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
        );
    }

    if (supported === null) {
        return null;
    }

    return (
        <ErrorBoundary fallback={
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
        }>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]} // Cap DPR at 2 for performance
                gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
                onError={(e) => console.warn('Canvas initialization notice:', e)}
            >
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
                <directionalLight position={[-10, -10, -10]} intensity={0.6} color="#888888" />
                <directionalLight position={[0, -5, 5]} intensity={0.4} color="#aaaaaa" />

                <Suspense fallback={null}>
                    <AbstractObject />
                </Suspense>
            </Canvas>
        </ErrorBoundary>
    );
};
