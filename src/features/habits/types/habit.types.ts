import { EntityId, ISODateTimeString } from '@/shared/types/common.types';

export type HabitType = 'habit' | 'addiction';

export type HabitFrequencyType = 'daily' | 'weekly';

export interface HabitFrequency {
  type: HabitFrequencyType;
  targetPerWeek: number;
}

export interface AvoidanceProgress {
  currentStreakStartedAt: ISODateTimeString;
  bestStreakInMinutes: number;
  lastRelapseAt?: ISODateTimeString;
}

export interface Habit {
  id: EntityId;
  name: string;
  type: HabitType;
  frequency?: HabitFrequency;
  avoidanceProgress?: AvoidanceProgress;
  color?: string;
  icon?: string;
  isArchived: boolean;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export interface CreateHabitInput {
  name: string;
  type: HabitType;
  targetPerWeek?: number;
  color?: string;
  icon?: string;
}

export interface UpdateHabitInput {
  name?: string;
  type?: HabitType;
  targetPerWeek?: number;
  color?: string;
  icon?: string;
}