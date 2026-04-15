import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function particlePositions() {
  const particleCount = 2000;
  const pos = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const t = i / particleCount;
    const angle = t * Math.PI * 2;
    const radius = 2 + Math.sin(t * Math.PI * 4) * 1.5;
    
    pos[i * 3] = radius * Math.cos(angle);
    pos[i * 3 + 1] = radius * Math.sin(angle);
    pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  
  return pos;
}

function GradientFlowParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });
  
  return (
    <Points ref={pointsRef} positions={particlePositions()}>
      <PointMaterial
        transparent
        color={new THREE.Color('#0891b2')}
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#1C1917']} />
        <fog attach="fog" args={['#1C1917', 3, 10]} />
        <GradientFlowParticles />
      </Canvas>
    </div>
  );
}
