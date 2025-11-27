# Newton Gakuya - Professional Portfolio

[![Netlify Status](https://img.shields.io/badge/Deployed-Netlify-00C7B7?logo=netlify)](https://newtongakuya.netlify.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-Enabled-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)

## 🎯 Overview

A modern, responsive, and accessible portfolio website showcasing my journey as a Bachelor of Commerce student, programmer, web developer, and poet. This portfolio demonstrates my skills in frontend development, business acumen, and creative expression.

## ✨ Features

### 🚀 Modern UI/UX
- **Stunning Animations**: Smooth fade-ins, hover effects, and floating elements
- **Gradient Design**: Cyberpunk-inspired color scheme with neon accents
- **Interactive Elements**: Dynamic skill bars, animated counters, and scroll effects
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)

### ⚡ Performance
- **Progressive Web App (PWA)**: Installable and works offline
- **Service Worker**: Caching for faster load times
- **Optimized Images**: Lazy loading for better performance
- **Minimal Dependencies**: Pure vanilla JavaScript (no frameworks)

### ♿ Accessibility
- **WCAG Compliant**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Proper alt text and descriptions
- **Skip Links**: Quick navigation for assistive technologies
- **Reduced Motion Support**: Respects user preferences

### 🎨 Sections
1. **Hero Section**: Eye-catching introduction with profile picture and CTA buttons
2. **About Me**: Detailed background and aspirations
3. **Skills**: Interactive skill bars across Programming, Business, and Soft Skills
4. **Statistics**: Animated counters showing achievements
5. **Projects**: Featured work with tags and links
6. **Poetry**: Creative writing timeline
7. **Hobbies**: Personal interests and activities
8. **Contact**: Multiple contact methods and working contact form
9. **Chatbot**: Interactive chat widget for visitor engagement

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript ES6+**: Interactive features and animations
- **PWA**: Service Worker, Web Manifest
- **Formspree**: Contact form backend

## 📁 Project Structure

```
improved portfolio/
├── index.html          # Main HTML file
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── profilep.jpg       # Profile picture
├── README.md          # Documentation
└── icons/             # PWA icons folder
```

## 🚀 Quick Start

### Local Development

1. Clone or download this repository:
```bash
git clone https://github.com/palmerscott254-gif/portfolio.git
cd portfolio
```

2. Open `index.html` in your browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

3. Or use a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
```

Then visit `http://localhost:8000`

### Deployment

#### Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Deploy with default settings

#### GitHub Pages
1. Push to GitHub
2. Go to Settings > Pages
3. Select branch and deploy

#### Vercel
1. Import project from GitHub
2. Deploy with one click

## 🎨 Customization

### Colors
Edit CSS variables in the `:root` selector:
```css
:root {
  --primary: #00ffff;
  --primary-dark: #00cccc;
  --secondary: #0099ff;
  --accent: #ff00ff;
  --dark-bg: rgba(0, 0, 0, 0.85);
  --card-bg: rgba(15, 15, 35, 0.9);
  --text-light: #e0e0e0;
}
```

### Content
- Update personal information in HTML
- Replace `profilep.jpg` with your photo
- Update project links and descriptions
- Modify contact form endpoint in `<form>` action

### SEO
- Update `<title>` and meta descriptions
- Change canonical URL to your domain
- Update Open Graph and Twitter card meta tags
- Modify schema.org structured data

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Load Time**: < 2 seconds
- **First Contentful Paint**: < 1 second
- **Mobile Friendly**: 100%

## 🔧 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ⚠️ IE 11 (limited support, no animations)

## 📝 TODO / Future Enhancements

- [ ] Add blog section
- [ ] Integrate with GitHub API for dynamic project display
- [ ] Add dark/light theme toggle
- [ ] Implement particle.js for background effects
- [ ] Add more project case studies
- [ ] Create custom 404 page
- [ ] Add analytics (Google Analytics or Plausible)
- [ ] Implement i18n for multiple languages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: newton.gakuya24@students.dkut.ac.ke
- **GitHub**: [@palmerscott254-gif](https://github.com/palmerscott254-gif)
- **LinkedIn**: [Newton Gakuya](https://www.linkedin.com/in/gakuya-227148385)
- **Phone**: +254 706 271001
- **WhatsApp**: [Chat](https://wa.me/254114110791)

## 🙏 Acknowledgments

- Dedan Kimathi University of Technology
- Open source community
- Design inspiration from modern web portfolios

---

**Made with ❤️ by Newton Gakuya** | © 2025 All Rights Reserved
