import React from 'react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-base border-t border-white/5 py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto z-10 relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        {/* Left Side */}
        <div className="space-y-4">
          <div 
            onClick={() => scrollTo('hero')} 
            className="text-3xl font-bold font-display cursor-pointer flex items-center gap-2 select-none group"
          >
            <span className="text-brand-primary">✦</span>
            <span className="tracking-tight text-text-primary">VELOCT</span>
          </div>
          <p className="text-xs text-text-muted max-w-xs font-light leading-relaxed">
            High-craft digital interfaces engineered to load fast, feel fluid, and perform perfectly.
          </p>
        </div>

        {/* Right Links */}
        <div className="flex flex-wrap gap-12 text-xs">
          {/* Navigation Links */}
          <div className="space-y-3">
            <span className="uppercase tracking-widest text-text-primary font-bold block mb-1">Index</span>
            <button onClick={() => scrollTo('services')} className="text-text-muted hover:text-text-primary block transition-colors text-left">Services</button>
            <button onClick={() => scrollTo('work')} className="text-text-muted hover:text-text-primary block transition-colors text-left">Work</button>
            <button onClick={() => scrollTo('constellation')} className="text-text-muted hover:text-text-primary block transition-colors text-left">Constellation</button>
            <button onClick={() => scrollTo('journey')} className="text-text-muted hover:text-text-primary block transition-colors text-left">Journey</button>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3">
            <span className="uppercase tracking-widest text-text-primary font-bold block mb-1">Connect</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary block transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary block transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary block transition-colors">Twitter / X</a>
            <a href="https://meshery.io" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary block transition-colors">Meshery CNCF</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto z-10 relative mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-text-muted uppercase tracking-widest font-bold">
        <span>© 2026 Veloct Studio. All rights reserved.</span>
        <span>Crafted by Vedant</span>
      </div>
    </footer>
  );
}
