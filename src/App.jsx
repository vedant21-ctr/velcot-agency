import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components & Sections
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Work from './sections/Work';
import Constellation from './sections/Constellation';
import Journey from './sections/Journey';
import Pricing from './sections/Pricing';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Keep GSAP ScrollTrigger synchronized
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-bg-base text-text-primary overflow-x-hidden selection:bg-brand-primary selection:text-bg-base">
      {/* SVG Grain Overlay */}
      <div className="noise-overlay pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.07 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Shared Elements */}
      <CustomCursor />
      <Nav />

      {/* Page Content Sections */}
      <main>
        <Hero />
        <Services />
        <Work />
        <Constellation />
        <Journey />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
