import React from 'react';
import Magnetic from '../components/Magnetic';

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
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-[#08090b] border-t border-white/5 flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[130px] pointer-events-none" />

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
              className={`rounded-3xl p-8 flex flex-col justify-between border relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                tier.highlight
                  ? 'bg-bg-panel border-brand-primary/50 shadow-2xl shadow-brand-primary/10'
                  : 'bg-bg-panel/40 border-white/5'
              }`}
            >
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
                <Magnetic range={0.15}>
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
                </Magnetic>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
