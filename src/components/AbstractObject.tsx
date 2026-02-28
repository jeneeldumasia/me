import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';

export const AbstractObject = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Refined brutalist color palette: concrete, charcoal, off-white
    const materialProps = {
        color: '#333333',
        roughness: 0.1,
        metalness: 0.8,
        distort: 0.4,
        speed: 1.5,
    };

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
                <lineBasicMaterial attach="material" color="#888888" transparent opacity={0.1} />
            </lineSegments>
        </Icosahedron>
    );
};
