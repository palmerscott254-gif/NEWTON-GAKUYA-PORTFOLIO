import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/60 ring-1 ring-white/10">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-extrabold tracking-tight text-xl">NG Portfolio</Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-primary-light' : 'hover:text-primary'}>Home</NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? 'text-primary-light' : 'hover:text-primary'}>Projects</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'text-primary-light' : 'hover:text-primary'}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'text-primary-light' : 'hover:text-primary'}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
