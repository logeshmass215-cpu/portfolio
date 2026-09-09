import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { ToolsGrid } from './components/ToolsGrid';
import { Showcase } from './components/Showcase';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Contact } from './components/Contact';
import { ShowreelModal } from './components/ShowreelModal';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-gray-100 font-sans selection:bg-pink-500/30 selection:text-pink-200 antialiased pb-20">
      
      {/* Custom Pointer Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar
        onOpenShowreel={() => setShowreelOpen(true)}
        audioMuted={audioMuted}
        setAudioMuted={setAudioMuted}
      />

      {/* Main Container */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-24 space-y-8">
        
        {/* HERO SECTION */}
        <Hero onOpenShowreel={() => setShowreelOpen(true)} />

        {/* FEATURED SHOWCASE WORKS */}
        <Showcase />

        {/* Bottom Callout Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#121212]/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-wider">
              LET'S CREATE SOMETHING AMAZING TOGETHER.
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Open for freelance projects, collaborations and creative opportunities.
            </p>
          </div>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-pink-600/30 whitespace-nowrap transition-all active:scale-95"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* ABOUT ME SECTION */}
        <About />

        {/* WORK JOURNEY TIMELINE (FULL WIDTH) */}
        <Experience />

        {/* SOFTWARE ARSENAL (TOOLS GRID) */}
        <ToolsGrid />

        {/* WHY WORK WITH ME & CONTACT 2-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <WhyWorkWithMe />
          <Contact />
        </div>

        {/* Minimal Footer */}
        <footer className="pt-8 text-center text-xs text-gray-400 font-mono flex flex-col sm:flex-row items-center justify-between border-t border-white/5">
          <p>© {new Date().getFullYear()} Logesh C. All rights reserved.</p>
          <p className="text-gray-400">Crafted with precision &amp; passion</p>
        </footer>
      </main>

      {/* Showreel Modal Player */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />

    </div>
  );
}

