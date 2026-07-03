import React, { Suspense } from 'react';
import { Globe } from 'lucide-react';

const Dock = React.lazy(() => import('../components/react-bits/Dock'));

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const dockItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-text-primary">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
      label: 'GitHub',
      onClick: () => window.open('https://github.com', '_blank')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-text-primary">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      label: 'LinkedIn',
      onClick: () => window.open('https://linkedin.com', '_blank')
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-text-primary">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: 'Twitter / X',
      onClick: () => window.open('https://twitter.com', '_blank')
    },
    {
      icon: <Globe size={16} className="text-text-primary" />,
      label: 'CNCF Meshery',
      onClick: () => window.open('https://meshery.io', '_blank')
    }
  ];

  return (
    <footer className="bg-transparent border-t border-white/5 py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
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
          <div className="space-y-3 min-w-[200px]">
            <span className="uppercase tracking-widest text-text-primary font-bold block mb-1">Connect</span>
            <div className="h-14 relative w-full flex items-center justify-start pointer-events-auto">
              <Suspense fallback={
                <span className="text-[10px] text-text-muted uppercase tracking-wider font-bold animate-pulse">Loading connect dock...</span>
              }>
                <Dock items={dockItems} className="!left-0 !transform-none !bottom-0" baseItemSize={36} magnification={50} panelHeight={46} />
              </Suspense>
            </div>
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
