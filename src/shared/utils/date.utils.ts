import {
  addDays,
  endOfMonth,
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  subDays,
  startOfMonth,
} from 'date-fns';

import { ISODateString } from '@/shared/types';

export const toISODate = (date: Date): ISODateString => {
  return format(date, 'yyyy-MM-dd');
};

export const getCurrentISODate = (): ISODateString => {
  return toISODate(new Date());
};

export const getWeekRange = (date: ISODateString) => {
  const parsedDate = parseISO(date);

  return {
    startDate: toISODate(startOfWeek(parsedDate, { weekStartsOn: 1 })),
    endDate: toISODate(endOfWeek(parsedDate, { weekStartsOn: 1 })),
  };
};

export const isDateInRange = ({
  date,
  startDate,
  endDate,
}: {
  date: ISODateString;
  startDate: ISODateString;
  endDate: ISODateString;
}) => {
  const parsedDate = parseISO(date);

  return isWithinInterval(parsedDate, {
    start: parseISO(startDate),
    end: parseISO(endDate),
  });
};
export const getYesterdayISODate = (): ISODateString => {
  return toISODate(subDays(new Date(), 1));
};

export const canEditCheckInDate = (date: ISODateString): boolean => {
  const today = getCurrentISODate();
  const yesterday = getYesterdayISODate();

  return date === today || date === yesterday;
};

export const getMonthRange = (date: ISODateString) => {
  const parsedDate = parseISO(date);

  return {
    startDate: toISODate(startOfMonth(parsedDate)),
    endDate: toISODate(endOfMonth(parsedDate)),
  };
};
export const getEndOfDayISODate = (date: ISODateString): ISODateString => {
  return date;
};

export const getEndOfCurrentWeekISODate = (): ISODateString => {
  return toISODate(endOfWeek(new Date(), { weekStartsOn: 1 }));
};

export const getEndOfCurrentMonthISODate = (): ISODateString => {
  return toISODate(endOfMonth(new Date()));
};

export const isISODateAfter = (firstDate: ISODateString, secondDate: ISODateString): boolean => {
  return parseISO(firstDate).getTime() > parseISO(secondDate).getTime();
};

export const getTomorrowISODate = (): ISODateString => {
  return toISODate(addDays(new Date(), 1));
};
