import { useState, useRef } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { HabitCard, HabitForm } from '@/features/habits/components';
import { useHabits } from '@/features/habits/hooks';
import { Habit } from '@/features/habits/types';
import { AppText, Button, Card, Screen, SectionHeader } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

export default function HabitsRoute() {
  const { activeHabits, addHabit, updateHabit, removeHabit, recordAddictionRelapse } = useHabits();
    const scrollViewRef = useRef<ScrollView>(null);
  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);

  const confirmDeleteHabit = (habit: Habit) => {
    Alert.alert('Delete habit?', `Are you sure you want to delete "${habit.name}"?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => removeHabit(habit.id),
      },
    ]);
  };
  const handleEditHabit = (habit: Habit) => {
  setHabitToEdit(habit);

  requestAnimationFrame(() => {
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  });
};

  return (
    <Screen scrollable scrollRef={scrollViewRef}>
      <View style={styles.container}>
        <SectionHeader
          title="Habits"
          description="Create habits you want to build and things you want to avoid."
        />

        <Card>
          <View style={styles.formHeader}>
            <AppText variant="heading3">
  {habitToEdit ? `Edit ${habitToEdit.name}` : 'Create habit'}
</AppText>

            {habitToEdit ? (
              <Button variant="ghost" onPress={() => setHabitToEdit(null)}>
                Cancel
              </Button>
            ) : null}
          </View>

          <HabitForm
            initialValues={
              habitToEdit
                ? {
                    name: habitToEdit.name,
                    type: habitToEdit.type,
                    targetPerWeek: habitToEdit.frequency?.targetPerWeek,
                  }
                : undefined
            }
            submitLabel={habitToEdit ? 'Save changes' : 'Add habit'}
            onSubmit={(values) => {
              if (habitToEdit) {
                updateHabit(habitToEdit.id, values);
                setHabitToEdit(null);
                return;
              }

              addHabit(values);
            }}
          />
        </Card>

        <View style={styles.list}>
          <AppText variant="heading3">Your habits</AppText>

          {activeHabits.length === 0 ? (
            <Card>
              <AppText color={colors.textMuted}>No habits yet. Add your first one.</AppText>
            </Card>
          ) : (
            activeHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onEdit={handleEditHabit}
                onDelete={confirmDeleteHabit}
                onRelapse={(selectedHabit) => recordAddictionRelapse(selectedHabit.id)}
              />
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
  formHeader: {
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    gap: spacing.md,
  },
});