import { DayStatus, HabitResult } from '@/features/checkins/types';

const MIN_MOOD_RATING = 1;
const MAX_MOOD_RATING = 10;

const MOOD_SCORE_WEIGHT = 0.5;
const HABITS_SCORE_WEIGHT = 0.5;

interface CalculateDailyScoreParams {
  moodRating: number;
  habitResults: HabitResult[];
}

export const calculateDailyScore = ({ moodRating, habitResults }: CalculateDailyScoreParams) => {
  const normalizedMoodRating = Math.min(Math.max(moodRating, MIN_MOOD_RATING), MAX_MOOD_RATING);
  const moodScore = normalizedMoodRating * 10;

  if (habitResults.length === 0) {
    return moodScore;
  }

  const completedHabitsCount = habitResults.filter((habitResult) => habitResult.completed).length;
  const habitsScore = (completedHabitsCount / habitResults.length) * 100;

  return Math.round(moodScore * MOOD_SCORE_WEIGHT + habitsScore * HABITS_SCORE_WEIGHT);
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