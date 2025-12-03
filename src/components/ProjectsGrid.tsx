import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
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
      className="glass-card p-6 sm:p-8 group hover:scale-[1.02] active:scale-98 transition-all duration-500 min-h-[380px] flex flex-col justify-between"
    >
      {project.image && (
        <img
          src={project.image}
          alt={project.title + ' screenshot'}
          className="w-full h-auto object-contain rounded-xl mb-6 border border-slate-700/60 shadow-premium bg-black/70 group-hover:border-cyan-500/40 transition-all duration-500"
          loading="lazy"
        />
      )}
      {project.icon && (
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300" role="img" aria-label={project.title}>
          {project.icon}
        </div>
      )}
      <h3 className="text-2xl font-black group-hover:text-cyan-400 transition-colors duration-300">
        {project.title}
      </h3>
      <p className="mt-4 text-slate-300 leading-relaxed line-clamp-3 text-base">
        {project.description}
      </p>
      {project.tags && project.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 ring-1 ring-cyan-500/30 uppercase tracking-wide"
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
        className="inline-flex items-center mt-6 text-cyan-400 font-bold hover:text-cyan-300 transition-all group-hover:gap-3 gap-2 text-base"
      >
        View Project
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
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

  if (projects.length === 0) {
    return <div className="text-white text-center py-8">No projects found.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:gap-10">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <ProjectCard project={project} index={index} />
        </motion.div>
      ))}
    </div>
  );
});

ProjectsGrid.displayName = 'ProjectsGrid';

export default ProjectsGrid;
