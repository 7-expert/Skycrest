'use client';

import { useEffect, useRef } from 'react';
import { ShieldCheck, Leaf, Activity, HardHat, Award, Recycle } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const METRICS = [
  {
    icon: Activity,
    value: '0.12 TRIR',
    title: 'SAFETY BENCHMARK',
    desc: 'Total Recordable Incident Rate 85% lower than national heavy industry averages.',
  },
  {
    icon: Leaf,
    value: '100% LEED',
    title: 'GREEN BUILDING CAPABLE',
    desc: 'LEED Gold & Platinum certification track record on over 65 commercial projects.',
  },
  {
    icon: Recycle,
    value: '35% REDUCTION',
    title: 'EMBEDDED CARBON IN CONCRETE',
    desc: 'Pioneering low-carbon concrete mixes and recycled structural steel sourcing.',
  },
  {
    icon: ShieldCheck,
    value: 'ISO 45001',
    title: 'OCCUPATIONAL HEALTH',
    desc: 'Globally audited environmental and occupational health safety systems.',
  },
];

export default function SafetySustainability() {
  const sectionRef = useRef(null);
  const blocksRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        blocksRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="safety" ref={sectionRef} className="relative bg-charcoal text-off-white py-28 border-b border-steel-border/60">
      {/* Background Structural Accent Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-condensed font-bold tracking-[0.25em] text-amber-gold uppercase mb-3">
              <ShieldCheck className="w-4 h-4 text-amber-gold" />
              <span>UNCOMPROMISING COMMITMENT</span>
            </div>
            <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl tracking-tight uppercase text-white leading-none mb-6">
              SAFETY FIRST &amp; SUSTAINABLE ENGINEERING
            </h2>
            <p className="text-base sm:text-lg text-off-white/80 font-light leading-relaxed">
              At Skycrest, safety is not merely a policy — it is our core engineering culture. Every worker returns home safely, every shift, without exception. Simultaneously, we integrate ultra-low-carbon materials, circular construction waste management, and energy-efficient building envelopes across all global sites.
            </p>
          </div>

          <div className="lg:col-span-5 bg-charcoal-card p-8 border border-steel-border relative">
            <div className="w-12 h-1 bg-amber-gold mb-6" />
            <div className="flex items-center gap-4 mb-4">
              <HardHat className="w-8 h-8 text-amber-gold" />
              <div>
                <div className="font-condensed font-extrabold text-2xl text-white uppercase">
                  ZERO HARM CULTURE
                </div>
                <div className="text-xs font-mono text-mid-gray">DAILY MANDATORY PRE-TASK AUDITS</div>
              </div>
            </div>
            <p className="text-xs text-off-white/70 font-light leading-relaxed">
              Our proprietary Safety Telemetry platform tracks real-time crane loads, structural stress sensors, and site personnel safety gear adherence 24/7.
            </p>
          </div>
        </div>

        {/* 4 Stat Block Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.title}
                ref={(el) => (blocksRef.current[idx] = el)}
                className="bg-charcoal-card p-8 border border-steel-border hover:border-amber-gold transition-colors duration-300 group"
              >
                <div className="p-3 bg-charcoal inline-block border border-steel-border mb-6 group-hover:border-amber-gold transition-colors">
                  <Icon className="w-6 h-6 text-amber-gold" />
                </div>
                <div className="font-condensed font-extrabold text-3xl sm:text-4xl text-amber-gold tracking-tight mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-condensed font-bold text-white tracking-wider uppercase mb-3">
                  {metric.title}
                </div>
                <p className="text-xs text-mid-gray font-light leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
