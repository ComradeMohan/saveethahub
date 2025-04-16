import React from 'react';
import { Link } from 'react-router-dom';

const LabsPage: React.FC = () => {
  const languages = [
    { name: 'Python', route: 'python', pdf: '/python.pdf' },
    { name: 'Java', route: 'java', pdf: '/java.pdf' },
    { name: 'C', route: 'cpp', pdf: '/cpp.pdf' },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 opacity-60 bg-black"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Master Programming Skills
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Enroll in a language lab to start solving problems and enhancing your coding abilities.
          </p>
        </div>
      </section>

      {/* Language Cards Section */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Programming Languages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4">{lang.name}</h3>
                <p className="text-gray-300 mb-6">
                  Dive into {lang.name} programming challenges and build your coding skills.
                </p>
                <Link
                  to={`/pdf-viewer?file=${encodeURIComponent(lang.pdf)}`}
                  className="inline-block bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-full font-semibold transition-colors"
                >
                  Enroll
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LabsPage;