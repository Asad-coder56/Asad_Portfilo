import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGraduationCap, FaBriefcase, FaMapMarkerAlt,
  FaCalendarAlt, FaCode, FaCheckCircle,
} from 'react-icons/fa';

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
    accent: { dark: '#67e8f9', light: '#4f46e5' },
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
    accent: { dark: '#fb923c', light: '#ea580c' },
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
    accent: { dark: '#34d399', light: '#059669' },
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
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full dark:bg-violet-600/8 bg-indigo-200/20 blur-[120px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full dark:bg-emerald-600/6 bg-teal-200/20 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full
            dark:border dark:border-cyan-400/20 border border-indigo-200
            dark:bg-cyan-400/5 bg-indigo-50
            dark:text-cyan-400 text-indigo-600
            text-[11px] font-mono tracking-[0.15em] uppercase font-medium">
            <FaBriefcase className="text-xs" />
            Background
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black leading-tight tracking-tight dark:text-white text-slate-900">
            Resume &{' '}
            <span className="dark:text-transparent text-transparent bg-clip-text
              dark:[background-image:linear-gradient(135deg,#67e8f9,#818cf8)]
              [background-image:linear-gradient(135deg,#4f46e5,#7c3aed)]">
              Timeline
            </span>
          </h2>
          <p className="mt-2 max-w-lg text-[15px] dark:text-white/45 text-slate-500 leading-relaxed font-light">
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
            const accent = active ? (isDark ? '#67e8f9' : '#4f46e5') : undefined;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-mono font-medium border transition-all duration-200"
                style={{
                  background: active
                    ? (isDark ? 'rgba(103,232,249,0.1)' : 'rgba(79,70,229,0.08)')
                    : 'transparent',
                  borderColor: active
                    ? (isDark ? 'rgba(103,232,249,0.3)' : 'rgba(79,70,229,0.25)')
                    : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'),
                  color: active
                    ? accent
                    : (isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)'),
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
                return (
                  <motion.div
                    key={i}
                    variants={itemVariant}
                    className="group rounded-2xl border overflow-hidden transition-all duration-300 dark:bg-white/[0.025] bg-white hover:-translate-y-1"
                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${acc}35`;
                      e.currentTarget.style.boxShadow = `0 16px 48px ${acc}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    {/* Card top band */}
                    <div
                      className="flex flex-wrap items-start justify-between gap-3 px-6 py-5 border-b"
                      style={{
                        background: `${acc}08`,
                        borderColor: `${acc}15`,
                      }}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold dark:text-white text-slate-900">
                            {w.position}
                          </h3>
                          <span
                            className="hidden sm:inline text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                            style={{ color: acc, borderColor: `${acc}40`, background: `${acc}12` }}
                          >
                            {w.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-semibold" style={{ color: acc }}>{w.company}</span>
                          <span className="flex items-center gap-1 text-[12px] dark:text-white/30 text-slate-400 font-mono">
                            <FaMapMarkerAlt className="text-[10px]" />{w.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-mono dark:text-white/35 text-slate-400 flex-shrink-0">
                        <FaCalendarAlt className="text-[10px]" style={{ color: acc }} />
                        {w.period}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="px-6 py-5 grid md:grid-cols-[1fr_auto] gap-6">
                      <div>
                        <p className="text-[13px] dark:text-white/50 text-slate-500 leading-relaxed mb-5 font-light">
                          {w.description}
                        </p>

                        {/* Projects worked on */}
                        {w.projects.length > 0 && (
                          <div className="mb-5">
                            <p className="text-[10px] font-mono dark:text-white/25 text-slate-400 tracking-[0.15em] uppercase mb-2">
                              Projects
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {w.projects.map((p, j) => (
                                <span
                                  key={j}
                                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-mono font-medium transition-colors cursor-default"
                                  style={{
                                    color: acc,
                                    background: `${acc}10`,
                                    border: `1px solid ${acc}25`,
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
                          <p className="text-[10px] font-mono dark:text-white/25 text-slate-400 tracking-[0.15em] uppercase mb-2">
                            Technologies
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {w.tech.map((t, j) => (
                              <span
                                key={j}
                                className="px-2.5 py-1 text-[11px] font-mono dark:text-white/40 text-slate-500 rounded-lg transition-colors duration-200 hover:dark:bg-white/10 hover:bg-slate-100"
                                style={{
                                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
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
                return (
                  <motion.div
                    key={i}
                    variants={itemVariant}
                    className="group rounded-2xl border overflow-hidden dark:bg-white/[0.025] bg-white transition-all duration-300 hover:-translate-y-1"
                    style={{ borderColor: `${acc}25` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 16px 48px ${acc}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <div
                      className="px-6 py-5 border-b flex flex-wrap items-start justify-between gap-4"
                      style={{ background: `${acc}08`, borderColor: `${acc}15` }}
                    >
                      <div>
                        <h3 className="text-base font-bold dark:text-white text-slate-900 mb-1">{e.degree}</h3>
                        <span className="text-sm font-semibold" style={{ color: acc }}>{e.institution}</span>
                        <div className="flex items-center gap-1 mt-1 text-[12px] dark:text-white/30 text-slate-400 font-mono">
                          <FaMapMarkerAlt className="text-[10px]" />{e.location}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1.5 text-[12px] font-mono dark:text-white/35 text-slate-400">
                          <FaCalendarAlt className="text-[10px]" style={{ color: acc }} />
                          {e.period}
                        </div>
                        {e.cgpa && (
                          <span
                            className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                            style={{ color: acc, borderColor: `${acc}50`, background: `${acc}15` }}
                          >
                            CGPA: {e.cgpa}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="px-6 py-5">
                      <p className="text-[13px] dark:text-white/50 text-slate-500 leading-relaxed mb-5 font-light">
                        {e.description}
                      </p>
                      <p className="text-[10px] font-mono dark:text-white/25 text-slate-400 tracking-[0.15em] uppercase mb-3">
                        Key Subjects
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {e.courses.map((c, j) => (
                          <div key={j} className="flex items-center gap-2 group/item">
                            <FaCheckCircle className="text-xs flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" style={{ color: acc, opacity: 0.9 }} />
                            <span className="text-[12px] font-medium transition-colors duration-200 dark:text-white/60 text-slate-600 dark:group-hover/item:text-white group-hover/item:text-slate-900">{c}</span>
                          </div>
                        ))}
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