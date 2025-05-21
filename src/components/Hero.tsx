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

// Function to generate A/B slot events skipping holidays and Sundays
function generateAlternatingEvents(startDate: Date, endDate: Date): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  let current = new Date(startDate);
  let useAB = true;

  const holidayStart = new Date(current.getFullYear(), 4, 17); // May 17
  const holidayEnd = new Date(current.getFullYear(), 4, 25);   // May 25

  while (current <= endDate) {
    const day = current.getDay();
    const isSunday = day === 0;
    const isThirdSaturday = day === 6 && Math.ceil(current.getDate() / 7) === 3;
    const inHolidayRange = current >= holidayStart && current <= holidayEnd;

    if (!isSunday && !isThirdSaturday && !inHolidayRange && current.getMonth() === 4) {
      const combinedSlot = useAB ? 'A B' : 'B A';
      const title = useAB ? ' A B' : ' B A';

      events.push({
        id: `${current.toDateString()}-${combinedSlot}`,
        title,
        start: new Date(current.getFullYear(), current.getMonth(), current.getDate(), 9),
        end: new Date(current.getFullYear(), current.getMonth(), current.getDate(), 13),
        type: 'class',
        slot: combinedSlot as 'AB' | 'CD',
        subject: `Subjects ${combinedSlot}`,
      });

      useAB = !useAB;
    }

    current.setDate(current.getDate() + 1);
  }

  return events;
}

// Hero component
const Hero = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dummyEvents = generateAlternatingEvents(
    new Date(new Date().getFullYear(), 4, 1), // May 1
    new Date(new Date().getFullYear(), 4, 31) // May 31
  );

  // Hostel Return Event
  dummyEvents.push({
    id: 'hostel-returning',
    title: 'Hostel Return',
    start: new Date(new Date().getFullYear(), 4, 27, 10, 0),
    end: new Date(new Date().getFullYear(), 4, 27, 11, 0),
    type: 'event',
    details: 'Hostel Return',
  });

  // Add Simmam Fest on May 8, 9, 10
  const simmamDays = [8, 9, 10];
  simmamDays.forEach((day) => {
    dummyEvents.push({
      id: `simmam-${day}`,
      title: 'Fest',
      start: new Date(new Date().getFullYear(), 4, day, 10, 0),
      end: new Date(new Date().getFullYear(), 4, day, 12, 0),
      type: 'event',
      details: 'Simmam Fest',
    });
  });

  // Add Holidays from May 17 to 25
  for (let day = 17; day <= 25; day++) {
    dummyEvents.push({
      id: `holiday-${day}`,
      title: 'Holiday',
      start: new Date(new Date().getFullYear(), 4, day, 0, 0),
      end: new Date(new Date().getFullYear(), 4, day, 23, 59),
      type: 'holiday',
      details: 'Mid-Sem Break',
    });
  }

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
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
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

          {/* Calendar Grid */}
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
