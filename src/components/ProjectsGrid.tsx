import { motion, useReducedMotion } from 'framer-motion';
import { memo, useMemo } from 'react';
import type { Project } from '../types/index';
import { ANIMATION_VARIANTS, CONTACT_INFO } from '@lib/constants';
import projectsData from '@data/projects.json';

interface ProjectsGridProps {
  limit?: number;
  featured?: boolean;
}

interface ProjectStory {
  valueProp: string;
  audience: string;
  summary: string;
  achievements: string[];
  highlights: string[];
}

const PROJECT_STORIES: Record<string, ProjectStory> = {
  'cpa-academy': {
    valueProp: 'Built to help CPA learners access structured study content, progress tracking, and course delivery from any device.',
    audience: 'CPA students who need a clear learning path and reliable access to study materials.',
    summary: 'A comprehensive learning platform designed to make exam preparation feel organized, accessible, and credible.',
    achievements: ['Organized the content into a guided student journey.', 'Made progress tracking easy to understand at a glance.', 'Kept the experience responsive for mobile and desktop learners.'],
    highlights: ['Course management', 'Student enrollment', 'Progress tracking']
  },
  'pie-global-furnitures': {
    valueProp: 'Designed to showcase a furniture brand with a premium product story and a stronger path to customer inquiry.',
    audience: 'Furniture shoppers and prospects evaluating products on a polished brand site.',
    summary: 'A conversion-minded e-commerce experience that balances product presentation, trust, and clarity.',
    achievements: ['Elevated the catalog with a more premium visual hierarchy.', 'Made it easier for shoppers to browse and compare products.', 'Kept contact and purchase intent paths straightforward.'],
    highlights: ['Product catalog', 'Brand storytelling', 'Conversion flow']
  },
  'professional-web-designs': {
    valueProp: 'A design showcase that demonstrates motion control, responsive composition, and modern interface craft.',
    audience: 'Recruiters, founders, and clients reviewing frontend taste and execution quality.',
    summary: 'A frontend portfolio piece focused on visual refinement, accessibility, and polished motion.',
    achievements: ['Showed a strong command of responsive layout and hierarchy.', 'Used motion to support the design without overpowering it.', 'Kept the presentation accessible and visually balanced.'],
    highlights: ['UI/UX', 'Accessibility', 'Motion system']
  }
};

function scoreProject(project: Project) {
  let score = project.featured ? 100 : 0;
  score += project.tags.length * 4;
  score += Math.min((project.longDescription?.length ?? project.description.length) / 20, 15);
  if (/academy|learning|education/i.test(project.title + project.description)) score += 12;
  if (/furniture|catalog|store/i.test(project.title + project.description)) score += 10;
  if (/design|frontend|animation/i.test(project.title + project.description)) score += 8;
  return score;
}

function normalizeUrl(url: string) {
  return url.replace(/\/$/, '');
}

function getProjectStory(project: Project): ProjectStory {
  return PROJECT_STORIES[project.id] ?? {
    valueProp: project.description,
    audience: 'Users who need a dependable, well-crafted web experience.',
    summary: project.longDescription ?? project.description,
    achievements: ['Delivered a clear and responsive user experience.', 'Kept the interface focused on real outcomes.', 'Used the stack to support maintainability and polish.'],
    highlights: project.tags.slice(0, 3)
  };
}

function getSourceHref(project: Project) {
  if (/github\.com/i.test(project.href)) {
    return project.href;
  }

  return CONTACT_INFO.github;
}

function splitTags(tags: string[]) {
  return tags.slice(0, 5);
}

