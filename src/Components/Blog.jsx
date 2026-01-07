// src/components/Blog.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaArrowRight,
  FaSearch,
  FaFilter,
  FaTerminal,
  FaCode,
  FaFileCode,
  FaNewspaper,
  FaBolt,
  FaServer,
  FaDatabase,
  FaCloud,
  FaCog,
  FaRocket
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiDocker } from 'react-icons/si';

const Blog = ({ darkMode = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [binaryMatrix, setBinaryMatrix] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable MERN Applications",
      excerpt: "Learn how to architect and build scalable MERN stack applications with best practices and performance optimizations.",
      content: "Building scalable MERN applications requires careful consideration of architecture, database design, and performance optimization...",
      author: "Muhammad Asad Kamal Shah",
      date: "March 15, 2025",
      readTime: "8 min read",
      category: "Web Development",
      tags: ["MERN", "Scalability", "Performance", "Node.js"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "blue",
      icon: FaServer
    },
    {
      id: 2,
      title: "AI Integration in Web Applications",
      excerpt: "A comprehensive guide to integrating machine learning models into modern web applications.",
      content: "Integrating AI into web applications opens up new possibilities for user experience and functionality...",
      author: "Muhammad Asad Kamal Shah",
      date: "March 10, 2025",
      readTime: "10 min read",
      category: "AI/ML",
      tags: ["AI", "Machine Learning", "Python", "FastAPI"],
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "green",
      icon: FaCog
    },
    {
      id: 3,
      title: "Microservices Architecture with Node.js",
      excerpt: "Understanding microservices architecture and implementing it with Node.js and Docker.",
      content: "Microservices architecture allows for building scalable and maintainable applications...",
      author: "Muhammad Asad Kamal Shah",
      date: "March 5, 2025",
      readTime: "12 min read",
      category: "Backend",
      tags: ["Microservices", "Node.js", "Docker", "Architecture"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "purple",
      icon: FaCloud
    },
    {
      id: 4,
      title: "React Performance Optimization Techniques",
      excerpt: "Advanced techniques for optimizing React application performance and reducing bundle size.",
      content: "Optimizing React applications is crucial for providing smooth user experiences...",
      author: "Muhammad Asad Kamal Shah",
      date: "February 28, 2025",
      readTime: "6 min read",
      category: "Frontend",
      tags: ["React", "Performance", "Optimization", "JavaScript"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "orange",
      icon: FaBolt
    },
    {
      id: 5,
      title: "Real-time Applications with Socket.io",
      excerpt: "Building real-time features in web applications using Socket.io and React.",
      content: "Real-time features are becoming essential in modern web applications...",
      author: "Muhammad Asad Kamal Shah",
      date: "February 20, 2025",
      readTime: "7 min read",
      category: "Full Stack",
      tags: ["Socket.io", "Real-time", "WebSockets", "React"],
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "red",
      icon: FaRocket
    },
    {
      id: 6,
      title: "Database Optimization Strategies",
      excerpt: "Advanced strategies for optimizing database performance in production applications.",
      content: "Database performance is critical for application scalability and user experience...",
      author: "Muhammad Asad Kamal Shah",
      date: "February 15, 2025",
      readTime: "9 min read",
      category: "Database",
      tags: ["Database", "MongoDB", "Optimization", "Performance"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "blue",
      icon: FaDatabase
    }
  ];

  const categories = ['all', 'Web Development', 'AI/ML', 'Frontend', 'Backend', 'Full Stack', 'Database'];
  const tags = ['MERN', 'React', 'Node.js', 'AI', 'Performance', 'Scalability', 'Microservices'];

  const colorClasses = {
    blue: darkMode ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600',
    green: darkMode ? 'text-green-400 border-green-400' : 'text-green-600 border-green-600',
    purple: darkMode ? 'text-purple-400 border-purple-400' : 'text-purple-600 border-purple-600',
    orange: darkMode ? 'text-orange-400 border-orange-400' : 'text-orange-600 border-orange-600',
    red: darkMode ? 'text-red-400 border-red-400' : 'text-red-600 border-red-600'
  };

  const colorBGs = {
    blue: darkMode ? 'bg-blue-400/10' : 'bg-blue-500/10',
    green: darkMode ? 'bg-green-400/10' : 'bg-green-500/10',
    purple: darkMode ? 'bg-purple-400/10' : 'bg-purple-500/10',
    orange: darkMode ? 'bg-orange-400/10' : 'bg-orange-500/10',
    red: darkMode ? 'bg-red-400/10' : 'bg-red-500/10'
  };

  // Initialize binary matrix for Matrix-like effect
  useEffect(() => {
    const generateBinaryMatrix = () => {
      const matrix = [];
      for (let i = 0; i < 30; i++) {
        matrix.push({
          id: i,
          char: Math.random() > 0.5 ? '0' : '1',
          color: darkMode ? 'text-green-400' : 'text-blue-600',
          opacity: 0.05 + Math.random() * 0.1,
          speed: 5 + Math.random() * 5,
          left: `${Math.random() * 100}%`,
          delay: Math.random() * 5,
        });
      }
      return matrix;
    };
    
    setBinaryMatrix(generateBinaryMatrix());
    
    const interval = setInterval(() => {
      setBinaryMatrix(prev => prev.map(item => ({
        ...item,
        char: Math.random() > 0.5 ? '0' : '1',
      })));
    }, 200);

    // Generate floating elements
    const floatingElements = [
      { icon: FaCode, color: darkMode ? 'text-blue-400' : 'text-blue-600', delay: '0s', top: '15%', left: '5%' },
      { icon: FaFileCode, color: darkMode ? 'text-green-400' : 'text-green-600', delay: '0.3s', top: '25%', right: '8%' },
      { icon: FaTerminal, color: darkMode ? 'text-purple-400' : 'text-purple-600', delay: '0.6s', bottom: '35%', left: '10%' },
      { icon: FaNewspaper, color: darkMode ? 'text-orange-400' : 'text-orange-600', delay: '0.9s', bottom: '25%', right: '12%' },
    ];
    setFloatingElements(floatingElements);

    // Show terminal after delay
    setTimeout(() => setShowTerminal(true), 300);
    
    return () => clearInterval(interval);
  }, [darkMode]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || post.category === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <section 
      className="pt-24 pb-20 min-h-screen relative overflow-hidden"
      style={{ 
        backgroundColor: darkMode ? '#0a0a0a' : '#000000',
        backgroundImage: darkMode 
          ? `radial-gradient(circle at 20% 30%, rgba(102, 217, 239, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`
          : `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
             radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)`
      }}
    >
      {/* Binary Matrix Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {binaryMatrix.map((binary) => (
          <motion.div
            key={binary.id}
            className={`absolute ${binary.color} text-xs font-mono opacity-50`}
            style={{ 
              left: binary.left,
              opacity: binary.opacity
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: '100vh',
              opacity: [0, binary.opacity, 0]
            }}
            transition={{
              y: {
                duration: binary.speed,
                repeat: Infinity,
                delay: binary.delay,
                ease: "linear"
              },
              opacity: {
                duration: binary.speed / 2,
                repeat: Infinity,
                delay: binary.delay,
                ease: "linear"
              }
            }}
          >
            {binary.char}
          </motion.div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: darkMode
            ? `linear-gradient(to right, rgba(102, 217, 239, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(102, 217, 239, 0.05) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 70%)',
        }}
      ></div>

      {/* Animated Code Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-px ${
              darkMode 
                ? 'bg-gradient-to-r from-transparent via-blue-400 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'
            }`}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '100vw',
              opacity: [0, 0.2, 0]
            }}
            transition={{
              x: {
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              },
              opacity: {
                duration: 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }
            }}
            style={{
              top: `${Math.random() * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-10`}
            style={{
              top: element.top,
              left: element.left,
              right: element.right,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: parseFloat(element.delay),
              ease: "linear"
            }}
          >
            <Icon className="text-2xl sm:text-3xl" />
          </motion.div>
        );
      })}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800 mb-6"
            >
              <FaTerminal className={darkMode ? 'text-blue-400' : 'text-blue-500'} />
              <span className={`font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Press <span className="px-1 py-0.5 bg-gray-900 rounded text-white">⌘</span> + <span className="px-1 py-0.5 bg-gray-900 rounded text-white">B</span> for blog
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="block">
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Developer</span>
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <FaCode className={`inline text-3xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                </motion.span>
              </span>
              <span className={`block ${darkMode ? 'text-purple-400' : 'text-purple-600'} mt-2`}>
                Blog
              </span>
            </h1>

            <div className="h-12 flex items-center justify-center">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-800">
                <FaTerminal className={`text-xl ${darkMode ? 'text-green-400 animate-pulse' : 'text-green-500 animate-pulse'}`} />
                <span className="text-lg font-mono">
                  <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>$</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-900'}> cd ./blog --articles={blogPosts.length}</span>
                  <span className={`inline-block w-2 h-6 ml-1 ${darkMode ? 'bg-green-400' : 'bg-green-500'} opacity-100 transition-opacity`}></span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Terminal */}
        <motion.div 
          className={`terminal-window max-w-4xl mx-auto mb-8 ${showTerminal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-700`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="terminal-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <motion.div 
                  className="terminal-dot red"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="terminal-dot yellow"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                ></motion.div>
                <motion.div 
                  className="terminal-dot green"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                ></motion.div>
                <div className={`ml-3 text-xs sm:text-sm font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    blog_search
                  </motion.span>
                  <span className="mx-2">—</span>
                  <span className={darkMode ? 'text-green-400' : 'text-green-500'}>filter</span>
                  <span className="mx-2">—</span>
                  <span>80×24</span>
                </div>
              </div>
              <div className={`text-xs font-mono ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                <FaTerminal className="inline mr-1" />
                v1.0
              </div>
            </div>
          </div>
          
          <div className="terminal-body p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FaSearch className={darkMode ? 'text-blue-400' : 'text-blue-500'} />
                  <span className={`font-mono text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>$ search_articles</span>
                </div>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setActiveSearch(true)}
                    onBlur={() => setActiveSearch(false)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 font-mono text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FaFilter className={darkMode ? 'text-green-400' : 'text-green-500'} />
                  <span className={`font-mono text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>$ filter_category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter(category)}
                      className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all ${
                        filter === category 
                          ? 'bg-blue-500/20 border-blue-400 text-blue-400' 
                          : 'bg-black/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'
                      }`}
                    >
                      {category === 'all' ? '// all' : category}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <div className="font-mono text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCode className={darkMode ? 'text-purple-400' : 'text-purple-500'} />
                    <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                      <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>const</span>{' '}
                      <span className={darkMode ? 'text-green-400' : 'text-green-500'}>results</span>{' '}
                      <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>=</span>{' '}
                      <span className={darkMode ? 'text-white' : 'text-gray-900'}>blogPosts</span>
                      <span className={darkMode ? 'text-yellow-400' : 'text-yellow-500'}>.filter</span>
                      <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>(</span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                      <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>(</span>
                      <span className={darkMode ? 'text-green-400' : 'text-green-500'}>post</span>
                     <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>)</span>{' '}

                      <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>=></span>{' '}
                      <span className={darkMode ? 'text-yellow-400' : 'text-yellow-500'}>{'{'}</span>
                    </span>
                  </div>
                  <div className="ml-8">
                    <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                      <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>return</span>{' '}
                      <span className={darkMode ? 'text-green-400' : 'text-green-500'}>post</span>
                      <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>.title</span>
                      <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>.toLowerCase</span>
                      <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>()</span>
                    </span>
                  </div>
                  <div className="ml-8">
                    <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                      <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>.includes</span>
                      <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>(</span>
                      <span className={darkMode ? 'text-orange-400' : 'text-orange-500'}>'{searchTerm}'</span>
                      <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>)</span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className={darkMode ? 'text-yellow-400' : 'text-yellow-500'}>{'}'}</span>
                    <span className={darkMode ? 'text-purple-400' : 'text-purple-500'}>)</span>
                    <span className={darkMode ? 'text-white' : 'text-gray-900'}>;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <AnimatePresence>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {filteredPosts.map((post, index) => {
              const Icon = post.icon;
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-blue-400 transition-all duration-300 group relative"
                  whileHover={{ y: -5 }}
                >
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  {/* Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-mono border ${colorClasses[post.color]}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg ${colorBGs[post.color]} border border-gray-800 flex items-center justify-center`}>
                        <Icon className={`text-lg ${colorClasses[post.color].split(' ')[0]}`} />
                      </div>
                      <span className={`text-xs font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 font-mono">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaUser />
                        <span>Asad</span>
                      </div>
                    </div>

                    <h2 className={`text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors font-mono line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h2>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-black/50 border border-gray-800 text-gray-400 rounded-lg text-xs font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-mono ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        // {post.readTime}
                      </span>
                      <Link
                        to={`/blog/${post.id}`}
                        className={`flex items-center gap-2 ${colorClasses[post.color].split(' ')[0]} font-mono text-sm hover:underline`}
                      >
                        <span className={darkMode ? 'text-blue-400' : 'text-blue-500'}>$</span>
                        read_article() <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-4xl text-gray-600 mb-4 font-mono">{"{ }"}</div>
            <h3 className={`text-xl font-bold mb-2 font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              // No articles found
            </h3>
            <p className={`font-mono ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              $ try: search --term="{searchTerm}"
            </p>
          </motion.div>
        )}

        {/* Popular Tags Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                  <div className={`ml-3 text-xs sm:text-sm font-mono ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    tags — filter — 80×24
                  </div>
                </div>
              </div>
            </div>
            
            <div className="terminal-body p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaTag className={darkMode ? 'text-purple-400' : 'text-purple-500'} />
                <span className={`font-mono text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>$ popular_topics</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {tags.map(tag => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchTerm(tag)}
                    className="px-4 py-2 bg-black/50 border border-gray-800 text-gray-400 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-colors font-mono text-sm"
                  >
                    #{tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800 group hover:border-blue-400 transition-colors">
            <div className="text-3xl font-bold text-blue-400 mb-2 font-mono group-hover:scale-110 transition-transform">
              {blogPosts.length}
            </div>
            <div className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Articles
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800 group hover:border-green-400 transition-colors">
            <div className="text-3xl font-bold text-green-400 mb-2 font-mono group-hover:scale-110 transition-transform">
              {categories.length - 1}
            </div>
            <div className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Categories
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800 group hover:border-purple-400 transition-colors">
            <div className="text-3xl font-bold text-purple-400 mb-2 font-mono group-hover:scale-110 transition-transform">
              {tags.length}
            </div>
            <div className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Topics
            </div>
          </div>
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-800 group hover:border-orange-400 transition-colors">
            <div className="text-3xl font-bold text-orange-400 mb-2 font-mono group-hover:scale-110 transition-transform">
              15+
            </div>
            <div className={`text-sm font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Min Read Avg
            </div>
          </div>
        </motion.div>

        {/* Newsletter Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="terminal-window bg-gradient-to-r from-blue-500/10 via-green-500/10 to-purple-500/10 border-blue-400/20">
            <div className="terminal-header">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="terminal-dot blue"></div>
                  <div className="terminal-dot green"></div>
                  <div className="terminal-dot purple"></div>
                  <div className={`ml-3 text-xs sm:text-sm font-mono ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                    newsletter — subscribe — 80×24
                  </div>
                </div>
              </div>
            </div>
            
            <div className="terminal-body p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaNewspaper className={darkMode ? 'text-blue-400' : 'text-blue-500'} />
                <span className={`font-mono text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>$ subscribe_newsletter()</span>
              </div>
              <p className={`mb-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                // Get the latest articles, tutorials, and insights delivered to your inbox
              </p>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 font-mono text-sm"
                    />
                  </div>
                  <div className="relative">
                    <FaNewspaper className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-black/50 backdrop-blur-sm border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 font-mono text-sm"
                    />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black/50 backdrop-blur-sm border border-gray-800 text-white py-3 rounded-lg font-mono hover:border-blue-400 hover:text-blue-400 transition-colors"
                >
                  $ npm run subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .terminal-window {
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          background: ${darkMode 
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(0, 0, 0, 0.9))'
            : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(30, 41, 59, 0.9))'};
        }

        .terminal-header {
          background: rgba(0, 0, 0, 0.5);
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .terminal-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          margin-right: 0.5rem;
          display: inline-block;
        }

        .terminal-dot.red {
          background: linear-gradient(135deg, #ff5f56, #ff2b2b);
          box-shadow: 0 0 10px rgba(255, 95, 86, 0.5);
        }

        .terminal-dot.yellow {
          background: linear-gradient(135deg, #ffbd2e, #ff9500);
          box-shadow: 0 0 10px rgba(255, 189, 46, 0.5);
        }

        .terminal-dot.green {
          background: linear-gradient(135deg, #27c93f, #00c700);
          box-shadow: 0 0 10px rgba(39, 201, 63, 0.5);
        }

        .terminal-dot.blue {
          background: linear-gradient(135deg, #61DAFB, #007acc);
          box-shadow: 0 0 10px rgba(97, 218, 251, 0.5);
        }

        .terminal-dot.purple {
          background: linear-gradient(135deg, #764ABC, #9b4dff);
          box-shadow: 0 0 10px rgba(118, 74, 188, 0.5);
        }

        .terminal-body {
          font-family: 'Fira Code', 'Consolas', monospace;
          background: transparent;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Blog;