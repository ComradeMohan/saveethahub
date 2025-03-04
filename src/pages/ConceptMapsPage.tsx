import React from 'react';
import { Compass, Network, Brain, Lightbulb } from 'lucide-react';

const ConceptMapsPage = () => {
  const subjects = [
    {
      title: 'Computer Science',
      icon: Network,
      topics: [
        { name: 'Data Base Management Systems ', link: '/CSA0510 Database management systems.pdf' },
        { name: 'Cryptography ', link: '/CSA51.pdf' },
        { name: 'Internet Programming', link: '/CSA43 Internet Programming.pdf' },
        { name: 'Operating System', link: '/CSA04.pdf' },
        { name: 'Design Analysis and Algorithms', link: '/CSA06.pdf' },
        { name: 'Artificial Intelligence', link: '/CSA17.pdf' },
        { name: 'Compiler Design', link: '/CSA14.pdf' },
        { name: 'Theory of Computation', link: '/CSA13.pdf' },
        { name: 'Computer Networks', link: '/CSA07.pdf'},
        { name: 'Computer Architecture', link: 'https://drive.google.com/file/d/16weBmSlmInDD8INzPlLo8FXGp30hzcvj/view?usp=sharing' }
      ],
      color: 'from-blue-500/20 to-blue-600/20'
    },
    
    {
      title: 'Theory',
      icon: Compass,
      topics: [
        { name: 'Professional Ethics', link: 'https://drive.google.com/file/d/1EPDjMyr4Rhhx2-FHq_QYsFwp57mEyZpL/view' },
        { name: 'Biology', link: '/BTA01.pdf' },
        { name: 'Fundamentals of computing', link: 'https://drive.google.com/file/d/1Di9RXsJBsZi0csYI9PVgbjM-ZANFUiPc/view?usp=sharing' },
        { name: 'Microprocessor and Microcontrollers', link: 'https://drive.google.com/file/d/1F-ViYhMWEGdrcW3M9yfbkmpI6rUYqsa7/view?usp=sharing' }
        
      ],
      
      color: 'from-purple-500/20 to-purple-600/20'
    },
    
    {
      title: 'Mathematics',
      icon: Brain,
      topics: [
        { name: 'M1-Engineering Mathematics', link: '/UBA01- Engineering Mathematics I.pdf' },
        { name: 'M2-Discrete Mathematics', link: '/UBA04- Discrete Mathematics.pdf' }
      ],
      
      color: 'from-teal-500/20 to-teal-600/20'
    },
    {
      title: 'Science',
      icon: Lightbulb,
      topics: [
        { name: 'Engineering Physics', link: 'https://drive.google.com/file/d/1Byc3X8ou0tmvO5v1v38vkKopn-yEbMrk/view' },
        { name: 'Engineering Chemistry', link: 'https://drive.google.com/file/d/1Javdl56A03lGSkBDEAoAX-S151M9acAl/view' }
      ],
      color: 'from-orange-500/20 to-orange-600/20'
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Interactive Concept Maps</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Explore complex topics through visual learning with our interactive concept maps
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className={`glass-card rounded-xl p-6 bg-gradient-to-br ${subject.color} hover:scale-105 transition-transform duration-300`}
          >
            <div className="flex items-center mb-6">
              <subject.icon className="h-8 w-8 text-white mr-3" />
              <h2 className="text-2xl font-semibold text-white">{subject.title}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {subject.topics.map((topic, topicIndex) => (
                <a key={topicIndex} href={topic.link} target="_blank" rel="noopener noreferrer">
                  <button
                    className="bg-white/10 hover:bg-white/20 text-white rounded-lg p-3 text-sm transition-colors w-full"
                  >
                    {topic.name}
                  </button>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConceptMapsPage;
