import React, { useEffect, useRef, useState } from 'react';
import { FaCode, FaServer, FaTools, FaCheckCircle } from 'react-icons/fa';
import {
  SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiCss3,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  SiGit, SiGithub, SiPostman, SiJsonwebtokens,
} from 'react-icons/si';

/* ─── Data ─────────────────────────────────────────── */
const itemVariant = {
  hidden: { opacity: 0, y: 30, rotateX: 45, scale: 0.9 },
  show: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: FaCode,
    accent: { dark: '#67e8f9', light: '#4f46e5' },           // cyan / indigo
    bg: { dark: 'rgba(103,232,249,0.06)', light: 'rgba(79,70,229,0.04)' },
    border: { dark: 'rgba(103,232,249,0.18)', light: 'rgba(79,70,229,0.2)' },
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61dafb', level: 3 },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', level: 3 },
      { name: 'HTML5', icon: SiHtml5, color: '#e34f26', level: 3 },
      { name: 'CSS3', icon: SiCss3, color: '#1572b6', level: 3 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8', level: 3 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: FaServer,
    accent: { dark: '#a78bfa', light: '#7c3aed' },           // violet
    bg: { dark: 'rgba(167,139,250,0.06)', light: 'rgba(124,58,237,0.04)' },
    border: { dark: 'rgba(167,139,250,0.18)', light: 'rgba(124,58,237,0.2)' },
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#68a063', level: 3 },
      { name: 'Express.js', icon: SiExpress, color: '#888', level: 3 },
      { name: 'MongoDB', icon: SiMongodb, color: '#4db33d', level: 2 },
      { name: 'MySQL', icon: SiMysql, color: '#00758f', level: 2 },
      { name: 'JWT Auth', icon: SiJsonwebtokens, color: '#d63aff', level: 3 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: FaTools,
    accent: { dark: '#34d399', light: '#059669' },           // emerald
    bg: { dark: 'rgba(52,211,153,0.06)', light: 'rgba(5,150,105,0.04)' },
    border: { dark: 'rgba(52,211,153,0.18)', light: 'rgba(5,150,105,0.2)' },
    skills: [
      { name: 'Git', icon: SiGit, color: '#f05032', level: 3 },
      { name: 'GitHub', icon: SiGithub, color: '#888', level: 3 },
      { name: 'Postman', icon: SiPostman, color: '#ff6c37', level: 3 },
      { name: 'REST APIs', icon: FaCode, color: '#60a5fa', level: 3 },
      { name: 'VS Code', icon: FaTools, color: '#007acc', level: 3 },
    ],
  },
];

const highlights = [
  'RESTful API Design',
  'JWT Authentication',
  'WebSocket / Real-time',
  'Payment Integration',
  'Database Architecture',
  'Responsive UI/UX',
  'Clean Code Practices',
  'Performance Tuning',
];

/* Level dots component */
const LevelDots = ({ level, accent }) => (
  <div className="flex gap-1">
    {[1, 2, 3].map((d) => (
      <span
        key={d}
        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
        style={{
          backgroundColor: d <= level ? accent : 'transparent',
          border: `1.5px solid ${accent}`,
          opacity: d <= level ? 1 : 0.3,
        }}
      />
    ))}
  </div>
);

