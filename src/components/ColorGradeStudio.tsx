import React, { useState } from 'react';
import { COLOR_GRADE_PRESETS } from '../data/portfolioData';
import { Sliders, Sun, Palette, Sparkles, RefreshCw, Eye } from 'lucide-react';

export const ColorGradeStudio: React.FC = () => {
  const [activePreset, setActivePreset] = useState(COLOR_GRADE_PRESETS[0]);
  const [sliderPos, setSliderPos] = useState(50);
  
  // Custom manual grading tweaks
  const [contrast, setContrast] = useState(activePreset.contrast);
  const [saturation, setSaturation] = useState(activePreset.saturation);
  const [temperature, setTemperature] = useState(activePreset.temperature);

  const handleSelectPreset = (preset: typeof COLOR_GRADE_PRESETS[0]) => {
    setActivePreset(preset);
    setContrast(preset.contrast);
    setSaturation(preset.saturation);
    setTemperature(preset.temperature);
  };

  const handleReset = () => {
    setContrast(activePreset.contrast);
    setSaturation(activePreset.saturation);
    setTemperature(activePreset.temperature);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" />
            <span>DaVinci Resolve ACES Studio Sandbox</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-white">
            Interactive Color Grading &amp; Film LUT Engine
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-gray-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Color Scopes</span>
        </button>
      </div>

      {/* Preset Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {COLOR_GRADE_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelectPreset(p)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              activePreset.id === p.id
                ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                : 'bg-[#151515] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="font-display font-bold text-xs text-white truncate">
                {p.name}
              </p>
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/30"
                style={{ backgroundColor: p.highlights }}
              />
            </div>
            <p className="text-[10px] text-gray-400 line-clamp-2">
              {p.description}
            </p>
          </button>
        ))}
      </div>

      {/* Interactive Before/After Comparison Canvas Slider */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/15 bg-black select-none shadow-2xl">
        
        {/* Graded Image Layer (Right Side / Full) */}
        <div className="absolute inset-0">
          <img
            src={activePreset.sampleImage}
            alt="Graded Shot"
            className="w-full h-full object-cover"
            style={{
              filter: `contrast(${100 + contrast}%) saturate(${100 + saturation}%) sepia(${
                temperature > 0 ? temperature : 0
              }%) hue-rotate(${temperature < 0 ? temperature : 0}deg)`
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-lg text-xs font-mono text-orange-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activePreset.name} (Graded)</span>
          </div>
        </div>

        {/* LOG RAW Image Layer (Left Side / Clipped) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-orange-500 z-10 shadow-[0_0_20px_rgba(249,115,22,0.8)]"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={activePreset.sampleImage}
            alt="Flat RAW Log Shot"
            className="w-full h-full object-cover max-w-none"
            style={{
              width: '100%',
              height: '100%',
              filter: 'saturate(30%) contrast(75%) brightness(105%)'
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-lg text-xs font-mono text-gray-300 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-gray-400" />
            <span>Flat LOG Raw Sensor</span>
          </div>
        </div>

        {/* Center Drag Handle Badge */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-500 text-black flex items-center justify-center font-mono font-bold text-xs shadow-xl z-20 pointer-events-none cursor-ew-resize"
          style={{ left: `${sliderPos}%` }}
        >
          &lt;&gt;
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize z-30"
        />

      </div>

      {/* Manual Color Scope Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#101010] p-5 rounded-2xl border border-white/10">
        
        {/* Contrast */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-300 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-orange-400" /> Lift Contrast
            </span>
            <span className="text-orange-400 font-bold">+{contrast}%</span>
          </div>
          <input
            type="range"
            min="-50"
            max="80"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Saturation */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-purple-400" /> Chroma Saturation
            </span>
            <span className="text-purple-400 font-bold">+{saturation}%</span>
          </div>
          <input
            type="range"
            min="-80"
            max="100"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-400" /> White Balance Temp
            </span>
            <span className="text-blue-400 font-bold">{temperature > 0 ? `+${temperature}K Warm` : `${temperature}K Cool`}</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

      </div>

    </div>
  );
};
