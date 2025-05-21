import React, { useState } from 'react';
import { GraduationCap, BookOpen, Award, Calendar,Group } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Separate GetStartedButton component
const GetStartedButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // Ensure this route is correct (e.g. '/login' if needed)
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

// Hero component using the GetStartedButton
const Hero = () => {
   const [showTerms, setShowTerms] = useState(false);

    const handleDownload = () => {
    // Example: Redirect to APK url or trigger download
    window.location.href = '/path-to-your-app.apk'; // Change this to your APK file path
  }; 

  return (
    <div className="relative pt-10 min-h-[calc(100vh-5rem)] flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
              <button
                onClick={() => setShowTerms(true)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                Download Apk
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: BookOpen,
                  title: 'Learning Resources',
                  desc: 'Interactive Concept Maps',
                  path: '/concept-maps'
                },
                {
                  icon: Award,
                  title: 'Skill Development',
                  desc: 'Free Certifications',
                  path: '/skills'
                },
                {
                  icon: Calendar,
                  title: 'Events',
                  desc: 'Stay Updated with Activities',
                  path: '/events'
                },
                
               {
  icon: Group,
  title: 'Community', // Add a meaningful title
  desc: 'Join our communities',
  path: '/community'
}

              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="p-6 bg-white/10 backdrop-blur-lg rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  <item.icon className="h-8 w-8 text-teal-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
       {/* Terms and Conditions Modal */}
      {showTerms && (
         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
  <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
    <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
    <div className="max-h-60 overflow-y-auto mb-6 text-gray-700">
      <p>
        Please read these terms and conditions carefully before downloading the APK. By clicking "Accept", you agree to comply with all terms.
      </p>
      <ul className="list-disc ml-5 mt-2 space-y-2">
        <li>You must be at least 18 years old to download.</li>
        <li>You must be a college student with a valid college email to use the app.</li>
        <li>
          The app is currently in{' '}
          <span className="bg-green-100 text-green-700 px-1 rounded">testing</span>{' '}
          phase and provided "as is" without warranties.
        </li>
        <li>
          No updates will be delivered via the APK; all updates must be downloaded directly from the official website.
        </li>
        <li>
          We are not liable for any data loss, damages, or interruptions caused by the use of this app.
        </li>
        <li>Usage must comply with all applicable laws, rules, and regulations.</li>
        <li>
          Your data{' '}
          <span className="bg-green-100 text-green-700 px-1 rounded">privacy</span>{' '}
          is important to us; the app only collects necessary data and handles it per our privacy policy.
        </li>
        <li>Do not share your login credentials with others to protect your account security.</li>
        <li>We reserve the right to suspend or terminate accounts violating these terms.</li>
        <li>
          By using this app, you agree to receive notifications related to your academic activities and updates.
        </li>
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
