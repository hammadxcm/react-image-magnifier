'use client';
import React, { RefObject } from 'react';

export interface LoadingStateProps {
  isLoading: boolean;
  hasError: boolean;
  imageSrc: string;
  imageRef: RefObject<HTMLImageElement>;
  onLoad: () => void;
  onError: () => void;
  className?: string;
  loadingText?: string;
  errorText?: string;
  children: React.ReactNode;
}

/**
 * Component for handling loading and error states of magnifier images
 * Renders loading spinner, error message, or children based on state
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  hasError,
  imageSrc,
  imageRef,
  onLoad,
  onError,
  className = 'flex justify-center items-center',
  loadingText = 'Loading image...',
  errorText = 'Error loading image.',
  children,
}) => {
  if (!imageSrc) {
    return null;
  }

  if (hasError) {
    return (
      <div className="flex justify-center items-center w-full h-full text-red-500">
        {errorText}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={className}>
        <div className="flex justify-center items-center w-full h-full text-gray-500">
          {loadingText}
        </div>
        {/* Hidden image to trigger onLoad event */}
        <img
          ref={imageRef}
          src={imageSrc}
          alt=""
          onLoad={onLoad}
          onError={onError}
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            opacity: 0,
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingState;
