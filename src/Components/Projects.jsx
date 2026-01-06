// src/components/Projects.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaFilter, 
  FaCode, 
  FaCalendarAlt, 
  FaTag, 
  FaTerminal,
  FaArrowRight,
  FaChevronRight,
  FaRocket
} from 'react-icons/fa';

const Projects = ({ projects, setActiveSection }) => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filterHover, setFilterHover] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('projects');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
    setVisibleProjects(3);
  }, [filter, projects]);

  const categories = ['all', 'AI/ML', 'Full Stack', 'Web App', 'API', 'Mobile'];

  const colorClasses = {
    blue: 'border-syntax-blue text-syntax-blue',
    purple: 'border-syntax-purple text-syntax-purple',
    green: 'border-syntax-green text-syntax-green',
    orange: 'border-syntax-orange text-syntax-orange',
    red: 'border-syntax-red text-syntax-red'
  };

  const colorBGs = {
    blue: 'bg-syntax-blue/10',
    purple: 'bg-syntax-purple/10',
    green: 'bg-syntax-green/10',
    orange: 'bg-syntax-orange/10',
    red: 'bg-syntax-red/10'
  };

  const colorIconColors = {
    blue: '#61DAFB',
    purple: '#AE81FF',
    green: '#A6E22E',
    orange: '#FD971F',
    red: '#F92672'
  };

  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  const simulateTerminal = (project) => {
    setActiveProject(project);
    setTimeout(() => setActiveProject(null), 3000);
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const filterVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    active: { scale: 1.1 }
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-terminal relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, var(--color-syntax-blue) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, var(--color-syntax-purple) 0%, transparent 20%),
            radial-gradient(circle at 50% 50%, var(--color-syntax-green) 0%, transparent 30%)
          `,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer shadow-lg">
            $ cd ./projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal mb-4">
            <span className="text-syntax-blue">class</span>{' '}
            <span className="text-syntax-green">Projects</span>{' '}
            <span className="text-syntax-blue">{'{'}</span>
          </h2>
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer">
            // Full-stack applications and AI integration projects
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div 
          className="flex flex-wrap gap-3 justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-developer-secondary font-mono-developer">
            <FaFilter /> $ filter:
          </div>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              onHoverStart={() => setFilterHover(category)}
              onHoverEnd={() => setFilterHover(null)}
              variants={filterVariants}
              initial="initial"
              whileHover="hover"
              animate={filter === category ? "active" : "initial"}
              className={`px-4 py-2 rounded-lg font-mono-developer text-sm transition-all ${
                filter === category
                  ? 'bg-developer-secondary border border-syntax-blue text-syntax-blue shadow-lg'
                  : 'bg-developer-secondary text-developer-secondary border border-developer hover:border-syntax-blue hover:text-terminal'
              }`}
            >
              {category === 'all' ? '*' : category}
              {filterHover === category && (
                <motion.span 
                  className="ml-2 text-syntax-green"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <FaChevronRight />
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Active Project Terminal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-8 terminal-window"
            >
              <div className="terminal-header">
                <div className="terminal-dot red animate-pulse"></div>
                <div className="terminal-dot yellow animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="terminal-dot green animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                  building — {activeProject.title}
                </div>
              </div>
              <div className="terminal-body">
                <motion.div 
                  className="font-mono-developer text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <motion.div className="text-syntax-green">$ npm run build</motion.div>
                  <motion.div className="text-terminal mt-2">
                    Building project: <span className="text-syntax-blue">{activeProject.title}</span>
                  </motion.div>
                  <motion.div className="text-terminal">
                    Status: <span className="text-syntax-green">In progress...</span>
                  </motion.div>
                  <motion.div className="mt-4">
                    <div className="text-syntax-blue">[</div>
                    <div className="ml-4 text-syntax-green">tech</div>
                    <div className="ml-8">: {activeProject.tech.slice(0, 3).join(', ')}</div>
                    <div className="ml-4 text-syntax-green">status</div>
                    <div className="ml-8">: <span className="text-syntax-green">{activeProject.status}</span></div>
                    <div className="text-syntax-blue">]</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={projectVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="relative group"
            >
              <div className="bg-developer-secondary rounded-xl overflow-hidden border border-developer hover:border-syntax-blue transition-all duration-300 card-developer h-full">
                {/* Project Header */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-terminal to-developer-tertiary">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <FaCode className="text-terminal text-6xl" />
                  </div>
                  
                  {/* Status badge */}
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <span className={`px-3 py-1 rounded-lg text-xs font-mono-developer border ${
                      project.status === 'Completed' 
                        ? 'border-syntax-green text-syntax-green bg-developer-secondary'
                        : 'border-syntax-blue text-syntax-blue bg-developer-secondary'
                    } flex items-center gap-1`}>
                      {project.status === 'Completed' ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-syntax-green animate-pulse"></span>
                          {project.status}
                        </>
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-syntax-blue animate-pulse"></span>
                          {project.status}
                        </>
                      )}
                    </span>
                  </motion.div>
                  
                  {/* Category badge */}
                  <motion.div 
                    className="absolute bottom-4 left-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className="px-3 py-1 rounded-lg text-xs font-mono-developer bg-terminal/80 text-terminal border border-developer backdrop-blur-sm">
                      {project.category}
                    </span>
                  </motion.div>
                  
                  {/* Hover overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-terminal/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 0.5 : 0 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-terminal mb-2 font-mono-developer group-hover:text-syntax-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-syntax-blue font-mono-developer mb-3 text-sm">
                    {project.subtitle}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-developer-secondary mb-4">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{project.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaTag />
                      <span>{project.category}</span>
                    </div>
                  </div>

                  <p className="text-developer-secondary mb-6 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-terminal text-developer-secondary rounded-lg text-xs font-mono-developer border border-developer hover:border-syntax-blue hover:text-terminal transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-terminal text-developer-secondary rounded-lg text-xs font-mono-developer border border-developer">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </motion.div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex-1 bg-terminal border border-developer text-terminal py-2.5 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-all text-sm text-center relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        $ view_details() <FaArrowRight />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/10 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </Link>
                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-terminal border border-developer text-developer-secondary flex items-center justify-center rounded-lg hover:border-syntax-blue hover:text-syntax-blue transition-colors relative overflow-hidden"
                          title="View on GitHub"
                        >
                          <FaGithub />
                          <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/10 to-syntax-blue/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </motion.a>
                      )}
                      {project.liveDemo && (
                        <motion.a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-terminal border border-developer text-developer-secondary flex items-center justify-center rounded-lg hover:border-syntax-green hover:text-syntax-green transition-colors relative overflow-hidden"
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt />
                          <div className="absolute inset-0 bg-gradient-to-r from-syntax-green/0 via-syntax-green/10 to-syntax-green/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No projects found */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl text-developer-tertiary mb-4">{"{ }"}</div>
            <h3 className="text-xl font-bold text-developer-secondary mb-2 font-mono-developer">
              // No projects found
            </h3>
            <p className="text-developer-secondary font-mono-developer">
              $ try: npm run filter --category="{filter}"
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadMoreProjects}
              className="px-8 py-3 border border-syntax-blue text-syntax-blue rounded-lg font-mono-developer hover:bg-syntax-blue/10 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                $ load_more({filteredProjects.length - visibleProjects}) <FaArrowRight />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/10 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </motion.button>
          </motion.div>
        )}

        {/* Project Stats */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { value: `${projects.length}+`, label: 'Projects', color: 'syntax-blue', icon: <FaCode /> },
            { value: '95%', label: 'Success Rate', color: 'syntax-green', icon: <FaRocket /> },
            { value: '25+', label: 'Happy Clients', color: 'syntax-purple', icon: <FaTerminal /> },
            { value: '10k+', label: 'Lines of Code', color: 'syntax-orange', icon: <FaCode /> },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-blue transition-colors relative group"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className={`text-3xl font-bold mb-2 font-mono-developer text-${stat.color} flex items-center justify-center gap-2`}>
                {stat.icon}
                {stat.value}
              </div>
              <div className="text-developer-secondary font-mono-developer text-sm">
                {stat.label}
              </div>
              <div className="mt-3 w-full h-1 bg-terminal rounded-full overflow-hidden">
                <motion.div 
                  className={`h-1 bg-${stat.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1 + index * 0.1, duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .card-developer {
          transition: all 0.3s ease;
        }
        
        .card-developer:hover {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2),
                      0 0 60px rgba(102, 217, 239, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .terminal-window {
          background: linear-gradient(135deg, var(--color-developer-secondary), var(--color-developer));
          border-radius: 0.75rem;
          border: 1px solid var(--color-developer);
          overflow: hidden;
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .terminal-header {
          background: linear-gradient(to right, var(--color-developer), var(--color-developer-secondary));
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--color-developer);
        }
        
        .terminal-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          margin-right: 0.5rem;
          display: inline-block;
        }
        
        .terminal-dot.red {
          background: linear-gradient(135deg, #ff5f56, #ff2b2b);
        }
        
        .terminal-dot.yellow {
          background: linear-gradient(135deg, #ffbd2e, #ff9500);
        }
        
        .terminal-dot.green {
          background: linear-gradient(135deg, #27c93f, #00c700);
        }
        
        .terminal-body {
          background: transparent;
          font-family: 'Fira Code', 'Consolas', monospace;
          padding: 1.5rem;
        }
      `}</style>
    </section>
  );
};

export default Projects;