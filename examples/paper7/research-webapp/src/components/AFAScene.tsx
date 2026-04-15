import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AntiFlexibleRepresentation() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central sphere representing the algebra */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
      </Sphere>
      
      {/* Orbiting points representing x, y, z */}
      <OrbitingPoint label="x" radius={2.5} speed={0.5} color="#4ade80" />
      <OrbitingPoint label="y" radius={2.5} speed={0.7} color="#f87171" delay={Math.PI / 2} />
      <OrbitingPoint label="z" radius={2.5} speed={0.9} color="#60a5fa" delay={Math.PI} />
      
      {/* Connections forming symmetric structure */}
      <SymmetricConnections />
    </group>
  );
}

function OrbitingPoint({ label, radius, speed, color, delay = 0 }: {
  label: string;
  radius: number;
  speed: number;
  color: string;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime() * speed + delay;
      const angle = t;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      meshRef.current.position.set(x, 0, z);
    }
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[0.15, 16, 16]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.3}
        color="white"
        anchorY="top"
      >
        {label}
      </Text>
    </group>
  );
}

function SymmetricConnections() {
  const lineRef = useRef<THREE.Line>(null);
  
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const t = (i / 20) * Math.PI * 2;
      const x = Math.cos(t) * 2;
      const z = Math.sin(t) * 2;
      pts.push(new THREE.Vector3(x, 0, z));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

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
      <lineBasicMaterial color="#C5A059" transparent opacity={0.4} />
    </line>
  );
}

function AFACondition() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="card px-8 py-4 border-academic-gold/50">
        <div className="text-center">
          <p className="text-sm text-stone-400 mb-2">AFA Condition:</p>
          <code className="text-academic-gold font-mono text-lg">
            (x, y, z) = (z, y, x)
          </code>
          <p className="text-xs text-stone-500 mt-2">Anti-flexible: symmetric under swapping first and third elements</p>
        </div>
      </div>
    </div>
  );
}

export function AFAScene() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C5A059" />
        <AntiFlexibleRepresentation />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          minDistance={5} 
          maxDistance={15}
        />
      </Canvas>
      
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="card px-8 py-4 max-w-2xl">
          <h2 className="text-2xl font-bold text-stone-100 mb-2">
            Anti-Flexible Algebras (AFAs)
          </h2>
          <p className="text-stone-400 text-sm">
            Also known as Center-Symmetric Algebras. Unlike LSAs and RSAs, AFAs are their own 
            opposite algebra, meaning the product x · y → y · x leaves the AFA associator identity invariant.
          </p>
        </div>
      </div>

      <AFACondition />
    </div>
  );
}
