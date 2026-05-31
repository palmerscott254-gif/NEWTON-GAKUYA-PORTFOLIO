import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState, useEffect, type MouseEvent } from 'react';
import { NAV_LINKS } from '@lib/constants';
import { useScrollPosition } from '@lib/hooks';
import { scrollToElement } from '@lib/utils';

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

  const navLinkClass = `group relative py-2 px-1 font-semibold text-slate-300 hover:text-white transition-colors`;

  const handleNavClick = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const targetId = path.startsWith('#') ? path.slice(1) : path;
    scrollToElement(targetId);
    window.history.pushState(null, '', path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/70 shadow-premium ring-1 ring-cyan-100/10'
          : 'bg-slate-950/40 ring-1 ring-white/5'
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <a
          href="#hero"
          onClick={handleNavClick('#hero')}
          className="font-extrabold tracking-tight text-xl md:text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all"
        >
          NG
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.path} href={link.path} onClick={handleNavClick(link.path)} className={`${navLinkClass}`}>
              <span className="relative">
                {link.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
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
            className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md"
          >
            <div className="container py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={handleNavClick(link.path)}
                  className={`py-3 px-4 rounded-lg transition-all text-slate-300 hover:bg-white/5 hover:text-white`}
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
