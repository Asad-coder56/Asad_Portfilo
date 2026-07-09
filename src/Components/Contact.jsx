import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGithub, FaLinkedin,
  FaCheckCircle, FaPaperPlane,
  FaUser, FaCode,
} from 'react-icons/fa';

const inputBase = {
  dark: 'dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-white dark:placeholder-white/20 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/10',
  light: 'bg-white border-slate-200 text-slate-900 placeholder-slate-300 focus:border-indigo-400 focus:ring-indigo-400/10',
};

const INPUT_CLS = `w-full px-4 py-3.5 rounded-xl border text-sm font-medium outline-none focus:ring-2 transition-all duration-200
  ${inputBase.dark} ${inputBase.light}`;

const LABEL_CLS = 'block text-[11px] font-mono tracking-[0.12em] uppercase dark:text-white/30 text-slate-400 mb-2';

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

  const accent = isDark ? '#67e8f9' : '#4f46e5';

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-28 overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-500 border-t dark:border-white/[0.06] border-slate-200 ${isStandalone ? 'pt-36' : ''}`}
      style={{ scrollMarginTop: '4rem' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 dark:opacity-[0.03] opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,179,237,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,179,237,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full dark:bg-cyan-500/6 bg-indigo-200/20 blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full dark:bg-violet-600/6 bg-violet-200/15 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          animate={visible ? 'show' : 'hidden'}
          variants={fadeUp}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full
            dark:border dark:border-cyan-400/20 border border-indigo-200
            dark:bg-cyan-400/5 bg-indigo-50
            dark:text-cyan-400 text-indigo-600
            text-[11px] font-mono tracking-[0.15em] uppercase font-medium">
            <FaEnvelope className="text-xs" />
            Contact
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black leading-tight tracking-tight dark:text-white text-slate-900">
            Let's Build Something{' '}
            <span className="dark:text-transparent text-transparent bg-clip-text
              dark:[background-image:linear-gradient(135deg,#67e8f9,#818cf8)]
              [background-image:linear-gradient(135deg,#4f46e5,#7c3aed)]">
              Together.
            </span>
          </h2>
          <p className="mt-2 max-w-lg text-[15px] dark:text-white/45 text-slate-500 leading-relaxed font-light">
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
            {contactItems.map(({ icon: Icon, label, value, href }, i) => (
              <motion.div
                key={label}
                variants={slideRight}
                className="group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 dark:bg-white/[0.025] bg-white"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}30`;
                  e.currentTarget.style.boxShadow = `0 8px 30px ${accent}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300"
                  style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
                >
                  <Icon className="text-sm" style={{ color: accent }} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase dark:text-white/25 text-slate-400 mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-[13px] font-medium dark:text-white/70 text-slate-700 dark:hover:text-cyan-400 hover:text-indigo-600 transition-colors duration-200">
                      {value}
                    </a>
                  ) : (
                    <span className="text-[13px] font-medium dark:text-white/70 text-slate-700">{value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              variants={slideRight}
              className="p-5 rounded-2xl border dark:bg-white/[0.025] bg-white mt-2"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }}
            >
              <p className="text-[10px] font-mono tracking-[0.15em] uppercase dark:text-white/25 text-slate-400 mb-4">Find me online</p>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                      color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${accent}40`;
                      e.currentTarget.style.color = accent;
                      e.currentTarget.style.background = `${accent}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
                      e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';
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
              className="p-5 rounded-2xl border mt-2"
              style={{
                borderColor: isDark ? 'rgba(52,211,153,0.2)' : 'rgba(16,185,129,0.2)',
                background: isDark ? 'rgba(52,211,153,0.04)' : 'rgba(16,185,129,0.04)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono tracking-widest uppercase dark:text-emerald-400 text-emerald-600 font-semibold">
                  Available for work
                </span>
              </div>
              <p className="text-[13px] dark:text-white/40 text-slate-500 font-light leading-relaxed">
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
              className="p-7 sm:p-8 rounded-2xl border dark:bg-white/[0.025] bg-white shadow-sm h-full"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }}
            >
              {/* Form title row */}
              <div className="flex items-center gap-3 mb-7 pb-5 border-b"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}12`, border: `1px solid ${accent}25` }}
                >
                  <FaCode className="text-sm" style={{ color: accent }} />
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white text-slate-900">Send a message</p>
                  <p className="text-[11px] font-mono dark:text-white/25 text-slate-400 mt-0.5">I usually respond within 24 hours</p>
                </div>
              </div>

              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={LABEL_CLS}>
                    <FaUser className="inline text-[9px] mr-1 opacity-60" />Your Name
                  </label>
                  <input
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    placeholder="John Doe"
                    className={INPUT_CLS}
                  />
                </div>
                <div>
                  <label className={LABEL_CLS}>
                    <FaEnvelope className="inline text-[9px] mr-1 opacity-60" />Email Address
                  </label>
                  <input
                    type="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    placeholder="john@example.com"
                    className={INPUT_CLS}
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className={LABEL_CLS}>Subject</label>
                <input
                  type="text" name="subject" required
                  value={formData.subject} onChange={handleChange}
                  placeholder="What's this about?"
                  className={INPUT_CLS}
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className={LABEL_CLS}>Message</label>
                <textarea
                  name="message" required rows={5}
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  className={`${INPUT_CLS} resize-none`}
                />
              </div>

              {/* Status banner */}
              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-[13px] font-medium border ${status.success
                        ? 'dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-700 dark:border-emerald-500/20 border-emerald-200'
                        : 'dark:bg-cyan-400/10 bg-indigo-50 dark:text-cyan-400 text-indigo-700 dark:border-cyan-400/20 border-indigo-200'
                        }`}
                    >
                      {status.success
                        ? <FaCheckCircle className="text-base flex-shrink-0" />
                        : <div className="w-4 h-4 border-2 dark:border-cyan-400 border-indigo-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                      }
                      {status.message}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <button
                type="submit"
                disabled={status.sending}
                className="w-full group flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
                style={{
                  background: isDark ? '#67e8f9' : '#4f46e5',
                  color: isDark ? '#050810' : '#ffffff',
                  boxShadow: isDark ? '0 8px 24px rgba(103,232,249,0.2)' : '0 8px 24px rgba(79,70,229,0.25)',
                }}
                onMouseEnter={(e) => { if (!status.sending) e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                {status.sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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