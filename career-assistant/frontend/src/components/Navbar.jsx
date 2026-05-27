import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass fixed w-full z-50 top-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <Link to="/" className="text-2xl font-bold text-gradient">
              CareerForge AI
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/features" className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Features</Link>
            <Link to="/pricing" className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">Pricing</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-primary font-medium hover:bg-primary/10 rounded-lg transition-colors">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-primary text-white font-medium rounded-lg shadow-lg hover:bg-primary/90 transition-all hover:scale-105">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
