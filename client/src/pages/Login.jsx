import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Activity } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.success) {
      toast.success('Logged in successfully!');
      navigate('/');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div>
          <div className="flex justify-center">
            <div className="p-3 bg-white/5 rounded-2xl shadow-inner border border-white/10">
              <Activity className="h-10 w-10 text-indigo-400" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Enter your credentials to access the portal
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="sr-only">Email address</label>
              <input
                type="email"
                required
                className="w-full glass-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                required
                className="w-full glass-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group w-full flex justify-center py-3.5 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] disabled:opacity-50"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
