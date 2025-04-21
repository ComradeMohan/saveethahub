import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuestions, getLabSets } from '../data/subjects';
import QuestionNavigation from '../components/labs/QuestionNavigation';
import AnswerSubmission from '../components/labs/AnswerSubmission';
import GithubSubmission from '../components/labs/GithubSubmission';
import { ArrowLeft, HelpCircle } from 'lucide-react';

const QuestionPage: React.FC = () => {
  const { subject, setId: setIdParam } = useParams<{ subject: string; setId: string }>();
  
  const setId = parseInt(setIdParam || '1');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [progress, setProgress] = useState<number[]>([]);
  
  // Get questions and lab set info
  const questions = subject ? getQuestions(subject, setId) : [];
  const labSets = subject ? getLabSets(subject) : [];
  const currentLabSet = labSets.find(set => set.id === setId);
  
  // Get the current question data
  const questionData = questions[currentQuestion - 1];
  
  // Handle question navigation
  const handleNavigate = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
    // Scroll to top when changing questions
    window.scrollTo(0, 0);
  };
  
  // Handle answer submission
  const handleAnswerSubmit = (answer: string | File) => {
    if (!progress.includes(currentQuestion)) {
      setProgress([...progress, currentQuestion]);
    }
    
    // Move to the next question if not at the end
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle GitHub submission
  const handleGithubSubmit = (repoUrl: string) => {
    console.log('Submitted to GitHub:', repoUrl);
    // In a real app, this would send the data to the server
  };
  
  // Title for the page
  const pageTitle = currentLabSet 
    ? `${currentLabSet.title} - Set ${setId}` 
    : 'Lab Questions';
    
  useEffect(() => {
    // Reset to question 1 when changing sets
    setCurrentQuestion(1);
    setProgress([]);
  }, [subject, setId]);
  
  if (!questionData || !currentLabSet) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lab Set Not Found</h2>
        <Link to="/labs" className="text-blue-600 hover:underline">
          Return to Labs
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn pt-10">
      <div className="flex items-center mb-6">
        <Link to={`/labs/${subject}`} className="text-blue-600 hover:text-white flex items-center mr-4">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
      </div>
      
      <GithubSubmission 
        subjectId={subject || ''} 
        setId={setId} 
        onSubmit={handleGithubSubmit} 
      />
      
      <QuestionNavigation 
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        onNavigate={handleNavigate}
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">
          Question {currentQuestion}:
        </h2>
        
        <p className="text-gray-800 mb-6">{questionData.text}</p>
        
        {questionData.hints.length > 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
            <h3 className="text-yellow-800 font-medium flex items-center mb-2">
              <HelpCircle className="w-5 h-5 mr-1" />
              Hints:
            </h3>
            <ul className="space-y-1 text-yellow-700">
              {questionData.hints.map((hint, index) => (
                <li key={index}>• {hint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <AnswerSubmission 
        question={questionData}
        onSubmit={handleAnswerSubmit}
      />
      
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => handleNavigate(Math.max(1, currentQuestion - 1))}
          disabled={currentQuestion === 1}
          className={`px-4 py-2 rounded-md ${
            currentQuestion === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          Previous Question
        </button>
        
        <div className="text-gray-600">
          Question {currentQuestion} of {questions.length}
        </div>
        
        <button
          onClick={() => handleNavigate(Math.min(questions.length, currentQuestion + 1))}
          disabled={currentQuestion === questions.length}
          className={`px-4 py-2 rounded-md ${
            currentQuestion === questions.length
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;