import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaTerminal, FaCode, FaReact, FaNode, FaPython, FaCloud, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = ({ setActiveSection, scrollToSection }) => {
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeTech, setActiveTech] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const nameRef = useRef(null);

  const roles = ['MERN Stack Developer', 'AI Solutions Engineer', 'Full Stack Developer', 'Cloud Architect'];
  const techStack = [
    { icon: FaReact, name: 'React', color: '#61DAFB' },
    { icon: FaNode, name: 'Node.js', color: '#339933' },
    { icon: FaPython, name: 'Python', color: '#3776AB' },
    { icon: FaDatabase, name: 'MongoDB', color: '#47A248' },
    { icon: FaCloud, name: 'AWS', color: '#FF9900' },
  ];

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

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  // Tech stack rotation
  useEffect(() => {
    const techInterval = setInterval(() => {
      setActiveTech(prev => (prev + 1) % techStack.length);
    }, 3000);
    
    return () => clearInterval(techInterval);
  }, []);

  // Terminal animation
  useEffect(() => {
    const timer = setTimeout(() => setShowTerminal(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    scrollToSection('skills');
  };

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com' },
  ];

  const terminalCommands = [
    { prefix: '>', command: 'npm init portfolio', color: 'text-syntax-purple' },
    { prefix: '>', command: 'git init', color: 'text-syntax-orange' },
    { prefix: '>', command: 'cd ./projects', color: 'text-syntax-blue' },
    { prefix: '$', command: 'echo "Building amazing software..."', color: 'text-syntax-green' },
    { prefix: '#', command: '// Welcome to my developer portfolio', color: 'text-syntax-yellow' },
  ];

  // Floating elements positions
  const floatingElements = [
    { text: '{ }', color: 'text-syntax-blue', delay: '0s', top: '10%', left: '5%' },
    { text: '</>', color: 'text-syntax-green', delay: '0.2s', top: '30%', right: '10%' },
    { text: '[]', color: 'text-syntax-purple', delay: '0.4s', bottom: '20%', left: '15%' },
    { text: '=>', color: 'text-syntax-orange', delay: '0.6s', bottom: '40%', right: '15%' },
    { text: '()', color: 'text-syntax-red', delay: '0.8s', top: '50%', left: '10%' },
  ];

  // Get current tech icon component
  const CurrentTechIcon = techStack[activeTech]?.icon || FaReact;

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-20 md:pt-24 relative overflow-hidden bg-gradient-to-br from-terminal via-developer-secondary to-developer-secondary"
      style={{ scrollMarginTop: '5rem' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-developer) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-developer) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>

        {/* Animated Code Lines */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-px bg-gradient-to-r from-transparent via-syntax-blue to-transparent animate-codeLine"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute text-2xl sm:text-3xl ${element.color} opacity-10`}
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: parseFloat(element.delay),
          }}
        >
          {element.text}
        </motion.div>
      ))}

      {/* Tech Stack Orbital Animation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-5">
        {techStack.map((tech, index) => {
          const TechIcon = tech.icon;
          return (
            <motion.div
              key={tech.name}
              className="absolute w-8 h-8 flex items-center justify-center rounded-full"
              animate={{
                rotate: 360,
                x: Math.cos((index * 2 * Math.PI) / techStack.length) * 120,
                y: Math.sin((index * 2 * Math.PI) / techStack.length) * 120,
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                },
                x: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                },
                y: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              <TechIcon className="text-xl" style={{ color: tech.color }} />
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
            transition={{ duration: 0.8 }}
          >
          

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              ref={nameRef}
            >
              <span className="block text-terminal bg-clip-text">
                Muhammad Asad
              </span>
             <motion.span 
  className="block text-transparent bg-clip-text bg-[#8b61d9]"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
>
  Kamal Shah
</motion.span>

            </h1>

            {/* Role Typing Animation */}
            <div className="h-16 mb-6 flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-developer-secondary rounded-lg px-4 py-2 border border-developer">
                <FaTerminal className="text-syntax-green text-xl animate-pulse" />
                <span className="text-xl sm:text-2xl font-mono-developer text-terminal">
                  <span className="text-syntax-blue">$</span> {text}
                  <span className={`inline-block w-2 h-6 ml-1 bg-syntax-green ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
                </span>
              </div>
            </div>

            {/* Tech Stack Carousel */}
            <motion.div 
              className="mb-8"
              key={activeTech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-3 bg-developer-secondary rounded-lg px-4 py-2 border border-developer">
                <CurrentTechIcon 
                  className="text-xl animate-spin-slow" 
                  style={{ color: techStack[activeTech]?.color }} 
                />
                <span className="text-terminal font-mono-developer">
                  {techStack[activeTech]?.name}
                </span>
              </div>
            </motion.div>

            <p className="text-lg text-developer-secondary mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              I build scalable web applications and integrate AI solutions with over 3 years of experience in full stack development. Passionate about creating efficient, user-friendly digital experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="group px-6 sm:px-8 py-3 sm:py-3.5 bg-developer-secondary border border-developer text-terminal rounded-lg font-mono-developer hover:border-syntax-blue transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-syntax-blue">$</span> view-projects
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/10 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="group px-6 sm:px-8 py-3 sm:py-3.5 border border-syntax-blue text-syntax-blue rounded-lg font-mono-developer hover:bg-syntax-blue hover:text-terminal transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-syntax-blue">&gt;</span> contact-me
                </span>
                <div className="absolute inset-0 bg-syntax-blue/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
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
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center text-terminal hover:text-syntax-blue hover:border-syntax-blue transition-all duration-300 relative group"
                  aria-label={social.label}
                >
                  <social.icon className="text-base sm:text-lg" />
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-terminal text-developer-secondary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {social.label}
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
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="terminal-header">
              <div className="flex items-center">
                <div className="terminal-dot red animate-pulse"></div>
                <div className="terminal-dot yellow animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="terminal-dot green animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="ml-3 text-xs sm:text-sm text-developer-tertiary font-mono-developer">
                  terminal — bash — 80×24
                </div>
              </div>
            </div>
            
            <div className="terminal-body p-4 sm:p-6">
              <div className="space-y-2">
                {terminalCommands.map((cmd, index) => (
                  <motion.div 
                    key={index}
                    className={`font-mono-developer ${cmd.color} text-sm sm:text-base`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <span className="text-syntax-green mr-2">{cmd.prefix}</span>
                    <span>{cmd.command}</span>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="mt-4 sm:mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="font-mono-developer text-syntax-green text-sm sm:text-base">
                    $ npm run build --production
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-syntax-green animate-pulse"></div>
                      <span className="font-mono-developer text-terminal text-sm sm:text-base">
                        Building optimized production bundle...
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-syntax-green animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <span className="font-mono-developer text-terminal text-sm sm:text-base">
                        Compiled successfully!
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-developer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="flex items-center gap-2">
                    <FaCode className="text-syntax-blue text-sm sm:text-base animate-spin-slow" />
                    <span className="font-mono-developer text-terminal text-sm sm:text-base">
                      <span className="text-syntax-blue">const</span>{' '}
                      <span className="text-syntax-green">portfolio</span>{' '}
                      <span className="text-syntax-blue">=</span>{' '}
                      <span className="text-syntax-yellow">{'{'}</span>
                    </span>
                  </div>
                  <div className="ml-4 font-mono-developer text-terminal text-sm sm:text-base">
                    <span className="text-syntax-green">techStack</span>:
                    <span className="text-syntax-yellow"> [</span>
                    {techStack.slice(0, 3).map((tech, i) => {
                      const TechIcon = tech.icon;
                      return (
                        <motion.span 
                          key={tech.name}
                          className="inline-flex items-center gap-1 mx-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.7 + i * 0.1 }}
                        >
                          <TechIcon className="text-xs" style={{ color: tech.color }} />
                          <span className="text-syntax-orange">"{tech.name}"</span>
                          {i < 2 && ','}
                        </motion.span>
                      );
                    })}
                    <span className="text-syntax-yellow">]</span>,
                  </div>
                  <div className="ml-4 font-mono-developer text-terminal text-sm sm:text-base">
                    <span className="text-syntax-green">experience</span>:
                    <span className="text-syntax-orange"> "3+ years"</span>
                  </div>
                  <div className="font-mono-developer text-terminal text-sm sm:text-base">
                    <span className="text-syntax-yellow">{'}'}</span>;
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
            className="flex flex-col items-center text-developer-secondary hover:text-syntax-blue transition-colors font-mono-developer group"
          >
            <span className="text-sm mb-2 animate-pulse">scroll_to_next();</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="group-hover:scale-110 transition-transform"
            >
              <FaArrowDown className="text-xl" />
            </motion.div>
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(90deg, var(--color-syntax-blue), var(--color-syntax-green), var(--color-syntax-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes codeLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        .animate-codeLine {
          animation: codeLine 10s linear infinite;
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
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
          min-height: 300px;
          max-height: 400px;
          overflow-y: auto;
        }

        .terminal-body::-webkit-scrollbar {
          width: 6px;
        }

        .terminal-body::-webkit-scrollbar-track {
          background: var(--color-developer);
        }

        .terminal-body::-webkit-scrollbar-thumb {
          background: var(--color-syntax-blue);
          border-radius: 3px;
        }

        .blinking-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background-color: var(--color-syntax-green);
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
      `}</style>
    </section>
  );
};

export default Hero;