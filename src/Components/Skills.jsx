import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaCloud,
  FaCode,
  FaServer,
  FaGitAlt,
  FaAws,
  FaTerminal,
  FaBolt,
  FaCog,
  FaRocket,
  FaChartLine,
  FaBrain,
  FaShieldAlt,
  FaSync,
  FaBolt as FaLightning,
  FaLayerGroup,
  FaLock,
  FaRocket as FaDeploy,
  FaTasks
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiMongodb, 
  SiExpress, 
  SiNextdotjs, 
  SiTailwindcss,
  SiRedux,
  SiDocker,
  SiPostgresql,
  SiGraphql,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiMongoose,
  SiJest,
  SiWebpack,
  SiNodedotjs,
  SiJsonwebtokens,
  SiSocketdotio,
  SiRedis
} from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = ({ setActiveSection, darkMode = true }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const observerRef = useRef(null);

  // Memoize skill categories for MERN stack developer
  const skillCategories = useMemo(() => [
    {
      title: 'Frontend Development',
      icon: FaCode,
      description: 'Modern web interfaces & user experiences',
      color: 'border-syntax-blue',
      bgColor: 'bg-syntax-blue/5',
      skills: [
        { name: 'React', icon: FaReact, level: 95, color: '#61DAFB', description: 'Component-based UI library' },
        { name: 'Next.js', icon: SiNextdotjs, level: 90, color: '#000000', description: 'React framework for production' },
        { name: 'TypeScript', icon: SiTypescript, level: 88, color: '#3178C6', description: 'Typed JavaScript superset' },
        { name: 'Redux', icon: SiRedux, level: 85, color: '#764ABC', description: 'State management library' },
        { name: 'JavaScript', icon: SiJavascript, level: 95, color: '#F7DF1E', description: 'Core web technology' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 92, color: '#06B6D4', description: 'Utility-first CSS framework' },
        { name: 'HTML5/CSS3', icon: SiHtml5, level: 96, color: '#E34F26', description: 'Web markup & styling' },
        { name: 'Responsive Design', icon: FaSync, level: 94, color: '#2196F3', description: 'Cross-device compatibility' },
      ]
    },
    {
      title: 'Backend Development',
      icon: FaServer,
      description: 'Server-side logic & APIs',
      color: 'border-syntax-green',
      bgColor: 'bg-syntax-green/5',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, level: 92, color: '#339933', description: 'JavaScript runtime' },
        { name: 'Express.js', icon: SiExpress, level: 90, color: '#000000', description: 'Web framework for Node.js' },
        { name: 'REST APIs', icon: FaCode, level: 94, color: '#FF6B35', description: 'API architecture style' },
        { name: 'JWT Auth', icon: SiJsonwebtokens, level: 88, color: '#000000', description: 'Authentication & security' },
        { name: 'WebSockets', icon: SiSocketdotio, level: 85, color: '#010101', description: 'Real-time communication' },
        { name: 'GraphQL', icon: SiGraphql, level: 80, color: '#E10098', description: 'Query language for APIs' },
        { name: 'Middleware', icon: FaLayerGroup, level: 90, color: '#9C27B0', description: 'Request processing' },
        { name: 'Server Security', icon: FaShieldAlt, level: 87, color: '#FF9800', description: 'Security implementation' },
      ]
    },
    {
      title: 'Database & DevOps',
      icon: FaDatabase,
      description: 'Data storage & deployment',
      color: 'border-syntax-purple',
      bgColor: 'bg-syntax-purple/5',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 90, color: '#47A248', description: 'NoSQL document database' },
        { name: 'Mongoose ODM', icon: SiMongoose, level: 88, color: '#880000', description: 'MongoDB object modeling' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 85, color: '#336791', description: 'Relational database' },
        { name: 'Redis', icon: SiRedis, level: 82, color: '#DC382D', description: 'In-memory data store' },
        { name: 'Docker', icon: SiDocker, level: 83, color: '#2496ED', description: 'Containerization platform' },
        { name: 'AWS', icon: FaAws, level: 80, color: '#FF9900', description: 'Cloud computing platform' },
        { name: 'CI/CD', icon: FaRocket, level: 85, color: '#4285F4', description: 'Continuous integration/deployment' },
        { name: 'Git', icon: FaGitAlt, level: 95, color: '#F05032', description: 'Version control system' },
      ]
    },
    {
      title: 'Testing & Tools',
      icon: FaTasks,
      description: 'Quality assurance & development tools',
      color: 'border-syntax-orange',
      bgColor: 'bg-syntax-orange/5',
      skills: [
        { name: 'Jest', icon: SiJest, level: 85, color: '#C21325', description: 'Testing framework' },
        { name: 'Testing Library', icon: FaBrain, level: 82, color: '#E33332', description: 'React testing utilities' },
        { name: 'Webpack', icon: SiWebpack, level: 80, color: '#8DD6F9', description: 'Module bundler' },
        { name: 'GitHub Actions', icon: FaSync, level: 78, color: '#2088FF', description: 'Automation workflows' },
        { name: 'Agile/Scrum', icon: FaChartLine, level: 88, color: '#00C853', description: 'Project management' },
        { name: 'Performance Opt', icon: FaBolt, level: 85, color: '#FF5252', description: 'Performance optimization' },
        { name: 'Code Review', icon: FaCode, level: 90, color: '#2196F3', description: 'Code quality assessment' },
        { name: 'Documentation', icon: FaCog, level: 92, color: '#607D8B', description: 'Technical documentation' },
      ]
    }
  ], []);

  // Memoize code lines for MERN stack
  const codeLines = useMemo(() => [
    "const mernSkills: SkillSet[] = [",
    "  { name: 'React', level: 95, category: 'Frontend' },",
    "  { name: 'Node.js', level: 92, category: 'Backend' },",
    "  { name: 'Express.js', level: 90, category: 'Backend' },",
    "  { name: 'MongoDB', level: 90, category: 'Database' },",
    "  { name: 'TypeScript', level: 88, category: 'Frontend' },",
    "  { name: 'Redux', level: 85, category: 'State Management' },",
    "  { name: 'Docker', level: 83, category: 'DevOps' },",
    "  { name: 'AWS', level: 80, category: 'Cloud' },",
    "];"
  ], []);

  // Memoize skill stats
  const skillStats = useMemo(() => {
    const allSkills = skillCategories.flatMap(cat => cat.skills);
    const totalSkills = allSkills.length;
    const averageLevel = Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills);
    
    return {
      totalSkills,
      averageLevel,
      projectsCount: 40,
      experienceYears: 3
    };
  }, [skillCategories]);

  // Intersection Observer
  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            setActiveSection('skills');
          }
        },
        { threshold: 0.1 }
      );
    }

    const currentRef = sectionRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observerRef.current?.unobserve(currentRef);
      }
    };
  }, [setActiveSection]);

  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="min-h-screen py-16 relative"
      style={{ 
        backgroundColor: '#0a0a0a',
        scrollMarginTop: '4rem',
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(71, 162, 72, 0.05) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(102, 217, 239, 0.05) 0%, transparent 50%)`
      }}
    >
      {/* Simplified Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(102, 217, 239, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(102, 217, 239, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-gray-800 text-sm font-mono mb-4">
            <FaTerminal className="text-syntax-blue" />
            <span className="text-white">$ mern-skills --expertise --full-stack</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="text-syntax-blue">export</span>{' '}
            <span className="text-syntax-green">const</span>{' '}
            <span className="text-white">skills</span>{' '}
            <span className="text-syntax-blue">=</span>{' '}
            <span className="text-syntax-yellow">[</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
            // MERN Stack expertise with modern web technologies
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.title}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={itemVariants}
              transition={{ delay: categoryIndex * 0.1 }}
              className="group relative rounded-lg p-4 border bg-black/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-700 bg-black/50">
                  <category.icon className="text-lg text-syntax-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono text-white">
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill.name}
                    className="skill-item"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded flex items-center justify-center bg-black/30 border border-gray-700">
                          <skill.icon className="text-sm" style={{ color: skill.color }} />
                        </div>
                        <span className="text-sm font-mono text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-syntax-green">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full h-1.5 rounded-full overflow-hidden bg-gray-800">
                        <div 
                          className="h-1.5 rounded-full transition-all duration-1000"
                          style={{ 
                            width: isVisible ? `${skill.level}%` : '0%',
                            background: skill.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Code Editor */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex gap-1 mr-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-mono">
                    <span className="text-syntax-green">mern-skills.ts</span>
                    <span className="mx-1.5">—</span>
                    <span className="text-syntax-blue">TypeScript</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-syntax-purple">
                  <span className="animate-pulse">●</span>
                  <span className="ml-1.5">MERN Stack</span>
                </div>
              </div>
            </div>
            
            <div className="terminal-body">
              <div className="font-mono text-sm">
                {codeLines.map((line, index) => (
                  <div key={index} className="mb-0.5">
                    <span className="text-syntax-purple">
                      {index === 0 ? 'const' : index === 8 ? '];' : '  '}
                    </span>
                    <span className="text-white">
                      {line.replace(/^const |export const |];$/g, '')}
                    </span>
                    {index === codeLines.length - 1 && (
                      <span className="ml-1 inline-block w-1.5 h-3.5 bg-green-500 animate-pulse"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { 
              label: 'Tech Stack', 
              value: 'MERN', 
              icon: FaLayerGroup,
              color: 'text-syntax-blue',
              description: 'Primary Stack'
            },
            { 
              label: 'Average Mastery', 
              value: `${skillStats.averageLevel}%`, 
              icon: FaChartLine,
              color: 'text-syntax-green',
              description: 'Skill Level'
            },
            { 
              label: 'Projects', 
              value: '40+', 
              icon: FaRocket,
              color: 'text-syntax-purple',
              description: 'Completed'
            },
            { 
              label: 'Experience', 
              value: '3+ Years', 
              icon: FaCog,
              color: 'text-syntax-orange',
              description: 'Full Stack Dev'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`text-xl ${stat.color}`} />
                <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
              <div className="text-sm font-mono text-white mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* MERN Stack Progress Chart */}
        <motion.div 
          className="bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-syntax-green animate-pulse"></div>
              <h3 className="text-lg font-bold font-mono text-white">
                // MERN Stack Proficiency
              </h3>
            </div>
            <div className="text-xs font-mono text-syntax-green">
              <span>Full Stack</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { skill: 'React', level: 95, color: '#61DAFB', category: 'Frontend' },
              { skill: 'Node.js', level: 92, color: '#339933', category: 'Backend' },
              { skill: 'Express.js', level: 90, color: '#000000', category: 'Backend' },
              { skill: 'MongoDB', level: 90, color: '#47A248', category: 'Database' },
              { skill: 'TypeScript', level: 88, color: '#3178C6', category: 'Frontend' },
              { skill: 'Redux', level: 85, color: '#764ABC', category: 'State Mgmt' },
            ].map((item, index) => (
              <div 
                key={item.skill}
                className="flex items-center gap-4"
              >
                <div className="w-32 flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-mono text-white">
                    {item.skill}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({item.category})
                  </span>
                </div>
                <div className="flex-1">
                  <div className="relative h-6 bg-gray-900 rounded-full overflow-hidden">
                    <div 
                      className="h-6 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                      style={{ 
                        width: isVisible ? `${item.level}%` : '0%',
                        background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
                      }}
                    >
                      <span className="text-xs font-mono text-black font-bold">
                        {item.level}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Specialization Badges */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: 'REST APIs', color: 'border-blue-500 text-blue-400' },
              { label: 'JWT Auth', color: 'border-green-500 text-green-400' },
              { label: 'Mongoose ODM', color: 'border-red-500 text-red-400' },
              { label: 'Real-time Apps', color: 'border-purple-500 text-purple-400' },
              { label: 'State Management', color: 'border-yellow-500 text-yellow-400' },
              { label: 'Performance Opt', color: 'border-cyan-500 text-cyan-400' },
              { label: 'API Security', color: 'border-orange-500 text-orange-400' },
              { label: 'Database Design', color: 'border-pink-500 text-pink-400' },
            ].map((badge, index) => (
              <div 
                key={index}
                className={`px-3 py-1.5 rounded-full border bg-black/30 backdrop-blur-sm text-xs font-mono ${badge.color}`}
              >
                {badge.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .terminal-window {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .terminal-header {
          background: rgba(20, 20, 20, 0.8);
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .terminal-body {
          padding: 1rem;
          min-height: 150px;
          font-family: 'Fira Code', 'Consolas', monospace;
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
          animation: pulse 2s ease-in-out infinite;
        }

        /* Skill item hover effect */
        .skill-item:hover {
          transform: translateX(2px);
          transition: transform 0.2s ease;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Optimize for mobile */
        @media (max-width: 640px) {
          .terminal-body {
            font-size: 11px;
            padding: 0.75rem;
          }
          
          .skill-item .text-sm {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(Skills);