'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, AlertCircle, Loader2 } from 'lucide-react';

const PROJECT_TYPES = [
  'Commercial & High-Rise Infrastructure',
  'Heavy Industrial & Energy Plant',
  'Transportation & Civil Viaduct / Bridge',
  'Structural Retrofit & Renovation',
  'Subcontractor Prequalification',
];

const OFFICES = [
  {
    city: 'HOUSTON (GLOBAL HQ)',
    address: '1200 Steel Tower Plaza, Suite 4000',
    location: 'Houston, TX 77002, USA',
    phone: '+1 (713) 555-0190',
    email: 'houston.hq@skycrest-eng.com',
  },
  {
    city: 'LONDON (EUROPE)',
    address: '25 Canary Wharf Infrastructure Tower',
    location: 'London E14 5AB, United Kingdom',
    phone: '+44 20 7946 0912',
    email: 'europe@skycrest-eng.com',
  },
  {
    city: 'DUBAI (MIDDLE EAST)',
    address: 'Level 50, Financial Center South',
    location: 'DIFC, Dubai, United Arab Emirates',
    phone: '+971 4 312 9000',
    email: 'mena@skycrest-eng.com',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: PROJECT_TYPES[0],
    message: '',
    website: '', // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
      }, 6000);
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-off-white text-charcoal py-28 border-b border-off-white-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-condensed font-bold tracking-[0.25em] text-amber-hover uppercase mb-3">
            <span className="w-2.5 h-2.5 bg-amber-gold inline-block" />
            <span>PROJECT INQUIRIES &amp; RFQ SUBMISSION</span>
          </div>
          <h2 className="font-condensed font-extrabold text-4xl sm:text-6xl tracking-tight uppercase leading-none text-charcoal mb-4">
            INITIATE A CAPITAL PROJECT
          </h2>
          <p className="text-base sm:text-lg text-charcoal/80 font-light leading-relaxed">
            Our global project development executive team is available to review RFQs, pre-construction feasibility proposals, and EPC joint venture inquiries.
          </p>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-charcoal/15 shadow-md">
            <div className="text-xs font-mono tracking-widest text-amber-hover uppercase mb-6 pb-3 border-b border-charcoal/10">
              OFFICIAL INQUIRY FORM
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-mono flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {submitted ? (
              <div className="p-8 bg-amber-gold/10 border border-amber-gold text-charcoal flex flex-col items-center text-center my-8">
                <CheckCircle2 className="w-12 h-12 text-amber-hover mb-4" />
                <h3 className="font-condensed font-extrabold text-2xl uppercase">INQUIRY TRANSMITTED</h3>
                <p className="text-xs font-light text-charcoal/80 mt-2 max-w-md">
                  Thank you. A senior Skycrest EPC director will respond to your project request within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field hidden from real users */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden shrink-0 w-0 h-0 p-0 m-0 border-0 opacity-0 pointer-events-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-condensed font-bold text-charcoal tracking-wider uppercase mb-2">
                      FULL NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={100}
                      placeholder="e.g. Robert Sterling"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-off-white border border-charcoal/20 px-4 py-3 text-sm text-charcoal font-sans focus:outline-none focus:border-amber-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-condensed font-bold text-charcoal tracking-wider uppercase mb-2">
                      CORPORATE EMAIL *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      maxLength={255}
                      placeholder="r.sterling@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-off-white border border-charcoal/20 px-4 py-3 text-sm text-charcoal font-sans focus:outline-none focus:border-amber-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-condensed font-bold text-charcoal tracking-wider uppercase mb-2">
                      PHONE / DIRECT LINE
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      maxLength={50}
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-off-white border border-charcoal/20 px-4 py-3 text-sm text-charcoal font-sans focus:outline-none focus:border-amber-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-condensed font-bold text-charcoal tracking-wider uppercase mb-2">
                      PROJECT CATEGORY / SUBJECT
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-off-white border border-charcoal/20 px-4 py-3 text-sm text-charcoal font-sans focus:outline-none focus:border-amber-gold"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-condensed font-bold text-charcoal tracking-wider uppercase mb-2">
                    PROJECT SCOPE &amp; SPECIFICATIONS *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    maxLength={5000}
                    rows={4}
                    placeholder="Provide site location, target timeline, key technical requirements, and RFQ documentation links..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-off-white border border-charcoal/20 px-4 py-3 text-sm text-charcoal font-sans focus:outline-none focus:border-amber-gold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-charcoal hover:bg-charcoal-dark text-amber-gold font-condensed font-extrabold text-sm tracking-wider uppercase py-4 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                  id="submit-contact-form"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-amber-gold" />
                      <span>TRANSMITTING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT CAPITAL PROJECT INQUIRY</span>
                      <Send className="w-4 h-4 text-amber-gold" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Global Offices & Map Placeholder */}
          <div className="lg:col-span-5 space-y-8">
            {/* Map Placeholder Graphic */}
            <div className="bg-charcoal p-6 text-off-white border border-steel-border relative overflow-hidden">
              <div className="text-xs font-mono text-amber-gold tracking-widest uppercase mb-2">
                GLOBAL COMMAND OPERATIONS
              </div>
              <h3 className="font-condensed font-extrabold text-2xl uppercase mb-4">
                PROJECT SITES WORLDWIDE
              </h3>

              {/* Minimal Map Visual Component */}
              <div className="relative h-48 bg-charcoal-card border border-steel-border flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                <div className="relative z-10 text-center">
                  <Building className="w-8 h-8 text-amber-gold mx-auto mb-2" />
                  <div className="text-xs font-condensed font-bold text-white uppercase tracking-wider">
                    HOUSTON | LONDON | DUBAI | TOKYO
                  </div>
                  <div className="text-[10px] font-mono text-mid-gray mt-1">
                    24/7 ACTIVE REGIONAL EPC HUBS
                  </div>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="space-y-4">
              {OFFICES.map((office) => (
                <div key={office.city} className="bg-white p-6 border border-charcoal/10">
                  <div className="text-xs font-condensed font-extrabold text-charcoal tracking-wider uppercase mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-hover" />
                    <span>{office.city}</span>
                  </div>
                  <div className="text-xs font-light text-charcoal/80 space-y-1 pl-6">
                    <div>{office.address}</div>
                    <div>{office.location}</div>
                    <div className="font-mono font-medium text-amber-hover pt-1">{office.phone}</div>
                    <div className="font-mono text-mid-gray">{office.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
