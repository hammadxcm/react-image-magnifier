'use client';
import React from 'react';
import { Position, ImageSize } from '../../hooks';
import {
  DEFAULT_MAGNIFIER_SIZE,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_BORDER_COLOR,
  DEFAULT_TRANSITION,
  DEFAULT_MAGNIFIER_SHAPE,
  FIXED_POSITION_OFFSET,
  MagnifierShape,
} from '../../constants';

export type MagnifierPosition =
  | 'follow'
  | 'fixed-top-right'
  | 'fixed-top-left'
  | 'fixed-bottom-right'
  | 'fixed-bottom-left';

export interface MagnifierLensProps {
  isVisible: boolean;
  magnifierSize?: number;
  magnifierShape?: MagnifierShape;
  position: Position;
  imageSize: ImageSize;
  zoomLevel: number;
  imageSrc: string;
  borderWidth?: number;
  borderColor?: string;
  smoothTransitions?: boolean;
  positionMode?: MagnifierPosition;
  className?: string;
}

/**
 * Reusable magnifier lens component
 * Renders the zoomed area with customizable styling and positioning
 */
export const MagnifierLens: React.FC<MagnifierLensProps> = ({
  isVisible,
  magnifierSize = DEFAULT_MAGNIFIER_SIZE,
  magnifierShape = DEFAULT_MAGNIFIER_SHAPE,
  position,
  imageSize,
  zoomLevel,
  imageSrc,
  borderWidth = DEFAULT_BORDER_WIDTH,
  borderColor = DEFAULT_BORDER_COLOR,
  smoothTransitions = true,
  positionMode = 'follow',
  className = '',
}) => {
  const isCircle = magnifierShape === 'circle';
  const shapeClass = isCircle ? 'rounded-full' : 'rounded-none';

  const getFixedPosition = (): React.CSSProperties => {
    if (positionMode === 'follow') {
      return {
        position: 'absolute',
        top: `${position.mouseY}px`,
        left: `${position.mouseX}px`,
      };
    }

    const positions: Record<string, React.CSSProperties> = {
      'fixed-top-right': {
        position: 'fixed',
        top: FIXED_POSITION_OFFSET,
        right: FIXED_POSITION_OFFSET,
      },
      'fixed-top-left': {
        position: 'fixed',
        top: FIXED_POSITION_OFFSET,
        left: FIXED_POSITION_OFFSET,
      },
      'fixed-bottom-right': {
        position: 'fixed',
        bottom: FIXED_POSITION_OFFSET,
        right: FIXED_POSITION_OFFSET,
      },
      'fixed-bottom-left': {
        position: 'fixed',
        bottom: FIXED_POSITION_OFFSET,
        left: FIXED_POSITION_OFFSET,
      },
    };

    return positions[positionMode] || {};
  };

  return (
    <div
      className={`magnifier-lens ${shapeClass} pointer-events-none z-50 shadow-lg backdrop-blur-sm ${className}`}
      style={{
        display: isVisible ? 'block' : 'none',
        width: `${magnifierSize}px`,
        height: `${magnifierSize}px`,
        border: `${borderWidth}px solid ${borderColor}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: smoothTransitions ? DEFAULT_TRANSITION : 'none',
        ...getFixedPosition(),
      }}
      aria-hidden="true"
    >
      <div
        className={`w-full h-full bg-no-repeat ${shapeClass}`}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: `${imageSize.width * zoomLevel}px ${imageSize.height * zoomLevel}px`,
          backgroundPosition: `${position.x}px ${position.y}px`,
        }}
      />
    </div>
  );
};

export default MagnifierLens;
