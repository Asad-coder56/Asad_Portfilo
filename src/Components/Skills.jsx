import React, { useEffect, useRef } from 'react';
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
  const [animatedSkills, setAnimatedSkills] = React.useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('skills');
          // Animate skills when section comes into view
          setTimeout(() => {
            setAnimatedSkills(skillCategories.flatMap(cat => cat.skills.map(s => s.name)));
          }, 300);
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
        { name: 'React', icon: FaReact, level: 95, color: 'text-syntax-blue' },
        { name: 'Next.js', icon: SiNextdotjs, level: 90, color: 'text-terminal' },
        { name: 'TypeScript', icon: SiTypescript, level: 85, color: 'text-syntax-blue' },
        { name: 'JavaScript', icon: FaJs, level: 95, color: 'text-syntax-yellow' },
        { name: 'HTML5', icon: FaHtml5, level: 98, color: 'text-syntax-orange' },
        { name: 'CSS3', icon: FaCss3Alt, level: 90, color: 'text-syntax-blue' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95, color: 'text-syntax-blue' },
        { name: 'Redux', icon: SiRedux, level: 85, color: 'text-syntax-purple' },
      ]
    },
    {
      title: 'Backend Development',
      icon: FaServer,
      skills: [
        { name: 'Node.js', icon: FaNodeJs, level: 90, color: 'text-syntax-green' },
        { name: 'Express.js', icon: SiExpress, level: 88, color: 'text-terminal' },
        { name: 'Python', icon: FaPython, level: 85, color: 'text-syntax-blue' },
        { name: 'REST APIs', icon: FaCode, level: 92, color: 'text-syntax-green' },
        { name: 'GraphQL', icon: SiGraphql, level: 80, color: 'text-syntax-pink' },
        { name: 'Authentication', icon: FaServer, level: 90, color: 'text-syntax-orange' },
      ]
    },
    {
      title: 'Database & Cloud',
      icon: FaDatabase,
      skills: [
        { name: 'MongoDB', icon: SiMongodb, level: 88, color: 'text-syntax-green' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 85, color: 'text-syntax-blue' },
        { name: 'Firebase', icon: SiFirebase, level: 82, color: 'text-syntax-orange' },
        { name: 'AWS', icon: FaAws, level: 75, color: 'text-syntax-orange' },
        { name: 'Docker', icon: SiDocker, level: 80, color: 'text-syntax-blue' },
        { name: 'Kubernetes', icon: SiKubernetes, level: 70, color: 'text-syntax-blue' },
      ]
    },
    {
      title: 'Tools & Others',
      icon: FaGitAlt,
      skills: [
        { name: 'Git', icon: FaGitAlt, level: 90, color: 'text-syntax-orange' },
        { name: 'CI/CD', icon: FaCloud, level: 85, color: 'text-syntax-blue' },
        { name: 'Agile/Scrum', icon: FaCode, level: 88, color: 'text-syntax-green' },
        { name: 'Testing', icon: FaCode, level: 80, color: 'text-syntax-red' },
        { name: 'Mobile Dev', icon: FaMobile, level: 75, color: 'text-syntax-blue' },
        { name: 'UI/UX Design', icon: FaCode, level: 70, color: 'text-syntax-purple' },
      ]
    }
  ];

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
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto">
            // Mastery across the full stack development spectrum
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={category.title}
              className="bg-developer-secondary rounded-xl p-6 border border-developer hover:border-syntax-blue transition-all duration-300 animate-slideUp"
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

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill.name} 
                    className={`animate-fadeIn ${animatedSkills.includes(skill.name) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ 
                      animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`,
                      transition: 'all 0.5s ease'
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <skill.icon className={skill.color} />
                        <span className={`text-sm font-medium font-mono-developer ${skill.color}`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-syntax-green font-mono-developer">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-terminal rounded-full h-2 overflow-hidden">
                      <div 
  className={`h-2 rounded-full transition-all duration-1000 ${
    animatedSkills.includes(skill.name) ? 'w-full' : 'w-0'
  }`}
  style={{ 
    width: animatedSkills.includes(skill.name) ? `${skill.level}%` : '0%',
    background: `linear-gradient(90deg, ${skill.color.replace('text-', 'var(--')}), rgba(255,255,255,0.5))`
  }}
></div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-16 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="code-block">
            <div className="font-mono-developer text-sm">
              <div className="text-syntax-purple">import</div>
              <div className="ml-4">
                <span className="text-syntax-blue">{'{'}</span>{' '}
                <span className="text-syntax-green">React</span>,{' '}
                <span className="text-syntax-green">useState</span>,{' '}
                <span className="text-syntax-green">useEffect</span>{' '}
                <span className="text-syntax-blue">{'}'}</span>{' '}
                <span className="text-syntax-purple">from</span>{' '}
                <span className="text-syntax-orange">'react'</span>;
              </div>
              <br />
              <div className="text-syntax-purple">import</div>
              <div className="ml-4">
                <span className="text-syntax-blue">{'{'}</span>{' '}
                <span className="text-syntax-green">express</span>{' '}
                <span className="text-syntax-blue">{'}'}</span>{' '}
                <span className="text-syntax-purple">from</span>{' '}
                <span className="text-syntax-orange">'express'</span>;
              </div>
              <br />
              <div>
                <span className="text-syntax-blue">const</span>{' '}
                <span className="text-syntax-green">app</span>{' '}
                <span className="text-syntax-blue">=</span>{' '}
                <span className="text-syntax-blue">express</span>();
              </div>
              <br />
              <div>
                <span className="text-syntax-green">app</span>.<span className="text-syntax-blue">get</span>(
                <span className="text-syntax-orange">'/api/skills'</span>, (
                <span className="text-syntax-blue">req</span>,{' '}
                <span className="text-syntax-blue">res</span>) {<span className="text-syntax-blue">{' => '}</span>}
              </div>
              <div className="ml-4">
                <span className="text-syntax-blue">res</span>.<span className="text-syntax-blue">json</span>(
                <span className="text-syntax-blue">{'{'}</span>
              </div>
              <div className="ml-8">
                <span className="text-syntax-green">frontend</span>:
                <span className="text-syntax-orange"> ['React', 'Next.js', 'TypeScript']</span>,
              </div>
              <div className="ml-8">
                <span className="text-syntax-green">backend</span>:
                <span className="text-syntax-orange"> ['Node.js', 'Express', 'Python']</span>,
              </div>
              <div className="ml-8">
                <span className="text-syntax-green">database</span>:
                <span className="text-syntax-orange"> ['MongoDB', 'PostgreSQL', 'Firebase']</span>
              </div>
              <div className="ml-4">
                <span className="text-syntax-blue">{'}'}</span>);
              </div>
              <div>{<span className="text-syntax-blue">{'})'}</span>};</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-blue transition-colors">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              {'>'}50
            </div>
            <div className="text-developer-secondary">
              Projects Completed
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-green transition-colors">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              15+
            </div>
            <div className="text-developer-secondary">
              Tech Stacks
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-blue transition-colors">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              3+
            </div>
            <div className="text-developer-secondary">
              Years Experience
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-orange transition-colors">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              100%
            </div>
            <div className="text-developer-secondary">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;