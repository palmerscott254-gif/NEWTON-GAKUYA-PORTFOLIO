import { motion } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '@lib/hooks';

interface TimelineMilestone {
  title: string;
  description: string;
  year: string;
}

const milestones: TimelineMilestone[] = [
  {
    title: 'Started Programming',
    description: 'Began writing practical scripts and building confidence with core fundamentals.',
    year: '2022'
  },
  {
    title: 'Built First Website',
    description: 'Designed and shipped a complete responsive website with production-ready structure.',
    year: '2023'
  },
  {
    title: 'Learned Django',
    description: 'Moved from static interfaces to backend-driven applications and robust APIs.',
    year: '2024'
  },
  {
    title: 'Created Real-Time Apps',
    description: 'Implemented dynamic user experiences with live states and interactive workflows.',
    year: '2025'
  },
  {
    title: 'Building Scalable Platforms',
    description: 'Focusing on architecture, performance, accessibility, and maintainable growth.',
    year: 'Now'
  }
];

const JourneyTimeline = memo(() => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const cards = section.querySelectorAll<HTMLElement>('[data-timeline-card]');
    const progressLine = section.querySelector<HTMLElement>('[data-timeline-progress]');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            once: true
          }
        }
      );

      if (progressLine) {
        gsap.fromTo(
          progressLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 65%',
              end: 'bottom 70%',
              scrub: true
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="container py-20 md:py-28"
      aria-labelledby="journey-timeline-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Growth Story</p>
        <h2 id="journey-timeline-heading" className="section-heading mt-3">
          Journey Timeline
        </h2>
        <p className="section-subheading mt-4 max-w-4xl">
          A focused progression from fundamentals to scalable full-stack systems.
        </p>
      </motion.div>

      <div className="relative mt-12 md:mt-16">
        <div className="absolute left-3 top-0 h-full w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <div
          data-timeline-progress
          className="absolute left-3 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-cyan-300 via-blue-400 to-cyan-500 md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-8 md:space-y-10">
          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;

            return (
              <article
                key={milestone.title}
                data-timeline-card
                className={`relative md:grid md:grid-cols-2 md:gap-12 ${isLeft ? '' : 'md:[&>div:first-child]:col-start-2'}`}
              >
                <div className="glass-card ml-10 p-6 md:ml-0 md:p-7">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{milestone.year}</p>
                  <h3 className="mt-2 text-2xl font-black text-white">{milestone.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">{milestone.description}</p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute left-3 top-7 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-cyan-300/80 bg-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.8)] md:left-1/2"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

JourneyTimeline.displayName = 'JourneyTimeline';

export default JourneyTimeline;
