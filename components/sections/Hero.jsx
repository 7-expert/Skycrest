'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, scale: 0.96, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 1 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          '-=0.4'
        );

      // Background Parallax Scroll Effect
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-charcoal"
    >
      {/* Background Video with Enhanced Visibility */}
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/project images/c1.webp"
          className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.95]"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Soft Contrast Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/25 to-charcoal/80" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      </div>

      {/* Main Hero Content Frame (Left Aligned Layout at Bottom) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left pt-28 pb-8 flex flex-col justify-end h-full">
        
        <div className="mt-auto mb-8 max-w-5xl">
          {/* Eyebrow Tag: ENGINEER. BUILDER. INNOVATOR. */}
          <div ref={eyebrowRef} className="opacity-0 mb-3">
            <span className="text-xs sm:text-sm font-mono font-extrabold tracking-[0.3em] sm:tracking-[0.4em] text-amber-gold uppercase">
              ENGINEER. BUILDER. INNOVATOR.
            </span>
          </div>

          {/* Main Headline: Large size, left aligned with POSSIBLE on next line */}
          <h1
            ref={headlineRef}
            className="opacity-0 font-condensed font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.9] mb-6 drop-shadow-2xl"
          >
            <span className="block text-white">LET&apos;S REDEFINE</span>
            <span className="block text-amber-gold">POSSIBLE</span>
          </h1>

          {/* Action CTAs: Full width on mobile for bold prominence */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-3 bg-amber-gold hover:bg-amber-hover text-charcoal font-condensed font-black text-base sm:text-lg tracking-wider uppercase px-8 sm:px-10 py-4 sm:py-4.5 transition-all duration-200 shadow-2xl group w-full sm:w-auto"
              id="hero-cta-explore-projects"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-contact-modal'));
              }}
              className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white text-white hover:text-charcoal border-2 border-white/80 font-condensed font-black text-base sm:text-lg tracking-wider uppercase px-8 sm:px-10 py-4 sm:py-4.5 transition-all duration-200 backdrop-blur-md w-full sm:w-auto cursor-pointer"
              id="hero-cta-get-in-touch"
            >
              <span>GET IN TOUCH</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-4 flex items-center justify-center">
          <button
            onClick={scrollToNext}
            className="inline-flex items-center gap-2 text-xs font-condensed font-bold tracking-widest text-mid-gray hover:text-amber-gold uppercase transition-colors"
            aria-label="Scroll Down to About Section"
            id="hero-scroll-indicator"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-amber-gold" />
          </button>
        </div>
      </div>
    </section>
  );
}
