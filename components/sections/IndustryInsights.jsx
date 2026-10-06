'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ArrowUpRight,
  Sparkles,
  X,
  Share2,
  Check,
  TrendingUp,
  SlidersHorizontal,
  Send
} from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { useModalScrollLock } from '@/components/SmoothScroll';

const CATEGORIES = [
  'ALL UPDATES',
  'SUSTAINABILITY & TECH',
  'DUBAI MARKET INSIGHTS',
  'FINANCE & INFRASTRUCTURE'
];

const ARTICLES = [
  {
    id: 'news-1',
    category: 'SUSTAINABILITY & TECH',
    date: 'Aug 15, 2024',
    readTime: '3 min read',
    title: 'Magnom Properties of Saudi Arabia plans to build a hydrogen-powered skyscraper in Egypt.',
    subtitle: 'Zero-Carbon High-Rise Innovation in the Middle East',
    image: '/images/news-1.jpg',
    excerpt: 'Magnom Properties, a subsidiary of Rawabi Holding, unveils the landmark Forbes International Tower featuring clean hydrogen fuel cell power generation and smart architectural cladding.',
    fullContent: `
      <p class="mb-4">Magnom Properties, a leading subsidiary of Saudi Arabia's Rawabi Holding, has officially announced groundbreaking plans to construct a revolutionary zero-carbon, hydrogen-powered skyscraper in Egypt's New Administrative Capital.</p>
      
      <p class="mb-4">Designed in collaboration with world-renowned architects Adrian Smith + Gordon Gill Architecture, the 43-story Forbes International Tower aims to generate over 75% of its operational energy needs using clean hydrogen fuel cell technology integrated into its structural core, setting an unprecedented benchmark for sustainable commercial developments across the MENA region.</p>
      
      <h4 class="text-lg font-bold text-amber-hover uppercase tracking-wider mt-6 mb-3">Key Technical Highlights & Impact</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>75% Clean Energy Integration:</strong> On-site hydrogen fuel cell infrastructure combined with advanced photovoltaic building skins.</li>
        <li><strong>Embodied Carbon Reduction:</strong> Material selections cut carbon footprint by 58% compared to conventional high-rise towers.</li>
        <li><strong>Water Cycle Circularity:</strong> Closed-loop greywater filtration and atmospheric condensation collectors.</li>
      </ul>

      <p class="mb-4">This vision aligns directly with Egypt and Saudi Arabia's joint commitment to green energy transition and sustainable urban engineering ahead of regional COP commitments.</p>
    `,
    stats: [
      { label: 'Hydrogen Power', value: '75%' },
      { label: 'Project Height', value: '43 Floors' },
      { label: 'Est. Valuation', value: '$1.2B' }
    ]
  },
  {
    id: 'news-2',
    category: 'DUBAI MARKET INSIGHTS',
    date: 'Aug 10, 2024',
    readTime: '4 min read',
    title: 'First half of 2024, Indian businesses leading group among new companies established in Dubai.',
    subtitle: 'Unprecedented Commercial Growth Across UAE Economic Zones',
    image: '/images/news-2.jpg',
    excerpt: 'Dubai Chamber of Commerce statistics reveal over 8,400 new Indian enterprises registered in H1 2024, cementing Dubai as the premier international trade and engineering hub.',
    fullContent: `
      <p class="mb-4">The Dubai Chamber of Commerce has released its comprehensive H1 2024 report, confirming that Indian businesses registered as the largest group of new member companies joining the emirate's commercial ecosystem.</p>
      
      <p class="mb-4">During the first six months of 2024, 8,440 new Indian companies joined the Dubai Chamber, bringing the total number of active Indian businesses to over 90,000. This influx spans commercial trading, high-tech manufacturing, real estate development, and general construction services.</p>
      
      <h4 class="text-lg font-bold text-amber-hover uppercase tracking-wider mt-6 mb-3">Drivers of Enterprise Expansion</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>CEPA Economic Acceleration:</strong> The UAE-India Comprehensive Economic Partnership Agreement (CEPA) has slashed trade tariffs and streamlined corporate licensing.</li>
        <li><strong>Strategic Logistics Access:</strong> Seamless air and sea freight integration via Jebel Ali Port and Al Maktoum International Airport.</li>
        <li><strong>Golden Visa Framework:</strong> Investor-friendly residency visas fostering long-term capital allocation in Dubai construction & infrastructure.</li>
      </ul>

      <p class="mb-4">With total member registrations surging 18.5% YoY, Dubai continues to reinforce its global positioning as a capital nexus connecting East and West.</p>
    `,
    stats: [
      { label: 'New Firms H1', value: '8,440+' },
      { label: 'Rank Group', value: '#1 Foreign' },
      { label: 'YoY Surge', value: '+18.5%' }
    ]
  },
  {
    id: 'news-3',
    category: 'FINANCE & INFRASTRUCTURE',
    date: 'Aug 06, 2024',
    readTime: '4 min read',
    title: 'UAE national banks extended $13.48 billion in credit facilities to the private sector over five months, reflecting a 4.5% growth.',
    subtitle: 'Private Sector Capital Expansion Accelerates Real Estate & MEP Contracting',
    image: '/images/news-3.jpg',
    excerpt: 'Central Bank of the UAE reports AED 49.5 billion ($13.48B) in fresh credit facilities disbursed to private commercial sector between January and May 2024.',
    fullContent: `
      <p class="mb-4">Official metrics published by the Central Bank of the UAE (CBUAE) highlight robust financial liquidity across national banking institutions, with AED 49.5 billion ($13.48 billion) extended to private commercial enterprises during the first five months of 2024.</p>
      
      <p class="mb-4">This 4.5% growth in private sector credit facilities brings the cumulative portfolio of bank credit to AED 1.15 trillion, demonstrating solid institutional confidence in real estate construction, industrial logistics, and civil infrastructure developments across Dubai and Abu Dhabi.</p>
      
      <h4 class="text-lg font-bold text-amber-hover uppercase tracking-wider mt-6 mb-3">Capital Allocation Breakdown</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
        <li><strong>Construction & Contracting:</strong> Significant capital allocation for project financing, bonding facilities, and heavy equipment acquisition.</li>
        <li><strong>Commercial Real Estate:</strong> Financing turn-key residential towers and industrial storage developments.</li>
        <li><strong>SME & Corporate Support:</strong> Expanded working capital facilities for specialized MEP and structural engineering subcontractors.</li>
      </ul>

      <p class="mb-4">The steady liquidity inflow guarantees sustained momentum across ongoing mega-infrastructure initiatives and high-rise commercial developments into 2025.</p>
    `,
    stats: [
      { label: 'Credit Extended', value: '$13.48B' },
      { label: 'Growth Rate', value: '4.5%' },
      { label: 'Total Portfolio', value: 'AED 1.15T' }
    ]
  }
];

