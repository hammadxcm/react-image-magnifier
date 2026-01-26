/**
 * Utility functions for image processing and labeling
 */

/**
 * Extracts the filename from an image source URL
 * @param imageSrc - The image source URL or path
 * @param fallback - Fallback value if extraction fails
 * @returns The extracted filename or fallback
 */
export function getImageName(imageSrc: string, fallback = 'image'): string {
  if (!imageSrc) return fallback;

  const parts = imageSrc.split('/');
  const filename = parts[parts.length - 1];

  // Remove query parameters if present
  const cleanFilename = filename?.split('?')[0];

  return cleanFilename || fallback;
}

/**
 * Generates an accessible aria-label for the magnifier component
 * @param imageSrc - The image source URL
 * @param imageAlt - Optional alt text for the image
 * @returns A descriptive aria-label string
 */
export function getMagnifierAriaLabel(imageSrc: string, imageAlt?: string): string {
  if (imageAlt) {
    return imageAlt;
  }
  return `Magnifiable image: ${getImageName(imageSrc)}`;
}

/**
 * Generates a unique key for image elements
 * @param imageSrc - The image source URL
 * @returns A unique key string
 */
export function getImageKey(imageSrc: string): string {
  return `magnifier-${getImageName(imageSrc)}`;
}

/**
 * Clamps a value between min and max bounds
 * @param value - The value to clamp
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculates the magnifier position within bounds
 * @param position - Current position value
 * @param halfSize - Half of the magnifier size
 * @param containerSize - Size of the container
 * @returns The clamped position
 */
export function clampMagnifierPosition(
  position: number,
  halfSize: number,
  containerSize: number
): number {
  return clamp(position, halfSize, containerSize - halfSize);
}

/**
 * Calculates the background position for zoomed image
 * @param cursorPos - Current cursor position
 * @param zoomLevel - Current zoom level
 * @param halfSize - Half of the magnifier size
 * @returns Background position in pixels
 */
export function calculateBackgroundPosition(
  cursorPos: number,
  zoomLevel: number,
  halfSize: number
): number {
  return -cursorPos * zoomLevel + halfSize;
}
