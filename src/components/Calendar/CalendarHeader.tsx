import React from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  Download, Printer, RefreshCw
} from 'lucide-react';
import { ViewType } from '../../types';
import { MONTHS } from '../../constants';

interface CalendarHeaderProps {
  currentDate: Date;
  viewType: ViewType;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: ViewType) => void;
  onExport?: () => void;
  onPrint?: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  viewType,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
  onExport,
  onPrint
}) => {
  const formatTitle = () => {
    const month = MONTHS[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    
    if (viewType === 'day') {
      return `${month} ${currentDate.getDate()}, ${year}`;
    } else if (viewType === 'week') {
      return `${month} ${year} (Week ${Math.ceil(currentDate.getDate() / 7)})`;
    } else {
      return `${month} ${year}`;
    }
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg mb-4 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <CalendarIcon size={24} className="mr-2" />
          <h1 className="text-xl md:text-2xl font-bold">
            College Calendar
          </h1>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={onToday}
            className="flex items-center bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md border border-white/20 transition-colors"
          >
            <RefreshCw size={16} className="mr-1" />
            <span>Today</span>
          </button>
          
          <div className="bg-white/5 rounded-md border border-white/20 flex overflow-hidden">
            <button
              onClick={() => onViewChange('day')}
              className={`px-3 py-1.5 text-sm ${
                viewType === 'day'
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => onViewChange('week')}
              className={`px-3 py-1.5 text-sm ${
                viewType === 'week'
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => onViewChange('month')}
              className={`px-3 py-1.5 text-sm ${
                viewType === 'month'
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Month
            </button>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <button
              onClick={onExport}
              className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-md border border-white/20 transition-colors"
              title="Export Calendar"
            >
              <Download size={16} />
            </button>
            <button
              onClick={onPrint}
              className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-md border border-white/20 transition-colors"
              title="Print Calendar"
            >
              <Printer size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={onPrevious}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">
            {formatTitle()}
          </h2>
          <button
            onClick={onNext}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="md:hidden flex space-x-2">
          <button
            onClick={onExport}
            className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-md border border-white/20 transition-colors"
            title="Export Calendar"
          >
            <Download size={16} />
          </button>
          <button
            onClick={onPrint}
            className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-md border border-white/20 transition-colors"
            title="Print Calendar"
          >
            <Printer size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;