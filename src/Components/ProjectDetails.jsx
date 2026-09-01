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
    const foundProject = projects?.find(p => p.id === parseInt(id) || p.slug === id || String(p.id) === String(id));
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/');
    }
  }, [id, projects, navigate]);

  if (!project) return null;

  const accent = 'var(--accent)';

  return (
    <div className="relative min-h-screen overflow-hidden px-6 lg:px-10 pt-28 pb-32">

      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] -z-10 translate-x-1/3 -translate-y-1/3" style={{ background: 'var(--accent-subtle)' }} />

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-14"
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-all group border"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
            }}
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" style={{ color: accent }} />
            <span>Back to Projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mt-2 sm:mt-0" style={{ color: 'var(--text-muted)' }}>
            <span>Home</span>
            <span>/</span>
            <span>Projects</span>
            <span>/</span>
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
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono tracking-[0.2em] uppercase font-bold"
                style={{ background: 'var(--accent-subtle)', color: accent, border: `1px solid var(--border-accent)` }}
              >
                <FaTag className="text-[10px]" /> {project.category}
              </div>
              {project.ownership && (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono tracking-[0.15em] uppercase font-semibold border"
                  style={{ borderColor: 'var(--border)', background: 'var(--bg-card)', color: 'var(--text-muted)' }}
                >
                  <FaUsers className="text-[10px]" /> {project.ownership}
                </div>
              )}
            </div>

            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h1>

            <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl" style={{ color: 'var(--text-muted)' }}>
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
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-5 rounded-xl w-full sm:w-[180px] border transition-all hover:-translate-y-1"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--accent-subtle)', color: accent }}>
                  <FaGithub className="text-lg" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Source Code</div>
                  <div className="text-sm font-semibold transition-all" style={{ color: accent }}>
                    View Repo &rarr;
                  </div>
                </div>
              </a>
            )}

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-5 rounded-xl w-full sm:w-[180px] border transition-all hover:-translate-y-1"
                style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--accent-subtle)', color: accent }}>
                  <FaExternalLinkAlt className="text-sm" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Production</div>
                  <div className="text-sm font-semibold transition-all" style={{ color: accent }}>
                    Live Preview &rarr;
                  </div>
                </div>
              </a>
            )}
          </motion.div>
        </div>

        {/* Feature Graphic Banner with 3D Float */}
        <div className="w-full relative py-8 lg:py-16 mb-20 flex items-center justify-center pointer-events-none" style={{ perspective: '1200px' }}>
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
            className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden relative border flex items-center justify-center shadow-xl"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--bg-card)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="relative z-10 text-center px-4" style={{ transform: 'translateZ(60px)' }}>
              <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-black tracking-tighter opacity-20 break-words" style={{ color: accent }}>
                {project.title.split(' ')[0]}
              </h2>
            </div>
          </motion.div>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* MAIN CONTENT (8 cols) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-8 flex flex-col gap-14"
          >
            {/* Overview */}
            <section>
              <h3 className="text-2xl font-bold mb-5 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'var(--accent-subtle)', color: accent }}>
                  <FaFolder />
                </span>
                Project Overview
              </h3>
              <p className="text-[15px] leading-[1.85] font-light" style={{ color: 'var(--text-muted)' }}>
                {project.fullDescription || project.description}
              </p>
            </section>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-5 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'var(--accent-subtle)', color: accent }}>
                    <FaCheckCircle />
                  </span>
                  Key Features & Capabilities
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-5 rounded-xl border transition-all hover:-translate-y-1 shadow-sm"
                      style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
                    >
                      <div className="text-[11px] font-mono font-bold pt-1" style={{ color: accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-primary)' }}>
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
            <div
              className="p-7 rounded-xl border shadow-sm"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
            >
              <div className="flex flex-col gap-6">
                {project.role && (
                  <div>
                    <div className="text-[10px] font-mono tracking-widest uppercase mb-1 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                      <FaUsers /> My Role
                    </div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {project.role}
                    </div>
                  </div>
                )}

                {project.role && <div className="h-px w-full" style={{ background: 'var(--border)' }} />}

                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase mb-2 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <FaRocket /> Status
                  </div>
                  <div
                    className="font-semibold inline-flex px-3 py-1 rounded-full text-xs border"
                    style={{ borderColor: 'var(--border-accent)', color: accent, background: 'var(--accent-subtle)' }}
                  >
                    {project.status || 'Completed'}
                  </div>
                </div>

                <div className="h-px w-full" style={{ background: 'var(--border)' }} />

                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase mb-2 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <FaCalendarAlt /> Timeline
                  </div>
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    {project.period || '2025 – 2026'}
                  </div>
                </div>

                <div className="h-px w-full" style={{ background: 'var(--border)' }} />

                <div>
                  <div className="text-[10px] font-mono tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <FaCode /> Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech?.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-1 rounded border"
                        style={{ borderColor: 'var(--border)', background: 'var(--bg-base)', color: 'var(--text-muted)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal Contact Box */}
            <div
              className="p-7 rounded-xl border flex flex-col lg:items-center lg:text-center"
              style={{ borderColor: 'var(--border-accent)', background: 'var(--accent-subtle)' }}
            >
              <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Need a similar solution?</h4>
              <p className="text-sm mb-5 font-light" style={{ color: 'var(--text-muted)' }}>
                Available for full-stack & frontend engineering matching these capabilities.
              </p>
              <Link
                to="/#contact"
                className="btn-primary w-full lg:w-auto text-center justify-center"
              >
                Get In Touch
              </Link>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetails;