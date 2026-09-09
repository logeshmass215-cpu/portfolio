import { Project, ExperienceItem, ToolItem, FeatureCard, ClientLogo, ColorGradePreset } from '../types';

export const HERO_DATA = {
  name: "LOGESH C",
  title: "Video Editor & Content Creator",
  subheading: "Hi, I'm Logesh C - a Video Editor and Content Creator with over 3+ years of experience in creating dynamic and engaging video content.",
  location: "India / Remote Worldwide",
  status: "FULL-TIME VIDEO EDITOR",
  stats: [
    { label: "YEARS OF EXP", value: "3+" },
    { label: "COMPLETED PROJECTS", value: "50+" },
    { label: "COMMUNITY", value: "100K+" }
  ]
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "SONY", category: "Camera & Gear" },
  { name: "Canon", category: "Cinema" },
  { name: "dji", category: "Drones & Stabilizers" },
  { name: "RED", category: "Digital Cinema" },
  { name: "Blackmagicdesign", category: "Post Production" }
];

// ============================================================================
// 🎬 6 FEATURED PROJECTS
// ============================================================================
export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    number: "01",
    tag: "DOCUMENTARY",
    title: "01 — Sports Documentary",
    category: "Long Form",
    client: "TNPL",
    views: 18400000,
    duration: "02:45",
    year: "2024",
    videoUrl: "/assets/.aistudio/Sports Documentary.mp4",
    thumbnail: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "16:9",
    overlayTitle: "Sports Documentary",
    description: "A cinematic sports documentary focused on storytelling, emotion, and the intensity of the game.",
    editStrategy: "Engineered sub-frame sound transitions matched with dramatic game motion and emotional crescendo.",
    retentionScore: "94.2% Average View Duration",
    toolsUsed: ["DaVinci Resolve", "Adobe Premiere Pro", "After Effects"],
    role: "Lead Editor & Storyteller",
    featured: true
  },
  {
    id: "proj-2",
    number: "02",
    tag: "MOTION GRAPHICS",
    title: "02 — Financial Company | Motion Graphics",
    category: "Commercial",
    client: "WealthCare",
    views: 12500000,
    duration: "00:45",
    year: "2024",
    videoUrl: "/assets/.aistudio/Financial Motion Graphics.mp4",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "9:16",
    overlayTitle: "Financial Motion Graphics",
    description: "A dynamic motion graphics video created for a financial company, combining clean visuals, engaging animation, and clear communication.",
    editStrategy: "Synthesized complex financial metrics into kinetic isometric animations and smooth vector transitions.",
    retentionScore: "88% Retention Rate",
    toolsUsed: ["After Effects", "Premiere Pro", "Illustrator"],
    role: "Motion Designer & Video Editor",
    featured: true
  },
  {
    id: "proj-3",
    number: "03",
    tag: "PROMOTIONAL VIDEO",
    title: "03 — Financial Company | Promotional Video",
    category: "Commercial",
    client: "FinSure",
    views: 4200000,
    duration: "01:00",
    year: "2024",
    videoUrl: "/assets/.aistudio/Financial Motion Graphics 2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "9:16",
    overlayTitle: "Promotional Video",
    description: "A visually engaging promotional video designed for a financial brand, bringing together creative editing, motion graphics, and brand-focused storytelling.",
    editStrategy: "Blended dynamic lifestyle footage with sleek typographic overlays and brand sound design.",
    retentionScore: "91% Average View Duration",
    toolsUsed: ["Premiere Pro", "After Effects", "Photoshop"],
    role: "Commercial Video Editor",
    featured: true
  },
  {
    id: "proj-4",
    number: "04",
    tag: "HEALTHCARE",
    title: "04 — Hospital",
    category: "Healthcare",
    client: "Sri Hospitals",
    views: 6800000,
    duration: "01:30",
    year: "2024",
    videoUrl: "/assets/.aistudio/Healthcare Video.mp4",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "9:16",
    overlayTitle: "Hospital",
    description: "A professional healthcare video combining clean visuals, informative storytelling, and purposeful communication.",
    editStrategy: "Balanced clinical precision with warm, reassuring color tones and empathetic pacing.",
    retentionScore: "Featured Healthcare Campaign",
    toolsUsed: ["DaVinci Resolve", "Premiere Pro"],
    role: "Lead Editor & Colorist",
    featured: true
  },
  {
    id: "proj-5",
    number: "05",
    tag: "PERSONAL BRANDING",
    title: "05 — Personal Branding",
    category: "Personal",
    client: "Logesh C",
    views: 15400000,
    duration: "00:50",
    year: "2024",
    videoUrl: "/assets/.aistudio/Personal Branding.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "9:16",
    overlayTitle: "Personal Branding",
    description: "A personal branding video crafted to create a strong visual identity through creative storytelling, editing, and motion.",
    editStrategy: "Engineered pattern interrupts every 3 seconds with sound FX, quick zooms, and kinetic typography.",
    retentionScore: "96.4% Retention Rate",
    toolsUsed: ["CapCut", "Premiere Pro", "After Effects"],
    role: "Creative Editor & Content Strategist",
    featured: true
  },
  {
    id: "proj-6",
    number: "06",
    tag: "MOVIE TITLE RECREATION",
    title: "06 — Movie Title Recreation",
    category: "Film & Recreation",
    client: "Fan Project",
    views: 9400000,
    duration: "01:15",
    year: "2024",
    videoUrl: "/assets/.aistudio/Movie Title Recreation.mp4",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop",
    aspectRatio: "16:9",
    overlayTitle: "Movie Title Recreation",
    description: "A creative recreation of a movie title sequence, exploring typography, motion, transitions, visual effects, and cinematic detailing.",
    editStrategy: "Engineered 3D camera depth tracking, custom cinematic typography, and atmospheric film grain.",
    retentionScore: "Award Winner - Title Design 2026",
    toolsUsed: ["Blender", "After Effects", "Photoshop"],
    role: "VFX & Title Designer",
    featured: true
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2026 – Present",
    role: "Creative Associate",
    company: "IDAM",
    location: "Onsite / Hybrid",
    description: "Leading creative direction, visual design, and video production workflows for brand campaigns.",
    highlights: [
      "Conceptualizing creative concepts and visual narratives.",
      "Directing video edits and digital content creation."
    ],
    skills: ["Creative Direction", "Video Editing", "Content Strategy", "Visual Design"]
  },
  {
    id: "exp-2",
    period: "2025 – 2026",
    role: "Video Editor",
    company: "AI Edit Academy",
    location: "Remote",
    description: "Editing cinematic courses, social reels, and high-converting video assets using cutting-edge AI post-production workflows.",
    highlights: [
      "Crafted viral video clips with retention hooks and motion graphics.",
      "Optimized editing templates for fast turnaround times."
    ],
    skills: ["AI Workflows", "Premiere Pro", "DaVinci Resolve", "CapCut"]
  },
  {
    id: "exp-3",
    period: "2025",
    role: "Unity Developer Intern",
    company: "Digifox Studio",
    location: "Hybrid",
    description: "Developed interactive 3D assets, scene interactions, and visual effects within Unity.",
    highlights: [
      "Implemented real-time 3D animations and UI logic.",
      "Collaborated with artists and engineers on interactive experiences."
    ],
    skills: ["Unity", "C#", "3D Animation", "Interactive Media"]
  },
  {
    id: "exp-4",
    period: "2021 – Present",
    role: "Freelance Video Editor & Creator",
    company: "Loki Digital",
    location: "Remote",
    description: "Producing high-retention commercial ads, short form reels, and YouTube edits for brand clients.",
    highlights: [
      "Worked directly with creators and small businesses.",
      "Handled color grading, audio mastering, and motion design."
    ],
    skills: ["After Effects", "Color Grading", "Sound FX", "Short Form"]
  }
];

