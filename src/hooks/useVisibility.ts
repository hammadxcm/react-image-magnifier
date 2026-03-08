'use client';
import { useState, useCallback, useRef } from 'react';

export interface UseVisibilityOptions {
  disabled?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export interface UseVisibilityReturn {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

/**
 * Hook for managing magnifier visibility state
 * Single Responsibility: Control show/hide logic with callbacks
 */
export const useVisibility = (options: UseVisibilityOptions = {}): UseVisibilityReturn => {
  const { disabled = false, onShow, onHide } = options;

  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const show = useCallback(() => {
    if (disabled) return;
    setIsVisible(true);
    onShow?.();
  }, [disabled, onShow]);

  const hide = useCallback(() => {
    if (disabled) return;
    setIsVisible(false);
    onHide?.();

    // Cleanup any pending animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, [disabled, onHide]);

  const toggle = useCallback(() => {
    if (disabled) return;
    setIsVisible((prev) => {
      const newValue = !prev;
      if (newValue) {
        onShow?.();
      } else {
        onHide?.();
      }
      return newValue;
    });
  }, [disabled, onShow, onHide]);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};
