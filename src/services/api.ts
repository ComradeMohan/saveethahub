import axios from 'axios';
import { Internship } from '../types/internship';
import { fallbackData } from './fallbackData';

// JSearch API (RapidAPI)
const JSEARCH_API_KEY = import.meta.env.VITE_JSEARCH_API_KEY || '';
const JSEARCH_HOST = 'jsearch.p.rapidapi.com';

// Custom function to handle API errors and retry fallbacks
export const fetchInternships = async (): Promise<Internship[]> => {
  try {
    // Try to fetch from JSearch API first (if API key is available)
    if (JSEARCH_API_KEY) {
      try {
        const options = {
          method: 'GET',
          url: 'https://jsearch.p.rapidapi.com/search',
          params: {
            query: 'internship in India',
            page: '1',
            num_pages: '6'
          },
          headers: {
            'X-RapidAPI-Key': JSEARCH_API_KEY,
            'X-RapidAPI-Host': JSEARCH_HOST
          }
        };

        const response = await axios.request(options);
        
        if (response.data && response.data.data) {
          // Transform the API response to match our Internship interface
          return response.data.data.map((item: any) => ({
            id: item.job_id || Math.random().toString(36).substr(2, 9),
            title: item.job_title || '',
            company: item.employer_name || '',
            location: item.job_city || 'Remote',
            salary: item.job_min_salary ? `₹${item.job_min_salary} - ₹${item.job_max_salary || item.job_min_salary}` : 'Not specified',
            postedDate: item.job_posted_at_datetime_utc ? new Date(item.job_posted_at_datetime_utc).toLocaleDateString() : undefined,
            deadline: item.job_offer_expiration_datetime_utc ? new Date(item.job_offer_expiration_datetime_utc).toLocaleDateString() : undefined,
            type: item.job_is_internship ? 'internship' : 'job',
            role: item.job_title || '',
            description: item.job_description || 'No description available',
            skills: item.job_required_skills || [],
            companyLogo: item.employer_logo || undefined,
            applyLink: item.job_apply_link || '#',
          }));
        }
      } catch (error) {
        console.error('JSearch API error:', error);
        // Continue to next fallback
      }
    }

    // If JSearch API fails or isn't available, try Jobful API
    try {
      const jobfulResponse = await axios.get('https://jobful-api.herokuapp.com/jobs/recent');
      
      if (jobfulResponse.data && Array.isArray(jobfulResponse.data)) {
        return jobfulResponse.data.map((item: any) => ({
          id: item.link || Math.random().toString(36).substr(2, 9),
          title: item.postName || 'Position',
          company: item.postBoard || 'Company',
          location: 'India', // Default location
          salary: 'Not specified',
          postedDate: item.postDate || undefined,
          deadline: item.lastDate || undefined,
          type: item.postName.toLowerCase().includes('intern') ? 'internship' : 'job',
          role: item.qualification || 'Not specified',
          description: `${item.postName} - ${item.qualification || 'Not specified'}`,
          skills: [],
          companyLogo: undefined,
          applyLink: item.link || '#',
        }));
      }
    } catch (jobfulError) {
      console.error('Jobful API error:', jobfulError);
    }

    // If all APIs fail, use the local fallback data
    console.log('Using fallback data');
    return fallbackData;
  } catch (error) {
    console.error('Error fetching internships:', error);
    return fallbackData;
  }
};

// Function to open internship application in new tab with proper handling
export const applyToInternship = (url: string): void => {
  // Open in new tab with noopener and noreferrer for security
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  
  // If window.open is blocked, provide fallback
  if (!newWindow) {
    alert('Pop-up blocked! Please allow pop-ups for this site to apply for internships.');
  }
};

// Additional function to fetch more details for a specific internship
export const fetchInternshipDetails = async (id: string): Promise<Internship | null> => {
  try {
    // Check in fallback data first
    const fallbackInternship = fallbackData.find(internship => internship.id === id);
    if (fallbackInternship) return fallbackInternship;
    
    // If not in fallback data and we have JSearch API key, try to fetch from API
    if (JSEARCH_API_KEY) {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/job-details',
        params: {
          job_id: id,
        },
        headers: {
          'X-RapidAPI-Key': JSEARCH_API_KEY,
          'X-RapidAPI-Host': JSEARCH_HOST
        }
      };

      const response = await axios.request(options);
      
      if (response.data && response.data.data && response.data.data.length > 0) {
        const item = response.data.data[0];
        return {
          id: item.job_id,
          title: item.job_title || '',
          company: item.employer_name || '',
          location: item.job_city || 'Remote',
          salary: item.job_min_salary ? `₹${item.job_min_salary} - ₹${item.job_max_salary || item.job_min_salary}` : 'Not specified',
          postedDate: item.job_posted_at_datetime_utc ? new Date(item.job_posted_at_datetime_utc).toLocaleDateString() : undefined,
          deadline: item.job_offer_expiration_datetime_utc ? new Date(item.job_offer_expiration_datetime_utc).toLocaleDateString() : undefined,
          type: item.job_is_internship ? 'internship' : 'job',
          role: item.job_title || '',
          description: item.job_description || 'No description available',
          skills: item.job_required_skills || [],
          companyLogo: item.employer_logo || undefined,
          applyLink: item.job_apply_link || '#',
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching internship details:', error);
    return null;
  }
};
