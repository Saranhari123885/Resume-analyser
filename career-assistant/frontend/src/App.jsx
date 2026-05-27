import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import ResumeAnalyzer from './pages/dashboard/ResumeAnalyzer';
import ProjectGenerator from './pages/dashboard/ProjectGenerator';
import InterviewPrep from './pages/dashboard/InterviewPrep';
import HRQuestions from './pages/dashboard/HRQuestions';
import RoadmapGenerator from './pages/dashboard/RoadmapGenerator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light dark:bg-dark text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ResumeAnalyzer />} />
            <Route path="resume" element={<ResumeAnalyzer />} />
            <Route path="project" element={<ProjectGenerator />} />
            <Route path="interview" element={<InterviewPrep />} />
            <Route path="hr-questions" element={<HRQuestions />} />
            <Route path="roadmap" element={<RoadmapGenerator />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
