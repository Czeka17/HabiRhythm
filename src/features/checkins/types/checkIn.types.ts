import { Habit } from '@/features/habits/types/habit.types';
import { EntityId, ISODateString, ISODateTimeString } from '@/shared/types/common.types';

export type DayStatus = 'great' | 'average' | 'bad';

export interface HabitResult {
  habitId: Habit['id'];
  completed: boolean;
}

export interface DailyCheckIn {
  id: EntityId;
  date: ISODateString; // YYYY-MM-DD
  moodRating: number; // 1-10
  habitResults: HabitResult[];
  note?: string;
  score: number; // 0-100
  status: DayStatus;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}
export interface CreateDailyCheckInInput {
  date: ISODateString;
  moodRating: number;
  habitResults: HabitResult[];
  note?: string;
}