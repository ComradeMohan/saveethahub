import React, { useState } from 'react';
import { Question } from '../../types/labs';
import { Upload, PencilLine, Check } from 'lucide-react';

interface AnswerSubmissionProps {
  question: Question;
  onSubmit: (answer: string | File) => void;
}

const AnswerSubmission: React.FC<AnswerSubmissionProps> = ({ question, onSubmit }) => {
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const handleSubmit = () => {
    if (question.answerType === 'text') {
      onSubmit(textAnswer);
    } else if (question.answerType === 'multiple-choice' && selectedOption) {
      onSubmit(selectedOption);
    } else if (question.answerType === 'file' && file) {
      onSubmit(file);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        {question.answerType === 'text' && (
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your answer here..."
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
          />
        )}
        
        {question.answerType === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer-option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`option-${index}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
        
        {question.answerType === 'diagram' && (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <PencilLine className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-500 mb-2">Use the diagram editor to draw your answer</p>
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-200 transition-colors">
              Open Diagram Editor
            </button>
          </div>
        )}
        
        {question.answerType === 'file' && (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-500 mb-2">
              {file ? `Selected: ${file.name}` : 'Upload your answer file'}
            </p>
            <input 
              type="file"
              id="answer-file"
              onChange={handleFileChange}
              className="hidden"
            />
            <label 
              htmlFor="answer-file" 
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-200 transition-colors cursor-pointer"
            >
              {file ? 'Change File' : 'Choose File'}
            </label>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <h4 className="text-gray-700 font-medium mb-1">Reference Materials:</h4>
          <ul className="space-y-1">
            {question.referenceLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url} className="text-blue-600 hover:underline">
                  • {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center"
        >
          <Check className="mr-2 h-5 w-5" />
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default AnswerSubmission;