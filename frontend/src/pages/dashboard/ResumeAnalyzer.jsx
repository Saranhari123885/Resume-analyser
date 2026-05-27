import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertCircle, FileText, Sparkles, BookOpen, Zap, TrendingUp, HelpCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState('all');


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
            <div className="space-y-6">
              {result.improvements && result.improvements.length > 0 ? (
                <>
                  {/* Potential Score Simulator */}
                  {(() => {
                    const totalScoreIncrease = result.improvements.reduce((sum, imp) => sum + (imp.scoreIncrease || 0), 0);
                    const potentialScore = Math.min(100, result.score + totalScoreIncrease);
                    const highCount = result.improvements.filter(imp => imp.priority?.toLowerCase().includes('high')).length;
                    const mediumCount = result.improvements.filter(imp => imp.priority?.toLowerCase().includes('medium')).length;
                    const optionalCount = result.improvements.filter(imp => imp.priority?.toLowerCase().includes('optional') || imp.priority?.toLowerCase().includes('low')).length;
                    const allCount = result.improvements.length;

                    const filteredImprovements = result.improvements.filter(imp => {
                      if (selectedPriority === 'all') return true;
                      if (selectedPriority === 'high') return imp.priority?.toLowerCase().includes('high');
                      if (selectedPriority === 'medium') return imp.priority?.toLowerCase().includes('medium');
                      if (selectedPriority === 'optional') return imp.priority?.toLowerCase().includes('optional') || imp.priority?.toLowerCase().includes('low');
                      return true;
                    });

                    return (
                      <div className="space-y-6">
                        {/* Simulator Header Card */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-dark p-6 rounded-2xl border border-slate-800/80 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                            <div className="space-y-2 text-center md:text-left">
                              <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                                <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                                <span className="text-sm font-semibold uppercase tracking-wider">ATS Score Optimizer</span>
                              </div>
                              <h3 className="text-2xl font-bold text-white">Resume Action Plan</h3>
                              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                                Implement these personalized improvements tailored directly to your resume to close the gaps and maximize your interview chances.
                              </p>
                            </div>

                            <div className="flex items-center gap-6 bg-slate-950/40 p-4 rounded-xl border border-slate-800/80 shadow-inner">
                              <div className="text-center">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current</div>
                                <div className="text-3xl font-extrabold text-slate-300">{result.score}</div>
                              </div>
                              <div className="h-8 w-px bg-slate-800" />
                              <div className="text-center">
                                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Impact</div>
                                <div className="text-3xl font-extrabold text-emerald-400">+{totalScoreIncrease}</div>
                              </div>
                              <div className="h-8 w-px bg-slate-800" />
                              <div className="text-center">
                                <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Potential</div>
                                <div className="text-3xl font-extrabold text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{potentialScore}</div>
                              </div>
                            </div>
                          </div>

                          {/* Beautiful Dual Colored Progress Bar */}
                          <div className="mt-6 space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold text-slate-400">
                              <span>Optimization Progress</span>
                              <span className="text-emerald-400">{potentialScore}% Potential ATS Rating</span>
                            </div>
                            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800/60">
                              <div className="h-full flex rounded-full overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-indigo-500 to-primary transition-all duration-1000"
                                  style={{ width: `${result.score}%` }}
                                />
                                {totalScoreIncrease > 0 && (
                                  <div 
                                    className="bg-emerald-500 animate-pulse transition-all duration-1000"
                                    style={{ width: `${Math.min(100 - result.score, totalScoreIncrease)}%` }}
                                  />
                                )}
                              </div>
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 pt-0.5 font-medium">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Current ({result.score}%)</span>
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Actionable Gaps (+{totalScoreIncrease}%)</span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-4">
                          <button 
                            onClick={() => setSelectedPriority('all')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                              selectedPriority === 'all' 
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                                : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:border-slate-700 hover:text-slate-300'
                            }`}
                          >
                            All ({allCount})
                          </button>
                          <button 
                            onClick={() => setSelectedPriority('high')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                              selectedPriority === 'high' 
                                ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-600/20' 
                                : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:border-rose-500/30 hover:text-rose-400'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                            High Priority ({highCount})
                          </button>
                          <button 
                            onClick={() => setSelectedPriority('medium')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                              selectedPriority === 'medium' 
                                ? 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-600/20' 
                                : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:border-amber-500/30 hover:text-amber-400'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Medium Priority ({mediumCount})
                          </button>
                          <button 
                            onClick={() => setSelectedPriority('optional')}
                            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                              selectedPriority === 'optional' 
                                ? 'bg-cyan-600 text-white border-cyan-600 shadow-lg shadow-cyan-600/20' 
                                : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:border-cyan-500/30 hover:text-cyan-400'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Optional ({optionalCount})
                          </button>
                        </div>

                        {/* List of suggestions */}
                        <div className="space-y-4">
                          {filteredImprovements.length > 0 ? (
                            filteredImprovements.map((imp, idx) => {
                              let priorityColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
                              let priorityBorder = 'border-l-cyan-500';
                              let priorityText = 'Optional Enhancement';
                              
                              if (imp.priority?.toLowerCase().includes('high')) {
                                priorityColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
                                priorityBorder = 'border-l-rose-500';
                                priorityText = 'High Priority';
                              } else if (imp.priority?.toLowerCase().includes('medium')) {
                                priorityColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
                                priorityBorder = 'border-l-amber-500';
                                priorityText = 'Medium Priority';
                              }

                              return (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  whileHover={{ y: -2 }}
                                  className={`p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 ${priorityBorder} border-l-4 hover:border-slate-700/80 transition-all flex flex-col gap-4 relative overflow-hidden group`}
                                >
                                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
                                  
                                  {/* Card Header */}
                                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/50 pb-3 relative z-10">
                                    <div className="flex items-center gap-2">
                                      <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${priorityColor}`}>
                                        {priorityText}
                                      </span>
                                      <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-750">
                                        {imp.category}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold shadow-sm shadow-emerald-500/5">
                                      <TrendingUp className="w-3.5 h-3.5" />
                                      +{imp.scoreIncrease} PTS
                                    </div>
                                  </div>

                                  {/* Card Body */}
                                  <div className="space-y-4 text-sm relative z-10">
                                    {/* Weakness */}
                                    <div className="flex items-start gap-3">
                                      <div className="p-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <span className="font-bold text-slate-200 text-xs uppercase tracking-wider block mb-0.5">Weakness / Gap Identified</span>
                                        <p className="text-slate-400 leading-relaxed">{imp.weakness}</p>
                                      </div>
                                    </div>

                                    {/* Suggestion */}
                                    <div className="flex items-start gap-3">
                                      <div className="p-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                                        <Lightbulb className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <span className="font-bold text-slate-200 text-xs uppercase tracking-wider block mb-0.5">Actionable Suggestion</span>
                                        <p className="text-slate-300 leading-relaxed font-medium">{imp.suggestion}</p>
                                      </div>
                                    </div>

                                    {/* Explanation */}
                                    <div className="flex items-start gap-3 border-t border-slate-800/40 pt-3">
                                      <div className="p-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 mt-0.5">
                                        <HelpCircle className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <span className="font-bold text-slate-200 text-xs uppercase tracking-wider block mb-0.5">ATS Score Impact</span>
                                        <p className="text-slate-400 leading-relaxed">{imp.explanation}</p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })
                          ) : (
                            <div className="p-10 text-center rounded-xl bg-slate-900/20 border border-slate-800/80 text-slate-500">
                              No recommendations in this priority level.
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </>
              ) : (
                /* Fallback to simple list if improvements array is empty or old structure */
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
            </div>
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
                      <p className="text-slate-300 text-sm leading-relaxed z-10 whitespace-pre-line">{tipObj.tip}</p>
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
            <div className="glass-dark p-6 rounded-2xl opacity-50 flex items-center justify-center h-64 text-slate-500 text-center border border-dashed border-slate-700">
              Upload a resume to see your analysis score and feedback.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
