import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import AIRecommendation from './pages/AIRecommendation';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#030712]">
        {/* Animated Mesh Gradient Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }}></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-pink-600/20 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }}></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <ToastContainer position="top-right" autoClose={3000} theme="dark" toastClassName="glass-panel" />
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
              <Route path="/employees/new" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
              <Route path="/employees/edit/:id" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />
              <Route path="/ai-recommendation/:id" element={<ProtectedRoute><AIRecommendation /></ProtectedRoute>} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
