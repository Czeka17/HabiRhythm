import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createDailyCheckIn } from '@/features/checkins/services';
import { CreateDailyCheckInInput, DailyCheckIn } from '@/features/checkins/types';
import { asyncStorage } from '@/storage';

interface CheckInState {
  checkIns: DailyCheckIn[];
  addCheckIn: (input: CreateDailyCheckInInput) => void;
  updateCheckIn: (date: DailyCheckIn['date'], input: Partial<CreateDailyCheckInInput>) => void;
  removeCheckIn: (date: DailyCheckIn['date']) => void;
  getCheckInByDate: (date: DailyCheckIn['date']) => DailyCheckIn | undefined;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useCheckInStore = create<CheckInState>()(
  persist(
    (set, get) => ({
      checkIns: [],
      hasHydrated: false,

      setHasHydrated: (value) => {
        set({
            hasHydrated: value,
        });
      },
      addCheckIn: (input) => {
        set((state) => {
          const existingCheckIn = state.checkIns.find((checkIn) => checkIn.date === input.date);

          if (existingCheckIn) {
            return {
              checkIns: state.checkIns.map((checkIn) =>
                checkIn.date === input.date
                  ? {
                      ...createDailyCheckIn({
                        date: input.date,
                        moodRating: input.moodRating,
                        habitResults: input.habitResults,
                        note: input.note,
                      }),
                      id: checkIn.id,
                      createdAt: checkIn.createdAt,
                      updatedAt: new Date().toISOString(),
                    }
                  : checkIn,
              ),
            };
          }

          return {
            checkIns: [...state.checkIns, createDailyCheckIn(input)],
          };
        });
      },

      updateCheckIn: (date, input) => {
        set((state) => ({
          checkIns: state.checkIns.map((checkIn) => {
            if (checkIn.date !== date) {
              return checkIn;
            }

            const nextInput: CreateDailyCheckInInput = {
              date: input.date ?? checkIn.date,
              moodRating: input.moodRating ?? checkIn.moodRating,
              habitResults: input.habitResults ?? checkIn.habitResults,
              note: input.note ?? checkIn.note,
            };

            return {
              ...createDailyCheckIn(nextInput),
              id: checkIn.id,
              createdAt: checkIn.createdAt,
              updatedAt: new Date().toISOString(),
            };
          }),
        }));
      },

      removeCheckIn: (date) => {
        set((state) => ({
          checkIns: state.checkIns.filter((checkIn) => checkIn.date !== date),
        }));
      },

      getCheckInByDate: (date) => {
        return get().checkIns.find((checkIn) => checkIn.date === date);
      },
    }),
    {
      name: 'habi-rhythm-checkins-storage',
      storage: asyncStorage,
      partialize: (state) => ({
        checkIns: state.checkIns,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);