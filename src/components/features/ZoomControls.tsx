'use client';
import React from 'react';
import { ZOOM_INCREMENT, DEFAULT_MIN_ZOOM, DEFAULT_MAX_ZOOM } from '../../constants';

export interface ZoomControlsProps {
  currentZoom: number;
  minZoom?: number;
  maxZoom?: number;
  onZoomChange: (delta: number) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Zoom control buttons for magnifier
 * Provides +/- buttons and displays current zoom level
 */
export const ZoomControls: React.FC<ZoomControlsProps> = ({
  currentZoom,
  minZoom = DEFAULT_MIN_ZOOM,
  maxZoom = DEFAULT_MAX_ZOOM,
  onZoomChange,
  disabled = false,
  className = '',
}) => {
  const handleZoomIn = () => {
    if (!disabled && currentZoom < maxZoom) {
      onZoomChange(ZOOM_INCREMENT);
    }
  };

  const handleZoomOut = () => {
    if (!disabled && currentZoom > minZoom) {
      onZoomChange(-ZOOM_INCREMENT);
    }
  };

  return (
    <div
      className={`absolute top-2 left-2 flex flex-col gap-1 bg-white bg-opacity-90 rounded p-1 ${className}`}
    >
      <button
        type="button"
        onClick={handleZoomIn}
        className="w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled || currentZoom >= maxZoom}
        aria-label="Zoom in"
      >
        +
      </button>
      <span className="text-xs text-center" aria-live="polite">
        {currentZoom.toFixed(1)}x
      </span>
      <button
        type="button"
        onClick={handleZoomOut}
        className="w-6 h-6 flex items-center justify-center text-sm hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled || currentZoom <= minZoom}
        aria-label="Zoom out"
      >
        -
      </button>
    </div>
  );
};

export default ZoomControls;
