'use client';
import React, { useCallback, useId, useMemo, useState } from 'react';
import { useMagnifierContext } from './MagnifierContext';
import { useImageMagnifier } from './hooks/useImageMagnifier';
import { useTouch } from './hooks/useTouch';
import { useKeyboard } from './hooks/useKeyboard';
import { LoadingState } from './components/base/LoadingState';
import { MagnifierImage } from './components/base/MagnifierImage';
import { MagnifierLens, MagnifierPosition } from './components/base/MagnifierLens';
import { MagnifierContainer, CursorStyle } from './components/base/MagnifierContainer';
import { ZoomControls } from './components/features/ZoomControls';
import { MiniMap } from './components/features/MiniMap';
import { Watermark } from './components/features/Watermark';
import {
  DEFAULT_MAGNIFIER_SIZE,
  DEFAULT_ZOOM_LEVEL,
  DEFAULT_MIN_ZOOM,
  DEFAULT_MAX_ZOOM,
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_SIZES,
  DEFAULT_IMAGE_CLASS,
  DEFAULT_CONTAINER_CLASS,
  DEFAULT_MAGNIFIER_SHAPE,
  ZOOM_INCREMENT,
  MagnifierShape,
} from './constants';
import { clamp } from './utils/image';

// Re-export types for backward compatibility
export type { MagnifierPosition, CursorStyle };

export interface ReactImageMagnifierAdvancedProps {
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSizes?: string;
  imageClassName?: string;
  className?: string;

  // Magnifier settings
  magnifierSize?: number;
  zoomLevel?: number;
  minZoom?: number;
  maxZoom?: number;

  // Positioning
  position?: MagnifierPosition;
  cursorStyle?: CursorStyle;

  // Styling
  theme?: string;
  customTheme?: Partial<import('./MagnifierContext').MagnifierTheme>;
  magnifierClassName?: string;
  magnifierShape?: MagnifierShape;

  // Behavior
  disabled?: boolean;
  smoothTransitions?: boolean;
  showZoomControls?: boolean;
  showMiniMap?: boolean;
  enableKeyboard?: boolean;
  enableTouch?: boolean;

  // Performance
  performanceMode?: boolean;
  preloadImage?: boolean;

  // Callbacks
  onMagnifierShow?: () => void;
  onMagnifierHide?: () => void;
  onZoomChange?: (zoom: number) => void;

  // Advanced features
  overlayContent?: React.ReactNode;
  watermark?: string | React.ReactNode;
}

