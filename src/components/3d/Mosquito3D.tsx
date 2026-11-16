'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Mosquito3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  opacity?: number;
}

export default function Mosquito3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
}: Mosquito3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock?.elapsedTime || performance.now() * 0.001;
    // Wing flap oscillation at 35-40Hz
    const flap = Math.sin(t * 45) * 0.45;
    if (leftWingRef.current) leftWingRef.current.rotation.z = -0.3 + flap;
    if (rightWingRef.current) rightWingRef.current.rotation.z = 0.3 - flap;
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Thorax (Middle Body) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#1a1818" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.16, 0.04]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#141212" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Compound Eyes (Deep Ruby Metallic) */}
      <mesh position={[-0.06, 0.2, 0.08]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#500707" roughness={0.15} metalness={0.8} />
      </mesh>
      <mesh position={[0.06, 0.2, 0.08]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#500707" roughness={0.15} metalness={0.8} />
      </mesh>

      {/* Proboscis (Feeder Needle) */}
      <mesh position={[0, 0.32, 0.02]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.015, 0.28, 8]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Segmented Abdomen */}
      <group position={[0, -0.32, -0.06]} rotation={[-0.2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.13, 0.5, 16]} />
          <meshStandardMaterial color="#221e1e" roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Abdomen Stripe Bands */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.115, 0.12, 0.04, 16]} />
          <meshStandardMaterial color="#52525b" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.095, 0.1, 0.04, 16]} />
          <meshStandardMaterial color="#52525b" roughness={0.6} />
        </mesh>
      </group>

      {/* Wings with Dynamic Flap & Specular Glint */}
      <group ref={leftWingRef} position={[-0.08, 0.06, 0.1]}>
        <mesh position={[-0.42, 0.1, 0]} rotation={[0, 0, 0.2]}>
          <planeGeometry args={[0.85, 0.26]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            transmission={0.85}
            opacity={0.7}
            transparent
            roughness={0.1}
            ior={1.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <group ref={rightWingRef} position={[0.08, 0.06, 0.1]}>
        <mesh position={[0.42, 0.1, 0]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[0.85, 0.26]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            transmission={0.85}
            opacity={0.7}
            transparent
            roughness={0.1}
            ior={1.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Jointed Chitin Legs */}
      <group>
        {/* Left Front Leg */}
        <mesh position={[-0.18, 0.12, 0]} rotation={[0, 0, -0.6]}>
          <cylinderGeometry args={[0.007, 0.007, 0.35]} />
          <meshStandardMaterial color="#1a1818" />
        </mesh>
        {/* Right Front Leg */}
        <mesh position={[0.18, 0.12, 0]} rotation={[0, 0, 0.6]}>
          <cylinderGeometry args={[0.007, 0.007, 0.35]} />
          <meshStandardMaterial color="#1a1818" />
        </mesh>
        {/* Rear Long Legs */}
        <mesh position={[-0.22, -0.15, -0.1]} rotation={[0.4, 0, -0.8]}>
          <cylinderGeometry args={[0.007, 0.007, 0.55]} />
          <meshStandardMaterial color="#1a1818" />
        </mesh>
        <mesh position={[0.22, -0.15, -0.1]} rotation={[0.4, 0, 0.8]}>
          <cylinderGeometry args={[0.007, 0.007, 0.55]} />
          <meshStandardMaterial color="#1a1818" />
        </mesh>
      </group>
    </group>
  );
}
