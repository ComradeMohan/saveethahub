import React, { useState } from 'react';
import { searchEvents } from '../../utils/eventUtils';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import FilterPanel from '../Filters/FilterPanel';
import useCalendar from '../../hooks/useCalendar';
import Event from '../Events/Event';

const Calendar: React.FC = () => {
  const {
    currentDate,
    events,
    viewType,
    filters,
    searchTerm,
    setSearchTerm,
    setViewType,
    goToNextPeriod,
    goToPreviousPeriod,
    goToToday,
    updateFilters,
    updateExamFilter,
    setCurrentDate,
  } = useCalendar();
  
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setShowSearchResults(term.length > 0);
  };
  
  const searchResults = searchEvents(events, searchTerm);
  
  const handleExport = () => {
    alert('Export functionality would go here!');
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="flex flex-col h-full print:text-black">
      <CalendarHeader
        currentDate={currentDate}
        viewType={viewType}
        onPrevious={goToPreviousPeriod}
        onNext={goToNextPeriod}
        onToday={goToToday}
        onViewChange={setViewType}
        onExport={handleExport}
        onPrint={handlePrint}
      />
      
      <FilterPanel
        filters={filters}
        onUpdateFilters={updateFilters}
        onUpdateExamFilter={updateExamFilter}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      
      {showSearchResults && searchResults.length > 0 ? (
        <div className="bg-white border border-green-200 rounded-lg shadow-md mb-4 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-green-800">
              Search Results
            </h3>
            <button
              onClick={() => {
                setSearchTerm('');
                setShowSearchResults(false);
              }}
              className="text-sm text-green-600 hover:text-green-800"
            >
              Clear Search
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {searchResults.map(event => (
              <Event key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : showSearchResults && searchResults.length === 0 ? (
        <div className="bg-white border border-green-200 rounded-lg shadow-md mb-4 p-4 text-center">
          <p className="text-gray-500">No results found for "{searchTerm}"</p>
        </div>
      ) : null}
      
      <CalendarGrid
        currentDate={currentDate}
        events={events}
        viewType={viewType}
        filters={filters}
        onDayClick={(date) => {
          setCurrentDate(date);
          setViewType('day');
        }}
      />
    </div>
  );
};

export default Calendar;