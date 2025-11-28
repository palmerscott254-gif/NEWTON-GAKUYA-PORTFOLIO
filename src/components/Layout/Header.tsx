import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState, useEffect } from 'react';
import { NAV_LINKS } from '@lib/constants';
import { useScrollPosition } from '@lib/hooks';

const Header = memo(() => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScrollPosition();
  const isScrolled = scrollY > 50;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinkClass = `relative py-2 px-1 font-medium transition-colors text-slate-300 hover:text-white`;

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 shadow-lg ring-1 ring-white/10'
          : 'bg-slate-900/60 ring-1 ring-white/5'
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <a
          href="#hero"
          className="font-extrabold tracking-tight text-xl md:text-2xl bg-gradient-to-r from-primary-400 to-secondary bg-clip-text text-transparent hover:from-primary-300 hover:to-secondary-400 transition-all"
        >
          NG
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.path} href={link.path} className={navLinkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-md"
          >
            <div className="container py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-md transition-colors text-slate-300 hover:bg-slate-800 hover:text-white`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
