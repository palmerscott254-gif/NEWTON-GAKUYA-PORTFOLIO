import { motion } from 'framer-motion';
import { memo } from 'react';
import type { SkillGroup } from '../types/index';
import { ANIMATION_VARIANTS } from '@lib/constants';

const skillData: SkillGroup[] = [
  {
    title: '💻 Core Technologies',
    skills: [
      { name: 'Django', level: 90 },
      { name: 'Python', level: 88 },
      { name: 'React', level: 85 },
      { name: 'HTML & CSS', level: 92 },
      { name: 'JavaScript', level: 75 }
    ]
  },
  {
    title: '💼 Business & Finance',
    skills: [
      { name: 'Financial Analysis', level: 70 },
      { name: 'Accounting', level: 70 },
      { name: 'Financial Management', level: 65 },
      { name: 'Business Advising', level: 60 }
    ]
  },
  {
    title: '🎯 Professional Skills',
    skills: [
      { name: 'Leadership', level: 90 },
      { name: 'Teamwork', level: 92 },
      { name: 'Strategic Thinking', level: 88 },
      { name: 'Communication', level: 85 }
    ]
  }
];

const SkillItem = memo(({ name, level }: { name: string; level?: number }) => {
  return (
    <motion.div
      variants={ANIMATION_VARIANTS.slideUp}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        {level && <span className="text-xs text-slate-400">{level}%</span>}
      </div>
      {level && (
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary-500 to-secondary rounded-full"
          />
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
      className="card p-6 space-y-6"
    >
      <h3 className="text-xl font-bold text-primary-300">{group.title}</h3>
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
