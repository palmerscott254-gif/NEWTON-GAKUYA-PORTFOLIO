import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, SITE_CONFIG } from '@lib/constants';
import { memo } from 'react';

const Hero = memo(() => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <motion.div
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="initial"
        animate="animate"
        className="container relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12"
      >
        <motion.div variants={ANIMATION_VARIANTS.slideUp} className="flex-1 max-w-3xl">
          <motion.h1
            variants={ANIMATION_VARIANTS.slideUp}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
          >
            <span className="block gradient-text drop-shadow-lg">{SITE_CONFIG.name}</span>
            <span className="mt-4 block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-primary-300 to-primary-500 font-extrabold text-2xl md:text-3xl">
              Crafting Scalable Digital Experiences
            </span>
          </motion.h1>
          <motion.p
            variants={ANIMATION_VARIANTS.slideUp}
            className="mt-6 text-lg md:text-xl text-slate-300 font-medium leading-relaxed"
          >
            Django / Python / React developer & Commerce student combining business insight with engineering to build performant, maintainable products.
          </motion.p>
          <motion.p
            variants={ANIMATION_VARIANTS.slideUp}
            className="mt-4 text-slate-400 leading-relaxed max-w-xl"
          >
            Focused on performance, clean architecture, accessibility and delightful user interfaces.
          </motion.p>
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-secondary text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.7)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-white/10 transition-opacity" />
              <span>Get In Touch</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-xl bg-slate-800/70 backdrop-blur-md text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] ring-1 ring-white/10 hover:bg-slate-700/80 hover:ring-white/20 hover:scale-[1.03] active:scale-[0.97] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              View Projects
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          variants={ANIMATION_VARIANTS.scaleIn}
          className="flex-1 flex items-center justify-center"
        >
          <div className="profile-frame relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary-500/40 via-primary-400/20 to-secondary/40 blur-xl animate-gradientShift" />
            <motion.img
              src="/profilep.jpg"
              alt={SITE_CONFIG.name + ' profile'}
              className="relative z-10 w-56 h-56 md:w-64 md:h-64 object-cover rounded-full shadow-xl ring-2 ring-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
