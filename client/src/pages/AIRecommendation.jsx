import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { ArrowLeft, Download, BrainCircuit, AlertCircle, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactMarkdown from 'react-markdown';

const AIRecommendation = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(true);
  const [generatingAI, setGeneratingAI] = useState(true);
  const reportRef = useRef();

  useEffect(() => {
    const fetchAndAnalyze = async () => {
      try {
        const empRes = await api.get(`/employees`);
        const emp = empRes.data.find(e => e._id === id);
        if (!emp) {
          toast.error('Employee not found');
          setLoading(false);
          return;
        }
        setEmployee(emp);
        setLoading(false);

        try {
          const aiRes = await api.post('/ai/recommend', { employeeData: emp });
          setRecommendation(aiRes.data.recommendation);
        } catch (error) {
          console.error('Failed to generate AI recommendation', error);
          toast.error('Failed to generate AI recommendation');
          setRecommendation('### Error\nFailed to reach AI service.');
        } finally {
          setGeneratingAI(false);
        }

      } catch (error) {
        console.error('Failed to load employee data', error);
        toast.error('Failed to load employee data');
        setLoading(false);
      }
    };
    fetchAndAnalyze();
  }, [id]);

  const handleExportPDF = async () => {
    const element = reportRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { 
        scale: 2,
        backgroundColor: '#0f172a' // Slate 900 background for the PDF
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Black background for the PDF page
      pdf.setFillColor(15, 23, 42); 
      pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${employee.name.replace(/\s+/g, '_')}_AI_Report.pdf`);
      toast.success('Report exported successfully');
    } catch (error) {
      console.error('Failed to export PDF', error);
      toast.error('Failed to export PDF');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div></div>;
  }

  if (!employee) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/employees" className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all text-slate-300 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Deep Analysis</h1>
        </div>
        <button 
          onClick={handleExportPDF} 
          disabled={generatingAI}
          className="glass-button flex items-center gap-2 py-2.5 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* The Report Section */}
      <div ref={reportRef} className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden bg-slate-900/80">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        {/* Glow effect */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

        <div className="border-b border-white/10 pb-8 mb-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-indigo-400" />
                <h2 className="text-4xl font-extrabold text-white tracking-tight">{employee.name}</h2>
              </div>
              <p className="text-xl font-medium text-slate-400 ml-9">{employee.department} Division</p>
              <div className="mt-6 flex flex-wrap gap-4 ml-9">
                <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl text-sm font-bold flex flex-col">
                  <span className="text-xs font-medium text-slate-500 uppercase">Experience</span>
                  <span className="text-lg">{employee.experience} Years</span>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl text-sm font-bold flex flex-col">
                  <span className="text-xs font-medium text-slate-500 uppercase">Performance</span>
                  <span className="text-lg">{employee.performanceScore} / 100</span>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.15)] hidden sm:block">
              <BrainCircuit className="w-16 h-16 text-indigo-400" />
            </div>
          </div>
          <div className="mt-8 ml-0 sm:ml-9">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Verified Skills</h4>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((skill, index) => (
                <span key={index} className="px-4 py-1.5 bg-white/5 border border-white/10 text-slate-300 font-medium rounded-lg text-sm shadow-sm">{skill}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none prose-headings:text-indigo-300 prose-a:text-pink-400 prose-strong:text-purple-300 prose-li:text-slate-300 relative z-10">
          {generatingAI ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[40px] opacity-40 animate-pulse"></div>
                <BrainCircuit className="w-20 h-20 text-indigo-400 animate-bounce relative z-10" />
              </div>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-extrabold mt-8 text-2xl tracking-wide text-center">Synthesizing Neural Insights</h3>
              <p className="text-slate-400 mt-2">Our AI is analyzing the performance matrix...</p>
            </div>
          ) : (
            <div className="animation-fade-in">
              <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-2xl mb-10 flex gap-4 shadow-sm">
                <AlertCircle className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-200 m-0 leading-relaxed font-medium">This proprietary analysis is generated dynamically via large language models. Interpret results contextually alongside human managerial reviews.</p>
              </div>
              <div className="text-slate-300 leading-loose text-lg">
                <ReactMarkdown>{recommendation}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
