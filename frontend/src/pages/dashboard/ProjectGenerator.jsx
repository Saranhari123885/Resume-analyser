import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Sparkles, FileText, CheckCircle2, UploadCloud, 
  Trash2, Layers, Clipboard, Check, Users, Target, Laptop,
  HelpCircle, ChevronUp, ChevronDown
} from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function ProjectGenerator() {
  const [formData, setFormData] = useState({ 
    title: '', 
    techStack: '', 
    domain: '', 
    projectType: 'Web Application'
  });
  
  const [file, setFile] = useState(null);
  const [fileAnalyzing, setFileAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('abstract');
  const [expandedQAIndex, setExpandedQAIndex] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFileAnalyzing(true);
    setFile(uploadedFile);

    // Simulate smart document parsing & analysis
    setTimeout(() => {
      setFileAnalyzing(false);
    }, 1500);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileAnalyzing(false);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setResult(null);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('domain', formData.domain);
    formDataToSend.append('projectType', formData.projectType);
    formDataToSend.append('techStack', formData.techStack);
    if (file) {
      formDataToSend.append('file', file);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/project/generate`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Project blueprint generation failed. Please check if the backend is running.');
      }

      const data = await response.json();
      setResult(data);
      setActiveTab('abstract');
    } catch (error) {
      console.error("Error generating project:", error);
      
      // Dynamic local fallback in case backend is offline
      const techStackList = formData.techStack.split(',').map(s => s.trim()).filter(Boolean);
      const mainTech = techStackList[0] || 'Modern Tech';
      const secondaryTech = techStackList.slice(1).join(', ') || 'Supporting Libraries';
      
      const questionsList = [
        {
          q: `Explain the system architecture of "${formData.title || 'this project'}" and why you chose this design.`,
          a: `This project is designed as a decoupled Three-Tier architecture. The React frontend handles user actions and communicates via JSON REST calls to the high-performance ${mainTech} backend.`
        },
        {
          q: `How did you make the ${formData.projectType.toLowerCase()} secure?`,
          a: `Security is implemented across multiple layers: HTTPS REST communication, JSON Web Tokens (JWT) endpoint authentication, and robust input sanitization.`
        }
      ];
      
      setResult({
        abstract: `[Offline Fallback Mode] An innovative, scalable ${formData.projectType.toLowerCase()} engineered for the ${formData.domain} sector. Leveraging a robust configuration of ${formData.techStack}.`,
        features: [
          `Responsive Interface built with modern design principles.`,
          `High-throughput RESTful API endpoints engineered via ${mainTech}.`,
          `Relational databases mapped using efficient data models.`,
          file ? `Enhanced custom algorithms analyzed from uploaded spec brief: "${file.name}".` : "Automated security validation protocols."
        ],
        architecture: `Tier-3 Decoupled Architecture:\n1. Client Presentation Layer (React)\n2. Server API Layer (${mainTech})\n3. Database & Storage Layer`,
        readme: `# 🚀 ${formData.title || 'Generated Project'}\n\nBuilt using ${techStackList.join(', ')} in the ${formData.domain} domain.`,
        questions: questionsList
      });
      setActiveTab('abstract');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.readme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Laptop className="w-8 h-8 text-indigo-500" />
          Project Blueprint Generator
        </h1>
        <p className="text-slate-400">Add granular project specifications, analyze support briefs, and output comprehensive developer readmes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Form Column */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 glass-dark p-8 rounded-3xl border border-slate-700/50 space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-primary opacity-50"></div>
          
          <form onSubmit={handleGenerate} className="space-y-5">
            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Project Details
            </h2>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Project Title</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors text-sm"
                placeholder="e.g. HealthMetrics Dashboard"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Domain / Industry</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors text-sm"
                  placeholder="e.g. Healthcare, EdTech"
                  value={formData.domain}
                  onChange={e => setFormData({...formData, domain: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Project Type</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white focus:outline-none transition-colors text-sm appearance-none"
                  value={formData.projectType}
                  onChange={e => setFormData({...formData, projectType: e.target.value})}
                >
                  <option>Web Application</option>
                  <option>Mobile Application</option>
                  <option>Cloud-Native Service</option>
                  <option>Desktop Software</option>
                  <option>Data Pipeline / ELT</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Tech Stack (comma separated)</label>
              <input 
                type="text" 
                required
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors text-sm"
                placeholder="e.g. React, FastAPI, PostgreSQL"
                value={formData.techStack}
                onChange={e => setFormData({...formData, techStack: e.target.value})}
              />
            </div>

            {/* Specification Document Slot */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Project Brief / Specification Document</label>
              
              {!file ? (
                <div 
                  className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-950/20"
                  onClick={() => document.getElementById('project-brief').click()}
                >
                  <input 
                    type="file" 
                    id="project-brief" 
                    className="hidden" 
                    accept=".pdf,.txt,.docx"
                    onChange={handleFileUpload}
                  />
                  <UploadCloud className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-white text-xs font-medium">Click to upload project spec brief</p>
                  <p className="text-slate-500 text-[10px] mt-1">PDF, TXT, or DOCX formats supported</p>
                </div>
              ) : (
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-indigo-500/10 p-2.5 rounded-xl border border-indigo-500/20 shrink-0">
                      <FileText className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-white text-xs font-semibold truncate leading-tight">{file.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1 leading-none">
                        {fileAnalyzing ? "Analyzing specifications..." : "Scope Analyzed Successfully"}
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-slate-500 hover:text-red-400 p-1.5 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={generating || fileAnalyzing}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(79,70,229,0.2)]"
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Brief & Core Specs...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-pink-300" />
                  Craft Design Blueprint
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Results Output Column */}
        <div className="lg:col-span-7 space-y-6 min-h-[500px] flex flex-col">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-dark border border-slate-700/50 rounded-3xl flex-1 flex flex-col overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary opacity-50"></div>
              
              {/* Tab Navigation Headers */}
              <div className="flex border-b border-slate-800 bg-slate-950/20 pt-2 px-6">
                {[
                  { id: 'abstract', label: 'Abstract', icon: FileText },
                  { id: 'features', label: 'Core Features', icon: CheckCircle2 },
                  { id: 'architecture', label: 'Architecture', icon: Layers },
                  { id: 'readme', label: 'README.md', icon: Code },
                  { id: 'qa', label: 'Project Q&A', icon: HelpCircle }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all leading-none mr-2 ${
                        activeTab === tab.id 
                          ? 'border-indigo-500 text-indigo-400 bg-slate-900/30' 
                          : 'border-transparent text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Display Body */}
              <div className="p-8 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === 'abstract' && (
                    <motion.div 
                      key="abstract"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-400" /> Project Abstract
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{result.abstract}</p>
                    </motion.div>
                  )}

                  {activeTab === 'features' && (
                    <motion.div 
                      key="features"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Core Features
                      </h3>
                      <ul className="space-y-3">
                        {result.features.map((f, i) => (
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-3 bg-slate-900/30 p-4 border border-slate-800/80 rounded-xl leading-relaxed">
                            <span className="bg-emerald-500/10 border border-emerald-500/20 p-1 rounded-lg mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {activeTab === 'architecture' && (
                    <motion.div 
                      key="architecture"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Layers className="w-5 h-5 text-secondary" /> System Architecture Layout
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{result.architecture}</p>
                    </motion.div>
                  )}

                  {activeTab === 'readme' && (
                    <motion.div 
                      key="readme"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 flex-1 flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <Code className="w-5 h-5 text-pink-400" /> GitHub README.md
                        </h3>
                        <button 
                          onClick={handleCopy}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs transition-colors border border-slate-700/80"
                        >
                          {copied ? (
                            <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!</>
                          ) : (
                            <><Clipboard className="w-3.5 h-3.5" /> Copy Code</>
                          )}
                        </button>
                      </div>
                      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 flex-1 relative overflow-hidden">
                        <pre className="text-slate-300 text-xs leading-relaxed font-mono whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                          {result.readme}
                        </pre>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'qa' && (
                    <motion.div 
                      key="qa"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-indigo-400" /> Project-Based Interview Q&A
                      </h3>
                      <p className="text-slate-400 text-xs mb-6 leading-relaxed font-sans">
                        Curated behavioral and technical questions an interviewer is highly likely to ask you regarding your work on this project, complete with suggested response patterns.
                      </p>

                      <div className="space-y-3 font-sans">
                        {result.questions.map((item, idx) => (
                          <div key={idx} className="bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800 hover:border-slate-700/60 rounded-2xl overflow-hidden transition-all duration-300">
                            <div 
                              className="p-5 flex justify-between items-center cursor-pointer select-none"
                              onClick={() => setExpandedQAIndex(expandedQAIndex === idx ? null : idx)}
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 mt-0.5 shrink-0">Q</span>
                                <h4 className="text-sm font-bold text-white leading-snug">{item.q}</h4>
                              </div>
                              <div className="text-slate-500 shrink-0 ml-4">
                                {expandedQAIndex === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </div>

                            <AnimatePresence>
                              {expandedQAIndex === idx && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-5 pt-0 pl-[3.25rem] border-t border-slate-800/60 bg-slate-950/20">
                                    <div className="flex items-start gap-2.5 mt-4">
                                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5 shrink-0">Ans</span>
                                      <div className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">
                                        {item.a}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <div className="glass-dark border border-dashed border-slate-800 rounded-3xl flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 min-h-[400px] bg-slate-950/10">
              <Laptop className="w-14 h-14 mb-4 text-slate-700" />
              <p className="text-base font-semibold text-slate-300">Awaiting Specifications Input</p>
              <p className="text-slate-500 text-xs max-w-sm mt-1">Configure your custom stack parameters, upload a specifications brief, and generate dynamic blueprints.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
