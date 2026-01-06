import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaChevronRight,
  FaTerminal,
  FaCode,
  FaHeart,
  FaArrowUp,
  FaCoffee
} from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Skills', path: '#skills' },
    { label: 'Projects', path: '#projects' },
    { label: 'Services', path: '#services' },
    { label: 'Education', path: '#education' },
    { label: 'Contact', path: '#contact' },
    { label: 'Blog', path: '/blog' }
  ];

  const techStack = [
    { label: 'React', color: 'text-syntax-blue' },
    { label: 'Node.js', color: 'text-syntax-green' },
    { label: 'Python', color: 'text-syntax-blue' },
    { label: 'TypeScript', color: 'text-syntax-blue' },
    { label: 'MongoDB', color: 'text-syntax-green' },
    { label: 'Tailwind', color: 'text-syntax-blue' }
  ];

  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-terminal border-t border-developer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Terminal Header */}
        <div className="mb-8">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                footer — bash — 80×24
              </div>
            </div>
            <div className="terminal-body">
              <div className="font-mono-developer text-sm space-y-2">
                <div className="text-syntax-green">$ cat README.md</div>
                <div className="text-terminal">// Muhammad Asad Kamal Shah</div>
                <div className="text-terminal">// Full Stack Developer & AI Engineer</div>
                <div className="text-terminal mt-4">
                  <span className="text-syntax-blue">const</span>{' '}
                  <span className="text-syntax-green">contact</span>{' '}
                  <span className="text-syntax-blue">=</span>{' '}
                  <span className="text-syntax-yellow">{'{'}</span>
                </div>
                <div className="ml-4 text-terminal">
                  <span className="text-syntax-green">email</span>:
                  <span className="text-syntax-orange"> "kamalasad57@gmail.com"</span>,
                </div>
                <div className="ml-4 text-terminal">
                  <span className="text-syntax-green">phone</span>:
                  <span className="text-syntax-orange"> "+92 305 1958933"</span>,
                </div>
                <div className="ml-4 text-terminal">
                  <span className="text-syntax-green">location</span>:
                  <span className="text-syntax-orange"> "Mianwali, Pakistan"</span>
                </div>
                <div className="text-terminal">
                  <span className="text-syntax-yellow">{'}'}</span>;
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="animate-fadeIn">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center">
                <FaTerminal className="text-syntax-blue text-lg" />
              </div>
              <div>
                <span className="text-xl font-bold font-mono-developer text-terminal">
                  maks@dev
                </span>
                <div className="h-0.5 w-8 bg-syntax-blue"></div>
              </div>
            </div>
            <p className="text-developer-secondary mb-6 text-sm">
              Building intelligent web applications and integrating AI/ML models into real-world solutions.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center text-developer-secondary hover:text-syntax-blue hover:border-syntax-blue transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-xl font-bold text-terminal mb-6 font-mono-developer">
              $ ls -la
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center hover:text-syntax-blue transition-colors font-mono-developer text-sm"
                  >
                    <FaChevronRight className="text-syntax-green mr-2 text-sm" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-xl font-bold text-terminal mb-6 font-mono-developer">
              // Tech Stack
            </h4>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech.label}
                  className={`px-3 py-1.5 rounded-lg bg-developer-secondary border border-developer text-sm font-mono-developer ${tech.color}`}
                >
                  {tech.label}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-xl font-bold text-terminal mb-6 font-mono-developer">
              $ contact_info
            </h4>
            <div className="space-y-4 font-mono-developer text-sm">
              <div>
                <p className="text-developer-secondary">// Email</p>
                <a href="mailto:kamalasad57@gmail.com" className="text-syntax-blue hover:underline">
                  kamalasad57@gmail.com
                </a>
              </div>
              <div>
                <p className="text-developer-secondary">// Phone</p>
                <a href="tel:+923051958933" className="text-syntax-blue hover:underline">
                  +92 305 1958933
                </a>
              </div>
              <div>
                <p className="text-developer-secondary">// Location</p>
                <p className="text-terminal">Mianwali, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-developer pt-8 text-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="flex items-center justify-center gap-2 text-developer-secondary font-mono-developer text-sm">
              <span className="text-syntax-blue">©</span> {currentYear} Muhammad Asad Kamal Shah
              <FaHeart className="text-syntax-red animate-pulse" />
            </p>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-developer-secondary border border-developer text-terminal hover:border-syntax-blue hover:text-syntax-blue transition-colors font-mono-developer text-sm"
            >
              <FaArrowUp /> $ cd ../
            </button>
          </div>
          
          <p className="mt-4 text-sm text-developer-secondary font-mono-developer">
            <FaCode className="inline mr-2" />
            Built with React, Tailwind CSS, and{' '}
            <FaCoffee className="inline mx-1 text-syntax-orange" />
            coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;