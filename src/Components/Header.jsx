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
        setTimeout(() => { scrollToSection(item.id); }, 100);
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
      {/* ════ HEADER ════ */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
            ? 'backdrop-blur-xl py-3 shadow-lg'
            : 'bg-transparent py-5'
          }`}
        style={isScrolled ? {
          backgroundColor: darkMode ? 'rgba(10,25,47,0.95)' : 'rgba(255,255,255,0.95)',
          borderBottom: `1px solid ${darkMode ? 'rgba(100,255,218,0.10)' : 'rgba(208,215,222,0.80)'}`,
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              onClick={() => {
                onSectionChange('home');
                if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3.5 select-none"
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <span
                  className="absolute inset-0 rounded-lg blur-md transition-all duration-500"
                  style={{ background: darkMode ? 'rgba(100,255,218,0.15)' : 'rgba(37,99,235,0.12)' }}
                />
                <span
                  className="relative flex items-center justify-center w-10 h-10 rounded-lg shadow-sm transition-all duration-300"
                  style={{
                    border: `1px solid ${darkMode ? 'rgba(100,255,218,0.25)' : 'rgba(37,99,235,0.20)'}`,
                    background: darkMode ? '#112240' : '#ffffff',
                  }}
                >
                  <span className="font-mono font-black text-[15px] tracking-tighter leading-none">
                    <span style={{ color: 'var(--accent)' }}>A</span>
                    <span style={{ color: darkMode ? '#ccd6f6' : '#0d1117' }}>K</span>
                  </span>
                </span>
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span
                  className="text-sm font-bold tracking-[0.06em] uppercase transition-colors duration-200"
                  style={{ color: darkMode ? '#ccd6f6' : '#0d1117' }}
                >
                  Asad Kamal
                </span>
                <span className="text-[10px] font-mono tracking-[0.16em] uppercase" style={{ color: 'var(--accent)' }}>
                  Full‑Stack Dev
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
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
                    <span
                      className="relative z-10 font-mono text-[13px] font-medium tracking-wide transition-colors duration-200"
                      style={{
                        color: active
                          ? 'var(--accent)'
                          : darkMode ? 'rgba(204,214,246,0.50)' : '#57606a',
                      }}
                    >
                      {active && (
                        <span style={{ color: 'var(--accent)', opacity: 0.7 }} className="mr-1 text-[11px]">▸</span>
                      )}
                      {item.label}
                    </span>
                    <span
                      className={`absolute bottom-0.5 left-4 right-4 h-px transition-all duration-300 ease-out ${active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-40 group-hover:scale-x-100'
                        }`}
                      style={{ background: 'var(--accent)', transformOrigin: 'left' }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              {/* Available badge */}
              <span className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase font-medium"
                style={{
                  border: '1px solid rgba(52,211,153,0.35)',
                  background: 'rgba(52,211,153,0.08)',
                  color: '#34d399',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>

              {/* Resume */}
              <a
                href={cvFile}
                download="Muhammad_Asad_Kamal_Shah_CV.pdf"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs tracking-wide transition-all duration-200 shadow-sm"
                style={{
                  border: `1px solid var(--border-accent)`,
                  background: 'var(--accent-subtle)',
                  color: 'var(--accent)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-glow)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-subtle)'; }}
              >
                <FaDownload className="text-[10px]" />
                Resume
              </a>

              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 shadow-sm"
                style={{
                  border: `1px solid ${darkMode ? 'rgba(204,214,246,0.12)' : '#d0d7de'}`,
                  background: darkMode ? 'rgba(204,214,246,0.05)' : '#ffffff',
                  color: darkMode ? 'rgba(204,214,246,0.60)' : '#57606a',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--border-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = darkMode ? 'rgba(204,214,246,0.60)' : '#57606a'; e.currentTarget.style.borderColor = darkMode ? 'rgba(204,214,246,0.12)' : '#d0d7de'; }}
                aria-label="Toggle theme"
              >
                {darkMode ? <FaSun className="text-xs" /> : <FaMoon className="text-xs" />}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200 shadow-sm"
                style={{
                  border: `1px solid ${darkMode ? 'rgba(204,214,246,0.12)' : '#d0d7de'}`,
                  background: darkMode ? 'rgba(204,214,246,0.05)' : '#ffffff',
                  color: darkMode ? 'rgba(204,214,246,0.60)' : '#57606a',
                }}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ════ MOBILE DRAWER ════ */}
      <div
        ref={menuRef}
        className={`fixed inset-y-0 right-0 z-50 w-[80vw] max-w-[288px] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          background: darkMode ? '#0a192f' : '#ffffff',
          borderLeft: `1px solid ${darkMode ? 'rgba(100,255,218,0.10)' : '#d0d7de'}`,
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: `1px solid ${darkMode ? 'rgba(204,214,246,0.07)' : '#e8ecf0'}` }}>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: darkMode ? 'rgba(204,214,246,0.35)' : '#8c959f' }}>Navigation</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200"
            style={{
              border: `1px solid ${darkMode ? 'rgba(204,214,246,0.12)' : '#d0d7de'}`,
              color: darkMode ? 'rgba(204,214,246,0.50)' : '#57606a',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--border-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = darkMode ? 'rgba(204,214,246,0.50)' : '#57606a'; e.currentTarget.style.borderColor = darkMode ? 'rgba(204,214,246,0.12)' : '#d0d7de'; }}
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
                className="group flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-sm transition-all duration-200"
                style={{
                  background: active ? 'var(--accent-subtle)' : 'transparent',
                  color: active ? 'var(--accent)' : darkMode ? 'rgba(204,214,246,0.45)' : '#57606a',
                  border: active ? `1px solid var(--border-accent)` : '1px solid transparent',
                }}
              >
                <span className="text-xs font-mono opacity-40">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-6 space-y-3"
          style={{ borderTop: `1px solid ${darkMode ? 'rgba(204,214,246,0.07)' : '#e8ecf0'}` }}>
          <span className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase" style={{ color: '#34d399' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to opportunities
          </span>
          <a
            href={cvFile}
            download="Muhammad_Asad_Kamal_Shah_CV.pdf"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm transition-all duration-200"
            style={{
              border: `1px solid var(--border-accent)`,
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
            }}
          >
            <FaDownload className="text-xs" />
            Download Resume
          </a>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          style={{ background: 'rgba(10,25,47,0.65)' }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;