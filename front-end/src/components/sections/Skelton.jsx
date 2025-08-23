import React, { memo } from 'react';

const SkeletonLoader = ({ 
  width = '100%', 
  height = '1rem', 
  circle = false, 
  rounded = 'md',
  className = '',
  darkMode = false
}) => {
  const baseClasses = `animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`;
  
  let roundedClass = '';
  if (circle) {
    roundedClass = 'rounded-full';
  } else {
    switch (rounded) {
      case 'none': roundedClass = ''; break;
      case 'sm': roundedClass = 'rounded-sm'; break;
      case 'md': roundedClass = 'rounded-md'; break;
      case 'lg': roundedClass = 'rounded-lg'; break;
      case 'full': roundedClass = 'rounded-full'; break;
      default: roundedClass = 'rounded-md';
    }
  }
  
  const skeletonStyle = {
    width,
    height
  };
  
  return (
    <div
      className={`${baseClasses} ${roundedClass} ${className}`}
      style={skeletonStyle}
    />
  );
};

export default memo(SkeletonLoader);