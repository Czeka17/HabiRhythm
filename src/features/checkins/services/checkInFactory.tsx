import { CreateDailyCheckInInput, DailyCheckIn } from '@/features/checkins/types';
import { calculateDailyScore, getDayStatus } from '@/features/checkins/utils';
import { createEntityId } from '@/shared/utils';

export const createDailyCheckIn = (input: CreateDailyCheckInInput): DailyCheckIn => {
  const now = new Date().toISOString();

  const score = calculateDailyScore({
    moodRating: input.moodRating,
    habitResults: input.habitResults,
    avoidanceFailures: input.avoidanceFailures,
  });

  return {
    id: createEntityId(),
    date: input.date,
    moodRating: input.moodRating,
    habitResults: input.habitResults,
    avoidanceFailures: input.avoidanceFailures ?? [],
    note: input.note?.trim(),
    score,
    status: getDayStatus(score),
    createdAt: now,
    updatedAt: now,
  };
};