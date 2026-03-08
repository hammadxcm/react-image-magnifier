<div align="center">

# 🔍 React Image Magnifier

<p align="center">
  <img src="https://img.shields.io/badge/React-18%2B%20%7C%2019%2B-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@hammadxcm/image-magnifier">
    <img src="https://img.shields.io/npm/v/@hammadxcm/image-magnifier?style=flat-square&color=success" alt="npm version" />
  </a>
  <a href="https://bundlephobia.com/package/@hammadxcm/image-magnifier">
    <img src="https://img.shields.io/bundlephobia/minzip/@hammadxcm/image-magnifier?style=flat-square&color=success" alt="Bundle Size" />
  </a>
  <a href="https://github.com/hammadxcm/react-image-magnifier/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@hammadxcm/image-magnifier?style=flat-square&color=success" alt="License" />
  </a>
  <a href="https://github.com/hammadxcm/react-image-magnifier/stargazers">
    <img src="https://img.shields.io/github/stars/hammadxcm/react-image-magnifier?style=flat-square&color=yellow" alt="GitHub Stars" />
  </a>
</p>

<h3>🎯 A modern, powerful React component for image magnification</h3>
<p>Built with TypeScript, featuring multiple themes, touch support, and advanced customization options</p>

---

<p>
  <a href="#-demo"><strong>🎬 Demo</strong></a> •
  <a href="#-installation"><strong>📦 Installation</strong></a> •
  <a href="#-quick-start"><strong>🚀 Quick Start</strong></a> •
  <a href="#-examples"><strong>💡 Examples</strong></a> •
  <a href="#-api"><strong>📖 API</strong></a>
</p>

</div>

---

## ✨ Features

<table>
<thead>
<tr>
<th width="50%">🚀 Core Features</th>
<th width="50%">⚡ Advanced Features</th>
</tr>
</thead>
<tbody>
<tr>
<td>

• 🔍 **Smooth Magnification** - High-performance zoom  
• 🎨 **4 Built-in Themes** - Classic, Modern, Dark, Neon  
• 📱 **Touch Support** - Pinch-to-zoom gestures  
• ⌨️ **Keyboard Navigation** - +/- zoom, ESC hide  
• 🎯 **Smart Positioning** - Follow cursor or fixed  
• 🖱️ **Multiple Cursors** - Crosshair, zoom-in, etc  

</td>
<td>

• 🎛️ **Zoom Controls** - Interactive +/- buttons  
• 🗺️ **Mini Map** - Navigation overview  
• 🏷️ **Watermarks** - Text or component overlays  
• 🎭 **Custom Themes** - Full color customization  
• ♿ **Accessibility** - ARIA support, screen readers  
• 🔧 **TypeScript** - Complete type definitions  

</td>
</tr>
</tbody>
</table>

---

## 🎬 Demo

<div align="center">
<img src="https://img.shields.io/badge/Live%20Demo-Coming%20Soon-orange?style=for-the-badge" alt="Demo" />
</div>

```jsx
// ✨ Just works out of the box!
import { ReactImageMagnifier } from '@hammadxcm/image-magnifier';

<ReactImageMagnifier
  imageSrc="/your-amazing-image.jpg"
  imageWidth={500}
  imageHeight={400}
/>
```

> **🎯 Hover over images to see the magnification effect in action**

---

## 📦 Installation

<table>
<tr>
<th>📦 npm</th>
<th>🧶 yarn</th>
<th>📌 pnpm</th>
</tr>
<tr>
<td>

```bash
npm install @hammadxcm/image-magnifier
```

</td>
<td>

```bash
yarn add @hammadxcm/image-magnifier
```

</td>
<td>

```bash
pnpm add @hammadxcm/image-magnifier
```

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Basic Usage

