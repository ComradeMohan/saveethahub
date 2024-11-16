import React from 'react';
import { Code, Palette, Video, Database } from 'lucide-react';

const SkillsPage = () => {
  const skillCategories = [
    {
      title: 'Programming',
      icon: Code,
      skills: [
        { name: 'Web Development', level: 'Beginner to Advanced' },
        { name: 'Python Programming', level: 'All Levels' },
        { name: 'Mobile App Development', level: 'Intermediate' },
        { name: 'Data Structures', level: 'Advanced' }
      ]
    },
    {
      title: 'Design',
      icon: Palette,
      skills: [
        { name: 'UI/UX Design', level: 'Beginner' },
        { name: 'Graphic Design', level: 'Intermediate' },
        { name: '3D Modeling', level: 'Advanced' },
        { name: 'Motion Graphics', level: 'All Levels' }
      ]
    },
    {
      title: 'Digital Media',
      icon: Video,
      skills: [
        { name: 'Video Editing', level: 'Beginner' },
        { name: 'Animation', level: 'Intermediate' },
        { name: 'Sound Design', level: 'Advanced' },
        { name: 'Content Creation', level: 'All Levels' }
      ]
    },
    {
      title: 'Data Science',
      icon: Database,
      skills: [
        { name: 'Machine Learning', level: 'Advanced' },
        { name: 'Data Analysis', level: 'Intermediate' },
        { name: 'Big Data', level: 'Advanced' },
        { name: 'Data Visualization', level: 'Beginner' }
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Learn New Skills</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Enhance your professional portfolio with our curated skill development courses
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="glass-card rounded-xl p-6">
            <div className="flex items-center mb-6">
              <category.icon className="h-8 w-8 text-teal-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
            </div>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium">{skill.name}</h3>
                    <span className="text-sm text-teal-400">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;