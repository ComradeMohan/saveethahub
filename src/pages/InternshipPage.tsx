import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import InternshipCard from '../components/internship/InternshipCard';
import FilterSection from '../components/internship/FilterSection';
import Spinner from '../components/internship/Spinner';
import { fetchInternships } from '../services/api';
import { Internship, FilterOptions } from '../types/internship';


const InternshipPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    role: '',
    location: '',
    type: 'all', // 'all', 'internship', 'job'
  });

  // Available locations and roles for filter dropdowns
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);

  // Fetch internships from API
  useEffect(() => {
    const getInternships = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInternships();
        setInternships(data);
        setFilteredInternships(data);

        // Extract unique locations and roles for filters
        const locations = [...new Set(data.map(item => item.location))];
        const roles = [...new Set(data.map(item => item.role))];

        setAvailableLocations(locations);
        setAvailableRoles(roles);

        setIsLoading(false);
      } catch {
        setError('Failed to fetch internships. Please try again later.');
        setIsLoading(false);
      }
    };

    getInternships();
  }, []);

  // Filter internships based on selected options
  const filterInternships = useCallback(
    debounce((options: FilterOptions) => {
      const filtered = internships.filter((internship) => {
        const roleMatch = !options.role || internship.role.toLowerCase().includes(options.role.toLowerCase());
        const locationMatch = !options.location || internship.location.toLowerCase().includes(options.location.toLowerCase());
        const typeMatch = options.type === 'all' || internship.type === options.type;
        
        return roleMatch && locationMatch && typeMatch;
      });
      
      setFilteredInternships(filtered);
    }, 300),
    [internships]
  );

  // Handle filter changes
  useEffect(() => {
    filterInternships(filterOptions);
  }, [filterOptions, filterInternships]);

  const handleFilterChange = (key: string, value: string) => {
    setFilterOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen  text-white pt-10">
  <div className="container mx-auto px-4 py-8">
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-blue-300 mb-2">Internships & Jobs</h1>
      <p className="text-lg text-gray-300">
        Find the perfect internship or job opportunity to kickstart your career
      </p>
    </div>

    <FilterSection 
      filterOptions={filterOptions}
      handleFilterChange={handleFilterChange}
      availableLocations={availableLocations}
      availableRoles={availableRoles}
    />

    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    ) : error ? (
      <div className="text-center p-10 bg-white/10 backdrop-blur-md rounded-lg border border-red-400">
        <p className="text-red-400">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    ) : (
      <>
        <div className="mb-4 text-gray-400">
          {filteredInternships.length} opportunities found
        </div>
        
        {filteredInternships.length === 0 ? (
          <div className="text-center p-10 bg-white/10 backdrop-blur-md rounded-lg border border-gray-700">
            <p className="text-gray-400">No internships or jobs found matching your filters.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setFilterOptions({ role: '', location: '', type: 'all' })}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        )}
      </>
    )}
  </div>
</div>

  );
};

export default InternshipPage;
