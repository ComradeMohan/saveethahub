import { Subject, Question } from '../types/labs';

export const subjects: Subject[] = [
    {
        id: 'cpp.pdf',
        name: 'Object Oriented Programming with C++',
        description: 'Advanced C++ and OOP concepts',
        icon: 'Code2',
        backgroundColor: 'bg-white/10'
      },
        {
    id: 'Python.pdf',
    name: 'Python Programming',
    description: 'Python language fundamentals and applications',
    icon: 'Code',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'java.pdf',
    name: 'Programming in Java',
    description: 'Java language and object-oriented programming',
    icon: 'Coffee',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'database-management',
    name: 'Database Management Systems',
    description: 'UPDATING',
    icon: 'Database',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    description: 'UPDATING',
    icon: 'Code',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'biology-environmental',
    name: 'Biology and Environmental Science',
    description: 'UPDATING',
    icon: 'Leaf',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'professional-ethics',
    name: 'Professional Ethics and Legal Practices',
    description: 'UPDATING',
    icon: 'Scale',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'engineering-physics',
    name: 'Engineering Physics',
    description: 'UPDATING',
    icon: 'Atom',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'engineering-chemistry',
    name: 'Engineering Chemistry',
    description: 'UPDATING',
    icon: 'Flask',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'cpp.pdf',
    name: 'C Programming',
    description: 'Fundamentals of C programming language',
    icon: 'Code2',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'engineering-mathematics',
    name: 'Engineering Mathematics - I',
    description: 'UPDATING',
    icon: 'PlusSquare',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'digital-system-design',
    name: 'Principles of Digital System Design',
    description: 'UPDATING',
    icon: 'Cpu',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    description: 'UPDATING',
    icon: 'Network',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'microprocessor',
    name: 'Microprocessor and Microcontroller',
    description: 'UPDATING',
    icon: 'Chip',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'computing-fundamentals',
    name: 'Fundamentals of Computing',
    description: 'UPDATING',
    icon: 'Monitor',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'object-oriented-analysis',
    name: 'Object Oriented Analysis and Design',
    description: 'UPDATING',
    icon: 'Box',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    description: 'UPDATING',
    icon: 'Globe',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'data-warehousing',
    name: 'Data Warehousing and Data Mining',
    description: 'UPDATING',
    icon: 'Database',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'Python.pdf',
    name: 'Python Programming',
    description: 'Python language fundamentals and applications',
    icon: 'Code',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'discrete-mathematics',
    name: 'Discrete Mathematics',
    description: 'UPDATING',
    icon: 'Hash',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'algorithms',
    name: 'Design and Analysis of Algorithms',
    description: 'UPDATING',
    icon: 'GitBranch',
    backgroundColor: 'bg-white/10'
  },

  {
    id: 'operating-systems',
    name: 'Operating Systems',
    description: 'UPDATING',
    icon: 'Server',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'compiler-design',
    name: 'Compiler Design',
    description: 'UPDATING',
    icon: 'FileCode',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'internet-programming',
    name: 'Internet Programming for Packets Delivery',
    description: 'UPDATING',
    icon: 'Globe2',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'cryptography',
    name: 'Cryptography and Network Security',
    description: 'UPDATING',
    icon: 'Shield',
    backgroundColor: 'bg-white/10'
  },
  
  {
    id: 'probability-statistics',
    name: 'Probability and Statistics',
    description: 'UPDATING',
    icon: 'BarChart',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'computer-architecture',
    name: 'Computer Architecture',
    description: 'UPDATING',
    icon: 'Cpu',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'theory-computation',
    name: 'Theory of Computation',
    description: 'UPDATING',
    icon: 'Binary',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    description: 'UPDATING',
    icon: 'Brain',
    backgroundColor: 'bg-white/10'
  },
  {
    id: 'technical-english',
    name: 'Technical English',
    description: 'UPDATING',
    icon: 'FileText',
    backgroundColor: 'bg-white/10'
  }
];

export const getQuestions = (subjectId: string): Question[] => {
  return Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    text: `Question ${index + 1} for ${subjectId}`,
    hints: [
      'Consider the fundamental principles',
      'Try drawing a diagram to visualize the solution'
    ],
    referenceLinks: [
      {
        title: `Chapter ${Math.floor(index / 10) + 1}`,
        url: '#'
      },
      {
        title: 'Lecture Slides',
        url: '#'
      }
    ],
    answerType: index % 4 === 0 ? 'multiple-choice' : 
                index % 4 === 1 ? 'diagram' : 
                index % 4 === 2 ? 'file' : 'text',
    options: index % 4 === 0 ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined
  }));
};