function ProjectPreview({ project, featured = false }: { project: Project; featured?: boolean }) {
  const frameClasses = featured
    ? 'aspect-[16/11] min-h-[300px] md:min-h-[420px]'
    : 'aspect-[16/10] min-h-[220px]';

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 shadow-[0_20px_80px_-35px_rgba(0,0,0,0.8)]">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-white/8 bg-slate-950/70 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">Preview</span>
      </div>
      <div className={`${frameClasses} overflow-hidden`}>
        {project.image ? (
          <motion.img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-700 ease-out group-hover:scale-[1.04]"
            initial={false}
            whileHover={{ scale: 1.04 }}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_60%),linear-gradient(145deg,rgba(15,23,42,0.94),rgba(2,6,23,0.88))] p-8 text-center text-slate-300">
            Project preview available on launch.
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0)_35%,rgba(2,6,23,0.12)_65%,rgba(2,6,23,0.5)_100%)]" />
    </div>
  );
}

const ProjectCard = memo(({
  project,
  featured = false,
  index
}: {
  project: Project;
  featured?: boolean;
  index: number;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const story = getProjectStory(project);
  const tags = splitTags(project.tags);

  const hoverMotion = prefersReducedMotion ? undefined : { y: -6 };

  return (
    <motion.article
      variants={ANIMATION_VARIANTS.slideUp}
      custom={index}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={hoverMotion}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(10,16,32,0.92),rgba(4,8,20,0.9))] p-4 shadow-[0_24px_90px_-36px_rgba(0,0,0,0.85)] md:p-5 ${featured ? 'ring-1 ring-cyan-400/20' : ''}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition duration-700 group-hover:bg-cyan-500/16" />
        <div className="absolute -bottom-20 right-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl transition duration-700 group-hover:bg-blue-500/14" />
      </div>

      <div className={`relative z-10 grid gap-5 ${featured ? 'lg:grid-cols-[1.08fr_0.92fr] lg:gap-6' : ''}`}>
        <ProjectPreview project={project} featured={featured} />

        <div className="flex flex-col justify-between gap-5">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.36em] text-cyan-300/80">{featured ? 'Featured project' : 'Project'}</p>
              <h3 className={`${featured ? 'text-3xl md:text-4xl' : 'text-2xl md:text-[1.75rem]'} font-black tracking-tight text-white`}>
                {project.title}
              </h3>
              <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-[15px]">
                {story.valueProp}
              </p>
              <p className="max-w-2xl text-sm leading-7 text-slate-400">
                {story.summary}
              </p>
            </div>

            <div className="grid gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] p-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Built for</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{story.audience}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Tech stack</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-50 transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-400/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Key feature highlights</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {story.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-slate-200 transition duration-300 hover:border-cyan-300/25 hover:text-white"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/8 bg-slate-950/55 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Key achievements</p>
              <ul className="mt-3 space-y-3">
                {story.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-sm leading-6 text-slate-200">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={normalizeUrl(project.href)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/40 bg-cyan-400/12 px-4 py-3 text-sm font-semibold text-cyan-50 transition duration-300 hover:bg-cyan-400/18 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]"
            >
              Launch Project
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={getSourceHref(project)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:border-white/20 hover:bg-white/10"
            >
              View Source
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsGrid = memo(({ limit, featured = false }: ProjectsGridProps) => {
  const projects = useMemo(() => {
    let filteredProjects = [...(projectsData as Project[])].sort((left, right) => scoreProject(right) - scoreProject(left));

    if (featured) {
      filteredProjects = filteredProjects.filter((project) => project.featured);
    }

    if (limit) {
      filteredProjects = filteredProjects.slice(0, limit);
    }

    return filteredProjects;
  }, [limit, featured]);

  if (projects.length === 0) {
    return <div className="py-8 text-center text-white">No projects found.</div>;
  }

  const featuredProject = projects[0]!;
  const restProjects = projects.slice(1);

  return (
    <div className="space-y-6 md:space-y-8">
      <ProjectCard project={featuredProject} index={0} featured />

      {restProjects.length > 0 && (
        <div className="grid gap-6 xl:grid-cols-2">
          {restProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
});

ProjectsGrid.displayName = 'ProjectsGrid';

export default ProjectsGrid;