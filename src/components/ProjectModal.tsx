import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Sliders,
  TrendingUp,
  Clock,
  Layers,
  Award,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { Project } from '../types';
import { formatViews } from '../lib/utils';
import { VideoPlayer } from './VideoPlayer';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [gradeSlider, setGradeSlider] = useState(50);
  const [activeTab, setActiveTab] = useState<'video' | 'grade' | 'audio'>('video');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto bg-black/90 backdrop-blur-2xl">
        
        {/* Backdrop Close Click */}
        <div className="fixed inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#121212] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto flex flex-col max-h-[90vh]"
        >
          
          {/* Modal Top Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#161616]">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-mono uppercase">
                {project.category}
              </span>
              <h3 className="font-display font-bold text-xl text-white truncate">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Main Scrollable Content */}
          <div className="p-6 overflow-y-auto space-y-8">
            
            {/* View Mode Tabs (Single Video Player, Log/Grade Comparison, Audio Stems) */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === 'video'
                    ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white font-bold shadow-lg shadow-pink-600/30'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Video Showcase Player</span>
              </button>

              {project.logImage && project.gradedImage && (
                <button
                  onClick={() => setActiveTab('grade')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                    activeTab === 'grade'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>LOG vs Grade Slider</span>
                </button>
              )}

              {project.audioTracks && (
                <button
                  onClick={() => setActiveTab('audio')}
                  className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all whitespace-nowrap ${
                    activeTab === 'audio'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio Stems</span>
                </button>
              )}
            </div>

            {/* TAB 1: Main Video Player */}
            {activeTab === 'video' && (
              <div className="w-full flex items-center justify-center">
                <VideoPlayer project={project} autoPlay={isPlaying} />
              </div>
            )}

            {/* TAB 2: Log vs Graded Before/After Comparison */}
            {activeTab === 'grade' && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-black select-none shadow-2xl">
                {/* Graded Image */}
                <img
                  src={project.gradedImage}
                  alt="Graded Shot"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 glass-panel px-3 py-1 rounded-lg text-xs font-mono text-orange-400">
                  ACES Rec709 Graded
                </div>

                {/* Flat Log Image */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-orange-500 shadow-[0_0_15px_#F97316]"
                  style={{ width: `${gradeSlider}%` }}
                >
                  <img
                    src={project.logImage}
                    alt="Flat LOG RAW Shot"
                    className="w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-lg text-xs font-mono text-gray-300">
                    Flat Sensor LOG3
                  </div>
                </div>

                {/* Drag Slider Controls */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gradeSlider}
                  onChange={(e) => setGradeSlider(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize z-20"
                />
              </div>
            )}

            {/* TAB 3: Audio Stems Breakdown */}
            {activeTab === 'audio' && project.audioTracks && (
              <div className="space-y-4 bg-[#161616] p-6 rounded-2xl border border-white/10">
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-400" />
                  Multi-Stem Sound Design Stems
                </h4>
                <div className="space-y-3">
                  {project.audioTracks.map((track, i) => (
                    <div key={i} className="p-3 bg-[#101010] rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-200 font-semibold uppercase">{track.type}: {track.name}</span>
                        <span className="text-blue-400">Panned Stereo 48kHz</span>
                      </div>
                      <div className="flex items-center gap-1 h-6">
                        {track.waveform.map((h, wIdx) => (
                          <div
                            key={wIdx}
                            className="flex-1 bg-blue-500/80 rounded-full transition-all"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
              
              {/* Left Column: Description & Edit Strategy */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">
                    Project Overview
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                  <h5 className="font-display font-bold text-sm text-purple-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Edit Strategy &amp; Audience Retention Engineering
                  </h5>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {project.editStrategy}
                  </p>
                </div>
              </div>

              {/* Right Column: Key Metrics & Metadata */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-5 rounded-2xl bg-[#161616] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono text-gray-400">Client</span>
                    <span className="text-xs font-bold text-white">{project.client}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono text-gray-400">Role</span>
                    <span className="text-xs font-bold text-purple-300">{project.role}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono text-gray-400">Views</span>
                    <span className="text-xs font-bold text-emerald-400">{formatViews(project.views)}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono text-gray-400">Performance</span>
                    <span className="text-xs font-bold text-orange-400">{project.retentionScore}</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-mono text-gray-400 block mb-2">Tools Used</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.toolsUsed.map((tool, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
