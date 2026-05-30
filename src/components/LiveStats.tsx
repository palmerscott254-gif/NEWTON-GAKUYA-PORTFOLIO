import { motion, useInView } from 'framer-motion';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  detail: string;
}

const stats: StatItem[] = [
  {
    label: 'Projects Built',
    value: 17,
    suffix: '+',
    detail: 'Production and portfolio apps delivered'
  },
  {
    label: 'Technologies Mastered',
    value: 28,
    suffix: '+',
    detail: 'Frontend, backend, tooling, and design stack'
  },
  {
    label: 'GitHub Contributions',
    value: 420,
    suffix: '+',
    detail: 'Consistent coding and open-source learning'
  },
  {
    label: 'Years of Experience',
    value: 2,
    suffix: '+',
    detail: 'Hands-on web development experience'
  }
];

const Counter = memo(({ value, isActive }: { value: number; isActive: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const duration = 1300;
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isActive, value]);

  return <>{displayValue}</>;
});

Counter.displayName = 'Counter';

const LiveStats = memo(() => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  const renderedStats = useMemo(
    () =>
      stats.map((stat) => (
        <motion.article
          key={stat.label}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="glass-card relative overflow-hidden p-6 md:p-8"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
          <div className="mt-3 flex items-end gap-2">
            <p className="text-4xl font-black text-white md:text-5xl">
              <Counter value={stat.value} isActive={isInView} />
              {stat.suffix}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{stat.detail}</p>
        </motion.article>
      )),
    [isInView]
  );

  return (
    <section ref={sectionRef} className="container py-20 md:py-28" aria-labelledby="live-stats-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-10 md:mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Impact At A Glance</p>
          <h2 id="live-stats-heading" className="section-heading mt-3">
            Live Stats
          </h2>
          <p className="section-subheading mt-4">
            Numbers that reflect build consistency, technical growth, and execution speed.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{renderedStats}</div>
      </motion.div>
    </section>
  );
});

LiveStats.displayName = 'LiveStats';

export default LiveStats;
