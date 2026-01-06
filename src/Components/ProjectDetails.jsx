// src/components/ProjectDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaArrowLeft, 
  FaCalendarAlt,
  FaTag,
  FaCode,
  FaRocket,
  FaUsers,
  FaTerminal,
  FaServer,
  FaDatabase,
  FaCogs,
  FaFolder,
  FaFileCode
} from 'react-icons/fa';

const ProjectDetails = ({ projects }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/');
    }
  }, [id, projects, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-terminal">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-syntax-blue mx-auto mb-4"></div>
          <p className="text-developer-secondary font-mono-developer">$ loading_project()</p>
        </div>
      </div>
    );
  }

  const colorClasses = {
    blue: 'text-syntax-blue border-syntax-blue',
    purple: 'text-syntax-purple border-syntax-purple',
    green: 'text-syntax-green border-syntax-green',
    orange: 'text-syntax-orange border-syntax-orange',
    red: 'text-syntax-red border-syntax-red'
  };

  const colorBGs = {
    blue: 'bg-syntax-blue/10',
    green: 'bg-syntax-green/10',
    purple: 'bg-syntax-purple/10',
    orange: 'bg-syntax-orange/10',
    red: 'bg-syntax-red/10'
  };

  const statusColor = project.status === 'Completed' ? 'syntax-green' : 'syntax-blue';
  const categoryColor = project.color || 'blue';

  return (
    <section className="pt-24 pb-20 bg-terminal">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="animate-fadeIn"
        >
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-syntax-blue hover:text-terminal transition-colors mb-8 font-mono-developer"
          >
            <FaArrowLeft /> $ cd ..
          </Link>

          {/* Terminal Header */}
          <div className="terminal-window mb-8">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                project — {project.title.toLowerCase().replace(/\s+/g, '-')}
              </div>
            </div>
            <div className="terminal-body">
              <div className="font-mono-developer text-sm">
                <div className="text-syntax-green">$ project --view --id={id}</div>
                <div className="text-terminal mt-2">Project: <span className="text-syntax-blue">{project.title}</span></div>
                <div className="text-terminal">Category: <span className="text-syntax-purple">{project.category}</span></div>
                <div className="text-terminal">Status: <span className={`text-${statusColor}`}>{project.status}</span></div>
              </div>
            </div>
          </div>

          {/* Project Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-terminal mb-2 font-mono-developer">
                  {project.title}
                </h1>
                <p className={`text-xl ${colorClasses[categoryColor].split(' ')[0]}`}>
                  {project.subtitle}
                </p>
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-developer-secondary border border-developer text-terminal px-4 py-2 rounded-lg hover:border-syntax-blue hover:text-syntax-blue transition-colors font-mono-developer"
                  >
                    <FaGithub /> git clone
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-terminal border border-developer text-terminal px-4 py-2 rounded-lg hover:border-syntax-green hover:text-syntax-green transition-colors font-mono-developer"
                  >
                    <FaExternalLinkAlt /> $ run
                  </a>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-developer-secondary font-mono-developer">
                <FaCalendarAlt />
                <span>{project.period}</span>
              </div>
              <div className="flex items-center gap-2 text-developer-secondary font-mono-developer">
                <FaTag />
                <span className={`px-3 py-1 rounded-lg text-sm border ${colorClasses[categoryColor]}`}>
                  {project.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-developer-secondary font-mono-developer">
                <FaRocket />
                <span className={`px-3 py-1 rounded-lg text-sm border ${
                  project.status === 'Completed' 
                    ? 'border-syntax-green text-syntax-green'
                    : 'border-syntax-blue text-syntax-blue'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Project Banner */}
            <div className={`h-64 md:h-96 rounded-xl overflow-hidden mb-12 ${colorBGs[categoryColor]} border border-developer flex items-center justify-center`}>
              <div className="text-center">
               

                <p className="text-developer-secondary font-mono-developer">// project-visualization</p>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-terminal mb-6 flex items-center gap-3 font-mono-developer">
                  <FaCode /> // Project Overview
                </h2>
                <div className="prose prose-invert max-w-none">
                  <div className="bg-developer-secondary rounded-xl p-6 border border-developer">
                    <div className="font-mono-developer text-developer-secondary whitespace-pre-wrap">
                      {project.fullDescription}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-terminal mb-6 font-mono-developer">// Key Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-developer-secondary rounded-xl p-4 border border-developer hover:border-syntax-blue transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 ${colorBGs[categoryColor]} ${colorClasses[categoryColor].split(' ')[0]} rounded-lg flex items-center justify-center font-mono-developer`}>
                          {index + 1}
                        </div>
                        <span className="font-medium text-terminal font-mono-developer">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div>
                <h2 className="text-2xl font-bold text-terminal mb-6 font-mono-developer">// Technology Stack</h2>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-4 py-2 rounded-lg border border-developer hover:${colorClasses[categoryColor]} transition-colors font-mono-developer text-sm`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24">
                {/* Project Info Card */}
                <div className="bg-developer-secondary rounded-xl p-6 border border-developer mb-6">
                  <h3 className="text-xl font-bold text-terminal mb-4 font-mono-developer">// Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-developer-tertiary mb-1 font-mono-developer">status</p>
                      <p className={`font-medium ${project.status === 'Completed' ? 'text-syntax-green' : 'text-syntax-blue'} font-mono-developer`}>
                        {project.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-developer-tertiary mb-1 font-mono-developer">category</p>
                      <p className="font-medium text-terminal font-mono-developer">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-developer-tertiary mb-1 font-mono-developer">timeline</p>
                      <p className="font-medium text-terminal font-mono-developer">{project.period}</p>
                    </div>
                    <div>
                      <p className="text-sm text-developer-tertiary mb-1 font-mono-developer">tech_stack</p>
                      <p className="font-medium text-terminal font-mono-developer">{project.tech.length} technologies</p>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className={`${colorBGs[categoryColor]} rounded-xl p-6 border ${colorClasses[categoryColor]}`}>
                  <h3 className="text-xl font-bold text-terminal mb-4 flex items-center gap-2 font-mono-developer">
                    <FaUsers /> // Interested?
                  </h3>
                  <p className="text-developer-secondary mb-6 font-mono-developer">
                    Want to build something similar? Let's discuss your project requirements.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full bg-terminal border border-developer text-terminal text-center py-3 rounded-lg font-bold hover:border-syntax-green hover:text-syntax-green transition-colors font-mono-developer"
                  >
                    $ start_project()
                  </Link>
                </div>

                {/* Project Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-developer-secondary rounded-lg p-4 text-center border border-developer">
                    <div className="text-2xl font-bold text-syntax-blue mb-1 font-mono-developer">
                      {project.features.length}
                    </div>
                    <div className="text-xs text-developer-tertiary font-mono-developer">
                      Features
                    </div>
                  </div>
                  <div className="bg-developer-secondary rounded-lg p-4 text-center border border-developer">
                    <div className="text-2xl font-bold text-syntax-green mb-1 font-mono-developer">
                      {project.tech.length}
                    </div>
                    <div className="text-xs text-developer-tertiary font-mono-developer">
                      Technologies
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Snippet Preview */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-terminal mb-6 font-mono-developer">// Code Preview</h3>
            <div className="bg-developer-secondary rounded-xl overflow-hidden border border-developer">
              <div className="px-6 py-3 border-b border-developer flex items-center gap-2">
                <FaFolder className="text-syntax-yellow" />
                <span className="text-terminal font-mono-developer">project-structure</span>
                <div className="ml-auto flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-syntax-red"></div>
                  <div className="w-3 h-3 rounded-full bg-syntax-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-syntax-green"></div>
                </div>
              </div>
              <div className="p-6 font-mono-developer text-sm">
                <div className="text-syntax-blue">// {project.title} - Main Component</div>
                <div className="text-syntax-purple mt-4">import</div>
                <div className="ml-4 text-syntax-green">React</div>
                <div className="text-syntax-purple">from</div>
                <div className="ml-4 text-terminal">'react';</div>
                <div className="mt-4 text-syntax-purple">import</div>
                <div className="ml-4">{`{ ${project.tech.slice(0, 3).join(', ')} }`}</div>
                <div className="text-syntax-purple">from</div>
                <div className="ml-4 text-terminal">'technologies';</div>
                <div className="mt-4 text-syntax-blue">// Status: {project.status}</div>
                <div className="text-syntax-blue mt-2">// Last updated: {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetails;