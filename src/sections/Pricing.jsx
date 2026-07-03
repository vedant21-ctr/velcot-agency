import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useWebGLCapabilities } from '../hooks/useWebGLCapabilities';

// Aurora background managed globally in App.jsx
const Magnet = React.lazy(() => import('../components/react-bits/Magnet'));

const TIERS = [
  {
    name: 'Sprint Launch',
    price: '$3,500',
    frequency: 'per project',
    desc: 'Perfect for early-stage startups needing a premium, high-converting landing page or single-page application to validate their product.',
    duration: '7 — 10 days delivery',
    features: [
      'Custom UI/UX & Web Design in Figma',
      'Production-ready React + Vite code',
      'Full SEO setup & 100/100 performance score',
      'Lenis smooth scroll + GSAP micro-animations',
      '1 cycle of modifications'
    ],
    highlight: false,
    cta: 'Start Sprint'
  },
  {
    name: 'Product Core',
    price: '$8,000',
    frequency: 'per project',
    desc: 'For mature startups requiring a multi-page web platform, interactive dashboards, custom WebGL graphics, or complex SaaS integrations.',
    duration: '3 — 4 weeks delivery',
    features: [
      'Complete component-driven design library',
      'Advanced interactive elements & 3D maps',
      'Full database/API endpoints integration',
      'Custom animations & scroll-driven states',
      '3 cycles of modifications'
    ],
    highlight: true,
    cta: 'Build Platform'
  },
  {
    name: 'Product Retainer',
    price: '$5,000',
    frequency: 'per month',
    desc: 'On-demand design and development support acting as your dedicated design partner. Best for growing projects that iterate rapidly.',
    duration: 'Minimum 2 months commitment',
    features: [
      '15 hours per week dedicated bandwidth',
      'Direct communication channel via Slack/Discord',
      'UI design, prototyping & codebase maintenance',
      'Rapid hotfixes and telemetry monitoring',
      'Weekly strategy & design alignment calls'
    ],
    highlight: false,
    cta: 'Secure Bandwidth'
  }
];

export default function Pricing() {
  const { lowPower: isReduced, checked } = useWebGLCapabilities();
  const pricingSectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: '200px' });
    if (pricingSectionRef.current) observer.observe(pricingSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" ref={pricingSectionRef} className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-transparent border-t border-white/5 flex flex-col justify-center overflow-hidden">
      {/* Squircle SVG clipPath definitions */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.08 0.08,0 0.5,0 C 0.92,0 1,0.08 1,0.5 C 1,0.92 0.92,1 0.5,1 C 0.08,1 0,0.92 0,0.5 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Dynamic fixed background managed globally in App.jsx */}

      {/* Background decoration fallback */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-primary font-bold mb-3 inline-block">
            ✦ Clear Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-text-primary">
            No guessing games.
          </h2>
          <p className="mt-4 text-text-muted font-light leading-relaxed text-sm md:text-base">
            Transparent pricing models for startups. Pick a package that aligns with your current milestone.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-8 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 bg-bg-panel/40 backdrop-blur-sm"
              style={{
                clipPath: 'url(#squircle-clip)',
                height: '100%'
              }}
            >
              {/* Squircle Custom Border Stroke */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path
                  d="M 0,50 C 0,8 8,0 50,0 C 92,0 100,8 100,50 C 100,92 92,100 50,100 C 8,100 0,92 0,50 Z"
                  fill="none"
                  stroke={tier.highlight ? 'rgba(110, 92, 255, 0.4)' : 'rgba(255, 255, 255, 0.05)'}
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {/* Highlight Tag */}
              {tier.highlight && (
                <div className="absolute top-4 right-4 bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                  Recommended
                </div>
              )}

              {/* Package Details */}
              <div>
                <span className="text-xs uppercase tracking-widest text-text-muted font-bold block mb-1">
                  {tier.name}
                </span>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl md:text-5xl font-display font-extrabold text-text-primary">
                    {tier.price}
                  </span>
                  <span className="text-xs text-text-muted">/{tier.frequency}</span>
                </div>
                <span className="text-xs text-brand-accent font-medium block mt-2 font-mono">
                  ✦ {tier.duration}
                </span>

                <p className="text-xs text-text-muted mt-6 font-light leading-relaxed">
                  {tier.desc}
                </p>

                {/* Features List */}
                <div className="mt-8 pt-8 border-t border-white/5 space-y-3.5">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-text-primary">
                      <span className="text-brand-primary mt-0.5">✔</span>
                      <span className="leading-relaxed font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="mt-10">
                <Suspense fallback={
                  <button
                    onClick={scrollToContact}
                    className={`w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors font-display ${
                      tier.highlight
                        ? 'bg-brand-primary text-bg-base hover:bg-brand-primary/95'
                        : 'bg-white/5 text-text-primary border border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {tier.cta}
                  </button>
                }>
                  <Magnet padding={50} magnetStrength={3} wrapperClassName="w-full">
                    <button
                      onClick={scrollToContact}
                      className={`w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors font-display ${
                        tier.highlight
                          ? 'bg-brand-primary text-bg-base hover:bg-brand-primary/95'
                          : 'bg-white/5 text-text-primary border border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {tier.cta}
                    </button>
                  </Magnet>
                </Suspense>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
