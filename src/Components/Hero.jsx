import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight, FaMapMarkerAlt, FaCopy, FaCheck, FaTerminal, FaCode, FaServer, FaDatabase, FaBrain } from 'react-icons/fa';
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
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  // Section observer
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

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Asad_Kamal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyConfig = () => {
    const configText = `const developer = { name: "Asad Kamal", role: "Full-Stack Dev", company: "MRA Developers", projects: 14, stack: ["React 19", "Node", "MySQL", "FastAPI"] };`;
    navigator.clipboard.writeText(configText);
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
    { icon: FaCode, text: 'React 19', pos: '-top-4 -left-4', color: 'dark:text-cyan-400 text-indigo-600', bg: 'dark:bg-[#091528] bg-white' },
    { icon: FaServer, text: 'Node.js', pos: 'top-1/4 -right-6', color: 'dark:text-emerald-400 text-emerald-600', bg: 'dark:bg-[#071a17] bg-white' },
    { icon: FaDatabase, text: 'MySQL / Mongo', pos: 'bottom-16 -left-6', color: 'dark:text-violet-400 text-purple-600', bg: 'dark:bg-[#140d25] bg-white' },
    { icon: FaBrain, text: 'FastAPI AI', pos: '-bottom-4 right-2', color: 'dark:text-amber-400 text-amber-600', bg: 'dark:bg-[#1f160b] bg-white' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-500"
      style={{ scrollMarginTop: 0 }}
    >
      {/* ── Ambient Mesh Grid Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 dark:opacity-[0.045] opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,179,237,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,179,237,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Animated Glow Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full dark:bg-cyan-500/10 bg-indigo-400/15 blur-[130px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full dark:bg-indigo-600/10 bg-violet-300/15 blur-[110px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* ── Main Layout Container ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ═══════════════ LEFT COLUMN ═══════════════ */}
          <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-8 rounded-full
              dark:border dark:border-emerald-500/30 border border-emerald-400/50
              dark:bg-emerald-500/10 bg-emerald-50
              dark:text-emerald-400 text-emerald-600
              text-[11px] font-mono tracking-[0.15em] uppercase font-semibold shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Full-Stack & Frontend Work
            </div>

            {/* Main Headline */}
            <h1 className="font-black leading-[1.08] tracking-tighter mb-5">
              <span className="block text-[clamp(2.25rem,7vw,4.5rem)] dark:text-white text-slate-900">
                Hi, I'm Asad.
              </span>
              <span className="block text-[clamp(2.25rem,7vw,4.5rem)] text-transparent bg-clip-text
                dark:[background-image:linear-gradient(135deg,#67e8f9,#818cf8)]
                [background-image:linear-gradient(135deg,#4f46e5,#7c3aed)]">
                Kamal Shah
              </span>
            </h1>

            {/* Typewriter Role */}
            <div className="flex items-center gap-2.5 h-9 mb-6 px-3 py-1 rounded-lg dark:bg-white/[0.03] bg-slate-100/70 border dark:border-white/5 border-slate-200">
              <span className="dark:text-cyan-400 text-indigo-600 font-mono text-xs font-bold">&gt;_</span>
              <span className="font-mono text-sm sm:text-base dark:text-cyan-400 text-indigo-600 font-semibold tracking-wide">
                {displayed}
                <span className="inline-block w-0.5 h-4 dark:bg-cyan-400 bg-indigo-500 ml-0.5 align-middle animate-pulse" />
              </span>
            </div>

            {/* Bio Description */}
            <p className="max-w-xl mb-8 text-[15px] sm:text-base leading-[1.8] dark:text-white/60 text-slate-600 font-light">
              Full-Stack Developer with <span className="dark:text-cyan-400 text-indigo-600 font-semibold">1.5+ years</span> of professional experience at <span className="dark:text-white text-slate-900 font-semibold">MRA Developers</span>, building scalable web apps with React.js, Node.js, Express.js, MySQL, and MongoDB. Experienced in RESTful APIs, JWT auth, RBAC, WebSockets, payment integrations (Authorize.net), and email services.
              Based in <span className="inline-flex items-center gap-1 dark:text-white text-slate-900 font-medium">
                <FaMapMarkerAlt className="text-xs text-rose-500" /> Islamabad, Pakistan.
              </span>
            </p>

            {/* Stats Metric Counter Bar */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 w-full justify-center lg:justify-start">
              {stats.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center lg:items-start group cursor-default">
                    <span className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 leading-none group-hover:dark:text-cyan-400 group-hover:text-indigo-600 transition-colors">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-mono dark:text-white/40 text-slate-400 tracking-widest uppercase mt-1">
                      {s.label}
                    </span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 dark:bg-white/10 bg-slate-200" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-10 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('projects')}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold
                  dark:bg-cyan-400 bg-indigo-600
                  dark:text-[#050810] text-white
                  dark:hover:bg-cyan-300 hover:bg-indigo-700
                  transition-all duration-200 shadow-xl dark:shadow-cyan-400/25 shadow-indigo-500/25 active:scale-[0.98]"
              >
                Explore 14 Projects
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleDownloadCV}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold
                  dark:border dark:border-white/15 border border-slate-200
                  dark:bg-white/[0.04] bg-white
                  dark:text-white/80 text-slate-700
                  dark:hover:bg-white/10 hover:bg-slate-100
                  dark:hover:text-white hover:text-slate-950
                  transition-all duration-200 shadow-sm active:scale-[0.98]"
              >
                <FaDownload className="text-xs opacity-70 group-hover:opacity-100" />
                Download CV
              </button>
            </div>

            {/* Social Channels */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="text-[10px] font-mono dark:text-white/30 text-slate-400 tracking-[0.2em] uppercase">
                Connect
              </span>
              <div className="w-8 h-px dark:bg-white/15 bg-slate-200" />
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex items-center justify-center w-10 h-10 rounded-xl
                    dark:border dark:border-white/10 border border-slate-200
                    dark:bg-white/[0.03] bg-white
                    dark:text-white/50 text-slate-500
                    dark:hover:text-cyan-400 hover:text-indigo-600
                    dark:hover:border-cyan-400/40 hover:border-indigo-300
                    dark:hover:bg-cyan-400/10 hover:bg-indigo-50
                    transition-all duration-200 shadow-sm hover:-translate-y-0.5"
                >
                  <s.icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* ═══════════════ RIGHT COLUMN ═══════════════ */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6 order-1 lg:order-2 w-full lg:w-auto">

            {/* Profile Frame with Floating Tech Badges */}
            <div className="relative">

              {/* Floating Technology Badges */}
              {floatingBadges.map((b, i) => (
                <div
                  key={i}
                  className={`absolute ${b.pos} z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border dark:border-white/15 border-slate-200 shadow-lg ${b.bg} backdrop-blur-md hover:scale-105 transition-transform cursor-default`}
                >
                  <b.icon className={`text-xs ${b.color}`} />
                  <span className="text-[11px] font-mono font-semibold dark:text-white/80 text-slate-700">
                    {b.text}
                  </span>
                </div>
              ))}

              {/* Decorative Glow Frame */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 dark:border-cyan-400/60 border-indigo-500/60 rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 dark:border-cyan-400/60 border-indigo-500/60 rounded-br-lg" />

              {/* Photo Container */}
              <div className="relative w-[68vw] max-w-[240px] aspect-[4/5] sm:w-64 sm:h-72 lg:w-72 lg:h-80 rounded-2xl overflow-hidden
                dark:border border-white/10 border border-slate-200
                shadow-2xl dark:shadow-cyan-900/20 shadow-slate-300/80 mx-auto group">
                <img
                  src={profileImg}
                  alt="Asad Kamal"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-[#050810]/70 dark:via-transparent to-transparent bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>

              {/* Location Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20
                flex items-center gap-1.5 px-4 py-1.5 rounded-full
                dark:bg-[#0b101d] bg-white
                dark:border dark:border-white/15 border border-slate-200
                shadow-xl whitespace-nowrap">
                <FaMapMarkerAlt className="dark:text-cyan-400 text-indigo-600 text-xs" />
                <span className="font-mono text-[11px] font-medium dark:text-white/80 text-slate-700">
                  Islamabad, PK
                </span>
              </div>
            </div>

            {/* Interactive Terminal Snippet Card */}
            <div className="w-full max-w-xs mt-4
              dark:bg-[#080d1a] bg-white
              dark:border dark:border-white/10 border border-slate-200
              rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50 shadow-slate-200/80">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2.5 dark:bg-black/40 bg-slate-50 dark:border-b dark:border-white/5 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[10px] dark:text-white/30 text-slate-400 tracking-wider flex items-center gap-1">
                    <FaTerminal className="text-[9px]" /> developer.config.js
                  </span>
                </div>
                <button
                  onClick={handleCopyConfig}
                  title="Copy Config"
                  className="text-xs dark:text-white/30 text-slate-400 hover:dark:text-cyan-400 hover:text-indigo-600 transition-colors"
                >
                  {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                </button>
              </div>

              {/* Code */}
              <div className="px-4 py-3.5 font-mono text-[11px] leading-[1.85] dark:text-white/70 text-slate-600">
                <span className="dark:text-purple-400 text-violet-600">const</span>{' '}
                <span className="dark:text-cyan-400 text-indigo-600 font-semibold">developer</span>{' '}
                <span className="dark:text-white/40 text-slate-400">=</span>{' '}
                <span className="dark:text-white/40 text-slate-400">&#123;</span>
                <br />
                <span className="pl-3.5 dark:text-white/40 text-slate-400">name:</span>{' '}
                <span className="dark:text-emerald-400 text-emerald-600">"Asad Kamal Shah"</span><span className="dark:text-white/20 text-slate-300">,</span>
                <br />
                <span className="pl-3.5 dark:text-white/40 text-slate-400">stack:</span>{' '}
                <span className="dark:text-amber-400 text-amber-600">"React · Node · MySQL · MongoDB"</span><span className="dark:text-white/20 text-slate-300">,</span>
                <br />
                <span className="pl-3.5 dark:text-white/40 text-slate-400">company:</span>{' '}
                <span className="dark:text-emerald-400 text-emerald-600">"MRA Developers"</span><span className="dark:text-white/20 text-slate-300">,</span>
                <br />
                <span className="pl-3.5 dark:text-white/40 text-slate-400">since:</span>{' '}
                <span className="dark:text-sky-400 text-sky-600">"Feb 2025"</span><span className="dark:text-white/20 text-slate-300">,</span>
                <br />
                <span className="pl-3.5 dark:text-white/40 text-slate-400">projects:</span>{' '}
                <span className="dark:text-orange-400 text-orange-600 font-bold">14</span><span className="dark:text-white/20 text-slate-300">,</span>
                <br />
                <span className="pl-3.5 dark:text-white/40 text-slate-400">freelance:</span>{' '}
                <span className="dark:text-amber-400 text-amber-600">["SCSM", "PhantomProducts"]</span>
                <br />
                <span className="dark:text-white/40 text-slate-400">&#125;;</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Subtle Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px dark:bg-gradient-to-r dark:from-transparent dark:via-cyan-500/25 dark:to-transparent bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
    </section>
  );
};

export default Hero;