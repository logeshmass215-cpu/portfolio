import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Film } from 'lucide-react';
import { Project } from '../types';

interface RawVsEditedPlayerProps {
  project: Project;
  autoPlay?: boolean;
}

export const RawVsEditedPlayer: React.FC<RawVsEditedPlayerProps> = ({ project, autoPlay = false }) => {
  const rawVideoRef = useRef<HTMLVideoElement>(null);
  const editedVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fallback video URLs if specific raw/edited URLs aren't defined yet
  const rawUrl = project.rawVideoUrl || project.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  const editedUrl = project.editedVideoUrl || project.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

  const rawTitle = project.rawLabel || 'RAW FOOTAGE (LEFT)';
  const editedTitle = project.editedLabel || 'EDITED FOOTAGE (RIGHT)';

  // Sync play state
  useEffect(() => {
    const rawVid = rawVideoRef.current;
    const editedVid = editedVideoRef.current;

    if (rawVid && editedVid) {
      if (isPlaying) {
        rawVid.play().catch(() => {});
        editedVid.play().catch(() => {});
      } else {
        rawVid.pause();
        editedVid.pause();
      }
    }
  }, [isPlaying]);

  // Sync mute state
  useEffect(() => {
    if (rawVideoRef.current) rawVideoRef.current.muted = isMuted;
    if (editedVideoRef.current) editedVideoRef.current.muted = isMuted;
  }, [isMuted]);

  // Sync video time update
  const handleTimeUpdate = () => {
    const primary = editedVideoRef.current || rawVideoRef.current;
    if (primary) {
      setCurrentTime(primary.currentTime);
      if (primary.duration && !isNaN(primary.duration)) {
        setDuration(primary.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (rawVideoRef.current) rawVideoRef.current.currentTime = targetTime;
    if (editedVideoRef.current) editedVideoRef.current.currentTime = targetTime;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const resetVideos = () => {
    if (rawVideoRef.current) rawVideoRef.current.currentTime = 0;
    if (editedVideoRef.current) editedVideoRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isVertical = project.aspectRatio === '9:16';

  return (
    <div className="w-full bg-[#121212] border border-white/15 rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xl overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
              Raw vs Edited Footage Comparison
            </h4>
            <p className="text-[11px] text-gray-400 font-mono">
              Synchronized side-by-side playback &amp; real-time comparison
            </p>
          </div>
        </div>
      </div>

      {/* VIDEO PLAYER CANVAS AREA: SIDE-BY-SIDE DUAL PLAYER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* LEFT SIDE: RAW FOOTAGE */}
        <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 shadow-xl group">
          {/* Header Badge */}
          <div className="absolute top-3 left-3 z-20 glass-panel px-3 py-1 rounded-lg border border-red-500/40 text-[10px] sm:text-xs font-mono font-bold text-red-400 flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{rawTitle}</span>
          </div>

          <div className={`${isVertical ? 'aspect-[9/14] max-w-[280px] mx-auto' : 'aspect-[16/9]'} w-full flex items-center justify-center bg-black`}>
            <video
              ref={rawVideoRef}
              src={rawUrl}
              poster={project.logImage || project.thumbnail}
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
        </div>

        {/* RIGHT SIDE: EDITED FOOTAGE */}
        <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 shadow-xl group">
          {/* Header Badge */}
          <div className="absolute top-3 left-3 z-20 glass-panel px-3 py-1 rounded-lg border border-emerald-500/40 text-[10px] sm:text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{editedTitle}</span>
          </div>

          <div className={`${isVertical ? 'aspect-[9/14] max-w-[280px] mx-auto' : 'aspect-[16/9]'} w-full flex items-center justify-center bg-black`}>
            <video
              ref={editedVideoRef}
              src={editedUrl}
              poster={project.gradedImage || project.thumbnail}
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* SYNCHRONIZED PLAYER CONTROLS BAR */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#181818] border border-white/10 space-y-3">
        
        {/* Progress Timeline Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400 min-w-[42px] text-right">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />

          <span className="text-xs font-mono text-gray-400 min-w-[42px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-orange-500 hover:scale-105 transition-transform text-white font-bold flex items-center gap-2 text-xs shadow-lg"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              <span>{isPlaying ? 'Pause Both' : 'Play Synchronized'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={resetVideos}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors text-xs font-mono border border-white/10"
              title="Reset to Start"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`p-2.5 rounded-xl transition-all border ${
                isMuted
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="text-[10px] font-mono text-gray-400 hidden sm:inline-block">
              Sync Engine Active
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
