import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaAward, 
  FaTerminal, 
  FaCode,
  FaBriefcase,
  FaRocket,
  FaDatabase,
  FaServer,
  FaReact,
  FaNodeJs,
  FaPython,
  FaCloud,
  FaBrain,
  FaChartLine,
  FaCog,
  FaSync,
  FaPlay,
  FaLaptopCode,
  FaUniversity,
  FaUserGraduate,
  FaCertificate,
  FaTools
} from 'react-icons/fa';
import { 
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiAwsamplify,
  SiGit,
  SiVercel
} from 'react-icons/si';

const Education = ({ setActiveSection, darkMode = true }) => {
  const sectionRef = useRef(null);
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [activeTab, setActiveTab] = useState('education');
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [codeLines, setCodeLines] = useState([]);
  const [activeCodeLine, setActiveCodeLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('education');
          
          // Generate code lines for typing effect
          const lines = [
            "interface Education {",
            "  degree: string;",
            "  institution: string;",
            "  period: string;",
            "  cgpa: number;",
            "  status: 'Completed' | 'In Progress';",
            "}",
            "",
            "const myEducation: Education = {",
            "  degree: 'BS Software Engineering',",
            "  institution: 'University of Mianwali',",
            "  period: '2021 – 2024',",
            "  cgpa: 3.38,",
            "  status: 'Completed'",
            "};"
          ];
          setCodeLines(lines);
          
          // Start code line animation
          let currentLine = 0;
          const interval = setInterval(() => {
            setActiveCodeLine(prev => {
              if (prev < lines.length - 1) {
                return prev + 1;
              }
              clearInterval(interval);
              return prev;
            });
            currentLine++;
            if (currentLine >= lines.length) {
              clearInterval(interval);
            }
          }, 150);
        }
      },
      { threshold: 0.3 }
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
      for (let i = 0; i < 35; i++) {
        matrix.push({
          id: i,
          char: Math.random() > 0.5 ? '0' : '1',
          color: darkMode ? 'text-syntax-green' : 'text-green-500',
          opacity: 0.05 + Math.random() * 0.1,
          speed: 2 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 5,
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

  // Progress animation for timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const educationData = [
    {
      degree: "BS Software Engineering",
      institution: "University of Mianwali",
      period: "2021 – 2024",
      description: "Completed with honors (CGPA: 3.38/4.00)",
      location: "Mianwali, Pakistan",
      icon: FaUniversity,
      color: darkMode ? 'syntax-blue' : 'blue-500',
      bgColor: darkMode ? '#61DAFB20' : '#3B82F620',
      iconColor: '#61DAFB',
      courses: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Web Development', 'AI/ML'],
      skills: ['Python', 'Java', 'C++', 'SQL', 'OOP', 'System Design']
    },
    {
      degree: "Intermediate (FSc Pre Engineering)",
      institution: "Superior College Mianwali",
      period: "2018 – 2020",
      description: "Completed with distinction in Science subjects",
      location: "Mianwali, Pakistan",
      icon: FaUserGraduate,
      color: darkMode ? 'syntax-green' : 'green-500',
      bgColor: darkMode ? '#33993320' : '#10B98120',
      iconColor: '#339933',
      courses: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science'],
      skills: ['Problem Solving', 'Analytical Thinking', 'Mathematics']
    },
    {
      degree: "Matriculation",
      institution: "Govt. High School Mitha Khattak",
      period: "2017 – 2019",
      description: "Completed with excellent grades",
      location: "Mitha Khattak, Pakistan",
      icon: FaGraduationCap,
      color: darkMode ? 'syntax-purple' : 'purple-500',
      bgColor: darkMode ? '#764ABC20' : '#8B5CF620',
      iconColor: '#764ABC',
      courses: ['Science', 'Mathematics', 'Computer Basics'],
      skills: ['Basic Programming', 'Logical Thinking']
    }
  ];

  const workExperience = [
    {
      position: "MERN Stack Developer",
      company: "MRA Developer Company",
      period: "2025 – Present",
      duration: "7 months",
      description: "Developing full-stack web applications using MongoDB, Express.js, React, and Node.js. Collaborating with cross-functional teams to deliver high-quality software solutions.",
      location: "Onsite",
      icon: FaBriefcase,
      color: darkMode ? 'syntax-orange' : 'orange-500',
      bgColor: darkMode ? '#FD971F20' : '#F9731620',
      iconColor: '#FD971F',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript', 'Redux'],
      achievements: ['Built 3+ production applications', 'Improved performance by 40%', 'Led team of 3 developers']
    },
    {
      position: "Full Stack Developer Intern",
      company: "Tech Solutions Inc.",
      period: "2025-2025", duration: "3months",
     
      description: "Assisted in developing web applications and learned industry best practices in software development.",
      location: "Onsite",
      icon: FaLaptopCode,
      color: darkMode ? 'syntax-cyan' : 'cyan-500',
      bgColor: darkMode ? '#2496ED20' : '#06B6D420',
      iconColor: '#2496ED',
      technologies: ['JavaScript', 'React', 'Node.js', 'MySQL'],
      achievements: ['Completed 2 major projects', 'Learned Agile methodology', 'Gained production experience']
    }
  ];

  const certifications = [
    {
      title: "Full Stack Web Development",
      issuer: "Coursera",
      year: "2023",
      icon: FaCertificate,
      color: darkMode ? 'syntax-blue' : 'blue-500',
      bgColor: darkMode ? '#61DAFB20' : '#3B82F620',
      iconColor: '#61DAFB',
      credential: "CR-123456",
      skills: ['MERN Stack', 'REST APIs', 'Authentication']
    },
    {
      title: "React Native Development",
      issuer: "Udemy",
      year: "2023",
      icon: FaCertificate,
      color: darkMode ? 'syntax-green' : 'green-500',
      bgColor: darkMode ? '#33993320' : '#10B98120',
      iconColor: '#339933',
      credential: "UD-789012",
      skills: ['Mobile Development', 'Cross-platform', 'React Native']
    },
    {
      title: "Machine Learning Fundamentals",
      issuer: "Google",
      year: "2022",
      icon: FaCertificate,
      color: darkMode ? 'syntax-purple' : 'purple-500',
      bgColor: darkMode ? '#764ABC20' : '#8B5CF620',
      iconColor: '#764ABC',
      credential: "GO-345678",
      skills: ['Python', 'TensorFlow', 'Data Analysis']
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2022",
      icon: FaCertificate,
      color: darkMode ? 'syntax-orange' : 'orange-500',
      bgColor: darkMode ? '#FD971F20' : '#F9731620',
      iconColor: '#FD971F',
      credential: "AWS-901234",
      skills: ['Cloud Computing', 'AWS Services', 'Deployment']
    }
  ];

  const skillsAcquired = [
    { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'], icon: FaReact },
    { category: 'Backend', skills: ['Node.js', 'Express.js', 'Python', 'REST APIs', 'GraphQL'], icon: FaServer },
    { category: 'Database', skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'], icon: FaDatabase },
    { category: 'DevOps', skills: ['Docker', 'AWS', 'CI/CD', 'Git', 'Vercel'], icon: FaCloud },
    { category: 'AI/ML', skills: ['Python', 'TensorFlow', 'Data Analysis', 'Machine Learning'], icon: FaBrain },
    { category: 'Tools', skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Jira'], icon: FaTools }
  ];

  const simulateTerminal = (command) => {
    setIsTerminalRunning(true);
    setTerminalOutput(prev => [...prev, { text: `$ ${command}`, type: 'command' }]);
    
    setTimeout(() => {
      const outputs = [
        'Fetching education data...',
        'Processing academic records...',
        'Calculating CGPA...',
        '✓ Education data loaded successfully!'
      ];
      
      outputs.forEach((output, index) => {
        setTimeout(() => {
          setTerminalOutput(prev => [
            ...prev,
            { text: output, type: 'output' }
          ]);
        }, index * 500);
      });
      
      setTimeout(() => {
        setIsTerminalRunning(false);
      }, outputs.length * 500);
    }, 1000);
  };

  const educationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      id="education" 
      ref={sectionRef} 
      className="min-h-screen py-20 relative overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0a0a0a' : '#000000',
        backgroundImage: darkMode 
          ? `radial-gradient(circle at 20% 30%, rgba(102, 217, 239, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`
          : `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`
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
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <FaTerminal className={darkMode ? 'text-syntax-blue' : 'text-blue-500'} />
            <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
              $ cd ./education && ./academic_journey.sh
            </span>
            <motion.div 
              className="w-2 h-4 ml-2"
              style={{ backgroundColor: darkMode ? '#10B981' : '#10B981' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            ></motion.div>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>interface</span>{' '}
            <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>Education</span>{' '}
            <span className={darkMode ? 'text-terminal' : 'text-white'}>{'{'}</span>
            <br />
            <span className="ml-8 text-xl sm:text-2xl">
              <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>academicJourney</span>
              <span className={darkMode ? 'text-terminal' : 'text-white'}>: </span>
              <span className={darkMode ? 'text-syntax-purple' : 'text-purple-500'}>AcademicRecord</span>
              <span className={darkMode ? 'text-terminal' : 'text-white'}>[]</span>
            </span>
          </h2>
          
          <p className={`text-lg max-w-2xl mx-auto font-mono-developer ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
            // Academic journey, professional experience, and continuous learning
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex bg-black/50 backdrop-blur-sm rounded-lg border border-gray-800 p-1">
            {['education', 'experience', 'certifications'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-mono-developer text-sm transition-all flex items-center gap-2 ${
                  activeTab === tab
                    ? `${darkMode ? 'bg-syntax-blue text-terminal' : 'bg-blue-500 text-white'}`
                    : `${darkMode ? 'text-developer-secondary hover:text-terminal' : 'text-gray-400 hover:text-white'}`
                }`}
              >
                {tab === 'education' && <FaGraduationCap />}
                {tab === 'experience' && <FaBriefcase />}
                {tab === 'certifications' && <FaCertificate />}
                {tab}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Active Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              {/* Timeline Progress Bar */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono-developer text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
                    Academic Timeline
                  </span>
                  <span className={`font-mono-developer text-sm ${darkMode ? 'text-syntax-green' : 'text-green-500'}`}>
                    {progress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-2 bg-gradient-to-r from-syntax-blue via-syntax-green to-syntax-purple"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  ></motion.div>
                </div>
              </div>

              {/* Education Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-syntax-blue to-syntax-purple hidden md:block">
                  <motion.div 
                    className="h-full bg-gradient-to-b from-syntax-blue to-syntax-purple"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{ originY: 0 }}
                  ></motion.div>
                </div>

                {educationData.map((edu, index) => (
                  <motion.div 
                    key={edu.degree}
                    custom={index}
                    variants={educationVariants}
                    initial="hidden"
                    animate="visible"
                    className={`relative flex flex-col md:flex-row items-center mb-12 group`}
                  >
                    {/* Timeline dot */}
                    <motion.div 
                      className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 z-10"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <div className={`w-8 h-8 rounded-full ${edu.bgColor} border-2 flex items-center justify-center border-terminal backdrop-blur-sm`}
                        style={{ borderColor: edu.iconColor }}
                      >
                        <edu.icon style={{ color: edu.iconColor }} />
                      </div>
                      <motion.div 
                        className="absolute inset-0 rounded-full border-2 animate-ping"
                        style={{ borderColor: edu.iconColor }}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      ></motion.div>
                    </motion.div>

                    {/* Content */}
                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                      <motion.div 
                        className={`bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-current transition-colors group/card relative overflow-hidden`}
                        whileHover={{ y: -5, scale: 1.02 }}
                        style={{ borderColor: edu.iconColor + '40' }}
                      >
                        {/* Glow effect */}
                        <motion.div 
                          className="absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover/card:opacity-10 blur-xl"
                          style={{ color: edu.iconColor }}
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

                        <div className="flex items-start gap-4 mb-4 relative z-10">
                          <div className={`w-14 h-14 rounded-lg ${edu.bgColor} border border-gray-800 flex items-center justify-center backdrop-blur-sm`}>
                            <edu.icon className={`text-2xl`} style={{ color: edu.iconColor }} />
                          </div>
                          <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                            <h3 className={`text-xl font-bold mb-1 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                              {edu.degree}
                            </h3>
                            <p className={`font-mono-developer`} style={{ color: edu.iconColor }}>
                              {edu.institution}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                          <div className={`flex items-center gap-2 ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                            <FaCalendarAlt />
                            <span className="font-mono-developer text-sm">{edu.period}</span>
                          </div>
                          <div className={`flex items-center gap-2 ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                            <FaMapMarkerAlt />
                            <span className="font-mono-developer text-sm">{edu.location}</span>
                          </div>
                          {edu.description && (
                            <p className={`text-sm ${darkMode ? 'text-terminal' : 'text-white'}`}>
                              {edu.description}
                            </p>
                          )}
                          
                          {/* Courses & Skills */}
                          <div className="mt-4 pt-4 border-t border-gray-800">
                            <h4 className={`font-semibold mb-2 font-mono-developer flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                              <FaCode /> // Key Courses
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {edu.courses.slice(0, 3).map((course, idx) => (
                                <span 
                                  key={idx}
                                  className={`px-3 py-1 rounded-lg text-xs font-mono-developer border backdrop-blur-sm ${darkMode ? 'bg-black/50 text-terminal border-gray-800' : 'bg-black/50 text-gray-400 border-gray-700'}`}
                                >
                                  {course}
                                </span>
                              ))}
                              {edu.courses.length > 3 && (
                                <span className={`px-3 py-1 rounded-lg text-xs font-mono-developer border backdrop-blur-sm ${darkMode ? 'bg-black/50 text-developer-secondary border-gray-800' : 'bg-black/50 text-gray-500 border-gray-700'}`}>
                                  +{edu.courses.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Year */}
                    <div className={`md:w-2/12 text-center mt-4 md:mt-0 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'}`}>
                      <motion.span 
                        className={`inline-block px-4 py-2 rounded-lg font-bold font-mono-developer text-sm backdrop-blur-sm border`}
                        style={{ 
                          backgroundColor: edu.bgColor,
                          color: edu.iconColor,
                          borderColor: edu.iconColor
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {edu.period.split(' – ')[0]}
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="space-y-8">
                {workExperience.map((work, index) => (
                  <motion.div
                    key={work.position}
                    custom={index}
                    variants={educationVariants}
                    initial="hidden"
                    animate="visible"
                    className="group"
                  >
                    <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-current transition-colors relative overflow-hidden"
                      style={{ borderColor: work.iconColor + '40' }}
                    >
                      {/* Animated border */}
                      <motion.div 
                        className="absolute inset-0 rounded-xl"
                        style={{ 
                          background: `linear-gradient(45deg, transparent, ${work.iconColor}20, transparent)`,
                          opacity: 0
                        }}
                        animate={{ 
                          opacity: 1,
                          x: ['-100%', '100%']
                        }}
                        transition={{ 
                          opacity: { duration: 0.3 },
                          x: { 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "linear"
                          }
                        }}
                      ></motion.div>

                      <div className="flex items-start gap-4 mb-4 relative z-10">
                        <div className={`w-14 h-14 rounded-lg ${work.bgColor} border border-gray-800 flex items-center justify-center`}>
                          <work.icon className="text-2xl" style={{ color: work.iconColor }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                            <h3 className={`text-xl font-bold font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                              {work.position}
                            </h3>
                            <span className={`px-3 py-1 rounded-lg font-mono-developer text-sm`}
                              style={{ 
                                backgroundColor: work.bgColor,
                                color: work.iconColor
                              }}
                            >
                              {work.duration}
                            </span>
                          </div>
                          <p className={`font-mono-developer mb-2`} style={{ color: work.iconColor }}>
                            {work.company}
                          </p>
                          <p className={`${darkMode ? 'text-developer-secondary' : 'text-gray-400'} text-sm`}>
                            <FaMapMarkerAlt className="inline mr-1" /> {work.location} • {work.period}
                          </p>
                        </div>
                      </div>

                      <p className={`${darkMode ? 'text-terminal' : 'text-white'} mb-6 relative z-10`}>
                        {work.description}
                      </p>

                      <div className="space-y-4 relative z-10">
                        {/* Technologies */}
                        <div>
                          <h4 className={`font-semibold mb-2 font-mono-developer flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                            <FaCog /> // Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {work.technologies.map((tech, idx) => {
                              const TechIcon = 
                                tech === 'React' ? FaReact :
                                tech === 'Node.js' ? FaNodeJs :
                                tech === 'MongoDB' ? SiMongodb :
                                tech === 'Express.js' ? SiExpress :
                                tech === 'TypeScript' ? SiTypescript :
                                tech === 'Redux' ? FaChartLine :
                                tech === 'JavaScript' ? FaCode :
                                tech === 'MySQL' ? FaDatabase :
                                FaCode;
                              
                              return (
                                <span
                                  key={idx}
                                  className={`px-3 py-1 rounded-lg text-xs font-mono-developer border backdrop-blur-sm flex items-center gap-2 ${
                                    darkMode 
                                      ? 'bg-black/50 text-terminal border-gray-800 hover:border-syntax-blue hover:text-terminal'
                                      : 'bg-black/50 text-gray-400 border-gray-700 hover:border-blue-500 hover:text-white'
                                  } transition-colors`}
                                >
                                  <TechIcon className="text-sm" style={{ color: work.iconColor }} />
                                  {tech}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className={`font-semibold mb-2 font-mono-developer flex items-center gap-2 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                            <FaRocket /> // Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {work.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className={`text-sm ${darkMode ? 'text-syntax-green' : 'text-green-500'} mt-0.5`}>→</span>
                                <span className={`text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    custom={index}
                    variants={educationVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-current transition-colors h-full relative overflow-hidden"
                      style={{ borderColor: cert.iconColor + '40' }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}
                        style={{ color: cert.iconColor }}
                      ></div>

                      <div className={`w-12 h-12 rounded-lg ${cert.bgColor} border border-gray-800 flex items-center justify-center mb-4 relative z-10`}>
                        <cert.icon className={`text-xl`} style={{ color: cert.iconColor }} />
                      </div>
                      <h4 className={`text-lg font-bold mb-2 font-mono-developer relative z-10 ${darkMode ? 'text-terminal' : 'text-white'}`}>
                        {cert.title}
                      </h4>
                      <div className="space-y-3 relative z-10">
                        <p className={`${darkMode ? 'text-developer-secondary' : 'text-gray-400'} text-sm font-mono-developer`}>
                          <span className={darkMode ? 'text-terminal' : 'text-white'}>// Issued by:</span> {cert.issuer}
                        </p>
                        <p className={`${darkMode ? 'text-developer-secondary' : 'text-gray-400'} text-sm font-mono-developer`}>
                          <span className={darkMode ? 'text-terminal' : 'text-white'}>// Year:</span> {cert.year}
                        </p>
                        <p className={`${darkMode ? 'text-developer-secondary' : 'text-gray-400'} text-sm font-mono-developer`}>
                          <span className={darkMode ? 'text-terminal' : 'text-white'}>// Credential:</span> {cert.credential}
                        </p>
                        <div className="pt-3 border-t border-gray-800">
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.map((skill, idx) => (
                              <span 
                                key={idx}
                                className={`px-2 py-1 rounded text-xs font-mono-developer border ${darkMode ? 'bg-black/50 text-terminal border-gray-800' : 'bg-black/50 text-gray-400 border-gray-700'}`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Code Editor */}
        <motion.div 
          className="mt-16 bg-black/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <FaCode className={darkMode ? 'text-syntax-blue' : 'text-blue-500'} />
              <span className={`font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                education.ts
              </span>
            </div>
            <button
              onClick={() => simulateTerminal('npm run education')}
              className={`px-3 py-1 rounded text-xs font-mono-developer flex items-center gap-2 ${
                darkMode 
                  ? 'bg-syntax-blue/20 text-syntax-blue border border-syntax-blue hover:bg-syntax-blue/30'
                  : 'bg-blue-500/20 text-blue-500 border border-blue-500 hover:bg-blue-500/30'
              } ${isTerminalRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isTerminalRunning}
            >
              {isTerminalRunning ? (
                <>
                  <FaSync className="animate-spin" /> Running...
                </>
              ) : (
                <>
                  <FaPlay /> Run
                </>
              )}
            </button>
          </div>
          
          <div className="p-6">
            <div className="font-mono-developer text-sm">
              {/* Terminal output */}
              <div className="mb-4 min-h-20">
                <AnimatePresence>
                  {terminalOutput.map((output, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className={`mb-1 ${
                        output.type === 'command'
                          ? (darkMode ? 'text-syntax-blue' : 'text-blue-500')
                          : (darkMode ? 'text-terminal' : 'text-white')
                      }`}
                    >
                      {output.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTerminalRunning && (
                  <motion.div 
                    className={`inline-block w-2 h-4 ${darkMode ? 'bg-syntax-green' : 'bg-green-500'}`}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  ></motion.div>
                )}
              </div>

              {/* TypeScript code */}
              <div className="border-t border-gray-800 pt-4">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    className={`mb-1 ${index <= activeCodeLine ? 'opacity-100' : 'opacity-30'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: index <= activeCodeLine ? 1 : 0.3, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {line.includes('interface') || line.includes('const') ? (
                      <span className={darkMode ? 'text-syntax-blue' : 'text-blue-500'}>{line}</span>
                    ) : line.includes('{') || line.includes('}') || line.includes(';') ? (
                      <span className={darkMode ? 'text-syntax-yellow' : 'text-yellow-500'}>{line}</span>
                    ) : line.includes('degree:') || line.includes('institution:') || line.includes('period:') || line.includes('cgpa:') || line.includes('status:') ? (
                      <>
                        <span className={darkMode ? 'text-syntax-green' : 'text-green-500'}>{line.split(':')[0]}:</span>
                        <span className={darkMode ? 'text-terminal' : 'text-white'}>{line.split(':')[1]}</span>
                      </>
                    ) : line.includes("'") || line.includes('"') ? (
                      <span className={darkMode ? 'text-syntax-orange' : 'text-orange-500'}>{line}</span>
                    ) : line.includes('number') ? (
                      <span className={darkMode ? 'text-syntax-purple' : 'text-purple-500'}>{line}</span>
                    ) : (
                      <span className={darkMode ? 'text-terminal' : 'text-white'}>{line}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Acquired */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className={`text-2xl font-bold text-center mb-8 font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
            // Skills Acquired Through Education & Experience
          </h3>
          
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsAcquired.map((category, index) => (
                <motion.div
                  key={category.category}
                  custom={index}
                  variants={educationVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-syntax-blue transition-colors h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-syntax-blue/10 border border-syntax-blue/30 flex items-center justify-center">
                        <category.icon className="text-xl text-syntax-blue" />
                      </div>
                      <h4 className={`text-lg font-bold font-mono-developer ${darkMode ? 'text-terminal' : 'text-white'}`}>
                        {category.category}
                      </h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-lg text-xs font-mono-developer border backdrop-blur-sm ${
                            darkMode 
                              ? 'bg-black/50 text-terminal border-gray-800 hover:border-syntax-blue hover:text-terminal'
                              : 'bg-black/50 text-gray-400 border-gray-700 hover:border-blue-500 hover:text-white'
                          } transition-colors`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { 
              value: '3.38', 
              label: 'CGPA', 
              color: darkMode ? 'text-syntax-blue' : 'text-blue-500',
              bg: darkMode ? 'bg-syntax-blue' : 'bg-blue-500',
              icon: <FaGraduationCap /> 
            },
            { 
              value: '7+', 
              label: 'Months Experience', 
              color: darkMode ? 'text-syntax-green' : 'text-green-500',
              bg: darkMode ? 'bg-syntax-green' : 'bg-green-500',
              icon: <FaBriefcase /> 
            },
            { 
              value: '4', 
              label: 'Certifications', 
              color: darkMode ? 'text-syntax-purple' : 'text-purple-500',
              bg: darkMode ? 'bg-syntax-purple' : 'bg-purple-500',
              icon: <FaCertificate /> 
            },
            { 
              value: '30+', 
              label: 'Skills', 
              color: darkMode ? 'text-syntax-orange' : 'text-orange-500',
              bg: darkMode ? 'bg-syntax-orange' : 'bg-orange-500',
              icon: <FaTools /> 
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800 hover:border-current transition-colors relative group"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className={`text-3xl font-bold mb-2 font-mono-developer ${stat.color} flex items-center justify-center gap-2`}>
                {stat.icon}
                {stat.value}
              </div>
              <div className={`font-mono-developer text-sm ${darkMode ? 'text-developer-secondary' : 'text-gray-400'}`}>
                {stat.label}
              </div>
              <div className="mt-3 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-1 ${stat.bg} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;