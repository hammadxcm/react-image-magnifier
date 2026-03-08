/**
 * Theme-related types for the magnifier
 */

export interface MagnifierTheme {
  borderColor: string;
  borderWidth: number;
  shadowColor: string;
  handleColor: string;
  gripColor: string;
  backdropBlur: boolean;
}

export interface GlobalSettings {
  theme: string;
  performanceMode: boolean;
  smoothAnimations: boolean;
  touchEnabled: boolean;
}

export type ThemeName = 'classic' | 'modern' | 'dark' | 'neon';
