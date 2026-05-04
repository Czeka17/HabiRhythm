import { StyleSheet, View } from 'react-native';

import { HabitProgressSummary } from '@/features/reports/types';
import { AppText, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface HabitProgressListProps {
  habitProgress: HabitProgressSummary[];
}

export const HabitProgressList = ({ habitProgress }: HabitProgressListProps) => {
  return (
    <Card>
      <View style={styles.container}>
        <AppText variant="heading3">Habit progress</AppText>

        {habitProgress.length === 0 ? (
          <AppText color={colors.textMuted}>No habits yet.</AppText>
        ) : (
          <View style={styles.list}>
            {habitProgress.map((habit) => (
              <View key={habit.habitId} style={styles.item}>
                <View style={styles.itemHeader}>
                  <AppText>{habit.habitName}</AppText>

                  <AppText color={colors.textMuted}>
                    {habit.completedCount}/{habit.targetPerWeek}
                  </AppText>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${habit.completionRate}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  item: {
    gap: spacing.xs,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
});