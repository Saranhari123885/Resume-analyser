import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Code, MessageSquare, Map, Database, Cpu, Layout } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import Navbar from '../components/Navbar';

export default function Home() {
  const features = [
    { icon: <FileText className="w-8 h-8 text-primary" />, title: 'AI Resume Analyzer', desc: 'Optimize your resume for ATS with AI-driven insights.' },
    { icon: <Code className="w-8 h-8 text-secondary" />, title: 'Project Generator', desc: 'Generate complete project descriptions and architectures instantly.' },
    { icon: <MessageSquare className="w-8 h-8 text-pink-500" />, title: 'Interview Prep', desc: 'Practice with AI-generated role-specific interview questions.' },
    { icon: <Map className="w-8 h-8 text-blue-500" />, title: 'Learning Roadmaps', desc: 'Get personalized weekly plans to master new tech stacks.' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-gradient-premium opacity-80 z-0"></div>
        
        {/* 3D Isometric Grid Background */}
        <div className="absolute inset-0 z-0 overflow-hidden flex justify-center perspective-[1000px]">
           <div className="w-[200%] h-[200%] absolute -top-1/2 isometric-grid opacity-20"></div>
        </div>
        
        {/* Decorative 3D elements (CSS based) */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Floating 3D Cubes */}
        <div className="absolute z-10 animate-float-3d" style={{ top: '20%', left: '15%' }}>
          <div className="w-16 h-16 glass rounded-xl border border-white/40 flex items-center justify-center shadow-2xl shadow-primary/50">
             <Database className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="absolute z-10 animate-float-3d" style={{ top: '60%', right: '15%', animationDelay: '1s' }}>
          <div className="w-20 h-20 glass rounded-xl border border-white/40 flex items-center justify-center shadow-2xl shadow-secondary/50">
             <Cpu className="w-10 h-10 text-secondary" />
          </div>
        </div>
        <div className="absolute z-10 animate-float-3d" style={{ top: '75%', left: '25%', animationDelay: '2s' }}>
          <div className="w-12 h-12 glass rounded-xl border border-white/40 flex items-center justify-center shadow-2xl shadow-pink-500/50">
             <Layout className="w-6 h-6 text-pink-500" />
          </div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            <span className="block text-slate-900 dark:text-white">Accelerate Your</span>
            <span className="block text-gradient mt-2">Placement Journey</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300"
          >
            AI-Powered Placement Preparation Platform for students and freshers. Build resumes, generate projects, and prep for interviews in seconds.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex justify-center gap-6"
          >
            <Link to="/register" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-[0_0_40px_rgba(79,70,229,0.5)] hover:scale-105 transition-transform flex items-center gap-2">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/dashboard/resume" className="px-8 py-4 glass text-slate-800 dark:text-white font-bold rounded-xl hover:bg-white/20 transition-all">
              Analyze Resume
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-light dark:bg-dark relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Everything You Need to Succeed</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <Tilt 
                key={idx} 
                tiltMaxAngleX={10} 
                tiltMaxAngleY={10} 
                perspective={1000} 
                scale={1.05} 
                transitionSpeed={2000} 
                gyroscope={true}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="glass-dark p-8 rounded-2xl border border-slate-700/50 hover:border-primary/50 transition-colors h-full transform-style-3d"
                >
                  <div className="mb-4 transform translate-z-12 shadow-2xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2 transform translate-z-8">{feature.title}</h3>
                  <p className="text-slate-400 transform translate-z-4">{feature.desc}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
