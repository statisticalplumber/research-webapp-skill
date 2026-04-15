import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  position: [number, number, number];
  size: number;
  color: string;
}

function Particle({ position, size, color }: ParticleProps) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.002;
      mesh.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function MyelinSheath() {
  const sheathRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sheathRef.current) {
      sheathRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      sheathRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group ref={sheathRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[3, 3.5, 0.5, 16, 1, true]} />
        <meshStandardMaterial 
          color="#4CAF50" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos((i * Math.PI) / 4) * 3.5,
            Math.sin((i * Math.PI) / 4) * 3.5,
            0
          ]}
        >
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial 
            color="#2E7D32" 
            transparent 
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function Cell() {
  const cellRef = useRef<THREE.Mesh>(null);
  const [pos] = useState<[number, number, number]>(() => [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 5
  ]);

  useFrame((state) => {
    if (cellRef.current) {
      cellRef.current.position.x = pos[0] + Math.sin(state.clock.elapsedTime * 0.3 + pos[0]) * 0.5;
      cellRef.current.position.y = pos[1] + Math.cos(state.clock.elapsedTime * 0.25 + pos[1]) * 0.5;
    }
  });

  return (
    <mesh ref={cellRef} position={pos}>
      <sphereGeometry args={[0.4, 12, 12]} />
      <meshStandardMaterial 
        color="#2196F3" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}

function BackgroundParticles() {
  const particles = useRef<THREE.Group>(null);

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={particles}>
      {[...Array(50)].map((_, i) => (
        <Particle
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 10
          ]}
          size={Math.random() * 0.3 + 0.1}
          color={i % 3 === 0 ? '#4CAF50' : i % 3 === 1 ? '#2196F3' : '#FF7043'}
        />
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4CAF50" />
        <BackgroundParticles />
        <MyelinSheath />
        {[...Array(15)].map((_, i) => (
          <Cell key={i} />
        ))}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
