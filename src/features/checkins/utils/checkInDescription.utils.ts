import { DailyCheckIn } from '@/features/checkins/types';

export const getCheckInAvoidanceFailureDescription = (checkIn: DailyCheckIn): string | null => {
  const failures = checkIn.avoidanceFailures ?? [];

  if (failures.length === 0) {
    return null;
  }

  const failedHabitNames = failures.map((failure) => failure.habitName).join(', ');

  return `You failed to avoid: ${failedHabitNames}`;
};