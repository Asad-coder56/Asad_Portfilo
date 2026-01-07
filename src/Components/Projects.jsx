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
  FaRocket,
  FaPlay,
  FaPause,
  FaBug,
  FaDatabase,
  FaServer,
  FaCog,
  FaBolt,
  FaMicrochip,
  FaKeyboard,
  FaClone,
  FaSync
} from 'react-icons/fa';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiDocker,
  SiAwsamplify, // ✅ FIXED
  SiGit,
  SiVercel
} from 'react-icons/si';


const Projects = ({ projects, setActiveSection, darkMode = true }) => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filterHover, setFilterHover] = useState(null);
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [terminalText, setTerminalText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [codeLines, setCodeLines] = useState([]);
  const [activeCodeLine, setActiveCodeLine] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('projects');
          
          // Generate code lines
          const lines = [
            "const projects = [",
            "  {",
            "    id: 1,",
            "    title: 'AI-Powered Platform',",
            "    tech: ['React', 'Node.js', 'Python'],",
            "    status: 'Completed',",
            "    category: 'AI/ML'",
            "  },",
            "  {",
            "    id: 2,",
            "    title: 'E-Commerce Solution',",
            "    tech: ['Next.js', 'TypeScript', 'MongoDB'],",
            "    status: 'In Progress',",
            "    category: 'Full Stack'",
            "  },",
            "  // ... more projects",
            "];"
          ];
          setCodeLines(lines);
          
          // Start code line animation
          let currentLine = 0;
          const interval = setInterval(() => {
            setActiveCodeLine(prev => {
              if (prev < lines.length - 1) {
                return prev + 1;
              }
              clearInterval(interval);
              return prev;
            });
            currentLine++;
            if (currentLine >= lines.length) {
              clearInterval(interval);
            }
          }, 200);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  // Initialize binary matrix for background
  useEffect(() => {
    const generateBinaryMatrix = () => {
      const matrix = [];
      for (let i = 0; i < 40; i++) {
        matrix.push({
          id: i,
          char: Math.random() > 0.5 ? '0' : '1',
          color: darkMode ? 'text-syntax-green' : 'text-green-500',
          opacity: 0.05 + Math.random() * 0.1,
          speed: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 6,
          size: Math.random() > 0.5 ? 'text-xs' : 'text-[10px]'
        });
      }
      return matrix;
    };
    
    setBinaryMatrix(generateBinaryMatrix());
  }, [darkMode]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

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
    blue: darkMode ? 'border-syntax-blue text-syntax-blue' : 'border-blue-500 text-blue-500',
    purple: darkMode ? 'border-syntax-purple text-syntax-purple' : 'border-purple-500 text-purple-500',
    green: darkMode ? 'border-syntax-green text-syntax-green' : 'border-green-500 text-green-500',
    orange: darkMode ? 'border-syntax-orange text-syntax-orange' : 'border-orange-500 text-orange-500',
    red: darkMode ? 'border-syntax-red text-syntax-red' : 'border-red-500 text-red-500'
  };

  const colorBGs = {
    blue: darkMode ? 'bg-syntax-blue/10' : 'bg-blue-500/10',
    purple: darkMode ? 'bg-syntax-purple/10' : 'bg-purple-500/10',
    green: darkMode ? 'bg-syntax-green/10' : 'bg-green-500/10',
    orange: darkMode ? 'bg-syntax-orange/10' : 'bg-orange-500/10',
    red: darkMode ? 'bg-syntax-red/10' : 'bg-red-500/10'
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
    setIsTerminalRunning(true);
    
    const commands = [
      `$ cd ${project.title.toLowerCase().replace(/\s+/g, '-')}`,
      '> npm install',
      '> npm run build',
      '> npm test',
      '> npm run deploy'
    ];
    
    commands.forEach((cmd, index) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, { text: cmd, type: 'command' }]);
        
        // Add output after command
        setTimeout(() => {
          const outputs = [
            'Installing dependencies... ✓',
            'Building project... ✓',
            'Running tests... ✓',
            'Deployment successful! ✅'
          ];
          
          if (index < outputs.length) {
            setTerminalOutput(prev => [...prev, { text: outputs[index], type: 'output' }]);
          }
          
          // Clear terminal after last command
          if (index === commands.length - 1) {
            setTimeout(() => {
              setTerminalOutput([]);
              setActiveProject(null);
              setIsTerminalRunning(false);
            }, 2000);
          }
        }, 500);
      }, index * 1000);
    });
  };

  const runProjectCommand = (command) => {
    setTerminalOutput(prev => [...prev, { text: `$ ${command}`, type: 'command' }]);
    
    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        { text: '> Fetching project data...', type: 'output' },
        { text: '> Building dependency tree...', type: 'output' },
        { text: '> Project compiled successfully!', type: 'output' }
      ]);
    }, 1000);
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
    hover: { scale: 1.05, rotate: 2 },
    active: { scale: 1.1 }
  };

  const techIcons = {
  React: SiReact,
  TypeScript: SiTypescript,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  AWS: SiAwsamplify, // ✅ FIXED
  Git: SiGit,
  Vercel: SiVercel
};


  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0a0a0a' : '#000000',
        backgroundImage: darkMode 
          ? `radial-gradient(circle at 10% 20%, rgba(102, 217, 239, 0.05) 0%, transparent 20%),
             radial-gradient(circle at 90% 80%, rgba(174, 129, 255, 0.05) 0%, transparent 20%),
             radial-gradient(circle at 50% 50%, rgba(166, 226, 46, 0.05) 0%, transparent 30%)`
          : `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 20%),
             radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 20%),
             radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 30%)`
      }}
    >
      {/* Binary Matrix Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryMatrix.map((binary) => (
          <motion.div
            key={binary.id}
            className={`absolute ${binary.color} ${binary.size} font-mono-developer font-bold`}
            style={{ 
              left: binary.left,
              opacity: binary.opacity
            }}
            animate={{ 
              y: ['-100%', '100vh'],
            }}
            transition={{
              y: {
                duration: binary.speed,
                repeat: Infinity,
                delay: binary.delay,
                ease: "linear"
              }
            }}
          >
            {binary.char}
          </motion.div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: darkMode
            ? `linear-gradient(to right, rgba(102, 217, 239, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(102, 217, 239, 0.1) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <FaTerminal className={darkMode ? 'text-syntax-blue' : 'text-blue-500'} />
            <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
              $ cd ./projects && ls -la
            </span>
            <motion.div 
              className="w-2 h-4 ml-2"
              style={{ backgroundColor: darkMode ? '#10B981' : '#10B981' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            ></motion.div>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>class</span>{' '}
            <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>Portfolio</span>{' '}
            <span className={darkMode ? 'text-terminal' : 'text-white'}>{'{'}</span>
            <br />
            <span className="ml-8 text-xl sm:text-2xl">
              <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>projects</span>
              <span className={darkMode ? 'text-terminal' : 'text-white'}>: </span>
              <span className={darkMode ? 'text-syntax-purple' : 'text-purple-500'}>Project</span>
              <span className={darkMode ? 'text-terminal' : 'text-white'}>[]</span>
            </span>
          </h2>
          
          <p className={`text-lg max-w-2xl mx-auto font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
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
          <div className={`flex items-center gap-2 font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
            <FaFilter /> $ filter --type=
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
              className={`px-4 py-2 rounded-lg font-mono-developer text-sm transition-all backdrop-blur-sm border ${
                filter === category
                  ? `${darkMode ? 'bg-syntax-blue/20 border-syntax-blue text-syntax-blue' : 'bg-blue-500/20 border-blue-500 text-blue-500'} shadow-lg`
                  : `${darkMode ? 'bg-black/50 border-gray-800 text-developer-secondary hover:border-syntax-blue hover:text-terminal' : 'bg-black/50 border-gray-700 text-gray-400 hover:border-blue-500 hover:text-white'}`
              }`}
            >
              {category === 'all' ? (
                <span className="flex items-center gap-2">
                  <FaDatabase />
                  <span>all</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {category === 'AI/ML' && <FaMicrochip />}
                  {category === 'Full Stack' && <FaServer />}
                  {category === 'Web App' && <FaCode />}
                  {category === 'API' && <FaBolt />}
                  {category === 'Mobile' && <FaClone />}
                  <span>{category}</span>
                </span>
              )}
              {filterHover === category && (
                <motion.span 
                  className={`ml-2 ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}
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
          {(activeProject || terminalOutput.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-8 terminal-window backdrop-blur-sm"
            >
              <div className="terminal-header">
                <div className="flex items-center">
                  <div className="flex gap-1 mr-3">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-red-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-yellow-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    ></motion.div>
                  </div>
                  <div className={`text-sm font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                    <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>terminal</span>
                    <span className="mx-2">—</span>
                    {activeProject ? (
                      <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>{activeProject.title}</span>
                    ) : (
                      <span>project-execution</span>
                    )}
                  </div>
                </div>
                <div className={`text-xs font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                  {isTerminalRunning ? (
                    <span className="flex items-center gap-2">
                      <span className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}>●</span>
                      <span>Running...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>●</span>
                      <span>Ready</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="terminal-body">
                <div className="font-mono-developer text-sm">
                  <AnimatePresence>
                    {terminalOutput.map((output, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className={`mb-1 ${
                          output.type === 'command'
                            ? (darkMode ? 'text-syntax-blue' : 'text-blue-500')
                            : (darkMode ? 'text-terminal' : 'text-white')
                        }`}
                      >
                        {output.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTerminalRunning && (
                    <motion.div 
                      className={`inline-block w-2 h-4 ${darkMode ? 'bg-syntax-green' : 'bg-green-500'}`}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    ></motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Code Preview */}
        <motion.div 
          className="mb-12 bg-black/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <FaCode className={darkMode ? 'text-syntax-blue' : 'text-blue-500'} />
              <span className={`font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                projects.ts
              </span>
            </div>
            <button
              onClick={() => runProjectCommand('npm run build')}
              className={`px-3 py-1 rounded text-xs font-mono-developer flex items-center gap-2 ${
                darkMode 
                  ? 'bg-syntax-blue/20 text-syntax-blue border border-syntax-blue hover:bg-syntax-blue/30'
                  : 'bg-blue-500/20 text-blue-500 border border-blue-500 hover:bg-blue-500/30'
              }`}
            >
              <FaPlay /> Run
            </button>
          </div>
          <div className="p-6 font-mono-developer text-sm">
            {codeLines.map((line, index) => (
              <motion.div
                key={index}
                className={`mb-1 ${index <= activeCodeLine ? 'opacity-100' : 'opacity-30'}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: index <= activeCodeLine ? 1 : 0.3, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {line.includes('const') ? (
                  <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>{line}</span>
                ) : line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']') ? (
                  <span className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}>{line}</span>
                ) : line.includes('id:') || line.includes('title:') || line.includes('tech:') || line.includes('status:') || line.includes('category:') ? (
                  <>
                    <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>{line.split(':')[0]}:</span>
                    <span className={darkMode ? 'text-terminal' : 'text-white'}>{line.split(':')[1]}</span>
                  </>
                ) : line.includes('//') ? (
                  <span className={darkMode ? 'text-developer-secondary' : 'text-gray-400'}>{line}</span>
                ) : (
                  <span className={darkMode ? 'text-terminal' : 'text-white'}>{line}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

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
              <div className="bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-syntax-blue transition-all duration-300 h-full relative overflow-hidden">
                {/* Animated border effect */}
                <motion.div 
                  className="absolute inset-0 rounded-xl"
                  style={{ 
                    background: `linear-gradient(45deg, transparent, ${colorIconColors.blue}20, transparent)`,
                    opacity: 0
                  }}
                  animate={{ 
                    opacity: hoveredProject === project.id ? 1 : 0,
                    x: ['-100%', '100%']
                  }}
                  transition={{ 
                    opacity: { duration: 0.3 },
                    x: { 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                ></motion.div>

                {/* Project Header */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                  {/* Code background */}
                  <div className="absolute inset-0 opacity-5 p-4">
                    <div className="font-mono-developer text-xs">
                      <div>function {project.title.replace(/\s+/g, '')}() {'{'}</div>
                      <div className="ml-4">const tech = [{project.tech.slice(0, 3).map(t => `'${t}'`).join(', ')}];</div>
                      <div className="ml-4">return buildProject();</div>
                      <div>{'}'}</div>
                    </div>
                  </div>
                  
                  {/* Status badge */}
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <span className={`px-3 py-1 rounded-lg text-xs font-mono-developer border backdrop-blur-sm flex items-center gap-1 ${
                      project.status === 'Completed' 
                        ? (darkMode ? 'border-syntax-green text-syntax-green bg-black/50' : 'border-green-500 text-green-500 bg-black/50')
                        : (darkMode ? 'border-syntax-blue text-syntax-blue bg-black/50' : 'border-blue-500 text-blue-500 bg-black/50')
                    }`}>
                      {project.status === 'Completed' ? (
                        <>
                          <motion.span 
                            className="w-1.5 h-1.5 rounded-full bg-syntax-green"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          ></motion.span>
                          {project.status}
                        </>
                      ) : (
                        <>
                          <motion.span 
                            className="w-1.5 h-1.5 rounded-full bg-syntax-blue"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          ></motion.span>
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
                    <span className={`px-3 py-1 rounded-lg text-xs font-mono-developer ${darkMode ? 'bg-black/50 text-terminal' : 'bg-black/50 text-white'} border border-gray-800 backdrop-blur-sm flex items-center gap-2`}>
                      {project.category === 'AI/ML' && <FaMicrochip />}
                      {project.category === 'Full Stack' && <FaServer />}
                      {project.category === 'Web App' && <FaCode />}
                      {project.category === 'API' && <FaBolt />}
                      {project.category === 'Mobile' && <FaClone />}
                      {project.category}
                    </span>
                  </motion.div>
                </div>

                <div className="p-6 relative z-10">
                  <h3 className={`text-xl font-bold mb-2 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'} group-hover:text-syntax-blue transition-colors`}>
                    {project.title}
                  </h3>
                  <p className={`${darkMode ? 'text-syntax-blue' : 'text-blue-500'} font-mono-developer mb-3 text-sm`}>
                    {project.subtitle}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs mb-4">
                    <div className={`flex items-center gap-1 ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                      <FaCalendarAlt />
                      <span>{project.period}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                      <FaTag />
                      <span>{project.category}</span>
                    </div>
                  </div>

                  <p className={`${darkMode ? 'text-developer-secondary' : 'text-gray-400'} mb-6 text-sm leading-relaxed`}>
                    {project.description}
                  </p>

                  {/* Tech stack with icons */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.tech.slice(0, 4).map((tech) => {
                      const TechIcon = techIcons[tech] || FaCode;
                      return (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-lg text-xs font-mono-developer border backdrop-blur-sm flex items-center gap-2 ${
                            darkMode 
                              ? 'bg-black/50 text-terminal border-gray-800 hover:border-syntax-blue hover:text-terminal'
                              : 'bg-black/50 text-gray-400 border-gray-700 hover:border-blue-500 hover:text-white'
                          } transition-colors`}
                        >
                          <TechIcon className="text-sm" />
                          {tech}
                        </span>
                      );
                    })}
                    {project.tech.length > 4 && (
                      <span className={`px-3 py-1 rounded-lg text-xs font-mono-developer border backdrop-blur-sm ${
                        darkMode 
                          ? 'bg-black/50 text-developer-secondary border-gray-800'
                          : 'bg-black/50 text-gray-500 border-gray-700'
                      }`}>
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </motion.div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/projects/${project.id}`}
                      className="flex-1 bg-black/50 border border-gray-800 py-2.5 rounded-lg font-mono-developer hover:border-syntax-blue transition-all text-sm text-center relative overflow-hidden group backdrop-blur-sm"
                    >
                      <span className={`relative z-10 flex items-center justify-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                        $ view_details() <FaArrowRight />
                      </span>
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                        darkMode ? '' : 'via-blue-500/20'
                      }`}></div>
                    </Link>
                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-black/50 border border-gray-800 flex items-center justify-center rounded-lg relative overflow-hidden backdrop-blur-sm group"
                          title="View on GitHub"
                        >
                          <FaGithub className={`${darkMode ? 'text-developer-secondary group-hover:text-syntax-blue' : 'text-gray-400 group-hover:text-blue-500'} transition-colors`} />
                          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                            darkMode ? '' : 'via-blue-500/20'
                          }`}></div>
                        </motion.a>
                      )}
                      {project.liveDemo && (
                        <motion.a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-black/50 border border-gray-800 flex items-center justify-center rounded-lg relative overflow-hidden backdrop-blur-sm group"
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt className={`${darkMode ? 'text-developer-secondary group-hover:text-syntax-green' : 'text-gray-400 group-hover:text-green-500'} transition-colors`} />
                          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-syntax-green/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                            darkMode ? '' : 'via-green-500/20'
                          }`}></div>
                        </motion.a>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => simulateTerminal(project)}
                        className="w-10 h-10 bg-black/50 border border-gray-800 flex items-center justify-center rounded-lg relative overflow-hidden backdrop-blur-sm group"
                        title="Run Build"
                      >
                        <FaPlay className={`${darkMode ? 'text-developer-secondary group-hover:text-syntax-yellow' : 'text-gray-400 group-hover:text-yellow-500'} transition-colors`} />
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-syntax-yellow/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                          darkMode ? '' : 'via-yellow-500/20'
                        }`}></div>
                      </motion.button>
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
            <div className="text-4xl mb-4 opacity-20">
              {"{"}
              <FaBug className="inline mx-2" />
              {"}"}
            </div>
            <h3 className={`text-xl font-bold mb-2 font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
              // No projects found
            </h3>
            <p className={`font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
              $ try: npm run filter --category="{filter}"
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('all')}
              className={`mt-4 px-4 py-2 rounded-lg font-mono-developer border ${
                darkMode 
                  ? 'border-syntax-blue text-syntax-blue hover:bg-syntax-blue/10'
                  : 'border-blue-500 text-blue-500 hover:bg-blue-500/10'
              }`}
            >
              reset_filter()
            </motion.button>
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
              className={`px-8 py-3 border rounded-lg font-mono-developer relative overflow-hidden group backdrop-blur-sm ${
                darkMode 
                  ? 'border-syntax-blue text-syntax-blue hover:bg-syntax-blue/10'
                  : 'border-blue-500 text-blue-500 hover:bg-blue-500/10'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                $ load_more({filteredProjects.length - visibleProjects}) <FaSync className="animate-spin" />
              </span>
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                darkMode ? '' : 'via-blue-500/20'
              }`}></div>
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
            { 
              value: `${projects.length}+`, 
              label: 'Projects', 
              color: darkMode ? 'text-syntax-blue' : 'text-blue-500', 
              bg: darkMode ? 'bg-syntax-blue' : 'bg-blue-500',
              icon: <FaCode />,
              command: 'npm run projects'
            },
            { 
              value: '95%', 
              label: 'Success Rate', 
              color: darkMode ? 'text-syntax-green' : 'text-green-500', 
              bg: darkMode ? 'bg-syntax-green' : 'bg-green-500',
              icon: <FaRocket />,
              command: 'npm test --coverage'
            },
            { 
              value: '25+', 
              label: 'Happy Clients', 
              color: darkMode ? 'text-syntax-purple' : 'text-purple-500', 
              bg: darkMode ? 'bg-syntax-purple' : 'bg-purple-500',
              icon: <FaTerminal />,
              command: 'client --list'
            },
            { 
              value: '10k+', 
              label: 'Lines of Code', 
              color: darkMode ? 'text-syntax-orange' : 'text-orange-500', 
              bg: darkMode ? 'bg-syntax-orange' : 'bg-orange-500',
              icon: <FaCode />,
              command: 'wc -l src/**/*.js'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-current transition-colors h-full relative overflow-hidden">
                {/* Command preview on hover */}
                <motion.div 
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black border border-gray-800 px-3 py-2 rounded-lg text-xs font-mono-developer opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 ${stat.color}`}
                  initial={{ y: 10 }}
                  animate={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  $ {stat.command}
                </motion.div>
                
                <div className={`text-3xl font-bold mb-2 font-mono-developer ${stat.color} flex items-center justify-center gap-2`}>
                  {stat.icon}
                  {stat.value}
                </div>
                <div className={`font-mono-developer text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                  {stat.label}
                </div>
                <div className="mt-3 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-1 ${stat.bg} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1 + index * 0.1, duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 ${stat.bg.replace('bg-', '')}`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .terminal-window {
          background: rgba(0, 0, 0, 0.7);
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .terminal-header {
          background: rgba(0, 0, 0, 0.5);
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(10px);
        }

        .terminal-body {
          padding: 1.5rem;
          min-height: 100px;
          max-height: 200px;
          overflow-y: auto;
          font-family: 'Fira Code', 'Consolas', monospace;
        }

        .terminal-body::-webkit-scrollbar {
          width: 6px;
        }

        .terminal-body::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        .terminal-body::-webkit-scrollbar-thumb {
          background: rgba(102, 217, 239, 0.5);
          border-radius: 3px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes scan-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .scan-line {
          animation: scan-line 10s linear infinite;
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        .glitch-effect {
          animation: glitch 0.5s infinite;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;