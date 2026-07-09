import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
          return 100;
        }
        return prev + step * (1 - prev / 120);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050810] overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* Deep Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, rotateZ: 0 }}
              animate={{ opacity: 0.2, rotateZ: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/30 to-indigo-600/30 rounded-full blur-[100px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">

            {/* 3D Gyroscope Setup */}
            <div className="mb-14 relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>

              {/* Outer 3D Ring 1 */}
              <motion.div
                animate={{ rotateX: 360, rotateY: 180, rotateZ: 90 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute w-36 h-36 rounded-full border border-cyan-400/20"
                style={{ transformStyle: 'preserve-3d', borderTopColor: 'rgba(103, 232, 249, 0.8)', boxShadow: '0 0 20px rgba(103,232,249,0.1) inset' }}
              />

              {/* Outer 3D Ring 2 */}
              <motion.div
                animate={{ rotateX: -180, rotateY: 360, rotateZ: -90 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute w-28 h-28 rounded-full border border-indigo-400/20"
                style={{ transformStyle: 'preserve-3d', borderRightColor: 'rgba(99, 102, 241, 0.8)', boxShadow: '0 0 20px rgba(99,102,241,0.1) inset' }}
              />

              {/* Core 3D Floating Block */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, y: [-4, 4, -4] }}
                transition={{
                  scale: { duration: 0.8, ease: "easeOut" },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-black border border-white/20 shadow-[0_0_50px_rgba(103,232,249,0.3)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 mix-blend-overlay" />
                <span className="text-xl font-black tracking-tighter text-white z-10 drop-shadow-[0_0_10px_rgba(103,232,249,0.8)]">
                  A<span className="text-cyan-400">K</span>
                </span>
              </motion.div>
            </div>

            {/* Typography */}
            <div className="flex flex-col items-center mb-10 overflow-hidden text-center z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="tracking-[0.5em] text-[12px] text-cyan-400 uppercase font-mono font-bold mb-2 drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]"
              >
                Asad Kamal
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="tracking-[0.2em] text-[10px] text-white/50 font-mono uppercase"
              >
                Initializing Workspace
              </motion.div>
            </div>

            {/* Progress Container */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full z-10"
            >
              <div className="flex justify-between items-end mb-4 font-mono">
                <span className="text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                  System Status
                </span>
                <span className="text-[12px] text-white font-bold tabular-nums drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* 3D Glassy Progress Bar */}
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full"
                  style={{ boxShadow: '0 0 20px rgba(103,232,249,0.8)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;