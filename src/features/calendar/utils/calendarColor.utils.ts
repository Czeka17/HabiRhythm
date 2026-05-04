import { CalendarDayStatus } from '@/features/calendar/types';
import { colors } from '@/shared/constants/colors';

export const getCalendarDayColor = (status: CalendarDayStatus): string => {
  const statusColors: Record<CalendarDayStatus, string> = {
    great: colors.success,
    average: colors.warning,
    bad: colors.danger,
    empty: colors.border,
  };

  return statusColors[status];
};