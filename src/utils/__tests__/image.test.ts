import { describe, it, expect } from 'vitest';
import {
  getImageName,
  getMagnifierAriaLabel,
  getImageKey,
  clamp,
  clampMagnifierPosition,
  calculateBackgroundPosition,
} from '../image';

describe('image utilities', () => {
  describe('getImageName', () => {
    it('should extract filename from URL', () => {
      expect(getImageName('https://example.com/images/photo.jpg')).toBe('photo.jpg');
    });

    it('should extract filename from path', () => {
      expect(getImageName('/images/photo.jpg')).toBe('photo.jpg');
    });

    it('should remove query parameters', () => {
      expect(getImageName('https://example.com/photo.jpg?v=123')).toBe('photo.jpg');
    });

    it('should return fallback for empty string', () => {
      expect(getImageName('')).toBe('image');
    });

    it('should return custom fallback', () => {
      expect(getImageName('', 'default')).toBe('default');
    });

    it('should handle URL with trailing slash', () => {
      expect(getImageName('https://example.com/')).toBe('image');
    });

    it('should handle simple filename', () => {
      expect(getImageName('photo.jpg')).toBe('photo.jpg');
    });
  });

  describe('getMagnifierAriaLabel', () => {
    it('should return imageAlt if provided', () => {
      expect(getMagnifierAriaLabel('photo.jpg', 'My photo')).toBe('My photo');
    });

    it('should generate label from imageSrc if no alt', () => {
      expect(getMagnifierAriaLabel('https://example.com/photo.jpg')).toBe(
        'Magnifiable image: photo.jpg'
      );
    });

    it('should use default fallback for empty src', () => {
      expect(getMagnifierAriaLabel('')).toBe('Magnifiable image: image');
    });
  });

  describe('getImageKey', () => {
    it('should generate key from imageSrc', () => {
      expect(getImageKey('https://example.com/photo.jpg')).toBe('magnifier-photo.jpg');
    });

    it('should handle empty src', () => {
      expect(getImageKey('')).toBe('magnifier-image');
    });
  });

  describe('clamp', () => {
    it('should return value if within bounds', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should clamp to min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should clamp to max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle equal min and max', () => {
      expect(clamp(5, 3, 3)).toBe(3);
    });

    it('should handle negative range', () => {
      expect(clamp(-5, -10, -1)).toBe(-5);
    });
  });

  describe('clampMagnifierPosition', () => {
    it('should clamp position within container bounds', () => {
      // position=100, halfSize=50, containerSize=500
      // result = clamp(100, 50, 450) = 100
      expect(clampMagnifierPosition(100, 50, 500)).toBe(100);
    });

    it('should clamp to minimum (halfSize)', () => {
      // position=10, halfSize=50, containerSize=500
      // result = clamp(10, 50, 450) = 50
      expect(clampMagnifierPosition(10, 50, 500)).toBe(50);
    });

    it('should clamp to maximum (containerSize - halfSize)', () => {
      // position=490, halfSize=50, containerSize=500
      // result = clamp(490, 50, 450) = 450
      expect(clampMagnifierPosition(490, 50, 500)).toBe(450);
    });
  });

  describe('calculateBackgroundPosition', () => {
    it('should calculate background position for centered cursor', () => {
      // cursorPos=250, zoomLevel=2, halfSize=150
      // result = -250 * 2 + 150 = -350
      expect(calculateBackgroundPosition(250, 2, 150)).toBe(-350);
    });

    it('should calculate background position for corner cursor', () => {
      // cursorPos=0, zoomLevel=2.5, halfSize=150
      // result = -0 * 2.5 + 150 = 150
      expect(calculateBackgroundPosition(0, 2.5, 150)).toBe(150);
    });

    it('should handle different zoom levels', () => {
      // cursorPos=100, zoomLevel=3, halfSize=100
      // result = -100 * 3 + 100 = -200
      expect(calculateBackgroundPosition(100, 3, 100)).toBe(-200);
    });
  });
});
