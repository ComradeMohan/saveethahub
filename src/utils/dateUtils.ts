import {  MONTHS } from '../constants';

export const formatDate = (date: Date): string => {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const generateMonthDays = (year: number, month: number): Date[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days: Date[] = [];
  
  // Previous month days
  const prevMonthDays = getDaysInMonth(year, month - 1);
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, prevMonthDays - i));
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  
  // Next month days
  const remainingDays = 42 - days.length; // 6 rows of 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }
  
  return days;
};

export const generateWeekDays = (date: Date): Date[] => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(date);
    newDate.setDate(diff + i);
    days.push(newDate);
  }
  
  return days;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isCurrentMonth = (date: Date, currentMonth: number): boolean => {
  return date.getMonth() === currentMonth;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(today, date);
};

export const isThirdSaturday = (date: Date): boolean => {
  return (
    date.getDay() === 6 && // Saturday
    Math.ceil(date.getDate() / 7) === 3 // Third week
  );
};

export const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date >= startDate && date <= endDate;
};

export const isMarchHoliday = (date: Date): boolean => {
  return (
    date.getMonth() === 2 && // March
    date.getDate() >= 17 && date.getDate() <= 22
  );
};

export const getClassSlotForDay = (date: Date): string => {
  const day = date.getDay();
  const dayOfMonth = date.getDate();
  
  if (day === 0) return ''; // Sunday
  
  // Simple rotation algorithm
  const weekOfMonth = Math.ceil(dayOfMonth / 7);
  const slotIndex = (day + weekOfMonth) % 4;
  
  return ['A', 'B', 'C', 'D'][slotIndex];
};