import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  ArrowUpRight,
  Maximize2,
  Sliders,
  Volume2,
  Grid
} from 'lucide-react';
import { HERO_DATA, CLIENT_LOGOS } from '../data/portfolioData';
import logeshImg from '../../assets/.aistudio/LOGESH.png';

interface HeroProps {
  onOpenShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenShowreel }) => {
  const [exportProgress, setExportProgress] = useState(70);

  useEffect(() => {
    const interval = setInterval(() => {
      setExportProgress((p) => (p >= 100 ? 20 : p + 1));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 overflow-hidden flex flex-col justify-between bg-[#0B0B0B] bg-noise">

      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-gradient-to-tr from-pink-900/20 via-orange-900/15 to-purple-900/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-5 space-y-6 text-left">

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515] border border-white/10 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">
                {HERO_DATA.status}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                Video Editor &amp; <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400">
                  Content Creator
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-sm sm:text-base font-normal max-w-lg leading-relaxed"
            >
              {HERO_DATA.subheading}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 pt-2"
            >
              {/* Let's Talk Button */}
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-[#151515] hover:bg-white/10 border border-white/15 hover:border-pink-500/50 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-lg"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
              </a>
            </motion.div>

          </div>

          {/* Right Column: Hero Visual Stage with Logesh Portrait & Floating UI */}
          <div className="lg:col-span-7 relative flex items-center justify-center pt-8 lg:pt-0">

            {/* Main Stage Container */}
            <div className="relative w-full max-w-2xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">

              {/* Background Eclipse Orange/Pink Glowing Sphere Halo */}
              <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-gradient-to-tr from-amber-600/40 via-orange-500/30 to-pink-600/20 blur-[30px] pointer-events-none" />

              {/* Central Creator Portrait (Logesh C) */}
              <div className="relative z-10 w-[240px] sm:w-[310px] h-[300px] sm:h-[380px] flex items-end justify-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40">
                <img
                  src={logeshImg}
                  alt="Logesh C"
                  className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                />
                {/* Signature overlay */}
                <div className="absolute top-12 left-4 font-serif italic text-lg sm:text-xl text-orange-200/90 font-bold tracking-wider -rotate-12 pointer-events-none drop-shadow-md select-none">
                  Logesh C
                </div>
              </div>

              {/* FLOATING UI PANEL 1: Vertical Reel Thumbnail Stack (Top Left) */}
              <div className="absolute top-2 left-2 sm:left-4 z-20 w-20 sm:w-24 bg-[#151515]/90 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-2xl space-y-1.5 hidden sm:block">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="aspect-[9/16] rounded-lg overflow-hidden relative bg-black/60 border border-white/5">
                    <img
                      src={`https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=200&auto=format&fit=crop`}
                      alt="Reel clip"
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
                        <Play className="w-1.5 h-1.5 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FLOATING UI PANEL 2: Program Sequence Preview (Top Right) */}
              <div className="absolute top-0 right-2 sm:right-6 z-20 w-48 sm:w-56 bg-[#151515]/90 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10 shadow-2xl space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="text-gray-200 font-semibold">Program: Sequence 01 ↑</span>
                  <Maximize2 className="w-3 h-3 text-gray-500" />
                </div>
                <div className="aspect-[16/9] rounded-lg overflow-hidden relative bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop"
                    alt="Sequence preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[8px] font-mono text-white/80 bg-black/60 px-1.5 py-0.5 rounded">
                    <span>00:00:15:08</span>
                    <span>00:00:18:20</span>
                  </div>
                </div>
                {/* Mini Player Controls */}
                <div className="flex items-center justify-center gap-3 text-gray-400 pt-0.5">
                  <Play className="w-3 h-3 fill-white text-white" />
                </div>
              </div>

              {/* FLOATING UI PANEL 3: Color Wheel HUD Widget (Top Far Right) */}
              <div className="absolute top-12 right-0 sm:-right-6 z-20 w-16 h-16 bg-[#151515]/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center hidden sm:flex">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 via-pink-500 to-amber-500 p-[2px] flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center">
                    <Sliders className="w-3.5 h-3.5 text-pink-400" />
                  </div>
                </div>
              </div>

              {/* FLOATING UI PANEL 4: Audio Waveform Strip (Center Bottom) */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-52 sm:w-64 bg-[#151515]/90 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 shadow-xl flex items-center gap-2">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <div className="w-full flex items-center gap-0.5 h-3">
                  {[20, 60, 40, 90, 100, 70, 30, 80, 95, 40, 80, 100, 60, 30, 90, 50, 80, 40, 70, 30].map((h, i) => (
                    <span key={i} className="w-1 bg-cyan-400/80 rounded-full" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* FLOATING UI PANEL 5: NLE Timeline Tracks Box (Bottom Right) */}
              <div className="absolute -bottom-2 right-2 sm:right-4 z-20 w-56 sm:w-64 bg-[#151515]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="text-xs text-white font-bold">DRAMATIC LOOK</span>
                </div>
                <div className="space-y-1">
                  <div className="h-4 rounded bg-gradient-to-r from-pink-600 to-purple-600 px-2 flex items-center text-[8px] font-mono text-white">
                    V1 • ColorGrade_Cinematic.cube
                  </div>
                  <div className="h-3 rounded bg-blue-900/60 px-2 flex items-center text-[7px] font-mono text-blue-200">
                    A1 • AmbientScore_48kHz.wav
                  </div>
                </div>
              </div>

              {/* FLOATING UI PANEL 6: Color Curve Graph (Bottom Mid-Left) */}
              <div className="absolute bottom-4 left-4 sm:left-12 z-20 w-28 bg-[#151515]/90 backdrop-blur-xl p-2 rounded-xl border border-white/10 shadow-2xl hidden sm:block">
                <div className="w-full h-12 bg-black/40 rounded border border-white/5 relative overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full text-pink-500" viewBox="0 0 100 50">
                    <path d="M 0 50 Q 30 45, 50 25 T 100 0" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* FLOATING UI PANEL 7: Export Progress Status Pill (Far Right) */}
              <div className="absolute top-1/2 -right-4 sm:-right-10 transform -translate-y-1/2 z-20 bg-[#151515]/90 backdrop-blur-xl p-2.5 rounded-xl border border-white/10 shadow-2xl space-y-1 w-40 hidden sm:block">
                <div className="flex items-center justify-between text-[9px] font-mono text-gray-300">
                  <span>EXPORTING...</span>
                  <span className="text-white font-bold">{exportProgress}%</span>
                </div>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-orange-400 transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
                <p className="text-[8px] text-gray-500 font-mono">
                  Estimated time: 00:24
                </p>
              </div>

            </div>

            {/* Bottom Timecode Ruler Bar */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 pt-2 flex items-center justify-between text-[9px] font-mono text-gray-600 px-4">
              <span>00:00:00</span>
              <span>00:00:05:00</span>
              <span>00:00:10:00</span>
              <span>00:00:15:00</span>
              <span>00:00:20:00</span>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

