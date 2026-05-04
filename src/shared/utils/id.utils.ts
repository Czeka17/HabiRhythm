import * as Crypto from 'expo-crypto';

import { EntityId } from '@/shared/types';

export const createEntityId = (): EntityId => {
  return Crypto.randomUUID();
};