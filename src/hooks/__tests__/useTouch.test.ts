import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTouch } from '../useTouch';
import React from 'react';

describe('useTouch', () => {
  const defaultOptions = {
    enabled: true,
    minZoom: 1.5,
    maxZoom: 5,
    onGesture: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should start with isDragging false', () => {
      const { result } = renderHook(() => useTouch(defaultOptions));
      expect(result.current.isDragging).toBe(false);
    });

    it('should start with currentScale of 1', () => {
      const { result } = renderHook(() => useTouch(defaultOptions));
      expect(result.current.currentScale).toBe(1);
    });
  });

  describe('handleTouchStart', () => {
    it('should set isDragging true on single touch', () => {
      const { result } = renderHook(() => useTouch(defaultOptions));

      const event = {
        touches: [{ clientX: 100, clientY: 100 }],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(event);
      });

      expect(result.current.isDragging).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not respond when disabled', () => {
      const onTouchStart = vi.fn();
      const { result } = renderHook(() =>
        useTouch({ ...defaultOptions, enabled: false, onTouchStart })
      );

      const event = {
        touches: [{ clientX: 100, clientY: 100 }],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(event);
      });

      expect(result.current.isDragging).toBe(false);
      expect(onTouchStart).not.toHaveBeenCalled();
    });

    it('should call onTouchStart callback', () => {
      const onTouchStart = vi.fn();
      const { result } = renderHook(() =>
        useTouch({ ...defaultOptions, onTouchStart })
      );

      const event = {
        touches: [{ clientX: 100, clientY: 100 }],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(event);
      });

      expect(onTouchStart).toHaveBeenCalledWith(event);
    });
  });

  describe('handleTouchMove', () => {
    it('should call onGesture with delta on single finger drag', () => {
      const onGesture = vi.fn();
      const { result } = renderHook(() =>
        useTouch({ ...defaultOptions, onGesture })
      );

      // Start touch
      const startEvent = {
        touches: [{ clientX: 100, clientY: 100 }],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(startEvent);
      });

      // Move touch
      const moveEvent = {
        touches: [{ clientX: 150, clientY: 150 }],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchMove(moveEvent);
      });

      expect(onGesture).toHaveBeenCalledWith({
        scale: 1,
        rotation: 0,
        deltaX: 50,
        deltaY: 50,
      });
    });

    it('should not respond when disabled', () => {
      const onGesture = vi.fn();
      const { result } = renderHook(() =>
        useTouch({ ...defaultOptions, enabled: false, onGesture })
      );

      const event = {
        touches: [{ clientX: 150, clientY: 150 }],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchMove(event);
      });

      expect(onGesture).not.toHaveBeenCalled();
    });
  });

  describe('handleTouchEnd', () => {
    it('should set isDragging false', () => {
      const { result } = renderHook(() => useTouch(defaultOptions));

      // Start touch
      const startEvent = {
        touches: [{ clientX: 100, clientY: 100 }],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(startEvent);
      });
      expect(result.current.isDragging).toBe(true);

      // End touch
      const endEvent = {
        touches: [],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchEnd(endEvent);
      });

      expect(result.current.isDragging).toBe(false);
    });

    it('should call onTouchEnd callback', () => {
      const onTouchEnd = vi.fn();
      const { result } = renderHook(() =>
        useTouch({ ...defaultOptions, onTouchEnd })
      );

      const event = {
        touches: [],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchEnd(event);
      });

      expect(onTouchEnd).toHaveBeenCalledWith(event);
    });
  });

  describe('pinch zoom', () => {
    it('should calculate scale on two-finger pinch', () => {
      const onGesture = vi.fn();
      const { result } = renderHook(() =>
        useTouch({ ...defaultOptions, onGesture })
      );

      // Start with two fingers
      const startEvent = {
        touches: [
          { clientX: 100, clientY: 100 },
          { clientX: 200, clientY: 100 },
        ],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(startEvent);
      });

      // Move fingers apart (zoom in)
      const moveEvent = {
        touches: [
          { clientX: 50, clientY: 100 },
          { clientX: 250, clientY: 100 },
        ],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchMove(moveEvent);
      });

      expect(onGesture).toHaveBeenCalled();
      const lastCall = onGesture.mock.calls[onGesture.mock.calls.length - 1][0];
      expect(lastCall.scale).toBeGreaterThan(1); // Zoomed in
    });

    it('should clamp scale to minZoom', () => {
      const onGesture = vi.fn();
      const { result } = renderHook(() =>
        useTouch({ ...defaultOptions, onGesture, minZoom: 1.5, maxZoom: 5 })
      );

      // Start with two fingers far apart
      const startEvent = {
        touches: [
          { clientX: 0, clientY: 100 },
          { clientX: 400, clientY: 100 },
        ],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(startEvent);
      });

      // Pinch in (zoom out extremely)
      const moveEvent = {
        touches: [
          { clientX: 195, clientY: 100 },
          { clientX: 205, clientY: 100 },
        ],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchMove(moveEvent);
      });

      expect(onGesture).toHaveBeenCalled();
      const lastCall = onGesture.mock.calls[onGesture.mock.calls.length - 1][0];
      expect(lastCall.scale).toBeGreaterThanOrEqual(1.5); // Clamped to minZoom
    });

    it('should clamp scale to maxZoom', () => {
      const onGesture = vi.fn();
      const { result } = renderHook(() =>
        useTouch({ ...defaultOptions, onGesture, minZoom: 1.5, maxZoom: 5 })
      );

      // Start with two fingers close together
      const startEvent = {
        touches: [
          { clientX: 190, clientY: 100 },
          { clientX: 210, clientY: 100 },
        ],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(startEvent);
      });

      // Spread fingers (zoom in extremely)
      const moveEvent = {
        touches: [
          { clientX: 0, clientY: 100 },
          { clientX: 1000, clientY: 100 },
        ],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchMove(moveEvent);
      });

      expect(onGesture).toHaveBeenCalled();
      const lastCall = onGesture.mock.calls[onGesture.mock.calls.length - 1][0];
      expect(lastCall.scale).toBeLessThanOrEqual(5); // Clamped to maxZoom
    });
  });

  describe('resetScale', () => {
    it('should reset all touch state', () => {
      const { result } = renderHook(() => useTouch(defaultOptions));

      // Start touch
      const startEvent = {
        touches: [{ clientX: 100, clientY: 100 }],
        preventDefault: vi.fn(),
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.handleTouchStart(startEvent);
      });
      expect(result.current.isDragging).toBe(true);

      act(() => {
        result.current.resetScale();
      });

      expect(result.current.isDragging).toBe(false);
      expect(result.current.currentScale).toBe(1);
    });
  });
});