```jsx
import { ReactImageMagnifier } from '@hammadxcm/image-magnifier';

function ProductImage() {
  return (
    <ReactImageMagnifier
      imageSrc="/product.jpg"
      imageAlt="Product showcase"
      imageWidth={600}
      imageHeight={400}
      magnifierSize={200}
      zoomLevel={2.5}
    />
  );
}
```

### Advanced Usage with Provider

```jsx
import { 
  MagnifierProvider, 
  ReactImageMagnifierAdvanced 
} from '@hammadxcm/image-magnifier';

function App() {
  return (
    <MagnifierProvider theme="modern" performanceMode={false}>
      <ReactImageMagnifierAdvanced
        imageSrc="/hero-image.jpg"
        theme="modern"
        showZoomControls={true}
        showMiniMap={true}
        enableTouch={true}
        watermark="© 2024 Your Brand"
      />
    </MagnifierProvider>
  );
}
```

---

## 💡 Examples

<details>
<summary><strong>🎨 Themed Gallery</strong></summary>

```jsx
import { ReactImageMagnifierAdvanced, MagnifierProvider } from '@hammadxcm/image-magnifier';

function ThemedGallery() {
  return (
    <MagnifierProvider>
      <div className="grid grid-cols-2 gap-4">
        {/* Modern Theme */}
        <ReactImageMagnifierAdvanced
          imageSrc="/image1.jpg"
          theme="modern"
          showZoomControls={true}
          position="follow"
          cursorStyle="zoom-in"
        />
        
        {/* Dark Theme */}
        <ReactImageMagnifierAdvanced
          imageSrc="/image2.jpg"
          theme="dark"
          showMiniMap={true}
          position="fixed-top-right"
          enableTouch={true}
        />
      </div>
    </MagnifierProvider>
  );
}
```

</details>

<details>
<summary><strong>📱 Mobile-Optimized</strong></summary>

```jsx
function MobileGallery() {
  return (
    <ReactImageMagnifierAdvanced
      imageSrc="/mobile-image.jpg"
      enableTouch={true}
      showZoomControls={true}
      theme="modern"
      minZoom={1.5}
      maxZoom={4}
      onZoomChange={(zoom) => console.log(`Zoom: ${zoom}x`)}
      watermark="© 2024 Brand"
    />
  );
}
```

</details>

<details>
<summary><strong>🛍️ E-commerce Product</strong></summary>

```jsx
function ProductShowcase() {
  return (
    <ReactImageMagnifierAdvanced
      imageSrc="/product.jpg"
      theme="classic"
      showZoomControls={true}
      showMiniMap={true}
      watermark="Premium Quality ✨"
      overlayContent={
        <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded">
          🔥 Sale 50% OFF
        </div>
      }
      onMagnifierShow={() => console.log('User examining product')}
    />
  );
}
```

</details>

---

## 🎨 Themes

<div align="center">

### Built-in Theme Showcase

</div>

<table>
<thead>
<tr>
<th align="center">🏛️ Classic</th>
<th align="center">🎯 Modern</th>
<th align="center">🌙 Dark</th>
<th align="center">💎 Neon</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center">Traditional<br/>magnifying glass</td>
<td align="center">Clean, minimalist<br/>blue accents</td>
<td align="center">Perfect for<br/>dark mode</td>
<td align="center">Vibrant pink<br/>highlights</td>
</tr>
<tr>
<td>

```jsx
<ReactImageMagnifierAdvanced
  theme="classic"
  // Warm, traditional styling
/>
```

</td>
<td>

```jsx
<ReactImageMagnifierAdvanced
  theme="modern"
  // Clean blue accents
/>
```

</td>
<td>

```jsx
<ReactImageMagnifierAdvanced
  theme="dark"
  // Subtle dark highlights
/>
```

</td>
<td>

```jsx
<ReactImageMagnifierAdvanced
  theme="neon"
  // Pink/purple vibrancy
/>
```

</td>
</tr>
</tbody>
</table>

### 🎨 Custom Themes

Create your own unique styling:

