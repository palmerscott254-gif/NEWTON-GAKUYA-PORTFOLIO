import type { ContactInfo, SocialLink } from '../types/index';
import {
  Atom,
  Binary,
  Box,
  BriefcaseBusiness,
  Code2,
  Database,
  Flame,
  GitBranch,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  MessageCircleMore,
  Server,
  Sparkles
} from 'lucide-react';

export const SITE_CONFIG = {
  name: 'Newton Gakuya',
  title: 'Newton Gakuya — Premium Developer Portfolio',
  description: 'Premium portfolio for Newton Gakuya, a Business & Technology enthusiast building scalable digital products, AI-powered applications, and modern web experiences.',
  url: 'https://newtongakuya.netlify.app',
  author: 'Newton Gakuya',
  email: 'newton.gakuya24@students.dkut.ac.ke',
  keywords: ['Newton Gakuya', 'React', 'Next.js', 'Python', 'Full Stack', 'DKUT', 'Business Intelligence', 'FinTech', 'Web Developer']
} as const;

export const CONTACT_INFO: ContactInfo = {
  email: 'newton.gakuya24@students.dkut.ac.ke',
  phone: '+254706271001',
  whatsapp: '+254114110791',
  linkedin: 'https://www.linkedin.com/in/gakuya-227148385',
  github: 'https://github.com/palmerscott254-gif',
  location: 'Nyeri, Kenya'
};

export const CURRENT_MISSION = 'Building scalable digital products that combine business strategy, technology, and user-centered design to solve real-world problems.';

export const FOCUS_AREAS = [
  'Full-Stack Web Development',
  'FinTech Solutions',
  'Business Intelligence & Analytics',
  'AI-Powered Applications',
  'Digital Product Development'
] as const;

export const INTERESTS = [
  'Poetry & Creative Writing',
  'Strategic Thinking (Chess)',
  'Entrepreneurship',
  'Emerging Technologies & AI',
  'Rugby & Team Leadership'
] as const;

export const PROFILE_CARDS = [
  {
    title: 'Education',
    icon: <GraduationCap className="h-5 w-5" />,
    headline: 'Bachelor of Commerce (B.Com)',
    body: 'Dedan Kimathi University of Technology',
    detail: 'Business & Technology Enthusiast'
  },
  {
    title: 'Location',
    icon: <MapPin className="h-5 w-5" />,
    headline: 'Nyeri, Kenya',
    body: 'Available for Remote Work & Collaborations',
    detail: 'Open to product teams, founders, and agencies'
  },
  {
    title: 'Focus Areas',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    headline: 'Strategic product engineering',
    body: 'Full-stack systems that align business goals with modern user experiences.',
    detail: 'FinTech, analytics, AI, and digital product development',
    items: FOCUS_AREAS
  },
  {
    title: 'Interests',
    icon: <Sparkles className="h-5 w-5" />,
    headline: 'Creative and strategic thinking',
    body: 'Poetry, chess, entrepreneurship, emerging technologies, and rugby leadership.',
    detail: 'Balancing craft, discipline, and curiosity',
    items: INTERESTS
  }
] as const;

export const TECH_STACK = [
  { name: 'React', icon: <Atom className="h-4 w-4" /> },
  { name: 'Next.js', icon: <Sparkles className="h-4 w-4" /> },
  { name: 'Node.js', icon: <Server className="h-4 w-4" /> },
  { name: 'Python', icon: <Binary className="h-4 w-4" /> },
  { name: 'Firebase', icon: <Flame className="h-4 w-4" /> },
  { name: 'MySQL', icon: <Database className="h-4 w-4" /> },
  { name: 'Git', icon: <GitBranch className="h-4 w-4" /> },
  { name: 'Docker', icon: <Box className="h-4 w-4" /> }
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: CONTACT_INFO.github,
    icon: <Code2 className="h-5 w-5" />,
    ariaLabel: 'Visit my GitHub profile'
  },
  {
    name: 'LinkedIn',
    url: CONTACT_INFO.linkedin,
    icon: <Link2 className="h-5 w-5" />,
    ariaLabel: 'Connect on LinkedIn'
  },
  {
    name: 'Email',
    url: `mailto:${CONTACT_INFO.email}`,
    icon: <Mail className="h-5 w-5" />,
    ariaLabel: 'Send me an email'
  },
  {
    name: 'WhatsApp',
    url: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}`,
    icon: <MessageCircleMore className="h-5 w-5" />,
    ariaLabel: 'Chat on WhatsApp'
  }
];

export const NAV_LINKS = [
  { path: '#hero', label: 'Home' },
  { path: '#about', label: 'About' },
  { path: '#skills', label: 'Skills' },
  { path: '#projects', label: 'Projects' },
  { path: '#contact', label: 'Contact' }
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
