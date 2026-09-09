export type CategoryType = 
  | 'All' 
  | 'Documentary'
  | 'Commercial' 
  | 'Motion Graphics' 
  | 'Healthcare' 
  | 'Personal Branding' 
  | 'Title Design'
  | 'Short Form' 
  | 'Long Form' 
  | 'Wedding Films' 
  | 'Brand Videos'
  | string;

export interface Project {
  id: string;
  number?: string;
  tag?: string;
  title: string;
  category: CategoryType;
  client: string;
  views: number;
  duration: string;
  year: string;
  thumbnail: string;
  videoUrl: string; // Path or URL to your edited video (e.g. "/assets/video.mp4")
  description: string;
  editStrategy: string;
  retentionScore: string;
  toolsUsed: string[];
  role: string;
  featured?: boolean;
  aspectRatio?: '16:9' | '9:16' | '16/9' | '9/16' | '4:3' | '1:1' | string;
  overlayTitle?: string;
  logImage?: string; // Optional: Flat camera log photo for color grading tab
  gradedImage?: string; // Optional: Graded photo for color grading tab
  audioTracks?: { name: string; type: 'dialogue' | 'music' | 'sfx' | 'foley'; waveform: number[] }[];
  // Legacy optional fields
  rawVideoUrl?: string;
  editedVideoUrl?: string;
  rawLabel?: string;
  editedLabel?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  featuredProject?: string;
}

export interface ToolItem {
  name: string;
  category: 'Editing' | 'VFX & Motion' | 'Color & Audio' | 'Graphics';
  proficiency: number; // 0 - 100
  iconName: string;
  description: string;
  accentColor: string; // hex or tailwind class
  tags: string[];
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  stats: string;
  detailText: string;
  accent: 'purple' | 'blue' | 'orange';
}

export interface ClientLogo {
  name: string;
  logoSvgUrl?: string;
  category: string;
}

export interface ColorGradePreset {
  id: string;
  name: string;
  description: string;
  temperature: number; // -50 to 50
  tint: number; // -50 to 50
  contrast: number; // 0 to 100
  saturation: number; // 0 to 100
  highlights: string; // hex
  shadows: string; // hex
  sampleImage: string;
}
