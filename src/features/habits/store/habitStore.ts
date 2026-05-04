import { differenceInMinutes, parseISO } from 'date-fns';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createHabit } from '@/features/habits/services';
import { CreateHabitInput, Habit, UpdateHabitInput } from '@/features/habits/types';
import { asyncStorage } from '@/storage';

interface HabitState {
  habits: Habit[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addHabit: (input: CreateHabitInput) => void;
  updateHabit: (habitId: Habit['id'], input: UpdateHabitInput) => void;
  archiveHabit: (habitId: Habit['id']) => void;
  restoreHabit: (habitId: Habit['id']) => void;
  removeHabit: (habitId: Habit['id']) => void;
  recordAddictionRelapse: (habitId: Habit['id']) => void;
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: [],
      hasHydrated: false,

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
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

            const nextType = input.type ?? habit.type;
            const now = new Date().toISOString();

            return {
              ...habit,
              name: input.name?.trim() ?? habit.name,
              type: nextType,
              color: input.color ?? habit.color,
              icon: input.icon ?? habit.icon,
              frequency:
                nextType === 'habit'
                  ? {
                      type: (input.targetPerWeek ?? habit.frequency?.targetPerWeek ?? 5) >= 7
                        ? 'daily'
                        : 'weekly',
                      targetPerWeek: input.targetPerWeek ?? habit.frequency?.targetPerWeek ?? 5,
                    }
                  : undefined,
              avoidanceProgress:
                nextType === 'addiction'
                  ? (habit.avoidanceProgress ?? {
                      currentStreakStartedAt: now,
                      bestStreakInMinutes: 0,
                    })
                  : undefined,
              updatedAt: now,
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

      recordAddictionRelapse: (habitId) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== habitId || habit.type !== 'addiction') {
              return habit;
            }

            const now = new Date();
            const nowISOString = now.toISOString();
            const currentStreakStartedAt =
              habit.avoidanceProgress?.currentStreakStartedAt ?? habit.createdAt;

            const currentStreakInMinutes = Math.max(
              differenceInMinutes(now, parseISO(currentStreakStartedAt)),
              0,
            );

            const bestStreakInMinutes = Math.max(
              habit.avoidanceProgress?.bestStreakInMinutes ?? 0,
              currentStreakInMinutes,
            );

            return {
              ...habit,
              avoidanceProgress: {
                currentStreakStartedAt: nowISOString,
                bestStreakInMinutes,
                lastRelapseAt: nowISOString,
              },
              updatedAt: nowISOString,
            };
          }),
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