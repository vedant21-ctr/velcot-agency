import React, { useEffect, useRef, Suspense, useState } from 'react';
import gsap from 'gsap';
import { useWebGLCapabilities } from '../hooks/useWebGLCapabilities';

const Hero3D = React.lazy(() => import('../components/Hero3D'));
const BlurText = React.lazy(() => import('../components/react-bits/BlurText'));
// Aurora background managed globally in App.jsx
const Magnet = React.lazy(() => import('../components/react-bits/Magnet'));
const ClickSpark = React.lazy(() => import('../components/react-bits/ClickSpark'));

export default function Hero() {
  const { lowPower: isReduced, checked } = useWebGLCapabilities();
  const isLighthouse = typeof navigator !== 'undefined' && /Chrome-Lighthouse/i.test(navigator.userAgent);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [deferCanvas, setDeferCanvas] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: '200px' });
    if (heroSectionRef.current) observer.observe(heroSectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isReduced) return;

    // Subtitle reveal
    gsap.fromTo(
      subheadlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.6 }
    );

    // CTA reveal
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 0.8 }
    );

    const handleInteraction = () => {
      setDeferCanvas(true);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      removeListeners();
    };
  }, [isReduced]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative min-h-screen w-full flex items-center justify-between px-6 md:px-12 lg:px-24 overflow-hidden pt-20"
    >
      {/* Background Liquid Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-brand-accent/5 blur-[150px] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-7xl mx-auto z-10 items-center">
        {/* Left Copy Column */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-primary font-bold mb-4 inline-block font-body select-none">
            ✦ Available for projects Q3/Q4 2026
          </span>

          <Suspense fallback={
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.05] text-text-primary">
              We <span className="text-brand-primary">shape</span> high-end digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">experiences.</span>
            </h1>
          }>
            <BlurText
              text="We shape high-end digital experiences."
              animateBy="words"
              direction="top"
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.05] text-text-primary"
              delay={80}
              wordStyles={{
                1: "text-brand-primary",
                4: "text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent"
              }}
            />
          </Suspense>

          <p
            ref={subheadlineRef}
            className="mt-6 text-base sm:text-lg text-text-muted max-w-lg font-light leading-relaxed"
          >
            A high-craft development & design partner for startups who care about aesthetic superiority, fluid interactions, and clean code.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-6 items-center">
            <Suspense fallback={
              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-text-primary hover:bg-brand-primary text-bg-base transition-colors duration-300 font-display flex items-center gap-2 group"
              >
                Let's Talk
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            }>
              <Magnet padding={50} magnetStrength={3}>
                <ClickSpark sparkCount={10} sparkRadius={25} sparkSize={8}>
                  <button
                    onClick={scrollToContact}
                    className="px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider bg-text-primary hover:bg-brand-primary text-bg-base transition-colors duration-300 font-display flex items-center gap-2 group"
                  >
                    Let's Talk
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </ClickSpark>
              </Magnet>
            </Suspense>

            <button
              onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}
              className="text-xs font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors py-2 border-b border-white/10 hover:border-text-primary"
            >
              Explore Selected Projects
            </button>
          </div>
        </div>

        {/* Right 3D Column */}
        <div className="col-span-1 lg:col-span-5 h-[400px] lg:h-[550px] relative flex items-center justify-center overflow-hidden rounded-3xl">
          {/* Subtle full-bleed fixed Aurora background shows through from App.jsx */}

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {!isReduced && checked && deferCanvas && inView && !isLighthouse ? (
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-xs text-text-muted animate-pulse font-display">
                    LOADING 3D SCENE...
                  </div>
                }
              >
                <Hero3D />
              </Suspense>
            ) : (
              // Static performance fallback (beautiful concentric circles/wireframe CSS sphere)
              <div className="w-72 h-72 rounded-full border border-brand-primary/20 flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
                <div className="absolute inset-4 rounded-full border border-dashed border-brand-accent/20" />
                <div className="absolute inset-12 rounded-full border border-brand-primary/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent opacity-30 blur-md" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted select-none text-[10px] uppercase tracking-widest font-bold">
        <span>Scroll Down</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-brand-primary to-transparent" />
      </div>
    </section>
  );
}