export const TOOLS: ToolItem[] = [
  {
    name: "Premiere Pro",
    category: "Editing",
    proficiency: 98,
    iconName: "Pr",
    description: "Primary NLE for timeline cuts, speed ramping, multi-cam editing and narrative assembly.",
    accentColor: "#00005B",
    tags: ["Timeline", "Multi-Cam", "Color", "Audio"]
  },
  {
    name: "After Effects",
    category: "VFX & Motion",
    proficiency: 95,
    iconName: "Ae",
    description: "Motion graphics, visual effects, kinetic typography, and complex compositing.",
    accentColor: "#00005B",
    tags: ["Motion Graphics", "VFX", "Typography", "Compositing"]
  },
  {
    name: "DaVinci Resolve",
    category: "Color & Audio",
    proficiency: 96,
    iconName: "DaVinci",
    description: "Hollywood standard node-based color grading and Fairlight audio post-production.",
    accentColor: "#151515",
    tags: ["Color Grading", "Scopes", "Fairlight", "Fusion"]
  },
  {
    name: "Photoshop",
    category: "Graphics",
    proficiency: 92,
    iconName: "Ps",
    description: "High CTR thumbnail creation, image retouching, and graphic asset manipulation.",
    accentColor: "#001E36",
    tags: ["Thumbnails", "Retouching", "Design"]
  },
  {
    name: "Illustrator",
    category: "Graphics",
    proficiency: 88,
    iconName: "Ai",
    description: "Vector logo assets, custom icons, and vector elements for video animation.",
    accentColor: "#330000",
    tags: ["Vectors", "Icons", "Illustrations"]
  },
  {
    name: "Blender",
    category: "VFX & Motion",
    proficiency: 85,
    iconName: "Blender",
    description: "3D product renders, 3D text titles, and atmospheric particle simulation.",
    accentColor: "#2A1808",
    tags: ["3D Modeling", "Animation", "Rendering"]
  },
  {
    name: "CapCut",
    category: "Editing",
    proficiency: 94,
    iconName: "CapCut",
    description: "Fast-paced short form video creation, captions, and social media trends.",
    accentColor: "#151515",
    tags: ["Reels", "Shorts", "Captions", "TikTok"]
  },

];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "feat-1",
    title: "Creative Storytelling",
    description: "Turning ideas into visual emotions.",
    icon: "Sparkles",
    stats: "+340% Avg Retention",
    detailText: "We construct narrative arcs around curiosity gaps, pattern interrupts, and emotional payoff.",
    accent: "purple"
  },
  {
    id: "feat-2",
    title: "Fast & Reliable",
    description: "Quick turnaround without compromising quality.",
    icon: "Zap",
    stats: "Fast Delivery",
    detailText: "Optimized workflow pipelines guarantee speed and sub-frame precision.",
    accent: "blue"
  },
  {
    id: "feat-3",
    title: "Motion Graphics",
    description: "Eye-catching motion that brings life.",
    icon: "Layers",
    stats: "100% Custom",
    detailText: "Dynamic kinetic typography and sleek visual elements created from scratch.",
    accent: "orange"
  },
  {
    id: "feat-4",
    title: "Cinematic Color",
    description: "Professional color grading & visual tone.",
    icon: "Palette",
    stats: "ACES Pipeline",
    detailText: "Converting flat camera footage into rich, filmic imagery with vivid contrast.",
    accent: "purple"
  },
  {
    id: "feat-5",
    title: "Sound Design",
    description: "Enhancing stories through sound.",
    icon: "Volume2",
    stats: "-14 LUFS Mastered",
    detailText: "Multi-layered audio stems, crisp voiceovers, and impactful SFX risers.",
    accent: "blue"
  },
  {
    id: "feat-6",
    title: "Professional Workflow",
    description: "Organized process from start to finish.",
    icon: "Workflow",
    stats: "Smooth Process",
    detailText: "Clear revision cycles, proxy support, and seamless communication.",
    accent: "orange"
  }
];

export const COLOR_GRADE_PRESETS: ColorGradePreset[] = [
  {
    id: "preset-1",
    name: "Teal & Orange Blockbuster",
    description: "Classic high-contrast cinematic palette with warm skin tones.",
    temperature: -15,
    tint: 8,
    contrast: 35,
    saturation: 25,
    highlights: "#FDBA74",
    shadows: "#0F766E",
    sampleImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "preset-2",
    name: "Kodak Portra 400 Film",
    description: "Warm organic film look with soft highlight roll-off.",
    temperature: 25,
    tint: 12,
    contrast: 18,
    saturation: 10,
    highlights: "#FED7AA",
    shadows: "#3F3F46",
    sampleImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
  }
];

