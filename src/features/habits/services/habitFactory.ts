import { CreateHabitInput, Habit, HabitFrequencyType } from '@/features/habits/types';
import { createEntityId } from '@/shared/utils';

const DAILY_TARGET_PER_WEEK = 7;
const DEFAULT_WEEKLY_TARGET = 5;

const getHabitFrequencyType = (targetPerWeek: number): HabitFrequencyType => {
  return targetPerWeek >= DAILY_TARGET_PER_WEEK ? 'daily' : 'weekly';
};

export const createHabit = (input: CreateHabitInput): Habit => {
  const now = new Date().toISOString();

  const targetPerWeek = input.targetPerWeek ?? DEFAULT_WEEKLY_TARGET;

  return {
    id: createEntityId(),
    name: input.name.trim(),
    type: input.type,
    frequency:
      input.type === 'habit'
        ? {
            type: getHabitFrequencyType(targetPerWeek),
            targetPerWeek,
          }
        : undefined,
    avoidanceProgress:
      input.type === 'addiction'
        ? {
            currentStreakStartedAt: now,
            bestStreakInMinutes: 0,
          }
        : undefined,
    color: input.color,
    icon: input.icon,
    isArchived: false,
    createdAt: now,
    updatedAt: now,
  };
};