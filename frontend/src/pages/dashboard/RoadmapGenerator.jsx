import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, BookOpen, Compass, CheckCircle, ExternalLink, ChevronDown, ChevronUp, Milestone } from 'lucide-react';
import { coursesData } from '../../data/courses';
import { API_BASE_URL } from '../../config';

export default function RoadmapGenerator() {
  const [domain, setDomain] = useState('Java Full Stack');
  const [generating, setGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [expandedCourseIdx, setExpandedCourseIdx] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setRoadmap(null);
    setExpandedCourseIdx(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/roadmap/generate?domain=${encodeURIComponent(domain)}`);
      if (!response.ok) {
        throw new Error('Backend generation failed');
      }
      const data = await response.json();
      setRoadmap(data);
    } catch (error) {
      console.warn("Backend error, falling back to local curriculum:", error);
      
      const fallbackRoadmaps = {
        'Java Full Stack': {
          weeks: [
            { title: 'Week 1-2: Core Java & OOP', topics: ['Collections', 'Streams API', 'Multithreading', 'Exception Handling'] },
            { title: 'Week 3-4: Spring Boot Basics', topics: ['REST APIs', 'Dependency Injection', 'JPA/Hibernate', 'Spring Security'] },
            { title: 'Week 5-6: Frontend (React)', topics: ['Components', 'Hooks', 'State Management', 'API Integration'] },
            { title: 'Week 7-8: Full Stack & Deployment', topics: ['JWT Auth', 'Docker', 'AWS/Render deployment', 'CI/CD basics'] }
          ],
          platforms: ['LeetCode', 'HackerRank', 'Spring Academy'],
          guidance: 'Focus on building end-to-end projects rather than just watching tutorials. Start with a simple CRUD app and scale it.'
        },
        'Python Full Stack': {
          weeks: [
            { title: 'Week 1-2: Python Fundamentals & OOP', topics: ['Data Structures', 'Decorators & Generators', 'File I/O', 'OOP Principles'] },
            { title: 'Week 3-4: Web Frameworks (Django / FastAPI)', topics: ['Routing & Views', 'Models & ORM', 'REST Framework', 'Auth & JWT'] },
            { title: 'Week 5-6: Frontend & UI Integration', topics: ['React Components', 'State Management', 'Axios API Calls', 'Tailwind CSS'] },
            { title: 'Week 7-8: Databases & Deployment', topics: ['PostgreSQL/MySQL', 'Docker Containers', 'CI/CD (GitHub Actions)', 'Render/Heroku'] }
          ],
          platforms: ['LeetCode', 'Real Python', 'HackerRank'],
          guidance: 'Master asynchronous coding in Python (async/await) and database indexing early. Try building a real-time collaborative application.'
        },
        '.NET Full Stack': {
          weeks: [
            { title: 'Week 1-2: C# Programming & .NET Core', topics: ['LINQ & Generics', 'Async/Await Patterns', 'Memory Management', 'CLR Internals'] },
            { title: 'Week 3-4: ASP.NET Core Web APIs', topics: ['Dependency Injection', 'EF Core ORM', 'Routing & Middleware', 'Identity & JWT'] },
            { title: 'Week 5-6: Enterprise Frontend Client', topics: ['Angular or React Client', 'TypeScript Basics', 'REST API Integration', 'State Services'] },
            { title: 'Week 7-8: Cloud Integration & Microservices', topics: ['Dockerization', 'Azure App Services', 'SQL Server Optimization', 'RabbitMQ/Azure Service Bus'] }
          ],
          platforms: ['Microsoft Learn', 'LeetCode', 'Pluralsight'],
          guidance: 'The C# ecosystem is highly professional and typed. Learn clean architecture, repository patterns, and focus heavily on Entity Framework database queries.'
        },
        'Cybersecurity': {
          weeks: [
            { title: 'Week 1-2: Networking & OS Basics', topics: ['TCP/IP', 'OSI Model', 'Linux Command Line', 'Windows Internals'] },
            { title: 'Week 3-4: Vulnerability Assessment', topics: ['Nmap', 'Wireshark', 'Burp Suite Basics', 'Metasploit'] },
            { title: 'Week 5-6: Web Application Security', topics: ['OWASP Top 10', 'SQLi', 'XSS', 'CSRF'] },
            { title: 'Week 7-8: Advanced Pentesting & Reporting', topics: ['Active Directory Attacks', 'Privilege Escalation', 'Report Writing'] }
          ],
          platforms: ['TryHackMe', 'HackTheBox', 'PortSwigger Web Security Academy'],
          guidance: 'Theory is not enough in cybersecurity. Set up a local virtual lab environment and practice exploiting intentionally vulnerable machines safely.'
        },
        'AI/ML Engineering': {
          weeks: [
            { title: 'Week 1-2: Python & Math Foundations', topics: ['Pandas', 'NumPy', 'Linear Algebra', 'Calculus for ML'] },
            { title: 'Week 3-4: Classical Machine Learning', topics: ['Regression', 'Classification', 'Scikit-Learn', 'Feature Engineering'] },
            { title: 'Week 5-6: Deep Learning Foundations', topics: ['Neural Networks', 'PyTorch/TensorFlow', 'CNNs for Computer Vision'] },
            { title: 'Week 7-8: NLP & Advanced Topics', topics: ['RNNs & LSTMs', 'Transformers', 'Hugging Face', 'Model Deployment'] }
          ],
          platforms: ['Kaggle', 'Coursera', 'Fast.ai'],
          guidance: 'Don\'t just copy code. Build an intuitive understanding of the underlying math and focus heavily on data cleaning and feature engineering, which is 80% of the job.'
        },
        'Data Science': {
          weeks: [
            { title: 'Week 1-2: Data Wrangling & SQL', topics: ['Advanced SQL', 'Pandas', 'Data Cleaning', 'ETL Basics'] },
            { title: 'Week 3-4: Exploratory Data Analysis', topics: ['Matplotlib', 'Seaborn', 'Statistical Significance', 'A/B Testing'] },
            { title: 'Week 5-6: Predictive Modeling', topics: ['Regression', 'Clustering', 'Time Series Forecasting', 'Scikit-Learn'] },
            { title: 'Week 7-8: Data Storytelling & Dashboarding', topics: ['Tableau/PowerBI', 'Streamlit', 'Presenting Insights'] }
          ],
          platforms: ['DataCamp', 'Kaggle', 'StrataScratch'],
          guidance: 'Your ability to communicate data insights to non-technical stakeholders is just as important as your technical skills.'
        },
        'DevOps': {
          weeks: [
            { title: 'Week 1-2: Fundamentals', topics: ['Linux', 'Networking', 'Git & Version Control', 'Bash Scripting'] },
            { title: 'Week 3-4: Containers & Orchestration', topics: ['Docker', 'Docker Compose', 'Kubernetes Basics', 'Helm'] },
            { title: 'Week 5-6: CI/CD Pipelines', topics: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'Automated Testing'] },
            { title: 'Week 7-8: Infrastructure as Code & Cloud', topics: ['Terraform', 'AWS/Azure/GCP Basics', 'Ansible', 'Monitoring (Prometheus/Grafana)'] }
          ],
          platforms: ['KodeKloud', 'A Cloud Guru', 'AWS Skill Builder'],
          guidance: 'Start automating manual tasks immediately. Build a full CI/CD pipeline for a simple web application to understand the complete flow.'
        },
        'Cloud Engineer': {
          weeks: [
            { title: 'Week 1-2: Networking & OS Administration', topics: ['VPCs & Subnets', 'Routing Tables', 'Linux Shell Administration', 'SSH Keys'] },
            { title: 'Week 3-4: Cloud Platforms (AWS/Azure)', topics: ['Compute Services (EC2)', 'Object Storage (S3)', 'IAM Roles', 'Relational Databases (RDS)'] },
            { title: 'Week 5-6: Infrastructure as Code (IaC)', topics: ['Terraform Basics', 'State Files', 'Ansible Configuration', 'CloudFormation'] },
            { title: 'Week 7-8: Serverless & Kubernetes', topics: ['Docker Containers', 'Kubernetes Clusters', 'Lambda Functions', 'API Gateway'] }
          ],
          platforms: ['AWS Skill Builder', 'KodeKloud', 'A Cloud Guru'],
          guidance: 'Focus on setting up secure environments. Never hardcode credentials; master IAM policies and practice setting up multi-region high-availability systems.'
        },
        'UI/UX Designer': {
          weeks: [
            { title: 'Week 1-2: Design Principles & Research', topics: ['Visual Hierarchy', 'Color Theory', 'Typography', 'User Persona Surveys'] },
            { title: 'Week 3-4: Figma Design System & Wireframes', topics: ['Auto-Layout', 'Figma Components', 'High-Fidelity Mocks', 'Interactive Prototyping'] },
            { title: 'Week 5-6: Usability & User Flows', topics: ['A/B Testing', 'Heatmaps Analysis', 'Information Architecture', 'Heuristic Evaluation'] },
            { title: 'Week 7-8: UX Capstone & Handoff', topics: ['Portfolio Website', 'Developer Specs Handoff', 'Zeplin Integration', 'Design Review Iterations'] }
          ],
          platforms: ['Behance/Dribbble', 'Interaction Design Foundation', 'Figma Academy'],
          guidance: 'Always back your design decisions with user research data. Learn how to present a case study clearly, explaining the problem, the research, iterations, and results.'
        },
        'Machine Learning': {
          weeks: [
            { title: 'Week 1-2: Math & Data Preprocessing', topics: ['Linear Algebra', 'Calculus', 'Pandas Core DataFrames', 'NumPy Operations'] },
            { title: 'Week 3-4: Classical Supervised Learning', topics: ['Linear & Logistic Regression', 'Classification Metrics', 'Scikit-Learn', 'Feature Engineering'] },
            { title: 'Week 5-6: Unsupervised & Ensemble Learning', topics: ['K-Means Clustering', 'Principal Component Analysis', 'Random Forests', 'XGBoost'] },
            { title: 'Week 7-8: Evaluation & Model Deployment', topics: ['Cross-Validation', 'Overfitting Prevention', 'Flask/FastAPI APIs', 'Docker Containers'] }
          ],
          platforms: ['Kaggle', 'LeetCode', 'StrataScratch'],
          guidance: 'Master statistics and feature engineering, which make up 80% of any machine learning engineer job. Build simple end-to-end classification pipelines first.'
        },
        'Deep Learning': {
          weeks: [
            { title: 'Week 1-2: Neural Network Foundations', topics: ['Perceptrons', 'Forward & Backpropagation', 'Activation Functions', 'Loss Functions'] },
            { title: 'Week 3-4: Frameworks & Optimization', topics: ['PyTorch Core', 'TensorFlow Basics', 'Stochastic Gradient Descent', 'Regularization Techniques'] },
            { title: 'Week 5-6: Computer Vision & CNNs', topics: ['Image Kernels', 'Convolution & Pooling', 'Transfer Learning', 'ResNet Architecture'] },
            { title: 'Week 7-8: Sequence Models & Transformers', topics: ['RNNs & LSTMs', 'Attention Mechanisms', 'Self-Attention', 'Transformer Architectes (BERT/GPT)'] }
          ],
          platforms: ['Kaggle', 'fast.ai Tutorials', 'PyTorch Official Documentation'],
          guidance: 'Focus deeply on hyperparameter tuning and model optimization. Re-implement classic papers (like ResNet or early Transformer) from scratch to build rock-solid intuition.'
        }
      };

      const fallback = fallbackRoadmaps[domain] || fallbackRoadmaps['DevOps'];
      setRoadmap(fallback);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AI Learning Roadmap</h1>
        <p className="text-slate-400">Generate a personalized weekly learning plan to master your target domain.</p>
      </div>

      <div className="glass-dark p-8 rounded-2xl mb-8">
        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Domain</label>
            <select 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
              value={domain}
              onChange={e => setDomain(e.target.value)}
            >
              <option>Java Full Stack</option>
              <option>Python Full Stack</option>
              <option>.NET Full Stack</option>
              <option>Cybersecurity</option>
              <option>AI/ML Engineering</option>
              <option>Machine Learning</option>
              <option>Deep Learning</option>
              <option>Data Science</option>
              <option>DevOps</option>
              <option>Cloud Engineer</option>
              <option>UI/UX Designer</option>
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
              <><Compass className="w-5 h-5" /> Generate Roadmap</>
            )}
          </button>
        </form>
      </div>

      {roadmap && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Weekly Plan</h2>
              <div className="relative border-l border-slate-700 ml-3 space-y-8">
                {roadmap.weeks.map((week, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="pl-8 relative"
                  >
                    <div className="absolute w-6 h-6 bg-primary rounded-full border-4 border-slate-900 -left-[13px] top-1"></div>
                    <div className="glass-dark p-6 rounded-2xl border border-slate-700/50 hover:border-primary/50 transition-colors">
                      <h3 className="text-lg font-bold text-white mb-3">{week.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {week.topics.map((t, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-lg">{t}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-dark p-6 rounded-2xl"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-secondary"/> Practice Platforms</h3>
                <ul className="space-y-3">
                  {roadmap.platforms.map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glass-dark p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Map className="w-5 h-5 text-primary"/> Career Guidance</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{roadmap.guidance}</p>
              </motion.div>
            </div>
          </div>

          {/* Recommended Courses Section */}
          {coursesData[domain] && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-dark p-8 rounded-3xl border border-slate-700/50 mt-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary opacity-50"></div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Recommended Courses</h2>
                  <p className="text-slate-400 text-sm">Top-tier curated courses to master your skills and gain certifications.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesData[domain].map((course, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800 hover:border-slate-700/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/80">{course.provider}</span>
                        <span className="text-sm font-bold text-yellow-500 shrink-0 flex items-center gap-0.5">{course.rating}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors leading-snug">{course.title}</h3>
                      <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{course.description}</p>
                    </div>
                    
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {course.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{tag}</span>
                        ))}
                      </div>

                      {/* Accordion Course Syllabus Roadmap */}
                      {course.curriculum && (
                        <div className="mb-4 pt-1 border-t border-slate-800/60">
                          <button
                            type="button"
                            onClick={() => setExpandedCourseIdx(expandedCourseIdx === idx ? null : idx)}
                            className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white transition-colors py-2"
                          >
                            <span className="flex items-center gap-1.5">
                              <Milestone className="w-3.5 h-3.5 text-primary" />
                              {expandedCourseIdx === idx ? 'Hide Course Roadmap' : 'View Course Roadmap'}
                            </span>
                            {expandedCourseIdx === idx ? (
                              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>

                          <AnimatePresence initial={false}>
                            {expandedCourseIdx === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pl-2 pr-1 py-3 border-l-2 border-primary/30 space-y-3 mt-1 ml-1.5">
                                  {course.curriculum.map((step, sIdx) => (
                                    <div key={sIdx} className="relative pl-4">
                                      <div className="absolute -left-[13px] top-1.5 w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-slate-950" />
                                      <p className="text-xs text-slate-300 leading-normal font-medium">{step}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      <div className="flex items-center justify-between border-t border-slate-800/60 pt-4">
                        <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">{course.duration} • {course.level}</span>
                        <a 
                          href={course.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs font-semibold text-secondary hover:text-white flex items-center gap-1 group/btn transition-colors uppercase tracking-wider"
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
        </>
      )}
    </div>
  );
}
