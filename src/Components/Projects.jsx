import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaFilter, FaCode, FaCalendarAlt, FaTag, FaTerminal } from 'react-icons/fa';

const Projects = ({ projects, setActiveSection }) => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('projects');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
    setVisibleProjects(3);
  }, [filter, projects]);

  const categories = ['all', 'AI/ML', 'Full Stack', 'Web App', 'API', 'Mobile'];

  const colorClasses = {
    blue: 'border-syntax-blue text-syntax-blue',
    purple: 'border-syntax-purple text-syntax-purple',
    green: 'border-syntax-green text-syntax-green',
    orange: 'border-syntax-orange text-syntax-orange',
    red: 'border-syntax-red text-syntax-red'
  };

  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  const simulateTerminal = (project) => {
    setActiveProject(project);
    setTimeout(() => setActiveProject(null), 3000);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-terminal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer">
            $ cd ./projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal mb-4">
            <span className="text-syntax-blue">class</span>{' '}
            <span className="text-syntax-green">Projects</span>{' '}
            <span className="text-syntax-blue">{'{'}</span>
          </h2>
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer">
            // Full-stack applications and AI integration projects
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-fadeIn">
          <div className="flex items-center gap-2 text-developer-secondary font-mono-developer">
            <FaFilter /> $ filter:
          </div>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg transition-all font-mono-developer text-sm animate-slideUp ${
                filter === category
                  ? 'bg-developer-secondary border border-syntax-blue text-syntax-blue'
                  : 'bg-developer-secondary text-developer-secondary border border-developer hover:border-syntax-blue hover:text-terminal'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {category === 'all' ? '*' : category}
            </button>
          ))}
        </div>

        {/* Active Project Terminal */}
        {activeProject && (
          <div className="mb-8 terminal-window animate-slideDown">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                building — {activeProject.title}
              </div>
            </div>
            <div className="terminal-body">
              <div className="font-mono-developer text-sm">
                <div className="text-syntax-green">$ npm run build</div>
                <div className="text-terminal mt-2">Building project: <span className="text-syntax-blue">{activeProject.title}</span></div>
                <div className="text-terminal">Status: <span className="text-syntax-green">In progress...</span></div>
                <div className="mt-4">
                  <div className="text-syntax-blue">[</div>
                  <div className="ml-4 text-syntax-green">tech</div>
                  <div className="ml-8">: {activeProject.tech.slice(0, 3).join(', ')}</div>
                  <div className="ml-4 text-syntax-green">status</div>
                  <div className="ml-8">: <span className="text-syntax-green">{activeProject.status}</span></div>
                  <div className="text-syntax-blue">]</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={project.id}
              className="bg-developer-secondary rounded-xl overflow-hidden border border-developer hover:border-syntax-blue transition-all duration-300 animate-slideUp card-developer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Header */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-terminal to-developer-tertiary">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <FaCode className="text-terminal text-6xl" />
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-mono-developer border ${
                    project.status === 'Completed' 
                      ? 'border-syntax-green text-syntax-green bg-developer-secondary'
                      : 'border-syntax-blue text-syntax-blue bg-developer-secondary'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono-developer bg-terminal/80 text-terminal border border-developer backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-terminal mb-2 font-mono-developer">
                  {project.title}
                </h3>
                <p className="text-syntax-blue font-mono-developer mb-3 text-sm">
                  {project.subtitle}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-developer-secondary mb-4">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    <span>{project.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaTag />
                    <span>{project.category}</span>
                  </div>
                </div>

                <p className="text-developer-secondary mb-6 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-terminal text-developer-secondary rounded-lg text-xs font-mono-developer border border-developer"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-terminal text-developer-secondary rounded-lg text-xs font-mono-developer border border-developer">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                
<div className="flex gap-3">
  <Link
    to={`/projects/${project.id}`}
    className="flex-1 bg-terminal border border-developer text-terminal py-2.5 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-all text-sm text-center"
  >
    $ view_details()
  </Link>
  <div className="flex gap-2">
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-terminal border border-developer text-developer-secondary flex items-center justify-center rounded-lg hover:border-syntax-blue hover:text-syntax-blue transition-colors"
        title="View on GitHub"
      >
        <FaGithub />
      </a>
    )}
    {project.liveDemo && (
      <a
        href={project.liveDemo}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 bg-terminal border border-developer text-developer-secondary flex items-center justify-center rounded-lg hover:border-syntax-green hover:text-syntax-green transition-colors"
        title="Live Demo"
      >
        <FaExternalLinkAlt />
      </a>
    )}
  </div>
</div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="text-4xl text-developer-tertiary mb-4">{"{ }"}</div>
            <h3 className="text-xl font-bold text-developer-secondary mb-2 font-mono-developer">
              // No projects found
            </h3>
            <p className="text-developer-secondary font-mono-developer">
              $ try: npm run filter --category="{filter}"
            </p>
          </div>
        )}

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="text-center mt-12 animate-fadeIn">
            <button
              onClick={loadMoreProjects}
              className="px-8 py-3 border border-syntax-blue text-syntax-blue rounded-lg font-mono-developer hover:bg-syntax-blue/10 transition-colors"
            >
              $ load_more({filteredProjects.length - visibleProjects})
            </button>
          </div>
        )}

        {/* Project Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-blue transition-colors">
            <div className="text-3xl font-bold text-syntax-blue mb-2 font-mono-developer">
              {projects.length}+
            </div>
            <div className="text-developer-secondary">
              Projects
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-green transition-colors">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              95%
            </div>
            <div className="text-developer-secondary">
              Success Rate
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-purple transition-colors">
            <div className="text-3xl font-bold text-syntax-purple mb-2 font-mono-developer">
              25+
            </div>
            <div className="text-developer-secondary">
              Happy Clients
            </div>
         </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-orange transition-colors">
            <div className="text-3xl font-bold text-syntax-orange mb-2 font-mono-developer">
              10k+
            </div>
            <div className="text-developer-secondary">
              Lines of Code
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;