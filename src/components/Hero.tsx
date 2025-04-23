import { useNavigate } from 'react-router-dom';
import CalendarGrid from '../components/Calendar/CalendarGrid';
import { useState } from 'react';
import type { CalendarEvent, FilterOptions } from '../types/calender';

// Separate GetStartedButton component
const GetStartedButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
    >
      Get Started
    </button>
  );
};
function generateAlternatingEvents(startDate: Date, endDate: Date): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  let current = new Date(startDate);
  let useAB = true; // toggle between A/B and C/D

  while (current <= endDate) {
    const day = current.getDay(); // Sunday = 0, Saturday = 6

    const isSunday = day === 0;
    const isThirdSaturday =
      day === 6 && Math.ceil(current.getDate() / 7) === 3;

    if (!isSunday && !(day === 6 && isThirdSaturday)) {
      const slots = useAB ? ['A', 'B'] : ['C', 'D'];

      slots.forEach((slot, i) => {
        events.push({
          id: `${current.toDateString()}-${slot}`,
          title: ` ${slot}`,
          start: new Date(current.getFullYear(), current.getMonth(), current.getDate(), 9 + i * 2), // 9AM, 11AM
          end: new Date(current.getFullYear(), current.getMonth(), current.getDate(), 11 + i * 2), // 11AM, 1PM
          type: 'class',
          slot: slot as 'A' | 'B' | 'C' | 'D',
          subject: `Subject ${slot}`,
        });
      });

      useAB = !useAB;
    }

    // Move to next day
    current.setDate(current.getDate() + 1);
  }

  return events;
}
// Hero component using the GetStartedButton
const Hero = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dummyEvents = generateAlternatingEvents(new Date(), new Date(new Date().setDate(new Date().getDate() + 30)));


  const dummyFilters: FilterOptions = {
    classes: true,
    exams: {
      laboratory: true,
      model: true,
      semester: true,
      practical: true,
      preLab: true,
    },
    holidays: true,
    events: true,
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] pt-10 flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Your Academic
              <span className="text-teal-400"> Success Hub</span>
            </h1>
            <p className="text-xl text-white/80">
              Access tools, resources, and guidance to excel in your academic journey.
              Calculate CGPA, track attendance, and discover learning opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <GetStartedButton />
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side: CalendarGrid */}
          <div className="relative h-[28rem] w-full rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <CalendarGrid
              currentDate={currentDate}
              events={dummyEvents}
              viewType="month"
              filters={dummyFilters}
              onDayClick={(date) => setCurrentDate(date)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
