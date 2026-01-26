import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { useImageLoader } from '../useImageLoader';

describe('useImageLoader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Next.js 14 hydration fix', () => {
    it('should detect already loaded image on mount', () => {
      const mockImg = document.createElement('img');
      Object.defineProperty(mockImg, 'complete', { value: true });
      Object.defineProperty(mockImg, 'naturalWidth', { value: 500 });
      const imageRef = { current: mockImg } as React.RefObject<HTMLImageElement>;

      const { result } = renderHook(() => useImageLoader({ imageRef }));

      // Should auto-detect that image is already loaded
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isImageLoaded).toBe(true);
    });

    it('should remain loading if image is not complete', () => {
      const mockImg = document.createElement('img');
      Object.defineProperty(mockImg, 'complete', { value: false });
      const imageRef = { current: mockImg } as React.RefObject<HTMLImageElement>;

      const { result } = renderHook(() => useImageLoader({ imageRef }));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isImageLoaded).toBe(false);
    });
  });

  describe('initial state', () => {
    it('should start with isLoading true', () => {
      const { result } = renderHook(() => useImageLoader());
      expect(result.current.isLoading).toBe(true);
    });

    it('should start with isImageLoaded false', () => {
      const { result } = renderHook(() => useImageLoader());
      expect(result.current.isImageLoaded).toBe(false);
    });

    it('should start with hasError false', () => {
      const { result } = renderHook(() => useImageLoader());
      expect(result.current.hasError).toBe(false);
    });
  });

  describe('handleImageLoad', () => {
    it('should set isImageLoaded to true on load', () => {
      const { result } = renderHook(() => useImageLoader());

      act(() => {
        result.current.handleImageLoad();
      });

      expect(result.current.isImageLoaded).toBe(true);
    });

    it('should set isLoading to false on load', () => {
      const { result } = renderHook(() => useImageLoader());

      act(() => {
        result.current.handleImageLoad();
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('should clear hasError on load', () => {
      const { result } = renderHook(() => useImageLoader());

      // First trigger an error
      act(() => {
        result.current.handleImageError();
      });
      expect(result.current.hasError).toBe(true);

      // Then trigger load
      act(() => {
        result.current.handleImageLoad();
      });
      expect(result.current.hasError).toBe(false);
    });

    it('should call onLoad callback', () => {
      const onLoad = vi.fn();
      const { result } = renderHook(() => useImageLoader({ onLoad }));

      act(() => {
        result.current.handleImageLoad();
      });

      expect(onLoad).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleImageError', () => {
    it('should set hasError to true on error', () => {
      const { result } = renderHook(() => useImageLoader());

      act(() => {
        result.current.handleImageError();
      });

      expect(result.current.hasError).toBe(true);
    });

    it('should set isLoading to false on error', () => {
      const { result } = renderHook(() => useImageLoader());

      act(() => {
        result.current.handleImageError();
      });

      expect(result.current.isLoading).toBe(false);
    });

    it('should set isImageLoaded to false on error', () => {
      const { result } = renderHook(() => useImageLoader());

      // First load successfully
      act(() => {
        result.current.handleImageLoad();
      });
      expect(result.current.isImageLoaded).toBe(true);

      // Then trigger error
      act(() => {
        result.current.handleImageError();
      });
      expect(result.current.isImageLoaded).toBe(false);
    });

    it('should call onError callback', () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useImageLoader({ onError }));

      act(() => {
        result.current.handleImageError();
      });

      expect(onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('resetLoadingState', () => {
    it('should reset all states to initial values', () => {
      const { result } = renderHook(() => useImageLoader());

      // First change states
      act(() => {
        result.current.handleImageLoad();
      });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isImageLoaded).toBe(true);

      // Reset
      act(() => {
        result.current.resetLoadingState();
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.hasError).toBe(false);
      expect(result.current.isImageLoaded).toBe(false);
    });
  });
});
