import { 
  CalendarEvent, ClassEvent, ExamEvent, HolidayEvent, 
  CollegeEvent, FilterOptions 
} from '../types/calender';
import { 
  isThirdSaturday, isMarchHoliday, isSameDay 
} from './dateUtils';

export const filterEvents = (
  events: CalendarEvent[], 
  date: Date, 
  filters: FilterOptions
): CalendarEvent[] => {
  console.log('Filters:', filters); // Check filters
  return events.filter(event => {
    // Skip past events
    if (new Date(event.end) < new Date()) return false;

    if (!isSameDay(new Date(event.start), date)) return false;

    console.log('Event type:', event.type); // Check event type

    switch (event.type) {
      case 'class':
        console.log('Class filter:', filters.classes); // Check filter for class
        return filters.classes;
      case 'exam':
        const examEvent = event as ExamEvent;
        console.log('Exam type:', examEvent.examType); // Check exam type
        switch (examEvent.examType) {
          case 'laboratory':
            return filters.exams.laboratory;
          case 'model':
            return filters.exams.model;
          case 'semester':
            return filters.exams.semester;
          case 'practical':
            return filters.exams.practical;
          case 'pre-lab':
            return filters.exams.preLab;
          default:
            return false;
        }
      case 'holiday':
        return filters.holidays;
      case 'event':
        return filters.events;
      default:
        return false;
    }
  });
};


export const generateMockEvents = (startMonth: number = new Date().getMonth(), endMonth: number = 6): CalendarEvent[] => {
  const today = new Date();
  const year = today.getFullYear();
  const events: CalendarEvent[] = [];
  
  // Generate events for each month from start to end
  for (let month = startMonth; month <= endMonth; month++) {
    // Generate class events for the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() === 0) continue; // Skip Sunday
      
      if (!isThirdSaturday(date) && !isMarchHoliday(date)) {
        // Determine if it's an A/B day or C/D day based on even/odd date
        const isABDay = date.getDate() % 2 === 0;
        
        if (isABDay) {
          // Morning A slot
          const morningClass: ClassEvent = {
            id: `class-morning-${month}-${day}`,
            title: 'A',
            start: new Date(year, month, day, 9, 0),
            end: new Date(year, month, day, 12, 30),
            type: 'class',
            slot: 'A',
            subject: `Subject ${(date.getDay() % 4) + 1}`,
            faculty: `Prof. Smith`,
            editable: true
          };
          
          // Afternoon B slot
          const afternoonClass: ClassEvent = {
            id: `class-afternoon-${month}-${day}`,
            title: 'B',
            start: new Date(year, month, day, 13, 30),
            end: new Date(year, month, day, 16, 30),
            type: 'class',
            slot: 'B',
            subject: `Subject ${(date.getDay() % 4) + 5}`,
            faculty: `Prof. Johnson`,
            editable: true
          };
          
          events.push(morningClass, afternoonClass);
        } else {
          // Morning C slot
          const morningClass: ClassEvent = {
            id: `class-morning-${month}-${day}`,
            title: 'C',
            start: new Date(year, month, day, 9, 0),
            end: new Date(year, month, day, 12, 30),
            type: 'class',
            slot: 'C',
            subject: `Subject ${(date.getDay() % 4) + 1}`,
            faculty: `Prof. Wilson`,
            editable: true
          };
          
          // Afternoon D slot
          const afternoonClass: ClassEvent = {
            id: `class-afternoon-${month}-${day}`,
            title: 'D',
            start: new Date(year, month, day, 13, 30),
            end: new Date(year, month, day, 16, 30),
            type: 'class',
            slot: 'D',
            subject: `Subject ${(date.getDay() % 4) + 5}`,
            faculty: `Prof. Brown`,
            editable: true
          };
          
          events.push(morningClass, afternoonClass);
        }
      }
    }
    
    // Generate exam events for each month
    const examTypes: ExamEvent['examType'][] = [
      'laboratory', 'model', 'semester', 'practical', 'pre-lab'
    ];
    
    for (let i = 0; i < 5; i++) {
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const examType = examTypes[Math.floor(Math.random() * examTypes.length)];
      const isMorning = Math.random() > 0.5;
      
      const examEvent: ExamEvent = {
        id: `exam-${month}-${i}`,
        title: `${examType.charAt(0).toUpperCase() + examType.slice(1)} Exam`,
        start: new Date(year, month, day, isMorning ? 9 : 13, 30),
        end: new Date(year, month, day, isMorning ? 12 : 16, 30),
        type: 'exam',
        examType: examType,
        subject: `Subject ${Math.floor(Math.random() * 10) + 1}`,
        editable: true
      };
      
      events.push(examEvent);
    }
    
    // Generate holiday events - Third Saturday
    let thirdSatDay = 15;
    const thirdSatDate = new Date(year, month, thirdSatDay);
    while (thirdSatDate.getDay() !== 6) {
      thirdSatDay++;
      thirdSatDate.setDate(thirdSatDay);
    }
    
    const holidayEvent: HolidayEvent = {
      id: `holiday-saturday-${month}`,
      title: `Third Saturday Holiday`,
      start: new Date(year, month, thirdSatDate.getDate()),
      end: new Date(year, month, thirdSatDate.getDate()),
      type: 'holiday',
      holidayType: 'regular',
      editable: false
    };
    
    events.push(holidayEvent);
    
    // March-specific events
    if (month === 2) { // March
      // March 17-22 holiday period
      for (let day = 17; day <= 22; day++) {
        const springBreak: HolidayEvent = {
          id: `holiday-march-${day}`,
          title: `Spring Break`,
          start: new Date(year, 2, day),
          end: new Date(year, 2, day),
          type: 'holiday',
          holidayType: 'special',
          editable: false
        };
        
        events.push(springBreak);
      }
      
      // SIMAM fest (March 8-10)
      for (let day = 8; day <= 10; day++) {
        const festEvent: CollegeEvent = {
          id: `event-simam-${day}`,
          title: `SIMAM Fest Day ${day - 7}`,
          start: new Date(year, 2, day),
          end: new Date(year, 2, day),
          type: 'event',
          organizer: 'College Committee',
          editable: true
        };
        
        events.push(festEvent);
      }
    }
    
    // Department events for each month
    const departments = [
      'Computer Science', 'Electrical Engineering', 
      'Mechanical Engineering', 'Civil Engineering'
    ];
    
    for (let i = 0; i < 2; i++) {
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const dept = departments[Math.floor(Math.random() * departments.length)];
      
      const deptEvent: CollegeEvent = {
        id: `event-dept-${month}-${i}`,
        title: `${dept} Workshop`,
        start: new Date(year, month, day, 10, 0),
        end: new Date(year, month, day, 15, 0),
        type: 'event',
        department: dept,
        organizer: `${dept} Department`,
        editable: true
      };
      
      events.push(deptEvent);
    }
  }
  
  return events;
};

