'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Wind, Sparkles, ArrowDown } from 'lucide-react';

// ==========================================
// CALIBRATED WINDOW RECT (Anchored to /house.jpg)
// ==========================================
export const WINDOW = {
  x: 50.5, // Window Left position (% of image width)
  y: 41.5, // Window Top position (% of image height)
  w: 26.5, // Window Width (% of image width)
  h: 23.5, // Window Height (% of image height)
};

export const HOUSE_ZOOM = 2.15; // Max zoom into the window rect

// Flight path keypoints: [x %, y %, rotate deg, scale]
export const PATH_POINTS = {
  start: { x: 50, y: 52, r: 0, s: 2.1 },
  mid1: { x: 42, y: 54, r: -20, s: 1.6 },
  mid2: { x: 58, y: 47, r: 16, s: 1.15 },
  arrive: { x: WINDOW.x + WINDOW.w / 2, y: WINDOW.y + WINDOW.h / 2, r: -8, s: 0.55 },
  bounce: { x: WINDOW.x + WINDOW.w / 2 - 6, y: WINDOW.y + WINDOW.h / 2 + 5, r: 48, s: 0.42 },
  flyoff: { x: WINDOW.x + WINDOW.w / 2 - 28, y: WINDOW.y + WINDOW.h / 2 + 25, r: 85, s: 0.2 },
};

