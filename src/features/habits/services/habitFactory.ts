import { CreateHabitInput, Habit, HabitFrequencyType } from '@/features/habits/types';
import { createEntityId } from '@/shared/utils';

const DAILY_TARGET_PER_WEEK = 7;

const getHabitFrequencyType = (targetPerWeek: number): HabitFrequencyType => {
  return targetPerWeek >= DAILY_TARGET_PER_WEEK ? 'daily' : 'weekly';
};

export const createHabit = (input: CreateHabitInput): Habit => {
  const now = new Date().toISOString();

  return {
    id: createEntityId(),
    name: input.name.trim(),
    type: input.type,
    frequency: {
      type: getHabitFrequencyType(input.targetPerWeek),
      targetPerWeek: input.targetPerWeek,
    },
    color: input.color,
    icon: input.icon,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };
};