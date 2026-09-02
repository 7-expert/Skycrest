'use client';

import Image from 'next/image';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#141414] text-white pt-16 sm:pt-24 pb-12 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Row: Logo & Tagline */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Logo 2 Image */}
            <div className="relative shrink-0">
              <Image 
                src="/logo2.png" 
                alt="Skycrest Logo" 
                width={220} 
                height={70} 
                className="h-12 sm:h-16 w-auto object-contain filter brightness-110"
              />
            </div>
          </div>

          {/* Main Tagline */}
          <h2 className="font-condensed font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white">
            LET'S REDEFINE POSSIBLE<sup className="text-sm font-sans font-normal ml-0.5">®</sup>
          </h2>
        </div>

        {/* Middle Row: Primary Navigation Links */}
        <nav aria-label="Footer Navigation" className="mb-8">
          <ul className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm sm:text-base font-condensed font-bold text-white uppercase tracking-wider">
            <li>
              <a href="#about" className="hover:text-amber-gold transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-amber-gold transition-colors">
                Locations
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-amber-gold transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="#careers" className="hover:text-amber-gold transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#why-choose-us" className="hover:text-amber-gold transition-colors">
                Headquarters
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-amber-gold transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Social Media Links Row */}
        <div className="flex items-center gap-5 mb-10 text-white">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-white/10 hover:bg-amber-gold hover:text-charcoal rounded-md transition-all duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.49 1.49 0 1 0 0 2.98 1.49 1.49 0 0 0 0-2.98Z"/>
            </svg>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-white/10 hover:bg-amber-gold hover:text-charcoal rounded-md transition-all duration-300"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-white/10 hover:bg-amber-gold hover:text-charcoal rounded-md transition-all duration-300"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 bg-white/10 hover:bg-amber-gold hover:text-charcoal rounded-md transition-all duration-300"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Secondary Policy Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-gray-300 underline underline-offset-4 mb-8">
          <a href="#" className="hover:text-amber-gold transition-colors">
            Code of Ethics
          </a>
          <a href="#" className="hover:text-amber-gold transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-amber-gold transition-colors">
            InfoCentre 4.0
          </a>
          <a href="#" className="hover:text-amber-gold transition-colors">
            InfoCentre Enhancement
          </a>
        </div>

        {/* Copyright Notice */}
        <div className="text-xs font-mono text-gray-400" suppressHydrationWarning>
          © {new Date().getFullYear()} Sky Crest Building Contracting LLC. All rights reserved.
        </div>

      </div>

      {/* Vector City & Sustainability Illustration SVG (Bottom Right Positioned) */}
      <div className="absolute bottom-0 right-0 w-full max-w-[680px] lg:max-w-[750px] pointer-events-none opacity-90 z-0 hidden sm:block">
        <svg 
          viewBox="0 0 800 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto"
        >
          {/* Sun / Moon Outline Circle */}
          <circle cx="740" cy="80" r="40" stroke="white" strokeWidth="4" fill="none" />

          {/* Horizon Curve Line */}
          <path d="M 0 400 Q 400 290 800 290" stroke="white" strokeWidth="3" fill="none" />

          {/* SOLAR PANEL */}
          <line x1="345" y1="280" x2="345" y2="300" stroke="white" strokeWidth="3" />
          <polygon points="325,280 395,215 410,225 340,290" fill="white" stroke="white" strokeWidth="2" />
          <line x1="355" y1="250" x2="370" y2="260" stroke="#141414" strokeWidth="3" />

          {/* WIND TURBINES */}
          {/* Turbine 1 (Smaller) */}
          <line x1="450" y1="180" x2="450" y2="270" stroke="white" strokeWidth="3" />
          <circle cx="450" cy="180" r="4" fill="white" />
          <polygon points="450,180 420,165 448,176" fill="white" />
          <polygon points="450,180 475,170 452,176" fill="white" />
          <polygon points="450,180 445,210 449,182" fill="white" />

          {/* Turbine 2 (Taller) */}
          <line x1="485" y1="125" x2="485" y2="268" stroke="white" strokeWidth="4" />
          <circle cx="485" cy="125" r="5" fill="white" />
          <polygon points="485,125 450,105 482,120" fill="white" />
          <polygon points="485,125 515,110 488,120" fill="white" />
          <polygon points="485,125 480,160 484,128" fill="white" />

          {/* BUILDINGS */}
          <polygon points="515,268 590,195 590,268" stroke="white" strokeWidth="3" fill="none" />
          <rect x="515" y="190" width="40" height="78" stroke="white" strokeWidth="3" fill="none" />

          {/* TOWER */}
          <rect x="605" y="75" width="90" height="193" fill="white" stroke="white" strokeWidth="2" />
          <rect x="615" y="60" width="70" height="15" fill="white" />

          {/* Window Strips */}
          <rect x="620" y="90" width="60" height="8" fill="#141414" />
          <rect x="620" y="110" width="60" height="8" fill="#141414" />
          <rect x="620" y="130" width="60" height="8" fill="#141414" />
          <rect x="620" y="150" width="60" height="8" fill="#141414" />

          {/* X-bracing lower section */}
          <rect x="610" y="190" width="80" height="78" fill="#141414" />
          <polygon points="610,190 650,268 610,268" fill="white" />
          <polygon points="690,190 650,268 690,268" fill="white" />
          <polygon points="610,190 690,190 650,230" fill="white" />

          {/* TREES */}
          <line x1="730" y1="220" x2="730" y2="268" stroke="white" strokeWidth="4" />
          <polygon points="730,140 705,190 730,225 755,190" fill="white" />

          <line x1="770" y1="230" x2="770" y2="268" stroke="white" strokeWidth="4" />
          <polygon points="770,180 750,220 770,250 790,220" fill="white" />

          {/* Floating Diamonds */}
          <polygon points="755,145 748,155 755,165 762,155" fill="white" />
          <polygon points="775,130 770,138 775,146 780,138" fill="white" />

          {/* UNDER HORIZON GRAPHICS */}
          {/* Dot Matrix Pattern */}
          <pattern id="footerDotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="3" fill="white" />
          </pattern>
          <rect x="515" y="278" width="180" height="110" fill="url(#footerDotPattern)" />

          {/* Diagonal Stripe Pattern */}
          <pattern id="footerStripePattern" x="0" y="0" width="16" height="16" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="16" stroke="white" strokeWidth="8" />
          </pattern>
          <rect x="700" y="278" width="100" height="110" fill="url(#footerStripePattern)" />

          {/* Floating Squares */}
          <rect x="430" y="325" width="22" height="22" stroke="white" strokeWidth="3" fill="none" />
          <rect x="468" y="290" width="35" height="35" fill="white" />
          <rect x="468" y="340" width="20" height="20" fill="white" />
        </svg>
      </div>

    </footer>
  );
}
