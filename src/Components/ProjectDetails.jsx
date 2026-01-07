// src/components/ProjectDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaArrowLeft, 
  FaCalendarAlt,
  FaTag,
  FaCode,
  FaRocket,
  FaUsers,
  FaTerminal,
  FaServer,
  FaDatabase,
  FaCogs,
  FaFolder,
  FaFileCode,
  FaHome,
  FaArrowRight,
  FaBolt,
  FaCloud,
  FaMagic,
  FaKeyboard,
  FaCube
} from 'react-icons/fa';

const ProjectDetails = ({ projects, darkMode = true }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [compileProgress, setCompileProgress] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);

  // Initialize binary matrix for Matrix-like effect
  useEffect(() => {
    const generateBinaryMatrix = () => {
      const matrix = [];
      for (let i = 0; i < 25; i++) {
        matrix.push({
          id: i,
          char: Math.random() > 0.5 ? '0' : '1',
          color: darkMode ? 'text-green-400' : 'text-blue-600',
          opacity: 0.05 + Math.random() * 0.1,
          speed: 5 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 5,
        });
      }
      return matrix;
    };
    
    setBinaryMatrix(generateBinaryMatrix());
    
    const interval = setInterval(() => {
      setBinaryMatrix(prev => prev.map(item => ({
        ...item,
        char: Math.random() > 0.5 ? '0' : '1',
      })));
    }, 200);

    // Generate floating elements
    const floatingElements = [
      { icon: FaCode, color: darkMode ? 'text-blue-400' : 'text-blue-600', delay: '0s', top: '15%', left: '5%' },
      { icon: FaServer, color: darkMode ? 'text-green-400' : 'text-green-600', delay: '0.3s', top: '25%', right: '8%' },
      { icon: FaDatabase, color: darkMode ? 'text-purple-400' : 'text-purple-600', delay: '0.6s', bottom: '35%', left: '10%' },
      { icon: FaCube, color: darkMode ? 'text-orange-400' : 'text-orange-600', delay: '0.9s', bottom: '25%', right: '12%' },
    ];
    setFloatingElements(floatingElements);

    // Show terminal after delay
    setTimeout(() => setShowTerminal(true), 300);
    
    // Simulate compilation
    setTimeout(() => {
      simulateCompilation();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [darkMode]);

  const simulateCompilation = () => {
    setIsCompiling(true);
    setCompileProgress(0);
    
    const interval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  useEffect(() => {
    const foundProject = projects?.find(p => p.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/');
    }
  }, [id, projects, navigate]);

  if (!project) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundColor: darkMode ? '#0a0a0a' : '#000000',
          backgroundImage: darkMode 
            ? `radial-gradient(circle at 20% 30%, rgba(102, 217, 239, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`
        }}
      >
        {/* Binary Matrix Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {binaryMatrix.map((binary) => (
            <motion.div
              key={binary.id}
              className={`absolute ${binary.color} text-xs font-mono opacity-50`}
              style={{ 
                left: binary.left,
                opacity: binary.opacity
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: '100vh',
                opacity: [0, binary.opacity, 0]
              }}
              transition={{
                y: {
                  duration: binary.speed,
                  repeat: Infinity,
                  delay: binary.delay,
                  ease: "linear"
                },
                opacity: {
                  duration: binary.speed / 2,
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

        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className={`font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>$ loading_project()</p>
        </div>
      </div>
    );
  }

  const colorClasses = {
    blue: darkMode ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600',
    purple: darkMode ? 'text-purple-400 border-purple-400' : 'text-purple-600 border-purple-600',
    green: darkMode ? 'text-green-400 border-green-400' : 'text-green-600 border-green-600',
    orange: darkMode ? 'text-orange-400 border-orange-400' : 'text-orange-600 border-orange-600',
    red: darkMode ? 'text-red-400 border-red-400' : 'text-red-600 border-red-600'
  };

  const colorBGs = {
    blue: darkMode ? 'bg-blue-400/10' : 'bg-blue-500/10',
    green: darkMode ? 'bg-green-400/10' : 'bg-green-500/10',
    purple: darkMode ? 'bg-purple-400/10' : 'bg-purple-500/10',
    orange: darkMode ? 'bg-orange-400/10' : 'bg-orange-500/10',
    red: darkMode ? 'bg-red-400/10' : 'bg-red-500/10'
  };

  const statusColor = project.status === 'Completed' ? 'green' : 'blue';
  const categoryColor = project.color || 'blue';

  return (
    <section 
      className="pt-24 pb-20 min-h-screen relative overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0a0a0a' : '#000000',
        backgroundImage: darkMode 
          ? `radial-gradient(circle at 20% 30%, rgba(102, 217, 239, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`
          : `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`
      }}
    >
      {/* Binary Matrix Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryMatrix.map((binary) => (
          <motion.div
            key={binary.id}
            className={`absolute ${binary.color} text-xs font-mono opacity-50`}
            style={{ 
              left: binary.left,
              opacity: binary.opacity
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: '100vh',
              opacity: [0, binary.opacity, 0]
            }}
            transition={{
              y: {
                duration: binary.speed,
                repeat: Infinity,
                delay: binary.delay,
                ease: "linear"
              },
              opacity: {
                duration: binary.speed / 2,
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
        className="absolute inset-0"
        style={{
          backgroundImage: darkMode
            ? `linear-gradient(to right, rgba(102, 217, 239, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(102, 217, 239, 0.05) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
        }}
      ></div>

      {/* Animated Code Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-px ${
              darkMode 
                ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
            }`}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '100vw',
              opacity: [0, 0.2, 0]
            }}
            transition={{
              x: {
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              },
              opacity: {
                duration: 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }
            }}
            style={{
              top: `${Math.random() * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-10`}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: parseFloat(element.delay),
              ease: "linear"
            }}
          >
            <Icon className="text-2xl sm:text-3xl" />
          </motion.div>
        );
      })}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compilation Status */}
        <AnimatePresence>
          {isCompiling && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-sm ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                    <FaServer className="inline mr-2 animate-pulse" />
                    Loading project...
                  </span>
                  <span className="font-mono text-sm text-white">{compileProgress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${compileProgress}%` }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-mono group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                <span className="text-blue-400">$</span> cd ..
              </Link>
              
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm"
                >
                  <FaHome /> home
                </Link>
                <span className="text-gray-600">/</span>
                <Link
                  to="/#projects"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm"
                >
                  <FaFolder /> projects
                </Link>
                <span className="text-gray-600">/</span>
                <span className={`font-mono text-sm ${colorClasses[categoryColor].split(' ')[0]}`}>
                  {project.title.split(' ').slice(0, 2).join('_')}
                </span>
              </div>
            </div>
          </div>

          {/* Terminal Window */}
          <motion.div 
            className={`terminal-window mb-8 ${showTerminal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-700`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="terminal-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <motion.div 
                    className="terminal-dot red"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="terminal-dot yellow"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="terminal-dot green"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                  <div className={`ml-3 text-xs sm:text-sm font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      project_viewer
                    </motion.span>
                    <span className="mx-2">—</span>
                    <span className={darkMode ? 'text-green-400' : 'text-green-500'}>details</span>
                    <span className="mx-2">—</span>
                    <span>80×24</span>
                  </div>
                </div>
                <div className={`text-xs font-mono ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                  <FaTerminal className="inline mr-1" />
                  v1.0
                </div>
              </div>
            </div>
            
            <div className="terminal-body p-6">
              <div className="font-mono text-sm">
                <div className={darkMode ? 'text-green-400' : 'text-green-500'}>$ project --view --id={id} --details</div>
                <div className={`mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Title: <span className={colorClasses[categoryColor].split(' ')[0]}>{project.title}</span>
                </div>
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Category: <span className={colorClasses[categoryColor].split(' ')[0]}>{project.category}</span>
                </div>
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Status: <span className={darkMode ? `text-${statusColor}-400` : `text-${statusColor}-600`}>{project.status}</span>
                </div>
                <div className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tech: <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>{project.tech?.length || 0} technologies</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`inline-block px-4 py-1.5 rounded-lg text-sm font-mono border mb-4 ${colorClasses[categoryColor]}`}
                >
                  <FaTag className="inline mr-2" /> {project.category}
                </motion.span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                  {project.title}
                </h1>
                <p className={`text-xl mb-6 ${colorClasses[categoryColor].split(' ')[0]} font-mono`}>
                  {project.subtitle}
                </p>
              </div>
              
              <div className="flex gap-3">
                {project.github && (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-gray-800 px-4 py-2 rounded-lg font-mono hover:border-blue-400 hover:text-blue-400 transition-colors"
                    style={{ color: darkMode ? '#ffffff' : '#111827' }}
                  >
                    <FaGithub /> $ git clone
                  </motion.a>
                )}
                {project.liveDemo && (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-gray-800 px-4 py-2 rounded-lg font-mono hover:border-green-400 hover:text-green-400 transition-colors"
                    style={{ color: darkMode ? '#ffffff' : '#111827' }}
                  >
                    <FaExternalLinkAlt /> $ run
                  </motion.a>
                )}
              </div>
            </div>

            {/* Project Metadata */}
            <div className="flex flex-wrap gap-4 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-gray-400 font-mono"
              >
                <FaCalendarAlt className={colorClasses[categoryColor].split(' ')[0]} />
                <span>{project.period}</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex items-center gap-2 text-gray-400 font-mono"
              >
                <FaRocket className={colorClasses[categoryColor].split(' ')[0]} />
                <span className={`px-3 py-1 rounded-lg text-sm border ${
                  project.status === 'Completed' 
                    ? 'border-green-400 text-green-400'
                    : 'border-blue-400 text-blue-400'
                }`}>
                  {project.status}
                </span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2 text-gray-400 font-mono"
              >
                <FaUsers className={colorClasses[categoryColor].split(' ')[0]} />
                <span className="text-white">{project.teamSize || 'Solo'}</span>
              </motion.div>
            </div>

            {/* Project Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className={`h-64 md:h-96 rounded-xl overflow-hidden mb-12 ${colorBGs[categoryColor]} border border-gray-800 flex items-center justify-center relative group`}
            >
              <div className="text-center relative z-10">
                <div className={`text-4xl md:text-6xl font-bold mb-4 ${colorClasses[categoryColor].split(' ')[0]}`}>
                  {project.title.split(' ')[0]}
                </div>
                <div className={`text-lg font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  // project-visualization
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </motion.div>
          </div>

          {/* Project Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                  <FaCode className={colorClasses[categoryColor].split(' ')[0]} /> 
                  <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>//</span> Project Overview
                </h2>
                <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-800">
                  <div className="font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {project.fullDescription || project.description}
                  </div>
                </div>
              </motion.div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold mb-6 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                    <span className={darkMode ? 'text-green-400' : 'text-green-500'}>$</span> Key Features
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        className="bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-blue-400 transition-colors group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 ${colorBGs[categoryColor]} ${colorClasses[categoryColor].split(' ')[0]} rounded-lg flex items-center justify-center font-mono group-hover:scale-110 transition-transform`}>
                            {index + 1}
                          </div>
                          <span className="font-medium font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>{feature}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Technology Stack */}
              {project.tech && project.tech.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                    <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>//</span> Technology Stack
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4 + index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-4 py-2 rounded-lg border border-gray-800 hover:${colorClasses[categoryColor]} transition-colors font-mono text-sm ${colorClasses[categoryColor].split(' ')[0]}`}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-8">
                {/* Project Info Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
                >
                  <h3 className="text-xl font-bold mb-4 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                    <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>//</span> Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-mono">status</p>
                      <p className={`font-medium font-mono ${
                        project.status === 'Completed' 
                          ? (darkMode ? 'text-green-400' : 'text-green-600')
                          : (darkMode ? 'text-blue-400' : 'text-blue-600')
                      }`}>
                        {project.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-mono">category</p>
                      <p className="font-medium font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>{project.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-mono">timeline</p>
                      <p className="font-medium font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>{project.period}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-mono">tech_stack</p>
                      <p className="font-medium font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>{project.tech?.length || 0} technologies</p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                  className={`${colorBGs[categoryColor]} rounded-xl p-6 border ${colorClasses[categoryColor]}`}
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                    <FaUsers className={colorClasses[categoryColor].split(' ')[0]} />
                    <span className={colorClasses[categoryColor].split(' ')[0]}>$</span> Interested?
                  </h3>
                  <p className="text-gray-400 mb-6 font-mono text-sm">
                    Want to build something similar? Let's discuss your project requirements.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full bg-black/50 border border-gray-800 py-3 rounded-lg font-mono hover:border-green-400 hover:text-green-400 transition-colors text-center"
                    style={{ color: darkMode ? '#ffffff' : '#111827' }}
                  >
                    <span className={darkMode ? 'text-green-400' : 'text-green-500'}>$</span> start_project()
                  </Link>
                </motion.div>

                {/* Project Stats */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-800 hover:border-blue-400 transition-colors">
                    <div className="text-2xl font-bold mb-1 font-mono text-blue-400">
                      {project.features?.length || 0}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      Features
                    </div>
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-800 hover:border-green-400 transition-colors">
                    <div className="text-2xl font-bold mb-1 font-mono text-green-400">
                      {project.tech?.length || 0}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">
                      Technologies
                    </div>
                  </div>
                </motion.div>

                {/* Challenges & Solutions */}
                {project.challenges && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 }}
                    className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
                  >
                    <h3 className="text-xl font-bold mb-4 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                      <span className={darkMode ? 'text-orange-400' : 'text-orange-500'}>//</span> Challenges
                    </h3>
                    <p className="text-gray-400 font-mono text-sm">
                      {project.challenges}
                    </p>
                  </motion.div>
                )}

                {/* Learnings */}
                {project.learnings && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.9 }}
                    className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
                  >
                    <h3 className="text-xl font-bold mb-4 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                      <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>//</span> Key Learnings
                    </h3>
                    <p className="text-gray-400 font-mono text-sm">
                      {project.learnings}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Code Snippet Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold mb-6 font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
              <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>//</span> Code Preview
            </h3>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800">
              <div className="px-6 py-3 border-b border-gray-800 flex items-center gap-2">
                <FaFolder className={darkMode ? 'text-yellow-400' : 'text-yellow-500'} />
                <span className="font-mono" style={{ color: darkMode ? '#ffffff' : '#111827' }}>project-structure</span>
                <div className="ml-auto flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className={darkMode ? 'text-blue-400' : 'text-blue-500'}>// {project.title} - Main Component</div>
                <div className={darkMode ? 'text-purple-400' : 'text-purple-500'} mt-4>import</div>
                <div className="ml-4" style={{ color: darkMode ? '#ffffff' : '#111827' }}>React</div>
                <div className={darkMode ? 'text-purple-400' : 'text-purple-500'}>from</div>
                <div className="ml-4" style={{ color: darkMode ? '#ffffff' : '#111827' }}>'react';</div>
                <div className="mt-4" style={{ color: darkMode ? '#ffffff' : '#111827' }}>
                  <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>import</span>{' '}
                  <span className={darkMode ? 'text-green-400' : 'text-green-500'}>{'{'}</span>{' '}
                  {project.tech?.slice(0, 3).join(', ')}{' '}
                  <span className={darkMode ? 'text-green-400' : 'text-green-500'}>{'}'}</span>
                </div>
                <div className={darkMode ? 'text-purple-400' : 'text-purple-500'}>from</div>
                <div className="ml-4" style={{ color: darkMode ? '#ffffff' : '#111827' }}>'technologies';</div>
                <div className="mt-4" style={{ color: darkMode ? 'text-blue-400' : 'text-blue-500' }}>// Status: {project.status}</div>
                <div className={darkMode ? 'text-blue-400' : 'text-blue-500'} mt-2>// Last updated: {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 }}
            className="mt-12 pt-8 border-t border-gray-800"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/#projects"
                className="p-4 bg-black/50 border border-gray-800 rounded-lg hover:border-blue-400 transition-colors font-mono group"
              >
                <div className="flex items-center gap-2 text-gray-400 group-hover:text-blue-400">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>$</span> back_to_projects()
                </div>
                <div className="text-white mt-2 text-sm">Return to all projects</div>
              </Link>
              <Link
                to="/contact"
                className="p-4 bg-black/50 border border-gray-800 rounded-lg hover:border-green-400 transition-colors font-mono group"
              >
                <div className="flex items-center gap-2 text-gray-400 group-hover:text-green-400">
                  <span className={darkMode ? 'text-green-400' : 'text-green-500'}>$</span> discuss_project()
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-white mt-2 text-sm">Let's build something together</div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .terminal-window {
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          background: ${darkMode 
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(0, 0, 0, 0.9))'
            : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 41, 59, 0.9))'};
        }

        .terminal-header {
          background: rgba(0, 0, 0, 0.5);
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
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
          box-shadow: 0 0 10px rgba(255, 95, 86, 0.5);
        }

        .terminal-dot.yellow {
          background: linear-gradient(135deg, #ffbd2e, #ff9500);
          box-shadow: 0 0 10px rgba(255, 189, 46, 0.5);
        }

        .terminal-dot.green {
          background: linear-gradient(135deg, #27c93f, #00c700);
          box-shadow: 0 0 10px rgba(39, 201, 63, 0.5);
        }

        .terminal-body {
          font-family: 'Fira Code', 'Consolas', monospace;
          background: transparent;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ProjectDetails;