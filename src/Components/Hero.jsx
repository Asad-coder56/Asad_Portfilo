import React, { useEffect, useRef, useState } from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaArrowRight,
  FaMapMarkerAlt, FaCopy, FaCheck, FaTerminal, FaCode, FaServer, FaDatabase, FaBrain
} from 'react-icons/fa';
import profileImg from '../assets/WhatsApp Image 2026-02-23 at 9.08.38 PM.jpeg';

const ROLES = [
  'Full-Stack Developer',
  'React 19 & Frontend Engineer',
  'Node.js & REST API Architect',
  'AI & SaaS Solution Developer',
];

const Hero = ({ setActiveSection, scrollToSection }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 42);
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection('home'); },
        { threshold: 0.3 }
      );
    }
    const el = sectionRef.current;
    if (el) observerRef.current.observe(el);
    return () => { if (el) observerRef.current?.unobserve(el); };
  }, [setActiveSection]);

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(`const developer = { name: "Asad Kamal Shah", role: "Full-Stack Dev", stack: ["React 19", "Node.js", "MySQL", "MongoDB"], projects: 14 };`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { icon: FaGithub, url: 'https://github.com/Asad-coder56', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/muhammad-asad-kamal-shah-076053318', label: 'LinkedIn' },
    { icon: FaEnvelope, url: 'mailto:kamalasad57@gmail.com', label: 'Email' },
  ];

  const stats = [
    { value: '1.5+', label: 'Years Exp.' },
    { value: '14+', label: 'Projects' },
    { value: 'MERN', label: 'Core Stack' },
  ];

  const floatingBadges = [
    { icon: FaCode, text: 'React 19', pos: '-top-4 -left-4', color: isDark ? '#64ffda' : '#1d4ed8' },
    { icon: FaServer, text: 'Node.js', pos: 'top-1/4 -right-6', color: isDark ? '#34d399' : '#047857' },
    { icon: FaDatabase, text: 'MySQL / Mongo', pos: 'bottom-16 -left-6', color: isDark ? '#a78bfa' : '#6d28d9' },
    { icon: FaBrain, text: 'FastAPI AI', pos: '-bottom-4 right-2', color: isDark ? '#fb923c' : '#c2410c' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ scrollMarginTop: 0 }}
    >
      {/* Background grid & orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />

        <div
          className="absolute -top-40 -right-20 w-[700px] h-[700px] rounded-full blur-[130px] opacity-60"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(100,255,218,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)'
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full blur-[110px] opacity-60"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(29,52,97,0.80) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">

            {/* Available pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full font-mono text-[11px] tracking-[0.15em] uppercase font-semibold"
              style={{
                border: isDark ? '1px solid rgba(52,211,153,0.40)' : '1px solid rgba(16,185,129,0.35)',
                background: isDark ? 'rgba(52,211,153,0.08)' : 'rgba(16,185,129,0.08)',
                color: isDark ? '#34d399' : '#047857',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for Full-Stack & Frontend Work
            </div>

            {/* Headline */}
            <h1 className="font-black leading-[1.06] tracking-tighter mb-6">
              <span className="block text-[clamp(2.5rem,7vw,4.8rem)]" style={{ color: 'var(--text-primary)' }}>
                Hi, I'm Asad.
              </span>
              <span
                className="block text-[clamp(2.5rem,7vw,4.8rem)]"
                style={{ color: 'var(--accent)' }}
              >
                Kamal Shah
              </span>
            </h1>

            {/* Typewriter terminal box */}
            <div
              className="flex items-center gap-2.5 h-10 mb-7 px-4 py-2 rounded-xl max-w-xs lg:max-w-md w-full lg:w-auto"
              style={{
                background: 'var(--bg-surface)',
                border: `1px solid var(--border)`,
              }}
            >
              <span className="font-mono text-xs font-bold" style={{ color: 'var(--accent)' }}>›_</span>
              <span className="font-mono text-sm font-semibold tracking-wide" style={{ color: 'var(--text-primary)' }}>
                {displayed}
                <span className="inline-block w-0.5 h-[1.1em] ml-0.5 align-middle animate-pulse" style={{ background: 'var(--accent)' }} />
              </span>
            </div>

            {/* Bio */}
            <p className="max-w-xl mb-8 text-[15px] sm:text-base leading-[1.82] font-light" style={{ color: 'var(--text-muted)' }}>
              Full-Stack Developer with{' '}
              <span className="font-semibold" style={{ color: 'var(--accent)' }}>1.5+ years</span>{' '}
              of professional experience at{' '}
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>MRA Developers</span>,
              building scalable web apps with React.js, Node.js, Express.js, MySQL, and MongoDB.
              {' '}Based in{' '}
              <span className="inline-flex items-center gap-1 font-medium" style={{ color: 'var(--text-primary)' }}>
                <FaMapMarkerAlt className="text-xs text-rose-500" /> Islamabad, Pakistan.
              </span>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 w-full justify-center lg:justify-start">
              {stats.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center lg:items-start group cursor-default">
                    <span
                      className="text-2xl sm:text-3xl font-black leading-none transition-colors duration-200"
                      style={{ color: 'var(--text-primary)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    >
                      {s.value}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase mt-1" style={{ color: 'var(--text-muted)' }}>
                      {s.label}
                    </span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8" style={{ background: 'var(--border)' }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-10 w-full sm:w-auto">
              {/* Primary CTA: Solid accent with inverse text */}
              <button
                onClick={() => scrollToSection('projects')}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 active:scale-[0.98] shadow-md"
                style={{
                  border: `1px solid var(--accent)`,
                  color: isDark ? '#0a192f' : '#ffffff',
                  background: 'var(--accent)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.boxShadow = '0 0 24px var(--shadow-color)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                Explore 14 Projects
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Ghost button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 active:scale-[0.98]"
                style={{
                  border: `1px solid var(--border)`,
                  color: 'var(--text-primary)',
                  background: 'var(--bg-card)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <FaEnvelope className="text-xs opacity-70" />
                Get In Touch
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>Connect</span>
              <div className="w-8 h-px" style={{ background: 'var(--border)' }} />
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  style={{
                    border: `1px solid var(--border)`,
                    background: 'var(--bg-card)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)';
                    e.currentTarget.style.borderColor = 'var(--border-accent)';
                    e.currentTarget.style.background = 'var(--accent-subtle)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }}
                >
                  <s.icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6 order-1 lg:order-2 w-full lg:w-auto">

            <div className="relative">
              {/* Floating Tech Badges */}
              {floatingBadges.map((b, i) => (
                <div
                  key={i}
                  className={`absolute ${b.pos} z-30 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md cursor-default`}
                  style={{
                    border: `1px solid var(--border)`,
                    background: 'var(--bg-card)',
                  }}
                >
                  <b.icon style={{ color: b.color, fontSize: '0.8rem' }} />
                  <span className="text-[11px] font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {b.text}
                  </span>
                </div>
              ))}

              {/* Corner frame decoration */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: 'var(--accent)', opacity: 0.6 }} />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: 'var(--accent)', opacity: 0.6 }} />

              {/* Photo */}
              <div
                className="relative w-[68vw] max-w-[240px] aspect-[4/5] sm:w-64 sm:h-72 lg:w-72 lg:h-80 rounded-2xl overflow-hidden mx-auto group shadow-xl"
                style={{
                  border: `1px solid var(--border)`,
                }}
              >
                <img
                  src={profileImg}
                  alt="Asad Kamal"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Location badge */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-1.5 rounded-full shadow-xl whitespace-nowrap"
                style={{ background: 'var(--bg-card)', border: `1px solid var(--border)` }}
              >
                <FaMapMarkerAlt style={{ color: 'var(--accent)', fontSize: '0.75rem' }} />
                <span className="font-mono text-[11px] font-medium" style={{ color: 'var(--text-primary)' }}>
                  Islamabad, PK
                </span>
              </div>
            </div>

            {/* Terminal Snippet Box */}
            <div
              className="w-full max-w-xs mt-4 rounded-xl overflow-hidden shadow-lg"
              style={{
                background: isDark ? '#0d1117' : 'var(--bg-surface)',
                border: `1px solid var(--border)`,
              }}
            >
              {/* Title bar */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{
                  background: isDark ? '#010409' : '#e8ecf0',
                  borderBottom: `1px solid var(--border)`,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[10px] tracking-wider flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                    <FaTerminal style={{ fontSize: '0.5625rem' }} /> developer.config.js
                  </span>
                </div>
                <button
                  onClick={handleCopyConfig}
                  className="text-xs transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {copied ? <FaCheck style={{ color: '#34d399' }} /> : <FaCopy />}
                </button>
              </div>

              {/* Code text */}
              <div className="px-4 py-4 font-mono text-[11px] leading-[1.95]">
                <span style={{ color: isDark ? '#a78bfa' : '#6d28d9' }}>const</span>{' '}
                <span style={{ color: 'var(--accent)' }} className="font-semibold">developer</span>{' '}
                <span style={{ color: 'var(--text-muted)' }}>=</span>{' '}
                <span style={{ color: 'var(--text-muted)' }}>&#123;</span>
                <br />
                <span className="pl-3.5" style={{ color: 'var(--text-muted)' }}>name:</span>{' '}
                <span style={{ color: isDark ? '#34d399' : '#047857' }}>"Asad Kamal Shah"</span>
                <span style={{ color: 'var(--text-muted)' }}>,</span>
                <br />
                <span className="pl-3.5" style={{ color: 'var(--text-muted)' }}>stack:</span>{' '}
                <span style={{ color: isDark ? '#fb923c' : '#c2410c' }}>"React · Node · MySQL · MongoDB"</span>
                <span style={{ color: 'var(--text-muted)' }}>,</span>
                <br />
                <span className="pl-3.5" style={{ color: 'var(--text-muted)' }}>role:</span>{' '}
                <span style={{ color: 'var(--accent)' }}>"Full-Stack Dev"</span>
                <span style={{ color: 'var(--text-muted)' }}>,</span>
                <br />
                <span className="pl-3.5" style={{ color: 'var(--text-muted)' }}>projects:</span>{' '}
                <span style={{ color: isDark ? '#fb923c' : '#c2410c' }} className="font-bold">14</span>
                <span style={{ color: 'var(--text-muted)' }}>,</span>
                <br />
                <span style={{ color: 'var(--text-muted)' }}>&#125;;</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, var(--border-accent), transparent)`,
        }}
      />
    </section>
  );
};

export default Hero;