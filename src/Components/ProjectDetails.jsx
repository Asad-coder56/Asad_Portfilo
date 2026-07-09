import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaGithub, FaExternalLinkAlt, FaArrowLeft,
  FaCalendarAlt, FaTag, FaCode, FaRocket,
  FaUsers, FaCheckCircle, FaFolder
} from 'react-icons/fa';

const ProjectDetails = ({ projects, darkMode = true }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProject = projects?.find(p => p.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/');
    }
  }, [id, projects, navigate]);

  if (!project) return null;

  // Derive theme colours based on current global darkMode prop
  const accent = darkMode ? '#67e8f9' : '#4f46e5';
  const accentLight = darkMode ? 'rgba(103, 232, 249, 0.1)' : 'rgba(79, 70, 229, 0.1)';
  const borderCol = darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  const textPrimary = darkMode ? 'text-white' : 'text-slate-900';
  const textSecondary = darkMode ? 'text-white/60' : 'text-slate-500';

  return (
    <div className="relative min-h-screen bg-transparent dark:bg-transparent overflow-hidden px-6 lg:px-10 pt-28 pb-32">

      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full dark:bg-cyan-500/10 bg-indigo-500/10 blur-[150px] -z-10 translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-16"
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-[13px] font-medium transition-all group"
            style={{ border: `1px solid ${borderCol}`, background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)' }}
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" style={{ color: accent }} />
            <span className={darkMode ? 'text-white/80 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}>Back to Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mt-2 sm:mt-0">
            <span className={textSecondary}>Home</span>
            <span className={textSecondary}>/</span>
            <span className={textSecondary}>Projects</span>
            <span className={textSecondary}>/</span>
            <span style={{ color: accent }} className="font-bold">{project.title.split(' ')[0]}</span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-md text-[10px] font-mono tracking-[0.2em] uppercase font-bold"
              style={{ background: accentLight, color: accent }}
            >
              <FaTag className="text-[10px]" /> {project.category}
            </div>

            <h1 className={`text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-6 ${textPrimary}`}>
              {project.title}
            </h1>

            <p className={`text-lg md:text-xl font-light leading-relaxed max-w-lg ${textSecondary}`}>
              {project.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 lg:justify-end"
          >
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-5 rounded-2xl w-full sm:w-[180px] transition-all hover:-translate-y-1"
                style={{ border: `1px solid ${borderCol}`, background: darkMode ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.7)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors" style={{ background: accentLight, color: accent }}>
                  <FaGithub className="text-lg" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-1 opacity-50">Source Code</div>
                  <div className={`text-sm font-semibold ${textPrimary} group-hover:text-transparent group-hover:bg-clip-text transition-all`}
                    style={{ backgroundImage: `linear-gradient(135deg, ${accent}, #818cf8)` }}>
                    View Repository &rarr;
                  </div>
                </div>
              </a>
            )}

            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-5 rounded-2xl w-full sm:w-[180px] transition-all hover:-translate-y-1"
                style={{ border: `1px solid ${borderCol}`, background: darkMode ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.7)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors" style={{ background: accentLight, color: accent }}>
                  <FaExternalLinkAlt className="text-sm" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-1 opacity-50">Production</div>
                  <div className={`text-sm font-semibold ${textPrimary} group-hover:text-transparent group-hover:bg-clip-text transition-all`}
                    style={{ backgroundImage: `linear-gradient(135deg, ${accent}, #818cf8)` }}>
                    Live Preview &rarr;
                  </div>
                </div>
              </a>
            )}
          </motion.div>
        </div>

        {/* Feature Graphic Banner with 3D Float */}
        <div className="w-full relative py-8 lg:py-16 mb-24 flex items-center justify-center pointer-events-none" style={{ perspective: '1200px' }}>
          <motion.div
            initial={{ opacity: 0, rotateX: 30, rotateY: 15, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              rotateX: [15, 20, 15],
              rotateY: [-4, 4, -4],
              y: [-8, 8, -8],
              scale: 1
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 1 },
              rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative border flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            style={{
              borderColor: borderCol,
              background: darkMode ? '#020408' : '#f8fafc',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Subtle 3D grid background */}
            <div className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                transform: 'translateZ(-50px)'
              }}
            />
            <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.05]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                transform: 'translateZ(-50px)'
              }}
            />

            <div className="relative z-10 text-center px-4" style={{ transform: 'translateZ(60px)' }}>
              <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-black tracking-tighter opacity-15 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] break-words"
                style={{ color: accent }}>
                {project.title.split(' ')[0]}
              </h2>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 dark:opacity-40 mix-blend-overlay" style={{ transform: 'translateZ(20px)' }} />
          </motion.div>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* MAIN CONTENT (8 cols) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-8 flex flex-col gap-16"
          >
            {/* Overview */}
            <section>
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${textPrimary}`}>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: accentLight, color: accent }}>
                  <FaFolder />
                </span>
                Project Overview
              </h3>
              <p className={`text-[15px] leading-[1.8] font-light ${textSecondary}`}>
                {project.fullDescription || project.description}
              </p>
            </section>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${textPrimary}`}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: accentLight, color: accent }}>
                    <FaCheckCircle />
                  </span>
                  Key Deliverables
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl border transition-all hover:-translate-y-1"
                      style={{ borderColor: borderCol, background: darkMode ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.5)' }}>
                      <div className="text-[11px] font-mono font-bold pt-1" style={{ color: accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className={`text-sm font-medium leading-relaxed ${textPrimary}`}>
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </motion.div>

          {/* SIDEBAR (4 cols) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-4 flex flex-col gap-6 sticky top-32"
          >
            {/* Metadata Card */}
            <div className="p-7 rounded-[1.5rem] border"
              style={{ borderColor: borderCol, background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)' }}>

              <div className="flex flex-col gap-6">
                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase mb-2 opacity-50 flex items-center gap-2">
                    <FaRocket /> Status
                  </div>
                  <div className={`font-semibold inline-flex px-3 py-1 rounded-full text-xs border`}
                    style={{ borderColor: accent, color: accent, background: accentLight }}>
                    {project.status}
                  </div>
                </div>

                <div className="h-px w-full" style={{ background: borderCol }} />

                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase mb-2 opacity-50 flex items-center gap-2">
                    <FaCalendarAlt /> Timeline
                  </div>
                  <div className={`font-medium ${textPrimary}`}>
                    {project.period || '2024'}
                  </div>
                </div>

                <div className="h-px w-full" style={{ background: borderCol }} />

                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase mb-3 opacity-50 flex items-center gap-2">
                    <FaCode /> Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech?.map((t, i) => (
                      <span key={i} className={`text-[11px] font-mono px-2.5 py-1 rounded border`}
                        style={{ borderColor: borderCol, color: textSecondary }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal Contact Box */}
            <div className="p-7 rounded-[1.5rem] border border-dashed flex flex-col lg:items-center lg:text-center"
              style={{ borderColor: accent }}>
              <h4 className={`text-lg font-bold mb-3 ${textPrimary}`}>Need a similar solution?</h4>
              <p className={`text-sm mb-5 font-light ${textSecondary}`}>
                Available for full-cycle development matching these capabilities.
              </p>
              <Link to="/contact" className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 w-full lg:w-auto"
                style={{ background: accent, color: darkMode ? '#000' : '#fff' }}>
                Start a Discussion
              </Link>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;