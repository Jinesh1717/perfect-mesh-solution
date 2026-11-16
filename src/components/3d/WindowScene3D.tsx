'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Mosquito3D from './Mosquito3D';
import { StageType, ProductSystemType } from '@/lib/useSceneStore';

interface WindowScene3DProps {
  stage?: StageType;
  explodeProgress?: number; // 0 to 1
  storyProgress?: number; // 0 to 1 for mosquito flight
  activeSystem?: ProductSystemType;
  frameColor?: string;
  isSashOpenManual?: boolean;
}

export default function WindowScene3D({
  stage = 'hero',
  explodeProgress = 0,
  storyProgress = 0,
  activeSystem = 'sliding-door',
  frameColor = '#1a1c20',
  isSashOpenManual = false,
}: WindowScene3DProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const slidingSashRef = useRef<THREE.Group>(null);
  const leftJambRef = useRef<THREE.Mesh>(null);
  const rightJambRef = useRef<THREE.Mesh>(null);
  const topRailRef = useRef<THREE.Mesh>(null);
  const bottomSillRef = useRef<THREE.Mesh>(null);
  const meshPanelRef = useRef<THREE.Group>(null);
  const hardwareGroupRef = useRef<THREE.Group>(null);
  const mosquitoRef = useRef<THREE.Group>(null);
  const rippleRef = useRef<THREE.Mesh>(null);

  // Micro-mesh lines for sliding sash
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
    if (!rootGroupRef.current) return;
    const t = state.clock?.elapsedTime || performance.now() * 0.001;

    // Mouse tilt (active during hero & product stages)
    const mouseX = state.pointer.x * 0.18;
    const mouseY = state.pointer.y * 0.14;

    // Target transforms based on active stage
    let targetPosX = 0;
    let targetPosY = 0;
    let targetPosZ = 0;
    let targetRotX = -mouseY;
    let targetRotY = mouseX;
    let targetRotZ = 0;
    let targetScale = 1;

    // Responsive scale factor based on viewport width
    const isMobile = state.viewport.width < 5.2;

    if (stage === 'hero') {
      targetPosZ = 0;
      targetPosY = -0.05;
      targetRotX = -mouseY + Math.sin(t * 0.4) * 0.03;
      targetRotY = mouseX + Math.sin(t * 0.6) * 0.05;
      targetScale = isMobile ? 0.65 : 0.85;
    } else if (stage === 'story') {
      // Camera zooms closer to the right mesh sash
      targetPosX = isMobile ? 0 : -0.35;
      targetPosY = 0;
      targetPosZ = isMobile ? 0.6 : 0.95;
      targetRotX = -0.04;
      targetRotY = isMobile ? 0.08 : 0.16;
      targetScale = isMobile ? 0.75 : 0.95;
    } else if (stage === 'exploded') {
      // Clean perspective tilt to display mechanical depth within safe viewport bounds
      targetPosX = 0;
      targetPosY = isMobile ? 0.28 : 0.24;
      targetPosZ = isMobile ? -1.8 : -1.4;
      targetRotX = 0.12;
      targetRotY = -0.34;
      targetScale = isMobile ? 0.34 : 0.44;
    } else if (stage === 'product') {
      targetPosX = 0;
      targetPosY = 0;
      targetPosZ = 0;
      targetRotX = -mouseY * 0.8;
      targetRotY = mouseX * 0.8;
      targetScale = isMobile ? 0.65 : 0.88;
    }

    // Smooth dampening to targets
    rootGroupRef.current.position.x = THREE.MathUtils.damp(rootGroupRef.current.position.x, targetPosX, 4.5, delta);
    rootGroupRef.current.position.y = THREE.MathUtils.damp(rootGroupRef.current.position.y, targetPosY, 4.5, delta);
    rootGroupRef.current.position.z = THREE.MathUtils.damp(rootGroupRef.current.position.z, targetPosZ, 4.5, delta);

    rootGroupRef.current.rotation.x = THREE.MathUtils.damp(rootGroupRef.current.rotation.x, targetRotX, 4.5, delta);
    rootGroupRef.current.rotation.y = THREE.MathUtils.damp(rootGroupRef.current.rotation.y, targetRotY, 4.5, delta);
    rootGroupRef.current.rotation.z = THREE.MathUtils.damp(rootGroupRef.current.rotation.z, targetRotZ, 4.5, delta);

    rootGroupRef.current.scale.setScalar(
      THREE.MathUtils.damp(rootGroupRef.current.scale.x, targetScale, 4.5, delta)
    );

    // Exploded view component displacements (calibrated to never overlap top header or bottom card)
    const exp = explodeProgress;
    if (leftJambRef.current) leftJambRef.current.position.x = -1.52 - exp * 1.25;
    if (rightJambRef.current) rightJambRef.current.position.x = 1.52 + exp * 1.25;
    if (topRailRef.current) topRailRef.current.position.y = 1.95 + exp * 0.42;
    if (bottomSillRef.current) bottomSillRef.current.position.y = -1.95 - exp * 0.32;
    if (hardwareGroupRef.current) hardwareGroupRef.current.position.z = 0.05 + exp * 0.75;

    // Sliding sash position (combines manual toggle + scroll)
    if (slidingSashRef.current) {
      const manualOffset = isSashOpenManual ? 0.8 : 0;
      const targetSashX = 0.72 - manualOffset;
      slidingSashRef.current.position.x = THREE.MathUtils.damp(
        slidingSashRef.current.position.x,
        targetSashX,
        6.0,
        delta
      );
    }

    // 3D Mosquito flight trajectory during story stage
    if (mosquitoRef.current) {
      if (stage === 'story' && storyProgress > 0.02 && storyProgress < 0.98) {
        mosquitoRef.current.visible = true;
        const sp = storyProgress;
        let mx = 0, my = 0, mz = 0;
        let mrx = 0, mry = 0, mrz = 0;

        if (sp <= 0.54) {
          // Approach flight towards window mesh target [0.72, 0, 0.08]
          const tNorm = sp / 0.54;
          mx = THREE.MathUtils.lerp(2.8, 0.72, tNorm) + Math.sin(tNorm * Math.PI * 3) * 0.15;
          my = THREE.MathUtils.lerp(1.2, 0.0, tNorm) + Math.cos(tNorm * Math.PI * 2) * 0.1;
          mz = THREE.MathUtils.lerp(3.5, 0.08, tNorm);
          mrx = 0.2;
          mry = -0.4;
          mrz = Math.sin(tNorm * Math.PI * 4) * 0.2;
        } else if (sp <= 0.65) {
          // Bounce off impact point
          const tBounce = (sp - 0.54) / 0.11;
          mx = THREE.MathUtils.lerp(0.72, 0.35, tBounce);
          my = THREE.MathUtils.lerp(0.0, 0.45, tBounce);
          mz = THREE.MathUtils.lerp(0.08, 0.85, tBounce);
          mrx = tBounce * 3.5;
          mry = -tBounce * 2.0;
        } else {
          // Tumble and retreat
          const tRetreat = (sp - 0.65) / 0.33;
          mx = THREE.MathUtils.lerp(0.35, -2.4, tRetreat);
          my = THREE.MathUtils.lerp(0.45, 1.8, tRetreat);
          mz = THREE.MathUtils.lerp(0.85, 3.2, tRetreat);
          mrx = tRetreat * 6.0;
        }

        mosquitoRef.current.position.set(mx, my, mz);
        mosquitoRef.current.rotation.set(mrx, mry, mrz);
      } else {
        mosquitoRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={rootGroupRef} position={[0, 0, 0]}>
      {/* 3D Animated Mosquito Model */}
      <group ref={mosquitoRef} position={[0, 0, 0]} visible={false}>
        <Mosquito3D scale={0.7} />
      </group>

      {/* =========================================
          OUTER MASTER ARCHITECTURAL CASING (ANODIZED 6063-T6)
          ========================================= */}
      <group>
        {/* Top Header Rail */}
        <mesh ref={topRailRef} position={[0, 1.95, 0]}>
          <boxGeometry args={[3.2, 0.18, 0.22]} />
          <meshStandardMaterial color={frameColor} roughness={0.25} metalness={0.92} />
        </mesh>
        {/* Bottom Sill / Double Track Rail */}
        <mesh ref={bottomSillRef} position={[0, -1.95, 0]}>
          <boxGeometry args={[3.2, 0.22, 0.26]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.92} />
        </mesh>
        {/* Left Jamb */}
        <mesh ref={leftJambRef} position={[-1.52, 0, 0]}>
          <boxGeometry args={[0.16, 4.08, 0.22]} />
          <meshStandardMaterial color={frameColor} roughness={0.25} metalness={0.92} />
        </mesh>
        {/* Right Jamb */}
        <mesh ref={rightJambRef} position={[1.52, 0, 0]}>
          <boxGeometry args={[0.16, 4.08, 0.22]} />
          <meshStandardMaterial color={frameColor} roughness={0.25} metalness={0.92} />
        </mesh>
        {/* Center Vertical Interlock Mullion */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.08, 3.75, 0.16]} />
          <meshStandardMaterial color={frameColor} roughness={0.22} metalness={0.94} />
        </mesh>
      </group>

      {/* =========================================
          LEFT SASH: FIXED CLEAR ARCHITECTURAL GLASS
          ========================================= */}
      <group position={[-0.72, 0, -0.04]}>
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[1.42, 0.08, 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.88} />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
          <boxGeometry args={[1.42, 0.08, 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.88} />
        </mesh>
        <mesh position={[-0.67, 0, 0]}>
          <boxGeometry args={[0.08, 3.68, 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.88} />
        </mesh>
        <mesh position={[0.67, 0, 0]}>
          <boxGeometry args={[0.08, 3.68, 0.08]} />
          <meshStandardMaterial color={frameColor} roughness={0.3} metalness={0.88} />
        </mesh>
        {/* Physical Glass */}
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
        {/* Sash Frame Profiles */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[1.42, 0.09, 0.09]} />
          <meshStandardMaterial color={frameColor} roughness={0.2} metalness={0.95} />
        </mesh>
        <mesh position={[0, -1.8, 0]}>
          <boxGeometry args={[1.42, 0.09, 0.09]} />
          <meshStandardMaterial color={frameColor} roughness={0.2} metalness={0.95} />
        </mesh>
        <mesh position={[-0.67, 0, 0]}>
          <boxGeometry args={[0.09, 3.69, 0.09]} />
          <meshStandardMaterial color={frameColor} roughness={0.2} metalness={0.95} />
        </mesh>
        <mesh position={[0.67, 0, 0]}>
          <boxGeometry args={[0.09, 3.69, 0.09]} />
          <meshStandardMaterial color={frameColor} roughness={0.2} metalness={0.95} />
        </mesh>

        {/* Flush Architectural Pull Handle */}
        <mesh position={[0.55, 0, 0.06]}>
          <boxGeometry args={[0.035, 0.45, 0.02]} />
          <meshStandardMaterial color="#d4d8e0" metalness={0.98} roughness={0.1} />
        </mesh>

        {/* High-Tensile Stainless Wire Mesh Grid */}
        <group ref={meshPanelRef} position={[0, 0, 0]}>
          {meshGridLines.map((line, idx) => (
            <mesh key={idx} position={line.pos as [number, number, number]} scale={line.scale as [number, number, number]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color="#cbd5e1"
                metalness={0.96}
                roughness={0.15}
                emissive="#64748b"
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
          <mesh position={[0, 0, -0.002]}>
            <planeGeometry args={[1.34, 3.6]} />
            <meshStandardMaterial
              color="#1e293b"
              transparent
              opacity={0.3}
              roughness={0.2}
              metalness={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* Exploded Hardware Details (Rollers & Multi-Point Lock) */}
        <group ref={hardwareGroupRef} position={[0, 0, 0]}>
          {/* Top Roller Assembly */}
          <mesh position={[0.5, 1.82, 0.05]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.1} />
          </mesh>
          {/* Bottom Dual Ball-Bearing Roller Cartridge */}
          <mesh position={[0.5, -1.82, 0.05]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.06, 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.1} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
