import { ExamType } from '../types/calender';

export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAYS_OF_WEEK_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MORNING_SESSION = {
  start: '09:00',
  end: '12:30'
};

export const AFTERNOON_SESSION = {
  start: '13:30',
  end: '16:30'
};

export const CLASS_COLORS: Record<string, string> = {
  A: 'bg-[#1a365d] bg-opacity-10 border-[#1a365d] text-[#1a365d]',
  B: 'bg-[#1a365d] bg-opacity-20 border-[#1a365d] text-[#1a365d]',
  C: 'bg-[#0d9488] bg-opacity-10 border-[#0d9488] text-[#0d9488]',
  D: 'bg-[#0d9488] bg-opacity-20 border-[#0d9488] text-[#0d9488]',
};

export const EXAM_COLORS: Record<ExamType, string> = {
  laboratory: 'bg-amber-100 border-amber-600 text-amber-800',
  model: 'bg-orange-100 border-orange-600 text-orange-800',
  semester: 'bg-red-100 border-red-600 text-red-800',
  practical: 'bg-rose-100 border-rose-600 text-rose-800',
  'pre-lab': 'bg-yellow-100 border-yellow-600 text-yellow-800',
};

export const HOLIDAY_COLORS = 'bg-blue-100 border-blue-600 text-blue-800';
export const EVENT_COLORS = 'bg-purple-100 border-purple-600 text-purple-800';

export const THEME_COLORS = {
  primary: '#1a365d',
  secondary: '#0d9488',
};