import { differenceInMinutes, parseISO } from 'date-fns';

import { Habit } from '@/features/habits/types';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;

export const getAvoidanceStreakStartDate = (habit: Habit): string => {
  return habit.avoidanceProgress?.currentStreakStartedAt ?? habit.createdAt;
};

export const getCurrentAvoidanceStreakInMinutes = (habit: Habit, now = new Date()): number => {
  if (habit.type !== 'addiction') {
    return 0;
  }

  const startDate = parseISO(getAvoidanceStreakStartDate(habit));

  return Math.max(differenceInMinutes(now, startDate), 0);
};

export const getBestAvoidanceStreakInMinutes = (habit: Habit, now = new Date()): number => {
  if (habit.type !== 'addiction') {
    return 0;
  }

  const currentStreak = getCurrentAvoidanceStreakInMinutes(habit, now);
  const savedBestStreak = habit.avoidanceProgress?.bestStreakInMinutes ?? 0;

  return Math.max(savedBestStreak, currentStreak);
};

export const formatDurationFromMinutes = (totalMinutes: number): string => {
  const days = Math.floor(totalMinutes / MINUTES_IN_DAY);
  const hours = Math.floor((totalMinutes % MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  const minutes = totalMinutes % MINUTES_IN_HOUR;

  return `${days}d ${hours}h ${minutes}min`;
};