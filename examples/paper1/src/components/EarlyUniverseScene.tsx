import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export function EarlyUniverseScene() {
  const particlesRef = useRef<any>(null);
  const plasmaRef = useRef<THREE.Mesh>(null);

  // Generate thermal plasma particles
  const plasmaParticles = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);

    for (let i = 0; i < 3000; i++) {
      const i3 = i * 3;
      // Spherical distribution with varying density
      const r = 20 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Plasma colors: teal, cyan, purple
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        colors[i3] = 0.28; // teal
        colors[i3 + 1] = 0.89;
        colors[i3 + 2] = 0.5;
      } else if (colorChoice < 0.7) {
        colors[i3] = 0.13; // cyan
        colors[i3 + 1] = 0.83;
        colors[i3 + 2] = 0.93;
      } else {
        colors[i3] = 0.66; // purple
        colors[i3 + 1] = 0.54;
        colors[i3 + 2] = 0.98;
      }
    }

    return { positions, colors };
  }, []);

  // Generate neutrino particles
  const neutrinoParticles = useMemo(() => {
    const positions = new Float32Array(500 * 3);

    for (let i = 0; i < 500; i++) {
      const i3 = i * 3;
      // Linear paths representing neutrino trajectories
      const angle = Math.random() * Math.PI * 2;
      
      positions[i3] = Math.cos(angle) * 30 + (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = Math.sin(angle) * 30 + (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animate plasma rotation
    if (plasmaRef.current) {
      plasmaRef.current.rotation.y = time * 0.05;
      plasmaRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    // Animate particle positions
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < 1000; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.02;
        positions[i3 + 2] += Math.cos(time * 0.5 + positions[i3 + 1]) * 0.02;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#4ade80" />
      <pointLight position={[30, 30, 30]} intensity={1} color="#22d3ee" />
      <pointLight position={[-30, -30, -30]} intensity={0.8} color="#9d8bc9" />

      {/* Thermal Plasma Sphere */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={plasmaRef}>
          <sphereGeometry args={[25, 64, 64]} />
          <meshStandardMaterial
            transparent
            opacity={0.15}
            color="#4ade80"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      </Float>

      {/* Plasma Particles */}
      <Points ref={particlesRef} positions={plasmaParticles.positions as any} stride={3}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.1}
          sizeAttenuation
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      {/* Neutrino Trajectories */}
      <Points positions={neutrinoParticles as any}>
        <PointMaterial
          transparent
          color="#f5d388"
          size={0.15}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* RHN representation */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[3, 0]} />
          <meshBasicMaterial
            color="#f5d388"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}
