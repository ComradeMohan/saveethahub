import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subjects, getQuestions } from '../data/subjects';
import { ArrowLeft, Github } from 'lucide-react';
import AnswerSubmission from '../components/labs/AnswerSubmission';

const SubjectPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [githubUrl, setGithubUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Find the subject data
  const subjectData = subjects.find(s => s.id === subject);
  
  // Get questions for this subject
  const questions = subject ? getQuestions(subject) : [];
  const currentQuestionData = questions[currentQuestion - 1];
  
  const handleGithubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!subjectData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Subject Not Found</h2>
        <Link to="/labs" className="text-blue-600 hover:underline">
          Return to Labs
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn pt-10">
      <div className="flex items-center mb-6">
        <Link to="/labs" className="text-white hover:text-blue-800 flex items-center mr-4">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">{subjectData.name}</h1>
      </div>

      {/* Question Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index + 1)}
              className={`w-10 h-10 rounded-md text-sm font-medium flex items-center justify-center transition-colors
                ${currentQuestion === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-800 hover:bg-blue-100 border border-gray-200'
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      {currentQuestionData && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Question {currentQuestion}:
          </h2>
          <p className="text-gray-800 mb-6">{currentQuestionData.text}</p>
          <AnswerSubmission 
            question={currentQuestionData}
            onSubmit={() => {}}
          />
        </div>
      )}

      {/* GitHub Submission */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
          <Github className="mr-2 h-5 w-5" />
          Submit Your Work to GitHub
        </h3>
        
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 flex items-center">
            <Github className="mr-3 h-5 w-5" />
            <p>Successfully submitted to GitHub! Your instructor will review your work.</p>
          </div>
        ) : (
          <form onSubmit={handleGithubSubmit} className="flex">
            <input
              type="url"
              placeholder="https://github.com/yourusername/repository"
              className="flex-grow p-2 border border-blue-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-r-md font-medium flex items-center ${
                isSubmitting 
                  ? 'bg-blue-400 text-white cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;