// Main orchestration hook
export { useImageMagnifier } from './useImageMagnifier';
export type { UseImageMagnifierOptions, UseImageMagnifierReturn } from './useImageMagnifier';

// Focused hooks for SRP compliance
export { useImageLoader } from './useImageLoader';
export type { UseImageLoaderOptions, UseImageLoaderReturn } from './useImageLoader';

export { useVisibility } from './useVisibility';
export type { UseVisibilityOptions, UseVisibilityReturn } from './useVisibility';

export { usePosition } from './usePosition';
export type { UsePositionOptions, UsePositionReturn, Position } from './usePosition';

export { useResize } from './useResize';
export type { UseResizeOptions, UseResizeReturn, ImageSize } from './useResize';

export { useKeyboard } from './useKeyboard';
export type { UseKeyboardOptions, UseKeyboardReturn } from './useKeyboard';

export { useTouch } from './useTouch';
export type { UseTouchOptions, TouchGesture } from './useTouch';
