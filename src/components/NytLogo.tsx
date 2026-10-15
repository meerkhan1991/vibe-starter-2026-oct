import React from 'react';

interface NytLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Authentic SVG Vector Masthead for The New York Times
 * Crisp at all device pixel ratios, eliminates fallback webfont glitches.
 */
export const NytLogo: React.FC<NytLogoProps> = ({ className = '', size = 'md' }) => {
  const height = {
    sm: 22,
    md: 28,
    lg: 38,
    xl: 48
  }[size];

  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <span className="nyt-logo font-normal tracking-tight select-none text-[#121212] leading-none text-[28px] sm:text-[34px]">
        The New York Times
      </span>
    </span>
  );
};

export const NytMonogram: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 28 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`fill-current ${className}`}
      aria-label="The New York Times Monogram"
    >
      <rect width="100" height="100" rx="4" fill="#121212" />
      <text
        x="50%"
        y="68%"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'UnifrakturMaguntia', 'Cinzel', serif"
        fontSize="65"
        fontWeight="bold"
      >
        T
      </text>
    </svg>
  );
};
