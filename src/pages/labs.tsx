import React from 'react';
import { subjects } from '../data/subjects';
import SubjectCard from '../components/labs/SubjectCard';
import { Book } from 'lucide-react';

const LabsPage: React.FC = () => {
  return (
    <div className="animate-fadeIn pt-10">
      <div className="flex items-center mb-6">
        <Book className="w-6 h-6 text-blue-800 mr-2" />
        <h1 className="text-2xl font-bold text-white">Laboratory Exercises</h1>
      </div>
      
      <p className="text-gray-300 mb-8">
        Select a subject to access lab exercises. Each subject contains 10 lab sets with 40 questions per set.
        Complete the exercises, then submit your work using the GitHub submission option.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map(subject => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default LabsPage;
