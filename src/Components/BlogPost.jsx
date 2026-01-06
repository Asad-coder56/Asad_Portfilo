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

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
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
      }
    ];

    const foundPost = mockPosts.find(p => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
      
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
            <div className="rounded-xl overflow-hidden mb-12 h-64 md:h-96 border border-developer">
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