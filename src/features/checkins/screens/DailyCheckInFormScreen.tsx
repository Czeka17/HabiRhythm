import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { CheckInHabitItem, MoodRatingSelector } from '@/features/checkins/components';
import { useCheckIns } from '@/features/checkins/hooks';
import { HabitResult } from '@/features/checkins/types';
import { getWeeklyHabitCompletionCount } from '@/features/checkins/utils';
import { useHabits } from '@/features/habits/hooks';
import { AppText, Button, Card, Screen, SectionHeader, TextField } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { ISODateString } from '@/shared/types';
import { canEditCheckInDate } from '@/shared/utils';

interface DailyCheckInFormScreenProps {
  date: ISODateString;
}

export const DailyCheckInFormScreen = ({ date }: DailyCheckInFormScreenProps) => {
  const { activeHabits } = useHabits();
  const { sortedCheckIns, addCheckIn } = useCheckIns();
   const trackableHabits = useMemo(() => {
    return activeHabits.filter((habit) => habit.type === 'habit');
  }, [activeHabits]);
  const existingCheckIn = sortedCheckIns.find((checkIn) => checkIn.date === date);
  const isEditable = canEditCheckInDate(date);
  const [moodRating, setMoodRating] = useState(existingCheckIn?.moodRating ?? 5);
  const [note, setNote] = useState(existingCheckIn?.note ?? '');
  const [habitResults, setHabitResults] = useState<HabitResult[]>(() =>
    trackableHabits.map((habit) => {
      const existingResult = existingCheckIn?.habitResults.find(
        (habitResult) => habitResult.habitId === habit.id,
      );

      return {
        habitId: habit.id,
        completed: existingResult?.completed ?? false,
      };
    }),
  );


  useEffect(() => {
    setMoodRating(existingCheckIn?.moodRating ?? 5);
    setNote(existingCheckIn?.note ?? '');

    setHabitResults((currentResults) => {
      const currentResultsByHabitId = new Map(
        currentResults.map((habitResult) => [habitResult.habitId, habitResult]),
      );

      return trackableHabits.map((habit) => {
        const savedResult = existingCheckIn?.habitResults.find(
          (habitResult) => habitResult.habitId === habit.id,
        );

        const currentResult = currentResultsByHabitId.get(habit.id);

        return {
          habitId: habit.id,
          completed: savedResult?.completed ?? currentResult?.completed ?? false,
        };
      });
    });
  }, [trackableHabits, existingCheckIn]);

  const habitResultsById = useMemo(() => {
    return new Map(habitResults.map((habitResult) => [habitResult.habitId, habitResult]));
  }, [habitResults]);

  const toggleHabitResult = (habitId: string) => {
    if (!isEditable) {
      return;
    }

    setHabitResults((currentResults) =>
      currentResults.map((habitResult) =>
        habitResult.habitId === habitId
          ? {
              ...habitResult,
              completed: !habitResult.completed,
            }
          : habitResult,
      ),
    );
  };

  const handleSave = () => {
    if (!isEditable) {
      Alert.alert('Read-only', 'Only today and yesterday can be edited.');
      return;
    }

    addCheckIn({
      date,
      moodRating,
      habitResults,
      note,
    });

    Alert.alert('Saved', 'Your daily check-in has been saved.', [
      {
        text: 'OK',
        onPress: () => router.replace('/check-in'),
      },
    ]);
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title={existingCheckIn ? 'Edit check-in' : 'Add check-in'}
          description={`Check-in date: ${date}`}
        />

        {!isEditable ? (
          <Card>
            <AppText color={colors.textMuted}>
              This check-in is read-only. Only today and yesterday can be edited.
            </AppText>
          </Card>
        ) : null}

        {existingCheckIn ? (
          <Card>
            <View style={styles.savedSummary}>
              <AppText variant="heading3">Saved result</AppText>
              <AppText color={colors.textMuted}>
                Mood {existingCheckIn.moodRating}/10 · Score {existingCheckIn.score}/100 ·{' '}
                {existingCheckIn.status}
              </AppText>
            </View>
          </Card>
        ) : null}

        <Card>
          <MoodRatingSelector value={moodRating} onChange={setMoodRating} disabled={!isEditable} />
        </Card>

        <View style={styles.section}>
          <AppText variant="heading3">Habits</AppText>

          {trackableHabits.length === 0 ? (
            <Card>
              <AppText color={colors.textMuted}>
                No habits yet. Add habits first to track them here.
              </AppText>
            </Card>
          ) : (
            trackableHabits.map((habit) => {
              const result = habitResultsById.get(habit.id);

              return (
                <CheckInHabitItem
                  key={habit.id}
                  habit={habit}
                  isCompleted={result?.completed ?? false}
                  weeklyCompletionCount={getWeeklyHabitCompletionCount({
                    habitId: habit.id,
                    checkIns: sortedCheckIns,
                    date,
                  })}
                  disabled={!isEditable}
                  onToggle={() => toggleHabitResult(habit.id)}
                />
              );
            })
          )}
        </View>

        <TextField
          label="Note to yourself"
          placeholder="What do you want to remember from this day?"
          value={note}
          onChangeText={isEditable ? setNote : undefined}
          editable={isEditable}
          multiline
          style={styles.noteInput}
        />

        {isEditable ? (
          <Button onPress={handleSave}>
            {existingCheckIn ? 'Update check-in' : 'Save check-in'}
          </Button>
        ) : null}

        <Button variant="secondary" onPress={() => router.replace('/check-in')}>
          Back to check-ins
        </Button>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  section: {
    gap: spacing.md,
  },
  noteInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  savedSummary: {
    gap: spacing.xs,
  },
});