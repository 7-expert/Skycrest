'use client';

import { useEffect, useRef } from 'react';
import { ClipboardCheck, Compass, HardHat, Award, ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'PRE-CONSTRUCTION & FEASIBILITY',
    subtitle: 'Risk Mitigation & Site Logistics Planning',
    description: 'Geotechnical analysis, 4D BIM site scheduling, regulatory permitting, environmental impact assessments, and preliminary budget modeling.',
    icon: ClipboardCheck,
    deliverables: ['4D BIM Digital Twin', 'Geotechnical Soil Analysis', 'Safety & Regulatory Permitting'],
  },
  {
    step: '02',
    title: 'VALUE ENGINEERING & PROCUREMENT',
    subtitle: 'Global Supply Chain & Materials Security',
    description: 'Long-lead structural steel procurement, modular pre-fabrication logistics, subcontractor bidding, and cost-control optimization.',
    icon: Compass,
    deliverables: ['Global Steel Supply Guarantees', 'Modular Prefabrication Strategy', 'Fixed-Price EPC Contracting'],
  },
  {
    step: '03',
    title: 'HEAVY EXECUTION & ERECTION',
    subtitle: 'Zero-Harm Site Management & QC',
    description: 'On-site heavy structural erection, continuous laser-scanning QA/QC, daily safety audits, and real-time project schedule monitoring.',
    icon: HardHat,
    deliverables: ['Daily 100% Safety Compliance Audit', 'Real-Time Telemetry Tracking', 'Structural Integrity Testing'],
  },
  {
    step: '04',
    title: 'COMMISSIONING & HANDOVER',
    subtitle: 'Systems Verification & Facility Turnover',
    description: 'Integrated systems commissioning, MEP load testing, operational staff training, LEED certification, and comprehensive turnover documentation.',
    icon: Award,
    deliverables: ['System Load Test Certification', 'Complete As-Built Asset Model', '25-Year Structural Warranty'],
  },
];

export default function OurProcess() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative bg-off-white text-charcoal py-28 border-b border-off-white-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-condensed font-bold tracking-[0.25em] text-amber-hover uppercase mb-3">
            <span className="w-2.5 h-2.5 bg-amber-gold inline-block" />
            <span>THE SKYCREST METHODOLOGY</span>
          </div>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl tracking-tight uppercase leading-none text-charcoal mb-4">
            OUR EXECUTION MODEL
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-light leading-relaxed">
            A battle-tested four-phase project lifecycle that guarantees schedule certainty, cost control, and world-class structural quality.
          </p>
        </div>

        {/* Stepped Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {PROCESS_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                ref={(el) => (stepsRef.current[idx] = el)}
                className="bg-white p-8 border border-charcoal/10 shadow-sm relative flex flex-col justify-between hover:border-amber-gold transition-colors duration-300 group"
              >
                {/* Step Number Badge */}
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-charcoal/10">
                    <span className="font-condensed font-extrabold text-5xl text-charcoal group-hover:text-amber-hover transition-colors">
                      {item.step}
                    </span>
                    <div className="p-3 bg-off-white border border-charcoal/10 group-hover:bg-amber-gold group-hover:text-charcoal transition-colors">
                      <Icon className="w-5 h-5 text-charcoal" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-mid-gray tracking-widest uppercase mb-1">
                    {item.subtitle}
                  </div>
                  <h3 className="font-condensed font-extrabold text-2xl text-charcoal tracking-tight uppercase mb-4 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-charcoal/70 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Key Deliverables List */}
                <div className="pt-4 border-t border-charcoal/10 space-y-2">
                  <div className="text-[9px] font-mono tracking-widest text-mid-gray uppercase mb-1">
                    PHASE DELIVERABLES:
                  </div>
                  {item.deliverables.map((deliv) => (
                    <div key={deliv} className="flex items-center gap-2 text-[11px] font-condensed font-bold text-charcoal uppercase">
                      <span className="w-1.5 h-1.5 bg-amber-gold" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
