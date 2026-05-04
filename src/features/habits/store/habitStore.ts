import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createHabit } from '@/features/habits/services';
import { CreateHabitInput, Habit } from '@/features/habits/types';
import { asyncStorage } from '@/storage';

interface HabitState {
  habits: Habit[];
  addHabit: (input: CreateHabitInput) => void;
  updateHabit: (habitId: Habit['id'], input: Partial<CreateHabitInput>) => void;
  archiveHabit: (habitId: Habit['id']) => void;
  restoreHabit: (habitId: Habit['id']) => void;
  removeHabit: (habitId: Habit['id']) => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: [],
      hasHydrated: false,

      setHasHydrated: (value) => {
        set({
            hasHydrated: value,
        });
      },
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
    }),
    {
      name: 'habi-rhythm-habits-storage',
      storage: asyncStorage,
      partialize: (state) => ({
        habits: state.habits,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);