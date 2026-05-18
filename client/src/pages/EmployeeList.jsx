import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Search, Filter, Edit, Trash2, BrainCircuit, Users } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (department) query.append('department', department);
        
        const { data } = await api.get(`/employees/search?${query.toString()}`);
        setEmployees(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch employees', error);
        toast.error('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchEmployees();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, department]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        toast.success('Employee deleted');
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (error) {
        console.error('Failed to delete employee', error);
        toast.error('Failed to delete employee');
      }
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Employee Directory</h1>
          <p className="text-slate-400 mt-1">Manage and analyze your workforce</p>
        </div>
        <Link to="/employees/new" className="glass-button bg-gradient-to-r from-indigo-600 to-purple-600 border-none px-6">
          + Add New Employee
        </Link>
      </div>

      <div className="glass-panel p-5 rounded-2xl flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-3 glass-input text-base"
            placeholder="Search employees by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-slate-400" />
          </div>
          <select
            className="block w-full pl-11 pr-10 glass-input appearance-none cursor-pointer text-base"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="" className="bg-slate-900 text-white">All Departments</option>
            <option value="Engineering" className="bg-slate-900 text-white">Engineering</option>
            <option value="HR" className="bg-slate-900 text-white">HR</option>
            <option value="Sales" className="bg-slate-900 text-white">Sales</option>
            <option value="Marketing" className="bg-slate-900 text-white">Marketing</option>
            <option value="Finance" className="bg-slate-900 text-white">Finance</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>
      ) : (
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-5 text-right text-xs font-bold text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-3">
                        <Users className="w-12 h-12 text-slate-600" />
                        <p>No employees found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg uppercase shadow-lg group-hover:scale-105 transition-transform">
                            {emp.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-bold text-white">{emp.name}</div>
                            <div className="text-sm text-slate-400">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-4 py-1.5 inline-flex text-xs font-bold rounded-full bg-white/10 text-slate-200 border border-white/10">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="w-full bg-white/5 rounded-full h-2.5 w-32 overflow-hidden border border-white/5">
                            <div 
                              className={`h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] ${emp.performanceScore >= 80 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : emp.performanceScore >= 50 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-rose-400 to-red-500'}`} 
                              style={{ width: `${emp.performanceScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-slate-200 w-8">{emp.performanceScore}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3 items-center">
                          <Link to={`/ai-recommendation/${emp._id}`} className="text-indigo-400 hover:text-indigo-300 p-2 hover:bg-indigo-500/10 rounded-xl transition-all group/btn relative">
                            <BrainCircuit className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">AI Insight</span>
                          </Link>
                          <Link to={`/employees/edit/${emp._id}`} className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-xl transition-all">
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button onClick={() => handleDelete(emp._id)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-xl transition-all">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
