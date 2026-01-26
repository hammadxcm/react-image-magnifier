/**
 * Constants for the Image Magnifier library
 * Extracted magic numbers for maintainability and consistency
 */

// Performance
export const THROTTLE_MS = 16; // 60fps frame time

// Zoom
export const ZOOM_INCREMENT = 0.25;
export const DEFAULT_ZOOM_LEVEL = 2.5;
export const DEFAULT_MIN_ZOOM = 1.5;
export const DEFAULT_MAX_ZOOM = 5;

// Magnifier
export const DEFAULT_MAGNIFIER_SIZE = 300;

// Image
export const DEFAULT_IMAGE_WIDTH = 500;
export const DEFAULT_IMAGE_HEIGHT = 500;
export const DEFAULT_IMAGE_SIZES = '(max-width: 700px) 100vw, (max-width: 300px) 100vw, 700px';

// Styling
export const DEFAULT_BORDER_WIDTH = 3;
export const DEFAULT_BORDER_COLOR = 'rgba(255, 255, 255, 0.8)';

// Positioning
export const FIXED_POSITION_OFFSET = 20;

// Animation
export const TRANSITION_DURATION = '0.2s';
export const TRANSITION_TIMING = 'ease-in-out';
export const DEFAULT_TRANSITION = `opacity ${TRANSITION_DURATION} ${TRANSITION_TIMING}, transform ${TRANSITION_DURATION} ${TRANSITION_TIMING}`;

// CSS Classes
export const DEFAULT_CONTAINER_CLASS = 'flex justify-center items-center';
export const DEFAULT_IMAGE_CLASS = 'object-cover';
export const DEFAULT_IMAGE_BASIC_CLASS = 'object-cover z-10';

// Magnifier shapes
export type MagnifierShape = 'circle' | 'square';
export const DEFAULT_MAGNIFIER_SHAPE: MagnifierShape = 'circle';
