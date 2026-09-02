'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let locoScroll = null;

    const initScroll = async () => {
      if (typeof window === 'undefined') return;

      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        locoScroll = new LocomotiveScroll();
      } catch (err) {
        console.warn('Locomotive Scroll init fallback:', err);
      }
    };

    initScroll();

    return () => {
      if (locoScroll && typeof locoScroll.destroy === 'function') {
        locoScroll.destroy();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-charcoal">
      {children}
    </div>
  );
}
