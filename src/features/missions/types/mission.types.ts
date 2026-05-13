import { EntityId, ISODateString, ISODateTimeString } from '@/shared/types';

export type MissionPeriod = 'daily' | 'weekly' | 'monthly';

export type MissionStatus = 'available' | 'accepted' | 'completed' | 'expired';

export interface MissionDefinition {
  id: EntityId;
  title: string;
  description: string;
  period: MissionPeriod;
  xpReward: number;
}

export interface MissionOffer {
  id: EntityId;
  definitionId: MissionDefinition['id'];
  title: string;
  description: string;
  period: MissionPeriod;
  xpReward: number;
  generatedForDate: ISODateString;
  createdAt: ISODateTimeString;
}

export interface AcceptedMission {
  id: EntityId;
  definitionId: MissionDefinition['id'];
  title: string;
  description: string;
  period: MissionPeriod;
  xpReward: number;
  status: MissionStatus;
  acceptedAt: ISODateTimeString;
  lockedUntil: ISODateString;
  completedAt?: ISODateTimeString;
}