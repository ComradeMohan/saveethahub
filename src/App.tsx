import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  BookOpen,
  Calculator,
  Calendar,
  Clock,
  Compass,
  Award,
  MessageSquare,
  LogInIcon,
  UserIcon
} from 'lucide-react';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AcademicsPage from './pages/AcademicsPage';
import CGPACalculatorPage from './pages/CGPACalculatorPage';
import AttendancePage from './pages/AttendancePage';
import ConceptMapsPage from './pages/ConceptMapsPage';
import SkillsPage from './pages/SkillsPage';
import CertificationsPage from './pages/CertificationsPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email?: string } | null>(null);

  // Check localStorage for existing user data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const navItems = [
    { title: 'Academics', icon: BookOpen, path: '/academics' },
    { title: 'CGPA Calculator', icon: Calculator, path: '/cgpa-calculator' },
    { title: 'Attendance', icon: Clock, path: '/attendance' },
    { title: 'Concept Maps', icon: Compass, path: '/concept-maps' },
    { title: 'Certifications', icon: Award, path: '/certifications' },
    { title: 'Events', icon: Calendar, path: '/events' },
    { title: 'Contact', icon: MessageSquare, path: '/contact' },
    {
      title: user ? user.username : 'Login',
      icon: user ? UserIcon : LogInIcon,
      path: '/login',
    },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#1a365d] to-[#0d9488]">
        <Navbar items={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="container mx-auto px-4 pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/cgpa-calculator" element={<CGPACalculatorPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/concept-maps" element={<ConceptMapsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} /> {/* Pass setUser to LoginPage */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
