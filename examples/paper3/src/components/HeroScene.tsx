import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function CellParticles({ count = 150 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      
      const t = Math.random();
      colors[i * 3] = 0.2 + t * 0.3;
      colors[i * 3 + 1] = 0.5 + t * 0.4;
      colors[i * 3 + 2] = 0.8 + t * 0.2;
    }
    
    return { positions: pos, colors: colors };
  }, [count]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.positions.length / 3}
          array={positions.positions}
          itemSize={3}
          args={[positions.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={positions.colors.length / 3}
          array={positions.colors}
          itemSize={3}
          args={[positions.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.8}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  const points = useMemo(() => {
    const helixPoints: THREE.Vector3[] = [];
    const turns = 3;
    const pointsPerTurn = 40;
    
    for (let i = 0; i <= pointsPerTurn * turns; i++) {
      const t = i / pointsPerTurn;
      const angle = t * Math.PI * 2 * turns;
      const radius = 1.5;
      const y = (i - pointsPerTurn / 2) * 0.15;
      
      helixPoints.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));
    }
    
    return helixPoints;
  }, []);
  
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, 0]}>
        <mesh geometry={lineGeometry}>
          <lineBasicMaterial color="#1e40af" opacity={0.4} transparent />
        </mesh>
        {points.filter((_, i) => i % 4 === 0).map((point, i) => (
          <mesh key={i} position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshPhongMaterial
              color="#14b8a6"
              emissive="#14b8a6"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function WaveTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry attach="geometry" args={[2, 0.3, 16, 100]} />
        <meshPhongMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <div className="h-screen w-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        
        <group position={[-3, 1, -2]}>
          <CellParticles count={100} />
        </group>
        
        <group position={[3, -1, -3]}>
          <CellParticles count={50} />
        </group>
        
        <DNAHelix />
        <WaveTorus />
        
        <Environment preset="studio" />
      </Canvas>
      
      <div className="absolute inset-0 bg-gradient-to-b from-elisa-light via-white to-elisa-light/50 pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-8 max-w-5xl">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-elisa-blue/10 text-elisa-blue rounded-full text-sm font-medium">
              Research Visualization
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-6 leading-tight">
            <span className="gradient-text">ELISA</span>
            <br />
            <span className="text-stone-700">Interpretable Hybrid Generative AI Agent</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            An interpretable framework for expression-grounded discovery in single-cell genomics
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#architecture"
              className="px-8 py-3 bg-elisa-blue text-white rounded-lg font-medium hover:bg-elisa-dark transition-colors"
            >
              Explore Architecture
            </a>
            <a
              href="https://github.com/omaruno/ELISA-An-AI-Agent-for-Expression-Grounded-Discovery-in-Single-Cell-Genomics"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-elisa-blue border-2 border-elisa-blue rounded-lg font-medium hover:bg-elisa-light transition-colors"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-elisa-blue/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

export default HeroScene;
