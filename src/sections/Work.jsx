import React, { useLayoutEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

const PixelTransition = React.lazy(() => import('../components/react-bits/PixelTransition'));
const ImageTrail = React.lazy(() => import('../components/react-bits/ImageTrail'));

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: '01',
    title: 'HaveCrops Analytics',
    category: 'Agritech / Big Data',
    desc: 'Telemetry & yield visualization dashboards for modern commercial agricultural operations. Built with fast-loading live charts and web sockets.',
    tags: ['React', 'D3.js', 'FastAPI'],
    gradient: 'from-emerald-500/20 to-teal-500/5',
    color: '#10b981',
    mockup: (
      <div className="w-full h-full bg-[#111318] rounded-xl border border-emerald-500/20 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <span className="text-xs text-emerald-400 font-bold">● Yield Tracker</span>
          <span className="text-[10px] text-text-muted">Live Telemetry</span>
        </div>
        <div className="flex-1 flex items-end justify-between gap-2 my-8 h-32">
          {[40, 65, 45, 80, 55, 95, 75, 110, 85].map((val, idx) => (
            <div key={idx} className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-sm" style={{ height: `${val}%` }} />
          ))}
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-muted">Moisture Index</span>
          <span className="text-text-primary font-bold">84.2% (Optimal)</span>
        </div>
      </div>
    )
  },
  {
    num: '02',
    title: 'ReadStream',
    category: 'SaaS / Content',
    desc: 'Realtime content syndication system feeding semantic text streams into desktop e-readers. Highly optimized for text layouts and low latency.',
    tags: ['Next.js', 'WebSockets', 'Tailwind'],
    gradient: 'from-violet-500/20 to-purple-500/5',
    color: '#8b5cf6',
    mockup: (
      <div className="w-full h-full bg-[#111318] rounded-xl border border-violet-500/20 p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <span className="text-xs text-violet-400 font-bold">✦ Reader Feed</span>
          <span className="text-xs text-text-muted">Stream Connected</span>
        </div>
        <div className="space-y-3 my-6">
          <div className="p-2 bg-white/5 rounded border border-white/5">
            <p className="text-xs text-text-primary font-medium">Analyzing micro-interaction design patterns on Awwwards...</p>
          </div>
          <div className="p-2 bg-white/5 rounded border border-white/5 opacity-60">
            <p className="text-xs text-text-primary font-medium">CNCF contribution review process metrics released.</p>
          </div>
        </div>
        <div className="text-[10px] text-text-muted flex justify-between">
          <span>Synced: 12ms ago</span>
          <span>482 articles</span>
        </div>
      </div>
    )
  },
  {
    num: '03',
    title: 'JetSetGo',
    category: 'Fintech / Travel',
    desc: 'Premium flight scheduling dashboard mapping global private charters. Designed for high-net-worth operators needing split-second routing updates.',
    tags: ['React', 'Mapbox', 'GraphQL'],
    gradient: 'from-cyan-500/20 to-blue-500/5',
    color: '#06b6d4',
    mockup: (
      <div className="w-full h-full bg-[#111318] rounded-xl border border-cyan-500/20 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <span className="text-xs text-cyan-400 font-bold">▲ Flight Controller</span>
          <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-500/20">Active Nav</span>
        </div>
        <div className="relative flex-1 flex items-center justify-center my-4">
          <div className="w-32 h-32 rounded-full border border-dashed border-cyan-500/20 flex items-center justify-center animate-[spin_12s_linear_infinite]">
            <div className="w-20 h-20 rounded-full border border-cyan-500/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>
          <span className="absolute text-[10px] text-cyan-400 font-display">ROUTE ACTIVE</span>
        </div>
        <div className="text-xs text-text-muted flex justify-between">
          <span>ETD: 02:40 PM</span>
          <span className="text-text-primary">LHR → JFK</span>
        </div>
      </div>
    )
  },
  {
    num: '04',
    title: 'AnalysCar',
    category: 'Automotive IoT',
    desc: 'Telemetry ingestion engine mapping engine diagnostics and driver behavior curves. Ideal for high-end race and fleet operators.',
    tags: ['React', 'Node.js', 'InfluxDB'],
    gradient: 'from-orange-500/20 to-red-500/5',
    color: '#f97316',
    mockup: (
      <div className="w-full h-full bg-[#111318] rounded-xl border border-orange-500/20 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <span className="text-xs text-orange-400 font-bold">■ Telemetry logs</span>
          <span className="text-[10px] text-text-muted">RPM: 8200</span>
        </div>
        <div className="space-y-2 my-4">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Engine Load</span>
            <span className="text-orange-400 font-bold">92%</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full w-[92%] rounded-full" />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Tire Temp</span>
            <span className="text-orange-400 font-bold">115°C</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full w-[80%] rounded-full" />
          </div>
        </div>
        <div className="text-[10px] text-text-muted flex justify-between">
          <span>Sys Status: Stable</span>
          <span className="text-emerald-400">OK</span>
        </div>
      </div>
    )
  }
];

