import React from 'react';
import { Internship } from '../../types/internship';
import { applyToInternship } from '../../services/api';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  const {
    title,
    company,
    location,
    salary,
    postedDate,
    deadline,
    type,
    role,
    description,
    skills,
    companyLogo,
    applyLink
  } = internship;

  // Calculate days left until deadline
  const daysLeft = () => {
    if (!deadline) return null;
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  const days = daysLeft();

  // Handle apply button click
  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    applyToInternship(applyLink);
  };

  return (
    <div className="bg-gray-800 text-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-600">
  <div className="p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt={`${company} logo`}
            className="w-12 h-12 rounded-md object-contain mr-4 bg-white"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=' + company.charAt(0);
            }}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center mr-4">
            <span className="text-white font-bold text-xl">
              {company.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{title}</h3>
          <p className="text-gray-300 text-sm">{company}</p>
        </div>
      </div>
      <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded font-medium">
        {type === 'internship' ? 'Internship' : 'Job'}
      </div>
    </div>

    <div className="space-y-2 mb-4">
      {/* Location */}
      <div className="flex items-center text-gray-300">
        {/* icon */}
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span className="text-sm">{location}</span>
      </div>

      {/* Salary */}
      {salary && (
        <div className="flex items-center text-gray-300">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-sm">{salary}</span>
        </div>
      )}

      {/* Role */}
      <div className="flex items-center text-gray-300">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
        <span className="text-sm">{role}</span>
      </div>
    </div>

    <p className="text-gray-200 text-sm mb-4 line-clamp-2">{description}</p>

    {/* Skills */}
    {skills && skills.length > 0 && (
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="bg-gray-600 text-gray-100 text-xs px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="bg-gray-600 text-gray-100 text-xs px-2 py-1 rounded">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    )}

    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-600">
      <div className="text-sm text-gray-300">
        {postedDate && `Posted ${postedDate}`}
      </div>
      {days !== null && (
        <div className={`text-sm ${days <= 3 ? 'text-red-400' : 'text-gray-300'}`}>
          {days === 0 ? 'Deadline today' : `${days} days left`}
        </div>
      )}
    </div>
  </div>

  <div className="px-6 py-4 bg-gray-700 border-t border-gray-600">
    <button
      onClick={handleApply}
      className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-md transition-colors duration-300"
    >
      Apply Now
    </button>
  </div>
</div>

  );
};

export default InternshipCard;
