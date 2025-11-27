import Hero from '@components/Hero';
import Skills from '@components/Skills';
import ProjectsGrid from '@components/ProjectsGrid';
import About from './About';
import Contact from './Contact';

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      {/* Inline sections for smooth homepage flow */}
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <ProjectsGrid featured limit={6} />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
