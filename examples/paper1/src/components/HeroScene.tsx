import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  count?: number;
}

function ParticleField({ count = 2000 }: ParticleProps) {
  const ref = useRef<any>(null);

  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute particles in a sphere-like pattern
      const r = 45 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Color variation: gold, blue, purple
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Gold
        colors[i3] = 0.96;
        colors[i3 + 1] = 0.83;
        colors[i3 + 2] = 0.53;
      } else if (colorChoice < 0.6) {
        // Blue
        colors[i3] = 0.49;
        colors[i3 + 1] = 0.79;
        colors[i3 + 2] = 0.89;
      } else {
        // Purple
        colors[i3] = 0.62;
        colors[i3 + 1] = 0.55;
        colors[i3 + 2] = 0.81;
      }
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.y = time * 0.02;
      ref.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={points.positions as any} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function WaveRing({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime();
      mesh.current.scale.setScalar(scale + Math.sin(time * 2 + position[0]) * 0.1);
      (mesh.current.material as any).opacity = 0.3 + Math.sin(time * 1.5 + position[1]) * 0.2;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <torusGeometry args={[8, 0.05, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#f5d388" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7ec8e3" />
      
      <ParticleField count={2000} />
      
      <WaveRing position={[0, 0, -30]} scale={1} color="#f5d388" />
      <WaveRing position={[0, 0, -25]} scale={1.2} color="#7ec8e3" />
      <WaveRing position={[0, 0, -20]} scale={1.4} color="#9d8bc9" />
    </>
  );
}
