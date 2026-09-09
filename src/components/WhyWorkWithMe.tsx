import React from 'react';
import { motion } from 'motion/react';

export const WhyWorkWithMe: React.FC = () => {
  const features = [
    {
      title: 'Creative Storytelling',
      desc: 'Turning ideas into visual emotions.',
      icon: '✨',
    },
    {
      title: 'Fast & Reliable',
      desc: 'Quick turnaround without compromising quality.',
      icon: '⚡',
    },
    {
      title: 'Motion Graphics',
      desc: 'Eye-catching motion that brings life.',
      icon: '🎬',
    },
    {
      title: 'Cinematic Color',
      desc: 'Professional color grading & visual tone.',
      icon: '🎨',
    },
    {
      title: 'Sound Design',
      desc: 'Enhancing stories through sound.',
      icon: '🎧',
    },
    {
      title: 'Professional Workflow',
      desc: 'Organized process from start to finish.',
      icon: '⚙️',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="why-me"
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121212]/90 flex flex-col justify-between space-y-6 h-full"
    >
      <div>
        <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
          WHY WORK WITH ME
        </p>
        <h3 className="font-display font-bold text-2xl text-white tracking-tight">
          What Sets Me Apart
        </h3>
      </div>

      {/* 6 Feature Blocks in 2 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-[#181818] border border-white/10 hover:border-pink-500/40 transition-all flex items-start gap-3 group"
          >
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm shrink-0 group-hover:scale-110 transition-transform">
              {feat.icon}
            </div>
            <div>
              <h4 className="font-display font-bold text-xs text-white group-hover:text-pink-400 transition-colors">
                {feat.title}
              </h4>
              <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

