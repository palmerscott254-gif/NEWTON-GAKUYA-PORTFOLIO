import { motion } from 'framer-motion';
import { memo } from 'react';
import type { SkillGroup } from '../types/index';
import { ANIMATION_VARIANTS } from '@lib/constants';
import { DjangoIcon, PythonIcon, ReactIcon, HtmlIcon, CssIcon, JsIcon, FinanceIcon } from './SkillIcons';

const skillData: SkillGroup[] = [
  {
    title: 'Core Technologies',
    skills: [
      { name: 'Django', level: 90 },
      { name: 'Python', level: 88 },
      { name: 'React', level: 85 },
      { name: 'HTML', level: 92 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 78 }
    ]
  },
  {
    title: 'Business & Finance',
    skills: [
      { name: 'Financial Analysis', level: 72 },
      { name: 'Accounting', level: 70 },
      { name: 'Financial Management', level: 68 },
      { name: 'Business Advising', level: 62 }
    ]
  },
  {
    title: 'Professional Skills',
    skills: [
      { name: 'Leadership', level: 90 },
      { name: 'Teamwork', level: 92 },
      { name: 'Strategic Thinking', level: 88 },
      { name: 'Communication', level: 85 }
    ]
  }
];

const skillIconMap: Record<string, JSX.Element> = {
  Django: <DjangoIcon />,
  Python: <PythonIcon />,
  React: <ReactIcon />,
  HTML: <HtmlIcon />,
  CSS: <CssIcon />,
  JavaScript: <JsIcon />,
  'Financial Analysis': <FinanceIcon />,
  Accounting: <FinanceIcon />,
  'Financial Management': <FinanceIcon />,
  'Business Advising': <FinanceIcon />,
};

const SkillItem = memo(({ name, level }: { name: string; level?: number }) => {
  const icon = skillIconMap[name];
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.slideUp}
      className="space-y-2 group"
    >
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-3 text-sm font-medium text-primary-100 tracking-wide">
          <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary/30 ring-1 ring-primary-500/40 shadow-inner shadow-primary/40 backdrop-blur-sm group-hover:scale-105 transition-transform">
            {icon ? (
              <div className="w-6 h-6 text-primary-200 opacity-90 [&_svg]:w-6 [&_svg]:h-6">
                {icon}
              </div>
            ) : (
              <span className="text-[10px] font-semibold text-primary-100 opacity-80">
                {name.substring(0, 2)}
              </span>
            )}
          </div>
          <span>{name}</span>
        </span>
        {level && <span className="text-xs text-primary-300 font-semibold">{level}%</span>}
      </div>
      {level && (
        <div className="h-2 rounded-full bg-primary-950/40 ring-1 ring-inset ring-primary-800/40 overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-primary-500 via-secondary to-primary-400 shadow-[0_0_16px_-4px_rgba(0,255,255,0.55)]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,255,255,0.45),transparent)] mix-blend-plus-lighter opacity-70" />
        </div>
      )}
    </motion.div>
  );
});

SkillItem.displayName = 'SkillItem';

const SkillCategory = memo(({ group, index }: { group: SkillGroup; index: number }) => {
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.slideUp}
      custom={index}
      className="glass-card p-6 md:p-7 space-y-6 group hover:shadow-2xl hover:shadow-primary/30 transition-all duration-400"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-primary-300 to-secondary bg-clip-text text-transparent">
          {group.title}
        </h3>
      </div>
      <div className="space-y-4">
        {group.skills.map((skill) => (
          <SkillItem
            key={skill.name}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </div>
    </motion.div>
  );
});

SkillCategory.displayName = 'SkillCategory';

const Skills = memo(() => {
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
          Skills & Expertise
        </motion.h2>
        
        <motion.div
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillData.map((group, index) => (
            <SkillCategory key={group.title} group={group} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
