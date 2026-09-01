import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFolder, FaGithub, FaExternalLinkAlt, FaSearch,
  FaArrowRight, FaTag, FaCheck, FaCode
} from 'react-icons/fa';

/* Helper to convert hex to rgba safely */
const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== 'string') return `rgba(100,255,218,${alpha})`;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(100,255,218,${alpha})`;
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
};

const categoryMeta = {
  'Full Stack': { dark: '#64ffda', light: '#2563eb', label: 'Full Stack' },
  'Frontend': { dark: '#38bdf8', light: '#1d4ed8', label: 'Frontend' },
  'Backend': { dark: '#34d399', light: '#059669', label: 'Backend' },
  'AI/ML': { dark: '#a78bfa', light: '#7c3aed', label: 'AI / ML' },
  'default': { dark: '#64ffda', light: '#2563eb', label: 'Project' },
};

const filterTabs = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI/ML', 'Featured'];

const Projects = ({ setActiveSection, projects = [] }) => {
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([e]) => { setVisible(e.isIntersecting); if (e.isIntersecting) setActiveSection('projects'); },
        { threshold: 0.08 }
      );
    }
    const el = sectionRef.current;
    if (el) observerRef.current.observe(el);
    return () => { if (el) observerRef.current?.unobserve(el); };
  }, [setActiveSection]);

  const theme = isDark ? 'dark' : 'light';

  const filtered = projects.filter((p) => {
    const matchesCategory =
      filter === 'All' ? true :
        filter === 'Featured' ? p.featured :
          p.category === filter;

    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      (p.description && p.description.toLowerCase().includes(query)) ||
      (p.tech && p.tech.some((t) => t.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  const displayedProjects = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 overflow-hidden transition-colors duration-500"
      style={{
        scrollMarginTop: '4rem',
        borderTop: `1px solid ${isDark ? 'rgba(100,255,218,0.08)' : 'rgba(208,215,222,0.80)'}`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full font-mono text-[11px] tracking-[0.15em] uppercase font-semibold"
            style={{
              border: `1px solid var(--border-accent)`,
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
            }}
          >
            <FaFolder className="text-xs" />
            Portfolio
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Featured{' '}
                <span style={{ color: 'var(--accent)' }}>
                  Work
                </span>
              </h2>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                14 production-ready web applications built with React 19, Node.js, Express, MySQL, MongoDB, and Python FastAPI.
              </p>
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0 w-full sm:w-64">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search stack or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl font-mono text-xs outline-none transition-all duration-200"
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid var(--border)`,
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className={`flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setShowAll(false); }}
                  className="px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all duration-200"
                  style={{
                    background: active ? 'var(--accent-subtle)' : 'transparent',
                    border: `1px solid ${active ? 'var(--border-accent)' : 'transparent'}`,
                    color: active ? 'var(--accent)' : 'var(--text-muted)',
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            Showing <span className="font-bold" style={{ color: 'var(--accent)' }}>{displayedProjects.length}</span> of {filtered.length} matching
          </div>
        </div>

        {/* Projects grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProjects.map((project, idx) => {
              const meta = categoryMeta[project.category] || categoryMeta.default;
              const accent = meta[theme];
              const accentSubtleBg = hexToRgba(accent, 0.12);
              const accentBorder = hexToRgba(accent, 0.40);

              return (
                <div
                  key={project.id}
                  className={`group flex flex-col rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-default shadow-sm ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                    }`}
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                    transitionDelay: `${(idx % 6) * 60}ms`,
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
                  {/* Card top band */}
                  <div
                    className="relative min-h-[130px] flex items-end p-5 overflow-hidden border-b"
                    style={{
                      background: 'var(--bg-surface)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div className="relative z-10 w-full">
                      <div className="flex items-center justify-between mb-2">
                        <FaFolder className="text-xl" style={{ color: accent }} />
                        <div className="flex items-center gap-1.5">
                          {project.featured && (
                            <span
                              className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border"
                              style={{
                                color: accent,
                                borderColor: accentBorder,
                                background: accentSubtleBg,
                              }}
                            >
                              Featured
                            </span>
                          )}
                          {project.ownership && (
                            <span
                              className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border"
                              style={{
                                borderColor: 'var(--border)',
                                background: 'var(--bg-base)',
                                color: 'var(--text-muted)',
                              }}
                            >
                              {project.ownership.includes('Freelance') ? 'Freelance' : 'MRA Devs'}
                            </span>
                          )}
                          <span
                            className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border"
                            style={{
                              color: accent,
                              borderColor: accentBorder,
                              background: accentSubtleBg,
                            }}
                          >
                            {project.category || 'App'}
                          </span>
                        </div>
                      </div>

                      <h3
                        className="text-lg font-bold leading-tight group-hover:opacity-80 transition-opacity"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5">
                    {project.role && (
                      <div className="text-[11px] font-mono font-medium mb-2" style={{ color: 'var(--accent)' }}>
                        Role: {project.role}
                      </div>
                    )}
                    <p className="text-[13px] leading-relaxed mb-5 line-clamp-3 flex-1 font-light" style={{ color: 'var(--text-muted)' }}>
                      {project.description || 'A full-stack application built with modern technologies for real product value.'}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(project.tech || ['React', 'Node.js']).slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-lg"
                          style={{
                            background: 'var(--bg-base)',
                            border: `1px solid var(--border)`,
                            color: 'var(--text-muted)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech && project.tech.length > 4 && (
                        <span className="px-2 py-1 text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer row */}
                    <div
                      className="flex items-center justify-between pt-4 border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <Link
                        to={`/projects/${project.id}`}
                        className="group/link flex items-center gap-1.5 text-[13px] font-semibold font-mono transition-colors duration-200"
                        style={{ color: accent }}
                      >
                        Case Study
                        <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>

                      <div className="flex gap-3 items-center">
                        {project.github !== false && project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="transition-colors duration-200"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                          >
                            <FaGithub className="text-base" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live Demo"
                            className="transition-colors duration-200"
                            style={{ color: 'var(--text-muted)' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                          >
                            <FaExternalLinkAlt className="text-sm" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-2xl border"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
          >
            <p className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              No projects found matching "{search}" in category "{filter}".
            </p>
            <button
              onClick={() => { setFilter('All'); setSearch(''); }}
              className="mt-4 px-4 py-2 rounded-lg font-mono text-xs font-semibold"
              style={{
                border: `1px solid var(--border-accent)`,
                background: 'var(--accent-subtle)',
                color: 'var(--accent)',
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Show More Button */}
        {!showAll && filtered.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 shadow-md active:scale-[0.98]"
              style={{
                border: `1px solid var(--border-accent)`,
                background: 'var(--accent-subtle)',
                color: 'var(--accent)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-glow)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-subtle)'}
            >
              Show All {projects.length} Projects Below <FaArrowRight className="text-xs" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;