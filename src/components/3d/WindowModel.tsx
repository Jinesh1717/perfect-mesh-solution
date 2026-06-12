'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export default function WindowModel() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Use framer-motion to track window scroll
  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Idle slow rotation
    const time = state.clock.elapsedTime;
    const idleRotX = Math.sin(time * 0.3) * 0.1;
    const idleRotY = Math.sin(time * 0.5) * 0.15;
    
    // Scroll driven actions
    const progress = scrollYProgress.get(); // 0 to 1 at the bottom of the page, but we only care about top part
    // Normalize progress to be fast in the first 20% of the page
    const heroProgress = Math.min(1, progress * 4); 

    // Animate camera zoom or object position based on scroll
    // On scroll, object comes closer to the camera
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, heroProgress * 4, 0.1);
    
    // Combine idle and scroll rotation
    groupRef.current.rotation.x = idleRotX;
    groupRef.current.rotation.y = idleRotY + heroProgress * Math.PI * 0.1;

    // Fade in mesh material
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.1 + heroProgress * 0.8, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer framing boxes to make an empty middle */}
      <mesh position={[0, 1.9, 0]}>
         <boxGeometry args={[3, 0.2, 0.1]} />
         <meshStandardMaterial color="#d4d4d4" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -1.9, 0]}>
         <boxGeometry args={[3, 0.2, 0.1]} />
         <meshStandardMaterial color="#d4d4d4" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.4, 0, 0]}>
         <boxGeometry args={[0.2, 4, 0.1]} />
         <meshStandardMaterial color="#d4d4d4" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.4, 0, 0]}>
         <boxGeometry args={[0.2, 4, 0.1]} />
         <meshStandardMaterial color="#d4d4d4" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* The Mesh (Mosquito Net) */}
      <mesh ref={meshRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[2.8, 3.8, 32, 32]} />
        {/* Simple wireframe to look like a mesh for the placeholder */}
        <meshStandardMaterial 
          color="#111" 
          transparent={true} 
          opacity={0.1} 
          wireframe={true} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
