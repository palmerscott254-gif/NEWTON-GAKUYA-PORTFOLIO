import { motion } from 'framer-motion';
import { memo, useMemo, useState, type MouseEvent } from 'react';
import type { Project } from '../types/index';
import { ANIMATION_VARIANTS } from '@lib/constants';
import projectsData from '@data/projects.json';
import { CONTACT_INFO } from '@lib/constants';

interface ProjectsGridProps {
  limit?: number;
  featured?: boolean;
}

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  });

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.015)`
    });
  };

  const onMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    });
  };

  return (
    <motion.article
      variants={ANIMATION_VARIANTS.slideUp}
      custom={index}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      className="glass-card group relative min-h-[420px] overflow-hidden p-6 transition-all duration-500 hover:shadow-[0_24px_80px_-22px_rgba(34,211,238,0.45)] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
      </div>

      {project.image && (
        <div className="relative mb-6 overflow-hidden rounded-xl border border-slate-700/60 bg-black/70">
          <img
            src={project.image}
            alt={project.title + ' screenshot'}
            className="h-auto w-full object-contain transition-all duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="absolute bottom-3 right-3 rounded-full border border-white/25 bg-slate-900/70 px-3 py-1 text-xs uppercase tracking-[0.15em] text-cyan-100 backdrop-blur-lg">
            Preview
          </span>
        </div>
      )}
      {project.icon && (
        <div className="mb-6 text-5xl transition-transform duration-300 group-hover:scale-110" role="img" aria-label={project.title}>
          {project.icon}
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col">
        <h3 className="text-2xl font-black transition-colors duration-300 group-hover:text-cyan-300">{project.title}</h3>
        <p className="mt-4 line-clamp-3 text-base leading-relaxed text-slate-300">{project.description}</p>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-slate-900/35 p-3 text-xs uppercase tracking-[0.14em] text-slate-300">
          <div>
            <p className="text-slate-400">Tech Stack</p>
            <p className="mt-1 text-sm font-bold text-white">{project.tags.length}</p>
          </div>
          <div>
            <p className="text-slate-400">Status</p>
            <p className="mt-1 text-sm font-bold text-emerald-300">Active</p>
          </div>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-cyan-300 ring-1 ring-cyan-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/45 bg-cyan-400/10 px-4 py-2.5 text-sm font-bold text-cyan-100 transition-all duration-300 hover:bg-cyan-400/20 hover:text-white"
          >
            Live Demo
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-bold text-slate-100 transition-all duration-300 hover:border-white/35 hover:bg-white/10"
          >
            GitHub
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 17l8-10m0 0h-5m5 0v5" />
            </svg>
          </a>
        </div>
      </div>
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
