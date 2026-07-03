import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

function InteractiveMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#6e5cff"
          wireframe
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.18, 1]} />
        <meshStandardMaterial
          color="#ff5a36"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} className="w-full h-full select-none pointer-events-auto">
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#6e5cff" />
      <pointLight position={[5, -5, 5]} intensity={0.8} color="#ff5a36" />
      <InteractiveMesh />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
