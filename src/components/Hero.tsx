import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, SITE_CONFIG } from '@lib/constants';
import { memo } from 'react';

const Hero = memo(() => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover scale-105"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/background video.mp4" type="video/mp4" />
        </video>
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
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
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]"
          >
            <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">{SITE_CONFIG.name}</span>
            <span className="mt-4 block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 font-extrabold text-3xl md:text-4xl lg:text-5xl">
              Crafting Scalable Digital Experiences
            </span>
          </motion.h1>

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
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white shadow-glow-lg hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
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
              href="/projects"
              className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-xl bg-white/10 backdrop-blur-md text-white shadow-premium ring-1 ring-white/20 hover:bg-white/20 hover:ring-white/30 hover:scale-105 active:scale-95 transition-all duration-300"
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
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-500/50 via-cyan-500/30 to-blue-600/50 blur-2xl animate-glow" />
            <motion.img
              src="/profilep.jpg"
              alt={SITE_CONFIG.name + ' profile'}
              className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-premium ring-4 ring-white/30 group-hover:ring-cyan-400/50 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
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
