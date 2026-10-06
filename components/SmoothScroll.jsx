'use client';

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

const SmoothScrollContext = createContext({
  locoScroll: null,
  stop: () => {},
  start: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function useModalScrollLock(isOpen) {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!isOpen) return;

    // Calculate scrollbar width to prevent page layout jump
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalDocOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    stop();

    return () => {
      document.documentElement.style.overflow = originalDocOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;

      start();
    };
  }, [isOpen, stop, start]);
}

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const [locoInstance, setLocoInstance] = useState(null);
  const activeLocksRef = useRef(0);

  useEffect(() => {
    let locoScroll = null;

    const initScroll = async () => {
      if (typeof window === 'undefined') return;

      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        locoScroll = new LocomotiveScroll();
        setLocoInstance(locoScroll);

        if (activeLocksRef.current > 0 && typeof locoScroll.stop === 'function') {
          locoScroll.stop();
        }

        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      } catch (err) {
        console.warn('Locomotive Scroll init fallback:', err);
      }
    };

    initScroll();

    return () => {
      if (locoScroll && typeof locoScroll.destroy === 'function') {
        locoScroll.destroy();
      }
      setLocoInstance(null);
    };
  }, []);

  const stop = useCallback(() => {
    activeLocksRef.current = Math.max(0, activeLocksRef.current + 1);
    if (locoInstance && typeof locoInstance.stop === 'function') {
      locoInstance.stop();
    }
  }, [locoInstance]);

  const start = useCallback(() => {
    activeLocksRef.current = Math.max(0, activeLocksRef.current - 1);
    if (activeLocksRef.current === 0 && locoInstance && typeof locoInstance.start === 'function') {
      locoInstance.start();
    }
  }, [locoInstance]);

  return (
    <SmoothScrollContext.Provider value={{ locoScroll: locoInstance, stop, start }}>
      <div ref={containerRef} className="relative min-h-screen bg-charcoal">
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}
