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
  FaAws
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
} from 'react-icons/si';

const Skills = ({ setActiveSection }) => {
  const sectionRef = useRef(null);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [progressAnimations, setProgressAnimations] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('skills');
          // Animate skills when section comes into view
          const allSkills = skillCategories.flatMap(cat => cat.skills.map(s => s.name));
          setAnimatedSkills(allSkills);
          
          // Initialize progress animations
          const animations = {};
          allSkills.forEach(skill => {
            animations[skill] = 0;
          });
          setProgressAnimations(animations);
          
          // Start progress animations with delays
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
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: FaCode,
      skills: [
        { name: 'React', icon: FaReact, level: 95, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, level: 90, color: '#000000' },
        { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6' },
        { name: 'JavaScript', icon: FaJs, level: 95, color: '#F7DF1E' },
        { name: 'HTML5', icon: FaHtml5, level: 98, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, level: 90, color: '#1572B6' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95, color: '#06B6D4' },
        { name: 'Redux', icon: SiRedux, level: 85, color: '#764ABC' },
      ]
    },
    {
      title: 'Backend Development',
      icon: FaServer,
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 90, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, level: 88, color: '#000000' },
        { name: 'Python', icon: FaPython, level: 85, color: '#3776AB' },
        { name: 'REST APIs', icon: FaCode, level: 92, color: '#FF6B35' },
        { name: 'GraphQL', icon: SiGraphql, level: 80, color: '#E10098' },
        { name: 'Authentication', icon: FaServer, level: 90, color: '#FF9800' },
      ]
    },
    {
      title: 'Database & Cloud',
      icon: FaDatabase,
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 88, color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 85, color: '#336791' },
        { name: 'Firebase', icon: SiFirebase, level: 82, color: '#FFCA28' },
        { name: 'AWS', icon: FaAws, level: 75, color: '#FF9900' },
        { name: 'Docker', icon: SiDocker, level: 80, color: '#2496ED' },
        { name: 'Kubernetes', icon: SiKubernetes, level: 70, color: '#326CE5' },
      ]
    },
    {
      title: 'Tools & Others',
      icon: FaGitAlt,
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90, color: '#F05032' },
        { name: 'CI/CD', icon: FaCloud, level: 85, color: '#4285F4' },
        { name: 'Agile/Scrum', icon: FaCode, level: 88, color: '#00C853' },
        { name: 'Testing', icon: FaCode, level: 80, color: '#FF5252' },
        { name: 'Mobile Dev', icon: FaMobile, level: 75, color: '#2196F3' },
        { name: 'UI/UX Design', icon: FaCode, level: 70, color: '#9C27B0' },
      ]
    }
  ];

  // Get progress animation value for a skill
  const getProgressAnimation = (skillName) => {
    return progressAnimations[skillName] || 0;
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-terminal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer">
            $ skills --list
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal mb-4">
            <span className="text-syntax-blue">const</span>{' '}
            <span className="text-syntax-green">skills</span>{' '}
            <span className="text-syntax-blue">=</span>{' '}
            <span className="text-syntax-yellow">[</span>
          </h2>
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer">
            // Mastery across the full stack development spectrum
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className="bg-developer-secondary rounded-xl p-6 border border-developer hover:border-syntax-blue transition-all duration-300 animate-slideUp card-developer"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-terminal border border-developer flex items-center justify-center">
                  <category.icon className="text-xl text-syntax-blue" />
                </div>
                <h3 className="text-xl font-bold text-terminal font-mono-developer">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill.name} 
                    className="skill-item"
                    style={{ 
                      animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <skill.icon style={{ color: skill.color }} className="text-lg" />
                        </div>
                        <span className="text-sm font-medium font-mono-developer text-terminal">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-syntax-green font-mono-developer">
                        <span className="progress-number">
                          {getProgressAnimation(skill.name)}%
                        </span>
                      </span>
                    </div>
                    
                    {/* Professional Progress Bar */}
                    <div className="relative">
                      <div className="w-full h-2 bg-terminal/20 rounded-full overflow-hidden">
                        {/* Animated progress bar with gradient */}
                        <div 
                          className="h-2 rounded-full progress-bar-animation"
                          style={{ 
                            width: `${getProgressAnimation(skill.name)}%`,
                            background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`,
                            boxShadow: `0 0 10px ${skill.color}40`,
                            transition: 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }}
                        >
                          {/* Animated shimmer effect */}
                          <div className="absolute inset-0 shimmer-effect"></div>
                          
                          {/* Progress dots */}
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-terminal border border-developer"></div>
                        </div>
                      </div>
                      
                      {/* Progress ticks */}
                      <div className="flex justify-between mt-1 px-1">
                        {[0, 25, 50, 75, 100].map((tick) => (
                          <div 
                            key={tick}
                            className="relative"
                          >
                            <div className={`w-0.5 h-2 ${getProgressAnimation(skill.name) >= tick ? 'bg-syntax-green' : 'bg-developer'}`}></div>
                            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-developer-secondary">
                              {tick}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-16 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                skills.ts
              </div>
            </div>
            <div className="terminal-body">
              <div className="font-mono-developer text-sm">
                <div className="text-syntax-purple">interface</div>
                <div className="text-syntax-green ml-4">Skill</div>
                <div className="text-terminal ml-4">{'{'}</div>
                <div className="ml-8 text-terminal">
                  <span className="text-syntax-green">name</span>:
                  <span className="text-syntax-orange"> string</span>;
                </div>
                <div className="ml-8 text-terminal">
                  <span className="text-syntax-green">level</span>:
                  <span className="text-syntax-orange"> number</span>;
                </div>
                <div className="ml-8 text-terminal">
                  <span className="text-syntax-green">color</span>:
                  <span className="text-syntax-orange"> string</span>;
                </div>
                <div className="text-terminal ml-4">{'}'}</div>
                <br />
                <div className="text-syntax-blue">const</div>
                <div className="text-terminal ml-4">skills:</div>
                <div className="text-syntax-green ml-4">Skill</div>
                <div className="text-terminal ml-4">[] = [</div>
                <div className="ml-8 text-terminal">{'{'}</div>
                <div className="ml-12 text-terminal">
                  <span className="text-syntax-green">name</span>:
                  <span className="text-syntax-orange"> 'React'</span>,
                </div>
                <div className="ml-12 text-terminal">
                  <span className="text-syntax-green">level</span>:
                  <span className="text-syntax-blue"> 95</span>,
                </div>
                <div className="ml-12 text-terminal">
                  <span className="text-syntax-green">color</span>:
                  <span className="text-syntax-orange"> '#61DAFB'</span>
                </div>
                <div className="ml-8 text-terminal">{'},'}</div>
                <div className="ml-8 text-terminal">
                  <span className="text-developer-secondary">// ... more skills</span>
                </div>
                <div className="text-terminal ml-4">];</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-blue transition-colors group">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer relative">
              <span className="inline-block">50+</span>
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-syntax-green animate-ping"></div>
            </div>
            <div className="text-developer-secondary font-mono-developer">
              Projects
            </div>
            <div className="mt-2 w-full h-1 bg-terminal rounded-full overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-syntax-green to-syntax-blue rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-green transition-colors group">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              15+
            </div>
            <div className="text-developer-secondary font-mono-developer">
              Tech Stacks
            </div>
            <div className="mt-2 w-full h-1 bg-terminal rounded-full overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-syntax-blue to-syntax-purple rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-blue transition-colors group">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              3+
            </div>
            <div className="text-developer-secondary font-mono-developer">
              Years Experience
            </div>
            <div className="mt-2 w-full h-1 bg-terminal rounded-full overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-syntax-purple to-syntax-orange rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-orange transition-colors group">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              100%
            </div>
            <div className="text-developer-secondary font-mono-developer">
              Client Satisfaction
            </div>
            <div className="mt-2 w-full h-1 bg-terminal rounded-full overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-syntax-orange to-syntax-red rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>

        {/* Animated Skill Chart */}
        <div className="mt-16 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <div className="bg-developer-secondary rounded-xl p-6 border border-developer">
            <h3 className="text-xl font-bold text-terminal mb-6 font-mono-developer">
              // Skill Progression Timeline
            </h3>
            <div className="relative h-32">
              {/* Timeline line */}
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-syntax-blue via-syntax-green to-syntax-purple"></div>
              
              {/* Skill milestones */}
              {[
                { skill: 'HTML/CSS', year: 2022, level: 85 },
                { skill: 'JavaScript', year: 2022, level: 90 },
                { skill: 'React', year: 2023, level: 95 },
                { skill: 'Node.js', year: 2023, level: 88 },
                { skill: 'TypeScript', year: 2024, level: 85 },
                { skill: 'Python/AI', year: 2024, level: 82 },
              ].map((milestone, index) => (
                <div 
                  key={milestone.skill}
                  className="absolute bottom-0"
                  style={{ 
                    left: `${(index + 1) * 16}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-4 h-4 rounded-full bg-gradient-to-b from-syntax-blue to-syntax-green mb-2 animate-pulse"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    ></div>
                    <div className="text-xs text-terminal font-mono-developer mb-1">
                      {milestone.skill}
                    </div>
                    <div className="text-xs text-developer-secondary font-mono-developer">
                      {milestone.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .skill-item {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.6s forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .progress-bar-animation {
          position: relative;
          overflow: hidden;
        }

        .progress-bar-animation::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .progress-number {
          display: inline-block;
          transition: transform 0.3s ease;
        }

        .skill-item:hover .progress-number {
          transform: scale(1.1);
          color: var(--color-syntax-green);
        }

        .skill-item:hover .progress-bar-animation {
          box-shadow: 0 0 15px currentColor;
        }

        .card-developer:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Skills;