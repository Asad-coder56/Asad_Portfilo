import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Hero from './Components/Hero.jsx';
import Skills from './Components/Skills.jsx';
import Projects from './Components/Projects.jsx';
import Education from './Components/Education.jsx';
import Contact from './Components/Contact.jsx';
import Footer from './Components/Footer.jsx';
import ProjectDetails from './Components/ProjectDetails.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import LoadingScreen from './Components/LoadingScreen.jsx';
import './App.css';

import { projectsData } from './data/projectsData.js';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = Math.random() * 12 + 6;
        return Math.min(prev + increment, 100);
      });
    }, 300);

    // Load full projects dataset
    setProjects(projectsData);

    // Complete loading after a minimum time
    const minLoadTime = 2500;
    const startTime = Date.now();

    const loadingTimer = setTimeout(() => {
      setLoadingProgress(100);
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, minLoadTime - (Date.now() - startTime));

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
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
      <div className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        {/* Loading Screen */}
        {isLoading && (
          <LoadingScreen
            onComplete={handleLoadingComplete}
            progress={loadingProgress}
          />
        )}

        {/* Main Content */}
        <div className={`transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
                <Route path="/projects" element={
                  <Projects
                    projects={projects}
                    isStandalone={true}
                    setActiveSection={handleSectionChange}
                    darkMode={darkMode}
                  />
                } />

                <Route path="/projects/:id" element={
                  <ProjectDetails
                    projects={projects}
                    darkMode={darkMode}
                  />
                } />

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
      </div>
    </Router>
  );
}

export default App;