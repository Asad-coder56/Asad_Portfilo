import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGithub, FaLinkedin,
  FaCheckCircle, FaPaperPlane,
  FaUser, FaCode,
} from 'react-icons/fa';

/* ── Motion Variants ──────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const slideRight = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

const slideLeft = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

/* ── Component ───────────────────────────────────── */
const Contact = ({ setActiveSection, isStandalone = false }) => {
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ sending: false, success: false, message: '' });
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  /* Detect dark mode */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  /* Intersection observer */
  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([e]) => { setVisible(e.isIntersecting); if (e.isIntersecting && setActiveSection) setActiveSection('contact'); },
        { threshold: 0.08 }
      );
    }
    const el = sectionRef.current;
    if (el) observerRef.current.observe(el);
    return () => { if (el) observerRef.current?.unobserve(el); };
  }, [setActiveSection]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, message: '' });
    setTimeout(() => {
      setStatus({ sending: false, success: true, message: "Message sent! I'll get back to you shortly." });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus({ sending: false, success: false, message: '' }), 5000);
    }, 1500);
  };

  const contactItems = [
    { icon: FaEnvelope, label: 'Email', value: 'kamalasad57@gmail.com', href: 'mailto:kamalasad57@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+92 305 1958933', href: 'tel:+923051958933' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Islamabad, Pakistan', href: null },
  ];

  const socials = [
    { icon: FaGithub, href: 'https://github.com/Asad-coder56', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/muhammad-asad-kamal-shah-076053318', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:kamalasad57@gmail.com', label: 'Email' },
  ];

  const inputStyle = {
    background: 'var(--bg-base)',
    border: `1px solid var(--border)`,
    color: 'var(--text-primary)',
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-24 overflow-hidden transition-colors duration-500 ${isStandalone ? 'pt-36' : ''}`}
      style={{
        scrollMarginTop: '4rem',
        borderTop: `1px solid ${isDark ? 'rgba(100,255,218,0.08)' : 'rgba(208,215,222,0.80)'}`,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={visible ? 'show' : 'hidden'}
          variants={fadeUp}
          className="mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full font-mono text-[11px] tracking-[0.15em] uppercase font-semibold"
            style={{
              border: `1px solid var(--border-accent)`,
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
            }}
          >
            <FaEnvelope className="text-xs" />
            Contact
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Let's Build Something{' '}
            <span
              style={{
                color: 'var(--accent)',
              }}
            >
              Together.
            </span>
          </h2>
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
            Have a project in mind, a job opportunity, or just want to say hi? Drop me a message.
          </p>
        </motion.div>

        {/* ── Split Grid ── */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* ── LEFT: Info Panel ── */}
          <motion.div
            initial="hidden"
            animate={visible ? 'show' : 'hidden'}
            variants={staggerContainer}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Contact cards */}
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                variants={slideRight}
                className="group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 shadow-sm"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-300"
                  style={{ background: 'var(--accent-subtle)', border: `1px solid var(--border-accent)` }}
                >
                  <Icon className="text-sm" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-[13px] font-medium transition-colors duration-200"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>{value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              variants={slideRight}
              className="p-5 rounded-xl border mt-2"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>Find me online</p>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.background = 'var(--accent-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = '';
                    }}
                  >
                    <Icon className="text-sm" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              variants={slideRight}
              className="p-5 rounded-xl border mt-2"
              style={{
                borderColor: isDark ? 'rgba(52,211,153,0.35)' : 'rgba(16,185,129,0.35)',
                background: isDark ? 'rgba(52,211,153,0.08)' : 'rgba(16,185,129,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span
                  className="text-[11px] font-mono tracking-widest uppercase font-semibold"
                  style={{ color: isDark ? '#34d399' : '#047857' }}
                >
                  Available for work
                </span>
              </div>
              <p className="text-[13px] font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Currently open to full-time roles and freelance projects.
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            initial="hidden"
            animate={visible ? 'show' : 'hidden'}
            variants={slideLeft}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-7 sm:p-8 rounded-xl border shadow-sm h-full"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              {/* Form title row */}
              <div className="flex items-center gap-3 mb-7 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--accent-subtle)', border: `1px solid var(--border-accent)` }}
                >
                  <FaCode className="text-sm" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Send a message</p>
                  <p className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>I usually respond within 24 hours</p>
                </div>
              </div>

              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                    <FaUser className="inline text-[9px] mr-1 opacity-60" />Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg text-xs font-mono transition-all outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                    <FaEnvelope className="inline text-[9px] mr-1 opacity-60" />Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg text-xs font-mono transition-all outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="block text-[11px] font-mono tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full px-4 py-3 rounded-lg text-xs font-mono transition-all outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-[11px] font-mono tracking-[0.12em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Hi Asad, I'd like to discuss a project..."
                  className="w-full px-4 py-3 rounded-lg text-xs font-mono transition-all outline-none resize-none"
                  style={inputStyle}
                />
              </div>

              {/* Status Banner */}
              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-5 p-4 rounded-lg flex items-center gap-3 text-xs font-mono border"
                    style={{
                      borderColor: status.success ? 'rgba(52,211,153,0.40)' : 'rgba(239,68,68,0.40)',
                      background: status.success ? 'rgba(52,211,153,0.10)' : 'rgba(239,68,68,0.10)',
                      color: status.success ? (isDark ? '#34d399' : '#047857') : '#ef4444',
                    }}
                  >
                    <FaCheckCircle className="text-sm flex-shrink-0" />
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status.sending}
                className="w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 shadow-md active:scale-[0.98]"
                style={{
                  background: 'var(--accent)',
                  color: isDark ? '#0a192f' : '#ffffff',
                }}
              >
                {status.sending ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FaPaperPlane className="text-xs" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;