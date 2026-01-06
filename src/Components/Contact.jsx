import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
  FaArrowRight
} from 'react-icons/fa';

const Contact = ({ setActiveSection, isStandalone = false }) => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
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
  const [terminalOutput, setTerminalOutput] = useState('');
  const [hoveredInfo, setHoveredInfo] = useState(null);

  useEffect(() => {
    if (!isStandalone) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection('contact');
            controls.start('visible');
          }
        },
        { threshold: 0.3 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }
  }, [setActiveSection, isStandalone, controls]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const simulateTerminal = (message) => {
    setTerminalOutput(message);
    setTimeout(() => setTerminalOutput(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: false, message: 'Sending...' });
    simulateTerminal('$ sending_message()\n> Processing form data...');

    // Simulate API call
    setTimeout(() => {
      setStatus({
        sending: false,
        success: true,
        error: false,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      simulateTerminal('$ sending_message()\n✓ Message sent successfully!\n> Response received: 200 OK');

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus({ sending: false, success: false, error: false, message: '' });
        simulateTerminal('');
      }, 5000);
    }, 2000);
  };

  const languages = ['English', 'Urdu', 'Saraiki', 'Pashto'];
  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com', color: 'text-terminal', hoverColor: 'text-syntax-blue' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'text-terminal', hoverColor: 'text-syntax-blue' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com', color: 'text-terminal', hoverColor: 'text-syntax-blue' },
    { icon: FaInstagram, label: 'Instagram', url: 'https://instagram.com', color: 'text-terminal', hoverColor: 'text-syntax-blue' }
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "kamalasad57@gmail.com",
      color: "syntax-blue",
      bgColor: '#61DAFB20',
      iconColor: '#61DAFB'
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+92 305 1958933",
      color: "syntax-green",
      bgColor: '#3C873A20',
      iconColor: '#3C873A'
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Mianawala, Isa Khel, Mianwali, Punjab, Pakistan",
      color: "syntax-purple",
      bgColor: '#764ABC20',
      iconColor: '#764ABC'
    },
    {
      icon: FaGlobe,
      title: "Languages",
      value: languages.join(', '),
      color: "syntax-orange",
      bgColor: '#FD971F20',
      iconColor: '#FD971F'
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

  const terminalVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="contact" ref={sectionRef} className={`py-20 bg-terminal relative overflow-hidden ${isStandalone ? 'pt-24' : ''}`}>
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
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer shadow-lg"
          >
            $ contact --start
          </motion.span>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-terminal mb-4"
          >
            <span className="text-syntax-blue">async</span>{' '}
            <span className="text-syntax-green">function</span>{' '}
            <span className="text-syntax-purple">contact</span>
            <span className="text-syntax-blue">()</span>{' '}
            <span className="text-syntax-blue">{'{'}</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer"
          >
            // Have a project in mind? Let's discuss how we can work together
          </motion.p>
        </motion.div>

        {/* Terminal Output */}
        {terminalOutput && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 terminal-window"
          >
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                contact — terminal — 80×24
              </div>
            </div>
            <div className="terminal-body">
              <div className="font-mono-developer text-sm whitespace-pre-wrap">
                {terminalOutput}
              </div>
            </div>
          </motion.div>
        )}

        {/* Status Message */}
        {status.message && !terminalOutput && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 p-4 rounded-lg border ${status.success ? 'border-syntax-green text-syntax-green' : status.error ? 'border-syntax-red text-syntax-red' : 'border-syntax-blue text-syntax-blue'}`}
          >
            <div className="flex items-center gap-3 font-mono-developer">
              {status.success ? (
                <FaCheckCircle />
              ) : status.error ? (
                <FaExclamationCircle />
              ) : null}
              <span>{status.message}</span>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            <div className="bg-developer-secondary rounded-xl p-6 border border-developer h-full card-developer">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-bold mb-8 text-terminal font-mono-developer"
              >
                $ contact_info
              </motion.h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={info.title}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ 
                      y: -4,
                      transition: { duration: 0.3 }
                    }}
                    onHoverStart={() => setHoveredInfo(info.title)}
                    onHoverEnd={() => setHoveredInfo(null)}
                    className="flex items-start gap-4 p-4 rounded-lg bg-terminal border border-developer transition-colors relative overflow-hidden group"
                  >
                    {/* Hover effect background */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: info.bgColor }}
                    ></div>
                    
                    <div className="relative z-10">
                      <motion.div 
                        className={`w-12 h-12 rounded-lg border border-developer flex items-center justify-center mb-4`}
                        style={{ backgroundColor: info.bgColor }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <info.icon className="text-xl" style={{ color: info.iconColor }} />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </motion.div>
                    </div>
                    <div className="relative z-10 flex-1">
                      <h4 className="font-bold text-terminal mb-1 font-mono-developer group-hover:text-syntax-blue transition-colors">
                        // {info.title}
                      </h4>
                      <p className="text-developer-secondary text-sm">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div>
                <motion.h4 
                  variants={itemVariants}
                  className="font-bold text-terminal mb-4 font-mono-developer"
                >
                  $ social_links
                </motion.h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ 
                        y: -6,
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-terminal border border-developer flex items-center justify-center hover:shadow-lg transition-all relative overflow-hidden group"
                      title={social.label}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-syntax-blue/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <social.icon className={`text-xl ${social.color} group-hover:${social.hoverColor} transition-colors relative z-10`} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-6"
          >
            <div className="bg-developer-secondary rounded-xl p-6 border border-developer h-full card-developer">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl font-bold mb-8 text-terminal font-mono-developer"
              >
                $ send_message()
              </motion.h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    custom={0}
                    variants={formVariants}
                    initial="hidden"
                    animate={controls}
                  >
                    <label htmlFor="name" className="block text-terminal mb-2 font-mono-developer text-sm">
                      // Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-developer-tertiary" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-terminal border border-developer text-terminal focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm"
                        placeholder="Enter your name"
                        required
                        disabled={status.sending}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={formVariants}
                    initial="hidden"
                    animate={controls}
                  >
                    <label htmlFor="email" className="block text-terminal mb-2 font-mono-developer text-sm">
                      // Email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-developer-tertiary" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-terminal border border-developer text-terminal focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm"
                        placeholder="Enter your email"
                        required
                        disabled={status.sending}
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  custom={2}
                  variants={formVariants}
                  initial="hidden"
                  animate={controls}
                >
                  <label htmlFor="subject" className="block text-terminal mb-2 font-mono-developer text-sm">
                    // Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-terminal border border-developer text-terminal focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm"
                    placeholder="Project type or inquiry"
                    required
                    disabled={status.sending}
                  />
                </motion.div>

                <motion.div
                  custom={3}
                  variants={formVariants}
                  initial="hidden"
                  animate={controls}
                >
                  <label htmlFor="message" className="block text-terminal mb-2 font-mono-developer text-sm">
                    // Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg bg-terminal border border-developer text-terminal focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm resize-none"
                    placeholder="Tell me about your project..."
                    required
                    disabled={status.sending}
                  ></textarea>
                </motion.div>

                <motion.button
                  custom={4}
                  variants={formVariants}
                  initial="hidden"
                  animate={controls}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status.sending}
                  className="w-full bg-terminal border border-developer text-terminal py-3.5 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/0 via-syntax-blue/10 to-syntax-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status.sending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-terminal border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane /> submit_form()
                      </>
                    )}
                  </span>
                </motion.button>

                <motion.p
                  custom={5}
                  variants={formVariants}
                  initial="hidden"
                  animate={controls}
                  className="text-sm text-developer-secondary text-center font-mono-developer"
                >
                  // I typically respond within 24 hours
                </motion.p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Terminal Window - Availability */}
        <motion.div
          variants={terminalVariants}
          initial="hidden"
          animate={controls}
          className="mt-12 terminal-window"
        >
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
              availability — status — 80×24
            </div>
          </div>
          <div className="terminal-body">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="font-mono-developer text-syntax-green">$ work_availability</div>
                <div className="text-2xl font-bold text-terminal mt-2">Remote</div>
                <div className="text-developer-secondary text-sm">Work Available</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="font-mono-developer text-syntax-green">$ working_hours</div>
                <div className="text-2xl font-bold text-terminal mt-2">Flexible</div>
                <div className="text-developer-secondary text-sm">Time Zone: UTC+5</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="font-mono-developer text-syntax-green">$ client_base</div>
                <div className="text-2xl font-bold text-terminal mt-2">Worldwide</div>
                <div className="text-developer-secondary text-sm">Global Clients</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Code Example */}
        <motion.div
          variants={terminalVariants}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.2 }}
          className="mt-12 code-block"
        >
          <div className="font-mono-developer text-sm">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-syntax-blue"
            >
              const
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="ml-4"
            >
              <span className="text-syntax-blue">{'{'}</span>{' '}
              <span className="text-syntax-green">name</span>,{' '}
              <span className="text-syntax-green">email</span>,{' '}
              <span className="text-syntax-green">message</span>{' '}
              <span className="text-syntax-blue">{'}'}</span>{' '}
              <span className="text-syntax-blue">=</span>{' '}
              <span className="text-syntax-blue">useState</span>(
              <span className="text-syntax-orange">''</span>);
            </motion.div>
            <br />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-syntax-purple">const</span>{' '}
              <span className="text-syntax-green">handleSubmit</span>{' '}
              <span className="text-syntax-blue">=</span>{' '}
              <span className="text-syntax-blue">async</span>{' '}
              <span className="text-syntax-blue">()</span>{' '}
              <span className="text-syntax-blue">{'=>'}</span>{' '}
              <span className="text-syntax-blue">{'{'}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="ml-4"
            >
              <span className="text-syntax-blue">try</span>{' '}
              <span className="text-syntax-blue">{'{'}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="ml-8"
            >
              <span className="text-syntax-blue">await</span>{' '}
              <span className="text-syntax-green">sendEmail</span>(
              <span className="text-syntax-blue">{'{'}</span>{' '}
              <span className="text-syntax-green">name</span>,{' '}
              <span className="text-syntax-green">email</span>,{' '}
              <span className="text-syntax-green">message</span>{' '}
              <span className="text-syntax-blue">{'}'}</span>);
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="ml-8"
            >
              <span className="text-syntax-green">console</span>.<span className="text-syntax-blue">log</span>(
              <span className="text-syntax-orange">'✓ Message sent successfully!'</span>);
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="ml-4"
            >
              <span className="text-syntax-blue">{'}'}</span>{' '}
              <span className="text-syntax-blue">catch</span>{' '}
              <span className="text-syntax-blue">(</span>
              <span className="text-syntax-blue">error</span>
              <span className="text-syntax-blue">)</span>{' '}
              <span className="text-syntax-blue">{'{'}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="ml-8"
            >
              <span className="text-syntax-green">console</span>.<span className="text-syntax-blue">error</span>(
              <span className="text-syntax-orange">'✗ Error sending message:'</span>,{' '}
              <span className="text-syntax-blue">error</span>);
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="ml-4"
            >
              <span className="text-syntax-blue">{'}'}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-syntax-blue">{'}'}</span>;
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-syntax-blue/20 via-syntax-green/20 to-syntax-purple/20 rounded-2xl p-8 md:p-12 text-center border border-developer relative overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-syntax-blue/5 via-syntax-green/5 to-syntax-purple/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(102,217,239,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative z-10">
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-2xl md:text-3xl font-bold text-terminal mb-4 font-mono-developer"
            >
              $ start_collaboration()
            </motion.h3>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-developer-secondary mb-8 max-w-2xl mx-auto font-mono-developer text-sm md:text-base"
            >
              // Let's build something amazing together. Contact me to discuss your project
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-terminal border border-developer text-terminal rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  contact_me() <FaArrowRight />
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
                  send_direct_email() <FaArrowRight />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-syntax-green/0 via-syntax-green/10 to-syntax-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .card-developer {
          transition: all 0.3s ease;
        }

        .card-developer:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2),
                      0 0 80px rgba(102, 217, 239, 0.1);
        }
      `}</style>
    </section>
  );
};

export default Contact;