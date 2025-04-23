import React from 'react';
import { ViewType, CalendarEvent, FilterOptions } from '../../types/calender';
import { generateMonthDays, generateWeekDays } from '../../utils/dateUtils';
import { DAYS_OF_WEEK_SHORT } from '../../constants/index';
import DayCell from './DayCell';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  viewType: ViewType;
  filters: FilterOptions;
  onDayClick?: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate, events, viewType, filters, onDayClick
}) => {
  const renderDaysOfWeek = () => {
    return (
      <div className="grid grid-cols-7 border-b border-white/10 bg-white/5">
        {DAYS_OF_WEEK_SHORT.map((day) => (
          <div 
            key={day} 
            className="p-2 text-center text-sm font-medium text-white/80"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    const days = generateMonthDays(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    
    return (
      <>
        {renderDaysOfWeek()}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <DayCell
              key={`${day.toISOString()}-${index}`}
              date={day}
              events={events.filter(event => 
                new Date(event.start).getDate() === day.getDate())}  // Filter events for each day
              filters={filters}
              currentMonth={currentDate.getMonth()}
              isMonthView={true}
              onClick={onDayClick}
            />
          ))}
        </div>
      </>
    );
  };

  const renderWeekView = () => {
    const days = generateWeekDays(currentDate);

    return (
      <>
        {renderDaysOfWeek()}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <DayCell
              key={`${day.toISOString()}-${index}`}
              date={day}
              events={events.filter(event => 
                new Date(event.start).getDate() === day.getDate())}  // Filter events for each day
              filters={filters}
              currentMonth={currentDate.getMonth()}
              isMonthView={false}
              onClick={onDayClick}
            />
          ))}
        </div>
      </>
    );
  };

  const renderDayView = () => {
    return (
      <div className="h-screen max-h-[700px] overflow-y-auto">
        <DayCell
          date={currentDate}
          events={events.filter(event => 
            new Date(event.start).getDate() === currentDate.getDate())} // Filter events for the day
          filters={filters}
          currentMonth={currentDate.getMonth()}
          isMonthView={false}
        />
      </div>
    );
  };

  return (
    <div className="border border-white/20 rounded-lg overflow-hidden shadow-xl bg-white/10 backdrop-blur-sm">
      {viewType === 'month' && renderMonthView()}
      {viewType === 'week' && renderWeekView()}
      {viewType === 'day' && renderDayView()}
    </div>
  );
};

export default CalendarGrid;
