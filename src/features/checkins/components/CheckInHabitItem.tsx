import { StyleSheet, View } from 'react-native';

import { Habit } from '@/features/habits/types';
import { AppText, Button, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface CheckInHabitItemProps {
  habit: Habit;
  isCompleted: boolean;
  weeklyCompletionCount: number;
  onToggle: () => void;
  disabled?: boolean;
}

export const CheckInHabitItem = ({
  habit,
  isCompleted,
  weeklyCompletionCount,
  onToggle,
  disabled = false,
}: CheckInHabitItemProps) => {
  const title =
    habit.type === 'habit'
      ? `Did you do ${habit.name} today?`
      : `Did you avoid ${habit.name} today?`;

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.content}>
          <AppText variant="heading3">{title}</AppText>

          {habit.type === 'habit' && habit.frequency ? (
            <AppText variant="bodySmall" color={colors.textMuted}>
                This week: {weeklyCompletionCount}/{habit.frequency.targetPerWeek}
            </AppText>
            ) : null}
        </View>

        <Button variant={isCompleted ? 'primary' : 'secondary'} onPress={onToggle} disabled={disabled}>
          {isCompleted ? 'Yes' : 'No'}
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  content: {
    gap: spacing.xs,
  },
});