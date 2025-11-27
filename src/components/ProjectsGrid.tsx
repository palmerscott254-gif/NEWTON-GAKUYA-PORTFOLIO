import { Link } from 'react-router-dom';

type Project = {
  title: string;
  description: string;
  href: string; // project link
};

const projects: Project[] = [
  { title: 'Project A', description: 'Django REST + React SPA.', href: '#' },
  { title: 'Project B', description: 'Python data tool.', href: '#' }
];

export default function ProjectsGrid() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} className="card p-6">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-slate-300">{p.description}</p>
            <Link to={p.href} className="btn mt-4">View the Project</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
