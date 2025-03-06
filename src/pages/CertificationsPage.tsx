import React from 'react';

const App: React.FC = () => {
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
              {
                language: "Python",
                icon: "fab fa-python",
                color: "from-blue-500",
                easy: 50,
                medium: 30,
                hard: 20,
              },
              {
                language: "Java",
                icon: "fab fa-java",
                color: "from-red-500",
                easy: 45,
                medium: 35,
                hard: 25,
              },
              {
                language: "C++",
                icon: "fas fa-code",
                color: "from-purple-500",
                easy: 40,
                medium: 40,
                hard: 20,
              },
              {
                language: "C",
                icon: "fas fa-copyright",
                color: "from-green-500",
                easy: 35,
                medium: 35,
                hard: 30,
              },
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
                <button className="mt-4 w-full bg-white bg-opacity-20 hover:bg-opacity-30 py-2 rounded-full font-semibold transition-colors">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Topics Section */}
      <section className="py-12 px-4 ">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Advanced Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Data Structures & Algorithms",
                icon: "fas fa-sitemap",
                duration: "12 weeks",
                description: "Master data structures and algorithms for technical interviews.",
              },
              {
                title: "Advanced Algorithms",
                icon: "fas fa-microchip",
                duration: "10 weeks",
                description: "Dive deep into complex algorithmic challenges and optimization.",
              },
              {
                title: "Web Development",
                icon: "fas fa-globe",
                duration: "16 weeks",
                description: "Build modern, responsive web applications using cutting-edge tech.",
              },
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-xl p-6 shadow-lg transform hover:scale-105 transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <i className={`${topic.icon} text-3xl text-teal-400`}></i>
                  <h3 className="ml-4 text-xl font-bold">{topic.title}</h3>
                </div>
                <p className="text-gray-300 mb-4">{topic.description}</p>
                <div className="flex items-center mb-6">
                  <i className="far fa-clock text-teal-400 mr-2"></i>
                  <span>{topic.duration}</span>
                </div>
                <button className="w-full bg-teal-500 hover:bg-teal-600 py-2 rounded-full font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default App;
