import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const EventsPage = () => {
  const events = [
    {
      title: 'Tech Innovation Summit',
      date: 'March 15, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      attendees: 250,
      category: 'Conference',
      description: 'Join industry leaders for insights into emerging technologies and innovation.',
      link: 'https://example.com/register-tech-innovation-summit' // Add registration link
    },
    {
      title: 'Career Fair 2024',
      date: 'March 20, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'University Campus',
      attendees: 500,
      category: 'Career',
      description: 'Connect with top companies and explore career opportunities.',
      link: 'https://example.com/register-career-fair' // Add registration link
    },
    {
      title: 'Research Symposium',
      date: 'April 5, 2024',
      time: '11:00 AM - 3:00 PM',
      location: 'Research Center',
      attendees: 150,
      category: 'Academic',
      description: 'Showcase of groundbreaking research projects across disciplines.',
      link: 'https://example.com/register-research-symposium' // Add registration link
    },
    {
      title: 'Cultural Fest',
      date: 'April 15, 2024',
      time: '5:00 PM - 9:00 PM',
      location: 'Open Air Theater',
      attendees: 1000,
      category: 'Cultural',
      description: 'Celebrate diversity through music, dance, and cultural performances.',
      link: 'https://example.com/register-cultural-fest' // Add registration link
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Upcoming Events</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Stay updated with the latest events and activities happening on campus
        </p>
      </div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">
                    {event.category}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">{event.title}</h2>
                <p className="text-white/70 mb-4">{event.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center text-white/70">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees} Attending</span>
                  </div>
                </div>
              </div>

              {/* Wrap the button in an anchor tag */}
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors whitespace-nowrap">
                  Register Now
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;