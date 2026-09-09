import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Code, Smile, Trophy } from 'lucide-react';
import logeshImg from '../../assets/.aistudio/LOGESH.png';

export const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="about"
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121212]/90 flex flex-col justify-between space-y-6 h-full"
    >
      <div>
        <p className="text-[10px] font-mono tracking-widest text-gray-400 uppercase mb-2">
          ABOUT ME
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
          Crafting <span className="text-pink-500">Emotions</span> <br />
          Through <span className="text-gradient-orange">Visuals.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: Bio text and 4 Stats Quadrants */}
        <div className="md:col-span-7 space-y-6">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            I'm Logesh C, a passionate Video Editor &amp; Content Creator who believes in the power of storytelling. I create videos that connect brands with people through creativity, motion and emotions.
          </p>

          {/* Stats Quadrant Grid matching user design */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4 relative">
            {/* Horizontal Line Divider */}
            <div className="absolute top-[calc(50%-0.5px)] left-0 right-0 h-[1px] bg-white/10" />
            {/* Vertical Line Divider */}
            <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-[1px] bg-white/10" />

            {/* Stat 1: Years Experience */}
            <div className="flex items-center gap-3 sm:gap-4 relative z-10 pb-2 pr-1">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-none">
                  1+
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wide whitespace-nowrap">
                  Years Experience
                </p>
              </div>
            </div>

            {/* Stat 2: Projects Completed */}
            <div className="flex items-center gap-3 sm:gap-4 relative z-10 pb-2 pl-3 sm:pl-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-950/80 border border-indigo-500/25 flex items-center justify-center text-indigo-300 shadow-md shrink-0">
                <Code className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-none">
                  25+
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wide whitespace-nowrap">
                  Projects Completed
                </p>
              </div>
            </div>

            {/* Stat 3: Happy Clients */}
            <div className="flex items-center gap-3 sm:gap-4 relative z-10 pt-2 pr-1">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#161616]/80 border border-white/10 flex items-center justify-center text-gray-300 shadow-md shrink-0">
                <Smile className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-none">
                  10+
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wide whitespace-nowrap">
                  Happy Clients
                </p>
              </div>
            </div>

            {/* Stat 4: Client Satisfaction */}
            <div className="flex items-center gap-3 sm:gap-4 relative z-10 pt-2 pl-3 sm:pl-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-none">
                  100%
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 font-semibold tracking-wide whitespace-nowrap">
                  Client Satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Logesh Portrait Photo Frame with Handwritten Script Signature */}
        <div className="md:col-span-5 relative">
          <div className="relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black">
            <img
              src={logeshImg}
              alt="Logesh C"
              className="w-full h-full object-cover filter contrast-[1.05] brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Signature overlay in bottom right */}
            <div className="absolute bottom-3 right-4 font-serif italic text-xl text-orange-400 font-bold tracking-wider drop-shadow-lg">
              Logesh C
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
