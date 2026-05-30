import { motion } from 'framer-motion';
import { FormEvent, memo, useMemo, useState } from 'react';

interface TerminalEntry {
  id: number;
  type: 'command' | 'output';
  text: string;
}

const COMMAND_OUTPUTS: Record<string, string[]> = {
  help: [
    'Available commands:',
    '- whoami   : Quick profile summary',
    '- skills   : Core technology strengths',
    '- projects : Highlight projects and focus',
    '- contact  : Fastest way to reach me',
    '- help     : Show this command list'
  ],
  whoami: [
    'Newton Gakuya',
    'Full-Stack Developer (Django/Python/React)',
    'Commerce student blending business strategy and engineering execution.'
  ],
  skills: [
    'Core stack: Python, Django, React, JavaScript, PostgreSQL',
    'Workflow: Git, Linux, API design, performance optimization',
    'Strength: Building production-ready interfaces with scalable backend logic.'
  ],
  projects: [
    'Featured builds include CPA Academy and Pie Global Furnitures.',
    'Focus: performant UX, practical business value, and maintainable architecture.',
    'Use the Projects section to open live demos and repositories.'
  ],
  contact: [
    'Email: newton.gakuya24@students.dkut.ac.ke',
    'WhatsApp and LinkedIn are available in the Contact section.',
    'I usually respond quickly to project and collaboration inquiries.'
  ]
};

const INITIAL_HISTORY: TerminalEntry[] = [
  { id: 1, type: 'output', text: 'NG-Terminal v2.6.0 initialized.' },
  { id: 2, type: 'output', text: 'Type help to list available commands.' }
];

const InteractiveTerminal = memo(() => {
  const [history, setHistory] = useState<TerminalEntry[]>(INITIAL_HISTORY);
  const [input, setInput] = useState('');

  const nextId = useMemo(() => history.length + 1, [history.length]);

  const runCommand = (command: string) => {
    const normalized = command.trim().toLowerCase();
    const outputLines = COMMAND_OUTPUTS[normalized] ?? [
      `Command not found: ${normalized}`,
      'Type help for available commands.'
    ];

    const commandEntry: TerminalEntry = {
      id: nextId,
      type: 'command',
      text: `newton@portfolio:~$ ${normalized}`
    };

    const outputEntries: TerminalEntry[] = outputLines.map((line, idx) => ({
      id: nextId + idx + 1,
      type: 'output',
      text: line
    }));

    setHistory((prev) => [...prev, commandEntry, ...outputEntries]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) {
      return;
    }

    runCommand(input);
    setInput('');
  };

  return (
    <section className="container py-20 md:py-28" aria-labelledby="terminal-heading">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Developer Interface</p>
        <h2 id="terminal-heading" className="section-heading mt-3">
          Interactive Terminal
        </h2>
        <p className="section-subheading mt-4 max-w-4xl">
          Explore profile details with command-style interactions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="glass-card mt-10 overflow-hidden p-0"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <p className="font-mono text-xs tracking-[0.2em] text-slate-300">/usr/newton/portfolio-shell</p>
        </div>

        <div className="max-h-[340px] min-h-[300px] overflow-y-auto bg-slate-950/75 px-5 py-4 font-mono text-sm leading-7 text-slate-200">
          {history.map((entry) => (
            <p
              key={`${entry.id}-${entry.text}`}
              className={entry.type === 'command' ? 'text-cyan-300' : 'text-slate-200'}
            >
              {entry.text}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-white/10 bg-slate-950/80 px-5 py-3">
          <label htmlFor="terminal-command" className="sr-only">
            Enter terminal command
          </label>
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-cyan-300">newton@portfolio:~$</span>
            <input
              id="terminal-command"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
              placeholder="Type a command..."
              autoComplete="off"
              spellCheck={false}
              aria-describedby="terminal-command-help"
            />
          </div>
          <p id="terminal-command-help" className="sr-only" aria-live="polite">
            Available commands: whoami, skills, projects, contact, help.
          </p>
        </form>
      </motion.div>
    </section>
  );
});

InteractiveTerminal.displayName = 'InteractiveTerminal';

export default InteractiveTerminal;