```jsx
const customTheme = {
  borderColor: 'rgba(255, 0, 0, 0.8)',
  borderWidth: 2,
  shadowColor: 'rgba(255, 0, 0, 0.3)',
  handleColor: 'rgba(255, 0, 0, 0.9)',
  gripColor: 'rgba(200, 0, 0, 0.9)',
  backdropBlur: true,
};

<ReactImageMagnifierAdvanced
  customTheme={customTheme}
  magnifierSize={250}
/>
```

---

## 📖 API

### ReactImageMagnifier (Basic)

<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>imageSrc</code></td>
<td><code>string</code></td>
<td><strong>required</strong></td>
<td>Image source URL</td>
</tr>
<tr>
<td><code>imageAlt</code></td>
<td><code>string</code></td>
<td>-</td>
<td>Alt text for accessibility</td>
</tr>
<tr>
<td><code>imageWidth</code></td>
<td><code>number</code></td>
<td><code>500</code></td>
<td>Image width in pixels</td>
</tr>
<tr>
<td><code>imageHeight</code></td>
<td><code>number</code></td>
<td><code>500</code></td>
<td>Image height in pixels</td>
</tr>
<tr>
<td><code>magnifierSize</code></td>
<td><code>number</code></td>
<td><code>300</code></td>
<td>Magnifier lens size</td>
</tr>
<tr>
<td><code>zoomLevel</code></td>
<td><code>number</code></td>
<td><code>2.5</code></td>
<td>Zoom multiplier</td>
</tr>
<tr>
<td><code>disabled</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Disable magnification</td>
</tr>
</tbody>
</table>

### ReactImageMagnifierAdvanced

<details>
<summary><strong>🔧 View Advanced Props</strong></summary>

<table>
<thead>
<tr>
<th>Prop</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>theme</code></td>
<td><code>'classic' | 'modern' | 'dark' | 'neon'</code></td>
<td><code>'classic'</code></td>
<td>Built-in theme</td>
</tr>
<tr>
<td><code>customTheme</code></td>
<td><code>Partial&lt;MagnifierTheme&gt;</code></td>
<td>-</td>
<td>Custom theme overrides</td>
</tr>
<tr>
<td><code>position</code></td>
<td><code>'follow' | 'fixed-*'</code></td>
<td><code>'follow'</code></td>
<td>Magnifier positioning</td>
</tr>
<tr>
<td><code>cursorStyle</code></td>
<td><code>'crosshair' | 'zoom-in' | 'grab' | 'pointer'</code></td>
<td><code>'crosshair'</code></td>
<td>Cursor style</td>
</tr>
<tr>
<td><code>showZoomControls</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Show +/- buttons</td>
</tr>
<tr>
<td><code>showMiniMap</code></td>
<td><code>boolean</code></td>
<td><code>false</code></td>
<td>Show navigation map</td>
</tr>
<tr>
<td><code>enableKeyboard</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Keyboard shortcuts</td>
</tr>
<tr>
<td><code>enableTouch</code></td>
<td><code>boolean</code></td>
<td><code>true</code></td>
<td>Touch/gesture support</td>
</tr>
<tr>
<td><code>minZoom</code></td>
<td><code>number</code></td>
<td><code>1.5</code></td>
<td>Minimum zoom level</td>
</tr>
<tr>
<td><code>maxZoom</code></td>
<td><code>number</code></td>
<td><code>5</code></td>
<td>Maximum zoom level</td>
</tr>
<tr>
<td><code>watermark</code></td>
<td><code>string | ReactNode</code></td>
<td>-</td>
<td>Watermark content</td>
</tr>
<tr>
<td><code>overlayContent</code></td>
<td><code>ReactNode</code></td>
<td>-</td>
<td>Custom overlay</td>
</tr>
<tr>
<td><code>onMagnifierShow</code></td>
<td><code>() =&gt; void</code></td>
<td>-</td>
<td>Show callback</td>
</tr>
<tr>
<td><code>onMagnifierHide</code></td>
<td><code>() =&gt; void</code></td>
<td>-</td>
<td>Hide callback</td>
</tr>
<tr>
<td><code>onZoomChange</code></td>
<td><code>(zoom: number) =&gt; void</code></td>
<td>-</td>
<td>Zoom change callback</td>
</tr>
</tbody>
</table>

