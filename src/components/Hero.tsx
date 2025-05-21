import { useNavigate } from 'react-router-dom';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import { useState } from 'react';
import type { CalendarEvent, FilterOptions } from '../types/calender';

// GetStartedButton remains unchanged
const GetStartedButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
    >
      Get Started
    </button>
  );
};

// Modal component for instructions & terms
const DownloadModal = ({
  isOpen,
  onClose,
  onDownload,
  agreed,
  setAgreed,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  agreed: boolean;
  setAgreed: (value: boolean) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 dark:hover:text-white transition"
        >
          ✕
        </button>

        <h2
          id="modal-title"
          className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Download Our Mobile App
        </h2>

        <div
          id="modal-desc"
          className="space-y-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
        >
          <p>
            Please read the following instructions before downloading the app:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ensure you have a stable internet connection during download.</li>
            <li>
              The app is currently in the testing phase. Please submit feedback
              for any errors or issues you encounter.
            </li>
            <li>
              All your data is securely maintained on our servers with strong
              privacy protections.
            </li>
            <li>
              By downloading, you agree to our terms and conditions, including
              data privacy guidelines.
            </li>
          </ul>
        </div>

        <div className="mt-6 flex items-center space-x-3">
          <input
            type="checkbox"
            id="agreeCheckbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5"
          />
          <label
            htmlFor="agreeCheckbox"
            className="text-gray-900 dark:text-gray-200 select-none"
          >
            I agree to the terms and conditions
          </label>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            Close
          </button>

          <button
            onClick={onDownload}
            disabled={!agreed}
            className={`px-5 py-2 rounded font-semibold text-white ${
              agreed
                ? 'bg-teal-600 hover:bg-teal-700'
                : 'bg-teal-300 cursor-not-allowed'
            } transition`}
          >
            Download APK
          </button>
        </div>
      </div>
    </div>
  );
};

// Hero component
const Hero = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const dummyEvents = generateAlternatingEvents(
    new Date(new Date().getFullYear(), 4, 1), // May 1
    new Date(new Date().getFullYear(), 4, 31) // May 31
  );

  // Hostel Return Event
  dummyEvents.push({
    id: 'hostel-returning',
    title: 'Hostel Return',
    start: new Date(new Date().getFullYear(), 4, 27, 10, 0),
    end: new Date(new Date().getFullYear(), 4, 27, 11, 0),
    type: 'event',
    details: 'Hostel Return',
  });

  // Add Simmam Fest on May 8, 9, 10
  const simmamDays = [8, 9, 10];
  simmamDays.forEach((day) => {
    dummyEvents.push({
      id: `simmam-${day}`,
      title: 'Fest',
      start: new Date(new Date().getFullYear(), 4, day, 10, 0),
      end: new Date(new Date().getFullYear(), 4, day, 12, 0),
      type: 'event',
      details: 'Simmam Fest',
    });
  });

  // Add Holidays from May 17 to 25
  for (let day = 17; day <= 25; day++) {
    dummyEvents.push({
      id: `holiday-${day}`,
      title: 'Holiday',
      start: new Date(new Date().getFullYear(), 4, day, 0, 0),
      end: new Date(new Date().getFullYear(), 4, day, 23, 59),
      type: 'holiday',
      details: 'Mid-Sem Break',
    });
  }

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

  // Download button handler
  const handleDownload = () => {
    // Example APK URL, replace with your real URL
    const apkUrl = '/path/to/your-app.apk';

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'your-app.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal and reset agree checkbox
    setModalOpen(false);
    setAgreed(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] pt-10 flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Your Academic
              <span className="text-teal-400"> Success Hub</span>
            </h1>
            <p className="text-xl text-white/80">
              Access tools, resources, and guidance to excel in your academic journey.
              Calculate CGPA, track attendance, and discover learning opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <GetStartedButton />

              {/* Replace Learn More with Download App button */}
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                Download App
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
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
      </div>

      {/* Modal */}
      <DownloadModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setAgreed(false);
        }}
        onDownload={handleDownload}
        agreed={agreed}
        setAgreed={setAgreed}
      />
    </div>
  );
};

export default Hero;

// ... Keep your generateAlternatingEvents function as it is ...
