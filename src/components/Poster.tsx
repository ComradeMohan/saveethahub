import React, { useEffect, useState } from 'react';

const Poster: React.FC = () => {
  const [isClosed, setIsClosed] = useState(true); // default hidden

  useEffect(() => {
    // Check if poster was closed within the last 30 minutes
    const lastClosed = localStorage.getItem('posterClosedAt');
    const now = new Date().getTime();

    if (!lastClosed || now - parseInt(lastClosed) > 30 * 60 * 1000) {
      // Show poster if never closed before or it's been more than 30 minutes
      setIsClosed(false);
    }

    // Set current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
      dateElement.textContent = new Date().toLocaleDateString();
    }

    // Entrance animation
    const poster = document.getElementById('poster');
    if (poster) {
      poster.style.transform = 'scale(0.8)';
      poster.style.opacity = '0';
      setTimeout(() => {
        poster.style.transform = 'scale(1)';
        poster.style.opacity = '1';
      }, 100);
    }
  }, []);

  const handleClose = () => {
    setIsClosed(true);
    localStorage.setItem('posterClosedAt', new Date().getTime().toString());
  };

  if (isClosed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm overflow-auto">
      <div
        id="poster"
        className="relative bg-white rounded-3xl p-8 max-w-md w-full z-20 transform transition-all duration-300"
        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          ×
        </button>

        {/* ...rest of the poster content... */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-4 py-2 rounded-full inline-block mb-4">
            🎉 <span className="font-semibold">CONGRATULATIONS!</span>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src="/sandeep.jpg"
            alt="Student"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
          />
        </div>

        <div className="text-center space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Lingam Venkat Sai</h2>
            <p className="text-gray-600 text-sm">Saveetha Animutyam </p>
          </div>

          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-6 rounded-2xl shadow-lg">
            <p className="text-sm font-medium opacity-90">CGPA Achieved</p>
            <p className="text-4xl font-bold">9.2</p>
            <p className="text-sm opacity-90">Perfect Score</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              🌟
              <div className="ml-2 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Congratulations to the MRs Venkat Sai!
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Your exceptional academic performance and dedication have paid off. This perfect CGPA reflects your hard work and commitment to excellence.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
            📅 Achievement Date: <span id="currentDate"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
