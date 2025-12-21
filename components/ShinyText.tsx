import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shineColor?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '', shineColor = 'rgba(16, 185, 129, 0.8)' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        // Ensure the container allows the overlay to position correctly
      }}
    >
      {/* Base text - inherits styles and colors from className */}
      <span className="relative z-10">{text}</span>

      {/* Shine overlay */}
      {!disabled && (
        <div
          className="absolute top-0 left-0 w-full h-full animate-shine z-20"
          style={{
            backgroundImage: `linear-gradient(120deg, transparent 40%, ${shineColor} 50%, transparent 60%)`,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animationDuration: animationDuration,
            pointerEvents: 'none'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default ShinyText;
