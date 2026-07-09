import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaCode } from 'react-icons/fa';

/* Category accent colours – consistent with the rest of the portfolio */
const categoryMeta = {
  'Full Stack': { dark: '#67e8f9', light: '#4f46e5', label: 'Full Stack' },
  'Frontend': { dark: '#a78bfa', light: '#7c3aed', label: 'Frontend' },
  'Backend': { dark: '#34d399', light: '#059669', label: 'Backend' },
  'AI/ML': { dark: '#fb923c', light: '#ea580c', label: 'AI / ML' },
  'default': { dark: '#67e8f9', light: '#4f46e5', label: 'Project' },
};

const FILTERS = ['All', 'Full Stack', 'Frontend', 'Backend'];

/* Number badge */
const Index = ({ n, accent }) => (
  <span
    className="text-[11px] font-mono font-bold"
    style={{ color: accent }}
  >
    {String(n).padStart(2, '0')}
  </span>
);

const Projects = ({ projects = [], setActiveSection }) => {
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  /* Detect dark mode */
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  /* Intersection observer */
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

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const theme = isDark ? 'dark' : 'light';

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-500 border-t dark:border-white/[0.06] border-slate-200"
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

        {/* ── Header ── */}
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full
            dark:border dark:border-cyan-400/20 border border-indigo-200
            dark:bg-cyan-400/5 bg-indigo-50
            dark:text-cyan-400 text-indigo-600
            text-[11px] font-mono tracking-[0.15em] uppercase font-medium">
            <FaCode className="text-xs" />
            Portfolio
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-tight tracking-tight dark:text-white text-slate-900">
                Selected{' '}
                <span className="dark:text-transparent text-transparent bg-clip-text
                  dark:[background-image:linear-gradient(135deg,#67e8f9,#818cf8)]
                  [background-image:linear-gradient(135deg,#4f46e5,#7c3aed)]">
                  Work
                </span>
              </h2>
              <p className="mt-2 max-w-lg text-[15px] dark:text-white/45 text-slate-500 leading-relaxed font-light">
                Enterprise applications built with scalability, security, and real product impact.
              </p>
            </div>

            {/* Project count */}
            <div className="flex-shrink-0 flex items-center gap-1 dark:text-white/25 text-slate-400 font-mono text-sm">
              <span className="dark:text-cyan-400 text-indigo-600 font-bold text-lg">{filtered.length}</span>
              &nbsp;project{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className={`flex flex-wrap gap-2 mb-12 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
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

        {/* ── Projects grid ── */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, idx) => {
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
                    transitionDelay: `${idx * 60}ms`,
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
                    className="relative h-36 flex items-end p-5 overflow-hidden"
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

                    {/* Index */}
                    <div className="relative z-10 flex flex-col gap-2 w-full">
                      <div className="flex items-center justify-between">
                        <Index n={idx + 1} accent={accent} />
                        {/* Category badge */}
                        <span
                          className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                          style={{
                            color: accent,
                            borderColor: `${accent}40`,
                            background: `${accent}12`,
                          }}
                        >
                          {project.category || 'App'}
                        </span>
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
                    <p className="text-[13px] dark:text-white/45 text-slate-500 leading-relaxed mb-5 line-clamp-3 flex-1">
                      {project.description || 'A full-stack application built with modern technologies for real product value.'}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(project.tech || ['React', 'Node.js']).slice(0, 5).map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-[11px] font-mono dark:text-white/40 text-slate-500 rounded-lg"
                          style={{
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer row */}
                    <div
                      className="flex items-center justify-between pt-6 border-t"
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

                      <div className="flex gap-3">
                        {project.github !== false && (
                          <a
                            href={project.github || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="dark:text-white/25 text-slate-400 hover:dark:text-white/70 hover:text-slate-700 transition-colors duration-200"
                          >
                            <FaGithub className="text-base" />
                          </a>
                        )}
                        {project.liveDemo !== false && (
                          <a
                            href={project.liveDemo || '#'}
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
            <p className="dark:text-white/30 text-slate-400 font-mono text-sm mb-4">No projects in this category.</p>
            <button
              onClick={() => setFilter('All')}
              className="text-sm font-mono dark:text-cyan-400 text-indigo-600 hover:underline"
            >
              Clear filter →
            </button>
          </div>
        )}

        {/* ── CTA strip ── */}
        <div className={`mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl border dark:border-white/[0.06] border-slate-200 dark:bg-white/[0.02] bg-white transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <p className="font-semibold dark:text-white text-slate-800 text-sm">Have a project in mind?</p>
            <p className="text-[13px] dark:text-white/35 text-slate-500 font-light mt-0.5">Let's build something great together.</p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
              dark:bg-cyan-400 bg-indigo-600
              dark:text-[#050810] text-white
              dark:hover:bg-cyan-300 hover:bg-indigo-700
              transition-all duration-200 shadow-lg dark:shadow-cyan-400/15 shadow-indigo-500/20"
          >
            Get in Touch <FaArrowRight className="text-xs" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;