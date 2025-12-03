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
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container">
        {/* Background Gradient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
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
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="section-heading mb-6">
              Skills & Expertise
            </h2>
            <p className="section-subheading mx-auto">
              A comprehensive blend of technical prowess and business acumen
            </p>
          </motion.div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Introduction */}
            <motion.div
              variants={ANIMATION_VARIANTS.slideUp}
              className="space-y-8"
            >
              <div className="glass-card p-8 md:p-10">
                <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">What I Bring</h3>
                <div className="space-y-5 text-slate-200 leading-relaxed text-base md:text-lg">
                <p>
                  As a <span className="font-bold text-cyan-400">full-stack developer</span>, I specialize in building scalable web applications with clean architecture and modern design patterns.
                </p>
                <p>
                  My unique perspective comes from blending technical expertise with a strong foundation in <span className="font-bold text-blue-400">Business & Commerce</span>, allowing me to understand both implementation and business value.
                </p>
                <p>
                  I excel in <span className="font-bold text-cyan-400">leadership roles</span>, driving teams toward common goals through effective communication and strategic thinking.
                </p>
                </div>
              </div>

              {/* Visual Accent - Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden lg:block glass-card overflow-hidden"
              >
                <div className="grid grid-cols-2 divide-x divide-white/10">
                  <div className="p-10 text-center group hover:bg-white/5 transition-colors">
                    <div className="text-6xl font-black bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                      2+
                    </div>
                    <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">Years Experience</p>
                  </div>
                  <div className="p-10 text-center group hover:bg-white/5 transition-colors">
                    <div className="text-6xl font-black bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                      17+
                    </div>
                    <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">Projects Completed</p>
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
                className="glass-card p-8"
              >
                <h3 className="text-2xl font-black mb-6 text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-300 ring-1 ring-cyan-500/30 hover:ring-cyan-400/60 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 cursor-default font-semibold text-sm"
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
