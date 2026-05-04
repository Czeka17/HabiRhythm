import { StyleSheet, View } from 'react-native';

import { HabitForm } from '@/features/habits/components';
import { useHabits } from '@/features/habits/hooks';
import { AppText, Card, Screen, SectionHeader } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

export default function HabitsRoute() {
  const { activeHabits, addHabit } = useHabits();

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="Habits"
          description="Create habits you want to build and things you want to avoid."
        />

        <Card>
          <HabitForm onSubmit={addHabit} />
        </Card>

        <View style={styles.list}>
          <AppText variant="heading3">Your habits</AppText>

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
                      {habit.type === 'habit' ? 'Habit' : 'Avoid'} ·{' '}
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