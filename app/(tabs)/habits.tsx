import { StyleSheet, View } from 'react-native';

import { useHabits } from '@/features/habits/hooks';
import { AppText, Button, Card, Screen, SectionHeader } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

export default function HabitsRoute() {
  const { activeHabits, addHabit } = useHabits();

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="Habits"
          description="Track habits you want to build and addictions you want to avoid."
        />

        <Button
          onPress={() =>
            addHabit({
              name: 'Training',
              type: 'habit',
              targetPerWeek: 5,
            })
          }
        >
          Add test habit
        </Button>

        <View style={styles.list}>
          {activeHabits.length === 0 ? (
            <Card>
              <AppText color={colors.textMuted}>No habits yet. Add your first one.</AppText>
            </Card>
          ) : (
            activeHabits.map((habit) => (
              <Card key={habit.id}>
                <View style={styles.habitCardContent}>
                  <View>
                    <AppText variant="heading3">{habit.name}</AppText>
                    <AppText variant="bodySmall" color={colors.textMuted}>
                      {habit.type === 'habit' ? 'Habit' : 'Addiction'} ·{' '}
                      {habit.frequency.targetPerWeek}/week
                    </AppText>
                  </View>
                </View>
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
  list: {
    gap: spacing.md,
  },
  habitCardContent: {
    gap: spacing.sm,
  },
});