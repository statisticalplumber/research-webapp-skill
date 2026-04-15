import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingAlgebra() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      meshRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color="#C5A059"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.3}
        metalness={0.8}
      />
    </Sphere>
  );
}

function AlgebraParticles() {
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C5A059"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function AlgebraConnections() {
  const count = 50;
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= count; i++) {
      const t = (i / count) * Math.PI * 2;
      const r = 2.5;
      pts.push(new THREE.Vector3(
        r * Math.cos(t),
        r * Math.sin(t),
        Math.sin(t * 3) * 0.3
      ));
    }
    return pts;
  }, []);

  return (
    <line ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#C5A059" transparent opacity={0.5} />
    </line>
  );
}

export function HeroScene() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text">
          Pre-Lie Structures
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl text-stone-300 max-w-4xl mb-8">
          For Semisimple Lie Algebras
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          {['LSA', 'RSA', 'AFA', 'A₃', 'S₃'].map((label, i) => (
            <span
              key={label}
              className="px-4 py-2 bg-stone-800/50 backdrop-blur-sm rounded-full text-stone-400 border border-stone-700"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C5A059" />
        <FloatingAlgebra />
        <AlgebraParticles />
        <AlgebraConnections />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce text-stone-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
