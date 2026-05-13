import { MissionDefinition, MissionOffer, MissionPeriod } from '@/features/missions/types';
import { missionDefinitions } from '@/features/missions/services';
import { ISODateString } from '@/shared/types';
import { createEntityId } from '@/shared/utils';

const getMissionPoolByPeriod = (period: MissionPeriod): MissionDefinition[] => {
  return missionDefinitions.filter((mission) => mission.period === period);
};

const createStableIndex = (date: ISODateString, period: MissionPeriod, poolLength: number) => {
  const seed = `${date}-${period}`;

  const hash = seed.split('').reduce((sum, char) => {
    return sum + char.charCodeAt(0);
  }, 0);

  return hash % poolLength;
};

export const generateMissionOffer = ({
  period,
  date,
}: {
  period: MissionPeriod;
  date: ISODateString;
}): MissionOffer => {
  const pool = getMissionPoolByPeriod(period);
  const mission = pool[createStableIndex(date, period, pool.length)];
  const now = new Date().toISOString();

  return {
    id: createEntityId(),
    definitionId: mission.id,
    title: mission.title,
    description: mission.description,
    period: mission.period,
    xpReward: mission.xpReward,
    generatedForDate: date,
    createdAt: now,
  };
};

export const generateMissionOffers = (date: ISODateString): MissionOffer[] => {
  return [
    generateMissionOffer({ period: 'daily', date }),
    generateMissionOffer({ period: 'weekly', date }),
    generateMissionOffer({ period: 'monthly', date }),
  ];
};