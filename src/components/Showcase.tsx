import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';

interface CardVideoProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

const CardVideo: React.FC<CardVideoProps> = ({ project, onOpenModal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoSrc = project.videoUrl || project.editedVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
  const isLandscape = project.aspectRatio === '16:9' || project.aspectRatio === '16/9';

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  return (
    <div className="w-full h-[175px] sm:h-[190px] rounded-xl overflow-hidden relative bg-black/80 border border-white/5 group/video select-none flex items-center justify-center">
      {/* Inner Media Container: landscape fills width, portrait uses aspect-[9/16] centered */}
      <div className={`relative h-full overflow-hidden ${isLandscape ? 'w-full' : 'aspect-[9/16] rounded-lg shadow-md'}`}>
        {/* Video element */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={project.thumbnail}
          playsInline
          loop
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Thumbnail Overlay Video Title (clean bottom badge) */}
        {!isPlaying && project.overlayTitle && (
          <div className="absolute bottom-2 inset-x-2 z-10 pointer-events-none text-center">
            <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[9px] sm:text-[10px] font-mono text-gray-200 border border-white/10 shadow-sm truncate inline-block max-w-[92%]">
              {project.overlayTitle}
            </span>
          </div>
        )}

        {/* Aspect Ratio Badge in top right */}
        <div className="absolute top-2 right-2 z-20 pointer-events-none">
          <span className="px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-white/20 text-[9px] font-mono text-gray-200 font-semibold shadow-md">
            {project.aspectRatio || (isLandscape ? '16:9' : '9:16')}
          </span>
        </div>

        {/* Top Left Expand Button (visible on hover) */}
        <div className="absolute top-2 left-2 z-20 opacity-0 group-hover/video:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            title="Open Cinema View"
            className="p-1 rounded bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 text-gray-200 hover:text-white transition-all shadow-md"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* Centered Play Button Overlay when paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer transition-colors"
          >
            <button
              aria-label="Play video"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-600 backdrop-blur-sm border border-white/25 hover:border-transparent flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5 text-white" />
            </button>
          </div>
        )}

        {/* Subtle Bottom Controls on Hover when playing */}
        {isPlaying && (
          <div className="absolute bottom-0 inset-x-0 z-20 p-1.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between gap-1.5 opacity-0 group-hover/video:opacity-100 transition-opacity duration-200">
            <button
              onClick={togglePlay}
              className="p-1 rounded bg-black/60 hover:bg-black/80 text-white"
            >
              {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 fill-white" />}
            </button>

            {/* Mini progress line */}
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-orange-400"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={toggleMute}
              className="p-1 rounded bg-black/60 hover:bg-black/80 text-white"
            >
              {isMuted ? <VolumeX className="w-2.5 h-2.5" /> : <Volume2 className="w-2.5 h-2.5" />}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              className="p-1 rounded bg-black/60 hover:bg-black/80 text-white"
            >
              <Maximize2 className="w-2.5 h-2.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const Showcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    'All',
    'Short Form',
    'Long Form',
    'Commercial',
    'Healthcare',
    'Personal',
    'Film & Recreation'
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Short Form') return p.aspectRatio === '9:16';
    if (selectedCategory === 'Long Form') return p.aspectRatio === '16:9';
    if (selectedCategory === 'Commercial') return p.category === 'Commercial';
    if (selectedCategory === 'Healthcare') return p.category === 'Healthcare';
    if (selectedCategory === 'Personal') return p.category === 'Personal';
    if (selectedCategory === 'Film & Recreation') return p.category === 'Film & Recreation';
    return p.category === selectedCategory;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="showcase" className="w-full glass-panel p-5 sm:p-7 lg:p-8 rounded-3xl border border-white/10 bg-[#121212]/90 space-y-6 sm:space-y-8">
      
      {/* Showcase Title & Category Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <p className="text-[11px] font-mono tracking-widest text-gray-400 uppercase font-semibold">
              FEATURED PROJECTS
            </p>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
            A curated selection of my best video projects across different formats and industries.
          </p>
        </div>

        {/* Right side: Categories & Carousel Arrows */}
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#E11D48] text-white shadow-lg shadow-rose-900/40 font-semibold'
                    : 'bg-[#181818] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Carousel Scroll Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-2 border-l border-white/10">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous Projects"
              className="w-8 h-8 rounded-full bg-[#181818] hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next Projects"
              className="w-8 h-8 rounded-full bg-[#181818] hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all shadow-md active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Multi-Card Track - All Cards Same Uniform Height */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"
      >
        {filteredProjects.map((project) => {
          const isLandscape = project.aspectRatio === '16:9' || project.aspectRatio === '16/9';

          return (
            <div
              key={project.id}
              className={`h-[390px] sm:h-[410px] bg-[#141414] hover:bg-[#181818] rounded-2xl sm:rounded-3xl border border-white/10 hover:border-pink-500/30 transition-all duration-300 p-3 sm:p-3.5 flex flex-col justify-between group shadow-xl ${
                isLandscape
                  ? 'w-[300px] sm:w-[330px] lg:w-[350px] shrink-0'
                  : 'w-[165px] sm:w-[185px] lg:w-[195px] shrink-0'
              }`}
            >
              {/* Top Video Container with Uniform Height Across All Cards */}
              <CardVideo project={project} onOpenModal={setActiveProject} />

              {/* Bottom Project Metadata Block - Vertically aligned across all cards */}
              <div className="pt-2.5 pb-0.5 px-0.5 flex flex-col justify-between flex-1">
                <div>
                  {/* Category Pill Tag */}
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/25 text-pink-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      {project.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setActiveProject(project)}
                    className="font-display font-bold text-sm sm:text-base text-white mt-1.5 group-hover:text-pink-200 transition-colors truncate cursor-pointer"
                    title={project.title}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Divider & Client Row */}
                <div className="border-t border-white/5 pt-2 mt-auto flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="truncate mr-2">
                    Client: <strong className="text-gray-300 font-medium">{project.client}</strong>
                  </span>
                  <span className="shrink-0">{project.year}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Interactive Fullscreen Project Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
