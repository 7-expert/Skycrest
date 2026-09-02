'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Award, ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function AboutStrip() {
  const sectionRef = useRef(null);
  const floatCard1Ref = useRef(null);
  const floatCard2Ref = useRef(null);
  const floatCard3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Float Effects for Mosaic Cards
      if (floatCard1Ref.current) {
        gsap.to(floatCard1Ref.current, {
          y: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      if (floatCard2Ref.current) {
        gsap.to(floatCard2Ref.current, {
          y: 35,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }

      if (floatCard3Ref.current) {
        gsap.to(floatCard3Ref.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-off-white text-charcoal py-24 overflow-hidden border-b border-off-white-dark"
    >
      {/* Top Amber Brand Accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-gold" />
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Black Heading + Script Highlight Heading + Clean Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">

            {/* Heading 1: Whole Black Heading */}
            <h2 className="font-condensed font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[0.95] text-charcoal mb-8">
              BUILT FOR CRITICAL SCALE &amp; PRECISION.
            </h2>

            {/* Heading 2: "Making a Difference" (Screenshot Style Cursive Script) */}
            <div className="mb-8">
              <h3 className="text-4xl sm:text-6xl font-light text-charcoal flex items-center gap-3 flex-wrap">
                <span>Making a</span>
                <span className="font-script text-5xl sm:text-7xl text-amber-hover relative inline-block">
                  Difference
                  {/* Light Wavy Curve Underline SVG */}
                  <svg
                    className="absolute left-0 -bottom-2 w-full h-4 text-red-500 overflow-visible"
                    viewBox="0 0 200 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 10 C 45 3, 95 14, 140 6 C 165 2, 185 8, 197 6"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h3>
            </div>

            {/* Sub-heading / CTA text from SS: WHAT DO YOU WANT TO BUILD? → */}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 text-lg sm:text-xl font-condensed font-black tracking-widest text-charcoal hover:text-amber-hover uppercase transition-colors mb-8 group"
            >
              <span>WHAT DO YOU WANT TO BUILD?</span>
              <ArrowRight className="w-6 h-6 text-red-500 group-hover:translate-x-2 transition-transform duration-200" />
            </a>

            {/* Clean Narrative Description */}
            <p className="text-base sm:text-lg text-charcoal/80 font-light leading-relaxed border-l-3 border-amber-gold pl-5 bg-white/60 p-4 border border-charcoal/10 shadow-sm">
              For over four decades, Skycrest Building Contracting LLC has engineered and constructed landmark commercial towers, industrial complexes, and civil infrastructure across Dubai, UAE and worldwide with unyielding precision.
            </p>
          </div>

          {/* Right Column: Pinterest-Inspired Floating Image & Badge Mosaic */}
          <div className="lg:col-span-6 relative min-h-[500px] sm:min-h-[560px] flex items-center justify-center pt-8 lg:pt-0">

            {/* Mosaic Card 1: Main Building */}
            <div
              ref={floatCard1Ref}
              className="relative w-64 sm:w-72 h-88 sm:h-96 rounded-3xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 z-20 group bg-charcoal"
            >
              <Image
                src="/project images/c1.webp"
                alt="Sky Crest Building Contracting LLC - 2B+G+10 Construction"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center filter contrast-[1.05] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

              {/* Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-charcoal/90 backdrop-blur-md p-3 rounded-xl border border-steel-border/50 text-off-white">
                <div className="text-[9px] font-mono text-amber-gold tracking-widest uppercase">LOCATION: DUBAI, UAE</div>
                <div className="font-condensed font-black text-sm uppercase">SKY CREST BUILDING CONTRACTING LLC</div>
              </div>
            </div>

            {/* Mosaic Card 2: Tower Construction */}
            <div
              ref={floatCard2Ref}
              className="absolute right-2 sm:right-6 bottom-4 sm:bottom-8 w-56 sm:w-64 h-64 sm:h-72 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 z-30 group bg-charcoal"
            >
              <Image
                src="/project images/c9.webp"
                alt="Sky Crest Residential Building G+2P+16+Roof"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center filter contrast-[1.15] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 bg-amber-gold p-2.5 rounded-lg text-charcoal flex items-center justify-between">
                <div>
                  <div className="text-[8px] font-mono font-bold tracking-widest uppercase">EXPERT EXECUTION</div>
                  <div className="font-condensed font-black text-xs uppercase">HIGH-RISE STRUCTURAL FRAMING</div>
                </div>
                <Award className="w-4 h-4 text-charcoal shrink-0" />
              </div>
            </div>

            {/* Mosaic Card 3: Top-Right Floating Sub-card */}
            <div
              ref={floatCard3Ref}
              className="absolute top-2 sm:top-6 right-8 sm:right-16 w-44 sm:w-48 h-36 sm:h-40 rounded-2xl overflow-hidden shadow-xl transform rotate-6 hover:rotate-0 transition-all duration-500 z-10 hidden sm:block group bg-charcoal"
            >
              <Image
                src="/project images/c8.webp"
                alt="Sky Crest G+P+5 Residential Building"
                fill
                sizes="200px"
                className="object-cover filter contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-transparent transition-colors" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
