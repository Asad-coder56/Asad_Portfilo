// Updated LoadingScreen.jsx to match theme
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-terminal z-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-developer"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-syntax-blue animate-spin"></div>
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-b-syntax-green animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
        
        <div className="animate-pulse">
          <h2 className="text-2xl font-bold text-terminal mb-2 font-mono-developer">
            Muhammad Asad Kamal Shah
          </h2>
          <p className="text-developer-secondary font-mono-developer">
            // Initializing portfolio...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 h-1 bg-developer rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-syntax-blue to-syntax-green loading-bar"></div>
        </div>

        <div className="mt-8 text-xs text-developer-tertiary font-mono-developer">
          $ npm run dev --loading
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;