import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AcceptedMission, MissionOffer } from '@/features/missions/types';
import { generateMissionOffers, getMissionLockedUntilDate } from '@/features/missions/utils';
import { asyncStorage } from '@/storage';
import { getCurrentISODate, isISODateAfter, createEntityId } from '@/shared/utils';

const MAX_ACCEPTED_MISSIONS = 3;

interface MissionState {
  offers: MissionOffer[];
  acceptedMissions: AcceptedMission[];
  lastGeneratedDate?: string;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  refreshMissionOffers: () => void;
  acceptMission: (offerId: MissionOffer['id']) => void;
  removeExpiredMissions: () => void;
}

export const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      offers: [],
      acceptedMissions: [],
      hasHydrated: false,

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },

      refreshMissionOffers: () => {
        const today = getCurrentISODate();
        const { lastGeneratedDate, acceptedMissions } = get();

        const hasAlreadyGeneratedToday = lastGeneratedDate === today;

        if (hasAlreadyGeneratedToday) {
          return;
        }

        const generatedOffers = generateMissionOffers(today);

        const acceptedPeriods = new Set(
          acceptedMissions
            .filter((mission) => mission.status === 'accepted')
            .map((mission) => mission.period),
        );

        const nextOffers = generatedOffers.filter((offer) => !acceptedPeriods.has(offer.period));

        set({
          offers: nextOffers,
          lastGeneratedDate: today,
        });
      },

      acceptMission: (offerId) => {
        set((state) => {
          const offer = state.offers.find((missionOffer) => missionOffer.id === offerId);

          if (!offer) {
            return state;
          }

          const activeAcceptedMissions = state.acceptedMissions.filter(
            (mission) => mission.status === 'accepted',
          );

          const hasReachedLimit = activeAcceptedMissions.length >= MAX_ACCEPTED_MISSIONS;

          if (hasReachedLimit) {
            return state;
          }

          const alreadyHasPeriodLocked = activeAcceptedMissions.some(
            (mission) => mission.period === offer.period,
          );

          if (alreadyHasPeriodLocked) {
            return state;
          }

          const acceptedMission: AcceptedMission = {
            id: createEntityId(),
            definitionId: offer.definitionId,
            title: offer.title,
            description: offer.description,
            period: offer.period,
            xpReward: offer.xpReward,
            status: 'accepted',
            acceptedAt: new Date().toISOString(),
            lockedUntil: getMissionLockedUntilDate(offer.period),
          };

          return {
            acceptedMissions: [...state.acceptedMissions, acceptedMission],
            offers: state.offers.filter((missionOffer) => missionOffer.id !== offerId),
          };
        });
      },

      removeExpiredMissions: () => {
        const today = getCurrentISODate();

        set((state) => ({
          acceptedMissions: state.acceptedMissions.map((mission) => {
            if (mission.status !== 'accepted') {
              return mission;
            }

            const isExpired = isISODateAfter(today, mission.lockedUntil);

            if (!isExpired) {
              return mission;
            }

            return {
              ...mission,
              status: 'expired',
            };
          }),
        }));
      },
    }),
    {
      name: 'habi-rhythm-missions-storage',
      storage: asyncStorage,
      partialize: (state) => ({
        offers: state.offers,
        acceptedMissions: state.acceptedMissions,
        lastGeneratedDate: state.lastGeneratedDate,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
