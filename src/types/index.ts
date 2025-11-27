export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  href: string;
  tags: string[];
  icon?: string;
  featured?: boolean;
  image?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: number;
  category?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  location: string;
}
