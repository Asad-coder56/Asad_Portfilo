import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaCheckCircle,
  FaExclamationCircle,
  FaPaperPlane,
  FaUser,
  FaGlobe,
  FaTerminal,
  FaCode,
  FaChevronRight,
  FaArrowRight,
  FaServer,
  FaDatabase,
  FaBolt,
  FaBug,
  FaKeyboard,
  FaCog
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiDocker } from 'react-icons/si';

const Contact = ({ setActiveSection, darkMode = true, isStandalone = false, scrollToSection }) => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: false,
    message: ''
  });
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [activeCommand, setActiveCommand] = useState(0);
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);

  const terminalCommands = [
    { 
      prefix: '➜', 
      command: 'cd ./contact', 
      color: 'text-syntax-blue',
      output: 'Changed directory to contact/'
    },
    { 
      prefix: '$', 
      command: 'npm run contact-server', 
      color: 'text-syntax-green',
      output: 'Starting contact server on port 3000... ✓'
    },
    { 
      prefix: '➜', 
      command: 'echo "Initializing contact form..."', 
      color: 'text-syntax-purple',
      output: 'Contact form initialized with validation'
    },
    { 
      prefix: '#', 
      command: '// Contact endpoint ready', 
      color: 'text-syntax-yellow',
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
          color: darkMode ? 'text-syntax-green' : 'text-syntax-blue',
          opacity: 0.05 + Math.random() * 0.2,
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

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Terminal animation and command execution
  useEffect(() => {
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
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(commandInterval);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('contact');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const simulateTerminal = (message, type = 'output') => {
    setTerminalOutput(prev => [
      ...prev.slice(-3),
      { text: message, type }
    ]);
    setTimeout(() => {
      setTerminalOutput(prev => prev.slice(1));
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: false, message: 'Compiling form data...' });
    
    simulateTerminal('$ contact_form.submit()\n> Validating form data...', 'system');

    setTimeout(() => {
      setStatus({
        sending: false,
        success: true,
        error: false,
        message: '✓ Message sent successfully! I\'ll get back to you soon.'
      });
      
      simulateTerminal('✓ Form validation passed\n> Sending message via API...', 'success');
      
      setTimeout(() => {
        simulateTerminal('✓ Message delivered successfully!\n> Response: 200 OK', 'success');
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        setTimeout(() => {
          setStatus({ sending: false, success: false, error: false, message: '' });
        }, 4000);
      }, 1500);
    }, 2000);
  };

  const languages = ['English', 'Urdu', 'Saraiki', 'Pashto'];
  
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
    },
    { 
      icon: FaInstagram, 
      label: 'Instagram', 
      url: 'https://instagram.com', 
      color: 'hover:text-[#E4405F]',
      bgColor: '#E4405F'
    }
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "kamalasad57@gmail.com",
      color: darkMode ? "text-syntax-blue" : "text-blue-500",
      bgColor: darkMode ? 'rgba(96, 123, 150, 0.1)' : 'rgba(59, 130, 246, 0.1)',
      iconColor: darkMode ? '#61DAFB' : '#3B82F6'
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+92 305 1958933",
      color: darkMode ? "text-syntax-green" : "text-green-500",
      bgColor: darkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(34, 197, 94, 0.1)',
      iconColor: darkMode ? '#10B981' : '#22C55E'
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Mianawala, Isa Khel, Mianwali, Punjab, Pakistan",
      color: darkMode ? "text-syntax-purple" : "text-purple-500",
      bgColor: darkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(168, 85, 247, 0.1)',
      iconColor: darkMode ? '#8B5CF6' : '#A855F7'
    },
    {
      icon: FaGlobe,
      title: "Languages",
      value: languages.join(', '),
      color: darkMode ? "text-syntax-yellow" : "text-yellow-500",
      bgColor: darkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.1)',
      iconColor: darkMode ? '#F59E0B' : '#F59E0B'
    }
  ];

  // Floating elements positions
  const floatingElements = [
    { text: '<form>', icon: FaCode, color: darkMode ? 'text-syntax-blue' : 'text-blue-600', delay: '0s', top: '10%', left: '5%' },
    { text: '{}', icon: FaDatabase, color: darkMode ? 'text-syntax-green' : 'text-green-600', delay: '0.3s', top: '20%', right: '10%' },
    { text: '=>', icon: FaBolt, color: darkMode ? 'text-syntax-yellow' : 'text-yellow-600', delay: '0.6s', bottom: '30%', left: '10%' },
    { text: 'API', icon: FaServer, color: darkMode ? 'text-syntax-purple' : 'text-purple-600', delay: '0.9s', bottom: '20%', right: '15%' },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className={`min-h-screen py-20 relative overflow-hidden ${isStandalone ? 'pt-24' : ''}`}
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
            className={`absolute ${binary.color} text-xs font-mono-developer font-bold`}
            style={{ 
              left: binary.left,
              opacity: binary.opacity 
            }}
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
                ? 'bg-gradient-to-r from-transparent via-syntax-blue to-transparent' 
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
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaKeyboard className={darkMode ? 'text-syntax-green' : 'text-green-500'} />
            <span className={`font-mono-developer text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
              Press <span className="px-1 py-0.5 bg-gray-900 rounded text-white">⌘</span> + <span className="px-1 py-0.5 bg-gray-900 rounded text-white">C</span> to contact
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="block">
              <span className={darkMode ? 'text-terminal' : 'text-white'}>Contact</span>
              <motion.span 
                className="inline-block ml-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <FaTerminal className={`inline text-3xl ${darkMode ? 'text-syntax-blue' : 'text-blue-500'}`} />
              </motion.span>
            </span>
            <span className={`block ${darkMode ? 'text-syntax-purple' : 'text-purple-400'} mt-2`}>
              Let's Connect
            </span>
          </h2>

          <div className="h-12 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-800">
              <FaTerminal className={`text-xl ${darkMode ? 'text-syntax-green animate-pulse' : 'text-green-500 animate-pulse'}`} />
              <span className="text-lg font-mono-developer">
                <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>$</span>
                <span className={darkMode ? 'text-terminal' : 'text-white'}> connect --start --protocol=tcp --port=3000</span>
                <span className={`inline-block w-2 h-6 ml-1 ${darkMode ? 'bg-syntax-green' : 'bg-green-500'} ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Info & Terminal */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FaServer className={darkMode ? 'text-syntax-blue' : 'text-blue-500'} />
                <span className={`font-mono-developer text-lg ${darkMode ? 'text-terminal' : 'text-white'}`}>
                  $ contact_info
                </span>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ 
                      y: -4,
                      boxShadow: `0 10px 30px ${info.bgColor}`
                    }}
                    className="group bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 relative overflow-hidden hover:border-opacity-50 transition-all duration-300"
                    style={{ borderColor: info.iconColor + '20' }}
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: info.bgColor }}
                    ></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center border"
                          style={{ 
                            backgroundColor: info.bgColor,
                            borderColor: info.iconColor + '30'
                          }}
                        >
                          <info.icon className="text-lg" style={{ color: info.iconColor }} />
                        </div>
                        <span className={`font-mono-developer text-sm ${info.color}`}>
                          // {info.title}
                        </span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-300'}`}>
                        {info.value}
                      </p>
                    </div>
                    
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-current/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                      darkMode ? '' : 'via-blue-500/20'
                    }`}></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FaCog className={`${darkMode ? 'text-syntax-yellow' : 'text-yellow-500'} animate-spin-slow`} />
                <span className={`font-mono-developer text-lg ${darkMode ? 'text-terminal' : 'text-white'}`}>
                  $ social_links
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: `0 0 20px ${social.bgColor}`
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 flex items-center justify-center relative group"
                    aria-label={social.label}
                    style={{ borderColor: social.bgColor + '30' }}
                  >
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: social.bgColor }}
                    ></div>
                    <social.icon className={`text-lg relative z-10 ${darkMode ? 'text-terminal' : 'text-gray-300'} ${social.color}`} />
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
                      {social.label}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-t border-l border-gray-700"></div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Form */}
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
                      contact_form
                    </motion.span>
                    <span className="mx-2">—</span>
                    <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>api</span>
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
              {/* Terminal Commands */}
              <div className="space-y-2 mb-6">
                {terminalCommands.map((cmd, index) => (
                  <motion.div 
                    key={index}
                    className={`font-mono-developer ${cmd.color} text-sm transition-all duration-300 ${
                      activeCommand === index ? 'opacity-100 scale-105' : 'opacity-70'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
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
              </div>

              {/* Terminal Output */}
              <AnimatePresence>
                {terminalOutput.map((output, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`font-mono-developer text-sm mb-2 ${
                      output.type === 'success' 
                        ? (darkMode ? 'text-syntax-green' : 'text-green-500')
                        : output.type === 'error'
                        ? (darkMode ? 'text-syntax-red' : 'text-red-500')
                        : (darkMode ? 'text-developer-secondary' : 'text-gray-400')
                    }`}
                  >
                    <span className="mr-2">{output.type === 'success' ? '✓' : output.type === 'error' ? '✗' : '>'}</span>
                    {output.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className={`block text-xs font-mono-developer mb-2 ${darkMode ? 'text-syntax-blue' : 'text-blue-500'}`}>
                      // name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 text-white focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm"
                        placeholder="Enter your name"
                        required
                        disabled={status.sending}
                        style={{ 
                          borderColor: darkMode ? 'rgba(102, 217, 239, 0.2)' : 'rgba(59, 130, 246, 0.2)'
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className={`block text-xs font-mono-developer mb-2 ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>
                      // email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 text-white focus:outline-none focus:border-syntax-green transition-all font-mono-developer text-sm"
                        placeholder="Enter your email"
                        required
                        disabled={status.sending}
                        style={{ 
                          borderColor: darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(34, 197, 94, 0.2)'
                        }}
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className={`block text-xs font-mono-developer mb-2 ${darkMode ? 'text-syntax-purple' : 'text-purple-500'}`}>
                    // subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 text-white focus:outline-none focus:border-syntax-purple transition-all font-mono-developer text-sm"
                    placeholder="Project type or inquiry"
                    required
                    disabled={status.sending}
                    style={{ 
                      borderColor: darkMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(168, 85, 247, 0.2)'
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <label className={`block text-xs font-mono-developer mb-2 ${darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}`}>
                    // message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 text-white focus:outline-none focus:border-syntax-yellow transition-all font-mono-developer text-sm resize-none"
                    placeholder="Tell me about your project..."
                    required
                    disabled={status.sending}
                    style={{ 
                      borderColor: darkMode ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.2)'
                    }}
                  ></textarea>
                </motion.div>

                {/* Status Message */}
                <AnimatePresence>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`p-3 rounded-lg border ${
                        status.success 
                          ? 'border-syntax-green text-syntax-green' 
                          : status.error 
                          ? 'border-syntax-red text-syntax-red'
                          : 'border-syntax-blue text-syntax-blue'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono-developer text-sm">
                        {status.success ? (
                          <FaCheckCircle />
                        ) : status.error ? (
                          <FaExclamationCircle />
                        ) : (
                          <FaCog className="animate-spin-slow" />
                        )}
                        <span>{status.message}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={status.sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group px-6 py-3 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg font-mono-developer hover:border-syntax-blue transition-all duration-300 relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ 
                    borderColor: darkMode ? 'rgba(102, 217, 239, 0.3)' : 'rgba(59, 130, 246, 0.3)'
                  }}
                >
                  <span className={`relative z-10 flex items-center justify-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                    {status.sending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>$</span> 
                        sending_message()
                      </>
                    ) : (
                      <>
                        <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>$</span> 
                        submit_form()
                        <FaPaperPlane className={darkMode ? 'text-syntax-green' : 'text-green-500'} />
                      </>
                    )}
                  </span>
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                    darkMode ? '' : 'via-blue-500/20'
                  }`}></div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Code Snippet */}
        <motion.div 
          className="mt-12 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FaCode className={darkMode ? 'text-syntax-purple' : 'text-purple-500'} />
            <span className={`font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
              // contact_api.js
            </span>
          </div>
          
          <div className="font-mono-developer text-sm">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}
            >
              const contactAPI = async (formData) => {'{'}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="ml-4 mt-2"
            >
              <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>try</span> {'{'}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="ml-8 mt-1"
            >
              <span className={darkMode ? 'text-syntax-purple' : 'text-purple-500'}>const</span>{' '}
              <span className={darkMode ? 'text-terminal' : 'text-white'}>response</span> ={' '}
              <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>await</span>{' '}
              <span className={darkMode ? 'text-terminal' : 'text-white'}>fetch</span>(
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="ml-12 mt-1"
            >
              <span className={darkMode ? 'text-syntax-orange' : 'text-orange-500'}>'/api/contact'</span>,
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="ml-12 mt-1"
            >
              {'{'} <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>method</span>:{' '}
              <span className={darkMode ? 'text-syntax-orange' : 'text-orange-500'}>'POST'</span>,
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
              className="ml-12 mt-1"
            >
              <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>headers</span>:{' '}
              {'{'} <span className={darkMode ? 'text-syntax-orange' : 'text-orange-500'}>'Content-Type'</span>:{' '}
              <span className={darkMode ? 'text-syntax-orange' : 'text-orange-500'}>'application/json'</span> {'}'},
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 }}
              className="ml-12 mt-1"
            >
              <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>body</span>:{' '}
              <span className={darkMode ? 'text-terminal' : 'text-white'}>JSON</span>.
              <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>stringify</span>(
              <span className={darkMode ? 'text-terminal' : 'text-white'}>formData</span>)
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
              className="ml-12 mt-1"
            >
              {'});'}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.9 }}
              className="ml-8 mt-1"
            >
              {'}'}{' '}
              <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>catch</span>{' '}
              (<span className={darkMode ? 'text-terminal' : 'text-white'}>error</span>) {'{'}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 }}
              className="ml-12 mt-1"
            >
              <span className={darkMode ? 'text-terminal' : 'text-white'}>console</span>.
              <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>error</span>(
              <span className={darkMode ? 'text-syntax-orange' : 'text-orange-500'}>'Contact error:'</span>,{' '}
              <span className={darkMode ? 'text-terminal' : 'text-white'}>error</span>);
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1 }}
              className="ml-8 mt-1"
            >
              {'}'}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2 }}
              className="mt-2"
            >
              {'}'};
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800 mb-6">
            <span className={`font-mono-developer text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
              <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>✓</span> Ready to collaborate?
            </span>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="group px-6 sm:px-8 py-3.5 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg font-mono-developer hover:border-syntax-blue transition-all duration-300 relative overflow-hidden"
            >
              <span className={`relative z-10 flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>$</span> 
                <span>view_projects</span>
                <FaArrowRight className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'} />
              </span>
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                darkMode ? '' : 'via-blue-500/20'
              }`}></div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('mailto:kamalasad57@gmail.com', '_blank')}
              className="group px-6 sm:px-8 py-3.5 border border-gray-800 rounded-lg font-mono-developer hover:border-syntax-green transition-all duration-300 relative overflow-hidden"
              style={{ 
                borderColor: darkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(34, 197, 94, 0.3)'
              }}
            >
              <span className={`relative z-10 flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>&gt;</span> 
                <span>send_direct_email</span>
                <FaPaperPlane className={darkMode ? 'text-syntax-purple' : 'text-purple-500'} />
              </span>
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                darkMode ? '' : 'via-green-500/20'
              }`}></div>
            </motion.button>
          </motion.div>
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
          max-height: 600px;
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

export default Contact;