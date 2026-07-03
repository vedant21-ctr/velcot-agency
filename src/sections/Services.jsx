import React, { Suspense } from 'react';

const TiltedCard = React.lazy(() => import('../components/react-bits/TiltedCard'));
const AnimatedContent = React.lazy(() => import('../components/react-bits/AnimatedContent'));

const SERVICES_DATA = [
  {
    id: 'web-design',
    num: '01',
    title: 'Brand & Web Design',
    desc: 'Artistic direction and structural layouts that translate brand identity into premium visual architecture. We design for clarity, rhythm, and distinct aesthetic character.',
    deliverable: 'Figma Systems, Typography Scales, High-Fidelity Interactive Prototypes',
    graphic: (
      <div className="relative w-16 h-16 flex items-center justify-center border border-brand-primary/20 rounded-xl bg-bg-base/50">
        <div className="absolute w-12 h-12 border border-brand-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-8 h-8 border border-dashed border-brand-accent/30 rounded-full animate-[spin_6s_linear_infinite]" />
        <div className="w-4 h-4 bg-brand-primary rounded rotate-45 flex items-center justify-center">
          <span className="text-[6px] text-bg-base font-bold font-display">UI</span>
        </div>
      </div>
    )
  },
  {
    id: 'frontend',
    num: '02',
    title: 'Frontend Engineering',
    desc: 'Bespoke React development using cutting-edge animation engines and optimal asset pipelines. We bridge the gap between creative design and production-grade code.',
    deliverable: 'React & Next.js systems, GSAP/Motion pipelines, 60fps performance profiles',
    graphic: (
      <div className="relative w-16 h-16 flex items-center justify-center border border-white/10 rounded-xl bg-bg-base/50 p-2">
        <div className="w-full flex flex-col gap-1">
          <div className="flex items-center gap-1 border-b border-white/5 pb-1">
            <div className="w-1 h-1 rounded-full bg-brand-accent" />
            <div className="w-1 h-1 rounded-full bg-brand-primary" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 w-3/4 bg-brand-primary/20 rounded" />
            <div className="h-1 w-1/2 bg-brand-accent/20 rounded" />
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'apps',
    num: '03',
    title: 'App Development',
    desc: 'Building cross-platform interfaces that feel completely native, highly fluid, and integrated with modern API systems and backend pipelines.',
    deliverable: 'React Native builds, Swift/Kotlin standards, local caching & sync architectures',
    graphic: (
      <div className="relative w-16 h-16 flex items-center justify-center border border-white/10 rounded-xl bg-bg-base/50 p-2">
        <div className="w-6 h-12 border border-white/20 rounded-md p-0.5 bg-bg-base/80 relative flex flex-col justify-between">
          <div className="h-2 w-full bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-sm" />
          <div className="w-2 h-2 rounded-full border border-white/15 mx-auto" />
        </div>
      </div>
    )
  },
  {
    id: 'ux',
    num: '04',
    title: 'UX Consulting & Systems',
    desc: 'Audit and architectural overhaul of complex applications. We identify user-experience friction points and construct scalable design design libraries.',
    deliverable: 'Scalable Design Token Architecture, UX Auditing, High-conversion flow maps',
    graphic: (
      <div className="relative w-16 h-16 flex flex-col justify-center gap-1 border border-white/10 rounded-xl bg-bg-base/50 p-2">
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div className="bg-brand-primary h-full w-[85%] rounded-full" />
        </div>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div className="bg-brand-accent h-full w-[95%] rounded-full" />
        </div>
      </div>
    )
  }
];

// Dark dithered brand gradient SVG pattern
const CARD_BG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="350"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23111318"/><stop offset="100%" stop-color="%230c0d10"/></linearGradient><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.07 0"/></filter></defs><rect width="100%" height="100%" fill="url(%23g)"/><rect width="100%" height="100%" filter="url(%23n)"/><rect width="100%" height="100%" fill="none" stroke="%23ffffff" stroke-opacity="0.03" stroke-width="2"/></svg>`;

export default function Services() {
  return (
    <section id="services" className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-transparent border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold mb-3 inline-block">
            ✦ Core Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-text-primary">
            We deliver polish.
          </h2>
          <p className="mt-4 text-text-muted max-w-lg font-light leading-relaxed">
            Eliminating structural template layouts. Each service is custom tailored, interactive, and high-performance.
          </p>
        </div>

        {/* 2x2 Services TiltedCard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {SERVICES_DATA.map((service, index) => (
            <Suspense key={service.id} fallback={
              <div className="h-[350px] rounded-2xl bg-bg-panel border border-white/5 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-brand-primary">{service.num}</span>
                  <h3 className="text-xl font-bold font-display mt-2">{service.title}</h3>
                  <p className="text-text-muted text-xs mt-2">{service.desc}</p>
                </div>
              </div>
            }>
              <AnimatedContent
                threshold={0.1}
                delay={index * 80}
                className="w-full h-full"
              >
                <TiltedCard
                  imageSrc={CARD_BG}
                  altText={service.title}
                  containerHeight="350px"
                  containerWidth="100%"
                  imageHeight="350px"
                  imageWidth="100%"
                  scaleOnHover={1.03}
                  rotateAmplitude={8}
                  showTooltip={false}
                  showMobileWarning={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="absolute inset-0 p-8 flex flex-col justify-between text-left h-full w-full pointer-events-none select-none">
                      {/* Top Row: Num & Graphic */}
                      <div className="flex justify-between items-start w-full">
                        <span className="text-sm font-mono text-brand-primary font-bold">
                          // {service.num}
                        </span>
                        <div className="pointer-events-auto">
                          {service.graphic}
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div className="space-y-3">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary">
                          {service.title}
                        </h3>
                        <p className="text-xs text-text-muted font-light leading-relaxed">
                          {service.desc}
                        </p>
                        <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[10px]">
                          <span className="text-brand-accent font-bold uppercase tracking-widest font-mono">Deliverables:</span>
                          <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">{service.deliverable}</span>
                        </div>
                      </div>
                    </div>
                  }
                />
              </AnimatedContent>
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
}
