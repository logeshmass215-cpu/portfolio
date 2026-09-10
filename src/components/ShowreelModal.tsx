
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Film, Sparkles, Maximize2 } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState('01. Porsche GT3 RS');

  const showreelUrl = "/assets/videos/CHIN-Jathi-in-Kriti-V2.mp4";

  const chapters = [
    { title: "01. Porsche GT3 RS", timestamp: "00:00", category: "Automotive" },
    { title: "02. AI Supercomputer", timestamp: "00:42", category: "Tech Doc" },
    { title: "03. Viral Dopamine Reels", timestamp: "01:15", category: "Short Form" },
    { title: "04. Linear Product Launch", timestamp: "01:50", category: "Brand Motion" }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-6xl bg-[#121212] border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 space-y-4 p-6"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <h3 className="font-display font-bold text-xl text-white">
                Marcus Vance — 2026 Cinematic Showreel (4K 60FPS)
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Video Frame */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
            <video
              src={showreelUrl}
              autoPlay={isPlaying}
              controls={true}
              muted={isMuted}
              className="w-full h-full object-contain bg-black"
            />
          </div>

          {/* Chapters Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {chapters.map((ch) => (
              <button
                key={ch.title}
                onClick={() => setActiveChapter(ch.title)}
                className={`p-3 rounded-xl border text-left text-xs font-mono transition-all ${
                  activeChapter === ch.title
                    ? 'bg-purple-600/30 border-purple-500 text-purple-200'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <p className="font-bold">{ch.title}</p>
                <div className="flex items-center justify-between text-[10px] opacity-80 mt-1">
                  <span>{ch.category}</span>
                  <span className="text-purple-400">{ch.timestamp}</span>
                </div>
              </button>
            ))}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
