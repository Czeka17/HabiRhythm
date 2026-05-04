import { DailyCheckIn, DayStatus } from '@/features/checkins/types';
import { getWeeklyHabitCompletionCount } from '@/features/checkins/utils';
import { Habit } from '@/features/habits/types';
import { WeeklySummary } from '@/features/reports/types';
import { ISODateString } from '@/shared/types';
import { getWeekRange, isDateInRange } from '@/shared/utils';

const createEmptyDaysByStatus = (): Record<DayStatus, number> => ({
  great: 0,
  average: 0,
  bad: 0,
});

interface CalculateWeeklySummaryParams {
  date: ISODateString;
  habits: Habit[];
  checkIns: DailyCheckIn[];
}

export const calculateWeeklySummary = ({
  date,
  habits,
  checkIns,
}: CalculateWeeklySummaryParams): WeeklySummary => {
  const { startDate, endDate } = getWeekRange(date);

  const weeklyCheckIns = checkIns.filter((checkIn) =>
    isDateInRange({
      date: checkIn.date,
      startDate,
      endDate,
    }),
  );

  const totalCheckIns = weeklyCheckIns.length;

  const averageMoodRating =
    totalCheckIns === 0
      ? 0
      : weeklyCheckIns.reduce((sum, checkIn) => sum + checkIn.moodRating, 0) / totalCheckIns;

  const averageScore =
    totalCheckIns === 0
      ? 0
      : weeklyCheckIns.reduce((sum, checkIn) => sum + checkIn.score, 0) / totalCheckIns;

  const daysByStatus = weeklyCheckIns.reduce<Record<DayStatus, number>>((acc, checkIn) => {
    acc[checkIn.status] += 1;
    return acc;
  }, createEmptyDaysByStatus());

  const habitProgress = habits.map((habit) => {
    const completedCount = getWeeklyHabitCompletionCount({
      habitId: habit.id,
      checkIns,
      date,
    });

    const completionRate =
      habit.frequency.targetPerWeek === 0
        ? 0
        : Math.min((completedCount / habit.frequency.targetPerWeek) * 100, 100);

    return {
      habitId: habit.id,
      habitName: habit.name,
      targetPerWeek: habit.frequency.targetPerWeek,
      completedCount,
      completionRate,
    };
  });

  return {
    weekStartDate: startDate,
    weekEndDate: endDate,
    averageMoodRating: Number(averageMoodRating.toFixed(1)),
    averageScore: Math.round(averageScore),
    totalCheckIns,
    daysByStatus,
    habitProgress,
  };
};