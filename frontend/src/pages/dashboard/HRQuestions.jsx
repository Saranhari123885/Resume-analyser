import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronDown, ChevronUp, Lightbulb, Search, Sparkles, Send } from 'lucide-react';
import { API_BASE_URL } from '../../config';

export default function HRQuestions() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customAnswer, setCustomAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [askedQuestion, setAskedQuestion] = useState('');
  
  // Specific AI loading and answer states for accordion questions
  const [aiAnswers, setAiAnswers] = useState({});
  const [aiLoading, setAiLoading] = useState({});

  const handleAskAI = async (questionToAsk) => {
    if (!questionToAsk.trim()) return;
    setLoading(true);
    setCustomAnswer('');
    setAskedQuestion(questionToAsk);

    try {
      const response = await fetch(`${API_BASE_URL}/api/interview/ask-hr`, {
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

  const handleAskAIForQuestion = async (index, questionText) => {
    setAiLoading(prev => ({ ...prev, [index]: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/api/interview/ask-hr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText })
      });
      if (!response.ok) throw new Error('AI failed to respond');
      const data = await response.json();
      setAiAnswers(prev => ({ ...prev, [index]: data.answer }));
    } catch (error) {
      console.error(error);
      setAiAnswers(prev => ({ ...prev, [index]: "Failed to generate AI guidance. Please verify the backend status and key configuration, then try again." }));
    } finally {
      setAiLoading(prev => ({ ...prev, [index]: false }));
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

  const preCraftedAnswers = {
    0: {
      strategy: "Use the 'Present-Past-Future' formula. Highlight your core tech stack, recent projects, and enthusiasm for this role.",
      answer: "I am a full-stack developer passionate about building scalable, high-performance web applications. Currently, I specialize in React, Vite, and Spring Boot (Java), creating responsive frontends and secure REST APIs. Recently, I built an AI-powered resume optimization platform using modern JWT authentication and H2 databases. Moving forward, I am eager to join a fast-paced team like yours where I can contribute to user-facing features and tackle complex architectural challenges."
    },
    1: {
      strategy: "Align your personal career goals with the company's technical innovations, product direction, or supportive culture.",
      answer: "I want to work here because your team is actively engineering high-quality, developer-centric platforms at scale. I have been following your recent product launches and am highly impressed by your focus on intuitive design and robust APIs. My goal is to work in an environment that prioritizes clean code and engineering excellence, and your team's collaborative, tech-forward culture aligns perfectly with that vision."
    },
    2: {
      strategy: "Focus on professional traits backed by technical examples: rapid self-learning, architectural optimization, or proactive ownership.",
      answer: "My greatest strength is my ability to quickly learn new technical concepts and apply them immediately to solve blockers. For instance, when a project required real-time document parsing, I independently researched and integrated Apache PDFBox in under a week, resolving the data ingestion bottleneck. Additionally, I bring strong self-ownership, meaning I don't just write code; I actively review system constraints and suggest cleaner optimizations."
    },
    3: {
      strategy: "Mention a real, non-essential technical weakness, and explain the concrete, proactive steps you are taking to overcome it.",
      answer: "My greatest weakness has been my tendency to dive straight into coding complex features before fully mapping out peripheral components, which occasionally led to minor refactoring. To address this, I've adopted a structured planning approach: I now sketch comprehensive UML diagrams, draft clean API endpoints, and map database relationships in SQL before writing a single line of Java code. This has dramatically improved my development efficiency."
    },
    4: {
      strategy: "Show a trajectory of growth. Highlight a desire to master technical systems, take ownership of major modules, and mentor others.",
      answer: "In five years, I see myself as a Senior Systems Architect, taking end-to-end technical ownership of key product modules and scaling distributed databases. I plan to deepen my expertise in cloud deployment architectures and containerized services (like Docker and Kubernetes). Additionally, I hope to actively mentor junior developers and lead high-impact technical initiatives that directly improve system latency and delivery times."
    },
    5: {
      strategy: "Use the STAR method. Describe a complex technical hurdle, your actions, and the positive outcome with clear metrics.",
      answer: "Situation: In a recent full-stack project, our API response time spiked drastically during concurrent file uploads.\nTask: I was tasked with identifying and resolving the database query bottleneck.\nAction: I ran database profiling, identified unindexed queries, and applied optimized SQL schema indexing. Simultaneously, I refactored the backend WebClient parser to perform non-blocking asynchronous requests.\nResult: This reduced our database locking constraints and cut API response latency by 45% under heavy load."
    },
    6: {
      strategy: "Focus on open, transparent communication, objective alignment on technical facts, and professional maturity.",
      answer: "During a sprint, a teammate and I disagreed on whether to use a relational schema or a NoSQL database for a logging module. Instead of pushing my preference, I set up a brief collaborative call. We mapped out the concrete access patterns, write-heavy requirements, and constraints. When we looked at the data objectively, we realized a relational H2 DB was simpler and faster for our local stage. We agreed on it, documented the decision, and completed the module early."
    },
    7: {
      strategy: "Highlight structured time management, prioritizing critical paths, and maintaining clear communication with stakeholders.",
      answer: "I handle pressure by breaking down complex, high-stress situations into structured, actionable items. When a critical release date is approaching, I prioritize tasks using an agile board, focus on core functional modules first, and communicate progress transparently. This keeps me grounded in engineering logic and prevents panic, ensuring that stress is channeled into productive, high-quality coding."
    },
    8: {
      strategy: "Present a complete technical project lifecycle you owned, highlighting the positive impact it had on users or workflows.",
      answer: "My greatest achievement is successfully engineering and deploying an AI-powered Career Preparation Suite. I built the entire Spring Boot backend and integrated safe, structured Jackson serialization for dynamic LLM requests. I also set up a robust local .env configuration system for secret keys. Seeing the platform compile cleanly, handle document briefs flawlessly, and successfully deploy to Vercel and Render was incredibly rewarding."
    },
    9: {
      strategy: "Frame your departure positively. Emphasize seeking new technical challenges, larger-scale problems, and product ownership.",
      answer: "I am looking for my next opportunity to tackle larger system scaling challenges and take full ownership of high-impact product features. While I've learned a massive amount about full-stack engineering and API security in my current role, I am eager to join a fast-paced, highly collaborative team where I can stretch my skills in modern system design and cloud deployments."
    },
    10: {
      strategy: "Directly map your technical skills, work ethic, and rapid delivery capabilities to the target role's key requirements.",
      answer: "You should hire me because I bring a unique blend of robust Spring Boot backend architecture, modern React styling expertise, and a highly proactive approach to problem-solving. I am already fully versed in building secure REST controllers, handling database integrity, and integrating safe AI APIs. I can hit the ground running with zero onboarding friction and immediately deliver clean, production-ready code."
    },
    11: {
      strategy: "Express openness to competitive market rates while maintaining professional value and highlighting flexibility.",
      answer: "While my primary focus is finding a team where I can make a high technical impact and grow as an engineer, I am seeking a compensation package that aligns with the industry standard for a skilled full-stack developer with my experience. I am very open to discussing a competitive salary once we align on the technical fit and details of the role."
    },
    12: {
      strategy: "Discuss utilizing agile methods, sorting tasks by impact, and aligning with product managers on critical paths.",
      answer: "I prioritize my work by mapping tasks based on urgency and technical impact. I always tackle core database schemas and API controllers first since they form the foundation of other features. I use agile Kanban boards to track progress, set daily goals during standups, and maintain open communication with the team if any technical blockers arise that could affect our sprint timelines."
    },
    13: {
      strategy: "Highlight a preference for collaborative, high-trust leadership that provides constructive feedback and sets clear goals.",
      answer: "I thrive under a management style that values high trust, clear engineering goals, and open communication. I appreciate managers who empower developers to take ownership of their features while providing constructive, regular feedback during code reviews and one-on-ones. Having a collaborative, supportive manager encourages me to push my boundaries and write better software."
    },
    14: {
      strategy: "Show extreme accountability. Detail how you quickly owned the mistake, fixed it, and put a defensive guardrail in place.",
      answer: "During local development, I accidentally committed a temporary configuration file containing test database credentials. The moment I realized it, I proactively notified the team, revoked the test credentials immediately, and rotated the keys. I then updated our .gitignore and wrote a pre-commit git hook script that automatically scans our files for potential keys before any commit, permanently preventing the issue."
    },
    15: {
      strategy: "Show a proactive approach: reading documentation, building sandbox projects, and applying new tech to real problems.",
      answer: "I adapt to new technologies by setting up a structured learning pathway. I start by reading the official documentation to understand core architectural concepts, and then immediately build a small, hands-on sandbox application to test its features. For example, when transitioning from standard JSON strings to Spring WebClient, I built a quick test service to master its non-blocking asynchronous APIs."
    },
    16: {
      strategy: "Define leadership as taking initiative, driving feature delivery, and actively mentoring or supporting peers.",
      answer: "During a project, our team struggled to align on our API data models, which caused integration delays. I took the initiative to organize a brief whiteboarding session. I drafted a unified JSON schema contract, gained team consensus, and created mock backend endpoints. This unblocked our frontend developers immediately and reduced our integration time by two full days."
    },
    17: {
      strategy: "Emphasize internal motivators: solving complex engineering puzzles, building clean UIs, and shipping high-value features.",
      answer: "I am highly motivated by the process of taking a complex, ambiguous user requirement and engineering it into a clean, performant, and beautifully designed full-stack feature. Seeing my code compile successfully, pass validation tests, and get deployed to production where it directly helps users prepare for their careers is what truly drives my daily focus."
    },
    18: {
      strategy: "Detail how you divided tasks, reviewed code constructively, and aligned on unified data contracts to succeed.",
      answer: "In my last team project, we had to build a comprehensive learning roadmap generator in a short sprint. We divided the work cleanly: I handled the backend WebClient logic and safety mapping, while my teammate focused on the Framer Motion animations. We set up daily syncs, ran constructive git code reviews, and successfully integrated the module 24 hours ahead of schedule."
    },
    19: {
      strategy: "Highlight scoping features early, prioritizing the MVP path, and maintaining transparent progress reporting.",
      answer: "When dealing with tight deadlines, I focus on scoping out a high-quality Minimum Viable Product (MVP). I build the core database structures and essential REST endpoints first, ensuring they are thoroughly validated. I also keep the team updated daily. If I foresee any technical bottleneck, I flag it early so we can adjust expectations rather than rushing and compromising code quality."
    },
    20: {
      strategy: "Show professionalism. Express concerns constructively through proper channels, but align fully with decisions once finalized.",
      answer: "If I disagree with a policy, I seek to understand the underlying business or security reasons behind it. I believe in raising constructive feedback or technical alternatives professionally with my lead, backed by data. If the company decides to proceed with the original policy, I respect the decision fully and commit to implementing it with the highest quality standards."
    },
    21: {
      strategy: "Detail a time you voluntarily went above and beyond to improve system quality, code coverage, or user experience.",
      answer: "During a recent release, I finished my assigned API controllers early. Instead of stopping, I noticed our unit test coverage was low. I voluntarily stayed logged on to write a comprehensive test suite using Spring Security Test and MockMvc, boosting our backend coverage to 85%. This caught two edge-case validation errors early, preventing them from slipping into production."
    },
    22: {
      strategy: "Frame feedback as a critical path to professional growth, and show how you actively implement suggestions.",
      answer: "I welcome constructive criticism because it is the fastest way to grow as a developer. During code reviews, if a senior developer points out a more optimal way to write a reactive stream or structure a query, I don't take it personally. I actively study their suggestion, ask clarifying questions to master the pattern, and immediately refactor my code to match their standard."
    },
    23: {
      strategy: "Describe a collaborative, open, high-trust environment that balances focus with tech-focused discussions.",
      answer: "I thrive in an agile, tech-driven, and highly collaborative environment where ideas are openly discussed and code quality is prioritized. I value teams that hold constructive code reviews, encourage developers to take ownership of features, and maintain a clear, well-documented roadmap. This keeps everyone aligned and excited to build great products."
    },
    24: {
      strategy: "Describe a structured approach: studying docs, mapping basic patterns, and building sandboxes to resolve blockers.",
      answer: "In a recent project, I had to parse unstructured text from PDF resumes. I had never used Apache PDFBox before. I immediately spent a few hours reading its documentation, created a simple standalone Java main class to test its PDFTextStripper, and successfully integrated the extraction logic into our Spring Service within two days, unblocking the entire resume analyzer feature."
    },
    25: {
      strategy: "Highlight empathy, active listening, finding common ground, and keeping all interactions strictly professional.",
      answer: "I handle difficult personalities by staying empathetic, professional, and focusing entirely on objective project logic. I make sure to actively listen to their underlying concerns or blockers without getting defensive. By keeping communication clear, polite, and centered around technical facts and team goals, I find that even the most challenging dynamics can be resolved productively."
    },
    26: {
      strategy: "Focus on breaking down requirements, studying the constraints, writing modular code, and validating solutions.",
      answer: "My approach to problem-solving is systematic. I start by breaking down a large, complex requirement into small, manageable technical blocks. I write pseudocode or draw relationships first, build modular code with high separation of concerns, and then rigorously test edge cases. This keeps the codebase highly maintainable and minimizes unforeseen integration bugs."
    },
    27: {
      strategy: "Own the failure, explain what you learned from it, and show how you applied that learning to succeed in a later project.",
      answer: "In a previous project, I failed to scope our database requirements early, which led to a messy migration late in the sprint. It was a stressful experience, but it taught me a valuable lesson. I learned that scoping out schemas, mapping entities, and testing migration paths must happen at the very beginning of the cycle. I have applied this proactive planning to every project since."
    },
    28: {
      strategy: "Highlight a unique combination of strong backend engineering, frontend styling empathy, and a high self-learning rate.",
      answer: "What makes me unique is my ability to bridge the gap between robust system architecture and high-fidelity user interfaces. Many developers specialize strictly in backend database tuning or frontend styling. I bring both: I can write secure, optimized Java Spring Boot controllers while also styling premium, interactive React frontends. This lets me own and deliver features end-to-end."
    },
    29: {
      strategy: "Ask thoughtful, highly professional questions about engineering challenges, onboarding culture, or team success metrics.",
      answer: "Yes, I have two questions for you:\n1. What are the most significant technical scaling or database optimization challenges your engineering team is currently facing?\n2. What does a successful onboarding process look like for a new developer joining your team to ensure they can contribute productively early on?"
    }
  };

  const getPrecrafted = (index) => {
    return preCraftedAnswers[index] || {
      strategy: "Use the STAR method (Situation, Task, Action, Result) to answer behavioral questions clearly and concisely.",
      answer: "Draft a personalized answer here. Highlight your tech stack, proactive ownership, and quantitative metrics to stand out."
    };
  };

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
                    <div className="p-6 pt-0 pl-[4.5rem] border-t border-slate-700/50 mt-2 bg-slate-900/30 space-y-4">
                      <div className="flex items-start gap-3 mt-4">
                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div className="space-y-4 w-full">
                          <div>
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider block mb-1">Key Strategy</span>
                            <p className="text-slate-300 text-xs leading-relaxed">{getPrecrafted(item.originalIndex).strategy}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">Exemplar Answer</span>
                            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap bg-slate-950/40 p-4 border border-slate-800/80 rounded-xl font-sans font-medium">
                              {getPrecrafted(item.originalIndex).answer}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* AI Mentor Accordion Integration */}
                      <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                            <span className="text-xs font-bold text-slate-300">Need a comprehensive custom strategy breakdown?</span>
                          </div>
                          <button
                            onClick={() => handleAskAIForQuestion(item.originalIndex, item.text)}
                            disabled={aiLoading[item.originalIndex]}
                            className="px-3.5 py-1.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1.5 uppercase tracking-wider shrink-0"
                          >
                            {aiLoading[item.originalIndex] ? (
                              <>
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Consulting AI...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3 h-3" />
                                Consult AI Mentor
                              </>
                            )}
                          </button>
                        </div>

                        {aiAnswers[item.originalIndex] && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-950/80 p-5 border border-pink-500/20 rounded-xl text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-sans mt-2 relative"
                          >
                            <div className="absolute top-0 right-0 p-2 text-[9px] font-bold uppercase tracking-wider text-pink-500/60 bg-pink-500/5 rounded-bl-lg border-l border-b border-pink-500/10">AI Strategy Guide</div>
                            {aiAnswers[item.originalIndex]}
                          </motion.div>
                        )}
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
