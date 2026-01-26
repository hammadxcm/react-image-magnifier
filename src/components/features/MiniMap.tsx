'use client';
import React from 'react';
import { Position, ImageSize } from '../../hooks';

export interface MiniMapProps {
  imageSrc: string;
  imageSize: ImageSize;
  magnifierSize: number;
  position: Position;
  isVisible: boolean;
  className?: string;
}

/**
 * Mini map component showing current magnifier position
 * Displays a small preview of the full image with viewport indicator
 */
export const MiniMap: React.FC<MiniMapProps> = ({
  imageSrc,
  imageSize,
  magnifierSize,
  position,
  isVisible,
  className = '',
}) => {
  if (!isVisible) {
    return null;
  }

  // Calculate viewport indicator size and position
  const viewportWidth = Math.min(100, (magnifierSize / imageSize.width) * 100);
  const viewportHeight = Math.min(100, (magnifierSize / imageSize.height) * 100);
  const viewportLeft = Math.max(
    0,
    Math.min(100, ((position.mouseX + magnifierSize / 2) / imageSize.width) * 100)
  );
  const viewportTop = Math.max(
    0,
    Math.min(100, ((position.mouseY + magnifierSize / 2) / imageSize.height) * 100)
  );

  return (
    <div
      className={`absolute top-2 right-2 w-20 h-20 border border-white bg-black bg-opacity-50 rounded overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <img
        src={imageSrc}
        alt="Mini map preview"
        className="w-full h-full object-cover opacity-70"
      />
      <div
        className="absolute border border-red-500 pointer-events-none"
        style={{
          width: `${viewportWidth}%`,
          height: `${viewportHeight}%`,
          left: `${viewportLeft}%`,
          top: `${viewportTop}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default MiniMap;
