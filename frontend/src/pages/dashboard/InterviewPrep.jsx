import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, HelpCircle, Target, ChevronDown, ChevronUp, Lightbulb, Send, Compass, ExternalLink } from 'lucide-react';
import { coursesData } from '../../data/courses';

export default function InterviewPrep() {
  const [role, setRole] = useState('Java Full Stack Developer');
  const [difficulty, setDifficulty] = useState('Medium (1-3 Yrs)');
  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Custom QA State
  const [customQuestion, setCustomQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState('');
  const [asking, setAsking] = useState(false);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setQuestions([]);
    
    try {
      const response = await fetch(`http://localhost:8080/api/interview/generate?role=${encodeURIComponent(role)}&difficulty=${encodeURIComponent(difficulty)}`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error(error);
      alert("Error generating questions. Is the backend running?");
    } finally {
      setGenerating(false);
      setExpandedIndex(null);
    }
  };

  const handleAskCustomQuestion = async (e) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    
    setAsking(true);
    try {
      const response = await fetch('http://localhost:8080/api/interview/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: customQuestion, role, difficulty })
      });
      if (!response.ok) throw new Error('Failed to get answer');
      
      const data = await response.json();
      setCustomAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setCustomAnswer("Error getting answer. Please try again.");
    } finally {
      setAsking(false);
    }
  };

      const getCourseKey = (roleName) => {
        if (roleName.includes('Java')) return 'Java Full Stack';
        if (roleName.includes('Python')) return 'Python Full Stack';
        if (roleName.includes('.NET')) return '.NET Full Stack';
        if (roleName.includes('Cybersecurity')) return 'Cybersecurity';
        if (roleName.includes('AI/ML')) return 'AI/ML Engineering';
        if (roleName.includes('Machine Learning')) return 'Machine Learning';
        if (roleName.includes('Deep Learning')) return 'Deep Learning';
        if (roleName.includes('Frontend')) return 'Frontend Developer';
        if (roleName.includes('Backend')) return 'Backend Developer';
        if (roleName.includes('Cloud')) return 'Cloud Engineer';
        if (roleName.includes('UI/UX')) return 'UI/UX Designer';
        return null;
      };

      return (
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Interview Prep</h1>
            <p className="text-slate-400">Generate role-specific interview questions powered by AI.</p>
          </div>

          <div className="glass-dark p-8 rounded-2xl mb-8">
            <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Role</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option>Java Full Stack Developer</option>
                  <option>Python Full Stack Developer</option>
                  <option>.NET Full Stack Developer</option>
                  <option>Cybersecurity Analyst</option>
                  <option>AI/ML Engineer</option>
                  <option>Machine Learning Engineer</option>
                  <option>Deep Learning Engineer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Cloud Engineer</option>
                  <option>UI/UX Designer</option>
                </select>
              </div>
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                >
                  <option>Easy (Fresher)</option>
                  <option>Medium (1-3 Yrs)</option>
                  <option>Hard (Senior)</option>
                </select>
              </div>
              <button 
                type="submit"
                disabled={generating}
                className="w-full md:w-auto px-8 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-[50px]"
              >
                {generating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Generate'
                )}
              </button>
            </form>
          </div>

          {questions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 font-sans"
            >
              {questions.map((q, idx) => (
                <div key={idx} className="glass-dark rounded-2xl border-l-4 border-l-primary overflow-hidden">
                  <div 
                    className="p-6 flex items-start gap-4 hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => toggleAccordion(idx)}
                  >
                    <div className="mt-1 bg-primary/10 p-2 rounded-lg shrink-0">
                      <HelpCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-1 block">{q.type} Question</span>
                      <p className="text-white text-lg pr-8">{q.q}</p>
                    </div>
                    <div className="mt-2 text-slate-400 shrink-0">
                      {expandedIndex === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 pl-[4.5rem] border-t border-slate-700/50 mt-2 bg-slate-900/30">
                          <div className="flex items-start gap-3 mt-4">
                            <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-wider mb-2">Suggested Answer</h4>
                              <div className="text-slate-300 text-sm leading-relaxed space-y-2 whitespace-pre-wrap">
                                {q.a || "This is where the AI will generate the perfect answer based on best practices. \n\nKey points to cover:\n1. Provide a clear definition.\n2. Explain the trade-offs or underlying mechanics.\n3. Give a real-world example from your past experience."}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}

          {/* Recommended Prep Courses */}
          {getCourseKey(role) && coursesData[getCourseKey(role)] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark p-8 rounded-3xl mt-12 mb-8 border border-slate-700/50 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary opacity-50"></div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Recommended Prep Courses</h2>
                  <p className="text-slate-400 text-sm">Targeted courses to master the concepts needed for a {role} role.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesData[getCourseKey(role)].map((course, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800 hover:border-slate-700/60 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/80">{course.provider}</span>
                        <span className="text-xs font-bold text-yellow-500 shrink-0 flex items-center gap-0.5">{course.rating}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-primary transition-colors leading-snug">{course.title}</h3>
                      <p className="text-slate-400 text-xs mb-4 line-clamp-3 leading-relaxed">{course.description}</p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-800/60 pt-3 mt-1">
                        <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">{course.duration}</span>
                        <a 
                          href={course.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[11px] font-semibold text-secondary hover:text-white flex items-center gap-1 group/btn transition-colors uppercase tracking-wider"
                        >
                          Learn More <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Ask AI Section */}
          <div className="glass-dark p-8 rounded-2xl mt-12 mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <MessageSquare className="text-primary w-6 h-6" />
          Ask the AI Mentor
        </h2>
        <p className="text-slate-400 mb-6 text-sm">
          Stuck on a specific coding problem or theory concept? Ask your AI mentor directly. It will answer in the context of a {difficulty} {role}.
        </p>
        
        <form onSubmit={handleAskCustomQuestion} className="space-y-4">
          <div>
            <textarea
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] resize-y"
              placeholder="E.g., Can you write a Java snippet demonstrating the Singleton pattern?"
              value={customQuestion}
              onChange={e => setCustomQuestion(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            disabled={asking || !customQuestion.trim()}
            className="px-6 bg-secondary hover:bg-secondary/90 text-white font-medium py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {asking ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {asking ? 'Generating Answer...' : 'Get Answer'}
          </button>
        </form>

        {customAnswer && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 border-t border-slate-700 pt-6"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-secondary/10 p-2 rounded-lg shrink-0">
                <Target className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">AI Answer</h4>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/50">
                  <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans overflow-x-auto">
                    {customAnswer}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
