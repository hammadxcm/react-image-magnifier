import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ReactImageMagnifierAdvanced from '../ReactImageMagnifierAdvanced';
import { MagnifierProvider } from '../MagnifierContext';

describe('ReactImageMagnifierAdvanced', () => {
  const defaultProps = {
    imageSrc: 'https://example.com/test-image.jpg',
    imageAlt: 'Test image',
    imageWidth: 500,
    imageHeight: 500,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should return null when imageSrc is empty', () => {
      const { container } = render(<ReactImageMagnifierAdvanced imageSrc="" />);
      expect(container.firstChild).toBeNull();
    });

    it('should show loading state initially', () => {
      render(<ReactImageMagnifierAdvanced {...defaultProps} />);
      expect(screen.getByText('Loading image...')).toBeInTheDocument();
    });

    it('should show error state on image error', async () => {
      render(<ReactImageMagnifierAdvanced {...defaultProps} />);

      const img = document.querySelector('img');
      fireEvent.error(img!);

      await waitFor(() => {
        expect(screen.getByText('Error loading image.')).toBeInTheDocument();
      });
    });
  });

  describe('zoom controls', () => {
    it('should show zoom controls when enabled', async () => {
      render(
        <ReactImageMagnifierAdvanced {...defaultProps} showZoomControls={true} />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Zoom in' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Zoom out' })).toBeInTheDocument();
      });
    });

    it('should not show zoom controls by default', async () => {
      render(<ReactImageMagnifierAdvanced {...defaultProps} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: 'Zoom in' })).not.toBeInTheDocument();
      });
    });

    it('should increase zoom on + button click', async () => {
      const onZoomChange = vi.fn();
      render(
        <ReactImageMagnifierAdvanced
          {...defaultProps}
          showZoomControls={true}
          zoomLevel={2.5}
          onZoomChange={onZoomChange}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const zoomInBtn = screen.getByRole('button', { name: 'Zoom in' });
        fireEvent.click(zoomInBtn);
      });

      expect(onZoomChange).toHaveBeenCalledWith(2.75);
    });

    it('should decrease zoom on - button click', async () => {
      const onZoomChange = vi.fn();
      render(
        <ReactImageMagnifierAdvanced
          {...defaultProps}
          showZoomControls={true}
          zoomLevel={2.5}
          onZoomChange={onZoomChange}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const zoomOutBtn = screen.getByRole('button', { name: 'Zoom out' });
        fireEvent.click(zoomOutBtn);
      });

      expect(onZoomChange).toHaveBeenCalledWith(2.25);
    });

    it('should display current zoom level', async () => {
      render(
        <ReactImageMagnifierAdvanced
          {...defaultProps}
          showZoomControls={true}
          zoomLevel={2.5}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(screen.getByText('2.5x')).toBeInTheDocument();
      });
    });
  });

  describe('mini map', () => {
    it('should show mini map when enabled and visible', async () => {
      render(
        <ReactImageMagnifierAdvanced {...defaultProps} showMiniMap={true} />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      // Mini map only shows when magnifier is visible
      const container = document.querySelector('[role="img"]');
      fireEvent.mouseEnter(container!);

      await waitFor(() => {
        const miniMapImg = screen.getByAltText('Mini map preview');
        expect(miniMapImg).toBeInTheDocument();
      });
    });
  });

  describe('watermark', () => {
    it('should show watermark when provided', async () => {
      render(
        <ReactImageMagnifierAdvanced {...defaultProps} watermark="Copyright 2024" />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(screen.getByText('Copyright 2024')).toBeInTheDocument();
      });
    });

    it('should not show watermark when not provided', async () => {
      render(<ReactImageMagnifierAdvanced {...defaultProps} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      expect(screen.queryByText('Copyright')).not.toBeInTheDocument();
    });
  });

  describe('keyboard interactions', () => {
    it('should zoom in on + key when visible', async () => {
      const onZoomChange = vi.fn();
      render(
        <ReactImageMagnifierAdvanced
          {...defaultProps}
          enableKeyboard={true}
          onZoomChange={onZoomChange}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      const container = document.querySelector('[role="img"]');
      fireEvent.mouseEnter(container!);
      fireEvent.keyDown(container!, { key: '+' });

      expect(onZoomChange).toHaveBeenCalledWith(2.75);
    });

    it('should zoom out on - key when visible', async () => {
      const onZoomChange = vi.fn();
      render(
        <ReactImageMagnifierAdvanced
          {...defaultProps}
          enableKeyboard={true}
          onZoomChange={onZoomChange}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      const container = document.querySelector('[role="img"]');
      fireEvent.mouseEnter(container!);
      fireEvent.keyDown(container!, { key: '-' });

      expect(onZoomChange).toHaveBeenCalledWith(2.25);
    });

    it('should hide on Escape key', async () => {
      const onMagnifierHide = vi.fn();
      render(
        <ReactImageMagnifierAdvanced
          {...defaultProps}
          enableKeyboard={true}
          onMagnifierHide={onMagnifierHide}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      const container = document.querySelector('[role="img"]');
      fireEvent.mouseEnter(container!);
      fireEvent.keyDown(container!, { key: 'Escape' });

      expect(onMagnifierHide).toHaveBeenCalled();
    });

    it('should not respond to keyboard when disabled', async () => {
      const onZoomChange = vi.fn();
      render(
        <ReactImageMagnifierAdvanced
          {...defaultProps}
          enableKeyboard={false}
          onZoomChange={onZoomChange}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      const container = document.querySelector('[role="img"]');
      fireEvent.mouseEnter(container!);
      fireEvent.keyDown(container!, { key: '+' });

      expect(onZoomChange).not.toHaveBeenCalled();
    });
  });

  describe('position modes', () => {
    it('should support follow position mode', async () => {
      render(
        <ReactImageMagnifierAdvanced {...defaultProps} position="follow" />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const lens = document.querySelector('.magnifier-lens');
        expect(lens).toBeInTheDocument();
      });
    });

    it('should support fixed position mode', async () => {
      render(
        <ReactImageMagnifierAdvanced {...defaultProps} position="fixed-top-right" />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const lens = document.querySelector('.magnifier-lens');
        expect(lens).toBeInTheDocument();
      });
    });
  });

  describe('themes', () => {
    it('should apply custom theme', async () => {
      render(
        <MagnifierProvider>
          <ReactImageMagnifierAdvanced {...defaultProps} theme="modern" />
        </MagnifierProvider>
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const lens = document.querySelector('.magnifier-lens');
        expect(lens).toBeInTheDocument();
      });
    });

    it('should apply customTheme overrides', async () => {
      render(
        <MagnifierProvider>
          <ReactImageMagnifierAdvanced
            {...defaultProps}
            customTheme={{ borderColor: 'red', borderWidth: 5 }}
          />
        </MagnifierProvider>
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const lens = document.querySelector('.magnifier-lens');
        expect(lens).toBeInTheDocument();
      });
    });
  });

  describe('overlay content', () => {
    it('should render overlay content', async () => {
      render(
        <ReactImageMagnifierAdvanced
          {...defaultProps}
          overlayContent={<div data-testid="overlay">Overlay</div>}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(screen.getByTestId('overlay')).toBeInTheDocument();
      });
    });
  });

  describe('preload image', () => {
    it('should add preload link when enabled', async () => {
      render(
        <ReactImageMagnifierAdvanced {...defaultProps} preloadImage={true} />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const preloadLink = document.querySelector('link[rel="preload"]');
        expect(preloadLink).toBeInTheDocument();
        expect(preloadLink).toHaveAttribute('href', defaultProps.imageSrc);
      });
    });

    it('should not add preload link when disabled', async () => {
      render(
        <ReactImageMagnifierAdvanced {...defaultProps} preloadImage={false} />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      const preloadLink = document.querySelector('link[rel="preload"]');
      expect(preloadLink).not.toBeInTheDocument();
    });
  });
});