export default function IndustryInsights() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('ALL UPDATES');
  const [activeModalArticle, setActiveModalArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useModalScrollLock(!!activeModalArticle);

  // Filtered articles logic
  const filteredArticles = activeCategory === 'ALL UPDATES'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  useEffect(() => {
    if (activeModalArticle) {
      triggerRef.current = document.activeElement;
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveModalArticle(null);
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
  }, [activeModalArticle]);

  // GSAP Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative bg-white text-charcoal py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header Frame */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-100 gap-6">

          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-gold/10 rounded-md mb-4">
              <span className="w-2 h-2 bg-amber-gold inline-block" />
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-amber-hover uppercase">
                :: LATEST NEWS
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-condensed font-extrabold uppercase tracking-wide text-charcoal leading-[1.05]">
              Industry Insights & <span className="text-amber-hover">Company Updates</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl">
              Stay ahead of Middle East construction developments, green engineering innovations, and regional market intelligence.
            </p>
          </div>

          {/* Quick Metrics / Live Badge */}
          <div className="hidden lg:flex items-center gap-4 px-5 py-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-amber-gold/20 flex items-center justify-center text-amber-hover">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">H2 2024 Forecast</div>
              <div className="text-sm font-bold text-charcoal font-condensed tracking-wide">UAE Real Estate & Infrastructure +6.2%</div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all duration-300 ${isActive
                    ? 'bg-amber-gold text-charcoal font-black shadow-md shadow-amber-gold/20 scale-[1.02]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-charcoal'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* News Cards Grid - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <article
              key={article.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative bg-gray-50/70 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-200">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-block px-3 py-1 bg-charcoal/85 backdrop-blur-md text-[10px] font-mono font-bold text-amber-gold tracking-wider uppercase rounded-md shadow-sm">
                      {article.category}
                    </span>
                  </div>

                  {/* Read Time Tag */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-charcoal/70 backdrop-blur-md text-[10px] font-mono text-gray-200 rounded-md">
                      <Clock className="w-3 h-3 text-amber-gold" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-6">
                  {/* Date Badge */}
                  <div className="flex items-center gap-2 text-amber-hover text-xs font-mono font-semibold mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>

                  {/* Headline Title */}
                  <h3 className="text-xl font-condensed font-bold text-charcoal line-clamp-3 leading-snug group-hover:text-amber-hover transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Short Excerpt */}
                  <p className="mt-3 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Interactive Footer Bar */}
              <div className="px-6 pb-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-mono font-bold">
                <button
                  onClick={() => setActiveModalArticle(article)}
                  className="inline-flex items-center gap-2 text-charcoal group-hover:text-amber-hover transition-colors py-1"
                >
                  <span>READ FULL ARTICLE</span>
                  <ArrowUpRight className="w-4 h-4 text-amber-hover group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>

                <button
                  onClick={() => setActiveModalArticle(article)}
                  className="p-2 rounded-lg bg-gray-200/80 hover:bg-amber-gold hover:text-charcoal text-gray-700 transition-all"
                  title="Expand preview"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription Strip */}
        <div className="mt-16 relative bg-charcoal text-off-white rounded-2xl p-8 sm:p-10 overflow-hidden shadow-xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-gold tracking-widest uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                <span>EXECUTIVE BRIEFINGS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-condensed font-extrabold text-off-white uppercase">
                Subscribe to Middle East Construction Intelligence
              </h3>
              <p className="mt-2 text-sm text-mid-gray max-w-xl">
                Get monthly breakdown reports on commercial real estate tenders, structural steel market pricing, and regional infrastructure developments direct to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your corporate email"
                    className="w-full bg-charcoal-dark border-none rounded-xl px-4 py-3 text-sm text-off-white placeholder:text-mid-gray/60 focus:outline-none focus:ring-2 focus:ring-amber-gold transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-gold hover:bg-amber-hover text-charcoal font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-amber-gold/20"
                >
                  <span>SUBSCRIBE</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {newsletterSubscribed && (
                <div className="mt-3 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>Subscribed! Check your inbox for confirmation.</span>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* ARTICLE FULL MODAL / DRAWER */}
      {mounted && activeModalArticle && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto overscroll-contain"
          onClick={() => setActiveModalArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          data-scroll-lock-scrollable="true"
        >
          <div
            className="relative w-full max-w-4xl max-h-[100dvh] sm:max-h-[90vh] bg-white text-charcoal rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            data-scroll-lock-scrollable="true"
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-amber-gold/15 text-amber-hover font-mono text-xs font-bold uppercase rounded-md">
                  {activeModalArticle.category}
                </span>
                <span className="hidden sm:inline-block text-xs font-mono text-gray-500">
                  {activeModalArticle.date} • {activeModalArticle.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  title="Copy link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>

                <button
                  ref={closeBtnRef}
                  onClick={() => setActiveModalArticle(null)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all cursor-pointer"
                  title="Close modal"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div
              className="overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              data-scroll-lock-scrollable="true"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >

              {/* Header Titles */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-hover mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Published {activeModalArticle.date}</span>
                </div>

                <h2 id="modal-article-title" className="text-2xl sm:text-4xl font-condensed font-extrabold text-charcoal leading-tight">
                  {activeModalArticle.title}
                </h2>

                <p className="mt-2 text-base text-amber-hover font-medium italic">
                  {activeModalArticle.subtitle}
                </p>
              </div>

              {/* Banner Image inside Modal */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden">
                <Image
                  src={articleImage(activeModalArticle)}
                  alt={activeModalArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Quick Metrics Bar */}
              {activeModalArticle.stats && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl text-center">
                  {activeModalArticle.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-xl sm:text-2xl font-condensed font-bold text-amber-hover">{stat.value}</div>
                      <div className="text-[11px] font-mono text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Rich HTML Content */}
              <div
                className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 font-body border-t border-gray-100 pt-6"
                dangerouslySetInnerHTML={{ __html: activeModalArticle.fullContent }}
              />

              {/* Disclaimer / Source */}
              <div className="p-4 bg-gray-50 rounded-xl text-xs text-gray-500 font-mono">
                Source: Sky Crest Industry Research & Regional Commercial Regulatory Bulletins. For detailed procurement inquiries, contact our media team at <span className="text-amber-hover font-bold">info@skycrest.ae</span>.
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500">Sky Crest Building Contracting LLC • Dubai, UAE</span>
              <button
                onClick={() => setActiveModalArticle(null)}
                className="px-5 py-2 bg-amber-gold hover:bg-amber-hover text-charcoal font-bold rounded-lg transition-colors cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>

        </div>,
        document.body
      )}

    </section>
  );
}

// Helper to safely get modal image
function articleImage(article) {
  return article ? article.image : '/images/news-1.jpg';
}
