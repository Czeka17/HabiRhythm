import { DayStatus } from '@/features/checkins/types';
import { colors } from '@/shared/constants/colors';

export const getDayStatusLabel = (status: DayStatus): string => {
  const labels: Record<DayStatus, string> = {
    great: 'Great day',
    average: 'Average day',
    bad: 'Bad day',
  };

  return labels[status];
};

export const getDayStatusColor = (status: DayStatus): string => {
  const statusColors: Record<DayStatus, string> = {
    great: colors.success,
    average: colors.warning,
    bad: colors.danger,
  };

  return statusColors[status];
};