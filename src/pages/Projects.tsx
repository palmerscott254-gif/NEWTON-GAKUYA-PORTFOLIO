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
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Projects Command Center</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Interactive engineering showcase</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          The live demos, framework analysis, feature panels, and preview mode are designed to reveal the work behind each project while keeping the experience fast and screenshot-free.
        </p>
      </motion.div>
      <ProjectsGrid />
    </motion.div>
  );
}
