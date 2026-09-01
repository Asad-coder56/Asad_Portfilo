import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGraduationCap, FaBriefcase, FaMapMarkerAlt,
  FaCalendarAlt, FaCode, FaCheckCircle,
} from 'react-icons/fa';

/* Safe helper for rgba colors */
const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== 'string') return `rgba(100,255,218,${alpha})`;
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(100,255,218,${alpha})`;
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
};

/* ── Data ─────────────────────────────────────────── */
const workExperience = [
  {
    position: 'Full Stack Developer',
    company: 'MRA Developers',
    period: 'Feb 2025 – Present',
    type: 'Full-time · Career Progression: Intern → Full Stack Developer',
    location: 'G-10/1, Islamabad, Pakistan',
    description: 'Developing and maintaining scalable full-stack web applications using React.js, Node.js, Express.js, MySQL, and MongoDB. Built RESTful APIs for authentication, user management, and business workflows. Implemented JWT-based authentication and RBAC. Integrated third-party services including Authorize.net payment gateway, SendGrid, WebSockets, and email services. Optimized relational and NoSQL database structures using MySQL, MongoDB, and Sequelize ORM.',
    projects: ['TruNorth', 'EliteSnooker (Highbridge)', 'CueMetrics', 'GI 2 AI Talent (Recruiter)', 'Watt Machinery', 'MatchXpert AI'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'Sequelize ORM', 'JWT', 'WebSockets', 'Tailwind CSS', 'Material UI', 'Authorize.net'],
    accent: { dark: '#64ffda', light: '#2563eb' },
  },
  {
    position: 'Freelance Full Stack & Frontend Developer',
    company: 'Self-Employed / Client Engagements',
    period: '2025 – Present',
    type: 'Freelance & Contracting',
    location: 'Remote / Global',
    description: 'Delivered end-to-end full-stack web applications and specialized e-commerce interfaces on a freelance basis. Built SCSM as Full Stack Developer (React.js + Node.js + MongoDB + Python FastAPI ML microservice for AI-assisted civic complaint triage via Socket.IO). Built PhantomProducts as Frontend Developer (responsive Under Armour UA Phantom 4 e-commerce landing page with mega-menus and product catalog).',
    projects: ['SCSM — Smart Complaint Management System', 'PhantomProducts — UA Phantom 4 E-Commerce'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Python', 'FastAPI', 'Vite', 'Tailwind CSS v4'],
    accent: { dark: '#38bdf8', light: '#1d4ed8' },
  },
];

const educationData = [
  {
    degree: 'BS Software Engineering',
    institution: 'University of Mianwali',
    period: 'Oct 2021 – May 2025',
    location: 'Mianwali, Punjab, Pakistan',
    cgpa: '3.38',
    description: 'Four-year degree covering core CS fundamentals, software design, algorithms, and modern web/AI technologies.',
    courses: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Web Development', 'AI / ML', 'OOP', 'Computer Networks'],
    accent: { dark: '#64ffda', light: '#2563eb' },
  },
];

/* ── Motion Variants ──────────────────────────────── */
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

/* ── Component ───────────────────────────────────── */
const Education = ({ setActiveSection }) => {
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const [tab, setTab] = useState('experience');
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
        ([e]) => { setVisible(e.isIntersecting); if (e.isIntersecting) setActiveSection('education'); },
        { threshold: 0.1 }
      );
    }
    const el = sectionRef.current;
    if (el) observerRef.current.observe(el);
    return () => { if (el) observerRef.current?.unobserve(el); };
  }, [setActiveSection]);

  const theme = isDark ? 'dark' : 'light';

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 overflow-hidden transition-colors duration-500"
      style={{
        scrollMarginTop: '4rem',
        borderTop: `1px solid ${isDark ? 'rgba(100,255,218,0.08)' : 'rgba(208,215,222,0.80)'}`,
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full font-mono text-[11px] tracking-[0.15em] uppercase font-semibold"
            style={{
              border: `1px solid var(--border-accent)`,
              background: 'var(--accent-subtle)',
              color: 'var(--accent)',
            }}
          >
            <FaBriefcase className="text-xs" />
            Background
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Resume &{' '}
            <span
              style={{
                color: 'var(--accent)',
              }}
            >
              Timeline
            </span>
          </h2>
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed font-light" style={{ color: 'var(--text-muted)' }}>
            My professional journey and academic foundation in software engineering.
          </p>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {[
            { key: 'experience', label: 'Experience', icon: FaBriefcase },
            { key: 'education', label: 'Education', icon: FaGraduationCap },
          ].map(({ key, label, icon: TabIcon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-mono font-medium border transition-all duration-200"
                style={{
                  background: active ? 'var(--accent-subtle)' : 'transparent',
                  borderColor: active ? 'var(--border-accent)' : 'var(--border)',
                  color: active ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                <TabIcon className="text-xs" />
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">
          {tab === 'experience' && (
            <motion.div
              key="exp"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="flex flex-col gap-5"
            >
              {workExperience.map((w, i) => {
                const acc = w.accent[theme];
                const bgTag = hexToRgba(acc, 0.10);
                const borderTag = hexToRgba(acc, 0.30);

                return (
                  <motion.div
                    key={i}
                    variants={itemVariant}
                    className="group rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
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
                      className="flex flex-wrap items-start justify-between gap-3 px-6 py-5 border-b"
                      style={{
                        background: 'var(--bg-surface)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                            {w.position}
                          </h3>
                          <span
                            className="hidden sm:inline text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                            style={{ color: acc, borderColor: borderTag, background: bgTag }}
                          >
                            {w.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-semibold" style={{ color: acc }}>{w.company}</span>
                          <span className="flex items-center gap-1 text-[12px] font-mono" style={{ color: 'var(--text-muted)' }}>
                            <FaMapMarkerAlt className="text-[10px]" />{w.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-mono flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                        <FaCalendarAlt className="text-[10px]" style={{ color: acc }} />
                        {w.period}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-6 py-5 grid md:grid-cols-[1fr_auto] gap-6">
                      <div>
                        <p className="text-[13px] leading-relaxed mb-5 font-light" style={{ color: 'var(--text-muted)' }}>
                          {w.description}
                        </p>

                        {/* Projects worked on */}
                        {w.projects.length > 0 && (
                          <div className="mb-5">
                            <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                              Projects
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {w.projects.map((p, j) => (
                                <span
                                  key={j}
                                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-mono font-medium transition-colors cursor-default"
                                  style={{
                                    color: acc,
                                    background: bgTag,
                                    border: `1px solid ${borderTag}`,
                                  }}
                                >
                                  <FaCode className="text-[9px] opacity-70" />
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech pills */}
                        <div>
                          <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {w.tech.map((t, j) => (
                              <span
                                key={j}
                                className="px-2.5 py-1 text-[11px] font-mono rounded-lg transition-colors duration-200"
                                style={{
                                  background: 'var(--bg-base)',
                                  border: `1px solid var(--border)`,
                                  color: 'var(--text-muted)',
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {tab === 'education' && (
            <motion.div
              key="edu"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="flex flex-col gap-5"
            >
              {educationData.map((e, i) => {
                const acc = e.accent[theme];
                const bgTag = hexToRgba(acc, 0.10);
                const borderTag = hexToRgba(acc, 0.30);

                return (
                  <motion.div
                    key={i}
                    variants={itemVariant}
                    className="group rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div
                      className="flex flex-wrap items-start justify-between gap-3 px-6 py-5 border-b"
                      style={{
                        background: 'var(--bg-surface)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                            {e.degree}
                          </h3>
                          <span
                            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                            style={{ color: acc, borderColor: borderTag, background: bgTag }}
                          >
                            CGPA {e.cgpa}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-semibold" style={{ color: acc }}>{e.institution}</span>
                          <span className="flex items-center gap-1 text-[12px] font-mono" style={{ color: 'var(--text-muted)' }}>
                            <FaMapMarkerAlt className="text-[10px]" />{e.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-mono flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                        <FaCalendarAlt className="text-[10px]" style={{ color: acc }} />
                        {e.period}
                      </div>
                    </div>

                    <div className="px-6 py-5">
                      <p className="text-[13px] leading-relaxed mb-5 font-light" style={{ color: 'var(--text-muted)' }}>
                        {e.description}
                      </p>
                      <div>
                        <p className="text-[10px] font-mono tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                          Key Coursework
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {e.courses.map((c, j) => (
                            <span
                              key={j}
                              className="px-2.5 py-1 text-[11px] font-mono rounded-lg"
                              style={{
                                background: 'var(--bg-base)',
                                border: `1px solid var(--border)`,
                                color: 'var(--text-muted)',
                              }}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Education;