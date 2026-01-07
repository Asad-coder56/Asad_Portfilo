import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaDownload, 
  FaMoon, 
  FaSun, 
  FaBars, 
  FaTimes,
  FaHome,
  FaCode,
  FaProjectDiagram,
  FaGraduationCap,
  FaEnvelope,
  FaCogs,
  FaBlog,
  FaTerminal,
  FaGithub,
  FaChevronRight,
  FaUser,
  FaKeyboard,
  FaBug,
  FaRobot,
  FaFingerprint,
  FaServer,
  FaDatabase
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { SiTypescript, SiJavascript, SiPython, SiCplusplus } from 'react-icons/si';

const Header = ({ darkMode, toggleDarkMode, activeSection, onSectionChange, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [activeHover, setActiveHover] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [binaryRain, setBinaryRain] = useState([]);
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  
  const menuRef = useRef(null);
  const typingRef = useRef(null);
  const location = useNavigate();
  const currentPath = useLocation();
  const terminalText = "maks@portfolio:~$ ";

  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome, path: '/', color: 'syntax-blue', command: 'cd ~/portfolio' },
   
    { id: 'services', label: 'Services', icon: FaCogs, path: '#services', color: 'syntax-orange', command: 'python services.py' },
    { id: 'blog', label: 'Blog', icon: FaBlog, path: '/blog', color: 'syntax-red', command: 'git log --oneline' },
    { id: 'education', label: 'Education', icon: FaGraduationCap, path: '#education', color: 'syntax-yellow', command: 'cat education.md' },
    { id: 'contact', label: 'Contact', icon: FaEnvelope, path: '#contact', color: 'syntax-cyan', command: 'curl -X POST /contact' },
  ];

  // Typing animation effect
  useEffect(() => {
    let currentText = '';
    let charIndex = 0;
    const fullText = terminalText;

    const typeChar = () => {
      if (charIndex < fullText.length) {
        currentText += fullText.charAt(charIndex);
        setTypingText(currentText);
        charIndex++;
        setTimeout(typeChar, 100);
      }
    };

    typeChar();

    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Binary rain animation
  useEffect(() => {
    const generateBinaryDrops = () => {
      const drops = [];
      const binaryChars = ['0', '1'];
      const colors = ['text-syntax-green', 'text-syntax-blue', 'text-syntax-purple'];
      
      for (let i = 0; i < 15; i++) {
        drops.push({
          id: i,
          char: Math.random() > 0.5 ? binaryChars[0] : binaryChars[1],
          color: colors[Math.floor(Math.random() * colors.length)],
          left: `${Math.random() * 100}%`,
          speed: 0.5 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.7,
          size: Math.random() > 0.7 ? 'text-xs' : 'text-[10px]'
        });
      }
      return drops;
    };

    setBinaryRain(generateBinaryDrops());

    const interval = setInterval(() => {
      setBinaryRain(prev => 
        prev.map(drop => ({
          ...drop,
          char: Math.random() > 0.5 ? '0' : '1',
          opacity: 0.3 + Math.random() * 0.7
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Code snippets animation
  useEffect(() => {
    const snippets = [
   
    ];

    const shuffledSnippets = [...snippets].sort(() => Math.random() - 0.5).slice(0, 2);
    setCodeSnippets(shuffledSnippets);
  }, []);

  // Compilation animation
  const simulateCompilation = () => {
    setIsCompiling(true);
    setCompileProgress(0);
    
    const interval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsCompiling(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (item, event) => {
    if (item.path.startsWith('#')) {
      event.preventDefault();
      setIsMenuOpen(false);
      scrollToSection(item.id);
      
      // Show compilation effect for coding theme
      simulateCompilation();
    }
    onSectionChange(item.id);
  };

  const handleDownloadCV = () => {
    // Show compilation animation
    simulateCompilation();
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Muhammad_Asad_Kamal_Shah_CV.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  const isActivePage = (path) => {
    if (path === '/') {
      return currentPath.pathname === '/';
    }
    if (path.startsWith('/')) {
      return currentPath.pathname.startsWith(path);
    }
    return false;
  };

  const isActiveSection = (id) => {
    return activeSection === id;
  };

  // Menu variants for animation
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { 
      scale: 1.05,
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 }
    }
  };

  const binaryVariants = {
    fall: (custom) => ({
      y: [0, 100],
      opacity: [0, custom.opacity, 0],
      transition: {
        y: {
          duration: custom.speed,
          repeat: Infinity,
          ease: "linear"
        },
        opacity: {
          duration: custom.speed,
          repeat: Infinity,
          ease: "linear"
        }
      }
    })
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: { 
          duration: 0.6, 
          ease: "easeOut",
          delay: 0.2
        }
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-terminal/95 backdrop-blur-lg shadow-terminal border-b border-developer' 
          : 'bg-terminal/80 backdrop-blur-sm'
      }`}
    >
      {/* Binary Rain Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryRain.map((drop) => (
          <motion.div
            key={drop.id}
            custom={drop}
            variants={binaryVariants}
            animate="fall"
            className={`absolute ${drop.color} ${drop.size} font-mono-developer font-bold opacity-${Math.floor(drop.opacity * 100)}`}
            style={{ left: drop.left, top: '-20px' }}
          >
            {drop.char}
          </motion.div>
        ))}
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex justify-between items-center h-16 md:h-20">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group flex-shrink-0"
            onClick={() => {
              onSectionChange('home');
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <motion.div 
              className="relative"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center group-hover:border-syntax-blue transition-colors relative overflow-hidden group">
                <FaTerminal className="text-syntax-blue text-lg relative z-10 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/20 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Glitch effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-syntax-purple/20 via-transparent to-syntax-green/20 opacity-0 group-hover:opacity-100"
                  animate={{
                    x: [0, 2, -2, 0],
                    opacity: [0, 0.3, 0, 0.3, 0]
                  }}
                  transition={{ duration: 0.5, repeat: 1 }}
                ></motion.div>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="font-mono-developer text-sm">
                  <span className="text-terminal">{typingText}</span>
                  <motion.span
                    className={`inline-block w-[2px] h-5 ml-0.5 bg-syntax-green ${
                      cursorVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    animate={{ opacity: cursorVisible ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  ></motion.span>
                </div>
              </div>
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-syntax-blue via-syntax-green to-syntax-purple relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </motion.div>
            </div>
          </Link>
          
          {/* Desktop Navigation - Center aligned */}
          <div className="hidden lg:flex flex-1 justify-center mx-8">
            <ul className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  {item.path.startsWith('/') ? (
                    <Link
                      to={item.path}
                      onClick={() => onSectionChange(item.id)}
                      onMouseEnter={() => setActiveHover(item.id)}
                      onMouseLeave={() => setActiveHover(null)}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono-developer text-sm transition-all whitespace-nowrap group overflow-hidden ${
                        isActivePage(item.path)
                          ? 'bg-developer-secondary text-terminal border border-developer' 
                          : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary hover:border hover:border-developer'
                      }`}
                    >
                      {/* Hover effect - Code typing */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/10 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      ></motion.div>
                      
                      {/* Command preview on hover */}
                      <motion.div 
                        className="absolute -top-8 left-0 bg-developer border border-developer px-2 py-1 rounded text-xs text-syntax-green font-mono-developer opacity-0 group-hover:opacity-100 whitespace-nowrap"
                        initial={{ y: 10 }}
                        animate={{ y: activeHover === item.id ? -5 : 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.command}
                      </motion.div>
                      
                      <item.icon className={`text-sm flex-shrink-0 text-${item.color}`} />
                      <motion.span 
                        className="relative z-10"
                        animate={{ 
                          color: activeHover === item.id ? `var(--color-${item.color})` : '',
                          textShadow: activeHover === item.id ? `0 0 10px var(--color-${item.color})` : 'none'
                        }}
                      >
                        {item.label}
                      </motion.span>
                      
                      {/* Keyboard shortcut */}
                      <span className="text-xs text-developer-secondary group-hover:text-syntax-green transition-colors">
                        ⌘{index + 1}
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      onClick={(e) => handleNavClick(item, e)}
                      onMouseEnter={() => setActiveHover(item.id)}
                      onMouseLeave={() => setActiveHover(null)}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono-developer text-sm transition-all whitespace-nowrap group overflow-hidden ${
                        isActiveSection(item.id) 
                          ? 'bg-developer-secondary text-terminal border border-developer' 
                          : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary hover:border hover:border-developer'
                      }`}
                    >
                      {/* Hover effect - Code typing */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/10 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      ></motion.div>
                      
                      {/* Command preview on hover */}
                      <motion.div 
                        className="absolute -top-8 left-0 bg-developer border border-developer px-2 py-1 rounded text-xs text-syntax-green font-mono-developer opacity-0 group-hover:opacity-100 whitespace-nowrap"
                        initial={{ y: 10 }}
                        animate={{ y: activeHover === item.id ? -5 : 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.command}
                      </motion.div>
                      
                      <item.icon className={`text-sm flex-shrink-0 text-${item.color}`} />
                      <motion.span 
                        className="relative z-10"
                        animate={{ 
                          color: activeHover === item.id ? `var(--color-${item.color})` : '',
                          textShadow: activeHover === item.id ? `0 0 10px var(--color-${item.color})` : 'none'
                        }}
                      >
                        {item.label}
                      </motion.span>
                      
                      {/* Keyboard shortcut */}
                      <span className="text-xs text-developer-secondary group-hover:text-syntax-green transition-colors">
                        ⌘{index + 1}
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Code Snippets Preview */}
            <motion.div 
              className="hidden md:flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {codeSnippets.map((snippet, index) => (
                <motion.div
                  key={index}
                  className="px-2 py-1 bg-developer-secondary border border-developer rounded text-xs font-mono-developer text-developer-secondary hover:text-terminal cursor-help relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + (index * 0.1) }}
                >
                  <div className="flex items-center gap-1">
                    <snippet.icon className="text-syntax-blue" />
                    <span className="truncate max-w-[80px]">{snippet.code.split('\n')[0]}</span>
                  </div>
                  
                  {/* Full code tooltip */}
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-developer border border-developer p-3 rounded-lg text-xs font-mono-developer text-terminal opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-syntax-red"></div>
                      <div className="w-2 h-2 rounded-full bg-syntax-yellow"></div>
                      <div className="w-2 h-2 rounded-full bg-syntax-green"></div>
                      <span className="text-syntax-blue ml-2">{snippet.language}</span>
                    </div>
                    <pre className="text-syntax-green whitespace-pre-wrap">
                      {snippet.code}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop action buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Compilation Progress */}
              <AnimatePresence>
                {isCompiling && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 100, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative"
                  >
                    <div className="w-24 h-8 bg-developer-secondary border border-developer rounded-lg overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-syntax-blue to-syntax-green"
                        initial={{ width: '0%' }}
                        animate={{ width: `${compileProgress}%` }}
                      ></motion.div>
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-mono-developer text-terminal">
                        {compileProgress < 100 ? 'Compiling...' : '✓ Done!'}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="group relative flex items-center gap-2 bg-developer-secondary border border-developer text-terminal px-4 py-2 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-all whitespace-nowrap text-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaDownload className="text-sm animate-bounce" style={{ animationDelay: '0.5s' }} /> 
                  <span>resume.pdf</span>
                  <FaBug className="text-xs text-syntax-red opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/10 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all relative overflow-hidden group ${
                  darkMode 
                    ? 'bg-developer-secondary text-syntax-yellow border border-developer' 
                    : 'bg-developer-secondary text-terminal border border-developer'
                }`}
                aria-label="Toggle theme"
              >
                <motion.div 
                  className="relative z-10"
                  animate={{ rotate: darkMode ? [0, 360] : 0 }}
                  transition={{ duration: 1, repeat: darkMode ? Infinity : 0 }}
                >
                  {darkMode ? (
                    <FaSun className="text-sm" />
                  ) : (
                    <FaMoon className="text-sm" />
                  )}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>

              {/* Terminal Shortcut */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-developer-secondary border border-developer text-terminal group relative overflow-hidden"
                onClick={() => {
                  simulateCompilation();
                  // Add terminal open logic here
                }}
              >
                <FaKeyboard className="text-sm" />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-developer border border-developer px-2 py-1 rounded text-xs text-syntax-green font-mono-developer opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Ctrl + `
                </div>
              </motion.button>
            </div>

            {/* Mobile buttons */}
            <div className="lg:hidden flex items-center space-x-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg relative overflow-hidden group ${
                  darkMode 
                    ? 'bg-developer-secondary text-syntax-yellow border border-developer' 
                    : 'bg-developer-secondary text-terminal border border-developer'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg relative ${
                  darkMode 
                    ? 'bg-developer-secondary text-terminal border border-developer' 
                    : 'bg-developer-secondary text-terminal border border-developer'
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="animate-spin-in" />
                ) : (
                  <div className="relative">
                    <FaBars />
                    <motion.div 
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-syntax-green"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    ></motion.div>
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden absolute top-full left-0 right-0 bg-terminal border-x border-b border-developer rounded-b-lg mt-2 mx-4 shadow-terminal z-50 overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 79px, rgba(102, 217, 239, 0.1) 79px, transparent 80px),
                linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 100%, 100% 20px'
            }}
          >
            <div className="py-4 px-4 relative">
              {/* Terminal Header with blinking cursor */}
              <motion.div 
                className="mb-4 px-4 py-3 bg-developer-secondary rounded-lg border border-developer relative overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-syntax-red"></div>
                      <div className="w-2 h-2 rounded-full bg-syntax-yellow"></div>
                      <div className="w-2 h-2 rounded-full bg-syntax-green"></div>
                    </div>
                    <div className="font-mono-developer text-sm text-syntax-green">
                      $ navigation_menu --mobile --interactive
                    </div>
                  </div>
                  <motion.div 
                    className="w-2 h-4 bg-syntax-green"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  ></motion.div>
                </div>
              </motion.div>
              
              {/* User Info with animated background */}
              <motion.div 
                className="mb-6 p-4 bg-gradient-to-r from-syntax-blue/10 to-syntax-purple/10 rounded-lg border border-developer relative overflow-hidden group"
                variants={menuItemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/5 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-syntax-blue to-syntax-green flex items-center justify-center text-terminal text-lg font-bold relative">
                    <FaUser />
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-syntax-green"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  </div>
                  <div>
                    <div className="font-bold text-terminal font-mono-developer">Muhammad Asad</div>
                    <div className="text-xs text-developer-secondary font-mono-developer">
                      Full Stack Developer
                      <motion.span 
                        className="ml-2 text-syntax-green"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ●
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.id}
                    variants={menuItemVariants}
                    transition={{ delay: index * 0.05 }}
                    custom={index}
                  >
                    {item.path.startsWith('/') ? (
                      <Link
                        to={item.path}
                        onClick={() => {
                          onSectionChange(item.id);
                          setIsMenuOpen(false);
                          simulateCompilation();
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono-developer transition-all group relative overflow-hidden ${
                          isActivePage(item.path)
                            ? 'bg-developer-secondary text-terminal border' 
                            : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary border border-transparent'
                        } border-${item.color}`}
                      >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                        
                        <div className={`w-8 h-8 rounded-lg bg-${item.color}/10 flex items-center justify-center relative`}>
                          <item.icon className={`text-${item.color}`} />
                          <motion.div 
                            className="absolute inset-0 rounded-lg border border-syntax-blue opacity-0 group-hover:opacity-100"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          ></motion.div>
                        </div>
                        <span>{item.label}</span>
                        <div className="ml-auto text-xs text-developer-secondary group-hover:text-syntax-green transition-colors">
                          {item.command.split(' ')[0]}
                        </div>
                        {isActivePage(item.path) && (
                          <motion.div 
                            className="ml-2 w-2 h-2 rounded-full bg-syntax-green"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          ></motion.div>
                        )}
                      </Link>
                    ) : (
                      <a
                        href={item.path}
                        onClick={(e) => {
                          handleNavClick(item, e);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono-developer transition-all group relative overflow-hidden ${
                          isActiveSection(item.id) 
                            ? 'bg-developer-secondary text-terminal border' 
                            : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary border border-transparent'
                        } border-${item.color}`}
                      >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                        
                        <div className={`w-8 h-8 rounded-lg bg-${item.color}/10 flex items-center justify-center relative`}>
                          <item.icon className={`text-${item.color}`} />
                          <motion.div 
                            className="absolute inset-0 rounded-lg border border-syntax-blue opacity-0 group-hover:opacity-100"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          ></motion.div>
                        </div>
                        <span>{item.label}</span>
                        <div className="ml-auto text-xs text-developer-secondary group-hover:text-syntax-green transition-colors">
                          {item.command.split(' ')[0]}
                        </div>
                        {isActiveSection(item.id) && (
                          <motion.div 
                            className="ml-2 w-2 h-2 rounded-full bg-syntax-green"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          ></motion.div>
                        )}
                      </a>
                    )}
                  </motion.li>
                ))}
                
                <motion.li 
                  className="pt-4 mt-4 border-t border-developer"
                  variants={menuItemVariants}
                >
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadCV}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-syntax-blue to-syntax-green text-terminal px-6 py-3 rounded-lg font-mono-developer hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-white/10 to-syntax-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <FaDownload className="animate-bounce" /> 
                      <span>download_resume()</span>
                    </span>
                  </motion.button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compilation Status Bar */}
      <AnimatePresence>
        {isCompiling && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 4, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute bottom-0 left-0 w-full bg-developer-secondary overflow-hidden"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-syntax-blue via-syntax-green to-syntax-purple"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            ></motion.div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono-developer text-terminal">
              <FaServer className="mr-2 animate-pulse" />
              Compiling portfolio...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes spin-in {
          from {
            transform: rotate(0deg) scale(0.8);
            opacity: 0;
          }
          to {
            transform: rotate(360deg) scale(1);
            opacity: 1;
          }
        }

        .animate-spin-in {
          animation: spin-in 0.3s ease-out forwards;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .shadow-terminal {
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(102, 217, 239, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
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

        @keyframes scan-line {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .scan-line {
          animation: scan-line 10s linear infinite;
        }
      `}</style>
    </motion.header>
  );
};

export default Header;