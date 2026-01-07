import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
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
  const [typingSpeed] = useState(150);
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeTech, setActiveTech] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState([]);
  
  const nameRef = useRef(null);
  const typingTimeout = useRef(null);
  const animationFrame = useRef(null);
  const observerRef = useRef(null);

  // Memoize static data to prevent re-renders
  const roles = useMemo(() => [
    'MERN Stack Developer',
    'AI Solutions Engineer', 
    'Full Stack Developer',
    'Cloud Architect',
    'DevOps Engineer',
    'System Designer'
  ], []);

  const techStack = useMemo(() => [
    { icon: FaReact, name: 'React', color: '#61DAFB', command: 'npm run dev' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000', command: 'next build' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6', command: 'tsc --watch' },
    { icon: FaNode, name: 'Node.js', color: '#339933', command: 'node server.js' },
    { icon: FaPython, name: 'Python', color: '#3776AB', command: 'python app.py' },
    { icon: SiDocker, name: 'Docker', color: '#2496ED', command: 'docker-compose up' },
  ], []);

  const terminalCommands = useMemo(() => [
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
      prefix: '$', 
      command: 'echo "Building with TypeScript & React..."', 
      color: 'text-syntax-green',
      output: 'Building with TypeScript & React...'
    },
  ], []);

  const socialLinks = useMemo(() => [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com', color: 'hover:text-[#f0f6fc]' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-[#0a66c2]' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com', color: 'hover:text-[#1da1f2]' },
  ], []);

  // Simplified floating elements
  const floatingElements = useMemo(() => [
    { text: '< />', icon: FaCode, color: 'text-syntax-blue', top: '10%', left: '5%' },
    { text: '{}', icon: FaCube, color: 'text-syntax-green', top: '30%', right: '10%' },
    { text: '[]', icon: FaServer, color: 'text-syntax-purple', bottom: '20%', left: '15%' },
  ], []);

  // Optimized typing effect
  useEffect(() => {
    let mounted = true;
    
    const handleType = () => {
      if (!mounted) return;
      
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(prev => {
        if (isDeleting) {
          return fullText.substring(0, prev.length - 1);
        }
        return fullText.substring(0, prev.length + 1);
      });

      if (!isDeleting && text === fullText) {
        typingTimeout.current = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
      }
    };

    typingTimeout.current = setTimeout(handleType, typingSpeed);
    
    return () => {
      mounted = false;
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  // Optimized tech stack rotation
  useEffect(() => {
    const techInterval = setInterval(() => {
      setActiveTech(prev => (prev + 1) % techStack.length);
    }, 3000); // Reduced frequency
    
    return () => clearInterval(techInterval);
  }, [techStack.length]);

  // Cursor blink effect - optimized
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Observer for active section
  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection('home');
            }
          });
        },
        { threshold: 0.3 } // Reduced threshold
      );
    }

    const currentRef = nameRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observerRef.current?.unobserve(currentRef);
      }
    };
  }, [setActiveSection]);

  // Terminal animation
  useEffect(() => {
    const timer = setTimeout(() => setShowTerminal(true), 500);
    
    // Simulate terminal command execution - simplified
    const commandInterval = setInterval(() => {
      setTerminalOutput(prev => {
        const nextCommand = terminalCommands[prev.length % terminalCommands.length];
        if (prev.length >= 3) {
          return [...prev.slice(-2), { text: nextCommand.output, type: 'output' }];
        }
        return [...prev, { text: nextCommand.output, type: 'output' }];
      });
    }, 4000); // Reduced frequency
    
    return () => {
      clearTimeout(timer);
      clearInterval(commandInterval);
    };
  }, [terminalCommands]);

  // Optimized compilation simulation
  const simulateCompilation = useCallback(() => {
    setIsCompiling(true);
    setCompileProgress(0);
    
    const startTime = Date.now();
    const duration = 1200;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setCompileProgress(progress);
      
      if (progress < 100) {
        animationFrame.current = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsCompiling(false);
          setTerminalOutput(prev => [
            ...prev.slice(-2),
            { text: '✓ Build successful!', type: 'success' }
          ]);
        }, 300);
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

  const scrollToNext = useCallback(() => {
    scrollToSection('skills');
  }, [scrollToSection]);

  // Get current tech icon component
  const CurrentTechIcon = techStack[activeTech]?.icon || FaReact;

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-16 md:pt-20 relative overflow-hidden"
      style={{ 
        scrollMarginTop: '4rem',
        backgroundColor: darkMode ? '#0a0a0a' : '#000000',
        backgroundImage: darkMode 
          ? `radial-gradient(circle at 20% 30%, rgba(102, 217, 239, 0.05) 0%, transparent 50%)`
          : `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)`
      }}
    >
      {/* Simplified Grid Pattern - CSS only */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: darkMode
            ? `linear-gradient(to right, rgba(102, 217, 239, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(102, 217, 239, 0.05) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
        }}
      ></div>

      {/* Simplified Floating Elements - static with CSS animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className={`absolute ${element.color} opacity-10 text-2xl md:text-3xl`}
              style={{
                top: element.top,
                left: element.left,
                right: element.right,
                animation: `float 20s infinite ${index * 2}s linear`,
                willChange: 'transform, opacity'
              }}
            >
              <Icon />
            </div>
          );
        })}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            className="text-center lg:text-left pt-6 lg:pt-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Intro line */}
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-gray-800">
              <FaKeyboard className="text-syntax-green" />
              <span className="font-mono text-xs text-gray-300">
                Press <kbd className="px-1.5 py-0.5 bg-gray-900 rounded text-white">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-900 rounded text-white">K</kbd>
              </span>
            </div>

            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight"
              ref={nameRef}
            >
              <span className="block text-white">
                Muhammad Asad
                <FaTerminal className="inline ml-2 text-syntax-blue text-xl" />
              </span>
              <span className="block text-syntax-purple mt-1">
                Kamal Shah
              </span>
            </h1>

            {/* Role Typing Animation */}
            <div className="h-14 mb-4 flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-800">
                <FaTerminal className="text-syntax-green text-lg" />
                <span className="text-lg sm:text-xl font-mono">
                  <span className="text-syntax-blue">$</span>
                  <span className="text-white ml-2">{text}</span>
                  <span className={`inline-block w-1.5 h-5 ml-1 bg-syntax-green ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
                </span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6 inline-block">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-800">
                <CurrentTechIcon 
                  className="text-xl text-syntax-blue" 
                  style={{ color: techStack[activeTech]?.color }} 
                />
                <span className="text-white">{techStack[activeTech]?.name}</span>
                <FaChevronRight className="text-syntax-green text-sm" />
              </div>
            </div>

            <p className="text-base text-gray-300 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
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
                  className="mb-4"
                >
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-gray-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs text-green-500">
                        <FaServer className="inline mr-1.5" />
                        Compiling...
                      </span>
                      <span className="font-mono text-xs text-white">{compileProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                        style={{ width: `${compileProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
              <button
                onClick={() => {
                  scrollToSection('projects');
                  simulateCompilation();
                }}
                className="group px-5 sm:px-6 py-2.5 bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg font-mono hover:border-blue-500 transition-all duration-300 relative overflow-hidden"
              >
                <span className="text-white text-sm flex items-center gap-1.5">
                  <span className="text-syntax-blue">$</span> 
                  <span>view_projects</span>
                  <FaBolt className="text-syntax-yellow text-xs" />
                </span>
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="group px-5 sm:px-6 py-2.5 border border-gray-800 rounded-lg font-mono hover:border-green-500 transition-all duration-300 relative overflow-hidden"
              >
                <span className="text-white text-sm flex items-center gap-1.5">
                  <span className="text-syntax-green">&gt;</span> 
                  <span>contact_me</span>
                  <FaCode className="text-syntax-purple text-xs" />
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black/30 backdrop-blur-sm border border-gray-800 flex items-center justify-center hover:border-blue-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="text-base text-gray-300 hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Terminal */}
          <motion.div 
            className={`terminal-window mt-6 lg:mt-0 ${showTerminal ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          >
            <div className="terminal-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex gap-1.5">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                  </div>
                  <div className="ml-2 text-xs font-mono text-gray-400">
                    <span>terminal</span>
                    <span className="mx-1">—</span>
                    <span className="text-green-500">bash</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-blue-500">
                  <FaBug className="inline mr-1" />
                  v1.0.0
                </div>
              </div>
            </div>
            
            <div className="terminal-body p-4">
              <div className="space-y-2">
                {terminalCommands.map((cmd, index) => (
                  <div 
                    key={index}
                    className={`font-mono ${cmd.color} text-sm transition-opacity duration-300`}
                  >
                    <span className="mr-1.5 text-green-500">{cmd.prefix}</span>
                    <span>{cmd.command}</span>
                    {cmd.output && (
                      <div className="mt-0.5 ml-4 text-xs text-gray-400">
                        {cmd.output}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Terminal Output */}
                <div className="space-y-1">
                  {terminalOutput.map((output, index) => (
                    <div
                      key={index}
                      className={`font-mono text-xs ${
                        output.type === 'success' 
                          ? 'text-green-500'
                          : 'text-gray-400'
                      }`}
                    >
                      <span className="mr-1.5">→</span>
                      {output.text}
                    </div>
                  ))}
                </div>
                
                {/* Build Status */}
                <div className="mt-4 pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="font-mono text-xs text-green-500">
                      $ npm run build --production
                    </div>
                  </div>
                  <div className="ml-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="font-mono text-xs text-gray-300">
                        Bundling JavaScript files...
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                      <span className="font-mono text-xs text-gray-300">
                        Minifying CSS...
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Code Snippet */}
                <div className="mt-4 pt-3 border-t border-gray-800">
                  <div className="flex items-center gap-1.5 mb-2">
                    <FaCode className="text-syntax-blue text-xs" />
                    <span className="font-mono text-xs text-white">
                      <span className="text-syntax-blue">const</span>{' '}
                      <span className="text-syntax-green">portfolio</span>{' '}
                      <span className="text-syntax-blue">=</span>{' '}
                      <span className="text-syntax-yellow">{'{'}</span>
                    </span>
                  </div>
                  <div className="ml-3 font-mono text-xs space-y-0.5">
                    <div>
                      <span className="text-syntax-green">name</span>
                      <span className="text-white">: </span>
                      <span className="text-orange-400">"Muhammad Asad"</span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-syntax-green">role</span>
                      <span className="text-white">: </span>
                      <span className="text-orange-400">"{roles[loopNum % roles.length]}"</span>
                      <span className="text-white">,</span>
                    </div>
                    <div>
                      <span className="text-syntax-green">status</span>
                      <span className="text-white">: </span>
                      <span className="text-syntax-blue">true</span>
                    </div>
                  </div>
                  <div className="font-mono text-xs text-syntax-yellow">
                    {'}'};
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center font-mono text-gray-400 hover:text-blue-500 transition-colors"
          >
            <span className="text-xs mb-1">scroll_down()</span>
            <div className="text-green-500 animate-bounce">
              <FaArrowDown className="text-lg" />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-10px) translateX(10px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }

        .terminal-window {
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .terminal-header {
          background: rgba(20, 20, 20, 0.8);
          padding: 0.5rem 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .terminal-dot {
          width: 0.625rem;
          height: 0.625rem;
          border-radius: 50%;
        }

        .terminal-dot.red {
          background: #ff5f56;
        }

        .terminal-dot.yellow {
          background: #ffbd2e;
        }

        .terminal-dot.green {
          background: #27c93f;
        }

        .terminal-body {
          font-family: 'Fira Code', 'Consolas', monospace;
          min-height: 300px;
          max-height: 350px;
          overflow-y: auto;
        }

        .terminal-body::-webkit-scrollbar {
          width: 4px;
        }

        .terminal-body::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .terminal-body::-webkit-scrollbar-thumb {
          background: rgba(102, 217, 239, 0.3);
          border-radius: 2px;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .terminal-window {
            transition: none !important;
          }
        }

        /* Optimize for mobile */
        @media (max-width: 640px) {
          .terminal-window {
            max-height: 300px;
          }
          
          .terminal-body {
            font-size: 11px;
            padding: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;