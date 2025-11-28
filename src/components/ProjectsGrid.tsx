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
      className="card p-4 sm:p-6 group hover:scale-[1.03] active:scale-95 transition-transform duration-300 min-h-[320px] flex flex-col justify-between"
      style={{ backdropFilter: 'blur(20px)', background: 'linear-gradient(135deg, rgba(30,41,59,0.85) 60%, rgba(51,65,85,0.7) 100%)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25), 0 1.5px 8px 0 rgba(80,200,255,0.08)' }}
    >
      {project.image && (
        <img
          src={project.image}
          alt={project.title + ' screenshot'}
          className="w-full h-auto object-contain rounded-lg mb-4 border border-slate-700 shadow bg-slate-800/50"
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

  console.log('ProjectsGrid rendering, projects count:', projects.length);

  if (projects.length === 0) {
    return <div className="text-white text-center py-8">No projects found.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
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
