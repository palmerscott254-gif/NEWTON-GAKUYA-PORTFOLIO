import { motion } from 'framer-motion';
import { VideoBackground } from '@components/Background';
import Hero from '@components/Hero';
import Skills from '@components/Skills';
import ProjectsGrid from '@components/ProjectsGrid';
import LiveStats from '@components/LiveStats';
import JourneyTimeline from '@components/JourneyTimeline';
import InteractiveTerminal from '@components/InteractiveTerminal';
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
      <section id="timeline" className="relative z-10 bg-black bg-opacity-95">
        <JourneyTimeline />
      </section>
      <section id="skills" className="relative z-10 bg-black bg-opacity-95">
        <Skills />
      </section>
      <section id="stats" className="relative z-10 bg-black bg-opacity-95">
        <LiveStats />
      </section>
      <section id="projects" className="container py-12 md:py-20 relative z-10 bg-black bg-opacity-95">
        <motion.div
          initial="initial"
          animate="animate"
          variants={ANIMATION_VARIANTS.fadeIn}
        >
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Projects Command Center</p>
            <h1 className="mt-3 text-4xl font-black md:text-5xl">Engineering work, scanned live.</h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              Each project is presented as an interactive system card so visitors can understand the purpose, architecture, technologies, live status, and quality of the build without relying on large screenshots.
            </p>
          </motion.div>
          <ProjectsGrid />
        </motion.div>
      </section>
      <section id="terminal" className="relative z-10 bg-black bg-opacity-95">
        <InteractiveTerminal />
      </section>
      <section id="contact" className="relative z-10 bg-black bg-opacity-95">
        <Contact />
      </section>
    </>
  );
}
