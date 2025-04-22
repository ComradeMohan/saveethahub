import React from 'react';
import { Link } from 'react-router-dom';
import { Subject } from '../../types/labs';
import * as Icons from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
}

type IconName = keyof typeof Icons;

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const Icon = Icons[subject.icon as IconName];
  
  return (
    <Link 
      to={`/pdf-viewer?file=/${subject.id}`}
      className={`${subject.backgroundColor} p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full`}
    >
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-10 h-10 text-teal-400 mr-3" />}
        <h3 className="text-xl font-bold text-white">{subject.name}</h3>
      </div>
      <p className="text-gray-200 mb-4 flex-grow">{subject.description}</p>
      <div className="text-blue-800 font-medium mt-auto">
        {subject.labSets} 
      </div>
    </Link>
  );
};

export default SubjectCard;
