import Navbar from '../components/Navbar';
import { FileText, Code, MessageSquare, Map } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: <FileText className="w-12 h-12 text-primary" />, title: 'AI Resume Analyzer', desc: 'Get ATS score, keyword analysis, and personalized suggestions to improve your resume.' },
    { icon: <Code className="w-12 h-12 text-secondary" />, title: 'Project Generator', desc: 'Input your tech stack and domain, and get a complete project description and architecture.' },
    { icon: <MessageSquare className="w-12 h-12 text-pink-500" />, title: 'Interview Prep', desc: 'Practice with AI-generated role-specific interview questions based on your experience level.' },
    { icon: <Map className="w-12 h-12 text-blue-500" />, title: 'Learning Roadmaps', desc: 'Personalized weekly learning plans to master new tech stacks and land your dream job.' },
  ];

  return (
    <div className="min-h-screen pt-24 bg-light dark:bg-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Powerful Features for Your Success</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Everything you need to become placement-ready in one platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="glass-dark p-8 rounded-2xl flex flex-col items-start gap-4 hover:scale-[1.02] transition-transform">
              <div className="p-4 bg-slate-800 rounded-2xl">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              <p className="text-slate-400 text-lg">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
