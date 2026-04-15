import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
function SolarParticles() {
    const count = 200;
    const meshRef = useRef(null);
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, [count]);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
        }
    });
    return (_jsxs("points", { ref: meshRef, children: [_jsx("bufferGeometry", { children: _jsx("bufferAttribute", { attach: "attributes-position", count: count, itemSize: 3, array: positions }) }), _jsx("pointsMaterial", { size: 0.1, color: "#F59E0B", transparent: true, opacity: 0.8, sizeAttenuation: true })] }));
}
function GridStructure() {
    const groupRef = useRef(null);
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });
    return (_jsx("group", { ref: groupRef, children: [...Array(4)].map((_, i) => (_jsx(Float, { speed: 2, rotationIntensity: 0.5, floatIntensity: 0.5, children: _jsxs("mesh", { position: [(-1 + i * 1.5) * 2, 0, 0], children: [_jsx("boxGeometry", { args: [1.2, 1.2, 0.1] }), _jsx("meshStandardMaterial", { color: "#F59E0B", metalness: 0.3, roughness: 0.7, emissive: "#F59E0B", emissiveIntensity: 0.2 })] }) }, i))) }));
}
export function HeroScene() {
    return (_jsx("div", { className: "absolute inset-0 z-0", children: _jsxs(Canvas, { camera: { position: [0, 0, 10], fov: 60 }, children: [_jsx("ambientLight", { intensity: 0.5 }), _jsx("pointLight", { position: [10, 10, 10], intensity: 1 }), _jsx(Stars, { radius: 50, depth: 50, count: 500, factor: 4, saturation: 0, fade: true, speed: 1 }), _jsx(SolarParticles, {}), _jsx(GridStructure, {})] }) }));
}
