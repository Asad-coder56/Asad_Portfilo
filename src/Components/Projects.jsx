import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaCode, FaArrowLeft, FaSearch } from 'react-icons/fa';

/* Category accent colours – consistent with the rest of the portfolio */
const categoryMeta = {
  'Full Stack': { dark: '#67e8f9', light: '#4f46e5', label: 'Full Stack' },
  'Frontend': { dark: '#a78bfa', light: '#7c3aed', label: 'Frontend' },
  'Backend': { dark: '#34d399', light: '#059669', label: 'Backend' },
  'AI/ML': { dark: '#fb923c', light: '#ea580c', label: 'AI / ML' },
  'default': { dark: '#67e8f9', light: '#4f46e5', label: 'Project' },
};

const FILTERS = ['All', 'Full Stack', 'Frontend', 'AI/ML', 'MRA Developers', 'Freelance'];

/* Number badge */
const Index = ({ n, accent }) => (
  <span
    className="text-[11px] font-mono font-bold"
    style={{ color: accent }}
  >
    {String(n).padStart(2, '0')}
  </span>
);

const Projects = ({ projects = [], setActiveSection, isStandalone = false }) => {
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(isStandalone);
  const [visible, setVisible] = useState(isStandalone);
  const [isDark, setIsDark] = useState(false);

  /* Detect dark mode */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  /* Intersection observer when on home page */
  useEffect(() => {
    if (isStandalone) {
      window.scrollTo(0, 0);
      setVisible(true);
      return;
    }
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([e]) => { setVisible(e.isIntersecting); if (e.isIntersecting && setActiveSection) setActiveSection('projects'); },
        { threshold: 0.08 }
      );
    }
    const el = sectionRef.current;
    if (el) observerRef.current.observe(el);
    return () => { if (el) observerRef.current?.unobserve(el); };
  }, [setActiveSection, isStandalone]);

  const filteredByFilter = filter === 'All'
    ? projects
    : projects.filter(p => {
      if (filter === 'MRA Developers') return p.ownership?.includes('MRA Developers');
      if (filter === 'Freelance') return p.ownership?.includes('Freelance');
      return p.category === filter;
    });

  const filtered = filteredByFilter.filter(p => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.subtitle?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.tech?.some(t => t.toLowerCase().includes(query)) ||
      p.role?.toLowerCase().includes(query)
    );
  });

  const displayedProjects = (isStandalone || showAll) ? filtered : filtered.slice(0, 6);
  const theme = isDark ? 'dark' : 'light';

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative ${isStandalone ? 'pt-28 pb-24 min-h-screen' : 'py-14'} overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-500 border-t dark:border-white/[0.06] border-slate-200`}
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
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full dark:bg-cyan-500/6 bg-indigo-200/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full dark:bg-violet-600/6 bg-sky-200/20 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Standalone Breadcrumb Header */}
        {isStandalone && (
          <div className="flex items-center justify-between gap-4 mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-white dark:text-white/80 text-slate-700 hover:dark:bg-white/10 hover:bg-slate-100 transition-all"
            >
              <FaArrowLeft className="text-cyan-400" /> Back to Home
            </Link>
            <div className="text-xs font-mono dark:text-white/40 text-slate-500 uppercase tracking-widest">
              All Projects &bull; {projects.length} Total
            </div>
          </div>
        )}

        {/* ── Header ── */}
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full
            dark:border dark:border-cyan-400/20 border border-indigo-200
            dark:bg-cyan-400/5 bg-indigo-50
            dark:text-cyan-400 text-indigo-600
            text-[11px] font-mono tracking-[0.15em] uppercase font-medium">
            <FaCode className="text-xs" />
            {isStandalone ? 'Complete Portfolio Directory' : 'Featured Work'}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-tight tracking-tight dark:text-white text-slate-900">
                {isStandalone ? 'All Projects' : 'Featured Projects'}{' '}
                <span className="dark:text-transparent text-transparent bg-clip-text
                  dark:[background-image:linear-gradient(135deg,#67e8f9,#818cf8)]
                  [background-image:linear-gradient(135deg,#4f46e5,#7c3aed)]">
                  ({projects.length})
                </span>
              </h2>
              <p className="mt-2 max-w-xl text-[15px] dark:text-white/45 text-slate-500 leading-relaxed font-light">
                Explore enterprise full-stack platforms, AI/ML systems, and client solutions built across MRA Developers & freelance engineering.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs dark:text-white/30 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tech, title, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-mono border dark:border-white/10 border-slate-200 dark:bg-white/[0.03] bg-white dark:text-white text-slate-900 placeholder:dark:text-white/30 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className={`flex flex-wrap items-center justify-between gap-4 mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-xl text-[13px] font-mono font-medium transition-all duration-200 border"
                  style={{
                    background: active
                      ? (isDark ? 'rgba(103,232,249,0.1)' : 'rgba(79,70,229,0.08)')
                      : 'transparent',
                    borderColor: active
                      ? (isDark ? 'rgba(103,232,249,0.3)' : 'rgba(79,70,229,0.25)')
                      : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'),
                    color: active
                      ? (isDark ? '#67e8f9' : '#4f46e5')
                      : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)'),
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono dark:text-white/30 text-slate-400">
            Showing <span className="dark:text-cyan-400 text-indigo-600 font-bold">{displayedProjects.length}</span> of {filtered.length} matching
          </div>
        </div>

        {/* ── Projects grid ── */}
        {displayedProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProjects.map((project, idx) => {
              const meta = categoryMeta[project.category] || categoryMeta.default;
              const accent = meta[theme];
              return (
                <div
                  key={project.id}
                  className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5
                    dark:bg-white/[0.025] bg-white cursor-default
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
                    transitionDelay: `${(idx % 6) * 60}ms`,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}35`;
                    e.currentTarget.style.boxShadow = `0 20px 50px ${accent}12`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                  }}
                >
                  {/* Card header band */}
                  <div
                    className="relative min-h-[140px] flex items-end p-5 overflow-hidden"
                    style={{ background: `${accent}0d` }}
                  >
                    {/* decorative circles */}
                    <div
                      className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
                      style={{ background: `radial-gradient(circle, ${accent}, transparent)` }}
                    />
                    <div
                      className="absolute top-3 right-3 w-16 h-16 rounded-full opacity-10"
                      style={{ background: accent }}
                    />

                    {/* Index & Badges */}
                    <div className="relative z-10 flex flex-col gap-2 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <Index n={idx + 1} accent={accent} />
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.ownership && (
                            <span
                              className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded border dark:border-white/10 border-slate-200 dark:bg-black/40 bg-white/80 dark:text-white/60 text-slate-600"
                            >
                              {project.ownership.includes('Freelance') ? 'Freelance' : 'MRA Devs'}
                            </span>
                          )}
                          <span
                            className="text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border"
                            style={{
                              color: accent,
                              borderColor: `${accent}40`,
                              background: `${accent}12`,
                            }}
                          >
                            {project.category || 'App'}
                          </span>
                        </div>
                      </div>

                      <h3
                        className="text-lg font-bold dark:text-white text-slate-900 leading-tight group-hover:opacity-80 transition-opacity"
                      >
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-5">
                    {project.role && (
                      <div className="text-[11px] font-mono dark:text-cyan-400/80 text-indigo-600 font-medium mb-2">
                        Role: {project.role}
                      </div>
                    )}
                    <p className="text-[13px] dark:text-white/45 text-slate-500 leading-relaxed mb-5 line-clamp-3 flex-1 font-light">
                      {project.description || 'A full-stack application built with modern technologies for real product value.'}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(project.tech || ['React', 'Node.js']).slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[11px] font-mono dark:text-white/40 text-slate-500 rounded-lg"
                          style={{
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech && project.tech.length > 4 && (
                        <span className="px-2 py-1 text-[10px] font-mono dark:text-white/20 text-slate-400">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Footer row */}
                    <div
                      className="flex items-center justify-between pt-5 border-t"
                      style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}
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
                            className="dark:text-white/25 text-slate-400 hover:dark:text-white/70 hover:text-slate-700 transition-colors duration-200"
                          >
                            <FaGithub className="text-base" />
                          </a>
                        )}
                        {project.liveDemo !== false && project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live Demo"
                            className="transition-colors duration-200"
                            style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'; }}
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
          <div className="py-20 text-center">
            <p className="dark:text-white/30 text-slate-400 font-mono text-sm mb-4">No matching projects found.</p>
            <button
              onClick={() => { setFilter('All'); setSearchQuery(''); }}
              className="text-sm font-mono dark:text-cyan-400 text-indigo-600 hover:underline"
            >
              Reset Filters & Search &rarr;
            </button>
          </div>
        )}

        {/* ── View All / Expand Action Button on Homepage ── */}
        {!isStandalone && (
          <div className="mt-14 text-center">
            {showAll ? (
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-100 dark:text-white text-slate-800 hover:dark:bg-white/10 hover:bg-slate-200 transition-all shadow-md"
              >
                Collapse to Top 6 Projects
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider dark:bg-cyan-400 bg-indigo-600 dark:text-slate-950 text-white hover:dark:bg-cyan-300 hover:bg-indigo-700 transition-all shadow-lg dark:shadow-cyan-400/20 shadow-indigo-500/20"
                >
                  Show All {projects.length} Projects Below <FaArrowRight className="text-xs" />
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider border dark:border-cyan-400/30 border-indigo-300 dark:text-cyan-400 text-indigo-600 dark:bg-cyan-400/5 bg-indigo-50 hover:dark:bg-cyan-400/10 hover:bg-indigo-100 transition-all"
                >
                  Open Full Projects Directory Page &rarr;
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── CTA strip ── */}
        <div className={`mt-20 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl border dark:border-white/[0.06] border-slate-200 dark:bg-white/[0.02] bg-white transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <p className="font-semibold dark:text-white text-slate-800 text-sm">Have a project in mind?</p>
            <p className="text-[13px] dark:text-white/35 text-slate-500 font-light mt-0.5">Let's build something great together.</p>
          </div>
          <Link
            to="/#contact"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
              dark:bg-cyan-400 bg-indigo-600
              dark:text-[#050810] text-white
              dark:hover:bg-cyan-300 hover:bg-indigo-700
              transition-all duration-200 shadow-lg dark:shadow-cyan-400/15 shadow-indigo-500/20"
          >
            Get in Touch <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Projects;