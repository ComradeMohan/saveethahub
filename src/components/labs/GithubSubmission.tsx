import React, { useState } from 'react';
import { Github } from 'lucide-react';

interface GithubSubmissionProps {
  subjectId: string;
  setId: number;
  onSubmit: (repoUrl: string) => void;
}

const GithubSubmission: React.FC<GithubSubmissionProps> = ({ subjectId, setId, onSubmit }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(repoUrl);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 flex items-center">
        <Github className="mr-3 h-5 w-5" />
        <p>Successfully submitted to GitHub! Your instructor will review your work.</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
      <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
        <Github className="mr-2 h-5 w-5" />
        Submit Your Work to GitHub
      </h3>
      
      <p className="text-blue-700 mb-4">
        After completing all questions in this set, please submit your work by providing your GitHub repository URL.
      </p>
      
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="url"
          placeholder="https://github.com/yourusername/repository"
          className="flex-grow p-2 border border-blue-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
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
    </div>
  );
};

export default GithubSubmission;