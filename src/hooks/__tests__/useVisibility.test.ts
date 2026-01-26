import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVisibility } from '../useVisibility';

describe('useVisibility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should start with isVisible false', () => {
      const { result } = renderHook(() => useVisibility());
      expect(result.current.isVisible).toBe(false);
    });
  });

  describe('show', () => {
    it('should set isVisible to true', () => {
      const { result } = renderHook(() => useVisibility());

      act(() => {
        result.current.show();
      });

      expect(result.current.isVisible).toBe(true);
    });

    it('should call onShow callback', () => {
      const onShow = vi.fn();
      const { result } = renderHook(() => useVisibility({ onShow }));

      act(() => {
        result.current.show();
      });

      expect(onShow).toHaveBeenCalledTimes(1);
    });

    it('should not show when disabled', () => {
      const onShow = vi.fn();
      const { result } = renderHook(() => useVisibility({ disabled: true, onShow }));

      act(() => {
        result.current.show();
      });

      expect(result.current.isVisible).toBe(false);
      expect(onShow).not.toHaveBeenCalled();
    });
  });

  describe('hide', () => {
    it('should set isVisible to false', () => {
      const { result } = renderHook(() => useVisibility());

      act(() => {
        result.current.show();
      });
      expect(result.current.isVisible).toBe(true);

      act(() => {
        result.current.hide();
      });
      expect(result.current.isVisible).toBe(false);
    });

    it('should call onHide callback', () => {
      const onHide = vi.fn();
      const { result } = renderHook(() => useVisibility({ onHide }));

      act(() => {
        result.current.show();
        result.current.hide();
      });

      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('should not call onHide when disabled', () => {
      const onHide = vi.fn();
      const { result } = renderHook(() => useVisibility({ disabled: true, onHide }));

      act(() => {
        result.current.hide();
      });

      expect(onHide).not.toHaveBeenCalled();
    });
  });

  describe('toggle', () => {
    it('should toggle visibility from false to true', () => {
      const { result } = renderHook(() => useVisibility());

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isVisible).toBe(true);
    });

    it('should toggle visibility from true to false', () => {
      const { result } = renderHook(() => useVisibility());

      act(() => {
        result.current.show();
      });
      expect(result.current.isVisible).toBe(true);

      act(() => {
        result.current.toggle();
      });
      expect(result.current.isVisible).toBe(false);
    });

    it('should call appropriate callback on toggle', () => {
      const onShow = vi.fn();
      const onHide = vi.fn();
      const { result } = renderHook(() => useVisibility({ onShow, onHide }));

      act(() => {
        result.current.toggle();
      });
      expect(onShow).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.toggle();
      });
      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('should not toggle when disabled', () => {
      const { result } = renderHook(() => useVisibility({ disabled: true }));

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isVisible).toBe(false);
    });
  });
});
