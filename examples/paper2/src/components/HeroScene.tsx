/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Center, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function FloatingBrain() {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={mesh} scale={2}>
        {/* Brain-like structure using spheres */}
        <mesh position={[-1.5, 0.3, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[1.5, 0.3, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.5, 0.3]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[-1, -0.2, 0.5]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[1, -0.2, 0.5]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#2563eb" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.5, 0.8]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#93c5fd" metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.Line>(null);
  const points = useRef<THREE.Vector3[]>([]);

  React.useEffect(() => {
    const count = 30;
    for (let i = 0; i < count; i++) {
      points.current.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2
        )
      );
    }
  }, []);

  useFrame((state) => {
    if (lineRef.current && points.current.length > 0) {
      const positions = lineRef.current.geometry.attributes.position.array;
      for (let i = 0; i < points.current.length; i++) {
        const p = points.current[i];
        positions[i * 3] = p.x + Math.sin(state.clock.getElapsedTime() + i) * 0.2;
        positions[i * 3 + 1] = p.y + Math.cos(state.clock.getElapsedTime() * 0.7 + i) * 0.15;
        positions[i * 3 + 2] = p.z;
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef as any}>
      <bufferGeometry />
      <lineBasicMaterial color="#3b82f6" opacity={0.4} transparent />
    </line>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 200;

  const particles = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  return (
    <points ref={points as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        transparent
        opacity={0.6}
      />
    </points>
  );
}

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={['#0f172a']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <Center>
            <FloatingBrain />
          </Center>
        </Float>
        
        <ConnectionLines />
        <ParticleField />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
