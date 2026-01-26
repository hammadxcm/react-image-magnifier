'use client';
import React, { RefObject, forwardRef } from 'react';
import { getMagnifierAriaLabel } from '../../utils/image';

export type CursorStyle = 'crosshair' | 'zoom-in' | 'grab' | 'pointer' | 'none' | 'default';

export interface MagnifierContainerProps {
  imageAlt?: string;
  imageSrc: string;
  disabled?: boolean;
  cursorStyle?: CursorStyle;
  enableKeyboard?: boolean;
  className?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  children: React.ReactNode;
}

/**
 * Container component for magnifier functionality
 * Handles mouse, touch, and keyboard event bindings
 */
export const MagnifierContainer = forwardRef<HTMLDivElement, MagnifierContainerProps>(
  (
    {
      imageAlt,
      imageSrc,
      disabled = false,
      cursorStyle = 'crosshair',
      enableKeyboard = true,
      className = '',
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onKeyDown,
      children,
    },
    ref
  ) => {
    const cursor = disabled ? 'default' : cursorStyle;

    return (
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        className={`relative overflow-hidden focus:outline-none ${className}`}
        style={{ cursor }}
        tabIndex={enableKeyboard && !disabled ? 0 : -1}
        role="img"
        aria-label={getMagnifierAriaLabel(imageSrc, imageAlt)}
      >
        {children}
      </div>
    );
  }
);

MagnifierContainer.displayName = 'MagnifierContainer';

export default MagnifierContainer;
