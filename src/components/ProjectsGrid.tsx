import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { memo, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import type { Project } from '../types/index';
import { ANIMATION_VARIANTS, CONTACT_INFO } from '@lib/constants';
import projectsData from '@data/projects.json';

interface ProjectsGridProps {
  limit?: number;
  featured?: boolean;
}

interface ProjectAnalysis {
  title: string;
  metadata: string;
  framework: string;
  status: 'Online' | 'Offline';
  ssl: 'Enabled' | 'Disabled';
  responseTime: string;
}

interface FeaturePanel {
  title: string;
  description: string;
}

interface StackInsight {
  purpose: string;
  usage: string;
  contribution: string;
}

const PROCESS_STEPS = ['Concept', 'Planning', 'Development', 'Testing', 'Deployment'];

const STACK_LIBRARY: Record<string, StackInsight> = {
  Django: {
    purpose: 'Backend framework',
    usage: 'Routes requests, powers APIs, and handles secure business logic.',
    contribution: 'Provides a reliable server-side foundation.'
  },
  React: {
    purpose: 'Interactive UI layer',
    usage: 'Builds reusable components and responsive client experiences.',
    contribution: 'Keeps the interface fast and modular.'
  },
  Python: {
    purpose: 'Server-side language',
    usage: 'Supports business rules, service orchestration, and scripting.',
    contribution: 'Adds maintainable backend logic.'
  },
  PostgreSQL: {
    purpose: 'Relational data store',
    usage: 'Persists structured data, relationships, and transactional records.',
    contribution: 'Keeps project data durable and queryable.'
  },
  'REST API': {
    purpose: 'API contract',
    usage: 'Moves data cleanly between frontend and backend layers.',
    contribution: 'Enables predictable integration points.'
  },
  WebSockets: {
    purpose: 'Realtime transport',
    usage: 'Pushes updates instantly without page refreshes.',
    contribution: 'Adds live interaction and realtime feedback.'
  },
  'UI/UX': {
    purpose: 'Experience design',
    usage: 'Shapes visual hierarchy, motion, and usability.',
    contribution: 'Makes the product feel polished and easy to use.'
  },
  'E-commerce': {
    purpose: 'Commerce flow',
    usage: 'Supports product discovery, conversion paths, and brand presentation.',
    contribution: 'Turns content into a business-ready storefront.'
  },
  Accessibility: {
    purpose: 'Inclusive interaction',
    usage: 'Improves readability, focus states, and keyboard navigation.',
    contribution: 'Makes the interface usable for more people.'
  },
  Animations: {
    purpose: 'Motion system',
    usage: 'Adds staged transitions and expressive feedback.',
    contribution: 'Increases perceived quality without heavy visuals.'
  },
  CSS3: {
    purpose: 'Styling layer',
    usage: 'Implements layout, visual treatment, and responsive structure.',
    contribution: 'Keeps presentation flexible and fast.'
  }
};

const FRAMEWORK_HINTS = ['Django', 'React', 'Python', 'PostgreSQL', 'WebSockets', 'Tailwind CSS', 'Vite', 'Next.js', 'Node.js'];

function scoreProject(project: Project) {
  let score = project.featured ? 100 : 0;
  score += project.tags.length * 4;
  score += Math.min((project.longDescription?.length ?? project.description.length) / 20, 15);
  if (/academy|learning|education/i.test(project.title + project.description)) score += 12;
  if (/e-?commerce|furniture/i.test(project.title + project.description)) score += 10;
  if (/design|frontend|animation/i.test(project.title + project.description)) score += 8;
  return score;
}

function normalizeUrl(url: string) {
  return url.replace(/\/$/, '');
}

function createProjectSummary(project: Project) {
  const tags = project.tags.slice(0, 3).join(', ');
  const base = project.longDescription ?? project.description;
  const tail = tags ? ` It pairs ${tags} to keep the build focused, responsive, and production-ready.` : '';
  return `${base}${tail}`;
}

function deriveProjectType(project: Project) {
  const haystack = `${project.title} ${project.description} ${project.longDescription ?? ''} ${project.tags.join(' ')}`.toLowerCase();
  if (haystack.includes('academy') || haystack.includes('course') || haystack.includes('learning') || haystack.includes('education')) {
    return 'E-learning Platform';
  }
  if (haystack.includes('furniture') || haystack.includes('e-commerce') || haystack.includes('cart') || haystack.includes('catalog')) {
    return 'E-commerce Platform';
  }
  if (haystack.includes('design') || haystack.includes('frontend') || haystack.includes('animation')) {
    return 'Frontend Showcase';
  }
  return 'Web Application';
}

function deriveArchitecture(project: Project) {
  const type = deriveProjectType(project);
  if (type === 'E-learning Platform') {
    return 'Structured learning flows, content delivery, and progress tracking wrapped in a dashboard-first experience.';
  }
  if (type === 'E-commerce Platform') {
    return 'Product discovery, brand storytelling, and conversion pathways aligned around the catalog flow.';
  }
  if (type === 'Frontend Showcase') {
    return 'Motion-led presentation, reusable interface patterns, and accessible interaction design.';
  }
  return 'Component-driven architecture built for maintainability, responsiveness, and clear user journeys.';
}

function deriveFeatures(project: Project): FeaturePanel[] {
  const text = `${project.title} ${project.description} ${project.longDescription ?? ''}`.toLowerCase();

  if (text.includes('academy') || text.includes('learning') || text.includes('course')) {
    return [
      { title: 'Authentication', description: 'Secure user access for returning learners and administrators.' },
      { title: 'Course Management', description: 'Structured modules, lessons, and study resources organized by subject.' },
      { title: 'Progress Tracking', description: 'Learner progress visibility with clear milestones and continuation cues.' },
      { title: 'Practice Quizzes', description: 'Interactive assessments that reinforce understanding and retention.' }
    ];
  }

  if (text.includes('furniture') || text.includes('e-commerce') || text.includes('catalog')) {
    return [
      { title: 'Product Catalog', description: 'Curated collections with clear categories and product discovery paths.' },
      { title: 'Conversion Focus', description: 'Buyer-friendly content hierarchy that supports inquiries and sales intent.' },
      { title: 'Responsive Showcase', description: 'A layout tuned for mobile browsing, tablets, and desktop storefront viewing.' },
      { title: 'Brand Storytelling', description: 'Visual presentation that elevates trust, polish, and premium feel.' }
    ];
  }

  return [
    { title: 'Responsive Layouts', description: 'Flexible sections that adapt cleanly across screens and devices.' },
    { title: 'Motion System', description: 'Deliberate transitions and hover states that make the UI feel alive.' },
    { title: 'Accessibility', description: 'Keyboard-friendly interaction with strong contrast and predictable focus states.' },
    { title: 'Reusable Components', description: 'Composable building blocks that support faster iteration and cleaner maintenance.' }
  ];
}

function parseTitleFromScan(scanText: string, fallback: string) {
  const titleMatch = scanText.match(/^Title:\s*(.+)$/m);
  if (titleMatch?.[1]) {
    return titleMatch[1].trim();
  }

  const headingMatch = scanText.match(/^#+\s*(.+)$/m);
  if (headingMatch?.[1]) {
    return headingMatch[1].trim();
  }

  return fallback;
}

function extractMetadataSnippet(scanText: string, fallback: string) {
  const lines = scanText.split('\n').map((line) => line.trim()).filter(Boolean);
  const contentStart = lines.findIndex((line) => /^Markdown Content:?$/i.test(line));
  const contentLines = contentStart >= 0 ? lines.slice(contentStart + 1) : lines;

  const candidateLines: string[] = [];
  for (const line of contentLines) {
    if (/^Title:|^URL Source:/.test(line)) {
      continue;
    }
    if (/^#+\s/.test(line)) {
      continue;
    }
    if (line.length < 20) {
      continue;
    }
    candidateLines.push(line);
    if (candidateLines.length >= 2) {
      break;
    }
  }

  const candidate = candidateLines.join(' ');
  return candidate || fallback;
}

function inferFramework(scanText: string, project: Project) {
  const normalizedText = scanText.toLowerCase();
  const hinted = FRAMEWORK_HINTS.filter((hint) => normalizedText.includes(hint.toLowerCase()) || project.tags.some((tag) => tag.toLowerCase().includes(hint.toLowerCase())));
  const uniqueHints = Array.from(new Set(hinted));

  if (uniqueHints.length === 0) {
    return 'Detected custom stack';
  }

  if (uniqueHints.length === 1) {
    return `Detected ${uniqueHints[0]}`;
  }

  return `Detected ${uniqueHints.slice(0, 2).join(' + ')}`;
}

function getStackInsight(tag: string): StackInsight {
  return STACK_LIBRARY[tag] ?? {
    purpose: 'Supporting technology',
    usage: 'Contributes to the implementation stack.',
    contribution: 'Helps keep the project production ready.'
  };
}

function buildResponseBadge(status: 'Online' | 'Offline') {
  return status === 'Online'
    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
    : 'border-rose-400/30 bg-rose-400/10 text-rose-100';
}

async function fetchProjectAnalysis(project: Project) {
  const startTime = performance.now();
  const normalizedUrl = normalizeUrl(project.href);
  const proxyUrl = `https://r.jina.ai/http://${normalizedUrl.replace(/^https?:\/\//, '')}`;

  const statusPromise = (async () => {
    try {
      await fetch(normalizedUrl, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store'
      });
      return {
        status: 'Online' as const,
        responseTime: `${Math.max(1, Math.round(performance.now() - startTime))}ms`
      };
    } catch {
      return {
        status: 'Offline' as const,
        responseTime: 'Unavailable'
      };
    }
  })();

  const metadataPromise = (async () => {
    try {
      const response = await fetch(proxyUrl, { cache: 'no-store' });
      const scanText = await response.text();
      return {
        title: parseTitleFromScan(scanText, project.title),
        metadata: extractMetadataSnippet(scanText, project.longDescription ?? project.description),
        framework: inferFramework(scanText, project)
      };
    } catch {
      return {
        title: project.title,
        metadata: project.longDescription ?? project.description,
        framework: inferFramework(project.tags.join(' '), project)
      };
    }
  })();

  const [network, metadata] = await Promise.all([statusPromise, metadataPromise]);

  return {
    title: metadata.title,
    metadata: metadata.metadata,
    framework: metadata.framework,
    status: network.status,
    ssl: normalizedUrl.startsWith('https://') ? 'Enabled' : 'Disabled',
    responseTime: network.responseTime
  } satisfies ProjectAnalysis;
}

const ProjectPreviewModal = memo(({ project, analysis, onClose }: { project: Project; analysis?: ProjectAnalysis; onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-slate-950/82 backdrop-blur-xl"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`preview-title-${project.id}`}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/12 bg-slate-950/96 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Optional preview</p>
            <h3 id={`preview-title-${project.id}`} className="mt-2 text-xl font-black text-white sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
          >
            Close
          </button>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="border-b border-white/10 bg-slate-950/90 p-5 lg:border-b-0 lg:border-r lg:border-white/10 lg:p-6">
            {project.image ? (
              <div className="overflow-hidden rounded-[26px] border border-white/10 bg-slate-900/80 shadow-[0_18px_60px_-20px_rgba(34,211,238,0.35)]">
                <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className="flex min-h-[360px] items-center justify-center rounded-[26px] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-slate-300">
                This project does not include a screenshot asset. The card stays screenshot-free by design.
              </div>
            )}
          </div>
          <div className="space-y-5 p-5 sm:p-6">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Live analysis</p>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-3">
                  <p className="text-slate-400">Status</p>
                  <p className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${analysis ? buildResponseBadge(analysis.status) : 'border-slate-700 bg-slate-800/70 text-slate-200'}`}>
                    {analysis?.status ?? 'Scanning'}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-3">
                  <p className="text-slate-400">SSL</p>
                  <p className="mt-2 text-sm font-semibold text-white">{analysis?.ssl ?? 'Enabled'}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-3">
                  <p className="text-slate-400">Framework</p>
                  <p className="mt-2 text-sm font-semibold text-cyan-100">{analysis?.framework ?? 'Scanning indicators'}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/70 p-3">
                  <p className="text-slate-400">Response Time</p>
                  <p className="mt-2 text-sm font-semibold text-white">{analysis?.responseTime ?? 'Measured live'}</p>
                </div>
              </div>
              {analysis?.metadata && (
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {analysis.metadata}
                </p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/40 bg-cyan-400/12 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-400/20"
              >
                Live Demo
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/25 hover:bg-white/10"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

ProjectPreviewModal.displayName = 'ProjectPreviewModal';

const ProjectCard = memo(({
  project,
  index,
  featured = false,
  analysis,
  onAnalysisReady,
  onPreview
}: {
  project: Project;
  index: number;
  featured?: boolean;
  analysis?: ProjectAnalysis;
  onAnalysisReady: (projectId: string, analysis: ProjectAnalysis) => void;
  onPreview: (project: Project) => void;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const hasStartedScanRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
    backgroundPosition: '50% 50%'
  });

  useEffect(() => {
    if (!isVisible || hasStartedScanRef.current) {
      return;
    }

    hasStartedScanRef.current = true;
    setIsScanning(true);
    setScanProgress(4);

    const progressTimers = [
      window.setTimeout(() => setScanProgress(28), 140),
      window.setTimeout(() => setScanProgress(54), 300),
      window.setTimeout(() => setScanProgress(78), 520),
      window.setTimeout(() => setScanProgress(100), 760)
    ];

    let cancelled = false;

    void fetchProjectAnalysis(project)
      .then((result) => {
        if (!cancelled) {
          onAnalysisReady(project.id, result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          onAnalysisReady(project.id, {
            title: project.title,
            metadata: project.longDescription ?? project.description,
            framework: 'Detected custom stack',
            status: 'Offline',
            ssl: project.href.startsWith('https://') ? 'Enabled' : 'Disabled',
            responseTime: 'Unavailable'
          });
        }
      });

    const completeTimer = window.setTimeout(() => {
      if (!cancelled) {
        setIsScanning(false);
      }
    }, 860);

    return () => {
      cancelled = true;
      progressTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(completeTimer);
    };
  }, [isVisible, onAnalysisReady, project]);

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.012)`,
      backgroundPosition: `${xPercent.toFixed(2)}% ${yPercent.toFixed(2)}%`
    });
  };

  const onMouseLeave = () => {
    if (prefersReducedMotion) {
      return;
    }

    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
      backgroundPosition: '50% 50%'
    });
  };

  const projectType = deriveProjectType(project);
  const architecture = deriveArchitecture(project);
  const summary = createProjectSummary(project);
  const featurePanels = deriveFeatures(project);
  const visibleAnalysis = analysis;
  const contentReady = !isScanning && scanProgress === 100 && Boolean(visibleAnalysis);

  return (
    <motion.article
      variants={ANIMATION_VARIANTS.slideUp}
      custom={index}
      onViewportEnter={() => setIsVisible(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(145deg,rgba(10,16,32,0.92),rgba(4,8,20,0.88))] p-5 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.75)] transition-all duration-500 md:p-6 ${featured ? 'ring-1 ring-cyan-400/20' : ''}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-0 h-56 w-56 rounded-full bg-cyan-500/12 blur-3xl transition duration-700 group-hover:bg-cyan-500/18" />
        <div className="absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-blue-500/12 blur-3xl transition duration-700 group-hover:bg-blue-500/18" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(34,211,238,0.12),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className={`relative z-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl sm:p-5 ${featured ? 'md:p-6' : ''}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.8)]" />
            {visibleAnalysis?.status ?? 'Scanning'}
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-slate-200">{projectType}</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-cyan-100">{project.featured ? 'Featured' : 'Project'}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.95),rgba(2,6,23,0.8))] p-5">
              <div className="flex items-start gap-4">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(59,130,246,0.2),rgba(34,211,238,0.12))] text-3xl shadow-[0_0_35px_rgba(34,211,238,0.15)]">
                  <div className="absolute inset-0 animate-pulse rounded-2xl bg-cyan-400/10" />
                  <span className="relative">{project.icon ?? '◈'}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/80">{visibleAnalysis?.title ?? 'Project scan'}</p>
                  <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">{project.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-[15px]">{summary}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Analysis</p>
                <p className="mt-2 text-sm font-semibold text-white">{visibleAnalysis ? 'Complete' : 'Scanning'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Framework</p>
                <p className="mt-2 text-sm font-semibold text-cyan-100">{visibleAnalysis?.framework ?? 'Detecting stack'}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Response</p>
                <p className="mt-2 text-sm font-semibold text-white">{visibleAnalysis?.responseTime ?? 'Measured live'}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>Scanning Project...</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee,#3b82f6,#22d3ee)] bg-[length:200%_100%] shadow-[0_0_18px_rgba(34,211,238,0.5)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">SSL</p>
                  <p className="mt-2 text-sm font-semibold text-white">{visibleAnalysis?.ssl ?? 'Enabled'}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Metadata</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{visibleAnalysis?.metadata ?? project.description}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Tech stack</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {project.tags.map((tag) => {
                  const insight = getStackInsight(tag);
                  return (
                    <span key={tag} className="group relative inline-flex">
                      <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-2 text-xs font-semibold text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition group-hover:border-cyan-300/50 group-hover:bg-cyan-300/15">
                        {tag}
                      </span>
                      <span className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-20 w-56 -translate-x-1/2 translate-y-1 rounded-2xl border border-white/10 bg-slate-950/95 p-3 text-left text-[11px] leading-5 text-slate-200 opacity-0 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <strong className="block text-cyan-100">Purpose</strong>
                        {insight.purpose}
                        <strong className="mt-2 block text-cyan-100">Usage</strong>
                        {insight.usage}
                        <strong className="mt-2 block text-cyan-100">Contribution</strong>
                        {insight.contribution}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(6,11,28,0.88),rgba(2,6,23,0.86))] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Project Type</p>
                  <p className="mt-2 text-lg font-semibold text-white">{projectType}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                  {featured ? 'Featured Hero' : 'Active Module'}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{architecture}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {featurePanels.map((feature) => (
                  <details key={feature.title} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/25">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white">
                      <span>{feature.title}</span>
                      <span className="text-cyan-300 transition group-open:rotate-180">⌄</span>
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Feature Gate</p>
                  <h4 className="mt-2 text-lg font-semibold text-white">Development quality</h4>
                </div>
                <div className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${buildResponseBadge(visibleAnalysis?.status ?? 'Online')}`}>
                  {contentReady ? 'Analysis Complete' : 'Scanning'}
                </div>
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Purpose</p>
                  <p className="mt-2 leading-7">{project.description}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-950/50 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Live status</p>
                  <p className="mt-2 leading-7">{visibleAnalysis?.status ?? 'Online'} · SSL {visibleAnalysis?.ssl ?? 'Enabled'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-cyan-300/45 bg-cyan-400/12 px-4 py-3 text-sm font-semibold text-cyan-50 transition-all duration-300 hover:bg-cyan-400/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.22)]"
              >
                Live Demo
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-white/25 hover:bg-white/10"
              >
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
              {project.image && (
                <button
                  type="button"
                  onClick={() => onPreview(project)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/10"
                >
                  Preview Project
                  <span aria-hidden="true">⌁</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          {PROCESS_STEPS.map((step, stepIndex) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: stepIndex * 0.08, duration: 0.35 }}
              className="relative rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-300"
            >
              {step}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsGrid = memo(({ limit, featured = false }: ProjectsGridProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [analysisById, setAnalysisById] = useState<Record<string, ProjectAnalysis>>({});

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

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  );

  if (projects.length === 0) {
    return <div className="py-8 text-center text-white">No projects found.</div>;
  }

  const featuredProject = projects[0]!;
  const restProjects = projects.slice(1);

  return (
    <>
      <div className="space-y-8">
        <motion.div
          variants={ANIMATION_VARIANTS.slideUp}
          className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl md:p-6"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-cyan-300/80">Project timeline</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                A compact view of how each project moved from concept to deployment. The cards below expand this into live analysis, feature breakdowns, and technology detail.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">Fast loading</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">Lazy analyzed</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">Screenshot-free cards</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-200"
              >
                {step}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={ANIMATION_VARIANTS.slideUp} className="space-y-6">
          <ProjectCard
            project={featuredProject}
            index={0}
            featured
            analysis={analysisById[featuredProject.id]}
            onAnalysisReady={(projectId, analysis) => {
              setAnalysisById((current) => ({ ...current, [projectId]: analysis }));
            }}
            onPreview={(project) => setSelectedProjectId(project.id)}
          />

          {restProjects.length > 0 && (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {restProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                  analysis={analysisById[project.id]}
                  onAnalysisReady={(projectId, analysis) => {
                    setAnalysisById((current) => ({ ...current, [projectId]: analysis }));
                  }}
                  onPreview={(item) => setSelectedProjectId(item.id)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectPreviewModal
            project={selectedProject}
            analysis={analysisById[selectedProject.id]}
            onClose={() => setSelectedProjectId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
});

ProjectsGrid.displayName = 'ProjectsGrid';

export default ProjectsGrid;
