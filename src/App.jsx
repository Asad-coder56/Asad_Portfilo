import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Hero from './Components/Hero.jsx';
import Skills from './Components/Skills.jsx';
import Services from './Components/Services.jsx';
import Projects from './Components/Projects.jsx';
import Education from './Components/Education.jsx';
import Contact from './Components/Contact.jsx';
import Footer from './Components/Footer.jsx';
import ProjectDetails from './Components/ProjectDetails.jsx';
import Blog from './Components/Blog.jsx';
import BlogPost from './Components/BlogPost.jsx';

import ScrollToTop from './Components/ScrollToTop.jsx';
import LoadingScreen from './Components/LoadingScreen.jsx';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Always start with dark mode for developer portfolio
    setDarkMode(true);
    document.documentElement.classList.add('dark');

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.random() * 15 + 5; // 5-20% increments
        return Math.min(prev + increment, 100);
      });
    }, 300);

    // Load mock projects
    const mockProjects = [
      {
        id: 1,
        title: "SmartRetail Insight",
        subtitle: "AI Dashboard for Retail Analytics",
        period: "May 2025 – Present",
        description: "Full-stack AI-powered dashboard that forecasts future sales and analyzes customer sentiment from reviews.",
        fullDescription: "A comprehensive AI solution that transforms retail analytics by predicting sales trends and understanding customer feedback. The system uses machine learning algorithms to analyze historical sales data and customer reviews, providing actionable insights for business growth.",
        tech: ["React", "Node.js", "Express", "MongoDB", "Python", "TensorFlow", "Chart.js"],
        features: [
          "Sales forecasting using ML models",
          "Customer sentiment analysis",
          "Responsive React UI",
          "Drag-and-drop file upload",
          "Real-time analytics dashboard",
          "Multi-store management"
        ],
        github: "https://github.com/yourusername/smartretail",
        liveDemo: "https://smartretail-demo.com",
        images: ["/api/placeholder/800/400"],
        status: "In Development",
        category: "AI/ML",
        color: "purple"
      },
      {
        id: 2,
        title: "WISE AI",
        subtitle: "Student Performance Prediction System",
        period: "Jan 2025 – Present",
        description: "AI-powered educational platform that predicts student performance and recommends personalized study topics.",
        fullDescription: "An intelligent educational platform that leverages machine learning to predict student performance and provide personalized learning paths. The system analyzes student data to identify patterns and suggest targeted study materials.",
        tech: ["Python", "FastAPI", "React", "Scikit-learn", "PostgreSQL", "Docker"],
        features: [
          "Student performance prediction",
          "Personalized study recommendations",
          "Real-time REST APIs",
          "Data visualization",
          "Progress tracking",
          "Admin dashboard"
        ],
        github: "https://github.com/yourusername/wise-ai",
        liveDemo: "https://wise-ai-demo.com",
        images: ["/api/placeholder/800/400"],
        status: "Completed",
        category: "AI/ML",
        color: "green"
      },
      {
        id: 3,
        title: "E-commerce Platform",
        subtitle: "Full Stack E-commerce Solution",
        period: "Mar 2024 – Dec 2024",
        description: "Complete e-commerce solution with product management, payment integration, and admin dashboard.",
        fullDescription: "A full-featured e-commerce platform built with modern technologies, featuring user authentication, product management, shopping cart, payment processing, and an admin dashboard for store management.",
        tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe", "Redux"],
        features: [
          "Product catalog & search",
          "Shopping cart & checkout",
          "Payment integration",
          "User authentication",
          "Order management",
          "Admin dashboard"
        ],
        github: "https://github.com/yourusername/ecommerce",
        liveDemo: "https://ecommerce-demo.com",
        images: ["/api/placeholder/800/400"],
        status: "Completed",
        category: "Full Stack",
        color: "blue"
      }
    ];

    setProjects(mockProjects);

    // Complete loading after a minimum time
    const minLoadTime = 3000; // 3 seconds minimum
    const startTime = Date.now();

    const completeLoading = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
        // Add a small delay before showing content for smooth transition
        setTimeout(() => setShowContent(true), 100);
      }, remainingTime);
    };

    // Listen for loading progress to complete
    const progressListener = setInterval(() => {
      if (loadingProgress >= 100) {
        clearInterval(progressListener);
        completeLoading();
      }
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(progressListener);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 developer-theme ${
        darkMode ? 'dark' : ''
      }`}>
        {/* Loading Screen */}
        {isLoading && (
          <LoadingScreen 
            onComplete={handleLoadingComplete}
            progress={loadingProgress}
          />
        )}

        {/* Main Content with Fade-in Animation */}
        <div className={`transition-all duration-700 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {showContent && (
            <>
              <ScrollToTop />
              <Header 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                scrollToSection={scrollToSection}
              />
              
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero 
                      setActiveSection={handleSectionChange} 
                      scrollToSection={scrollToSection}
                      darkMode={darkMode}
                    />
                    <Skills 
                      setActiveSection={handleSectionChange} 
                      darkMode={darkMode}
                    />
                    <Services 
                      setActiveSection={handleSectionChange} 
                      darkMode={darkMode}
                    />
                    <Projects 
                      projects={projects} 
                      setActiveSection={handleSectionChange} 
                      darkMode={darkMode}
                    />
                    
                    <Education 
                      setActiveSection={handleSectionChange} 
                      darkMode={darkMode}
                    />
                    <Contact 
                      setActiveSection={handleSectionChange} 
                      darkMode={darkMode}
                    />
                  </>
                } />
                <Route path="/projects/:id" element={
                  <ProjectDetails 
                    projects={projects} 
                    darkMode={darkMode}
                  />
                } />
                <Route path="/blog" element={<Blog darkMode={darkMode} />} />
                <Route path="/blog/:id" element={<BlogPost darkMode={darkMode} />} />
                <Route path="/contact" element={
                  <Contact 
                    setActiveSection={handleSectionChange} 
                    isStandalone={true}
                    darkMode={darkMode}
                  />
                } />
              </Routes>
              
              <Footer darkMode={darkMode} />
            </>
          )}
        </div>

        {/* Page Load Glitch Effect Overlay */}
        {showContent && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {/* Initial flash */}
            <div className="absolute inset-0 bg-white opacity-0 animate-ping" style={{ animationDuration: '1s' }}></div>
            
            {/* Scan lines fade out */}
            <div className="absolute inset-0 opacity-0 animate-fade-out" style={{ 
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(102, 217, 239, 0.1) 2px,
                rgba(102, 217, 239, 0.1) 4px
              )`,
              animationDuration: '2s'
            }}></div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;