import { useCheckInStore } from '@/features/checkins/store';
import { useHabitStore } from '@/features/habits/store';
import { useMissionStore } from '@/features/missions/store';

export const useIsAppReady = () => {
  const areHabitsHydrated = useHabitStore((state) => state.hasHydrated);
  const areCheckInsHydrated = useCheckInStore((state) => state.hasHydrated);
  const areMissionsHydrated = useMissionStore((state) => state.hasHydrated);

  return areHabitsHydrated && areCheckInsHydrated && areMissionsHydrated;
};