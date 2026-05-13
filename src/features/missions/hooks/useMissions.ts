import { useEffect, useMemo } from 'react';

import { useMissionStore } from '@/features/missions/store';

export const useMissions = () => {
  const offers = useMissionStore((state) => state.offers);
  const acceptedMissions = useMissionStore((state) => state.acceptedMissions);
  const hasHydrated = useMissionStore((state) => state.hasHydrated);
  const refreshMissionOffers = useMissionStore((state) => state.refreshMissionOffers);
  const acceptMission = useMissionStore((state) => state.acceptMission);
  const removeExpiredMissions = useMissionStore((state) => state.removeExpiredMissions);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    removeExpiredMissions();
    refreshMissionOffers();
  }, [hasHydrated, refreshMissionOffers, removeExpiredMissions]);

  const activeAcceptedMissions = useMemo(() => {
    return acceptedMissions.filter((mission) => mission.status === 'accepted');
  }, [acceptedMissions]);

  return {
    offers,
    acceptedMissions,
    activeAcceptedMissions,
    hasHydrated,
    acceptMission,
    refreshMissionOffers,
    removeExpiredMissions,
  };
};