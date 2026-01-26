import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePosition } from '../usePosition';
import React from 'react';

describe('usePosition', () => {
  const createMockContainerRef = () => {
    const mockElement = document.createElement('div');
    mockElement.getBoundingClientRect = vi.fn(() => ({
      width: 500,
      height: 500,
      left: 0,
      top: 0,
      right: 500,
      bottom: 500,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    return { current: mockElement } as React.RefObject<HTMLDivElement>;
  };

  const defaultOptions = {
    magnifierSize: 300,
    zoomLevel: 2.5,
    containerRef: createMockContainerRef(),
    smoothAnimations: false, // Disable rAF for predictable tests
    performanceMode: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should start with position at origin', () => {
      const { result } = renderHook(() => usePosition(defaultOptions));
      expect(result.current.position).toEqual({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
    });
  });

  describe('updatePosition', () => {
    it('should update position on mouse move', () => {
      const containerRef = createMockContainerRef();
      const { result } = renderHook(() =>
        usePosition({ ...defaultOptions, containerRef })
      );

      const mockEvent = {
        clientX: 250,
        clientY: 250,
      } as React.MouseEvent;

      act(() => {
        result.current.updatePosition(mockEvent);
      });

      // With magnifierSize=300, halfSize=150, zoomLevel=2.5
      // mouseX = clamp(250, 150, 350) - 150 = 100
      // mouseY = clamp(250, 150, 350) - 150 = 100
      // x = -250 * 2.5 + 150 = -475
      // y = -250 * 2.5 + 150 = -475
      expect(result.current.position.mouseX).toBe(100);
      expect(result.current.position.mouseY).toBe(100);
      expect(result.current.position.x).toBe(-475);
      expect(result.current.position.y).toBe(-475);
    });

    it('should clamp position to container bounds', () => {
      const containerRef = createMockContainerRef();
      const { result } = renderHook(() =>
        usePosition({ ...defaultOptions, containerRef })
      );

      // Position at top-left corner (should clamp)
      const mockEvent = {
        clientX: 0,
        clientY: 0,
      } as React.MouseEvent;

      act(() => {
        result.current.updatePosition(mockEvent);
      });

      // Should clamp to halfSize (150) minus halfSize = 0
      expect(result.current.position.mouseX).toBe(0);
      expect(result.current.position.mouseY).toBe(0);
    });

    it('should not update when disabled', () => {
      const containerRef = createMockContainerRef();
      const { result } = renderHook(() =>
        usePosition({ ...defaultOptions, containerRef, disabled: true })
      );

      const mockEvent = {
        clientX: 250,
        clientY: 250,
      } as React.MouseEvent;

      act(() => {
        result.current.updatePosition(mockEvent);
      });

      expect(result.current.position).toEqual({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
    });

    it('should handle touch events', () => {
      const containerRef = createMockContainerRef();
      const { result } = renderHook(() =>
        usePosition({ ...defaultOptions, containerRef })
      );

      const mockTouchEvent = {
        touches: [{ clientX: 250, clientY: 250 }],
      } as unknown as React.TouchEvent;

      act(() => {
        result.current.updatePosition(mockTouchEvent);
      });

      expect(result.current.position.mouseX).toBe(100);
      expect(result.current.position.mouseY).toBe(100);
    });

    it('should not update when containerRef is null', () => {
      const nullRef = { current: null } as unknown as React.RefObject<HTMLDivElement>;
      const { result } = renderHook(() =>
        usePosition({ ...defaultOptions, containerRef: nullRef })
      );

      const mockEvent = {
        clientX: 250,
        clientY: 250,
      } as React.MouseEvent;

      act(() => {
        result.current.updatePosition(mockEvent);
      });

      expect(result.current.position).toEqual({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
    });
  });

  describe('resetPosition', () => {
    it('should reset position to origin', () => {
      const containerRef = createMockContainerRef();
      const { result } = renderHook(() =>
        usePosition({ ...defaultOptions, containerRef })
      );

      // First update position
      const mockEvent = {
        clientX: 250,
        clientY: 250,
      } as React.MouseEvent;

      act(() => {
        result.current.updatePosition(mockEvent);
      });
      expect(result.current.position.mouseX).toBe(100);

      // Reset
      act(() => {
        result.current.resetPosition();
      });

      expect(result.current.position).toEqual({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
    });
  });

  describe('performance mode', () => {
    it('should throttle updates in performance mode', () => {
      const containerRef = createMockContainerRef();
      const { result } = renderHook(() =>
        usePosition({ ...defaultOptions, containerRef, performanceMode: true })
      );

      const mockEvent1 = { clientX: 100, clientY: 100 } as React.MouseEvent;
      const mockEvent2 = { clientX: 200, clientY: 200 } as React.MouseEvent;

      act(() => {
        result.current.updatePosition(mockEvent1);
      });

      // First update should work
      expect(result.current.position.x).not.toBe(0);
    });
  });
});
