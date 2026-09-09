import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenShowreel: () => void;
  audioMuted: boolean;
  setAudioMuted: (muted: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenShowreel,
  audioMuted,
  setAudioMuted,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Tools', href: '#tools' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Why Me', href: '#why-me' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-white/10' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between">
          
          {/* Brand Name */}
          <a href="#home" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-600 to-orange-500 flex items-center justify-center font-display font-black text-white text-xs shadow-md group-hover:scale-105 transition-transform">
              LC
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-wider text-white group-hover:text-pink-400 transition-colors leading-none">
                LOGESH <span className="text-pink-500">C</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-gray-400 uppercase mt-1">
                VIDEO EDITOR &amp; CREATOR
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full bg-[#121212]/80 backdrop-blur-md border border-white/10 shadow-xl">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveTab(link.name)}
                  className={`relative text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-500 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Let's Talk Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-2 transition-all shadow-lg hover:border-pink-500/50"
            >
              <span>LET'S TALK</span>
              <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#151515] border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0B0B]/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className="block text-lg font-display text-gray-300 hover:text-pink-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-orange-500 text-center font-medium text-white block"
                >
                  Let's Work Together ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

