// Updated LoadingScreen.jsx with breaking effect animation
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isBreaking, setIsBreaking] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [cracks, setCracks] = useState([]);
  const [shards, setShards] = useState([]);

  // Glitch phrases
  const glitchPhrases = [
    'SYSTEM ERROR',
    'MEMORY CORRUPTED',
    '404_LOADING_FAILED',
    'GLITCH_00A1',
    'BUFFER_OVERFLOW',
    'NULL_POINTER_EXCEPTION',
    'SECTOR_FAULT',
    'REBOOTING...',
  ];

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Trigger glitch effects at random intervals
  useEffect(() => {
    if (progress > 30 && progress < 80) {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          setShowGlitch(true);
          setGlitchText(glitchPhrases[Math.floor(Math.random() * glitchPhrases.length)]);
          
          // Add crack effect
          const newCrack = {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotation: Math.random() * 360,
            length: 20 + Math.random() * 60,
          };
          setCracks((prev) => [...prev.slice(-5), newCrack]);
          
          setTimeout(() => setShowGlitch(false), 100);
        }
      }, 300);
      
      return () => clearInterval(glitchInterval);
    }
  }, [progress]);

  // Trigger breaking effect when loading completes
  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsBreaking(true);
        
        // Generate shards for breaking effect
        const newShards = [];
        const shardCount = 50;
        
        for (let i = 0; i < shardCount; i++) {
          newShards.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotation: Math.random() * 360,
            delay: Math.random() * 0.5,
            color: Math.random() > 0.7 ? '#66d9ef' : 
                   Math.random() > 0.5 ? '#10b981' : 
                   Math.random() > 0.3 ? '#8b5cf6' : '#ffffff',
          });
        }
        setShards(newShards);
        
        // Call onComplete after animation
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1200);
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-terminal z-50 overflow-hidden"
        style={{
          background: isBreaking 
            ? 'linear-gradient(135deg, #000 0%, #0a0a0a 50%, #000 100%)'
            : 'radial-gradient(circle at center, #0a0a0a 0%, #000 100%)'
        }}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(102, 217, 239, 0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(102, 217, 239, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          ></div>
        </div>

        {/* Cracks */}
        {cracks.map((crack) => (
          <motion.div
            key={crack.id}
            className="absolute pointer-events-none"
            style={{
              left: `${crack.x}%`,
              top: `${crack.y}%`,
              transform: `rotate(${crack.rotation}deg)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="h-0.5 bg-gradient-to-r from-red-500/50 to-transparent"
              style={{ width: `${crack.length}px` }}
            />
          </motion.div>
        ))}

        {/* Breaking Shards */}
        {shards.map((shard) => (
          <motion.div
            key={shard.id}
            className="absolute pointer-events-none"
            style={{
              left: `${shard.x}%`,
              top: `${shard.y}%`,
              backgroundColor: shard.color,
              opacity: 0.3,
            }}
            initial={{
              rotate: shard.rotation,
              scale: 1,
              x: 0,
              y: 0,
            }}
            animate={{
              rotate: shard.rotation + 360,
              scale: 0,
              x: (Math.random() - 0.5) * 2000,
              y: (Math.random() - 0.5) * 2000,
            }}
            transition={{
              duration: 1,
              delay: shard.delay,
              ease: "backInOut",
            }}
          >
            <div className="w-4 h-4 rotate-45 bg-current"></div>
          </motion.div>
        ))}

        {/* Scan Lines Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: isBreaking ? 0.5 : 0.3,
            y: [0, 100, 0] 
          }}
          transition={{ 
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(102, 217, 239, 0.05) 2px,
                rgba(102, 217, 239, 0.05) 4px
              )
            `,
          }}
        ></motion.div>

        {/* Main Content Container */}
        <motion.div 
          className="text-center relative z-10"
          animate={isBreaking ? {
            scale: [1, 1.1, 0.9, 0],
            rotate: [0, 5, -5, 0, 360],
            opacity: [1, 1, 1, 0],
          } : {}}
          transition={{ 
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1]
          }}
        >
          {/* Glitch Text Overlay */}
          <AnimatePresence>
            {showGlitch && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -top-20 left-1/2 transform -translate-x-1/2 text-red-500 font-mono-developer font-bold text-sm"
              >
                <div className="relative">
                  <div className="text-red-500">{glitchText}</div>
                  <div className="absolute -top-1 -left-1 text-blue-500 opacity-50">{glitchText}</div>
                  <div className="absolute -top-2 -left-2 text-green-500 opacity-30">{glitchText}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Spinner */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            {/* Outer Rings */}
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-developer"
              animate={isBreaking ? {
                borderColor: ['#374151', '#ef4444', '#374151'],
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ 
                borderColor: {
                  duration: 0.5,
                  repeat: Infinity
                },
                scale: {
                  duration: 0.5,
                  repeat: Infinity
                }
              }}
            />
            
            {/* Animated Rings */}
            <motion.div 
              className="absolute inset-2 rounded-full border-4 border-transparent border-t-syntax-blue"
              animate={isBreaking ? {
                rotate: 360,
                borderTopColor: ['#66d9ef', '#ef4444', '#66d9ef'],
              } : {
                rotate: 360,
              }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                },
                borderTopColor: {
                  duration: 0.5,
                  repeat: Infinity
                }
              }}
            />
            
            <motion.div 
              className="absolute inset-4 rounded-full border-4 border-transparent border-b-syntax-green"
              animate={isBreaking ? {
                rotate: -360,
                borderBottomColor: ['#10b981', '#ef4444', '#10b981'],
              } : {
                rotate: -360,
              }}
              transition={{
                rotate: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                },
                borderBottomColor: {
                  duration: 0.5,
                  repeat: Infinity
                }
              }}
            />
            
            {/* Center Dot */}
            <motion.div 
              className="absolute inset-6 rounded-full bg-gradient-to-r from-syntax-blue to-syntax-green"
              animate={isBreaking ? {
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              } : {
                scale: [1, 1.2, 1],
              }}
              transition={{
                scale: {
                  duration: 0.8,
                  repeat: Infinity,
                },
                opacity: {
                  duration: 0.8,
                  repeat: Infinity,
                }
              }}
            />
          </div>
          
          {/* Text Content with Glitch Effect */}
          <div className="relative">
            <motion.div
              animate={showGlitch ? {
                x: [0, 5, -5, 0],
                color: ['#ffffff', '#66d9ef', '#ef4444', '#ffffff']
              } : {}}
              transition={{ duration: 0.1 }}
              className="animate-pulse"
            >
              <h2 className="text-2xl font-bold text-terminal mb-2 font-mono-developer relative">
                <span className="relative z-10">Muhammad Asad Kamal Shah</span>
                {showGlitch && (
                  <>
                    <span className="absolute top-0 left-0 text-red-500 opacity-50 blur-[1px]">
                      Muhammad Asad Kamal Shah
                    </span>
                    <span className="absolute top-0 left-0 text-blue-500 opacity-30 blur-[2px]">
                      Muhammad Asad Kamal Shah
                    </span>
                  </>
                )}
              </h2>
              <p className="text-developer-secondary font-mono-developer relative">
                <span className="relative z-10">// Initializing portfolio...</span>
                {showGlitch && (
                  <>
                    <span className="absolute top-0 left-0 text-red-500 opacity-50 blur-[1px]">
                      // {glitchText.toLowerCase()}...
                    </span>
                  </>
                )}
              </p>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 w-64 h-1 bg-developer rounded-full overflow-hidden mx-auto relative">
            {/* Progress Bar Background Glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-syntax-blue/20 to-syntax-green/20 rounded-full"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            />
            
            {/* Progress Bar Fill */}
            <motion.div 
              className="h-full bg-gradient-to-r from-syntax-blue to-syntax-green relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            >
              {/* Shimmer Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  x: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
            </motion.div>
            
            {/* Progress Percentage */}
            <motion.div 
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-xs text-developer-tertiary font-mono-developer"
              animate={isBreaking ? {
                color: ['#9ca3af', '#ef4444', '#9ca3af'],
                scale: [1, 1.2, 1],
              } : {}}
              transition={{
                color: {
                  duration: 0.5,
                  repeat: Infinity
                }
              }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          {/* Terminal Command */}
          <div className="mt-8 text-xs text-developer-tertiary font-mono-developer relative">
            <motion.div
              animate={showGlitch ? {
                x: [0, 2, -2, 0],
                opacity: [1, 0.7, 1],
              } : {}}
            >
              <span className="text-syntax-green">$</span>{' '}
              <span className="text-terminal">npm run dev</span>{' '}
              <span className="text-syntax-orange">--loading</span>
            </motion.div>
            
            {/* Compilation Status */}
            {progress > 50 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-green-500 text-[10px]"
              >
                <span className="text-syntax-green">✓</span>{' '}
                {progress < 80 ? 'Bundling modules...' : 'Finalizing build...'}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Full Screen Breaking Overlay */}
        {isBreaking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Flash Effect */}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Radial Gradient Effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0.5 }}
              animate={{ scale: 3 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.8) 70%)',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;