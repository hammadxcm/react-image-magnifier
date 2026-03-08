// Main components
export { default as ReactImageMagnifier } from './ReactImageMagnifier';
export { default as ReactImageMagnifierAdvanced } from './ReactImageMagnifierAdvanced';

// Context and providers
export { MagnifierProvider, useMagnifierContext, themes } from './MagnifierContext';

// Hooks - main orchestration hook
export { useImageMagnifier } from './hooks/useImageMagnifier';
export type { UseImageMagnifierOptions, UseImageMagnifierReturn } from './hooks/useImageMagnifier';

// Hooks - focused hooks for SRP compliance
export { useImageLoader } from './hooks/useImageLoader';
export type { UseImageLoaderOptions, UseImageLoaderReturn } from './hooks/useImageLoader';

export { useVisibility } from './hooks/useVisibility';
export type { UseVisibilityOptions, UseVisibilityReturn } from './hooks/useVisibility';

export { usePosition } from './hooks/usePosition';
export type { UsePositionOptions, UsePositionReturn } from './hooks/usePosition';

export { useResize } from './hooks/useResize';
export type { UseResizeOptions, UseResizeReturn } from './hooks/useResize';

export { useKeyboard } from './hooks/useKeyboard';
export type { UseKeyboardOptions, UseKeyboardReturn } from './hooks/useKeyboard';

export { useTouch } from './hooks/useTouch';
export type { UseTouchOptions, TouchGesture } from './hooks/useTouch';

// Base components
export { LoadingState } from './components/base/LoadingState';
export type { LoadingStateProps } from './components/base/LoadingState';

export { MagnifierImage } from './components/base/MagnifierImage';
export type { MagnifierImageProps } from './components/base/MagnifierImage';

export { MagnifierLens } from './components/base/MagnifierLens';
export type { MagnifierLensProps } from './components/base/MagnifierLens';

export { MagnifierContainer } from './components/base/MagnifierContainer';
export type { MagnifierContainerProps } from './components/base/MagnifierContainer';

// Feature components
export { ZoomControls } from './components/features/ZoomControls';
export type { ZoomControlsProps } from './components/features/ZoomControls';

export { MiniMap } from './components/features/MiniMap';
export type { MiniMapProps } from './components/features/MiniMap';

export { Watermark } from './components/features/Watermark';
export type { WatermarkProps } from './components/features/Watermark';

// Types - Position types
export type { Position } from './hooks/usePosition';
export type { ImageSize } from './hooks/useResize';

// Types - Magnifier types
export type { MagnifierPosition, CursorStyle } from './ReactImageMagnifierAdvanced';
export type { MagnifierTheme } from './MagnifierContext';
export type { MagnifierShape } from './constants';

// Types - Component props
export type { ReactImageMagnifierAdvancedProps } from './ReactImageMagnifierAdvanced';

// Constants
export * from './constants';

// Utilities
export * from './utils/image';

// Default export for backwards compatibility
export { default } from './ReactImageMagnifier';
