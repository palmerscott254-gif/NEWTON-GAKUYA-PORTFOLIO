import { motion } from 'framer-motion';
import ProjectsGrid from '@components/ProjectsGrid';
import { ANIMATION_VARIANTS } from '@lib/constants';

export default function Projects() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={ANIMATION_VARIANTS.fadeIn}
    >
      <div className="container py-12 md:py-20">
        <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            A collection of my work showcasing web development, UI/UX design, 
            and full-stack applications built with modern technologies.
          </p>
        </motion.div>
      </div>
      <ProjectsGrid />
    </motion.div>
  );
}
