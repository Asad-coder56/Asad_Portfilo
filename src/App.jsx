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
import Testimonials from './Components/Testimonials.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import LoadingScreen from './Components/LoadingScreen.jsx';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode for developers
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    // Always start with dark mode for developer portfolio
    setDarkMode(true);
    document.documentElement.classList.add('dark');
    
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

    return () => clearTimeout(timer);
  }, []);

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
        {isLoading ? (
          <LoadingScreen />
        ) : (
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
                  />
                  <Skills setActiveSection={handleSectionChange} />
                  <Services setActiveSection={handleSectionChange} />
                  <Projects 
                    projects={projects} 
                    setActiveSection={handleSectionChange} 
                  />
                  <Testimonials />
                  <Education setActiveSection={handleSectionChange} />
                  <Contact setActiveSection={handleSectionChange} />
                </>
              } />
              <Route path="/projects/:id" element={<ProjectDetails projects={projects} />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={
                <Contact 
                  setActiveSection={handleSectionChange} 
                  isStandalone={true}
                />
              } />
            </Routes>
            
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;