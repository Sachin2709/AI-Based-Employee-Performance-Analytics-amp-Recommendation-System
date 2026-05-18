import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Save } from 'lucide-react';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: 50,
    experience: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchEmployee = async () => {
        try {
          const { data } = await api.get(`/employees`);
          const emp = data.find(e => e._id === id);
          if (emp) {
            setFormData({
              name: emp.name,
              email: emp.email,
              department: emp.department,
              skills: emp.skills.join(', '),
              performanceScore: emp.performanceScore,
              experience: emp.experience,
            });
          }
        } catch (error) {
          console.error('Failed to load employee data', error);
          toast.error('Failed to load employee data');
        }
      };
      fetchEmployee();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      performanceScore: Number(formData.performanceScore),
      experience: Number(formData.experience),
    };

    try {
      if (isEditMode) {
        await api.put(`/employees/${id}`, payload);
        toast.success('Employee updated successfully');
      } else {
        await api.post('/employees', payload);
        toast.success('Employee created successfully');
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-4">
      <div className="flex items-center gap-4">
        <Link to="/employees" className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all text-slate-300 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">{isEditMode ? 'Edit Employee Data' : 'Onboard New Employee'}</h1>
      </div>

      <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-300 ml-1">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full glass-input" placeholder="e.g. Jane Doe" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-300 ml-1">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full glass-input" placeholder="jane.doe@company.com" />
            </div>
            <div className="space-y-2 relative">
              <label className="block text-sm font-bold text-slate-300 ml-1">Department</label>
              <select name="department" required value={formData.department} onChange={handleChange} className="w-full glass-input appearance-none">
                <option value="" className="bg-slate-900">Select Department</option>
                <option value="Engineering" className="bg-slate-900">Engineering</option>
                <option value="HR" className="bg-slate-900">HR</option>
                <option value="Sales" className="bg-slate-900">Sales</option>
                <option value="Marketing" className="bg-slate-900">Marketing</option>
                <option value="Finance" className="bg-slate-900">Finance</option>
              </select>
              <div className="absolute top-10 right-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-300 ml-1">Years of Experience</label>
              <input type="number" name="experience" min="0" required value={formData.experience} onChange={handleChange} className="w-full glass-input" placeholder="e.g. 5" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-slate-300 ml-1">Skills (comma separated)</label>
              <input type="text" name="skills" required placeholder="e.g. React, Node.js, Python, Leadership" value={formData.skills} onChange={handleChange} className="w-full glass-input" />
            </div>
            <div className="md:col-span-2 space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
              <label className="flex justify-between items-center text-sm font-bold text-slate-300">
                <span>Performance Score Evaluation (1-100)</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-2xl px-4 py-1 bg-white/5 rounded-xl border border-white/10">{formData.performanceScore}</span>
              </label>
              <input type="range" name="performanceScore" min="1" max="100" value={formData.performanceScore} onChange={handleChange} className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-colors" />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={loading} className="glass-button bg-gradient-to-r from-indigo-600 to-purple-600 border-none flex items-center gap-2">
              <Save className="w-5 h-5" />
              {loading ? 'Processing...' : 'Save Employee Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
