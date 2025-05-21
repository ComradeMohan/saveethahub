import React from 'react';
import { Calculator, Clock, Compass, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Community',
      description: 'Interactive Groups',
      color: 'from-blue-500 to-blue-600',
      path: '/community' // Path for CGPA Calculator
    },
    {
      icon: Clock,
      title: 'Course Enrollment Alert',
      description: 'No more worries in lossing the required course',
      color: 'from-teal-500 to-teal-600',
      path: '/course' // Path for Attendance Tracker
    },
    {
      icon: Compass,
      title: 'Internships',
      description: 'Find your next job',
      color: 'from-purple-500 to-purple-600',
      path: '/internship' // Path for Concept Maps
    },
    {
      icon: Award,
      title: 'Portfolios',
      description: 'Get inspirations from developers',
      color: 'from-pink-500 to-pink-600',
      path: '/portfolios' // Path for Free Certifications
    }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Everything You Need to Succeed
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Access powerful tools and resources designed to support your academic journey
          and professional development.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Link // Wrap each feature in a Link for navigation
            key={index}
            to={feature.path} // Set the destination path here
            className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className={absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity}></div>
            <feature.icon className="h-12 w-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Features;
