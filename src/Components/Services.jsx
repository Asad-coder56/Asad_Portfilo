// src/components/Services.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  FaChevronRight
} from 'react-icons/fa';

const Services = ({ setActiveSection }) => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [hoveredService, setHoveredService] = useState(null);
  const [visibleProcess, setVisibleProcess] = useState(0);

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
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection, controls]);

  const services = [
    {
      icon: FaLaptopCode,
      title: "Web Application Development",
      description: "Custom web applications built with modern frameworks and best practices.",
      features: ["React/Next.js", "Responsive Design", "Performance Optimization", "Cross-browser Compatibility"],
      price: "$50-80/hr",
      popular: true,
      color: "syntax-blue",
      bgColor: '#61DAFB20',
      iconColor: '#61DAFB'
    },
    {
      icon: FaServer,
      title: "Backend & API Development",
      description: "Scalable server-side solutions with robust APIs and microservices architecture.",
      features: ["Node.js/Express", "REST/GraphQL APIs", "Database Design", "Authentication"],
      price: "$60-90/hr",
      popular: false,
      color: "syntax-green",
      bgColor: '#33993320',
      iconColor: '#339933'
    },
    {
      icon: FaDatabase,
      title: "Database Solutions",
      description: "Efficient database design, optimization, and management for high-performance apps.",
      features: ["MongoDB/PostgreSQL", "Database Optimization", "Data Modeling", "Redis Caching"],
      price: "$55-85/hr",
      popular: false,
      color: "syntax-purple",
      bgColor: '#764ABC20',
      iconColor: '#764ABC'
    },
    {
      icon: FaRobot,
      title: "AI/ML Integration",
      description: "Integrating machine learning models and AI capabilities into applications.",
      features: ["Python ML Models", "TensorFlow/PyTorch", "Model Deployment", "API Integration"],
      price: "$70-100/hr",
      popular: true,
      color: "syntax-orange",
      bgColor: '#FD971F20',
      iconColor: '#FD971F'
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Development",
      description: "Cross-platform mobile applications with React Native and Flutter.",
      features: ["React Native", "iOS & Android", "Push Notifications", "App Store Deployment"],
      price: "$65-95/hr",
      popular: false,
      color: "syntax-yellow",
      bgColor: '#F7DF1E20',
      iconColor: '#F7DF1E'
    },
    {
      icon: FaCloud,
      title: "DevOps & Cloud",
      description: "CI/CD pipelines, containerization, and cloud deployment solutions.",
      features: ["Docker/Kubernetes", "AWS/Azure", "CI/CD Pipelines", "Monitoring"],
      price: "$60-90/hr",
      popular: false,
      color: "syntax-blue",
      bgColor: '#2496ED20',
      iconColor: '#2496ED'
    },
    {
      icon: FaShieldAlt,
      title: "Security Solutions",
      description: "Implementing security best practices and protection measures.",
      features: ["JWT/OAuth", "Data Encryption", "Security Audits", "GDPR Compliance"],
      price: "$75-110/hr",
      popular: false,
      color: "syntax-red",
      bgColor: '#F9267220',
      iconColor: '#F92672'
    },
    {
      icon: FaChartLine,
      title: "Analytics & BI",
      description: "Data visualization and business intelligence dashboards.",
      features: ["Chart.js/D3.js", "Real-time Analytics", "Dashboard Design", "Data Warehousing"],
      price: "$65-95/hr",
      popular: false,
      color: "syntax-purple",
      bgColor: '#AE81FF20',
      iconColor: '#AE81FF'
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

  const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "Understanding requirements, project scope, and creating detailed specifications.",
    icon: FaRocket,
    color: "syntax-blue",
    bgColor: "#61DAFB20",
    iconColor: "#61DAFB"
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Creating wireframes, mockups, and interactive prototypes.",
    icon: FaPaintBrush,
    color: "syntax-green",
    bgColor: "#3C873A20",
    iconColor: "#3C873A"
  },
  {
    step: "03",
    title: "Development",
    description: "Building the application with clean, maintainable code and best practices.",
    icon: FaCode,
    color: "syntax-purple",
    bgColor: "#764ABC20",
    iconColor: "#764ABC"
  },
  {
    step: "04",
    title: "Testing & Deployment",
    description: "Rigorous testing, optimization, and deployment to production.",
    icon: FaCogs,
    color: "syntax-orange",
    bgColor: "#FD971F20",
    iconColor: "#FD971F"
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
    <section id="services" ref={sectionRef} className="py-20 bg-terminal relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, var(--color-developer) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer shadow-lg">
            $ services --list
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal mb-4">
            <span className="text-syntax-blue">interface</span>{' '}
            <span className="text-syntax-green">Services</span>{' '}
            <span className="text-syntax-blue">{'{'}</span>
          </h2>
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer">
            // Comprehensive development services tailored to bring your digital vision to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredService(service.title)}
              onHoverEnd={() => setHoveredService(null)}
              className="relative group"
            >
              <div className="bg-developer-secondary rounded-xl p-6 border border-developer transition-all duration-300 card-developer h-full flex flex-col">
                {service.popular && (
                  <motion.div 
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className="bg-terminal text-syntax-green px-4 py-1 rounded-lg text-sm font-mono-developer border border-developer shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-syntax-green animate-pulse"></span>
                      $ popular
                    </span>
                  </motion.div>
                )}
                
                <div className="mb-6 flex-grow">
                  <motion.div 
                    className="w-14 h-14 rounded-lg border border-developer flex items-center justify-center mb-4 relative overflow-hidden"
                    style={{ backgroundColor: service.bgColor }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <service.icon className="text-2xl" style={{ color: service.iconColor }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-terminal mb-3 font-mono-developer group-hover:text-syntax-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-developer-secondary mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-terminal mb-3 font-mono-developer flex items-center gap-2">
                      <FaChevronRight className="text-syntax-green text-sm" /> // Features:
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
                          <span className="mr-2 text-syntax-green">→</span>
                          <span className="text-developer-secondary text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-developer">
                  <div className="relative">
                    <span className="text-2xl font-bold text-terminal font-mono-developer">
                      {service.price}
                    </span>
                    <span className="text-developer-secondary text-sm ml-1">/ hour</span>
                    {hoveredService === service.title && (
                      <motion.div 
                        className="absolute -right-2 -top-2 w-3 h-3 rounded-full bg-syntax-green animate-ping"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      ></motion.div>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-4 py-2 rounded-lg font-mono-developer hover:shadow-lg transition-shadow text-sm flex items-center gap-2"
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

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center text-terminal mb-12 font-mono-developer">
            // Development Process
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
                    className="relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-terminal text-lg font-bold font-mono-developer shadow-lg`}
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
                    <p className={`text-developer-secondary text-sm leading-relaxed ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {process.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-syntax-blue/20 via-syntax-green/20 to-syntax-purple/20 rounded-2xl p-8 md:p-12 text-center border border-developer relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/5 via-syntax-green/5 to-syntax-purple/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(102,217,239,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-terminal mb-4 font-mono-developer">
              $ ready_to_start()
            </h3>
            <p className="text-developer-secondary mb-8 max-w-2xl mx-auto font-mono-developer text-sm md:text-base">
              // Let's discuss your project requirements and create a tailored solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-terminal border border-developer text-terminal rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  get_consultation() <FaArrowRight />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/10 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = 'mailto:kamalasad57@gmail.com'}
                className="px-8 py-3 border border-syntax-green text-syntax-green rounded-lg font-mono-developer hover:bg-syntax-green/10 transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  send_email() <FaArrowRight />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-green/0 via-syntax-green/10 to-syntax-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>
  {`
    .card-developer {
      transition: all 0.3s ease;
    }

    .card-developer:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2),
                  0 0 80px rgba(102, 217, 239, 0.1);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `}
</style>

    </section>
  );
};

export default Services;