import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaTerminal, FaCode } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechSolutions",
      content: "Asad delivered an exceptional AI dashboard that exceeded our expectations. His attention to detail and technical expertise were impressive.",
      rating: 5,
      company: "TechSolutions Inc.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      color: "syntax-blue"
    },
    {
      name: "Michael Chen",
      role: "Product Manager at EduTech",
      content: "Working with Asad was a pleasure. He understood our requirements perfectly and delivered a robust student performance prediction system.",
      rating: 5,
      company: "EduTech Innovations",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      color: "syntax-green"
    },
    {
      name: "Emma Wilson",
      role: "Founder at RetailPro",
      content: "The SmartRetail Insight dashboard transformed our business analytics. Asad's full-stack skills are truly remarkable.",
      rating: 5,
      company: "RetailPro Analytics",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      color: "syntax-purple"
    },
    {
      name: "David Rodriguez",
      role: "Engineering Lead at FinTech Corp",
      content: "Asad's work on our financial dashboard was outstanding. His ability to handle complex data visualizations is impressive.",
      rating: 5,
      company: "FinTech Corp",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      color: "syntax-orange"
    },
    {
      name: "Lisa Anderson",
      role: "CEO at HealthTech",
      content: "The healthcare analytics platform Asad built for us has been instrumental in improving patient care outcomes.",
      rating: 5,
      company: "HealthTech Solutions",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      color: "syntax-yellow"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, currentIndex]);

  const colorClasses = {
    'syntax-blue': 'text-syntax-blue border-syntax-blue',
    'syntax-green': 'text-syntax-green border-syntax-green',
    'syntax-purple': 'text-syntax-purple border-syntax-purple',
    'syntax-orange': 'text-syntax-orange border-syntax-orange',
    'syntax-yellow': 'text-syntax-yellow border-syntax-yellow'
  };

  const colorBGs = {
    'syntax-blue': 'bg-syntax-blue/10',
    'syntax-green': 'bg-syntax-green/10',
    'syntax-purple': 'bg-syntax-purple/10',
    'syntax-orange': 'bg-syntax-orange/10',
    'syntax-yellow': 'bg-syntax-yellow/10'
  };

  return (
    <section className="py-20 bg-terminal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer">
            $ testimonials --all
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-terminal mb-4">
            <span className="text-syntax-blue">export</span>{' '}
            <span className="text-syntax-green">const</span>{' '}
            <span className="text-syntax-purple">testimonials</span>{' '}
            <span className="text-syntax-blue">=</span>{' '}
            <span className="text-syntax-orange">[</span>
          </h2>
          <p className="text-lg text-developer-secondary max-w-2xl mx-auto font-mono-developer">
            // Feedback from clients I've worked with on various projects
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-10 h-10 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center text-terminal hover:text-syntax-blue hover:border-syntax-blue transition-all z-10"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 w-10 h-10 rounded-lg bg-developer-secondary border border-developer flex items-center justify-center text-terminal hover:text-syntax-blue hover:border-syntax-blue transition-all z-10"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>

          {/* Terminal Window for Testimonials */}
          <div className="terminal-window animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                testimonials — carousel — 80×24
              </div>
            </div>
            
            <div className="terminal-body">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.name}
                      className="w-full flex-shrink-0 px-2"
                    >
                      <div className="space-y-4">
                        {/* Terminal Output */}
                        <div className="font-mono-developer text-sm">
                          <div className="text-syntax-green">$ client_testimonial --id={index + 1}</div>
                          <div className="text-terminal mt-2">
                            <span className="text-syntax-blue">Name:</span> {testimonial.name}
                          </div>
                          <div className="text-terminal">
                            <span className="text-syntax-blue">Role:</span> {testimonial.role}
                          </div>
                          <div className="text-terminal">
                            <span className="text-syntax-blue">Company:</span> <span className={colorClasses[testimonial.color].split(' ')[0]}>{testimonial.company}</span>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar key={i} className="text-syntax-yellow fill-current" />
                          ))}
                          <span className="text-developer-secondary text-sm ml-2 font-mono-developer">
                            // Rating: {testimonial.rating}/5
                          </span>
                        </div>

                        {/* Quote */}
                        <div className="relative pl-4 border-l-2 border-syntax-blue">
                          <FaQuoteLeft className="text-syntax-blue text-lg mb-2" />
                          <p className="text-terminal italic text-sm">
                            "{testimonial.content}"
                          </p>
                        </div>

                        {/* Client Info */}
                        <div className="flex items-center gap-3 pt-4 border-t border-developer">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-lg border border-developer"
                          />
                          <div>
                            <div className="text-terminal font-bold">{testimonial.name}</div>
                            <div className="text-developer-secondary text-sm">{testimonial.role}</div>
                            <div className={`text-sm ${colorClasses[testimonial.color].split(' ')[0]}`}>{testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-syntax-blue w-8' : 'bg-developer-secondary hover:bg-developer-tertiary'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Terminal Stats */}
        <div className="mt-16 terminal-window animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
              stats — performance — 80×24
            </div>
          </div>
          <div className="terminal-body">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="font-mono-developer text-syntax-green">$ client_satisfaction</div>
                <div className="text-2xl font-bold text-terminal mt-2">100%</div>
                <div className="text-developer-secondary text-sm">Client Satisfaction</div>
              </div>
              <div>
                <div className="font-mono-developer text-syntax-green">$ on_time_delivery</div>
                <div className="text-2xl font-bold text-terminal mt-2">95%</div>
                <div className="text-developer-secondary text-sm">On-Time Delivery</div>
              </div>
              <div>
                <div className="font-mono-developer text-syntax-green">$ projects_completed</div>
                <div className="text-2xl font-bold text-terminal mt-2">50+</div>
                <div className="text-developer-secondary text-sm">Projects Completed</div>
              </div>
              <div>
                <div className="font-mono-developer text-syntax-green">$ happy_clients</div>
                <div className="text-2xl font-bold text-terminal mt-2">25+</div>
                <div className="text-developer-secondary text-sm">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-blue transition-colors">
            <div className="text-3xl font-bold text-syntax-blue mb-2 font-mono-developer">
              100+
            </div>
            <div className="text-developer-secondary font-mono-developer text-sm">
              // Commits
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-green transition-colors">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              99.9%
            </div>
            <div className="text-developer-secondary font-mono-developer text-sm">
              // Uptime
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-purple transition-colors">
            <div className="text-3xl font-bold text-syntax-purple mb-2 font-mono-developer">
              24/7
            </div>
            <div className="text-developer-secondary font-mono-developer text-sm">
              // Support
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer hover:border-syntax-orange transition-colors">
            <div className="text-3xl font-bold text-syntax-orange mb-2 font-mono-developer">
              0
            </div>
            <div className="text-developer-secondary font-mono-developer text-sm">
              // Major Bugs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;