</details>

---

## ⌨️ Controls

<table>
<tr>
<th>🖱️ Mouse/Keyboard</th>
<th>📱 Touch Gestures</th>
</tr>
<tr>
<td>

• **Hover** - Show magnifier  
• **+** or **=** - Zoom in  
• **-** - Zoom out  
• **Escape** - Hide magnifier  

</td>
<td>

• **Tap & Hold** - Show magnifier  
• **Drag** - Move view area  
• **Pinch** - Zoom in/out  
• **Double Tap** - Quick zoom  

</td>
</tr>
</table>

---

## 🚀 Performance

### Multiple Images Optimization

```jsx
<MagnifierProvider performanceMode={true}>
  {images.map(image => (
    <ReactImageMagnifierAdvanced
      key={image.id}
      {...image}
      performanceMode={true}
    />
  ))}
</MagnifierProvider>
```

### Performance Features
- ⚡ **Single Active Magnifier** - Only one renders at a time
- 🎯 **60fps Throttling** - Smooth with rapid movements  
- 🧠 **Smart Re-rendering** - Optimized React patterns
- 📦 **Tree Shaking** - Import only what you need

---

## ♿ Accessibility

Built with accessibility in mind:

- 🔊 **Screen Readers** - Full ARIA label support
- ⌨️ **Keyboard Navigation** - Complete keyboard control  
- 🎯 **Focus Management** - Proper tab order
- 🌗 **High Contrast** - Works with system preferences

---

## 🔧 Advanced Usage

<details>
<summary><strong>🎣 Custom Hooks</strong></summary>

```jsx
import { useMagnifier, useTouch } from '@hammadxcm/image-magnifier';

function CustomMagnifier() {
  const magnifierProps = useMagnifier({
    magnifierSize: 200,
    zoomLevel: 3,
    smoothAnimations: true,
  });
  
  const touchProps = useTouch({
    enabled: true,
    minZoom: 1,
    maxZoom: 5,
    onGesture: (gesture) => {
      console.log('Touch gesture:', gesture);
    },
  });
  
  // Your custom implementation
}
```

</details>

<details>
<summary><strong>🌐 Context Usage</strong></summary>

```jsx
import { useMagnifierContext } from '@hammadxcm/image-magnifier';

function ThemeSelector() {
  const { globalSettings, updateGlobalSettings } = useMagnifierContext();
  
  return (
    <select 
      value={globalSettings.theme}
      onChange={(e) => updateGlobalSettings({ theme: e.target.value })}
    >
      <option value="classic">🏛️ Classic</option>
      <option value="modern">🎯 Modern</option>
      <option value="dark">🌙 Dark</option>
      <option value="neon">💎 Neon</option>
    </select>
  );
}
```

</details>

---

## 🐛 Troubleshooting

<details>
<summary><strong>❓ Common Issues & Solutions</strong></summary>

### 🔍 Magnifier not showing
- ✅ Ensure `imageSrc` is valid and loads successfully
- ✅ Check that `disabled` prop is not set to `true`
- ✅ Verify image dimensions are set correctly

### 📱 Touch not working on mobile
- ✅ Check that `enableTouch` is `true`
- ✅ Ensure `touchEnabled` is enabled in MagnifierProvider
- ✅ Test on actual device, not desktop browser

### ⚡ Performance issues with multiple images
- ✅ Enable `performanceMode` in MagnifierProvider
- ✅ Use `performanceMode={true}` on individual components
- ✅ Consider lazy loading for large galleries

