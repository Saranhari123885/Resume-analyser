import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Code, MessageSquare, Map, User, LogOut, Menu, X, Users, Edit2, Check, Mail, Briefcase, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      role: '',
      github: '',
      skills: ''
    };
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(editForm));
    setProfile(editForm);
    setProfileOpen(false);
  };

  const menuItems = [
    { path: '/dashboard/resume', icon: <FileText size={20} />, label: 'Resume Analyzer' },
    { path: '/dashboard/project', icon: <Code size={20} />, label: 'Project Generator' },
    { path: '/dashboard/interview', icon: <MessageSquare size={20} />, label: 'Interview Prep' },
    { path: '/dashboard/hr-questions', icon: <Users size={20} />, label: 'HR Questions' },
    { path: '/dashboard/roadmap', icon: <Map size={20} />, label: 'AI Roadmaps' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 glass-dark transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col h-full border-r border-slate-800`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <Link to="/" className="text-xl font-bold text-gradient flex items-center gap-2">
            <LayoutDashboard className="text-primary" />
            CareerForge
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div 
            onClick={() => { setEditForm({...profile}); setProfileOpen(true); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <User size={20} />
            <span className="font-medium">Profile</span>
          </div>
          <div 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 glass-dark border-b border-slate-800 flex items-center justify-between px-6 lg:justify-end shrink-0">
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity" 
              onClick={() => { setEditForm({...profile}); setProfileOpen(true); }}
            >
              <span className="text-slate-300 text-sm font-medium hidden sm:inline">{profile.name || profile.email || 'User'}</span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold border border-slate-800 shadow">
                {(profile.name || profile.email || 'User').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-6">
          <Outlet />
        </main>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {profileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="glass-dark w-full max-w-lg p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden z-10 text-left"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Your Profile</h3>
                </div>
                <button 
                  onClick={() => setProfileOpen(false)} 
                  className="text-slate-400 hover:text-white p-1 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                    value={editForm.email}
                    onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Target Job Role</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                    value={editForm.role}
                    onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">GitHub Link</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                    value={editForm.github}
                    onChange={e => setEditForm({ ...editForm, github: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Key Skills (Comma Separated)</label>
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                    value={editForm.skills}
                    onChange={e => setEditForm({ ...editForm, skills: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-800/60 mt-6">
                  <button
                    type="button"
                    onClick={() => setProfileOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-slate-800 hover:bg-slate-800 text-slate-300 text-sm font-semibold rounded-xl transition-colors uppercase tracking-wide"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wide"
                  >
                    <Check size={16} /> Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
