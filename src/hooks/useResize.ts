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
      setImageSize({ width, height });
    }
  }, [imageRef]);

  useEffect(() => {
    if (!enabled) return;

    const handleResize = () => updateImageSize();
    window.addEventListener('resize', handleResize);

    // Initial size update
    updateImageSize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled, updateImageSize]);

  return {
    imageSize,
    updateImageSize,
  };
};
