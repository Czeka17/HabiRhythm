import { useMemo } from 'react';

import { useHabitStore } from '@/features/habits/store';

export const useHabits = () => {
  const habits = useHabitStore((state) => state.habits);
  const addHabit = useHabitStore((state) => state.addHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);
  const archiveHabit = useHabitStore((state) => state.archiveHabit);
  const restoreHabit = useHabitStore((state) => state.restoreHabit);
  const removeHabit = useHabitStore((state) => state.removeHabit);
  const hasHydrated = useHabitStore((state) => state.hasHydrated);

  const activeHabits = useMemo(() => {
    return habits.filter((habit) => !habit.isArchived);
  }, [habits]);

  const archivedHabits = useMemo(() => {
    return habits.filter((habit) => habit.isArchived);
  }, [habits]);

  return {
    habits,
    activeHabits,
    archivedHabits,
    addHabit,
    updateHabit,
    archiveHabit,
    restoreHabit,
    removeHabit,
    hasHydrated
  };
};