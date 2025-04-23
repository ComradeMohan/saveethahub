export type ViewType = 'day' | 'week' | 'month';

export type SlotType = 'A' | 'B' | 'C' | 'D';

export type EventType = 'class' | 'exam' | 'holiday' | 'event';

export type ExamType = 
  | 'laboratory' 
  | 'model' 
  | 'semester' 
  | 'practical' 
  | 'pre-lab';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: EventType;
  details?: string;
  location?: string;
  editable?: boolean;
}

export interface ClassEvent extends CalendarEvent {
  type: 'class';
  slot: SlotType;
  subject: string;
  faculty?: string;
}

export interface ExamEvent extends CalendarEvent {
  type: 'exam';
  examType: ExamType;
  subject: string;
}

export interface HolidayEvent extends CalendarEvent {
  type: 'holiday';
  holidayType: 'regular' | 'public' | 'special';
}

export interface CollegeEvent extends CalendarEvent {
  type: 'event';
  department?: string;
  organizer?: string;
}

export type FilterOptions = {
  classes: boolean;
  exams: {
    laboratory: boolean;
    model: boolean;
    semester: boolean;
    practical: boolean;
    preLab: boolean;
  };
  holidays: boolean;
  events: boolean;
};