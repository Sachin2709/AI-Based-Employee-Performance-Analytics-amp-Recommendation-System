import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, TrendingUp, Award, BarChart3, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link } from 'react-router-dom';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-lg !bg-slate-900/90 !border-slate-700">
        <p className="text-white font-semibold">{label}</p>
        <p className="text-indigo-400">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await api.get('/employees');
        setEmployees(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch employees', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  // Analytics Calculations
  const totalEmployees = employees.length;
  const avgPerformance = totalEmployees ? (employees.reduce((acc, emp) => acc + emp.performanceScore, 0) / totalEmployees).toFixed(1) : 0;
  const topPerformers = employees.filter(emp => emp.performanceScore >= 90).length;
  
  // Department Distribution
  const deptCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});
  const deptData = Object.keys(deptCount).map(key => ({ name: key, value: deptCount[key] }));

  // Top 5 Employees
  const top5Employees = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);

  return (
    <div className="space-y-8 mt-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Analytics Overview</h1>
          <p className="text-slate-400 mt-1">Monitor your organization's performance metrics</p>
        </div>
        <Link to="/employees" className="hidden sm:flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          View all employees <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-colors"></div>
          <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20"><Users className="w-8 h-8 text-indigo-400" /></div>
          <div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Total Employees</p>
            <p className="text-4xl font-bold text-white">{totalEmployees}</p>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors"></div>
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"><TrendingUp className="w-8 h-8 text-emerald-400" /></div>
          <div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Avg Performance</p>
            <p className="text-4xl font-bold text-white">{avgPerformance}<span className="text-xl text-slate-500">/100</span></p>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-6 flex items-center gap-5 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-colors"></div>
          <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20"><Award className="w-8 h-8 text-amber-400" /></div>
          <div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Top Performers</p>
            <p className="text-4xl font-bold text-white">{topPerformers}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Chart */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-purple-400"/> Department Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deptData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={90} fill="#8884d8" dataKey="value" stroke="rgba(255,255,255,0.1)" strokeWidth={2}>
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Employees Chart */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Award className="w-5 h-5 text-orange-400"/> Top 5 Performers</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top5Employees} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} content={<CustomTooltip />} />
                <Bar dataKey="performanceScore" fill="url(#colorUv)" name="Score" radius={[6, 6, 0, 0]} maxBarSize={40} />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
