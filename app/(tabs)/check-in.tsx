import { StyleSheet, View } from 'react-native';

import { useCheckIns } from '@/features/checkins/hooks';
import { useHabits } from '@/features/habits/hooks';
import { AppText, Button, Card, Screen, SectionHeader } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { getCurrentISODate } from '@/shared/utils';

export default function CheckInRoute() {
  const { activeHabits } = useHabits();
  const { sortedCheckIns, addCheckIn } = useCheckIns();

  const today = getCurrentISODate();
  const todayCheckIn = sortedCheckIns.find((checkIn) => checkIn.date === today);

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="Daily Check-in"
          description="Rate your day and save today’s progress."
        />

        <Card>
          <View style={styles.cardContent}>
            <AppText variant="heading3">Today</AppText>

            <AppText color={colors.textMuted}>
              {todayCheckIn
                ? `Saved · Score ${todayCheckIn.score}/100 · ${todayCheckIn.status}`
                : 'No check-in saved yet.'}
            </AppText>

            <Button
              onPress={() =>
                addCheckIn({
                  date: today,
                  moodRating: 8,
                  habitResults: activeHabits.map((habit) => ({
                    habitId: habit.id,
                    completed: true,
                  })),
                  note: 'Test daily check-in',
                })
              }
            >
              Add test check-in
            </Button>
          </View>
        </Card>

        <View style={styles.list}>
          <AppText variant="heading3">History</AppText>

          {sortedCheckIns.length === 0 ? (
            <Card>
              <AppText color={colors.textMuted}>No check-ins yet.</AppText>
            </Card>
          ) : (
            sortedCheckIns.map((checkIn) => (
              <Card key={checkIn.id}>
                <AppText variant="heading3">{checkIn.date}</AppText>
                <AppText color={colors.textMuted}>
                  Mood {checkIn.moodRating}/10 · Score {checkIn.score}/100 · {checkIn.status}
                </AppText>
              </Card>
            ))
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  cardContent: {
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
});