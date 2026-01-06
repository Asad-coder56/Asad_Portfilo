// src/components/AutoScrollIndicator.jsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowsAltV, FaPause } from 'react-icons/fa';

const AutoScrollIndicator = ({ isAutoScrolling, toggleAutoScroll, darkMode }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoScrolling && isVisible) {
      interval = setInterval(() => {
        const sections = ['hero', 'skills', 'projects', 'education', 'contact'];
        const currentSection = sections.findIndex(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
          }
          return false;
        });
        
        const nextSection = (currentSection + 1) % sections.length;
        const element = document.getElementById(sections[nextSection]);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120000); // 2 minutes
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAutoScroll}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl ${
              darkMode 
                ? 'bg-gray-800/80 text-cyan-400 hover:bg-gray-800' 
                : 'bg-white/80 text-blue-600 hover:bg-white'
            } backdrop-blur-sm border border-gray-300 dark:border-gray-600`}
            title={isAutoScrolling ? "Auto-scroll enabled" : "Auto-scroll disabled"}
          >
            <motion.div
              animate={isAutoScrolling ? { rotate: 360 } : {}}
              transition={isAutoScrolling ? { duration: 10, repeat: Infinity, ease: "linear" } : {}}
            >
              {isAutoScrolling ? <FaArrowsAltV /> : <FaPause />}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AutoScrollIndicator;