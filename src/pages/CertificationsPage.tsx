import React from 'react';
import { Link } from "react-router-dom";

const App: React.FC = () => {
  const pdfLinks: { [key: string]: string } = {
    Python: '/public/python.pdf',
    Java: '/public/java.pdf',
    Cpp: '/public/cpp.pdf',
    C: '/public/c.pdf',
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Master Programming Skills
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive programming courses designed to transform you from beginner to pro.
          </p>
        </div>
      </section>

      {/* Programming Languages Section */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Programming Languages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              { language: "Python", icon: "fab fa-python", color: "from-blue-500", easy: 50, medium: 30, hard: 20 },
              { language: "Java", icon: "fab fa-java", color: "from-red-500", easy: 45, medium: 35, hard: 25 },
              { language: "Cpp", icon: "fas fa-code", color: "from-purple-500", easy: 40, medium: 40, hard: 20 },
              { language: "C", icon: "fas fa-copyright", color: "from-green-500", easy: 35, medium: 35, hard: 30 },
            ].map((course, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${course.color} to-gray-900 rounded-xl p-6 shadow-lg transform hover:scale-105 transition duration-300`}
              >
                <div className="flex items-center mb-4">
                  <i className={`${course.icon} text-4xl`}></i>
                  <h3 className="ml-4 text-xl font-bold">{course.language}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-300">Easy</span>
                    <span>{course.easy} questions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-300">Medium</span>
                    <span>{course.medium} questions</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-300">Hard</span>
                    <span>{course.hard} questions</span>
                  </div>
                </div>
                <Link
                  to={`/pdf-viewer?file=${encodeURIComponent(pdfLinks[course.language])}`}
                  className="mt-4 w-full block text-center bg-white bg-opacity-20 hover:bg-opacity-30 py-2 rounded-full font-semibold transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
