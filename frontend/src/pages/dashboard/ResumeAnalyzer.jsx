import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertCircle, FileText, Sparkles, BookOpen, Zap, TrendingUp } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [checklist, setChecklist] = useState([
    { id: 'layout', text: 'Single-column layout (no sidebars/columns)', checked: false },
    { id: 'tables', text: 'No tables, text boxes, or graphics', checked: false },
    { id: 'headers', text: 'Standard headers (Skills, Experience, Education)', checked: false },
    { id: 'verbs', text: 'Bullets start with active power verbs (Engineered, Architected)', checked: false },
    { id: 'metrics', text: 'Quantified results (percentages, time saved, metrics)', checked: false },
  ]);

  const toggleChecklist = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    // Check if file is PDF
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert("Please upload a PDF file for accurate analysis.");
      return;
    }
    
    setAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/resume/analyze`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed. Make sure the backend is running and the API key is valid.');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert(error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const getCategoryStyles = (category) => {
    switch (category?.toLowerCase()) {
      case 'formatting':
      case 'layout':
        return {
          badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          icon: <BookOpen className="w-5 h-5 text-indigo-400" />
        };
      case 'impact':
      case 'action verbs':
        return {
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          icon: <Zap className="w-5 h-5 text-rose-400" />
        };
      case 'metrics':
      case 'quantification':
        return {
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          icon: <TrendingUp className="w-5 h-5 text-amber-400" />
        };
      default:
        return {
          badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          icon: <Sparkles className="w-5 h-5 text-sky-400" />
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Resume Analyzer</h1>
        <p className="text-slate-400">Upload your resume to get instant ATS optimization feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark p-8 rounded-2xl"
          >
            <div 
              className="border-2 border-dashed border-slate-700 rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('resume-upload').click()}
            >
              <input 
                type="file" 
                id="resume-upload" 
                className="hidden" 
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <UploadCloud className="w-12 h-12 text-primary mx-auto mb-4" />
              {file ? (
                <div className="text-white flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  {file.name}
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-white mb-1">Click to upload or drag and drop</h3>
                  <p className="text-slate-400 text-sm">PDF format only, up to 5MB</p>
                </>
              )}
            </div>
            
            <button 
              onClick={handleUpload}
              disabled={!file || analyzing}
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing with AI...
                </>
              ) : 'Analyze Resume'}
            </button>
          </motion.div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark p-8 rounded-2xl space-y-6"
            >
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">Improvement Suggestions</h3>
              <ul className="space-y-4">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {result && result.enhancementTips && result.enhancementTips.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-dark p-8 rounded-2xl space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                <h3 className="text-xl font-bold text-white">Pro Resume Enhancement Tips</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.enhancementTips.map((tipObj, i) => {
                  const styles = getCategoryStyles(tipObj.category);
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, translateY: -2 }}
                      className="p-5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between gap-3 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${styles.badge}`}>
                          {tipObj.category}
                        </span>
                        {styles.icon}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed z-10">{tipObj.tip}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        <div>
          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark p-6 rounded-2xl sticky top-6"
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-primary/20 relative">
                  <span className="text-4xl font-bold text-white">{result.score}</span>
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary" strokeDasharray={`${result.score * 3.51} 351`} />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mt-4">ATS Score</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Detected Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map(k => (
                      <span key={k} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm rounded-lg border border-emerald-500/20">{k}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" /> Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missing.map(k => (
                      <span key={k} className="px-3 py-1 bg-red-500/10 text-red-400 text-sm rounded-lg border border-red-500/20">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-dark p-6 rounded-2xl border border-slate-700/50 space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  ATS Optimization Guide
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">Check off these guidelines before uploading your resume to maximize your score!</p>
              </div>

              <div className="space-y-3">
                {checklist.map(item => (
                  <label 
                    key={item.id} 
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:bg-slate-850/40 hover:border-slate-700/60 cursor-pointer select-none transition-all"
                  >
                    <input 
                      type="checkbox" 
                      className="mt-1 accent-primary rounded border-slate-700 bg-slate-900 focus:ring-primary w-4 h-4 shrink-0"
                      checked={item.checked}
                      onChange={() => toggleChecklist(item.id)}
                    />
                    <span className={`text-xs leading-relaxed transition-all ${item.checked ? 'text-slate-500 line-through' : 'text-slate-300 font-medium'}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/80 to-indigo-950/20 border border-indigo-500/10">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-400" /> Pro Writing Formula
                </h4>
                <p className="text-xs text-slate-300 font-semibold mb-2 leading-relaxed">
                  Action Verb + Task + Quantifiable Result
                </p>
                <div className="p-3 rounded bg-slate-950/60 border border-slate-900 text-[10px] text-slate-400 leading-relaxed italic">
                  "Spearheaded React migration for 5 legacy applications, reducing client-side load time by 38% and boosting user engagement metrics."
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
