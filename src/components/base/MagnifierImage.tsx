'use client';
import React, { RefObject } from 'react';
import { getImageKey, getMagnifierAriaLabel } from '../../utils/image';
import {
  DEFAULT_IMAGE_WIDTH,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_SIZES,
  DEFAULT_IMAGE_CLASS,
} from '../../constants';

export interface MagnifierImageProps {
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSizes?: string;
  imageClassName?: string;
  imageRef: RefObject<HTMLImageElement>;
  onLoad: () => void;
  onError: () => void;
}

/**
 * Reusable image component for magnifier displays
 * Handles image rendering with consistent styling and event handling
 */
export const MagnifierImage: React.FC<MagnifierImageProps> = ({
  imageSrc,
  imageAlt,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
  imageSizes = DEFAULT_IMAGE_SIZES,
  imageClassName = DEFAULT_IMAGE_CLASS,
  imageRef,
  onLoad,
  onError,
}) => {
  return (
    <img
      ref={imageRef}
      key={getImageKey(imageSrc)}
      className={imageClassName}
      alt={imageAlt || getMagnifierAriaLabel(imageSrc)}
      src={imageSrc}
      sizes={imageSizes}
      onLoad={onLoad}
      onError={onError}
      style={{
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        display: 'block',
      }}
      width={imageWidth}
      height={imageHeight}
      draggable={false}
    />
  );
};

export default MagnifierImage;
