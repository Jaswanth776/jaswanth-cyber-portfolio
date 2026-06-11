import React from 'react';

const BackgroundEffect = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-dark-bg">
      {/* Matrix/Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 65, 0.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.2) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      ></div>
      
      {/* Scanline animation */}
      <div className="scan-line"></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,1)_100%)]"></div>
    </div>
  );
};

export default BackgroundEffect;