export default function MosquitoWindowScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll progress using calibrated spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.0005,
  });

  // House visual transforms (begins zooming smoothly right away)
  const houseScale = useTransform(
    smoothProgress,
    [0.0, 0.52],
    [1, HOUSE_ZOOM],
    { ease: (t: number) => t * t * (3 - 2 * t) }
  );

  const blurOpacity = useTransform(smoothProgress, [0.0, 0.28], [0.8, 0]);
  const vignetteOpacity = useTransform(smoothProgress, [0.0, 0.45], [0.75, 0.15]);

  // Mosquito Flight transforms (active from 0.0 to 0.72)
  const mosquitoLeft = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.36, 0.54, 0.62, 0.72],
    [
      `${PATH_POINTS.start.x}%`,
      `${PATH_POINTS.mid1.x}%`,
      `${PATH_POINTS.mid2.x}%`,
      `${PATH_POINTS.arrive.x}%`,
      `${PATH_POINTS.bounce.x}%`,
      `${PATH_POINTS.flyoff.x}%`,
    ]
  );

  const mosquitoTop = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.36, 0.54, 0.62, 0.72],
    [
      `${PATH_POINTS.start.y}%`,
      `${PATH_POINTS.mid1.y}%`,
      `${PATH_POINTS.mid2.y}%`,
      `${PATH_POINTS.arrive.y}%`,
      `${PATH_POINTS.bounce.y}%`,
      `${PATH_POINTS.flyoff.y}%`,
    ]
  );

  const mosquitoRotate = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.36, 0.54, 0.62, 0.72],
    [
      PATH_POINTS.start.r,
      PATH_POINTS.mid1.r,
      PATH_POINTS.mid2.r,
      PATH_POINTS.arrive.r,
      PATH_POINTS.bounce.r,
      PATH_POINTS.flyoff.r,
    ]
  );

  const mosquitoScale = useTransform(
    smoothProgress,
    [0.0, 0.18, 0.36, 0.54, 0.62, 0.72],
    [
      PATH_POINTS.start.s,
      PATH_POINTS.mid1.s,
      PATH_POINTS.mid2.s,
      PATH_POINTS.arrive.s,
      PATH_POINTS.bounce.s,
      PATH_POINTS.flyoff.s,
    ]
  );

  const mosquitoOpacity = useTransform(
    smoothProgress,
    [0.0, 0.54, 0.62, 0.72],
    [1, 1, 0.9, 0]
  );

  // Mesh & Frame drawing transforms (assembles just as mosquito arrives)
  const meshDrawProgress = useTransform(smoothProgress, [0.44, 0.54], [0, 1]);
  const meshFrameScaleX = useTransform(smoothProgress, [0.44, 0.52], [0, 1]);
  const meshFrameScaleY = useTransform(smoothProgress, [0.44, 0.52], [0, 1]);
  const meshOpacity = useTransform(smoothProgress, [0.44, 0.50], [0, 1]);

  // Shimmer sweep across mesh right at impact (0.54 - 0.64)
  const shimmerX = useTransform(smoothProgress, [0.54, 0.64], ['-120%', '220%']);
  const shimmerOpacity = useTransform(smoothProgress, [0.54, 0.58, 0.64], [0, 0.95, 0]);

  // Stage A intro badge opacity (0.0 to 0.18)
  const introBadgeOpacity = useTransform(smoothProgress, [0.0, 0.06, 0.16, 0.22], [0, 1, 1, 0]);
  const introBadgeY = useTransform(smoothProgress, [0.0, 0.06, 0.2], [10, 0, -10]);

  // Stage E: Protection Message Transforms (0.58 - 0.76)
  const protectionMessageOpacity = useTransform(smoothProgress, [0.58, 0.63, 0.74, 0.80], [0, 1, 1, 0]);
  const protectionMessageScale = useTransform(smoothProgress, [0.58, 0.64], [0.94, 1]);

  // Stage F: Product Benefits Reveal (0.78 - 1.0)
  const benefitsOpacity = useTransform(smoothProgress, [0.78, 0.84, 0.98, 1.0], [0, 1, 1, 1]);
  const benefitsY = useTransform(smoothProgress, [0.78, 0.84], [25, 0]);

  const gridRows = 26;
  const gridCols = 30;

  const originX = `${WINDOW.x + WINDOW.w / 2}%`;
  const originY = `${WINDOW.y + WINDOW.h / 2}%`;

  if (shouldReduceMotion) {
    return (
      <section className="relative w-full min-h-[90dvh] bg-[#080808] overflow-hidden border-t border-white/10 flex items-center justify-center py-20" id="story">
        <div className="absolute inset-0">
          <Image
            src="/house.jpg"
            alt="Modern Architectural Villa"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-[#080808]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-6">
            Engineered For Everyday Comfort
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            LET FRESH AIR IN.<br />
            <span className="text-zinc-400">KEEP MOSQUITOES OUT.</span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-xl mx-auto mb-8 font-light">
            High-tensile woven micro-mesh barrier paired with aerospace-grade aluminium extrusions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <p className="font-semibold text-white text-sm">316-Grade Stainless</p>
              <p className="text-xs text-zinc-400">Micro-mesh barrier</p>
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <p className="font-semibold text-white text-sm">Extruded Aluminium</p>
              <p className="text-xs text-zinc-400">Structural integrity</p>
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <p className="font-semibold text-white text-sm">98% Airflow</p>
              <p className="text-xs text-zinc-400">Unhindered breeze</p>
            </div>
            <div className="p-4 rounded-xl bg-black/60 border border-white/10">
              <p className="font-semibold text-white text-sm">Laser-Measured</p>
              <p className="text-xs text-zinc-400">Custom in-house fit</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[260vh] w-full bg-[#080808]" id="story">
      {/* 100dvh Sticky Stage */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden select-none">
        {/* House Background with Dynamic Window-Anchored Zoom */}
        <motion.div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            scale: houseScale,
            transformOrigin: `${originX} ${originY}`,
          }}
        >
          <Image
            src="/house.jpg"
            alt="Modern Architectural House Facade"
            fill
            className="object-cover"
            priority
          />

          {/* Initial Depth-of-Field Soft Focus Blur Overlay */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm bg-black/30 pointer-events-none"
            style={{ opacity: blurOpacity }}
          />

          {/* Aluminium Mesh Overlay & Animated Grid */}
          <div
            className="absolute z-20 pointer-events-none"
            style={{
              left: `${WINDOW.x}%`,
              top: `${WINDOW.y}%`,
              width: `${WINDOW.w}%`,
              height: `${WINDOW.h}%`,
            }}
          >
            {/* Aluminium Outer Architectural Frame Border */}
            <motion.div
              className="absolute inset-0 rounded-sm border-2 md:border-[3.5px] border-zinc-300 shadow-[0_0_25px_rgba(255,255,255,0.35)]"
              style={{
                scaleX: meshFrameScaleX,
                scaleY: meshFrameScaleY,
                opacity: meshOpacity,
              }}
            />

            {/* Micro Mesh Wire Grid */}
            <motion.svg
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ opacity: meshOpacity }}
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {Array.from({ length: gridRows }).map((_, i) => {
                const y = (i / (gridRows - 1)) * 100;
                return (
                  <motion.line
                    key={`h-${i}`}
                    x1="0"
                    y1={y}
                    x2="100"
                    y2={y}
                    stroke="#e4e4e7"
                    strokeWidth="0.35"
                    strokeOpacity="0.8"
                    style={{ pathLength: meshDrawProgress }}
                  />
                );
              })}

              {Array.from({ length: gridCols }).map((_, i) => {
                const x = (i / (gridCols - 1)) * 100;
                return (
                  <motion.line
                    key={`v-${i}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="100"
                    stroke="#e4e4e7"
                    strokeWidth="0.35"
                    strokeOpacity="0.8"
                    style={{ pathLength: meshDrawProgress }}
                  />
                );
              })}
            </motion.svg>

            {/* Specular Shimmer Sweep Across Mesh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
                style={{
                  left: shimmerX,
                  opacity: shimmerOpacity,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* STAGE A: Introductory Label (0.0 to 0.20) */}
        <motion.div
          className="absolute top-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center"
          style={{
            opacity: introBadgeOpacity,
            y: introBadgeY,
          }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/70 border border-white/20 backdrop-blur-xl shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white">
              Architectural Defense in Motion
            </span>
          </div>
          <p className="text-zinc-400 text-xs mt-2 uppercase tracking-widest font-mono">
            Scroll to observe the impact
          </p>
        </motion.div>

        {/* STAGE B to D: High-Detail Animated Flying Mosquito */}
        <motion.div
          className="absolute z-30 pointer-events-none w-20 h-20 md:w-28 md:h-28 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            left: mosquitoLeft,
            top: mosquitoTop,
            rotate: mosquitoRotate,
            scale: mosquitoScale,
            opacity: mosquitoOpacity,
          }}
        >
          <RealisticMosquitoSvg />
        </motion.div>

        {/* STAGE E: Impact & Deflection Callout */}
        <motion.div
          className="absolute top-24 sm:top-28 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none max-w-lg px-6"
          style={{
            opacity: protectionMessageOpacity,
            scale: protectionMessageScale,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-[0.2em] mb-3 backdrop-blur-md">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Target Deflected</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-2xl">
            Zero Infiltration.
          </h3>
          <p className="text-zinc-300 text-sm sm:text-base mt-2 font-light drop-shadow">
            Marine-grade 316 stainless micro-weave stops mosquitoes instantly while letting 98% of natural breeze flow through.
          </p>
        </motion.div>

        {/* STAGE F: Product Benefits Reveal Cards */}
        <motion.div
          className="absolute inset-x-0 bottom-8 md:bottom-12 z-40 pointer-events-none flex justify-center px-4"
          style={{
            opacity: benefitsOpacity,
            y: benefitsY,
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl w-full pointer-events-auto">
            <div className="p-4 md:p-5 rounded-2xl bg-[#0e1013]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-3">
                <ShieldCheck size={16} />
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">High-Tensile Wire</h4>
              <p className="text-[11px] text-zinc-400 font-light mt-1">Claw, knife & weather resistant 316 steel</p>
            </div>

            <div className="p-4 md:p-5 rounded-2xl bg-[#0e1013]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-3">
                <Wind size={16} />
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">98% Cross-Ventilation</h4>
              <p className="text-[11px] text-zinc-400 font-light mt-1">Maximum daylight & cool natural airflow</p>
            </div>

            <div className="p-4 md:p-5 rounded-2xl bg-[#0e1013]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-3">
                <Sparkles size={16} />
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">Near-Invisible View</h4>
              <p className="text-[11px] text-zinc-400 font-light mt-1">Micro-mesh preserves your outdoor view</p>
            </div>

            <div className="p-4 md:p-5 rounded-2xl bg-[#0e1013]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 mb-3">
                <span className="font-mono text-xs font-bold text-white">±0.5</span>
              </div>
              <h4 className="text-white font-semibold text-xs sm:text-sm">Laser-Measured</h4>
              <p className="text-[11px] text-zinc-400 font-light mt-1">Zero gaps for mosquitoes to slip through</p>
            </div>
          </div>
        </motion.div>

        {/* Ambient Vignette Gradient */}
        <motion.div
          className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-[#080808] pointer-events-none"
          style={{ opacity: vignetteOpacity }}
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

// Realistic Animated High-Detail Mosquito Graphic
function RealisticMosquitoSvg() {
  return (
    <div className="relative w-full h-full">
      <style jsx>{`
        @keyframes flapLeft {
          0%,
          100% {
            transform: rotate(-15deg) scaleY(1);
          }
          50% {
            transform: rotate(-35deg) scaleY(0.25);
          }
        }
        @keyframes flapRight {
          0%,
          100% {
            transform: rotate(15deg) scaleY(1);
          }
          50% {
            transform: rotate(35deg) scaleY(0.25);
          }
        }
        .wing-left {
          transform-origin: 52px 64px;
          animation: flapLeft 0.035s infinite ease-in-out;
        }
        .wing-right {
          transform-origin: 76px 64px;
          animation: flapRight 0.035s infinite ease-in-out;
        }
      `}</style>

      <svg
        viewBox="0 0 128 128"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]"
      >
        <g stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M56 60 L38 42 L24 48" />
          <path d="M72 60 L90 42 L104 48" />
          <path d="M54 68 L28 66 L14 78" />
          <path d="M74 68 L100 66 L114 78" />
          <path d="M54 76 L32 94 L18 116" />
          <path d="M74 76 L96 94 L110 116" />
        </g>

        <g>
          <g className="wing-left">
            <path
              d="M52 64 C42 42 22 28 12 24 C20 38 34 56 50 68 Z"
              fill="rgba(228, 228, 231, 0.65)"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="0.8"
            />
            <path
              d="M50 64 C36 44 24 34 16 28"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="0.5"
              fill="none"
            />
          </g>

          <g className="wing-right">
            <path
              d="M76 64 C86 42 106 28 116 24 C108 38 94 56 78 68 Z"
              fill="rgba(228, 228, 231, 0.65)"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="0.8"
            />
            <path
              d="M78 64 C92 44 104 34 112 28"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="0.5"
              fill="none"
            />
          </g>
        </g>

        <path
          d="M60 74 C58 84 56 98 64 110 C72 98 70 84 68 74 Z"
          fill="#292524"
          stroke="#1c1917"
          strokeWidth="1.2"
        />
        <path d="M59 82 Q64 85 69 82" stroke="#71717a" strokeWidth="1" fill="none" />
        <path d="M58 90 Q64 93 70 90" stroke="#71717a" strokeWidth="1" fill="none" />
        <path d="M60 98 Q64 100 68 98" stroke="#71717a" strokeWidth="1" fill="none" />

        <ellipse cx="64" cy="66" rx="8" ry="11" fill="#1c1917" />
        <circle cx="64" cy="53" r="6" fill="#18181b" />
        <ellipse cx="60.5" cy="52" rx="2.5" ry="3.5" fill="#450a0a" stroke="#7f1d1d" strokeWidth="0.5" />
        <ellipse cx="67.5" cy="52" rx="2.5" ry="3.5" fill="#450a0a" stroke="#7f1d1d" strokeWidth="0.5" />

        <path d="M64 47 L64 22" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M62 49 Q54 38 46 34" stroke="#27272a" strokeWidth="0.8" fill="none" />
        <path d="M66 49 Q74 38 82 34" stroke="#27272a" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}
