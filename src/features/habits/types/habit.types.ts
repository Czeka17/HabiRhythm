import { EntityId, ISODateTimeString } from '@/shared/types/common.types';

export type HabitType = 'habit' | 'addiction';

export type HabitFrequencyType = 'daily' | 'weekly';

export interface HabitFrequency {
  type: HabitFrequencyType;
  targetPerWeek: number;
}

export interface Habit {
  id: EntityId;
  name: string;
  type: HabitType;
  frequency: HabitFrequency;
  color?: string;
  icon?: string;
  isArchived: boolean;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}