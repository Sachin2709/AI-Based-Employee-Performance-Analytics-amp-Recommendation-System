import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity, LogOut, Users, PlusCircle, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-panel sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="p-2 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors border border-indigo-500/20">
                <Activity className="h-6 w-6 text-indigo-400" />
              </div>
              <span className="font-bold text-xl text-white hidden sm:block tracking-wide">EmpAlytics <span className="text-indigo-400">AI</span></span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-2">
              <Link to="/" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive('/') ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/employees" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive('/employees') ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <Users className="w-4 h-4" /> Directory
              </Link>
              <Link to="/employees/new" className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${isActive('/employees/new') ? 'bg-white/10 text-white shadow-inner border border-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <PlusCircle className="w-4 h-4" /> Add New
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md border border-white/20">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="text-sm">
                <p className="text-white font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-400">Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
