import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, EnvironmentProps } from '@react-three/drei';
import { AbstractObject } from './AbstractObject';

export const Scene: React.FC = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]} // Cap DPR at 2 for performance
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#888888" />

            <Suspense fallback={null}>
                <AbstractObject />
                <Environment preset="city" />
            </Suspense>
        </Canvas>
    );
};
