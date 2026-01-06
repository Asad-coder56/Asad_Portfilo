import React, { useEffect, useRef, useState } from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaCheckCircle,
  FaExclamationCircle,
  FaPaperPlane,
  FaUser,
  FaGlobe,
  FaTerminal,
  FaCode
} from 'react-icons/fa';

const Contact = ({ setActiveSection, isStandalone = false }) => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: false,
    message: ''
  });
  const [terminalOutput, setTerminalOutput] = useState('');

  useEffect(() => {
    if (!isStandalone) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection('contact');
          }
        },
        { threshold: 0.3 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }
  }, [setActiveSection, isStandalone]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const simulateTerminal = (message) => {
    setTerminalOutput(message);
    setTimeout(() => setTerminalOutput(''), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: false, message: 'Sending...' });
    simulateTerminal('$ sending_message()\n> Processing form data...');

    // Simulate API call
    setTimeout(() => {
      setStatus({
        sending: false,
        success: true,
        error: false,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      simulateTerminal('$ sending_message()\n✓ Message sent successfully!\n> Response received: 200 OK');

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus({ sending: false, success: false, error: false, message: '' });
        simulateTerminal('');
      }, 5000);
    }, 2000);
  };

  const languages = ['English', 'Urdu', 'Saraiki', 'Pashto'];
  const socialLinks = [
    { icon: FaGithub, label: 'GitHub', url: 'https://github.com' },
    { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com' },
    { icon: FaInstagram, label: 'Instagram', url: 'https://instagram.com' }
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "kamalasad57@gmail.com",
      color: "syntax-blue"
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+92 305 1958933",
      color: "syntax-green"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Mianawala, Isa Khel, Mianwali, Punjab, Pakistan",
      color: "syntax-purple"
    },
    {
      icon: FaGlobe,
      title: "Languages",
      value: languages.join(', '),
      color: "syntax-orange"
    }
  ];

  const colorClasses = {
    'syntax-blue': 'text-syntax-blue border-syntax-blue',
    'syntax-green': 'text-syntax-green border-syntax-green',
    'syntax-purple': 'text-syntax-purple border-syntax-purple',
    'syntax-orange': 'text-syntax-orange border-syntax-orange'
  };

  const colorBGs = {
    'syntax-blue': 'bg-syntax-blue/10',
    'syntax-green': 'bg-syntax-green/10',
    'syntax-purple': 'bg-syntax-purple/10',
    'syntax-orange': 'bg-syntax-orange/10'
  };

  return (
    <section id="contact" ref={sectionRef} className={`py-20 bg-terminal ${isStandalone ? 'pt-24' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer">
            $ contact --start
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal mb-4">
            <span className="text-syntax-blue">async</span>{' '}
            <span className="text-syntax-green">function</span>{' '}
            <span className="text-syntax-purple">contact</span>
            <span className="text-syntax-blue">()</span>{' '}
            <span className="text-syntax-blue">{'{'}</span>
          </h2>
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer">
            // Have a project in mind? Let's discuss how we can work together
          </p>
        </div>

        {/* Terminal Output */}
        {terminalOutput && (
          <div className="mb-8 terminal-window animate-slideDown">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                contact — terminal — 80×24
              </div>
            </div>
            <div className="terminal-body">
              <div className="font-mono-developer text-sm whitespace-pre-wrap">
                {terminalOutput}
              </div>
            </div>
          </div>
        )}

        {/* Status Message */}
        {status.message && !terminalOutput && (
          <div className={`mb-6 p-4 rounded-lg border ${status.success ? 'border-syntax-green text-syntax-green' : status.error ? 'border-syntax-red text-syntax-red' : 'border-syntax-blue text-syntax-blue'} animate-fadeIn`}>
            <div className="flex items-center gap-3 font-mono-developer">
              {status.success ? (
                <FaCheckCircle />
              ) : status.error ? (
                <FaExclamationCircle />
              ) : null}
              <span>{status.message}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="bg-developer-secondary rounded-xl p-6 border border-developer h-full">
              <h3 className="text-2xl font-bold mb-8 text-terminal font-mono-developer">
                $ contact_info
              </h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div 
                    key={info.title}
                    className="flex items-start gap-4 p-4 rounded-lg bg-terminal border border-developer hover:border-syntax-blue transition-colors animate-slideUp"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className={`${colorClasses[info.color].split(' ')[0]}`}>
                      <info.icon className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-terminal mb-1 font-mono-developer">
                        // {info.title}
                      </h4>
                      <p className="text-developer-secondary text-sm">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-bold text-terminal mb-4 font-mono-developer">
                  $ social_links
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-lg bg-terminal border border-developer flex items-center justify-center text-terminal hover:text-syntax-blue hover:border-syntax-blue transition-all animate-slideUp"
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                      title={social.label}
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="bg-developer-secondary rounded-xl p-6 border border-developer h-full">
              <h3 className="text-2xl font-bold mb-8 text-terminal font-mono-developer">
                $ send_message()
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-terminal mb-2 font-mono-developer text-sm">
                      // Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-developer-tertiary" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-terminal border border-developer text-terminal focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm"
                        placeholder="Enter your name"
                        required
                        disabled={status.sending}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-terminal mb-2 font-mono-developer text-sm">
                      // Email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-developer-tertiary" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-terminal border border-developer text-terminal focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm"
                        placeholder="Enter your email"
                        required
                        disabled={status.sending}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-terminal mb-2 font-mono-developer text-sm">
                    // Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-terminal border border-developer text-terminal focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm"
                    placeholder="Project type or inquiry"
                    required
                    disabled={status.sending}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-terminal mb-2 font-mono-developer text-sm">
                    // Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg bg-terminal border border-developer text-terminal focus:outline-none focus:border-syntax-blue transition-all font-mono-developer text-sm resize-none"
                    placeholder="Tell me about your project..."
                    required
                    disabled={status.sending}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.sending}
                  className="w-full bg-terminal border border-developer text-terminal py-3.5 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status.sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-terminal border-t-transparent"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FaPaperPlane /> submit_form()
                    </span>
                  )}
                </button>

                <p className="text-sm text-developer-secondary text-center font-mono-developer">
                  // I typically respond within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Terminal Window - Availability */}
        <div className="mt-12 terminal-window animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
              availability — status — 80×24
            </div>
          </div>
          <div className="terminal-body">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="font-mono-developer text-syntax-green">$ work_availability</div>
                <div className="text-2xl font-bold text-terminal mt-2">Remote</div>
                <div className="text-developer-secondary text-sm">Work Available</div>
              </div>
              <div className="text-center">
                <div className="font-mono-developer text-syntax-green">$ working_hours</div>
                <div className="text-2xl font-bold text-terminal mt-2">Flexible</div>
                <div className="text-developer-secondary text-sm">Time Zone: UTC+5</div>
              </div>
              <div className="text-center">
                <div className="font-mono-developer text-syntax-green">$ client_base</div>
                <div className="text-2xl font-bold text-terminal mt-2">Worldwide</div>
                <div className="text-developer-secondary text-sm">Global Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12 code-block animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <div className="font-mono-developer text-sm">
            <div className="text-syntax-blue">const</div>
            <div className="ml-4">
              <span className="text-syntax-blue">{'{'}</span>{' '}
              <span className="text-syntax-green">name</span>,{' '}
              <span className="text-syntax-green">email</span>,{' '}
              <span className="text-syntax-green">message</span>{' '}
              <span className="text-syntax-blue">{'}'}</span>{' '}
              <span className="text-syntax-blue">=</span>{' '}
              <span className="text-syntax-blue">useState</span>(
              <span className="text-syntax-orange">''</span>);
            </div>
            <br />
            <div>
              <span className="text-syntax-purple">const</span>{' '}
              <span className="text-syntax-green">handleSubmit</span>{' '}
              <span className="text-syntax-blue">=</span>{' '}
              <span className="text-syntax-blue">async</span>{' '}
              <span className="text-syntax-blue">()</span>{' '}
              <span className="text-syntax-blue">{'=>'}</span>{' '}
              <span className="text-syntax-blue">{'{'}</span>
            </div>
            <div className="ml-4">
              <span className="text-syntax-blue">try</span>{' '}
              <span className="text-syntax-blue">{'{'}</span>
            </div>
            <div className="ml-8">
              <span className="text-syntax-blue">await</span>{' '}
              <span className="text-syntax-green">sendEmail</span>(
              <span className="text-syntax-blue">{'{'}</span>{' '}
              <span className="text-syntax-green">name</span>,{' '}
              <span className="text-syntax-green">email</span>,{' '}
              <span className="text-syntax-green">message</span>{' '}
              <span className="text-syntax-blue">{'}'}</span>);
            </div>
            <div className="ml-8">
              <span className="text-syntax-green">console</span>.<span className="text-syntax-blue">log</span>(
              <span className="text-syntax-orange">'✓ Message sent successfully!'</span>);
            </div>
            <div className="ml-4">
              <span className="text-syntax-blue">{'}'}</span>{' '}
              <span className="text-syntax-blue">catch</span>{' '}
              <span className="text-syntax-blue">(</span>
              <span className="text-syntax-blue">error</span>
              <span className="text-syntax-blue">)</span>{' '}
              <span className="text-syntax-blue">{'{'}</span>
            </div>
            <div className="ml-8">
              <span className="text-syntax-green">console</span>.<span className="text-syntax-blue">error</span>(
              <span className="text-syntax-orange">'✗ Error sending message:'</span>,{' '}
              <span className="text-syntax-blue">error</span>);
            </div>
            <div className="ml-4">
              <span className="text-syntax-blue">{'}'}</span>
            </div>
            <div>
              <span className="text-syntax-blue">{'}'}</span>;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;