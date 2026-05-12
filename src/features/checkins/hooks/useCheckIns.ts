import { useMemo } from 'react';

import { useCheckInStore } from '@/features/checkins/store';

export const useCheckIns = () => {
  const checkIns = useCheckInStore((state) => state.checkIns);
  const addCheckIn = useCheckInStore((state) => state.addCheckIn);
  const updateCheckIn = useCheckInStore((state) => state.updateCheckIn);
  const removeCheckIn = useCheckInStore((state) => state.removeCheckIn);
  const recordAvoidanceFailure = useCheckInStore((state) => state.recordAvoidanceFailure);
  const hasHydrated = useCheckInStore((state) => state.hasHydrated);

  const sortedCheckIns = useMemo(() => {
    return [...checkIns].sort((firstCheckIn, secondCheckIn) =>
      secondCheckIn.date.localeCompare(firstCheckIn.date),
    );
  }, [checkIns]);

  return {
    checkIns,
    sortedCheckIns,
    addCheckIn,
    updateCheckIn,
    removeCheckIn,
    recordAvoidanceFailure,
    hasHydrated,
  };
};