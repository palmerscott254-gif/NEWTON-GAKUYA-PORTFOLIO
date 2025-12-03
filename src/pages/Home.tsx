import { motion } from 'framer-motion';
import { VideoBackground } from '@components/Background';
import Hero from '@components/Hero';
import Skills from '@components/Skills';
import ProjectsGrid from '@components/ProjectsGrid';
import { ANIMATION_VARIANTS } from '@lib/constants';
import About from './About';
import Contact from './Contact';

export default function Home() {
  return (
    <>
      <VideoBackground />
      <section id="hero" className="relative z-10 bg-black bg-opacity-95">
        <Hero />
      </section>
      {/* Inline sections for smooth homepage flow */}
      <section id="about" className="relative z-10 bg-black bg-opacity-95">
        <About />
      </section>
      <section id="skills" className="relative z-10 bg-black bg-opacity-95">
        <Skills />
      </section>
      <section id="projects" className="container py-12 md:py-20 relative z-10 bg-black bg-opacity-95">
        <motion.div
          initial="initial"
          animate="animate"
          variants={ANIMATION_VARIANTS.fadeIn}
        >
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
            <p className="text-lg text-slate-300 max-w-3xl">
              A collection of my work showcasing web development, UI/UX design,
              and full-stack applications built with modern technologies.
            </p>
          </motion.div>
          <ProjectsGrid />
        </motion.div>
      </section>
      <section id="contact" className="relative z-10 bg-black bg-opacity-95">
        <Contact />
      </section>
    </>
  );
}
