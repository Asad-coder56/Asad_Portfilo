import React, { useState, useEffect } from 'react';
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
  FaGithub
} from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode, activeSection, onSectionChange, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const location = useNavigate();
  const currentPath = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: FaHome, path: '/' },
    
    { id: 'services', label: 'Services', icon: FaCogs, path: '#services' },
   
    { id: 'blog', label: 'Blog', icon: FaBlog, path: '/blog' },
    { id: 'education', label: 'Education', icon: FaGraduationCap, path: '#education' },
    { id: 'contact', label: 'Contact', icon: FaEnvelope, path: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (item, event) => {
    setIsMenuOpen(false);
    onSectionChange(item.id);
    
    if (item.path.startsWith('/')) {
      location(item.path);
    } else if (item.path.startsWith('#')) {
      event.preventDefault();
      scrollToSection(item.id);
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Muhammad_Asad_Kamal_Shah_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check if current page matches nav item
  const isActivePage = (path) => {
    if (path === '/') {
      return currentPath.pathname === '/';
    }
    return currentPath.pathname.startsWith(path);
  };

  return (
    <header 
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
            <div className="w-10 h-10 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center group-hover:border-syntax-blue transition-colors">
              <FaTerminal className="text-syntax-blue text-lg" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-mono-developer text-terminal whitespace-nowrap">
                  {isTyping ? (
                    <span className="typewriter">maks@portfolio:~$</span>
                  ) : (
                    'maks'
                  )}
                </span>
                {isTyping && (
                  <span className="blinking-cursor">_</span>
                )}
              </div>
              <div className="h-0.5 w-0 group-hover:w-full bg-syntax-blue transition-all duration-300"></div>
            </div>
          </Link>
          
          {/* Desktop Navigation - Center aligned */}
          <div className="hidden lg:flex flex-1 justify-center mx-8">
            <ul className="flex items-center space-x-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  {item.path.startsWith('/') ? (
                    <Link
                      to={item.path}
                      onClick={() => handleNavClick(item, { preventDefault: () => {} })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono-developer text-sm transition-all whitespace-nowrap ${
                        isActivePage(item.path)
                          ? 'bg-developer-secondary border border-syntax-blue text-syntax-blue' 
                          : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary border border-transparent hover:border-developer'
                      }`}
                    >
                      <item.icon className="text-sm flex-shrink-0" />
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      onClick={(e) => handleNavClick(item, e)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono-developer text-sm transition-all whitespace-nowrap ${
                        activeSection === item.id 
                          ? 'bg-developer-secondary border border-syntax-blue text-syntax-blue' 
                          : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary border border-transparent hover:border-developer'
                      }`}
                    >
                      <item.icon className="text-sm flex-shrink-0" />
                      {item.label}
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
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 bg-developer-secondary border border-developer text-terminal px-4 py-2 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-all whitespace-nowrap text-sm"
              >
                <FaDownload className="text-sm" /> 
                <span>resume.pdf</span>
              </button>
              
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all ${
                  darkMode 
                    ? 'bg-developer-secondary text-syntax-yellow border border-developer hover:border-syntax-yellow' 
                    : 'bg-developer-secondary text-terminal border border-developer hover:border-syntax-blue'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <FaSun className="text-sm" />
                ) : (
                  <FaMoon className="text-sm" />
                )}
              </button>
            </div>

            {/* Mobile buttons */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  darkMode 
                    ? 'bg-developer-secondary text-syntax-yellow border border-developer' 
                    : 'bg-developer-secondary text-terminal border border-developer'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${
                  darkMode 
                    ? 'bg-developer-secondary text-terminal border border-developer' 
                    : 'bg-developer-secondary text-terminal border border-developer'
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 animate-slideDown bg-terminal border border-developer rounded-lg mt-2 mx-4 shadow-terminal z-50">
              <div className="py-4 px-4">
                <div className="mb-4 px-4 py-2 bg-developer-secondary rounded-lg">
                  <div className="font-mono-developer text-sm text-syntax-green">
                    $ navigation_menu
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      {item.path.startsWith('/') ? (
                        <Link
                          to={item.path}
                          onClick={() => handleNavClick(item, { preventDefault: () => {} })}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono-developer transition-all ${
                            isActivePage(item.path)
                              ? 'bg-developer-secondary border border-syntax-blue text-syntax-blue' 
                              : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary border border-transparent hover:border-developer'
                          }`}
                        >
                          <item.icon className="text-lg flex-shrink-0" />
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.path}
                          onClick={(e) => handleNavClick(item, e)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono-developer transition-all ${
                            activeSection === item.id 
                              ? 'bg-developer-secondary border border-syntax-blue text-syntax-blue' 
                              : 'text-developer-secondary hover:text-terminal hover:bg-developer-secondary border border-transparent hover:border-developer'
                          }`}
                        >
                          <item.icon className="text-lg flex-shrink-0" />
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                  
                  <li className="pt-4 mt-4 border-t border-developer">
                    <button
                      onClick={handleDownloadCV}
                      className="w-full flex items-center justify-center gap-2 bg-developer-secondary border border-developer text-terminal px-6 py-3 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-all"
                    >
                      <FaDownload /> download_resume()
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;