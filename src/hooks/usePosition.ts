'use client';
import { useState, useCallback, useRef, RefObject } from 'react';
import { THROTTLE_MS } from '../constants';
import { clampMagnifierPosition, calculateBackgroundPosition } from '../utils/image';

export interface Position {
  x: number;
  y: number;
  mouseX: number;
  mouseY: number;
}

export interface UsePositionOptions {
  magnifierSize: number;
  zoomLevel: number;
  disabled?: boolean;
  smoothAnimations?: boolean;
  performanceMode?: boolean;
  containerRef: RefObject<HTMLDivElement>;
}

export interface UsePositionReturn {
  position: Position;
  updatePosition: (e: React.MouseEvent | React.TouchEvent) => void;
  resetPosition: () => void;
}

const initialPosition: Position = { x: 0, y: 0, mouseX: 0, mouseY: 0 };

/**
 * Hook for managing magnifier position calculations
 * Single Responsibility: Calculate and update magnifier position with throttling
 */
export const usePosition = (options: UsePositionOptions): UsePositionReturn => {
  const {
    magnifierSize,
    zoomLevel,
    disabled = false,
    smoothAnimations = true,
    performanceMode = false,
    containerRef,
  } = options;

  const [position, setPosition] = useState<Position>(initialPosition);
  const animationFrameRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);

  const updatePosition = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!containerRef.current || disabled) return;

      const currentTime = performance.now();
      // 60fps throttle in performance mode
      if (performanceMode && currentTime - lastUpdateTime.current < THROTTLE_MS) {
        return;
      }

      lastUpdateTime.current = currentTime;

      const rect = containerRef.current.getBoundingClientRect();

      // Handle both mouse and touch events
      const clientX =
        'touches' in e ? e.touches[0]?.clientX || 0 : (e as React.MouseEvent).clientX;
      const clientY =
        'touches' in e ? e.touches[0]?.clientY || 0 : (e as React.MouseEvent).clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Keep magnifier within bounds
      const halfSize = magnifierSize / 2;
      const clampedX = clampMagnifierPosition(x, halfSize, rect.width);
      const clampedY = clampMagnifierPosition(y, halfSize, rect.height);

      const newPosition: Position = {
        x: calculateBackgroundPosition(x, zoomLevel, halfSize),
        y: calculateBackgroundPosition(y, zoomLevel, halfSize),
        mouseX: clampedX - halfSize,
        mouseY: clampedY - halfSize,
      };

      if (smoothAnimations && !performanceMode) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          setPosition(newPosition);
        });
      } else {
        setPosition(newPosition);
      }
    },
    [magnifierSize, zoomLevel, disabled, smoothAnimations, performanceMode, containerRef]
  );

  const resetPosition = useCallback(() => {
    setPosition(initialPosition);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return {
    position,
    updatePosition,
    resetPosition,
  };
};
