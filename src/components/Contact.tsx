import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowUpRight, Instagram, Linkedin, Youtube } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="contact"
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121212]/90 flex flex-col justify-between space-y-6 h-full relative overflow-hidden"
    >
      
      {/* Background Soft Sunset Glow in Bottom Right */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-tr from-orange-500/30 to-pink-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">
          LET'S CONNECT
        </p>
        
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
          Let's Create Something <br />
          <span className="text-pink-500">Amazing</span> <span className="text-gradient-orange">Together</span>
        </h3>

        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
          Available for exciting projects and creative collaborations.
        </p>
      </div>

      <div className="relative z-10 space-y-5 pt-2">
        {/* Email Box Button */}
        <a
          href="mailto:hello@logeshc.com"
          className="group w-full p-4 rounded-2xl bg-[#181818] border border-white/10 hover:border-pink-500/50 transition-all flex items-center justify-between shadow-xl"
        >
          <div className="flex items-center gap-3 text-white">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-display font-semibold text-sm group-hover:text-pink-400 transition-colors">
              lokidigital25@gmail.com
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>

        {/* Social Links Row */}
        <div className="flex items-center gap-3 pt-1">
          {[
            { icon: Instagram, href: '#', label: 'Instagram' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Youtube, href: '#', label: 'YouTube' },
          ].map((soc, idx) => (
            <a
              key={idx}
              href={soc.href}
              className="w-10 h-10 rounded-xl bg-[#181818] border border-white/10 hover:border-pink-500/40 text-gray-400 hover:text-white flex items-center justify-center transition-all shadow-md"
              title={soc.label}
            >
              <soc.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

