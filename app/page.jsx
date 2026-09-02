import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import AboutStrip from '@/components/sections/AboutStrip';
import Services from '@/components/sections/Services';
import FeaturedProjects from '@/components/sections/FeaturedProjects';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-charcoal text-off-white selection:bg-amber-gold selection:text-charcoal font-sans">
        <Navbar />
        <main>
          <Hero />
          <AboutStrip />
          <Services />
          <FeaturedProjects />
          <WhyChooseUs />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
