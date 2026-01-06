import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaTerminal, FaCode } from 'react-icons/fa';

const Hero = ({ setActiveSection, scrollToSection }) => {
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showTerminal, setShowTerminal] = useState(false);
  const nameRef = useRef(null);

  const roles = ['MERN Stack Developer', 'AI Solutions Engineer', 'Full Stack Developer'];

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

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center pt-20 md:pt-24 relative overflow-hidden bg-terminal"
      style={{ scrollMarginTop: '5rem' }} // For smooth scrolling anchor links
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="grid-pattern absolute inset-0"></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute top-20 left-10 w-8 h-8 text-syntax-blue opacity-30 animate-bounce">
        {'{ }'}
      </div>
      <div className="absolute top-40 right-20 w-12 h-12 text-syntax-green opacity-30 animate-pulse">
        {'</>'}
      </div>
      <div className="absolute bottom-20 left-1/4 w-10 h-10 text-syntax-purple opacity-30 animate-float">
        {'[]'}
      </div>
      <div className="absolute bottom-40 right-1/3 w-6 h-6 text-syntax-orange opacity-30 animate-spin-slow">
        {'=>'}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left animate-slideInLeft pt-8 lg:pt-0">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer">
                ~/portfolio
              </span>
            </div>

            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              ref={nameRef}
            >
              <span className="block text-terminal">Muhammad Asad</span>
              <span className="block text-syntax-purple">
                Kamal Shah
              </span>
            </h1>

            <div className="h-16 mb-6 flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <FaTerminal className="text-syntax-green text-xl" />
                <span className="text-xl sm:text-2xl font-mono-developer text-terminal">
                  <span className="text-syntax-blue">$</span> {text}
                  <span className="blinking-cursor">_</span>
                </span>
              </div>
            </div>

            <p 
              className="text-lg text-developer-secondary mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              I build scalable web applications and integrate AI solutions with over 3 years of experience in full stack development. Passionate about creating efficient, user-friendly digital experiences.
            </p>

            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-developer-secondary border border-developer text-terminal rounded-lg font-mono-developer hover:bg-developer-tertiary hover:border-syntax-blue transition-all btn-developer text-sm sm:text-base"
              >
                <span className="text-syntax-blue">$</span> view-projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 sm:px-8 py-3 sm:py-3.5 border border-syntax-blue text-syntax-blue rounded-lg font-mono-developer hover:bg-syntax-blue hover:text-terminal transition-colors text-sm sm:text-base"
              >
                <span className="text-syntax-blue">&gt;</span> contact-me
              </button>
            </div>

            {/* Social Links */}
            <div 
              className="flex gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center text-terminal hover:text-syntax-blue hover:border-syntax-blue transition-all animate-slideUp"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                  aria-label={social.label}
                >
                  <social.icon className="text-base sm:text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Terminal */}
          <div className={`terminal-window animate-slideInRight ${showTerminal ? 'opacity-100' : 'opacity-0'} mt-8 lg:mt-0`}>
            <div className="terminal-header">
              <div className="flex items-center">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
                <div className="ml-3 text-xs sm:text-sm text-developer-tertiary font-mono-developer">
                  terminal — bash — 80×24
                </div>
              </div>
            </div>
            
            <div className="terminal-body p-4 sm:p-6">
              <div className="space-y-2">
                {terminalCommands.map((cmd, index) => (
                  <div 
                    key={index}
                    className={`font-mono-developer animate-fadeIn ${cmd.color} text-sm sm:text-base`}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <span className="text-syntax-green mr-2">{cmd.prefix}</span>
                    <span>{cmd.command}</span>
                  </div>
                ))}
                
                <div className="mt-4 sm:mt-6">
                  <div className="font-mono-developer text-syntax-green animate-terminalTyping text-sm sm:text-base">
                    $ npm run build --production
                  </div>
                  <div className="font-mono-developer text-terminal mt-2 text-sm sm:text-base">
                    <span className="text-syntax-green">✓</span> Building optimized production bundle...
                  </div>
                  <div className="font-mono-developer text-terminal text-sm sm:text-base">
                    <span className="text-syntax-green">✓</span> Compiled successfully!
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-developer">
                  <div className="flex items-center gap-2">
                    <FaCode className="text-syntax-blue text-sm sm:text-base" />
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
                    <span className="text-syntax-orange">"React"</span>,
                    <span className="text-syntax-orange"> "Node.js"</span>,
                    <span className="text-syntax-orange"> "Python"</span>
                    <span className="text-syntax-yellow">]</span>,
                  </div>
                  <div className="ml-4 font-mono-developer text-terminal text-sm sm:text-base">
                    <span className="text-syntax-green">passion</span>:
                    <span className="text-syntax-orange"> "Building amazing software"</span>
                  </div>
                  <div className="font-mono-developer text-terminal text-sm sm:text-base">
                    <span className="text-syntax-yellow">{'}'}</span>;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fadeIn hidden sm:block" style={{ animationDelay: '2s' }}>
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center text-developer-secondary hover:text-syntax-blue transition-colors font-mono-developer"
          >
            <span className="text-sm mb-2">scroll_to_next();</span>
            <div className="animate-bounce">
              <FaArrowDown className="text-xl" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;