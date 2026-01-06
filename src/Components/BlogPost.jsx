// src/components/BlogPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaArrowLeft,
  FaClock,
  FaShareAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaBookmark,
  FaTerminal,
  FaCode,
  FaFileAlt,
  FaFolder
} from 'react-icons/fa';

// Move mockPosts outside the component so it's accessible
const mockPosts = [
  {
    id: 1,
    title: "Building Scalable MERN Applications",
    excerpt: "Learn how to architect and build scalable MERN stack applications with best practices and performance optimizations.",
    content: `
      <div class="font-mono-developer text-developer-secondary">
        <div class="text-syntax-blue mb-4">// Introduction to Scalable MERN Applications</div>
        <p class="mb-4">Building scalable MERN applications requires careful consideration of architecture, database design, and performance optimization. In this comprehensive guide, we'll explore the key principles and practices that ensure your application can grow with your user base.</p>
        
        <div class="text-syntax-green mb-2 mt-6">$ Architecture Considerations</div>
        <p class="mb-4">When designing a scalable MERN application, consider the following architecture patterns:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Microservices vs Monolithic architecture</div>
          <div class="text-terminal">→ API Gateway implementation</div>
          <div class="text-terminal">→ Load balancing strategies</div>
          <div class="text-terminal">→ Database sharding and replication</div>
        </div>
        
        <div class="text-syntax-purple mb-2 mt-6">$ Performance Optimization</div>
        <p class="mb-4">Optimizing performance is crucial for scalability. Key areas to focus on include:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Caching strategies with Redis</div>
          <div class="text-terminal">→ Database indexing and query optimization</div>
          <div class="text-terminal">→ Code splitting and lazy loading in React</div>
          <div class="text-terminal">→ CDN implementation for static assets</div>
        </div>
        
        <div class="text-syntax-orange mb-2 mt-6">$ Database Design</div>
        <p class="mb-4">Proper database design is essential for scalability:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Schema design for MongoDB</div>
          <div class="text-terminal">→ Index optimization</div>
          <div class="text-terminal">→ Connection pooling</div>
          <div class="text-terminal">→ Database migration strategies</div>
        </div>
        
        <div class="text-syntax-blue mb-2 mt-6">// Conclusion</div>
        <p>Building scalable applications is an ongoing process that requires monitoring, testing, and continuous improvement. By following these best practices, you can ensure your MERN application is prepared for growth.</p>
      </div>
    `,
    author: "Muhammad Asad Kamal Shah",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Web Development",
    tags: ["MERN", "Scalability", "Performance", "Node.js", "React", "MongoDB"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    color: "blue"
  },
  {
    id: 2,
    title: "AI Integration in Web Applications",
    excerpt: "A comprehensive guide to integrating machine learning models into modern web applications.",
    content: `
      <div class="font-mono-developer text-developer-secondary">
        <div class="text-syntax-blue mb-4">// Introduction to AI Integration</div>
        <p class="mb-4">Integrating AI into web applications opens up new possibilities for user experience and functionality. In this guide, we'll explore various approaches to seamlessly incorporate machine learning models into your web projects.</p>
        
        <div class="text-syntax-green mb-2 mt-6">$ AI Integration Approaches</div>
        <p class="mb-4">There are several ways to integrate AI into web applications:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ API-based integration (REST/GraphQL)</div>
          <div class="text-terminal">→ Client-side ML with TensorFlow.js</div>
          <div class="text-terminal">→ Server-side inference with FastAPI</div>
          <div class="text-terminal">→ Real-time predictions with WebSockets</div>
        </div>
        
        <div class="text-syntax-purple mb-2 mt-6">$ Popular ML Frameworks</div>
        <p class="mb-4">Choose the right framework for your needs:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ TensorFlow/PyTorch for deep learning</div>
          <div class="text-terminal">→ Scikit-learn for traditional ML</div>
          <div class="text-terminal">→ Hugging Face for NLP tasks</div>
          <div class="text-terminal">→ OpenCV for computer vision</div>
        </div>
        
        <div class="text-syntax-blue mb-2 mt-6">// Best Practices</div>
        <p>When integrating AI into web applications, consider model optimization, security, and user privacy as key factors for success.</p>
      </div>
    `,
    author: "Muhammad Asad Kamal Shah",
    date: "March 10, 2025",
    readTime: "10 min read",
    category: "AI/ML",
    tags: ["AI", "Machine Learning", "Python", "FastAPI", "TensorFlow", "Web AI"],
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    color: "green"
  },
  {
    id: 3,
    title: "Microservices Architecture with Node.js",
    excerpt: "Understanding microservices architecture and implementing it with Node.js and Docker.",
    content: `
      <div class="font-mono-developer text-developer-secondary">
        <div class="text-syntax-blue mb-4">// Introduction to Microservices</div>
        <p class="mb-4">Microservices architecture allows for building scalable and maintainable applications by breaking them down into small, independent services. This guide focuses on implementing microservices with Node.js.</p>
        
        <div class="text-syntax-green mb-2 mt-6">$ Key Microservices Patterns</div>
        <p class="mb-4">Essential patterns for microservices architecture:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ API Gateway pattern</div>
          <div class="text-terminal">→ Service discovery</div>
          <div class="text-terminal">→ Circuit breaker pattern</div>
          <div class="text-terminal">→ Event-driven architecture</div>
        </div>
        
        <div class="text-syntax-purple mb-2 mt-6">$ Node.js Microservices Tools</div>
        <p class="mb-4">Popular tools for Node.js microservices:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Express.js for REST APIs</div>
          <div class="text-terminal">→ Socket.io for real-time</div>
          <div class="text-terminal">→ RabbitMQ for message queue</div>
          <div class="text-terminal">→ Docker for containerization</div>
        </div>
        
        <div class="text-syntax-blue mb-2 mt-6">// Conclusion</div>
        <p>Microservices architecture, when implemented correctly, can greatly improve the scalability and maintainability of your applications.</p>
      </div>
    `,
    author: "Muhammad Asad Kamal Shah",
    date: "March 5, 2025",
    readTime: "12 min read",
    category: "Backend",
    tags: ["Microservices", "Node.js", "Docker", "Architecture", "API", "Scalability"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    color: "purple"
  },
  {
    id: 4,
    title: "React Performance Optimization Techniques",
    excerpt: "Advanced techniques for optimizing React application performance and reducing bundle size.",
    content: `
      <div class="font-mono-developer text-developer-secondary">
        <div class="text-syntax-blue mb-4">// Introduction to React Performance</div>
        <p class="mb-4">Optimizing React applications is crucial for providing smooth user experiences. This guide covers advanced techniques for performance optimization.</p>
        
        <div class="text-syntax-green mb-2 mt-6">$ Code Splitting Strategies</div>
        <p class="mb-4">Effective code splitting techniques:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Route-based code splitting</div>
          <div class="text-terminal">→ Component lazy loading</div>
          <div class="text-terminal">→ Dynamic imports</div>
          <div class="text-terminal">→ Bundle analysis tools</div>
        </div>
        
        <div class="text-syntax-purple mb-2 mt-6">$ Rendering Optimizations</div>
        <p class="mb-4">Optimize React rendering performance:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Memoization with React.memo</div>
          <div class="text-terminal">→ useCallback and useMemo hooks</div>
          <div class="text-terminal">→ Virtual DOM optimization</div>
          <div class="text-terminal">→ Profiler API usage</div>
        </div>
        
        <div class="text-syntax-blue mb-2 mt-6">// Conclusion</div>
        <p>By implementing these optimization techniques, you can significantly improve your React application's performance.</p>
      </div>
    `,
    author: "Muhammad Asad Kamal Shah",
    date: "February 28, 2025",
    readTime: "6 min read",
    category: "Frontend",
    tags: ["React", "Performance", "Optimization", "JavaScript", "Webpack", "Bundle"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    color: "orange"
  },
  {
    id: 5,
    title: "Real-time Applications with Socket.io",
    excerpt: "Building real-time features in web applications using Socket.io and React.",
    content: `
      <div class="font-mono-developer text-developer-secondary">
        <div class="text-syntax-blue mb-4">// Introduction to Real-time Web</div>
        <p class="mb-4">Real-time features are becoming essential in modern web applications. This guide covers building real-time applications with Socket.io and React.</p>
        
        <div class="text-syntax-green mb-2 mt-6">$ Socket.io Core Concepts</div>
        <p class="mb-4">Key concepts for Socket.io development:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Event-driven communication</div>
          <div class="text-terminal">→ Rooms and namespaces</div>
          <div class="text-terminal">→ Middleware implementation</div>
          <div class="text-terminal">→ Error handling strategies</div>
        </div>
        
        <div class="text-syntax-purple mb-2 mt-6">$ Real-time Use Cases</div>
        <p class="mb-4">Common real-time application patterns:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Live chat applications</div>
          <div class="text-terminal">→ Collaborative editing</div>
          <div class="text-terminal">→ Live notifications</div>
          <div class="text-terminal">→ Real-time dashboards</div>
        </div>
        
        <div class="text-syntax-blue mb-2 mt-6">// Conclusion</div>
        <p>Socket.io provides powerful tools for building engaging real-time web applications.</p>
      </div>
    `,
    author: "Muhammad Asad Kamal Shah",
    date: "February 20, 2025",
    readTime: "7 min read",
    category: "Full Stack",
    tags: ["Socket.io", "Real-time", "WebSockets", "React", "Node.js", "Chat"],
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    color: "red"
  },
  {
    id: 6,
    title: "Database Optimization Strategies",
    excerpt: "Advanced strategies for optimizing database performance in production applications.",
    content: `
      <div class="font-mono-developer text-developer-secondary">
        <div class="text-syntax-blue mb-4">// Introduction to Database Optimization</div>
        <p class="mb-4">Database performance is critical for application scalability and user experience. This guide covers advanced optimization strategies.</p>
        
        <div class="text-syntax-green mb-2 mt-6">$ Query Optimization Techniques</div>
        <p class="mb-4">Optimize database queries for better performance:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Index optimization strategies</div>
          <div class="text-terminal">→ Query execution plan analysis</div>
          <div class="text-terminal">→ Connection pooling</div>
          <div class="text-terminal">→ Caching mechanisms</div>
        </div>
        
        <div class="text-syntax-purple mb-2 mt-6">$ Database Scaling</div>
        <p class="mb-4">Strategies for database scaling:</p>
        <div class="bg-developer-secondary border border-developer rounded-xl p-4 mb-4">
          <div class="text-terminal">→ Vertical vs horizontal scaling</div>
          <div class="text-terminal">→ Read replicas implementation</div>
          <div class="text-terminal">→ Database sharding</div>
          <div class="text-terminal">→ Partitioning strategies</div>
        </div>
        
        <div class="text-syntax-blue mb-2 mt-6">// Conclusion</div>
        <p>Proper database optimization is essential for building scalable, high-performance applications.</p>
      </div>
    `,
    author: "Muhammad Asad Kamal Shah",
    date: "February 15, 2025",
    readTime: "9 min read",
    category: "Database",
    tags: ["Database", "MongoDB", "Optimization", "Performance", "Scaling", "SQL"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    color: "blue"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const foundPost = mockPosts.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
      
      // Get related posts (same category but different ID)
      const related = mockPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank');
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-terminal">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-syntax-blue mx-auto mb-4"></div>
          <p className="text-developer-secondary font-mono-developer">$ loading_article()</p>
        </div>
      </div>
    );
  }

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

  return (
    <section className="pt-24 pb-20 bg-terminal">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="animate-fadeIn"
        >
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-syntax-blue hover:text-terminal transition-colors font-mono-developer"
            >
              <FaArrowLeft /> $ cd ..
            </Link>
          </div>

          {/* Terminal Header */}
          <div className="terminal-window mb-8">
            <div className="terminal-header">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
              <div className="ml-4 text-sm text-developer-tertiary font-mono-developer">
                blog — {post.title.toLowerCase().replace(/\s+/g, '-')}
              </div>
            </div>
            <div className="terminal-body">
              <div className="font-mono-developer text-sm">
                <div className="text-syntax-green">$ article --view --id={id}</div>
                <div className="text-terminal mt-2">Title: <span className="text-syntax-blue">{post.title}</span></div>
                <div className="text-terminal">Category: <span className="text-syntax-purple">{post.category}</span></div>
                <div className="text-terminal">Author: <span className="text-syntax-green">{post.author.split(' ')[0]}</span></div>
              </div>
            </div>
          </div>

          {/* Article Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className={`inline-block px-4 py-1.5 rounded-lg text-sm font-mono-developer border mb-4 ${colorClasses[post.color]}`}>
                  {post.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-terminal mb-6 font-mono-developer">
                  {post.title}
                </h1>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-3 rounded-lg border ${bookmarked ? colorClasses[post.color] : 'border-developer text-developer-secondary'} hover:border-syntax-blue transition-all font-mono-developer`}
                  title={bookmarked ? "Remove bookmark" : "Bookmark article"}
                >
                  <FaBookmark />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-3 rounded-lg border border-developer text-developer-secondary hover:border-syntax-blue hover:text-terminal transition-colors font-mono-developer"
                  title="Share on Twitter"
                >
                  <FaTwitter />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-developer-secondary font-mono-developer">
              <div className="flex items-center gap-2">
                <FaUser className={colorClasses[post.color].split(' ')[0]} />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className={colorClasses[post.color].split(' ')[0]} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className={colorClasses[post.color].split(' ')[0]} />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden mb-12 h-64 md:h-96 border border-developer relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-developer-secondary to-transparent"></div>
            </div>
          </div>

          {/* Article Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-developer-secondary rounded-xl p-6 md:p-8 border border-developer mb-8">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-developer">
                <h3 className="text-xl font-bold text-terminal mb-4 flex items-center gap-2 font-mono-developer">
                  <FaTag /> // Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-terminal border border-developer text-developer-secondary rounded-lg hover:border-syntax-blue hover:text-terminal transition-colors font-mono-developer text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-developer">
                <h3 className="text-xl font-bold text-terminal mb-4 flex items-center gap-2 font-mono-developer">
                  <FaShareAlt /> // Share this article
                </h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="px-6 py-3 bg-terminal border border-developer text-terminal rounded-lg hover:border-syntax-blue hover:text-syntax-blue transition-colors font-mono-developer"
                  >
                    <FaTwitter /> share_twitter()
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="px-6 py-3 bg-terminal border border-developer text-terminal rounded-lg hover:border-syntax-green hover:text-syntax-green transition-colors font-mono-developer"
                  >
                    <FaLinkedin /> share_linkedin()
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="px-6 py-3 bg-terminal border border-developer text-terminal rounded-lg hover:border-syntax-purple hover:text-syntax-purple transition-colors font-mono-developer"
                  >
                    <FaFacebook /> share_facebook()
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Author Card */}
                <div className="bg-developer-secondary rounded-xl p-6 border border-developer">
                  <h3 className="text-xl font-bold text-terminal mb-4 font-mono-developer">
                    // About the Author
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-syntax-blue to-syntax-green flex items-center justify-center text-terminal text-2xl font-bold">
                      AS
                    </div>
                    <div>
                      <h4 className="font-bold text-terminal font-mono-developer">Muhammad Asad Kamal Shah</h4>
                      <p className="text-developer-secondary text-sm font-mono-developer">Full Stack Developer & AI Engineer</p>
                    </div>
                  </div>
                  <p className="text-developer-secondary text-sm mb-4 font-mono-developer">
                    Passionate about building scalable web applications and integrating AI solutions. 
                    Over 3 years of experience in MERN stack development.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block w-full text-center bg-terminal border border-developer text-terminal py-2 rounded-lg font-mono-developer hover:border-syntax-blue hover:text-syntax-blue transition-colors"
                  >
                    $ contact_author()
                  </Link>
                </div>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="bg-developer-secondary rounded-xl p-6 border border-developer">
                    <h3 className="text-xl font-bold text-terminal mb-4 font-mono-developer">
                      // Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map(relatedPost => (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.id}`}
                          className="block p-4 rounded-lg border border-developer hover:border-syntax-blue transition-colors bg-terminal"
                        >
                          <h4 className="font-medium text-terminal mb-2 line-clamp-2 font-mono-developer text-sm">
                            {relatedPost.title}
                          </h4>
                          <div className="flex items-center justify-between text-sm text-developer-secondary font-mono-developer">
                            <span>{relatedPost.date}</span>
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter */}
                <div className={`${colorBGs[post.color]} rounded-xl p-6 border ${colorClasses[post.color]}`}>
                  <h3 className="text-xl font-bold text-terminal mb-4 font-mono-developer">
                    // Stay Updated
                  </h3>
                  <p className="text-developer-secondary text-sm mb-4 font-mono-developer">
                    Get the latest articles and tutorials delivered to your inbox.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 rounded-lg border border-developer bg-terminal text-terminal placeholder-developer-tertiary focus:outline-none focus:border-syntax-blue font-mono-developer text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full bg-terminal border border-developer text-terminal py-2 rounded-lg font-mono-developer hover:border-syntax-green hover:text-syntax-green transition-colors"
                    >
                      $ subscribe()
                    </button>
                  </form>
                </div>

                {/* Table of Contents */}
                <div className="bg-developer-secondary rounded-xl p-6 border border-developer">
                  <h3 className="text-xl font-bold text-terminal mb-4 flex items-center gap-2 font-mono-developer">
                    <FaFolder /> // Table of Contents
                  </h3>
                  <div className="space-y-2">
                    {['Introduction', 'Architecture', 'Performance', 'Database', 'Conclusion'].map((item, index) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="block text-developer-secondary hover:text-terminal transition-colors font-mono-developer text-sm py-2 border-b border-developer last:border-b-0"
                      >
                        <span className="text-syntax-blue">[{index + 1}]</span> {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPost;