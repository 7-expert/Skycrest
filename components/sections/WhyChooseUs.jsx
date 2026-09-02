'use client';

import { useEffect, useRef } from 'react';
import { Landmark, Cpu, Globe, ShieldCheck } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const STATS = [
  { value: '15+', label: 'YEARS EXPERIENCE' },
  { value: '50+', label: 'PROJECTS COMPLETED' },
  { value: '100%', label: 'CLIENT SATISFACTION' },
  { value: '250+', label: 'EXPERT WORKERS' },
];

const FEATURES = [
  {
    num: '01',
    icon: Landmark,
    title: 'UNMATCHED BONDING & FINANCIAL CAPACITY',
    desc: '$5B+ aggregate bonding capacity backed by top-tier investment-grade financial institutions, assuring execution security for mega-projects.',
    tag: 'FINANCIAL STRENGTH',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'ADVANCED 4D/5D BIM & DIGITAL TWINS',
    desc: 'Real-time laser scanning, drone photogrammetry, and predictive clash-detection models that prevent expensive field redesigns.',
    tag: 'PROPTECH INTEGRATION',
  },
  {
    num: '03',
    icon: Globe,
    title: 'GLOBAL SUPPLY CHAIN RESILIENCE',
    desc: 'Direct mill relationships with premier global steel fabricators and equipment manufacturers guarantees long-lead material deliveries.',
    tag: 'PROCUREMENT LOGISTICS',
  },
  {
    num: '04',
    icon: ShieldCheck,
    title: 'SINGLE-POINT EPC ACCOUNTABILITY',
    desc: 'Integrated engineering, procurement, and construction under one roof — eliminating subcontractor friction and schedule slippage.',
    tag: 'TURNKEY EXECUTION',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsBarRef = useRef(null);
  const statsRef = useRef([]);
  const cardsGridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Entrance Animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Stats Bar Stagger Animation
      if (statsRef.current.length > 0) {
        gsap.fromTo(
          statsRef.current.filter(Boolean),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsBarRef.current || sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Feature Cards Stagger Animation (Triggered directly on cards grid container)
      if (cardsRef.current.length > 0 && cardsGridRef.current) {
        gsap.fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="why-choose-us" 
      ref={sectionRef} 
      className="relative bg-charcoal-dark text-off-white py-24 sm:py-32 border-b border-steel-border/40 overflow-hidden"
    >
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Accent Amber Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Frame */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-steel-border/50 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] text-amber-gold uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-amber-gold inline-block" />
              <span>:: THE SKYCREST DIFFERENCE</span>
            </div>
            <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl tracking-tight uppercase leading-none text-off-white">
              WHY LEADING DEVELOPERS <span className="text-amber-gold">CHOOSE US</span>
            </h2>
          </div>
          <p className="text-sm text-mid-gray max-w-md font-light leading-relaxed">
            Proven institutional reliability, advanced digital engineering tools, and aggressive schedule execution.
          </p>
        </div>

        {/* Original Stat Metrics Counter Bar Strip */}
        <div ref={statsBarRef} className="relative mb-20 py-10 bg-charcoal-card border-y-2 border-amber-gold/80 rounded-xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-6 text-center">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                ref={(el) => (statsRef.current[idx] = el)}
                className="flex flex-col items-center justify-center"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-condensed font-black text-amber-gold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-off-white uppercase tracking-widest mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group bg-charcoal-card border border-steel-border/60 rounded-2xl p-8 relative flex flex-col justify-between transition-all duration-500 hover:border-amber-gold hover:shadow-2xl hover:shadow-amber-gold/10 hover:-translate-y-2"
              >
                <div>
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-amber-gold/80 tracking-widest">
                      PILLAR {feat.num}
                    </span>
                    <div className="w-12 h-12 bg-charcoal border border-steel-border rounded-xl flex items-center justify-center group-hover:bg-amber-gold group-hover:border-amber-gold transition-all duration-300">
                      <Icon className="w-6 h-6 text-amber-gold group-hover:text-charcoal transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-condensed font-extrabold text-xl text-off-white tracking-wide uppercase mb-4 leading-snug group-hover:text-amber-gold transition-colors duration-300">
                    {feat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-light text-mid-gray leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="mt-8 pt-4 border-t border-steel-border/40 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-amber-gold uppercase">
                    {feat.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

