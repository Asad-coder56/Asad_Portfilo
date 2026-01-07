import React, { useEffect, useRef, useState } from 'react';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaArrowDown, 
  FaTerminal, FaCode, FaReact, FaNode, FaPython, 
  FaCloud, FaDatabase, FaChevronRight, FaBolt,
  FaKeyboard, FaBug, FaServer, FaCube, FaMagic
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiDocker } from 'react-icons/si';

const Hero = ({ setActiveSection, scrollToSection, darkMode = true }) => {
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeTech, setActiveTech] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [activeCommand, setActiveCommand] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState([]);
  
  const nameRef = useRef(null);
  const typingRef = useRef(null);

  const roles = [
    'MERN Stack Developer',
    'AI Solutions Engineer', 
    'Full Stack Developer',
    'Cloud Architect',
    'DevOps Engineer',
    'System Designer'
  ];

  const techStack = [
    { icon: FaReact, name: 'React', color: '#61DAFB', command: 'npm run dev' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000', command: 'next build' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6', command: 'tsc --watch' },
    { icon: FaNode, name: 'Node.js', color: '#339933', command: 'node server.js' },
    { icon: FaPython, name: 'Python', color: '#3776AB', command: 'python app.py' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED', command: 'docker-compose up' },
    { icon: FaDatabase, name: 'MongoDB', color: '#47A248', command: 'mongod' },
    { icon: FaCloud, name: 'AWS', color: '#FF9900', command: 'aws deploy' },
  ];

  const terminalCommands = [
    { 
      prefix: '➜', 
      command: 'git init portfolio', 
      color: 'text-syntax-purple',
      output: 'Initialized empty Git repository in ./portfolio/'
    },
    { 
      prefix: '➜', 
      command: 'npm create next-app@latest', 
      color: 'text-syntax-orange',
      output: 'Creating a new Next.js app... ✓'
    },
    { 
      prefix: '➜', 
      command: 'cd ./projects', 
      color: 'text-syntax-blue',
      output: 'Changed directory to projects/'
    },
    { 
      prefix: '$', 
      command: 'echo "Building with TypeScript & React..."', 
      color: 'text-syntax-green',
      output: 'Building with TypeScript & React...'
    },
    { 
      prefix: '#', 
      command: '// Welcome to my developer workspace', 
      color: 'text-syntax-yellow',
      output: ''
    },
  ];

  // Initialize binary matrix for Matrix-like effect
  useEffect(() => {
    const generateBinaryMatrix = () => {
      const matrix = [];
      for (let i = 0; i < 50; i++) {
        matrix.push({
          id: i,
          char: Math.random() > 0.5 ? '0' : '1',
          color: darkMode ? 'text-syntax-green' : 'text-syntax-blue',
          opacity: 0.1 + Math.random() * 0.4,
          speed: 1 + Math.random() * 3,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 10,
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
    }, 100);
    
    return () => clearInterval(interval);
  }, [darkMode]);

  // Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('home');
        }
      },
      { threshold: 0.5 }
    );

    if (nameRef.current) {
      observer.observe(nameRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect for role
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  // Tech stack rotation with command preview
  useEffect(() => {
    const techInterval = setInterval(() => {
      setActiveTech(prev => (prev + 1) % techStack.length);
    }, 2000);
    
    return () => clearInterval(techInterval);
  }, []);

  // Terminal animation and command execution
  useEffect(() => {
    const timer = setTimeout(() => setShowTerminal(true), 500);
    
    // Simulate terminal command execution
    const commandInterval = setInterval(() => {
      setActiveCommand(prev => {
        const next = (prev + 1) % terminalCommands.length;
        if (terminalCommands[next].output) {
          setTimeout(() => {
            setTerminalOutput(prev => [
              ...prev.slice(-5),
              { text: terminalCommands[next].output, type: 'output' }
            ]);
          }, 500);
        }
        return next;
      });
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(commandInterval);
    };
  }, []);

  // Compilation simulation
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
              ...prev.slice(-5),
              { text: '✓ Build successful! Ready for deployment.', type: 'success' }
            ]);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const scrollToNext = () => {
    scrollToSection('skills');
  };

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com', color: 'hover:text-[#f0f6fc]' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-[#0a66c2]' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-[#1da1f2]' },
  ];

  // Floating elements positions
  const floatingElements = [
    { text: '< />', icon: FaCode, color: darkMode ? 'text-syntax-blue' : 'text-blue-600', delay: '0s', top: '10%', left: '5%' },
    { text: '{}', icon: FaCube, color: darkMode ? 'text-syntax-green' : 'text-green-600', delay: '0.2s', top: '30%', right: '10%' },
    { text: '[]', icon: FaServer, color: darkMode ? 'text-syntax-purple' : 'text-purple-600', delay: '0.4s', bottom: '20%', left: '15%' },
    { text: '=>', icon: FaBolt, color: darkMode ? 'text-syntax-orange' : 'text-orange-600', delay: '0.6s', bottom: '40%', right: '15%' },
    { text: '()', icon: FaMagic, color: darkMode ? 'text-syntax-red' : 'text-red-600', delay: '0.8s', top: '50%', left: '10%' },
  ];

  // Get current tech icon component
  const CurrentTechIcon = techStack[activeTech]?.icon || FaReact;

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-20 md:pt-24 relative overflow-hidden"
      style={{ 
        scrollMarginTop: '5rem',
        backgroundColor: darkMode ? '#0a0a0a' : '#000000',
        backgroundImage: darkMode 
          ? `radial-gradient(circle at 20% 30%, rgba(102, 217, 239, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`
          : `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`
      }}
    >
      {/* Matrix Binary Rain Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryMatrix.map((binary) => (
          <motion.div
            key={binary.id}
            className={`absolute ${binary.color} text-xs font-mono-developer font-bold opacity-${Math.floor(binary.opacity * 100)}`}
            style={{ left: binary.left }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: ['-100%', '100vh'],
              opacity: [0, binary.opacity, 0]
            }}
            transition={{
              y: {
                duration: binary.speed * 10,
                repeat: Infinity,
                delay: binary.delay,
                ease: "linear"
              },
              opacity: {
                duration: binary.speed * 5,
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
            ? `linear-gradient(to right, rgba(102, 217, 239, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(102, 217, 239, 0.1) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
        }}
      ></div>

      {/* Animated Code Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-48 h-px ${
              darkMode 
                ? 'bg-gradient-to-r from-transparent via-syntax-blue to-transparent' 
                : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
            }`}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '100vw',
              opacity: [0, 0.3, 0]
            }}
            transition={{
              x: {
                duration: 10 + Math.random() * 10,
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

      {/* Floating Elements with Icons */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-20`}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360],
              y: [0, -50, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: parseFloat(element.delay),
              ease: "linear"
            }}
          >
            <Icon className="text-3xl sm:text-4xl" />
          </motion.div>
        );
      })}

      {/* Tech Stack Orbital Animation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 opacity-5">
        {techStack.map((tech, index) => {
          const TechIcon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              className="absolute w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800"
              animate={{
                rotate: 360,
                x: Math.cos((index * 2 * Math.PI) / techStack.length) * 140,
                y: Math.sin((index * 2 * Math.PI) / techStack.length) * 140,
              }}
              transition={{
                rotate: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                },
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                },
                y: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              whileHover={{ 
                scale: 1.5,
                zIndex: 50,
                boxShadow: `0 0 20px ${tech.color}`
              }}
            >
              <TechIcon className="text-lg md:text-xl" style={{ color: tech.color }} />
            </motion.div>
          );
        })}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            className="text-center lg:text-left pt-8 lg:pt-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Intro line with typing effect */}
            <motion.div 
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FaKeyboard className={darkMode ? 'text-syntax-green' : 'text-green-500'} />
              <span className={`font-mono-developer text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                Press <span className="px-1 py-0.5 bg-gray-900 rounded text-white">⌘</span> + <span className="px-1 py-0.5 bg-gray-900 rounded text-white">K</span> for shortcuts
              </span>
            </motion.div>

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              ref={nameRef}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className={darkMode ? 'text-terminal' : 'text-white'}>Muhammad Asad</span>
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <FaTerminal className={`inline text-2xl ${darkMode ? 'text-syntax-blue' : 'text-blue-500'}`} />
                </motion.span>
              </motion.span>
              <motion.span 
                className={`block ${darkMode ? 'text-syntax-purple' : 'text-purple-400'} mt-2`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Kamal Shah
              </motion.span>
            </h1>

            {/* Role Typing Animation */}
            <div className="h-16 mb-6 flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-800 group relative overflow-hidden">
                <FaTerminal className={`text-xl ${darkMode ? 'text-syntax-green animate-pulse' : 'text-green-500 animate-pulse'}`} />
                <span className="text-xl sm:text-2xl font-mono-developer">
                  <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>$</span>
                  <span className={darkMode ? 'text-terminal' : 'text-white'}> {text}</span>
                  <span className={`inline-block w-2 h-6 ml-1 ${darkMode ? 'bg-syntax-green' : 'bg-green-500'} ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
                </span>
                
                {/* Command preview on hover */}
                <motion.div 
                  className="absolute -top-10 left-0 bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg text-sm font-mono-developer opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  initial={{ y: 10 }}
                  animate={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {techStack[activeTech]?.command}
                </motion.div>
              </div>
            </div>

            {/* Tech Stack Carousel with Command */}
            <motion.div 
              className="mb-8 inline-block"
              key={activeTech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-800 group cursor-help">
                <CurrentTechIcon 
                  className={`text-2xl ${darkMode ? 'animate-spin-slow' : ''}`} 
                  style={{ color: techStack[activeTech]?.color }} 
                />
                <span className={darkMode ? 'text-terminal' : 'text-white'}>{techStack[activeTech]?.name}</span>
                <FaChevronRight className={`${darkMode ? 'text-syntax-green' : 'text-green-500'} text-sm`} />
              </div>
            </motion.div>

            <p className={`text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed ${darkMode ? 'text-developer-secondary' : 'text-gray-300'}`}>
              I architect and build scalable full-stack applications with modern technologies. 
              Specializing in React, Node.js, and cloud solutions with over 3 years of 
              experience delivering high-performance digital products.
            </p>

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
                      <span className="font-mono-developer text-sm text-green-500">
                        <FaServer className="inline mr-2 animate-pulse" />
                        Compiling portfolio...
                      </span>
                      <span className="font-mono-developer text-sm text-white">{compileProgress}%</span>
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  scrollToSection('projects');
                  simulateCompilation();
                }}
                className="group px-6 sm:px-8 py-3.5 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg font-mono-developer hover:border-blue-500 transition-all duration-300 relative overflow-hidden"
              >
                <span className={`relative z-10 flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                  <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>$</span> 
                  <span>view_projects</span>
                  <FaBolt className={`${darkMode ? 'text-syntax-yellow' : 'text-yellow-500'} animate-pulse`} />
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                  darkMode ? '' : 'via-blue-500/20'
                }`}></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="group px-6 sm:px-8 py-3.5 border border-gray-800 rounded-lg font-mono-developer hover:border-green-500 transition-all duration-300 relative overflow-hidden"
              >
                <span className={`relative z-10 flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                  <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>&gt;</span> 
                  <span>contact_me</span>
                  <FaCode className={darkMode ? 'text-syntax-purple' : 'text-purple-500'} />
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                  darkMode ? '' : 'via-green-500/20'
                }`}></div>
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 flex items-center justify-center relative group"
                  aria-label={social.label}
                >
                  <social.icon className={`text-base sm:text-lg ${darkMode ? 'text-terminal' : 'text-gray-300'} ${social.color}`} />
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
                    {social.label}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-t border-l border-gray-700"></div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Terminal */}
          <motion.div 
            className={`terminal-window mt-8 lg:mt-0 ${showTerminal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-700`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(0, 0, 0, 0.9))'
                : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 41, 59, 0.9))'
            }}
          >
            <div className="terminal-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <motion.div 
                    className="terminal-dot red"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <motion.div 
                    className="terminal-dot yellow"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  ></motion.div>
                  <motion.div 
                    className="terminal-dot green"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  ></motion.div>
                  <div className={`ml-3 text-xs sm:text-sm font-mono-developer ${darkMode ? 'text-developer-tertiary' : 'text-gray-400'}`}>
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      terminal
                    </motion.span>
                    <span className="mx-2">—</span>
                    <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>bash</span>
                    <span className="mx-2">—</span>
                    <span>80×24</span>
                  </div>
                </div>
                <div className={`text-xs font-mono-developer ${darkMode ? 'text-syntax-blue' : 'text-blue-500'}`}>
                  <FaBug className="inline mr-1" />
                  v1.0.0
                </div>
              </div>
            </div>
            
            <div className="terminal-body p-4 sm:p-6">
              <div className="space-y-3">
                {terminalCommands.map((cmd, index) => (
                  <motion.div 
                    key={index}
                    className={`font-mono-developer ${cmd.color} text-sm sm:text-base transition-all duration-300 ${
                      activeCommand === index ? 'opacity-100 scale-105' : 'opacity-70'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <span className={`mr-2 ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>{cmd.prefix}</span>
                    <span>{cmd.command}</span>
                    {activeCommand === index && (
                      <motion.span 
                        className="ml-1 inline-block w-2 h-4 bg-current"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      ></motion.span>
                    )}
                    {cmd.output && (
                      <motion.div 
                        className="mt-1 ml-6 text-sm opacity-80"
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
                      className={`font-mono-developer text-sm ${
                        output.type === 'success' 
                          ? (darkMode ? 'text-syntax-green' : 'text-green-500')
                          : (darkMode ? 'text-developer-secondary' : 'text-gray-400')
                      }`}
                    >
                      <span className="mr-2">→</span>
                      {output.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Build Status */}
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-syntax-green animate-pulse' : 'bg-green-500 animate-pulse'}`}></div>
                    <div className={`font-mono-developer text-sm ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>
                      $ npm run build --production
                    </div>
                  </div>
                  <div className="ml-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-syntax-blue' : 'bg-blue-500'}`}></div>
                      <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
                        Bundling JavaScript files...
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-syntax-yellow' : 'bg-yellow-500'}`}></div>
                      <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
                        Minifying CSS and optimizing images...
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Code Snippet */}
                <motion.div 
                  className="mt-6 pt-4 border-t border-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FaCode className={darkMode ? 'text-syntax-blue text-sm animate-spin-slow' : 'text-blue-500 text-sm animate-spin-slow'} />
                    <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
                      <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>const</span>{' '}
                      <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>portfolio</span>{' '}
                      <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>=</span>{' '}
                      <span className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}>{'{'}</span>
                    </span>
                  </div>
                  <div className="ml-4 font-mono-developer text-sm space-y-1">
                    <div>
                      <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>name</span>
                      <span className={darkMode ? 'text-terminal' : 'text-white'}>: </span>
                      <span className={darkMode ? 'text-syntax-orange' : 'text-orange-500'}>"Muhammad Asad"</span>
                      <span className={darkMode ? 'text-terminal' : 'text-white'}>,</span>
                    </div>
                    <div>
                      <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>role</span>
                      <span className={darkMode ? 'text-terminal' : 'text-white'}>: </span>
                      <span className={darkMode ? 'text-syntax-orange' : 'text-orange-500'}>"{roles[loopNum % roles.length]}"</span>
                      <span className={darkMode ? 'text-terminal' : 'text-white'}>,</span>
                    </div>
                    <div>
                      <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>status</span>
                      <span className={darkMode ? 'text-terminal' : 'text-white'}>: </span>
                      <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>true</span>
                    </div>
                  </div>
                  <div className="font-mono-developer text-sm">
                    <span className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}>{'}'}</span>
                    <span className={darkMode ? 'text-terminal' : 'text-white'}>;</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <button
            onClick={scrollToNext}
            className={`flex flex-col items-center font-mono-developer group ${
              darkMode ? 'text-developer-secondary hover:text-syntax-blue' : 'text-gray-400 hover:text-blue-500'
            } transition-colors`}
          >
            <span className="text-sm mb-2 animate-pulse">scroll_down()</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`group-hover:scale-110 transition-transform ${
                darkMode ? 'text-syntax-green' : 'text-green-500'
              }`}
            >
              <FaArrowDown className="text-xl" />
            </motion.div>
            <div className={`mt-2 text-xs opacity-50 ${darkMode ? 'text-developer-tertiary' : 'text-gray-500'}`}>
              Press <span className="px-1 bg-gray-900 rounded">↓</span> or <span className="px-1 bg-gray-900 rounded">Space</span>
            </div>
          </button>
        </motion.div>
      </div>

      <style jsx>{`
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

        .terminal-window {
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
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
          min-height: 400px;
          max-height: 500px;
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

        .blinking-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: #10b981;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;