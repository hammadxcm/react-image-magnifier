import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useKeyboard } from '../useKeyboard';
import React from 'react';

describe('useKeyboard', () => {
  const defaultOptions = {
    currentZoom: 2.5,
    minZoom: 1.5,
    maxZoom: 5,
    onZoomChange: vi.fn(),
    isVisible: true,
    enabled: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('zoomIn', () => {
    it('should increase zoom by ZOOM_INCREMENT', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, onZoomChange })
      );

      act(() => {
        result.current.zoomIn();
      });

      expect(onZoomChange).toHaveBeenCalledWith(2.75); // 2.5 + 0.25
    });

    it('should clamp zoom at maxZoom', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, currentZoom: 4.9, onZoomChange })
      );

      act(() => {
        result.current.zoomIn();
      });

      expect(onZoomChange).toHaveBeenCalledWith(5); // Clamped to maxZoom
    });
  });

  describe('zoomOut', () => {
    it('should decrease zoom by ZOOM_INCREMENT', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, onZoomChange })
      );

      act(() => {
        result.current.zoomOut();
      });

      expect(onZoomChange).toHaveBeenCalledWith(2.25); // 2.5 - 0.25
    });

    it('should clamp zoom at minZoom', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, currentZoom: 1.6, onZoomChange })
      );

      act(() => {
        result.current.zoomOut();
      });

      expect(onZoomChange).toHaveBeenCalledWith(1.5); // Clamped to minZoom
    });
  });

  describe('handleKeyDown', () => {
    it('should call zoomIn on + key', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, onZoomChange })
      );

      const event = {
        key: '+',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      act(() => {
        result.current.handleKeyDown(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(onZoomChange).toHaveBeenCalledWith(2.75);
    });

    it('should call zoomIn on = key', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, onZoomChange })
      );

      const event = {
        key: '=',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      act(() => {
        result.current.handleKeyDown(event);
      });

      expect(onZoomChange).toHaveBeenCalledWith(2.75);
    });

    it('should call zoomOut on - key', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, onZoomChange })
      );

      const event = {
        key: '-',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      act(() => {
        result.current.handleKeyDown(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(onZoomChange).toHaveBeenCalledWith(2.25);
    });

    it('should call onEscape on Escape key', () => {
      const onEscape = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, onEscape })
      );

      const event = {
        key: 'Escape',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      act(() => {
        result.current.handleKeyDown(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(onEscape).toHaveBeenCalled();
    });

    it('should not respond when disabled', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, enabled: false, onZoomChange })
      );

      const event = {
        key: '+',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      act(() => {
        result.current.handleKeyDown(event);
      });

      expect(onZoomChange).not.toHaveBeenCalled();
    });

    it('should not respond when not visible', () => {
      const onZoomChange = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, isVisible: false, onZoomChange })
      );

      const event = {
        key: '+',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      act(() => {
        result.current.handleKeyDown(event);
      });

      expect(onZoomChange).not.toHaveBeenCalled();
    });

    it('should ignore unhandled keys', () => {
      const onZoomChange = vi.fn();
      const onEscape = vi.fn();
      const { result } = renderHook(() =>
        useKeyboard({ ...defaultOptions, onZoomChange, onEscape })
      );

      const event = {
        key: 'a',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent;

      act(() => {
        result.current.handleKeyDown(event);
      });

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(onZoomChange).not.toHaveBeenCalled();
      expect(onEscape).not.toHaveBeenCalled();
    });
  });
});
