import { motion } from 'framer-motion';
import ProjectsGrid from '@components/ProjectsGrid';
import { ANIMATION_VARIANTS } from '@lib/constants';

export default function Projects() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={ANIMATION_VARIANTS.fadeIn}
      className="container py-12 md:py-20"
    >
      <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-12">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Projects</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Selected products, platforms, and systems.</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          A cleaner, more credible presentation that puts the project preview first and tells a sharper story about what was built, why it matters, and how it works.
        </p>
      </motion.div>
      <ProjectsGrid />
    </motion.div>
  );
}
