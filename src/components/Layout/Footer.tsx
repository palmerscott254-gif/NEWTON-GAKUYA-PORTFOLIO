import { memo } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, SOCIAL_LINKS, CONTACT_INFO, NAV_LINKS } from '@lib/constants';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-slate-900/80 ring-1 ring-white/10">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary bg-clip-text text-transparent">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Bachelor of Commerce student, Django & React developer, building innovative 
              solutions and creating meaningful digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="hover:text-primary-400 transition-colors"
              >
                📧 {CONTACT_INFO.email}
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="hover:text-primary-400 transition-colors"
              >
                📱 {CONTACT_INFO.phone}
              </a>
              <span className="text-slate-500">
                📍 {CONTACT_INFO.location}
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200">Connect</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-2xl hover:scale-110 transition-transform"
                  aria-label={social.ariaLabel}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Crafted with passion • Designed for excellence
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
