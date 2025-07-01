import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {
  BookOpen,
  Calculator,
  Calendar,
  Clock,
  Compass,
  MessageSquare,
  LogInIcon,
  UserIcon,
  Gitlab,
} from "lucide-react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AcademicsPage from "./pages/AcademicsPage";
import CGPACalculatorPage from "./pages/CGPACalculatorPage";
import AttendancePage from "./pages/AttendancePage";
import ConceptMapsPage from "./pages/ConceptMapsPage";
import SkillsPage from "./pages/SkillsPage";
import CertificationsPage from "./pages/labs";
import EventsPage from "./pages/EventsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Notification from "./pages/NotificationPage";
import Community from "./pages/CommunityPage";
import ChatPage from "./pages/ChatPage";
import PdfViewer from "./components/PdfViewer";
import ATS from "./pages/ATS";
import InternshipPage from "./pages/InternshipPage";
import Portfolio from "./pages/Portfolio";

import LABS from "./pages/LabsPage";
import SubjectPage from "./pages/SubjectPage";

import CourseEnrollmentAlert from "./pages/courseenrollmentalert";


import { FileManager } from "./pages/FileManager";
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

const FULL_TEXT = "Visit Our Campus Codex";

interface User {
  username: string;
  email?: string;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Promo button animation state
  const [displayText, setDisplayText] = useState<string>("");
  const [shrunk, setShrunk] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const handleSetUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const navItems: NavItem[] = [
    { title: "Academics", icon: BookOpen, path: "/academics" },
    { title: "CGPA Calculator", icon: Calculator, path: "/cgpa-calculator" },
    { title: "Attendance", icon: Clock, path: "/attendance" },
    { title: "Concept Maps", icon: Compass, path: "/concept-maps" },
    { title: "Labs", icon: Gitlab, path: "/certifications" },
    { title: "Events", icon: Calendar, path: "/events" },
    { title: "Contact", icon: MessageSquare, path: "/contact" },
    {
      title: user ? user.username : "Login",
      icon: user ? UserIcon : LogInIcon,
      path: user ? "/profile" : "/login",
    },
  ];

  useEffect(() => {
    let index = 0;
    setDisplayText("");
    setShrunk(false);

    const interval = setInterval(() => {
      if (index <= FULL_TEXT.length) {
        setDisplayText(FULL_TEXT.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShrunk(true), 5000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
       <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Toast setup */}
      <div className="min-h-screen bg-gradient-to-br from-[#1a365d] to-[#0d9488]">
        <Navbar items={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="container mx-auto px-4 pt-10">
        <ScrollToTop />
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/profile" replace /> : <LoginPage setUser={handleSetUser} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={user ? <ProfilePage user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/cgpa-calculator" element={<CGPACalculatorPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/concept-maps" element={<ConceptMapsPage />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/internship" element={<InternshipPage />} />
            <Route path="/pdf-viewer" element={<PdfViewer />} />
            <Route path="/ATS" element={<ATS />} />
            <Route path="/course" element={<CourseEnrollmentAlert />} />
            <Route path="/portfolios" element={<Portfolio />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/labspage" element={<LABS />} />
            <Route path="/labs/:subject" element={<SubjectPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/community" element={<Community />} />
            <Route path="/file-manager" element={<FileManager />} />
           

            <Route path="/chat/:communityId" element={<ChatPage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>

        {/* Promo Button */}
        <a
          href="https://campus-codex.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-4 right-4 bg-[#2e9ed6] text-white rounded-full shadow-lg hover:bg-[#2480b3] transition-all z-50
                        flex items-center justify-center
                        ${shrunk ? "w-12 h-12 p-0 text-2xl" : "px-4 py-2 text-base"}`}
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {shrunk ? "🚀" : displayText}
        </a>
      </div>
    </Router>
  );
};

export default App;