'use client';

import { useEffect, useRef } from 'react';
import { Landmark, Cpu, Network, ShieldAlert } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const FEATURES = [
  {
    icon: Landmark,
    title: 'UNMATCHED BONDING & FINANCIAL CAPACITY',
    desc: '$5B+ aggregate bonding capacity backed by top-tier investment-grade financial institutions, assuring execution security for mega-projects.',
  },
  {
    icon: Cpu,
    title: 'ADVANCED 4D/5D BIM & DIGITAL TWINS',
    desc: 'Real-time laser scanning, drone photogrammetry, and predictive clash-detection models that prevent expensive field redesigns.',
  },
  {
    icon: Network,
    title: 'GLOBAL SUPPLY CHAIN RESILIENCE',
    desc: 'Direct mill relationships with premier global steel fabricators and equipment manufacturers guarantees long-lead material deliveries.',
  },
  {
    icon: ShieldAlert,
    title: 'SINGLE-POINT EPC ACCOUNTABILITY',
    desc: 'Integrated engineering, procurement, and construction under one roof — eliminating subcontractor friction and schedule slippage.',
  },
];

export default function WhySkycrest() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 35 },
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
    <section className="relative bg-off-white text-charcoal py-28 border-b border-off-white-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-charcoal/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-condensed font-bold tracking-[0.25em] text-amber-hover uppercase mb-3">
              <span className="w-2.5 h-2.5 bg-amber-gold inline-block" />
              <span>THE SKYCREST DIFFERENCE</span>
            </div>
            <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl tracking-tight uppercase leading-none text-charcoal">
              WHY LEADING DEVELOPERS CHOOSE US
            </h2>
          </div>
          <p className="text-sm text-charcoal/70 max-w-md mt-4 md:mt-0 font-light">
            Proven institutional reliability, advanced digital engineering tools, and aggressive schedule execution.
          </p>
        </div>

        {/* 4 Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                ref={(el) => (itemsRef.current[idx] = el)}
                className="bg-white p-8 border border-charcoal/10 shadow-sm relative group hover:border-amber-gold transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-off-white border border-charcoal/10 flex items-center justify-center mb-6 group-hover:bg-amber-gold group-hover:border-amber-gold transition-colors duration-300">
                    <Icon className="w-6 h-6 text-charcoal" />
                  </div>

                  <h3 className="font-condensed font-extrabold text-xl text-charcoal tracking-tight uppercase mb-4 leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-xs font-light text-charcoal/75 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-charcoal/10 text-[10px] font-mono tracking-widest text-amber-hover uppercase">
                  ENTERPRISE CAPABILITY
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
