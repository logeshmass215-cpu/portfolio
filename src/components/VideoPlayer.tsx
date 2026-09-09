import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface VideoPlayerProps {
  project: Project;
  autoPlay?: boolean;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  project,
  autoPlay = false,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use primary videoUrl or fallback to editedVideoUrl / sample video
  const videoSrc =
    project.videoUrl ||
    project.editedVideoUrl ||
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

  const posterSrc = project.thumbnail || project.gradedImage;
  const isVertical = project.aspectRatio === '9:16';

  // Synchronize playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  // Synchronize mute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Track fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const resetVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={{ aspectRatio: isVertical ? '9 / 16' : '16 / 9' }}
      className={`relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group select-none transition-all ${
        isVertical && !isFullscreen
          ? 'w-full max-w-[340px] sm:max-w-[360px] mx-auto'
          : 'w-full'
      } ${className}`}
    >
      {/* Video Element Container */}
      <div className="w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          playsInline
          loop
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>

      {/* Top Overlay Badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20 gap-2">
        <span className="px-2.5 sm:px-3 py-1 rounded-lg glass-panel bg-black/60 border border-white/15 text-[10px] sm:text-[11px] font-mono text-gray-200 flex items-center gap-1.5 shadow-lg max-w-[70%] truncate">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shrink-0" />
          <span className="font-semibold truncate">{project.title}</span>
          <span className="text-gray-400 shrink-0 hidden sm:inline">({project.category})</span>
        </span>

        <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] font-mono text-gray-400 shrink-0">
          {isVertical ? '9:16' : '16:9'}
        </span>
      </div>

      {/* Large Center Play Button Overlay (when paused) */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer transition-opacity"
        >
          <button
            aria-label="Play video"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-pink-600 to-orange-500 flex items-center justify-center text-white shadow-2xl shadow-pink-600/50 hover:scale-110 active:scale-95 transition-all"
          >
            <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1" />
          </button>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 z-20 p-2.5 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-2 group/scrub">
          <div className="relative flex-1 h-1.5 hover:h-2.5 bg-white/20 rounded-full cursor-pointer transition-all">
            {/* Filled Progress */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Invisible native range slider on top for easy scrubbing */}
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Buttons and Time Display */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white ml-0.5" />}
            </button>

            {/* Rewind to start */}
            <button
              onClick={resetVideo}
              className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              title="Replay from start"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* Time */}
            <span className="text-gray-300 text-[10px] sm:text-[11px]">
              <strong className="text-white">{formatTime(currentTime)}</strong> / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mute/Unmute */}
            <button
              onClick={toggleMute}
              className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
              title="Fullscreen"
            >
              <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
