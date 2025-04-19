import React from 'react';
import { FilterOptions } from '../../types/internship';

interface FilterSectionProps {
  filterOptions: FilterOptions;
  handleFilterChange: (key: string, value: string) => void;
  availableLocations: string[];
  availableRoles: string[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filterOptions,
  handleFilterChange,
  availableLocations,
  availableRoles,
}) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Filter Opportunities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Role Filter */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
            Role
          </label>
          <div className="relative">
            <select
              id="role"
              value={filterOptions.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base bg-slate-700 text-white border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Roles</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            Location
          </label>
          <div className="relative">
            <select
              id="location"
              value={filterOptions.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base bg-slate-700 text-white border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Locations</option>
              {availableLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Type Filter (Internship/Job) */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
            Type
          </label>
          <div className="relative">
            <select
              id="type"
              value={filterOptions.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base bg-slate-700 text-white border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Types</option>
              <option value="internship">Internships</option>
              <option value="job">Jobs</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Reset button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            handleFilterChange('role', '');
            handleFilterChange('location', '');
            handleFilterChange('type', 'all');
          }}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
