import { StyleSheet, View } from 'react-native';

import { DailyCheckIn } from '@/features/checkins/types';
import { getWeeklyHabitCompletionCount } from '@/features/checkins/utils';
import { Habit } from '@/features/habits/types';
import { AppText, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { getCurrentISODate } from '@/shared/utils';

interface WeeklyProgressCardProps {
  habits: Habit[];
  checkIns: DailyCheckIn[];
}

export const WeeklyProgressCard = ({ habits, checkIns }: WeeklyProgressCardProps) => {
  const today = getCurrentISODate();

  return (
    <Card>
      <View style={styles.container}>
        <AppText variant="heading3">This week</AppText>

        {habits.length === 0 ? (
          <AppText color={colors.textMuted}>No habits yet. Create habits to see weekly progress.</AppText>
        ) : (
          <View style={styles.list}>
            {habits.map((habit) => {
              const completedCount = getWeeklyHabitCompletionCount({
                habitId: habit.id,
                checkIns,
                date: today,
              });

              return (
                <View key={habit.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <AppText>{habit.name}</AppText>
                    <AppText color={colors.textMuted}>
                      {completedCount}/{habit.frequency.targetPerWeek}
                    </AppText>
                  </View>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(
                            (completedCount / habit.frequency.targetPerWeek) * 100,
                            100,
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
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