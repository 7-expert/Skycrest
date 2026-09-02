'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Building2, Factory, Construction, Wrench, Anchor } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const SERVICES = [
  {
    id: 'commercial',
    num: '01',
    title: 'COMMERCIAL & HIGH-RISE',
    subtitle: 'Dubai Residential & Commercial Towers',
    image: '/project images/c1.webp',
    icon: Building2,
    specs: ['Substructure 2B+G+10 Framing', 'Post-Tensioned Concrete', 'Authority Handover Compliance'],
  },
  {
    id: 'industrial',
    num: '02',
    title: 'WAREHOUSE & LOGISTICS HUBS',
    subtitle: 'Ras Al Khor Logistics & DIP Hubs',
    image: '/project images/c11.webp',
    icon: Factory,
    specs: ['Structural Steel Framing', 'Climate-Controlled Storage', 'Turnkey Facility Management'],
  },
  {
    id: 'towers',
    num: '03',
    title: 'RESIDENTIAL TOWER DEVELOPMENTS',
    subtitle: 'High-Density Podium & Roof Suites',
    image: '/project images/c9.webp',
    icon: Construction,
    specs: ['G+2P+16+Roof High-Rise Core', 'Deep Caisson Foundations', 'Full MEP System Integration'],
  },
  {
    id: 'midrise',
    num: '04',
    title: 'MID-RISE RESIDENTIAL BUILDINGS',
    subtitle: 'Urban Podiums & Multi-Family Suites',
    image: '/project images/c8.webp',
    icon: Wrench,
    specs: ['G+P+5+Roof Framing', 'Pre-Cast & In-Situ Concrete', 'Complete Interior Fit-Out'],
  },
  {
    id: 'villas',
    num: '05',
    title: 'LUXURY RESIDENTIAL VILLAS',
    subtitle: 'G+1 Private & Multi-Villa Communities',
    image: '/project images/c5.webp',
    icon: Anchor,
    specs: ['Multi-Unit G+1 Villa Enclaves', 'Turnkey Structural Erection', 'Custom Architectural Finish'],
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth + 140;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${totalScrollWidth + 300}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative bg-charcoal text-off-white overflow-hidden">
      
      {/* Pinning Trigger Wrapper - Perfectly proportioned for full card display */}
      <div ref={triggerRef} className="h-screen w-full flex flex-col justify-between pt-20 pb-6 relative overflow-hidden">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-gold/40" />

        {/* Section Header */}
        <div className="max-w-4xl mx-auto px-4 text-center z-10 shrink-0">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.3em] text-amber-gold uppercase mb-1">
            <span className="w-2 h-2 bg-amber-gold rounded-full animate-pulse" />
            <span>OUR CORE CAPABILITIES</span>
          </div>
          
          <h2 className="font-condensed font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight uppercase text-white leading-[0.95] drop-shadow-lg">
            HOW WE ARE BUILDING <span className="text-amber-gold">FASTER &amp; BETTER</span> THAN OTHERS!
          </h2>
        </div>

        {/* Horizontal Moving Cards Track - Compact Dimensions & Subtle Up/Down Stagger */}
        <div className="w-full overflow-hidden relative z-10 my-auto py-4">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 px-8 sm:px-16 w-max items-center"
          >
            {SERVICES.map((service, idx) => {
              const Icon = service.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={service.id}
                  className={`group relative w-[270px] sm:w-[320px] lg:w-[350px] h-[340px] sm:h-[380px] rounded-3xl overflow-hidden bg-charcoal-card transition-all duration-500 shadow-2xl shrink-0 flex flex-col justify-between transform ${
                    isEven ? '-translate-y-3 sm:-translate-y-4' : 'translate-y-3 sm:translate-y-4'
                  }`}
                >
                  {/* Background Image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 270px, 350px"
                    className="object-cover object-center filter contrast-[1.1] brightness-[0.75] group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

                  {/* Top Bar: Icon Badge & Circular Arrow Button */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-charcoal/80 border border-steel-border/80 flex items-center justify-center backdrop-blur-md">
                      <Icon className="w-5 h-5 text-amber-gold" />
                    </div>

                    {/* Circular Action Button ↗ */}
                    <a
                      href="#contact"
                      className="w-10 h-10 rounded-full bg-charcoal/90 border border-steel-border/80 flex items-center justify-center group-hover:bg-amber-gold group-hover:border-amber-gold transition-all duration-300 shadow-lg"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-charcoal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 p-4 sm:p-5">
                    <div className="text-[9px] font-mono font-bold text-amber-gold tracking-widest uppercase mb-1">
                      {service.num} // {service.subtitle}
                    </div>

                    <h3 className="font-condensed font-black text-lg sm:text-xl text-white uppercase leading-none mb-2.5 group-hover:text-amber-gold transition-colors">
                      {service.title}
                    </h3>

                    {/* Specs Pills */}
                    <div className="space-y-1 pt-2.5 border-t border-steel-border/60">
                      {service.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-2 text-[10px] sm:text-[11px] font-condensed font-bold text-off-white/80 uppercase">
                          <span className="w-1.5 h-1.5 bg-amber-gold rounded-full shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom subtle scroll cue */}
        <div className="text-center z-10 pb-2 shrink-0">
          <span className="text-[10px] font-mono text-mid-gray tracking-[0.3em] uppercase">
            SCROLL DOWN TO EXPLORE ALL CAPABILITIES →
          </span>
        </div>

      </div>
    </section>
  );
}
