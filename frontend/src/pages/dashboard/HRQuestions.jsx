import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronDown, ChevronUp, Lightbulb, Search, Sparkles, Send } from 'lucide-react';

export default function HRQuestions() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customAnswer, setCustomAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [askedQuestion, setAskedQuestion] = useState('');

  const handleAskAI = async (questionToAsk) => {
    if (!questionToAsk.trim()) return;
    setLoading(true);
    setCustomAnswer('');
    setAskedQuestion(questionToAsk);

    try {
      const response = await fetch('http://localhost:8080/api/interview/ask-hr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionToAsk })
      });
      if (!response.ok) throw new Error('AI failed to respond');
      const data = await response.json();
      setCustomAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setCustomAnswer("I'm sorry, I encountered an error while trying to generate a strategic answer. Please check if the backend is running and try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const hrQuestions = [
    "Tell me about yourself.",
    "Why do you want to work for our company?",
    "What are your greatest strengths?",
    "What is your greatest weakness?",
    "Where do you see yourself in five years?",
    "Tell me about a time you faced a difficult challenge at work and how you overcame it.",
    "Describe a time when you disagreed with a coworker or manager. How did you handle it?",
    "How do you handle stress and pressure?",
    "What is your greatest professional achievement?",
    "Why are you leaving your current job?",
    "Why should we hire you?",
    "What are your salary expectations?",
    "How do you prioritize your work?",
    "What is your preferred management style?",
    "Tell me about a time you made a mistake. How did you handle it?",
    "How do you adapt to new technologies or changes in the workplace?",
    "Describe a situation where you showed leadership.",
    "What motivates you to perform your best?",
    "Tell me about a time you worked successfully as part of a team.",
    "How do you deal with tight deadlines?",
    "What do you do if you disagree with a company policy?",
    "Describe a time when you went above and beyond for a project.",
    "How do you handle constructive criticism?",
    "What environment do you thrive in?",
    "Tell me about a time you had to learn something completely new quickly.",
    "How do you handle working with difficult personalities?",
    "What is your approach to problem-solving?",
    "Describe a time you failed. What did you learn?",
    "What makes you unique compared to other candidates?",
    "Do you have any questions for us?"
  ];

  // Map to preserve original numbers when filtering
  const hrQuestionsWithIndex = hrQuestions.map((q, originalIndex) => ({
    text: q,
    originalIndex
  }));

  const filteredQuestions = hrQuestionsWithIndex.filter(item => 
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Users className="w-8 h-8 text-pink-500" />
          HR Interview Questions
        </h1>
        <p className="text-slate-400">30 of the most important and common HR questions to prepare you for behavioral rounds.</p>
      </div>

      {/* Dynamic Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
        <input 
          type="text" 
          placeholder="Search behavioral & HR questions (e.g. weakness, conflict, salary)..."
          className="w-full bg-slate-800/40 border border-slate-700/80 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 rounded-2xl pl-11 pr-20 py-3.5 text-white placeholder-slate-500 focus:outline-none transition-all duration-300"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setExpandedIndex(null);
          }}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-pink-500 hover:text-pink-400 transition-colors uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </div>

      {/* Dynamic Ask AI Mentor Banner */}
      {searchTerm.trim().length > 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-pink-950/20 to-indigo-950/30 border border-pink-500/20 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="bg-pink-500/10 p-2 rounded-xl border border-pink-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-pink-500 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-snug">Have a specific doubt or custom question?</h4>
              <p className="text-xs text-slate-400">Ask our AI Mentor to generate a custom STAR-structured response for: <span className="text-pink-400 font-semibold italic">"{searchTerm}"</span></p>
            </div>
          </div>
          <button
            onClick={() => handleAskAI(searchTerm)}
            disabled={loading}
            className="w-full md:w-auto px-5 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shrink-0 uppercase tracking-wider h-[38px]"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            {loading ? 'Consulting AI...' : 'Ask AI Mentor'}
          </button>
        </motion.div>
      )}

      {/* Custom AI Answer Card */}
      <AnimatePresence>
        {customAnswer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="glass-dark p-8 rounded-3xl mb-8 border border-pink-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 to-indigo-500"></div>
            
            <div className="flex justify-between items-start gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-pink-500/10 p-2.5 rounded-xl border border-pink-500/20">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Behavioral Guidance</h3>
                  <p className="text-xs text-slate-400">Strategic response generated for: <span className="text-slate-200 italic">"{askedQuestion}"</span></p>
                </div>
              </div>
              <button
                onClick={() => setCustomAnswer('')}
                className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-wider"
              >
                Close
              </button>
            </div>

            <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-6 max-h-[500px] overflow-y-auto custom-scrollbar">
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {customAnswer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List / Empty State conditional rendering */}
      {filteredQuestions.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark p-12 text-center rounded-3xl border border-slate-800/60"
        >
          <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500">
            <Search className="w-6 h-6" />
          </div>
          <p className="text-slate-300 text-lg font-medium">No behavioral questions match your search.</p>
          <p className="text-slate-500 text-sm mt-1">Try entering another keyword or ask our AI Mentor to answer it directly!</p>
          
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={() => setSearchTerm('')}
              className="text-xs font-semibold px-4 py-2 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 transition-colors uppercase tracking-wider"
            >
              Reset Filter
            </button>
            <button 
              onClick={() => handleAskAI(searchTerm)}
              disabled={loading || !searchTerm.trim()}
              className="text-xs font-semibold px-5 py-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white rounded-xl transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              {loading ? 'Consulting AI...' : 'Ask AI Mentor'}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {filteredQuestions.map((item, idx) => (
            <div key={item.originalIndex} className="glass-dark rounded-2xl border-l-4 border-l-pink-500 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-pink-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div 
                className="p-6 flex items-start gap-4 hover:bg-slate-800/30 transition-colors cursor-pointer"
                onClick={() => toggleAccordion(item.originalIndex)}
              >
                <div className="mt-1 bg-pink-500/10 w-8 h-8 flex items-center justify-center rounded-full shrink-0 border border-pink-500/20">
                  <span className="text-pink-500 font-bold text-sm">{item.originalIndex + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-lg font-semibold pr-8 leading-snug group-hover:text-pink-100 transition-colors">{item.text}</p>
                </div>
                <div className="mt-1 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0">
                  {expandedIndex === item.originalIndex ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              <AnimatePresence>
                {expandedIndex === item.originalIndex && (
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
                          <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-wider mb-2">How to Answer</h4>
                          <div className="text-slate-300 text-sm leading-relaxed space-y-2 whitespace-pre-wrap">
                            This is where you should craft your behavioral answer using the **STAR Method** (Situation, Task, Action, Result). 
                            
                            **Key components to include:**
                            1. **Situation**: Set the scene and provide necessary details of the context.
                            2. **Task**: Describe your responsibility or the challenge in that situation.
                            3. **Action**: Explain exactly what actions you took to address the challenge.
                            4. **Result**: Detail the outcomes of your actions—quantify results where possible.
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
    </div>
  );
}
