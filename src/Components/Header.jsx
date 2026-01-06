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
  FaUser
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ darkMode, toggleDarkMode, activeSection, onSectionChange, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const menuRef = useRef(null);
  const location = useNavigate();
  const currentPath = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome, path: '/', color: 'syntax-blue' },
    
    { id: 'services', label: 'Services', icon: FaCogs, path: '#services', color: 'syntax-purple' },
    
    { id: 'blog', label: 'Blog', icon: FaBlog, path: '/blog', color: 'syntax-red' },
    { id: 'education', label: 'Education', icon: FaGraduationCap, path: '#education', color: 'syntax-yellow' },
    { id: 'contact', label: 'Contact', icon: FaEnvelope, path: '#contact', color: 'syntax-blue' },
  ];

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(true), 800);
    return () => clearTimeout(timer);
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
    }
    onSectionChange(item.id);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Muhammad_Asad_Kamal_Shah_CV.pdf';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    }
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
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center group-hover:border-syntax-blue transition-colors relative overflow-hidden">
                <FaTerminal className="text-syntax-blue text-lg relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/20 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-xl font-bold font-mono-developer text-terminal whitespace-nowrap"
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isTyping ? (
                    <span className="flex items-center">
                    
                      <span className="text-terminal">@</span>
                      <span className="text-syntax-blue">maks</span>
                      <span className="text-terminal">:</span>
                      <span className="text-syntax-purple">~</span>
                      <span className="text-syntax-green">$</span>
                      <motion.span
                        className={`inline-block w-2 h-5 ml-1 bg-syntax-green ${
                          cursorVisible ? 'opacity-100' : 'opacity-0'
                        } transition-opacity`}
                        animate={{ opacity: cursorVisible ? 1 : 0 }}
                      ></motion.span>
                    </span>
                  ) : (
                    <span className="text-terminal">maks</span>
                  )}
                </motion.span>
              </div>
              <motion.div 
                className="h-0.5 bg-gradient-to-r from-syntax-blue via-syntax-green to-syntax-purple"
                initial={{ width: 0 }}
                animate={{ width: isTyping ? '100%' : 0 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              ></motion.div>
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
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono-developer text-sm transition-all whitespace-nowrap group ${
                        isActivePage(item.path)
                          ? 'bg-developer-secondary text-terminal' 
                          : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary'
                      }`}
                    >
                      {/* Hover effect line */}
                      <motion.div 
                        className={`absolute bottom-0 left-0 h-0.5 bg-${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeHover === item.id || isActivePage(item.path) ? '100%' : 0 
                        }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                      
                      {/* Animated background on active */}
                      {isActivePage(item.path) && (
                        <motion.div 
                          className={`absolute inset-0 rounded-lg bg-${item.color}/10 border border-${item.color}`}
                          layoutId="activeNavItem"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        ></motion.div>
                      )}
                      
                      <item.icon className={`text-sm flex-shrink-0 text-${item.color}`} />
                      <span className="relative z-10">{item.label}</span>
                      
                      {/* Hover arrow */}
                      <motion.div 
                        className="absolute -right-2 text-xs opacity-0 group-hover:opacity-100 text-syntax-green"
                        animate={{ x: activeHover === item.id ? 2 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronRight />
                      </motion.div>
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      onClick={(e) => handleNavClick(item, e)}
                      onMouseEnter={() => setActiveHover(item.id)}
                      onMouseLeave={() => setActiveHover(null)}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-mono-developer text-sm transition-all whitespace-nowrap group ${
                        isActiveSection(item.id) 
                          ? 'bg-developer-secondary text-terminal' 
                          : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary'
                      }`}
                    >
                      {/* Hover effect line */}
                      <motion.div 
                        className={`absolute bottom-0 left-0 h-0.5 bg-${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeHover === item.id || isActiveSection(item.id) ? '100%' : 0 
                        }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                      
                      {/* Animated background on active */}
                      {isActiveSection(item.id) && (
                        <motion.div 
                          className={`absolute inset-0 rounded-lg bg-${item.color}/10 border border-${item.color}`}
                          layoutId="activeNavItem"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        ></motion.div>
                      )}
                      
                      <item.icon className={`text-sm flex-shrink-0 text-${item.color}`} />
                      <span className="relative z-10">{item.label}</span>
                      
                      {/* Hover arrow */}
                      <motion.div 
                        className="absolute -right-2 text-xs opacity-0 group-hover:opacity-100 text-syntax-green"
                        animate={{ x: activeHover === item.id ? 2 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronRight />
                      </motion.div>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Desktop action buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                className="group relative flex items-center gap-2 bg-developer-secondary border border-developer text-terminal px-4 py-2 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-all whitespace-nowrap text-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaDownload className="text-sm animate-bounce" style={{ animationDelay: '0.5s' }} /> 
                  <span>resume.pdf</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/10 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all relative overflow-hidden ${
                  darkMode 
                    ? 'bg-developer-secondary text-syntax-yellow border border-developer' 
                    : 'bg-developer-secondary text-terminal border border-developer'
                }`}
                aria-label="Toggle theme"
              >
                <div className="relative z-10">
                  {darkMode ? (
                    <FaSun className="text-sm animate-pulse" />
                  ) : (
                    <FaMoon className="text-sm animate-pulse" style={{ animationDelay: '0.3s' }} />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
            </div>

            {/* Mobile buttons */}
            <div className="lg:hidden flex items-center space-x-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  darkMode 
                    ? 'bg-developer-secondary text-syntax-yellow border border-developer' 
                    : 'bg-developer-secondary text-terminal border border-developer'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
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
                  <FaBars className="animate-pulse" />
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
          >
            <div className="py-4 px-4">
              {/* Terminal Header */}
              <div className="mb-4 px-4 py-3 bg-developer-secondary rounded-lg border border-developer">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-syntax-red"></div>
                    <div className="w-2 h-2 rounded-full bg-syntax-yellow"></div>
                    <div className="w-2 h-2 rounded-full bg-syntax-green"></div>
                  </div>
                  <div className="font-mono-developer text-sm text-syntax-green">
                    $ navigation_menu --mobile
                  </div>
                </div>
              </div>
              
              {/* User Info */}
              <motion.div 
                className="mb-6 p-4 bg-gradient-to-r from-syntax-blue/10 to-syntax-purple/10 rounded-lg border border-developer"
                variants={menuItemVariants}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-syntax-blue to-syntax-green flex items-center justify-center text-terminal text-lg font-bold">
                    <FaUser />
                  </div>
                  <div>
                    <div className="font-bold text-terminal font-mono-developer">Muhammad Asad</div>
                    <div className="text-xs text-developer-secondary font-mono-developer">Full Stack Developer</div>
                  </div>
                </div>
              </motion.div>
              
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.id}
                    variants={menuItemVariants}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.path.startsWith('/') ? (
                      <Link
                        to={item.path}
                        onClick={() => {
                          onSectionChange(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono-developer transition-all ${
                          isActivePage(item.path)
                            ? 'bg-developer-secondary text-terminal border' 
                            : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary border border-transparent'
                        } border-${item.color}`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-${item.color}/10 flex items-center justify-center`}>
                          <item.icon className={`text-${item.color}`} />
                        </div>
                        <span>{item.label}</span>
                        {isActivePage(item.path) && (
                          <motion.div 
                            className="ml-auto w-2 h-2 rounded-full bg-syntax-green animate-pulse"
                            layoutId="mobileActiveDot"
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono-developer transition-all ${
                          isActiveSection(item.id) 
                            ? 'bg-developer-secondary text-terminal border' 
                            : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary border border-transparent'
                        } border-${item.color}`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-${item.color}/10 flex items-center justify-center`}>
                          <item.icon className={`text-${item.color}`} />
                        </div>
                        <span>{item.label}</span>
                        {isActiveSection(item.id) && (
                          <motion.div 
                            className="ml-auto w-2 h-2 rounded-full bg-syntax-green animate-pulse"
                            layoutId="mobileActiveDot"
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
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-syntax-blue to-syntax-green text-terminal px-6 py-3 rounded-lg font-mono-developer hover:shadow-lg transition-all group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <FaDownload className="animate-bounce" /> 
                      <span>download_resume()</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-white/10 to-syntax-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </motion.button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator for current section (desktop only) */}
      <motion.div 
        className="hidden lg:block absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-syntax-blue via-syntax-green to-syntax-purple"
        initial={{ width: 0 }}
        animate={{ 
          width: isScrolled ? '100%' : 0,
          transition: { duration: 0.3 }
        }}
      ></motion.div>

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
      `}</style>
    </motion.header>
  );
};

export default Header;