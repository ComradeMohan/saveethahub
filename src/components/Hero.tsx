import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import { BookOpen, Award, Calendar, Group } from 'lucide-react';
import type { CalendarEvent, FilterOptions } from '../types/calender';

// GetStarted Button Component
const GetStartedButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/login')}
      className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
    >
      Get Started
    </button>
  );
};
for (let day = 9; day <= 12; day++) {
  dummyEvents.push({
    id: `theory-exam-${day}`,
    title: 'Theory Exam',
    start: new Date(new Date().getFullYear(), 5, day, 9, 0),
    end: new Date(new Date().getFullYear(), 5, day, 12, 0),
    type: 'event',
    details: 'Theory Exam',
  });
}

// Event Generator
function generateAlternatingEvents(startDate: Date, endDate: Date): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  let current = new Date(startDate);
  let useAB = true;

  const holidayStart = new Date(current.getFullYear(), 4, 17); // May 17
  const holidayEnd = new Date(current.getFullYear(), 4, 25);   // May 25

  while (current <= endDate) {
    const day = current.getDay();
    const isSunday = day === 0;
    const isThirdSaturday = day === 6 && Math.ceil(current.getDate() / 7) === 3;
    const inHolidayRange = current >= holidayStart && current <= holidayEnd;

    // Only include days in May (month=4) excluding Sundays, 3rd Saturdays and holidays
    if (!isSunday && !isThirdSaturday && !inHolidayRange && current.getMonth() === 4) {
      const combinedSlot = useAB ? 'A B' : 'B A';

      events.push({
        id: `${current.toDateString()}-${combinedSlot}`,
        title: combinedSlot,
        start: new Date(current.getFullYear(), current.getMonth(), current.getDate(), 9),
        end: new Date(current.getFullYear(), current.getMonth(), current.getDate(), 13),
        type: 'class',
        slot: combinedSlot as 'AB' | 'CD',
        subject: `Subjects ${combinedSlot}`,
      });

      useAB = !useAB;
    }

    current.setDate(current.getDate() + 1);
  }

  return events;
}

// Hero Component
const Hero = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTerms, setShowTerms] = useState(false);

  const handleDownload = () => {
    window.location.href = 'https://github.com/ComradeMohan/UniValut/releases/download/v3.0/Univault_auto_update.apk';
  };

  // Generate May Events
  const dummyEvents = generateAlternatingEvents(
    new Date(new Date().getFullYear(), 4, 1),
    new Date(new Date().getFullYear(), 4, 31)
  );

  // Add Hostel Returning event on May 25
  dummyEvents.push({
    id: 'hostel-returning',
    title: 'Theory Exam',
    start: new Date(new Date().getFullYear(), 5, 9, 9, 0),
    end: new Date(new Date().getFullYear(), 5, 12, 12, 0),
    type: 'event',
    details: 'Theroy Exam',
  });

  // Add Theory Exams from June 9 to June 12
  for (let day = 9; day <= 12; day++) {
    dummyEvents.push({
      id: `theory-exam-${day}`,
      title: 'Theory Exam',
      start: new Date(new Date().getFullYear(), 5, day, 9, 0), // June = month index 5
      end: new Date(new Date().getFullYear(), 5, day, 12, 0),
      type: 'exam',
      details: 'University Theory Exam',
    });
  }

  // Filters for events display
  const dummyFilters: FilterOptions = {
    classes: true,
    exams: {
      laboratory: true,
      model: true,
      semester: true,
      practical: true,
      preLab: true,
    },
    holidays: true,
    events: true,
  };

  return (
    <div className="relative pt-10 min-h-[calc(100vh-5rem)] flex flex-col items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/20 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 space-y-16">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Your Academic <span className="text-teal-400">Success Hub</span>
            </h1>
            <p className="text-xl text-white/80">
              Access tools, resources, and guidance to excel in your academic journey.
              Calculate CGPA, track attendance, and discover learning opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <GetStartedButton />
              <button
                onClick={() => setShowTerms(true)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                Download APP 1.0
              </button>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="relative h-[28rem] w-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <CalendarGrid
              currentDate={currentDate}
              events={dummyEvents}
              viewType="month"
              filters={dummyFilters}
              onDayClick={(date) => setCurrentDate(date)}
            />
          </div>
        </div>

        {/* Feature Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BookOpen,
              title: 'Learn Coding',
              desc: 'Saveetha Code Editor',
              path: 'https://campus-codex.netlify.app/',
              external: true,
            },
            {
              icon: Award,
              title: 'Skill Development',
              desc: 'Free Certifications',
              path: '/skills',
            },
            {
              icon: Calendar,
              title: 'Events',
              desc: 'Stay Updated with Activities',
              path: '/events',
            },
            {
              icon: Group,
              title: 'Community',
              desc: 'Join our communities',
              path: '/community',
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="p-6 bg-white/10 backdrop-blur-lg rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <item.icon className="h-8 w-8 text-teal-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
            <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
            <div className="max-h-60 overflow-y-auto mb-6 text-gray-700">
              <ul className="list-disc ml-5 space-y-2">
                <li>Only college students with a valid college email address may register and use this app.</li>
                <li>
                  This app is currently in a <span className="bg-green-100 text-green-700 px-1 rounded">testing</span> phase and is provided “as is.” Features and functionality may change or be updated at any time.
                </li>
                <li>Please download updates and new versions only from the official website to ensure you have the latest and most secure version.</li>
                <li>The developer is not responsible for any issues, losses, or damages that may arise from using this app. Use at your own discretion.</li>
                <li>While reasonable efforts are made to protect your data, no app can be guaranteed 100% secure. Users are responsible for safeguarding their own credentials.</li>
                <li>Use must comply with laws and rules.</li>
                <li>Your <span className="bg-green-100 text-green-700 px-1 rounded">privacy</span> is respected. Personal information will not be shared without your consent, except as required by law.</li>
                <li>Do not share your credentials.</li>
                <li>Accounts violating terms may be suspended.</li>
                <li>You agree to receive academic notifications.</li>
                <li>The app does not contain intentional security threats or malicious code. However, users are encouraged to practice safe usage and report any concerns.</li>
              </ul>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowTerms(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowTerms(false);
                  handleDownload();
                }}
                className="px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600"
              >
                Accept & Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
