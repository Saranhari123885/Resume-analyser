import Navbar from '../components/Navbar';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      desc: 'Perfect for getting started.',
      features: ['3 Resume Analyzes / mo', '1 Project Generation', 'Basic Interview Questions', 'Standard Roadmap'],
      buttonText: 'Get Started',
      buttonClass: 'bg-slate-800 text-white hover:bg-slate-700'
    },
    {
      name: 'Premium',
      price: '$9',
      period: '/mo',
      desc: 'For serious job seekers.',
      features: ['Unlimited Resume Analyzes', '10 Project Generations / mo', 'Advanced Interview Questions', 'Customized AI Roadmaps', 'Export to PDF'],
      buttonText: 'Upgrade to Premium',
      buttonClass: 'bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(79,70,229,0.3)]',
      popular: true
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/mo',
      desc: 'All features without limits.',
      features: ['Unlimited Everything', '1-on-1 AI Mock Interviews', 'Priority Support', 'Early Access to New Features'],
      buttonText: 'Get Pro',
      buttonClass: 'bg-slate-800 text-white hover:bg-slate-700'
    }
  ];

  return (
    <div className="min-h-screen pt-24 bg-light dark:bg-dark">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Choose the plan that fits your career goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`glass-dark p-8 rounded-3xl relative ${plan.popular ? 'border-primary shadow-2xl' : 'border-slate-700/50'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 mb-6">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-slate-400">{plan.period}</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className={`block w-full text-center font-medium py-3 rounded-xl transition-all ${plan.buttonClass}`}>
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
