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

    // Load mock projects
    const mockProjects = [
      {
        id: 1,
        title: "CueMetrics",
        subtitle: "Sports & Tournament Management Platform",
        period: "2024",
        description: "Full-stack sports management platform designed to streamline cue sports club operations.",
        fullDescription: "CueMetrics is a full-stack sports management platform designed to streamline cue sports club operations, including League Management, Tournament Management, Table Bookings, Player Rankings, and Club Management. Built with React.js, Node.js, Express.js, and MySQL. Features role-based dashboards, JWT Authentication, Real-time Notifications, and Automated Tournament Management.",
        tech: ["React.js", "Node.js", "Express.js", "MySQL", "Sequelize ORM", "JWT"],
        features: [
          "Role-based dashboards (Super Admin, Organizations, Players, Venue Owners)",
          "JWT Authentication",
          "Real-time Notifications",
          "Email Integration",
          "Automated Tournament Management",
          "League Management"
        ],
        github: "https://github.com/Asad-coder56",
        liveDemo: "https://testcuemetrics.mradevelopers.com/",
        images: ["/api/placeholder/800/400"],
        status: "Completed",
        category: "Full Stack",
        color: "blue"
      },
      {
        id: 2,
        title: "TrueNorth",
        subtitle: "Debt Recovery & Settlement Platform",
        period: "2024",
        description: "Financial technology platform designed to simplify Debt Recovery, Settlement Negotiations, and Payment Processing.",
        fullDescription: "TrueNorth is a financial technology platform that simplifies debt recovery and payment processing. Includes an Operations Dashboard, Outreach Campaign Management, and a Client Portal to view balance and make payments. Features Authorize.net Payment Integration and Webhook Synchronization.",
        tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Sequelize ORM", "Authorize.net", "JWT"],
        features: [
          "Role-based Authentication",
          "Authorize.net Payment Integration",
          "Webhook Synchronization",
          "Email Notifications",
          "Client Portal (Account Balance, Settle, Partial/Full Payments)",
          "Responsive UI"
        ],
        github: "https://github.com/Asad-coder56",
        liveDemo: "https://trunorthlegal.com/",
        images: ["/api/placeholder/800/400"],
        status: "Completed",
        category: "Full Stack",
        color: "green"
      },
      {
        id: 3,
        title: "EliteSnooker",
        subtitle: "Snooker Club & Tournament Management Platform",
        period: "2024",
        description: "Sports management platform for Snooker Clubs, Tournament, League, and Venue Management.",
        fullDescription: "EliteSnooker is a comprehensive sports management platform for snooker clubs. It includes features like Knockout/Round Robin Brackets, League Management across multiple seasons and divisions, online table booking, and automated player rankings. Real-time updates and secure authentication are built-in.",
        tech: ["React.js", "Node.js", "Express.js", "MySQL", "Sequelize ORM", "JWT", "Tailwind CSS"],
        features: [
          "Knockout Brackets & Round Robin Brackets",
          "League Management (Multiple Seasons/Divisions)",
          "Online Table Booking",
          "Automated Player Rankings",
          "Match Scoring (Frame-by-frame Results, Highest Break Tracking)",
          "Role-based dashboards (Administrators, Venue Owners, Players)"
        ],
        github: "https://github.com/Asad-coder56",
        liveDemo: "https://berrowandhighbridgesnookerleague.co.uk/",
        images: ["/api/placeholder/800/400"],
        status: "Completed",
        category: "Full Stack",
        color: "purple"
      }
    ];

    setProjects(mockProjects);

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