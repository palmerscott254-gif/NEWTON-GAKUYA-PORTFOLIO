import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, SITE_CONFIG } from '@lib/constants';
import { memo } from 'react';

const Hero = memo(() => {
  return (
    <section className="container py-20 md:py-32">
      <motion.div
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-4xl"
      >
        <motion.h1
          variants={ANIMATION_VARIANTS.slideUp}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-primary-400 via-primary-500 to-secondary bg-clip-text text-transparent"
        >
          {SITE_CONFIG.name}
        </motion.h1>
        
        <motion.p
          variants={ANIMATION_VARIANTS.slideUp}
          className="mt-6 text-xl md:text-2xl text-slate-300 font-medium"
        >
          Django, Python & React Developer
        </motion.p>
        
        <motion.p
          variants={ANIMATION_VARIANTS.slideUp}
          className="mt-4 max-w-2xl text-lg text-slate-400 leading-relaxed"
        >
          Bachelor of Commerce student at DKUT. Building robust, scalable applications 
          with modern web technologies and business insight.
        </motion.p>

        <motion.div
          variants={ANIMATION_VARIANTS.slideUp}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="/contact"
            className="btn px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-primary/50 transition-all"
          >
            Get In Touch
          </a>
          <a
            href="/projects"
            className="inline-flex items-center px-8 py-3 text-lg font-semibold rounded-md bg-slate-800/70 text-white shadow-lg hover:bg-slate-700 transition-all ring-1 ring-white/10"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
