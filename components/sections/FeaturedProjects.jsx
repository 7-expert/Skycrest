'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Building2, X, CheckCircle, ShieldCheck } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useModalScrollLock } from '@/components/SmoothScroll';

const CATEGORIES = [
  'ALL',
  'HIGH-RISE TOWERS',
  'RESIDENTIAL & COMMERCIAL',
  'LUXURY VILLAS',
  'INDUSTRIAL & WAREHOUSES',
];

const PROJECTS = [
  {
    id: 'c1',
    category: 'RESIDENTIAL & COMMERCIAL',
    title: 'Construction of Residential & Commercial Buildings (2B+G+10)',
    highlight: '2B + G + 10',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[3/4]',
    image: '/project images/c1.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c9',
    category: 'HIGH-RISE TOWERS',
    title: 'Construction of Residential Building (G+2P+16+Roof)',
    highlight: 'G + 2P + 16 + Roof',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[9/16]',
    image: '/project images/c9.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c2',
    category: 'RESIDENTIAL & COMMERCIAL',
    title: 'Construction of Residential / Commercial Building (G+8+Roof)',
    highlight: 'G + 8 + Roof',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[4/3]',
    image: '/project images/c2.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c8',
    category: 'HIGH-RISE TOWERS',
    title: 'Construction of Residential Building (G+P+5+Roof)',
    highlight: 'G + P + 5 + Roof',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[3/4]',
    image: '/project images/c8.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c13',
    category: 'HIGH-RISE TOWERS',
    title: 'Construction of Residential Building (B+G+M+6+Roof)',
    highlight: 'B + G + M + 6 + Roof',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[3/4]',
    image: '/project images/c13.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c10',
    category: 'RESIDENTIAL & COMMERCIAL',
    title: 'Construction of Commercial / Residential Building (G+4+Roof)',
    highlight: 'G + 4 + Roof',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[4/3]',
    image: '/project images/c10.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c11',
    category: 'INDUSTRIAL & WAREHOUSES',
    title: 'Warehouse Construction and Management in Ras Al Khor',
    highlight: 'Ras Al Khor Logistics Hub',
    location: 'Ras Al Khor, Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[16/9]',
    image: '/project images/c11.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural steel framing, warehouse logistics optimization, MEP integration, and final authority handover.',
  },
  {
    id: 'c12',
    category: 'RESIDENTIAL & COMMERCIAL',
    title: 'Construction of Residential Building (G+2) DIP',
    highlight: 'G + 2 Low-Rise Complex',
    location: 'Dubai Investment Park (DIP), Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[4/3]',
    image: '/project images/c12.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c5',
    category: 'LUXURY VILLAS',
    title: 'Construction of Residential Villa (G+1) - 2 Nos',
    highlight: 'G + 1 Villa Complex (2 Units)',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[4/3]',
    image: '/project images/c5.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c6',
    category: 'LUXURY VILLAS',
    title: 'Construction of Residential Villa (G+1) - 5 Nos',
    highlight: 'G + 1 Villa Community (5 Units)',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[3/4]',
    image: '/project images/c6.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c3',
    category: 'LUXURY VILLAS',
    title: 'Construction of Residential Villa (G+1)',
    highlight: 'G + 1 Private Residence',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[1/1]',
    image: '/project images/c3.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c4',
    category: 'LUXURY VILLAS',
    title: 'Construction of Residential Villa (G+1)',
    highlight: 'G + 1 Modern Residence',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[3/4]',
    image: '/project images/c4.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
  {
    id: 'c7',
    category: 'LUXURY VILLAS',
    title: 'Construction of Residential Villa (G+1)',
    highlight: 'G + 1 Luxury Villa',
    location: 'Dubai, UAE',
    contractor: 'Sky Crest Building Contracting LLC',
    scope: 'General Construction / Turnkey Handover',
    status: 'Completed / Delivered',
    aspectRatio: 'aspect-[1/1]',
    image: '/project images/c7.webp',
    description: 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE. From ground site preparation through structural reinforced concrete framing, MEP integration, and final authority handover.',
  },
];

const DEFAULT_PROJECTS = PROJECTS;

export default function FeaturedProjects({ projects: initialProjects = [] }) {
  const displayProjects = (initialProjects && Array.isArray(initialProjects) && initialProjects.length > 0)
    ? initialProjects
    : DEFAULT_PROJECTS;

  const dynamicCategories = ['ALL', ...Array.from(new Set(displayProjects.map((p) => p.category)))];

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const filteredProjects = activeCategory === 'ALL'
    ? displayProjects
    : displayProjects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    setMounted(true);
  }, []);

  useModalScrollLock(!!selectedProject);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  useEffect(() => {
    if (selectedProject) {
      triggerRef.current = document.activeElement;
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setSelectedProject(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      const timer = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
        if (triggerRef.current) {
          triggerRef.current.focus();
        }
      };
    }
  }, [selectedProject]);

  const getProjectImage = (proj) => {
    const src = proj?.image || proj?.image_url;
    if (src && typeof src === 'string' && src.trim() !== '') {
      return src;
    }
    return '/project images/c1.webp';
  };

  return (
    <section id="projects" ref={sectionRef} className="relative bg-charcoal-dark text-off-white pt-20 pb-6 border-b border-steel-border/60">

      {/* Background Structural Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-gold/40" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-8 border-b border-steel-border/40 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.3em] text-amber-gold uppercase mb-2">
              <span className="w-2.5 h-2.5 bg-amber-gold inline-block" />
              <span>SKY CREST PORTFOLIO // DUBAI, UAE</span>
            </div>
            <h2 className="font-condensed font-black text-4xl sm:text-6xl tracking-tight uppercase text-white leading-none">
              FEATURED <span className="text-amber-gold">COMPLETED PROJECTS</span>
            </h2>
            <p className="text-sm font-script text-amber-gold/90 mt-2 text-lg">
              &quot;We Build Land Till Key Hand Overs&quot; — Sky Crest Building Contracting LLC
            </p>
          </div>

          {/* Filter Tabs - Mobile Horizontally Scrollable */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap no-scrollbar w-full md:w-auto">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-condensed font-extrabold tracking-wider uppercase px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 shrink-0 ${activeCategory === cat
                    ? 'bg-amber-gold text-charcoal shadow-lg shadow-amber-gold/20 scale-105'
                    : 'bg-charcoal border border-steel-border/80 text-mid-gray hover:text-white hover:border-steel-border'
                  }`}
                id={`filter-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Universal Clean Grid - Mobile (1 col), Tablet (2 cols), Desktop/Laptop (3 cols) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {filteredProjects.map((project) => {
            const projectImgSrc = getProjectImage(project);
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="relative rounded-2xl overflow-hidden bg-charcoal-card border border-steel-border/60 shadow-xl group cursor-pointer transition-all duration-300 hover:border-amber-gold hover:-translate-y-1 flex flex-col justify-between h-full"
              >
                {/* Image Container with Consistent Height Across All Devices */}
                <div className="relative w-full h-56 sm:h-64 lg:h-72 overflow-hidden bg-charcoal shrink-0">
                  {projectImgSrc ? (
                    <Image
                      src={projectImgSrc}
                      alt={project.title || 'Sky Crest Project'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center filter contrast-[1.05] brightness-[0.95] group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : null}

                  {/* Gradient Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Left Tag: Highlight Pill */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="inline-block px-3 py-1 bg-black/85 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-amber-gold tracking-wider uppercase rounded-md border border-white/10 shadow-lg">
                      {project.highlight || project.status || 'SKY CREST'}
                    </span>
                  </div>

                  {/* Location Badge */}
                  <div className="absolute top-3.5 right-3.5 z-20">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/85 backdrop-blur-md text-[10px] font-mono text-mid-gray rounded-md border border-white/10 shadow-lg">
                      <MapPin className="w-3 h-3 text-amber-gold" />
                      {project.location || 'Dubai, UAE'}
                    </span>
                  </div>
                </div>

                {/* Bottom Content Area: Heading & Button */}
                <div className="p-5 sm:p-6 bg-charcoal-card flex flex-col justify-between flex-grow gap-4">
                  <div>
                    <div className="text-[10px] sm:text-xs font-mono text-amber-gold font-bold tracking-widest uppercase mb-1.5">
                      {project.category}
                    </div>
                    <h3
                      className="font-condensed font-extrabold text-base sm:text-lg lg:text-xl text-white uppercase line-clamp-2 leading-snug group-hover:text-amber-gold transition-colors"
                      title={project.title}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Bottom Action Button Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-steel-border/50">
                    <span className="text-xs font-condensed font-extrabold tracking-wider text-amber-gold group-hover:text-white uppercase transition-colors">
                      VIEW PROJECT SPECS
                    </span>
                    <div className="w-9 h-9 rounded-full bg-charcoal border border-steel-border flex items-center justify-center text-white group-hover:bg-amber-gold group-hover:text-charcoal group-hover:border-amber-gold transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Project Specification Detail Modal Portal */}
      {mounted && selectedProject && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-charcoal/95 backdrop-blur-md overflow-y-auto overscroll-contain"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          data-scroll-lock-scrollable="true"
        >
          <div
            className="bg-charcoal-card max-w-4xl w-full rounded-3xl p-6 sm:p-8 relative shadow-2xl max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain border border-amber-gold/30 my-auto"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            data-scroll-lock-scrollable="true"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <button
              ref={closeBtnRef}
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 bg-charcoal p-2.5 rounded-xl text-white hover:text-amber-gold transition-colors z-30 shadow-lg cursor-pointer"
              id="close-project-modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-amber-gold tracking-widest uppercase mb-1">
              PROJECT OVERVIEW // SKY CREST BUILDING CONTRACTING LLC
            </div>
            <h3 id="modal-project-title" className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase leading-tight mb-4 pr-12">
              {selectedProject.title}
            </h3>

            {/* Borderless Full-Size Modal Image */}
            <div className="relative w-full max-h-[65vh] mb-6 rounded-2xl overflow-hidden bg-charcoal flex items-center justify-center">
              {getProjectImage(selectedProject) ? (
                <Image
                  src={getProjectImage(selectedProject)}
                  alt={selectedProject.title || 'Sky Crest Project'}
                  width={1200}
                  height={900}
                  className="w-full h-auto max-h-[65vh] object-contain"
                />
              ) : null}
            </div>

            {/* Overview Metadata Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-charcoal rounded-2xl text-xs font-mono mb-6">
              <div>
                <div className="text-mid-gray uppercase mb-1">CONTRACTOR</div>
                <div className="text-white font-bold">{selectedProject.contractor || 'Sky Crest Building Contracting LLC'}</div>
              </div>
              <div>
                <div className="text-mid-gray uppercase mb-1">LOCATION</div>
                <div className="text-white font-bold">{selectedProject.location || 'Dubai, UAE'}</div>
              </div>
              <div>
                <div className="text-mid-gray uppercase mb-1">SCOPE</div>
                <div className="text-amber-gold font-bold">{selectedProject.scope || 'General Construction / Turnkey Handover'}</div>
              </div>
              <div>
                <div className="text-mid-gray uppercase mb-1">STATUS</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{selectedProject.status || 'Completed / Delivered'}</span>
                </div>
              </div>
            </div>

            <p className="text-sm font-light text-off-white/90 leading-relaxed mb-6 bg-charcoal/50 p-4 border-l-2 border-amber-gold">
              {selectedProject.description || 'This project represents Sky Crest\'s engineering precision and turn-key execution in the UAE.'}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  window.dispatchEvent(
                    new CustomEvent('open-contact-modal', {
                      detail: { projectTitle: title },
                    })
                  );
                }}
                className="inline-flex items-center gap-2 bg-amber-gold hover:bg-amber-hover text-charcoal font-condensed font-black text-sm tracking-wider uppercase px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg"
              >
                <span>CONTACT FOR SIMILAR PROJECTS</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