### 🔷 TypeScript errors
- ✅ Ensure React 18+ or 19+ is installed
- ✅ Check that all required props are provided
- ✅ Import types: `import type { ReactImageMagnifierAdvancedProps } from '@hammadxcm/image-magnifier'`

</details>

<details>
<summary><strong>⚛️ Framework Integration</strong></summary>

### Next.js
```jsx
import dynamic from 'next/dynamic';

const ReactImageMagnifier = dynamic(
  () => import('@hammadxcm/image-magnifier').then(mod => mod.ReactImageMagnifier),
  { ssr: false }
);

function ProductPage() {
  return (
    <ReactImageMagnifier
      imageSrc="/product.jpg"
      imageWidth={600}
      imageHeight={400}
    />
  );
}
```

</details>

---

## 🤝 Contributing

<div align="center">
<img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge" alt="Contributions Welcome" />
</div>

### Quick Contributions
- 🐛 [Report bugs](https://github.com/hammadxcm/react-image-magnifier/issues/new?template=bug_report.md)
- 💡 [Request features](https://github.com/hammadxcm/react-image-magnifier/issues/new?template=feature_request.md)
- 📖 Improve documentation
- 🎨 Create custom themes

### Development Setup

```bash
# Clone the repository
git clone https://github.com/hammadxcm/react-image-magnifier.git

# Install dependencies  
npm install

# Build the package
npm run build

# Run tests
npm test
```

---

## 🔮 Roadmap

### 🎯 Coming Soon
- [ ] **🎥 Video Magnification** - Support for video elements
- [ ] **🌐 3D Image Support** - WebGL-based exploration  
- [ ] **🤖 AI-Powered Features** - Smart zoom region detection
- [ ] **🎨 More Themes** - Community-requested designs
- [ ] **✨ Animation Presets** - Pre-built configurations

---

## 📊 Stats

<div align="center">
<img src="https://img.shields.io/github/stars/hammadxcm/react-image-magnifier?style=social" alt="GitHub Stars" />
<img src="https://img.shields.io/npm/dm/@hammadxcm/image-magnifier?style=flat-square&color=success" alt="NPM Downloads" />
<img src="https://img.shields.io/github/issues/hammadxcm/react-image-magnifier?style=flat-square&color=blue" alt="GitHub Issues" />
</div>

---

## 📄 License

**ISC License** - see [LICENSE](LICENSE) file for details.

---

## 💬 Support & Community

### Get Help
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/hammadxcm/react-image-magnifier/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/hammadxcm/react-image-magnifier/discussions)
- 📖 **Documentation**: [Complete Guide](https://github.com/hammadxcm/react-image-magnifier#readme)

### Show Your Support
- ⭐ **Star the repository** to show your support
- 🐦 **Share on social media** 
- 📝 **Write a blog post** about your experience

---

<div align="center">

### 🎉 Thank you for using React Image Magnifier! 🎉

**Made with ❤️ by [hammadxcm](https://github.com/hammadxcm) and the amazing open-source community**

*Crafted with passion • Built for developers • Enhanced by community*

<p>
<a href="https://github.com/hammadxcm">
  <img src="https://img.shields.io/badge/GitHub-hammadxcm-black?style=flat-square&logo=github" alt="GitHub" />
</a>
<a href="https://twitter.com/hammadxcm">
  <img src="https://img.shields.io/badge/Twitter-@hammadxcm-blue?style=flat-square&logo=twitter" alt="Twitter" />
</a>
<a href="https://linkedin.com/in/hammadxcm">
  <img src="https://img.shields.io/badge/LinkedIn-hammadxcm-blue?style=flat-square&logo=linkedin" alt="LinkedIn" />
</a>
</p>

---

<img src="https://img.shields.io/badge/⭐_Star_this_repo_if_it_helped_you!-yellow?style=for-the-badge" alt="Star this repo" />

</div>