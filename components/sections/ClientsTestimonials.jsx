'use client';

import { useEffect, useRef } from 'react';
import { Quote, CheckCircle2 } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const CLIENT_PARTNERS = [
  'EXXON ENERGY CORP',
  'GLOBAL INFRASTRUCTURE FUND',
  'UNITED PORT AUTHORITY',
  'METROPOLIS REALTY TRUST',
  'PACIFIC POWER & LIGHT',
  'AEROSPACE DEFENSE CORP',
];

const TESTIMONIALS = [
  {
    quote: "Skycrest executed our 78-story corporate headquarters four weeks ahead of schedule despite severe supply chain bottlenecks worldwide. Their structural engineering team is unrivaled in precision.",
    author: "MARCUS VANCE",
    title: "Chief Development Officer",
    company: "Metropolis Realty Trust",
    project: "$850M Commercial Skyscraper",
  },
  {
    quote: "On our $1.4B hydrogen energy refinery, Skycrest maintained a flawless 0.00 recordable safety incident score over 2.4 million work-hours. They set the benchmark for heavy EPC contracting.",
    author: "DR. ELENA ROSTOVA",
    title: "VP of Global Capital Infrastructure",
    company: "Exxon Energy Corp",
    project: "$1.4B Hydrogen Refinery",
  },
];

export default function ClientsTestimonials() {
  const sectionRef = useRef(null);

  return (
    <section className="relative bg-charcoal text-off-white py-24 border-b border-steel-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Industry Partner Logo Bar */}
        <div className="mb-20">
          <div className="text-center text-xs font-mono tracking-[0.25em] text-mid-gray uppercase mb-8">
            TRUSTED BY INSTITUTIONAL DEVELOPERS &amp; GLOBAL ENERGY ENTERPRISES
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CLIENT_PARTNERS.map((partner) => (
              <div
                key={partner}
                className="bg-charcoal-card p-4 border border-steel-border/70 flex items-center justify-center text-center font-condensed font-bold text-xs tracking-wider text-off-white/70 hover:text-amber-gold hover:border-amber-gold transition-colors duration-200"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>

        {/* Executive Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.author}
              className="bg-charcoal-card p-8 sm:p-10 border border-steel-border relative flex flex-col justify-between"
            >
              <div className="w-10 h-1 bg-amber-gold mb-6" />
              <Quote className="w-10 h-10 text-amber-gold/20 absolute top-8 right-8" />

              <p className="text-base sm:text-lg text-off-white font-light italic leading-relaxed mb-8">
                "{item.quote}"
              </p>

              <div className="pt-6 border-t border-steel-border/60 flex items-center justify-between">
                <div>
                  <div className="font-condensed font-extrabold text-lg text-white uppercase tracking-wider">
                    {item.author}
                  </div>
                  <div className="text-xs font-mono text-mid-gray">
                    {item.title} — <span className="text-amber-gold">{item.company}</span>
                  </div>
                </div>
                <div className="hidden sm:block text-right text-[10px] font-mono text-mid-gray uppercase">
                  <div>VERIFIED CONTRACT</div>
                  <div className="text-white font-bold">{item.project}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
