type SkillGroup = {
  title: string;
  skills: string[];
};

const skillData: SkillGroup[] = [
  { title: 'Primary', skills: ['Django', 'Python', 'React'] },
  { title: 'Secondary', skills: ['HTML'] },
  { title: 'Basic', skills: ['JavaScript'] },
  { title: 'Business/Finance Basics', skills: ['Financial Analysis', 'Accounting', 'Financial Management', 'Business Advising'] }
];

export default function Skills() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {skillData.map((group) => (
          <div key={group.title} className="card p-6">
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <span key={s} className="rounded-md bg-slate-700/60 px-3 py-1 text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
