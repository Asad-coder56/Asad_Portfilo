import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaDownload, 
  FaMoon, 
  FaSun, 
  FaBars, 
  FaTimes,
  FaHome,
  FaCogs,
  FaBlog,
  FaGraduationCap,
  FaEnvelope,
  FaTerminal,
  FaUser,
  FaKeyboard,
  FaBug,
  FaServer
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ darkMode, toggleDarkMode, activeSection, onSectionChange, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [binaryRain, setBinaryRain] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  
  const menuRef = useRef(null);
  const scrollTimeout = useRef(null);
  const animationFrame = useRef(null);
  const location = useLocation();
  const terminalText = "maks@portfolio:~$ ";

  // Simplified nav items
  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome, path: '/', color: 'syntax-blue' },
    { id: 'services', label: 'Services', icon: FaCogs, path: '#services', color: 'syntax-orange' },
    { id: 'blog', label: 'Blog', icon: FaBlog, path: '/blog', color: 'syntax-red' },
    { id: 'education', label: 'Education', icon: FaGraduationCap, path: '#education', color: 'syntax-yellow' },
    { id: 'contact', label: 'Contact', icon: FaEnvelope, path: '#contact', color: 'syntax-cyan' },
  ];

  // Optimized typing animation - using requestAnimationFrame
  useEffect(() => {
    let mounted = true;
    let animationId = null;
    let currentText = '';
    let charIndex = 0;
    
    const typeNextChar = () => {
      if (!mounted) return;
      
      if (charIndex < terminalText.length) {
        currentText += terminalText.charAt(charIndex);
        setTypingText(currentText);
        charIndex++;
        animationId = requestAnimationFrame(() => {
          setTimeout(typeNextChar, 100);
        });
      }
    };
    
    typeNextChar();
    
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => {
      mounted = false;
      clearInterval(cursorInterval);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  // Optimized binary rain - reduced number and complexity
  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable on mobile
    
    const generateBinaryDrops = () => {
      const drops = [];
      const binaryChars = ['0', '1'];
      
      for (let i = 0; i < 8; i++) { // Reduced from 15 to 8
        drops.push({
          id: i,
          char: Math.random() > 0.5 ? binaryChars[0] : binaryChars[1],
          color: `text-syntax-${Math.random() > 0.66 ? 'green' : Math.random() > 0.5 ? 'blue' : 'purple'}`,
          left: `${Math.random() * 100}%`,
          speed: 1 + Math.random() * 2, // Faster speed
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
          char: Math.random() > 0.5 ? '0' : '1'
        }))
      );
    }, 3000); // Reduced frequency from 2000ms to 3000ms

    return () => clearInterval(interval);
  }, []);

  // Optimized scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        cancelAnimationFrame(scrollTimeout.current);
      }
      
      scrollTimeout.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        cancelAnimationFrame(scrollTimeout.current);
      }
    };
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

  // Optimized compilation simulation
  const simulateCompilation = useCallback(() => {
    setIsCompiling(true);
    setCompileProgress(0);
    
    const startTime = Date.now();
    const duration = 1000; // Reduced from 2500ms to 1000ms
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setCompileProgress(progress);
      
      if (progress < 100) {
        animationFrame.current = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setIsCompiling(false), 300);
      }
    };
    
    animationFrame.current = requestAnimationFrame(updateProgress);
  }, []);

  // Clean up animation frames
  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const handleNavClick = (item, event) => {
    if (item.path.startsWith('#')) {
      event.preventDefault();
      setIsMenuOpen(false);
      scrollToSection(item.id);
      simulateCompilation();
    }
    onSectionChange(item.id);
  };

  const handleDownloadCV = () => {
    simulateCompilation();
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/cv.pdf';
      link.download = 'Muhammad_Asad_Kamal_Shah_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
  };

  const isActivePage = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/')) return location.pathname.startsWith(path);
    return false;
  };

  const isActiveSection = (id) => activeSection === id;

  // Simplified animations
  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-terminal/95 backdrop-blur-lg shadow-lg border-b border-developer' 
          : 'bg-terminal/90 backdrop-blur-sm'
      }`}
    >
      {/* Simplified Binary Rain - only on desktop */}
      {binaryRain.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          {binaryRain.map((drop) => (
            <div
              key={drop.id}
              className={`absolute ${drop.color} ${drop.size} font-mono font-bold opacity-30`}
              style={{ 
                left: drop.left,
                top: `${(Date.now() / drop.speed) % 100}%`,
                animation: `fall ${drop.speed}s linear infinite`
              }}
            >
              {drop.char}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => {
              onSectionChange('home');
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="w-10 h-10 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center">
              <FaTerminal className="text-syntax-blue text-lg" />
            </div>
            <div className="flex flex-col">
              <div className="font-mono text-sm">
                <span className="text-terminal">{typingText}</span>
                <span className={`inline-block w-[2px] h-5 ml-0.5 bg-syntax-green ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                }`}></span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center mx-8">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  {item.path.startsWith('/') ? (
                    <Link
                      to={item.path}
                      onClick={() => onSectionChange(item.id)}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                        isActivePage(item.path)
                          ? 'bg-developer-secondary text-terminal border border-developer' 
                          : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary'
                      }`}
                    >
                      <item.icon className={`text-${item.color}`} />
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      onClick={(e) => handleNavClick(item, e)}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                        isActiveSection(item.id) 
                          ? 'bg-developer-secondary text-terminal border border-developer' 
                          : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary'
                      }`}
                    >
                      <item.icon className={`text-${item.color}`} />
                      <span>{item.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Compilation Progress */}
            <AnimatePresence>
              {isCompiling && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 100, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="hidden md:block"
                >
                  <div className="w-24 h-8 bg-developer-secondary border border-developer rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-syntax-blue to-syntax-green transition-all duration-300"
                      style={{ width: `${compileProgress}%` }}
                    ></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCV}
              className="hidden md:flex items-center gap-2 bg-developer-secondary border border-developer text-terminal px-4 py-2 rounded-lg font-mono hover:border-syntax-blue transition-all text-sm"
            >
              <FaDownload className="text-sm" />
              <span>resume.pdf</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all ${
                darkMode 
                  ? 'bg-developer-secondary text-syntax-yellow border border-developer' 
                  : 'bg-developer-secondary text-terminal border border-developer'
              }`}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg lg:hidden ${
                darkMode 
                  ? 'bg-developer-secondary text-terminal border border-developer' 
                  : 'bg-developer-secondary text-terminal border border-developer'
              }`}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden absolute top-full left-0 right-0 bg-terminal border-x border-b border-developer rounded-b-lg shadow-lg z-50"
          >
            <div className="py-4 px-4">
              <div className="flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-syntax-blue/10 to-syntax-purple/10 rounded-lg border border-developer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-syntax-blue to-syntax-green flex items-center justify-center text-white text-lg font-bold">
                  <FaUser />
                </div>
                <div>
                  <div className="font-bold text-terminal font-mono">Muhammad Asad</div>
                  <div className="text-xs text-developer-secondary font-mono">
                    Full Stack Developer
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.id}
                    variants={menuItemVariants}
                  >
                    {item.path.startsWith('/') ? (
                      <Link
                        to={item.path}
                        onClick={() => {
                          onSectionChange(item.id);
                          setIsMenuOpen(false);
                          simulateCompilation();
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono transition-all ${
                          isActivePage(item.path)
                            ? 'bg-developer-secondary text-terminal border' 
                            : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary'
                        } border-${item.color}`}
                      >
                        <item.icon className={`text-${item.color}`} />
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <a
                        href={item.path}
                        onClick={(e) => {
                          handleNavClick(item, e);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono transition-all ${
                          isActiveSection(item.id) 
                            ? 'bg-developer-secondary text-terminal border' 
                            : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary'
                        } border-${item.color}`}
                      >
                        <item.icon className={`text-${item.color}`} />
                        <span>{item.label}</span>
                      </a>
                    )}
                  </motion.li>
                ))}
                
                <motion.li 
                  className="pt-4 mt-4 border-t border-developer"
                  variants={menuItemVariants}
                >
                  <button
                    onClick={handleDownloadCV}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-syntax-blue to-syntax-green text-terminal px-6 py-3 rounded-lg font-mono hover:shadow-lg transition-all"
                  >
                    <FaDownload /> 
                    <span>Download CV</span>
                  </button>
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
            <div 
              className="h-full bg-gradient-to-r from-syntax-blue via-syntax-green to-syntax-purple transition-all duration-300"
              style={{ width: `${compileProgress}%` }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes fall {
          from {
            transform: translateY(-100px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
        
        .backdrop-blur-lg {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </motion.header>
  );
};

export default Header;