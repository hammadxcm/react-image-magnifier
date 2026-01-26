import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useImageMagnifier } from '../useImageMagnifier';
import React from 'react';

describe('useImageMagnifier', () => {
  const defaultOptions = {
    magnifierSize: 300,
    zoomLevel: 2.5,
    disabled: false,
    smoothAnimations: true,
    performanceMode: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should start with isLoading true', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));
      expect(result.current.isLoading).toBe(true);
    });

    it('should start with isVisible false', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));
      expect(result.current.isVisible).toBe(false);
    });

    it('should start with isImageLoaded false', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));
      expect(result.current.isImageLoaded).toBe(false);
    });

    it('should start with hasError false', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));
      expect(result.current.hasError).toBe(false);
    });

    it('should provide refs for image and container', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));
      expect(result.current.imageRef).toBeDefined();
      expect(result.current.containerRef).toBeDefined();
    });

    it('should initialize position at origin', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));
      expect(result.current.position).toEqual({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
    });

    it('should initialize imageSize as zero', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));
      expect(result.current.imageSize).toEqual({ width: 0, height: 0 });
    });
  });

  describe('handleImageLoad', () => {
    it('should set isImageLoaded to true', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));

      act(() => {
        result.current.handleImageLoad();
      });

      expect(result.current.isImageLoaded).toBe(true);
    });

    it('should set isLoading to false', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));

      act(() => {
        result.current.handleImageLoad();
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('handleImageError', () => {
    it('should set hasError to true', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));

      act(() => {
        result.current.handleImageError();
      });

      expect(result.current.hasError).toBe(true);
    });

    it('should set isLoading to false', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));

      act(() => {
        result.current.handleImageError();
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('showMagnifier', () => {
    it('should not show when disabled', () => {
      const onMagnifierShow = vi.fn();
      const { result } = renderHook(() =>
        useImageMagnifier({ ...defaultOptions, disabled: true, onMagnifierShow })
      );

      // First load image
      act(() => {
        result.current.handleImageLoad();
      });

      const event = {
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent;

      act(() => {
        result.current.showMagnifier(event);
      });

      expect(result.current.isVisible).toBe(false);
      expect(onMagnifierShow).not.toHaveBeenCalled();
    });

    it('should not show when image not loaded', () => {
      const onMagnifierShow = vi.fn();
      const { result } = renderHook(() =>
        useImageMagnifier({ ...defaultOptions, onMagnifierShow })
      );

      const event = {
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent;

      act(() => {
        result.current.showMagnifier(event);
      });

      expect(result.current.isVisible).toBe(false);
      expect(onMagnifierShow).not.toHaveBeenCalled();
    });

    it('should call onMagnifierShow callback when enabled and loaded', () => {
      const onMagnifierShow = vi.fn();
      const { result } = renderHook(() =>
        useImageMagnifier({ ...defaultOptions, onMagnifierShow })
      );

      // Load image first
      act(() => {
        result.current.handleImageLoad();
      });

      // Mock the containerRef
      const mockElement = document.createElement('div');
      Object.defineProperty(result.current.containerRef, 'current', {
        value: mockElement,
        writable: true,
      });

      const event = {
        clientX: 100,
        clientY: 100,
      } as React.MouseEvent;

      act(() => {
        result.current.showMagnifier(event);
      });

      expect(result.current.isVisible).toBe(true);
      expect(onMagnifierShow).toHaveBeenCalled();
    });
  });

  describe('hideMagnifier', () => {
    it('should not hide when disabled', () => {
      const onMagnifierHide = vi.fn();
      const { result } = renderHook(() =>
        useImageMagnifier({ ...defaultOptions, disabled: true, onMagnifierHide })
      );

      act(() => {
        result.current.hideMagnifier();
      });

      expect(onMagnifierHide).not.toHaveBeenCalled();
    });

    it('should call onMagnifierHide callback', () => {
      const onMagnifierHide = vi.fn();
      const { result } = renderHook(() =>
        useImageMagnifier({ ...defaultOptions, onMagnifierHide })
      );

      act(() => {
        result.current.hideMagnifier();
      });

      expect(onMagnifierHide).toHaveBeenCalled();
    });

    it('should set isVisible to false', () => {
      const { result } = renderHook(() => useImageMagnifier(defaultOptions));

      // First load and show
      act(() => {
        result.current.handleImageLoad();
      });

      // Mock containerRef
      const mockElement = document.createElement('div');
      Object.defineProperty(result.current.containerRef, 'current', {
        value: mockElement,
        writable: true,
      });

      const event = { clientX: 100, clientY: 100 } as React.MouseEvent;
      act(() => {
        result.current.showMagnifier(event);
      });

      // Now hide
      act(() => {
        result.current.hideMagnifier();
      });

      expect(result.current.isVisible).toBe(false);
    });
  });

  describe('options changes', () => {
    it('should respond to disabled prop changes', () => {
      const { result, rerender } = renderHook(
        (props) => useImageMagnifier(props),
        { initialProps: defaultOptions }
      );

      // Load and show
      act(() => {
        result.current.handleImageLoad();
      });

      const mockElement = document.createElement('div');
      Object.defineProperty(result.current.containerRef, 'current', {
        value: mockElement,
        writable: true,
      });

      // Now disable
      rerender({ ...defaultOptions, disabled: true });

      const event = { clientX: 100, clientY: 100 } as React.MouseEvent;
      act(() => {
        result.current.showMagnifier(event);
      });

      expect(result.current.isVisible).toBe(false);
    });
  });
});
