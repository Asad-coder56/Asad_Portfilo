import React from 'react';
import {
  FaGithub, FaLinkedin, FaEnvelope,
  FaArrowUp, FaMapMarkerAlt, FaPhone
} from 'react-icons/fa';

const Footer = () => {
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
    <footer
      className="relative transition-colors duration-500 overflow-hidden"
      style={{
        borderTop: `1px solid var(--border)`,
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-8">

        {/* ── Main 3-column grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-12" style={{ borderBottom: `1px solid var(--border)` }}>

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <span className="absolute inset-0 rounded-lg blur-md" style={{ background: 'var(--accent-glow)' }} />
                <span className="relative flex items-center justify-center w-10 h-10 rounded-lg shadow-sm" style={{ border: `1px solid var(--border-accent)`, background: 'var(--bg-card)' }}>
                  <span className="font-mono font-black text-[15px] tracking-tighter leading-none">
                    <span style={{ color: 'var(--accent)' }}>A</span>
                    <span style={{ color: 'var(--text-primary)' }}>K</span>
                  </span>
                </span>
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="text-sm font-bold tracking-[0.06em] uppercase" style={{ color: 'var(--text-primary)' }}>
                  Asad Kamal
                </span>
                <span className="text-[10px] font-mono tracking-[0.16em] uppercase" style={{ color: 'var(--accent)' }}>
                  Full‑Stack Dev
                </span>
              </div>
            </div>

            <p className="text-[13px] leading-relaxed max-w-xs font-light" style={{ color: 'var(--text-muted)' }}>
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
                  className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'var(--bg-card)',
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
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }}
                >
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick nav */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase font-semibold" style={{ color: 'var(--text-primary)' }}>
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="text-[13px] font-mono transition-colors duration-200 hover:translate-x-1 inline-block"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <span style={{ color: 'var(--accent)', opacity: 0.7 }} className="mr-1.5 text-[11px]">▸</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact summary */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase font-semibold" style={{ color: 'var(--text-primary)' }}>
              Direct Contact
            </h4>
            <div className="flex flex-col gap-3 text-[13px]" style={{ color: 'var(--text-muted)' }}>
              <a
                href="mailto:kamalasad57@gmail.com"
                className="flex items-center gap-2.5 transition-colors font-medium"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <FaEnvelope style={{ color: 'var(--accent)' }} className="text-xs flex-shrink-0" />
                kamalasad57@gmail.com
              </a>
              <a
                href="tel:+923051958933"
                className="flex items-center gap-2.5 transition-colors font-medium"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <FaPhone style={{ color: 'var(--accent)' }} className="text-xs flex-shrink-0" />
                +92 305 1958933
              </a>
              <span className="flex items-center gap-2.5">
                <FaMapMarkerAlt style={{ color: 'var(--accent)' }} className="text-xs flex-shrink-0" />
                Islamabad, Pakistan
              </span>
            </div>

            {/* Micro badge */}
            <div
              className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[11px] font-mono"
              style={{
                borderColor: 'rgba(52,211,153,0.30)',
                background: 'rgba(52,211,153,0.06)',
                color: '#34d399',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to Opportunities
            </div>
          </div>

        </div>

        {/* ── Bottom row ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[12px] font-mono" style={{ color: 'var(--text-muted)' }}>
          <p>© {year} Asad Kamal Shah. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              Built with <span style={{ color: 'var(--accent)' }}>React 19</span> & <span style={{ color: 'var(--accent)' }}>Tailwind</span>
            </span>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--bg-card)',
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
                e.currentTarget.style.background = 'var(--bg-card)';
              }}
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-xs" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;