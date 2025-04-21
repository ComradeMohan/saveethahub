export interface Subject {
    id: string;
    name: string;
    description: string;
    labSets: number;
    icon: string;
    backgroundColor: string;
  }
  
  export interface LabSet {
    id: number;
    title: string;
    description: string;
    subject: string;
    questionCount: number;
    pdfUrl: string;
    completed?: boolean;
  }
  
  export interface Question {
    id: number;
    text: string;
    hints: string[];
    referenceLinks: {
      title: string;
      url: string;
    }[];
    answerType: 'text' | 'multiple-choice' | 'diagram' | 'file';
    options?: string[];
    correctAnswer?: string | string[];
  }
  
  export interface StudentProgress {
    subject: string;
    setId: number;
    completedQuestions: number[];
    submittedToGithub: boolean;
  }