import React from 'react';
import { BookOpen, Book, Calendar, Briefcase, AlertCircle, Award, FileText, Coffee, FlaskRound as Flask, GraduationCap } from 'lucide-react';
import { 
  CalendarEvent, ClassEvent, ExamEvent, 
  HolidayEvent, CollegeEvent 
} from '../../types/calender';
import { formatTime } from '../../utils/dateUtils';

interface EventProps {
  event: CalendarEvent;
  isCompact?: boolean;
}

const Event: React.FC<EventProps> = ({ event, isCompact = false }) => {
  const isPastEvent = new Date(event.end) < new Date();

  const renderIcon = () => {
    switch (event.type) {
      case 'class':
        return <BookOpen size={isCompact ? 14 : 18} />;
      case 'exam':
        const examEvent = event as ExamEvent;
        switch (examEvent.examType) {
          case 'laboratory':
            return <Flask size={isCompact ? 14 : 18} />;
          case 'model':
            return <FileText size={isCompact ? 14 : 18} />;
          case 'semester':
            return <GraduationCap size={isCompact ? 14 : 18} />;
          case 'practical':
            return <Book size={isCompact ? 14 : 18} />;
          case 'pre-lab':
            return <AlertCircle size={isCompact ? 14 : 18} />;
          default:
            return <FileText size={isCompact ? 14 : 18} />;
        }
      case 'holiday':
        return <Coffee size={isCompact ? 14 : 18} />;
      case 'event':
        return <Calendar size={isCompact ? 14 : 18} />;
      default:
        return <Briefcase size={isCompact ? 14 : 18} />;
    }
  };

  const getEventClasses = (): string => {
    let baseClasses = '';
    switch (event.type) {
      case 'class':
        const classEvent = event as ClassEvent;
        baseClasses = `bg-white/10 border-l-4 ${isPastEvent ? 'opacity-50' : ''}`;
        switch (classEvent.slot) {
          case 'A':
            return `${baseClasses} border-l-[#1a365d] text-white`;
          case 'B':
            return `${baseClasses} border-l-[#1a365d] text-white`;
          case 'C':
            return `${baseClasses} border-l-[#0d9488] text-white`;
          case 'D':
            return `${baseClasses} border-l-[#0d9488] text-white`;
          default:
            return `${baseClasses} border-l-gray-400 text-white`;
        }
      case 'exam':
        const examEvent = event as ExamEvent;
        baseClasses = `bg-white/15 border-l-4 ${isPastEvent ? 'opacity-50' : ''}`;
        switch (examEvent.examType) {
          case 'laboratory':
            return `${baseClasses} border-l-amber-400 text-white`;
          case 'model':
            return `${baseClasses} border-l-orange-400 text-white`;
          case 'semester':
            return `${baseClasses} border-l-red-400 text-white`;
          case 'practical':
            return `${baseClasses} border-l-rose-400 text-white`;
          case 'pre-lab':
            return `${baseClasses} border-l-yellow-400 text-white`;
          default:
            return `${baseClasses} border-l-gray-400 text-white`;
        }
      case 'holiday':
        return `bg-white/10 border-l-4 border-l-blue-400 text-white ${isPastEvent ? 'opacity-50' : ''}`;
      case 'event':
        return `bg-white/10 border-l-4 border-l-purple-400 text-white ${isPastEvent ? 'opacity-50' : ''}`;
      default:
        return `bg-white/10 border-l-4 border-l-gray-400 text-white ${isPastEvent ? 'opacity-50' : ''}`;
    }
  };

  const getEventDetails = (): string => {
    switch (event.type) {
      case 'class':
        const classEvent = event as ClassEvent;
        return `${classEvent.subject}${classEvent.faculty ? ` - ${classEvent.faculty}` : ''}`;
      case 'exam':
        const examEvent = event as ExamEvent;
        return `${examEvent.examType.charAt(0).toUpperCase() + examEvent.examType.slice(1)} - ${examEvent.subject}`;
      case 'holiday':
        const holidayEvent = event as HolidayEvent;
        return `${holidayEvent.holidayType.charAt(0).toUpperCase() + holidayEvent.holidayType.slice(1)} Holiday`;
      case 'event':
        const collegeEvent = event as CollegeEvent;
        return collegeEvent.department ? `${collegeEvent.department} - ${collegeEvent.organizer || ''}` : collegeEvent.organizer || '';
      default:
        return '';
    }
  };

  if (isCompact) {
    return (
      <div className={`flex items-center px-1 py-0.5 my-0.5 rounded text-xs truncate ${getEventClasses()}`}>
        <span className="mr-1">{renderIcon()}</span>
        <span className="truncate">{event.title}</span>
      </div>
    );
  }

  return (
    <div className={`px-3 py-2 mb-2 rounded shadow-sm hover:shadow-md transition-shadow ${getEventClasses()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2">{renderIcon()}</span>
          <h3 className="font-medium">{event.title}</h3>
        </div>
        <span className="text-sm opacity-80">
          {formatTime(new Date(event.start))} - {formatTime(new Date(event.end))}
        </span>
      </div>
      <p className="text-sm mt-1 ml-6">{getEventDetails()}</p>
      {event.location && !isCompact && (
        <p className="text-xs mt-1 ml-6 opacity-70">📍 {event.location}</p>
      )}
    </div>
  );
};

export default Event;