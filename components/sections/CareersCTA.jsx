'use client';

import { ArrowUpRight, Users, Briefcase } from 'lucide-react';

export default function CareersCTA() {
  return (
    <section className="relative bg-gradient-to-r from-charcoal-dark via-charcoal to-charcoal-card py-24 border-b border-steel-border/80 overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal-card border-2 border-amber-gold p-8 sm:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-condensed font-bold tracking-[0.25em] text-amber-gold uppercase mb-3">
              <Users className="w-4 h-4" />
              <span>JOIN THE SKYCREST TEAM &amp; SUBCONTRACTOR NETWORK</span>
            </div>
            <h2 className="font-condensed font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-white leading-none mb-4">
              BUILD MONUMENTAL LEGACY INFRASTRUCTURE.
            </h2>
            <p className="text-sm sm:text-base text-off-white/80 font-light leading-relaxed">
              We are expanding our global engineering teams, project managers, BIM computational designers, and qualified trade subcontractor network.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-amber-gold hover:bg-amber-hover text-charcoal font-condensed font-extrabold text-sm tracking-wider uppercase px-8 py-4 transition-all duration-200 shadow-xl"
              id="careers-cta-view-openings"
            >
              <span>EXPLORE CAREERS</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-steel-border/50 text-white border border-steel-border font-condensed font-bold text-sm tracking-wider uppercase px-7 py-4 transition-colors"
              id="careers-cta-subcontractor"
            >
              <Briefcase className="w-4 h-4 text-amber-gold" />
              <span>SUBCONTRACTOR PORTAL</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
