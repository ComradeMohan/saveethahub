import React from 'react';
import { Link } from 'react-router-dom';
import { LabSet } from '../../types/labs';
import { FileText, Check } from 'lucide-react';

interface LabSetCardProps {
  labSet: LabSet;
  subjectId: string;
}

const LabSetCard: React.FC<LabSetCardProps> = ({ labSet, subjectId }) => {
  return (
    <Link 
      to={`/labs/${subjectId}/set/${labSet.id}`}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-600 relative flex flex-col h-full"
    >
      {labSet.completed && (
        <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      
      <h3 className="text-lg font-bold text-blue-900 mb-2">SET {labSet.id}: {labSet.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{labSet.description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-sm text-gray-500">{labSet.questionCount} questions</span>
        <a 
          href={labSet.pdfUrl} 
          onClick={(e) => e.stopPropagation()}
          className="flex items-center text-teal-600 hover:text-teal-800 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileText className="w-4 h-4 mr-1" />
          <span>PDF</span>
        </a>
      </div>
    </Link>
  );
};

export default LabSetCard;