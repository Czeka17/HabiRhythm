import { MissionPeriod } from '@/features/missions/types';
import {
  getCurrentISODate,
  getEndOfCurrentMonthISODate,
  getEndOfCurrentWeekISODate,
} from '@/shared/utils';

export const getMissionLockedUntilDate = (period: MissionPeriod) => {
  if (period === 'daily') {
    return getCurrentISODate();
  }

  if (period === 'weekly') {
    return getEndOfCurrentWeekISODate();
  }

  return getEndOfCurrentMonthISODate();
};