export const searchEvents = (
  events: CalendarEvent[], 
  searchTerm: string
): CalendarEvent[] => {
  if (!searchTerm.trim()) return [];
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return events.filter(event => {
    // Skip past events
    if (new Date(event.end) < new Date()) return false;
    
    const titleMatch = event.title.toLowerCase().includes(lowerSearchTerm);
    const locationMatch = event.location?.toLowerCase().includes(lowerSearchTerm) || false;
    const detailsMatch = event.details?.toLowerCase().includes(lowerSearchTerm) || false;
    
    let additionalMatch = false;
    
    if (event.type === 'class') {
      const classEvent = event as ClassEvent;
      additionalMatch = 
        classEvent.subject.toLowerCase().includes(lowerSearchTerm) ||
        classEvent.faculty?.toLowerCase().includes(lowerSearchTerm) || false;
    } else if (event.type === 'exam') {
      const examEvent = event as ExamEvent;
      additionalMatch = examEvent.subject.toLowerCase().includes(lowerSearchTerm);
    } else if (event.type === 'event') {
      const collegeEvent = event as CollegeEvent;
      additionalMatch = 
        collegeEvent.department?.toLowerCase().includes(lowerSearchTerm) || false ||
        collegeEvent.organizer?.toLowerCase().includes(lowerSearchTerm) || false;
    }
    
    return titleMatch || locationMatch || detailsMatch || additionalMatch;
  });
};