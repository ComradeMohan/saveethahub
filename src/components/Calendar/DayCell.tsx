import React from 'react';
import { CalendarEvent, FilterOptions } from '../../types/calender';
import { 
  isToday, isCurrentMonth, isThirdSaturday,
  isMarchHoliday
} from '../../utils/dateUtils';
import { filterEvents } from '../../utils/eventUtils';
import Event from '../Events/Event';

interface DayCellProps {
  date: Date;
  events: CalendarEvent[];
  filters: FilterOptions;
  currentMonth: number;
  isMonthView: boolean;
  onClick?: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ 
  date, events, filters, currentMonth, isMonthView, onClick 
}) => {
  const filteredEvents = filterEvents(events, date, filters);
  
  const isHoliday = 
    date.getDay() === 0 || // Sunday
    isThirdSaturday(date) || 
    isMarchHoliday(date);
  
  const cellClasses = [
    'relative border border-white/10 transition-all duration-200',
    isToday(date) ? 'bg-white/10 font-bold ring-2 ring-[#0d9488] ring-inset' : '',
    !isCurrentMonth(date, currentMonth) ? 'opacity-40' : '',
    isHoliday ? 'bg-red-500/5' : '',
    isMonthView ? 'h-20 ' : 'min-h-40 md:h-72 lg:h-96',
    onClick ? 'cursor-pointer hover:bg-white/5' : '',
  ].filter(Boolean).join(' ');
  
  const dayNumber = date.getDate();
  
  return (
    <div 
      className={cellClasses}
      onClick={() => onClick && onClick(date)}
    >
      <div className="flex justify-between p-1 sticky top-0 bg-white/5 backdrop-blur-sm z-10">
        <span className={`flex items-center justify-center w-6 h-6 rounded-full ${isToday(date) ? 'bg-[#0d9488] text-white' : 'text-white/80'}`}>
          {dayNumber}
        </span>
        {isHoliday && (
          <span className="text-xs bg-red-500/10 text-red-100 px-1 rounded">
            Holiday
          </span>
        )}
      </div>
      
      <div className={`event-container ${isMonthView ? 'max-h-24 overflow-hidden' : 'p-1 overflow-y-auto max-h-[calc(100%-2rem)]'}`}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Event key={event.id} event={event} isCompact={isMonthView} />
          ))
        ) : (
          <div className="p-1 text-xs text-white/40 italic"></div>
        )}
        
        {isMonthView && filteredEvents.length > 2 && (
          <div className="text-xs text-center bg-white/10 text-white/80 rounded-sm p-0.5 m-0.5">
            +{filteredEvents.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
};

export default DayCell;