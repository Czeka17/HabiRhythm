import { Alert, StyleSheet, View } from 'react-native';

import { Habit } from '@/features/habits/types';
import {
  formatDurationFromMinutes,
  getBestAvoidanceStreakInMinutes,
  getCurrentAvoidanceStreakInMinutes,
} from '@/features/habits/utils';
import { AppText, Button, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  onRelapse: (habit: Habit) => void;
}

export const HabitCard = ({ habit, onEdit, onDelete, onRelapse }: HabitCardProps) => {
  const currentStreak =
    habit.type === 'addiction'
      ? formatDurationFromMinutes(getCurrentAvoidanceStreakInMinutes(habit))
      : null;

  const bestStreak =
    habit.type === 'addiction'
      ? formatDurationFromMinutes(getBestAvoidanceStreakInMinutes(habit))
      : null;

  const confirmRelapse = () => {
    Alert.alert(
      'Reset streak?',
      `This will reset your current streak for "${habit.name}". Your best streak will be saved.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'I relapsed',
          style: 'destructive',
          onPress: () => onRelapse(habit),
        },
      ],
    );
  };

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <AppText variant="heading3">{habit.name}</AppText>

            {habit.type === 'habit' ? (
              <AppText variant="bodySmall" color={colors.textMuted}>
                Habit · {habit.frequency?.targetPerWeek ?? 0}/week
              </AppText>
            ) : (
              <AppText variant="bodySmall" color={colors.textMuted}>
                Avoidance
              </AppText>
            )}
          </View>

          <Button variant="ghost" onPress={() => onEdit(habit)}>
            Edit
          </Button>
        </View>

        {habit.type === 'addiction' ? (
          <View style={styles.streakBox}>
            <View>
              <AppText variant="bodySmall" color={colors.textMuted}>
                Current streak
              </AppText>
              <AppText variant="heading3">{currentStreak}</AppText>
            </View>

            <View>
              <AppText variant="bodySmall" color={colors.textMuted}>
                Best streak
              </AppText>
              <AppText variant="heading3">{bestStreak}</AppText>
            </View>

            {habit.avoidanceProgress?.lastRelapseAt ? (
              <AppText variant="caption" color={colors.textMuted}>
                Last relapse: {new Date(habit.avoidanceProgress.lastRelapseAt).toLocaleString()}
              </AppText>
            ) : null}
          </View>
        ) : null}

        <View style={styles.actions}>
          {habit.type === 'addiction' ? (
            <Button variant="secondary" onPress={confirmRelapse} style={styles.actionButton}>
              I relapsed
            </Button>
          ) : null}

          <Button variant="secondary" onPress={() => onDelete(habit)} style={styles.actionButton}>
            Delete
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  titleGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  streakBox: {
    gap: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});