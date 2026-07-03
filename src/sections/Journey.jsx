import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const JOURNEY_STEPS = [
  {
    phase: '01',
    period: '2023 — 2024',
    title: 'The Foundation',
    subtitle: 'Academics & Core Craft',
    desc: 'Began as a developer digging into high-performance web systems and browser architecture. Discovered that the difference between an average site and a premium site lies in typography choice, motion curves, and asset pipelines.',
    milestones: ['Mastered React & GSAP pipelines', 'Designed 40+ interface prototypes', 'Optimized client-side paint profiles']
  },
  {
    phase: '02',
    period: '2024 — 2025',
    title: 'CNCF & Open Source Catalyst',
    subtitle: 'LFX Mentorship at Meshery',
    desc: 'Accepted into the CNCF (Cloud Native Computing Foundation) LFX Mentorship program. Engineered the web visual interface layer for Meshery, adding Canvas node features, telemetry monitors, and fixing memory leaks.',
    milestones: ['Graduated LFX CNCF Mentorship', '100+ commits merged in CNCF repos', 'Built low-latency canvas renderers']
  },
  {
    phase: '03',
    period: '2025 — Present',
    title: 'Veloct Studio Launch',
    subtitle: 'Freelance Polish & Startup Partners',
    desc: 'Founded Veloct Studio to build high-end freelance projects with agency-level engineering rigor. Partnered with startups in agritech, Fintech, and SaaS to launch bespoke platforms that load fast and look stunning.',
    milestones: ['Launched 6 custom start-up hubs', 'Achieved average LCP < 1.8s across builds', '100% Client satisfaction score']
  }
];

export default function Journey() {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();

  useLayoutEffect(() => {
    if (isReduced) return;

    // Pin timeline indicator lines or trigger opacity shifts
    const panels = gsap.utils.toArray('.journey-card');
    panels.forEach((panel) => {
      gsap.fromTo(
        panel,
        { opacity: 0.3, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );
    });
  }, [isReduced]);

  return (
    <section id="journey" ref={containerRef} className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-[#0c0d10] border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Title */}
        <div className="mb-24">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold mb-3 inline-block">
            ✦ Scrollytelling
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-text-primary">
            The Journey.
          </h2>
          <p className="mt-4 text-text-muted max-w-lg font-light leading-relaxed">
            From foundational frontend experiments to open-source maintainer status.
          </p>
        </div>

        {/* Timeline Structure */}
        <div className="relative border-l border-white/10 ml-4 md:ml-12 pl-8 md:pl-16 space-y-24">
          {JOURNEY_STEPS.map((step, idx) => (
            <div key={idx} className="journey-card relative">
              {/* Timeline Bullet */}
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-bg-base border border-brand-primary flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Period & Phase */}
                <div className="col-span-1 lg:col-span-4 flex flex-col justify-start">
                  <span className="text-xs font-mono text-brand-accent uppercase tracking-widest">{step.period}</span>
                  <span className="text-4xl md:text-5xl font-display font-extrabold text-white/5 mt-1 select-none">
                    PHASE {step.phase}
                  </span>
                </div>

                {/* Narrative Details */}
                <div className="col-span-1 lg:col-span-8 space-y-4">
                  <h3 className="text-xl md:text-3xl font-display font-bold text-text-primary leading-tight">
                    {step.title}
                  </h3>
                  <h4 className="text-xs uppercase tracking-widest text-brand-primary font-bold">
                    {step.subtitle}
                  </h4>
                  <p className="text-text-muted text-sm md:text-base font-light leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>

                  {/* Milestones list */}
                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold block mb-1">Key Milestones:</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-primary">
                      {step.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="flex items-center gap-2">
                          <span className="text-brand-primary">✦</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
