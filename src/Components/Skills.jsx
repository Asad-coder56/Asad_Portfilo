import React, { useEffect, useRef, useState } from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDatabase, 
  FaCloud,
  FaMobile,
  FaCode,
  FaServer,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaAws,
  FaTerminal,
  FaBolt,
  FaCog,
  FaRocket,
  FaChartLine,
  FaBrain
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiMongodb, 
  SiExpress, 
  SiNextdotjs, 
  SiTailwindcss,
  SiRedux,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiGraphql,
  SiFirebase,
  SiJavascript,
  SiCss3,
  SiHtml5
} from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = ({ setActiveSection, darkMode = true }) => {
  const sectionRef = useRef(null);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [progressAnimations, setProgressAnimations] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [codeLines, setCodeLines] = useState([]);
  const [skillStats, setSkillStats] = useState({
    totalSkills: 0,
    averageLevel: 0,
    projectsCount: 0,
    experienceYears: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setActiveSection('skills');
          
          // Initialize animations
          const allSkills = skillCategories.flatMap(cat => cat.skills.map(s => s.name));
          setAnimatedSkills(allSkills);
          
          const animations = {};
          allSkills.forEach(skill => {
            animations[skill] = 0;
          });
          setProgressAnimations(animations);
          
          // Animate progress bars with staggered delay
          allSkills.forEach((skill, index) => {
            setTimeout(() => {
              const skillData = skillCategories
                .flatMap(cat => cat.skills)
                .find(s => s.name === skill);
              if (skillData) {
                setProgressAnimations(prev => ({
                  ...prev,
                  [skill]: skillData.level
                }));
              }
            }, 300 + (index * 50));
          });

          // Calculate stats
          calculateStats();
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  // Initialize binary matrix for background
  useEffect(() => {
    const generateBinaryMatrix = () => {
      const matrix = [];
      for (let i = 0; i < 30; i++) {
        matrix.push({
          id: i,
          char: Math.random() > 0.5 ? '0' : '1',
          color: darkMode ? 'text-syntax-green' : 'text-green-500',
          opacity: 0.05 + Math.random() * 0.1,
          speed: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 5,
          size: Math.random() > 0.7 ? 'text-xs' : 'text-[8px]'
        });
      }
      return matrix;
    };
    
    setBinaryMatrix(generateBinaryMatrix());
  }, [darkMode]);

  // Generate code lines for typing effect
  useEffect(() => {
    const lines = [
      "const skills: Skill[] = [",
      "  { name: 'React', level: 95, color: '#61DAFB' },",
      "  { name: 'TypeScript', level: 85, color: '#3178C6' },",
      "  { name: 'Node.js', level: 90, color: '#339933' },",
      "  { name: 'Python', level: 85, color: '#3776AB' },",
      "  { name: 'MongoDB', level: 88, color: '#47A248' },",
      "  { name: 'AWS', level: 75, color: '#FF9900' },",
      "  { name: 'Docker', level: 80, color: '#2496ED' },",
      "  { name: 'Git', level: 90, color: '#F05032' },",
      "];"
    ];
    setCodeLines(lines);
  }, []);

  const calculateStats = () => {
    const allSkills = skillCategories.flatMap(cat => cat.skills);
    const totalSkills = allSkills.length;
    const averageLevel = Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills);
    
    setSkillStats({
      totalSkills,
      averageLevel,
      projectsCount: 50,
      experienceYears: 3
    });
  };

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: FaCode,
      description: 'Modern web interfaces & user experiences',
      color: darkMode ? 'border-syntax-blue' : 'border-blue-500',
      bgColor: darkMode ? 'bg-syntax-blue/5' : 'bg-blue-500/5',
      skills: [
        { name: 'React', icon: FaReact, level: 95, color: '#61DAFB', description: 'Component-based UI library' },
        { name: 'Next.js', icon: SiNextdotjs, level: 90, color: '#000000', description: 'React framework for production' },
        { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6', description: 'Typed JavaScript superset' },
        { name: 'JavaScript', icon: SiJavascript, level: 95, color: '#F7DF1E', description: 'Core web technology' },
        { name: 'HTML5', icon: SiHtml5, level: 98, color: '#E34F26', description: 'Web markup language' },
        { name: 'CSS3', icon: SiCss3, level: 90, color: '#1572B6', description: 'Styling web pages' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95, color: '#06B6D4', description: 'Utility-first CSS framework' },
        { name: 'Redux', icon: SiRedux, level: 85, color: '#764ABC', description: 'State management library' },
      ]
    },
    {
      title: 'Backend Development',
      icon: FaServer,
      description: 'Server-side logic & APIs',
      color: darkMode ? 'border-syntax-green' : 'border-green-500',
      bgColor: darkMode ? 'bg-syntax-green/5' : 'bg-green-500/5',
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 90, color: '#339933', description: 'JavaScript runtime' },
        { name: 'Express.js', icon: SiExpress, level: 88, color: '#000000', description: 'Web framework for Node.js' },
        { name: 'Python', icon: FaPython, level: 85, color: '#3776AB', description: 'General-purpose programming' },
        { name: 'REST APIs', icon: FaCode, level: 92, color: '#FF6B35', description: 'API architecture style' },
        { name: 'GraphQL', icon: SiGraphql, level: 80, color: '#E10098', description: 'Query language for APIs' },
        { name: 'Authentication', icon: FaBrain, level: 90, color: '#FF9800', description: 'Security & user management' },
      ]
    },
    {
      title: 'Database & Cloud',
      icon: FaDatabase,
      description: 'Data storage & cloud infrastructure',
      color: darkMode ? 'border-syntax-purple' : 'border-purple-500',
      bgColor: darkMode ? 'bg-syntax-purple/5' : 'bg-purple-500/5',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 88, color: '#47A248', description: 'NoSQL document database' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 85, color: '#336791', description: 'Relational database' },
        { name: 'Firebase', icon: SiFirebase, level: 82, color: '#FFCA28', description: 'Backend as a service' },
        { name: 'AWS', icon: FaAws, level: 75, color: '#FF9900', description: 'Cloud computing platform' },
        { name: 'Docker', icon: SiDocker, level: 80, color: '#2496ED', description: 'Containerization platform' },
        { name: 'Kubernetes', icon: SiKubernetes, level: 70, color: '#326CE5', description: 'Container orchestration' },
      ]
    },
    {
      title: 'Tools & Others',
      icon: FaGitAlt,
      description: 'Development workflow & methodologies',
      color: darkMode ? 'border-syntax-orange' : 'border-orange-500',
      bgColor: darkMode ? 'bg-syntax-orange/5' : 'bg-orange-500/5',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90, color: '#F05032', description: 'Version control system' },
        { name: 'CI/CD', icon: FaRocket, level: 85, color: '#4285F4', description: 'Continuous integration & deployment' },
        { name: 'Agile/Scrum', icon: FaChartLine, level: 88, color: '#00C853', description: 'Project management framework' },
        { name: 'Testing', icon: FaCog, level: 80, color: '#FF5252', description: 'Quality assurance & testing' },
        { name: 'Mobile Dev', icon: FaMobile, level: 75, color: '#2196F3', description: 'Cross-platform mobile development' },
        { name: 'UI/UX Design', icon: FaBolt, level: 70, color: '#9C27B0', description: 'User interface & experience design' },
      ]
    }
  ];

  const getProgressAnimation = (skillName) => {
    return progressAnimations[skillName] || 0;
  };

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (custom) => ({
      width: `${custom}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0a0a0a' : '#000000',
        backgroundImage: darkMode 
          ? `radial-gradient(circle at 30% 20%, rgba(102, 217, 239, 0.05) 0%, transparent 40%),
             radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 40%)`
          : `radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
             radial-gradient(circle at 70% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 40%)`
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
        className="absolute inset-0 opacity-10"
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
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800 text-sm font-mono-developer mb-4"
            whileHover={{ scale: 1.05 }}
            animate={{ 
              boxShadow: [
                `0 0 0 0 ${darkMode ? 'rgba(102, 217, 239, 0)' : 'rgba(59, 130, 246, 0)'}`,
                `0 0 0 4px ${darkMode ? 'rgba(102, 217, 239, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                `0 0 0 0 ${darkMode ? 'rgba(102, 217, 239, 0)' : 'rgba(59, 130, 246, 0)'}`
              ]
            }}
            transition={{ 
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <FaTerminal className={darkMode ? 'text-syntax-blue' : 'text-blue-500'} />
            <span className={darkMode ? 'text-terminal' : 'text-white'}>$ skills --list --level=expert</span>
          </motion.span>
          
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>const</span>{' '}
            <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>skills</span>{' '}
            <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>=</span>{' '}
            <span className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}>[</span>
          </motion.h2>
          
          <motion.p 
            className={`text-lg max-w-2xl mx-auto font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            // Mastery across the full stack development spectrum
          </motion.p>
        </motion.div>

        {/* Skill Categories */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              variants={itemVariants}
              custom={categoryIndex}
              onMouseEnter={() => setActiveCategory(category.title)}
              onMouseLeave={() => setActiveCategory(null)}
              className={`group relative rounded-xl p-6 border transition-all duration-300 ${category.color} ${category.bgColor} backdrop-blur-sm hover:shadow-2xl hover:shadow-current/20 overflow-hidden`}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glow effect */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 blur-xl"
                animate={{ 
                  x: ['-100%', '100%'],
                }}
                transition={{
                  x: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              ></motion.div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <motion.div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center border ${category.color} bg-black/30`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <category.icon className={`text-xl ${darkMode ? 'text-syntax-blue' : 'text-blue-500'}`} />
                </motion.div>
                <div>
                  <h3 className={`text-xl font-bold font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                    {category.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-5 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    className="skill-item group/skill"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * skillIndex }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/30 border border-gray-800"
                          whileHover={{ 
                            scale: 1.2,
                            rotate: 360,
                            boxShadow: `0 0 15px ${skill.color}`
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <skill.icon className="text-lg" style={{ color: skill.color }} />
                        </motion.div>
                        <div>
                          <span className={`text-sm font-medium font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                            {skill.name}
                          </span>
                          <AnimatePresence>
                            {hoveredSkill === skill.name && (
                              <motion.p 
                                className="text-xs text-gray-400 mt-1"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                              >
                                {skill.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <motion.span 
                        className={`text-sm font-bold font-mono-developer ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}
                        animate={isVisible ? {
                          scale: [1, 1.1, 1],
                          transition: { delay: 0.5 + skillIndex * 0.1, duration: 0.3 }
                        } : {}}
                      >
                        {getProgressAnimation(skill.name)}%
                      </motion.span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative">
                      <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-terminal/10' : 'bg-gray-800'}`}>
                        <motion.div 
                          className="h-2 rounded-full relative"
                          variants={progressBarVariants}
                          custom={skill.level}
                          initial="hidden"
                          animate={isVisible ? "visible" : "hidden"}
                          style={{ 
                            background: `linear-gradient(90deg, 
                              ${skill.color}40, 
                              ${skill.color} 70%, 
                              ${skill.color}cc)`,
                            boxShadow: `0 0 10px ${skill.color}40`
                          }}
                        >
                          {/* Scan line effect */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ 
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              x: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }
                            }}
                          ></motion.div>
                          
                          {/* Progress end dot */}
                          <motion.div 
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2"
                            style={{ borderColor: skill.color }}
                            animate={{ 
                              scale: [1, 1.5, 1],
                              boxShadow: [
                                `0 0 0 0 ${skill.color}40`,
                                `0 0 0 4px ${skill.color}40`,
                                `0 0 0 0 ${skill.color}40`
                              ]
                            }}
                            transition={{ 
                              scale: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              },
                              boxShadow: {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }
                            }}
                          ></motion.div>
                        </motion.div>
                      </div>
                      
                      {/* Progress ticks */}
                      <div className="flex justify-between mt-1 px-1">
                        {[0, 25, 50, 75, 100].map((tick) => (
                          <div key={tick} className="relative">
                            <div className={`w-0.5 h-2 ${
                              getProgressAnimation(skill.name) >= tick 
                                ? (darkMode ? 'bg-syntax-green' : 'bg-green-500')
                                : (darkMode ? 'bg-developer' : 'bg-gray-700')
                            }`}></div>
                            <span className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs ${darkMode ? 'text-developer-secondary' : 'text-gray-500'}`}>
                              {tick}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live Code Editor */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="flex items-center">
                <div className="flex gap-1 mr-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  ></motion.div>
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  ></motion.div>
                </div>
                <div className={`text-sm font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                  <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>skills.ts</span>
                  <span className="mx-2">—</span>
                  <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>TypeScript</span>
                </div>
              </div>
              <div className={`text-xs font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ●
                </motion.span>
                <span className="ml-2">Live</span>
              </div>
            </div>
            
            <div className="terminal-body">
              <div className="font-mono-developer text-sm">
                <AnimatePresence>
                  {codeLines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="mb-1"
                    >
                      <span className={darkMode ? 'text-syntax-purple' : 'text-purple-500'}>
                        {index === 0 ? 'const' : index === 6 ? '  },' : '  '}
                      </span>
                      <span className={darkMode ? 'text-terminal' : 'text-white'}>
                        {line.replace(/^const |  |};$/g, '')}
                      </span>
                      {index === codeLines.length - 1 && (
                        <motion.span 
                          className="ml-1 inline-block w-2 h-4 bg-green-500"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        ></motion.span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Compilation status */}
                <motion.div 
                  className="mt-6 pt-4 border-t border-gray-800"
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: 1.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-syntax-green animate-pulse' : 'bg-green-500 animate-pulse'}`}></div>
                    <div className={`font-mono-developer text-sm ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>
                      $ tsc skills.ts --noEmit
                    </div>
                  </div>
                  <div className="ml-5 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-syntax-blue' : 'bg-blue-500'}`}></div>
                      <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
                        Type checking completed successfully
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${darkMode ? 'bg-syntax-yellow' : 'bg-yellow-500'}`}></div>
                      <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
                        Found 0 errors. Watching for file changes.
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Dashboard */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          {[
            { 
              label: 'Total Skills', 
              value: skillStats.totalSkills, 
              icon: FaBrain,
              color: darkMode ? 'text-syntax-blue' : 'text-blue-500',
              gradient: 'from-blue-500 to-cyan-500'
            },
            { 
              label: 'Average Mastery', 
              value: `${skillStats.averageLevel}%`, 
              icon: FaChartLine,
              color: darkMode ? 'text-syntax-green' : 'text-green-500',
              gradient: 'from-green-500 to-emerald-500'
            },
            { 
              label: 'Projects', 
              value: '50+', 
              icon: FaRocket,
              color: darkMode ? 'text-syntax-purple' : 'text-purple-500',
              gradient: 'from-purple-500 to-pink-500'
            },
            { 
              label: 'Years Experience', 
              value: '3+', 
              icon: FaCog,
              color: darkMode ? 'text-syntax-orange' : 'text-orange-500',
              gradient: 'from-orange-500 to-red-500'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 group-hover:border-current transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`text-2xl ${stat.color}`} />
                  <motion.div 
                    className={`text-3xl font-bold font-mono-developer ${stat.color}`}
                    animate={isVisible ? {
                      scale: [1, 1.1, 1],
                      transition: { delay: 1 + index * 0.2, duration: 0.5 }
                    } : {}}
                  >
                    {stat.value}
                  </motion.div>
                </div>
                <div className={`text-sm font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                  {stat.label}
                </div>
                <div className="mt-3 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-1 bg-gradient-to-r ${stat.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: '100%' } : {}}
                    transition={{ delay: 1.2 + index * 0.1, duration: 1 }}
                  ></motion.div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Comparison Chart */}
        <motion.div 
          className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
              // Skill Comparison Chart
            </h3>
            <div className={`text-sm font-mono-developer ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>
              <span className="animate-pulse">●</span>
              <span className="ml-2">Live Data</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { skill: 'React', level: 95, color: '#61DAFB' },
              { skill: 'TypeScript', level: 85, color: '#3178C6' },
              { skill: 'Node.js', level: 90, color: '#339933' },
              { skill: 'Python', level: 85, color: '#3776AB' },
              { skill: 'MongoDB', level: 88, color: '#47A248' },
            ].map((item, index) => (
              <motion.div 
                key={item.skill}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="w-32">
                  <span className={`text-sm font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                    {item.skill}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="relative h-6 bg-gray-900 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-6 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${item.level}%` } : {}}
                      transition={{ delay: 1.2 + index * 0.1, duration: 1.5 }}
                      style={{
                        background: `linear-gradient(90deg, ${item.color}40, ${item.color})`,
                        boxShadow: `0 0 10px ${item.color}40`
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ 
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          x: {
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "linear"
                          }
                        }}
                      ></motion.div>
                    </motion.div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className={`text-sm font-bold font-mono-developer ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>
                    {item.level}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .terminal-window {
          background: rgba(0, 0, 0, 0.7);
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(10px);
        }

        .terminal-body {
          padding: 1.5rem;
          min-height: 200px;
          max-height: 400px;
          overflow-y: auto;
          font-family: 'Fira Code', 'Consolas', monospace;
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .skill-item:hover .progress-bar-animation {
          box-shadow: 0 0 20px currentColor;
        }
      `}</style>
    </section>
  );
};

export default Skills;