import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES_DATA = [
  {
    id: 'web-design',
    num: '01',
    title: 'Brand & Web Design',
    desc: 'Artistic direction and structural layouts that translate brand identity into premium visual architecture. We design for clarity, rhythm, and distinct aesthetic character.',
    deliverable: 'Figma Systems, Typography Scales, High-Fidelity Interactive Prototypes',
    previewColor: 'from-[#6e5cff]/30 to-[#6e5cff]/5',
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-40 h-40 border border-brand-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-24 h-24 border border-dashed border-brand-accent/30 rounded-full animate-[spin_6s_linear_infinite]" />
        <div className="w-8 h-8 bg-brand-primary rounded-lg rotate-45 flex items-center justify-center">
          <span className="text-[10px] text-bg-base font-bold font-display">UI</span>
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
    previewColor: 'from-[#ff5a36]/30 to-[#ff5a36]/5',
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[200px] border border-white/10 rounded-lg p-3 bg-bg-base/80 shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-3/4 bg-brand-primary/20 rounded" />
            <div className="h-2 w-1/2 bg-brand-accent/20 rounded" />
            <div className="h-2 w-5/6 bg-white/5 rounded" />
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
    previewColor: 'from-[#6e5cff]/30 to-[#ff5a36]/10',
    graphic: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-24 h-48 border border-white/20 rounded-2xl p-2 bg-bg-base/80 relative flex flex-col justify-between">
          <div className="w-8 h-3 bg-white/20 rounded-full mx-auto mb-2" />
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="h-10 w-full bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-lg" />
            <div className="h-4 w-2/3 bg-white/5 rounded-md" />
          </div>
          <div className="w-4 h-4 rounded-full border border-white/15 mx-auto mt-2" />
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
    previewColor: 'from-white/15 to-white/0',
    graphic: (
      <div className="relative w-full h-full flex flex-col justify-center gap-2 p-6">
        <div className="flex justify-between items-center text-xs text-text-muted">
          <span>Efficiency</span>
          <span className="text-brand-primary">+85%</span>
        </div>
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
          <div className="bg-brand-primary h-full w-[85%] rounded-full" />
        </div>
        <div className="flex justify-between items-center text-xs text-text-muted">
          <span>Interactions</span>
          <span className="text-brand-accent">100ms</span>
        </div>
        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
          <div className="bg-brand-accent h-full w-[95%] rounded-full" />
        </div>
      </div>
    )
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(SERVICES_DATA[0].id);

  return (
    <section id="services" className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-[#0c0d10] border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold mb-3 inline-block">
            ✦ Core Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-text-primary">
            We deliver polish.
          </h2>
          <p className="mt-4 text-text-muted max-w-lg font-light leading-relaxed">
            Eliminating structural layouts templates. Each service is custom tailored and documented.
          </p>
        </div>

        {/* Asymmetric Accordion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Accordion Column */}
          <div className="col-span-1 lg:col-span-7 space-y-4">
            {SERVICES_DATA.map((service) => {
              const isOpen = activeTab === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`border-b border-white/10 pb-6 cursor-pointer group transition-all duration-300 ${
                    isOpen ? 'border-brand-primary' : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className={`font-display text-base font-medium transition-colors ${
                        isOpen ? 'text-brand-primary' : 'text-text-muted group-hover:text-text-primary'
                      }`}>
                        {service.num}
                      </span>
                      <h3 className={`text-xl md:text-2xl font-display font-semibold transition-colors ${
                        isOpen ? 'text-text-primary' : 'text-text-muted group-hover:text-text-primary'
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                    <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-90 text-brand-primary' : 'text-text-muted group-hover:text-text-primary'}`}>
                      →
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-text-muted font-light leading-relaxed pr-6">
                          {service.desc}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                          <span className="text-brand-primary font-bold uppercase tracking-wider">Deliverables:</span>
                          <span className="text-text-primary font-medium">{service.deliverable}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Interactive Preview Panel */}
          <div className="col-span-1 lg:col-span-5 h-[350px] lg:h-[450px] rounded-2xl bg-bg-panel border border-white/5 overflow-hidden p-8 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-gradient-to-br transition-all duration-500 opacity-20 pointer-events-none" />
            <div className="flex justify-between items-center text-xs uppercase tracking-widest text-text-muted z-10">
              <span>Interactive Preview</span>
              <span className="text-brand-primary font-bold">● Live</span>
            </div>

            {/* Render Selected Graphic */}
            <div className="flex-1 flex items-center justify-center z-10 transition-transform duration-500">
              {SERVICES_DATA.find((s) => s.id === activeTab)?.graphic}
            </div>

            <div className="z-10 bg-bg-base/40 backdrop-blur-sm p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <span className="text-xs text-text-muted">Explore our signature workflow details.</span>
              <span className="text-[10px] uppercase font-bold text-brand-accent">0{SERVICES_DATA.findIndex(s => s.id === activeTab) + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
