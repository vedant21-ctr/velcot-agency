import React, { useEffect, useState } from 'react';
import Magnetic from './Magnetic';

export default function Nav() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check which section is in view
      const sections = ['hero', 'services', 'work', 'constellation', 'journey', 'pricing', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-bg-base/50 backdrop-blur-lg border-b border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollTo('hero')} 
          className="text-2xl font-bold font-display cursor-pointer flex items-center gap-2 select-none group"
        >
          <span className="text-brand-primary transition-transform duration-300 group-hover:-rotate-12">✦</span>
          <span className="tracking-tight text-text-primary">VELOCT</span>
          <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
            Studio
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { id: 'services', label: 'Services' },
            { id: 'work', label: 'Work' },
            { id: 'constellation', label: 'Constellation' },
            { id: 'journey', label: 'Journey' },
            { id: 'pricing', label: 'Pricing' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-sm font-medium transition-colors relative py-1 hover:text-text-primary ${
                activeSection === item.id ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div>
          <Magnetic range={0.2}>
            <button
              onClick={() => scrollTo('contact')}
              className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-primary hover:bg-brand-primary/90 text-bg-base transition-colors font-display"
            >
              Start Project
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div 
        className="h-[2px] bg-gradient-to-r from-brand-primary via-brand-primary to-brand-accent transition-all duration-75 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
}
