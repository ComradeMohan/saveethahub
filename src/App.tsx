import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Signup from './pages/SignUpPage'; // Import the Signup component

const App: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<{ username: string; email?: string } | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    // Check localStorage for existing user data
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true); // Set logged-in status if user data exists
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

    const handleSetUser = (userData: { username: string }) => {
        setUser(userData);
        setIsLoggedIn(true); // Update isLoggedIn when user is set
    };

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
                <Navbar
                    items={navItems}
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
                <main className="container mx-auto px-4 pt-20">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                isLoggedIn ? (
                                    <Navigate to="/home" replace />
                                ) : (
                                    <LoginPage setUser={handleSetUser} /> // Pass handleSetUser
                                )
                            }
                        />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/home"
                            element={
                                isLoggedIn ? (
                                    <HomePage />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        <Route path="/" element={<Navigate to="/home" replace />} /> {/* Redirect to home if logged in */}
                        <Route path="/academics" element={<AcademicsPage />} />
                        <Route path="/cgpa-calculator" element={<CGPACalculatorPage />} />
                        <Route path="/attendance" element={<AttendancePage />} />
                        <Route path="/concept-maps" element={<ConceptMapsPage />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/certifications" element={<CertificationsPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                    {user && <p>Logged in as: {user.username}</p>}
                </main>
            </div>
        </Router>
    );
}

export default App;
