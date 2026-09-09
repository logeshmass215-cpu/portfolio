import React, { useState } from 'react';
import { Layers, Play, Pause, RotateCcw, Volume2, Film, Sparkles, Sliders } from 'lucide-react';

export const TimelineScrubber: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubber, setScrubber] = useState(35);
  const [activeTrack, setActiveTrack] = useState<string>('v2');

  const frameSnapshots = [
    { pos: 10, title: "01. Hook Intro", label: "Porsche GT3 RS 1000fps SlowMo", lut: "Log3 Raw", zoom: "1.2x" },
    { pos: 35, title: "02. Engine Rev", label: "Multi-Cam Audio Peak + SpeedRamp", lut: "ACES Rec709", zoom: "1.8x" },
    { pos: 60, title: "03. Apex Drift", label: "3D Motion Graphics Tracking", lut: "Teal&Orange", zoom: "1.0x" },
    { pos: 85, title: "04. Call To Action", label: "Sub-bass Impact & End Title", lut: "Kodak 35mm", zoom: "1.0x" }
  ];

  const currentSnapshot = frameSnapshots.reduce((prev, curr) => {
    return Math.abs(curr.pos - scrubber) < Math.abs(prev.pos - scrubber) ? curr : prev;
  });

  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              NLE Multi-Track Timeline Sandbox
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Drag playhead or click snapshot points to inspect video edits
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? "Pause" : "Play Timeline"}</span>
          </button>

          <button
            onClick={() => setScrubber(0)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            title="Reset Playhead"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Preview Display Canvas */}
      <div className="relative aspect-[16/8] sm:aspect-[16/7] rounded-2xl overflow-hidden bg-[#151515] border border-white/10 shadow-2xl flex items-center justify-center">
        
        {/* Background Sample Frame */}
        <img
          src={
            scrubber < 25
              ? "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop"
              : scrubber < 50
              ? "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
              : scrubber < 75
              ? "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
              : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
          }
          alt="Timeline Frame Preview"
          className="w-full h-full object-cover filter contrast-[1.08] transition-all duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Scanlines Overlay */}
        <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

        {/* HUD Data Overlay */}
        <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>TIME: 00:01:24:{Math.floor(scrubber * 0.6).toString().padStart(2, '0')}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between glass-panel px-4 py-2 rounded-xl text-xs font-mono text-white">
          <div className="flex items-center gap-3">
            <span className="text-purple-300 font-bold">{currentSnapshot.title}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">{currentSnapshot.label}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-orange-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>{currentSnapshot.lut}</span>
          </div>
        </div>

      </div>

      {/* Snapshot Marker Quick Jumps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {frameSnapshots.map((snap, i) => (
          <button
            key={i}
            onClick={() => setScrubber(snap.pos)}
            className={`p-2.5 rounded-xl border text-left text-xs font-mono transition-all ${
              Math.abs(scrubber - snap.pos) < 12
                ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <p className="font-bold">{snap.title}</p>
            <p className="text-[10px] opacity-75 truncate">{snap.label}</p>
          </button>
        ))}
      </div>

      {/* Main Track Timeline View */}
      <div className="bg-[#101010] p-4 rounded-2xl border border-white/10 space-y-2 relative select-none">
        
        {/* Playhead Vertical Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 shadow-[0_0_12px_rgba(239,68,68,1)] transition-all duration-75"
          style={{ left: `${scrubber}%` }}
        >
          <div className="w-3 h-3 bg-red-500 rotate-45 -translate-x-[5px] -top-1.5 absolute" />
        </div>

        {/* Video Track V2 */}
        <div className="flex items-center gap-3">
          <span className="w-8 text-[10px] font-mono text-purple-400 font-bold">V2</span>
          <div className="flex-1 h-6 bg-purple-950/60 rounded-lg border border-purple-500/30 flex items-center px-2 relative overflow-hidden">
            <span className="text-[10px] font-mono text-purple-200">Overlay_KineticTypography.aep</span>
          </div>
        </div>

        {/* Video Track V1 */}
        <div className="flex items-center gap-3">
          <span className="w-8 text-[10px] font-mono text-blue-400 font-bold">V1</span>
          <div className="flex-1 h-7 bg-blue-950/80 rounded-lg border border-blue-500/40 flex items-center justify-between px-2 relative overflow-hidden">
            <span className="text-[10px] font-mono text-blue-200">Main_A_Cam_4K60.mov</span>
            <span className="text-[9px] font-mono text-blue-400/80">ProRes 422 HQ</span>
          </div>
        </div>

        {/* Audio Track A1 */}
        <div className="flex items-center gap-3">
          <span className="w-8 text-[10px] font-mono text-emerald-400 font-bold">A1</span>
          <div className="flex-1 h-6 bg-emerald-950/80 rounded-lg border border-emerald-500/30 flex items-center px-2 relative overflow-hidden">
            <div className="w-full flex items-center justify-between gap-1 opacity-80">
              {[30, 70, 100, 40, 90, 20, 80, 100, 60, 40, 80, 95, 30, 90, 70, 100, 40, 85, 90, 30, 80, 100, 50].map((h, i) => (
                <span key={i} className="w-1 bg-emerald-400 rounded-full" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Scrubber Range Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={scrubber}
          onChange={(e) => setScrubber(Number(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-500 pt-2"
        />

      </div>

    </div>
  );
};
