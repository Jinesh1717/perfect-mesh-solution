'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import WindowModel from './WindowModel';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 select-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} shadow-mapSize={2048} castShadow />
        
        {/* Soft cinematic reflections */}
        <Environment preset="city" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <WindowModel />
        </Float>
        
        {/* Bottom shadow */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#000000" />
      </Canvas>
    </div>
  );
}
