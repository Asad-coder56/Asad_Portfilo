import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaDownload, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode, activeSection, onSectionChange, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'skills', label: 'Skills', path: '#skills' },
    { id: 'projects', label: 'Projects', path: '#projects' },
    { id: 'education', label: 'Resume', path: '#education' },
    { id: 'contact', label: 'Contact', path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (item, e) => {
    if (item.path.startsWith('#')) {
      e.preventDefault();
      setIsMenuOpen(false);
      scrollToSection(item.id);
    } else {
      navigate(item.path);
      onSectionChange(item.id);
      setIsMenuOpen(false);
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Asad_Kamal_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('#')) return activeSection === path.substring(1);
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? 'dark:bg-[#050810]/96 bg-white/96 backdrop-blur-xl dark:border-b dark:border-white/[0.06] border-b border-slate-200/80 dark:shadow-2xl dark:shadow-black/50 shadow-sm shadow-slate-200/80 py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">

            {/* ── Logo / Monogram ── */}
            <Link
              to="/"
              onClick={() => {
                onSectionChange('home');
                if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3.5 select-none"
            >
              {/* Monogram */}
              <div className="relative w-10 h-10 flex-shrink-0">
                {/* Dark mode glow */}
                <span className="absolute inset-0 rounded-lg dark:bg-cyan-400/15 bg-indigo-500/10 blur-md group-hover:dark:bg-cyan-400/30 group-hover:bg-indigo-500/20 transition-all duration-500" />
                <span className="relative flex items-center justify-center w-10 h-10 rounded-lg dark:border dark:border-cyan-400/25 border border-indigo-200 dark:bg-[#0d1117] bg-white group-hover:dark:border-cyan-400/50 group-hover:border-indigo-400/60 shadow-sm transition-all duration-300">
                  <span className="font-mono font-black text-[15px] tracking-tighter leading-none">
                    <span className="dark:text-cyan-400 text-indigo-600">A</span>
                    <span className="dark:text-white text-slate-800">K</span>
                  </span>
                </span>
              </div>

              {/* Name + tagline */}
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-sm font-bold tracking-[0.06em] uppercase dark:text-white/90 text-slate-800 group-hover:dark:text-white group-hover:text-slate-900 transition-colors duration-200">
                  Asad Kamal
                </span>
                <span className="text-[10px] font-mono dark:text-cyan-400/70 text-indigo-500/80 tracking-[0.16em] uppercase">
                  Full‑Stack Dev
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => handleNavClick(item, e)}
                    className="relative group px-4 py-2"
                  >
                    {/* label */}
                    <span
                      className={`relative z-10 font-mono text-[13px] font-medium tracking-wide transition-colors duration-200 ${active
                        ? 'dark:text-cyan-400 text-indigo-600'
                        : 'dark:text-white/45 text-slate-400 group-hover:dark:text-white/85 group-hover:text-slate-700'
                        }`}
                    >
                      {active && (
                        <span className="dark:text-cyan-400/70 text-indigo-400/80 mr-1 text-[11px]">▸</span>
                      )}
                      {item.label}
                    </span>

                    {/* Underline */}
                    <span
                      className={`absolute bottom-0.5 left-4 right-4 h-px dark:bg-cyan-400 bg-indigo-500 transition-all duration-300 ease-out ${active
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0 group-hover:opacity-30 group-hover:scale-x-100'
                        }`}
                      style={{ transformOrigin: 'left' }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2.5">

              {/* Available badge — desktop */}
              <span className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full dark:border dark:border-emerald-500/30 border border-emerald-400 dark:bg-emerald-500/10 bg-emerald-50 dark:text-emerald-400 text-emerald-600 text-[10px] font-mono tracking-wider uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full dark:bg-emerald-400 bg-emerald-500 animate-pulse" />
                Available
              </span>

              {/* Resume button */}
              <button
                onClick={handleDownloadCV}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg dark:border dark:border-white/10 border border-slate-200 dark:bg-white/5 bg-white dark:hover:bg-white/10 hover:bg-slate-50 dark:hover:border-white/20 hover:border-slate-300 dark:text-white/60 text-slate-600 dark:hover:text-white hover:text-slate-900 text-xs font-mono tracking-wide transition-all duration-200 shadow-sm"
              >
                <FaDownload className="text-[10px]" />
                Resume
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 flex items-center justify-center rounded-lg dark:border dark:border-white/10 border border-slate-200 dark:bg-white/5 bg-white dark:hover:bg-white/10 hover:bg-slate-50 dark:text-white/60 text-slate-500 dark:hover:text-white hover:text-slate-900 transition-all duration-200 shadow-sm"
                aria-label="Toggle theme"
              >
                {darkMode ? <FaSun className="text-xs" /> : <FaMoon className="text-xs" />}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg dark:border dark:border-white/10 border border-slate-200 dark:bg-white/5 bg-white dark:hover:bg-white/10 hover:bg-slate-50 dark:text-white/60 text-slate-500 dark:hover:text-white hover:text-slate-800 transition-all duration-200 shadow-sm"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        ref={menuRef}
        className={`fixed inset-y-0 right-0 z-50 w-[80vw] max-w-[288px] dark:bg-[#080c14] bg-white dark:border-l dark:border-white/[0.07] border-l border-slate-100 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 dark:border-b dark:border-white/[0.06] border-b border-slate-100">
          <span className="font-mono text-xs dark:text-white/40 text-slate-400 tracking-widest uppercase">Navigation</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg dark:border dark:border-white/10 border border-slate-200 dark:text-white/50 text-slate-500 dark:hover:text-white hover:text-slate-800 dark:hover:border-white/20 hover:border-slate-300 transition-all duration-200"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex flex-col flex-1 px-4 py-6 gap-1">
          {navItems.map((item, i) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleNavClick(item, e)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-sm transition-all duration-200 ${active
                  ? 'dark:bg-cyan-400/10 bg-indigo-50 dark:text-cyan-400 text-indigo-600 dark:border dark:border-cyan-400/20 border border-indigo-200'
                  : 'dark:text-white/40 text-slate-400 dark:hover:text-white hover:text-slate-800 dark:hover:bg-white/5 hover:bg-slate-50 border border-transparent'
                  }`}
              >
                <span className={`text-xs font-mono ${active ? 'dark:text-cyan-400/70 text-indigo-400' : 'dark:text-white/20 text-slate-300 group-hover:dark:text-white/40 group-hover:text-slate-400'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-6 dark:border-t dark:border-white/[0.06] border-t border-slate-100 space-y-3">
          <span className="flex items-center gap-2 dark:text-emerald-400 text-emerald-600 font-mono text-xs tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full dark:bg-emerald-400 bg-emerald-500 animate-pulse" />
            Open to opportunities
          </span>
          <button
            onClick={handleDownloadCV}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl dark:border dark:border-white/10 border border-slate-200 dark:bg-white/5 bg-slate-50 dark:hover:bg-white/10 hover:bg-slate-100 dark:text-white/60 text-slate-600 dark:hover:text-white hover:text-slate-900 text-sm font-mono transition-all duration-200"
          >
            <FaDownload className="text-xs" />
            Download Resume
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 dark:bg-black/60 bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;