import React from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = [
    {
      period: '2021 – Present',
      company: 'Loki Digital',
      role: 'Freelance Video Editor & Creator',
    },
    {
      period: '2025',
      company: 'Digifox Studio',
      role: 'Unity Developer Intern',
    },
    {
      period: '2025 – 2026',
      company: 'AI Edit Academy',
      role: 'Video Editor',
    },
    {
      period: '2026 – Present',
      company: 'IDAM',
      role: 'Creative Associate',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="experience"
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121212]/90 space-y-6 w-full"
    >
      <div>
        <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
          EXPERIENCE
        </p>
        <h3 className="font-display font-bold text-2xl text-white tracking-tight">
          Work Journey
        </h3>
      </div>

      {/* Timeline items container */}
      <div className="relative pt-4 pb-4">
        {/* Subtle connecting vertical line (Mobile Only) */}
        <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-white/10 md:hidden" />

        {/* Subtle connecting horizontal line (Desktop Only) */}
        <div className="absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-pink-500/30 via-cyan-500/30 to-orange-500/30 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
          {experiences.map((item, idx) => (
            <div key={idx} className="relative pl-10 md:pl-0 flex flex-col md:items-center text-left md:text-center group">
              
              {/* Cyan Node Icon (Mobile) */}
              <div className="absolute left-2.5 top-[18px] w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#121212] shadow-[0_0_8px_#22d3ee] z-10 md:hidden" />

              {/* Cyan Node Icon (Desktop) */}
              <div className="w-4.5 h-4.5 rounded-full bg-cyan-400 border-4 border-[#121212] shadow-[0_0_12px_#22d3ee] z-10 hidden md:block mb-4 group-hover:scale-125 transition-transform duration-300" />

              {/* Card content */}
              <div className="bg-[#161616]/40 border border-white/5 hover:border-pink-500/30 p-4 rounded-2xl w-full space-y-2 transition-all hover:bg-[#161616]/70 shadow-lg flex flex-col justify-between h-full">
                <div className="flex items-center justify-between md:justify-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-pink-400 font-bold bg-pink-500/5 px-2 py-0.5 rounded-md border border-pink-500/10">
                    {item.period}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-pink-400 transition-colors">
                    <Briefcase className="w-2.5 h-2.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-pink-400 transition-colors">
                    {item.company}
                  </h4>
                  <p className="text-xs text-gray-400 leading-normal">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


