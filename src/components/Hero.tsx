import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ANIMATION_VARIANTS, SITE_CONFIG } from '@lib/constants';
import { memo, useEffect, useMemo, useState, type CSSProperties, type MouseEvent } from 'react';

const roles = ['Full-Stack Developer', 'Django Engineer', 'Problem Solver', 'Digital Creator'];

function useTypingRoles(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) {
      return;
    }

    const currentWord = words[wordIndex % words.length] ?? '';
    const typingDelay = isDeleting ? 45 : 85;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentWord.slice(0, displayText.length + 1);
        setDisplayText(nextText);
        if (nextText === currentWord) {
          window.setTimeout(() => setIsDeleting(true), 900);
        }
      } else {
        const nextText = currentWord.slice(0, Math.max(displayText.length - 1, 0));
        setDisplayText(nextText);
        if (!nextText.length) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingDelay);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words]);

  return displayText;
}

const Hero = memo(() => {
  const typedRole = useTypingRoles(roles);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.3 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.3 });

  const glowX = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowY = useTransform(smoothY, (v) => `${v * 100}%`);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: index,
        left: `${(index * 31) % 100}%`,
        top: `${(index * 17 + 8) % 100}%`,
        size: (index % 4) + 2,
        duration: 8 + (index % 5) * 1.2,
        delay: (index % 6) * 0.35
      })),
    []
  );

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    mouseX.set(Math.min(Math.max(x, 0), 1));
    mouseY.set(Math.min(Math.max(y, 0), 1));
  };

  return (
    <section
      className="relative flex min-h-[94vh] items-center overflow-hidden"
      onMouseMove={handlePointerMove}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="absolute left-1/2 top-1/2 h-auto min-h-full min-w-full w-auto -translate-x-1/2 -translate-y-1/2 object-cover scale-110"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/background video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_10%,rgba(34,211,238,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_85%_10%,rgba(59,130,246,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/70 to-black/90" />

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(360px circle at var(--mx) var(--my), rgba(56,189,248,0.25), transparent 65%)',
            '--mx': glowX,
            '--my': glowY
          } as CSSProperties}
        />

        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-cyan-200/60"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size
            }}
            animate={{
              y: [0, -22, 0],
              opacity: [0.2, 0.95, 0.2],
              scale: [1, 1.25, 1]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="container relative z-10 py-20">
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16"
        >
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="flex-1 max-w-3xl space-y-8">
          <motion.h1
            variants={ANIMATION_VARIANTS.slideUp}
            id="hero-title"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]"
          >
            <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">{SITE_CONFIG.name}</span>
            <span className="mt-4 block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 font-extrabold text-3xl md:text-4xl lg:text-5xl">
              Crafting Scalable Digital Experiences
            </span>
          </motion.h1>

          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-slate-900/50 px-4 py-2 font-mono text-sm text-cyan-200 shadow-card backdrop-blur-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.95)]" aria-hidden="true" />
            <span>{typedRole || roles[0]}</span>
            <span className="animate-pulse text-cyan-100" aria-hidden="true">|</span>
          </motion.div>

          <motion.p
            variants={ANIMATION_VARIANTS.slideUp}
            className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed max-w-2xl"
          >
            Django / Python / React developer & Commerce student combining business insight with engineering to build performant, maintainable products.
          </motion.p>

          <motion.p
            variants={ANIMATION_VARIANTS.slideUp}
            className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl"
          >
            Focused on performance, clean architecture, accessibility and delightful user interfaces.

          </motion.p>
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="flex flex-wrap gap-4 pt-4"
          >
            <a
              href="#contact"
              className="magnetic-button group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-glow-lg transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-3">
                Get In Touch
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            <a
              href="#projects"
              className="magnetic-button inline-flex items-center gap-3 rounded-xl bg-white/10 px-8 py-4 text-lg font-bold text-white shadow-premium ring-1 ring-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:ring-white/30 active:scale-95"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-glow" />
              View Projects
            </a>
          </motion.div>
          </motion.div>

          <motion.div
            variants={ANIMATION_VARIANTS.scaleIn}
            className="flex-1 flex items-center justify-center lg:justify-end"
          >
            <div className="relative group">
              <motion.div
                aria-hidden="true"
                className="absolute -inset-10 rounded-full bg-gradient-to-tr from-blue-500/50 via-cyan-300/35 to-blue-600/50 blur-3xl"
                animate={{ rotate: [0, 360], scale: [0.95, 1.08, 0.95] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute -inset-4 rounded-full border border-cyan-300/45"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              />
            <motion.img
              src="/profilep.jpg"
              alt={SITE_CONFIG.name + ' profile'}
              className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-premium ring-4 ring-white/30 group-hover:ring-cyan-400/50 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              whileHover={{ scale: 1.03, rotate: -1.5 }}
            />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
