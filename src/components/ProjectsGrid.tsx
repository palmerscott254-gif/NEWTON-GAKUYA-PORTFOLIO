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
        
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="mt-8 grid gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          style={{ gridAutoRows: '1fr' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

ProjectsGrid.displayName = 'ProjectsGrid';

export default ProjectsGrid;
