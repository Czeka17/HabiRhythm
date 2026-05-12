import { AvoidanceFailure, DayStatus, HabitResult } from '@/features/checkins/types';

const MIN_MOOD_RATING = 1;
const MAX_MOOD_RATING = 10;

const MOOD_SCORE_WEIGHT = 0.5;
const HABITS_SCORE_WEIGHT = 0.5;

const AVOIDANCE_FAILURE_PENALTY = 30;

interface CalculateDailyScoreParams {
  moodRating: number;
  habitResults: HabitResult[];
  avoidanceFailures?: AvoidanceFailure[];
}

export const calculateDailyScore = ({
  moodRating,
  habitResults,
  avoidanceFailures = [],
}: CalculateDailyScoreParams) => {
  const normalizedMoodRating = Math.min(Math.max(moodRating, MIN_MOOD_RATING), MAX_MOOD_RATING);
  const moodScore = normalizedMoodRating * 10;

  const habitsScore =
    habitResults.length === 0
      ? moodScore
      : (habitResults.filter((habitResult) => habitResult.completed).length / habitResults.length) *
        100;

  const baseScore = Math.round(moodScore * MOOD_SCORE_WEIGHT + habitsScore * HABITS_SCORE_WEIGHT);

  const penalty = avoidanceFailures.length * AVOIDANCE_FAILURE_PENALTY;

  return Math.max(baseScore - penalty, 0);
};

export const getDayStatus = (score: number): DayStatus => {
  if (score >= 75) {
    return 'great';
  }

  if (score >= 45) {
    return 'average';
  }

  return 'bad';
};