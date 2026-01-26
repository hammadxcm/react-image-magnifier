'use client';
import { useCallback } from 'react';
import { ZOOM_INCREMENT } from '../constants';
import { clamp } from '../utils/image';

export interface UseKeyboardOptions {
  enabled?: boolean;
  isVisible?: boolean;
  currentZoom: number;
  minZoom: number;
  maxZoom: number;
  onZoomChange: (newZoom: number) => void;
  onEscape?: () => void;
}

export interface UseKeyboardReturn {
  handleKeyDown: (e: React.KeyboardEvent) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

/**
 * Hook for managing keyboard interactions
 * Single Responsibility: Handle keyboard events for zoom and navigation
 */
export const useKeyboard = (options: UseKeyboardOptions): UseKeyboardReturn => {
  const {
    enabled = true,
    isVisible = false,
    currentZoom,
    minZoom,
    maxZoom,
    onZoomChange,
    onEscape,
  } = options;

  const zoomIn = useCallback(() => {
    const newZoom = clamp(currentZoom + ZOOM_INCREMENT, minZoom, maxZoom);
    onZoomChange(newZoom);
  }, [currentZoom, minZoom, maxZoom, onZoomChange]);

  const zoomOut = useCallback(() => {
    const newZoom = clamp(currentZoom - ZOOM_INCREMENT, minZoom, maxZoom);
    onZoomChange(newZoom);
  }, [currentZoom, minZoom, maxZoom, onZoomChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enabled || !isVisible) return;

      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case 'Escape':
          e.preventDefault();
          onEscape?.();
          break;
      }
    },
    [enabled, isVisible, zoomIn, zoomOut, onEscape]
  );

  return {
    handleKeyDown,
    zoomIn,
    zoomOut,
  };
};
