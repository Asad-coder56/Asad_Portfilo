import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaChevronRight,
  FaTerminal,
  FaCode,
  FaHeart,
  FaArrowUp,
  FaCoffee,
  FaBug,
  FaServer,
  FaDatabase,
  FaCloud,
  FaHome,
  FaTools,
  FaEnvelope,
  FaGraduationCap,
  FaBlog,
  FaRocket,
  FaBolt,
  FaCube,
  FaMagic
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiDocker } from 'react-icons/si';

const Footer = ({ darkMode = true, setActiveSection, scrollToSection }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [activeCommand, setActiveCommand] = useState(0);
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [cracks, setCracks] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);

  // Define the CSS classes that are missing
  const textClasses = {
    terminal: darkMode ? 'text-white' : 'text-gray-900',
    developerSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
    developerTertiary: darkMode ? 'text-gray-500' : 'text-gray-400',
    syntaxGreen: darkMode ? 'text-green-400' : 'text-green-600',
    syntaxBlue: darkMode ? 'text-blue-400' : 'text-blue-600',
    syntaxPurple: darkMode ? 'text-purple-400' : 'text-purple-600',
    syntaxYellow: darkMode ? 'text-yellow-400' : 'text-yellow-600',
    syntaxOrange: darkMode ? 'text-orange-400' : 'text-orange-600',
    syntaxRed: darkMode ? 'text-red-400' : 'text-red-600'
  };

  const quickLinks = [
    { 
      label: 'Home', 
      path: '/', 
      icon: FaHome, 
      color: textClasses.syntaxBlue,
      isExternal: false,
      onClick: (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    },
    { 
      label: 'Skills', 
      path: '#skills', 
      icon: FaBolt, 
      color: textClasses.syntaxYellow,
      isExternal: true,
      onClick: (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            const element = document.getElementById('skills');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('skills');
            }
          }, 300);
        } else {
          const element = document.getElementById('skills');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection('skills');
          }
        }
      }
    },
    { 
      label: 'Projects', 
      path: '#projects', 
      icon: FaRocket, 
      color: textClasses.syntaxRed,
      isExternal: true,
      onClick: (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            const element = document.getElementById('projects');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('projects');
            }
          }, 300);
        } else {
          const element = document.getElementById('projects');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection('projects');
          }
        }
      }
    },
    { 
      label: 'Services', 
      path: '#services', 
      icon: FaTools, 
      color: textClasses.syntaxPurple,
      isExternal: true,
      onClick: (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            const element = document.getElementById('services');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('services');
            }
          }, 300);
        } else {
          const element = document.getElementById('services');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection('services');
          }
        }
      }
    },
    { 
      label: 'Education', 
      path: '#education', 
      icon: FaGraduationCap, 
      color: textClasses.syntaxGreen,
      isExternal: true,
      onClick: (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            const element = document.getElementById('education');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('education');
            }
          }, 300);
        } else {
          const element = document.getElementById('education');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection('education');
          }
        }
      }
    },
    { 
      label: 'Contact', 
      path: '#contact', 
      icon: FaEnvelope, 
      color: textClasses.syntaxBlue,
      isExternal: true,
      onClick: (e) => {
        e.preventDefault();
        if (window.location.pathname !== '/') {
          navigate('/');
          setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              setActiveSection('contact');
            }
          }, 300);
        } else {
          const element = document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection('contact');
          }
        }
      }
    },
    { 
      label: 'Blog', 
      path: '/blog', 
      icon: FaBlog, 
      color: textClasses.syntaxOrange,
      isExternal: false,
      onClick: (e) => {
        e.preventDefault();
        navigate('/blog');
      }
    }
  ];

  const techStack = [
    { 
      label: 'React', 
      color: textClasses.syntaxBlue, 
      icon: FaTerminal, 
      bgColor: '#61DAFB20' 
    },
    { 
      label: 'Node.js', 
      color: textClasses.syntaxGreen, 
      icon: FaServer, 
      bgColor: '#3C873A20' 
    },
    { 
      label: 'Python', 
      color: textClasses.syntaxBlue, 
      icon: FaCode, 
      bgColor: '#3776AB20' 
    },
    { 
      label: 'TypeScript', 
      color: textClasses.syntaxPurple, 
      icon: SiTypescript, 
      bgColor: '#3178C620' 
    },
    { 
      label: 'MongoDB', 
      color: textClasses.syntaxGreen, 
      icon: FaDatabase, 
      bgColor: '#47A24820' 
    },
    { 
      label: 'Tailwind', 
      color: textClasses.syntaxBlue, 
      icon: SiTailwindcss, 
      bgColor: '#06B6D420' 
    },
    { 
      label: 'Next.js', 
      color: textClasses.terminal, 
      icon: SiNextdotjs, 
      bgColor: '#00000020' 
    },
    { 
      label: 'Docker', 
      color: textClasses.syntaxBlue, 
      icon: SiDocker, 
      bgColor: '#2496ED20' 
    },
    { 
      label: 'AWS', 
      color: textClasses.syntaxOrange, 
      icon: FaCloud, 
      bgColor: '#FF990020' 
    }
  ];

  const socialLinks = [
    { 
      icon: FaGithub, 
      label: 'GitHub', 
      url: 'https://github.com', 
      color: 'hover:text-[#f0f6fc]', 
      bgColor: '#24292e' 
    },
    { 
      icon: FaLinkedin, 
      label: 'LinkedIn', 
      url: 'https://linkedin.com', 
      color: 'hover:text-[#0a66c2]', 
      bgColor: '#0A66C2' 
    },
    { 
      icon: FaTwitter, 
      label: 'Twitter', 
      url: 'https://twitter.com', 
      color: 'hover:text-[#1da1f2]', 
      bgColor: '#1DA1F2' 
    }
  ];

  const terminalCommands = [
    { 
      prefix: '$', 
      command: 'cat README.md', 
      color: textClasses.syntaxGreen,
      output: '// Muhammad Asad Kamal Shah\n// Full Stack Developer & AI Engineer'
    },
    { 
      prefix: '$', 
      command: 'find ./contact_info', 
      color: textClasses.syntaxBlue,
      output: './email: kamalasad57@gmail.com\n./phone: +92 305 1958933\n./location: Mianwali, Pakistan'
    },
    { 
      prefix: '$', 
      command: 'npm run build --production', 
      color: textClasses.syntaxOrange,
      output: '✓ Build successful! Portfolio v2.0 ready for deployment.'
    },
    { 
      prefix: '#', 
      command: '// Thank you for visiting!', 
      color: textClasses.syntaxYellow,
      output: ''
    },
  ];

  // Initialize binary matrix for Matrix-like effect
  useEffect(() => {
    const generateBinaryMatrix = () => {
      const matrix = [];
      for (let i = 0; i < 30; i++) {
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
    
    return () => clearInterval(interval);
  }, [darkMode]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Initialize component
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setShowTerminal(true), 300);
    
    const commandInterval = setInterval(() => {
      setActiveCommand(prev => {
        const next = (prev + 1) % terminalCommands.length;
        if (terminalCommands[next].output) {
          setTimeout(() => {
            setTerminalOutput(prev => [
              ...prev.slice(-3),
              { text: terminalCommands[next].output, type: 'output' }
            ]);
          }, 300);
        }
        return next;
      });
    }, 4000);
    
    // Random crack effects
    const crackInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        const newCrack = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          rotation: Math.random() * 360,
          length: 10 + Math.random() * 30,
        };
        setCracks(prev => [...prev.slice(-2), newCrack]);
      }
    }, 5000);

    // Random glitch text
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        const glitches = [
          'SYSTEM_ERROR',
          'FOOTER_LOADED',
          'CONNECTION_ESTABLISHED',
          'TERMINAL_ACTIVE',
          'BUILD_COMPLETE',
          'DEPLOYMENT_READY'
        ];
        setGlitchText(glitches[Math.floor(Math.random() * glitches.length)]);
        setTimeout(() => setGlitchText(''), 300);
      }
    }, 3000);

    // Simulate compilation on mount
    setTimeout(() => {
      simulateCompilation();
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(commandInterval);
      clearInterval(crackInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  const simulateCompilation = () => {
    setIsCompiling(true);
    setCompileProgress(0);
    
    const interval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setTerminalOutput(prev => [
              ...prev.slice(-3),
              { text: '✓ Final build completed successfully! Ready for deployment.', type: 'success' }
            ]);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  // Floating elements positions
  const floatingElements = [
    { icon: FaCode, color: darkMode ? 'text-blue-400' : 'text-blue-600', delay: '0s', top: '10%', left: '5%' },
    { icon: FaCube, color: darkMode ? 'text-green-400' : 'text-green-600', delay: '0.2s', top: '30%', right: '10%' },
    { icon: FaServer, color: darkMode ? 'text-purple-400' : 'text-purple-600', delay: '0.4s', bottom: '20%', left: '15%' },
    { icon: FaBolt, color: darkMode ? 'text-orange-400' : 'text-orange-600', delay: '0.6s', bottom: '40%', right: '15%' },
    { icon: FaMagic, color: darkMode ? 'text-red-400' : 'text-red-600', delay: '0.8s', top: '50%', left: '10%' },
  ];

  // Scan lines for background
  const scanLines = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    delay: i * 0.1,
    duration: 2 + Math.random() * 2
  }));

  // Handle link clicks
  const handleLinkClick = (link) => (e) => {
    if (link.onClick) {
      link.onClick(e);
    }
  };

  return (
    <motion.footer 
      className="relative overflow-hidden border-t border-gray-800"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
        {[...Array(10)].map((_, i) => (
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

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {scanLines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: '100vh',
              opacity: [0, 0.3, 0]
            }}
            transition={{
              y: {
                duration: line.duration,
                repeat: Infinity,
                delay: line.delay,
                ease: "linear"
              },
              opacity: {
                duration: line.duration / 2,
                repeat: Infinity,
                delay: line.delay,
              }
            }}
            style={{ top: `${line.id * 5}%` }}
          />
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

      {/* Crack Effects */}
      {cracks.map((crack) => (
        <motion.div
          key={crack.id}
          className="absolute pointer-events-none"
          style={{
            left: `${crack.x}%`,
            top: `${crack.y}%`,
            transform: `rotate(${crack.rotation}deg)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="h-0.5 bg-gradient-to-r from-red-500/30 to-transparent"
            style={{ width: `${crack.length}px` }}
          />
        </motion.div>
      ))}

      {/* Glitch Text Overlay */}
      <AnimatePresence>
        {glitchText && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 text-red-500 font-mono font-bold text-sm z-50"
          >
            <div className="relative">
              <div className="text-red-500 blur-[1px]">{glitchText}</div>
              <div className="absolute -top-1 -left-1 text-blue-500 opacity-50">{glitchText}</div>
              <div className="absolute -top-2 -left-2 text-green-500 opacity-30">{glitchText}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
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
                  <span className={`font-mono text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    <FaServer className="inline mr-2 animate-pulse" />
                    Final compilation...
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
                <div className={`ml-3 text-xs sm:text-sm font-mono ${textClasses.developerTertiary}`}>
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    footer_terminal
                  </motion.span>
                  <span className="mx-2">—</span>
                  <span className={textClasses.syntaxGreen}>bash</span>
                  <span className="mx-2">—</span>
                  <span>80×24</span>
                </div>
              </div>
              <div className={`text-xs font-mono ${textClasses.syntaxBlue}`}>
                <FaBug className="inline mr-1" />
                v2.0
              </div>
            </div>
          </div>
          
          <div className="terminal-body p-4 sm:p-6">
            <div className="space-y-3">
              {terminalCommands.map((cmd, index) => (
                <motion.div 
                  key={index}
                  className={`font-mono transition-all duration-300 ${
                    activeCommand === index ? 'opacity-100 scale-105' : 'opacity-70'
                  }`}
                  style={{ color: cmd.color }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className={textClasses.syntaxGreen}>{cmd.prefix} </span>
                  <span>{cmd.command}</span>
                  {activeCommand === index && (
                    <motion.span 
                      className="ml-1 inline-block w-2 h-4"
                      style={{ backgroundColor: cmd.color }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {cmd.output && (
                    <motion.div 
                      className="mt-1 ml-6 text-sm opacity-80 whitespace-pre-line"
                      style={{ color: textClasses.developerSecondary }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {cmd.output}
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              {/* Terminal Output */}
              <AnimatePresence>
                {terminalOutput.map((output, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`font-mono text-sm ${
                      output.type === 'success' 
                        ? textClasses.syntaxGreen
                        : textClasses.developerSecondary
                    }`}
                  >
                    <span className="mr-2">→</span>
                    {output.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Footer Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <motion.div 
                className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 flex items-center justify-center group"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <FaTerminal className={`text-lg ${textClasses.syntaxBlue}`} />
              </motion.div>
              <div>
                <span className={`text-xl font-bold font-mono ${textClasses.terminal}`}>
                  maks@dev
                </span>
                <div className={`h-0.5 w-8 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
              </div>
            </div>
            <p className={`mb-6 text-sm ${textClasses.developerSecondary}`}>
              Building intelligent web applications and integrating AI/ML models into real-world solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 flex items-center justify-center relative group"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: social.bgColor }}
                    />
                    <Icon className={`text-lg relative z-10 ${darkMode ? 'text-white' : 'text-gray-300'} ${social.color}`} />
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
                      {social.label}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-t border-l border-gray-700"></div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className={`text-xl font-bold mb-6 font-mono flex items-center ${textClasses.terminal}`}>
              <span className={`${textClasses.syntaxGreen} mr-2`}>$</span> ls -la
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                  >
                    <button
                      onClick={handleLinkClick(link)}
                      className={`flex items-center hover:text-blue-400 transition-colors font-mono text-sm group w-full text-left ${textClasses.developerSecondary}`}
                    >
                      <motion.span 
                        className={textClasses.syntaxGreen} 
                        mr-2
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <FaChevronRight className="text-sm" />
                      </motion.span>
                      <span className={`mr-2 ${link.color} transition-colors`}>
                        <Icon className="text-sm" />
                      </span>
                      {link.label}
                      <motion.span 
                        className="ml-auto opacity-0 group-hover:opacity-100 text-blue-400"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        _
                      </motion.span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className={`text-xl font-bold mb-6 font-mono ${textClasses.terminal}`}>
              <span className={textClasses.syntaxPurple}>//</span> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.span
                    key={tech.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 text-sm font-mono flex items-center gap-2 group relative`}
                    style={{ 
                      color: tech.color,
                      borderColor: tech.bgColor.replace('20', '50')
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: tech.bgColor }}
                    />
                    <Icon className="text-xs group-hover:animate-spin relative z-10" />
                    <span className="relative z-10">{tech.label}</span>
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h4 className={`text-xl font-bold mb-6 font-mono ${textClasses.terminal}`}>
              <span className={textClasses.syntaxOrange}>$</span> contact_info
            </h4>
            <div className="space-y-4 font-mono text-sm">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className={textClasses.developerSecondary}>// Email</p>
                <a href="mailto:kamalasad57@gmail.com" className={`${textClasses.syntaxBlue} hover:underline group`}>
                  kamalasad57@gmail.com
                  <span className="ml-2 opacity-0 group-hover:opacity-100 animate-pulse">↗</span>
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 }}
              >
                <p className={textClasses.developerSecondary}>// Phone</p>
                <a href="tel:+923051958933" className={`${textClasses.syntaxBlue} hover:underline`}>
                  +92 305 1958933
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <p className={textClasses.developerSecondary}>// Location</p>
                <p className={textClasses.terminal}>Mianwali, Pakistan</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className={`flex items-center justify-center gap-2 font-mono text-sm ${textClasses.developerSecondary}`}
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className={textClasses.syntaxBlue}>&lt;/&gt;</span> {currentYear} Muhammad Asad Kamal Shah
              <FaHeart className="text-red-400 animate-pulse" />
            </motion.p>
            
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 font-mono text-sm group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                color: textClasses.terminal,
                borderColor: darkMode ? 'rgba(102, 217, 239, 0.3)' : 'rgba(59, 130, 246, 0.3)'
              }}
            >
              <FaArrowUp className="group-hover:animate-bounce" /> 
              <span>$ cd ../</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500`} />
            </motion.button>
          </div>
          
          <motion.p 
            className={`mt-4 text-sm font-mono flex items-center justify-center gap-2 ${textClasses.developerSecondary}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <FaCode className="animate-pulse" />
            Built with React, Tailwind CSS, and 
            <FaCoffee className="text-orange-400 animate-pulse-slow" />
            <span className={textClasses.syntaxBlue}>coffee</span>
            <span className={textClasses.syntaxGreen}>// v2.0</span>
          </motion.p>
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
          min-height: 150px;
          max-height: 200px;
          overflow-y: auto;
          background: transparent;
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

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </motion.footer>
  );
};

export default Footer;