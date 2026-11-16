'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import WindowModel from './WindowModel';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Ambient subtle architectural fill */}
          <ambientLight intensity={0.7} color="#eef2f6" />

          {/* Primary architectural Key Light */}
          <directionalLight position={[6, 8, 7]} intensity={1.9} color="#ffffff" />

          {/* Warm Interior Rim Glow */}
          <pointLight position={[-3, 1.5, -2]} intensity={2.6} color="#fcd34d" distance={8} />

          {/* Cool Exterior Fill */}
          <directionalLight position={[-6, -2, 4]} intensity={0.65} color="#93c5fd" />

          {/* Soft cinematic reflections from neutral studio environment */}
          <Environment preset="city" />

          {/* Gentle, controlled levitation */}
          <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.15} floatingRange={[-0.04, 0.04]}>
            <WindowModel />
          </Float>

          {/* Architectural contact ground shadow */}
          <ContactShadows
            position={[0, -2.45, 0]}
            opacity={0.65}
            scale={11}
            blur={2.4}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
