import { CalendarDay } from '@/features/calendar/types';

export const hasCalendarDayCheckIn = (day: CalendarDay): boolean => {
  return day.status !== 'empty';
};