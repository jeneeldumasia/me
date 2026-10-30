import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from './useTheme';

export const AbstractObject = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const theme = useTheme();

    // Refined brutalist color palette: concrete, charcoal, off-white.
    // In light mode a charcoal object reads as a large grey blob over the text,
    // so it switches to pale concrete, closer to the light background.
    const materialProps = theme === 'light'
        ? { color: '#e4e4e4', roughness: 0.45, metalness: 0.15, distort: 0.4, speed: 1.0 }
        : { color: '#1a1a1a', roughness: 0.3, metalness: 0.5, distort: 0.4, speed: 1.0 };

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;

            // Float effect
            meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
        }
    });

    return (
        <Icosahedron ref={meshRef} args={[1.5, 32]} position={[0, 0, 0]}>
            <MeshDistortMaterial {...materialProps} />
            {/* Add wireframe overlay for the "infrastructure" feel */}
            <lineSegments>
                <edgesGeometry attach="geometry" args={[new THREE.IcosahedronGeometry(1.501, 32)]} />
                <lineBasicMaterial attach="material" color={theme === 'light' ? '#9a9a9a' : '#888888'} transparent opacity={theme === 'light' ? 0.18 : 0.1} />
            </lineSegments>
        </Icosahedron>
    );
};
