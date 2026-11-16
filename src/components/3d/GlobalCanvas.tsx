'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import WindowScene3D from './WindowScene3D';
import { useSceneStore } from '@/lib/useSceneStore';

export default function GlobalCanvas() {
  const stage = useSceneStore((s) => s.stage);
  const explodeProgress = useSceneStore((s) => s.explodeProgress);
  const storyProgress = useSceneStore((s) => s.storyProgress);
  const activeSystem = useSceneStore((s) => s.activeSystem);
  const frameColor = useSceneStore((s) => s.frameColor);
  const isSashOpenManual = useSceneStore((s) => s.isSashOpenManual);

  const isVisible = stage !== 'hidden';

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
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
          <ambientLight intensity={1.4} color="#f8fafc" />
          <directionalLight position={[6, 8, 6]} intensity={3.0} color="#ffffff" />
          {/* Cool blue architectural rim light from behind-left to carve frame silhouette */}
          <directionalLight position={[-6, 4, -4]} intensity={4.0} color="#93c5fd" />
          {/* Warm ambient kicker from behind-right */}
          <directionalLight position={[5, -2, -3]} intensity={3.0} color="#fde68a" />
          {/* Front fill point light */}
          <pointLight position={[0, 1.5, 4]} intensity={2.2} color="#ffffff" distance={12} />
          <Environment preset="city" />

          <Float
            speed={stage === 'hero' ? 1.2 : 0}
            rotationIntensity={stage === 'hero' ? 0.1 : 0}
            floatIntensity={stage === 'hero' ? 0.12 : 0}
            floatingRange={[-0.03, 0.03]}
          >
            <WindowScene3D
              stage={stage}
              explodeProgress={explodeProgress}
              storyProgress={storyProgress}
              activeSystem={activeSystem}
              frameColor={frameColor}
              isSashOpenManual={isSashOpenManual}
            />
          </Float>

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
