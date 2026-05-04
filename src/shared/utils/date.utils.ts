import { format, parseISO, startOfWeek, endOfWeek, isWithinInterval, subDays } from 'date-fns';

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