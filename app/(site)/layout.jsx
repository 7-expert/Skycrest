import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function SiteLayout({ children }) {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-charcoal text-off-white selection:bg-amber-gold selection:text-charcoal font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ContactModal />
      </div>
    </SmoothScroll>
  );
}
