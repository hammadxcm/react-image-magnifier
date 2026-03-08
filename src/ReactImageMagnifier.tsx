'use client';
import React from 'react';
import { useImageMagnifier } from './hooks/useImageMagnifier';
import { useMagnifierContext } from './MagnifierContext';
import { LoadingState } from './components/base/LoadingState';
import { MagnifierImage } from './components/base/MagnifierImage';
import { MagnifierLens } from './components/base/MagnifierLens';
import { MagnifierContainer } from './components/base/MagnifierContainer';
import { getMagnifierAriaLabel } from './utils/image';
import {
  DEFAULT_MAGNIFIER_SIZE,
  DEFAULT_ZOOM_LEVEL,
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_SIZES,
  DEFAULT_IMAGE_BASIC_CLASS,
  DEFAULT_CONTAINER_CLASS,
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_MAGNIFIER_SHAPE,
  MagnifierShape,
} from './constants';

export interface ReactImageMagnifierProps {
  imageSrc: string;
  magnifierSize?: number;
  zoomLevel?: number;
  imageClassName?: string;
  imageAlt?: string;
  imageSizes?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  magnifierClassName?: string; // Fixed: Added dedicated prop for magnifier lens styling
  borderColor?: string;
  borderWidth?: number;
  smooth?: boolean;
  disabled?: boolean;
  magnifierShape?: MagnifierShape;
  onMagnifierShow?: () => void;
  onMagnifierHide?: () => void;
}

const ReactImageMagnifier: React.FC<ReactImageMagnifierProps> = ({
  imageSrc,
  magnifierSize = DEFAULT_MAGNIFIER_SIZE,
  zoomLevel = DEFAULT_ZOOM_LEVEL,
  imageClassName = DEFAULT_IMAGE_BASIC_CLASS,
  imageAlt,
  imageSizes = DEFAULT_IMAGE_SIZES,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
  className = DEFAULT_CONTAINER_CLASS,
  magnifierClassName = '', // Fixed: Now properly separated from container className
  borderColor,
  borderWidth,
  smooth = true,
  disabled = false,
  magnifierShape = DEFAULT_MAGNIFIER_SHAPE,
  onMagnifierShow,
  onMagnifierHide,
}) => {
  // Use context for theme if available
  const { getTheme } = useMagnifierContext();
  const theme = getTheme();

  // Resolve styling with theme fallbacks
  const effectiveBorderColor = borderColor ?? theme.borderColor ?? DEFAULT_BORDER_COLOR;
  const effectiveBorderWidth = borderWidth ?? theme.borderWidth ?? DEFAULT_BORDER_WIDTH;

  const {
    isVisible,
    imageSize,
    position,
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
  } = useImageMagnifier({
    magnifierSize,
    zoomLevel,
    disabled,
    smoothAnimations: smooth,
    performanceMode: false,
    onMagnifierShow,
    onMagnifierHide,
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
          cursorStyle={disabled ? 'default' : 'crosshair'}
          enableKeyboard={!disabled}
          onMouseEnter={showMagnifier}
          onMouseLeave={hideMagnifier}
          onMouseMove={updatePosition}
        >
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

          {/* Magnifier Lens - Fixed: Now uses magnifierClassName instead of className */}
          {!disabled && (
            <MagnifierLens
              isVisible={isVisible && isImageLoaded}
              magnifierSize={magnifierSize}
              magnifierShape={magnifierShape}
              position={position}
              imageSize={imageSize}
              zoomLevel={zoomLevel}
              imageSrc={imageSrc}
              borderWidth={effectiveBorderWidth}
              borderColor={effectiveBorderColor}
              smoothTransitions={smooth}
              positionMode="follow"
              className={magnifierClassName}
            />
          )}
        </MagnifierContainer>
      </div>
    </LoadingState>
  );
};

export default ReactImageMagnifier;
