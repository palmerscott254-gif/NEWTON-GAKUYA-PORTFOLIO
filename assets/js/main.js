/**
 * Newton Gakuya Portfolio - Main JavaScript
 * Modern, performance-optimized interactive features
 */

'use strict';

// ========================================
// 1. UTILITY FUNCTIONS
// ========================================

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ========================================
// 2. SCROLL PROGRESS BAR
// ========================================

const initScrollProgress = () => {
  const scrollProgress = document.getElementById('scrollProgress');
  if (!scrollProgress) return;

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', throttle(updateProgress, 10));
};

// ========================================
// 3. SCROLL TO TOP BUTTON
// ========================================

const initScrollToTop = () => {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', throttle(toggleVisibility, 100));

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// ========================================
// 4. MOBILE NAVIGATION
// ========================================

const initMobileNav = () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navLinks) return;

  // Toggle menu
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when link is clicked
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });
};

// ========================================
// 5. ACTIVE NAVIGATION LINK
// ========================================

const initActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const setActiveLink = () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.substring(1) === current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', throttle(setActiveLink, 100));
  setActiveLink(); // Set initial active state
};

// ========================================
// 6. NAVBAR SCROLL EFFECT
// ========================================

const initNavbarScroll = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', throttle(handleScroll, 100));
};

// ========================================
// 7. SKILL BARS ANIMATION
// ========================================

const initSkillBars = () => {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        
        progressBars.forEach((bar, index) => {
          setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
          }, index * 100); // Staggered animation
        });

        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillObserver.observe(skillsSection);
};

// ========================================
// 8. ANIMATED COUNTER FOR STATS
// ========================================

const initStatCounters = () => {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number');
        
        counters.forEach((counter, index) => {
          const target = parseInt(counter.getAttribute('data-target'));
          setTimeout(() => {
            animateCounter(counter, target);
          }, index * 200); // Staggered animation
        });

        statObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statObserver.observe(statsSection);
};

// ========================================
// 9. SECTION FADE-IN ANIMATION
// ========================================

const initFadeInAnimations = () => {
  const elements = document.querySelectorAll('section, .project-card, .skill-category, .hobby-card, .timeline-item');
  
  if (!elements.length) return;

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });
};

// ========================================
// 10. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

const initSmoothScroll = () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// ========================================
// 11. FORM SUBMISSION HANDLER
// ========================================

const initFormHandler = () => {
  const contactForm = document.querySelector('#contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    
    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.style.background = 'linear-gradient(135deg, var(--secondary), var(--accent))';
      submitBtn.disabled = true;

      // Re-enable after form submission completes
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });
};

// ========================================
// 12. PROJECT CARD HOVER EFFECTS
// ========================================

const initProjectCards = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
};

// ========================================
// 13. PARALLAX EFFECT FOR HERO
// ========================================

const initParallax = () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const handleParallax = () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  };

  window.addEventListener('scroll', throttle(handleParallax, 10));
};

// ========================================
// 14. SERVICE WORKER REGISTRATION
// ========================================

const initServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
};

// ========================================
// 15. LAZY LOADING IMAGES
// ========================================

const initLazyLoading = () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
};

// ========================================
// 16. KEYBOARD NAVIGATION ENHANCEMENT
// ========================================

const initKeyboardNav = () => {
  // Add keyboard support for project cards
  const interactiveElements = document.querySelectorAll('.project-card, .hobby-card, .skill-category');
  
  interactiveElements.forEach(element => {
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        element.click();
      }
    });
  });
};

// ========================================
// 17. PERFORMANCE MONITORING
// ========================================

const initPerformanceMonitoring = () => {
  if ('PerformanceObserver' in window) {
    // Monitor largest contentful paint
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('Performance monitoring not supported');
    }
  }
};

// ========================================
// 18. INITIALIZE ALL FEATURES
// ========================================

const init = () => {
  // Core navigation and UI
  initScrollProgress();
  initScrollToTop();
  initMobileNav();
  initActiveNav();
  initNavbarScroll();
  
  // Animations and interactions
  initSkillBars();
  initStatCounters();
  initFadeInAnimations();
  initSmoothScroll();
  initProjectCards();
  initParallax();
  
  // Form and accessibility
  initFormHandler();
  initKeyboardNav();
  
  // Performance optimizations
  initLazyLoading();
  initServiceWorker();
  initPerformanceMonitoring();
  
  // Page load fade-in
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
};

// ========================================
// 19. DOM CONTENT LOADED
// ========================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ========================================
// 20. ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    debounce,
    throttle
  };
}
