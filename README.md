# Newton Gakuya — Professional Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://newtongakuya.netlify.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF)](https://vitejs.dev/)

Modern, high-performance portfolio website showcasing full-stack development expertise, business acumen, and creative projects.

## 🚀 Features

- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 📱 **Fully Responsive** - Perfect experience on all devices
- ♿ **Accessible** - WCAG 2.1 compliant
- 🔍 **SEO Optimized** - Comprehensive meta tags and structured data
- 📦 **PWA Ready** - Installable with offline support
- 🎭 **Smooth Animations** - Powered by Framer Motion
- 🎯 **Type Safe** - Full TypeScript implementation
- 🔒 **Secure** - Modern security best practices

## 🛠️ Tech Stack

### Core
- **React 18.3** - UI library with hooks and concurrent features
- **TypeScript 5.6** - Type-safe development
- **Vite 5.4** - Next-generation build tool
- **React Router 6.28** - Client-side routing

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11.2** - Production-ready animation library
- **Custom CSS** - Additional styling and utilities

### Build & Optimization
- **SWC** - Super-fast TypeScript/JavaScript compiler
- **Terser** - JavaScript minification
- **Brotli & Gzip** - Compression for assets
- **PWA Plugin** - Progressive Web App functionality
- **Bundle Analyzer** - Visualize bundle size

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS transformation

## 📁 Project Structure

```
improved-portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── Layout/         # Layout components (Header, Footer)
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Hero.tsx
│   │   ├── ProjectsGrid.tsx
│   │   └── Skills.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── lib/                # Utilities and hooks
│   │   ├── constants.ts    # App-wide constants
│   │   ├── utils.ts        # Utility functions
│   │   └── hooks.ts        # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── data/               # Static data
│   │   └── projects.json
│   ├── styles/             # Global styles
│   │   ├── globals.css
│   │   └── tailwind.css
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/palmerscott254-gif/NEWTON-GAKUYA-PORTFOLIO.git
   cd improved-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR

# Build
npm run build           # Type-check and build for production
npm run preview         # Preview production build locally

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run type-check      # Run TypeScript type checking

# Analysis
npm run analyze         # Analyze bundle size
```

## 🎨 Customization

### Update Personal Information

Edit `src/lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'Your Title',
  description: 'Your description',
  // ... other config
};

export const CONTACT_INFO = {
  email: 'your.email@example.com',
  // ... other contact info
};
```

### Add Projects

Edit `src/data/projects.json`:

```json
[
  {
    "id": "project-id",
    "title": "Project Title",
    "description": "Project description",
    "tags": ["React", "TypeScript"],
    "href": "https://project-url.com",
    "icon": "🚀",
    "featured": true
  }
]
```

### Modify Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#6366f1',
        // ... custom colors
      }
    }
  }
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_FORMSPREE_ID=your_formspree_id
VITE_SITE_URL=https://yoursite.com
VITE_GA_ID=your_google_analytics_id
```

### PWA Configuration

Modify `vite.config.ts` PWA settings:

```typescript
VitePWA({
  manifest: {
    name: 'Your App Name',
    short_name: 'App',
    theme_color: '#your-color',
    // ... other PWA config
  }
})
```

## 📊 Performance Optimizations

- ✅ Code splitting with React.lazy()
- ✅ Route-based lazy loading
- ✅ Image optimization
- ✅ Minification and compression
- ✅ Tree shaking
- ✅ CSS purging
- ✅ Caching strategies
- ✅ Preconnect to external resources

## 🔐 Security Features

- Content Security Policy headers
- HTTPS enforcement
- Secure external links (noopener, noreferrer)
- XSS protection
- CSRF protection for forms

## 📈 SEO Optimizations

- Semantic HTML
- Meta tags (Open Graph, Twitter Cards)
- Structured data (JSON-LD)
- Sitemap and robots.txt
- Canonical URLs
- Optimized images with alt text

## ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Skip to main content link
- Color contrast compliance

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Newton Gakuya**
- Email: newton.gakuya24@students.dkut.ac.ke
- GitHub: [@palmerscott254-gif](https://github.com/palmerscott254-gif)
- LinkedIn: [Newton Gakuya](https://www.linkedin.com/in/gakuya-227148385)

## 🙏 Acknowledgments

- React team for the amazing library
- Vite team for the blazing-fast build tool
- Tailwind CSS for the utility-first framework
- Framer Motion for smooth animations
- All open-source contributors

## 📞 Support

For support, email newton.gakuya24@students.dkut.ac.ke or open an issue on GitHub.

---

Made with ❤️ by Newton Gakuya