export default function Work() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const isReduced = useReducedMotion();

  useLayoutEffect(() => {
    if (isReduced) return;

    const sections = gsap.utils.toArray('.work-panel');
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        start: 'top top',
        end: () => `+=${triggerRef.current.offsetWidth}`,
      }
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
    };
  }, [isReduced]);

  return (
    <div ref={triggerRef} id="work" className="relative overflow-hidden bg-transparent">
      {/* Scroll indicator overlay */}
      <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-20">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-primary font-bold block mb-2">
          ✦ Selected Works
        </span>
        <h2 className="text-2xl md:text-4xl font-display font-extrabold text-text-primary">
          Built to perform.
        </h2>
      </div>

      {isReduced ? (
        // Stacked non-animated vertical layout for users with reduced motion preferences
        <div className="max-w-7xl mx-auto px-6 py-32 space-y-24">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/5 pt-12">
              <div className="md:col-span-5 space-y-4">
                <span className="text-xs font-mono text-brand-primary">{project.num} // {project.category}</span>
                <h3 className="text-2xl font-bold font-display">{project.title}</h3>
                <p className="text-text-muted text-sm">{project.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] border border-white/10 px-2 py-0.5 rounded text-text-muted">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-7 h-[300px] flex items-center justify-center">
                <div className="w-full max-w-[450px] h-full">
                  {project.mockup}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Horizon scrub container
        <div ref={containerRef} className="flex h-screen w-[400vw] items-center relative">
          {PROJECTS.map((project, idx) => (
            <section
              key={idx}
              className="work-panel w-screen h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 relative select-none"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40 pointer-events-none`} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl w-full items-center z-10">
                {/* Content */}
                <div className="col-span-1 lg:col-span-5 flex flex-col justify-center gap-6">
                  <div className="flex items-center gap-4 text-xs font-bold text-brand-primary">
                    <span>{project.num}</span>
                    <span className="w-8 h-[1px] bg-brand-primary" />
                    <span className="uppercase tracking-widest">{project.category}</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-text-primary tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-text-muted font-light leading-relaxed text-sm md:text-base">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs border border-white/10 px-3 py-1 rounded-full text-text-muted font-medium bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-primary hover:text-brand-accent transition-colors"
                    >
                      View Github Repository
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Simulated Device Frame Column */}
                <div className="col-span-1 lg:col-span-7 h-[350px] lg:h-[480px] flex items-center justify-center relative pointer-events-auto">
                  <Suspense fallback={
                    <div className="w-full max-w-[550px] h-full shadow-2xl relative">
                      {project.mockup}
                    </div>
                  }>
                    <div className="relative w-full max-w-[550px] h-full cursor-none">
                      {/* ImageTrail for subtle cursor trailing images */}
                      <ImageTrail 
                        items={['/projects/havecrops.png', '/projects/readstream.png', '/projects/jetsetgo.png', '/projects/analyscar.png']}
                        opacity={0.12} 
                      />

                      <PixelTransition
                        firstContent={project.mockup}
                        secondContent={
                          <img 
                            src={
                              project.num === '01' ? '/projects/havecrops.png' :
                              project.num === '02' ? '/projects/readstream.png' :
                              project.num === '03' ? '/projects/jetsetgo.png' :
                              '/projects/analyscar.png'
                            } 
                            alt={project.title}
                            className="w-full h-full object-cover rounded-[15px]" 
                          />
                        }
                        gridSize={10}
                        pixelColor="#08090B"
                        animationStepDuration={0.4}
                        aspectRatio="0%"
                        className="w-full h-full border border-white/5 shadow-2xl"
                      />
                    </div>
                  </Suspense>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
