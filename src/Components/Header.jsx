import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaDownload, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import cvFile from '../assets/Muhammad_Asad_Kamal_Shah_CV.docx.pdf';

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
    e.preventDefault();
    setIsMenuOpen(false);

    if (item.path.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for homepage components to mount before scrolling
        setTimeout(() => {
          scrollToSection(item.id);
        }, 100);
      } else {
        scrollToSection(item.id);
      }
    } else {
      navigate(item.path);
      onSectionChange(item.id);
    }
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
          ? 'dark:bg-[#1E2D4C]/96 bg-[#faf8f5]/96 backdrop-blur-xl dark:border-b dark:border-white/[0.06] border-b border-[#CEC0BB]/60 dark:shadow-2xl dark:shadow-black/50 shadow-sm py-3'
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
                <span className="absolute inset-0 rounded-lg dark:bg-[#ACBDAA]/15 bg-[#ACBDAA]/15 blur-md group-hover:dark:bg-[#ACBDAA]/25 group-hover:bg-[#ACBDAA]/25 transition-all duration-500" />
                <span className="relative flex items-center justify-center w-10 h-10 rounded-lg dark:border dark:border-[#ACBDAA]/30 border border-[#ACBDAA]/40 dark:bg-[#1E2D4C] bg-white group-hover:dark:border-[#ACBDAA]/60 group-hover:border-[#ACBDAA]/70 shadow-sm transition-all duration-300">
                  <span className="font-mono font-black text-[15px] tracking-tighter leading-none">
                    <span className="text-[#ACBDAA]">A</span>
                    <span className="dark:text-white text-[#1E2D4C]">K</span>
                  </span>
                </span>
              </div>

              {/* Name + tagline */}
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-sm font-bold tracking-[0.06em] uppercase dark:text-white/90 text-[#1E2D4C] group-hover:dark:text-white group-hover:text-[#1E2D4C] transition-colors duration-200">
                  Asad Kamal
                </span>
                <span className="text-[10px] font-mono text-[#ACBDAA] tracking-[0.16em] uppercase">
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
                        ? 'text-[#ACBDAA]'
                        : 'dark:text-white/45 text-[#858585] group-hover:dark:text-white/85 group-hover:text-[#1E2D4C]'
                        }`}
                    >
                      {active && (
                        <span className="text-[#ACBDAA]/70 mr-1 text-[11px]">▸</span>
                      )}
                      {item.label}
                    </span>

                    {/* Underline */}
                    <span
                      className={`absolute bottom-0.5 left-4 right-4 h-px bg-[#ACBDAA] transition-all duration-300 ease-out ${active
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
              <a
                href={cvFile}
                download="Muhammad_Asad_Kamal_Shah_CV.pdf"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg dark:border dark:border-[#ACBDAA]/25 border border-[#ACBDAA]/40 dark:bg-[#ACBDAA]/8 bg-[#ACBDAA]/10 dark:hover:bg-[#ACBDAA]/15 hover:bg-[#ACBDAA]/20 dark:text-[#ACBDAA] text-[#1E2D4C] text-xs font-mono tracking-wide transition-all duration-200 shadow-sm"
              >
                <FaDownload className="text-[10px]" />
                Resume
              </a>

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
        className={`fixed inset-y-0 right-0 z-50 w-[80vw] max-w-[288px] dark:bg-[#1E2D4C] bg-[#faf8f5] dark:border-l dark:border-white/[0.07] border-l border-[#CEC0BB]/60 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
                  ? 'bg-[#ACBDAA]/15 text-[#ACBDAA] border border-[#ACBDAA]/30'
                  : 'dark:text-white/40 text-[#858585] dark:hover:text-white hover:text-[#1E2D4C] dark:hover:bg-white/5 hover:bg-[#ACBDAA]/8 border border-transparent'
                  }`}
              >
                <span className={`text-xs font-mono ${active ? 'text-[#ACBDAA]/70' : 'dark:text-white/20 text-[#858585]/50 group-hover:dark:text-white/40 group-hover:text-[#858585]/80'}`}>
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
          <a
            href={cvFile}
            download="Muhammad_Asad_Kamal_Shah_CV.pdf"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#ACBDAA]/40 bg-[#ACBDAA]/10 hover:bg-[#ACBDAA]/20 dark:border-[#ACBDAA]/25 dark:bg-[#ACBDAA]/8 dark:hover:bg-[#ACBDAA]/15 text-[#ACBDAA] text-sm font-mono transition-all duration-200"
          >
            <FaDownload className="text-xs" />
            Download Resume
          </a>
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