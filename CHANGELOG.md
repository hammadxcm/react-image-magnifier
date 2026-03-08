# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2024-01-XX

### 🚀 **PRE-RELEASE - Complete Rewrite**

This is a massive update that transforms the library into a feature-rich, production-ready image magnification solution.

### ✨ **Added**

#### 🎨 **Visual Enhancements**
- **NEW**: `ReactImageMagnifierAdvanced` component with 25+ customizable props
- **NEW**: 4 built-in themes (Classic, Modern, Dark, Neon)
- **NEW**: Custom theme support with full color/style control
- **NEW**: Multiple cursor styles (`crosshair`, `zoom-in`, `grab`, `pointer`, `none`)
- **NEW**: Positioning modes (`follow`, `fixed-top-right`, `fixed-top-left`, etc.)
- **NEW**: Interactive zoom controls with +/- buttons
- **NEW**: Mini-map navigation showing current magnified area
- **NEW**: Watermark support (text or React components)
- **NEW**: Custom overlay content on images
- **NEW**: Smooth animations with configurable transitions

#### 📱 **Touch & Mobile Support**
- **NEW**: Full touch event support with gesture recognition
- **NEW**: Pinch-to-zoom gestures for mobile devices
- **NEW**: Touch navigation (drag to move magnification area)
- **NEW**: Mobile-optimized responsive design
- **NEW**: Custom gesture callbacks and handlers

#### ⚡ **Performance & Architecture**
- **NEW**: `MagnifierProvider` for global state management
- **NEW**: Smart rendering - only one active magnifier per page
- **NEW**: 60fps throttling for smooth mouse movement
- **NEW**: Performance mode for pages with multiple images
- **NEW**: React.memo and useCallback optimizations
- **NEW**: Optional image preloading
- **NEW**: Tree-shaking support with named exports

#### ♿ **Accessibility & UX**
- **NEW**: Comprehensive keyboard navigation (+/- zoom, Escape to hide)
- **NEW**: Full ARIA label support for screen readers
- **NEW**: Proper focus management and tab navigation
- **NEW**: High contrast theme compatibility
- **NEW**: Loading state handling and error boundaries

#### 🛠️ **Developer Experience**
- **NEW**: `useMagnifier` custom hook for advanced usage
- **NEW**: `useTouch` custom hook for gesture handling
- **NEW**: Complete TypeScript definitions with IntelliSense
- **NEW**: Event callbacks (`onMagnifierShow`, `onMagnifierHide`, `onZoomChange`)
- **NEW**: Comprehensive error handling and validation
- **NEW**: Better SSR/Next.js compatibility

### 🔧 **Changed**

#### **Breaking Changes**
- **BREAKING**: Import structure updated for advanced features
  ```tsx
  // Old (still works)
  import ReactImageMagnifier from '@hammadxcm/image-magnifier';
  
  // New (recommended)
  import { ReactImageMagnifier, ReactImageMagnifierAdvanced } from '@hammadxcm/image-magnifier';
  ```
- **BREAKING**: Some TypeScript interfaces updated for better type safety
- **BREAKING**: Performance optimizations may require `MagnifierProvider` for multiple images

#### **Improvements**
- **IMPROVED**: Better image loading and error handling
- **IMPROVED**: Enhanced animation system with smoother transitions
- **IMPROVED**: Memory management and cleanup
- **IMPROVED**: Bundle size optimization
- **IMPROVED**: SSR compatibility and hydration handling

### 🐛 **Fixed**

- **FIXED**: Hydration mismatch errors in Next.js applications
- **FIXED**: Magnifier visibility issues on certain browsers
- **FIXED**: Touch event handling on mobile devices
- **FIXED**: Memory leaks with event listeners
- **FIXED**: Component cleanup on unmount
- **FIXED**: Image loading race conditions
- **FIXED**: Z-index and positioning edge cases

### 🏗️ **Technical Details**

#### **Dependencies Updated**
- Updated to support React 18+ and React 19+
- TypeScript version bumped to 5.8.3
- Improved peer dependency ranges
- Updated build tools and dev dependencies

#### **Bundle Impact**
- Optimized for tree-shaking
- Named exports for better bundle splitting
- Reduced overall bundle footprint despite new features
- Lazy loading capabilities for better performance

#### **Compatibility**
- ✅ React 18+, React 19+
- ✅ TypeScript 4.5+
- ✅ Next.js 12+
- ✅ All modern browsers
- ✅ Mobile Safari, Chrome Mobile
- ✅ SSR/SSG frameworks

### 🎯 **Migration Guide**

#### **v1.x → v0.9 (Backward Compatible)**
```tsx
// Your existing v1.x code continues to work unchanged! 🎉
import ReactImageMagnifier from '@hammadxcm/image-magnifier';

function MyComponent() {
  return (
    <ReactImageMagnifier 
      imageSrc="/image.jpg"
      magnifierSize={300}
      zoomLevel={2.5}
      // All existing props still work
    />
  );
}
```

#### **Upgrading to v0.9 Advanced Features**
```tsx
import { 
  MagnifierProvider, 
  ReactImageMagnifierAdvanced 
} from '@hammadxcm/image-magnifier';

function MyApp() {
  return (
    <MagnifierProvider theme="modern" performanceMode={true}>
      <ReactImageMagnifierAdvanced
        imageSrc="/image.jpg"
        theme="modern"
        showZoomControls={true}
        showMiniMap={true}
        enableTouch={true}
        position="follow"
        watermark="© 2024 My Company"
      />
    </MagnifierProvider>
  );
}
```

### 👥 **Contributors**

Special thanks to the community for feedback, bug reports, and feature requests that shaped this release:

- Early adopters who tested pre-release versions
- Community members who reported issues and edge cases
- Contributors who suggested new features and improvements

---

## [1.0.0] - 2023-XX-XX

### **Initial Release**

- Basic image magnification functionality
- Simple hover-to-zoom interaction
- Customizable magnifier size and zoom level
- TypeScript support
- React 18 compatibility

### **Features**
- Basic magnifier component
- Hover interaction
- Configurable zoom settings
- TypeScript definitions
- Simple styling options

---

## **Legend**

- 🎉 **Major Release** - Significant new features and improvements
- ✨ **Added** - New features
- 🔧 **Changed** - Changes in existing functionality
- 🐛 **Fixed** - Bug fixes
- 🏗️ **Technical** - Under-the-hood improvements
- ⚡ **Performance** - Performance improvements
- 📱 **Mobile** - Mobile and touch improvements
- ♿ **Accessibility** - Accessibility improvements
- 🛠️ **Developer Experience** - Tools and DX improvements

---

*For more details about any release, check the [GitHub Releases](https://github.com/hammadxcm/react-image-magnifier/releases) page.*