/* ─── Component ─────────────────────────────────────── */
const Skills = ({ setActiveSection }) => {
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
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
        ([e]) => { setVisible(e.isIntersecting); if (e.isIntersecting) setActiveSection('skills'); },
        { threshold: 0.1 }
      );
    }
    const el = sectionRef.current;
    if (el) observerRef.current.observe(el);
    return () => { if (el) observerRef.current?.unobserve(el); };
  }, [setActiveSection]);

  const cat = categories[activeIdx];
  const theme = isDark ? 'dark' : 'light';

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-transparent dark:bg-transparent transition-colors duration-500 border-t dark:border-white/[0.06] border-slate-200"
      style={{ scrollMarginTop: '4rem' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 dark:opacity-[0.03] opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,179,237,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,179,237,0.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full dark:bg-violet-600/8 bg-indigo-300/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full dark:bg-cyan-500/6 bg-violet-200/20 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full
            dark:border dark:border-cyan-400/20 border border-indigo-200
            dark:bg-cyan-400/5 bg-indigo-50
            dark:text-cyan-400 text-indigo-600
            text-[11px] font-mono tracking-[0.15em] uppercase font-medium">
            <FaCode className="text-xs" />
            Technical Stack
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-tight tracking-tight dark:text-white text-slate-900">
                Core <span className="dark:text-transparent text-transparent bg-clip-text
                  dark:[background-image:linear-gradient(135deg,#67e8f9,#818cf8)]
                  [background-image:linear-gradient(135deg,#4f46e5,#7c3aed)]">Capabilities</span>
              </h2>
              <p className="mt-3 max-w-lg text-[15px] dark:text-white/45 text-slate-500 leading-relaxed font-light">
                Specialized in the modern full-stack web ecosystem — from pixel-perfect UIs to production-grade APIs.
              </p>
            </div>
            {/* Years badge */}
            <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl
              dark:border dark:border-white/8 border border-slate-200
              dark:bg-white/3 bg-white shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-black dark:text-white text-slate-900 leading-none">1.5+</div>
                <div className="text-[10px] font-mono dark:text-white/35 text-slate-400 tracking-widest uppercase mt-0.5">Years</div>
              </div>
              <div className="w-px h-8 dark:bg-white/10 bg-slate-200" />
              <div className="text-center">
                <div className="text-2xl font-black dark:text-white text-slate-900 leading-none">10+</div>
                <div className="text-[10px] font-mono dark:text-white/35 text-slate-400 tracking-widest uppercase mt-0.5">Tools</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main bento grid ── */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6">

          {/* LEFT – Category selector */}
          <div className={`flex flex-col gap-3 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {categories.map((c, i) => {
              const active = activeIdx === i;
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveIdx(i)}
                  className="group relative text-left px-5 py-4 rounded-2xl border transition-all duration-300"
                  style={{
                    background: active ? c.bg[theme] : 'transparent',
                    borderColor: active ? c.border[theme] : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'),
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icon box */}
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: active ? c.bg[theme] : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
                          border: `1px solid ${active ? c.border[theme] : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`,
                        }}
                      >
                        <Icon className="text-sm" style={{ color: active ? c.accent[theme] : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)') }} />
                      </div>
                      <div>
                        <div
                          className="text-sm font-semibold transition-colors duration-200"
                          style={{ color: active ? c.accent[theme] : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)') }}
                        >
                          {c.label}
                        </div>
                        <div className="text-[11px] dark:text-white/25 text-slate-400 font-mono mt-0.5">
                          {c.skills.length} technologies
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <span
                      className="text-xs font-mono transition-all duration-200"
                      style={{ color: active ? c.accent[theme] : 'transparent' }}
                    >
                      ▸
                    </span>
                  </div>

                  {/* active accent bar */}
                  {active && (
                    <span
                      className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-full"
                      style={{ backgroundColor: c.accent[theme] }}
                    />
                  )}
                </button>
              );
            })}

            {/* What I can do list */}
            <div
              className="mt-2 p-5 rounded-2xl border dark:border-white/[0.06] border-slate-200 dark:bg-white/[0.02] bg-white"
            >
              <p className="text-[11px] font-mono dark:text-white/30 text-slate-400 tracking-[0.15em] uppercase mb-4">
                What I build
              </p>
              <div className="flex flex-col gap-2.5">
                {highlights.slice(0, 5).map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <FaCheckCircle
                      className="text-xs flex-shrink-0"
                      style={{ color: cat.accent[theme], opacity: 0.8 }}
                    />
                    <span className="text-[13px] dark:text-white/55 text-slate-500 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT – Skill cards grid */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            key={activeIdx}
          >
            {/* Category label row */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[11px] font-mono tracking-[0.15em] uppercase font-semibold"
                style={{ color: cat.accent[theme] }}
              >
                {cat.label} Development
              </span>
              <div className="flex-1 h-px dark:bg-white/5 bg-slate-200" />
              <span className="text-[11px] font-mono dark:text-white/20 text-slate-400">{cat.skills.length} skills</span>
            </div>

            {/* 5-card bento: first card wide, rest 2-col */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cat.skills.map((skill, i) => {
                const Icon = skill.icon;
                const wide = i === 0; // first card spans 2 cols as highlight
                return (
                  <div
                    key={skill.name}
                    className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-default
                      dark:bg-white/[0.025] bg-white hover:-translate-y-1 hover:shadow-xl
                      ${wide ? 'col-span-2 sm:col-span-1' : ''}`}
                    style={{
                      borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
                      '--hover-border': cat.border[theme],
                      '--hover-shadow': `${cat.accent[theme]}18`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cat.border[theme];
                      e.currentTarget.style.boxShadow = `0 20px 40px ${cat.accent[theme]}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                      style={{
                        background: `${skill.color}15`,
                        border: `1px solid ${skill.color}30`,
                      }}
                    >
                      <Icon
                        className="text-xl transition-all duration-300 group-hover:scale-110"
                        style={{ color: skill.color }}
                      />
                    </div>

                    {/* Name */}
                    <div className="text-sm font-semibold dark:text-white/80 text-slate-700 mb-2 leading-tight">
                      {skill.name}
                    </div>

                    {/* Level dots */}
                    <LevelDots level={skill.level} accent={cat.accent[theme]} />

                    {/* Subtle glow on corner */}
                    <div
                      className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: cat.accent[theme] }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Proficiency legend */}
            <div className="flex items-center gap-4 mt-5 px-1">
              <span className="text-[10px] font-mono dark:text-white/20 text-slate-400 tracking-widest uppercase">
                Proficiency
              </span>
              {[
                { label: 'Learning', dots: 1 },
                { label: 'Proficient', dots: 2 },
                { label: 'Expert', dots: 3 },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <LevelDots level={l.dots} accent={cat.accent[theme]} />
                  <span className="text-[10px] dark:text-white/25 text-slate-400">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom scrolling pill strip ── */}
        <div className={`mt-16 pt-8 border-t dark:border-white/[0.06] border-slate-200 transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-center text-[10px] font-mono dark:text-white/20 text-slate-400 tracking-[0.2em] uppercase mb-5">
            Also experienced with
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              'REST APIs', 'JWT', 'WebSockets', 'Payment Gateway',
              'Email Services', 'Agile', 'MVC', 'CRUD', 'OOP',
              'React Router', 'Axios', 'NPM',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-[12px] font-mono
                  dark:border dark:border-white/[0.08] border border-slate-200
                  dark:bg-white/[0.03] bg-white
                  dark:text-white/40 text-slate-500
                  dark:hover:border-cyan-400/30 hover:border-indigo-300
                  dark:hover:text-cyan-400 hover:text-indigo-600
                  transition-all duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;