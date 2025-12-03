import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS, SITE_CONFIG, CONTACT_INFO } from '@lib/constants';

export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={ANIMATION_VARIANTS.staggerContainer}
    >
      <section className="container py-20 md:py-32">
        <motion.div variants={ANIMATION_VARIANTS.slideUp} className="max-w-4xl mx-auto">
          <h1 className="section-heading mb-12">About Me</h1>

          <div className="space-y-6 text-lg md:text-xl text-slate-200 leading-relaxed">
            <motion.p variants={ANIMATION_VARIANTS.slideUp}>
              I'm <span className="text-cyan-400 font-bold">{SITE_CONFIG.name}</span>, 
              a Bachelor of Commerce student at Dedan Kimathi University of Technology (DKUT), 
              where I am building a strong foundation in business, finance, and management.
            </motion.p>

            <motion.p variants={ANIMATION_VARIANTS.slideUp}>
              My studies have equipped me with analytical, problem-solving, and teamwork skills 
              that I apply in both academic projects and practical experiences. I am particularly 
              interested in <span className="text-blue-400 font-semibold">accounting and finance</span>, and 
              passionate about leveraging my knowledge to create innovative solutions.
            </motion.p>

            <motion.p variants={ANIMATION_VARIANTS.slideUp}>
              Outside academics, I specialize in <span className="text-cyan-400 font-semibold">web development</span> with 
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
            className="mt-16 grid gap-6 sm:grid-cols-2"
          >
            <div className="glass-card p-8 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎓</div>
              <h3 className="text-xl font-black text-cyan-400 mb-3">Education</h3>
              <p className="text-slate-200 font-semibold">Bachelor of Commerce</p>
              <p className="text-sm text-slate-400 mt-2">
                Dedan Kimathi University of Technology
              </p>
            </div>

            <div className="glass-card p-8 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📍</div>
              <h3 className="text-xl font-black text-cyan-400 mb-3">Location</h3>
              <p className="text-slate-200 font-semibold">{CONTACT_INFO.location}</p>
            </div>

            <div className="glass-card p-8 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💼</div>
              <h3 className="text-xl font-black text-cyan-400 mb-3">Focus Areas</h3>
              <ul className="space-y-2 text-slate-200 font-medium">
                <li>• Full-Stack Development</li>
                <li>• Financial Analysis</li>
                <li>• Business Strategy</li>
              </ul>
            </div>

            <div className="glass-card p-8 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-xl font-black text-cyan-400 mb-3">Interests</h3>
              <ul className="space-y-2 text-slate-200 font-medium">
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
