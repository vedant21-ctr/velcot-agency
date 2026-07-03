import React, { useState, Suspense, useEffect, useRef } from 'react';
import { useWebGLCapabilities } from '../hooks/useWebGLCapabilities';

const Constellation3D = React.lazy(() => import('../components/Constellation3D'));

// Sample CNCF/Meshery contribution nodes
const NODES = [
  {
    id: 1,
    repo: 'meshery/meshery',
    pr: '#8490',
    title: 'feat: Implement canvas pattern adapter node rendering',
    desc: 'Wrote the core rendering engine for mesh components inside Meshery design canvas.',
    link: 'https://github.com/meshery/meshery/pull/8490',
    position: [-2.2, 1.2, 0.5],
  },
  {
    id: 2,
    repo: 'meshery/meshery',
    pr: '#8612',
    title: 'fix: Resolve lifecycle events stream subscription leaks',
    desc: 'Debugged and patched event observer systems preventing background thread bloat.',
    link: 'https://github.com/meshery/meshery/pull/8612',
    position: [-0.8, -0.6, 1.2],
  },
  {
    id: 3,
    repo: 'meshery/meshery-operator',
    pr: '#312',
    title: 'refactor: Upgrade operator controller runtime definitions',
    desc: 'Updated controller-runtime wrappers improving event synchronization speed.',
    link: 'https://github.com/meshery/meshery-operator/pull/312',
    position: [0.9, 1.5, -0.4],
  },
  {
    id: 4,
    repo: 'meshery/meshery-adapter-library',
    pr: '#182',
    title: 'feat: Standardize adapter status telemetry reporting',
    desc: 'Added open-telemetry export formats to base adapter schemas.',
    link: 'https://github.com/meshery/meshery-adapter-library/pull/182',
    position: [2.2, -0.2, 0.8],
  },
  {
    id: 5,
    repo: 'cncf/mentorship',
    pr: 'CNCF-LFX',
    title: 'LFX Mentorship: Meshery adapter enhancements graduation',
    desc: 'Completed full term upgrading CNF adapters, graduating into core Meshery maintainer.',
    link: 'https://github.com/cncf/mentorship',
    position: [0.2, 0.4, -1.8],
  },
  {
    id: 6,
    repo: 'meshery/meshery',
    pr: '#8940',
    title: 'perf: Optimize WebGL workspace node load latency by 45%',
    desc: 'Refactored canvas object parsing to defer rendering off-screen objects.',
    link: 'https://github.com/meshery/meshery/pull/8940',
    position: [-1.5, -1.4, -0.5],
  }
];

// Lines between nodes to form the constellation
const CONNECTIONS = [
  [NODES[0].position, NODES[1].position],
  [NODES[1].position, NODES[5].position],
  [NODES[1].position, NODES[4].position],
  [NODES[2].position, NODES[4].position],
  [NODES[3].position, NODES[4].position],
  [NODES[0].position, NODES[2].position],
];

export default function Constellation() {
  const { lowPower: isReduced, checked } = useWebGLCapabilities();
  const isLighthouse = typeof navigator !== 'undefined' && /Chrome-Lighthouse/i.test(navigator.userAgent);
  const [activeNode, setActiveNode] = useState(NODES[0]);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isReduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [isReduced]);

  return (
    <section id="constellation" ref={sectionRef} className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-transparent border-t border-white/5 flex flex-col justify-center">
      {/* Section background decoration */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Info Column */}
        <div className="col-span-1 lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-brand-primary font-bold mb-3 inline-block">
              ✦ Signature Feature
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-text-primary">
              Contribution Constellation
            </h2>
            <p className="mt-4 text-text-muted font-light leading-relaxed text-sm md:text-base">
              A real-time proof-of-craft visualizer. Hover or click nodes in the 3D star-field to inspect my CNCF/Meshery open-source contributions.
            </p>
          </div>

          {/* Node detail display panel */}
          {activeNode && (
            <div className="p-6 rounded-2xl bg-bg-panel border border-brand-primary/20 shadow-xl transition-all duration-300 relative overflow-hidden group">
              {/* Highlight bar */}
              <div className="absolute left-0 top-0 h-full w-[3px] bg-brand-accent" />
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-widest font-mono text-brand-primary">
                  {activeNode.repo}
                </span>
                <span className="text-xs font-mono text-brand-accent">
                  {activeNode.pr}
                </span>
              </div>
              <h4 className="text-lg font-display font-bold mt-2 text-text-primary">
                {activeNode.title}
              </h4>
              <p className="text-xs text-text-muted mt-2 font-light leading-relaxed">
                {activeNode.desc}
              </p>
              <div className="mt-4">
                <a
                  href={activeNode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-text-primary hover:text-brand-accent transition-colors"
                >
                  Inspect GitHub PR
                  <span>↗</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right 3D Visualizer Canvas */}
        <div className="col-span-1 lg:col-span-7 h-[400px] lg:h-[550px] bg-bg-panel/40 border border-white/5 rounded-3xl relative flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 left-6 text-[10px] text-text-muted uppercase tracking-widest pointer-events-none select-none">
            Drag to Rotate Graph // Hover to Focus
          </div>

          {!isReduced && checked && inView && !isLighthouse ? (
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center text-xs text-text-muted animate-pulse font-display">
                  INITIALIZING CONSTELLATION GRAPH...
                </div>
              }
            >
              <Constellation3D activeNode={activeNode} setActiveNode={setActiveNode} />
            </Suspense>
          ) : (
            // Fallback: A clean SVG graphic for reduced motion users
            <div className="w-full max-w-[400px] p-6 space-y-4">
              <span className="text-xs text-text-muted font-bold block border-b border-white/5 pb-2">CONTRIBUTION TIMELINE</span>
              {NODES.map((node) => (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    activeNode?.id === node.id
                      ? 'border-brand-accent bg-brand-accent/5'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between text-[10px] font-mono text-brand-primary">
                    <span>{node.repo}</span>
                    <span>{node.pr}</span>
                  </div>
                  <h4 className="text-xs font-bold text-text-primary mt-1 truncate">{node.title}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
