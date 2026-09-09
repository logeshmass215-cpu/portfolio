import React from 'react';
import { motion } from 'motion/react';
import premiereImg from '../assets/tools/premiere.png';
import afterEffectsImg from '../assets/tools/aftereffects.png';
import photoshopImg from '../assets/tools/photoshop.png';
import blenderImg from '../assets/tools/blender.png';
import capcutImg from '../assets/tools/capcut.png';

interface Tool {
  name: string;
  image: string;
  abbr?: string;
  bg?: string;
}

export const ToolsGrid: React.FC = () => {
  const tools: Tool[] = [
    { name: 'Premiere Pro', image: premiereImg, abbr: 'Pr' },
    { name: 'After Effects', image: afterEffectsImg, abbr: 'Ae' },
    { name: 'Photoshop', image: photoshopImg, abbr: 'Ps' },
    { name: 'Blender', image: blenderImg, abbr: 'Blender' },
    { name: 'CapCut', image: capcutImg, abbr: 'CapCut' },
  ];

  // Quadruplicate array so that 50% scroll distance aligns perfectly for a seamless loop
  const scrollingTools = [...tools, ...tools, ...tools, ...tools];

  return (
    <div id="tools" className="w-full flex flex-col space-y-6 py-6 overflow-hidden bg-transparent">
      
      {/* Title block */}
      <div>
        <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
          TOOLS I USE
        </p>
        <h3 className="font-display font-bold text-2xl text-white tracking-tight">
          Software Arsenal
        </h3>
      </div>

      {/* Full-width Viewport Container */}
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full overflow-hidden [perspective:1000px] py-6"
      >
        {/* Soft edge blur gradients matching the app background color (#0B0B0B) */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10 pointer-events-none" />

        {/* Infinite scrolling track moving from right to left */}
        <div className="flex gap-4 sm:gap-6 w-max animate-marquee">
          {scrollingTools.map((t, idx) => (
            <div
              key={idx}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-[calc(100vw/4-12px)] sm:w-[calc(100%/4-18px)] md:w-[calc(1200px/4-24px)] p-6 sm:p-8 flex flex-col items-center justify-center space-y-4 text-center cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group select-none flex-shrink-0 min-h-[160px] sm:min-h-[220px]"
            >
              {t.image ? (
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
                  loading="lazy"
                />
              ) : (
                <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center font-bold text-lg sm:text-2xl font-mono group-hover:scale-110 transition-transform ${t.bg}`}>
                  {t.abbr}
                </div>
              )}
              <span className="text-sm sm:text-lg font-bold text-gray-300 group-hover:text-white transition-colors truncate w-full">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
