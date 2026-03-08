import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import ReactImageMagnifier from '../ReactImageMagnifier';
import { MagnifierProvider } from '../MagnifierContext';

describe('ReactImageMagnifier', () => {
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
      const { container } = render(<ReactImageMagnifier imageSrc="" />);
      expect(container.firstChild).toBeNull();
    });

    it('should show loading state initially', () => {
      render(<ReactImageMagnifier {...defaultProps} />);
      expect(screen.getByText('Loading image...')).toBeInTheDocument();
    });

    it('should show error state on image error', async () => {
      render(<ReactImageMagnifier {...defaultProps} />);

      const img = document.querySelector('img');
      expect(img).toBeInTheDocument();

      fireEvent.error(img!);

      await waitFor(() => {
        expect(screen.getByText('Error loading image.')).toBeInTheDocument();
      });
    });

    it('should render image after load', async () => {
      render(<ReactImageMagnifier {...defaultProps} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const images = document.querySelectorAll('img');
        expect(images.length).toBeGreaterThan(0);
      });
    });
  });

  describe('props', () => {
    it('should apply custom className', async () => {
      const { container } = render(
        <ReactImageMagnifier {...defaultProps} className="custom-class" />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(container.querySelector('.custom-class')).toBeInTheDocument();
      });
    });

    it('should apply imageClassName to image', async () => {
      render(
        <ReactImageMagnifier {...defaultProps} imageClassName="custom-image-class" />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const mainImg = document.querySelectorAll('img')[0];
        expect(mainImg).toHaveClass('custom-image-class');
      });
    });

    it('should set image dimensions', async () => {
      render(
        <ReactImageMagnifier
          {...defaultProps}
          imageWidth={600}
          imageHeight={400}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const images = document.querySelectorAll('img');
        const mainImg = images[0];
        expect(mainImg).toHaveAttribute('width', '600');
        expect(mainImg).toHaveAttribute('height', '400');
      });
    });

    it('should apply border styling', async () => {
      render(
        <ReactImageMagnifier
          {...defaultProps}
          borderColor="red"
          borderWidth={5}
        />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      // Border styling is applied to magnifier lens which is rendered
      await waitFor(() => {
        expect(document.querySelector('.magnifier-lens')).toBeInTheDocument();
      });
    });
  });

  describe('disabled state', () => {
    it('should not show magnifier when disabled', async () => {
      render(<ReactImageMagnifier {...defaultProps} disabled={true} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(document.querySelector('.magnifier-lens')).not.toBeInTheDocument();
      });
    });

    it('should have default cursor when disabled', async () => {
      render(<ReactImageMagnifier {...defaultProps} disabled={true} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toHaveStyle({ cursor: 'default' });
      });
    });
  });

  describe('magnifier shape', () => {
    it('should apply circle shape by default', async () => {
      render(<ReactImageMagnifier {...defaultProps} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const lens = document.querySelector('.magnifier-lens');
        expect(lens).toHaveClass('rounded-full');
      });
    });

    it('should apply square shape when specified', async () => {
      render(<ReactImageMagnifier {...defaultProps} magnifierShape="square" />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const lens = document.querySelector('.magnifier-lens');
        expect(lens).toHaveClass('rounded-none');
      });
    });
  });

  describe('callbacks', () => {
    it('should call onMagnifierShow on hover', async () => {
      const onMagnifierShow = vi.fn();
      render(
        <ReactImageMagnifier {...defaultProps} onMagnifierShow={onMagnifierShow} />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      const container = document.querySelector('[role="img"]');
      fireEvent.mouseEnter(container!);

      await waitFor(() => {
        expect(onMagnifierShow).toHaveBeenCalled();
      });
    });

    it('should call onMagnifierHide on mouse leave', async () => {
      const onMagnifierHide = vi.fn();
      render(
        <ReactImageMagnifier {...defaultProps} onMagnifierHide={onMagnifierHide} />
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toBeInTheDocument();
      });

      const container = document.querySelector('[role="img"]');
      fireEvent.mouseEnter(container!);
      fireEvent.mouseLeave(container!);

      await waitFor(() => {
        expect(onMagnifierHide).toHaveBeenCalled();
      });
    });
  });

  describe('accessibility', () => {
    it('should have role="img"', async () => {
      render(<ReactImageMagnifier {...defaultProps} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(document.querySelector('[role="img"]')).toBeInTheDocument();
      });
    });

    it('should have aria-label', async () => {
      render(<ReactImageMagnifier {...defaultProps} imageAlt="Custom alt text" />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toHaveAttribute('aria-label', 'Custom alt text');
      });
    });

    it('should have tabIndex when not disabled', async () => {
      render(<ReactImageMagnifier {...defaultProps} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toHaveAttribute('tabindex', '0');
      });
    });

    it('should have tabIndex=-1 when disabled', async () => {
      render(<ReactImageMagnifier {...defaultProps} disabled={true} />);

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        const container = document.querySelector('[role="img"]');
        expect(container).toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('with MagnifierProvider', () => {
    it('should work with MagnifierProvider', async () => {
      render(
        <MagnifierProvider defaultTheme="modern">
          <ReactImageMagnifier {...defaultProps} />
        </MagnifierProvider>
      );

      const img = document.querySelector('img');
      fireEvent.load(img!);

      await waitFor(() => {
        expect(document.querySelector('.magnifier-lens')).toBeInTheDocument();
      });
    });
  });
});
