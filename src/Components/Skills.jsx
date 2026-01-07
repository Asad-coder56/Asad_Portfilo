import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDatabase, 
  FaCloud,
  FaMobile,
  FaCode,
  FaServer,
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
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const observerRef = useRef(null);

  // Memoize skill categories to prevent re-renders
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
      color: 'border-syntax-green',
      bgColor: 'bg-syntax-green/5',
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
      color: 'border-syntax-purple',
      bgColor: 'bg-syntax-purple/5',
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
      color: 'border-syntax-orange',
      bgColor: 'bg-syntax-orange/5',
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90, color: '#F05032', description: 'Version control system' },
        { name: 'CI/CD', icon: FaRocket, level: 85, color: '#4285F4', description: 'Continuous integration & deployment' },
        { name: 'Agile/Scrum', icon: FaChartLine, level: 88, color: '#00C853', description: 'Project management framework' },
        { name: 'Testing', icon: FaCog, level: 80, color: '#FF5252', description: 'Quality assurance & testing' },
        { name: 'Mobile Dev', icon: FaMobile, level: 75, color: '#2196F3', description: 'Cross-platform mobile development' },
        { name: 'UI/UX Design', icon: FaBolt, level: 70, color: '#9C27B0', description: 'User interface & experience design' },
      ]
    }
  ], []);

  // Memoize code lines
  const codeLines = useMemo(() => [
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
  ], []);

  // Memoize skill stats
  const skillStats = useMemo(() => {
    const allSkills = skillCategories.flatMap(cat => cat.skills);
    const totalSkills = allSkills.length;
    const averageLevel = Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills);
    
    return {
      totalSkills,
      averageLevel,
      projectsCount: 50,
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
        scrollMarginTop: '4rem'
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
            <span className="text-white">$ skills --list --level=expert</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="text-syntax-blue">const</span>{' '}
            <span className="text-syntax-green">skills</span>{' '}
            <span className="text-syntax-blue">=</span>{' '}
            <span className="text-syntax-yellow">[</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
            // Mastery across the full stack development spectrum
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
              <div className="flex items-center">
                <div className="flex gap-1 mr-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm font-mono">
                  <span className="text-syntax-green">skills.ts</span>
                  <span className="mx-1.5">—</span>
                  <span className="text-syntax-blue">TypeScript</span>
                </div>
              </div>
            </div>
            
            <div className="terminal-body">
              <div className="font-mono text-sm">
                {codeLines.map((line, index) => (
                  <div key={index} className="mb-0.5">
                    <span className="text-syntax-purple">
                      {index === 0 ? 'const' : index === 6 ? '  },' : '  '}
                    </span>
                    <span className="text-white">
                      {line.replace(/^const |  |};$/g, '')}
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
              label: 'Total Skills', 
              value: skillStats.totalSkills, 
              icon: FaBrain,
              color: 'text-syntax-blue',
            },
            { 
              label: 'Average Mastery', 
              value: `${skillStats.averageLevel}%`, 
              icon: FaChartLine,
              color: 'text-syntax-green',
            },
            { 
              label: 'Projects', 
              value: '50+', 
              icon: FaRocket,
              color: 'text-syntax-purple',
            },
            { 
              label: 'Years Experience', 
              value: '3+', 
              icon: FaCog,
              color: 'text-syntax-orange',
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
              <div className="text-sm font-mono text-white">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Comparison Chart */}
        <motion.div 
          className="bg-black/30 backdrop-blur-sm rounded-lg p-5 border border-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold font-mono text-white">
              // Skill Comparison
            </h3>
            <div className="text-xs font-mono text-syntax-green">
              <span className="animate-pulse">●</span>
              <span className="ml-1.5">Live Data</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { skill: 'React', level: 95, color: '#61DAFB' },
              { skill: 'TypeScript', level: 85, color: '#3178C6' },
              { skill: 'Node.js', level: 90, color: '#339933' },
              { skill: 'Python', level: 85, color: '#3776AB' },
              { skill: 'MongoDB', level: 88, color: '#47A248' },
            ].map((item, index) => (
              <div 
                key={item.skill}
                className="flex items-center gap-3"
              >
                <div className="w-28">
                  <span className="text-sm font-mono text-white">
                    {item.skill}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="relative h-5 bg-gray-900 rounded-full overflow-hidden">
                    <div 
                      className="h-5 rounded-full transition-all duration-1000"
                      style={{ 
                        width: isVisible ? `${item.level}%` : '0%',
                        background: item.color,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-right">
                  <span className="text-sm font-mono text-syntax-green">
                    {item.level}%
                  </span>
                </div>
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
          display: flex;
          align-items: center;
          justify-content: space-between;
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