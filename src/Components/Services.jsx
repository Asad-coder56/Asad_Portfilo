import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaRobot, 
  FaMobileAlt, 
  FaCloud,
  FaShieldAlt,
  FaChartLine,
  FaLaptopCode,
  FaPaintBrush,
  FaCogs,
  FaRocket,
  FaTerminal,
  FaArrowRight,
  FaChevronRight,
  FaKeyboard,
  FaBug,
  FaCodeBranch,
  FaSync,
  FaPlay,
  FaPause,
  FaMicrochip,
  FaNetworkWired,
  FaBrain,
  FaLock,
  FaKey,
  FaReact
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiJavascript, 
  SiPython, 
  SiReact, 
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiAwsamplify,
  SiDocker,
  SiPostgresql,
  SiRedux,
  SiExpress
} from 'react-icons/si';

const Services = ({ setActiveSection, darkMode = true }) => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [hoveredService, setHoveredService] = useState(null);
  const [visibleProcess, setVisibleProcess] = useState(0);
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [activeTab, setActiveTab] = useState('services');
  const [codeExecution, setCodeExecution] = useState(0);
  const [isRunningCommand, setIsRunningCommand] = useState(false);
  const [commandOutput, setCommandOutput] = useState([]);
  const [terminalText, setTerminalText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('services');
          controls.start('visible');
          
          // Animate process steps sequentially
          const steps = [0, 1, 2, 3];
          steps.forEach((step, index) => {
            setTimeout(() => {
              setVisibleProcess(prev => Math.max(prev, step));
            }, index * 500);
          });

          // Start code execution simulation
          simulateCodeExecution();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection, controls]);

  // Initialize binary matrix for background
  useEffect(() => {
    const generateBinaryMatrix = () => {
      const matrix = [];
      for (let i = 0; i < 40; i++) {
        matrix.push({
          id: i,
          char: Math.random() > 0.5 ? '0' : '1',
          color: darkMode ? 'text-syntax-green' : 'text-green-500',
          opacity: 0.05 + Math.random() * 0.1,
          speed: 3 + Math.random() * 7,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 8,
          size: Math.random() > 0.5 ? 'text-xs' : 'text-[10px]'
        });
      }
      return matrix;
    };
    
    setBinaryMatrix(generateBinaryMatrix());
  }, [darkMode]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect for terminal - Updated for MERN
  useEffect(() => {
    const commands = [
      '$ npm run mern-services',
      '> Starting MERN stack deployment...',
      '> Deploying React frontend...',
      '> Configuring Node.js backend...',
      '> Setting up MongoDB database...',
      '> MERN stack deployment complete! ✅'
    ];

    let currentCommand = 0;
    let currentChar = 0;
    let isDeleting = false;

    const typeCommand = () => {
      if (currentCommand < commands.length) {
        const command = commands[currentCommand];
        
        if (!isDeleting && currentChar <= command.length) {
          setTerminalText(command.substring(0, currentChar));
          currentChar++;
          setTimeout(typeCommand, 50);
        } else if (isDeleting && currentChar >= 0) {
          setTerminalText(command.substring(0, currentChar));
          currentChar--;
          setTimeout(typeCommand, 30);
        } else {
          isDeleting = !isDeleting;
          if (!isDeleting) {
            currentCommand++;
          }
          setTimeout(typeCommand, 1000);
        }
      } else {
        // Reset and start again
        currentCommand = 0;
        currentChar = 0;
        isDeleting = false;
        setTimeout(typeCommand, 2000);
      }
    };

    typeCommand();
  }, []);

  const simulateCodeExecution = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setCodeExecution(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCommandOutput(prev => [
            ...prev,
            { text: '✓ MERN Stack Services compiled successfully', type: 'success' }
          ]);
        }, 500);
      }
    }, 50);
  };

  const runCommand = (command) => {
    setIsRunningCommand(true);
    setCommandOutput(prev => [
      ...prev,
      { text: `$ ${command}`, type: 'command' }
    ]);
    
    setTimeout(() => {
      const outputs = [
        'Initializing MERN project structure...',
        'Installing React, Express, Mongoose...',
        'Setting up MongoDB connection...',
        'Creating API routes and controllers...',
        'Building React components with TypeScript...',
        'MERN application ready for deployment!'
      ];
      
      outputs.forEach((output, index) => {
        setTimeout(() => {
          setCommandOutput(prev => [
            ...prev,
            { text: `→ ${output}`, type: 'output' }
          ]);
        }, index * 800);
      });
      
      setTimeout(() => {
        setIsRunningCommand(false);
      }, outputs.length * 800);
    }, 1000);
  };

  // Updated services array for MERN stack
  const services = [
    {
      icon: FaLaptopCode,
      title: "MERN Stack Development",
      description: "Complete MERN stack applications with React, Node.js, Express, and MongoDB",
      features: ["Full Stack Development", "React/Node.js", "MongoDB Integration", "REST APIs", "Real-time Features", "Deployment"],
      price: "$60-90/hr",
      popular: true,
      color: darkMode ? 'syntax-blue' : 'blue-500',
      bgColor: darkMode ? '#61DAFB20' : '#3B82F620',
      iconColor: '#61DAFB',
      tech: [SiReact, SiNodedotjs, SiMongodb],
      command: "npm run build:mern"
    },
    {
      icon: FaServer,
      title: "Backend API Development",
      description: "Scalable backend APIs with Node.js, Express, and database integration",
      features: ["Node.js/Express", "REST/GraphQL APIs", "JWT Authentication", "Mongoose ODM", "API Documentation", "WebSocket APIs"],
      price: "$55-85/hr",
      popular: true,
      color: darkMode ? 'syntax-green' : 'green-500',
      bgColor: darkMode ? '#33993320' : '#10B98120',
      iconColor: '#339933',
      tech: [SiNodedotjs, SiExpress, FaDatabase],
      command: "node api-server.js"
    },
    {
      icon: FaReact,
      title: "React Frontend Development",
      description: "Modern React applications with TypeScript, Redux, and responsive design",
      features: ["React 18+", "TypeScript", "Redux Toolkit", "Responsive UI", "Performance Opt", "SEO Friendly"],
      price: "$50-80/hr",
      popular: false,
      color: darkMode ? 'syntax-purple' : 'purple-500',
      bgColor: darkMode ? '#764ABC20' : '#8B5CF620',
      iconColor: '#764ABC',
      tech: [SiReact, SiTypescript, SiRedux],
      command: "npm start"
    },
    {
      icon: FaDatabase,
      title: "Database Solutions",
      description: "MongoDB and PostgreSQL database design, optimization, and management",
      features: ["MongoDB Design", "PostgreSQL", "Database Optimization", "Data Modeling", "Backup Solutions", "Performance Tuning"],
      price: "$45-75/hr",
      popular: false,
      color: darkMode ? 'syntax-orange' : 'orange-500',
      bgColor: darkMode ? '#FD971F20' : '#F9731620',
      iconColor: '#FD971F',
      tech: [SiMongodb, SiPostgresql, FaDatabase],
      command: "mongod --dbpath ./data"
    },
    {
      icon: SiNextdotjs,
      title: "Next.js Development",
      description: "Server-side rendered React applications with Next.js framework",
      features: ["Next.js 14+", "SSR/SSG", "API Routes", "Optimization", "App Router", "Deployment"],
      price: "$65-95/hr",
      popular: true,
      color: darkMode ? 'syntax-yellow' : 'yellow-500',
      bgColor: darkMode ? '#F7DF1E20' : '#FBBF2420',
      iconColor: '#F7DF1E',
      tech: [SiNextdotjs, SiReact, FaCode],
      command: "next build && next start"
    },
    {
      icon: FaCloud,
      title: "MERN DevOps & Deployment",
      description: "Cloud deployment, CI/CD pipelines, and infrastructure for MERN applications",
      features: ["AWS/Azure", "Docker", "CI/CD", "PM2/Nginx", "SSL Setup", "Monitoring"],
      price: "$55-85/hr",
      popular: false,
      color: darkMode ? 'syntax-cyan' : 'cyan-500',
      bgColor: darkMode ? '#2496ED20' : '#06B6D420',
      iconColor: '#2496ED',
      tech: [SiAwsamplify, SiDocker, FaCloud],
      command: "docker-compose up -d"
    },
    {
      icon: FaShieldAlt,
      title: "API Security",
      description: "Security implementation and best practices for MERN applications",
      features: ["JWT/OAuth 2.0", "Rate Limiting", "Input Validation", "CORS Setup", "Security Headers", "Audit Logs"],
      price: "$50-80/hr",
      popular: false,
      color: darkMode ? 'syntax-red' : 'red-500',
      bgColor: darkMode ? '#F9267220' : '#EF444420',
      iconColor: '#F92672',
      tech: [FaShieldAlt, FaLock, FaKey],
      command: "security-audit --api"
    },
    {
      icon: FaSync,
      title: "Code Maintenance & Support",
      description: "Ongoing maintenance, updates, and support for existing MERN applications",
      features: ["Bug Fixes", "Updates", "Performance Opt", "Code Review", "Documentation", "Technical Support"],
      price: "$40-70/hr",
      popular: false,
      color: darkMode ? 'syntax-pink' : 'pink-500',
      bgColor: darkMode ? '#AE81FF20' : '#EC489920',
      iconColor: '#AE81FF',
      tech: [FaCode, FaSync, FaBug],
      command: "npm run maintenance"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Updated process steps for MERN
  const processSteps = [
    {
      step: "01",
      title: "Requirement Analysis",
      description: "Understanding project requirements, technology stack selection, and architecture planning for MERN applications.",
      icon: FaRocket,
      color: darkMode ? "syntax-blue" : "blue-500",
      bgColor: darkMode ? "#61DAFB20" : "#3B82F620",
      iconColor: "#61DAFB",
      command: "npm init mern-project"
    },
    {
      step: "02",
      title: "Database & API Design",
      description: "Designing MongoDB schemas, creating API endpoints, and planning the data flow for the application.",
      icon: FaDatabase,
      color: darkMode ? "syntax-green" : "green-500",
      bgColor: darkMode ? "#3C873A20" : "#10B98120",
      iconColor: "#3C873A",
      command: "mongod --dbpath ./data && node server.js"
    },
    {
      step: "03",
      title: "Full Stack Development",
      description: "Building React frontend, Node.js backend, and integrating all components into a cohesive MERN application.",
      icon: FaCode,
      color: darkMode ? "syntax-purple" : "purple-500",
      bgColor: darkMode ? "#764ABC20" : "#8B5CF620",
      iconColor: "#764ABC",
      command: "npm run dev"
    },
    {
      step: "04",
      title: "Testing & Deployment",
      description: "Testing API endpoints, frontend components, and deploying the complete MERN stack application to production.",
      icon: FaCogs,
      color: darkMode ? "syntax-orange" : "orange-500",
      bgColor: darkMode ? "#FD971F20" : "#F9731620",
      iconColor: "#FD971F",
      command: "npm test && npm run deploy"
    }
  ];

  const processVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0a0a0a' : '#000000',
        backgroundImage: darkMode 
          ? `radial-gradient(circle at 20% 30%, rgba(102, 217, 239, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(71, 162, 72, 0.05) 0%, transparent 50%)`
          : `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(71, 162, 72, 0.05) 0%, transparent 50%)`
      }}
    >
      {/* Binary Matrix Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryMatrix.map((binary) => (
          <motion.div
            key={binary.id}
            className={`absolute ${binary.color} ${binary.size} font-mono-developer font-bold`}
            style={{ 
              left: binary.left,
              opacity: binary.opacity
            }}
            animate={{ 
              y: ['-100%', '100vh'],
            }}
            transition={{
              y: {
                duration: binary.speed,
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
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: darkMode
            ? `linear-gradient(to right, rgba(102, 217, 239, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(102, 217, 239, 0.1) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Terminal Header - Updated for MERN */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.6, ease: "easeOut" }
            }
          }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <FaTerminal className={darkMode ? 'text-syntax-blue' : 'text-blue-500'} />
            <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
              $ mern-services --list --full-stack
            </span>
            <motion.div 
              className="w-2 h-4 bg-syntax-green ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            ></motion.div>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>export</span>{' '}
            <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>const</span>{' '}
            <span className={darkMode ? 'text-terminal' : 'text-white'}>mernServices</span>{' '}
            <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>=</span>{' '}
            <span className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}>{'{'}</span>
          </h2>
          
          <p className={`text-lg max-w-2xl mx-auto font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
            // Complete MERN stack development services for building modern, scalable web applications
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex bg-black/50 backdrop-blur-sm rounded-lg border border-gray-800 p-1">
            {['services', 'process', 'pricing'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-mono-developer text-sm transition-all ${
                  activeTab === tab
                    ? `${darkMode ? 'bg-syntax-blue text-terminal' : 'bg-blue-500 text-white'}`
                    : `${darkMode ? 'text-developer-secondary hover:text-terminal' : 'text-gray-400 hover:text-white'}`
                }`}
              >
                {tab === 'services' && <FaCode className="inline mr-2" />}
                {tab === 'process' && <FaCogs className="inline mr-2" />}
                {tab === 'pricing' && <FaChartLine className="inline mr-2" />}
                {tab}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'services' && (
            <motion.div
              key="services"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => setHoveredService(service.title)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="relative group"
                >
                  <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                    {/* Animated border */}
                    <motion.div 
                      className="absolute inset-0 rounded-xl"
                      style={{ 
                        background: `linear-gradient(45deg, transparent, ${service.iconColor}20, transparent)`,
                        opacity: 0
                      }}
                      animate={{ 
                        opacity: hoveredService === service.title ? 1 : 0,
                        x: ['-100%', '100%']
                      }}
                      transition={{ 
                        opacity: { duration: 0.3 },
                        x: { 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "linear"
                        }
                      }}
                    ></motion.div>

                    {service.popular && (
                      <motion.div 
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className={`bg-black ${darkMode ? 'border-syntax-green' : 'border-green-500'} border px-4 py-1 rounded-lg text-sm font-mono-developer flex items-center gap-2 backdrop-blur-sm`}>
                          <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-syntax-green' : 'bg-green-500'} animate-pulse`}></span>
                          <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>$ popular</span>
                        </span>
                      </motion.div>
                    )}
                    
                    <div className="mb-6 flex-grow relative z-10">
                      <motion.div 
                        className="w-14 h-14 rounded-lg border border-gray-800 flex items-center justify-center mb-4 relative overflow-hidden"
                        style={{ backgroundColor: service.bgColor }}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          boxShadow: `0 0 20px ${service.iconColor}40`
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <service.icon className="text-2xl" style={{ color: service.iconColor }} />
                        
                        {/* Tech stack icons */}
                        <div className="absolute -bottom-2 -right-2 flex">
                          {service.tech.map((TechIcon, idx) => (
                            <motion.div
                              key={idx}
                              className="w-5 h-5 rounded-full bg-black border border-gray-800 flex items-center justify-center -ml-1"
                              initial={{ x: 10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 + idx * 0.1 }}
                            >
                              <TechIcon className="text-xs" style={{ color: service.iconColor }} />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      
                      <h3 className={`text-xl font-bold mb-3 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'} group-hover:${service.color} transition-colors`}>
                        {service.title}
                      </h3>
                      <p className={`${darkMode ? 'text-developer-secondary' : 'text-gray-400'} mb-6 text-sm leading-relaxed`}>
                        {service.description}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className={`font-semibold mb-3 font-mono-developer flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                          <FaChevronRight className={`text-sm ${darkMode ? 'text-syntax-green' : 'text-green-500'}`} /> // Features
                        </h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <motion.li 
                              key={idx}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + idx * 0.05 }}
                            >
                              <span className={`mr-2 ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>→</span>
                              <span className={`text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-800 relative z-10">
                      <div className="relative">
                        <span className={`text-2xl font-bold font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                          {service.price}
                        </span>
                        <span className={`text-sm ml-1 ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>/ hour</span>
                        {hoveredService === service.title && (
                          <motion.div 
                            className={`absolute -right-2 -top-2 w-3 h-3 rounded-full ${darkMode ? 'bg-syntax-green' : 'bg-green-500'} animate-ping`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          ></motion.div>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          runCommand(service.command);
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-4 py-2 rounded-lg font-mono-developer hover:shadow-lg transition-shadow text-sm flex items-center gap-2 backdrop-blur-sm"
                        style={{ 
                          backgroundColor: service.bgColor,
                          color: service.iconColor,
                          borderColor: service.iconColor,
                          borderWidth: '1px'
                        }}
                      >
                        get_quote() <FaArrowRight />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Process Tab - Updated for MERN */}
          {activeTab === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-20"
            >
              <h3 className={`text-2xl font-bold text-center mb-12 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                // MERN Development Process
              </h3>
              
              <div className="relative max-w-6xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-syntax-blue via-syntax-green to-syntax-purple hidden lg:block">
                  <motion.div 
                    className="h-full bg-gradient-to-b from-syntax-blue to-syntax-purple"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                  ></motion.div>
                </div>

                {/* Process steps */}
                <div className="space-y-12 lg:space-y-0">
                  {processSteps.map((process, index) => (
                    <motion.div 
                      key={process.step}
                      custom={index}
                      variants={processVariants}
                      initial="hidden"
                      animate={visibleProcess >= index ? "visible" : "hidden"}
                      className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-6 ${
                        index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Process step circle */}
                      <motion.div 
                        className="relative z-10 group/process"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-lg font-bold font-mono-developer shadow-lg backdrop-blur-sm`}
                          style={{ 
                            borderColor: process.iconColor,
                            backgroundColor: process.bgColor.replace('20', '30')
                          }}
                        >
                          {process.step}
                        </div>
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 animate-ping"
                          style={{ borderColor: process.iconColor }}
                          initial={{ scale: 1 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        ></motion.div>
                        
                        {/* Command preview */}
                        <motion.div 
                          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black border border-gray-800 px-3 py-2 rounded-lg text-xs font-mono-developer opacity-0 group-hover/process:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm"
                          initial={{ y: 10 }}
                          animate={{ y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>$</span>{' '}
                          <span className={darkMode ? 'text-terminal' : 'text-white'}>{process.command}</span>
                        </motion.div>
                      </motion.div>
                      
                      {/* Process content */}
                      <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                        <motion.div 
                          className={`flex items-center gap-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''} mb-4`}
                          whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                        >
                          <process.icon className={`text-2xl`} style={{ color: process.iconColor }} />
                          <h4 className={`text-xl font-bold font-mono-developer`} style={{ color: process.iconColor }}>
                            {process.title}
                          </h4>
                        </motion.div>
                        <p className={`${darkMode ? 'text-developer-secondary' : 'text-gray-400'} text-sm leading-relaxed ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                          {process.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Pricing Tab - Updated for MERN */}
          {activeTab === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
                <div className="grid md:grid-cols-3 gap-8">
                  <motion.div 
                    className="p-6 border border-gray-800 rounded-xl"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <h3 className={`text-xl font-bold mb-4 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                      <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>const</span> frontendDev
                    </h3>
                    <div className="mb-6">
                      <span className={`text-3xl font-bold ${darkMode ? 'text-terminal' : 'text-white'}`}>$50-70</span>
                      <span className={`ml-2 ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>/ hour</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {['React Development', 'UI Components', 'Responsive Design', 'API Integration'].map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <FaChevronRight className={`mr-2 ${darkMode ? 'text-syntax-green' : 'text-green-500'}`} />
                          <span className={darkMode ? 'text-developer-secondary' : 'text-gray-400'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-lg font-mono-developer border border-gray-800 hover:border-syntax-blue transition-colors"
                    >
                      select_plan()
                    </motion.button>
                  </motion.div>

                  <motion.div 
                    className="p-6 border border-syntax-blue rounded-xl relative overflow-hidden"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-syntax-blue text-black px-4 py-1 rounded-lg text-sm font-mono-developer">
                        $ MERN_STACK
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-4 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                      <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>const</span> fullStackDev
                    </h3>
                    <div className="mb-6">
                      <span className={`text-3xl font-bold ${darkMode ? 'text-terminal' : 'text-white'}`}>$70-100</span>
                      <span className={`ml-2 ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>/ hour</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {['Complete MERN Stack', 'Database Design', 'API Development', 'Authentication', 'Deployment'].map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <FaChevronRight className={`mr-2 ${darkMode ? 'text-syntax-green' : 'text-green-500'}`} />
                          <span className={darkMode ? 'text-developer-secondary' : 'text-gray-400'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-lg font-mono-developer bg-syntax-blue text-black hover:bg-syntax-blue/90 transition-colors"
                    >
                      select_plan()
                    </motion.button>
                  </motion.div>

                  <motion.div 
                    className="p-6 border border-gray-800 rounded-xl"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <h3 className={`text-xl font-bold mb-4 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                      <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>const</span> maintenance
                    </h3>
                    <div className="mb-6">
                      <span className={`text-3xl font-bold ${darkMode ? 'text-terminal' : 'text-white'}`}>$40-60</span>
                      <span className={`ml-2 ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>/ hour</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {['Bug Fixes', 'Updates', 'Performance Opt', 'Security Patches', 'Support'].map((item, idx) => (
                        <li key={idx} className="flex items-center">
                          <FaChevronRight className={`mr-2 ${darkMode ? 'text-syntax-green' : 'text-green-500'}`} />
                          <span className={darkMode ? 'text-developer-secondary' : 'text-gray-400'}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 rounded-lg font-mono-developer border border-gray-800 hover:border-syntax-green transition-colors"
                    >
                      contact_support()
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Terminal - Updated for MERN */}
        <motion.div 
          className="mt-16 bg-black/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black/50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className={`ml-3 text-sm font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>mern-services</span>
                <span className="mx-2">—</span>
                <span>bash</span>
              </div>
            </div>
            <div className={`text-sm font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
              {isRunningCommand ? (
                <span className="flex items-center gap-2">
                  <span className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}>●</span>
                  <span>Building MERN app...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>●</span>
                  <span>MERN Stack Ready</span>
                </span>
              )}
            </div>
          </div>
          
          <div className="p-6">
            <div className="font-mono-developer text-sm">
              {/* Terminal typing effect */}
              <div className="mb-4">
                <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>$</span>
                <span className={`ml-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                  {terminalText}
                  <span className={`inline-block w-2 h-4 ml-1 ${darkMode ? 'bg-syntax-green' : 'bg-green-500'} ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}></span>
                </span>
              </div>

              {/* Command output */}
              <div className="space-y-2">
                <AnimatePresence>
                  {commandOutput.map((output, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`font-mono-developer text-sm ${
                        output.type === 'success' 
                          ? (darkMode ? 'text-syntax-green' : 'text-green-500')
                          : output.type === 'command'
                          ? (darkMode ? 'text-syntax-blue' : 'text-blue-500')
                          : (darkMode ? 'text-developer-secondary' : 'text-gray-400')
                      }`}
                    >
                      {output.type === 'command' ? (
                        <span>{output.text}</span>
                      ) : (
                        <span className="ml-4">{output.text}</span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Code execution progress - Updated title */}
              <motion.div 
                className="mt-6 pt-4 border-t border-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
                    <FaCode className="inline mr-2" />
                    MERN Stack Service Compilation
                  </div>
                  <div className={`text-sm font-mono-developer ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>
                    {codeExecution}%
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-2 bg-gradient-to-r from-syntax-blue via-syntax-green to-syntax-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${codeExecution}%` }}
                    transition={{ duration: 2 }}
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Updated for MERN */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-syntax-blue/10 via-syntax-green/10 to-syntax-purple/10 rounded-2xl p-8 md:p-12 text-center border border-gray-800 relative overflow-hidden backdrop-blur-sm"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/5 via-syntax-green/5 to-syntax-purple/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(102,217,239,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative z-10">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
              $ start_mern_project()
            </h3>
            <p className={`${darkMode ? 'text-developer-secondary' : 'text-gray-400'} mb-8 max-w-2xl mx-auto font-mono-developer text-sm md:text-base`}>
              // Let's build your next MERN stack application together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  runCommand('contact --start-project');
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-black/50 border border-gray-800 rounded-lg font-mono-developer hover:border-syntax-blue transition-colors relative overflow-hidden group backdrop-blur-sm"
              >
                <span className={`relative z-10 flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                  start_project() <FaArrowRight />
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                  darkMode ? '' : 'via-blue-500/20'
                }`}></div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  runCommand('mail --send --subject=MERN_Project');
                  window.location.href = 'mailto:kamalasad57@gmail.com';
                }}
                className="px-8 py-3 border border-syntax-green rounded-lg font-mono-developer hover:bg-syntax-green/10 transition-colors relative overflow-hidden group backdrop-blur-sm"
              >
                <span className={`relative z-10 flex items-center gap-2 ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>
                  discuss_project() <FaArrowRight />
                </span>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-syntax-green/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${
                  darkMode ? '' : 'via-green-500/20'
                }`}></div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .card-developer:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2),
                      0 0 80px rgba(102, 217, 239, 0.1);
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

        .glitch-effect {
          animation: glitch 0.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default Services;