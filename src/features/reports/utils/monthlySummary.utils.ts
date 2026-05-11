import { DailyCheckIn, DayStatus } from '@/features/checkins/types';
import { Habit } from '@/features/habits/types';
import { MonthlySummary } from '@/features/reports/types';
import { ISODateString } from '@/shared/types';
import { getMonthRange, isDateInRange } from '@/shared/utils';

const createEmptyDaysByStatus = (): Record<DayStatus, number> => ({
  great: 0,
  average: 0,
  bad: 0,
});

interface CalculateMonthlySummaryParams {
  date: ISODateString;
  habits: Habit[];
  checkIns: DailyCheckIn[];
}

export const calculateMonthlySummary = ({
  date,
  habits,
  checkIns,
}: CalculateMonthlySummaryParams): MonthlySummary => {
  const { startDate, endDate } = getMonthRange(date);

  const monthlyCheckIns = checkIns.filter((checkIn) =>
    isDateInRange({
      date: checkIn.date,
      startDate,
      endDate,
    }),
  );

  const totalCheckIns = monthlyCheckIns.length;

  const averageMoodRating =
    totalCheckIns === 0
      ? 0
      : monthlyCheckIns.reduce((sum, checkIn) => sum + checkIn.moodRating, 0) / totalCheckIns;

  const averageScore =
    totalCheckIns === 0
      ? 0
      : monthlyCheckIns.reduce((sum, checkIn) => sum + checkIn.score, 0) / totalCheckIns;

  const daysByStatus = monthlyCheckIns.reduce<Record<DayStatus, number>>((acc, checkIn) => {
    acc[checkIn.status] += 1;
    return acc;
  }, createEmptyDaysByStatus());

  const habitProgress = habits
    .filter((habit) => habit.type === 'habit' && habit.frequency)
    .map((habit) => {
      const targetPerMonth = (habit.frequency?.targetPerWeek ?? 1) * 4;

      const completedCount = monthlyCheckIns.filter((checkIn) =>
        checkIn.habitResults.some(
          (habitResult) => habitResult.habitId === habit.id && habitResult.completed,
        ),
      ).length;

      const completionRate = Math.min((completedCount / targetPerMonth) * 100, 100);

      return {
        habitId: habit.id,
        habitName: habit.name,
        targetPerWeek: targetPerMonth,
        completedCount,
        completionRate,
      };
    });

  const sortedByScore = [...monthlyCheckIns].sort((a, b) => b.score - a.score);

  return {
    month: date.slice(0, 7),
    averageMoodRating: Number(averageMoodRating.toFixed(1)),
    averageScore: Math.round(averageScore),
    totalCheckIns,
    daysByStatus,
    habitProgress,
    bestDay: sortedByScore[0]?.date,
    worstDay: sortedByScore[sortedByScore.length - 1]?.date,
  };
};