// src/components/Blog.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  FaNewspaper
} from 'react-icons/fa';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

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
      color: "blue"
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
      color: "green"
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
      color: "purple"
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
      color: "orange"
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
      color: "red"
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
      color: "blue"
    }
  ];

  const categories = ['all', 'Web Development', 'AI/ML', 'Frontend', 'Backend', 'Full Stack', 'Database'];
  const tags = ['MERN', 'React', 'Node.js', 'AI', 'Performance', 'Scalability', 'Microservices'];

  const colorClasses = {
    blue: 'text-syntax-blue border-syntax-blue',
    green: 'text-syntax-green border-syntax-green',
    purple: 'text-syntax-purple border-syntax-purple',
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

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || post.category === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="pt-24 pb-20 min-h-screen bg-terminal">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-developer-secondary text-syntax-blue text-sm font-mono-developer mb-4 border border-developer">
              $ cd ./blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-terminal mb-6 font-mono-developer">
              <span className="text-syntax-blue">class</span>{' '}
              <span className="text-syntax-green">Blog</span>{' '}
              <span className="text-syntax-blue">{'{'}</span>
            </h1>
            <p className="text-lg text-developer-secondary max-w-3xl mx-auto font-mono-developer">
              // Insights, tutorials, and thoughts on web development, AI integration, and software engineering
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-developer-secondary" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-developer bg-developer-secondary text-terminal placeholder-developer-tertiary focus:outline-none focus:border-syntax-blue font-mono-developer"
                />
              </div>
              <div className="flex items-center gap-2">
                <FaFilter className="text-developer-secondary" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-developer bg-developer-secondary text-terminal focus:outline-none focus:border-syntax-blue font-mono-developer"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-developer-secondary">
                      {category === 'all' ? '// all' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-developer-secondary rounded-xl overflow-hidden border border-developer hover:border-syntax-blue transition-all duration-300 group card-developer"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-lg text-sm font-mono-developer border ${colorClasses[post.color]}`}>
                    {post.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-developer-secondary to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-developer-secondary mb-4 font-mono-developer">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser />
                    <span>{post.author.split(' ')[0]}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-terminal mb-3 group-hover:text-syntax-blue transition-colors font-mono-developer line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-developer-secondary mb-4 text-sm">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-terminal border border-developer text-developer-secondary rounded-lg text-xs font-mono-developer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-developer-secondary text-sm font-mono-developer">
                    {post.readTime}
                  </span>
                  <Link
                    to={`/blog/${post.id}`}
                    className={`flex items-center gap-2 ${colorClasses[post.color].split(' ')[0]} font-mono-developer text-sm hover:underline`}
                  >
                    $ read_more() <FaArrowRight />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="text-4xl text-developer-tertiary mb-4 font-mono-developer">{"{ }"}</div>
            <h3 className="text-xl font-bold text-developer-secondary mb-2 font-mono-developer">
              // No articles found
            </h3>
            <p className="text-developer-secondary font-mono-developer">
              $ try: search --term="{searchTerm}"
            </p>
          </div>
        )}

        {/* Popular Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-developer-secondary rounded-xl p-8 border border-developer">
            <h3 className="text-xl font-bold text-terminal mb-6 flex items-center gap-2 font-mono-developer">
              <FaTag /> // Popular Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-4 py-2 bg-terminal border border-developer text-developer-secondary rounded-lg hover:border-syntax-blue hover:text-terminal transition-colors font-mono-developer text-sm"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer">
            <div className="text-3xl font-bold text-syntax-blue mb-2 font-mono-developer">
              {blogPosts.length}
            </div>
            <div className="text-developer-secondary font-mono-developer text-sm">
              Articles
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer">
            <div className="text-3xl font-bold text-syntax-green mb-2 font-mono-developer">
              5
            </div>
            <div className="text-developer-secondary font-mono-developer text-sm">
              Categories
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer">
            <div className="text-3xl font-bold text-syntax-purple mb-2 font-mono-developer">
              {tags.length}
            </div>
            <div className="text-developer-secondary font-mono-developer text-sm">
              Topics
            </div>
          </div>
          <div className="bg-developer-secondary rounded-xl p-6 text-center border border-developer">
            <div className="text-3xl font-bold text-syntax-orange mb-2 font-mono-developer">
              15+
            </div>
            <div className="text-developer-secondary font-mono-developer text-sm">
              Min Read Avg
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;