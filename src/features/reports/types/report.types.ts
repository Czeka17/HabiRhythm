import { DayStatus } from '@/features/checkins/types/checkIn.types';
import { Habit } from '@/features/habits/types/habit.types';
import { ISODateString, YearMonthString } from '@/shared/types/common.types';

export interface HabitProgressSummary {
  habitId: Habit['id'];
  habitName: Habit['name'];
  targetPerWeek: number;
  completedCount: number;
  completionRate: number;
}

export interface WeeklySummary {
  weekStartDate: ISODateString;
  weekEndDate: ISODateString;
  averageMoodRating: number;
  averageScore: number;
  totalCheckIns: number;
  daysByStatus: Record<DayStatus, number>;
  habitProgress: HabitProgressSummary[];
}

export interface MonthlySummary {
  month: YearMonthString;
  averageMoodRating: number;
  averageScore: number;
  totalCheckIns: number;
  daysByStatus: Record<DayStatus, number>;
  habitProgress: HabitProgressSummary[];
  bestDay?: ISODateString;
  worstDay?: ISODateString;
}