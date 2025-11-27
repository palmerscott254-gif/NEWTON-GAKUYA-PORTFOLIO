import Hero from '@components/Hero';
import Skills from '@components/Skills';
import ProjectsGrid from '@components/ProjectsGrid';
import About from './About';
import Contact from './Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      {/* Inline sections for smooth homepage flow */}
      <About />
      <ProjectsGrid featured limit={6} />
      <Contact />
    </>
  );
}
