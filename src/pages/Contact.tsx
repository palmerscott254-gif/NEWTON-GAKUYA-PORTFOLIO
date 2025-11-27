export default function Contact() {
  return (
    <section className="container py-12">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="mt-4 text-slate-300">Reach out via LinkedIn or email.</p>
      <div className="mt-6 flex gap-3">
        <a className="btn" href="mailto:newton.gakuya24@students.dkut.ac.ke">Email Me</a>
        <a className="btn" href="https://www.linkedin.com/in/gakuya-227148385" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}
