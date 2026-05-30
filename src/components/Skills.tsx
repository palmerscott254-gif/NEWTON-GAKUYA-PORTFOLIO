import { motion } from 'framer-motion';
import { memo } from 'react';
import { ANIMATION_VARIANTS } from '@lib/constants';
import { DjangoIcon, PythonIcon, ReactIcon, HtmlIcon, CssIcon, JsIcon, FinanceIcon, PhotoshopIcon, MarketingIcon } from './SkillIcons';

interface SkillItem {
  name: string;
  icon?: JSX.Element;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Full-Stack Development',
    skills: [
      { name: 'Django', icon: <DjangoIcon /> },
      { name: 'Python', icon: <PythonIcon /> },
      { name: 'React', icon: <ReactIcon /> },
      { name: 'PostgreSQL' },
      { name: 'Git' },
      { name: 'Linux' },
      { name: 'HTML5', icon: <HtmlIcon /> },
      { name: 'CSS3', icon: <CssIcon /> },
      { name: 'JavaScript', icon: <JsIcon /> }
    ]
  },
  {
    title: 'Business & Design',
    skills: [
      { name: 'Financial Analysis', icon: <FinanceIcon /> },
      { name: 'Accounting', icon: <FinanceIcon /> },
      { name: 'Marketing & Sales', icon: <MarketingIcon /> },
      { name: 'Photoshop', icon: <PhotoshopIcon /> }
    ]
  },
  
];

const radarNodes = [
  { name: 'Python', top: '18%', left: '50%' },
  { name: 'Django', top: '34%', left: '76%' },
  { name: 'React', top: '58%', left: '80%' },
  { name: 'PostgreSQL', top: '78%', left: '50%' },
  { name: 'JavaScript', top: '58%', left: '20%' },
  { name: 'Git/Linux', top: '34%', left: '24%' }
];

const Skills = memo(() => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="relative"
        >
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-16 text-center md:mb-20">
            <h2 className="section-heading mb-6">Interactive Skills Matrix</h2>
            <p className="section-subheading mx-auto">
              Technical depth, business context, and execution-oriented problem solving.
            </p>
          </motion.div>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.div variants={ANIMATION_VARIANTS.slideUp} className="space-y-7">
              <div className="glass-card p-8 md:p-10">
                <h3 className="mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-3xl font-black text-transparent">
                  Core Advantage
                </h3>
                <div className="space-y-5 text-base leading-relaxed text-slate-200 md:text-lg">
                  <p>
                    I combine <span className="font-bold text-cyan-300">full-stack engineering</span> with practical business awareness to ship products that are both technically sound and strategically valuable.
                  </p>
                  <p>
                    The stack centers on <span className="font-bold text-blue-300">Python, Django, React, and modern frontend systems</span> with strong emphasis on maintainability and performance.
                  </p>
                  <p>
                    I work comfortably across design handoff, architecture, implementation, and iteration.
                  </p>
                </div>
              </div>

              <motion.div variants={ANIMATION_VARIANTS.slideUp} className="glass-card p-6 md:p-8">
                <h4 className="text-lg font-bold uppercase tracking-[0.14em] text-slate-300">Skill Radar</h4>
                <div className="relative mx-auto mt-6 h-72 w-72">
                  {[1, 2, 3, 4].map((ring) => (
                    <div
                      key={ring}
                      className="absolute left-1/2 top-1/2 rounded-full border border-cyan-300/20"
                      style={{
                        width: `${ring * 25}%`,
                        height: `${ring * 25}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}

                  {radarNodes.map((node) => (
                    <motion.div
                      key={node.name}
                      whileHover={{ scale: 1.08 }}
                      className="group absolute"
                      style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
                    >
                      <span className="inline-flex rounded-full border border-cyan-300/40 bg-slate-900/75 px-3 py-1 text-xs font-semibold text-cyan-200 shadow-card transition-all duration-300 group-hover:border-cyan-200 group-hover:text-white">
                        {node.name}
                      </span>
                    </motion.div>
                  ))}

                  <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={ANIMATION_VARIANTS.slideUp} className="space-y-6">
              {skillCategories.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="glass-card p-8"
                >
                  <h3 className="mb-6 text-2xl font-black text-white">{category.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.08, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex cursor-default items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-5 py-2.5 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-500/30 transition-all duration-300 hover:from-cyan-500/20 hover:to-blue-500/20 hover:ring-cyan-400/60"
                      >
                        {skill.icon && <span className="flex-shrink-0">{skill.icon}</span>}
                        <span className="text-sm font-medium">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
