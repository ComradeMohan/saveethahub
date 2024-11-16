import React from 'react';
import { Compass, Network, Brain, Lightbulb } from 'lucide-react';

const ConceptMapsPage = () => {
  const subjects = [
    {
      title: 'Computer Science',
      icon: Network,
      topics: [
        { name: 'Data Base Management Systems ', link: 'https://drive.google.com/file/d/1ZYxXFjJNjPg0E-2ICZEaI9wrfKcU9Bue/view' },
        { name: 'Cryptography ', link: 'https://drive.google.com/file/d/17xWKmvzUT0JbAuIJSraPCQE7ehoGqSZg/view?usp=sharing' },
        { name: 'Internet Programming', link: 'https://drive.google.com/file/d/19sAV6lBMd1MmGI6CHHb29WNBQZfmh3Ns/view?usp=sharing' },
        { name: 'Database Management', link: 'https://example.com/database-management' },
        { name: 'Design Analysis and Algorithms', link: 'https://drive.google.com/file/d/157NaZMdICedhRDeKnhG-Dh5XgavNFWME/view?usp=sharing' },
        { name: 'Artificial Intelligence', link: 'https://drive.google.com/file/d/16nrYK3O1oOK36BhxHMY-uIhKdSKykztb/view?usp=sharing' },
        { name: 'Compiler Design', link: 'https://drive.google.com/file/d/1xtyGgBINCu4qhaRD5qIWe9pddUpy08yx/view?usp=sharing' }
      ],
      color: 'from-blue-500/20 to-blue-600/20'
    },
    
    {
      title: 'Theory',
      icon: Compass,
      topics: [
        { name: 'Professional Ethics', link: 'https://drive.google.com/file/d/1EPDjMyr4Rhhx2-FHq_QYsFwp57mEyZpL/view' },
        { name: 'Biology', link: 'https://drive.google.com/file/d/1ZYxXFjJNjPg0E-2ICZEaI9wrfKcU9Bue/view' },
        { name: 'Fundamentals of computing', link: 'https://drive.google.com/file/d/1Di9RXsJBsZi0csYI9PVgbjM-ZANFUiPc/view?usp=sharing' },
        { name: 'Microprocessor and Microcontrollers', link: 'https://drive.google.com/file/d/1F-ViYhMWEGdrcW3M9yfbkmpI6rUYqsa7/view?usp=sharing' },
        { name: 'Computer Networks', link: 'https://drive.google.com/file/d/1SmbYnpSAbHslyIl-GZHCutPfnj-gjmra/view?usp=sharing '},
        { name: 'Computer Architecture', link: 'https://drive.google.com/file/d/16weBmSlmInDD8INzPlLo8FXGp30hzcvj/view?usp=sharing' },
        { name: 'Theory of Computation', link: 'https://drive.google.com/file/d/1h2X-v8cifsFQRDmIFTkWtn8Qgv847Qbc/view?usp=sharing' }
      ],
      
      color: 'from-purple-500/20 to-purple-600/20'
    },
    
    {
      title: 'Mathematics',
      icon: Brain,
      topics: [
        { name: 'M1-Engineering Mathematics', link: 'https://drive.google.com/file/d/1JTnmFBCOfxUy33o6ESIL2EvcFjZN_RvT/view' },
        { name: 'M2-Discrete Mathematics', link: 'https://drive.google.com/file/d/1gBg3YHO2I_WrTb139pngZmHhEJ0PnXR2/view?usp=sharing' }
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