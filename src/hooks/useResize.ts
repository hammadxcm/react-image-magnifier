'use client';
import { useState, useCallback, useEffect, RefObject } from 'react';

export interface ImageSize {
  width: number;
  height: number;
}

export interface UseResizeOptions {
  imageRef: RefObject<HTMLImageElement>;
  enabled?: boolean;
}

export interface UseResizeReturn {
  imageSize: ImageSize;
  updateImageSize: () => void;
}

const initialSize: ImageSize = { width: 0, height: 0 };

/**
 * Hook for managing image size and window resize events
 * Single Responsibility: Track and update image dimensions on resize
 */
export const useResize = (options: UseResizeOptions): UseResizeReturn => {
  const { imageRef, enabled = true } = options;

  const [imageSize, setImageSize] = useState<ImageSize>(initialSize);

  const updateImageSize = useCallback(() => {
    if (imageRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      // Only update if we have valid dimensions (not the hidden preload image)
      if (width > 0 && height > 0) {
        setImageSize({ width, height });
      }
    }
  }, [imageRef]);

  useEffect(() => {
    if (!enabled) return;

    const handleResize = () => updateImageSize();
    window.addEventListener('resize', handleResize);

    // Use double requestAnimationFrame to ensure React has re-rendered
    // and the ref points to the visible image (not the hidden preload image)
    // This fixes the issue where getBoundingClientRect returns 0x0
    let rafId1: number;
    let rafId2: number;

    const scheduleUpdate = () => {
      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => {
          updateImageSize();
        });
      });
    };

    scheduleUpdate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
    };
  }, [enabled, updateImageSize]);

  return {
    imageSize,
    updateImageSize,
  };
};
