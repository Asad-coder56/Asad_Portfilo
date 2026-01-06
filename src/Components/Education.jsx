import React, { useEffect, useRef } from 'react';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaAward, FaTerminal, FaCode } from 'react-icons/fa';

const Education = ({ setActiveSection }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('education');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  const educationData = [
    {
      degree: "BS Software Engineering",
      institution: "University of Mianwali",
      period: "2021 – 2025 (Expected)",
      description: "Currently in 8th Semester, CGPA: 3.38/4.00",
      location: "Mianwali, Pakistan",
      icon: FaGraduationCap,
      color: "syntax-blue"
    },
    {
      degree: "Intermediate (FSc Pre Engineering)",
      institution: "Superior College Mianwali",
      period: "2018 – 2020",
      description: "Completed with distinction in Science subjects",
      location: "Mianwali, Pakistan",
      icon: FaGraduationCap,
      color: "syntax-green"
    },
    {
      degree: "Matriculation",
      institution: "Govt. High School Mitha Khattak",
      period: "2017 – 2019",
      description: "Completed with excellent grades",
      location: "Mitha Khattak, Pakistan",
      icon: FaGraduationCap,
      color: "syntax-purple"
    }
  ];

  const certifications = [
    {
      title: "Full Stack Web Development",
      issuer: "Coursera",
      year: "2023",
      icon: FaAward,
      color: "syntax-blue"
    },
    {
      title: "React Native Development",
      issuer: "Udemy",
      year: "2023",
      icon: FaAward,
      color: "syntax-green"
    },
    {
      title: "Machine Learning Fundamentals",
      issuer: "Google",
      year: "2022",
      icon: FaAward,
      color: "syntax-purple"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2022",
      icon: FaAward,
      color: "syntax-orange"
    }
  ];

  const colorClasses = {
    'syntax-blue': 'text-syntax-blue border-syntax-blue',
    'syntax-green': 'text-syntax-green border-syntax-green',
    'syntax-purple': 'text-syntax-purple border-syntax-purple',
    'syntax-orange': 'text-syntax-orange border-syntax-orange',
    'syntax-yellow': 'text-syntax-yellow border-syntax-yellow',
    'syntax-red': 'text-syntax-red border-syntax-red'
  };

  const colorBGs = {
    'syntax-blue': 'bg-syntax-blue/10',
    'syntax-green': 'bg-syntax-green/10',
    'syntax-purple': 'bg-syntax-purple/10',
    'syntax-orange': 'bg-syntax-orange/10',
    'syntax-yellow': 'bg-syntax-yellow/10',
    'syntax-red': 'bg-syntax-red/10'
  };

  return (
    <section id="education" ref={sectionRef} className="py-20 bg-terminal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer">
            $ cd ./education
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal mb-4">
            <span className="text-syntax-blue">class</span>{' '}
            <span className="text-syntax-green">Education</span>{' '}
            <span className="text-syntax-blue">extends</span>{' '}
            <span className="text-syntax-purple">Experience</span>
          </h2>
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer">
            // Academic journey and professional certifications
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-syntax-blue to-syntax-purple hidden md:block"></div>

            {educationData.map((edu, index) => (
              <div 
                key={edu.degree}
                className={`relative flex flex-col md:flex-row items-center mb-12 animate-slideUp`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 z-10">
                  <div className={`w-6 h-6 rounded-full ${colorBGs[edu.color]} border-2 ${colorClasses[edu.color]} border-2 border-terminal`}></div>
                </div>

                {/* Content */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}>
                  <div className="bg-developer-secondary rounded-xl p-6 border border-developer hover:border-syntax-blue transition-colors">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg ${colorBGs[edu.color]} border border-developer flex items-center justify-center`}>
                        <edu.icon className={`text-xl ${colorClasses[edu.color].split(' ')[0]}`} />
                      </div>
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <h3 className="text-xl font-bold text-terminal mb-1 font-mono-developer">
                          {edu.degree}
                        </h3>
                        <p className={`font-mono-developer ${colorClasses[edu.color].split(' ')[0]}`}>
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-developer-secondary">
                        <FaCalendarAlt />
                        <span className="font-mono-developer text-sm">{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-developer-secondary">
                        <FaMapMarkerAlt />
                        <span className="font-mono-developer text-sm">{edu.location}</span>
                      </div>
                      {edu.description && (
                        <p className="text-terminal text-sm">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Year */}
                <div className={`md:w-2/12 text-center mt-4 md:mt-0 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'}`}>
                  <span className={`inline-block px-4 py-2 rounded-lg ${colorBGs[edu.color]} ${colorClasses[edu.color]} font-bold font-mono-developer text-sm`}>
                    {edu.period.split(' – ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold text-center text-terminal mb-8 font-mono-developer">
            // Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={cert.title}
                className="bg-developer-secondary rounded-xl p-6 border border-developer hover:border-syntax-blue transition-colors animate-slideUp"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-lg ${colorBGs[cert.color]} border border-developer flex items-center justify-center mb-4`}>
                  <cert.icon className={`text-xl ${colorClasses[cert.color].split(' ')[0]}`} />
                </div>
                <h4 className="text-lg font-bold text-terminal mb-2 font-mono-developer">
                  {cert.title}
                </h4>
                <div className="space-y-2">
                  <p className="text-developer-secondary text-sm font-mono-developer">
                    <span className="text-terminal">// Issued by:</span> {cert.issuer}
                  </p>
                  <p className="text-developer-secondary text-sm font-mono-developer">
                    <span className="text-terminal">// Year:</span> {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Window - Education Summary */}
        <div className="mt-20 terminal-window animate-fadeIn" style={{ animationDelay: '0.9s' }}>
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
              education — summary — 80×24
            </div>
          </div>
          <div className="terminal-body">
            <div className="font-mono-developer text-sm space-y-4">
              <div>
                <div className="text-syntax-green">$ cat education.json</div>
                <div className="text-syntax-blue ml-4">{"{"}</div>
                <div className="text-terminal ml-8">
                  <span className="text-syntax-green">"degree"</span>:
                  <span className="text-syntax-orange"> "BS Software Engineering"</span>,
                </div>
                <div className="text-terminal ml-8">
                  <span className="text-syntax-green">"institution"</span>:
                  <span className="text-syntax-orange"> "University of Mianwali"</span>,
                </div>
                <div className="text-terminal ml-8">
                  <span className="text-syntax-green">"status"</span>:
                  <span className="text-syntax-green"> "In Progress"</span>,
                </div>
                <div className="text-terminal ml-8">
                  <span className="text-syntax-green">"cgpa"</span>:
                  <span className="text-syntax-orange"> "3.38/4.00"</span>
                </div>
                <div className="text-syntax-blue ml-4">{"}"}</div>
              </div>

              <div>
                <div className="text-syntax-green">$ ls -la skills/</div>
                <div className="text-terminal">
                  drwxr-xr-x 8 root root 4096 Jan 1 00:00 <span className="text-syntax-blue">.</span>
                </div>
                <div className="text-terminal">
                  drwxr-xr-x 8 root root 4096 Jan 1 00:00 <span className="text-syntax-blue">..</span>
                </div>
                <div className="text-terminal">
                  -rw-r--r-- 1 root root 1024 Jan 1 00:00 <span className="text-syntax-green">software_engineering</span>
                </div>
                <div className="text-terminal">
                  -rw-r--r-- 1 root root 1024 Jan 1 00:00 <span className="text-syntax-green">web_development</span>
                </div>
                <div className="text-terminal">
                  -rw-r--r-- 1 root root 1024 Jan 1 00:00 <span className="text-syntax-green">database_design</span>
                </div>
                <div className="text-terminal">
                  -rw-r--r-- 1 root root 1024 Jan 1 00:00 <span className="text-syntax-green">ai_ml_concepts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Learned */}
        <div className="mt-20 animate-fadeIn" style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-bold text-center text-terminal mb-8 font-mono-developer">
            // Skills Acquired
          </h3>
          <div className="bg-developer-secondary rounded-xl p-8 border border-developer">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'Software Engineering',
                'Data Structures',
                'Algorithms',
                'Database Design',
                'Web Development',
                'Mobile Development',
                'AI/ML Concepts',
                'Cloud Computing',
                'DevOps',
                'Security',
                'Project Management',
                'Team Collaboration'
              ].map((skill, index) => (
                <div 
                  key={skill}
                  className="bg-terminal rounded-lg p-4 text-center border border-developer hover:border-syntax-blue transition-colors animate-fadeIn"
                  style={{ animationDelay: `${1.1 + index * 0.05}s` }}
                >
                  <span className="text-terminal text-sm font-mono-developer">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;