import { motion } from 'framer-motion';
import { CURRENT_MISSION, PROFILE_CARDS, SITE_CONFIG, TECH_STACK } from '@lib/constants';

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
} as const;

export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <section className="container relative overflow-hidden py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            aria-hidden="true"
            className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl"
            animate={{ y: [0, 20, 0], x: [0, 8, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute right-0 top-28 h-96 w-96 rounded-full bg-blue-500/12 blur-3xl"
            animate={{ y: [0, -18, 0], x: [0, -10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,191,255,0.08),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(37,99,235,0.09),transparent_22%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <motion.div variants={itemVariants} className="mx-auto max-w-6xl">
          <div className="mb-8 inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200/90 shadow-[0_0_32px_rgba(0,191,255,0.12)] backdrop-blur-xl">
            About {SITE_CONFIG.name}
          </div>
          <h1 className="section-heading max-w-4xl">
            Business-first engineering with a premium product mindset.
          </h1>
          <p className="section-subheading mt-6 max-w-3xl">
            A modern developer portfolio built around clean systems, sharp visuals, and thoughtful product strategy. I combine commerce knowledge with design-sensitive engineering to build work that feels durable and deliberate.
          </p>
        </motion.div>

        <div className="mt-12">
          <motion.div variants={itemVariants} className="glass-card p-8 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-white md:text-3xl">Current Mission</h2>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">
                Focused
              </span>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
              {CURRENT_MISSION}
            </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PROFILE_CARDS.map((card) => (
            <motion.article
              key={card.title}
              variants={itemVariants}
              className="group glass-card flex h-full flex-col p-8 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-400/10 text-cyan-200 shadow-[0_0_24px_rgba(0,191,255,0.12)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_34px_rgba(0,191,255,0.28)]">
                {card.icon}
              </div>
              <h3 className="mt-6 text-xl font-black text-cyan-300">{card.title}</h3>
              <p className="mt-3 text-lg font-semibold text-white">{card.headline}</p>
              <p className="mt-3 leading-relaxed text-slate-300">{card.body}</p>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                {card.detail}
              </p>

              {'items' in card && (
                <ul className="mt-6 space-y-3 text-sm font-medium text-slate-100">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,191,255,0.7)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-10">
          <motion.div variants={itemVariants} className="glass-card p-8 md:p-10">
            <h2 className="text-2xl font-black text-white md:text-3xl">Tech Stack</h2>
            <p className="mt-4 max-w-lg text-slate-300">
              A focused toolkit for building responsive interfaces, robust backends, and production-ready digital products.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech.name}
                  className="group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-white hover:shadow-[0_0_28px_rgba(0,191,255,0.18)]"
                >
                  <span className="text-cyan-300 transition-colors duration-300 group-hover:text-cyan-200">
                    {tech.icon}
                  </span>
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
