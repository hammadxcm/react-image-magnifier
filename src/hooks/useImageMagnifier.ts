'use client';
import { useRef, useCallback, useEffect } from 'react';
import { useImageLoader } from './useImageLoader';
import { useVisibility } from './useVisibility';
import { usePosition } from './usePosition';
import { useResize } from './useResize';
import type { Position } from './usePosition';
import type { ImageSize } from './useResize';

// Re-export types for backward compatibility
export type { Position, ImageSize };

export interface UseImageMagnifierOptions {
  magnifierSize: number;
  zoomLevel: number;
  disabled: boolean;
  smoothAnimations: boolean;
  performanceMode: boolean;
  onMagnifierShow?: () => void;
  onMagnifierHide?: () => void;
}

export interface UseImageMagnifierReturn {
  isVisible: boolean;
  imageSize: ImageSize;
  position: Position;
  isImageLoaded: boolean;
  isLoading: boolean;
  hasError: boolean;
  imageRef: React.RefObject<HTMLImageElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  showMagnifier: (e: React.MouseEvent | React.TouchEvent) => void;
  hideMagnifier: () => void;
  updatePosition: (e: React.MouseEvent | React.TouchEvent) => void;
  handleImageLoad: () => void;
  handleImageError: () => void;
}

/**
 * Orchestration hook that composes focused hooks for image magnifier functionality
 * Maintains backward compatibility while following Single Responsibility Principle
 */
export const useImageMagnifier = (options: UseImageMagnifierOptions): UseImageMagnifierReturn => {
  const {
    magnifierSize,
    zoomLevel,
    disabled,
    smoothAnimations,
    performanceMode,
    onMagnifierShow,
    onMagnifierHide,
  } = options;

  // Refs
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compose hooks for image loading state
  // Pass imageRef to check for cached images (fixes Next.js 14 hydration issue)
  const {
    isLoading,
    hasError,
    isImageLoaded,
    handleImageLoad: onImageLoad,
    handleImageError,
  } = useImageLoader({ imageRef });

  // Compose hooks for resize handling
  const { imageSize, updateImageSize } = useResize({
    imageRef,
    enabled: isImageLoaded,
  });

  // Compose hooks for visibility
  const { isVisible, show, hide } = useVisibility({
    disabled,
    onShow: onMagnifierShow,
    onHide: onMagnifierHide,
  });

  // Compose hooks for position
  const { position, updatePosition, resetPosition } = usePosition({
    magnifierSize,
    zoomLevel,
    disabled,
    smoothAnimations,
    performanceMode,
    containerRef,
  });

  // Handle image load with size update
  const handleImageLoad = useCallback(() => {
    onImageLoad();
    updateImageSize();
  }, [onImageLoad, updateImageSize]);

  // Ensure image size is recalculated after DOM updates when image loads
  // This fixes the issue where the size is 0 because the visible image
  // wasn't in the DOM yet when updateImageSize was first called
  useEffect(() => {
    if (isImageLoaded && imageRef.current) {
      // Retry updating image size with increasing delays to handle
      // cases where React re-render + browser paint takes longer
      const retryDelays = [0, 16, 50, 100]; // ms delays
      const timeoutIds: number[] = [];

      retryDelays.forEach((delay) => {
        const timeoutId = window.setTimeout(() => {
          updateImageSize();
        }, delay);
        timeoutIds.push(timeoutId);
      });

      return () => {
        timeoutIds.forEach((id) => clearTimeout(id));
      };
    }
  }, [isImageLoaded, updateImageSize]);

  // Show magnifier with position update
  const showMagnifier = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled || !isImageLoaded) return;

      updateImageSize();
      show();
      updatePosition(e);
    },
    [disabled, isImageLoaded, updateImageSize, show, updatePosition]
  );

  // Hide magnifier with position reset
  const hideMagnifier = useCallback(() => {
    if (disabled) return;
    hide();
    resetPosition();
  }, [disabled, hide, resetPosition]);

  return {
    isVisible,
    imageSize,
    position,
    isImageLoaded,
    isLoading,
    hasError,
    imageRef,
    containerRef,
    showMagnifier,
    hideMagnifier,
    updatePosition,
    handleImageLoad,
    handleImageError,
  };
};
