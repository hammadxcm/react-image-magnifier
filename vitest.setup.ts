import '@testing-library/jest-dom';

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  width: 500,
  height: 500,
  top: 0,
  left: 0,
  bottom: 500,
  right: 500,
  x: 0,
  y: 0,
  toJSON: () => {},
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
  return setTimeout(() => callback(performance.now()), 16) as unknown as number;
});

global.cancelAnimationFrame = vi.fn((id: number) => {
  clearTimeout(id);
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock Touch events
class MockTouch implements Touch {
  clientX: number;
  clientY: number;
  force: number;
  identifier: number;
  pageX: number;
  pageY: number;
  radiusX: number;
  radiusY: number;
  rotationAngle: number;
  screenX: number;
  screenY: number;
  target: EventTarget;

  constructor(init: Partial<Touch> = {}) {
    this.clientX = init.clientX ?? 0;
    this.clientY = init.clientY ?? 0;
    this.force = init.force ?? 0;
    this.identifier = init.identifier ?? 0;
    this.pageX = init.pageX ?? 0;
    this.pageY = init.pageY ?? 0;
    this.radiusX = init.radiusX ?? 0;
    this.radiusY = init.radiusY ?? 0;
    this.rotationAngle = init.rotationAngle ?? 0;
    this.screenX = init.screenX ?? 0;
    this.screenY = init.screenY ?? 0;
    this.target = init.target ?? document.body;
  }
}

(global as unknown as Record<string, unknown>).Touch = MockTouch;

// Mock performance.now if not available
if (typeof performance === 'undefined') {
  (global as unknown as Record<string, unknown>).performance = {
    now: () => Date.now(),
  };
}

// Suppress console errors during tests (optional, can be removed for debugging)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
