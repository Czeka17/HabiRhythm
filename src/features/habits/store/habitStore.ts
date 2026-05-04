import { create } from 'zustand';

import { createHabit } from '@/features/habits/services';
import { CreateHabitInput, Habit } from '@/features/habits/types';

interface HabitState {
  habits: Habit[];
  addHabit: (input: CreateHabitInput) => void;
  updateHabit: (habitId: Habit['id'], input: Partial<CreateHabitInput>) => void;
  archiveHabit: (habitId: Habit['id']) => void;
  restoreHabit: (habitId: Habit['id']) => void;
  removeHabit: (habitId: Habit['id']) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [],

  addHabit: (input) => {
    set((state) => ({
      habits: [...state.habits, createHabit(input)],
    }));
  },

  updateHabit: (habitId, input) => {
    set((state) => ({
      habits: state.habits.map((habit) => {
        if (habit.id !== habitId) {
          return habit;
        }

        return {
          ...habit,
          name: input.name?.trim() ?? habit.name,
          type: input.type ?? habit.type,
          color: input.color ?? habit.color,
          icon: input.icon ?? habit.icon,
          frequency:
            input.targetPerWeek === undefined
              ? habit.frequency
              : {
                  type: input.targetPerWeek >= 7 ? 'daily' : 'weekly',
                  targetPerWeek: input.targetPerWeek,
                },
          updatedAt: new Date().toISOString(),
        };
      }),
    }));
  },

  archiveHabit: (habitId) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              isArchived: true,
              updatedAt: new Date().toISOString(),
            }
          : habit,
      ),
    }));
  },

  restoreHabit: (habitId) => {
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              isArchived: false,
              updatedAt: new Date().toISOString(),
            }
          : habit,
      ),
    }));
  },

  removeHabit: (habitId) => {
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== habitId),
    }));
  },
}));