'use client';
import { useState, useCallback, useEffect, RefObject } from 'react';

export interface UseImageLoaderOptions {
  imageRef?: RefObject<HTMLImageElement>;
  onLoad?: () => void;
  onError?: () => void;
}

export interface UseImageLoaderReturn {
  isLoading: boolean;
  hasError: boolean;
  isImageLoaded: boolean;
  handleImageLoad: () => void;
  handleImageError: () => void;
  resetLoadingState: () => void;
}

/**
 * Hook for managing image loading states
 * Single Responsibility: Track loading, error, and loaded states for images
 *
 * IMPORTANT: Handles Next.js 14 SSR/hydration issue where onLoad may fire
 * before React hydration completes. Checks if image is already loaded on mount.
 */
export const useImageLoader = (options: UseImageLoaderOptions = {}): UseImageLoaderReturn => {
  const { imageRef, onLoad, onError } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setIsImageLoaded(false);
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  const resetLoadingState = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setIsImageLoaded(false);
  }, []);

  // Fix for Next.js 14: Check if image is already loaded on mount
  // This handles the case where image loads before React hydration completes
  useEffect(() => {
    if (imageRef?.current) {
      // Check if image is already cached/loaded
      if (imageRef.current.complete && imageRef.current.naturalWidth > 0) {
        handleImageLoad();
      }
    }
  }, [imageRef, handleImageLoad]);

  return {
    isLoading,
    hasError,
    isImageLoaded,
    handleImageLoad,
    handleImageError,
    resetLoadingState,
  };
};
