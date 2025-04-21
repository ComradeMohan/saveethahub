import React from 'react';

interface QuestionNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onNavigate: (questionNumber: number) => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentQuestion,
  totalQuestions,
  onNavigate
}) => {
  // Show a window of 10 questions at a time
  const windowSize = 10;
  const startQuestion = Math.floor((currentQuestion - 1) / windowSize) * windowSize + 1;
  const endQuestion = Math.min(startQuestion + windowSize - 1, totalQuestions);
  
  const questionNumbers = Array.from(
    { length: endQuestion - startQuestion + 1 },
    (_, i) => startQuestion + i
  );
  
  // Calculate dropdown options for jumping to different ranges
  const dropdownOptions = [];
  for (let i = 1; i <= totalQuestions; i += windowSize) {
    const end = Math.min(i + windowSize - 1, totalQuestions);
    dropdownOptions.push({ value: i, label: `${i}-${end}` });
  }

  return (
    <div className="mb-6">
      <p className="text-gray-700 mb-2 font-medium">Question Navigation:</p>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1 flex-grow">
          {questionNumbers.map(num => (
            <button
              key={num}
              onClick={() => onNavigate(num)}
              className={`w-9 h-9 rounded-md text-sm font-medium flex items-center justify-center transition-colors
                ${currentQuestion === num
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-800 hover:bg-blue-100 border border-gray-200'
                }`}
            >
              {num}
            </button>
          ))}
        </div>
        
        <select 
          className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md cursor-pointer"
          value={Math.floor((currentQuestion - 1) / windowSize) * windowSize + 1}
          onChange={(e) => onNavigate(Number(e.target.value))}
        >
          {dropdownOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default QuestionNavigation;