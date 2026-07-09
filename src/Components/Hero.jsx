import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import profileImg from '../assets/WhatsApp Image 2026-02-23 at 9.08.38 PM.jpeg';

const Hero = ({ setActiveSection, scrollToSection }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  const roles = [
    'Full-Stack Developer',
    'React.js Engineer',
    'Node.js Developer',
    'REST API Architect',
  ];

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex, roles]);

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

  const socials = [
    { icon: FaGithub, url: 'https://github.com/Asad-coder56', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/muhammad-asad-kamal-shah-076053318', label: 'LinkedIn' },
    { icon: FaEnvelope, url: 'mailto:kamalasad57@gmail.com', label: 'Email' },
  ];

  const stats = [
    { value: '1.5+', label: 'Years Exp.' },
    { value: '5+', label: 'Projects' },
    { value: '10+', label: 'Technologies' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-500"
      style={{ scrollMarginTop: 0 }}
    >
      {/* ── Background Elements ── */}
      {/* Dark mode: subtle grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid overlay — dark */}
        <div
          className="absolute inset-0 dark:opacity-[0.04] opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,179,237,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,179,237,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full dark:bg-cyan-500/8 bg-indigo-400/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full dark:bg-indigo-600/8 bg-violet-300/10 blur-[100px]" />
      </div>

      {/* ── Main Layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ═══════════════ LEFT COLUMN ═══════════════ */}
          <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">

            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full
              dark:border dark:border-emerald-500/25 border border-emerald-400/40
              dark:bg-emerald-500/8 bg-emerald-50
              dark:text-emerald-400 text-emerald-600
              text-[11px] font-mono tracking-[0.15em] uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for work
            </div>

            {/* Name — large editorial */}
            <h1 className="font-black leading-[1.1] tracking-tighter mb-5">
              <span className="block text-[clamp(2rem,8vw,4.5rem)] dark:text-white text-slate-900">
                Hi, I'm Asad.
              </span>
              <span className="block text-[clamp(2rem,8vw,4.5rem)] dark:text-transparent dark:bg-clip-text
                dark:bg-gradient-to-r dark:from-cyan-400 dark:to-indigo-500
                text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                <span className="dark:text-transparent text-transparent
                    bg-clip-text
                    dark:[background-image:linear-gradient(135deg,#67e8f9,#818cf8)]
                    [background-image:linear-gradient(135deg,#4f46e5,#7c3aed)]">
                  Kamal
                </span>
              </span>
            </h1>

            {/* Typewriter role */}
            <div className="flex items-center gap-2 h-8 mb-6">
              <span className="dark:text-white/40 text-slate-400 font-mono text-sm">&gt;</span>
              <span className="font-mono text-base dark:text-cyan-400 text-indigo-600 font-medium">
                {displayed}
                <span className="inline-block w-0.5 h-4 dark:bg-cyan-400 bg-indigo-500 ml-0.5 align-middle animate-pulse" />
              </span>
            </div>

            {/* Description */}
            <p className="max-w-md mb-8 text-[15px] leading-[1.8] dark:text-white/50 text-slate-500 font-light">
              Full-Stack Developer with <span className="dark:text-white/80 text-slate-700 font-medium">1.5+ years</span> of professional
              experience building scalable web apps with React, Node.js, and MongoDB.
              Based in <span className="inline-flex items-center gap-1 dark:text-white/80 text-slate-700 font-medium">
                <FaMapMarkerAlt className="text-xs" /> Islamabad, Pakistan.
              </span>
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-10 w-full justify-center lg:justify-start">
              {stats.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center lg:items-start">
                    <span className="text-2xl font-black dark:text-white text-slate-900 leading-none">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-mono dark:text-white/35 text-slate-400 tracking-widest uppercase mt-0.5">
                      {s.label}
                    </span>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px h-8 dark:bg-white/10 bg-slate-200" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('projects')}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold
                  dark:bg-cyan-400 bg-indigo-600
                  dark:text-[#050810] text-white
                  dark:hover:bg-cyan-300 hover:bg-indigo-700
                  transition-all duration-200 shadow-lg dark:shadow-cyan-400/20 shadow-indigo-500/25 active:scale-[0.98]"
              >
                View My Work
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleDownloadCV}
                className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold
                  dark:border dark:border-white/12 border border-slate-200
                  dark:bg-white/5 bg-white
                  dark:text-white/70 text-slate-600
                  dark:hover:bg-white/10 hover:bg-slate-50
                  dark:hover:text-white hover:text-slate-900
                  transition-all duration-200 shadow-sm active:scale-[0.98]"
              >
                <FaDownload className="text-xs opacity-70 group-hover:opacity-100" />
                Download CV
              </button>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5">
              <span className="text-[10px] font-mono dark:text-white/25 text-slate-300 tracking-[0.2em] uppercase hidden sm:block">
                Find me
              </span>
              <div className="hidden sm:block w-8 h-px dark:bg-white/15 bg-slate-200" />
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex items-center justify-center w-9 h-9 rounded-xl
                    dark:border dark:border-white/10 border border-slate-200
                    dark:bg-white/5 bg-white
                    dark:text-white/40 text-slate-400
                    dark:hover:text-cyan-400 hover:text-indigo-600
                    dark:hover:border-cyan-400/40 hover:border-indigo-300
                    dark:hover:bg-cyan-400/5 hover:bg-indigo-50
                    transition-all duration-200 shadow-sm hover:-translate-y-0.5"
                >
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* ═══════════════ RIGHT COLUMN ═══════════════ */}
          <div className="flex-shrink-0 flex flex-col items-center gap-5 order-1 lg:order-2 w-full lg:w-auto">

            {/* Profile photo — editorial frame */}
            <div className="relative">
              {/* Decorative corner frame */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 dark:border-cyan-400/50 border-indigo-400/60 rounded-tl-sm" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 dark:border-cyan-400/50 border-indigo-400/60 rounded-br-sm" />

              {/* Photo */}
              <div className="relative w-[65vw] max-w-[240px] aspect-[4/5] sm:w-64 sm:h-72 lg:w-72 lg:h-80 rounded-2xl overflow-hidden
                dark:border border-white/8 border border-slate-200
                shadow-2xl dark:shadow-black/60 shadow-slate-300/60 mx-auto">
                <img
                  src={profileImg}
                  alt="Asad Kamal"
                  className="w-full h-full object-cover object-top dark:grayscale-0 grayscale-[10%] hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gradient overlay — light at bottom */}
                <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-[#050810]/50 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Location chip — overlapping photo */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2
                flex items-center gap-1.5 px-4 py-2 rounded-full
                dark:bg-[#0d1117] bg-white
                dark:border dark:border-white/10 border border-slate-200
                shadow-lg dark:shadow-black/50 shadow-slate-200/80
                whitespace-nowrap">
                <FaMapMarkerAlt className="dark:text-cyan-400 text-indigo-500 text-xs" />
                <span className="font-mono text-[11px] dark:text-white/70 text-slate-600 tracking-wide">
                  Islamabad, PK
                </span>
              </div>
            </div>

            {/* Terminal card */}
            <div className="w-full max-w-xs mt-6
              dark:bg-[#0d1117] bg-white
              dark:border dark:border-white/8 border border-slate-200
              rounded-2xl overflow-hidden shadow-xl dark:shadow-black/40 shadow-slate-200/60">
              {/* Terminal title bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 dark:bg-black/30 bg-slate-50 dark:border-b dark:border-white/5 border-b border-slate-100">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 font-mono text-[11px] dark:text-white/25 text-slate-400 tracking-wider">
                  asad.config.js
                </span>
              </div>
              {/* Code content */}
              <div className="px-4 py-4 font-mono text-[12px] leading-[1.9] dark:text-white/60 text-slate-500">
                <span className="dark:text-purple-400 text-violet-500">const</span>{' '}
                <span className="dark:text-cyan-400 text-indigo-600">dev</span>{' '}
                <span className="dark:text-white/50 text-slate-400">=</span>{' '}
                <span className="dark:text-white/50 text-slate-400">&#123;</span>
                <br />
                <span className="pl-4 dark:text-white/50 text-slate-400">name:</span>{' '}
                <span className="dark:text-emerald-400 text-emerald-600">"Asad Kamal"</span><span className="dark:text-white/30 text-slate-300">,</span>
                <br />
                <span className="pl-4 dark:text-white/50 text-slate-400">role:</span>{' '}
                <span className="dark:text-emerald-400 text-emerald-600">"Full-Stack Dev"</span><span className="dark:text-white/30 text-slate-300">,</span>
                <br />
                <span className="pl-4 dark:text-white/50 text-slate-400">exp:</span>{' '}
                <span className="dark:text-orange-400 text-orange-500">"1.5 years"</span><span className="dark:text-white/30 text-slate-300">,</span>
                <br />
                <span className="pl-4 dark:text-white/50 text-slate-400">stack:</span>{' '}
                <span className="dark:text-white/50 text-slate-400">[</span>
                <span className="dark:text-sky-400 text-sky-600">"React"</span>
                <span className="dark:text-white/30 text-slate-300">, </span>
                <span className="dark:text-sky-400 text-sky-600">"Node"</span>
                <span className="dark:text-white/30 text-slate-300">, </span>
                <span className="dark:text-sky-400 text-sky-600">"SQL"</span>
                <span className="dark:text-white/50 text-slate-400">]</span>
                <br />
                <span className="dark:text-white/50 text-slate-400">&#125;</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px dark:bg-gradient-to-r dark:from-transparent dark:via-cyan-500/20 dark:to-transparent bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
    </section>
  );
};

export default Hero;