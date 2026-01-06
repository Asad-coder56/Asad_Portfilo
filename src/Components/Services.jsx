import React, { useEffect, useRef } from 'react';
import { 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaRobot, 
  FaMobileAlt, 
  FaCloud,
  FaShieldAlt,
  FaChartLine,
  FaLaptopCode,
  FaPaintBrush,
  FaCogs,
  FaRocket,
  FaTerminal
} from 'react-icons/fa';

const Services = ({ setActiveSection }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('services');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);

  const services = [
    {
      icon: FaLaptopCode,
      title: "Web Application Development",
      description: "Custom web applications built with modern frameworks and best practices.",
      features: ["React/Next.js", "Responsive Design", "Performance Optimization", "Cross-browser Compatibility"],
      price: "$50-80/hr",
      popular: true,
      color: "syntax-blue"
    },
    {
      icon: FaServer,
      title: "Backend & API Development",
      description: "Scalable server-side solutions with robust APIs and microservices architecture.",
      features: ["Node.js/Express", "REST/GraphQL APIs", "Database Design", "Authentication"],
      price: "$60-90/hr",
      popular: false,
      color: "syntax-green"
    },
    {
      icon: FaDatabase,
      title: "Database Solutions",
      description: "Efficient database design, optimization, and management for high-performance apps.",
      features: ["MongoDB/PostgreSQL", "Database Optimization", "Data Modeling", "Redis Caching"],
      price: "$55-85/hr",
      popular: false,
      color: "syntax-purple"
    },
    {
      icon: FaRobot,
      title: "AI/ML Integration",
      description: "Integrating machine learning models and AI capabilities into applications.",
      features: ["Python ML Models", "TensorFlow/PyTorch", "Model Deployment", "API Integration"],
      price: "$70-100/hr",
      popular: true,
      color: "syntax-orange"
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Development",
      description: "Cross-platform mobile applications with React Native and Flutter.",
      features: ["React Native", "iOS & Android", "Push Notifications", "App Store Deployment"],
      price: "$65-95/hr",
      popular: false,
      color: "syntax-yellow"
    },
    {
      icon: FaCloud,
      title: "DevOps & Cloud",
      description: "CI/CD pipelines, containerization, and cloud deployment solutions.",
      features: ["Docker/Kubernetes", "AWS/Azure", "CI/CD Pipelines", "Monitoring"],
      price: "$60-90/hr",
      popular: false,
      color: "syntax-blue"
    },
    {
      icon: FaShieldAlt,
      title: "Security Solutions",
      description: "Implementing security best practices and protection measures.",
      features: ["JWT/OAuth", "Data Encryption", "Security Audits", "GDPR Compliance"],
      price: "$75-110/hr",
      popular: false,
      color: "syntax-red"
    },
    {
      icon: FaChartLine,
      title: "Analytics & BI",
      description: "Data visualization and business intelligence dashboards.",
      features: ["Chart.js/D3.js", "Real-time Analytics", "Dashboard Design", "Data Warehousing"],
      price: "$65-95/hr",
      popular: false,
      color: "syntax-purple"
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
    <section id="services" ref={sectionRef} className="py-20 bg-terminal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer">
            $ services --list
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal mb-4">
            <span className="text-syntax-blue">interface</span>{' '}
            <span className="text-syntax-green">Services</span>{' '}
            <span className="text-syntax-blue">{'{'}</span>
          </h2>
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer">
            // Comprehensive development services tailored to bring your digital vision to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-developer-secondary rounded-xl p-6 border border-developer hover:border-syntax-blue transition-all duration-300 animate-slideUp card-developer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-terminal text-syntax-green px-4 py-1 rounded-lg text-sm font-mono-developer border border-developer">
                    $ popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <div className={`w-14 h-14 rounded-lg ${colorBGs[service.color]} border border-developer flex items-center justify-center mb-4`}>
                  <service.icon className={`text-xl ${colorClasses[service.color].split(' ')[0]}`} />
                </div>
                <h3 className="text-xl font-bold text-terminal mb-3 font-mono-developer">
                  {service.title}
                </h3>
                <p className="text-developer-secondary mb-6 text-sm">
                  {service.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-terminal mb-3 font-mono-developer">// Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className={`mr-2 ${colorClasses[service.color].split(' ')[0]}`}>→</span>
                        <span className="text-developer-secondary text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-developer">
                <div>
                  <span className="text-2xl font-bold text-terminal font-mono-developer">
                    {service.price}
                  </span>
                  <span className="text-developer-secondary text-sm ml-1">/ hour</span>
                </div>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`px-4 py-2 ${colorBGs[service.color]} ${colorClasses[service.color]} rounded-lg font-mono-developer hover:shadow-lg transition-shadow text-sm`}
                >
                  get_quote()
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-20 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-2xl font-bold text-center text-terminal mb-12 font-mono-developer">
            // Development Process
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-syntax-blue to-syntax-purple hidden lg:block"></div>

            {/* Process steps */}
            <div className="space-y-12 lg:space-y-0">
              {[
                {
                  step: "01",
                  title: "Discovery & Planning",
                  description: "Understanding requirements, project scope, and creating detailed specifications.",
                  icon: FaRocket,
                  color: "syntax-blue"
                },
                {
                  step: "02",
                  title: "Design & Prototyping",
                  description: "Creating wireframes, mockups, and interactive prototypes.",
                  icon: FaPaintBrush,
                  color: "syntax-green"
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Building the application with clean, maintainable code and best practices.",
                  icon: FaCode,
                  color: "syntax-purple"
                },
                {
                  step: "04",
                  title: "Testing & Deployment",
                  description: "Rigorous testing, optimization, and deployment to production.",
                  icon: FaCogs,
                  color: "syntax-orange"
                }
              ].map((process, index) => (
                <div 
                  key={process.step}
                  className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-6 animate-slideUp`}
                  style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                >
                  <div className={`lg:absolute left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 ${
                    index % 2 === 0 ? 'lg:left-1/2 lg:-translate-x-1/2' : ''
                  }`}>
                    <div className={`w-14 h-14 rounded-full ${colorBGs[process.color]} border-2 ${colorClasses[process.color]} flex items-center justify-center text-terminal text-lg font-bold font-mono-developer z-10 relative`}>
                      {process.step}
                    </div>
                  </div>
                  
                  <div className={`lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:order-2'}`}>
                    <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <process.icon className={`text-2xl ${colorClasses[process.color].split(' ')[0]}`} />
                      <h4 className={`text-xl font-bold font-mono-developer ${colorClasses[process.color].split(' ')[0]}`}>
                        {process.title}
                      </h4>
                    </div>
                    <p className={`text-developer-secondary mt-2 text-sm ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {process.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-syntax-blue/20 to-syntax-purple/20 rounded-xl p-8 md:p-12 text-center border border-developer animate-fadeIn" style={{ animationDelay: '1.2s' }}>
          <h3 className="text-2xl md:text-3xl font-bold text-terminal mb-4 font-mono-developer">
            $ ready_to_start()
          </h3>
          <p className="text-developer-secondary mb-8 max-w-2xl mx-auto font-mono-developer text-sm">
            // Let's discuss your project requirements and create a tailored solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-terminal border border-developer text-terminal rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-colors"
            >
              get_consultation()
            </button>
            <a
              href="mailto:kamalasad57@gmail.com"
              className="px-8 py-3 border border-syntax-green text-syntax-green rounded-lg font-mono-developer hover:bg-syntax-green/10 transition-colors"
            >
              send_email()
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;