import { motion } from 'framer-motion';
import { memo, useMemo, useState } from 'react';
import type { Project } from '../types/index';
import { ANIMATION_VARIANTS } from '@lib/constants';
import projectsData from '@data/projects.json';

interface ProjectsGridProps {
  limit?: number;
  featured?: boolean;
}

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.article
      variants={ANIMATION_VARIANTS.slideUp}
      custom={index}
      className="card p-4 sm:p-6 group hover:scale-[1.03] active:scale-95 transition-transform duration-300 min-h-[320px] flex flex-col justify-between"
      style={{ backdropFilter: 'blur(20px)', background: 'linear-gradient(135deg, rgba(30,41,59,0.85) 60%, rgba(51,65,85,0.7) 100%)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25), 0 1.5px 8px 0 rgba(80,200,255,0.08)' }}
    >
      {project.image && (
        <img
          src={project.image}
          alt={project.title + ' screenshot'}
          className="w-full h-48 object-cover rounded-lg mb-4 border border-slate-700 shadow"
          loading="lazy"
        />
      )}
      {project.icon && (
        <div className="text-4xl mb-4" role="img" aria-label={project.title}>
          {project.icon}
        </div>
      )}
      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="mt-3 text-slate-300 leading-relaxed line-clamp-3">
        {project.description}
      </p>
      {project.tags && project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary-300 ring-1 ring-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-6 text-primary-400 font-semibold hover:text-primary-300 transition-colors group-hover:gap-2 gap-1"
      >
        View Project
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';


const ProjectsGrid = memo(({ limit, featured = false }: ProjectsGridProps) => {
  const projects = useMemo(() => {
    let filteredProjects = projectsData as Project[];
    if (featured) {
      filteredProjects = filteredProjects.filter((p) => p.featured);
    }
    if (limit) {
      filteredProjects = filteredProjects.slice(0, limit);
    }
    return filteredProjects;
  }, [limit, featured]);

  const [current, setCurrent] = useState(0);

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));

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
          className="text-3xl md:text-4xl font-bold"
        >
          {featured ? 'Featured Projects' : 'All Projects'}
        </motion.h2>

        <div className="mt-8 flex flex-col items-center">
          <motion.div
            key={projects[current]?.id}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-2xl"
          >
            <ProjectCard project={projects[current]} index={current} />
          </motion.div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded bg-slate-700 text-white hover:bg-slate-600 transition"
              aria-label="Previous Project"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded bg-slate-700 text-white hover:bg-slate-600 transition"
              aria-label="Next Project"
            >
              Next
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${current === idx ? 'bg-primary-400' : 'bg-slate-500'} transition`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
});

ProjectsGrid.displayName = 'ProjectsGrid';

export default ProjectsGrid;
