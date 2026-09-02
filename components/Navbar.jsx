'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, X, Menu, MapPin } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setActiveDropdown(null);
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal/98 border-b border-steel-border/80 shadow-2xl py-0'
          : 'bg-gradient-to-b from-charcoal/95 via-charcoal/70 to-transparent py-0'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sm:h-24">
        
        {/* Logo - logo2.png from public folder */}
        <Link
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="flex items-center group shrink-0 py-2"
          id="nav-logo-link"
        >
          <Image
            src="/logo2.png"
            alt="Skycrest Building Contracting LLC"
            width={280}
            height={80}
            priority
            className="h-13 sm:h-16 md:h-18 w-auto object-contain group-hover:opacity-90 transition-all duration-300"
          />
        </Link>

        {/* Navigation Bar Links with Mortenson-style White Background Hover */}
        <nav className="hidden lg:flex items-center h-full space-x-1" aria-label="Main Navigation">
          
          {/* WHO WE ARE */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('who-we-are')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`flex items-center gap-1.5 px-4 h-full text-sm sm:text-base font-condensed font-extrabold tracking-wider uppercase transition-all duration-200 ${
                activeDropdown === 'who-we-are'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white hover:bg-white hover:text-black'
              }`}
            >
              <span>WHO WE ARE</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>

            {activeDropdown === 'who-we-are' && (
              <div className="absolute top-full left-0 w-64 bg-white text-black border border-charcoal/20 shadow-2xl p-3 space-y-1 z-50">
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, '#about')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  COMPANY OVERVIEW
                </a>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, '#about')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  EXECUTIVE LEADERSHIP
                </a>
                <a
                  href="#safety"
                  onClick={(e) => scrollToSection(e, '#safety')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  SAFETY &amp; SUSTAINABILITY
                </a>
                <a
                  href="#process"
                  onClick={(e) => scrollToSection(e, '#process')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors"
                >
                  EXECUTION METHODOLOGY
                </a>
              </div>
            )}
          </div>

          {/* WHAT WE DO */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('what-we-do')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`flex items-center gap-1.5 px-4 h-full text-sm sm:text-base font-condensed font-extrabold tracking-wider uppercase transition-all duration-200 ${
                activeDropdown === 'what-we-do'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white hover:bg-white hover:text-black'
              }`}
            >
              <span>WHAT WE DO</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>

            {activeDropdown === 'what-we-do' && (
              <div className="absolute top-full left-0 w-72 bg-white text-black border border-charcoal/20 shadow-2xl p-3 space-y-1 z-50">
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, '#services')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  TURNKEY EPC CONTRACTING
                </a>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, '#services')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  COMMERCIAL HIGH-RISE BUILDINGS
                </a>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, '#services')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  HEAVY INDUSTRIAL &amp; ENERGY PLANTS
                </a>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, '#services')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors"
                >
                  TRANSPORTATION &amp; CIVIL INFRASTRUCTURE
                </a>
              </div>
            )}
          </div>

          {/* INDUSTRIES WE SERVE */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('industries')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`flex items-center gap-1.5 px-4 h-full text-sm sm:text-base font-condensed font-extrabold tracking-wider uppercase transition-all duration-200 ${
                activeDropdown === 'industries'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white hover:bg-white hover:text-black'
              }`}
            >
              <span>INDUSTRIES WE SERVE</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>

            {activeDropdown === 'industries' && (
              <div className="absolute top-full left-0 w-64 bg-white text-black border border-charcoal/20 shadow-2xl p-3 space-y-1 z-50">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, '#projects')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  COMMERCIAL REAL ESTATE
                </a>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, '#projects')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  ENERGY &amp; POWER GENERATION
                </a>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, '#projects')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors border-b border-charcoal/10"
                >
                  CIVIL TRANSIT &amp; HIGHWAYS
                </a>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, '#projects')}
                  className="block text-xs font-condensed font-bold text-black hover:bg-amber-gold hover:text-charcoal uppercase p-2 transition-colors"
                >
                  DEEPWATER PORTS &amp; LOGISTICS
                </a>
              </div>
            )}
          </div>

          {/* LOCATIONS Dropdown Tab */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('locations')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`flex items-center gap-1.5 px-5 h-full text-sm sm:text-base font-condensed font-extrabold tracking-wider uppercase transition-all duration-200 ${
                activeDropdown === 'locations'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white hover:bg-white hover:text-black'
              }`}
            >
              <span>LOCATIONS</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {activeDropdown === 'locations' && (
              <div className="absolute top-full right-0 w-72 bg-white text-black border border-charcoal/20 shadow-2xl p-4 space-y-2 z-50">
                <div className="text-[10px] font-mono font-bold text-amber-hover uppercase tracking-widest pb-1 border-b border-charcoal/10">
                  GLOBAL REGIONAL HUBS
                </div>
                <div className="space-y-1">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="block p-2 hover:bg-off-white transition-colors"
                  >
                    <div className="font-condensed font-extrabold text-xs uppercase flex items-center justify-between">
                      <span>DUBAI, UAE (HEADQUARTERS)</span>
                      <MapPin className="w-3.5 h-3.5 text-amber-hover" />
                    </div>
                    <div className="text-[10px] text-charcoal/70 font-sans">DIFC Financial District</div>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="block p-2 hover:bg-off-white transition-colors border-t border-charcoal/10"
                  >
                    <div className="font-condensed font-extrabold text-xs uppercase flex items-center justify-between">
                      <span>LONDON, UNITED KINGDOM</span>
                      <MapPin className="w-3.5 h-3.5 text-amber-hover" />
                    </div>
                    <div className="text-[10px] text-charcoal/70 font-sans">Canary Wharf Hub</div>
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="block p-2 hover:bg-off-white transition-colors border-t border-charcoal/10"
                  >
                    <div className="font-condensed font-extrabold text-xs uppercase flex items-center justify-between">
                      <span>HOUSTON, TEXAS, USA</span>
                      <MapPin className="w-3.5 h-3.5 text-amber-hover" />
                    </div>
                    <div className="text-[10px] text-charcoal/70 font-sans">Steel Tower Plaza</div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* PROJECTS Direct Link */}
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, '#projects')}
            className="flex items-center px-4 h-full text-sm sm:text-base font-condensed font-extrabold tracking-wider text-white hover:bg-white hover:text-black uppercase transition-all duration-200"
          >
            PROJECTS
          </a>

          {/* CAREERS Direct Link */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="flex items-center px-4 h-full text-sm sm:text-base font-condensed font-extrabold tracking-wider text-white hover:bg-white hover:text-black uppercase transition-all duration-200"
          >
            CAREERS
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white hover:text-amber-gold focus:outline-none"
            aria-label="Toggle Mobile Navigation"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-charcoal-dark border-b border-steel-border px-6 py-6 space-y-4">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            className="block text-sm font-condensed font-extrabold tracking-widest text-white hover:text-amber-gold uppercase pb-2 border-b border-steel-border/40"
          >
            WHO WE ARE
          </a>
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, '#services')}
            className="block text-sm font-condensed font-extrabold tracking-widest text-white hover:text-amber-gold uppercase pb-2 border-b border-steel-border/40"
          >
            WHAT WE DO
          </a>
          <a
            href="#projects"
            onClick={(e) => scrollToSection(e, '#projects')}
            className="block text-sm font-condensed font-extrabold tracking-widest text-white hover:text-amber-gold uppercase pb-2 border-b border-steel-border/40"
          >
            PROJECTS &amp; INDUSTRIES
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="block text-sm font-condensed font-extrabold tracking-widest text-amber-gold uppercase pb-2 border-b border-steel-border/40"
          >
            LOCATIONS (DUBAI, LONDON, HOUSTON)
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="w-full block text-center bg-amber-gold text-charcoal font-condensed font-extrabold text-sm tracking-wider uppercase py-3"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </header>
  );
}
