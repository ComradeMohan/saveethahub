import React, { useState } from 'react';
import { BookOpen, FileText, Coffee, Calendar, Search, ChevronDown, ChevronUp, FlaskRound as Flask, Award, BookCheck, Beaker, AlertTriangle } from 'lucide-react';
import { FilterOptions } from '../../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onUpdateFilters: (filters: Partial<FilterOptions>) => void;
  onUpdateExamFilter: (examType: keyof FilterOptions['exams'], value: boolean) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onUpdateFilters,
  onUpdateExamFilter,
  searchTerm,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg mb-4 overflow-hidden">
      <div 
        className="bg-white/5 p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold text-white">
          Filters & Search
        </h2>
        <button className="text-white">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <div className={`p-4 transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 hidden'}`}>
        <div className="mb-4">
          <label className="text-sm font-medium text-white/80 block mb-2">
            Search Events
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search by title, subject, faculty..."
              className="w-full p-2 pl-9 bg-white/5 border border-white/20 rounded-md focus:ring-[#0d9488] focus:border-[#0d9488] text-white placeholder-white/50"
            />
            <Search
              size={18}
              className="absolute left-2.5 top-2.5 text-white/50"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Class Filter */}
          <div className="bg-white/5 p-3 rounded-md border border-white/10">
            <div className="flex items-center mb-2">
              <BookOpen size={18} className="text-white mr-2" />
              <h3 className="font-medium text-white">Schedule</h3>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.classes}
                onChange={() => onUpdateFilters({ classes: !filters.classes })}
                className="rounded text-[#0d9488] focus:ring-[#0d9488] h-4 w-4 bg-white/5 border-white/20"
              />
              <span className="text-white/80">Show schedule</span>
            </label>
          </div>
          
          {/* Examination Filter */}
          <div className="bg-white/5 p-3 rounded-md border border-white/10">
            <div className="flex items-center mb-2">
              <FileText size={18} className="text-white mr-2" />
              <h3 className="font-medium text-white">Examinations</h3>
            </div>
            <div className="space-y-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Object.values(filters.exams).every(Boolean)}
                  onChange={() => {
                    const allChecked = Object.values(filters.exams).every(Boolean);
                    const newValue = !allChecked;
                    
                    onUpdateFilters({
                      exams: {
                        laboratory: newValue,
                        model: newValue,
                        semester: newValue,
                        practical: newValue,
                        preLab: newValue,
                      },
                    });
                  }}
                  className="rounded text-[#0d9488] focus:ring-[#0d9488] h-4 w-4 bg-white/5 border-white/20"
                />
                <span className="text-white/80">All exams</span>
              </label>
              
              <div className="pl-4 mt-1 space-y-1 text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.exams.laboratory}
                    onChange={() => onUpdateExamFilter('laboratory', !filters.exams.laboratory)}
                    className="rounded text-[#0d9488] focus:ring-[#0d9488] h-3.5 w-3.5 bg-white/5 border-white/20"
                  />
                  <span className="flex items-center text-white/70">
                    <Flask size={14} className="mr-1" />
                    Laboratory
                  </span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.exams.model}
                    onChange={() => onUpdateExamFilter('model', !filters.exams.model)}
                    className="rounded text-[#0d9488] focus:ring-[#0d9488] h-3.5 w-3.5 bg-white/5 border-white/20"
                  />
                  <span className="flex items-center text-white/70">
                    <Award size={14} className="mr-1" />
                    Model
                  </span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.exams.semester}
                    onChange={() => onUpdateExamFilter('semester', !filters.exams.semester)}
                    className="rounded text-[#0d9488] focus:ring-[#0d9488] h-3.5 w-3.5 bg-white/5 border-white/20"
                  />
                  <span className="flex items-center text-white/70">
                    <BookCheck size={14} className="mr-1" />
                    Semester
                  </span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.exams.practical}
                    onChange={() => onUpdateExamFilter('practical', !filters.exams.practical)}
                    className="rounded text-[#0d9488] focus:ring-[#0d9488] h-3.5 w-3.5 bg-white/5 border-white/20"
                  />
                  <span className="flex items-center text-white/70">
                    <Beaker size={14} className="mr-1" />
                    Practical
                  </span>
                </label>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.exams.preLab}
                    onChange={() => onUpdateExamFilter('preLab', !filters.exams.preLab)}
                    className="rounded text-[#0d9488] focus:ring-[#0d9488] h-3.5 w-3.5 bg-white/5 border-white/20"
                  />
                  <span className="flex items-center text-white/70">
                    <AlertTriangle size={14} className="mr-1" />
                    Pre-Lab
                  </span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Holiday Filter */}
          <div className="bg-white/5 p-3 rounded-md border border-white/10">
            <div className="flex items-center mb-2">
              <Coffee size={18} className="text-white mr-2" />
              <h3 className="font-medium text-white">Holidays</h3>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.holidays}
                onChange={() => onUpdateFilters({ holidays: !filters.holidays })}
                className="rounded text-[#0d9488] focus:ring-[#0d9488] h-4 w-4 bg-white/5 border-white/20"
              />
              <span className="text-white/80">Show holidays</span>
            </label>
          </div>
          
          {/* Events Filter */}
          <div className="bg-white/5 p-3 rounded-md border border-white/10">
            <div className="flex items-center mb-2">
              <Calendar size={18} className="text-white mr-2" />
              <h3 className="font-medium text-white">Events</h3>
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.events}
                onChange={() => onUpdateFilters({ events: !filters.events })}
                className="rounded text-[#0d9488] focus:ring-[#0d9488] h-4 w-4 bg-white/5 border-white/20"
              />
              <span className="text-white/80">Show events</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;