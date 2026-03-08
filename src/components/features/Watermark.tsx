'use client';
import React from 'react';

export interface WatermarkProps {
  content: string | React.ReactNode;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

/**
 * Watermark overlay component
 * Displays text or custom content as a watermark overlay on the image
 */
export const Watermark: React.FC<WatermarkProps> = ({
  content,
  position = 'bottom-right',
  className = '',
}) => {
  const positionClasses: Record<string, string> = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} opacity-50 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {content}
    </div>
  );
};

export default Watermark;
