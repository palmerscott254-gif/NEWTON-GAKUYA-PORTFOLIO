import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, SITE_CONFIG, CONTACT_INFO } from '@lib/constants';

export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={ANIMATION_VARIANTS.staggerContainer}
    >
      <section className="container py-12 md:py-20">
        <motion.div variants={ANIMATION_VARIANTS.slideUp} className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">About Me</h1>

          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <motion.p variants={ANIMATION_VARIANTS.slideUp}>
              I'm <span className="text-primary-400 font-semibold">{SITE_CONFIG.name}</span>, 
              a Bachelor of Commerce student at Dedan Kimathi University of Technology (DKUT), 
              where I am building a strong foundation in business, finance, and management.
            </motion.p>

            <motion.p variants={ANIMATION_VARIANTS.slideUp}>
              My studies have equipped me with analytical, problem-solving, and teamwork skills 
              that I apply in both academic projects and practical experiences. I am particularly 
              interested in <span className="text-primary-400">accounting and finance</span>, and 
              passionate about leveraging my knowledge to create innovative solutions.
            </motion.p>

            <motion.p variants={ANIMATION_VARIANTS.slideUp}>
              Outside academics, I specialize in <span className="text-secondary">web development</span> with 
              a focus on Django, Python, and React. I build full-stack applications and websites that 
              combine functionality with elegant design. My unique blend of business acumen and technical 
              expertise allows me to approach problems from multiple angles.
            </motion.p>

            <motion.p variants={ANIMATION_VARIANTS.slideUp}>
              I'm also a creative poet who loves expressing emotions through words, blending my 
              analytical and creative sides to create meaningful work.
            </motion.p>
          </div>

          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary-400 mb-3">🎓 Education</h3>
              <p className="text-slate-300">Bachelor of Commerce</p>
              <p className="text-sm text-slate-400 mt-1">
                Dedan Kimathi University of Technology
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary-400 mb-3">📍 Location</h3>
              <p className="text-slate-300">{CONTACT_INFO.location}</p>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary-400 mb-3">💼 Focus Areas</h3>
              <ul className="space-y-1 text-slate-300">
                <li>• Full-Stack Development</li>
                <li>• Financial Analysis</li>
                <li>• Business Strategy</li>
              </ul>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-primary-400 mb-3">🎯 Interests</h3>
              <ul className="space-y-1 text-slate-300">
                <li>• Creative Writing</li>
                <li>• Rugby & Chess</li>
                <li>• Tech Innovation</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}
