import React, { useEffect, useRef, useState } from 'react';
import { FaCode, FaServer, FaTools, FaCheckCircle } from 'react-icons/fa';
import {
  SiReact, SiJavascript, SiTailwindcss, SiHtml5,
  SiNodedotjs, SiMongodb, SiMysql,
  SiGithub, SiPostman, SiJsonwebtokens, SiSequelize,
  SiMui,
} from 'react-icons/si';

/* ─── Data ─────────────────────────────────────────── */

const categories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: FaCode,
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61dafb', level: 3 },
      { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', level: 3 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8', level: 3 },
      { name: 'HTML5 / CSS3', icon: SiHtml5, color: '#e34f26', level: 3 },
      { name: 'Material UI', icon: SiMui, color: '#007fff', level: 3 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & DB',
    icon: FaServer,
    skills: [
      { name: 'Node.js & Express.js', icon: SiNodedotjs, color: '#68a063', level: 3 },
      { name: 'MySQL', icon: SiMysql, color: '#00758f', level: 3 },
      { name: 'MongoDB', icon: SiMongodb, color: '#4db33d', level: 3 },
      { name: 'Sequelize ORM', icon: SiSequelize, color: '#52b0e7', level: 3 },
      { name: 'JWT & WebSockets', icon: SiJsonwebtokens, color: '#d63aff', level: 3 },
    ],
  },
  {
    id: 'tools',
    label: 'Services & Tools',
    icon: FaTools,
    skills: [
      { name: 'Git & GitHub', icon: SiGithub, color: '#888', level: 3 },
      { name: 'Postman & REST APIs', icon: SiPostman, color: '#ff6c37', level: 3 },
      { name: 'Authorize.net / Stripe', icon: FaTools, color: '#60a5fa', level: 3 },
      { name: 'SendGrid / Nodemailer', icon: FaCode, color: '#38bdf8', level: 3 },
      { name: 'OpenAI API', icon: FaCode, color: '#10a37f', level: 3 },
    ],
  },
];

const highlights = [
  'RESTful API Design',
  'JWT Authentication & RBAC',
  'WebSocket / Real-time (Socket.IO)',
  'Payment Gateway Integration',
  'Database Architecture & ORM',
  'Responsive UI/UX (React / MUI)',
  'Email Services (SendGrid / Nodemailer)',
  'Performance Optimization',
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 overflow-hidden transition-colors duration-500"
      style={{
        scrollMarginTop: '4rem',
        borderTop: `1px solid ${isDark ? 'rgba(100,255,218,0.08)' : 'rgba(208,215,222,0.80)'}`,
      }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ── */}
        <div className={`mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full font-mono text-[11px] tracking-[0.15em] uppercase font-semibold"
            style={{
              border: `1px solid var(--border-accent)`,
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
            }}
          >
            <FaCode className="text-xs" />
            Technical Stack
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Core{' '}
                <span style={{ color: 'var(--accent)' }}>
                  Capabilities
                </span>
              </h2>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
                Specialized in the modern full-stack web ecosystem — from pixel-perfect React UIs to scalable Node.js APIs and relational database architecture.
              </p>
            </div>
            {/* Stat badges */}
            <div
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl shadow-sm"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid var(--border)`,
              }}
            >
              <div className="text-center">
                <div className="text-2xl font-black leading-none" style={{ color: 'var(--text-primary)' }}>1.5+</div>
                <div className="text-[10px] font-mono tracking-widest uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>Years</div>
              </div>
              <div className="w-px h-8" style={{ background: 'var(--border)' }} />
              <div className="text-center">
                <div className="text-2xl font-black leading-none" style={{ color: 'var(--text-primary)' }}>15+</div>
                <div className="text-[10px] font-mono tracking-widest uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>Tools</div>
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
                  className="group relative text-left px-5 py-4 rounded-xl border transition-all duration-300 cursor-pointer"
                  style={{
                    background: active ? 'var(--accent-subtle)' : 'var(--bg-card)',
                    borderColor: active ? 'var(--border-accent)' : 'var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icon box */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: active ? 'var(--accent-glow)' : 'transparent',
                          border: `1px solid ${active ? 'var(--border-accent)' : 'var(--border)'}`,
                        }}
                      >
                        <Icon className="text-sm" style={{ color: active ? 'var(--accent)' : 'var(--text-muted)' }} />
                      </div>
                      <div>
                        <div
                          className="text-sm font-semibold transition-colors duration-200"
                          style={{ color: active ? 'var(--accent)' : 'var(--text-primary)' }}
                        >
                          {c.label}
                        </div>
                        <div className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {c.skills.length} technologies
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <span
                      className="text-xs font-mono transition-all duration-200"
                      style={{ color: active ? 'var(--accent)' : 'transparent' }}
                    >
                      ▸
                    </span>
                  </div>

                  {/* active accent bar */}
                  {active && (
                    <span
                      className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                </button>
              );
            })}

            {/* What I can do list */}
            <div
              className="mt-2 p-5 rounded-xl border"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <p className="text-[11px] font-mono tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                What I build
              </p>
              <div className="flex flex-col gap-2.5">
                {highlights.slice(0, 5).map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <FaCheckCircle
                      className="text-xs flex-shrink-0"
                      style={{ color: 'var(--accent)' }}
                    />
                    <span className="text-[13px] font-medium" style={{ color: 'var(--text-secondary)' }}>{h}</span>
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
                style={{ color: 'var(--accent)' }}
              >
                {cat.label}
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>{cat.skills.length} skills</span>
            </div>

            {/* Skill cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cat.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group relative p-5 rounded-xl border transition-all duration-300 cursor-default shadow-sm"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-accent)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.boxShadow = '';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all duration-300"
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
                    <div className="text-sm font-semibold mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {skill.name}
                    </div>

                    {/* Level dots */}
                    <LevelDots level={skill.level} accent={isDark ? '#64ffda' : '#2563eb'} />

                    {/* Corner glow dot */}
                    <div
                      className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Proficiency legend */}
            <div className="flex items-center gap-4 mt-6 px-1">
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                Proficiency
              </span>
              {[
                { label: 'Learning', dots: 1 },
                { label: 'Proficient', dots: 2 },
                { label: 'Expert', dots: 3 },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <LevelDots level={l.dots} accent={isDark ? '#64ffda' : '#2563eb'} />
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom strip ── */}
        <div
          className={`mt-14 pt-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ borderTop: `1px solid var(--border)` }}
        >
          <p className="text-center text-[10px] font-mono tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text-muted)' }}>
            Also experienced with
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {[
              'SQL', 'REST APIs', 'WebSockets', 'Role-Based Access Control',
              'Authorize.net', 'SendGrid', 'Nodemailer', 'OpenAI API',
              'Axios', 'React Router', 'Responsive Design', 'Debugging',
              'API Integration', 'Database Design', 'Performance Optimization',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-[12px] font-mono transition-all duration-200 cursor-default"
                style={{
                  border: `1px solid var(--border)`,
                  background: 'var(--bg-card)',
                  color: 'var(--text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-accent)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
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