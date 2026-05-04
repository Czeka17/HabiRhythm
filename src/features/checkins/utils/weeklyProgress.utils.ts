import { DailyCheckIn } from '@/features/checkins/types';
import { Habit } from '@/features/habits/types';
import { getWeekRange, isDateInRange } from '@/shared/utils';

interface GetWeeklyHabitCompletionCountParams {
  habitId: Habit['id'];
  checkIns: DailyCheckIn[];
  date: string;
}

export const getWeeklyHabitCompletionCount = ({
  habitId,
  checkIns,
  date,
}: GetWeeklyHabitCompletionCountParams) => {
  const { startDate, endDate } = getWeekRange(date);

  return checkIns
    .filter((checkIn) =>
      isDateInRange({
        date: checkIn.date,
        startDate,
        endDate,
      }),
    )
    .filter((checkIn) =>
      checkIn.habitResults.some(
        (habitResult) => habitResult.habitId === habitId && habitResult.completed,
      ),
    ).length;
};