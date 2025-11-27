import { motion } from 'framer-motion';
import { memo } from 'react';
import { ANIMATION_VARIANTS } from '@lib/constants';

const Skills = memo(() => {
  return (
    <section className="container py-12 md:py-16">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={ANIMATION_VARIANTS.staggerContainer}
      >
        <motion.h2
          variants={ANIMATION_VARIANTS.slideUp}
          className="text-3xl md:text-4xl font-bold mb-8"
        >
          Skills & Expertise
        </motion.h2>
        
        <motion.div
          variants={ANIMATION_VARIANTS.slideUp}
          className="glass-card p-6 md:p-8 space-y-6"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-slate-300">
              As a <strong className="text-primary-300">full-stack developer</strong> with expertise in <strong className="text-primary-300">Django</strong>, <strong className="text-primary-300">Python</strong>, and <strong className="text-primary-300">React</strong>, I specialize in building scalable web applications with clean architecture and modern design patterns. My technical foundation includes advanced proficiency in <strong className="text-primary-300">HTML</strong>, <strong className="text-primary-300">CSS</strong>, and <strong className="text-primary-300">JavaScript</strong>, enabling me to craft responsive, performant user interfaces.
            </p>
            
            <p className="text-lg leading-relaxed text-slate-300">
              Beyond pure development, I bring a unique perspective from my background in <strong className="text-primary-300">Business & Commerce</strong>, with hands-on experience in <strong className="text-primary-300">financial analysis</strong>, <strong className="text-primary-300">accounting</strong>, <strong className="text-primary-300">financial management</strong>, and <strong className="text-primary-300">business advising</strong>. This combination allows me to understand both the technical implementation and the business value behind every feature.
            </p>
            
            <p className="text-lg leading-relaxed text-slate-300">
              I excel in <strong className="text-primary-300">leadership</strong> roles, driving teams toward common goals through effective <strong className="text-primary-300">communication</strong> and <strong className="text-primary-300">teamwork</strong>. My approach emphasizes <strong className="text-primary-300">strategic thinking</strong>, balancing immediate technical needs with long-term scalability and maintainability.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
