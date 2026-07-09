import React from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope,
  FaArrowUp, FaMapMarkerAlt, FaPhone, FaCode
} from 'react-icons/fa';

const Footer = ({ scrollToSection }) => {
  const year = new Date().getFullYear();

  const socials = [
    { icon: FaGithub, url: 'https://github.com/Asad-coder56', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/muhammad-asad-kamal-shah-076053318', label: 'LinkedIn' },
    { icon: FaEnvelope, url: 'mailto:kamalasad57@gmail.com', label: 'Email' },
  ];

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Resume', id: 'education' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-transparent dark:bg-transparent border-t dark:border-white/[0.06] border-slate-200 transition-colors duration-500 overflow-hidden">

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px dark:bg-gradient-to-r dark:from-transparent dark:via-cyan-500/30 dark:to-transparent bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent" />

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 dark:opacity-[0.025] opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,179,237,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,179,237,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8">

        {/* ── Main 3-column grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-12 border-b dark:border-white/[0.06] border-slate-200">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            {/* Monogram */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <span className="absolute inset-0 rounded-lg dark:bg-cyan-400/15 bg-indigo-500/10 blur-md" />
                <span className="relative flex items-center justify-center w-10 h-10 rounded-lg dark:border dark:border-cyan-400/25 border border-indigo-200 dark:bg-[#0d1117] bg-white">
                  <span className="font-mono font-black text-[15px] tracking-tighter leading-none">
                    <span className="dark:text-cyan-400 text-indigo-600">A</span>
                    <span className="dark:text-white text-slate-800">K</span>
                  </span>
                </span>
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-sm font-bold tracking-[0.06em] uppercase dark:text-white text-slate-800">
                  Asad Kamal
                </span>
                <span className="text-[10px] font-mono dark:text-cyan-400/70 text-indigo-500 tracking-[0.16em] uppercase">
                  Full‑Stack Dev
                </span>
              </div>
            </div>

            <p className="text-[13px] dark:text-white/40 text-slate-500 leading-relaxed max-w-xs font-light">
              Building scalable, secure, and high-performance web applications with clean and maintainable code.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl
                    dark:border dark:border-white/10 border border-slate-200
                    dark:bg-white/5 bg-white
                    dark:text-white/35 text-slate-400
                    dark:hover:text-cyan-400 hover:text-indigo-600
                    dark:hover:border-cyan-400/35 hover:border-indigo-300
                    transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick nav */}
          <div>
            <p className="text-[10px] font-mono dark:text-white/25 text-slate-400 tracking-[0.2em] uppercase mb-5">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="group flex items-center gap-2 text-[13px] dark:text-white/45 text-slate-500 dark:hover:text-white hover:text-slate-900 transition-colors duration-200 text-left font-medium"
                >
                  <span className="w-4 h-px dark:bg-white/10 bg-slate-300 group-hover:dark:bg-cyan-400/60 group-hover:bg-indigo-400 transition-colors duration-200" />
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contact info */}
          <div>
            <p className="text-[10px] font-mono dark:text-white/25 text-slate-400 tracking-[0.2em] uppercase mb-5">
              Get In Touch
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: FaEnvelope, value: 'kamalasad57@gmail.com', href: 'mailto:kamalasad57@gmail.com' },
                { icon: FaPhone, value: '+92 305 1958933', href: 'tel:+923051958933' },
                { icon: FaMapMarkerAlt, value: 'Islamabad, Pakistan', href: null },
              ].map(({ icon: Icon, value, href }) => (
                <div key={value} className="flex items-center gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg
                    dark:border dark:border-white/8 border border-slate-200
                    dark:bg-white/3 bg-white
                    dark:text-white/20 text-slate-400">
                    <Icon className="text-xs" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-[13px] dark:text-white/45 text-slate-500 dark:hover:text-cyan-400 hover:text-indigo-600 transition-colors duration-200 font-light"
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-[13px] dark:text-white/45 text-slate-500 font-light">{value}</span>
                  )}
                </div>
              ))}

              {/* Available badge */}
              <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
                dark:border dark:border-emerald-500/20 border border-emerald-400/30
                dark:bg-emerald-500/6 bg-emerald-50 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono dark:text-emerald-400 text-emerald-600 tracking-widest uppercase">
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">

          {/* Terminal signature */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 font-mono text-[11px] sm:text-[12px] text-center sm:text-left leading-relaxed">
            <FaCode className="dark:text-cyan-400/50 text-indigo-400/60 text-xs hidden sm:block" />
            <span className="dark:text-white/20 text-slate-400">
              © {year}{' '}
              <span className="dark:text-white/40 text-slate-600 font-medium">Asad Kamal</span>
              <span className="hidden sm:inline">{' '}— Built with{' '}</span>
              <span className="sm:hidden"><br />Built with </span>
              <span className="dark:text-cyan-400/70 text-indigo-500">React</span>
              {' '}&amp;{' '}
              <span className="dark:text-cyan-400/70 text-indigo-500">Tailwind</span>
            </span>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-[12px] font-mono
              dark:text-white/25 text-slate-400
              dark:hover:text-white hover:text-slate-800
              transition-colors duration-200"
          >
            <span>back to top</span>
            <span className="w-7 h-7 flex items-center justify-center rounded-lg
              dark:border dark:border-white/10 border border-slate-200
              dark:bg-white/5 bg-white
              group-hover:dark:border-cyan-400/30 group-hover:border-indigo-300
              group-hover:dark:text-cyan-400 group-hover:text-indigo-600
              transition-all duration-200 shadow-sm">
              <FaArrowUp className="text-xs transition-transform duration-200 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;