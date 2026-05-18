import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Activity } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await signup(name, email, password);
    setIsSubmitting(false);
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-panel p-10 rounded-3xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
        
        <div>
          <div className="flex justify-center">
            <div className="p-3 bg-white/5 rounded-2xl shadow-inner border border-white/10">
              <Activity className="h-10 w-10 text-purple-400" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Join the premium analytics platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="sr-only">Full Name</label>
              <input
                type="text"
                required
                className="w-full glass-input"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              className="group w-full flex justify-center py-3.5 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] disabled:opacity-50"
            >
              {isSubmitting ? 'Creating account...' : 'Sign Up'}
            </button>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
