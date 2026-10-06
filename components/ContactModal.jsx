'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useModalScrollLock } from '@/components/SmoothScroll';

const PROJECT_TYPES = [
  'Commercial & High-Rise Infrastructure',
  'Heavy Industrial & Energy Plant',
  'Transportation & Civil Viaduct / Bridge',
  'Structural Retrofit & Renovation',
  'Subcontractor Prequalification',
];

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: PROJECT_TYPES[0],
    message: '',
    website: '', // Honeypot field
  });

  useEffect(() => {
    setMounted(true);

    const handleOpen = (e) => {
      const detail = e?.detail || {};
      if (detail.projectTitle) {
        setFormData((prev) => ({
          ...prev,
          subject: detail.projectTitle || PROJECT_TYPES[0],
          message: `Inquiry regarding project: ${detail.projectTitle}\n\nPlease provide technical specs, timeline, and preliminary cost estimates.`,
        }));
      }
      setIsOpen(true);
    };

    window.addEventListener('open-contact-modal', handleOpen);

    return () => {
      window.removeEventListener('open-contact-modal', handleOpen);
    };
  }, []);

  useModalScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
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
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: PROJECT_TYPES[0],
        message: '',
        website: '',
      });

      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 4000);
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-charcoal/90 backdrop-blur-md transition-opacity duration-300 animate-fadeIn overflow-y-auto overscroll-contain"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-inquiry-title"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      data-scroll-lock-scrollable="true"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-[#18181b] text-white border-2 border-amber-gold/50 shadow-2xl rounded-3xl overflow-hidden max-h-[100dvh] sm:max-h-[90vh] flex flex-col my-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        data-scroll-lock-scrollable="true"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#121214]">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-amber-gold uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-gold animate-pulse" />
              <span>SKYCREST CONTRACTING // OFFICIAL INQUIRY</span>
            </div>
            <h2 id="modal-inquiry-title" className="font-condensed font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-0.5">
              INITIATE A PROJECT INQUIRY
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-amber-gold hover:text-charcoal text-white transition-all duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-grow">
          {errorMsg && (
            <div className="mb-5 p-4 bg-red-950/80 border border-red-500/80 text-red-200 text-xs font-mono rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {submitted ? (
            <div className="py-12 px-6 bg-amber-gold/10 border border-amber-gold text-white flex flex-col items-center text-center rounded-2xl animate-scaleUp">
              <CheckCircle2 className="w-16 h-16 text-amber-gold mb-4 animate-bounce" />
              <h3 className="font-condensed font-black text-3xl uppercase tracking-wider text-amber-gold">
                INQUIRY TRANSMITTED SUCCESSFULLY
              </h3>
              <p className="text-sm font-light text-gray-300 mt-3 max-w-md leading-relaxed">
                Thank you for contacting Skycrest Building Contracting LLC. A senior project executive will respond to your request within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot Input */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="hidden shrink-0 w-0 h-0 p-0 m-0 border-0 opacity-0 pointer-events-none"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-condensed font-extrabold text-amber-gold tracking-wider uppercase mb-1.5">
                    FULL NAME *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="e.g. Alexander Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-gold focus:ring-1 focus:ring-amber-gold transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-xs font-condensed font-extrabold text-amber-gold tracking-wider uppercase mb-1.5">
                    CORPORATE EMAIL *
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder="a.sterling@enterprise.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-gold focus:ring-1 focus:ring-amber-gold transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-condensed font-extrabold text-amber-gold tracking-wider uppercase mb-1.5">
                    PHONE / DIRECT LINE
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    maxLength={50}
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-gold focus:ring-1 focus:ring-amber-gold transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="modal-subject" className="block text-xs font-condensed font-extrabold text-amber-gold tracking-wider uppercase mb-1.5">
                    PROJECT CATEGORY / SUBJECT
                  </label>
                  <input
                    id="modal-subject"
                    type="text"
                    maxLength={200}
                    placeholder="e.g. Commercial High-Rise Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-gold focus:ring-1 focus:ring-amber-gold transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-message" className="block text-xs font-condensed font-extrabold text-amber-gold tracking-wider uppercase mb-1.5">
                  PROJECT DETAILS &amp; REQUIREMENTS *
                </label>
                <textarea
                  id="modal-message"
                  required
                  maxLength={5000}
                  rows={4}
                  placeholder="Describe your project scope, location, timeline, or specific engineering requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#242427] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-gold focus:ring-1 focus:ring-amber-gold transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-gold hover:bg-amber-500 text-charcoal font-condensed font-black text-base tracking-wider uppercase py-4 rounded-xl transition-all duration-200 shadow-xl flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-charcoal" />
                    <span>TRANSMITTING INQUIRY...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT CAPITAL INQUIRY</span>
                    <Send className="w-5 h-5 text-charcoal group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
