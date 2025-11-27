import type { ContactInfo, SocialLink } from '../types/index';

export const SITE_CONFIG = {
  name: 'Newton Gakuya',
  title: 'Newton Gakuya — Django & React Developer Portfolio',
  description: 'Bachelor of Commerce student at DKUT specializing in Django, Python, and React development. Professional portfolio showcasing full-stack web projects and business acumen.',
  url: 'https://newtongakuya.netlify.app',
  author: 'Newton Gakuya',
  email: 'newton.gakuya24@students.dkut.ac.ke',
  keywords: ['Newton Gakuya', 'Django', 'React', 'Python', 'Full Stack', 'DKUT', 'Commerce Student', 'Web Developer']
} as const;

export const CONTACT_INFO: ContactInfo = {
  email: 'newton.gakuya24@students.dkut.ac.ke',
  phone: '+254706271001',
  whatsapp: '+254114110791',
  linkedin: 'https://www.linkedin.com/in/gakuya-227148385',
  github: 'https://github.com/palmerscott254-gif',
  location: 'Dedan Kimathi University of Technology, Kenya'
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: CONTACT_INFO.github,
    icon: '🐙',
    ariaLabel: 'Visit my GitHub profile'
  },
  {
    name: 'LinkedIn',
    url: CONTACT_INFO.linkedin,
    icon: '💼',
    ariaLabel: 'Connect on LinkedIn'
  },
  {
    name: 'Email',
    url: `mailto:${CONTACT_INFO.email}`,
    icon: '📧',
    ariaLabel: 'Send me an email'
  },
  {
    name: 'WhatsApp',
    url: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}`,
    icon: '💬',
    ariaLabel: 'Chat on WhatsApp'
  }
];

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' }
] as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
} as const;
