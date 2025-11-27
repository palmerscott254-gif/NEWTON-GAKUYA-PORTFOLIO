export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900/80 ring-1 ring-white/10">
      <div className="container py-8 text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Newton Gakuya. All rights reserved.</p>
      </div>
    </footer>
  );
}
