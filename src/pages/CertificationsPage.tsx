// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
const App: React.FC = () => {
  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="pt-12  px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Master Programming Skills
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive programming courses designed to take you from beginner
            to professional. Learn at your own pace with hands-on projects and
            exercises.
          </p>
        </div>
      </div>
      {/* Programming Languages Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">
          Programming Languages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className={`bg-gradient-to-br ${course.color} to-gray-900 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex items-center mb-4">
                <i className={`${course.icon} text-4xl text-white`}></i>
                <h3 className="text-xl font-bold text-white ml-4">
                  {course.language}
                </h3>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-green-300">Easy</span>
                  <span className="text-white">{course.easy} questions</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-yellow-300">Medium</span>
                  <span className="text-white">{course.medium} questions</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-300">Hard</span>
                  <span className="text-white">{course.hard} questions</span>
                </div>
              </div>
              <button className="w-full bg-white bg-opacity-20 text-white py-2 !rounded-button hover:bg-opacity-30 transition-colors whitespace-nowrap">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Advanced Topics Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">Advanced Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Data Structures & Algorithms",
              icon: "fas fa-sitemap",
              duration: "12 weeks",
              description:
                "Master fundamental data structures and algorithms for technical interviews",
            },
            {
              title: "Advanced Algorithms",
              icon: "fas fa-microchip",
              duration: "10 weeks",
              description:
                "Deep dive into complex algorithmic problems and optimization techniques",
            },
            {
              title: "Web Development",
              icon: "fas fa-globe",
              duration: "16 weeks",
              description:
                "Build modern web applications with latest technologies and frameworks",
            },
          ].map((topic, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-50 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                <i className={`${topic.icon} text-3xl text-teal-400`}></i>
                <h3 className="text-xl font-bold text-white ml-4">
                  {topic.title}
                </h3>
              </div>
              <p className="text-gray-300 mb-4">{topic.description}</p>
              <div className="flex items-center mb-6">
                <i className="far fa-clock text-teal-400 mr-2"></i>
                <span className="text-gray-300">{topic.duration}</span>
              </div>
              <button className="w-full bg-teal-500 text-white py-2 !rounded-button hover:bg-teal-600 transition-colors whitespace-nowrap">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Form Section */}
     
      {/* Footer */}
      {/* <footer className="bg-gray-900 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 CodeMaster Hub. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};
export default App;
