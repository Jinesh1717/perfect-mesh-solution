'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

interface WindowModelProps {
  frameColor?: string;
  isSashOpenManual?: boolean;
}

export default function WindowModel({
  frameColor = '#1a1c20',
  isSashOpenManual = false,
}: WindowModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshPanelRef = useRef<THREE.Mesh>(null);
  const slidingSashRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef<number>(0);
  const targetColor = useMemo(() => new THREE.Color(frameColor), [frameColor]);
  const currentColor = useRef<THREE.Color>(new THREE.Color(frameColor));

  const { scrollYProgress } = useScroll();

  // Create high-detail micro-mesh grid lines for the right sash panel
  const meshGridLines = useMemo(() => {
    const lines = [];
    const width = 1.35;
    const height = 3.6;
    const rows = 36;
    const cols = 20;

    for (let i = 0; i <= rows; i++) {
      const y = -height / 2 + (i / rows) * height;
      lines.push({ type: 'h', pos: [0, y, 0], scale: [width, 0.005, 0.005] });
    }
    for (let j = 0; j <= cols; j++) {
      const x = -width / 2 + (j / cols) * width;
      lines.push({ type: 'v', pos: [x, 0, 0], scale: [0.005, height, 0.005] });
    }
    return lines;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Accumulate elapsed time using delta to avoid THREE.Clock deprecation warnings
    elapsedRef.current += delta;
    const t = elapsedRef.current;

    const mouseX = state.pointer.x * 0.22;
    const mouseY = state.pointer.y * 0.18;

    const progress = scrollYProgress.get();
    const heroProgress = Math.min(1, progress * 3.5);

    // Smooth subtle camera/spatial tilt responding to mouse and time
    const targetRotX = -mouseY + Math.sin(t * 0.4) * 0.035;
    const targetRotY = mouseX + Math.sin(t * 0.6) * 0.06 + heroProgress * 0.18;
    const targetPosZ = THREE.MathUtils.lerp(0, 1.6, heroProgress);

    // Frame-rate independent dampening using delta
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4.5, delta);
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4.5, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetPosZ, 5.0, delta);

    // Color transition lerp
    currentColor.current.lerp(targetColor, Math.min(1, delta * 6));

    // Dynamic sliding motion of the mesh sash (combines scroll progress and manual toggle)
    if (slidingSashRef.current) {
      const scrollOffset = Math.sin(heroProgress * Math.PI) * 0.28;
      const manualOffset = isSashOpenManual ? 0.75 : 0;
      const targetSashX = 0.72 - scrollOffset - manualOffset;
      slidingSashRef.current.position.x = THREE.MathUtils.damp(slidingSashRef.current.position.x, targetSashX, 6.0, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* =========================================
          OUTER MASTER ARCHITECTURAL CASING (ANODIZED 6063-T6)
          ========================================= */}
      <group>
        {/* Top Header Rail */}
        <mesh position={[0, 1.95, 0]}>
          <boxGeometry args={[3.2, 0.18, 0.22]} />
          <meshStandardMaterial color={frameColor} roughness={0.28} metalness={0.9} />
        </mesh>
        {/* Bottom Sill / Double Track Rail */}
        <mesh position={[0, -1.95, 0]}>
          <boxGeometry args={[3.2, 0.22, 0.26]} />
          <meshStandardMaterial color={frameColor} roughness={0.32} metalness={0.92} />
        </mesh>
        {/* Left Jamb */}
        <mesh position={[-1.52, 0, 0]}>
          <boxGeometry args={[0.16, 4.08, 0.22]} />
          <meshStandardMaterial color={frameColor} roughness={0.28} metalness={0.9} />
        </mesh>
        {/* Right Jamb */}
        <mesh position={[1.52, 0, 0]}>
          <boxGeometry args={[0.16, 4.08, 0.22]} />
          <meshStandardMaterial color={frameColor} roughness={0.28} metalness={0.9} />
        </mesh>

        {/* Center Vertical Interlock Mullion */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 3.75, 0.16]} />
          <meshStandardMaterial color={frameColor} roughness={0.24} metalness={0.92} />
        </mesh>
      </group>

      {/* =========================================
          LEFT SASH: FIXED CLEAR ARCHITECTURAL GLASS
          ========================================= */}
      <group position={[-0.72, 0, -0.04]}>
        {/* Inner Sash Frame */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[1.42, 0.08, 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.32} metalness={0.85} />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
          <boxGeometry args={[1.42, 0.08, 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.32} metalness={0.85} />
        </mesh>
        <mesh position={[-0.67, 0, 0]}>
          <boxGeometry args={[0.08, 3.68, 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.32} metalness={0.85} />
        </mesh>
        <mesh position={[0.67, 0, 0]}>
          <boxGeometry args={[0.08, 3.68, 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.32} metalness={0.85} />
        </mesh>

        {/* Glass Pane */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.34, 3.6]} />
          <meshPhysicalMaterial
            color="#d4e6f1"
            transmission={0.92}
            opacity={0.35}
            transparent
            roughness={0.06}
            ior={1.52}
            reflectivity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* =========================================
          RIGHT SASH: SLIDING HIGH-TENSILE MESH SCREEN
          ========================================= */}
      <group ref={slidingSashRef} position={[0.72, 0, 0.04]}>
        {/* Precision Aluminium Sash Frame with Beveled Edges */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[1.42, 0.09, 0.09]} />
          <meshStandardMaterial color={frameColor} roughness={0.22} metalness={0.94} />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
          <boxGeometry args={[1.42, 0.09, 0.09]} />
          <meshStandardMaterial color={frameColor} roughness={0.22} metalness={0.94} />
        </mesh>
        <mesh position={[-0.67, 0, 0]}>
          <boxGeometry args={[0.09, 3.69, 0.09]} />
          <meshStandardMaterial color={frameColor} roughness={0.22} metalness={0.94} />
        </mesh>
        <mesh position={[0.67, 0, 0]}>
          <boxGeometry args={[0.09, 3.69, 0.09]} />
          <meshStandardMaterial color={frameColor} roughness={0.22} metalness={0.94} />
        </mesh>

        {/* Flush Architectural Pull Handle */}
        <mesh position={[0.55, 0, 0.06]}>
          <boxGeometry args={[0.035, 0.45, 0.02]} />
          <meshStandardMaterial color="#c4c8d0" metalness={0.96} roughness={0.12} />
        </mesh>

        {/* High-Tensile Micro Woven Wire Mesh Grid */}
        <group position={[0, 0, 0]}>
          {meshGridLines.map((line, idx) => (
            <mesh key={idx} position={line.pos as [number, number, number]} scale={line.scale as [number, number, number]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#9aa0a6" metalness={0.92} roughness={0.22} />
            </mesh>
          ))}

          {/* Semi-transparent protective micro-screen mesh backdrop */}
          <mesh ref={meshPanelRef} position={[0, 0, -0.002]}>
            <planeGeometry args={[1.34, 3.6]} />
            <meshStandardMaterial
              color="#0e1012"
              transparent
              opacity={0.38}
              roughness={0.35}
              metalness={0.75}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
