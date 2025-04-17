export interface Internship {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    postedDate?: string;
    deadline?: string;
    type: 'internship' | 'job';
    role: string;
    description: string;
    skills?: string[];
    companyLogo?: string;
    applyLink: string;
  }
  
  export interface FilterOptions {
    role: string;
    location: string;
    type: string; // 'all', 'internship', 'job'
  }
  