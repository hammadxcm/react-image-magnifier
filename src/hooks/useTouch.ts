'use client';
import { useCallback, useRef, useState } from 'react';

export interface TouchGesture {
  scale: number;
  rotation: number;
  deltaX: number;
  deltaY: number;
}

export interface UseTouchOptions {
  enabled: boolean;
  minZoom: number;
  maxZoom: number;
  onGesture?: (gesture: TouchGesture) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export const useTouch = (options: UseTouchOptions) => {
  const {
    enabled,
    minZoom,
    maxZoom,
    onGesture,
    onTouchStart,
    onTouchEnd,
  } = options;

  const [isDragging, setIsDragging] = useState(false);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);
  const [currentScale, setCurrentScale] = useState(1);
  
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastTouchRef = useRef<React.TouchList | null>(null);

  const getDistance = useCallback((touches: React.TouchList): number => {
    if (touches.length < 2) return 0;
    
    const touch1 = touches[0];
    const touch2 = touches[1];
    
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  }, []);

  const getCenter = useCallback((touches: React.TouchList): { x: number; y: number } => {
    if (touches.length === 1) {
      return { x: touches[0].clientX, y: touches[0].clientY };
    }
    
    if (touches.length === 2) {
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2,
      };
    }
    
    return { x: 0, y: 0 };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enabled) return;
    
    e.preventDefault();
    const touches = e.touches;
    lastTouchRef.current = touches;
    
    if (touches.length === 1) {
      const touch = touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      setIsDragging(true);
    } else if (touches.length === 2) {
      const distance = getDistance(touches);
      setInitialDistance(distance);
      setInitialScale(currentScale);
    }
    
    onTouchStart?.(e);
  }, [enabled, currentScale, getDistance, onTouchStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enabled || !lastTouchRef.current) return;
    
    const touches = e.touches;
    
    // Only prevent default for multi-touch or when actively dragging
    if (touches.length > 1 || (touches.length === 1 && isDragging)) {
      e.preventDefault();
    }
    
    if (touches.length === 1 && isDragging && touchStartRef.current) {
      const touch = touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      
      onGesture?.({
        scale: currentScale,
        rotation: 0,
        deltaX,
        deltaY,
      });
    } else if (touches.length === 2 && initialDistance > 0) {
      const distance = getDistance(touches);
      const scale = Math.max(
        minZoom,
        Math.min(maxZoom, initialScale * (distance / initialDistance))
      );
      
      setCurrentScale(scale);
      
      onGesture?.({
        scale,
        rotation: 0,
        deltaX: 0,
        deltaY: 0,
      });
    }
    
    lastTouchRef.current = touches;
  }, [
    enabled,
    isDragging,
    initialDistance,
    initialScale,
    currentScale,
    minZoom,
    maxZoom,
    getDistance,
    onGesture,
  ]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!enabled) return;
    
    setIsDragging(false);
    touchStartRef.current = null;
    lastTouchRef.current = null;
    
    if (e.touches.length === 0) {
      setInitialDistance(0);
      setInitialScale(1);
    }
    
    onTouchEnd?.(e);
  }, [enabled, onTouchEnd]);

  const resetScale = useCallback(() => {
    setCurrentScale(1);
    setInitialScale(1);
    setIsDragging(false);
    setInitialDistance(0);
    touchStartRef.current = null;
    lastTouchRef.current = null;
  }, []);

  return {
    isDragging,
    currentScale,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetScale,
  };
};