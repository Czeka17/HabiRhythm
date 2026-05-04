import { addDays, eachDayOfInterval, format, isAfter, startOfWeek, subWeeks } from 'date-fns';

import { DailyCheckIn } from '@/features/checkins/types';
import { CalendarDay } from '@/features/calendar/types';
import { ISODateString } from '@/shared/types';

interface GetCalendarDaysParams {
  checkIns: DailyCheckIn[];
  weeksCount?: number;
}

export const getCalendarDays = ({
  checkIns,
  weeksCount = 4,
}: GetCalendarDaysParams): CalendarDay[] => {
  const today = new Date();

  const startDate = startOfWeek(subWeeks(today, weeksCount - 1), {
    weekStartsOn: 1,
  });

  const endDate = addDays(startDate, weeksCount * 7 - 1);

  const checkInsByDate = new Map(checkIns.map((checkIn) => [checkIn.date, checkIn]));

  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).map((date) => {
    const isoDate = format(date, 'yyyy-MM-dd') as ISODateString;
    const isFutureDate = isAfter(date, today);

    if (isFutureDate) {
      return {
        date: isoDate,
        status: 'empty',
      };
    }

    const checkIn = checkInsByDate.get(isoDate);

    if (!checkIn) {
      return {
        date: isoDate,
        status: 'empty',
      };
    }

    return {
      date: isoDate,
      status: checkIn.status,
      score: checkIn.score,
    };
  });
};