import React, { useEffect, useState } from 'react';

const Poster: React.FC = () => {
  const [isClosed, setIsClosed] = useState(false); // Poster is initially open

  // State for the subject input (if it's intended to be used elsewhere, otherwise it's unused)
  const [subject, setSubject] = useState('');

  useEffect(() => {
    // Basic entrance animation for the poster
    const poster = document.getElementById('saveetha-hub-poster-modal');
    if (poster) {
      poster.style.transform = 'scale(0.8)';
      poster.style.opacity = '0';
      setTimeout(() => {
        poster.style.transform = 'scale(1)';
        poster.style.opacity = '1';
      }, 100);
    }
  }, []);

  // Handler for closing the poster
  const handleClose = () => {
    setIsClosed(true);
    // Clear states related to the Gemini API feature on close (these states are not defined in the provided code)
    // setAssignmentIdeas([]); // This would cause an error as setAssignmentIdeas is not defined
    setSubject('');
    // setError(null); // This would cause an error as setError is not defined
  };

  // Handler for the "Go to Upload Hub" button to redirect
  const handleNavigateToHub = () => {
    // Redirect to the /file-manager path
    window.location.href = '/file-manager';
  };

  // If the poster is closed, render nothing
  if (isClosed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm overflow-auto p-4 font-sans">
      <div
        id="saveetha-hub-poster-modal"
        className="relative bg-white rounded-3xl p-8 max-w-lg w-full z-20 transform transition-all duration-300 shadow-xl"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full flex items-center justify-center text-2xl font-bold shadow-md transition-colors duration-200"
          aria-label="Close poster"
        >
          &times;
        </button>

        {/* Poster Content */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full inline-block mb-4 text-lg font-semibold shadow-lg">
            📚 Welcome to Saveetha Hub! 🚀
          </div>
        </div>

        <div className="flex justify-center mb-6">
          {/* Placeholder image for the hub */}
          <img
            src="https://placehold.co/128x128/60A5FA/FFFFFF?text=Hub"
            alt="Saveetha Hub Icon"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
          />
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Your Study Material Destination</h2>
          <p className="text-gray-700 text-lg leading-relaxed px-2">
            Upload and access question papers, assignments, notes, and other study materials for all your Saveetha University subjects.
            Collaborate and share knowledge with your peers!
          </p>

          {/* Navigation Button */}
          <button
            onClick={handleNavigateToHub}
            className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Go to Upload Hub
          </button>

          <div className="text-center mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
            Empowering Saveetha Students since <span className="font-semibold">2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
