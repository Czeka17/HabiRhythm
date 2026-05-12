import { Habit } from '@/features/habits/types/habit.types';
import { EntityId, ISODateString, ISODateTimeString } from '@/shared/types/common.types';

export type DayStatus = 'great' | 'average' | 'bad';

export interface HabitResult {
  habitId: Habit['id'];
  completed: boolean;
}

export interface DailyCheckIn {
  id: EntityId;
  date: ISODateString;
  moodRating: number;
  habitResults: HabitResult[];
  avoidanceFailures?: AvoidanceFailure[];
  note?: string;
  score: number;
  status: DayStatus;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}
export interface CreateDailyCheckInInput {
  date: ISODateString;
  moodRating: number;
  habitResults: HabitResult[];
  avoidanceFailures?: AvoidanceFailure[];
  note?: string;
}
export interface AvoidanceFailure {
  habitId: Habit['id'];
  habitName: Habit['name'];
  occurredAt: ISODateTimeString;
}