/**
 * Magnifier-related types
 */

import type { Position, ImageSize } from './position';
import type { MagnifierTheme } from './theme';

export type MagnifierShape = 'circle' | 'square';

export type MagnifierPosition =
  | 'follow'
  | 'fixed-top-right'
  | 'fixed-top-left'
  | 'fixed-bottom-right'
  | 'fixed-bottom-left';

export type CursorStyle = 'crosshair' | 'zoom-in' | 'grab' | 'pointer' | 'none';

export interface MagnifierConfig {
  size: number;
  shape: MagnifierShape;
  position: MagnifierPosition;
  className?: string;
}

export interface ZoomConfig {
  level: number;
  min: number;
  max: number;
  showControls: boolean;
}

export interface ImageConfig {
  src: string;
  alt?: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  preload?: boolean;
}

export interface BehaviorConfig {
  disabled: boolean;
  smoothTransitions: boolean;
  enableKeyboard: boolean;
  enableTouch: boolean;
  performanceMode: boolean;
}

export interface StyleConfig {
  borderColor: string;
  borderWidth: number;
  theme?: string;
  customTheme?: Partial<MagnifierTheme>;
}

// Re-export for convenience
export type { Position, ImageSize, MagnifierTheme };