const ReactImageMagnifierAdvanced: React.FC<ReactImageMagnifierAdvancedProps> = ({
  imageSrc,
  imageAlt,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
  imageSizes = DEFAULT_IMAGE_SIZES,
  imageClassName = DEFAULT_IMAGE_CLASS,
  className = DEFAULT_CONTAINER_CLASS,

  magnifierSize = DEFAULT_MAGNIFIER_SIZE,
  zoomLevel: initialZoomLevel = DEFAULT_ZOOM_LEVEL,
  minZoom = DEFAULT_MIN_ZOOM,
  maxZoom = DEFAULT_MAX_ZOOM,

  position = 'follow',
  cursorStyle = 'crosshair',

  theme,
  customTheme,
  magnifierClassName = '',
  magnifierShape = DEFAULT_MAGNIFIER_SHAPE,

  disabled = false,
  smoothTransitions = true,
  showZoomControls = false,
  showMiniMap = false,
  enableKeyboard = true,
  enableTouch = true,

  performanceMode = false,
  preloadImage = true,

  onMagnifierShow,
  onMagnifierHide,
  onZoomChange,

  overlayContent,
  watermark,
}) => {
  const componentId = useId();
  const { activeMagnifierId, setActiveMagnifierId, globalSettings, getTheme } =
    useMagnifierContext();

  const [currentZoom, setCurrentZoom] = useState(initialZoomLevel);
  const isActive = activeMagnifierId === componentId;

  const effectiveTheme = useMemo(() => {
    const baseTheme = getTheme(theme);
    return customTheme ? { ...baseTheme, ...customTheme } : baseTheme;
  }, [getTheme, theme, customTheme]);

  const magnifierOptions = useMemo(
    () => ({
      magnifierSize,
      zoomLevel: currentZoom,
      disabled: disabled,
      smoothAnimations: smoothTransitions && globalSettings.smoothAnimations,
      performanceMode: performanceMode || globalSettings.performanceMode,
      onMagnifierShow: () => {
        setActiveMagnifierId(componentId);
        onMagnifierShow?.();
      },
      onMagnifierHide: () => {
        if (isActive) setActiveMagnifierId(null);
        onMagnifierHide?.();
      },
    }),
    [
      magnifierSize,
      currentZoom,
      disabled,
      globalSettings,
      smoothTransitions,
      performanceMode,
      componentId,
      isActive,
      setActiveMagnifierId,
      onMagnifierShow,
      onMagnifierHide,
    ]
  );

  const {
    isVisible,
    imageSize,
    position: magnifierPosition,
    isImageLoaded,
    imageRef,
    containerRef,
    showMagnifier,
    hideMagnifier,
    updatePosition,
    handleImageLoad,
    handleImageError,
    isLoading,
    hasError,
  } = useImageMagnifier(magnifierOptions);

  const touchOptions = useMemo(
    () => ({
      enabled: enableTouch && globalSettings.touchEnabled,
      minZoom,
      maxZoom,
      onGesture: ({ scale }: { scale: number }) => {
        setCurrentZoom(scale);
        onZoomChange?.(scale);
      },
    }),
    [enableTouch, globalSettings.touchEnabled, minZoom, maxZoom, onZoomChange]
  );

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouch(touchOptions);

  const handleZoomChange = useCallback(
    (delta: number) => {
      const newZoom = clamp(currentZoom + delta, minZoom, maxZoom);
      setCurrentZoom(newZoom);
      onZoomChange?.(newZoom);
    },
    [currentZoom, minZoom, maxZoom, onZoomChange]
  );

  const { handleKeyDown } = useKeyboard({
    enabled: enableKeyboard,
    isVisible,
    currentZoom,
    minZoom,
    maxZoom,
    onZoomChange: (newZoom) => {
      setCurrentZoom(newZoom);
      onZoomChange?.(newZoom);
    },
    onEscape: hideMagnifier,
  });

  return (
    <LoadingState
      isLoading={isLoading}
      hasError={hasError}
      imageSrc={imageSrc}
      imageRef={imageRef}
      onLoad={handleImageLoad}
      onError={handleImageError}
      className={className}
    >
      <div className={className}>
        <MagnifierContainer
          ref={containerRef}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          disabled={disabled}
          cursorStyle={cursorStyle}
          enableKeyboard={enableKeyboard}
          onMouseEnter={showMagnifier}
          onMouseLeave={hideMagnifier}
          onMouseMove={updatePosition}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
        >
          {/* Preload link - Note: This should ideally be in document head */}
          {preloadImage && <link rel="preload" as="image" href={imageSrc} />}

          <MagnifierImage
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            imageSizes={imageSizes}
            imageClassName={imageClassName}
            imageRef={imageRef}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />

          {/* Watermark */}
          {watermark && <Watermark content={watermark} position="bottom-right" />}

          {/* Overlay Content */}
          {overlayContent && (
            <div className="absolute inset-0 pointer-events-none">{overlayContent}</div>
          )}

          {/* Zoom Controls */}
          {showZoomControls && !disabled && (
            <ZoomControls
              currentZoom={currentZoom}
              minZoom={minZoom}
              maxZoom={maxZoom}
              onZoomChange={handleZoomChange}
              disabled={disabled}
            />
          )}

          {/* Mini Map */}
          {showMiniMap && (
            <MiniMap
              imageSrc={imageSrc}
              imageSize={imageSize}
              magnifierSize={magnifierSize}
              position={magnifierPosition}
              isVisible={isVisible}
            />
          )}
        </MagnifierContainer>

        {/* Magnifier Lens */}
        {!disabled && (
          <MagnifierLens
            isVisible={isVisible && (isActive || !activeMagnifierId)}
            magnifierSize={magnifierSize}
            magnifierShape={magnifierShape}
            position={magnifierPosition}
            imageSize={imageSize}
            zoomLevel={currentZoom}
            imageSrc={imageSrc}
            borderWidth={effectiveTheme.borderWidth}
            borderColor={effectiveTheme.borderColor}
            smoothTransitions={smoothTransitions}
            positionMode={position}
            className={magnifierClassName}
          />
        )}
      </div>
    </LoadingState>
  );
};

export default ReactImageMagnifierAdvanced;
