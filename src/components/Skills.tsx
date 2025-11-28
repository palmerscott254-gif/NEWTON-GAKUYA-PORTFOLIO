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
      { name: 'HTML5', icon: <HtmlIcon /> },
      { name: 'CSS3', icon: <CssIcon /> },
      { name: 'JavaScript', icon: <JsIcon /> },
    ]
  },
  {
    title: 'Business & Design',
    skills: [
      { name: 'Financial Analysis', icon: <FinanceIcon /> },
      { name: 'Accounting', icon: <FinanceIcon /> },
      { name: 'Marketing & Sales', icon: <MarketingIcon /> },
      { name: 'Photoshop', icon: <PhotoshopIcon /> },
    ]
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Leadership' },
      { name: 'Communication' },
      { name: 'Teamwork' },
      { name: 'Strategic Thinking' },
    ]
  }
];

const Skills = memo(() => {
  return (
    <section className="relative container py-16 md:py-24 overflow-hidden">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={ANIMATION_VARIANTS.staggerContainer}
        className="relative"
      >
        {/* Header */}
        <motion.div
          variants={ANIMATION_VARIANTS.slideUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-300 via-blue-300 to-primary-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive blend of technical prowess and business acumen
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Introduction */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-700/50"
              style={{ 
                backdropFilter: 'blur(20px)', 
                background: 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(51,65,85,0.8) 100%)', 
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3), 0 2px 16px 0 rgba(80,200,255,0.1)' 
              }}
            >
              <h3 className="text-2xl font-bold mb-4 text-primary-300">What I Bring</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  As a <span className="font-semibold text-white">full-stack developer</span>, I specialize in building scalable web applications with clean architecture and modern design patterns.
                </p>
                <p>
                  My unique perspective comes from blending technical expertise with a strong foundation in <span className="font-semibold text-white">Business & Commerce</span>, allowing me to understand both implementation and business value.
                </p>
                <p>
                  I excel in <span className="font-semibold text-white">leadership roles</span>, driving teams toward common goals through effective communication and strategic thinking.
                </p>
              </div>
            </div>

            {/* Visual Accent - Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block relative rounded-2xl overflow-hidden border border-slate-700/50"
              style={{
                background: 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15), transparent 60%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.15), transparent 60%), linear-gradient(135deg, rgba(30,41,59,0.95), rgba(51,65,85,0.9))',
              }}
            >
              <div className="grid grid-cols-2 divide-x divide-slate-700/50">
                <div className="p-8 text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    2+
                  </div>
                  <p className="text-slate-300 text-sm font-medium">Years Experience</p>
                </div>
                <div className="p-8 text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-primary-400 bg-clip-text text-transparent mb-2">
                    17+
                  </div>
                  <p className="text-slate-300 text-sm font-medium">Projects Completed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Skills Grid */}
          <motion.div
            variants={ANIMATION_VARIANTS.slideUp}
            className="space-y-6"
          >
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card p-6 rounded-2xl border border-slate-700/50"
                style={{ 
                  backdropFilter: 'blur(20px)', 
                  background: 'linear-gradient(135deg, rgba(30,41,59,0.85) 0%, rgba(51,65,85,0.75) 100%)', 
                  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.2), 0 1px 8px 0 rgba(80,200,255,0.08)' 
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-300 ring-1 ring-primary/30 hover:ring-primary/50 transition-all duration-300 cursor-default"
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
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;
